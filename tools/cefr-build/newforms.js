// node newforms.js file.txt [file2.txt ...]  -> counts word forms the cards would add, flags lt/en already used by a live card
const fs=require('fs');const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('G:/ai_projects/gintaras/lang/lt.js','utf8')+';Object.assign(c,{COURSE,ITEMS});')(c);
const tok=s=>s.toLowerCase().replace(/[^a-ząčęėįšųūž ]/g,' ').split(/\s+/).filter(Boolean);
const own=new Set(process.argv.slice(2).flatMap(f=>fs.readFileSync(f,'utf8').split('\n').filter(l=>/^@u/.test(l)).map(l=>l.slice(1).split('|')[0])));
const forms=new Set(),lt=new Map(),en=new Map();
for(const i of c.ITEMS){if(own.has(i.unit.id))continue;tok(i.lt0||i.lt).forEach(w=>forms.add(w));lt.set(i.lt.toLowerCase(),i.unit.id);en.set(i.en.toLowerCase(),i.unit.id);}
const seenLt=new Map(),seenEn=new Map();let add=new Set(),cards=0,bad=[];
for(const f of process.argv.slice(2))for(const [n,l] of fs.readFileSync(f,'utf8').split('\n').entries()){
  if(!l.includes('|')||/^[@#%+]/.test(l))continue;const [a,b]=l.split('|');cards++;
  const A=a.toLowerCase(),B=b.toLowerCase();
  if(lt.has(A))bad.push(`${f}:${n+1} lt "${a}" already in ${lt.get(A)}`);if(en.has(B))bad.push(`${f}:${n+1} en "${b}" already in ${en.get(B)}`);
  if(seenLt.has(A))bad.push(`${f}:${n+1} lt "${a}" repeated (line ${seenLt.get(A)})`);if(seenEn.has(B))bad.push(`${f}:${n+1} en "${b}" repeated (line ${seenEn.get(B)})`);
  seenLt.set(A,n+1);seenEn.set(B,n+1);tok(a).forEach(w=>{if(!forms.has(w))add.add(w)});
  if(/[а-яё]/i.test(l))bad.push(`${f}:${n+1} Cyrillic letter`);
}
console.log(cards,'cards,',add.size,'new forms');bad.forEach(x=>console.log('  '+x));
