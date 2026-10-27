-- Gintaras league divisions, a minimum to move up, position bonuses and the Sun crown.
-- Run once in Supabase -> SQL Editor (after leagues.sql and perks.sql). This file replaces the weekly job again.

-- 1. Each league now has three divisions (III, II, I), so "league" becomes a step from 0 (Sand III) to 20 (Sun I).
--    Existing players start in division III of the league they were in. The meta flag makes this happen only once.
alter table public.gintaras_meta add column if not exists divisions boolean not null default false;
update public.gintaras_profiles set league = league * 3 where (select not divisions from public.gintaras_meta where id = 1);
update public.gintaras_meta set divisions = true where id = 1;

-- 2. Each player's daily XP goal (from their pace), so moving up can need 5 days' worth of it.
--    Where each player finished last week, so their app can pay the position bonus.
alter table public.gintaras_profiles add column if not exists daily_goal smallint not null default 40;
alter table public.gintaras_profiles add column if not exists last_rank smallint;
alter table public.gintaras_profiles add column if not exists last_league smallint;
grant insert (daily_goal) on public.gintaras_profiles to authenticated;
grant update (daily_goal) on public.gintaras_profiles to authenticated;

-- 3. The week change. Top 3 move up one division, but only with at least 5 days of their daily goal that week
--    (goal capped between 20 and 240, so nobody can set it to 0). No XP, or the bottom 3 in a group of 10+, moves down
--    one division unless shielded. last_rank is only kept when at least 2 players in the group earned XP.
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
    select id, league, shield_week, least(greatest(daily_goal, 20), 240) as goal,
           case when week_start = last_monday then week_xp else 0 end as wxp
    from public.gintaras_profiles
  ), ranked as (
    select id, league, wxp, goal, shield_week,
           rank() over (partition by league order by wxp desc) as r,
           count(*) over (partition by league) as n,
           count(*) filter (where wxp > 0) over (partition by league) as active
    from wk
  ), moves as (
    select id, league, r, active, wxp,
           case when wxp > 0 and wxp >= goal * 5 and r <= 3 and league < 20 then 1
                when league > 0 and shield_week is distinct from last_monday and (wxp = 0 or (n >= 10 and r > n - 3)) then -1
                else 0 end as mv
    from ranked
  )
  update public.gintaras_profiles p
     set league = m.league + m.mv, league_moved = m.mv, last_league = m.league,
         last_rank = case when m.wxp > 0 and m.active >= 2 then m.r end
    from moves m
   where p.id = m.id;

  update public.gintaras_challenges set status = 'expired' where status = 'pending' and week_start < this_monday;
  update public.gintaras_challenges ch
     set status = 'settled', from_xp = x.fx, to_xp = x.tx,
         winner = case when x.fx > x.tx then ch.from_id when x.tx > x.fx then ch.to_id end
    from (select c.id,
                 coalesce((select case when p.week_start = c.week_start then p.week_xp else 0 end from public.gintaras_profiles p where p.id = c.from_id), 0) as fx,
                 coalesce((select case when p.week_start = c.week_start then p.week_xp else 0 end from public.gintaras_profiles p where p.id = c.to_id), 0) as tx
            from public.gintaras_challenges c
           where c.status = 'accepted' and c.week_start < this_monday) x
   where ch.id = x.id;

  update public.gintaras_meta set last_rollover = this_monday where id = 1;
end;
$$;
revoke all on function public.gintaras_league_rollover() from public;
grant execute on function public.gintaras_league_rollover() to anon, authenticated;
