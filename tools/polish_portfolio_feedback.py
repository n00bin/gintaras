from pathlib import Path
p=Path(__file__).resolve().parents[1]/'assessment-portfolio.js';s=p.read_text(encoding='utf8')
anchor='const dataURL=blob=>'
pos=s.index(anchor)
s=s[:pos]+"""async function removeRecordings(id){const clips=await recordings(id),db=await database();try{await new Promise((resolve,reject)=>{const transaction=db.transaction('recordings','readwrite');for(const clip of clips)transaction.objectStore('recordings').delete(clip.id);transaction.oncomplete=resolve;transaction.onerror=()=>reject(Error('Saved recording copies could not be removed.'));});}finally{db.close();}}
"""+s[pos:]
old="async function open(id){const u=unit(id);if(!u)return;const saved="
new="async function open(id){const u=unit(id);if(!u)return;const current=await fingerprint(id);const saved="
assert old in s;s=s.replace(old,new)
old="for(const review of reviews)panel.append(n('p','Feedback from '+review.reviewer+' · '+review.basis.replaceAll('_',' ')),n('p','Reviewer identity and CEFR calibration are not verified by this app.','a1-small'));"
new="for(const review of reviews){panel.append(n('h4','Feedback from '+review.reviewer),n('p',review.basis.replaceAll('_',' ')),n('p',current.artifactHash===s.artifactHash&&current.contentHash===s.contentHash?'Feedback matches this version of the work.':'Feedback is for an earlier version. Submit the revised work for another review.'),n('p','Reviewer identity and CEFR calibration are not verified by this app.','a1-small'));for(const [skill,result] of Object.entries(review.skills))panel.append(n('h4',skill+' · '+result.judgement.replaceAll('_',' ')),n('p',result.feedback));}"
assert old in s;s=s.replace(old,new)
old="...upload('Review a shared evidence packet',reviewPacket),b('Return to unit'"
new="...upload('Review a shared evidence packet',reviewPacket),b('Remove this unit’s saved recording copies',async()=>{try{await removeRecordings(id);await open(id);ui.status('Recording copies removed from this device. Saved drafts and exported files are unchanged.');}catch(e){ui.status(e.message);}}),b('Return to unit'"
assert old in s;s=s.replace(old,new)
old='keepRecording,recordings,exportPacket'
assert old in s;s=s.replace(old,'keepRecording,recordings,removeRecordings,exportPacket')
p.write_text(s,encoding='utf8')
