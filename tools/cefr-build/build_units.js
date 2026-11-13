// Build new A2 word units from a2-units-*.txt into lang/lt.js (idempotent: replaces its own marked blocks).
// node build_units.js check   -> report duplicates and phrase words lacking meanings
// node build_units.js write   -> write into lt.js
const fs = require('fs'), path = require('path');
const S = __dirname, LT = 'G:/ai_projects/gintaras/lang/lt.js';
const files = fs.readdirSync(S).filter(f => /^(a2|b1|b2|c1|c2)-units-\d+\.txt$/.test(f)).sort();
const ex0 = JSON.parse(fs.readFileSync(path.join(S, 'existing.json'), 'utf8')); const DROP = new Set(ex0.lt), dropped = [];
const units = []; let u = null, l = null, part = ['Everyday life', 'Home, work, health, shopping, feelings, nature and free time'];
for (const f of files) for (const raw of fs.readFileSync(path.join(S, f), 'utf8').split(/\r?\n/)) {
  const line = raw.replace(/'/g, '’').trim(); if (!line) continue;
  if (line[0] === '+') { u.after = line.slice(1).split(',').map(x => x.trim()); continue; }
  if (line[0] === '%') { part = line.slice(1).split('|'); continue; }
  if (line[0] === '@') { const [id, title, en, tip, speak] = line.slice(1).split('|'); u = { id, title, en, tip, speak, part, lessons: [] }; units.push(u); continue; }
  if (line[0] === '#') { const [id, title] = line.slice(1).split('|'); l = { id, title, items: [] }; u.lessons.push(l); continue; }
  const [lt, en, pron, note] = line.split('|'); if (DROP.has(lt.toLowerCase())) { dropped.push(lt); continue; } l.items.push({ lt, en, pron, note: note || '' });
}
const ex = JSON.parse(fs.readFileSync(path.join(S, 'existing.json'), 'utf8'));
// existing.json is refreshed from lt.js WITHOUT our block (see dump.js); fall back to it as-is.
const exLt = new Set(ex.lt), exEn = new Set(ex.en);
const seenLt = {}, seenEn = {}, probs = [];
for (const un of units) for (const ls of un.lessons) for (const it of ls.items) {
  const a = it.lt.toLowerCase(), b = it.en.toLowerCase();
  if (!it.pron) probs.push('no pron: ' + it.lt);
  if (exLt.has(a)) probs.push('LT exists in course: ' + it.lt + ' (' + ls.id + ')');
  if (exEn.has(b)) probs.push('EN exists in course: ' + it.en + ' [' + it.lt + '] (' + ls.id + ')');
  if (seenLt[a]) probs.push('LT twice: ' + it.lt); if (seenEn[b]) probs.push('EN twice: ' + it.en + ' [' + it.lt + ' / ' + seenEn[b] + ']');
  seenLt[a] = 1; seenEn[b] = it.lt;
}
const n = units.reduce((s, x) => s + x.lessons.reduce((t, y) => t + y.items.length, 0), 0);
console.log(units.length, 'units', n, 'cards;', dropped.length, 'already in the course, left out'); probs.forEach(p => console.log(p));
if (process.argv[2] !== 'write') process.exit(0);
const q = s => JSON.stringify(s);
const course = '/* BEGIN A2 WORD UNITS (full-CEFR finish line, 2026-11-12): themed A2 vocabulary units. New unit ids only. */\nCOURSE.push(\n' +
  units.map(un => '{id:' + q(un.id) + ',title:' + q(un.title) + ',en:' + q(un.en) + ',tip:' + q(un.tip) + ',lessons:[\n' +
    un.lessons.map(ls => ' {id:' + q(ls.id) + ',title:' + q(ls.title) + ',items:[' + ls.items.map(it => '[' + q(it.lt) + ',' + q(it.en) + (it.note ? ',' + q(it.note) : '') + ']').join(',') + ']}').join(',\n') + '\n]}').join(',\n') +
  ');\n/* END A2 WORD UNITS */\n';
const ids = units.map(x => x.id);
const pics = '/* BEGIN A2 WORD UNIT TILES: a short text tile until a drawing is made. */\n(()=>{const U=new Set(' + q(ids) + ');ITEMS.filter(i=>U.has(i.unit.id)).forEach(i=>{if(/[,.!?–]/.test(i.lt)||i.lt.split(\' \').length>2){NO_PIC.add(i.lt);ART_NONE.add(i.lt);}else if(!EMOJI[i.lt])EMOJI[i.lt]=\'#\'+i.en.split(/[ ,(]/)[0].slice(0,4).toUpperCase();});})();\n/* END A2 WORD UNIT TILES */\n';
const pron = {}; units.forEach(un => un.lessons.forEach(ls => ls.items.forEach(it => pron[it.lt] = it.pron)));
const speak = {}; units.forEach(un => speak[un.id] = un.speak);
let convPron = {}; try { convPron = JSON.parse(fs.readFileSync(path.join(S, 'convs-pron.json'), 'utf8')); } catch (e) {}
Object.assign(pron, convPron);
let meanings = {}; try { meanings = JSON.parse(fs.readFileSync(path.join(S, 'a2-units-words.json'), 'utf8')); } catch (e) {}
const tail = '/* BEGIN A2 WORD UNIT EXTRAS: "sounds like" guides, speaking tips, and word meanings for "Built from". */\nObject.assign(PRON,' + q(pron) + ');\nObject.assign(SPEAK_TIPS,' + q(speak) + ');\nObject.assign(WORDS,' + q(meanings) + ');\n/* END A2 WORD UNIT EXTRAS */\n';
let s = fs.readFileSync(LT, 'utf8');
const put = (s, begin, end, text, anchor) => { const a = s.indexOf(begin); if (a >= 0) { const b = s.indexOf(end, a); const e = s.indexOf('\n', b) + 1; return s.slice(0, a) + text + s.slice(e); }
  const k = s.indexOf(anchor); if (k < 0) throw new Error('anchor missing: ' + anchor); return s.slice(0, k) + text + s.slice(k); };
s = put(s, '/* BEGIN A2 WORD UNITS', '/* END A2 WORD UNITS */', course, '/* Split every lesson into bite-size parts');
s = put(s, '/* BEGIN A2 WORD UNIT TILES', '/* END A2 WORD UNIT TILES */', pics, '/* One tip per lesson, written for that lesson');
s = put(s, '/* BEGIN A2 WORD UNIT EXTRAS', '/* END A2 WORD UNIT EXTRAS */', tail, '/* A2 grammar phrases: "sounds like" guides. */');
// PATH: the new parts go before Extras.
const sq = x => "'" + x.replace(/'/g, "\'") + "'"; let pathText = '', last = null;
units.forEach(un => { if (un.part !== last) { pathText += (last ? ',\n ' : '') + '{part:' + sq(un.part[0]) + ',sub:' + sq(un.part[1]) + '},\n '; last = un.part; } else pathText += ','; pathText += sq(un.id); (un.after || []).forEach(c => { pathText += ',' + sq(c); }); });
pathText += ',\n ';
const pa = s.indexOf("{part:'Everyday life'"), pe = s.indexOf("{part:'Extras',");
s = pa >= 0 ? s.slice(0, pa) + pathText + s.slice(pe) : s.slice(0, pe) + pathText + s.slice(pe);
// Conversations: every <level>-convs.js file, placed at the end of CONVS.
const convFiles = fs.readdirSync(S).filter(f => /^(b1|b2|c1|c2)-convs\.js$/.test(f)).sort();
const convText = '/* BEGIN CEFR CONVERSATIONS */\n' + convFiles.map(f => fs.readFileSync(path.join(S, f), 'utf8').trim()).join('\n') + '\n/* END CEFR CONVERSATIONS */\n';
{ const a = s.indexOf('/* BEGIN CEFR CONVERSATIONS */');
  if (a >= 0) { const b = s.indexOf('/* END CEFR CONVERSATIONS */', a); s = s.slice(0, a) + convText + s.slice(s.indexOf('\n', b) + 1); }
  else { const k = s.indexOf('];\nconst CONV_BY={};'); if (k < 0) throw new Error('CONVS end missing'); s = s.slice(0, k) + convText + s.slice(k); } }
fs.writeFileSync(LT, s); console.log('written');
