-- Gintaras: the weekly settle-up can't be jammed by one player's damaged saved data.
-- Run once in Supabase -> SQL Editor (after bar-watcher.sql). Same weekly job as bar-watcher.sql, except:
--   * a lesson time that isn't a number counts as 0, and
--   * if working out the bar adjustment fails for any reason, the bars stay as they are and the week still settles.
-- Changes no player data.
create or replace function public.gintaras_league_settle(this_monday date) returns void
language plpgsql security definer set search_path = '' as $$
declare
  last_monday date := this_monday - 7;
  base int[] := array[150, 175, 200, 250, 275, 300, 350, 400, 450, 500];
  bars int[];
  sc numeric;
  n_ok int;
  med numeric;
  new_sc numeric;
  month1 date := date_trunc('month', last_monday)::date;
  cup_start date := month1 + ((8 - extract(isodow from month1)::int) % 7);
  rnd int := (last_monday - cup_start) / 7 + 1;
  cnt int;
  keep int;
  settled date;
begin
  select last_rollover into settled from public.gintaras_meta where id = 1 for update;
  if settled >= this_monday then return; end if;
  -- Last week was played with the bars that were showing all week: today's scale, rounded to 5s.
  select bar_scale into sc from public.gintaras_meta where id = 1;
  bars := array(select (round(x * sc / 5.0) * 5)::int from unnest(base) with ordinality as t(x, i) order by i);

  -- Sun Cup
  if rnd = 1 then
    insert into public.gintaras_cup (cup, round, player, xp)
      select cup_start, 1, id, week_xp from public.gintaras_profiles
       where league >= 18 and week_start = last_monday and week_xp >= bars[10]
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

  -- The bar watcher: sets next week's bars from how fast people really earned XP last week.
  -- Each player's rate is their week XP per minute in lessons; the middle (median) rate of players with at least
  -- 30 minutes counts, and only when there are 3 or more of them. The bars follow it from a base of 7 XP a minute,
  -- moving at most 10% a week and staying between two thirds and 1.6 times the base (Sand 100 to Sun 800).
  begin
  select count(*), percentile_cont(0.5) within group (order by pl.xp / (pl.secs / 60.0))
    into n_ok, med
    from (select p.week_xp as xp,
                 (select coalesce(sum(case when e.value ~ '^\d{1,9}(\.\d+)?$' then e.value::numeric else 0 end), 0) from jsonb_each_text(coalesce(g.state -> 'ltime', '{}'::jsonb)) e
                   where (case when e.key ~ '^\d{4}-\d{2}-\d{2}$' then e.key::date end) between last_monday and last_monday + 6) as secs
            from public.gintaras_profiles p join public.gintaras_progress g on g.user_id = p.id
           where p.week_start = last_monday and p.week_xp > 0) pl
   where pl.secs >= 1800;
  if n_ok >= 3 then
    new_sc := least(greatest(med / 7.0, sc * 0.9), sc * 1.1);
    new_sc := round(least(greatest(new_sc, 0.667), 1.6), 3);
  else
    new_sc := sc;
  end if;
  exception when others then
    new_sc := sc;  -- a damaged saved lesson time never stops the week from being settled; the bars just stay put
  end;
  update public.gintaras_meta set bar_scale = new_sc where id = 1;
  insert into public.gintaras_bar_log (week, players, median_rate, old_scale, new_scale, bars)
    values (this_monday, n_ok, round(med, 2), sc, new_sc,
            array(select (round(x * new_sc / 5.0) * 5)::int from unnest(base) with ordinality as t(x, i) order by i))
    on conflict (week) do nothing;

  update public.gintaras_meta set last_rollover = this_monday where id = 1;
end;
$$;
revoke all on function public.gintaras_league_settle(date) from public, anon, authenticated;

-- The app now pays last week's league result only once this week's settle-up has a log line. This week (26 Oct 2026)
-- was settled before the log existed, so it gets a line too (bars unchanged), for anyone who hasn't opened the app since.
insert into public.gintaras_bar_log (week, players, median_rate, old_scale, new_scale, bars)
  select m.last_rollover, 0, null, m.bar_scale, m.bar_scale,
         array(select (round(x * m.bar_scale / 5.0) * 5)::int
                 from unnest(array[150, 175, 200, 250, 275, 300, 350, 400, 450, 500]) with ordinality as t(x, i) order by i)
    from public.gintaras_meta m where m.id = 1 and m.last_rollover is not null
  on conflict (week) do nothing;
