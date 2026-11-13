from pathlib import Path
p=Path(__file__).resolve().parents[1]/'assessment-portfolio.js';s=p.read_text(encoding='utf8')
old="contentHash=(await fingerprint(id)).contentHash"
assert old in s;s=s.replace(old,"contentHash=await sha(JSON.stringify([course.version,unit(id),rubric(id)]))")
start=s.index('async function exportPacket(');end=s.index('\nasync function importReview',start)
s=s[:start]+"""async function exportPacket(submission){let clips=[],recordingStorageAvailable=true;try{clips=await recordings(submission.unitId);}catch(e){recordingStorageAvailable=false;}const audio=[];for(const clip of clips.filter(c=>(submission.evidence.recordings||[]).some(r=>r.role===c.role&&r.hash===c.hash)))audio.push({role:clip.role,hash:clip.hash,savedAt:clip.savedAt,meta:clip.meta,dataURL:await dataURL(clip.blob)});const packet={schema:1,type:'wordami-unit-evidence',scope:'unit_evidence_not_cefr_certificate',...submission,audio,recordingStorageAvailable};download('wordami-'+LANG.code+'-'+submission.unitId+'-unit-evidence.json',packet);return packet;}
function missingSpokenEvidence(records,skills){for(const [skill,count] of [['production',1],['interaction',3],['mediation',1]])if(skills[skill]?.judgement!=='not_assessed'&&new Set(records.filter(r=>r.role.startsWith(skill+'.')).map(r=>r.role)).size<count)return skill;return null;}
async function validatePacket(packet){if(packet?.schema!==1||packet.type!=='wordami-unit-evidence'||!Array.isArray(packet.audio)||!packet.evidence?.rubric)throw Error('This is not a unit evidence packet.');if(await sha(JSON.stringify(packet.evidence))!==packet.artifactHash)throw Error('The evidence has changed since this packet was created.');for(const audio of packet.audio){if(typeof audio.dataURL!=='string'||!/^data:audio\\/(webm|ogg|mp4|wav|mpeg)(;codecs=[^;,]+)?;base64,/.test(audio.dataURL))throw Error('The packet contains an unsupported recording.');if(!(packet.evidence.recordings||[]).some(r=>r.role===audio.role&&r.hash===audio.hash))throw Error('A recording is not bound to this submission.');const bytes=Uint8Array.from(atob(audio.dataURL.slice(audio.dataURL.indexOf(',')+1)),c=>c.charCodeAt(0));if(await sha(bytes.buffer)!==audio.hash)throw Error('A recording has changed since it was saved.');}}
"""+s[end:]
start=s.index('async function reviewPacket(');end=s.index("ui.show('Review · '",start)
s=s[:start]+'async function reviewPacket(packet){await validatePacket(packet);'+s[end:]
old="if(!packet.audio.length&&basis.value==='recordings_and_text'&&['production','interaction','mediation'].some(k=>skills[k].judgement!=='not_assessed'))"
new="if(basis.value==='recordings_and_text'&&missingSpokenEvidence(packet.audio,skills))"
assert old in s;s=s.replace(old,new).replace('No recordings were supplied. Leave spoken skills unassessed or state that you observed the performance live.','The recordings do not cover every spoken skill you assessed. Leave unsupported skills unassessed or state that you observed them live.')
old="const current=await fingerprint(submission.unitId),saved="
new="if(review.basis==='recordings_and_text'&&missingSpokenEvidence(submission.evidence.recordings||[],review.skills))throw Error('This submission lacks recordings for a spoken skill marked as assessed.');const current=await fingerprint(submission.unitId),saved="
assert old in s;s=s.replace(old,new)
p.write_text(s,encoding='utf8')
