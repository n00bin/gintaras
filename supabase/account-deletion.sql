-- Wordami: make deleting an account remove everything (2026-11-05, second version 2026-11-08).
-- Run in Supabase -> SQL Editor. Safe to run again: running it twice changes nothing more.
-- 1. One eraser, public.gintaras_erase_user(id), does the whole job. "Delete my account" in the app uses it, and so do you
--    when someone emails to be deleted (see README). Deleting a person from the Supabase Authentication page skips it, so don't.
-- 2. It also removes the person from the old backup tables, the sign-in history Supabase keeps, and league messages that
--    name them, under any nickname they have used.
-- 3. Old league and study messages are tidied after 30 days.
-- 4. Problem reports are tied to the account, so they go with it. Reports sent without an account stay: they name nobody.
-- 5. People who already deleted their account get the same treatment now.
-- Nothing belonging to a current account is changed, except messages older than 30 days.
begin;

-- Every nickname each person has used, so messages naming them can be found later. Private: only the eraser reads it.
create table if not exists public.gintaras_nick_history (
  user_id  uuid not null references auth.users (id) on delete cascade,
  nickname text not null,
  primary key (user_id, nickname)
);
alter table public.gintaras_nick_history enable row level security;
revoke all on public.gintaras_nick_history from anon, authenticated;
insert into public.gintaras_nick_history (user_id, nickname)
  select id, nickname from public.gintaras_profiles where nickname is not null on conflict do nothing;

create or replace function public.gintaras_nick_remember() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.nickname is not null then
    insert into public.gintaras_nick_history (user_id, nickname) values (new.id, new.nickname) on conflict do nothing;
  end if;
  return new;
exception when others then
  return new; -- remembering a name must never stop a nickname change
end;
$$;
revoke all on function public.gintaras_nick_remember() from public, anon, authenticated;
drop trigger if exists gintaras_nick_remember on public.gintaras_profiles;
create trigger gintaras_nick_remember after insert or update of nickname on public.gintaras_profiles
  for each row execute function public.gintaras_nick_remember();

-- The nightly backup must be able to read the new table, or it stops (on purpose) at the first new table it can't read.
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'wordami_backup') then
    grant select on public.gintaras_nick_history to wordami_backup;
  end if;
end $$;

-- 4. Reports leave with the account, whichever way the account is removed.
delete from public.gintaras_reports r
 where r.user_id is not null and not exists (select 1 from auth.users u where u.id = r.user_id);
alter table public.gintaras_reports drop constraint if exists gintaras_reports_user_id_fkey;
alter table public.gintaras_reports add constraint gintaras_reports_user_id_fkey
  foreign key (user_id) references auth.users (id) on delete cascade;

-- 1. The eraser. Only the database owner can call it directly; learners reach it only through "Delete my account".
create or replace function public.gintaras_erase_user(who uuid) returns void
language plpgsql security definer set search_path = '' as $$
declare t record; n record;
begin
  if who is null then raise exception 'no account given'; end if;
  -- League messages sent to other players about this person, under every nickname they've used.
  -- Whole phrases only, so "Sam" never removes messages about "Sam K".
  for n in select nickname from public.gintaras_nick_history where user_id = who
           union select nickname from public.gintaras_profiles where id = who and nickname is not null loop
    delete from public.gintaras_notes
     where kind in ('rank', 'challenge')
       and (starts_with(body, n.nickname || ' just passed you.')
         or starts_with(body, n.nickname || ' pushed you out of the top 3 in ')
         or starts_with(body, n.nickname || ' is beating you now: '));
  end loop;
  -- The old backup tables kept inside the database.
  for t in select c.table_name, c.column_name from information_schema.columns c
            where c.table_schema = 'public' and c.table_name ~ '^gintaras_.*_backup_' and c.data_type = 'uuid' loop
    execute format('delete from public.%I where %I = $1', t.table_name, t.column_name) using who;
  end loop;
  -- Supabase's own sign-in history (email and internet address). If this project doesn't keep it, or the database
  -- won't allow it, deleting the account still goes ahead.
  begin
    delete from auth.audit_log_entries where payload ->> 'actor_id' = who::text;
  exception when others then
    raise notice 'Sign-in history not cleared: %', sqlerrm;
  end;
  -- Everything else (profile, progress, league rows, answer log, reminders, phones, messages to them, challenges,
  -- cup, reports, nickname history) goes with the account.
  delete from auth.users where id = who;
end;
$$;
revoke all on function public.gintaras_erase_user(uuid) from public, anon, authenticated;

-- "Delete my account" in the app. It can only ever delete the caller: auth.uid() is the signed-in user.
create or replace function public.gintaras_delete_account() returns void
language plpgsql security definer set search_path = '' as $$
declare me uuid := auth.uid();
begin
  if me is null then raise exception 'not signed in'; end if;
  perform public.gintaras_erase_user(me);
end;
$$;
revoke all on function public.gintaras_delete_account() from public, anon;
grant execute on function public.gintaras_delete_account() to authenticated;

-- 5. Clean up after accounts that were deleted earlier.
do $$
declare t record; gone bigint; total bigint := 0;
begin
  for t in select c.table_name, c.column_name from information_schema.columns c
            where c.table_schema = 'public' and c.table_name ~ '^gintaras_.*_backup_' and c.data_type = 'uuid' loop
    execute format('delete from public.%I b where b.%I is not null and not exists (select 1 from auth.users u where u.id = b.%I)',
                   t.table_name, t.column_name, t.column_name);
    get diagnostics gone = row_count;
    total := total + gone;
  end loop;
  begin
    delete from auth.audit_log_entries a
     where a.payload ->> 'actor_id' is not null
       and not exists (select 1 from auth.users u where u.id::text = a.payload ->> 'actor_id');
  exception when others then
    raise notice 'Sign-in history not cleared: %', sqlerrm;
  end;
  raise notice 'Backup rows removed for accounts already deleted: %', total;
end;
$$;

-- 3. Messages are short-lived ("someone passed you"), so they're removed after 30 days, every night.
create or replace function public.gintaras_notes_tidy() returns void
language sql security definer set search_path = '' as $$
  delete from public.gintaras_notes where created_at < now() - interval '30 days';
$$;
revoke all on function public.gintaras_notes_tidy() from public, anon, authenticated;
select public.gintaras_notes_tidy();
select cron.unschedule('gintaras-notes-tidy') where exists (select 1 from cron.job where jobname = 'gintaras-notes-tidy');
select cron.schedule('gintaras-notes-tidy', '41 2 * * *', 'select public.gintaras_notes_tidy()');

commit;

select 'done' as result,
  (select count(*) from auth.users) as accounts,
  (select count(*) from public.gintaras_nick_history) as nicknames_remembered,
  (select count(*) from public.gintaras_reports) as reports_kept,
  has_function_privilege('anon', 'public.gintaras_erase_user(uuid)', 'execute')
    or has_function_privilege('authenticated', 'public.gintaras_erase_user(uuid)', 'execute') as anyone_else_can_erase;
