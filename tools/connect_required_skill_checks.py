"""Require existing changed-source checks and guided branches within each unit."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def edit(name,old,new):
 p=R/name;s=p.read_text(encoding='utf8');assert old in s,(name,old[:80]);p.write_text(s.replace(old,new),encoding='utf8')
edit('transfer-checks.js',"function status(id){const attempts=", "function progress(id){const spec=bank.units[id];if(!spec)return null;const state=unitState(id),valid=state.attempts.filter(a=>a.signature===signature(id)&&a.finishedAt&&a.answers.length===3&&a.answers.every(a=>a.correct));const passed=spec.variants.filter(v=>valid.some(a=>a.sourceHash===sourceHash(v))||(state.passedSources||[]).some(p=>p.signature===signature(id)&&p.sourceHash===sourceHash(v))).map(v=>v.id);return {id,passed:passed.length===spec.variants.length,passedVariants:passed,requiredVariants:spec.variants.length};}\nfunction status(id){const attempts=")
edit('transfer-checks.js',"return {id,ready:ready(id),attempts:","return {...progress(id),id,ready:ready(id),attempts:")
edit('transfer-checks.js',"if(live.answers.length===3)live.finishedAt=new Date().toISOString();", "if(live.answers.length===3){live.finishedAt=new Date().toISOString();if(live.answers.every(a=>a.correct)){const state=data.units[id];state.passedSources=(state.passedSources||[]).filter(p=>p.signature===signature(id)&&p.sourceHash!==live.sourceHash);state.passedSources.push({signature:signature(id),sourceHash:live.sourceHash,passedAt:live.finishedAt});}}")
edit('transfer-checks.js',"lastRaw=raw;return true;", "lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;")
edit('transfer-checks.js',"Object.freeze({open,home,exportData,catalogue:","Object.freeze({open,home,exportData,progress,catalogue:")

edit('interaction-practice.js',"function start(id){", "function progress(id){const spec=bank.units[id];if(!spec)return null;const s=unit(id),sig=signature(id),completed=spec.questions.filter(([branch])=>s.rounds.some(r=>r.signature===sig&&r.question===branch&&r.completedAt&&r.questionReview?.selfReviewed&&r.responseReview?.selfReviewed&&r.detailUnderstood)||(s.completedBranches||[]).some(r=>r.signature===sig&&r.branch===branch)).map(q=>q[0]);return {id,complete:completed.length===spec.questions.length,completedBranches:completed,requiredBranches:spec.questions.length};}\nfunction start(id){")
edit('interaction-practice.js',"current(id).stage='done';", "current(id).stage='done';const s=data.units[id],r=current(id);s.completedBranches=(s.completedBranches||[]).filter(b=>b.signature===signature(id)&&b.branch!==r.question);s.completedBranches.push({signature:signature(id),branch:r.question,completedAt:r.completedAt});")
edit('interaction-practice.js',"lastRaw=raw;return true;", "lastRaw=raw;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;")
edit('interaction-practice.js',"Object.freeze({open,home,exportData,catalogue:","Object.freeze({open,home,exportData,progress,catalogue:")

edit('skills-studio.js',"const complete=l=>{", "const requiredApplications=l=>({reading:!window.WordamiTransferContent?.units[l.id]||window.WordamiTransferChecks?.progress(l.id)?.passed===true,listening:!window.WordamiListeningTransferContent?.units[l.id]||window.WordamiListeningTransferChecks?.progress(l.id)?.passed===true,interaction:!window.WordamiInteractionPracticeContent?.units[l.id]||window.WordamiInteractionPractice?.progress(l.id)?.complete===true});\nconst complete=l=>{")
edit('skills-studio.js',"&&writingDone(l);};", "&&writingDone(l)&&Object.values(requiredApplications(l)).every(Boolean);};")
edit('skills-studio.js',"lastRaw=raw;storageOK=true;return true;", "lastRaw=raw;storageOK=true;window.dispatchEvent(new Event('wordami:curriculum-progress'));return true;")
edit('skills-studio.js',"Object.freeze({open:home,canWrite:","Object.freeze({open:home,openUnit:id=>{const l=levels.find(l=>l.id===id);if(l)level(l);},progress:id=>{const l=levels.find(l=>l.id===id);return l?{id,complete:!!complete(l),applications:requiredApplications(l)}:null;},canWrite:")
edit('skills-studio.js',"n('p','All activities in this workshop are complete.')", "n('p','All required lessons and checks in this unit are complete.')")
edit('skills-studio.js',"n('h3','Apply familiar language')", "n('h3','Required reading check')")
edit('skills-studio.js',"n('h3','Understand changed spoken details')", "n('h3','Required listening check')")
edit('skills-studio.js',"n('h3','Ask and respond')", "n('h3','Required guided exchange')")
print('Connected required reading/listening variants and both guided interaction branches to unit completion.')
