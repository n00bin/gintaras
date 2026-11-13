/* Compare the local course to the isolated latest live source without changing either. */
const fs=require('fs'),path=require('path'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
function read(folder){const out={};new Function('out','function norm(s){return s.toLowerCase().trim()}function esc(s){return s;}'+fs.readFileSync(path.join(folder,'lang/lt.js'),'utf8')+';Object.assign(out,{items:ITEMS.map(i=>({id:i.id,text:i.lt,en:i.en,unit:i.unit.id,picture:picFor(i.lt)})),path:PATH,portraits:CAST_PICTURES});')(out);return out;}
const live=read(path.join(root,'.release-lithuanian-art')),local=read(root),byId=new Map(local.items.map(i=>[i.id,i]));
const images=[];
for(const item of live.items){const next=byId.get(item.id);assert(next,'Missing existing card '+item.id);assert.deepEqual([next.text,next.en,next.unit],[item.text,item.en,item.unit],'Changed existing teaching '+item.id);if(item.picture?.startsWith('art-v2/')&&next.picture!==item.picture)images.push({id:item.id,live:item.picture,local:next.picture});}
assert.deepEqual(local.path,live.path,'Original learning path changed');assert.deepEqual(local.portraits,live.portraits,'Live character art changed');
console.log(JSON.stringify({oldCardsPreserved:live.items.length,newCards:local.items.length-live.items.length,liveArtDifferences:images}));
assert.equal(images.length,0,'Published illustrations must be reconciled before release');
