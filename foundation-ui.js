/* Shared first-three-unit practice UI. Every activity checks its taught-card prerequisites. */
(()=>{
'use strict';
if(typeof COURSE_V2!=='undefined'&&COURSE_V2)return;
const core=window.WordamiActivities;if(!core||LANG.code!=='lt')return;
const language=LANG.en;
const mediaStops=new Set();
let feedback='',audio=null,cancelAudio=null,busy=false,speechAttempt=null,speechRecorded=false,speechModelHeard=false,viewVersion=0;
function n(tag,text,cls){const e=document.createElement(tag);if(text)e.textContent=text;if(cls)e.className=cls;return e;}
function btn(text,fn,cls){const b=n('button',text,cls);b.type='button';b.onclick=fn;return b;}
function status(text){feedback=text;const e=dialog.querySelector('[role=status]');if(e)e.textContent=text;}
function stop(){viewVersion++;for(const stopMedia of mediaStops){try{stopMedia();}catch(e){}}if(cancelAudio)cancelAudio();if(audio){audio.pause();audio=null;}if(recAudio)recAudio.pause();busy=false;recStop();stopAllAudio();}
const dialog=n('dialog');dialog.id='a1-practice';dialog.setAttribute('aria-labelledby','a1-practice-title');document.body.append(dialog);
const style=n('style');style.textContent=`
#a1-practice{width:min(660px,calc(100% - 20px));max-height:calc(100dvh - 20px);box-sizing:border-box;border:0;border-radius:26px;padding:24px;background:var(--bg);color:var(--fg);overflow:auto}#a1-practice::backdrop{background:rgba(15,24,48,.6)}#a1-practice *{box-sizing:border-box}#a1-practice header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px}#a1-practice h2{flex:1 1 180px;font-size:25px;margin:0}#a1-practice button,.a1-practice-card button{font:inherit;font-weight:700;min-height:46px;padding:11px 16px;border:2px solid var(--line);border-radius:13px;background:var(--surface);color:var(--fg);cursor:pointer}#a1-practice button:disabled{opacity:.5;cursor:default}#a1-practice button:focus-visible{outline:3px solid var(--amber);outline-offset:3px}#a1-practice .a1-primary,.a1-practice-card button{background:var(--pine);color:var(--on-pine);border-color:var(--pine)}#a1-practice .a1-actions{display:flex;gap:10px;flex-wrap:wrap;margin:18px 0}#a1-practice .a1-actions>*{flex:1}#a1-practice .a1-panel{background:var(--pine-soft);padding:20px;border-radius:18px;margin:18px 0}#a1-practice .a1-panel[lang]{font-size:22px;line-height:1.7}#a1-practice .a1-small{font-size:13px;color:var(--muted)}#a1-practice [role=status]{min-height:25px;font-weight:700}#a1-practice .a1-skills{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:20px 0}#a1-practice .a1-skill{background:var(--surface);padding:15px;border:1px solid var(--line);border-radius:15px}#a1-practice .a1-skill strong{display:block}#a1-practice progress{width:100%;accent-color:var(--amber)} .a1-practice-card{padding:22px;margin:20px 0;background:var(--pine-soft);border-radius:22px;border:2px solid var(--line);color:var(--fg)}.a1-practice-card h3{margin-top:0}@media(max-width:380px){#a1-practice{padding:17px}#a1-practice .a1-skills{grid-template-columns:1fr}}
`;style.textContent+='#a1-practice input{width:100%;font:inherit;padding:14px;border:2px solid var(--line);border-radius:12px;color:var(--fg);background:var(--surface)}';style.textContent+='#a1-practice form{display:grid;gap:12px;margin:16px 0}#a1-practice > button{margin:6px 8px 6px 0}';document.head.append(style);
function head(title,canResume=true){dialog.replaceChildren();const h=n('header');const t=n('h2',title);t.id='a1-practice-title';h.append(t,btn(canResume?'Save & close':'Close',()=>{stop();dialog.close();}));if(returnAction)h.append(btn('Back to chapter',()=>{stop();returnAction?.();}));dialog.append(h);}
function announce(){const e=n('p',feedback);e.setAttribute('role','status');e.setAttribute('aria-live','polite');dialog.append(e);}
function focus(){if(dialog.open){const h=dialog.querySelector('h2');h.tabIndex=-1;h.focus();}}
function locked(activity){const r=core.requirements(activity);if(r.ready)return false;dialog.append(n('h3','Learn these phrases first'),n('p','Finish these lessons first. This practice only uses words you’ve already learned.'));const list=n('ul');r.lessons.forEach(l=>{const row=n('li');row.append(n('span',l.unit.en+' \u00b7 '+l.title+' '),btn('Find this lesson',()=>{stop();dialog.close();ALL_PARTS=true;OPEN_UNITS.add(l.unit.id);renderTree();const unit=document.getElementById('unit-'+l.unit.id);if(unit){unit.scrollIntoView({block:'start'});unit.tabIndex=-1;unit.focus();}}));list.append(row);});dialog.append(list);return true;}
function letterKeys(field){const row=n('div',null,'wordami-letter-keys');row.setAttribute('role','group');row.setAttribute('aria-label','Letters for '+LANG.en);for(const letter of [...LANG.letters]){const key=btn(letter,()=>{const start=field.selectionStart??field.value.length,end=field.selectionEnd??start;if(field.maxLength>0&&field.value.length-(end-start)+letter.length>field.maxLength)return;field.focus();field.setRangeText(letter,start,end,'end');field.dispatchEvent(new Event('input',{bubbles:true}));});key.setAttribute('aria-label','Insert '+letter);row.append(key);}return row;}
const letterStyle=n('style');letterStyle.textContent='.wordami-letter-keys{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}.wordami-letter-keys button{min-width:42px;min-height:44px;padding:8px!important}';document.head.append(letterStyle);
const extraTopics=[];let returnAction=null;
style.textContent+='#a1-practice h2:focus{outline:none}#a1-practice [role=status]:empty{min-height:0;margin:0}';
style.textContent+='#a1-practice .a1-topics{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:16px 0}#a1-practice .a1-topic-entry{padding:12px;background:var(--pine-soft);border-radius:15px}#a1-practice .a1-topic-entry button{width:100%;height:auto}#a1-practice .a1-topic-entry p{margin-bottom:0}#a1-practice summary{cursor:pointer;font-weight:700;padding:14px 0}@media(max-width:480px){#a1-practice .a1-topics{grid-template-columns:1fr}}';
function hub(){
 returnAction=null;stop();head('Your language practice');
 dialog.append(n('p','Choose a familiar situation to practise. Activities unlock after you have learned their words and phrases.'));
 if(extraTopics.length){
  const more=n('div',null,'a1-topics');
  for(const topic of extraTopics.filter(t=>!t.hiddenInHub)){
   const entry=n('div',null,'a1-topic-entry');entry.append(btn(topic.title,topic.open));
   if(topic.activityId){const r=core.requirements(topic.activityId);entry.append(n('p',r.ready?(topic.progress?.()||'Ready to practise'):'Learn '+r.missing.length+' required phrase'+(r.missing.length===1?'':'s')+' first','a1-small'));}
   more.append(entry);
  }
  dialog.append(n('h3','Everyday activities'),more);
 }
 const history=n('details');history.open=true;history.append(n('summary','Your practice so far'));
 const grid=n('div',null,'a1-skills');
 for(const s of core.summary()){
  const card=n('div',null,'a1-skill');card.append(n('strong',s.skill[0].toUpperCase()+s.skill.slice(1)),n('p',s.skill==='speaking'?(s.selfRecorded?s.selfRecorded+' self-recorded practice task'+(s.selfRecorded===1?'':'s'):'No recordings practised yet'):(s.completed?s.completed+' practice tasks completed':'No tasks completed yet')));
  if(s.completed)card.append(n('small',s.unaided+' correct first time without hints'));
  if(s.selfReviewed)card.append(n('p',s.selfReviewed+' revised, self-reviewed writing project'+(s.selfReviewed===1?'':'s')+'. Writing proficiency not assessed.'));
  if(s.speechMatched)card.append(n('p',s.speechMatched+' spoken requests matched by browser recognition. Pronunciation and fluency not assessed.'));
  if(s.guidedDrafted)card.append(n('p',s.guidedDrafted+' guided messages contained the requested information. Overall writing accuracy not assessed.'));
  if(s.skill==='speaking')card.append(n('small','Self-comparison; speaking ability not assessed.'));
  grid.append(card);
 }
 history.append(grid);dialog.append(history,n('p','These are early A1 practice activities, not a CEFR level test. Practice records stay on this device, separate from your memory reviews.','a1-small'));
 if(!core.storageOK)dialog.append(n('p','Device storage is unavailable. This session may not be saved.'));
 focus();
}
function playRecorded(text){
 stopAllAudio();if(recAudio)recAudio.pause();if(cancelAudio)cancelAudio();
 if(S.sound===false)return Promise.reject(Error('sound off'));
 const item=ITEMS.find(i=>i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssessPhrase(text)));
 if(!item)return Promise.reject(Error('missing card'));
 const voice='ona',unit=unitOf(item.au||item.id),segment=SMAP[voice]?.[unit]?.[item.au||item.id];
 if(!segment)return Promise.reject(Error('missing recording'));
 return new Promise((resolve,reject)=>{
  let settled=false,player=null,url=null;const request=new AbortController();
  const finish=err=>{if(settled)return;settled=true;clearTimeout(timeout);request.abort();if(player){player.pause();player.removeEventListener('timeupdate',progress);player.removeEventListener('error',error);player.removeEventListener('ended',ended);}if(url)URL.revokeObjectURL(url);if(audio===player)audio=null;if(cancelAudio===cancel)cancelAudio=null;err?reject(err):resolve();};
  const progress=()=>{if(player.currentTime>=segment[0]+segment[1]-.04)finish();},error=()=>finish(Error('playback failed')),ended=()=>finish(Error('recording ended early')),cancel=()=>finish(Error('cancelled'));
  const timeout=setTimeout(()=>finish(Error('timeout')),60000);cancelAudio=cancel;
  fetch(audioUrl(voice,unit),{signal:request.signal}).then(response=>{if(!response.ok)throw Error('recording unavailable');return response.blob();}).then(blob=>{
   if(settled)return;url=URL.createObjectURL(blob);player=new Audio(url);audio=player;
   player.addEventListener('timeupdate',progress);player.addEventListener('error',error);player.addEventListener('ended',ended);
   player.addEventListener('loadedmetadata',()=>{if(settled)return;player.currentTime=segment[0];player.play().catch(error);},{once:true});player.load();
  }).catch(err=>{if(!settled)finish(err);});
 });
}
function speaking(spec={}){if(!spec.activityId||!spec.text||!spec.taskId)return;const activity=spec.activityId,text=spec.text,taskId=spec.taskId,back=spec.back||hub;stop();const current=viewVersion;head(spec.title||'Speaking practice',false);if(locked(activity))return;speechAttempt=core.begin(activity);speechRecorded=false;speechModelHeard=false;dialog.append(n('p',(spec.prompt||'Ask for a coffee in '+language+'.')+' Record yourself, listen back, then compare with the course recording. This is self-comparison practice, not a pronunciation score. Your recording is not uploaded or saved with your progress.'));if(!CAN_REC){dialog.append(n('p','Recording is unavailable in this browser. You can practise aloud; no speaking result will be recorded.'),btn('Back to practice',back));return;}const box=n('div',null,'a1-panel');box.innerHTML=recBtn()+' <button type="button" id="mine" hidden>Play my recording</button>';const out=n('p');out.setAttribute('role','status');box.append(out);const compare=btn('Hear course example',async()=>{if(busy||recNow){status('Finish your recording before playing the example.');return;}busy=true;compare.disabled=true;try{await playRecorded(text);if(current===viewVersion&&dialog.open){speechModelHeard=true;done.disabled=!speechRecorded;status('Example finished. Compare it with your own recording.');}}catch(e){if(e.message!=='cancelled')status('The example could not play. Try again when audio is available.');}finally{busy=false;if(compare.isConnected)compare.disabled=false;}});const done=btn('I compared my recording',()=>{if(!speechRecorded||!speechModelHeard)return;core.record(speechAttempt,taskId,{type:'answer',correct:true,assisted:true});core.finish(speechAttempt);back();},'a1-primary');done.disabled=true;dialog.append(box,compare,done,btn('Show the learned phrase',()=>{core.record(speechAttempt,taskId,{type:'hint'});status(text);}));announce();wireRec(box,out,()=>{if(current!==viewVersion||!dialog.open||!box.isConnected)return true;speechRecorded=false;done.disabled=true;box.querySelector('#mine').onclick=async()=>{if(busy)return;busy=true;compare.disabled=true;try{const played=await playMine();if(current===viewVersion&&dialog.open){speechRecorded=played;done.disabled=!(speechRecorded&&speechModelHeard);}}finally{busy=false;if(compare.isConnected)compare.disabled=false;}};return true;});focus();}
function open(){if(dialog.open)return;window.dispatchEvent(new CustomEvent('wordami:activity-opening',{detail:dialog.id}));hub();dialog.showModal();}
window.addEventListener('wordami:activity-opening',e=>{if(e.detail!==dialog.id&&dialog.open){stop();dialog.close();}});
dialog.addEventListener('cancel',e=>{e.preventDefault();stop();dialog.close();});
// Required applications are reached from their unit rows; the history hub keeps its direct route.
window.WordamiPracticeUI=Object.freeze({setReturn(fn){returnAction=typeof fn==='function'?fn:null;},getReturn(){return returnAction;},registerMediaStop(fn){mediaStops.add(fn);return ()=>mediaStops.delete(fn);},topics:()=>extraTopics.filter(t=>t.activityId).map(t=>({title:t.title,activityId:t.activityId})),openActivity(id){const topic=extraTopics.find(t=>t.activityId===id);if(!topic)return false;topic.open();return true;},registerTopic(topic){if(!topic?.title||typeof topic.open!=='function')throw Error('Invalid practice topic');const entry={...topic};entry.open=()=>{if(topic.route)history.replaceState(null,'',topic.route);topic.open();};extraTopics.push(entry);if(dialog.open&&dialog.querySelector('h2')?.textContent==='Your language practice')hub();},show(title,render){stop();feedback='';if(!dialog.open)window.dispatchEvent(new CustomEvent('wordami:activity-opening',{detail:dialog.id}));head(title);render();if(!dialog.open)dialog.showModal();focus();},dialog,node:n,button:btn,letters:letterKeys,status,locked,announce,listen:playRecorded,speak:speaking,hub});
if(location.hash==='#a1-practice')open();
window.addEventListener('hashchange',()=>{if(location.hash==='#a1-practice')open();});
})();
