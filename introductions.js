/* A1 introductions: new situations assembled exclusively from taught course cards. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;
if(!core||!ui||!['lt','es'].includes(LANG.code))return;
const lt=LANG.code==='lt';
const authored=text=>ITEMS.find(i=>(i.lt0||i.lt)===text);
const nameCard=authored(lt?'Mano vardas Tomas':'Me llamo Tomás');
const origins=(lt?['Aš esu iš Lietuvos','Aš esu iš Anglijos']:['Soy de Estados Unidos','Soy de México']).map(authored);
// Fail closed if a future course edit removes any source card.
if(!nameCard||origins.some(i=>!i))return;
const name=nameCard.en.replace(/^My name is\s+/i,'').replace(/[.!]$/,'');
const labels=origins.map(i=>i.en.replace(/^I am from\s+/i,'').replace(/[.!]$/,''));
if(!name||labels[0]===labels[1])return;
const id='a1.introductions',speechId='a1.introductions-speaking',version=1;
const phrases=[nameCard,...origins].map(i=>i.lt);
const tasks=[['read-name','reading'],['read-origin','reading'],['hear-origin-1','listening'],['hear-origin-2','listening'],['write-name','writing'],['write-origin','writing']];
core.define({id,version,objectiveId:'a1.personal-introduction',title:'Meet someone new',requiredPhrases:phrases,tasks:tasks.map(([id,skill])=>({id,skill,method:skill==='writing'?'constrained_response':'comprehension'}))});
core.define({id:speechId,version,objectiveId:'a1.personal-introduction',title:'Say where you are from',requiredPhrases:origins.map(i=>i.lt),tasks:[{id:'say-origin',skill:'speaking',method:'self_recording'}]});
const key='wordami.introductions.v1.'+LANG.code;
let state=null,heard=false,playing=false,generation=0;
try{const s=JSON.parse(localStorage.getItem(key)),a=core.attempt(s?.attemptId);if(a?.activityId===id&&a.version===version&&Number.isInteger(s.step)&&s.step>=0&&s.step<=6&&Array.isArray(s.order)&&s.order.length===2&&s.order.slice().sort().join(',')==='0,1'&&s.signature===JSON.stringify(phrases))state=s;}catch(e){}
const {node:n,button:b,dialog}=ui;
function save(){try{localStorage.setItem(key,JSON.stringify(state));}catch(e){ui.status('This visit cannot be saved on this device.');}}
function next(){state.step++;if(state.step===6)core.finish(state.attemptId);save();draw();}
function start(fresh=false){if(fresh||!state){if(core.requirements(id).ready){state={attemptId:core.begin(id),step:0,order:Math.random()<.5?[0,1]:[1,0],signature:JSON.stringify(phrases)};save();}}draw();}
function choices(target,task){const row=n('div',null,'a1-actions');for(const index of(Math.random()<.5?[0,1]:[1,0])){const choice=b(labels[index],()=>answer(index===target,task));choice.dataset.introChoice=String(index);choice.disabled=state.step>=2&&state.step<=3&&!heard;row.append(choice);}dialog.append(row);}
function answer(correct,task){if(!core.requirements(id).ready){draw();return;}if(state.step>=2&&state.step<=3&&!heard)return;if(!core.record(state.attemptId,task,{type:'answer',correct}))return;if(correct)next();else ui.status('Try again. Use the hint if you need help.');}
function input(task,check,label){const form=n('form'),field=n('input');field.type='text';field.autocomplete='off';field.spellcheck=false;field.maxLength=160;field.setAttribute('aria-label',label);field.oninput=()=>ui.status('');const send=n('button','Check reply','a1-primary');send.type='submit';form.append(field,send);form.onsubmit=e=>{e.preventDefault();answer(check(field.value),task);};dialog.append(form);}
function showHint(task,text){const hint=n('p',null,'a1-small');hint.hidden=true;dialog.append(b(state.step>=2&&state.step<=3?'Show transcript and meaning':'Show a hint',()=>{core.record(state.attemptId,task,{type:'hint'});hint.textContent=text;hint.hidden=false;}),hint);}
function draw(){const token=++generation;heard=false;playing=false;ui.show('Meet someone new',()=>{
 if(ui.locked(id))return;
 if(!state){dialog.append(n('p','Meet a guest at a language evening. Read their introduction, listen for where they are from, then write and say a simple introduction of your own.'),b('Start introductions',()=>start(true),'a1-primary'));return;}
 if(state.step===6){dialog.append(n('h3','Introduction practice complete'),n('p','You read a profile, listened for where people are from and wrote a simple introduction. Next, practise saying it.'),b('Next: practise speaking',speak,'a1-primary'),b('See skill practice',ui.hub),b('Try a new introduction',()=>start(true)));return;}
 const step=state.step,[task,skill]=tasks[step],target=step===3?state.order[1]:state.order[0],progress=n('progress');progress.max=6;progress.value=step;progress.setAttribute('aria-label',step+' of 6 tasks complete');dialog.append(progress,n('p',(step+1)+' of 6 · '+skill[0].toUpperCase()+skill.slice(1),'a1-small'));
 if(step<=1){dialog.append(n('p',step===0?'Read this guest’s introduction. What is their name?':'Where is this guest from?'));const profile=n('div',null,'a1-panel');profile.lang=LANG.code;profile.append(n('div',nameCard.lt),n('div',origins[target].lt));dialog.append(profile);if(step===0)input(task,text=>norm(text)===norm(name),'The guest’s name');else choices(target,task);showHint(task,step===0?nameCard.en:origins[target].en);}
 else if(step<=3){dialog.append(n('p','Another guest introduces themselves. Listen: where are they from?'));const play=b('Play introduction',async()=>{if(playing)return;playing=true;play.disabled=true;ui.status('Playing…');try{await ui.listen(origins[target].lt);if(token!==generation||!dialog.open)return;heard=true;core.record(state.attemptId,task,{type:'audio_complete'});dialog.querySelectorAll('[data-intro-choice]').forEach(e=>e.disabled=false);ui.status('Recording finished. Choose where this guest is from.');}catch(e){if(e.message!=='cancelled')ui.status('The recording could not play. Check your sound or connection and try again.');}finally{playing=false;if(play.isConnected)play.disabled=false;}});dialog.append(play);choices(target,task);showHint(task,origins[target].lt+' — '+origins[target].en);}
 else if(step===4){dialog.append(n('p','Now introduce yourself. Write a sentence saying your name in '+LANG.en+'. You can use your own name or a practice name; it is not saved with your result.'));input(task,text=>{
  const prefix=lt?/^(?:Mano\s+vardas|Aš\s+esu)\s+(.+?)[.!]?$/iu:/^(?:Me\s+llamo|Mi\s+nombre\s+es|Soy)\s+(.+?)[.!]?$/iu;
  const match=text.trim().normalize('NFC').match(prefix);return !!match&&match[1].length<=70&&/^[\p{L}\p{M}]+(?:[ '\u2019-][\p{L}\p{M}]+)*$/u.test(match[1]);
 },'Your name introduction');showHint(task,nameCard.lt+' — '+nameCard.en);}
 else{dialog.append(n('p','For this practice guest, say that you are from '+labels[target]+'. Use the phrase you learned.'));input(task,text=>judgeAll(text,answersFor(origins[target]),origins[target].en).ok,'Your origin introduction');showHint(task,origins[target].lt);}
 ui.announce();
 });}
function speak(){ui.speak({activityId:speechId,taskId:'say-origin',title:'Say your introduction',text:origins[state?.order[0]??0].lt,prompt:'Introduce yourself as a guest from '+labels[state?.order[0]??0]+'.',back:()=>draw()});}
ui.registerTopic({title:'Introductions · meet someone new',activityId:id,route:"#a1-introductions",progress:()=>state?.step===6?'Reading, listening and writing practised':state?'Continue your introduction':'Ready to practise',open:()=>{if(!state)draw();else start(false);}});
function open(){if(!state)draw();else start(false);}
if(location.hash==='#a1-introductions')open();
window.addEventListener('hashchange',()=>{if(location.hash==='#a1-introductions')open();});
})();
