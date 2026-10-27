-- Gintaras: 10 leagues with 2 divisions each (steps 0-19), and the monthly Sun Cup.
-- Run once in Supabase -> SQL Editor (after league-bars.sql). Replaces the weekly job again.

-- 1. Move from 7 leagues x 3 divisions (0-20) to 10 leagues x 2 divisions (0-19), once.
--    Old leagues keep their place among the new ones (Sand, Pebble, Amber, Silver, Gold, Crystal, Sun -> 1, 2, 4, 5, 6, 7, 10);
--    division I stays division I, divisions III and II become division II.
alter table public.gintaras_meta add column if not exists leagues10 boolean not null default false;
update public.gintaras_profiles
   set league = (array[0,1,3,4,5,6,9])[league / 3 + 1] * 2 + case when league % 3 = 2 then 1 else 0 end,
       last_league = case when last_league is null then null
                          else (array[0,1,3,4,5,6,9])[last_league / 3 + 1] * 2 + case when last_league % 3 = 2 then 1 else 0 end end
 where (select not leagues10 from public.gintaras_meta where id = 1);
update public.gintaras_meta set leagues10 = true where id = 1;

-- 2. The Sun Cup: every month, starting the first Monday. Round 1 is everyone in the Sun league who reached 500 XP
--    that week; the top half (at least 2) go through to round 2, then again to the final in round 3.
--    The final's top 3 are paid amber by their own app; the winner's cup_wins goes up by one.
alter table public.gintaras_profiles add column if not exists cup_wins smallint not null default 0;
create table if not exists public.gintaras_cup (
  cup    date     not null,   -- the first Monday of the cup's month
  round  smallint not null check (round between 1 and 3),
  player uuid     not null references public.gintaras_profiles(id) on delete cascade,
  xp     int,                 -- that round's week XP, filled in when the round is settled
  place  smallint,            -- final only
  primary key (cup, round, player)
);
alter table public.gintaras_cup enable row level security;
revoke all on public.gintaras_cup from anon, authenticated;
grant select on public.gintaras_cup to authenticated;
drop policy if exists "gintaras_cup_read" on public.gintaras_cup;
create policy "gintaras_cup_read" on public.gintaras_cup for select to authenticated using (true);

-- 3. The week change: settles the Sun Cup round that just ended (before anyone moves league), then the leagues
--    (top 3 who reached their league's bar move up a division; no XP moves down unless shielded), then challenges.
--    gintaras_league_settle does the work for a given Monday (so it can be tested on any date); players can only
--    call gintaras_league_rollover, which settles the current week.
create or replace function public.gintaras_league_settle(this_monday date) returns void
language plpgsql security definer set search_path = '' as $$
declare
  last_monday date := this_monday - 7;
  bars int[] := array[150, 175, 200, 250, 275, 300, 350, 400, 450, 500];
  month1 date := date_trunc('month', last_monday)::date;
  cup_start date := month1 + ((8 - extract(isodow from month1)::int) % 7);
  rnd int := (last_monday - cup_start) / 7 + 1;
  cnt int;
  keep int;
  settled date;
begin
  select last_rollover into settled from public.gintaras_meta where id = 1 for update;
  if settled >= this_monday then return; end if;

  -- Sun Cup
  if rnd = 1 then
    insert into public.gintaras_cup (cup, round, player, xp)
      select cup_start, 1, id, week_xp from public.gintaras_profiles
       where league >= 18 and week_start = last_monday and week_xp >= 500
      on conflict do nothing;
  elsif rnd in (2, 3) then
    update public.gintaras_cup c
       set xp = case when p.week_start = last_monday then p.week_xp else 0 end
      from public.gintaras_profiles p
     where c.cup = cup_start and c.round = rnd and p.id = c.player;
  end if;
  if rnd between 1 and 3 then
    select count(*) into cnt from public.gintaras_cup where cup = cup_start and round = rnd;
    if rnd < 3 and cnt >= 2 then
      keep := greatest(2, ceil(cnt / 2.0)::int);
      insert into public.gintaras_cup (cup, round, player)
        select cup_start, rnd + 1, player
          from (select player, xp, rank() over (order by xp desc) as r
                  from public.gintaras_cup where cup = cup_start and round = rnd) x
         where x.r <= keep and x.xp > 0
        on conflict do nothing;
    elsif rnd = 3 then
      update public.gintaras_cup c set place = x.r
        from (select player, rank() over (order by xp desc) as r
                from public.gintaras_cup where cup = cup_start and round = 3 and xp > 0) x
       where c.cup = cup_start and c.round = 3 and c.player = x.player;
      update public.gintaras_profiles p set cup_wins = cup_wins + 1
        from public.gintaras_cup c
       where c.cup = cup_start and c.round = 3 and c.place = 1 and p.id = c.player;
    end if;
  end if;

  -- Leagues
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
           case when wxp > 0 and wxp >= bars[league / 2 + 1] and r <= 3 and league < 19 then 1
                when league > 0 and shield_week is distinct from last_monday and (wxp = 0 or (n >= 10 and r > n - 3)) then -1
                else 0 end as mv
    from ranked
  )
  update public.gintaras_profiles p
     set league = m.league + m.mv, league_moved = m.mv, last_league = m.league,
         last_rank = case when m.wxp > 0 and m.active >= 2 then m.r end
    from moves m
   where p.id = m.id;

  -- Friend challenges
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
revoke all on function public.gintaras_league_settle(date) from public, anon, authenticated;

create or replace function public.gintaras_league_rollover() returns void
language sql security definer set search_path = '' as $$
  select public.gintaras_league_settle(date_trunc('week', now() at time zone 'utc')::date);
$$;
revoke all on function public.gintaras_league_rollover() from public;
grant execute on function public.gintaras_league_rollover() to anon, authenticated;
