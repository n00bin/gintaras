// Prints every piece of Lithuanian that needs a recording, grouped by audio file, plus the current audio map.
// Usage: node tools/audio_list.js [language file, default lang/lt.js]
const fs = require('fs');
const path = require('path');
const file = process.argv[2] || path.join(__dirname, '..', 'lang', 'lt.js');
const html = fs.readFileSync(file, 'utf8');
const content = html;
const prelude = "function norm(s){return s.toLowerCase().replace(/[.,!?;:\"'¿¡]/g,'').replace(/\\s+/g,' ').trim();}function esc(s){return s}";
const out = {};
new Function('out', prelude + content + ';out.ITEMS=ITEMS;out.CONVS=CONVS;out.MAKE=typeof MAKE!=="undefined"?MAKE:[];out.SMAP=SMAP;out.ME_BANK=ME_BANK;out.PERS=persClips();out.CAST_GV=CAST_GV;out.ME_GV=ME_GV;')(out);

const groupOf = id => (id.match(/^([a-z]+\d+)/) || [])[1];
const groups = {};
const add = (id, text) => { const g = groupOf(id); (groups[g] = groups[g] || []).push({ id, text }); };
out.ITEMS.forEach(i => add(i.id, i.lt));
out.CONVS.forEach(c => c.all.forEach(l => { if (l.id && l.lt) add(l.id, l.lt); }));
out.ME_BANK.forEach(i => add(i.id, i.lt));
// (Round 12) the "make your own sentence" sentences, by a short fingerprint of their words (adding one never moves the others)
// in eight small files, in course order, so a phone saves only the ones for the lessons ahead
const mkId = (t, k) => { let h = 0; for (const ch of t) h = (h * 31 + ch.codePointAt(0)) | 0; return 'mk' + (1 + Math.floor(k / 26)) + ':' + (h >>> 0).toString(36); };
(out.MAKE || []).forEach((m, k) => add(mkId(m[0], k), m[0]));
out.PERS.forEach(c => add(c.id, c.text)); // personal versions of course lines (see PERSONAL LINES in the language file)
// Who says each conversation line: a cast member's name, or 'me' (used by tools/make_voices.py).
const speakers = {};
out.CONVS.forEach(c => c.all.forEach(l => { if (l.id && l.lt) speakers[l.id] = l.kind === 'p' ? c.cast[l.who || 0].name : 'me'; }));
process.stdout.write(JSON.stringify({ groups, smap: out.SMAP, speakers, castGv: out.CAST_GV, meGv: out.ME_GV }));
