/* Required unit application after its source language has been taught. */
(()=>{
'use strict';
if(typeof COURSE_V2!=='undefined'&&COURSE_V2)return;
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;
if(!core||!ui||!['lt','es'].includes(LANG.code))return;
const lessons=PATH.filter(id=>typeof id==='string'&&UNIT_BY[id]).flatMap(id=>UNIT_BY[id].lessons.filter(l=>!l.speak));
const order=new Map(lessons.map((l,index)=>[l.id,index]));
const entries=ui.topics();
const placements=entries.map(entry=>{
 const d=core.definition(entry.activityId);if(!d)return null;
 const items=(d.requiredPhrases||[]).map(text=>ITEMS.find(i=>i.lt===text));if(!items.length||items.some(i=>!i||!order.has(i.lesson.id)))return null;
 const required=[...new Set(items.map(i=>i.lesson))].sort((a,b)=>order.get(a.id)-order.get(b.id));
 return {...entry,lesson:required[required.length-1],sourceCardIds:items.map(i=>i.id),sourceLessonIds:required.map(l=>l.id)};
}).filter(Boolean);
const style=document.createElement('style');style.textContent='.a1-course-practice{padding:16px;margin:12px 0 20px;border:2px solid var(--line);border-radius:18px;background:var(--pine-soft);color:var(--fg)}.a1-course-practice h3{margin:0 0 8px;font-family:Fredoka,Nunito,sans-serif}.a1-course-practice p{font-size:14px}.a1-course-practice button{min-height:44px;padding:10px 16px;border:0;border-radius:12px;background:var(--pine);color:var(--on-pine);font:inherit;font-weight:700;cursor:pointer}.a1-course-practice button:focus-visible{outline:3px solid var(--amber);outline-offset:3px}';document.head.append(style);
const tree=document.getElementById('tree');let pending=false;
function mount(){pending=false;const anchors=new Map();for(const entry of placements){
 const unit=document.getElementById('unit-'+entry.lesson.unit.id);if(!unit)continue;
 const id='path-'+entry.activityId.replaceAll('.','-');let card=document.getElementById(id);
 if(!card){card=document.createElement('section');card.id=id;card.className='a1-course-practice';card.dataset.activity=entry.activityId;card.dataset.required='true';card.dataset.afterLesson=entry.lesson.id;const h=document.createElement('h3');h.textContent=entry.title;const p=document.createElement('p');p.className='a1-path-status';const b=document.createElement('button');b.type='button';b.onclick=()=>ui.openActivity(entry.activityId);card.append(h,p,b);unit.append(card);}
 const r=core.requirements(entry.activityId),finished=core.status(entry.activityId).finished&&core.status(entry.activityId+'-speaking').finished,text=finished?'Completed: reading, listening, writing and recorded speaking.':r.ready?'Required to finish this unit: read, listen, write and record your spoken reply.':'Required unit lesson. First learn the language in '+entry.lesson.title+'.';
 const p=card.querySelector('p'),b=card.querySelector('button');if(p.textContent!==text)p.textContent=text;const label=finished?'Review unit skills':r.ready?'Continue required lesson':'See required lessons';if(b.textContent!==label)b.textContent=label;
 const row=[...unit.querySelectorAll('[data-lesson-id]')].find(n=>n.dataset.lessonId===entry.lesson.id);
 // Place directly after the source lesson when open; keep it reachable on a folded unit.
 if(row){const anchor=anchors.get(entry.lesson.id)||row;if(anchor.nextElementSibling!==card)anchor.after(card);anchors.set(entry.lesson.id,card);}
 }}
function queue(){if(!pending){pending=true;queueMicrotask(mount);}}
if(tree)new MutationObserver(queue).observe(tree,{childList:true,subtree:true});
window.addEventListener('wordami:practice',queue);mount();
window.WordamiA1Placement=Object.freeze(placements.map(p=>Object.freeze({activityId:p.activityId,afterLesson:p.lesson.id,afterUnit:p.lesson.unit.id,sourceCardIds:p.sourceCardIds,sourceLessonIds:p.sourceLessonIds})));
})();
