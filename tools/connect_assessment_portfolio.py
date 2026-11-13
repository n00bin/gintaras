from pathlib import Path
R=Path(__file__).resolve().parents[1]
def edit(name,old,new):
 p=R/name;s=p.read_text(encoding='utf8');assert old in s,(name,old[:100]);p.write_text(s.replace(old,new),encoding='utf8')
edit('index.html','<script src="course-path.js"></script>','<script src="course-path.js"></script>\n<script src="assessment-portfolio.js"></script>')
edit('sw.js',"'course-path.js');", "'course-path.js','assessment-portfolio.js');")
edit('skills-studio.js',"dialog.append(b('Review learned phrases'", "dialog.append(b('Review this unit’s evidence',()=>window.WordamiAssessments?.open(l.id)),b('Review learned phrases'")
edit('skills-studio.js',"Recordings stay in this session and are cleared when you leave; you can download yours.", "Recordings stay in this session unless you choose Download or Save a portfolio copy. Portfolio copies stay on this device and are included when you export a review packet.")
edit('skills-studio.js',"replay.disabled=download.disabled=finish.disabled=true;", "replay.disabled=download.disabled=finish.disabled=keep.disabled=true;")
edit('skills-studio.js',"replay.disabled=false;download.disabled=false;status('Recorded.", "replay.disabled=false;download.disabled=false;keep.disabled=false;status('Recorded.")
edit('skills-studio.js'," dialog.append(record,replay,download);", " const keep=b('Save a portfolio copy',async()=>{if(!recording||!window.WordamiAssessments)return;const token=generation,blob=recording;keep.disabled=true;try{await WordamiAssessments.keepRecording(l.id,kind+'.'+turn,blob,{taskId,prompt:kind==='interaction'?l.turns[turn][2]:kind==='mediation'?l.mediation:l.production[0],criteria});if(token===generation)status('Recording copy saved on this device for your unit portfolio.');}catch(e){if(token===generation){status(e.message);keep.disabled=false;}}});keep.disabled=true;\n dialog.append(record,replay,download,keep);")
print('Connected unit evidence review and learner-controlled recording copies.')
