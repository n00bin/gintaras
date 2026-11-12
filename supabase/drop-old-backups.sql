-- Wordami: remove all 31 old backup tables (October and early November 2026) from inside the database. THIS CANNOT BE UNDONE.
-- Run only AFTER the one-off "Save the old backup tables" job has a green run
-- (github.com/n00bin/wordami-backups -> Actions). That encrypted copy is kept for 30 days, then deleted automatically.
-- What goes: copies made before earlier changes, including the pre-fresh-start learning history for the old course and
-- the test-account resets. The nightly backups do not include these tables, so after those 30 days this is the end of them.
-- Current accounts and progress are not touched.
begin;

do $$
declare t record; n int := 0;
begin
  for t in select table_name from information_schema.tables
            where table_schema = 'public' and table_type = 'BASE TABLE' and table_name ~ '^gintaras_.*_backup_[0-9]{8}[a-z]?$' loop
    execute format('drop table public.%I', t.table_name);
    n := n + 1;
  end loop;
  raise notice 'Backup tables removed: %', n;
end;
$$;

commit;

select 'done' as result,
  (select count(*) from information_schema.tables where table_schema = 'public' and table_name ~ '_backup_') as backup_tables_left,
  (select count(*) from public.gintaras_profiles) as accounts,
  (select count(*) from public.gintaras_progress) as saved_progress;
