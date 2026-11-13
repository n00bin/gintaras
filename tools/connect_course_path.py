from pathlib import Path
R=Path(__file__).resolve().parents[1]
def edit(name,old,new):
 p=R/name;s=p.read_text(encoding='utf8');assert old in s,(name,old[:100]);p.write_text(s.replace(old,new),encoding='utf8')
edit('skills-studio.js',"const open=l=>{const index=levels.indexOf(l);return index>=0&&levels.slice(0,index).every(complete);};", "const open=l=>{const index=levels.indexOf(l);return index>=0&&levels.slice(0,index).every(complete)&&(!window.WordamiCoursePath||WordamiCoursePath.canEnter(l.id));};")
edit('skills-studio.js',"Object.freeze({open:home,openUnit:","Object.freeze({open:home,isOpen:id=>{const l=levels.find(l=>l.id===id);return !!l&&open(l);},started:id=>{const l=levels.find(l=>l.id===id);if(!l)return false;const s=state(l);return s.learned.some(Boolean)||s.vocabulary.some(Boolean)||s.sources||!!s.writing?.draft||Object.keys(s.checks).length>0;},openUnit:")
p=R/'skills-studio.js';lines=p.read_text(encoding='utf8').splitlines();lines=[line for line in lines if not line.startswith('function mount(){const tree=') and not line.startswith("const tree=document.getElementById('tree');if(tree)new MutationObserver(mount)")];p.write_text('\n'.join(lines)+'\n',encoding='utf8')
edit('index.html',"function stepStarted(id){return CONV_BY[id]?", "function stepStarted(id){if(window.WordamiCoursePath?.isUnit(id))return WordamiCoursePath.started(id);return CONV_BY[id]?")
edit('index.html',"(CONV_BY[p]||UNIT_BY[p])&&!stepDone(p)","(CONV_BY[p]||UNIT_BY[p]||window.WordamiCoursePath?.isUnit(p))&&!stepDone(p)")
edit('index.html',"else if(UNIT_BY[p])unitBand(UNIT_BY[p],COURSE.indexOf(UNIT_BY[p]),t);", "else if(window.WordamiCoursePath?.isUnit(p))WordamiCoursePath.renderUnit(p,t);\n    else if(UNIT_BY[p])unitBand(UNIT_BY[p],COURSE.indexOf(UNIT_BY[p]),t);")
edit('index.html',"return !p?'':CONV_BY[p]?", "return !p?'':window.WordamiCoursePath?.isUnit(p)?WordamiCoursePath.title(p):CONV_BY[p]?")
edit('index.html','<script src="unit-application-path.js"></script>','<script src="unit-application-path.js"></script>\n<script src="course-path.js"></script>')
edit('sw.js',"'unit-application-path.js');", "'unit-application-path.js','course-path.js');")
print('Connected all current A1–C2 units to the main path, with placement-index migration.')
