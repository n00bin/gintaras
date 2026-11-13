// Every word form a learner "knows" by the end of the path (cards + earlier conversation replies), for writing B1 conversation replies.
// node known.js check "<sentence>" ...   -> prints unknown words
const fs=require('fs');const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('G:/ai_projects/gintaras/lang/lt.js','utf8')+';Object.assign(c,{COURSE,ITEMS,CONVS,CAST_GV});')(c);
const tok=s=>s.toLowerCase().replace(/[.,!?;:"'()¿¡–]/g,' ').split(/\s+/).filter(w=>w&&!/\d/.test(w));
const known=new Set(['tomas','tomai','rūta','jonas'].concat(Object.keys(c.CAST_GV).map(n=>n.toLowerCase())));
c.ITEMS.forEach(i=>tok(i.lt).concat((i.alt||[]).flatMap(tok)).forEach(w=>known.add(w)));
c.CONVS.forEach(v=>v.all.filter(l=>l.kind==='m').forEach(l=>tok(l.lt).forEach(w=>known.add(w))));
if(process.argv[2]==='check'){for(const s of process.argv.slice(3)){const u=tok(s).filter(w=>!known.has(w));console.log(u.length?'✗ '+s+'  -> '+u.join(', '):'✓ '+s);}}
else {fs.writeFileSync(__dirname+'/known.json',JSON.stringify([...known].sort()));console.log(known.size,'known forms');}
