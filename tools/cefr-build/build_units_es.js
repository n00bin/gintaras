// Build the Spanish full-CEFR units from es-<level>-units-N.txt into lang/es.js (idempotent: replaces its own marked blocks).
// node build_units_es.js check   -> report duplicates
// node build_units_es.js write   -> write into es.js
// Line format (same as the Lithuanian files): @unit|title|English title|tip|speaking tip, #lesson|title,
// spanish|english|(pron, unused: Spanish "sounds like" comes from the spelling)|note, %part|sub, +cv after the unit.
// Phrase-word meanings ("Built from") come from es-units-words.json; conversations from es-<level>-convs.js.
const fs = require('fs'), path = require('path');
const S = __dirname, ES = path.join(S, '..', '..', 'lang', 'es.js');
const files = fs.readdirSync(S).filter(f => /^es-(a1|a2|b1|b2|c1|c2)-units-\d+\.txt$/.test(f))
  .sort((a, b) => { const k = f => { const m = f.match(/^es-(\w\d)-units-(\d+)/); return m[1] + String(m[2]).padStart(3, '0'); }; return k(a) < k(b) ? -1 : 1; });
const units = []; let u = null, l = null, part = ['More Spanish', 'New words and sentences'];
for (const f of files) for (const raw of fs.readFileSync(path.join(S, f), 'utf8').split(/\r?\n/)) {
  const line = raw.replace(/'/g, '’').trim(); if (!line) continue;
  if (line[0] === '+') { u.after = line.slice(1).split(',').map(x => x.trim()); continue; }
  if (line[0] === '%') { part = line.slice(1).split('|'); continue; }
  if (line[0] === '@') { const [id, title, en, tip, speak] = line.slice(1).split('|'); u = { id, title, en, tip, speak, part, lessons: [] }; units.push(u); continue; }
  if (line[0] === '#') { const [id, title] = line.slice(1).split('|'); l = { id, title, items: [] }; u.lessons.push(l); continue; }
  const [es, en, , note] = line.split('|'); l.items.push({ es: es.trim(), en: en.trim(), note: (note || '').trim() });
}
// what the course already has, without this file's own block
const strip = (s, a, b) => { const i = s.indexOf(a); if (i < 0) return s; const j = s.indexOf(b, i); return s.slice(0, i) + s.slice(s.indexOf('\n', j) + 1); };
let src = fs.readFileSync(ES, 'utf8'), base = src;
for (const [a, b] of [['/* BEGIN ES CEFR UNITS', '/* END ES CEFR UNITS */'], ['/* BEGIN ES CEFR TILES', '/* END ES CEFR TILES */'],
  ['/* BEGIN ES CEFR PATH', '/* END ES CEFR PATH */'], ['/* BEGIN ES CEFR CONVERSATIONS', '/* END ES CEFR CONVERSATIONS */'], ['/* BEGIN ES CEFR EXTRAS', '/* END ES CEFR EXTRAS */']]) base = strip(base, a, b);
const c = {}; new Function('c', 'function esc(s){return s};function norm(s){return s.toLowerCase().trim()};' + base + ';Object.assign(c,{ITEMS});')(c);
const exEs = new Set(c.ITEMS.map(i => i.lt.toLowerCase())), exEn = new Set(c.ITEMS.map(i => i.en.toLowerCase()));
const seenEs = {}, seenEn = {}, probs = [];
for (const un of units) for (const ls of un.lessons) for (const it of ls.items) {
  const a = it.es.toLowerCase(), b = it.en.toLowerCase();
  if (exEs.has(a)) probs.push('ES exists in course: ' + it.es + ' (' + ls.id + ')');
  if (exEn.has(b)) probs.push('EN exists in course: ' + it.en + ' [' + it.es + '] (' + ls.id + ')');
  if (seenEs[a]) probs.push('ES twice: ' + it.es); if (seenEn[b]) probs.push('EN twice: ' + it.en + ' [' + it.es + ' / ' + seenEn[b] + ']');
  seenEs[a] = 1; seenEn[b] = it.es;
}
const n = units.reduce((s, x) => s + x.lessons.reduce((t, y) => t + y.items.length, 0), 0);
console.log(units.length, 'units', n, 'cards'); probs.forEach(p => console.log(p));
if (process.argv[2] !== 'write') process.exit(0);
const q = s => JSON.stringify(s);
const ids = units.map(x => x.id);
const course = '/* BEGIN ES CEFR UNITS (full-CEFR finish line, 2026-11-13; made by tools/cefr-build/build_units_es.js). New unit ids only. */\nCOURSE.push(\n' +
  units.map(un => '{id:' + q(un.id) + ',title:' + q(un.title) + ',en:' + q(un.en) + ',tip:' + q(un.tip) + ',lessons:[\n' +
    un.lessons.map(ls => ' {id:' + q(ls.id) + ',title:' + q(ls.title) + ',items:[' + ls.items.map(it => '[' + q(it.es) + ',' + q(it.en) + (it.note ? ',' + q(it.note) : '') + ']').join(',') + ']}').join(',\n') + '\n]}').join(',\n') +
  ');\n/* END ES CEFR UNITS */\n';
const tiles = '/* BEGIN ES CEFR TILES: a short text tile until a drawing is made; sentences get none. */\n(()=>{const U=new Set(' + q(ids) +
  ');ITEMS.filter(i=>U.has(i.unit.id)).forEach(i=>{if(/[,.!?¿¡–]/.test(i.lt)||i.lt.split(\' \').length>2){NO_PIC.add(i.lt);if(typeof ART_NONE!==\'undefined\')ART_NONE.add(i.lt);}else if(!EMOJI[i.lt])EMOJI[i.lt]=\'#\'+i.en.split(/[ ,(]/)[0].slice(0,9);});})();\n/* END ES CEFR TILES */\n';
const sq = x => "'" + x.replace(/\\/g, '\\\\').replace(/'/g, "\\'") + "'"; let steps = [], last = null;
units.forEach(un => { if (un.part !== last) { steps.push('{part:' + sq(un.part[0]) + ',sub:' + sq(un.part[1]) + '}'); last = un.part; } steps.push(sq(un.id)); (un.after || []).forEach(cv => steps.push(sq(cv))); });
const pathText = '/* BEGIN ES CEFR PATH: the new units go after the course so far. */\nPATH.push(' + steps.join(',\n ') + ');\n/* END ES CEFR PATH */\n';
const convFiles = fs.readdirSync(S).filter(f => /^es-(a1|a2|b1|b2|c1|c2)-convs\.js$/.test(f)).sort();
const convText = '/* BEGIN ES CEFR CONVERSATIONS */\nCONVS.push(\n' + convFiles.map(f => fs.readFileSync(path.join(S, f), 'utf8').trim()).join('\n') + '\n);\n/* END ES CEFR CONVERSATIONS */\n';
let meanings = {}; try { meanings = JSON.parse(fs.readFileSync(path.join(S, 'es-units-words.json'), 'utf8')); } catch (e) {}
const speak = {}; units.forEach(un => speak[un.id] = un.speak);
// voices for named conversation characters (role names like "Vendedor" keep the everyday voices: CAST_GV names count as names)
let castGv = {}; try { castGv = JSON.parse(fs.readFileSync(path.join(S, 'es-cast-gv.json'), 'utf8')); } catch (e) {}
// every lesson part (bites of 5, ids <lesson>-1, -2 ...) gets its own short tip, built from its own cards (tools/check_spanish.js needs one)
const lessonTips = {}, plain = s => s.replace(/\s*\(.*?\)/g, '');
units.forEach(un => un.lessons.forEach(ls => { for (let p = 0; p * 5 < ls.items.length; p++) {
  const its = ls.items.slice(p * 5, p * 5 + 5).slice(0, 3).map(it => '<b>' + it.es + '</b> (' + plain(it.en) + ')');
  lessonTips[ls.id + '-' + (p + 1)] = 'In this part: ' + (its.length > 1 ? its.slice(0, -1).join(', ') + ' and ' + its[its.length - 1] : its[0]) + '.'; } }));
const extras = '/* BEGIN ES CEFR EXTRAS: speaking tips, lesson tips, word meanings for "Built from", conversation voices. */\nObject.assign(SPEAK_TIPS,' + q(speak) + ');\nObject.assign(LESSON_TIPS,' + q(lessonTips) + ');\nObject.assign(WORDS,' + q(meanings) + ');\nObject.assign(CAST_GV,' + q(castGv) + ');\n/* END ES CEFR EXTRAS */\n';
const put = (s, begin, end, text, anchor, after) => { const a = s.indexOf(begin);
  if (a >= 0) { const b = s.indexOf(end, a); return s.slice(0, a) + text + s.slice(s.indexOf('\n', b) + 1); }
  if (anchor === null) return s.replace(/\s*$/, '\n') + text;
  const k = s.indexOf(anchor); if (k < 0) throw new Error('anchor missing: ' + anchor);
  const at = after ? s.indexOf('\n', k + anchor.length) + 1 : k; return s.slice(0, at) + text + s.slice(at); };
src = put(src, '/* BEGIN ES CEFR UNITS', '/* END ES CEFR UNITS */', course, '/* Split every lesson into bite-size parts');
src = put(src, '/* BEGIN ES CEFR TILES', '/* END ES CEFR TILES */', tiles, '/* One tip per lesson, written for that lesson');
src = put(src, '/* BEGIN ES CEFR PATH', '/* END ES CEFR PATH */', pathText, 'const RESHAPE={};');
src = put(src, '/* BEGIN ES CEFR CONVERSATIONS', '/* END ES CEFR CONVERSATIONS */', convText, 'const CONV_BY={};');
src = put(src, '/* BEGIN ES CEFR EXTRAS', '/* END ES CEFR EXTRAS */', extras, null);
fs.writeFileSync(ES, src); console.log('written');
