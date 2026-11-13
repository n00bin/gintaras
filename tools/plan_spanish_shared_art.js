// Report exact-English reuse candidates for manual semantic review. Never edits course content.
const fs=require('fs');
function pack(code){const c={};new Function('c','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+fs.readFileSync('lang/'+code+'.js','utf8')+';Object.assign(c,{ITEMS,PICTURE_ASSETS,picFor});')(c);return c;}
const lt=pack('lt'),es=pack('es'),key=s=>s.toLowerCase().trim().replace(/^(?:the|a|an) /,'');
const senses=s=>key(s).replace(/\([^)]*\)/g,'').split(/[\/;]/).map(s=>s.trim()).filter(Boolean);
const candidates=[];
for(const item of es.ITEMS){if(es.PICTURE_ASSETS[item.lt])continue;
 const matches=lt.ITEMS.filter(i=>senses(i.en).some(s=>senses(item.en).includes(s))&&lt.PICTURE_ASSETS[i.lt]);
 if(matches.length)candidates.push({word:item.lt,en:item.en,id:item.id,current:es.picFor(item.lt),options:matches.map(i=>({word:i.lt,en:i.en,asset:lt.PICTURE_ASSETS[i.lt]}))});
}
fs.writeFileSync('docs/spanish/shared-art-candidates.json',JSON.stringify(candidates,null,2)+'\n');
console.log(JSON.stringify({candidates:candidates.length,rows:candidates.map(i=>({word:i.word,en:i.en,asset:i.options[0].asset}))},null,2));
