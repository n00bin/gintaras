-- Gintaras: run this once in Supabase → SQL Editor → New query → Run.

-- Public leaderboard rows. One per signed-in person.
create table if not exists public.gintaras_profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  nickname    text not null check (char_length(nickname) between 2 and 20),
  xp          integer not null default 0,
  streak      integer not null default 0,
  week_xp     integer not null default 0,
  week_start  date,
  level_title text,
  updated_at  timestamptz not null default now()
);
create unique index if not exists gintaras_profiles_nickname_lower on public.gintaras_profiles (lower(nickname));

-- Private saved progress. Only the owner can read or write it.
create table if not exists public.gintaras_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  state      jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.gintaras_profiles enable row level security;
alter table public.gintaras_progress enable row level security;

drop policy if exists "gintaras_profiles_public_read" on public.gintaras_profiles;
create policy "gintaras_profiles_public_read" on public.gintaras_profiles for select using (true);
drop policy if exists "gintaras_profiles_own_insert" on public.gintaras_profiles;
create policy "gintaras_profiles_own_insert" on public.gintaras_profiles for insert with check (auth.uid() = id);
drop policy if exists "gintaras_profiles_own_update" on public.gintaras_profiles;
create policy "gintaras_profiles_own_update" on public.gintaras_profiles for update using (auth.uid() = id);

drop policy if exists "gintaras_progress_own_all" on public.gintaras_progress;
create policy "gintaras_progress_own_all" on public.gintaras_progress for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Lets a signed-in player delete their own account (and, through the cascades above, their nickname and saved progress).
-- It can only ever delete the caller: auth.uid() is the signed-in user.
create or replace function public.gintaras_delete_account() returns void
language plpgsql security definer set search_path = '' as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  delete from auth.users where id = auth.uid();
end;
$$;
revoke all on function public.gintaras_delete_account() from public, anon;
grant execute on function public.gintaras_delete_account() to authenticated;
