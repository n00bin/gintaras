-- Gintaras fresh start (2026-10-30). Run once in Supabase -> SQL Editor, after app 3.64 is live.
-- Everyone starts again from lesson 1, keeping their XP, streak, amber, league, badges, About me and settings.
-- The two judge test accounts are reset to zero (logins kept). Everything is backed up first, inside the same transaction.
begin;

-- 1. Backups of everything this touches (protected like the earlier backups: row security on, no policies).
create table public.gintaras_progress_backup_20261030b as table public.gintaras_progress;
create table public.gintaras_lang_progress_backup_20261030b as table public.gintaras_lang_progress;
create table public.gintaras_profiles_backup_20261030b as table public.gintaras_profiles;
create table public.gintaras_players_backup_20261030b as table public.gintaras_players;
create table public.gintaras_review_log_backup_20261030b as table public.gintaras_review_log;
create table public.gintaras_challenges_backup_20261030b as table public.gintaras_challenges;
create table public.gintaras_shared_backup_20261030b as table public.gintaras_shared;
create table public.gintaras_cup_backup_20261030b as table public.gintaras_cup;
alter table public.gintaras_progress_backup_20261030b enable row level security;
alter table public.gintaras_lang_progress_backup_20261030b enable row level security;
alter table public.gintaras_profiles_backup_20261030b enable row level security;
alter table public.gintaras_players_backup_20261030b enable row level security;
alter table public.gintaras_review_log_backup_20261030b enable row level security;
alter table public.gintaras_challenges_backup_20261030b enable row level security;
alter table public.gintaras_shared_backup_20261030b enable row level security;
alter table public.gintaras_cup_backup_20261030b enable row level security;

create temporary table judges on commit drop as
  select id from auth.users where email in ('judge1.gintaras.test@example.com', 'judge2.gintaras.test@example.com');

-- 2. Everyone else: the learning history leaves their saved copy; XP and everything earned stay.
--    (App 3.64 does the same on every device, so an old phone can't bring it back.)
update public.gintaras_progress
   set state = state - array['items','lessons','lessonsDone','convs','replies','repliesSeeded','checks','placedTo','placeDone',
                             'speakDone','perfects','perfectToday','drillDay','reviewDay','gateDay','gateLater','qcAnyDay']
 where user_id not in (select id from judges);
update public.gintaras_lang_progress
   set state = state - array['items','lessons','lessonsDone','convs','replies','repliesSeeded','checks','placedTo','placeDone',
                             'speakDone','perfects','perfectToday','drillDay','reviewDay','gateDay','gateLater','qcAnyDay']
 where user_id not in (select id from judges);

-- 3. The answer log starts clean for everyone, so FSRS learns only from the new course.
delete from public.gintaras_review_log;

-- 4. Judges: back to a brand-new account (the "wipe" mark makes the app drop any older copy on their devices).
update public.gintaras_progress set state = jsonb_build_object('epoch', 2, 'wipe', '2026-10-30-judges'), updated_at = now()
 where user_id in (select id from judges);
delete from public.gintaras_lang_progress where user_id in (select id from judges);
delete from public.gintaras_shared where user_id in (select id from judges);
update public.gintaras_profiles set xp = 0, streak = 0, week_xp = 0, league = 0, league_moved = 0, last_rank = null, last_league = null,
       shield_week = null, cup_wins = 0, level_title = null, updated_at = now()
 where id in (select id from judges);
update public.gintaras_players set xp = 0, streak = 0, week_xp = 0, league = 0, league_moved = 0, last_rank = null, last_league = null,
       shield_week = null, cup_wins = 0, level_title = null, updated_at = now()
 where user_id in (select id from judges);
delete from public.gintaras_challenges where from_id in (select id from judges) or to_id in (select id from judges);
delete from public.gintaras_cup where player in (select id from judges);
delete from public.gintaras_notes where user_id in (select id from judges);

commit;

-- 5. The result.
with j as (select id from auth.users where email in ('judge1.gintaras.test@example.com', 'judge2.gintaras.test@example.com'))
select 'done' as result,
  (select count(*) from j) as judges_found,
  (select count(*) from public.gintaras_progress where state ? 'items') as copies_with_history,
  (select count(*) from public.gintaras_review_log) as log_rows,
  (select sum((state ->> 'xp')::int) from public.gintaras_progress where user_id not in (select id from j)) as xp_kept,
  (select sum((state ->> 'xp')::int) from public.gintaras_progress_backup_20261030b where user_id not in (select id from j)) as xp_before,
  (select string_agg(nickname || ' ' || xp, ', ') from public.gintaras_profiles where id in (select id from j)) as judges_now;
