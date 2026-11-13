/* Practical work is a counted lesson inside each ordinary unit. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI,entries=window.WordamiUnitPlacement;
if(!core||!ui||!entries)return;
const tree=document.getElementById('tree');let queued=false;
function mount(){queued=false;for(const entry of entries){
 const unit=document.getElementById('unit-'+entry.afterUnit);if(!unit)continue;
 const id='required-'+entry.activityId.replaceAll('.','-');let row=document.getElementById(id);
 if(!row){row=document.createElement('button');row.type='button';row.id=id;row.className='lesson-row';row.dataset.required='true';row.dataset.activity=entry.activityId;row.dataset.afterLesson=entry.afterLesson;row.innerHTML='<span class="ring"><b class="num"></b></span><span class="t"><strong></strong><small></small></span>';row.onclick=()=>ui.openActivity(entry.activityId);}
 const checking=WordamiUnitSkills.canAssess(entry.activityId),finished=checking?core.status(entry.activityId).independent&&core.status(entry.activityId+'-speaking').assessmentFinished:WordamiUnitSkills.summary(entry.afterUnit).complete>0;
 const ready=core.requirements(entry.activityId).ready,title='Use it · '+entry.title,text=finished?'Completed · reading, listening, writing and recorded speaking':checking?'Required unit check · use the language independently':ready?'Required lesson · read, listen, write and speak':'Required lesson · finish this unit’s teaching first';
 for(const [selector,value] of [['strong',title],['small',text],['.num',finished?'✓':'→']])if(row.querySelector(selector).textContent!==value)row.querySelector(selector).textContent=value;
 row.classList.toggle('did',finished);row.disabled=unit.classList.contains('locked')&&!checking;
 const anchor=[...unit.querySelectorAll('[data-lesson-id]')].find(n=>n.dataset.lessonId===entry.afterLesson);
 const container=unit.querySelector('.lessons')||unit;
 if(anchor){if(anchor.nextElementSibling!==row)anchor.after(row);}else if(row.parentElement!==container)container.append(row);
}}
function queue(){if(!queued){queued=true;queueMicrotask(mount);}}
if(tree)new MutationObserver(queue).observe(tree,{childList:true,subtree:true});
window.addEventListener('wordami:practice',queue);mount();
})();
