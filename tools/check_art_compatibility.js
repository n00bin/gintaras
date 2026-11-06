// Artwork must not change saved-progress IDs, vocabulary, conversation lines or recordings.
// Usage: node tools/check_art_compatibility.js [base commit, default HEAD]
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const crypto = require('crypto');
const base = process.argv[2] || 'HEAD';
const pre = 'function norm(s){return s.toLowerCase().trim()};function esc(s){return s};';
const read = source => {
  const result = {};
  new Function('out', pre + source + ';Object.assign(out,{words:ITEMS.map(i=>[i.id,i.lt,i.en,i.alt]),path:PATH,conversations:CONVS.map(c=>[c.id,c.all.map(l=>[l.id,l.lt,l.en])]),audio:SMAP});')(result);
  return result;
};
const before = read(cp.execFileSync('git', ['show', base + ':lang/lt.js'], {encoding:'utf8'}));
const after = read(fs.readFileSync(path.join(__dirname, '..', 'lang/lt.js'), 'utf8'));
let failed = false;
for (const key of Object.keys(before)) {
  const hash = value => crypto.createHash('sha256').update(JSON.stringify(value)).digest('hex');
  if (hash(before[key]) !== hash(after[key])) { console.error('Changed by the migration: ' + key); failed = true; }
  else console.log('Unchanged: ' + key);
}
process.exitCode = failed ? 1 : 0;
