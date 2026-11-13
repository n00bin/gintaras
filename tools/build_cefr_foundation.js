// Planning metadata only. Unit references identify candidate teaching, not CEFR attainment.
const fs=require('fs'),path=require('path');
const root=path.join(__dirname,'..'),dir=path.join(root,'docs','cefr');
const inventory=JSON.parse(fs.readFileSync(path.join(dir,'inventory.json'),'utf8'));
const rows=[
 ['personal-introduction','Introduce yourself and exchange simple personal information',['reading','listening','spoken_interaction','spoken_production','writing'],['u1','u20'],['u1','u25'],'Exchange names and origin, then write a brief introduction.'],
 ['clarification','Ask for repetition or say that you do not understand',['listening','spoken_interaction'],['u21'],['u21'],'Use a taught repair phrase when a short exchange is unclear.'],
 ['numbers-prices','Understand and communicate simple quantities and prices',['reading','listening','spoken_interaction'],['u2'],['u2'],'Find a price on a new label and understand a spoken amount.'],
 ['times-dates','Exchange basic times and dates',['reading','listening','spoken_interaction','writing'],['u7','u24'],['u5','u18'],'Find the time in a short message and give a suitable reply.'],
 ['food-order','Make a simple food or drink request',['reading','listening','spoken_interaction','writing'],['u3','u15'],['u3','u15'],'Choose from a small menu, request an item, and check a practical detail.'],
 ['places-directions','Ask where a familiar place is and follow short supported directions',['reading','listening','spoken_interaction'],['u9','u13'],['u4','u14'],'Locate a destination using a short sign or spoken instruction.'],
 ['family-description','Give simple information about family or someone you know',['reading','listening','spoken_production','writing'],['u4','u25','u30'],['u6','u29'],'Describe a person in a few original simple statements.'],
 ['daily-routine','Communicate basic information about daily activities',['listening','spoken_interaction','spoken_production','writing'],['u20','u28'],['u26','u31'],'Answer simple routine questions and give a short personal account.'],
 ['home-information','Describe basic facts about where you live',['reading','listening','spoken_production','writing'],['u32'],['u30'],'Give simple information about a room or home from a visual prompt.'],
 ['simple-purchase','Request an everyday item and exchange basic purchase details',['reading','listening','spoken_interaction'],['u16','u29'],['u16','u28'],'Select an item and communicate a taught size, quantity or price detail.'],
 ['simple-arrangement','Understand and reply to a simple invitation',['reading','listening','spoken_interaction','writing'],['u23'],['u33'],'Read a short invitation and reply with a simple meeting detail.'],
 ['preferences','Express a simple preference about a familiar activity',['listening','spoken_interaction','spoken_production','writing'],['u22'],['u8'],'State a familiar preference and ask a simple related question.'],
];
const objectives=rows.map(([id,outcome,skills,lt,es,task])=>{
 const languages={};for(const [lang,ids] of [['lt',lt],['es',es]]){
  const units=ids.map(id=>{const unit=inventory.local[lang].units.find(u=>u.id===id);if(!unit)throw Error('Missing '+lang+' '+id);return unit;});
  languages[lang]={candidateUnits:ids,candidateLessons:units.flatMap(u=>u.lessons.map(l=>l.id)),requiredCardIds:[],prerequisiteReview:'pending',practiceStatus:'existing_language_requires_task_review',independentAssessmentStatus:'not_validated'};
 }
 return {id:'a1.'+id,outcome,skills,taskProposal:task,descriptorMapping:'educator_review_required',languages};
});
const coveragePath=path.join(dir,'activity-coverage.json');
if(fs.existsSync(coveragePath)){
 const coverage=JSON.parse(fs.readFileSync(coveragePath,'utf8'));
 for(const goal of objectives)for(const lang of ['lt','es']){
  const runtime=coverage.languages[lang]?.objectives.find(o=>o.id===goal.id);if(!runtime)continue;
  const knownIds=new Set(inventory.local[lang].units.flatMap(u=>u.lessons.flatMap(l=>l.items.map(i=>i.id))));
  if(runtime.sourceCardIds.some(id=>!knownIds.has(id)))throw Error('Stale prerequisite references for '+goal.id+' '+lang);
  Object.assign(goal.languages[lang],{requiredCardIds:runtime.sourceCardIds,activityIds:runtime.activities,prerequisiteReview:'runtime_sources_checked_educator_review_pending',practiceStatus:'initial_practice_implemented'});
 }
}
const result={schemaVersion:1,created:'2026-11-06',targetProgramme:['A1','A2','B1','B2','C1','C2'],languages:['lt','es'],status:fs.existsSync(coveragePath)?'initial_practice_implemented_descriptor_mapping_pending':'planning_only',scope:'Initial A1 task candidates, not a complete descriptor inventory or validated syllabus',rules:{unitReferenceDoesNotAssignLevel:true,emptyPrerequisitesMustNotUnlockTasks:true,teachBeforeIndependentTest:true,scoreIndependentOfXpAndFsrs:true,assessmentThresholds:'pending_calibration',publishLevelClaims:false},objectives};
fs.writeFileSync(path.join(dir,'a1-foundation.json'),JSON.stringify(result,null,2)+'\n');
console.log('Wrote '+objectives.length+' A1 objective candidates; validated all source unit and lesson references. No learner levels assigned.');
