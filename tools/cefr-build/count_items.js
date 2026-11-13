// node count_items.js file.js  -> per item: Lithuanian words, English words, lines
const fs=require('fs');const s=fs.readFileSync(process.argv[2],'utf8');
const q=(t,o,a)=>({t,o,a});
const items=eval('['+s.replace(/\/\*[\s\S]*?\*\//g,'')+']');
for(const it of items){const lt=it.lines.map(l=>l[1]).join(' '),en=it.lines.map(l=>l[2]).join(' ');
  const n=x=>x.split(/\s+/).filter(Boolean).length;console.log(it.id,'lt',n(lt),'en',n(en),'lines',it.lines.length);}
