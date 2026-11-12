-- Wordami: keep league nicknames decent (2026-11-12). Run in Supabase -> SQL Editor. Safe to run again.
-- 1. A new or changed nickname is refused if it contains a slur, swear word or sexual word in English, Lithuanian or
--    Spanish, including l33t spellings (5h1t) and accents. Existing nicknames are left alone; the result lists any
--    that would fail, so you can reset them.
-- 2. Names that pretend to be the app or its staff (admin, moderator, Wordami...) are refused too.
-- 3. gintaras_owner_reset_nickname(player) lets ONLY the owner's account (n00binhard@gmail.com) change a reported
--    player's nickname to "Learner" and a number. Players report a nickname from the league; it arrives with the
--    other problem reports.
-- The lists catch the obvious; reporting catches the rest. To add a word, add it to a list below and run this again.
begin;

create or replace function public.gintaras_nick_ok(n text) returns boolean
language plpgsql immutable set search_path = '' as $$
declare
  flat text;     -- letters only, l33t undone, accents removed: "F_u.c-k3r" -> "fucker"
  tokens text[]; -- the separate words: "big.Puta99" -> {big, puta}
  w text;
  -- Never fine anywhere inside a name.
  anywhere text[] := array[
    'nigger','nigga','faggot','fagot','retard','tranny','wetback','beaner',
    'fuck','fck','cunt','shit','bitch','whore','slut','twat','bollock','pussy','penis','vagina','dildo',
    'porn','paedo','nazi','hitler','kkk','jihad','suicide','killyou',
    'blyat','bliat','pyzd','pizd','nachui','nahui','nahuj','kurva','kurwa','pydaras','pidaras','pidor',
    'pendej','chinga','culero','mamada','pinche','cabron','maricon','mierda','putita','putazo','panocha',
    'administrator','moderator','wordami','official','support'];
  -- Only as a whole word, because they hide inside ordinary names and words: Cassandra, Scunthorpe, computadora,
  -- Dickens, tablet, Asuka, Vergara, grape, therapist, torpedo, Hancock, Sussex, spicy, Badminton, Fukuda.
  -- (Known trade-off: "Scunthorpe" is refused, because catching every form of the c-word matters more.)
  alone text[] := array[
    'ass','arse','dick','fag','cum','tit','tits','sex','cock','wank','rape','rapist','pedo','heil','isis','fuk',
    'spic','kike','chink','gook','blet','suka','gaidys','verga','zorra','puta','puto','cono','culo','joto','huj','chuj',
    'sudas','subine','xxx','nsfw','lesbo','hoe','pimp','anal','orgy','nude','naked','kill','die','hate','admin'];
begin
  if n is null then return true; end if;
  flat := lower(n);
  flat := translate(flat, 'ąčęėįšųūžáéíóúüñ', 'aceeisuuzaeiouun');
  flat := translate(flat, '0134578@$!|', 'oieastbasii');
  tokens := regexp_split_to_array(regexp_replace(flat, '[^a-z]+', ' ', 'g'), ' ');
  flat := regexp_replace(flat, '[^a-z]', '', 'g');
  foreach w in array anywhere loop
    if position(w in flat) > 0 then return false; end if;
  end loop;
  foreach w in array alone loop
    if w = any(tokens) or flat = w then return false; end if;
  end loop;
  return true;
end;
$$;
grant execute on function public.gintaras_nick_ok(text) to anon, authenticated;

create or replace function public.gintaras_nick_check() returns trigger
language plpgsql set search_path = '' as $$
begin
  if not public.gintaras_nick_ok(new.nickname) then
    raise exception 'nickname not allowed' using hint = 'Pick a different nickname.';
  end if;
  return new;
end;
$$;
revoke all on function public.gintaras_nick_check() from public, anon, authenticated;
drop trigger if exists gintaras_nick_check on public.gintaras_profiles;
create trigger gintaras_nick_check before insert or update of nickname on public.gintaras_profiles
  for each row execute function public.gintaras_nick_check();

-- The owner's reset button. Anyone else who calls it gets an error and nothing changes.
create or replace function public.gintaras_owner_reset_nickname(player uuid) returns text
language plpgsql security definer set search_path = '' as $$
declare fresh text; tries int := 0;
begin
  if coalesce(auth.jwt() ->> 'email', '') <> 'n00binhard@gmail.com' then raise exception 'not allowed'; end if;
  if not exists (select 1 from public.gintaras_profiles where id = player) then raise exception 'no such player'; end if;
  loop
    fresh := 'Learner' || (1000 + floor(random() * 9000))::int;
    exit when not exists (select 1 from public.gintaras_profiles where lower(nickname) = lower(fresh));
    tries := tries + 1;
    if tries > 50 then raise exception 'could not find a free name'; end if;
  end loop;
  update public.gintaras_profiles set nickname = fresh, updated_at = now() where id = player;
  return fresh;
end;
$$;
revoke all on function public.gintaras_owner_reset_nickname(uuid) from public, anon;
grant execute on function public.gintaras_owner_reset_nickname(uuid) to authenticated;

commit;

select 'done' as result,
  exists (select 1 from pg_trigger where tgname = 'gintaras_nick_check' and not tgisinternal) as filter_on,
  (select count(*) from public.gintaras_profiles) as nicknames,
  (select coalesce(string_agg(nickname, ', '), 'none') from public.gintaras_profiles where not public.gintaras_nick_ok(nickname)) as existing_that_fail;
