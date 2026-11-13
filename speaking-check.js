/* Browser-transcript task matching, separate from pronunciation and CEFR assessment. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;if(!core||!ui||LANG.code!=='lt')return;
const {node:n,button:b,dialog}=ui,id='a1.spoken-requests';
const cases=[
 {source:'Aš noriu kavos',prompt:'You are at a café. Order a coffee.',extra:['Kavos, prašau','Norėčiau kavos','Aš norėčiau kavos']},
 {source:'Aš noriu arbatos',prompt:'You are at a café. Order a tea.',extra:['Arbatos, prašau','Norėčiau arbatos','Aš norėčiau arbatos']},
 {source:'Kur yra stotis?',prompt:'You are looking for the station. Ask where it is.',extra:['Kur stotis?']},
 {source:'Kelintą valandą?',prompt:'A friend suggests a meeting but gives no time. Ask what time.',extra:['Kelintą valandą susitiksime?']}
];
const taskIds=['drink','station','time'];
core.define({id,version:1,kind:'checkpoint',objectiveId:'a1.spoken-interaction-sample',title:'Say a useful request',requiredPhrases:cases.map(c=>c.source),tasks:taskIds.map(id=>({id,skill:'speaking',method:'transcript_response'}))});
core.define({id:id+'-self',version:1,objectiveId:'a1.spoken-interaction-sample',title:'Practise a request aloud',requiredPhrases:cases.map(c=>c.source),tasks:[{id:'record-request',skill:'speaking',method:'self_recording'}]});
const key='wordami.spoken-check.v1.lt';let state=null,recognizer=null,generation=0;
try{const s=JSON.parse(localStorage.getItem(key)),a=core.attempt(s?.attemptId);if(a?.activityId===id&&Number.isInteger(s.step)&&s.step>=0&&s.step<=3&&[0,1].includes(s.drink))state=s;}catch(e){}
function stop(){generation++;if(recognizer){const r=recognizer;recognizer=null;try{r.abort();}catch(e){}}}
ui.registerMediaStop(stop);
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch(e){ui.status('This check could not be saved on this device.');}}
const negative=text=>strip(text).split(' ').some(w=>/^(ne|nenoriu|negaliu|negalima|neturiu|nezinau|nesuprantu)$/.test(w));
function matches(text,spec){if(negative(text)!==negative(spec.source))return false;const item=ITEMS.find(i=>i.lt===spec.source);return judgeAll(text,answersFor(item),item.en).ok||judgeTyped(text,spec.extra).ok;}
function start(){const attemptId=core.begin(id);if(!attemptId){draw();return;}state={attemptId,step:0,drink:Math.random()<.5?0:1};save();draw();}
function fallback(spec){core.record(state.attemptId,taskIds[state.step],{type:'hint'});ui.speak({activityId:id+'-self',taskId:'record-request',title:'Practise the spoken request',text:spec.source,prompt:spec.prompt,back:draw});}
function draw(){ui.show('Say a useful request',()=>{
 if(ui.locked(id))return;
 if(!state){dialog.append(n('p','Respond to three everyday situations in Lithuanian without seeing an answer first. Your browser will try to recognise the words you say.'),n('p','Speech recognition uses your browser’s online service and may mishear you. A match checks a familiar request, not pronunciation, fluency or your CEFR level.','a1-small'),b('Begin speaking check',start,'a1-primary'));return;}
 if(state.step===3){const a=core.attempt(state.attemptId),matched=taskIds.filter(t=>a?.tasks[t]?.correct).length;dialog.append(n('h3','Spoken-request check recorded'),n('p',matched+' of 3 requests matched the expected Lithuanian meaning and form in the browser transcript.'),n('p','An unmatched response can be a recognition error or a different valid way to speak. No pronunciation or fluency score was assigned.','a1-small'),b('Return to practice',ui.hub,'a1-primary'),b('Try a fresh check',start));return;}
 const spec=cases[state.step===0?state.drink:state.step+1],Recognition=globalThis.SpeechRecognition||globalThis.webkitSpeechRecognition;
 dialog.append(n('p',(state.step+1)+' of 3 · Speaking','a1-small'),n('p',spec.prompt));
 if(!Recognition||!navigator.onLine){dialog.append(n('p',!Recognition?'Live speech recognition is unavailable in this browser.':'Live speech recognition needs a connection.'),n('p','No speaking check will be recorded. You can still practise by recording and comparing your voice.','a1-small'),b('Practise with a recording instead',()=>fallback(spec)));return;}
 const heard=n('p'),mic=b('Speak your reply',()=>{
  if(recognizer)return;const token=++generation,r=new Recognition();recognizer=r;r.lang='lt-LT';r.interimResults=false;r.maxAlternatives=5;mic.disabled=true;ui.status('Listening… say your reply.');let got=false;
  r.onresult=e=>{if(token!==generation||recognizer!==r)return;got=true;const texts=Array.from(e.results?.[0]||[]).map(a=>a.transcript).filter(Boolean);if(!texts.length){ui.status('No words were recognised. Nothing was recorded; try again.');return;}const primaryPolarity=negative(texts[0]);const correct=primaryPolarity===negative(spec.source)&&texts.some(text=>negative(text)===primaryPolarity&&matches(text,spec));heard.textContent='Browser transcript: '+texts[0];recognizer=null;mic.disabled=false;ui.status('Your response is ready to record. You may listen and try again if the browser misheard you.');const record=b('Record this response',()=>{if(!core.requirements(id).ready){draw();return;}if(!core.record(state.attemptId,taskIds[state.step],{type:'answer',correct}))return;state.step++;if(state.step===3)core.finish(state.attemptId);save();draw();},'a1-primary');dialog.append(record);mic.disabled=true;dialog.append(b('The browser misheard me · retry',draw));};
  r.onerror=e=>{if(token!==generation)return;got=true;ui.status(e.error==='not-allowed'?'The microphone is blocked. No response was recorded.':'Speech recognition could not complete. No response was recorded. Try again or use recording practice.');};
  r.onend=()=>{if(token!==generation)return;if(recognizer===r)recognizer=null;if(!got)ui.status('No speech was recognised. No response was recorded. Try again.');if(!heard.textContent)mic.disabled=false;};
  try{r.start();}catch(e){recognizer=null;mic.disabled=false;ui.status('The microphone could not start. No response was recorded.');}
 },'a1-primary');dialog.append(mic,heard,b('Use recording practice instead',()=>fallback(spec)));ui.announce();
 });}
ui.registerTopic({title:'On your own · spoken requests',activityId:id,route:'#spoken-requests',progress:()=>state?.step===3?'Transcript task check recorded':state?'Continue your spoken check':'Ready to try speaking',open:draw});
if(location.hash==='#spoken-requests')draw();window.addEventListener('hashchange',()=>{if(location.hash==='#spoken-requests')draw();});
})();
