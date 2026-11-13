/* Required foundation applications use existing lesson progress; word memories stay unchanged. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;
if(!core||!ui||!window.WordamiUnitApplicationCatalogue)return;
const placements=WordamiUnitApplicationCatalogue.map(e=>{
 const unit=UNIT_BY[e.unitId],definition=core.definition(e.id);if(!unit||!definition)throw Error('Missing application owner '+e.id);
 const lessons=unit.lessons.filter(l=>!l.speak),source=definition.requiredPhrases.map(t=>ITEMS.find(i=>i.lt===t));
 return {activityId:e.id,title:e.title,afterUnit:unit.id,afterLesson:lessons[lessons.length-1].id,sourceCardIds:source.map(i=>i.id),sourceLessonIds:[...new Set(source.map(i=>i.lesson.id))]};
});
const key=id=>'unit-skill:'+id,entries=uid=>placements.filter(e=>e.afterUnit===uid);
const pending=()=>S.unitSkillTestout;
function canAssess(id){const p=pending();return !!p&&p.language===LANG.code&&p.units.some(uid=>entries(uid).some(e=>id===e.activityId||id===e.activityId+'-speaking'));}
function canAssessPhrase(text){return placements.some(e=>canAssess(e.activityId)&&core.definition(e.activityId).requiredPhrases.includes(text));}
function complete(e,assessment=false){return core.status(e.activityId)[assessment?'independent':'finished']&&core.status(e.activityId+'-speaking')[assessment?'assessmentFinished':'finished'];}
function done(uid){return entries(uid).every(e=>!!S.lessons[key(e.activityId)]||complete(e));}
function summary(uid){const es=entries(uid);return {required:es.length,complete:es.filter(e=>!!S.lessons[key(e.activityId)]||complete(e)).length};}
function nextPending(){const p=pending();return p?.units.flatMap(entries).find(e=>!complete(e,true));}
function continueTestout(){const e=nextPending();if(e)return ui.openActivity(e.activityId);return false;}
function beginTestout(units,got){if(!units.some(uid=>entries(uid).length))return false;S.unitSkillTestout={language:LANG.code,units:[...units],got:{...got},startedAt:new Date().toISOString()};save();return true;}
let updating=false;
function update(){if(updating)return;updating=true;try{
 let changed=false;
 for(const e of placements)if(complete(e)&&!canAssess(e.activityId)&&!S.lessons[key(e.activityId)]){S.lessons[key(e.activityId)]=1;changed=true;}
 const p=pending();
 if(p&&p.language===LANG.code&&!nextPending()){
  for(const uid of p.units){for(const e of entries(uid)){S.lessons[key(e.activityId)]=1;for(const id of e.sourceCardIds)if(BYID[id])rec(id).intro=true;}creditUnit(uid,p.got);}
  if(p.units.length>1)S.placedTo=Math.max(S.placedTo||0,STEPS.indexOf(p.units[0]));
  delete S.unitSkillTestout;changed=true;toast('Unit check complete: words and required skills finished.');
 }
 if(changed)save();renderTree();
}finally{updating=false;}}
window.WordamiUnitPlacement=Object.freeze(placements.map(e=>Object.freeze(e)));
window.WordamiUnitSkills=Object.freeze({done,summary,canAssess,canAssessPhrase,beginTestout,continueTestout,nextPending,entries:uid=>entries(uid).map(e=>({...e}))});
for(const unit of COURSE)core.registerStudy('unit-application-teaching.'+unit.id,()=>unit.lessons.every(l=>l.speak||crowns(l.id)>0)||entries(unit.id).some(e=>canAssess(e.activityId)));
window.addEventListener('wordami:practice',update);update();
const active=placements.find(e=>location.hash==='#a1-'+e.activityId.slice(3));
if(active)ui.openActivity(active.activityId);
})();
