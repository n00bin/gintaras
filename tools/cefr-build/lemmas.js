// Rough dictionary-word count (crude Lithuanian stemmer) for the live units of given levels.
const fs=require('fs');const levels=process.argv.slice(2);
const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('G:/ai_projects/gintaras/lang/lt.js','utf8')+';Object.assign(c,{COURSE,ITEMS});')(c);
const t=JSON.parse(fs.readFileSync('G:/ai_projects/gintaras/docs/cefr/lithuanian-finish-line.json','utf8'));
const units=new Set(levels.flatMap(l=>t.live_units[l]||[]));
const forms=new Set();for(const i of c.ITEMS)if(units.has(i.unit.id))for(const w of (i.lt0||i.lt).toLowerCase().replace(/[^a-ząčęėįšųūž ]/g,' ').split(/\s+/))if(w)forms.add(w);
const ends=['iausiai','uosi','iuosi','iesi','asis','ojo','ame','ate','ome','ote','iau','iai','ių','ų','ais','ams','oms','ėms','ose','ėse','uose','ias','ius','ys','is','as','us','ai','ei','ui','oje','ėje','yje','ą','ę','į','o','ė','a','e','i','u','y','ti','au','ime','ite','ia'].sort((x,y)=>y.length-x.length);
const stem=w=>{for(const e of ends)if(w.length-e.length>=3&&w.endsWith(e))return w.slice(0,-e.length);return w;};
const stems=new Set([...forms].map(stem));console.log(levels.join('+'),'word forms',forms.size,'rough dictionary words',stems.size);
fs.writeFileSync(__dirname+'/taught-forms.json',JSON.stringify([...forms]));
