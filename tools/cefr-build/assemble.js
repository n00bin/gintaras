// node assemble.js raw.txt out.txt
// raw format:  == uID|LT title|EN title|what the words are for (English)|speaking tip
//              lt|en|pron           (candidate cards)
// Drops candidates whose lt or en is already a card (outside these units), repeats, or that add no new word form.
// Writes a units file for build_units.js: lessons of 10 cards, tip built from the unit's first three cards.
const fs=require('fs');const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('G:/ai_projects/gintaras/lang/lt.js','utf8')+';Object.assign(c,{COURSE,ITEMS});')(c);
const tok=s=>s.toLowerCase().replace(/[^a-ząčęėįšųūž ]/g,' ').split(/\s+/).filter(Boolean);
const raw=fs.readFileSync(process.argv[2],'utf8').split('\n');
const ids=new Set(raw.filter(l=>l.startsWith('== ')).map(l=>l.slice(3).split('|')[0]));
// also skip units built by other cefr files that come later? no: only exclude these ids
const forms=new Set(),lt=new Set(),en=new Set();
for(const i of c.ITEMS){if(ids.has(i.unit.id))continue;tok(i.lt0||i.lt).forEach(w=>forms.add(w));lt.add(i.lt.toLowerCase());en.add(i.en.toLowerCase());}
for(const f of (process.argv[4]||'').split(',').filter(Boolean))for(const l of fs.readFileSync(f,'utf8').split('\n')){if(!l.includes('|')||/^[@#%+=]/.test(l))continue;const [a,b]=l.split('|');tok(a).forEach(w=>forms.add(w));lt.add(a.toLowerCase());en.add(b.toLowerCase());}
const units=[];let cur=null,dropped=0,newForms=0;
for(const l of raw){
  if(l.startsWith('%')){units.push({part:l});continue;}
  if(l.startsWith('== ')){const [id,t,e,what,sp]=l.slice(3).split('|');cur={id,t,e,what,sp,cards:[]};units.push(cur);continue;}
  if(!l.includes('|')||!cur)continue;
  const [a,b,p]=l.split('|').map(s=>s.trim());if(!a||!b||!p){console.log('bad line:',l);continue;}
  if(/[а-яё]/i.test(l)){console.log('cyrillic:',l);continue;}
  const A=a.toLowerCase(),B=b.toLowerCase(),nf=tok(a).filter(w=>!forms.has(w));
  if(lt.has(A)||en.has(B)||!nf.length){dropped++;continue;}
  lt.add(A);en.add(B);nf.forEach(w=>forms.add(w));newForms+=nf.length;cur.cards.push([a,b,p]);
}
const out=[];for(const u of units){
  if(u.part){out.push(u.part);continue;}
  if(u.cards.length<5){console.log('unit',u.id,'too few cards:',u.cards.length);continue;}
  const f=u.cards.slice(0,3).map(([a,b])=>`<b>${a}</b> (${b.replace(/\s*\(.*?\)/g,'')})`);
  out.push(`@${u.id}|${u.t}|${u.e}|${u.what}: ${f[0]}, ${f[1]} and ${f[2]}.|${u.sp}`);
  const ch=[];for(let k=0;k*10<u.cards.length;k++)ch.push(u.cards.slice(k*10,k*10+10));
  if(ch.length>1&&ch[ch.length-1].length<5)ch[ch.length-2].push(...ch.pop());
  ch.forEach((cs,k)=>{out.push(`#${u.id}${'abcdefgh'[k]}|${u.e}, part ${k+1}`);cs.forEach(c=>out.push(c.join('|')));});
}
fs.writeFileSync(process.argv[3],out.join('\n')+'\n');
console.log(units.filter(u=>!u.part).map(u=>u.id+':'+u.cards.length).join(' '),'| dropped',dropped,'| new forms',newForms);
