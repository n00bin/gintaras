-- Gintaras weekly leagues. Run once in Supabase → SQL Editor (after schema.sql).

-- 1. Every player has a league (0 = Sand ... 6 = Sun) and how they moved at the last week change (+1, 0, -1).
alter table public.gintaras_profiles add column if not exists league smallint not null default 0;
alter table public.gintaras_profiles add column if not exists league_moved smallint not null default 0;

-- 2. Players may write their own nickname and XP, but never their league: only the weekly job below changes it.
revoke insert, update on public.gintaras_profiles from anon, authenticated;
grant insert (id, nickname, xp, streak, week_xp, week_start, level_title, updated_at) on public.gintaras_profiles to authenticated;
-- id is included because "insert or update" (upsert) rewrites it; the policy below keeps it equal to the signed-in player.
grant update (id, nickname, xp, streak, week_xp, week_start, level_title, updated_at) on public.gintaras_profiles to authenticated;
drop policy if exists "gintaras_profiles_own_update" on public.gintaras_profiles;
create policy "gintaras_profiles_own_update" on public.gintaras_profiles for update using (auth.uid() = id) with check (auth.uid() = id);

-- 3. Remembers which week was last settled, so the week change happens exactly once.
create table if not exists public.gintaras_meta (id int primary key default 1, last_rollover date not null default '2000-01-01');
insert into public.gintaras_meta (id) values (1) on conflict (id) do nothing;
alter table public.gintaras_meta enable row level security;

-- 4. The week change. Anyone's app may call it; it does nothing until a new week has started, then settles last week once:
--    top 3 with XP move up; anyone with no XP moves down; in leagues of 10 or more, the bottom 3 move down too.
create or replace function public.gintaras_league_rollover() returns void
language plpgsql security definer set search_path = '' as $$
declare
  this_monday date := date_trunc('week', now() at time zone 'utc')::date;
  last_monday date := this_monday - 7;
  settled date;
begin
  select last_rollover into settled from public.gintaras_meta where id = 1 for update;
  if settled >= this_monday then return; end if;

  with wk as (
    select id, league, case when week_start = last_monday then week_xp else 0 end as wxp
    from public.gintaras_profiles
  ), ranked as (
    select id, league, wxp,
           rank() over (partition by league order by wxp desc) as r,
           count(*) over (partition by league) as n
    from wk
  ), moves as (
    select id, league,
           case when wxp > 0 and r <= 3 and league < 6 then 1
                when league > 0 and (wxp = 0 or (n >= 10 and r > n - 3)) then -1
                else 0 end as mv
    from ranked
  )
  update public.gintaras_profiles p
     set league = m.league + m.mv, league_moved = m.mv
    from moves m
   where p.id = m.id;

  update public.gintaras_meta set last_rollover = this_monday where id = 1;
end;
$$;
revoke all on function public.gintaras_league_rollover() from public;
grant execute on function public.gintaras_league_rollover() to anon, authenticated;

-- Start counting from this week (nothing to settle yet).
update public.gintaras_meta set last_rollover = date_trunc('week', now() at time zone 'utc')::date where id = 1;
