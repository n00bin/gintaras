/* Local, versioned evidence for controlled transfer. No XP, FSRS or CEFR awards. */
(()=>{
'use strict';
function create(bank,mode){
const ui=window.WordamiPracticeUI,listening=mode==='listening',label=listening?'listening':'reading',routeName=listening?'listen-transfer':'transfer',apiName=listening?'WordamiListeningTransferChecks':'WordamiTransferChecks';
if(!LANG_PREVIEW||!bank||!ui)return;
const {node:n,button:b,dialog}=ui,key=(listening?'wordami.listening-transfer.v1.':'wordami.transfer.v1.')+LANG.code;
let data={schema:1,units:{}},lastRaw=null,conflict=false,returnTo=null,heardAttempt=null,player=null,cancelPlayback=null,playGeneration=0,playing=false;
try{lastRaw=localStorage.getItem(key);const saved=JSON.parse(lastRaw);if(saved?.schema===1&&saved.units&&typeof saved.units==='object')data=saved;}catch(e){}
const signatures=new Map();
function hash(text){let h=2166136261;for(const c of text)h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);}
function signature(id){if(!signatures.has(id))signatures.set(id,hash(JSON.stringify([bank.version,bank.units[id]])));return signatures.get(id);}
const sourceHash=variant=>hash(variant.text.normalize('NFC').replace(/\s+/g,' ').trim());
const seen=(id,variant)=>unitState(id).seen.includes(sourceHash(variant))||unitState(id).attempts.some(a=>!a.sourceHash&&a.variantId===variant.id);
const ready=id=>window.WordamiSkillsStudio?.canWrite(id)===true;
function save(){try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;ui.status('This check changed in another tab. Export this version before reloading.');return false;}const raw=JSON.stringify(data);localStorage.setItem(key,raw);lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;}catch(e){ui.status('The check could not be saved. Your answer has not been recorded. Keep this page open or export your records.');return false;}}
function change(update){const previous=JSON.stringify(data);update();if(save())return true;data=JSON.parse(previous);return false;}
const unitState=id=>data.units[id]||{attempts:[],seen:[]};
const current=id=>{const u=unitState(id);return u.attempts.find(a=>a.id===u.current&&a.signature===signature(id));};
const fold=t=>String(t).normalize('NFD').replace(/\p{M}/gu,'').toLocaleLowerCase().replace(/[!?¡¿“”"']/g,'').replace(/[.,]/g,(c,index,s)=>/\d/.test(s[index-1]||'')&&/\d/.test(s[index+1]||'')?c:'').replace(/\s+/g,' ').trim();
function stopPlayback(){playGeneration++;if(cancelPlayback)cancelPlayback();if(player)player.pause();player=null;playing=false;}
if(listening){ui.registerMediaStop(()=>{stopPlayback();if(!location.hash.startsWith('#'+routeName+'-'))heardAttempt=null;});window.addEventListener('pagehide',()=>{stopPlayback();heardAttempt=null;});dialog.addEventListener('close',()=>{stopPlayback();heardAttempt=null;});}
function playRecording(id,variant,attempt){
 stopPlayback();heardAttempt=null;
 const asset=window.WordamiListeningTransferAudio?.[LANG.code+'.'+id+'.'+variant.id];
 if(!asset){ui.status('This recording is unavailable. No listening result was recorded.');return Promise.resolve(false);}
 const token=playGeneration;playing=true;
 return new Promise(resolve=>{
  const audio=new Audio(asset.url);player=audio;let done=false;
  const finish=ok=>{if(done)return;done=true;clearTimeout(timer);audio.pause();audio.onended=audio.onerror=null;if(player===audio)player=null;cancelPlayback=null;playing=false;resolve(ok);};
  const timer=setTimeout(()=>{if(token===playGeneration)ui.status('Playback did not finish. Try the recording again.');finish(false);},Math.max(20000,asset.duration*4000));
  cancelPlayback=()=>finish(false);
  audio.onerror=()=>{if(token===playGeneration)ui.status('Audio could not play. No answer was recorded. Try again.');finish(false);};
  audio.onended=()=>{
   const ok=token===playGeneration&&Number.isFinite(audio.duration)&&audio.duration>0&&audio.currentTime>=asset.duration*.93;
   if(!ok){if(token===playGeneration)ui.status('Playback did not finish. Listen again before answering.');finish(false);return;}
   const saved=change(()=>{const live=current(id);live.playbackCount=(live.playbackCount||0)+1;live.lastHeardAt=new Date().toISOString();live.audioHash=asset.hash;});
   if(saved)heardAttempt=attempt.id;finish(saved);
  };
  audio.play().catch(()=>{if(token===playGeneration)ui.status('Audio could not start. No answer was recorded. Try again.');finish(false);});
 });
}
function exportData(){const url=URL.createObjectURL(new Blob([JSON.stringify({language:LANG.code,scope:bank.scope,...data},null,2)],{type:'application/json'})),link=n('a');link.href=url;link.download='wordami-'+LANG.code+'-'+label+'-checks.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function toUnit(id){if(returnTo){const callback=returnTo;returnTo=null;callback();return;}dialog.close();history.replaceState(null,'','#skills-'+id);window.dispatchEvent(new Event('hashchange'));}
function progress(id){const spec=bank.units[id];if(!spec)return null;const state=unitState(id),valid=state.attempts.filter(a=>a.signature===signature(id)&&a.finishedAt&&a.answers.length===3&&a.answers.every(a=>a.correct));const passed=spec.variants.filter(v=>valid.some(a=>a.sourceHash===sourceHash(v))||(state.passedSources||[]).some(p=>p.signature===signature(id)&&p.sourceHash===sourceHash(v))).map(v=>v.id);return {id,passed:passed.length===spec.variants.length,passedVariants:passed,requiredVariants:spec.variants.length};}
function status(id){const attempts=unitState(id).attempts.filter(a=>a.signature===signature(id));return {...progress(id),id,ready:ready(id),attempts:attempts.length,completed:attempts.filter(a=>a.finishedAt).length,firstExposureCompleted:attempts.filter(a=>a.finishedAt&&a.firstExposure).length,sourceVariantsSeen:bank.units[id].variants.filter(v=>seen(id,v)).length,availableVariants:bank.units[id].variants.length,skill:label,cefrLevel:null};}
function home(){returnTo=null;history.replaceState(null,'','#'+routeName);ui.show('Apply learned language · '+label,()=>{dialog.append(n('p',listening?'Hear a different complete message and answer three questions. Complete the connected unit’s preparation and both comprehension checks first.':'Read a different combination of familiar language and answer three questions. Complete the connected unit’s preparation and both comprehension checks first.'),n('p','These are narrow '+label+' checks. They do not assess speaking, writing or an overall CEFR level.','a1-small'));for(const [id,spec] of Object.entries(bank.units)){const s=status(id);dialog.append(n('h3',spec.title),n('p',s.ready?s.sourceVariantsSeen+' of '+s.availableVariants+' versions seen · '+s.completed+' recent checks completed':'Complete the connected unit first'),b(s.ready?'Open check':'View prerequisites',()=>open(id)));}dialog.append(b('Export '+label+'-check records',exportData),b('All skill stages',()=>toUnit('A1')));ui.announce();});}
function start(id){if(!ready(id)){open(id);return;}const spec=bank.units[id],u=unitState(id),unseen=spec.variants.filter(v=>!seen(id,v));const variant=unseen[0]||spec.variants[u.attempts.length%spec.variants.length];const firstExposure=unseen.length>0;
 if(change(()=>{if(!data.units[id])data.units[id]={attempts:[],seen:[]};const state=data.units[id],exposure=sourceHash(variant),attempt={id:crypto.randomUUID(),signature:signature(id),sourceHash:exposure,variantId:variant.id,firstExposure,startedAt:new Date().toISOString(),answers:[],finishedAt:null};state.attempts.push(attempt);state.attempts=state.attempts.slice(-8);state.current=attempt.id;if(!state.seen.includes(exposure))state.seen.push(exposure);}))open(id);
}
function open(id,callback){if(!bank.units[id]){home();return;}if(typeof callback==='function')returnTo=callback;history.replaceState(null,'','#'+routeName+'-'+id);const spec=bank.units[id];ui.show(spec.title,()=>{
 if(conflict){ui.status('This check changed in another tab. Export this version before reloading.');dialog.append(b('Export '+label+'-check records',exportData),b('Back to unit',()=>toUnit(id)));ui.announce();return;}
 if(!ready(id)){dialog.append(n('p','Complete the connected unit’s vocabulary, source language, grammar and both comprehension checks before opening this '+(listening?'recording.':'document.')),b('Continue the connected unit',()=>toUnit(id),'a1-primary'),b('All '+label+' checks',home));ui.announce();return;}
 const attempt=current(id);
 if(!attempt){const unseen=spec.variants.filter(v=>!seen(id,v)).length;dialog.append(n('p',(listening?'Listen to a complete message without a transcript.':'Read a different document using language you have prepared.')+' Answer three questions. Some ask for a short answer in English or the language you are learning; others ask you to choose the meaning. Feedback appears after all three answers.'),n('p','This checks three '+label+' details. It does not test original writing or establish a CEFR level.','a1-small'),n('p',unseen?unseen+' unseen versions available.':'All versions have been seen; the next visit is repeat practice.'),b(unseen?'Begin a new version':'Repeat a used version',()=>start(id),'a1-primary'),b('Back to unit',()=>toUnit(id)));ui.announce();return;}
 const variant=spec.variants.find(v=>v.id===attempt.variantId);
 if(!variant){dialog.append(n('p','This document version is unavailable. Previous results are retained in your export.'),b('Start the current version',()=>start(id)),b('Export '+label+'-check records',exportData));ui.announce();return;}
 if(attempt.finishedAt){const correct=attempt.answers.filter(a=>a.correct).length;dialog.append(n('h3',listening?'Listening feedback':'Reading feedback'),n('p',correct+' of 3 details correct.'),n('p',attempt.firstExposure?listening?'First attempt with this recording version.':'First attempt with this document version.':listening?'Repeat practice with a previously heard recording.':'Repeat practice with a previously seen document.'),n('p','This result describes these three details only. It is not a CEFR level.'));for(const [index,q] of variant.questions.entries()){dialog.append(n('p',q.prompt),n('p',(attempt.answers[index]?.correct?'Correct. ':'Review this detail. ')+q.model));if(q.explanation)dialog.append(n('p',q.explanation));}const model=n('div',variant.text,'a1-panel');model.lang=LANG.code;dialog.append(n('h3',listening?'Transcript after the check':'The document'),model);const unseen=spec.variants.some(v=>!seen(id,v));dialog.append(b(unseen?'Try the other new version':'Repeat a used version',()=>start(id)),b('Review the connected unit',()=>toUnit(id),'a1-primary'),b('Export '+label+'-check records',exportData),b('All '+label+' checks',home));ui.announce();return;}
 const index=attempt.answers.length,q=variant.questions[index],progress=n('progress');progress.max=3;progress.value=index;progress.setAttribute('aria-label',index+' of 3 answers recorded');const document=listening?null:n('div',variant.text,'a1-panel');if(document)document.lang=LANG.code;dialog.append(progress,n('p',spec.documentKind,'a1-small'));if(document)dialog.append(document);dialog.append(n('p',attempt.firstExposure?'First attempt with this version':'Repeat practice','a1-small'),n('p','Detail '+(index+1)+' of 3. Feedback appears at the end.'),n('h3',q.prompt));const form=n('form'),answerButtons=[];
 function recordAnswer(correct){
  if(!ready(id)){open(id);return;}
  if(listening&&(heardAttempt!==attempt.id||playing)){ui.status('Listen to the complete message before answering.');return;}
  if(change(()=>{const live=current(id);live.answers.push({correct,answeredAt:new Date().toISOString(),...(listening?{audioHash:live.audioHash,playbackCount:live.playbackCount}:{})});if(live.answers.length===3){live.finishedAt=new Date().toISOString();if(live.answers.every(a=>a.correct)){const state=data.units[id];state.passedSources=(state.passedSources||[]).filter(p=>p.signature===signature(id)&&p.sourceHash!==live.sourceHash);state.passedSources.push({signature:signature(id),sourceHash:live.sourceHash,passedAt:live.finishedAt});}}}))open(id);
 }
 if(q.options){
  form.setAttribute('aria-label','Choose the meaning');
  const choices=q.options.map((text,index)=>({text,index}));
  for(let i=choices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}
  for(const choice of choices){const button=b(choice.text,()=>recordAnswer(choice.index===q.answer));answerButtons.push(button);form.append(button);}
  form.onsubmit=e=>e.preventDefault();
 }else{
  const input=n('input'),submit=n('button','Record answer','a1-primary');input.type='text';input.maxLength=160;input.autocomplete='off';input.spellcheck=false;input.setAttribute('aria-label','Your short '+label+' answer');submit.type='submit';answerButtons.push(submit);form.append(input,submit);
  form.onsubmit=e=>{e.preventDefault();if(!input.value.trim()){ui.status('Enter a short answer before continuing.');return;}recordAnswer(q.answers.some(a=>fold(a)===fold(input.value)));};
 }
 if(listening){
  answerButtons.forEach(button=>{button.disabled=heardAttempt!==attempt.id;});
  const play=b('Listen to the complete message',async()=>{
   play.disabled=true;answerButtons.forEach(button=>{button.disabled=true;});ui.status('Playing the complete message…');
   const ok=await playRecording(id,variant,attempt);
   if(!play.isConnected)return;play.disabled=false;answerButtons.forEach(button=>{button.disabled=!ok;});
   if(ok)ui.status('Recording finished. Enter the detail you heard.');
  },'a1-primary');
  dialog.append(play,n('p','You can replay the message. The transcript appears after all three answers. Reopening an unfinished check requires listening again.','a1-small'));
 }
 dialog.append(form,b('Return to the unit',()=>toUnit(id)),b('Export '+label+'-check records',exportData));ui.announce();
 });}
ui.registerTopic({title:'Apply learned language · '+label,open:home});
window[apiName]=Object.freeze({open,home,exportData,progress,catalogue:()=>Object.keys(bank.units).map(status)});
function route(){if(location.hash==='#'+routeName){home();return;}const id=Object.keys(bank.units).find(id=>location.hash==='#'+routeName+'-'+id);if(id)open(id);}
route();window.addEventListener('hashchange',route);window.addEventListener('DOMContentLoaded',route,{once:true});
}
create(window.WordamiTransferContent,'reading');
create(window.WordamiListeningTransferContent,'listening');
window.dispatchEvent(new Event('wordami:practice-extensions-ready'));
})();
