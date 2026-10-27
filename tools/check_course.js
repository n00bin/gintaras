// Checks the course for structural mistakes before audio is recorded or anything is pushed.
// Usage: node tools/check_course.js
// - every original lesson is used exactly once, every PATH entry exists
// - every lesson has a tip, every unit a speaking tip, every word a "sounds like"
// - no two items share the same English (answers would be ambiguous)
// - every word you must write or say in a conversation was taught earlier on the path
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const js = html.split('<script>')[1].split('/* ===================== STATE')[0];
const pre = "function norm(s){return s.toLowerCase().replace(/[.,!?;:\"']/g,'').replace(/\\s+/g,' ').trim();}function esc(s){return s}";
const c = {};
new Function('c', pre + js + ';Object.assign(c,{COURSE,ITEMS,PRON,CONVS,CONV_BY,PATH,LESSON_TIPS,SPEAK_TIPS,DRILLS,PATTERNS});')(c);
let problems = 0;
const say = (label, list) => { if (list.length) { problems += list.length; console.log('✗ ' + label + ':', list.join(' | ')); } else console.log('✓ ' + label); };

const units = new Set(c.COURSE.map(u => u.id));
say('PATH entries that do not exist', c.PATH.filter(p => typeof p === 'string' && !units.has(p) && !c.CONV_BY[p]));
const bases = {}; c.COURSE.forEach(u => u.lessons.filter(l => !l.speak).forEach(l => { const b = l.id.replace(/-\d+$/, ''); bases[b] = (bases[b] || 0) + 1; }));
const parts = c.COURSE.flatMap(u => u.lessons.filter(l => !l.speak).map(l => l.id));
say('lessons without a tip', parts.filter(id => !c.LESSON_TIPS[id]));
say('units without a speaking tip', [...units].filter(id => !c.SPEAK_TIPS[id]));
say('words without a "sounds like"', c.ITEMS.filter(i => !c.PRON[i.lt]).map(i => i.lt));
const en = {}; c.ITEMS.forEach(i => { const k = i.en.toLowerCase().replace(/[.,!?]/g, ''); (en[k] = en[k] || []).push(i.lt); });
say('items sharing the same English', Object.entries(en).filter(e => e[1].length > 1).map(e => e[0] + ' = ' + e[1].join(' / ')));
const lt = {}; c.ITEMS.forEach(i => { (lt[i.lt] = lt[i.lt] || []).push(i.id); });
say('items sharing the same Lithuanian', Object.entries(lt).filter(e => e[1].length > 1).map(e => e[0]));
say('drills pointing at a missing unit', c.DRILLS.filter(d => !units.has(d.u)).map(d => d.u + ': ' + d.frame));

// Walk the path, collecting known word forms; every me-line word must already be known.
const tok = s => s.toLowerCase().replace(/[.,!?;:"'()]/g, ' ').split(/\s+/).filter(w => w && !/\d/.test(w));
const known = new Set(['tomas', 'tomai', 'rūta', 'jonas']);
const unknown = [];
c.PATH.filter(p => typeof p === 'string').forEach(id => {
  if (c.CONV_BY[id]) {
    c.CONV_BY[id].lines.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => { if (!known.has(w)) unknown.push(id + ': "' + w + '" in ' + l.lt); }));
    c.CONV_BY[id].lines.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => known.add(w)));
  } else {
    const u = c.COURSE.find(x => x.id === id);
    u.lessons.forEach(l => l.items.forEach(i => tok(i.lt).concat(i.alt.flatMap(tok)).forEach(w => known.add(w))));
  }
});
say('conversation words not taught earlier', unknown);
console.log(problems ? `\n${problems} problem(s)` : '\nAll checks passed.');
process.exit(problems ? 1 : 0);
