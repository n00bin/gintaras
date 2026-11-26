// Read current runtime mappings without changing the course or historic inventories.
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const out = path.join(root, 'output/image-semantic-audit');
fs.mkdirSync(out, {recursive:true});
const languages = {};
for (const lang of ['lt','es']) {
  const c = {};
  new Function('c', 'function esc(s){return s};function norm(s){return s.toLowerCase().replace(/[.,!?;:"\u0027¿¡]/g, "").replace(/\\s+/g," ").trim()};' + fs.readFileSync(path.join(root,'lang',lang+'.js'),'utf8') + ';Object.assign(c,{ITEMS,CONVS,picFor,PICTURE_ASSETS,CAST_PICTURES,LEARNER_PICTURE});')(c);
  languages[lang] = {
    items:c.ITEMS.map(i=>({id:i.id,word:i.lt,en:i.en,unit:i.unit.id,picture:c.picFor(i.lt)||''})),
    mappings:c.PICTURE_ASSETS,castPictures:c.CAST_PICTURES,learnerPicture:c.LEARNER_PICTURE,
    conversations:c.CONVS.map(c=>({id:c.id,title:c.title,scene:c.scene,cast:c.cast}))
  };
}
const assets = new Map();
for (const [lang,data] of Object.entries(languages)) {
  for (const i of data.items) {
    if (!i.picture.startsWith('art/') && !i.picture.startsWith('art-v2/')) continue;
    if (!assets.has(i.picture)) assets.set(i.picture,{picture:i.picture,file:'pics/'+i.picture+'.webp',uses:[]});
    assets.get(i.picture).uses.push({lang,...i});
  }
  for (const [word,picture] of Object.entries(data.mappings)) {
    if (!assets.has(picture)) assets.set(picture,{picture,file:'pics/'+picture+'.webp',uses:[],mappingOnly:[]});
    if (!data.items.some(i=>i.word===word)) {
      const a=assets.get(picture);(a.mappingOnly??=[]).push({lang,word});
    }
  }
}
const portraits=new Map();
for(const [lang,data] of Object.entries(languages))for(const [name,picture] of Object.entries({...data.castPictures,'Default learner':data.learnerPicture})){
  if(!portraits.has(picture))portraits.set(picture,{picture,file:'pics/'+picture+'.webp',uses:[]});
  portraits.get(picture).uses.push({lang,en:name,word:name});
}
const result={languages,assets:[...assets.values()].map(a=>({...a,exists:fs.existsSync(path.join(root,a.file))})),portraits:[...portraits.values()].map(a=>({...a,exists:fs.existsSync(path.join(root,a.file))}))};
fs.writeFileSync(path.join(out,'inventory.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({languages:Object.fromEntries(Object.entries(languages).map(([l,d])=>[l,{items:d.items.length,pictured:d.items.filter(i=>i.picture).length,raster:d.items.filter(i=>i.picture.startsWith('art')).length,noPicture:d.items.filter(i=>!i.picture).length}])),uniqueAssets:result.assets.length,missing:result.assets.filter(a=>!a.exists).map(a=>a.file)},null,2));
