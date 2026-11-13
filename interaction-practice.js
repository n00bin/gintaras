/* Guided recorded branches. Selection drives the partner; speech is never auto-graded. */
(()=>{
'use strict';
const bank=window.WordamiInteractionPracticeContent,ui=window.WordamiPracticeUI;
if(!LANG_PREVIEW||!bank||!ui)return;
const {node:n,button:b,dialog}=ui,key='wordami.interaction-practice.v1.'+LANG.code;
let data={schema:1,units:{}},lastRaw=null,conflict=false,returnTo=null,generation=0,player=null,cancelAudio=null,recorder=null,stream=null,recordTimer=null,blobURL=null,heardReply=null;
try{lastRaw=localStorage.getItem(key);const saved=JSON.parse(lastRaw);if(saved?.schema===1&&saved.units&&typeof saved.units==='object')data=saved;}catch(e){}
const ready=id=>window.WordamiSkillsStudio?.canWrite(id)===true;
const sourceAsset=id=>window.WordamiSkillsAudio?.[LANG.code+'.'+id+'.listen'];
const replyAsset=(id,part)=>window.WordamiInteractionPracticeAudio?.[LANG.code+'.'+id+'.'+part];
function signature(id){let h=2166136261;for(const c of JSON.stringify([bank.version,bank.units[id],sourceAsset(id)?.hash]))h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0).toString(16);}
const unit=id=>data.units[id]||{rounds:[]};
const current=id=>unit(id).rounds.find(r=>r.id===unit(id).current&&r.signature===signature(id));
function save(){try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;ui.status('This practice changed in another tab. Export this version before reloading.');return false;}const raw=JSON.stringify(data);localStorage.setItem(key,raw);lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;}catch(e){ui.status('Practice could not be saved. Your current work is still available in this view.');return false;}}
function change(fn){const old=JSON.stringify(data);fn();if(save())return true;data=JSON.parse(old);return false;}
function stopAudio(){if(cancelAudio)cancelAudio();if(player)player.pause();player=null;}
function stop(){generation++;stopAudio();clearInterval(recordTimer);recordTimer=null;if(recorder&&recorder.state==='recording')try{recorder.stop();}catch(e){}recorder=null;if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(blobURL)URL.revokeObjectURL(blobURL);blobURL=null;heardReply=null;}
ui.registerMediaStop(stop);window.addEventListener('pagehide',stop);dialog.addEventListener('close',stop);
function play(asset){
 if(recorder?.state==='recording'){ui.status('Stop recording before playing audio.');return Promise.resolve(false);}
 stopAudio();if(!asset){ui.status('The recording is unavailable. No task result was recorded.');return Promise.resolve(false);}
 const token=generation;
 return new Promise(resolve=>{const audio=new Audio(asset.url);player=audio;let done=false;
  const finish=ok=>{if(done)return;done=true;clearTimeout(timer);audio.pause();audio.onended=audio.onerror=null;if(player===audio)player=null;cancelAudio=null;resolve(ok);};
  const timer=setTimeout(()=>{if(token===generation)ui.status('Playback did not finish. Try again.');finish(false);},Math.min(180000,Math.max(20000,asset.duration*4000)));
  cancelAudio=()=>finish(false);
  audio.onerror=()=>{if(token===generation)ui.status('Audio could not play. No task result was recorded.');finish(false);};
  audio.onended=()=>{const complete=asset.local?audio.ended&&audio.currentTime>0:Number.isFinite(asset.duration)&&asset.duration>0&&audio.currentTime>=asset.duration*.93;const ok=token===generation&&complete;if(!ok&&token===generation)ui.status('Playback did not finish. Replay before continuing.');finish(ok);};
  audio.play().catch(()=>{if(token===generation)ui.status('Audio could not start. Try again.');finish(false);});
 });
}
function exportData(){const url=URL.createObjectURL(new Blob([JSON.stringify({language:LANG.code,scope:'guided_recorded_interaction',...data},null,2)],{type:'application/json'})),link=n('a');link.href=url;link.download='wordami-'+LANG.code+'-guided-exchanges.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function back(id){if(returnTo){const callback=returnTo;returnTo=null;callback();return;}dialog.close();history.replaceState(null,'','#skills-'+id);window.dispatchEvent(new Event('hashchange'));}
function recordingWidget({id,prompt,criterion,reflectionRequired,onSave}){
 let recording=null,duration=0,replayed=false,mediaError=false;
 dialog.append(n('p',prompt),n('p','Record and replay your voice, then review it yourself. Audio stays in this session. No speech recognition, pronunciation score or automatic meaning grade is used.','a1-small'));
 const replay=b('Replay my response',async()=>{if(!blobURL)return;replay.disabled=record.disabled=true;const ok=await play({url:blobURL,duration,local:true});if(!replay.isConnected)return;replayed=ok;finish.disabled=!ok;replay.disabled=record.disabled=false;if(ok)ui.status('Response replayed. Review it before continuing.');});replay.disabled=true;
 const download=b('Download my response',()=>{if(!blobURL)return;const link=n('a');link.href=blobURL;link.download='wordami-'+LANG.code+'-'+id+'-response.'+(recording.type.includes('ogg')?'ogg':recording.type.includes('mp4')?'m4a':'webm');link.click();});download.disabled=true;
 const record=b('Start recording',async()=>{
  if(recorder?.state==='recording'){recorder.stop();return;}
  if(!navigator.mediaDevices?.getUserMedia||!window.MediaRecorder){ui.status('Recording is unavailable in this browser. No spoken result was recorded.');return;}
  stopAudio();const token=generation;record.disabled=true;let media;
  try{media=await navigator.mediaDevices.getUserMedia({audio:true});if(token!==generation){media.getTracks().forEach(t=>t.stop());return;}stream=media;const mr=new MediaRecorder(media),chunks=[];recorder=mr;const started=Date.now();recording=null;replayed=false;mediaError=false;box.checked=false;replay.disabled=download.disabled=finish.disabled=true;
   mr.ondataavailable=e=>{if(e.data.size)chunks.push(e.data);};
   mr.onerror=()=>{mediaError=true;media.getTracks().forEach(t=>t.stop());if(stream===media)stream=null;if(recorder===mr)recorder=null;if(token===generation)clearInterval(recordTimer);if(token===generation){record.disabled=false;record.textContent='Start recording';ui.status('Recording failed. No spoken result was recorded.');}};
   mr.onstop=()=>{media.getTracks().forEach(t=>t.stop());if(stream===media)stream=null;if(recorder===mr)recorder=null;if(token===generation)clearInterval(recordTimer);if(token!==generation||mediaError)return;const elapsed=(Date.now()-started)/1000,blob=new Blob(chunks,{type:mr.mimeType||'audio/webm'});record.disabled=false;record.textContent='Record again';if(elapsed<1||blob.size<128){ui.status('Record at least one second, then replay your response.');return;}recording=blob;duration=elapsed;if(blobURL)URL.revokeObjectURL(blobURL);blobURL=URL.createObjectURL(blob);replay.disabled=download.disabled=false;ui.status('Recorded. Replay your response before reviewing it.');};
   mr.start();record.textContent='Stop recording';record.disabled=false;ui.status('Recording…');recordTimer=setInterval(()=>{if(Date.now()-started>=120000&&mr.state==='recording')mr.stop();},1000);
  }catch(e){if(media)media.getTracks().forEach(t=>t.stop());if(token===generation){record.disabled=false;ui.status('Microphone access was unavailable. No spoken result was recorded.');}}
 });
 const label=n('label'),box=n('input');box.type='checkbox';label.append(box,document.createTextNode(criterion));
 const reflection=n('textarea');reflection.maxLength=1000;reflection.setAttribute('aria-label','One improvement for this exchange');
 const finish=b('Save this response review',()=>{if(!recording||!replayed){ui.status('Record and replay your response first.');return;}if(!box.checked||reflectionRequired&&reflection.value.trim().length<5){ui.status('Confirm your review and name one improvement before continuing.');return;}onSave({duration:Math.round(duration*1000)/1000,reviewedAt:new Date().toISOString(),selfReviewed:true,...(reflectionRequired?{reflection:reflection.value.trim()}: {})});},'a1-primary');finish.disabled=true;
 dialog.append(record,replay,download,label);if(reflectionRequired){const l=n('label','One thing to improve next time');l.append(reflection);dialog.append(l);}dialog.append(finish);
}
function progress(id){const spec=bank.units[id];if(!spec)return null;const s=unit(id),sig=signature(id),completed=spec.questions.filter(([branch])=>s.rounds.some(r=>r.signature===sig&&r.question===branch&&r.completedAt&&r.questionReview?.selfReviewed&&r.responseReview?.selfReviewed&&r.detailUnderstood)||(s.completedBranches||[]).some(r=>r.signature===sig&&r.branch===branch)).map(q=>q[0]);return {id,complete:completed.length===spec.questions.length,completedBranches:completed,requiredBranches:spec.questions.length};}
function start(id){if(!ready(id)){open(id);return;}if(change(()=>{if(!data.units[id])data.units[id]={rounds:[]};const state=data.units[id],round={id:crypto.randomUUID(),signature:signature(id),stage:'source',startedAt:new Date().toISOString(),assisted:true};state.rounds.push(round);state.rounds=state.rounds.slice(-8);state.current=round.id;}))open(id);}
function home(){returnTo=null;history.replaceState(null,'','#guided-exchange');ui.show('Check and clarify · guided exchanges',()=>{dialog.append(n('p','Practise asking a checking question, hearing the recorded partner confirm or correct the detail, then responding. These are prepared recorded branches, not a live adaptive conversation.'));for(const [id,spec] of Object.entries(bank.units))dialog.append(n('h3',spec.title),n('p',unit(id).rounds.filter(r=>r.completedAt).length+' recent exchanges self-reviewed'),b(ready(id)?'Open exchange':'View prerequisites',()=>open(id)));dialog.append(b('Export guided exchange records',exportData));ui.announce();});}
function open(id,callback){if(!bank.units[id]){home();return;}if(typeof callback==='function')returnTo=callback;history.replaceState(null,'','#guided-exchange-'+id);const spec=bank.units[id];ui.show(spec.title,()=>{
 if(conflict){ui.status('This practice changed in another tab. Export this version before reloading.');dialog.append(b('Export guided exchange records',exportData));ui.announce();return;}
 if(!ready(id)){dialog.append(n('p','Complete the unit’s language, source, grammar and both comprehension checks first.'),b('Continue the unit',()=>back(id)));ui.announce();return;}
 const round=current(id),branch=spec.branches?.[round?.question]||spec;
 if(!round){dialog.append(n('p',spec.goal),n('p',spec.selectionGuide||'Use questioning intonation to check a familiar fragment. You will choose which question you asked; that choice drives a prepared partner reply. The app does not interpret your voice.','a1-small'),b('Begin guided exchange',()=>start(id),'a1-primary'),b('Back to unit',()=>back(id)));ui.announce();return;}
 if(round.stage==='source'){
  dialog.append(n('h3','1 · Hear the situation'),n('p',spec.sourceGuide||'Hear the unit’s familiar message, then check one detail with the speaker. This reuses prepared material; it is practice.'));
  const hear=b('Hear the situation',async()=>{hear.disabled=true;const ok=await play(sourceAsset(id));if(!hear.isConnected)return;hear.disabled=false;if(ok&&change(()=>{current(id).sourceHeardAt=new Date().toISOString();current(id).stage='question';}))open(id);},'a1-primary');dialog.append(hear);
 }else if(round.stage==='question'){
  dialog.append(n('h3',spec.questionTitle||'2 · Ask a checking question'),n('p',spec.questionGuide||'Both questions below are valid ways to check a detail. The partner will either confirm the stated detail or correct the alternative. Choose the question you intend to say.'));
  for(const [branch,text,meaning] of spec.questions){dialog.append(b(spec.supportMode==='intent_first'?'Ask about: '+meaning:'Ask: '+text,()=>{if(change(()=>{current(id).question=branch;}))open(id);}),n('p',spec.supportMode==='intent_first'?'A question frame is available after you choose.':meaning,'a1-small'));}
  if(round.question){const selected=spec.questions.find(q=>q[0]===round.question);const text=n('p',selected[1],'a1-panel');text.lang=LANG.code;
   const frame=n('div');
   if(spec.supportMode==='intent_first'){
    const reveal=b('Show a question frame',()=>{if(change(()=>{current(id).questionFrameViewedAt=new Date().toISOString();})){reveal.disabled=true;frame.append(text);}});dialog.append(reveal);
    if(round.questionFrameViewedAt)frame.append(text);
   }else frame.append(text);
   dialog.append(frame,b('Hear the question model',async()=>{const ok=await play(replyAsset(id,'question-'+round.question));if(ok&&spec.supportMode==='intent_first')change(()=>{current(id).questionModelHeardAt=new Date().toISOString();});}));
   recordingWidget({id,prompt:spec.questionRecordingPrompt||'Ask the selected checking question aloud.',criterion:spec.questionReview||'I replayed my recording and checked that I asked the selected question.',onSave:review=>{if(change(()=>{current(id).questionReview=review;current(id).stage='reply';}))open(id);}});}
 }else if(round.stage==='reply'){
  dialog.append(n('h3',spec.replyTitle||'3 · Hear the clarification'),n('p','The reply follows the question you selected. It does not follow an automatic interpretation of your recording.','a1-small'));
  const options=n('div'),hear=b('Hear the partner reply',async()=>{hear.disabled=true;const asset=replyAsset(id,round.question),ok=await play(asset);if(!hear.isConnected)return;hear.disabled=false;if(ok&&change(()=>{current(id).replyHeardAt=new Date().toISOString();current(id).replyHash=asset.hash;})){heardReply=round.id;ui.status('Partner finished. Choose the detail you heard.');for(const b of options.querySelectorAll('button'))b.disabled=false;}},'a1-primary');dialog.append(hear,n('h4',branch.detailQuestion));
  for(const [index,text] of [...branch.options.entries()].sort(()=>Math.random()-.5)){const choice=b(text,()=>{if(heardReply!==round.id)return;if(index!==branch.answer){if(change(()=>{current(id).detailRetries=(current(id).detailRetries||0)+1;}))ui.status('Listen for the clarified detail, then try again.');return;}if(change(()=>{current(id).detailUnderstood=true;current(id).stage='response';}))open(id);});choice.disabled=true;options.append(choice);}dialog.append(options);
 }else if(round.stage==='response'){
  dialog.append(n('h3','4 · Respond to the clarified detail'),n('p',branch.responseContext||(round.question==='correct'?'Your partner corrected the alternative detail. Use the clarified information in your response.':'Your partner confirmed the detail. Acknowledge it in your response.')),n('p',branch.responseGoal));const model=n('details');model.append(n('summary','Revisit the clarified wording'),n('p',branch.detailModel));dialog.append(model);
  recordingWidget({id,prompt:branch.responseGoal,criterion:branch.responseReview||'I replayed my response and checked that I used the partner’s clarified detail.',reflectionRequired:true,onSave:review=>{if(change(()=>{current(id).responseReview=review;current(id).completedAt=new Date().toISOString();current(id).stage='done';const s=data.units[id],r=current(id);s.completedBranches=(s.completedBranches||[]).filter(b=>b.signature===signature(id)&&b.branch!==r.question);s.completedBranches.push({signature:signature(id),branch:r.question,completedAt:r.completedAt});}))open(id);}});
 }else if(round.stage==='done'){
  const summary=n('section',null,'a1-panel');summary.append(n('h4','What you clarified'));for(const text of [spec.questions.find(q=>q[0]===round.question)?.[1],spec.replies[round.question],branch.detailModel]){const p=n('p',text);p.lang=LANG.code;summary.append(p);}const reflection=n('p',round.responseReview?.reflection||'');reflection.style.overflowWrap='anywhere';
  dialog.append(n('h3','Guided exchange self-reviewed'),n('p','You recorded a question, heard the selected partner reply, identified its meaning and recorded a response.'),n('p','These are guided practice records. Speech meaning, pronunciation and CEFR proficiency were not independently assessed.','a1-small'),summary,n('h4','Your improvement for next time'),reflection,b('Practise another exchange',()=>start(id),'a1-primary'));
 }
 dialog.append(b('Back to unit',()=>back(id)),b('Export guided exchange records',exportData));ui.announce();
 });}
ui.registerTopic({title:'Check and clarify · guided exchanges',open:home});
window.WordamiInteractionPractice=Object.freeze({open,home,exportData,progress,catalogue:()=>Object.keys(bank.units).map(id=>({id,ready:ready(id),completed:unit(id).rounds.filter(r=>r.completedAt&&r.signature===signature(id)).length,scope:'guided_self_review',cefrLevel:null}))});
function route(){if(location.hash==='#guided-exchange'){home();return;}const id=Object.keys(bank.units).find(id=>location.hash==='#guided-exchange-'+id);if(id)open(id);}
route();window.addEventListener('hashchange',route);window.addEventListener('DOMContentLoaded',route,{once:true});window.dispatchEvent(new Event('wordami:practice-extensions-ready'));
})();
