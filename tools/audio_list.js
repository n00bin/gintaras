// Prints every piece of Lithuanian that needs a recording, grouped by audio file, plus the current audio map.
// Usage: node tools/audio_list.js [index.html]
const fs = require('fs');
const path = require('path');
const file = process.argv[2] || path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(file, 'utf8');
const script = html.split('<script>')[1];
const content = script.split('/* ===================== STATE')[0];
const prelude = "function norm(s){return s.toLowerCase().replace(/[.,!?;:\"']/g,'').replace(/\\s+/g,' ').trim();}";
const out = {};
new Function('out', prelude + content + ';out.ITEMS=ITEMS;out.CONVS=CONVS;out.SMAP=SMAP;out.ME_BANK=ME_BANK;out.PERS=persClips();out.CAST_GV=CAST_GV;out.ME_GV=ME_GV;')(out);

const groupOf = id => (id.match(/^([a-z]+\d+)/) || [])[1];
const groups = {};
const add = (id, text) => { const g = groupOf(id); (groups[g] = groups[g] || []).push({ id, text }); };
out.ITEMS.forEach(i => add(i.id, i.lt));
out.CONVS.forEach(c => c.all.forEach(l => { if (l.id && l.lt) add(l.id, l.lt); }));
out.ME_BANK.forEach(i => add(i.id, i.lt));
out.PERS.forEach(c => add(c.id, c.text)); // personal versions of course lines (see PERSONAL LINES in index.html)
// Who says each conversation line: a cast member's name, or 'me' (used by tools/make_voices.py).
const speakers = {};
out.CONVS.forEach(c => c.all.forEach(l => { if (l.id && l.lt) speakers[l.id] = l.kind === 'p' ? c.cast[l.who || 0].name : 'me'; }));
process.stdout.write(JSON.stringify({ groups, smap: out.SMAP, speakers, castGv: out.CAST_GV, meGv: out.ME_GV }));
