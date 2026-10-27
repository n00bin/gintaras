-- Gintaras problem reports ("flag this card"). Run once in Supabase → SQL Editor.
-- Anyone can send a report (signed in or not). Only the app owner can read them and mark them fixed.

create table if not exists public.gintaras_reports (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id    uuid default auth.uid(),
  reason     text not null check (char_length(reason) between 1 and 40),
  note       text check (note is null or char_length(note) <= 500),
  context    jsonb not null check (pg_column_size(context) < 4000),
  status     text not null default 'open' check (status in ('open', 'fixed', 'ignored'))
);
alter table public.gintaras_reports enable row level security;

revoke all on public.gintaras_reports from anon, authenticated;
grant insert (reason, note, context) on public.gintaras_reports to anon, authenticated;
grant select, update (status) on public.gintaras_reports to authenticated;

-- Sending: anyone; a signed-in sender is recorded as themselves, never as someone else.
drop policy if exists "gintaras_reports_send" on public.gintaras_reports;
create policy "gintaras_reports_send" on public.gintaras_reports for insert to anon, authenticated
  with check (user_id is null or user_id = auth.uid());

-- Reading and marking fixed: only the owner's account.
drop policy if exists "gintaras_reports_owner_read" on public.gintaras_reports;
create policy "gintaras_reports_owner_read" on public.gintaras_reports for select to authenticated
  using ((auth.jwt() ->> 'email') = 'n00binhard@gmail.com');
drop policy if exists "gintaras_reports_owner_update" on public.gintaras_reports;
create policy "gintaras_reports_owner_update" on public.gintaras_reports for update to authenticated
  using ((auth.jwt() ->> 'email') = 'n00binhard@gmail.com') with check ((auth.jwt() ->> 'email') = 'n00binhard@gmail.com');
