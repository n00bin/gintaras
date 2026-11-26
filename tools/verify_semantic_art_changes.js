// Compare progress-sensitive course data with HEAD; large language packs need a larger git buffer.
const fs=require('fs'),path=require('path'),cp=require('child_process'),assert=require('assert/strict');
const root=path.resolve(__dirname,'..');
function read(source){
  const out={};
  new Function('out','function esc(s){return s};function norm(s){return s.toLowerCase().trim()};'+source+';Object.assign(out,{words:ITEMS.map(i=>[i.id,i.lt,i.en,i.alt]),path:PATH,conversations:CONVS.map(c=>[c.id,c.all.map(l=>[l.id,l.lt,l.en])]),audio:SMAP,picture:picFor("Quiero dos manzanas"),singular:picFor("la manzana")});')(out);
  return out;
}
for(const lang of ['lt','es']){
  const before=read(cp.execFileSync('git',['show','HEAD:lang/'+lang+'.js'],{cwd:root,encoding:'utf8',maxBuffer:16*1024*1024}));
  const after=read(fs.readFileSync(path.join(root,'lang',lang+'.js'),'utf8'));
  for(const key of ['words','path','conversations','audio'])assert.deepEqual(after[key],before[key],lang+': changed '+key);
  if(lang==='es'){
    assert.equal(after.picture,'art-v2/two-v2');assert.equal(after.singular,'art-v2/apple');
    assert.ok(fs.existsSync(path.join(root,'pics',after.picture+'.webp')));
  }
  console.log(lang+': vocabulary, progress IDs, path, conversations and recordings unchanged.');
}
console.log('Two-apple phrase resolves to two-v2; singular apple retains apple.');
