-- Gintaras: one clock for the week. Run once in Supabase -> SQL Editor (after challenge-rules.sql). Changes no player data.
-- The weekly job has always counted weeks from Monday 00:00 UTC; the app now does too, so the challenge rules follow it.

-- 1. Sending a challenge: only on the week's first day (UTC Monday), only for this week, and the stake can't be more
--    than either player has.
drop policy if exists "gintaras_challenges_send" on public.gintaras_challenges;
create policy "gintaras_challenges_send" on public.gintaras_challenges for insert to authenticated
  with check (from_id = auth.uid() and status = 'pending'
              and week_start = date_trunc('week', now() at time zone 'utc')::date
              and extract(isodow from now() at time zone 'utc') = 1
              and stake <= coalesce(public.gintaras_amber_of(from_id), 0)
              and stake <= coalesce(public.gintaras_amber_of(to_id), 0));

-- 2. Answering: as before (only the person challenged accepts or declines, only the sender cancels, only while
--    pending), and a challenge can only be accepted during its own week.
create or replace function public.gintaras_challenge_guard() returns trigger
language plpgsql set search_path = '' as $$
begin
  if current_user in ('authenticated', 'anon') then
    if old.status <> 'pending' then raise exception 'This challenge is already decided'; end if;
    if new.status in ('accepted', 'declined') then
      if auth.uid() is distinct from old.to_id then raise exception 'Only the person challenged can answer'; end if;
      if new.status = 'accepted' and old.week_start <> date_trunc('week', now() at time zone 'utc')::date then
        raise exception 'That challenge''s week is over';
      end if;
    elsif new.status = 'cancelled' then
      if auth.uid() is distinct from old.from_id then raise exception 'Only the sender can cancel'; end if;
    else
      raise exception 'Not allowed';
    end if;
  end if;
  return new;
end;
$$;

-- 3. Amber balance: a damaged saved number counts as 0 instead of breaking the lookup.
create or replace function public.gintaras_amber_of(p uuid) returns int
language sql stable security definer set search_path = '' as $$
  select greatest(0, (case when g.state ->> 'amberEarned' ~ '^\d{1,9}$' then (g.state ->> 'amberEarned')::int else 0 end)
                   - (case when g.state ->> 'amberSpent' ~ '^\d{1,9}$' then (g.state ->> 'amberSpent')::int else 0 end))
    from public.gintaras_progress g where g.user_id = p;
$$;
