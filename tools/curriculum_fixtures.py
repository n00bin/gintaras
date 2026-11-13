"""Explicit synthetic prerequisite fixtures for focused downstream workflow tests."""
FOUNDATION_BODY="""{
 for(const u of COURSE)for(const l of u.lessons)S.lessons[l.id]=1;
 for(const i of ITEMS)S.items[i.id]={seen:true,intro:true,lvl:2};
 for(const e of window.WordamiUnitPlacement||[])S.lessons['unit-skill:'+e.activityId]=1;
 S.convs=Object.fromEntries(CONVS.map(c=>[c.id,{done:true}]));save();
}"""
FOUNDATIONS_SEED='()=>{'+FOUNDATION_BODY+'}'
APPLICATIONS_BODY="""{
 const hash=text=>{let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);};
 for(const [name,bank] of [['wordami.transfer.v1.',WordamiTransferContent],['wordami.listening-transfer.v1.',WordamiListeningTransferContent]]){
  const data={schema:1,units:{}};
  for(const [id,spec] of Object.entries(bank.units)){
   const signature=hash(JSON.stringify([bank.version,spec]));
   data.units[id]={attempts:[],seen:[],passedSources:spec.variants.map(v=>({signature,sourceHash:hash(v.text.normalize('NFC').replace(/\\s+/g,' ').trim()),passedAt:'2026-11-09T00:00:00Z'}))};
  }
  localStorage.setItem(name+LANG.code,JSON.stringify(data));
 }
 const interaction={schema:1,units:{}};
 for(const [id,spec] of Object.entries(WordamiInteractionPracticeContent.units)){
  const signature=hash(JSON.stringify([WordamiInteractionPracticeContent.version,spec,WordamiSkillsAudio[LANG.code+'.'+id+'.listen']?.hash]));
  interaction.units[id]={rounds:[],completedBranches:spec.questions.map(q=>({signature,branch:q[0],completedAt:'2026-11-09T00:00:00Z'}))};
 }
 localStorage.setItem('wordami.interaction-practice.v1.'+LANG.code,JSON.stringify(interaction));
 if(window.WordamiExtendedReadingContent){const extended={schema:1,units:{}};for(const [id,spec] of Object.entries(WordamiExtendedReadingContent.units))extended.units[id]={signature:hash(JSON.stringify([WordamiExtendedReadingContent.version,id,spec])),definition:spec,prepared:spec.sections.flatMap(s=>s.lines.map(()=>true)),preparationAttempts:[],attempts:[{id:'fixture.'+id,firstAttempt:false,preparedSource:true,answers:spec.questions.map(q=>({choice:q.options[q.answer],correct:true})),finishedAt:'2026-11-10T00:00:00Z'}],notes:spec.sections.map(s=>({text:'Explicit synthetic note fixture for prerequisite testing.',quote:s.lines[0][0]})),notesCompletedAt:'2026-11-10T00:00:00Z',brief:{baseline:'Explicit synthetic first brief',draft:'Explicit synthetic revised brief',stage:'done',completedAt:'2026-11-10T00:00:00Z'},support:{guides:[],hints:[]},history:[],fixture:'Synthetic prerequisite record; not learner evidence'};localStorage.setItem('wordami.extended-reading.v1.'+LANG.code,JSON.stringify(extended));}
 if(window.WordamiDocumentContent){const documents={schema:1,units:{}};for(const [id,spec] of Object.entries(WordamiDocumentContent.units))documents.units[id]={signature:hash(JSON.stringify([WordamiDocumentContent.version,id,spec])),studied:true,attempts:spec.variants.map(v=>({id:'fixture.'+id+'.'+v.id,variant:v.id,firstExposure:false,finishedAt:'2026-11-10T00:00:00Z',answers:v.questions.map(q=>({choice:q.answer,correct:true})),fixture:'Explicit synthetic prerequisite fixture'}))};localStorage.setItem('wordami.documents.v1.'+LANG.code,JSON.stringify(documents));}
 if(window.WordamiFormContent){const forms={schema:1,units:{}};for(const [id,spec] of Object.entries(WordamiFormContent.units))forms.units[id]={signature:hash(JSON.stringify([WordamiFormContent.version,id,spec])),studied:true,labels:spec.fields.map(()=>true),labelAttempts:[],forms:Object.fromEntries(spec.variants.map(v=>[v.id,{values:v.values,completedAt:'2026-11-09T00:00:00Z',fixture:'Explicit synthetic prerequisite fixture'}]))};localStorage.setItem('wordami.forms.v1.'+LANG.code,JSON.stringify(forms));}
 if(window.WordamiWrittenInteractionContent){
  const written={schema:1,units:{}};
  for(const [id,spec] of Object.entries(WordamiWrittenInteractionContent.units))written.units[id]={records:spec.exchanges.map(e=>({id:'fixture.'+id+'.'+e.key,scenario:e.key,signature:hash(JSON.stringify([WordamiWrittenInteractionContent.version,id,e])),stage:'done',question:e.questionModel,questionReviewed:true,detailUnderstood:true,draft:e.responseModel,baseline:'Explicit synthetic prerequisite fixture',completedAt:'2026-11-09T00:00:00Z',revisions:[{text:e.responseModel,selfReviewed:true}]}))};
  localStorage.setItem('wordami.written-interaction.v1.'+LANG.code,JSON.stringify(written));
 }
}"""
