// Gives the nightly backup its own read-only database login, so your main database password never goes on GitHub.
// Run it yourself: node tools/backups/connect-db.js   Safe to run again: it replaces the login's password.
// 1. Makes a long random password and stores the full address on the backup repo as DB_URL. The password is never printed.
// 2. Puts SQL on your clipboard to paste into Supabase's SQL Editor. It holds only a scrambled form of the password, not the password.
const crypto = require('crypto');
const { spawnSync } = require('child_process');

const REPO = 'n00bin/wordami-backups';
const PROJECT = 'jwafxaaaadojafquvhrw';
const POOLER = 'aws-0-us-east-1.pooler.supabase.com:5432';
const ROLE = 'wordami_backup';

// The standard Postgres password format (SCRAM-SHA-256), worked out here so the password itself stays off the database page.
function verifier(password) {
  const iterations = 4096, salt = crypto.randomBytes(16);
  const salted = crypto.pbkdf2Sync(password, salt, iterations, 32, 'sha256');
  const hmac = (key, text) => crypto.createHmac('sha256', key).update(text).digest();
  const stored = crypto.createHash('sha256').update(hmac(salted, 'Client Key')).digest();
  const server = hmac(salted, 'Server Key');
  return `SCRAM-SHA-256$${iterations}:${salt.toString('base64')}$${stored.toString('base64')}:${server.toString('base64')}`;
}

// Supabase doesn't let the postgres account grant access to its private "auth" section, so the backup reads the sign-in
// records through two views in a small private section. Generated columns are left out because they can't be restored.
// This part holds no password, and it's safe to run again.
function buildAccessSql() {
  return `-- Wordami: lets the read-only backup login read the sign-in records through two private views. It holds no password.
do $$
declare t record; cols text;
begin
  create schema if not exists wordami_backup_export;
  revoke all on schema wordami_backup_export from public;
  grant usage on schema wordami_backup_export to ${ROLE};
  grant usage on schema public to ${ROLE};
  for t in select unnest(array['users', 'identities']) as name loop
    select string_agg(quote_ident(c.column_name), ', ' order by c.ordinal_position) into cols
      from information_schema.columns c
     where c.table_schema = 'auth' and c.table_name = t.name and c.is_generated = 'NEVER';
    execute format('drop view if exists wordami_backup_export.%I', 'auth_' || t.name);
    execute format('create view wordami_backup_export.%I as select %s from auth.%I', 'auth_' || t.name, cols, t.name);
    execute format('revoke all on wordami_backup_export.%I from public', 'auth_' || t.name);
    execute format('grant select on wordami_backup_export.%I to ${ROLE}', 'auth_' || t.name);
  end loop;
  -- The direct grants did nothing without access to the section, so they're removed.
  revoke select on auth.users, auth.identities from ${ROLE};
  for t in select table_name from information_schema.tables
            where table_schema = 'public' and table_type = 'BASE TABLE' and table_name like 'gintaras%' and table_name !~ '_backup_' loop
    execute format('grant select on public.%I to ${ROLE}', t.table_name);
  end loop;
  grant select on all sequences in schema public to ${ROLE};
  -- No automatic access to future tables. A new app table this login can't read makes the backup fail loudly, which is what we want.
  alter default privileges in schema public revoke select on tables from ${ROLE};
  alter default privileges in schema public revoke select on sequences from ${ROLE};
end;
$$;
select 'done' as result, rolcanlogin as can_sign_in, rolbypassrls as sees_all_rows,
  has_table_privilege('${ROLE}', 'wordami_backup_export.auth_users', 'select') and has_table_privilege('${ROLE}', 'wordami_backup_export.auth_identities', 'select') as reads_sign_ins,
  has_table_privilege('${ROLE}', 'public.gintaras_profiles', 'select') as reads_app,
  rolsuper as is_admin
from pg_roles where rolname = '${ROLE}';
`;
}

function buildSql(scram) {
  return `-- Wordami: read-only login for the nightly backup. It can read the app's tables and the sign-in records, and can't change anything.
do $$
begin
  if not exists (select 1 from pg_roles where rolname = '${ROLE}') then
    create role ${ROLE} login;
  end if;
  alter role ${ROLE} login bypassrls connection limit 3 password '${scram}';
  alter role ${ROLE} set default_transaction_read_only = on;
end;
$$;
` + buildAccessSql();
}

module.exports = { verifier, buildSql, buildAccessSql };

if (require.main === module) {
  const password = crypto.randomBytes(32).toString('hex'); // letters and digits only, so the address needs no special encoding
  const url = `postgresql://${ROLE}.${PROJECT}:${password}@${POOLER}/postgres`;

  const secret = spawnSync('gh', ['secret', 'set', 'DB_URL', '-R', REPO], { input: url, encoding: 'utf8' });
  if (secret.status !== 0) {
    console.error('STOPPED: could not store the address on the backup repo. Nothing else was changed.\n' + (secret.stderr || secret.error || ''));
    process.exit(1);
  }
  console.log('1. Backup address stored on the repo.');

  const clip = spawnSync('clip.exe', { input: buildSql(verifier(password)) });
  if (clip.status !== 0) {
    console.error('STOPPED: could not copy to the clipboard. Run this again.');
    process.exit(1);
  }
  console.log('2. SQL copied to your clipboard.\n');
  console.log('Now: click in the Supabase SQL Editor tab, press Ctrl+A, then Ctrl+V, then click Run.');
  console.log('You should see one row saying "done", with is_admin false and everything else true. Then come back and tell Claude.');
}
