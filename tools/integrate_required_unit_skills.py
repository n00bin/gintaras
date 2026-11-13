"""Integrate mandatory applications into the current isolated production checkout."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]/'.release-lithuanian-art'
def edit(name,old,new):
 p=R/name;s=p.read_text(encoding='utf8');assert old in s,(name,old[:100]);p.write_text(s.replace(old,new),encoding='utf8')

edit('index.html',"function stepDone(id){if(placed(id))return true;return CONV_BY[id]?convDone(id):UNIT_BY[id].lessons.every(l=>l.speak||crowns(l.id)>=1);}","function stepDone(id){const skills=!UNIT_BY[id]||!window.WordamiUnitSkills||WordamiUnitSkills.done(id);if(placed(id))return skills;return CONV_BY[id]?convDone(id):skills&&UNIT_BY[id].lessons.every(l=>l.speak||crowns(l.id)>=1);}")
edit('index.html',"const done=u.lessons.every(l=>l.speak||crowns(l.id)>0);","const done=u.lessons.every(l=>l.speak||crowns(l.id)>0)&&(!window.WordamiUnitSkills||WordamiUnitSkills.done(u.id));")
edit('index.html',"if(ok){creditUnit(u.id,P.got);", "const skillPending=ok&&window.WordamiUnitSkills?.beginTestout([u.id,...(P.also||[])],P.got);if(ok&&!skillPending){creditUnit(u.id,P.got);")
edit('index.html',"(ok?esc(u.en)+' tested out!':'Not this time')", "(skillPending?'Words passed. Next: use them.':ok?esc(u.en)+' tested out!':'Not this time')")
edit('index.html',"(ok?'Its lessons count as done.","(skillPending?'Finish the required reading, listening, writing and speaking tasks to complete this unit check. Your lessons have not been skipped yet.':ok?'Its lessons count as done.")
edit('index.html',"b.textContent='Continue';b.disabled=false;b.onclick=quit;setFoot('');return;}","b.textContent=skillPending?'Continue to unit skills':'Continue';b.disabled=false;b.onclick=()=>{quit();if(skillPending)WordamiUnitSkills.continueTestout();};setFoot('');return;}")
edit('index.html','<script src="foundation-path.js"></script>','<script src="foundation-path.js"></script>\n<script src="foundation-unit-skills.js"></script>')
edit('sw.js',"const CORE = [", "const CORE = ['foundation-unit-skills.js', ")

edit('foundation-evidence.js',"const missing=(d.requiredPhrases||[]).filter(text=>!ITEMS.some(i=>i.lt===text&&taught(i)))", "const missing=(d.requiredPhrases||[]).filter(text=>!ITEMS.some(i=>i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssess(id))))")
edit('foundation-evidence.js',"startedAt:new Date().toISOString(),tasks:{}", "startedAt:new Date().toISOString(),assessment:!!window.WordamiUnitSkills?.canAssess(activityId),tasks:{}")
edit('foundation-evidence.js',"finished:attempts.some(a=>!!a.completedAt),matched:","finished:attempts.some(a=>!!a.completedAt),independent:attempts.some(a=>a.assessment&&a.completedAt&&definitions.get(id).tasks.every(t=>a.tasks[t.id]?.correct&&a.tasks[t.id]?.tries===1&&!a.tasks[t.id]?.assisted)),matched:")

edit('foundation-ui.js',"i=>i.lt===text&&taught(i)","i=>i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssessPhrase(text))")
# The unit path carries these activities; the hub remains available from Review.
edit('foundation-ui.js',"function mount(){const tree=", "function mount(){return;const tree=")

edit('foundation-practice.js',"if(fresh||!state){", "if(fresh||!state||window.WordamiUnitSkills?.canAssess(id)&&!core.attempt(state.attemptId)?.assessment){")
edit('foundation-practice.js',"function hint(task,taskId){", "function hint(task,taskId){if(window.WordamiUnitSkills?.canAssess(id))return;")
edit('foundation-practice.js',"'Use language you have already learned. Begin with reading, then listen, write and practise speaking. Hints are optional.'", "window.WordamiUnitSkills?.canAssess(id)?'Unit check: read, listen and write independently, then record and compare your spoken reply. Hints are available when practising outside the check.':'Required unit lesson: read, listen, write, then record and compare your spoken reply. Use hints whenever you need them.'")
edit('foundation-practice.js',"if(state.step===6){dialog.append(","if(state.step===6){if(window.WordamiUnitSkills?.canAssess(id)&&!core.status(id).independent){dialog.append(n('h3','Practise, then try again'),n('p','A unit check needs every reading, listening and writing answer right first time without hints. Your vocabulary result is saved.'),b('Retry unit skills',()=>start(true),'a1-primary'));return;}const spoken=core.status(speechId).finished;dialog.append(")
edit('foundation-practice.js',"n('h3','Reading, listening and writing complete')", "n('h3',spoken?'Unit skills complete':'Next: your spoken reply')")
edit('foundation-practice.js',"n('p','You used familiar language in this situation. Next, practise saying a useful phrase.')", "n('p',spoken?'Reading, listening, writing and recorded speaking practice are complete. Return to your unit to continue.':'Reading, listening and writing are complete. Finish the speaking task to complete this unit lesson.')")
edit('foundation-practice.js',"b('See skill practice',ui.hub)","b('Return to unit',()=>{ui.dialog.close();renderTree();document.getElementById('unit-'+window.WordamiA1Placement.find(e=>e.activityId===id)?.afterUnit)?.scrollIntoView({block:'start'});})")

edit('foundation-path.js',"/* Put optional practice beside its actual teaching, without changing saved PATH IDs. */", "/* Required unit application after its source language has been taught. */")
edit('foundation-path.js',"const r=core.requirements(entry.activityId),text=r.ready?'Use the words and phrases you have learned in a practical situation.':'Learn the required language first. This activity follows '+entry.lesson.title+'.';", "const r=core.requirements(entry.activityId),finished=core.status(entry.activityId).finished&&core.status(entry.activityId+'-speaking').finished,text=finished?'Completed: reading, listening, writing and recorded speaking.':r.ready?'Required to finish this unit: read, listen, write and record your spoken reply.':'Required unit lesson. First learn the language in '+entry.lesson.title+'.';")
edit('foundation-path.js',"const label=r.ready?'Try this activity':'See required lessons';", "const label=finished?'Review unit skills':r.ready?'Continue required lesson':'See required lessons';")
edit('foundation-path.js',"card.dataset.activity=entry.activityId;", "card.dataset.activity=entry.activityId;card.dataset.required='true';")

print('Integrated required unit skills and deferred vocabulary-only test-out credit.')
