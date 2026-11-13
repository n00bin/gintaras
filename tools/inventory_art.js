// Inventory the pictures actually shown by a language pack, including its semantic fallbacks.
const fs = require('fs');
const path = require('path');
const lang = process.argv[2] || 'lt';
const c = {};
new Function('c', 'function esc(s){return s};function norm(s){return s.toLowerCase().replace(/[.,!?;:\"\u0027¿¡]/g, "").replace(/\\s+/g," ").trim()};' + fs.readFileSync(path.join(__dirname, '..', 'lang', lang + '.js'), 'utf8') + ';Object.assign(c,{ITEMS,COURSE,picFor,CAST_LOOK});')(c);
const pictures = c.ITEMS.map(i => ({word:i.lt,en:i.en,unit:i.unit.id,picture:c.picFor(i.lt)})).filter(r => r.picture);
const inventory = {cast:c.CAST_LOOK,units:c.COURSE.map(u=>({id:u.id,title:u.en})),pictures};
fs.writeFileSync(path.join(__dirname, '..', 'docs/art-direction', lang + '-inventory.json'), JSON.stringify(inventory, null, 2) + '\n');
console.log(JSON.stringify({words:c.ITEMS.length,visible:pictures.length,approvedArt:pictures.filter(r=>r.picture.startsWith('art-v2/')).length,oldArt:pictures.filter(r=>r.picture.startsWith('art/')).length,emoji:pictures.filter(r=>!r.picture.startsWith('art/')&&!r.picture.startsWith('art-v2/')&&!r.picture.startsWith('#')).length,textTiles:pictures.filter(r=>r.picture.startsWith('#')).length,cast:c.CAST_LOOK}));
