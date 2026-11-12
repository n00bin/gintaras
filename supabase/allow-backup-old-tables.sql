-- Wordami: let the read-only backup login read the 31 old in-database backup tables, once, so they can be saved
-- (encrypted, kept 30 days) before they are deleted. Read-only: changes no data. Safe to run again.
do $$
declare t record;
begin
  for t in select tablename from pg_tables
            where schemaname = 'public' and tablename ~ '^gintaras_.*_backup_[0-9]{8}[a-z]?$' loop
    execute format('grant select on public.%I to wordami_backup', t.tablename);
  end loop;
end $$;

select count(*) as old_tables,
       count(*) filter (where has_table_privilege('wordami_backup', format('public.%I', tablename), 'select')) as backup_can_read
  from pg_tables
 where schemaname = 'public' and tablename ~ '^gintaras_.*_backup_[0-9]{8}[a-z]?$';
