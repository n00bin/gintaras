-- A list of every access rule on Wordami's tables and functions: who can do what, row rules, triggers. Names only, no learner data.
-- The practice restore runs this on the live database and on the restored copy. The two lists must match.
with tabs as (
  select c.oid, c.relname, c.relrowsecurity from pg_class c join pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public' and c.relkind = 'r' and c.relname like 'gintaras%' and c.relname !~ '_backup_'
), roles as (select unnest(array['anon', 'authenticated']) as r)
select line from (
  select 'function ' || p.proname || '(' || pg_get_function_identity_arguments(p.oid) || ') definer=' || p.prosecdef
         || ' owner=' || pg_get_userbyid(p.proowner) || ' ' || r.r || '=' || has_function_privilege(r.r, p.oid, 'execute') as line
    from pg_proc p join pg_namespace n on n.oid = p.pronamespace cross join roles r
   where n.nspname = 'public' and p.proname like 'gintaras%'
  union all
  select 'table ' || t.relname || ' row_rules=' || t.relrowsecurity from tabs t
  union all
  select 'table ' || t.relname || ' ' || r.r || ' ' || pr.p || '=' || has_table_privilege(r.r, t.oid, pr.p)
    from tabs t cross join roles r cross join (select unnest(array['SELECT', 'INSERT', 'UPDATE', 'DELETE']) as p) pr
  union all
  select 'column ' || t.relname || '.' || a.attname || ' ' || r.r || ' ' || pr.p || '=' || has_column_privilege(r.r, t.oid, a.attnum, pr.p)
    from tabs t join pg_attribute a on a.attrelid = t.oid and a.attnum > 0 and not a.attisdropped
    cross join roles r cross join (select unnest(array['SELECT', 'INSERT', 'UPDATE']) as p) pr
  union all
  select 'policy ' || t.relname || ' ' || po.polname || ' cmd=' || po.polcmd::text || ' roles=' || coalesce((select string_agg(x::regrole::text, ',' order by x::regrole::text) from unnest(po.polroles) x), '')
         || ' using=' || coalesce(md5(pg_get_expr(po.polqual, po.polrelid)), '-') || ' check=' || coalesce(md5(pg_get_expr(po.polwithcheck, po.polrelid)), '-')
    from pg_policy po join tabs t on t.oid = po.polrelid
  union all
  select 'trigger ' || t.relname || ' ' || tg.tgname || ' enabled=' || tg.tgenabled::text
    from pg_trigger tg join tabs t on t.oid = tg.tgrelid where not tg.tgisinternal
) x order by 1;
