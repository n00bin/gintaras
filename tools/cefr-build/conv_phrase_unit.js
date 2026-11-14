// node conv_phrase_unit.js <convs.js> <out units.txt> <unit id> "<ES title>|<EN title>|<speaking tip>" ["%part|sub"]
// Builds a phrase unit whose cards are the learner's replies ('m' lines) of the conversations in <convs.js>,
// in lessons of up to 10, followed by a +cv line so the conversations come right after it on the path.
// The unit tip shows the first three replies (they are in the first lesson part, so the tip check passes).
const fs = require('fs');
const [file, out, id, titles, part] = process.argv.slice(2);
const convs = new Function('return [' + fs.readFileSync(file, 'utf8') + ']')();
const cards = []; const seen = new Set();
for (const c of convs) for (const l of c.lines) if (l[0] === 'm' && !seen.has(l[1].toLowerCase())) { seen.add(l[1].toLowerCase()); cards.push([l[1], l[2]]); }
const [es, en, speak] = titles.split('|');
const f = cards.slice(0, 3).map(([a, b]) => `<b>${a}</b> (${b})`);
const lines = []; if (part) lines.push(part);
lines.push(`@${id}|${es}|${en}|The replies you need for the conversations that follow, for example ${f[0]}, ${f[1]} and ${f[2]}.|${speak}`);
for (let k = 0; k * 10 < cards.length; k++) { lines.push(`#${id}${'abcdefgh'[k]}|${en}, part ${k + 1}`); cards.slice(k * 10, k * 10 + 10).forEach(c => lines.push(c.join('|'))); }
lines.push('+' + convs.map(c => c.id).join(','));
fs.writeFileSync(out, lines.join('\n') + '\n'); console.log(convs.length, 'conversations,', cards.length, 'reply cards');
