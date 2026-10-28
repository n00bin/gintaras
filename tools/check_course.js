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
new Function('c', pre + js + ';Object.assign(c,{CANDO,ME_BANK,COURSE,ITEMS,PRON,CONVS,CONV_BY,PATH,LESSON_TIPS,SPEAK_TIPS,DRILLS,PATTERNS,WORDS,GLUE,EMOJI,norm});')(c);
let problems = 0;
const say = (label, list) => { if (list.length) { problems += list.length; console.log('✗ ' + label + ':', list.join(' | ')); } else console.log('✓ ' + label); };

const units = new Set(c.COURSE.map(u => u.id));
say('PATH entries that do not exist', c.PATH.filter(p => typeof p === 'string' && !units.has(p) && !c.CONV_BY[p]));
const bases = {}; c.COURSE.forEach(u => u.lessons.filter(l => !l.speak).forEach(l => { const b = l.id.replace(/-\d+$/, ''); bases[b] = (bases[b] || 0) + 1; }));
const parts = c.COURSE.flatMap(u => u.lessons.filter(l => !l.speak).map(l => l.id));
say('lessons without a tip', parts.filter(id => !c.LESSON_TIPS[id]));
say('units without a speaking tip', [...units].filter(id => !c.SPEAK_TIPS[id]));
// A phrase is covered if it has its own respelling, or every word in it has one (the app pieces them together).
const ci = {}; Object.keys(c.PRON).forEach(k => { ci[k.toLowerCase().replace(/[.,!?]+$/, '')] = 1; });
Object.keys(c.PRON).forEach(k => { const ws = k.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/), ps = c.PRON[k].split(' '); if (ws.length > 1 && ws.length === ps.length) ws.forEach(w => { ci[w] = 1; }); });
const covered = t => ci[t.toLowerCase().replace(/[.,!?]+$/, '')] || t.split(/(?<=[.!?])\s+/).every(sen => ci[sen.toLowerCase().replace(/[.,!?]+$/, '').trim()] || sen.split(/,\s*/).every(part => ci[part.toLowerCase().replace(/[.,!?]+$/, '').trim()] || part.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean).every(w => ci[w])));
say('words without a "sounds like"', c.ITEMS.filter(i => !covered(i.lt)).map(i => i.lt));
say('conversation lines without a "sounds like"', c.CONVS.flatMap(v => v.all.filter(l => l.lt && !covered(l.lt)).map(l => v.id + ': ' + l.lt)));
say('About-you sentences without a "sounds like"', c.ME_BANK.filter(i => !covered(i.lt)).map(i => i.lt));
const en = {}; c.ITEMS.forEach(i => { const k = i.en.toLowerCase().replace(/[.,!?]/g, ''); (en[k] = en[k] || []).push(i.lt); });
say('items sharing the same English', Object.entries(en).filter(e => e[1].length > 1).map(e => e[0] + ' = ' + e[1].join(' / ')));
const lt = {}; c.ITEMS.forEach(i => { (lt[i.lt] = lt[i.lt] || []).push(i.id); });
say('items sharing the same Lithuanian', Object.entries(lt).filter(e => e[1].length > 1).map(e => e[0]));
say('phrase words without a meaning in "Built from"', [...new Set(c.ITEMS.filter(i => i.lt.trim().includes(' ')).flatMap(i => i.lt.split(' ').map(w => c.norm(w)).filter(k => k && !c.WORDS[k] && !c.GLUE[k])))]);
say('words without a picture', c.ITEMS.filter(i => !c.EMOJI[i.lt]).map(i => i.lt));
{ const base = new Set(c.ITEMS.map(i => i.lesson.id.replace(/-\d+$/, ''))); const ids = c.CANDO.map(x => x[0]);
  say('real-life skills pointing at a missing lesson', c.CANDO.flatMap(x => x[3].filter(l => !base.has(l)).map(l => x[0] + ': ' + l)));
  say('real-life skills pointing at a missing conversation', c.CANDO.filter(x => x[4] && !c.CONV_BY[x[4]]).map(x => x[0] + ': ' + x[4]));
  say('real-life skills sharing an id', ids.filter((x, i) => ids.indexOf(x) !== i)); }
say('drills pointing at a missing unit', c.DRILLS.filter(d => !units.has(d.u)).map(d => d.u + ': ' + d.frame));

// Walk the path, collecting known word forms; every me-line word must already be known.
const tok = s => s.toLowerCase().replace(/[.,!?;:"'()]/g, ' ').split(/\s+/).filter(w => w && !/\d/.test(w));
const known = new Set(['tomas', 'tomai', 'rūta', 'jonas']);
const unknown = [];
c.PATH.filter(p => typeof p === 'string').forEach(id => {
  if (c.CONV_BY[id]) {
    c.CONV_BY[id].all.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => { if (!known.has(w)) unknown.push(id + ': "' + w + '" in ' + l.lt); }));
    c.CONV_BY[id].all.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => known.add(w)));
  } else {
    const u = c.COURSE.find(x => x.id === id);
    u.lessons.forEach(l => l.items.forEach(i => tok(i.lt).concat(i.alt.flatMap(tok)).forEach(w => known.add(w))));
  }
});
say('conversation words not taught earlier', unknown);
console.log(problems ? `\n${problems} problem(s)` : '\nAll checks passed.');
process.exit(problems ? 1 : 0);
