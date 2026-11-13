/* Required table reading with held feedback and source-bound, exportable attempts. */
(()=>{'use strict';
const bank=window.WordamiDocumentContent,studio=window.WordamiSkillsStudio,ui=window.WordamiPracticeUI;
if(!COURSE_V2||!bank||!studio||!ui)return;
const {node:n,button:b,dialog}=ui,key='wordami.documents.v1.'+LANG.code;
let data={schema:1,units:{}},lastRaw=null,conflict=false,returnTo=null;
try{lastRaw=localStorage.getItem(key);const saved=JSON.parse(lastRaw);if(saved?.schema===1&&saved.units)data=saved;}catch(e){}
const clone=v=>JSON.parse(JSON.stringify(v));
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return(h>>>0).toString(16);}
const signature=id=>hash(JSON.stringify([bank.version,id,bank.units[id]]));
const current=id=>data.units[id]?.signature===signature(id)?data.units[id]:null;
function update(fn){const next=clone(data);fn(next);try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;ui.status('This table activity changed in another tab. Export your copy before reloading.');return false;}const raw=JSON.stringify(next);localStorage.setItem(key,raw);data=next;lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;}catch(e){ui.status('The table activity could not be saved. Keep it open and retry, or export your records.');return false;}}
function progress(id){const spec=bank.units[id];if(!spec)return null;const row=current(id),passedVariants=spec.variants.filter(v=>row?.attempts?.some(a=>a.variant===v.id&&a.finishedAt&&a.answers.length===v.questions.length&&a.answers.every(x=>x.correct))).map(v=>v.id);return{id,complete:!!row?.studied&&passedVariants.length===spec.variants.length,passedVariants,requiredVariants:spec.variants.length};}
function evidence(id){return bank.units[id]?{task:clone(bank.units[id]),progress:progress(id),record:clone(current(id)||null),history:clone(data.units[id]?.history||[])}:null;}
function exportData(){const url=URL.createObjectURL(new Blob([JSON.stringify({schema:1,language:LANG.code,scope:bank.scope,units:data.units},null,2)],{type:'application/json'})),a=n('a');a.href=url;a.download='wordami-'+LANG.code+'-table-reading.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function back(id){if(returnTo){const fn=returnTo;returnTo=null;fn();}else studio.openUnit(id);}
function begin(id){if(!current(id)&&!update(next=>{const old=next.units[id];next.units[id]={signature:signature(id),definition:clone(bank.units[id]),studied:false,attempts:[],history:old?[...(old.history||[]),{...old,history:undefined}].slice(-20):[]};}))return;open(id);}
function table(spec,layout){const wrap=n('div'),t=n('table'),head=n('thead'),body=n('tbody'),caption=n('caption',layout==='rows'?'Original and changed details':'Details organised by field');wrap.tabIndex=0;wrap.setAttribute('role','region');wrap.setAttribute('aria-label','Source details table. Scroll horizontally to read all columns.');wrap.style.cssText='overflow-x:auto;max-width:100%;border:1px solid #648578;border-radius:8px;margin:16px 0';t.append(caption);t.style.cssText='width:100%;min-width:480px;border-collapse:collapse;table-layout:fixed';
 const row=(cells,header=false)=>{const tr=n('tr');cells.forEach((text,i)=>{const cell=n(header||i===0?'th':'td',text);if(header||i===0)cell.scope=header?'col':'row';if(i>0&&!header)cell.lang=LANG.code;cell.style.cssText='border:1px solid #648578;padding:8px;text-align:left;vertical-align:top';tr.append(cell);});return tr;};
 if(layout==='rows'){head.append(row(['Source details',...spec.fields.map(f=>f.label)],true));for(const r of spec.rows)body.append(row([r.label,...r.values]));}
 else{head.append(row(['Field',...spec.rows.map(r=>r.label)],true));spec.fields.forEach((f,i)=>body.append(row([f.label,...spec.rows.map(r=>r.values[i])])));}
 if(layout==='rows')[...head.querySelectorAll('th')].slice(1).forEach(cell=>cell.lang=LANG.code);else body.querySelectorAll('th').forEach(cell=>cell.lang=LANG.code);
 t.append(head,body);wrap.append(t);const container=n('div');container.append(n('p','On a small screen, swipe the table or focus it and use the arrow keys to read all columns.','a1-small'),wrap);return container;
}
function open(id,variantId,callback){const spec=bank.units[id];if(!spec)return;if(typeof callback==='function')returnTo=callback;history.replaceState(null,'','#documents-'+id);ui.show(spec.title,()=>{
 ui.announce();dialog.append(b('Export table records',exportData));
 if(conflict){dialog.append(n('p','Another tab has newer table work. Export this copy before reloading.'));return;}
 if(studio.canWrite(id)!==true){dialog.append(n('p','Complete the unit language preparation, grammar and both comprehension checks first.'),b('Back to unit',()=>back(id)));return;}
 const row=current(id);
 if(!row){dialog.append(n('p','Learn how to read these prepared details in a table, then compare them with the connected messages.'),b('Learn table reading',()=>begin(id),'a1-primary'));return;}
 if(!row.studied||variantId==='guide'){dialog.append(n('h3','Read the headings, then follow the row'));for(const line of spec.teaching)dialog.append(n('p',line));for(const f of spec.fields)dialog.append(n('p',f.label+' · '+f.meaning));dialog.append(n('p',spec.note),table(spec,'rows'),b('I studied the table guide',()=>{if(update(next=>next.units[id].studied=true))open(id);},'a1-primary'));return;}
 const variant=spec.variants.find(v=>v.id===variantId);
 if(!variant){const p=progress(id);dialog.append(n('p',p.passedVariants.length+' of '+p.requiredVariants+' table tasks checked'),n('p','These are prepared reading activities, not a proficiency award. Answers are reviewed after all questions.','a1-small'));for(const v of spec.variants){const previous=row.attempts.filter(a=>a.variant===v.id),pending=previous.at(-1)&&!previous.at(-1).finishedAt;dialog.append(n('h3',v.title),b(pending?'Resume this table':p.passedVariants.includes(v.id)?'Practise this table again':'Read this table',()=>{if(pending){open(id,v.id);return;}if(update(next=>next.units[id].attempts.push({id:crypto.randomUUID(),variant:v.id,firstExposure:previous.length===0,answers:[],startedAt:new Date().toISOString()})))open(id,v.id);}));}dialog.append(b('Review table guide',()=>open(id,'guide')),b('Back to unit',()=>back(id)));return;}
 const attempt=[...row.attempts].reverse().find(a=>a.variant===variant.id);
 if(!attempt){open(id);return;}
 dialog.append(n('h3',variant.title),table(spec,variant.layout));const source=n('blockquote',spec.rows[variant.sourceIndex].source,'a1-panel');source.lang=LANG.code;dialog.append(n('p','Compare with the '+spec.rows[variant.sourceIndex].sourceKind+'.'),source);
 if(attempt.finishedAt){const passed=attempt.answers.every(a=>a.correct);dialog.append(n('h3',passed?'Table details checked':'Review the table details'));variant.questions.forEach((q,i)=>dialog.append(n('p',q.prompt),n('p','Your answer: '+attempt.answers[i].choice),n('p',(attempt.answers[i].correct?'Correct. ':'Look again. ')+q.explanation),n('p','Source answer: '+q.answer)));dialog.append(n('p',attempt.firstExposure?'First attempt for this table layout.':'Repeated practice for this table layout.'),b('All table tasks',()=>open(id)),b('Back to unit',()=>back(id)));return;}
 const index=attempt.answers.length,q=variant.questions[index];dialog.append(n('p','Question '+(index+1)+' of '+variant.questions.length),n('p',q.prompt));for(const choice of shuffle(q.choices))dialog.append(b(choice,()=>{if(update(next=>{const a=next.units[id].attempts.find(a=>a.id===attempt.id);a.answers.push({choice,correct:choice===q.answer,at:new Date().toISOString()});if(a.answers.length===variant.questions.length)a.finishedAt=new Date().toISOString();}))open(id,variant.id);}));dialog.append(b('Save and return to table tasks',()=>open(id)));
 });}
window.addEventListener('storage',e=>{if(e.key===key){conflict=true;if(dialog.open)ui.status('This table activity changed in another tab. Export your copy before reloading.');}});
window.WordamiDocuments=Object.freeze({open,progress,evidence,exportData,catalogue:()=>Object.keys(bank.units).map(progress)});
function route(){const match=location.hash.match(/^#documents-(.+)$/);if(match&&bank.units[match[1]])open(match[1]);}window.addEventListener('hashchange',route);if(location.hash.startsWith('#documents-')){if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',route,{once:true});else route();}
})();
