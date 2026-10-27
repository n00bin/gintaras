-- Gintaras perks: your look (avatar colour, frame, title) is shown to everyone on the leaderboard.
-- Run once in Supabase -> SQL Editor (after leagues.sql). Amber itself lives in saved progress, like XP.
alter table public.gintaras_profiles add column if not exists look text;
alter table public.gintaras_profiles drop constraint if exists gintaras_profiles_look_len;
alter table public.gintaras_profiles add constraint gintaras_profiles_look_len check (look is null or char_length(look) <= 60);
grant insert (look) on public.gintaras_profiles to authenticated;
grant update (look) on public.gintaras_profiles to authenticated;
