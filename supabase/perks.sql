-- Gintaras perks: the league shield and friend challenges. Run once in Supabase -> SQL Editor (after leagues.sql).
-- Amber itself lives in saved progress, like XP. This file replaces the weekly job from leagues.sql.

-- 1. League shield: a player who shields a week cannot move down at the end of it.
alter table public.gintaras_profiles add column if not exists shield_week date;
grant update (shield_week) on public.gintaras_profiles to authenticated;

-- 2. Friend challenges: stake amber on who earns more XP this week. Both players stake the same amount;
--    the weekly job below settles it, and each player's app pays out from the result.
create table if not exists public.gintaras_challenges (
  id         bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  from_id    uuid not null default auth.uid() references public.gintaras_profiles(id) on delete cascade,
  to_id      uuid not null references public.gintaras_profiles(id) on delete cascade,
  stake      int  not null check (stake between 10 and 50),
  week_start date not null,
  status     text not null default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled', 'expired', 'settled')),
  winner     uuid,
  from_xp    int,
  to_xp      int,
  check (from_id <> to_id),
  unique (from_id, to_id, week_start)
);
alter table public.gintaras_challenges enable row level security;
revoke all on public.gintaras_challenges from anon, authenticated;
grant select on public.gintaras_challenges to authenticated;
grant insert (to_id, stake, week_start) on public.gintaras_challenges to authenticated;
grant update (status) on public.gintaras_challenges to authenticated;

drop policy if exists "gintaras_challenges_read" on public.gintaras_challenges;
create policy "gintaras_challenges_read" on public.gintaras_challenges for select to authenticated
  using (auth.uid() in (from_id, to_id));
-- The week is the sender's own Monday (the same one their league XP counts from), so it must be this week.
drop policy if exists "gintaras_challenges_send" on public.gintaras_challenges;
create policy "gintaras_challenges_send" on public.gintaras_challenges for insert to authenticated
  with check (from_id = auth.uid() and status = 'pending' and week_start between current_date - 7 and current_date + 1);
drop policy if exists "gintaras_challenges_answer" on public.gintaras_challenges;
create policy "gintaras_challenges_answer" on public.gintaras_challenges for update to authenticated
  using (auth.uid() in (from_id, to_id)) with check (auth.uid() in (from_id, to_id));

-- Only the person challenged may accept or decline, only the sender may cancel, and only while it is pending.
-- (The weekly job runs as the database owner and is not limited by this.)
create or replace function public.gintaras_challenge_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if current_user in ('authenticated', 'anon') then
    if old.status <> 'pending' then raise exception 'This challenge is already decided'; end if;
    if new.status in ('accepted', 'declined') then
      if auth.uid() is distinct from old.to_id then raise exception 'Only the person challenged can answer'; end if;
    elsif new.status = 'cancelled' then
      if auth.uid() is distinct from old.from_id then raise exception 'Only the sender can cancel'; end if;
    else
      raise exception 'Not allowed';
    end if;
  end if;
  return new;
end;
$$;
drop trigger if exists gintaras_challenge_guard on public.gintaras_challenges;
create trigger gintaras_challenge_guard before update on public.gintaras_challenges
  for each row execute function public.gintaras_challenge_guard();

-- 3. The week change (replaces the one in leagues.sql): settles leagues as before, except that a shielded
--    player never moves down; then expires unanswered challenges and settles accepted ones.
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
    select id, league, shield_week, case when week_start = last_monday then week_xp else 0 end as wxp
    from public.gintaras_profiles
  ), ranked as (
    select id, league, wxp, shield_week,
           rank() over (partition by league order by wxp desc) as r,
           count(*) over (partition by league) as n
    from wk
  ), moves as (
    select id, league,
           case when wxp > 0 and r <= 3 and league < 6 then 1
                when league > 0 and shield_week is distinct from last_monday and (wxp = 0 or (n >= 10 and r > n - 3)) then -1
                else 0 end as mv
    from ranked
  )
  update public.gintaras_profiles p
     set league = m.league + m.mv, league_moved = m.mv
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
