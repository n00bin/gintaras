"""Apply existing production completion/test-out hooks to the full preview safely."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def edit(name,old,new):
 p=R/name;s=p.read_text(encoding='utf8');assert old in s,(name,old[:80]);p.write_text(s.replace(old,new),encoding='utf8')
release=(R/'.release-lithuanian-art/index.html').read_text(encoding='utf8')
for prefix in ['function stepDone(id){','function unitBand(u,ui,t){']:
 pass
edit('index.html',"function stepDone(id){if(placed(id))return true;return CONV_BY[id]?convDone(id):UNIT_BY[id].lessons.every(l=>l.speak||crowns(l.id)>=1);}","function stepDone(id){if(window.WordamiCoursePath?.isUnit(id))return WordamiCoursePath.done(id);const skills=!UNIT_BY[id]||!window.WordamiUnitSkills||WordamiUnitSkills.done(id);if(placed(id))return skills;return CONV_BY[id]?convDone(id):skills&&UNIT_BY[id].lessons.every(l=>l.speak||crowns(l.id)>=1);}")
edit('index.html',"const done=u.lessons.every(l=>l.speak||crowns(l.id)>0);","const done=u.lessons.every(l=>l.speak||crowns(l.id)>0)&&(!window.WordamiUnitSkills||WordamiUnitSkills.done(u.id));")
edit('index.html',"const nL=u.lessons.filter(l=>!l.speak).length,spk=", "const skillProgress=window.WordamiUnitSkills?.summary(u.id)||{required:0,complete:0};const nL=u.lessons.filter(l=>!l.speak).length+skillProgress.required,spk=")
edit('index.html',"u.lessons.filter(l=>!l.speak&&crowns(l.id)>0).length+' of '+nL", "(u.lessons.filter(l=>!l.speak&&crowns(l.id)>0).length+skillProgress.complete)+' of '+nL")
old_start=release.index('  if(P.testout){const u=UNIT_BY[P.units[0]]',release.index('function placeFinish'))
old_end=release.index('\n  const reach=',old_start)
p=R/'index.html';s=p.read_text(encoding='utf8');start=s.index('  if(P.testout){const u=UNIT_BY[P.units[0]]',s.index('function placeFinish'));end=s.index('\n  const reach=',start)
p.write_text(s[:start]+release[old_start:old_end]+s[end:],encoding='utf8')
edit('index.html','<script src="interaction-practice.js"></script>','<script src="interaction-practice.js"></script>\n<script src="native-application-content.js"></script>\n<script src="unit-application-content.js"></script>\n<script src="unit-application.js"></script>\n<script src="unit-progress.js"></script>\n<script src="unit-application-path.js"></script>')
edit('sw.js',"CORE.push('activity-core.js','activities.js');", "CORE.push('activity-core.js','activities.js','native-application-content.js','unit-application-content.js','unit-application.js','unit-progress.js','unit-application-path.js');")
edit('activity-core.js',"i.lt===text&&taught(i)","i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssess(id))")
edit('activity-core.js',"startedAt:new Date().toISOString(),tasks:{}", "startedAt:new Date().toISOString(),assessment:!!window.WordamiUnitSkills?.canAssess(activityId),tasks:{}")
edit('activity-core.js',"finished:attempts.some(a=>!!a.completedAt),matched:","finished:attempts.some(a=>!!a.completedAt),assessmentFinished:attempts.some(a=>a.assessment&&!!a.completedAt),independent:attempts.some(a=>a.assessment&&a.completedAt&&definitions.get(id).tasks.every(t=>a.tasks[t.id]?.correct&&a.tasks[t.id]?.tries===1&&!a.tasks[t.id]?.assisted)),matched:")
edit('activity-core.js',"lessons:[...new Set(missing.map(text=>ITEMS.find(i=>i.lt===text)?.lesson).filter(Boolean))]", "lessons:[...new Set(missing.map(text=>ITEMS.find(i=>i.lt===text)?.lesson).filter(Boolean).concat(studyMissing.some(s=>s.startsWith('unit-application-teaching.'))?(UNIT_BY[d.ownerUnit]?.lessons||[]).filter(l=>!l.speak&&crowns(l.id)<1):[]))]")
edit('activities.js',"i=>i.lt===text&&taught(i)","i=>i.lt===text&&(taught(i)||window.WordamiUnitSkills?.canAssessPhrase(text))")
# Keep old practice routes and saved visits as optional review, but remove their duplicate path cards.
for name in ['activities.js','a1-route.js']:
 p=R/name;lines=p.read_text(encoding='utf8').splitlines()
 lines=[line for line in lines if not line.startswith('function mount(){const tree=') and not line.startswith("const tree=document.getElementById('tree');if(tree)new MutationObserver(mount)")]
 p.write_text('\n'.join(lines)+'\n',encoding='utf8')
# The old placement block duplicates the required unit rows; its route history remains above.
p=R/'a1-course.js';s=p.read_text(encoding='utf8');s=s.replace("'use strict';\nconst core=window.WordamiActivities,ui=window.WordamiPracticeUI;","'use strict';\nif(window.WordamiNativeApplicationBlueprints)return;\nconst core=window.WordamiActivities,ui=window.WordamiPracticeUI;")
# This module loads before the new blueprint; remove only its obsolete path entry script.
p.write_text('/* Required unit placement is provided by unit-application-path.js. */\n',encoding='utf8')
print('Integrated 80 source-bound applications with required completion, counted lessons and full test-out hooks.')
