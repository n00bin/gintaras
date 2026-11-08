/* Read-only inventory of the first three actual learning-path units. */
const fs=require('fs'),path=require('path');
const root=path.resolve(process.argv[2]||path.join(__dirname,'..')),out={};
const source=fs.readFileSync(path.join(root,'lang/lt.js'),'utf8');
new Function('out','function esc(s){return s};function norm(s){return s.toLowerCase().replace(/[.,!?;:"\u0027¿¡]/g, "").replace(/\\s+/g," ").trim()};'+source+';Object.assign(out,{COURSE,ITEMS,PATH,CONVS,PICTURE_ASSETS,CAST_PICTURES,picFor,picFile,SMAP,NO_PIC});')(out);
const units=out.PATH.filter(id=>typeof id==='string'&&out.COURSE.some(u=>u.id===id)).slice(0,3);
const rows=units.map(id=>{const u=out.COURSE.find(u=>u.id===id),cards=out.ITEMS.filter(i=>i.unit.id===id);return {id,title:u.en,lessons:u.lessons.map(l=>({id:l.id,title:l.title,speaking:!!l.speak,cards:cards.filter(i=>i.lesson.id===l.id).length})),cards:cards.length,illustrations:cards.filter(i=>out.picFor(i.lt)?.startsWith('art-v2/')).length,pictureless:cards.filter(i=>!out.picFor(i.lt)).map(i=>i.lt),otherPictures:cards.filter(i=>{const p=out.picFor(i.lt);return p&&!p.startsWith('art-v2/');}).map(i=>({text:i.lt,picture:out.picFor(i.lt)})),missingAssets:cards.filter(i=>{const p=out.picFor(i.lt);return p&&p[0]!=='#'&&!fs.existsSync(path.join(root,out.picFile(p)));}).map(i=>i.lt)};});
const assert=require('assert/strict');
assert.deepEqual(units,['u1','u21','u3'],'Audit must follow actual teaching order');
assert.deepEqual(rows.map(r=>r.cards),[39,20,40]);
rows.forEach(r=>assert(r.illustrations===r.cards&&!r.missingAssets.length,'Incomplete artwork for '+r.title));
const contentFile=path.join(root,'foundation-content.js');
if(fs.existsSync(contentFile)){
 const sandbox={WordamiActivities:{}};
 new Function('window','LANG',fs.readFileSync(contentFile,'utf8'))(sandbox,{code:'lt'});
 assert.equal(sandbox.WordamiTopicContent.length,3);
 sandbox.WordamiTopicContent.forEach((topic,index)=>{
  const available=out.ITEMS.filter(i=>units.slice(0,index+1).includes(i.unit.id));
  for(const phrase of Object.values(topic.sources))assert(available.some(i=>(i.lt0||i.lt)===phrase),'Untaught prerequisite: '+phrase);
  assert(topic.sources[topic.speech]);
  for(const variant of [0,1]){
   const tasks=topic.build(variant);
   assert.deepEqual(tasks.map(t=>t.skill),['reading','reading','listening','listening','writing','writing']);
   for(const t of tasks){for(const key of t.lines||t.accept||[t.audio])assert(topic.sources[key],'Unknown source '+key);if(t.options)assert(t.options.some(o=>o.value===t.answer));}
  }
 });
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8'),sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');
 const build=html.match(/const APP_VERSION=(\d+)/)[1];assert(sw.includes('gintaras-shell-v'+build),'Offline shell version mismatch');
 for(const name of ['evidence','ui','content','practice','path']){const file='foundation-'+name+'.js';assert(html.includes('src="'+file+'"'));assert(sw.includes("'"+file+"'"));new Function(fs.readFileSync(path.join(root,file),'utf8'));}
}
if(process.argv.includes('--phrases')){console.log(JSON.stringify(out.ITEMS.filter(i=>units.includes(i.unit.id)).map(i=>[i.unit.id,i.lt,i.en,i.lesson.id])));process.exit(0);}
const first=out.PATH.indexOf(units[0]),last=out.PATH.indexOf(units[2]),between=out.PATH.slice(first,last+1).filter(id=>typeof id==='string'&&out.CONVS.some(c=>c.id===id));
const prerequisitePhrases=['Mano vardas Tomas','Aš esu iš Lietuvos','Aš esu iš Anglijos','kava','arbata','meniu','Aš noriu kavos','Aš noriu arbatos','Sąskaitą, prašau','Ar galima mokėti kortele?','Prašau pakartoti'];
console.log(JSON.stringify({root,firstThree:rows,interveningConversations:between,prerequisitePhrases:prerequisitePhrases.map(text=>{const item=out.ITEMS.find(i=>(i.lt0||i.lt)===text);return {text,unit:item?.unit.id,lesson:item?.lesson.id,id:item?.id};})},null,2));
