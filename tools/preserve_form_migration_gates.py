"""Keep new forms required without allowing begun units to bypass existing capstones."""
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'skills-studio.js';s=p.read_text(encoding='utf8')
old='const complete=l=>{const s=state(l);';assert old in s;s=s.replace(old,'const complete=(l,allowAddedForms=false)=>{const s=state(l);',1)
old='Object.values(requiredApplications(l)).every(Boolean);};';assert old in s;s=s.replace(old,"Object.entries(requiredApplications(l)).every(([kind,passed])=>passed||(allowAddedForms===true&&kind==='forms'));};",1)
old='(levels.slice(0,index).every(complete)||started(l))';assert old in s;s=s.replace(old,'levels.slice(0,index).every(previous=>complete(previous,started(l)))',1)
s=s.replace('// Added requirements stay required; a learner may continue a unit they already began.','// New forms remain required for completion. Already-begun later work may continue\n// across this form addition; all older requirements and capstone gates still apply.')
p.write_text(s,encoding='utf8')
