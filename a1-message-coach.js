/* Concrete feedback on familiar A1 message patterns, without claiming broad grammar assessment. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;if(!core||!ui||LANG.code!=='lt')return;
const name=ITEMS.find(i=>(i.lt0||i.lt)==='Mano vardas Tomas');if(!name)return;
const phrases=[name.lt,'Labas','Aš gyvenu Vilniuje','Aš gyvenu Londone','Ar nori eiti kartu?','Septintą valandą','Aštuntą valandą'];
const id='a1.original-message',key='wordami.a1-message.v1.lt';
core.define({id,version:1,objectiveId:'a1.written-personal-message',title:'Write your own short message',requiredPhrases:phrases,tasks:[{id:'message',skill:'writing',method:'guided_composition'}]});
const {node:n,button:b,dialog}=ui;let state={draft:'',stage:'draft',attemptId:null},timer=null,active=false,dirty=false,conflict=false,lastRaw=null;
try{lastRaw=localStorage.getItem(key);const s=JSON.parse(lastRaw);if(s&&typeof s.draft==='string'&&['draft','feedback','saved','review'].includes(s.stage))state={...state,...s};}catch(e){}
function save(){clearTimeout(timer);if(!dirty)return true;try{if(conflict||localStorage.getItem(key)!==lastRaw){conflict=true;if(active)ui.status('A newer draft is saved in another tab. Export this version before reloading.');return false;}const raw=JSON.stringify(state);localStorage.setItem(key,raw);lastRaw=raw;dirty=false;return true;}catch(e){if(active)ui.status('Your draft could not be saved on this device. Export it before leaving.');return false;}}
ui.registerMediaStop(()=>{save();active=false;});
window.addEventListener('pagehide',save);
function analyse(text){const flat=text.normalize('NFC'),clauses=flat.split(/[.!?\n]+/).map(x=>x.trim()).filter(Boolean),simplified=clauses.map(strip);
 const warnings=[];
 if(/\baš\s+gyvena\b/iu.test(flat))warnings.push('When saying where you live, use “Aš gyvenu”, not “Aš gyvena”.');
 if(/\bgyvenu\s+Vilnius\b/iu.test(flat))warnings.push('For “I live in Vilnius”, the learned city form is “Vilniuje”: “Aš gyvenu Vilniuje”.');
 if(/\bgyvenu\s+Londonas\b/iu.test(flat))warnings.push('For “I live in London”, use the learned form “Londone”.');
 const checks=[
  {label:'Introduce yourself with a name',found:clauses.some(c=>/^mano\s+vardas\s+[\p{L}\p{M}][\p{L}\p{M} '\u2019-]*$/iu.test(c)),help:name.lt},
  {label:'Say where you live',found:clauses.some(c=>/^(?:aš\s+)?gyvenu\s+[\p{L}\p{M}]/iu.test(c)),help:'Aš gyvenu Vilniuje'},
  {label:'Invite the reader to go together',found:simplified.some(c=>c==='ar nori eiti kartu'),help:'Ar nori eiti kartu?'},
  {label:'Give a meeting time',found:simplified.some(c=>c==='septinta valanda'||c==='astunta valanda'),help:'Septintą valandą'}
 ];return {checks,warnings,ready:checks.every(c=>c.found)&&!warnings.length};}
function start(){if(!core.requirements(id).ready){draw();return;}state.attemptId=core.begin(id,state.attemptId);dirty=true;save();draw();}
function draw(){ui.show('Write your own short message',()=>{active=true;if(ui.locked(id))return;if(!state.attemptId){dialog.append(n('p','Write to someone you have just met. Introduce yourself, say where you live, invite them to go together and give a time. Use your own name or invented details.'),n('p','The draft stays on this device. The coach checks familiar patterns and requested information; it cannot assess every valid way to write.','a1-small'),b('Start your message',start,'a1-primary'));return;}
 dialog.append(n('p','Write a friendly message in Lithuanian. Include your name, where you live, an invitation and a meeting time. You can combine these in your own short message.'),n('p','Use real or invented details. Your draft is saved on this device only.','a1-small'));
 const form=n('form'),field=n('textarea');field.maxLength=2500;field.spellcheck=true;field.lang='lt';field.setAttribute('aria-label','Your Lithuanian message');field.value=state.draft;field.oninput=()=>{state.draft=field.value;state.stage='draft';dirty=true;clearTimeout(timer);timer=setTimeout(()=>{if(save()&&active)ui.status('Draft saved on this device.');},250);};const check=n('button','Check my message','a1-primary');check.type='submit';form.append(field,check);form.onsubmit=e=>{e.preventDefault();state.draft=field.value;if(core.attempt(state.attemptId)?.completedAt)state.attemptId=core.begin(id);state.stage='feedback';dirty=true;save();draw();};dialog.append(form);
 if(['feedback','saved','review'].includes(state.stage)){const result=analyse(state.draft);dialog.append(n('h3','Message feedback'));for(const c of result.checks)dialog.append(n('p',(c.found?'Found: ':'Not recognised yet: ')+c.label));for(const warning of result.warnings)dialog.append(n('p',warning,'a1-panel'));const help=n('details');help.append(n('summary','Revisit the learned patterns'));for(const c of result.checks)help.append(n('p',c.help));dialog.append(help,n('p','“Not recognised” can also mean you used another valid construction. Unfamiliar phrasing needs review; it is not automatically a language error.','a1-small'));
 if(result.ready){dialog.append(n('p','All four requested details were recognised, with no flagged issue in the familiar patterns. This does not confirm every part of the grammar.'),b('Save this guided message',()=>{if(!core.requirements(id).ready){draw();return;}state.stage='saved';dirty=true;if(!save())return;core.record(state.attemptId,'message',{type:'answer',correct:true,assisted:true});core.finish(state.attemptId);ui.status('Guided message saved. No CEFR level was assigned.');},'a1-primary'));}
 else dialog.append(b('Save for later review',()=>{state.stage='review';dirty=true;if(save())ui.status('Draft saved for review. No successful task result was recorded.');}));
 }
 dialog.append(b('Export this draft',()=>{save();const url=URL.createObjectURL(new Blob([state.draft],{type:'text/plain;charset=utf-8'})),link=n('a');link.href=url;link.download='wordami-lt-short-message.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}),b('Back to practice',ui.hub));if(conflict)ui.status('A newer draft is saved in another tab. Export this version before reloading.');ui.announce();});}
ui.registerTopic({title:'Write your own short message',activityId:id,route:'#a1-message',progress:()=>state.stage==='saved'?'Guided message saved':state.draft?'Continue your message':'Ready to write',open:draw});
if(location.hash==='#a1-message')draw();window.addEventListener('hashchange',()=>{if(location.hash==='#a1-message')draw();});
window.WordamiA1MessageCoach=Object.freeze({analyse});
})();
