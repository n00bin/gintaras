"""Require a reviewed second take for new presentation attempts; preserve past completions."""
from pathlib import Path
R=Path(__file__).resolve().parents[1];p=R/'skills-studio.js';s=p.read_text(encoding='utf8')
old="if(saved.completedAt||!core.attempt(saved.attemptId)){saved.attemptId=core.begin(definition);saved.turns=[];delete saved.completedAt;}"
new="if(saved.completedAt||!core.attempt(saved.attemptId)){if(saved.completedAt){delete saved.firstReview;delete saved.revisionStartedAt;}saved.attemptId=core.begin(definition);saved.turns=[];delete saved.completedAt;}"
assert s.count(old)==1;s=s.replace(old,new)
needle=" const taskId=kind==='interaction'?";at=s.index(needle)
s=s[:at]+" if(kind==='production'&&saved.firstReview){const reminder=n('p','Your first review: '+saved.firstReview.reflection+' Record an improved response, replay it, and explain the change you made.');reminder.id='production-revision';dialog.append(n('h3','Improve your spoken response'),reminder);}else if(kind==='production')dialog.append(n('p','First take: record, replay and identify one change. You will make a second recording to practise that improvement.'));\n"+s[at:]
s=s.replace("const label=n('label','One thing to improve next time'),reflection=", "const label=n('label',kind==='production'&&saved.firstReview?'What did you change in your second take?':'One thing to improve next time'),reflection=",1)
needle='saved.turns.push(review);';at=s.index(needle)
extra="if(kind==='production'&&!saved.firstReview){saved.firstReview=review;saved.revisionStartedAt=new Date().toISOString();if(!save()){Object.keys(saved).forEach(k=>delete saved[k]);Object.assign(saved,prior);return;}speak(l,kind);return;}if(kind==='production'&&reflection.value.trim()===saved.firstReview.reflection){status('Explain the change you made in this second take.');return;}"
s=s[:at]+extra+s[at:];p.write_text(s,encoding='utf8')
