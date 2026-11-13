/* Required unit applications. Existing learning progress is retained. */
(()=>{
'use strict';
if(typeof COURSE_V2!=='undefined'&&COURSE_V2)return;
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;
if(!core||!ui||!window.WordamiA1Placement)return;
const placements=WordamiA1Placement;
const key=id=>'unit-skill:'+id;
const unitEntries=uid=>placements.filter(p=>p.afterUnit===uid);
const pending=()=>S.unitSkillTestout;
function canAssess(id){const p=pending();return !!p&&p.language===LANG.code&&p.units.some(uid=>unitEntries(uid).some(e=>id===e.activityId||id===e.activityId+'-speaking'));}
function canAssessPhrase(text){return placements.some(e=>canAssess(e.activityId)&&core.definition(e.activityId).requiredPhrases.includes(text));}
function complete(e,assessment=false){return core.status(e.activityId)[assessment?'independent':'finished']&&core.status(e.activityId+'-speaking')[assessment?'assessmentFinished':'finished'];}
function done(uid){return unitEntries(uid).every(e=>!!S.lessons[key(e.activityId)]||complete(e));}
function summary(uid){const es=unitEntries(uid);return {required:es.length,complete:es.filter(e=>!!S.lessons[key(e.activityId)]||complete(e)).length};}
function nextPending(){const p=pending();return p?.units.flatMap(unitEntries).find(e=>!complete(e,true));}
function continueTestout(){const e=nextPending();if(e)return ui.openActivity(e.activityId);return false;}
function beginTestout(units,got){const required=units.filter(uid=>unitEntries(uid).length);if(!required.length)return false;S.unitSkillTestout={language:LANG.code,units:[...units],got:{...got},startedAt:new Date().toISOString()};save();return true;}
let updating=false;
function update(){if(updating)return;updating=true;try{
 let changed=false;
 for(const e of placements)if(complete(e)&&!canAssess(e.activityId)&&!S.lessons[key(e.activityId)]){S.lessons[key(e.activityId)]=1;changed=true;}
 const p=pending();
 if(p&&p.language===LANG.code&&!nextPending()){
  for(const uid of p.units){for(const e of unitEntries(uid)){S.lessons[key(e.activityId)]=1;for(const id of e.sourceCardIds)if(BYID[id])rec(id).intro=true;}creditUnit(uid,p.got);}
  if(p.units.length>1)S.placedTo=Math.max(S.placedTo||0,STEPS.indexOf(p.units[0]));
  delete S.unitSkillTestout;changed=true;toast('Unit check complete: words and required skills finished.');
 }
 if(changed)save();renderTree();
}finally{updating=false;}}
window.WordamiUnitSkills=Object.freeze({done,summary,canAssess,canAssessPhrase,beginTestout,continueTestout,nextPending,entries:uid=>unitEntries(uid).map(e=>({...e}))});
window.addEventListener('wordami:practice',update);
update();
// Topic routes load before this gate module; redraw resumed checks with their assessment context.
if(pending()&&placements.some(e=>location.hash==='#a1-'+e.activityId.slice(3)))continueTestout();
})();
