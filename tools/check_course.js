// Checks the course for structural mistakes before audio is recorded or anything is pushed.
// Usage: node tools/check_course.js [language code, default lt]
// - every original lesson is used exactly once, every PATH entry exists
// - every lesson has a tip, every unit a speaking tip, every word a "sounds like"
// - no two items share the same English (answers would be ambiguous)
// - every word you must write or say in a conversation was taught earlier on the path
// - every conversation reply can be said (words, English and a prompt), every choice has two or more options
// - (Round 11) a mini chat uses only the words of the lessons before it; every make-a-sentence word is taught by some card
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const lang = process.argv[2] || 'lt';
// the course lives in lang/<code>.js; the app version stays in index.html
const js = fs.readFileSync(path.join(__dirname, '..', 'lang', lang + '.js'), 'utf8');
const head = html.split('<script>')[1].split('/* ===================== LANGUAGES')[0];
const pre = "function norm(s){return s.toLowerCase().replace(/[.,!?;:\"'¿¡]/g,'').replace(/\\s+/g,' ').trim();}function esc(s){return s}";
const c = {};
new Function('c', pre + js + ';Object.assign(c,{PICTURE_ASSETS:typeof PICTURE_ASSETS!=="undefined"?PICTURE_ASSETS:{},NO_PIC:typeof NO_PIC!=="undefined"?NO_PIC:new Set(),ART:typeof ART!=="undefined"?ART:null,ART_UNITS:typeof ART_UNITS!=="undefined"?ART_UNITS:[],ART_NONE:typeof ART_NONE!=="undefined"?ART_NONE:new Set(),artSlug:typeof artSlug!=="undefined"?artSlug:null,LANG,pronFor,CAST_GV,CANDO,ME_BANK,COURSE,ITEMS,PRON,CONVS,CONV_BY,PATH,LESSON_TIPS,SPEAK_TIPS,DRILLS,PATTERNS,GRAMMAR:typeof GRAMMAR!=="undefined"?GRAMMAR:[],unitTipText:typeof unitTipText!=="undefined"?unitTipText:null,WORDS,GLUE,EMOJI,norm,MAKE:typeof MAKE!=="undefined"?MAKE:[],picFile:typeof picFile!=="undefined"?picFile:null});')(c);
let problems = 0;
const say = (label, list) => { if (list.length) { problems += list.length; console.log('✗ ' + label + ':', list.join(' | ')); } else console.log('✓ ' + label); };

const units = new Set(c.COURSE.map(u => u.id));
say('PATH entries that do not exist', c.PATH.filter(p => typeof p === 'string' && !units.has(p) && !c.CONV_BY[p]));
const bases = {}; c.COURSE.forEach(u => u.lessons.filter(l => !l.speak).forEach(l => { const b = l.id.replace(/-\d+$/, ''); bases[b] = (bases[b] || 0) + 1; }));
const parts = c.COURSE.flatMap(u => u.lessons.filter(l => !l.speak).map(l => l.id));
/* (Round 8) a lesson can have no tip of its own (tips go with the lesson that teaches their words), but every tip is shown */
{ const all = Object.values(c.LESSON_TIPS).join('\n'), keys = new Set(c.COURSE.flatMap(u => u.lessons.flatMap(l => l.parts || [l.id])));
  say('lesson tips that are never shown', Object.keys(c.LESSON_TIPS).filter(k => keys.has(k) && !parts.includes(k) && !all.includes(c.LESSON_TIPS[k]) && !c.COURSE.some(u => u.lessons.some(l => (c.LESSON_TIPS[l.id] || '').includes(c.LESSON_TIPS[k]))))); }
say('units without a speaking tip', [...units].filter(id => !c.SPEAK_TIPS[id]));
// A phrase is covered if it has its own respelling, or every word in it has one (the app pieces them together).
const ci = {}; Object.keys(c.PRON).forEach(k => { ci[k.toLowerCase().replace(/[.,!?]+$/, '')] = 1; });
Object.keys(c.PRON).forEach(k => { const ws = k.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/), ps = c.PRON[k].split(' '); if (ws.length > 1 && ws.length === ps.length) ws.forEach(w => { ci[w] = 1; }); });
// Spanish spelling is regular, so its "sounds like" is worked out from the spelling: every word just needs a stressed syllable.
const covered = t => c.LANG.code !== 'lt' ? /[A-Z]/.test(c.pronFor(t)) && !/undefined/.test(c.pronFor(t)) : ci[t.toLowerCase().replace(/[.,!?]+$/, '')] || t.split(/(?<=[.!?])\s+/).every(sen => ci[sen.toLowerCase().replace(/[.,!?]+$/, '').trim()] || sen.split(/,\s*/).every(part => ci[part.toLowerCase().replace(/[.,!?]+$/, '').trim()] || part.toLowerCase().replace(/[.,!?]/g, '').split(/\s+/).filter(Boolean).every(w => ci[w])));
say('words without a "sounds like"', c.ITEMS.filter(i => !covered(i.lt)).map(i => i.lt));
say('conversation lines without a "sounds like"', c.CONVS.flatMap(v => v.all.filter(l => l.lt && !covered(l.lt)).map(l => v.id + ': ' + l.lt)));
say('About-you sentences without a "sounds like"', c.ME_BANK.filter(i => !covered(i.lt)).map(i => i.lt));
const en = {}; c.ITEMS.forEach(i => { const k = i.en.toLowerCase().replace(/[.,!?]/g, ''); (en[k] = en[k] || []).push(i.lt); });
say('items sharing the same English', Object.entries(en).filter(e => e[1].length > 1).map(e => e[0] + ' = ' + e[1].join(' / ')));
const lt = {}; c.ITEMS.forEach(i => { (lt[i.lt] = lt[i.lt] || []).push(i.id); });
say('items sharing the same Lithuanian', Object.entries(lt).filter(e => e[1].length > 1).map(e => e[0]));
say('phrase words without a meaning in "Built from"', [...new Set(c.ITEMS.filter(i => i.lt.trim().includes(' ')).flatMap(i => i.lt.split(' ').map(w => c.norm(w)).filter(k => k && !c.WORDS[k] && !c.GLUE[k])))]);
say('words without a picture', c.ITEMS.filter(i => !c.EMOJI[i.lt] && !c.NO_PIC.has(i.lt)).map(i => i.lt));
// every picture must be on the server, or the app shows an emoji and the offline download never finishes
if (c.picFile) say('pictures missing from pics/', [...new Set(Object.values(c.EMOJI).filter(v => v && v[0] !== '#'))].filter(v => !fs.existsSync(path.join(__dirname, '..', c.picFile(v)))).map(v => v + ' ' + c.picFile(v)));
if (c.picFile) say('shared illustrations missing from pics/', Object.entries(c.PICTURE_ASSETS).filter(([word, asset]) => !fs.existsSync(path.join(__dirname, '..', c.picFile(asset)))).map(([word, asset]) => word + ' ' + c.picFile(asset)));
say('shared illustrations mapped to words outside the course', Object.keys(c.PICTURE_ASSETS).filter(word => !c.ITEMS.some(i => i.lt === word)));
// (the Flat warm rollout) every drawn word has a real picture: there, 256 x 256, complete, not oversized, its own file; a finished unit has every word drawn or on purpose none
if (c.ART) { const dir = path.join(__dirname, '..', 'pics', 'art'), MAX = 13 * 1024, names = {}, have = new Set(fs.existsSync(dir) ? fs.readdirSync(dir) : []);
  const webpSize = b => { if (b.length < 30 || b.toString('latin1', 0, 4) !== 'RIFF' || b.toString('latin1', 8, 12) !== 'WEBP' || b.readUInt32LE(4) + 8 !== b.length) return null; const kind = b.toString('latin1', 12, 16);
    if (kind === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]; if (kind === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
    if (kind === 'VP8L') { const v = b.readUInt32LE(21); return [(v & 0x3fff) + 1, ((v >> 14) & 0x3fff) + 1]; } return null; };
  const broken = [], wrong = [], heavy = [];
  c.ART.forEach(lt => { const f = c.artSlug(lt) + '.webp', p = path.join(dir, f); (names[f] = names[f] || []).push(lt); if (!fs.existsSync(p)) return; const b = fs.readFileSync(p), s = webpSize(b);
    if (!s) broken.push(lt + ' (' + f + ')'); else if (s[0] !== 256 || s[1] !== 256) wrong.push(lt + ' is ' + s.join(' x ')); if (b.length > MAX) heavy.push(lt + ' ' + Math.round(b.length / 1024) + ' KB'); });
  say('drawn words whose picture is missing from pics/art/', [...c.ART].filter(lt => !fs.existsSync(path.join(dir, c.artSlug(lt) + '.webp'))));
  say('drawn pictures that are broken or cut short', broken);
  say('drawn pictures that are not 256 x 256', wrong);
  say('drawn pictures over 13 KB', heavy);
  say('drawn words sharing a file name', Object.values(names).filter(v => v.length > 1).map(v => v.join(' / ')));
  say('files in pics/art/ no word uses', [...have].filter(f => !names[f]));
  say('drawn words that are not in the course', [...c.ART].filter(lt => !c.ITEMS.some(i => i.lt === lt)));
  say('words in a finished unit with no drawing and not marked as no picture', c.COURSE.filter(u => c.ART_UNITS.includes(u.id)).flatMap(u => u.lessons.filter(l => !l.speak).flatMap(l => l.items.filter(i => !c.ART.has(i.lt) && !c.ART_NONE.has(i.lt)).map(i => i.lt)))); }
{ const base = new Set(c.ITEMS.map(i => i.sec || i.lesson.id.replace(/-\d+$/, ''))); /* sec: the section a word was written in, kept when lessons are regrouped */ const ids = c.CANDO.map(x => x[0]);
  say('real-life skills pointing at a missing lesson', c.CANDO.flatMap(x => x[3].filter(l => !base.has(l)).map(l => x[0] + ': ' + l)));
  say('real-life skills pointing at a missing conversation', c.CANDO.filter(x => x[4] && !c.CONV_BY[x[4]]).map(x => x[0] + ': ' + x[4]));
  say('real-life skills sharing an id', ids.filter((x, i) => ids.indexOf(x) !== i)); }
// Say it can always be finished: every reply you give (choices included) has its words, its English and a prompt to answer.
say('conversation replies that can’t be said', c.CONVS.flatMap(v => v.all.filter(l => l.kind === 'm' && (!l.id || !l.lt || !l.en || !l.hint)).map(l => v.id + ': ' + (l.lt || l.id))));
say('conversation choices with fewer than two options', c.CONVS.flatMap(v => v.all.filter(l => l.kind === 'c' && !(l.opts && l.opts.length >= 2 && l.opts.every(o => o.line && o.line.lt))).map(() => v.id)));
say('drills pointing at a missing unit', c.DRILLS.filter(d => !units.has(d.u)).map(d => d.u + ': ' + d.frame));

// Walk the path, collecting known word forms; every me-line word must already be known.
const tok = s => s.toLowerCase().replace(/[.,!?;:"'()¿¡]/g, ' ').split(/\s+/).filter(w => w && !/\d/.test(w));
const known = new Set(['tomas', 'tomai', 'rūta', 'jonas', 'tomás'].concat(Object.keys(c.CAST_GV).map(n => n.toLowerCase())));
const unknown = [], drillUnknown = [];
/* little words a drill may use before its unit teaches them on their own (they come inside taught phrases) */
/* another ending of a taught word (laiminga from laimingas, Klaipėdą from Klaipėda): drills practise exactly that */
const aForm = w => w.length >= 4 && [...known].some(k => k.length >= 4 && Math.abs(k.length - w.length) <= 2 && w.slice(0, Math.min(w.length, k.length) - 2) === k.slice(0, Math.min(w.length, k.length) - 2) && Math.min(w.length, k.length) - 2 >= 3);
const glue = new Set(Object.keys(c.GLUE || {}).map(w => w.toLowerCase()));
const taughtLt = new Set(), names = new Set(['tomas', 'tomai', 'rūta', 'jonas', 'tomás', 'toma', 'rūtai', 'jonai'].concat(Object.keys(c.CAST_GV).map(n => n.toLowerCase())));
c.PATH.filter(p => typeof p === 'string').forEach(id => {
  if (c.CONV_BY[id]) {
    c.CONV_BY[id].all.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => { if (!known.has(w)) unknown.push(id + ': "' + w + '" in ' + l.lt); }));
    c.CONV_BY[id].all.filter(l => l.kind === 'm').forEach(l => tok(l.lt).forEach(w => known.add(w)));
  } else {
    const u = c.COURSE.find(x => x.id === id);
    u.lessons.forEach(l => l.items.forEach(i => tok(i.lt).concat(i.alt.flatMap(tok)).forEach(w => known.add(w))));
    /* (Round 6) a sentence drill is a test: every word of its finished sentence is a word of a course card taught by the
       drill's own lesson or earlier (no whole-unit shortcut, no "glue" exceptions). (Round 7) Its choices are offered only
       once met, so at least one of them must be taught by then. The app drops a drill that fails either, so a drill listed
       here would never be shown. */
    const unmet = s => tok(s).filter(w => /\p{L}/u.test(w) && !taughtLt.has(w) && !names.has(w));
    const missing = d => { const m = [...new Set(unmet(d.frame.replace('___', d.ans)))]; if (!d.opts.some(o => !unmet(o).length)) m.push('a choice (' + d.opts.join(' / ') + ')'); return m; };
    const fits = {};
    u.lessons.forEach((l, li) => { l.items.forEach(i => tok(i.lt).forEach(w => taughtLt.add(w)));
      c.DRILLS.filter(d => !d.off && d.u === id && (d.l ? (l.parts || [l.id]).some(x => d.l.includes(x)) : li === u.lessons.length - 1)).forEach(d => { const m = missing(d); if (!m.length) fits[d.frame] = true; else if (!fits[d.frame]) fits[d.frame] = m; }); });
    Object.entries(fits).forEach(([fr, m]) => { if (m !== true) drillUnknown.push(id + ': ' + fr + ' needs ' + m.join(', ')); });
  }
});
say('conversation words not taught earlier', unknown);
/* (Round 11) a mini chat (after: a lesson) uses only words of that lesson and the ones before it, in every line, theirs and the
   wrong options too: nothing new to announce */
{ const bad = [], order = [];
  c.PATH.filter(p => typeof p === 'string' && !c.CONV_BY[p]).forEach(id => { const u = c.COURSE.find(x => x.id === id); if (u) u.lessons.forEach(l => order.push(l)); });
  c.CONVS.filter(v => v.after).forEach(v => { const k = order.findIndex(l => l.id === v.after); if (k < 0) { bad.push(v.id + ': lesson ' + v.after + ' is not on the path'); return; }
    const kn = new Set(names); order.slice(0, k + 1).forEach(l => l.items.forEach(i => tok(i.lt).concat((i.alt || []).flatMap(tok)).forEach(w => kn.add(w))));
    v.all.filter(l => l.lt).forEach(l => tok(l.lt).forEach(w => { if (!kn.has(w)) bad.push(v.id + ': "' + w + '" in ' + l.lt); }));
    v.all.filter(l => l.kind === 'm').forEach(l => (l.no || []).forEach(n => tok(n[0]).forEach(w => { if (!kn.has(w)) bad.push(v.id + ': "' + w + '" in the wrong option ' + n[0]); }))); });
  say('mini chat words not taught by the lesson it follows', bad); }
/* (Round 11) every word of a "make your own sentence" is a word of some course card (the app shows one only once all of them
   are taught, so a word no card teaches would hide it for good) */
{ const lexI = new Set(); c.ITEMS.forEach(i => tok(i.lt0 || i.lt).forEach(w => lexI.add(w)));
  say('make-a-sentence words that no card teaches', c.MAKE.flatMap(m => tok(m[0]).filter(w => !lexI.has(w) && !names.has(w)).map(w => m[0] + ': ' + w))); }

/* (Round 8) A tip doesn't teach a word: every Lithuanian word a lesson tip, a speaking tip, a unit tip, its pattern table or
   a grammar table or a New word card's note shows has its own New word card, in the lesson that shows it or before it on the path. Lithuanian here
   is a word in bold (longer than an ending), a word with a Lithuanian letter, or a course word that isn't also English. Names (people, cities) are
   not words to learn. */
{ const tw = s => (s || '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[.,!?;:"'()¿¡·→=+\/…]/g, ' ').split(/\s+/).filter(w => w && /\p{L}/u.test(w) && !/\d/.test(w) && !/-/.test(w));
  const lex = new Set();
  c.ITEMS.forEach(i => tw(i.lt).concat((i.alt || []).flatMap(tw)).forEach(w => lex.add(w)));
  c.CONVS.forEach(v => v.all.forEach(l => l.lt && tw(l.lt).forEach(w => lex.add(w))));
  Object.keys(c.WORDS).concat(Object.keys(c.GLUE)).forEach(k => tw(k).forEach(w => lex.add(w)));
  const ENG = new Set('a i o be man is it to me no as at on in so ten bus try re'.split(' '));
  const ENGB = new Set(['letters']);
  const NAMES = new Set([...names, 'bobas', 'markas', 'markai', 'vilnius', 'kaunas', 'klaipėda', 'halės', 'amerika']);
  const shows = h => { const b = new Set([...(h || '').matchAll(/<b>(.*?)<\/b>/g)].flatMap(m => tw(m[1])));
    return [...new Set(tw((h || '').replace(/<\/?b>/g, '')).filter(w => (lex.has(w) || /[ąčęėįšųūž]/.test(w) || b.has(w) && w.length > 3 && !ENGB.has(w)) && (w.length > 1 || lex.has(w)) && (lex.has(w) || w.length > 3) &&
      (b.has(w) || /[ąčęėįšųūž]/.test(w) || !ENG.has(w)) && !NAMES.has(w)))]; };
  const cards = new Set(), bad = [];
  const look = (where, h) => { const m = shows(h).filter(w => !cards.has(w)); if (m.length) bad.push(where + ': ' + m.join(', ')); };
  c.PATH.filter(p => typeof p === 'string' && !c.CONV_BY[p]).forEach(id => { const u = c.COURSE.find(x => x.id === id);
    u.lessons.forEach(l => { l.items.forEach(i => tw(i.lt).concat((i.alt || []).flatMap(tw)).forEach(w => cards.add(w)));
      l.items.forEach(i => look(l.id + ' note on ' + i.lt, i.note));
      if (l.speak) look(l.id + ' speaking tip', c.SPEAK_TIPS[u.id]); else look(l.id + ' tip', c.LESSON_TIPS[l.id]);
      if (l.id === (u.tipAt || u.lessons[0].id)) look(id + ' unit tip and pattern (with ' + l.id + ')', c.unitTipText ? c.unitTipText(u) : u.tip); });
    c.GRAMMAR.filter(g => g.u === id).forEach(g => look(id + ' grammar table "' + g.name + '"', g.rows.map(r => '<b>' + r[0] + '</b>').join(' ') + ' ' + g.note)); });
  say('tip words with no New word card by the lesson that shows them', bad); }
console.log('  (' + c.DRILLS.filter(d => d.off).length + ' sentence drills are off until their words are taught)');
say('drill words (sentence, and one choice) not taught by the lesson of the drill or earlier', [...new Set(drillUnknown)]);
/* Teach before test is checked for real by tools/check_cards.py, which plays every lesson in the app (Round 6: the old check
   here only looked for the guard's code, and passed while the guard missed sentence cards, choices and placement words). This
   only makes sure the guard still reads every Lithuanian word a card shows. */
say('teach-before-test guard reads every word a card shows', /function cardWords\(e\)/.test(html) && /wordsNeed\(cardWords\(e\)/.test(html) && /function taught\(i\)\{const r=peek\(i\.id\);return !!\(r\.intro/.test(html) ? [] : ['the guard in drawStep() or taught() has changed: run python tools/check_cards.py']);
{ const v = (head.match(/const APP_VERSION=(\d+);/) || [])[1], sw = (fs.readFileSync(path.join(__dirname, '..', 'sw.js'), 'utf8').match(/gintaras-shell-v(\d+)/) || [])[1];
  say('app release looks like 1.0 or 1.0.1', /const APP_RELEASE='\d+\.\d+(\.\d+)?';/.test(head) ? [] : ['APP_RELEASE missing or malformed']);
  say('app version and sw.js cache name match', v && v === sw ? [] : ['APP_VERSION ' + v + ' vs sw.js v' + sw]); }
console.log(problems ? `\n${problems} problem(s)` : '\nAll checks passed.');
process.exit(problems ? 1 : 0);
