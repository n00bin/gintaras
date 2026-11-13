/* A guided source-lesson route sharing ordinary course progress and existing item IDs. */
(()=>{
'use strict';
const core=window.WordamiActivities,ui=window.WordamiPracticeUI;if(!core||!ui||!['lt','es'].includes(LANG.code))return;
const lt=LANG.code==='lt',language=LANG.en,firstLessonId=lt?'u1a-0':'u1a-1';
const chapters=[
 ['introductions','Meet someone new',['a1.introductions']],
 ['clarification','Ask for help understanding',['a1.clarification']],
 ['prices','Numbers and prices',['a1.prices']],
 ['dates','Days, times and the calendar',lt?['a1.times','a1.calendar']:['a1.times']],
 ['food','At a café and restaurant',['a1.cafe-understanding','a1.cafe-writing']],
 ['directions','Find your way',['a1.directions']],
 ['people','Family and descriptions',lt?['a1.family','a1.descriptions']:['a1.family']],
 ['routines','Your daily routine',['a1.routines']],
 ['home','Home and household requests',lt?['a1.home','a1.rooms']:['a1.home']],
 ['shopping','Choose and buy an item',['a1.shopping']],
 ['preferences','Share an interest',['a1.preferences']],
 ['arrangements','Make an arrangement',['a1.messages']]
].map(([id,title,activities])=>({id,title,activities}));
if(chapters.some(c=>c.activities.some(id=>!core.definition(id))))return;
const key='wordami.a1-route.v1.'+LANG.code;let current=chapters[0],returnFromLesson=false;const milestones=new Set();
try{const s=JSON.parse(localStorage.getItem(key));current=chapters.find(c=>c.id===s?.chapter)||current;for(const id of s?.practisedActivities||[])if(chapters.some(c=>c.activities.includes(id)))milestones.add(id);}catch(e){}
const {node:n,button:b,dialog}=ui;
function mergeMilestones(saved){for(const id of saved?.practisedActivities||[])if(chapters.some(c=>c.activities.includes(id)))milestones.add(id);}
function save(){try{mergeMilestones(JSON.parse(localStorage.getItem(key)));localStorage.setItem(key,JSON.stringify({chapter:current.id,practisedActivities:[...milestones]}));}catch(e){}}
window.addEventListener('storage',e=>{if(e.key===key){try{mergeMilestones(JSON.parse(e.newValue));}catch(err){}}});
function collect(){let changed=false;for(const c of chapters)for(const id of c.activities)if(core.status(id).finished&&!milestones.has(id)){milestones.add(id);changed=true;}if(changed)save();}
window.addEventListener('wordami:practice',collect);collect();
const done=c=>missing(c).length===0&&c.activities.every(id=>milestones.has(id));
function missing(c){const seen=new Set(),out=[];if(c.id==='introductions'){const l=LESSON_BY[firstLessonId];if(l&&l.items.some(i=>!taught(i))){seen.add(l.id);out.push(l);}}for(const id of c.activities)for(const text of core.requirements(id).missing){const i=ITEMS.find(i=>i.lt===text);if(i&&!seen.has(i.lesson.id)){seen.add(i.lesson.id);out.push(i.lesson);}}return out;}
function overview(){history.replaceState(null,'','#a1-route');ui.setReturn(null);ui.show(language+' A1 · guided route',()=>{dialog.append(n('p','Follow a practical sequence: learn the needed language, use it in an activity, then revisit it. Your existing lesson progress carries over.'),n('p',chapters.filter(done).length+' of 12 chapters practised. This tracks practice, not an awarded CEFR level.','a1-small'));const next=chapters.find(c=>!done(c))||current;dialog.append(b('Continue · '+next.title,()=>chapter(next),'a1-primary'));for(const [index,c] of chapters.entries()){const card=n('section',null,'a1-panel');card.append(n('h3',(index+1)+'. '+c.title),n('p',done(c)?'Practice visits completed':missing(c).length+' source lessons with language still to learn','a1-small'),b(done(c)?'Review chapter':'Open chapter',()=>chapter(c)));dialog.append(card);}dialog.append(n('h3','Check and extend'),b('Check meeting details',()=>ui.openActivity('a1.meeting-check')),b('Check prices and quantities',()=>ui.openActivity('a1.price-check')));if(lt)dialog.append(b('Listen to full conversations',()=>{history.replaceState(null,'','#a1-listening');window.dispatchEvent(new Event('hashchange'));}),b('Try a spoken request',()=>ui.openActivity('a1.spoken-requests')),b('Write your own message',()=>ui.openActivity('a1.original-message')));dialog.append(b('Back to skill practice',ui.hub));});}
function chapter(c){history.replaceState(null,'','#a1-route');ui.setReturn(null);current=c;save();ui.show(c.title,()=>{const needed=missing(c);dialog.append(n('p','First learn the required words and phrases, then use them in the chapter activities.'));if(needed.length){const l=needed[0];dialog.append(n('h3','Learn next'),n('p',l.unit.en+' · '+l.title),b('Learn the next phrases',()=>{returnFromLesson=true;save();dialog.close();stopHearing();stopAllAudio();startLesson(l);},'a1-primary'),n('p','The lesson uses the usual introduction and practice cards. Return here afterwards to continue.','a1-small'));}else dialog.append(n('p','The required language has been introduced. You are ready to practise.'));
 for(const id of c.activities){const d=core.definition(id),ready=core.requirements(id).ready,card=n('section',null,'a1-panel');card.append(n('h3',d.title||id),n('p',milestones.has(id)?'Practice visit completed':ready?'Ready to practise':'Learn this activity’s required phrases first','a1-small'),b(milestones.has(id)?'Practise again':'Open activity',()=>{ui.setReturn(()=>chapter(c));ui.openActivity(id);},ready?'a1-primary':''));dialog.append(card);}const checkId=c.id==='prices'?'a1.price-check':c.id==='arrangements'?'a1.meeting-check':null;if(checkId&&core.definition(checkId))dialog.append(n('h3','Optional check'),n('p','Try familiar details and requests without hints. Feedback appears after the whole check.'),b('Try the chapter check',()=>{ui.setReturn(()=>chapter(c));ui.openActivity(checkId);}));if(done(c)){const next=chapters[chapters.indexOf(c)+1];if(next)dialog.append(b('Next chapter · '+next.title,()=>chapter(next),'a1-primary'));}dialog.append(b('All A1 chapters',overview));});}
window.addEventListener('gintaras:idle',()=>{if(returnFromLesson){returnFromLesson=false;chapter(current);}});
ui.registerTopic({title:language+' A1 · guided learning route',route:'#a1-route',open:overview});
window.WordamiA1Route=Object.freeze(chapters.map(c=>Object.freeze({id:c.id,title:c.title,activities:Object.freeze([...c.activities])})));
if(location.hash==='#a1-route')overview();window.addEventListener('hashchange',()=>{if(location.hash==='#a1-route')overview();});
})();
