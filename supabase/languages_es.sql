-- Spanish gets its own league (run after languages.sql, 2026-10-30).
-- A row in gintaras_meta is what makes a language a league: the weekly settle (gintaras_league_rollover) walks these rows.
-- Spanish starts on this week, with the standard bars, and with the one-time conversions of the old Lithuanian
-- scripts (divisions, ten leagues) marked done so nothing tries to convert it later. Nothing else is changed.
begin;

insert into public.gintaras_meta (id, lang, last_rollover, bar_scale, divisions, leagues10)
values (2, 'es', date_trunc('week', now() at time zone 'utc')::date, 1, true, true)
on conflict do nothing;

do $$
begin
  if (select count(*) from public.gintaras_meta where lang = 'es') <> 1 then raise exception 'Spanish league row missing'; end if;
  if (select count(*) from public.gintaras_meta where lang = 'lt' and id = 1) <> 1 then raise exception 'Lithuanian league row changed'; end if;
end $$;

commit;

select 'done' as result, (select string_agg(lang || ':' || last_rollover || ' scale ' || bar_scale, ', ' order by id) from public.gintaras_meta) as leagues,
       (select (public.gintaras_bars('es')) ->> 'bars') as spanish_bars;
