/* Required source-based forms. Detail checks are distinct from open writing assessment. */
(()=>{'use strict';
const bank=window.WordamiFormContent,studio=window.WordamiSkillsStudio,ui=window.WordamiPracticeUI;
if(!LANG_PREVIEW||!bank||!studio||!ui)return;
const {node:n,button:b,dialog}=ui,key='wordami.forms.v1.'+LANG.code;
let data={schema:1,units:{},history:{}},lastRaw=null,conflict=false,returnTo=null,unsavedDraft=null;
try{lastRaw=localStorage.getItem(key);const saved=JSON.parse(lastRaw);if(saved?.schema===1&&saved.units&&typeof saved.units==='object')data=saved;}catch(e){}
const clone=v=>JSON.parse(JSON.stringify(v));
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16);}
const signature=id=>hash(JSON.stringify([bank.version,id,bank.units[id]]));
const fold=text=>String(text||'').normalize('NFC').toLocaleLowerCase(LANG.code).replace(/[.!?¿¡]+$/g,'').replace(/\s+/g,' ').trim();
const current=id=>{const row=data.units[id];return row?.signature===signature(id)?row:null;};
const ready=id=>studio.canWrite(id)===true;
function update(fn){const next=clone(data);fn(next);try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;ui.status('This form changed in another tab. Export your copy before reloading.');return false;}const raw=JSON.stringify(next);localStorage.setItem(key,raw);data=next;lastRaw=raw;unsavedDraft=null;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;}catch(e){ui.status('The form could not be saved. Keep it open, retry or export your work.');return false;}}
function progress(id){const spec=bank.units[id];if(!spec)return null;const row=current(id);return{id,requiredForms:spec.variants.length,completedForms:spec.variants.filter(v=>row?.forms?.[v.id]?.completedAt).map(v=>v.id),complete:!!row?.labels?.every(Boolean)&&row.labels.length===spec.fields.length&&spec.variants.every(v=>!!row.forms?.[v.id]?.completedAt)};}
function evidence(id){return bank.units[id]?{unitId:id,version:bank.version,task:clone(bank.units[id]),progress:progress(id),record:clone(current(id)||null),history:clone(data.history?.[id]||[])}:null;}
function exportData(){const blob=new Blob([JSON.stringify({schema:1,language:LANG.code,exportedAt:new Date().toISOString(),units:data.units,history:data.history||{},unsavedDraft},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=n('a');a.href=url;a.download='wordami-'+LANG.code+'-forms.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function back(id){if(returnTo){const fn=returnTo;returnTo=null;fn();}else studio.openUnit(id);}
function begin(id){if(!current(id)&&!update(next=>{if(next.units[id]){next.history=next.history||{};next.history[id]=[...(next.history[id]||[]),clone(next.units[id])].slice(-20);}next.units[id]={signature:signature(id),definition:clone(bank.units[id]),studied:false,labels:Array(bank.units[id].fields.length).fill(false),labelAttempts:[],forms:{},startedAt:new Date().toISOString()};}))return;open(id);}
function open(id,variantId,callback){const spec=bank.units[id];if(!spec)return;if(typeof callback==='function')returnTo=callback;history.replaceState(null,'','#forms-'+id);
 ui.show(spec.title,()=>{
  ui.announce();
  if(conflict){dialog.append(n('p','Another tab has newer form work. Export this copy before reloading.'),b('Export form work',exportData));return;}
  if(!ready(id)){dialog.append(n('p','Complete this unit’s language preparation, grammar and both comprehension checks first.'),b('Back to unit',()=>back(id)));return;}
  const row=current(id);
  if(!row){dialog.append(n('p','Use fictional source details. Nothing is sent to a real service and no personal contact information is needed.'),b('Learn the form labels',()=>begin(id),'a1-primary'));return;}
  if(!row.studied){
   dialog.append(n('h3','Learn the labels and field formats'),n('p',spec.note));
   for(const f of spec.teaching){const p=n('p',f.label+' · '+f.meaning+' — '+f.example);p.lang=LANG.code;dialog.append(p);}
   dialog.append(n('p','The first form uses the original source. The second uses the other prepared message. Check the selected source every time; names, times and directions can change.'),b('I studied the form labels',()=>{if(update(next=>next.units[id].studied=true))open(id);},'a1-primary'));return;
  }
  const labelIndex=row.labels.findIndex(x=>!x);
  if(labelIndex>=0){
   const field=spec.fields[labelIndex];dialog.append(n('h3','Check a form label'),n('p',field.label),n('p','Choose what belongs in this field.'));
   for(const [index,option] of shuffle([...spec.fields.entries()]))dialog.append(b(option.meaning,()=>{const correct=index===labelIndex;if(!update(next=>{const r=next.units[id];r.labelAttempts.push({field:field.key,choice:option.meaning,correct,at:new Date().toISOString()});if(correct)r.labels[labelIndex]=true;}))return;if(correct)open(id);else ui.status('Compare this label with the field format, then try again.');}));
   dialog.append(b('Review label teaching',()=>{if(update(next=>next.units[id].studied=false))open(id);}));return;
  }
  const variant=spec.variants.find(v=>v.id===variantId);
  if(!variant){const p=progress(id);dialog.append(n('p',p.completedForms.length+' of '+p.requiredForms+' forms checked'),n('p','These tasks check source details and field use. They do not grade open writing or award a proficiency level.','a1-small'));
   for(const v of spec.variants)dialog.append(n('h3',v.title),b(row.forms[v.id]?.completedAt?'Review checked form':'Complete this form',()=>open(id,v.id)));
   dialog.append(b('Back to unit',()=>back(id)),b('Export form work',exportData));return;
  }
  const saved=row.forms[variant.id],text=n('blockquote',variant.source,'a1-panel');text.lang=LANG.code;
  dialog.append(n('h3',variant.title),n('p','Source: '+variant.sourceKind+'. Transfer only the requested details.'),text,n('p',spec.note));
  if(saved?.completedAt){
   for(const [i,f] of spec.fields.entries())dialog.append(n('p',f.label+': '+saved.values[i]));
   dialog.append(n('p','Form details checked correctly.'),n('p','Completed-example support: '+(saved.modelViewed?'used':'not opened')+'.'),b('All forms in this unit',()=>open(id)),b('Back to unit',()=>back(id)));return;
  }
  const inputs=[],form=n('form');form.onsubmit=e=>e.preventDefault();
  for(const [index,f] of spec.fields.entries()){
   const label=n('label',f.label),input=n('input');input.type='text';input.lang=LANG.code;input.maxLength=300;input.autocomplete='off';input.value=saved?.values?.[index]||'';input.setAttribute('aria-label',f.label+' · '+f.meaning);input.style.cssText='display:block;width:100%;box-sizing:border-box;min-height:44px;font:inherit;margin:8px 0 16px;padding:10px;border:2px solid #a9c6b8;border-radius:12px';
   input.oninput=()=>{const values=inputs.map(i=>i.value);unsavedDraft={unitId:id,variant:variant.id,values};update(next=>{const r=next.units[id];r.forms[variant.id]={...(r.forms[variant.id]||{}),values};});};inputs.push(input);label.append(input);form.append(label,ui.letters(input));
  }
  dialog.append(form,b('Show a completed example',()=>{if(update(next=>{const r=next.units[id];r.forms[variant.id]={...(r.forms[variant.id]||{}),modelViewed:true};})){const panel=n('div',null,'a1-panel');for(const [i,f] of spec.fields.entries())panel.append(n('p',f.label+': '+spec.variants[0].values[i]));dialog.append(panel,n('p','This example uses the original details. Check which source your current form uses.'));}}));
  const feedback=n('div');feedback.setAttribute('aria-live','polite');dialog.append(feedback,b('Check all form details',()=>{
   const values=inputs.map(i=>i.value);unsavedDraft={unitId:id,variant:variant.id,values};if(values.some(v=>!v.trim())){ui.status('Fill all three fields before checking the form.');return;}
   const matches=values.map((v,i)=>fold(v)===fold(variant.values[i])),passed=matches.every(Boolean);
   if(!update(next=>{const r=next.units[id],previous=r.forms[variant.id]||{};r.forms[variant.id]={...previous,values,attempts:[...(previous.attempts||[]),{values:[...values],correct:matches,at:new Date().toISOString()}],...(passed?{completedAt:new Date().toISOString()}:{} )};}))return;
   if(passed){open(id,variant.id);return;}
   feedback.replaceChildren(n('p','Some details need another look. Your entries are kept.'));
   matches.forEach((ok,i)=>{if(!ok)feedback.append(n('p',spec.fields[i].label+': compare this detail with the selected source and the taught field format.'));});
  },'a1-primary'),b('All forms in this unit',()=>open(id)),b('Export form work',exportData));
 });
}
window.addEventListener('storage',e=>{if(e.key===key){conflict=true;if(dialog.open)ui.status('This form changed in another tab. Export your copy before reloading.');}});
window.WordamiForms=Object.freeze({open,progress,evidence,exportData,catalogue:()=>Object.keys(bank.units).map(progress)});
function route(){const id=decodeURIComponent(location.hash.replace(/^#forms-/,''));if(location.hash.startsWith('#forms-')&&bank.units[id])open(id);}
window.addEventListener('hashchange',route);if(location.hash.startsWith('#forms-')){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',route,{once:true});else route();}
})();
