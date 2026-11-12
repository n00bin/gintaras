# Restoring a Wordami backup

Each nightly run keeps one encrypted file for 30 days, then GitHub deletes it. Because of that, a deleted account is gone from the backups within 30 days.

1. Open the backup repo's **Actions** tab, open a green run, and download its file.
2. Decrypt and unpack it:

   ```
   gpg --decrypt backup.tar.gpg > backup.tar
   tar -xf backup.tar
   ```

3. On the Supabase project you're restoring to, build the structure first, then load the sign-in records, then the app's rows:

   ```
   psql "<session pooler address>" -f structure.sql
   psql "<session pooler address>" -c "\copy auth.users(<first line of auth_users.csv>) from 'auth_users.csv' csv header"
   psql "<session pooler address>" -c "\copy auth.identities(<first line of auth_identities.csv>) from 'auth_identities.csv' csv header"
   pg_restore --no-owner --data-only --schema=public -d "<session pooler address>" data.dump
   ```

   Use your main database login for this, because the backup login is read-only. If Supabase has changed its sign-in tables since the backup, the first line of each file shows which columns the backup holds.

4. Check the access rules came back. This must say `false`:

   ```
   select has_function_privilege('anon', 'public.gintaras_note_add(uuid,text,text,text)', 'execute');
   ```

**These steps haven't been rehearsed yet.** Until a practice restore passes, treat them as a plan, and don't remove the old backup tables.

**Not in the backup:** the phone notification keys (Supabase vault) and the scheduled jobs. If those are lost, recreate them with `supabase/notify.sql` and new keys, and learners turn phone notifications back on.

**A backup you've never restored is only a hope.** Try this on a spare project before launch, and again every so often.
