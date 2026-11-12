/* Guard learners' progress against renamed or shifted course names.

   Progress is saved under names, not under the words themselves: a word card is "lesson-part:position" (u5a-1:0),
   and lessons, units, conversations, conversation lines and unit skills each have their own name. Lessons are cut
   into parts of 5 words automatically, so slipping one new word into the middle of a lesson renames every word after
   it, and everyone's progress quietly lands on the wrong words. The same happens if a name is changed or removed.

   tools/progress-ids.json lists every name that has been published. This check fails if any of them is missing, or
   if a word card's name now points to a different word. New names are fine; add them with --update after checking.

   node tools/check_progress_ids.js                        check (the deploy runs this; exit 1 on a problem)
   node tools/check_progress_ids.js --update               add new names to the list (never removes any)
   node tools/check_progress_ids.js --allow lt u5a-1:0 "spelling fix"
        record a deliberate change to one published name: a corrected spelling of the same word, or a retired card.
        Only do this when the learner's progress on that name should really follow the change (or may be dropped). */
const fs=require('fs'),path=require('path');
const ROOT=path.join(__dirname,'..'),FILE=path.join(__dirname,'progress-ids.json'),LANGS=['lt','es'];

function load(code){
  const out={},src=fs.readFileSync(path.join(ROOT,'lang',code+'.js'),'utf8');
  new Function('out','function esc(s){return s};function norm(s){return String(s).toLowerCase().trim()};'+src+';Object.assign(out,{COURSE,ITEMS,CONVS});')(out);
  const words={};for(const i of out.ITEMS)words[i.id]=i.lt0||i.lt;
  const lines={};for(const c of out.CONVS)for(const l of c.all||[])if(l.id)lines[l.id]=1;
  const ids={units:out.COURSE.map(u=>u.id),lessons:out.COURSE.flatMap(u=>u.lessons.map(l=>l.id)),conversations:out.CONVS.map(c=>c.id),lines:Object.keys(lines),words};
  // Unit skills (required practice): saved as a1.<topic> and a1.<topic>-speaking.
  const content=path.join(ROOT,'foundation-content.js');ids.skills=[];
  if(fs.existsSync(content)){const sb={WordamiActivities:{}};
    try{new Function('window','LANG','LANG_PREVIEW',fs.readFileSync(content,'utf8'))(sb,{code},false);}
    catch(e){throw new Error('Could not read the unit skills in foundation-content.js ('+e.message+'). Teach tools/check_progress_ids.js how to load it before releasing.');}
    for(const t of sb.WordamiTopicContent||[])ids.skills.push('a1.'+t.id,'a1.'+t.id+'-speaking');}
  return ids;
}

const ledger=fs.existsSync(FILE)?JSON.parse(fs.readFileSync(FILE,'utf8')):{note:'Every course name ever published. Learners\' progress is saved under these. Managed by tools/check_progress_ids.js; never edit by hand.',allowed:[]};
const args=process.argv.slice(2),now={};for(const c of LANGS)now[c]=load(c);
const save=()=>fs.writeFileSync(FILE,JSON.stringify(ledger,null,1)+'\n');

if(args[0]==='--allow'){
  const [,code,id,...why]=args,reason=why.join(' ').trim(),L=ledger[code];
  if(!L||!reason)throw new Error('Usage: --allow <lang> <name> "<reason>"');
  const kind=Object.keys(L).find(k=>Array.isArray(L[k])?L[k].includes(id):L[k]&&Object.prototype.hasOwnProperty.call(L[k],id));
  if(!kind)throw new Error(id+' was never published in '+code);
  const was=kind==='words'?L.words[id]:id,is=kind==='words'?now[code].words[id]:(now[code][kind].includes(id)?id:undefined);
  if(kind==='words'){if(is===undefined)delete L.words[id];else L.words[id]=is;}
  else if(is===undefined)L[kind]=L[kind].filter(x=>x!==id);
  ledger.allowed.push({date:new Date().toISOString().slice(0,10),lang:code,kind,name:id,was,now:is===undefined?null:is,reason});
  save();console.log('Recorded: '+code+' '+kind+' '+id+(is===undefined?' retired':' now "'+is+'"')+' ('+reason+')');process.exit(0);
}

const problems=[];let added=0;
for(const code of LANGS){
  const L=ledger[code]=ledger[code]||{units:[],lessons:[],conversations:[],lines:[],skills:[],words:{}},N=now[code];
  for(const kind of ['units','lessons','conversations','lines','skills']){
    const have=new Set(N[kind]);for(const id of L[kind])if(!have.has(id))problems.push(`${code}: ${kind.replace(/s$/,'')} "${id}" is gone`);
    const known=new Set(L[kind]);for(const id of N[kind])if(!known.has(id)){if(args[0]==='--update'){L[kind].push(id);known.add(id);added++;}}
  }
  for(const [id,text] of Object.entries(L.words)){
    if(!(id in N.words))problems.push(`${code}: word card ${id} ("${text}") is gone`);
    else if(N.words[id]!==text)problems.push(`${code}: word card ${id} was "${text}" and is now "${N.words[id]}"`);
  }
  for(const [id,text] of Object.entries(N.words))if(!(id in L.words)&&args[0]==='--update'){L.words[id]=text;added++;}
}

if(problems.length){
  console.error('✗ This release would move or lose learners\' progress:\n  '+problems.slice(0,40).join('\n  ')+(problems.length>40?`\n  …and ${problems.length-40} more`:''));
  console.error('\nUsually a word was added or removed in the middle of a lesson. Add new words at the END of a lesson (or in a new lesson)'+
    '\nso every existing name stays the same. If a change is deliberate (a spelling fix, a retired card), record it with:'+
    '\n  node tools/check_progress_ids.js --allow <lang> <name> "<reason>"');
  process.exit(1);
}
if(args[0]==='--update'){save();console.log(`✓ No published names changed. Added ${added} new name(s) to tools/progress-ids.json.`);}
else{
  const fresh=LANGS.reduce((n,c)=>n+Object.keys(now[c].words).filter(id=>!(id in ledger[c].words)).length+
    ['units','lessons','conversations','lines','skills'].reduce((m,k)=>m+now[c][k].filter(id=>!ledger[c][k].includes(id)).length,0),0);
  if(fresh){console.error(`✗ ${fresh} new course name(s) aren't in tools/progress-ids.json yet, so they wouldn't be protected next time.`+
    '\n  Run: node tools/check_progress_ids.js --update   and include the updated list in this release.');process.exit(1);}
  console.log('✓ Every published course name is still there and points to the same word');
}
