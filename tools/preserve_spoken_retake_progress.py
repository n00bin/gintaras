"""Keep earned completion and the previous review when a learner starts another take."""
from pathlib import Path
R=Path(__file__).resolve().parents[1];p=R/'skills-studio.js';s=p.read_text(encoding='utf8')
old="if(saved.completedAt){delete saved.firstReview;delete saved.revisionStartedAt;}";assert old in s
s=s.replace(old,"if(saved.completedAt){saved.previousReview={completedAt:saved.completedAt,turns:JSON.parse(JSON.stringify(saved.turns)),firstReview:saved.firstReview?JSON.parse(JSON.stringify(saved.firstReview)):null};delete saved.firstReview;delete saved.revisionStartedAt;}")
s=s.replace("every(k=>s.spoken[k]?.completedAt)","every(k=>s.spoken[k]?.completedAt||s.spoken[k]?.previousReview?.completedAt)",1)
s=s.replace("!!state(l).spoken[k]?.completedAt","!!(state(l).spoken[k]?.completedAt||state(l).spoken[k]?.previousReview?.completedAt)")
old="s.spoken[kind]?.completedAt?'Recorded and self-reviewed':understood(l)?'Ready for recorded practice'"
new="s.spoken[kind]?.completedAt?'Recorded and self-reviewed':s.spoken[kind]?.previousReview?.completedAt?'Previous completion kept · another attempt is in progress':understood(l)?'Ready for recorded practice'"
assert old in s;s=s.replace(old,new);p.write_text(s,encoding='utf8')
p=R/'tools/check_full_course_update.py';s=p.read_text(encoding='utf8').replace("'toBuild':189","'toBuild':190");p.write_text(s,encoding='utf8')
