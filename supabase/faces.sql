-- Gintaras: players can save their own face (avatar) on their league row.
-- Run once in Supabase -> SQL Editor. Changes no player data.
-- A look is nine small numbers joined by dots, e.g. 41.0.0.15.1.2.10.5.2 (hair, beard, glasses, clothes, eyebrows,
-- eyes, mouth, nose, background). The app reads it for everyone on the board; each player can only change their own.

-- The column was added early on and never used. Make sure it exists and holds text (only converted while it's still empty).
do $$
declare t text;
begin
  select data_type into t from information_schema.columns
   where table_schema = 'public' and table_name = 'gintaras_profiles' and column_name = 'look';
  if t is null then
    alter table public.gintaras_profiles add column look text;
  elsif t <> 'text' then
    if exists (select 1 from public.gintaras_profiles where look is not null) then
      raise exception 'gintaras_profiles.look already holds data of type %; not changing it', t;
    end if;
    alter table public.gintaras_profiles alter column look type text using look::text;
  end if;
end $$;

-- Only well-formed looks can be saved, so nobody can stuff anything else into the column.
alter table public.gintaras_profiles drop constraint if exists gintaras_look_ok;
alter table public.gintaras_profiles add constraint gintaras_look_ok
  check (look is null or look ~ '^[0-9]{1,2}(\.[0-9]{1,2}){8}$');

-- Players may change their own look (row rules already limit updates to their own row).
grant update (look) on public.gintaras_profiles to authenticated;
