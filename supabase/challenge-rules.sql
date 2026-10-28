-- Gintaras challenge rules. Run once in Supabase -> SQL Editor (after perks.sql). Changes no player data.
-- 1. Anyone signed in can see a player's amber balance (worked out from their saved progress), so a challenge
--    never bets more than the person being challenged has.
create or replace function public.gintaras_amber_of(p uuid) returns int
language sql stable security definer set search_path = '' as $$
  select greatest(0, coalesce((g.state ->> 'amberEarned')::int, 0) - coalesce((g.state ->> 'amberSpent')::int, 0))
    from public.gintaras_progress g where g.user_id = p;
$$;
create or replace function public.gintaras_amber(ids uuid[]) returns table (id uuid, amber int)
language sql stable security definer set search_path = '' as $$
  select u, coalesce(public.gintaras_amber_of(u), 0) from unnest(ids[1:200]) as u;
$$;
revoke all on function public.gintaras_amber_of(uuid) from public, anon;
grant execute on function public.gintaras_amber_of(uuid) to authenticated;
revoke all on function public.gintaras_amber(uuid[]) from public, anon;
grant execute on function public.gintaras_amber(uuid[]) to authenticated;

-- 2. Sending a challenge: only at the start of the week (the sender's Monday, allowing for time zones),
--    and the stake can't be more than either player has (the stake is already 10 to 50, so both need 10+).
drop policy if exists "gintaras_challenges_send" on public.gintaras_challenges;
create policy "gintaras_challenges_send" on public.gintaras_challenges for insert to authenticated
  with check (from_id = auth.uid() and status = 'pending'
              and extract(isodow from week_start) = 1 and week_start between current_date - 1 and current_date + 1
              and stake <= coalesce(public.gintaras_amber_of(from_id), 0)
              and stake <= coalesce(public.gintaras_amber_of(to_id), 0));
