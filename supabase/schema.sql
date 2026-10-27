-- Gintaras: run this once in Supabase → SQL Editor → New query → Run.

-- Public leaderboard rows. One per signed-in person.
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nickname    text not null check (char_length(nickname) between 2 and 20),
  xp          integer not null default 0,
  streak      integer not null default 0,
  week_xp     integer not null default 0,
  week_start  date,
  level_title text,
  updated_at  timestamptz not null default now()
);
create unique index if not exists profiles_nickname_lower on public.profiles (lower(nickname));

-- Private saved progress. Only the owner can read or write it.
create table if not exists public.progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.progress enable row level security;

drop policy if exists "profiles_public_read" on public.profiles;
create policy "profiles_public_read" on public.profiles for select using (true);
drop policy if exists "profiles_own_insert" on public.profiles;
create policy "profiles_own_insert" on public.profiles for insert with check (auth.uid() = id);
drop policy if exists "profiles_own_update" on public.profiles;
create policy "profiles_own_update" on public.profiles for update using (auth.uid() = id);

drop policy if exists "progress_own_all" on public.progress;
create policy "progress_own_all" on public.progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
