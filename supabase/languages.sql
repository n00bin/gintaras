-- Gintaras: one account, many languages (step 2 of docs/multilang-design.md).
-- Run once in the Supabase SQL editor. It is all one transaction: if any line fails, nothing changes.
--
-- What it does
--   * Backs up every table it touches (backups keep row security on, so nobody can read them through the app).
--   * gintaras_players: your league standing per language (xp, week, league, shield, cup wins). Lithuanian rows are
--     copied from gintaras_profiles, which stays the shared identity (nickname, face) and stays live for Lithuanian.
--   * gintaras_lang_progress: saved progress for every language except Lithuanian (Lithuanian keeps gintaras_progress,
--     unchanged, so older copies of the app keep working). gintaras_shared: settings shared by all your languages.
--   * meta, cup, bar log, challenges and notifications get a language column (today's rows are 'lt').
--   * The weekly settle, rollover, bars, amber, challenge rules, "someone passed you" and study reminders run per language.
--   * Two mirror triggers keep Lithuanian in step: what the app writes to a profile (xp, week, shield) is copied to the
--     player row, and what the weekly settle writes to the player row (league, rank, cup wins) is copied back.
-- Nothing is dropped except functions, a trigger and a policy that are replaced in this same transaction.

begin;
-- Hold profile writes for the few seconds this takes, so none can slip between the copy and the mirror trigger.
lock table public.gintaras_profiles in share row exclusive mode;

-- ---------- 0. backups ----------
create table public.gintaras_profiles_backup_20261030 as select * from public.gintaras_profiles;
create table public.gintaras_progress_backup_20261030 as select * from public.gintaras_progress;
create table public.gintaras_meta_backup_20261030 as select * from public.gintaras_meta;
create table public.gintaras_cup_backup_20261030 as select * from public.gintaras_cup;
create table public.gintaras_bar_log_backup_20261030 as select * from public.gintaras_bar_log;
create table public.gintaras_challenges_backup_20261030 as select * from public.gintaras_challenges;
create table public.gintaras_notify_backup_20261030 as select * from public.gintaras_notify;
alter table public.gintaras_profiles_backup_20261030 enable row level security;
alter table public.gintaras_progress_backup_20261030 enable row level security;
alter table public.gintaras_meta_backup_20261030 enable row level security;
alter table public.gintaras_cup_backup_20261030 enable row level security;
alter table public.gintaras_bar_log_backup_20261030 enable row level security;
alter table public.gintaras_challenges_backup_20261030 enable row level security;
alter table public.gintaras_notify_backup_20261030 enable row level security;

-- ---------- 1. new tables ----------
create table public.gintaras_players (
  user_id uuid not null references public.gintaras_profiles(id) on delete cascade,
  lang text not null check (lang ~ '^[a-z]{2}$'),
  xp integer not null default 0,
  streak integer not null default 0,
  week_xp integer not null default 0,
  week_start date,
  level_title text,
  daily_goal smallint not null default 40,
  league smallint not null default 0,
  league_moved smallint not null default 0,
  last_rank smallint,
  last_league smallint,
  shield_week date,
  cup_wins smallint not null default 0,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);
create index gintaras_players_league on public.gintaras_players (lang, league);
alter table public.gintaras_players enable row level security;
create policy "gintaras_players_read" on public.gintaras_players for select using (true);
create policy "gintaras_players_own_insert" on public.gintaras_players for insert to authenticated with check (user_id = auth.uid());
create policy "gintaras_players_own_update" on public.gintaras_players for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on public.gintaras_players from anon, authenticated;
grant select on public.gintaras_players to anon, authenticated;
grant insert (user_id, lang, xp, streak, week_xp, week_start, level_title, daily_goal, updated_at) on public.gintaras_players to authenticated;
grant update (user_id, lang, xp, streak, week_xp, week_start, level_title, daily_goal, shield_week, updated_at) on public.gintaras_players to authenticated;

insert into public.gintaras_players (user_id, lang, xp, streak, week_xp, week_start, level_title, daily_goal, league, league_moved,
                                     last_rank, last_league, shield_week, cup_wins, updated_at)
  select id, 'lt', xp, streak, week_xp, week_start, level_title, daily_goal, league, league_moved,
         last_rank, last_league, shield_week, cup_wins, updated_at
  from public.gintaras_profiles;

create table public.gintaras_lang_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lang text not null check (lang ~ '^[a-z]{2}$' and lang <> 'lt'),
  state jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, lang)
);
alter table public.gintaras_lang_progress enable row level security;
create policy "gintaras_lang_progress_own" on public.gintaras_lang_progress for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on public.gintaras_lang_progress from anon, authenticated;
grant select on public.gintaras_lang_progress to authenticated;
grant insert (user_id, lang, state, updated_at), update (user_id, lang, state, updated_at) on public.gintaras_lang_progress to authenticated;

create table public.gintaras_shared (
  user_id uuid primary key references auth.users(id) on delete cascade,
  state jsonb not null check (pg_column_size(state) < 20000),
  updated_at timestamptz not null default now()
);
alter table public.gintaras_shared enable row level security;
create policy "gintaras_shared_own" on public.gintaras_shared for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
revoke all on public.gintaras_shared from anon, authenticated;
grant select on public.gintaras_shared to authenticated;
grant insert (user_id, state, updated_at), update (user_id, state, updated_at) on public.gintaras_shared to authenticated;

-- ---------- 2. a language column on the per-week tables (today's rows are Lithuanian) ----------
alter table public.gintaras_meta add column lang text not null default 'lt' check (lang ~ '^[a-z]{2}$');
create unique index gintaras_meta_lang on public.gintaras_meta (lang);

alter table public.gintaras_bar_log add column lang text not null default 'lt' check (lang ~ '^[a-z]{2}$');
alter table public.gintaras_bar_log drop constraint gintaras_bar_log_pkey;
alter table public.gintaras_bar_log add primary key (week, lang);

alter table public.gintaras_cup add column lang text not null default 'lt' check (lang ~ '^[a-z]{2}$');
alter table public.gintaras_cup drop constraint gintaras_cup_pkey;
alter table public.gintaras_cup add primary key (cup, lang, round, player);

alter table public.gintaras_challenges add column lang text not null default 'lt' check (lang ~ '^[a-z]{2}$');
alter table public.gintaras_challenges drop constraint gintaras_challenges_from_id_to_id_week_start_key;
alter table public.gintaras_challenges add constraint gintaras_challenges_once_a_week unique (from_id, to_id, week_start, lang);
grant insert (lang) on public.gintaras_challenges to authenticated;

alter table public.gintaras_notify add column last_lang text not null default 'lt' check (last_lang ~ '^[a-z]{2}$');
grant insert (last_lang), update (last_lang) on public.gintaras_notify to authenticated;

-- ---------- 3. amber, per language ----------
drop policy "gintaras_challenges_send" on public.gintaras_challenges;
drop function public.gintaras_amber(uuid[]);
drop function public.gintaras_amber_of(uuid);

create function public.gintaras_amber_of(p uuid, l text default 'lt') returns integer
language sql stable security definer set search_path = '' as $$
  select greatest(0, (case when g.state ->> 'amberEarned' ~ '^\d{1,9}$' then (g.state ->> 'amberEarned')::int else 0 end)
                   - (case when g.state ->> 'amberSpent' ~ '^\d{1,9}$' then (g.state ->> 'amberSpent')::int else 0 end))
  from (select state from public.gintaras_progress where user_id = p and l = 'lt'
        union all select state from public.gintaras_lang_progress where user_id = p and lang = l) g;
$$;

create function public.gintaras_amber(ids uuid[], l text default 'lt') returns table (id uuid, amber integer)
language sql stable security definer set search_path = '' as $$
  select u, coalesce(public.gintaras_amber_of(u, l), 0) from unnest(ids[1:200]) as u;
$$;

-- Challenges: Mondays only, both players learning that language, and nobody stakes more than either of them has.
create policy "gintaras_challenges_send" on public.gintaras_challenges for insert to authenticated with check (
  from_id = auth.uid() and status = 'pending'
  and week_start = date_trunc('week', now() at time zone 'utc')::date
  and extract(isodow from now() at time zone 'utc') = 1
  and exists (select 1 from public.gintaras_players p where p.user_id = from_id and p.lang = gintaras_challenges.lang)
  and exists (select 1 from public.gintaras_players p where p.user_id = to_id and p.lang = gintaras_challenges.lang)
  and stake <= coalesce(public.gintaras_amber_of(from_id, lang), 0)
  and stake <= coalesce(public.gintaras_amber_of(to_id, lang), 0));

create or replace function public.gintaras_challenge_guard() returns trigger
language plpgsql set search_path = '' as $$
declare wk date := date_trunc('week', now() at time zone 'utc')::date;
begin
  if current_user in ('authenticated', 'anon') then
    if new.lang is distinct from old.lang then raise exception 'Not allowed'; end if;
    if old.status = 'pending' then
      if new.status in ('accepted', 'declined', 'raised') then
        if auth.uid() is distinct from old.to_id then raise exception 'Only the person challenged can answer'; end if;
        if new.status = 'raised' then
          if new.stake <= old.stake or new.stake > 50 then raise exception 'A raise has to be bigger than the stake, and 50 at most'; end if;
          if new.stake - old.stake > coalesce(public.gintaras_amber_of(old.from_id, old.lang), 0) then
            raise exception 'They don''t have enough amber for that raise';
          end if;
        elsif new.stake <> old.stake then raise exception 'Not allowed';
        end if;
        if new.status in ('accepted', 'raised') and old.week_start <> wk then raise exception 'That challenge''s week is over'; end if;
      elsif new.status = 'cancelled' then
        if auth.uid() is distinct from old.from_id then raise exception 'Only the sender can cancel'; end if;
        if new.stake <> old.stake then raise exception 'Not allowed'; end if;
      else
        raise exception 'Not allowed';
      end if;
    elsif old.status = 'raised' then
      if auth.uid() is distinct from old.from_id then raise exception 'Only the challenger can answer a raise'; end if;
      if new.stake <> old.stake or new.status not in ('accepted', 'cancelled') then raise exception 'Not allowed'; end if;
      if new.status = 'accepted' and old.week_start <> wk then raise exception 'That challenge''s week is over'; end if;
    else
      raise exception 'This challenge is already decided';
    end if;
  end if;
  return new;
end;
$$;

-- ---------- 4. bars, settle and rollover, per language ----------
drop function public.gintaras_bars();
create function public.gintaras_bars(l text default 'lt') returns jsonb
language sql stable security definer set search_path = '' as $$
  select jsonb_build_object(
    'bars', (select to_jsonb(array(select (round(x * m.bar_scale / 5.0) * 5)::int
                                   from unnest(array[150, 175, 200, 250, 275, 300, 350, 400, 450, 500]) with ordinality as t(x, i) order by i))
             from public.gintaras_meta m where m.lang = l),
    'log', (select to_jsonb(g) from public.gintaras_bar_log g where g.lang = l order by week desc limit 1));
$$;

drop function public.gintaras_league_settle(date);
create function public.gintaras_league_settle(this_monday date, l text) returns void
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
  select last_rollover, bar_scale into settled, sc from public.gintaras_meta where lang = l for update;
  if not found or settled >= this_monday then return; end if;
  -- Last week was played with the bars that were showing all week: today's scale, rounded to 5s.
  bars := array(select (round(x * sc / 5.0) * 5)::int from unnest(base) with ordinality as t(x, i) order by i);

  -- Sun Cup
  if rnd = 1 then
    insert into public.gintaras_cup (cup, lang, round, player, xp)
      select cup_start, l, 1, user_id, week_xp from public.gintaras_players
      where lang = l and league >= 18 and week_start = last_monday and week_xp >= bars[10]
      on conflict do nothing;
  elsif rnd in (2, 3) then
    update public.gintaras_cup c
      set xp = case when p.week_start = last_monday then p.week_xp else 0 end
      from public.gintaras_players p
      where c.cup = cup_start and c.lang = l and c.round = rnd and p.user_id = c.player and p.lang = l;
  end if;
  if rnd between 1 and 3 then
    select count(*) into cnt from public.gintaras_cup where cup = cup_start and lang = l and round = rnd;
    if rnd < 3 and cnt >= 2 then
      keep := greatest(2, ceil(cnt / 2.0)::int);
      insert into public.gintaras_cup (cup, lang, round, player)
        select cup_start, l, rnd + 1, player
        from (select player, xp, rank() over (order by xp desc) as r
              from public.gintaras_cup where cup = cup_start and lang = l and round = rnd) x
        where x.r <= keep and x.xp > 0
        on conflict do nothing;
    elsif rnd = 3 then
      update public.gintaras_cup c set place = x.r
        from (select player, rank() over (order by xp desc) as r
              from public.gintaras_cup where cup = cup_start and lang = l and round = 3 and xp > 0) x
        where c.cup = cup_start and c.lang = l and c.round = 3 and c.player = x.player;
      update public.gintaras_players p set cup_wins = cup_wins + 1
        from public.gintaras_cup c
        where c.cup = cup_start and c.lang = l and c.round = 3 and c.place = 1 and p.user_id = c.player and p.lang = l;
    end if;
  end if;

  -- Leagues
  with wk as (
    select user_id, league, shield_week,
           case when week_start = last_monday then week_xp else 0 end as wxp
    from public.gintaras_players where lang = l
  ), ranked as (
    select user_id, league, wxp, shield_week,
           rank() over (partition by league order by wxp desc) as r,
           count(*) over (partition by league) as n,
           count(*) filter (where wxp > 0) over (partition by league) as active
    from wk
  ), moves as (
    select user_id, league, r, active, wxp,
           case when wxp > 0 and wxp >= bars[league / 2 + 1] and r <= 3 and league < 19 then 1
                when league > 0 and shield_week is distinct from last_monday and (wxp = 0 or (n >= 10 and r > n - 3)) then -1
                else 0 end as mv
    from ranked
  )
  update public.gintaras_players p
     set league = m.league + m.mv, league_moved = m.mv, last_league = m.league,
         last_rank = case when m.wxp > 0 and m.active >= 2 then m.r end
    from moves m
   where p.user_id = m.user_id and p.lang = l;

  -- Friend challenges
  update public.gintaras_challenges set status = 'expired' where lang = l and status in ('pending', 'raised') and week_start < this_monday;
  update public.gintaras_challenges ch
     set status = 'settled', from_xp = x.fx, to_xp = x.tx,
         winner = case when x.fx > x.tx then ch.from_id when x.tx > x.fx then ch.to_id end
    from (select c.id,
                 coalesce((select case when p.week_start = c.week_start then p.week_xp else 0 end from public.gintaras_players p where p.user_id = c.from_id and p.lang = l), 0) as fx,
                 coalesce((select case when p.week_start = c.week_start then p.week_xp else 0 end from public.gintaras_players p where p.user_id = c.to_id and p.lang = l), 0) as tx
          from public.gintaras_challenges c
          where c.lang = l and c.status = 'accepted' and c.week_start < this_monday) x
   where ch.id = x.id;

  -- The bar watcher: sets next week's bars from how fast people really earned XP last week.
  -- Each player's rate is their week XP per minute in lessons; the middle (median) rate of players with at least
  -- 30 minutes counts, and only when there are 3 or more of them. The bars follow it from a base of 7 XP a minute,
  -- moving at most 10% a week and staying between two thirds and 1.6 times the base (Sand 100 to Sun 800).
  begin
    select count(*), percentile_cont(0.5) within group (order by pl.xp / (pl.secs / 60.0))
      into n_ok, med
      from (select p.week_xp as xp,
                   (select coalesce(sum(case when e.value ~ '^\d{1,9}(\.\d+)?$' then e.value::numeric else 0 end), 0)
                      from jsonb_each_text(coalesce(g.state -> 'ltime', '{}'::jsonb)) e
                     where (case when e.key ~ '^\d{4}-\d{2}-\d{2}$' then e.key::date end) between last_monday and last_monday + 6) as secs
              from public.gintaras_players p
              join (select user_id, state from public.gintaras_progress where l = 'lt'
                    union all select user_id, state from public.gintaras_lang_progress where lang = l) g on g.user_id = p.user_id
             where p.lang = l and p.week_start = last_monday and p.week_xp > 0) pl
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
  update public.gintaras_meta set bar_scale = new_sc where lang = l;
  insert into public.gintaras_bar_log (week, lang, players, median_rate, old_scale, new_scale, bars)
    values (this_monday, l, n_ok, round(med, 2), sc, new_sc,
            array(select (round(x * new_sc / 5.0) * 5)::int from unnest(base) with ordinality as t(x, i) order by i))
    on conflict (week, lang) do nothing;

  update public.gintaras_meta set last_rollover = this_monday where lang = l;
end;
$$;

-- Settles every language that has a league (a row in gintaras_meta). The app calls it; same name as before.
create or replace function public.gintaras_league_rollover() returns void
language plpgsql security definer set search_path = '' as $$
declare m record;
begin
  for m in select lang from public.gintaras_meta order by lang loop
    begin  -- one language's problem never stops another's week from settling
      perform public.gintaras_league_settle(date_trunc('week', now() at time zone 'utc')::date, m.lang);
    exception when others then
      raise warning 'gintaras settle % failed: %', m.lang, sqlerrm;
    end;
  end loop;
end;
$$;

-- ---------- 5. mirrors that keep Lithuanian in step ----------
-- The app writes Lithuanian xp, week and shield to the profile (old copies too): copy them to the player row.
-- A profile with no Lithuanian XP and no player row yet (someone learning only another language) gets none.
create function public.gintaras_profile_mirror() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if pg_trigger_depth() > 1 then return new; end if;
  if coalesce(new.xp, 0) = 0 and coalesce(new.week_xp, 0) = 0
     and not exists (select 1 from public.gintaras_players where user_id = new.id and lang = 'lt') then
    return new;
  end if;
  insert into public.gintaras_players as p (user_id, lang, xp, streak, week_xp, week_start, level_title, daily_goal, shield_week, updated_at)
    values (new.id, 'lt', new.xp, new.streak, new.week_xp, new.week_start, new.level_title, new.daily_goal, new.shield_week, new.updated_at)
    on conflict (user_id, lang) do update
      set xp = excluded.xp, streak = excluded.streak, week_xp = excluded.week_xp, week_start = excluded.week_start,
          level_title = excluded.level_title, daily_goal = excluded.daily_goal, shield_week = excluded.shield_week,
          updated_at = excluded.updated_at;
  return new;
end;
$$;
create trigger gintaras_profile_mirror after insert or update on public.gintaras_profiles
  for each row execute function public.gintaras_profile_mirror();

-- The weekly settle writes league, rank and cup wins to the player row: copy Lithuanian ones back to the profile,
-- where older copies of the app read them.
create function public.gintaras_player_mirror() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if new.lang <> 'lt' or pg_trigger_depth() > 1 then return new; end if;
  update public.gintaras_profiles
     set league = new.league, league_moved = new.league_moved, last_league = new.last_league,
         last_rank = new.last_rank, cup_wins = new.cup_wins
   where id = new.user_id
     and (league, league_moved, last_league, last_rank, cup_wins)
         is distinct from (new.league, new.league_moved, new.last_league, new.last_rank, new.cup_wins);
  return new;
end;
$$;
create trigger gintaras_player_mirror after update of league, league_moved, last_league, last_rank, cup_wins on public.gintaras_players
  for each row execute function public.gintaras_player_mirror();

-- ---------- 6. "someone passed you", per language ----------
drop trigger gintaras_passed on public.gintaras_profiles;
create or replace function public.gintaras_passed() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  was int := case when old.week_start = new.week_start then coalesce(old.week_xp, 0) else 0 end;
  names text[] := case new.lang
    when 'es' then array['Arena', 'Piedra', 'Cobre', 'Ámbar', 'Plata', 'Oro', 'Cristal', 'Luna', 'Estrella', 'Sol']
    else array['Smėlis', 'Akmenėlis', 'Varis', 'Gintaras', 'Sidabras', 'Auksas', 'Krištolas', 'Mėnulis', 'Žvaigždė', 'Saulė'] end;
  nick text;
  lname text;
  r record;
  rk int;
  rivals uuid[] := '{}';
begin
  if coalesce(new.week_xp, 0) <= was then return new; end if;
  select nickname into nick from public.gintaras_profiles where id = new.user_id;
  -- Challenge rivals this week, in this language, who were ahead (or level) and are now behind.
  for r in select p.user_id as id, p.week_xp from public.gintaras_challenges c
             join public.gintaras_players p on p.user_id = case when c.from_id = new.user_id then c.to_id else c.from_id end and p.lang = new.lang
            where c.lang = new.lang and c.status = 'accepted' and c.week_start = new.week_start and new.user_id in (c.from_id, c.to_id)
              and p.week_start = new.week_start and p.week_xp >= was and p.week_xp > 0 and p.week_xp < new.week_xp loop
    perform public.gintaras_note_add(r.id, 'challenge', '⚔️ Your challenge',
      nick || ' is beating you now: ' || new.week_xp || ' to ' || r.week_xp || ' XP. Catch up before Sunday night!');
    rivals := rivals || r.id;
  end loop;
  -- Everyone in the same league they just passed.
  lname := names[floor(coalesce(new.league, 0) / 2)::int + 1] || case when coalesce(new.league, 0) % 2 = 0 then ' II' else ' I' end;
  for r in select p.user_id as id, p.week_xp from public.gintaras_players p
            where p.lang = new.lang and p.league = new.league and p.week_start = new.week_start and p.user_id <> new.user_id
              and p.week_xp >= was and p.week_xp > 0 and p.week_xp < new.week_xp loop
    continue when r.id = any(rivals);
    select 1 + count(*) into rk from public.gintaras_players q
     where q.lang = new.lang and q.league = new.league and q.week_start = new.week_start and q.week_xp > r.week_xp;
    perform public.gintaras_note_add(r.id, 'rank', '🏆 League update',
      case when rk = 4 then nick || ' pushed you out of the top 3 in ' || lname || '. You''re #4 now. Win it back!'
           else nick || ' just passed you. You''re #' || rk || ' in ' || lname || ' now.' end);
  end loop;
  return new;
exception when others then
  return new;
end;
$$;
create trigger gintaras_passed after update of week_xp on public.gintaras_players
  for each row execute function public.gintaras_passed();

-- ---------- 7. study reminders read the language you used last ----------
create or replace function public.gintaras_study_tick() returns void
language plpgsql security definer set search_path = '' as $$
declare n record; here timestamp; st jsonb; xp int; goal int; mins int; late int; day date;
begin
  for n in select * from public.gintaras_notify where study and study_time is not null and tz is not null loop
    begin
      here := now() at time zone n.tz;
      -- Minutes since their study time, going round midnight (so 23:50 still works at 00:05), and the day it belongs to.
      late := (floor(extract(epoch from (here::time - n.study_time::time)) / 60)::int + 1440) % 1440;
      day := (here - make_interval(mins => late))::date;
      continue when late >= 30 or n.last_study >= day;
      update public.gintaras_notify set last_study = day where user_id = n.user_id;
      if coalesce(n.last_lang, 'lt') = 'lt' then
        select g.state into st from public.gintaras_progress g where g.user_id = n.user_id;
      else
        select g.state into st from public.gintaras_lang_progress g where g.user_id = n.user_id and g.lang = n.last_lang;
      end if;
      goal := case when st ->> 'goal' ~ '^\d{1,4}$' then (st ->> 'goal')::int else 70 end;
      xp := case when st ->> 'todayDate' = day::text and st ->> 'todayXp' ~ '^\d{1,6}$' then (st ->> 'todayXp')::int else 0 end;
      mins := coalesce(nullif(regexp_replace(coalesce(st ->> 'pace', ''), '\D', '', 'g'), '')::int, 10);
      continue when xp >= goal;
      perform public.gintaras_note_add(n.user_id, 'study', '📚 Study time',
        case when xp > 0 then 'Hey, it''s study time! You''re at ' || xp || ' of ' || goal || ' XP today.'
             else 'Hey, it''s study time! Today''s goal: ' || goal || ' XP and ' || mins || ' minutes.' end);
    exception when others then
      null;
    end;
  end loop;
end;
$$;

-- Only the database runs these.
revoke execute on function public.gintaras_league_settle(date, text) from public, anon, authenticated;
revoke execute on function public.gintaras_profile_mirror() from public, anon, authenticated;
revoke execute on function public.gintaras_player_mirror() from public, anon, authenticated;

-- ---------- 8. check: every Lithuanian player copied, nothing lost ----------
do $$
declare a int; b int; x bigint; y bigint; wa bigint; wb bigint; sa int; sb int;
begin
  select count(*), coalesce(sum(xp), 0), coalesce(sum(week_xp), 0), count(shield_week) into a, x, wa, sa from public.gintaras_profiles;
  select count(*), coalesce(sum(xp), 0), coalesce(sum(week_xp), 0), count(shield_week) into b, y, wb, sb from public.gintaras_players where lang = 'lt';
  if a <> b or x <> y or wa <> wb or sa <> sb then
    raise exception 'Copy check failed: % profiles (% xp, % week, % shields) vs % players (% xp, % week, % shields)', a, x, wa, sa, b, y, wb, sb;
  end if;
  if (select count(*) from public.gintaras_progress) <> (select count(*) from public.gintaras_progress_backup_20261030) then
    raise exception 'Progress count changed';
  end if;
end $$;

commit;

select 'done' as result,
  (select count(*) from public.gintaras_players) as players,
  (select count(*) from public.gintaras_profiles) as profiles,
  (select count(*) from public.gintaras_progress) as progress,
  (select string_agg(lang || ':' || last_rollover, ', ') from public.gintaras_meta) as leagues;
