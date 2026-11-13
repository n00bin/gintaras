"""Connect the authored band applications and keep inventory checks explicit."""
import json,re
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def edit(name,fn):
 p=R/name;p.write_text(fn(p.read_text(encoding='utf8')),encoding='utf8')
manifest=json.loads((R/'audio/skills/manifest.json').read_text(encoding='utf8'))
urls=sorted({v['url'] for k,v in manifest.items() if '-capstone.listen' in k})
edit('sw.js',lambda s:s.replace("CORE.push('vocabulary-content.js'",'CORE.push('+','.join(json.dumps(x) for x in ['capstone-content.js','capstone-audio.js']+urls)+');\nCORE.push(\'vocabulary-content.js\'',1))
loader="require('./tools/course_content_loader.js');"
def audit(s):
 start=s.index("for(const f of [");end=s.index("console.log(JSON.stringify",start)
 s=s[:start]+loader+'\n'+s[end:]
 return s.replace('!= 24','!= 30').replace('expected 24 unique units','expected 30 unique units').replace('all 48 connected units','all 60 connected units').replace('48 units, 288 skill targets, 384 vocabulary contexts','60 units, 360 skill targets, 480 vocabulary contexts').replace('Four workshops per target band','Four workshops and a prepared-source capstone per target band')
edit('tools/audit_curriculum_release.py',audit)
def writing(s):
 start=s.index('for(const f of [');end=s.index('console.log(JSON.stringify',start)
 return (s[:start]+loader+s[end:]).replace("len(data['lessons'])==36","len(data['lessons'])==42").replace("data['lessons'])==6","data['lessons'])==7").replace('Seventy-two A1-C2 writing models and 216 purpose exercises','Eighty-four A1-C2 writing models and 252 purpose exercises')
edit('tools/audit_writing_preparation.py',writing)
def coverage(s):
 start=s.index("require('./writing-content.js');");end=s.index('console.log(JSON.stringify',start)
 return (s[:start]+loader+s[end:]).replace('len(units)==24','len(units)==30').replace('48 connected course units, four per target band and language','60 connected course units, four workshops and one capstone per target band and language').replace('48 course units, 384 vocabulary entries, 288 comprehension questions, 240 recorded responses, 72 writing projects and 576 source audio entries','60 course units, 480 vocabulary entries, 360 comprehension questions, 300 recorded responses, 84 writing projects and 720 source audio entries')
edit('tools/report_skills_coverage.py',coverage)
edit('tools/check_unified_course_path.py',lambda s:s.replace('==24','==30').replace("'requiredAdvancedUnits':24","'requiredAdvancedUnits':30"))
