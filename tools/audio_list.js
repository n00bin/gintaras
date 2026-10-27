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
new Function('out', prelude + content + ';out.ITEMS=ITEMS;out.CONVS=CONVS;out.SMAP=SMAP;')(out);

const groupOf = id => (id.match(/^([a-z]+\d+)/) || [])[1];
const groups = {};
const add = (id, text) => { const g = groupOf(id); (groups[g] = groups[g] || []).push({ id, text }); };
out.ITEMS.forEach(i => add(i.id, i.lt));
out.CONVS.forEach(c => c.lines.forEach(l => { if (l.id) add(l.id, l.lt); }));
process.stdout.write(JSON.stringify({ groups, smap: out.SMAP }));
