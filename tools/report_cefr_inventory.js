// Export curriculum evidence for a manual CEFR coverage review; no level scoring.
const fs=require('fs'),path=require('path'),cp=require('child_process');
const root=path.join(__dirname,'..');
function inspect(text){
  const out={};
  new Function('out',`function norm(s){return s.toLowerCase().trim()}function esc(s){return s;}`+text+';Object.assign(out,{COURSE,ITEMS,CONVS,PATH,GRAMMAR:typeof GRAMMAR==="undefined"?[]:GRAMMAR,DRILLS:typeof DRILLS==="undefined"?[]:DRILLS,MAKE:typeof MAKE==="undefined"?[]:MAKE,CANDO:typeof CANDO==="undefined"?[]:CANDO});')(out);
  return {
    counts:{units:out.COURSE.length,lessons:out.COURSE.reduce((n,u)=>n+u.lessons.filter(l=>!l.speak).length,0),cards:out.ITEMS.length,conversations:out.CONVS.length,drills:out.DRILLS.length,sentenceBuilders:out.MAKE.length,grammarTables:out.GRAMMAR.length,canDoLabels:out.CANDO.length},
    path:out.PATH,
    units:out.COURSE.map(u=>({id:u.id,title:u.title,en:u.en,tip:u.tip,lessons:u.lessons.filter(l=>!l.speak).map(l=>({id:l.id,title:l.title,items:l.items.map(i=>({id:i.id,text:i.lt,en:i.en}))}))})),
    conversations:out.CONVS.map(c=>({id:c.id,title:c.title,scene:c.scene,lines:c.all.filter(l=>l.lt).map(l=>({kind:l.kind,text:l.lt,en:l.en}))})),
    grammar:out.GRAMMAR,canDo:out.CANDO,
  };
}
const result={reviewDate:'2026-11-06',scope:'Curriculum and exercise-code review; no learner proficiency assessment',local:{},publishedReference:{}};
for(const lang of ['lt','es']){
  result.local[lang]=inspect(fs.readFileSync(path.join(root,'lang',lang+'.js'),'utf8'));
  const published=cp.execFileSync('git',['show','origin/main:lang/'+lang+'.js'],{cwd:root,encoding:'utf8',maxBuffer:12*1024*1024});
  result.publishedReference[lang]=inspect(published).counts;
}
result.publishedReference.commit=cp.execFileSync('git',['rev-parse','origin/main'],{cwd:root,encoding:'utf8'}).trim();
const dir=path.join(root,'docs','cefr');fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'inventory.json'),JSON.stringify(result,null,2)+'\n');
for(const lang of ['lt','es']){console.log(lang+' '+JSON.stringify(result.local[lang].counts));for(const u of result.local[lang].units)console.log(u.id+' '+u.en+' | '+u.lessons.map(l=>l.title).join('; '));console.log('CONVERSATIONS '+JSON.stringify(result.local[lang].conversations.map(c=>({id:c.id,title:c.title,scene:c.scene}))));}
console.log('PUBLISHED '+JSON.stringify(result.publishedReference));
