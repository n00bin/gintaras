// Writes the sheets a native speaker checks: every card with the answers it accepts, and every tip and note the app shows.
// Usage: node tools/export_answers.js [language code, default lt]
// Out: docs/review/<code>_answers.csv and docs/review/<code>_notes.csv (open in Excel or Google Sheets).
// The empty columns at the end are for the reviewer: "ok" / "wrong" / "also right: ...", and a comment.
const fs = require('fs');
const path = require('path');
const lang = process.argv[2] || 'lt';
const js = fs.readFileSync(path.join(__dirname, '..', 'lang', lang + '.js'), 'utf8');
const pre = "function norm(s){return s.toLowerCase().replace(/[.,!?;:\"'¿¡]/g,'').replace(/\\s+/g,' ').trim();}function esc(s){return s}";
const c = {};
new Function('c', pre + js + ';Object.assign(c,{LANG,COURSE,ITEMS,LESSON_TIPS,SPEAK_TIPS,PATH,typeof:0,ALSO:typeof ALSO!=="undefined"?ALSO:{}});')(c);
const cell = v => '"' + String(v == null ? '' : v).replace(/<[^>]+>/g, '').replace(/"/g, '""') + '"';
const row = a => a.map(cell).join(',');
const enKey = s => String(s).toLowerCase().replace(/\([^)]*\)/g, '').replace(/[.,!?]/g, '').trim();
const out = path.join(__dirname, '..', 'docs', 'review');
fs.mkdirSync(out, { recursive: true });

const A = [row(['card id', 'unit', 'lesson', 'English shown', 'answer the card teaches', 'also accepted', 'other cards with the same English', 'note shown', 'your verdict', 'what it should be', 'comment'])];
c.ITEMS.filter(i => !i.unit.retire).forEach(i => {
  const same = c.ITEMS.filter(x => x !== i && enKey(x.en) === enKey(i.en)).map(x => x.lt + ' (' + x.en + ')');
  A.push(row([i.id, i.unit.en, i.lesson.title || '', i.en, i.lt, (i.alt || []).join(' / '), same.join(' / '), i.note || '', '', '', '']));
});
fs.writeFileSync(path.join(out, lang + '_answers.csv'), '﻿' + A.join('\r\n'));

const N = [row(['where', 'id', 'text shown', 'your verdict', 'what it should be', 'comment'])];
c.COURSE.forEach(u => { if (u.tip) N.push(row(['unit tip', u.id + ' ' + u.en, u.tip, '', '', ''])); });
Object.entries(c.LESSON_TIPS).forEach(([k, v]) => N.push(row(['lesson tip', k, v, '', '', ''])));
Object.entries(c.SPEAK_TIPS).forEach(([k, v]) => N.push(row(['speaking tip', k, v, '', '', ''])));
['dropWho', 'dropBe', 'qNote', 'politeNote', 'foldNote', 'caronNote'].forEach(k => { if (typeof c.LANG[k] === 'string') N.push(row(['answer explanation', k, c.LANG[k], '', '', ''])); });
if (c.LANG.formNote) [['mus', 'mes'], ['man', 'aš'], ['tau', 'tu'], ['puikus', 'puikiai'], ['geras', 'gerai'], ['jos', 'jo']].forEach(([g, t]) => N.push(row(['answer explanation', g + ' for ' + t, c.LANG.formNote(g, t), '', '', ''])));
fs.writeFileSync(path.join(out, lang + '_notes.csv'), '﻿' + N.join('\r\n'));
console.log('Wrote', A.length - 1, 'cards and', N.length - 1, 'notes to docs/review/');
