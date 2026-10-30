-- Every review answer, kept with the account (2026-10-30), so the FSRS scheduler can later be fitted to how each learner forgets,
-- and so answers given on different devices end up in one history. Adds one table; nothing existing is changed.
-- Each row: which word or reply card, when, the grade (1 wrong, 2 right but sloppy / hard, 3 right, 4 easy), how many days
-- overdue it was, and its level at the time. Only the owner can read or add their own rows; deleting the account deletes them.
begin;

create table public.gintaras_review_log (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  lang text not null check (lang ~ '^[a-z]{2}$'),
  item text not null check (length(item) between 1 and 80),
  at timestamptz not null,
  grade smallint not null check (grade between 1 and 4),
  overdue smallint check (overdue between -3650 and 3650),
  lvl smallint check (lvl between 0 and 20),
  unique (user_id, lang, item, at)
);
create index gintaras_review_log_user on public.gintaras_review_log (user_id, lang, at);

alter table public.gintaras_review_log enable row level security;
create policy gintaras_review_log_read on public.gintaras_review_log for select to authenticated using (user_id = auth.uid());
create policy gintaras_review_log_add on public.gintaras_review_log for insert to authenticated with check (user_id = auth.uid());

revoke all on public.gintaras_review_log from anon, authenticated;
grant select on public.gintaras_review_log to authenticated;
grant insert (lang, item, at, grade, overdue, lvl) on public.gintaras_review_log to authenticated;

commit;

select 'done' as result, (select count(*) from public.gintaras_review_log) as rows,
       (select string_agg(policyname, ', ') from pg_policies where tablename = 'gintaras_review_log') as policies;
