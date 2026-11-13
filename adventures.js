/* Optional Lithuanian pilot. Progress belongs to this device, separate from FSRS. */
(()=>{
'use strict';
if(LANG.code!=='lt'||!COURSE_V2)return;
const KEY='wordami.adventure.lt.cafe.v2';
// Every Lithuanian phrase shown or requested must come from an introduced course card.
const REQUIRED=['kava','arbata','meniu','Aš noriu kavos','Aš noriu arbatos','Sąskaitą, prašau','Ar galima mokėti kortele?'];
const core=window.WordamiActivities,activityId='a1.cafe-writing';
if(core)core.define({id:activityId,version:1,objectiveId:'a1.food-order',title:'Write your café requests',requiredPhrases:REQUIRED,tasks:['order','bill','payment'].map(id=>({id,skill:'writing',method:'constrained_response'}))});
const source=t=>ITEMS.find(i=>i.lt===t&&taught(i))||ITEMS.find(i=>i.lt===t);
const missing=()=>core?core.requirements(activityId).missing:REQUIRED.filter(t=>!ITEMS.some(i=>i.lt===t&&taught(i)));
const initial=()=>({step:0,drink:'',hints:0,assisted:false,completed:false});
let state=initial(),draft='',feedback='';
try{const s=JSON.parse(localStorage.getItem(KEY));if(s&&Number.isInteger(s.step)&&s.step>=0&&s.step<=5&&['','coffee','tea'].includes(s.drink))state={...state,...s};}catch(e){}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){feedback='Progress could not be saved on this device. You can still finish this visit.';}}
const asset=n=>'pics/art-v2/'+n+'.webp';
const drinkText=()=>state.drink==='tea'?'arbatos':'kavos';
const order=()=>`Aš noriu ${drinkText()}`;
const dialog=document.createElement('dialog');dialog.id='cafe-adventure';dialog.setAttribute('aria-labelledby','cafe-title');
document.body.append(dialog);
const style=document.createElement('style');style.textContent=`
#cafe-adventure{box-sizing:border-box;width:min(680px,calc(100% - 20px));max-height:calc(100dvh - 20px);padding:0;border:0;border-radius:26px;background:var(--bg);color:var(--fg);box-shadow:0 20px 80px #1238;overflow:auto}
#cafe-adventure::backdrop{background:rgba(15,24,48,.6)}#cafe-adventure *{box-sizing:border-box}#cafe-adventure button,#cafe-adventure input{font:inherit}#cafe-adventure button{cursor:pointer;min-height:46px;border:2px solid var(--line);border-radius:14px;padding:10px 14px;background:var(--surface);color:var(--fg);font-weight:700}#cafe-adventure button:focus-visible,#cafe-adventure input:focus-visible{outline:3px solid var(--amber);outline-offset:3px}#cafe-adventure .cafe-primary{background:var(--pine);color:var(--on-pine);border-color:var(--pine)}#cafe-adventure header{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;padding:18px 22px;gap:10px}#cafe-adventure h2{flex:1 1 180px;font-size:24px;margin:0}#cafe-adventure main{padding:0 22px 22px}#cafe-adventure .cafe-scene{display:flex;align-items:center;justify-content:center;gap:14px;background:var(--pine-soft);border-radius:22px;min-height:175px;padding:15px}#cafe-adventure .cafe-scene img{width:130px;height:150px;object-fit:contain}#cafe-adventure .cafe-scene p{max-width:260px;font-weight:700;font-size:19px}#cafe-adventure .cafe-objects,#cafe-adventure .cafe-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:16px}#cafe-adventure .cafe-objects button{flex:1;min-width:90px}#cafe-adventure .cafe-objects img{width:62px;height:62px;object-fit:contain;display:block;margin:auto}#cafe-adventure .cafe-actions>*{flex:1}#cafe-adventure input{width:100%;padding:14px;border:2px solid var(--line);border-radius:12px;background:var(--surface);color:var(--fg)}#cafe-adventure .cafe-small{font-size:13px;color:var(--muted)}#cafe-adventure .cafe-feedback{min-height:25px;font-weight:650;margin:14px 0}#cafe-adventure progress{width:100%;accent-color:var(--amber);height:10px}#cafe-adventure .cafe-hint{padding:12px;background:var(--amber-soft);border-radius:12px} .cafe-path-card{margin:20px 0;padding:22px;border:2px solid var(--line);border-radius:22px;background:var(--amber-soft);color:var(--fg)}.cafe-path-card img{width:80px;height:80px;object-fit:contain;float:right}.cafe-path-card button{padding:12px 20px;border:0;border-radius:12px;background:var(--pine);color:var(--on-pine);font:inherit;font-weight:700;cursor:pointer}.cafe-path-card h3{margin:0 0 8px}
@media(max-width:380px){#cafe-adventure header,#cafe-adventure main{padding-left:15px;padding-right:15px}#cafe-adventure .cafe-scene img{width:90px;height:120px}#cafe-adventure .cafe-scene p{font-size:17px}}
`;document.head.append(style);
function node(tag,text,cls){const n=document.createElement(tag);if(text)n.textContent=text;if(cls)n.className=cls;return n;}
function button(text,fn,cls){const b=node('button',text,cls);b.type='button';b.onclick=fn;return b;}
function advance(){state.step++;draft='';feedback='';save();draw();}
function open(){if(dialog.open)return;window.dispatchEvent(new CustomEvent('wordami:activity-opening',{detail:dialog.id}));stopAllAudio();draw();dialog.showModal();}
window.addEventListener('wordami:open-cafe',open);
window.addEventListener('wordami:activity-opening',e=>{if(e.detail!==dialog.id&&dialog.open)close();});
function close(){stopAllAudio();dialog.close();mount();}
dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
const taskPhrase=()=>state.step===2?order():state.step===3?'Sąskaitą, prašau':'Ar galima mokėti kortele?';
function hint(){state.hints++;state.assisted=true;if(core)core.record(state.attemptId,['order','bill','payment'][state.step-2],{type:'hint'});save();const h=dialog.querySelector('.cafe-hint');h.hidden=false;h.textContent=source(taskPhrase()).lt;}
function draw(){
 dialog.replaceChildren();const head=node('header');head.append(node('h2','A visit to the café'));head.firstChild.id='cafe-title';head.append(button('Save & close',close));const back=window.WordamiPracticeUI?.getReturn();if(back)head.append(button('Back to chapter',()=>{close();back();}));dialog.append(head);
 const main=node('main');
 if(missing().length){
  main.append(node('h3','Learn the café phrases first'),node('p','This activity practises language from Food and drink. It unlocks after you have met every word and phrase it uses in your lessons.'));
  const lessons=[...new Set(missing().map(t=>source(t)?.lesson).filter(Boolean))];
  const list=node('ul');for(const l of lessons)list.append(node('li',l.unit.en+' · '+l.title));main.append(list,node('p','Continue your learning path, then come back here. Opening a preview link does not skip these requirements.','cafe-small'),button('Back to lessons',close,'cafe-primary'));dialog.append(main);return;
 }
 if(core&&state.step<5){state.attemptId=core.begin(activityId,state.attemptId);save();}
 const progress=node('progress');progress.max=4;progress.value=Math.max(0,state.step-1);progress.setAttribute('aria-label',`${Math.max(0,state.step-1)} of 4 tasks complete`);main.append(progress,node('p',['Your mission','1 · Choose a drink','2 · Place your order','3 · Ask for the bill','4 · Pay by card','Visit complete'][state.step],'cafe-small'));
 const scene=node('div',null,'cafe-scene'),portrait=node('img');portrait.src=asset('portrait-danute');portrait.alt='Danutė, your café host';
 const lines=['Visit Danutė’s café. Choose a drink, order it, ask for your bill, then arrange to pay by card.','Look at the menu and choose what you would like.','Danutė is ready to take your order.','You have finished your drink. Ask Danutė for the bill.','Your bill has arrived. Ask whether you can pay by card.','Your café visit is complete.'];scene.append(portrait,node('p',lines[state.step]));main.append(scene);
 const objects=node('div',null,'cafe-objects');
 const menu=button('Menu',()=>{feedback='kava — coffee · arbata — tea. Choose either drink.';updateFeedback();});const mi=node('img');mi.src=asset('menu');mi.alt='';menu.prepend(mi);
 const table=button('Your table',()=>{feedback=state.drink?`Your choice: ${state.drink}. ${state.step>=3?'Your drink has arrived.':''}`:'Choose a drink from the menu first.';updateFeedback();});const ti=node('img');ti.src=asset(state.drink==='tea'?'tea':'coffee');ti.alt='';table.prepend(ti);objects.append(menu,table);if(state.step===1)main.append(objects);
 const actions=node('div',null,'cafe-actions');
 if(state.step===0){main.append(node('p','Use the phrases you learned in Food and drink. Type your replies in Lithuanian; hints are available if you need them. This activity practises existing language.'),node('ol'));for(const text of ['Choose coffee or tea.','Order your chosen drink.','Ask for the bill.','Ask to pay by card.'])main.lastChild.append(node('li',text));actions.append(button('Start activity',advance,'cafe-primary'));}
 if(state.step===1){actions.append(button('kava · coffee',()=>{state.drink='coffee';advance();}),button('arbata · tea',()=>{state.drink='tea';advance();}));}
 if(state.step>=2&&state.step<=4){
  main.append(node('p',state.step===2?`Tell Danutė you want ${state.drink}.`:state.step===3?'Ask for the bill, please.':'Ask: “Can I pay by card?”'));
  const form=node('form'),input=node('input');input.type='text';input.autocomplete='off';input.spellcheck=false;input.value=draft;input.setAttribute('aria-label','Your Lithuanian reply');input.oninput=()=>{draft=input.value;};form.append(input);
  const row=node('div',null,'cafe-actions'),submit=node('button','Send reply','cafe-primary');submit.type='submit';row.append(submit,button('Show a hint',hint));form.append(row);
  form.onsubmit=e=>{e.preventDefault();if(missing().length){draw();return;}const targets=state.step===2?[order(),`Noriu ${drinkText()}`,`${drinkText()}, prašau`,`Aš norėčiau ${drinkText()}`,`Norėčiau ${drinkText()}, prašau`]:state.step===3?['Sąskaitą, prašau','Prašau sąskaitos']:['Ar galima mokėti kortele?','Galima mokėti kortele?','Ar galiu mokėti kortele?','Ar galima atsiskaityti kortele?'];
   const correct=judgeTyped(input.value,targets).ok;if(core)core.record(state.attemptId,['order','bill','payment'][state.step-2],{type:'answer',correct});
   if(correct){if(state.step===4){state.completed=true;state.independent=!state.assisted;state.completedAt=new Date().toISOString();if(core)core.finish(state.attemptId);}advance();}
   else{feedback='Try again. '+(state.step===2?`Use the phrase you learned for ordering ${state.drink}.`:state.step===3?'Use your learned phrase for asking for the bill.':'Use your learned question about paying by card.');updateFeedback();input.focus();}
  };main.append(form);const h=node('p',null,'cafe-hint');h.hidden=true;main.append(h);
 }
 if(state.step===5){main.append(node('h3',state.independent?'You did it on your own!':'Café adventure complete'),node('p','You ordered '+state.drink+', asked for the bill, and asked to pay by card.'),node('p',state.independent?'You used your learned phrases without hints.':'You finished with help. Try another visit to practise without hints.'),node('p','This visit is saved on this device. Your spaced reviews and course mastery are unchanged.','cafe-small'));actions.append(button('Back to lessons',close,'cafe-primary'),button('Try another visit',()=>{state=initial();draft='';feedback='';save();draw();}));}
 main.append(actions);const fb=node('p',feedback,'cafe-feedback');fb.id='cafe-feedback';fb.setAttribute('role','status');fb.setAttribute('aria-live','polite');main.append(fb,node('p','Lithuanian adventure · Preview · Progress saved on this device','cafe-small'));dialog.append(main);
 if(dialog.open){const target=main.querySelector('input')||head.firstChild;target.tabIndex=target.tagName==='INPUT'?0:-1;target.focus();}
}
function updateFeedback(){const f=dialog.querySelector('#cafe-feedback');if(f)f.textContent=feedback;}
function mount(){const u=document.getElementById('unit-u15');if(!u)return;const label=missing().length?'See required lessons':state.completed?'Visit again':state.step?'Continue adventure':'Try adventure',existing=document.getElementById('cafe-adventure-card');if(existing){const b=existing.querySelector('button');if(b.textContent!==label)b.textContent=label;return;}const card=node('section',null,'cafe-path-card');card.id='cafe-adventure-card';const img=node('img');img.src=asset('coffee');img.alt='';card.append(img,node('h3','Adventure · A visit to the café'),node('p','Use the Food and drink phrases you have learned: choose, order, ask for the bill, and pay.'),button(label,open),node('p','Optional Lithuanian preview · Requires the café words and phrases','cafe-small'));u.after(card);}
const tree=document.getElementById('tree');if(tree)new MutationObserver(mount).observe(tree,{childList:true});mount();
// A direct preview link remains available when the later path sections are folded.
if(location.hash==='#adventure-cafe')open();
window.addEventListener('hashchange',()=>{if(location.hash==='#adventure-cafe')open();});
})();
