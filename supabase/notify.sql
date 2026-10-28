-- Gintaras notifications: "someone passed you", challenge updates and study-time reminders, in the app and on the phone.
-- Run once in Supabase -> SQL Editor (after challenge-rules.sql). Adds new tables and jobs; changes no player data.
-- The phone part needs the gintaras-push Edge Function and the app's key pair in the vault (see notify-keys, run separately).
create extension if not exists pg_net;
create extension if not exists pg_cron;

-- 1. Each player's choices: when they plan to study (their own clock), and which notifications they want.
create table if not exists public.gintaras_notify (
  user_id    uuid primary key default auth.uid() references auth.users(id) on delete cascade,
  study_time text check (study_time ~ '^\d{2}:\d{2}$'),
  tz         text,
  rank       boolean not null default true,
  challenge  boolean not null default true,
  study      boolean not null default true,
  last_study date,
  updated_at timestamptz not null default now()
);
alter table public.gintaras_notify enable row level security;
revoke all on public.gintaras_notify from anon, authenticated;
grant select, insert, update (user_id, study_time, tz, rank, challenge, study, updated_at) on public.gintaras_notify to authenticated;
-- (user_id is in the update list because saving is an upsert; the policy still only allows your own row.)
drop policy if exists "gintaras_notify_own" on public.gintaras_notify;
create policy "gintaras_notify_own" on public.gintaras_notify for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 2. Where to send phone notifications: one row per phone or browser that said yes.
create table if not exists public.gintaras_push_subs (
  endpoint   text primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  p256dh     text not null,
  auth       text not null,
  created_at timestamptz not null default now()
);
alter table public.gintaras_push_subs enable row level security;
revoke all on public.gintaras_push_subs from anon, authenticated;
-- A phone is saved (or moved to whoever is signed in on it now) only through this function.
create or replace function public.gintaras_push_save(ep text, key text, au text) returns void
language sql security definer set search_path = '' as $$
  insert into public.gintaras_push_subs (endpoint, user_id, p256dh, auth) values (ep, auth.uid(), key, au)
  on conflict (endpoint) do update set user_id = auth.uid(), p256dh = excluded.p256dh, auth = excluded.auth, created_at = now();
$$;
create or replace function public.gintaras_push_drop(ep text) returns void
language sql security definer set search_path = '' as $$
  delete from public.gintaras_push_subs where endpoint = ep and user_id = auth.uid();
$$;
revoke all on function public.gintaras_push_save(text, text, text) from public, anon;
revoke all on function public.gintaras_push_drop(text) from public, anon;
grant execute on function public.gintaras_push_save(text, text, text) to authenticated;
grant execute on function public.gintaras_push_drop(text) to authenticated;

-- 3. The messages themselves. The app shows unseen ones when it opens; new ones are also sent to the phone.
create table if not exists public.gintaras_notes (
  id         bigint generated always as identity primary key,
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('rank', 'challenge', 'study')),
  title      text not null,
  body       text not null,
  created_at timestamptz not null default now(),
  seen       boolean not null default false,
  pushed     boolean not null default false
);
create index if not exists gintaras_notes_user on public.gintaras_notes (user_id, created_at desc);
alter table public.gintaras_notes enable row level security;
revoke all on public.gintaras_notes from anon, authenticated;
grant select on public.gintaras_notes to authenticated;
grant update (seen) on public.gintaras_notes to authenticated;
drop policy if exists "gintaras_notes_own" on public.gintaras_notes;
create policy "gintaras_notes_own" on public.gintaras_notes for select to authenticated using (user_id = auth.uid());
drop policy if exists "gintaras_notes_seen" on public.gintaras_notes;
create policy "gintaras_notes_seen" on public.gintaras_notes for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Adds a message, unless the player turned that kind off. "Passed you" messages are kept to one every
-- 30 minutes: a newer one replaces the text of the last one instead of buzzing the phone again.
create or replace function public.gintaras_note_add(who uuid, k text, t text, b text) returns void
language plpgsql security definer set search_path = '' as $$
declare recent bigint;
begin
  if exists (select 1 from public.gintaras_notify n where n.user_id = who
               and ((k = 'rank' and not n.rank) or (k = 'challenge' and not n.challenge) or (k = 'study' and not n.study))) then
    return;
  end if;
  if k in ('rank', 'challenge') then
    select id into recent from public.gintaras_notes
     where user_id = who and kind = k and created_at > now() - interval '30 minutes' order by created_at desc limit 1;
    if recent is not null then
      update public.gintaras_notes set title = t, body = b, seen = false where id = recent;
      return;
    end if;
  end if;
  insert into public.gintaras_notes (user_id, kind, title, body) values (who, k, t, b);
end;
$$;
revoke all on function public.gintaras_note_add(uuid, text, text, text) from public, anon, authenticated;

-- A new message goes to the phone through the gintaras-push Edge Function (only if that player has a phone saved).
-- The publishable key below is the same public key the app itself ships in config.js.
create or replace function public.gintaras_note_push() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if exists (select 1 from public.gintaras_push_subs where user_id = new.user_id) then
    perform net.http_post(url := 'https://jwafxaaaadojafquvhrw.supabase.co/functions/v1/gintaras-push',
                          body := jsonb_build_object('note_id', new.id),
                          -- The app's public (publishable) key: the function keeps its sign-in check on.
                          headers := jsonb_build_object('Content-Type', 'application/json',
                                       'Authorization', 'Bearer sb_publishable_6o-DhCADvScV1OfXqR5Seg_d2sdOrHB',
                                       'apikey', 'sb_publishable_6o-DhCADvScV1OfXqR5Seg_d2sdOrHB'));
  end if;
  return new;
exception when others then
  return new;
end;
$$;
drop trigger if exists gintaras_note_push on public.gintaras_notes;
create trigger gintaras_note_push after insert on public.gintaras_notes
  for each row execute function public.gintaras_note_push();

-- 4. When a player's week XP goes up, tell everyone they just passed (same league, same week),
--    and tell a challenge rival when they've been overtaken. Never blocks the save itself.
create or replace function public.gintaras_passed() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  was int := case when old.week_start = new.week_start then coalesce(old.week_xp, 0) else 0 end;
  names text[] := array['Smėlis', 'Akmenėlis', 'Varis', 'Gintaras', 'Sidabras', 'Auksas', 'Krištolas', 'Mėnulis', 'Žvaigždė', 'Saulė'];
  lname text;
  r record;
  rk int;
  rivals uuid[] := '{}';
begin
  if coalesce(new.week_xp, 0) <= was then return new; end if;
  -- Challenge rivals this week who were ahead (or level) and are now behind.
  for r in select p.id, p.week_xp from public.gintaras_challenges c
             join public.gintaras_profiles p on p.id = case when c.from_id = new.id then c.to_id else c.from_id end
            where c.status = 'accepted' and c.week_start = new.week_start and new.id in (c.from_id, c.to_id)
              and p.week_start = new.week_start and p.week_xp >= was and p.week_xp > 0 and p.week_xp < new.week_xp loop
    perform public.gintaras_note_add(r.id, 'challenge', '⚔️ Your challenge',
      new.nickname || ' is beating you now: ' || new.week_xp || ' to ' || r.week_xp || ' XP. Catch up before Sunday night!');
    rivals := rivals || r.id;
  end loop;
  -- Everyone in the same league they just passed.
  lname := names[floor(coalesce(new.league, 0) / 2)::int + 1] || case when coalesce(new.league, 0) % 2 = 0 then ' II' else ' I' end;
  for r in select p.id, p.week_xp from public.gintaras_profiles p
            where p.league = new.league and p.week_start = new.week_start and p.id <> new.id
              and p.week_xp >= was and p.week_xp > 0 and p.week_xp < new.week_xp loop
    continue when r.id = any(rivals);
    select 1 + count(*) into rk from public.gintaras_profiles q
     where q.league = new.league and q.week_start = new.week_start and q.week_xp > r.week_xp;
    perform public.gintaras_note_add(r.id, 'rank', '🏆 League update',
      case when rk = 4 then new.nickname || ' pushed you out of the top 3 in ' || lname || '. You''re #4 now. Win it back!'
           else new.nickname || ' just passed you. You''re #' || rk || ' in ' || lname || ' now.' end);
  end loop;
  return new;
exception when others then
  return new;
end;
$$;
drop trigger if exists gintaras_passed on public.gintaras_profiles;
create trigger gintaras_passed after update of week_xp on public.gintaras_profiles
  for each row execute function public.gintaras_passed();

-- 5. Study-time reminders: every 5 minutes, anyone whose chosen time has just come (on their own clock)
--    gets one reminder that day, unless they've already finished their learning day.
create or replace function public.gintaras_study_tick() returns void
language plpgsql security definer set search_path = '' as $$
declare n record; here timestamp; st jsonb; xp int; goal int; mins int;
begin
  for n in select * from public.gintaras_notify where study and study_time is not null and tz is not null loop
    begin
      here := now() at time zone n.tz;
      continue when here::time < n.study_time::time or here::time >= n.study_time::time + interval '30 minutes'
                 or n.last_study >= here::date;
      update public.gintaras_notify set last_study = here::date where user_id = n.user_id;
      select g.state into st from public.gintaras_progress g where g.user_id = n.user_id;
      goal := coalesce((st ->> 'goal')::int, 70);
      xp := case when st ->> 'todayDate' = here::date::text then coalesce((st ->> 'todayXp')::int, 0) else 0 end;
      mins := coalesce(nullif(regexp_replace(coalesce(st ->> 'pace', ''), '\D', '', 'g'), '')::int, 10);
      continue when xp >= goal;
      perform public.gintaras_note_add(n.user_id, 'study', '📚 Study time',
        case when xp > 0 then 'Hey, it''s study time! You''re at ' || xp || ' of ' || goal || ' XP today.'
             else 'Hey, it''s study time! Today''s goal: ' || goal || ' XP and ' || mins || ' minutes.' end);
    exception when others then
      null;
    end;
  end loop;
end;
$$;
revoke all on function public.gintaras_study_tick() from public, anon, authenticated;
select cron.unschedule('gintaras-study') where exists (select 1 from cron.job where jobname = 'gintaras-study');
select cron.schedule('gintaras-study', '*/5 * * * *', 'select public.gintaras_study_tick()');

-- 6. The Edge Function reads the app's notification key pair from here (only the server can).
create or replace function public.gintaras_vapid() returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object('public', (select decrypted_secret from vault.decrypted_secrets where name = 'gintaras_vapid_public'),
                            'private', (select decrypted_secret from vault.decrypted_secrets where name = 'gintaras_vapid_private'));
$$;
revoke all on function public.gintaras_vapid() from public, anon, authenticated;
grant execute on function public.gintaras_vapid() to service_role;
