/* Required written interaction: actual drafts, partner meaning and revised replies. */
(()=>{'use strict';
const bank=window.WordamiWrittenInteractionContent,studio=window.WordamiSkillsStudio,ui=window.WordamiPracticeUI;
if(!LANG_PREVIEW||!bank||!studio||!ui)return;
const {node:n,button:b,dialog}=ui,key='wordami.written-interaction.v1.'+LANG.code;
let data={schema:1,units:{}},lastRaw=null,conflict=false,returnTo=null,draftTimer=null;
try{lastRaw=localStorage.getItem(key);const saved=JSON.parse(lastRaw);if(saved?.schema===1&&saved.units&&typeof saved.units==='object')data=saved;}catch(e){}
const clone=v=>JSON.parse(JSON.stringify(v)),fold=v=>v.normalize('NFC').replace(/\s+/g,' ').trim();
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);}
const signature=(id,spec)=>hash(JSON.stringify([bank.version,id,spec]));
const ready=id=>studio.canWrite(id)===true;
const records=id=>data.units[id]?.records||[];
const record=(id,spec)=>records(id).findLast(r=>r.scenario===spec.key&&r.signature===signature(id,spec));
function save(){clearTimeout(draftTimer);draftTimer=null;try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;ui.status('This exchange changed in another tab. Export this copy before reloading.');return false;}const raw=JSON.stringify(data);localStorage.setItem(key,raw);lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;}catch(e){ui.status('The exchange could not be saved. Keep this view open and export your work.');return false;}}
function change(fn){const previous=clone(data),live=new Map(Object.values(data.units).flatMap(u=>u.records||[]).map(r=>[r.id,r]));fn();if(save())return true;for(const u of Object.values(previous.units))u.records=u.records.map(saved=>{const r=live.get(saved.id);if(!r)return saved;for(const k of Object.keys(r))delete r[k];return Object.assign(r,saved);});data=previous;return false;}
function savedDraft(fn){fn();clearTimeout(draftTimer);draftTimer=setTimeout(()=>{if(save())ui.status('Message draft saved on this device.');},300);}
function progress(id){const spec=bank.units[id];if(!spec)return null;const complete=spec.exchanges.filter(e=>{const r=record(id,e);return r?.stage==='done'&&r.questionReviewed&&r.detailUnderstood&&r.completedAt&&r.revisions?.length;}).map(e=>e.key);return {id,complete:complete.length===spec.exchanges.length,completedExchanges:complete,requiredExchanges:spec.exchanges.length};}
function evidence(id){const spec=bank.units[id];return spec?{unitId:id,version:bank.version,progress:progress(id),exchanges:spec.exchanges.map(s=>({scenario:clone(s),record:clone(record(id,s)||null)}))}:null;}
function back(id){if(returnTo){const fn=returnTo;returnTo=null;fn();}else studio.openUnit(id);}
function exportData(){const url=URL.createObjectURL(new Blob([JSON.stringify({schema:1,language:LANG.code,exportedAt:new Date().toISOString(),units:data.units},null,2)],{type:'application/json'})),link=n('a');link.href=url;link.download='wordami-'+LANG.code+'-written-exchanges.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function start(id,spec){if(!ready(id))return;const existing=record(id,spec);if(!existing&& !change(()=>{if(!data.units[id])data.units[id]={records:[]};data.units[id].records.push({id:crypto.randomUUID(),scenario:spec.key,signature:signature(id,spec),stage:'question',question:'',questionReviewed:false,questionFrameViewed:false,responseFrameViewed:false,answers:[],draft:'',baseline:'',excerpts:Array(3).fill(''),reflection:'',revisions:[],startedAt:new Date().toISOString()});}))return;open(id,spec.key);}
function field(labelText,value,oninput,aria=labelText){const label=n('label',labelText),input=n('textarea');input.value=value||'';input.maxLength=12000;input.lang=LANG.code;input.setAttribute('aria-label',aria);input.oninput=()=>savedDraft(()=>oninput(input.value));label.append(input);dialog.append(label,ui.letters(input));return input;}
function modelButton(text,spec,r,property,model){const panel=n('div'),button=b(text,()=>{if(change(()=>{r[property]=true;})){button.disabled=true;const p=n('p',model,'a1-panel');p.lang=LANG.code;panel.append(p);}});if(r[property]){button.disabled=true;const p=n('p',model,'a1-panel');p.lang=LANG.code;panel.append(p);}dialog.append(button,panel);}
function showReply(spec){dialog.append(n('h3','Partner’s message'));const p=n('blockquote',spec.partnerReply,'a1-panel');p.lang=LANG.code;dialog.append(p);}
function open(id,scenario,callback){const unit=bank.units[id];if(!unit)return;if(typeof callback==='function')returnTo=callback;if(draftTimer)save();history.replaceState(null,'','#written-exchange-'+id);ui.show(unit.title,()=>{
 if(conflict){dialog.append(n('p','Another tab has a newer copy. Export your work before reloading.'),b('Export written exchanges',exportData));return;}
 if(!ready(id)){dialog.append(n('p','Complete this unit’s language preparation, grammar and both comprehension checks first.'),b('Continue the unit',()=>back(id)));return;}
 const resume=scenario==='overview'?null:scenario||unit.exchanges.find(s=>{const r=record(id,s);return r&&r.stage!=='done';})?.key;
 const spec=unit.exchanges.find(s=>s.key===resume),r=spec&&record(id,spec);
 if(!spec||!r){const p=progress(id);dialog.append(n('p',unit.preparation),n('p','Write a checking question, read the prepared partner reply, then draft and revise your response. The app checks the reply detail; your own writing is self-reviewed. It does not assess grammar or award a CEFR level.','a1-small'),n('p',p.completedExchanges.length+' of '+p.requiredExchanges+' written exchanges complete'));
  for(const s of unit.exchanges)dialog.append(n('h3',s.title),n('p','Question purpose: '+s.intention),b(record(id,s)?.stage==='done'?'Review this exchange':'Open written exchange',()=>start(id,s)));
  dialog.append(b('Back to unit',()=>back(id)),b('Export written exchanges',exportData));ui.announce();return;
 }
 dialog.append(n('p','Question purpose: '+spec.intention));
 if(r.stage==='question'){
  dialog.append(n('h3','1 · Write your question'),n('p','Ask the partner to check the selected detail. Use your own wording or revisit the prepared frame. You can use fictional details; no personal contact information is needed.'));
  modelButton('Show a question frame',spec,r,'questionFrameViewed',spec.questionModel);
  const question=field('Your checking message',r.question,v=>r.question=v),label=n('label'),box=n('input');box.type='checkbox';box.checked=r.questionReviewed;box.onchange=()=>{r.questionReviewed=box.checked;save();};label.append(box,document.createTextNode('I checked that my message asks about the selected detail.'));dialog.append(label,b('Send practice question',()=>{if(fold(question.value).length<3||!box.checked){ui.status('Write your question and review its purpose before continuing.');return;}if(change(()=>{r.question=question.value;r.questionReviewed=true;r.questionSentAt=new Date().toISOString();r.stage='partner';}))open(id,spec.key);},'a1-primary'));
 }else if(r.stage==='partner'){
  dialog.append(n('h3','2 · Read the clarification'),n('p','Your question'),n('p',r.question,'a1-panel'));showReply(spec);dialog.append(n('h3',spec.detailQuestion));
  for(const [index,option] of spec.options.entries())dialog.append(b(option,()=>{const correct=index===spec.answer;if(!change(()=>{r.answers.push({choice:index,correct,at:new Date().toISOString()});if(correct){r.detailUnderstood=true;r.stage='response';}}))return;if(correct)open(id,spec.key);else ui.status('Compare the partner’s message with the detail you asked about, then try again.');}));
 }else if(r.stage==='response'||r.stage==='revision'){
  dialog.append(n('h3',r.stage==='response'?'3 · Draft a useful reply':'4 · Revise your reply'));showReply(spec);for(const goal of spec.goals)dialog.append(n('p',goal));
  modelButton('Show a response frame',spec,r,'responseFrameViewed',spec.responseModel);
  const draft=field('Your reply',r.draft,v=>r.draft=v);
  if(r.stage==='response')dialog.append(b('Save first reply',()=>{if(fold(draft.value).length<3){ui.status('Write a reply before reviewing it.');return;}if(change(()=>{r.draft=draft.value;r.baseline=draft.value;r.stage='revision';}))open(id,spec.key);},'a1-primary'));
  else{
   dialog.append(n('p','Read your reply again. Improve its wording or detail, then quote the passages that address the goals. Valid paraphrases are welcome; these checks save your self-review and do not judge language accuracy.','a1-small'));
   spec.goals.forEach((goal,i)=>field(goal,r.excerpts[i],v=>r.excerpts[i]=v,'Reply evidence '+(i+1)));
   const reflection=field('What did you improve, and why?',r.reflection,v=>r.reflection=v,'Your message revision reflection');
   dialog.append(b('Save revised exchange',()=>{
    if(fold(draft.value)===fold(r.baseline)){ui.status('Revise your reply before saving the reviewed version.');return;}
    if(r.excerpts.some(t=>fold(t).length<3||!fold(draft.value).includes(fold(t)))){ui.status('Quote a short passage from your revised reply for each goal.');return;}
    if(fold(reflection.value).length<5){ui.status('Explain one improvement and why you made it.');return;}
    if(change(()=>{r.draft=draft.value;r.reflection=reflection.value;r.completedAt=new Date().toISOString();r.revisions.push({text:r.draft,excerpts:[...r.excerpts],reflection:r.reflection,at:r.completedAt});r.stage='done';}))open(id,spec.key);
   },'a1-primary'));
  }
 }else if(r.stage==='done'){
  dialog.append(n('h3','Exchange revised and self-reviewed'),n('p','Your checking question'),n('p',r.question,'a1-panel'));showReply(spec);dialog.append(n('h3','Your revised reply'),n('p',r.draft,'a1-panel'),n('p',r.reflection),n('p','Question frame: '+(r.questionFrameViewed?'used':'not opened')+'. Response frame: '+(r.responseFrameViewed?'used':'not opened')+'. Writing accuracy and proficiency have not been graded.','a1-small'),b('All exchanges in this unit',()=>open(id,'overview')));
 }
 dialog.append(b('Back to unit',()=>{save();back(id);}),b('Export written exchanges',exportData));ui.announce();
 });}
window.WordamiWrittenInteraction=Object.freeze({open,progress,evidence,exportData,catalogue:()=>Object.keys(bank.units).map(progress)});
function route(){const id=Object.keys(bank.units).find(id=>location.hash==='#written-exchange-'+id);if(id)open(id);}
window.addEventListener('hashchange',route);window.addEventListener('DOMContentLoaded',route,{once:true});window.dispatchEvent(new Event('wordami:practice-extensions-ready'));
window.addEventListener('pagehide',()=>{if(draftTimer)save();});
})();
