-- Gintaras: friend challenges can be sent any day of the week (2026-10-30). Changes no player data.
-- A challenge sent on a Monday (UTC) runs that week; sent on any other day, it runs the next week, so everyone still starts even.
-- It can be answered (accepted or raised) until its own week is over. Settling and expiring are unchanged.
-- Run once in Supabase -> SQL Editor (after languages.sql).
begin;

drop policy "gintaras_challenges_send" on public.gintaras_challenges;
create policy "gintaras_challenges_send" on public.gintaras_challenges for insert to authenticated with check (
  from_id = auth.uid() and status = 'pending'
  and week_start = date_trunc('week', now() at time zone 'utc')::date
                   + case when extract(isodow from now() at time zone 'utc') = 1 then 0 else 7 end
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
        if new.status in ('accepted', 'raised') and old.week_start < wk then raise exception 'That challenge''s week is over'; end if;
      elsif new.status = 'cancelled' then
        if auth.uid() is distinct from old.from_id then raise exception 'Only the sender can cancel'; end if;
        if new.stake <> old.stake then raise exception 'Not allowed'; end if;
      else
        raise exception 'Not allowed';
      end if;
    elsif old.status = 'raised' then
      if auth.uid() is distinct from old.from_id then raise exception 'Only the challenger can answer a raise'; end if;
      if new.stake <> old.stake or new.status not in ('accepted', 'cancelled') then raise exception 'Not allowed'; end if;
      if new.status = 'accepted' and old.week_start < wk then raise exception 'That challenge''s week is over'; end if;
    else
      raise exception 'This challenge is already decided';
    end if;
  end if;
  return new;
end;
$$;

commit;

select 'done' as result,
  (select count(*) from pg_policies where tablename = 'gintaras_challenges' and policyname = 'gintaras_challenges_send') as send_policy,
  (select prosrc like '%old.week_start < wk%' from pg_proc where proname = 'gintaras_challenge_guard') as guard_updated;
