-- Wordami: stop problem reports being flooded (2026-11-12). Run in Supabase -> SQL Editor. Safe to run again.
-- A real learner never gets near these limits. A report over a limit isn't lost: it waits on the device and is
-- sent later, the same as when there is no internet.
--   * 20 an hour from one internet address
--   * 20 an hour from one account
--   * 300 an hour from everyone together
--   * at most 3000 reports waiting for you to look at them
-- To count per internet address without keeping it, the address is scrambled with a secret and the scrambled
-- form is kept for one hour only. Reports you mark Fixed or Ignore are deleted 90 days later.
-- These two helper tables are named wordami_*, so the nightly backup (which copies gintaras_* rows) leaves them out.
begin;

create table if not exists public.wordami_report_salt (
  id   int primary key default 1 check (id = 1),
  salt text not null
);
alter table public.wordami_report_salt enable row level security;
revoke all on public.wordami_report_salt from public, anon, authenticated;

create table if not exists public.wordami_report_gate (
  addr text not null,
  at   timestamptz not null default now()
);
create index if not exists wordami_report_gate_addr_at on public.wordami_report_gate (addr, at);
alter table public.wordami_report_gate enable row level security;
revoke all on public.wordami_report_gate from public, anon, authenticated;
-- The nightly backup copies the structure of every table, so its read-only login must be able to read these too
-- (it copies no rows from them), or it stops on purpose at the first table it can't read.
do $$ begin
  if exists (select 1 from pg_roles where rolname = 'wordami_backup') then
    grant select on public.wordami_report_salt, public.wordami_report_gate to wordami_backup;
  end if;
end $$;

create or replace function public.gintaras_report_limit() returns trigger
language plpgsql security definer set search_path = '' as $$
declare h json; ip text; s text; a text;
begin
  if (select count(*) from public.gintaras_reports where status = 'open') >= 3000 then
    raise exception 'report limit: too many open reports' using hint = 'It will be sent later.';
  end if;
  if (select count(*) from public.gintaras_reports where created_at > now() - interval '1 hour') >= 300 then
    raise exception 'report limit: too many reports this hour' using hint = 'It will be sent later.';
  end if;
  if new.user_id is not null and (select count(*) from public.gintaras_reports
      where user_id = new.user_id and created_at > now() - interval '1 hour') >= 20 then
    raise exception 'report limit: too many reports from this account this hour' using hint = 'It will be sent later.';
  end if;
  -- The sender's internet address, as the server saw it. Missing when run from the SQL Editor: then this check is skipped.
  begin
    h := nullif(current_setting('request.headers', true), '')::json;
  exception when others then
    h := null;
  end;
  ip := nullif(trim(coalesce(h ->> 'cf-connecting-ip', split_part(coalesce(h ->> 'x-forwarded-for', ''), ',', 1))), '');
  if ip is not null then
    select salt into s from public.wordami_report_salt where id = 1;
    if s is null then
      insert into public.wordami_report_salt (id, salt) values (1, gen_random_uuid()::text || gen_random_uuid()::text)
        on conflict (id) do nothing;
      select salt into s from public.wordami_report_salt where id = 1;
    end if;
    a := encode(sha256(convert_to(s || ip, 'UTF8')), 'hex');
    delete from public.wordami_report_gate where at < now() - interval '1 hour';
    if (select count(*) from public.wordami_report_gate where addr = a) >= 20 then
      raise exception 'report limit: too many reports from this address this hour' using hint = 'It will be sent later.';
    end if;
    insert into public.wordami_report_gate (addr) values (a);
  end if;
  return new;
end;
$$;
revoke all on function public.gintaras_report_limit() from public, anon, authenticated;
drop trigger if exists gintaras_report_limit on public.gintaras_reports;
create trigger gintaras_report_limit before insert on public.gintaras_reports
  for each row execute function public.gintaras_report_limit();

-- Every night: delete reports dealt with more than 90 days ago, and any scrambled addresses older than an hour.
create or replace function public.gintaras_reports_tidy() returns void
language sql security definer set search_path = '' as $$
  delete from public.gintaras_reports where status in ('fixed', 'ignored') and created_at < now() - interval '90 days';
  delete from public.wordami_report_gate where at < now() - interval '1 hour';
$$;
revoke all on function public.gintaras_reports_tidy() from public, anon, authenticated;
select cron.unschedule('gintaras-reports-tidy') where exists (select 1 from cron.job where jobname = 'gintaras-reports-tidy');
select cron.schedule('gintaras-reports-tidy', '47 2 * * *', 'select public.gintaras_reports_tidy()');

commit;

select 'done' as result,
  (select count(*) from public.gintaras_reports) as reports_now,
  exists (select 1 from pg_trigger where tgname = 'gintaras_report_limit' and not tgisinternal) as limits_on,
  (has_table_privilege('anon', 'public.wordami_report_gate', 'select')
    or has_table_privilege('anon', 'public.wordami_report_salt', 'select')
    or has_table_privilege('authenticated', 'public.wordami_report_salt', 'select')) as anyone_else_can_read_helpers;
