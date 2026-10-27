-- Gintaras: one XP bar per league that everyone must reach to move up (rising as leagues get higher).
-- Run once in Supabase -> SQL Editor (after divisions.sql). Replaces the weekly job again; changes no player data.
--   Sand 150 · Pebble 200 · Amber 250 · Silver 300 · Gold 350 · Crystal 425 · Sun 500 XP in a week,
--   the same for all three divisions of a league. Top 3 still; no XP still moves you down (unless shielded).
create or replace function public.gintaras_league_rollover() returns void
language plpgsql security definer set search_path = '' as $$
declare
  this_monday date := date_trunc('week', now() at time zone 'utc')::date;
  last_monday date := this_monday - 7;
  bars int[] := array[150, 200, 250, 300, 350, 425, 500];
  settled date;
begin
  select last_rollover into settled from public.gintaras_meta where id = 1 for update;
  if settled >= this_monday then return; end if;

  with wk as (
    select id, league, shield_week,
           case when week_start = last_monday then week_xp else 0 end as wxp
    from public.gintaras_profiles
  ), ranked as (
    select id, league, wxp, shield_week,
           rank() over (partition by league order by wxp desc) as r,
           count(*) over (partition by league) as n,
           count(*) filter (where wxp > 0) over (partition by league) as active
    from wk
  ), moves as (
    select id, league, r, active, wxp,
           case when wxp > 0 and wxp >= bars[league / 3 + 1] and r <= 3 and league < 20 then 1
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
