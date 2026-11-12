// Stops a release that would reset learners' progress. The deploy runs this before publishing; a failure blocks it.
// Usage: node tools/check_data_safety.js
//
// It covers two things only:
// 1. EPOCH was the fresh-start switch: raising it made every device drop its lessons and word history (2026-10-30, EPOCH 2).
//    It stays at 2 so copies from before that date still get cleaned once, and it must never go higher.
// 2. Every database script already applied must keep its stop line, so nobody can run it again by mistake
//    (fresh-start.sql would strip every learner's lessons). Only the scripts in SAFE_TO_RERUN may go without one.
// It does NOT catch renamed lesson or word ids, which also lose progress: add new lessons with new ids instead
// (see "Lesson ids never change" in the README).
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

const FROZEN_EPOCH = 2;
const found = html.match(/\bconst EPOCH=(\d+)\b/);
const problems = [];
if (!found) problems.push('Could not find EPOCH in index.html. It must stay as "const EPOCH=' + FROZEN_EPOCH + '".');
else if (Number(found[1]) !== FROZEN_EPOCH) problems.push('EPOCH is ' + found[1] + ', and it must stay ' + FROZEN_EPOCH + '. Changing it resets every learner\'s lessons on every device.');

// Scripts written to be run again safely. A new script joins this list only if running it twice changes nothing;
// otherwise it gets the stop line once it has been applied.
const SAFE_TO_RERUN = new Set(['account-deletion.sql', 'drop-old-backups.sql']);
const STOP = /^do \$\$ begin raise exception 'This script was already applied\./m;
const sqlDir = path.join(__dirname, '..', 'supabase');
fs.readdirSync(sqlDir).filter(f => f.endsWith('.sql') && !SAFE_TO_RERUN.has(f)).forEach(f => {
  const text = fs.readFileSync(path.join(sqlDir, f), 'utf8');
  const stop = text.search(STOP), firstCode = text.split('\n').findIndex(l => l.trim() && !l.trim().startsWith('--'));
  if (stop < 0 || text.split('\n')[firstCode].search(STOP) !== 0) problems.push('supabase/' + f + ' has no stop line as its first command. If it has already been applied, put the stop line back (copy it from fresh-start.sql); if it is new and safe to run twice, add it to SAFE_TO_RERUN.');
});

if (problems.length) {
  problems.forEach(p => console.error('✗ ' + p));
  process.exit(1);
}
console.log('✓ Learner progress is not being reset');
