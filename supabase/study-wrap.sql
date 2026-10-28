-- Gintaras: study-time reminders also work for times between 23:30 and midnight.
-- Run once in Supabase -> SQL Editor (after notify.sql). Same reminder job as notify.sql, except the 30-minute window
-- now wraps past midnight and each reminder counts toward the day its time was on. Changes no player data.
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
      select g.state into st from public.gintaras_progress g where g.user_id = n.user_id;
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
revoke all on function public.gintaras_study_tick() from public, anon, authenticated;
