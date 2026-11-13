"""Expose actual typed forms in the reviewer packet and link the structural audit."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'assessment-portfolio.js';s=p.read_text(encoding='utf8');old='for(const audio of packet.audio)';assert old in s
insert="if(packet.evidence.forms){const f=packet.evidence.forms;dialog.append(n('h3','Practical forms'),n('p','Prepared-source detail practice; open writing accuracy is not graded by these checks.'));for(const variant of f.task.variants){const result=f.record?.forms?.[variant.id];if(!result)continue;const panel=n('section',null,'a1-panel');panel.append(n('h3',variant.title),n('p',variant.source));f.task.fields.forEach((field,i)=>panel.append(n('p',field.label+' · '+field.meaning+': '+(result.values?.[i]||''))));panel.append(n('p','Completed example: '+(result.modelViewed?'used':'not opened')+'. Detail checks: '+(result.attempts?.length||0)+'.'));dialog.append(panel);}}"
p.write_text(s.replace(old,insert+old,1),encoding='utf8')
p=R/'tools/audit_curriculum_release.py';s=p.read_text(encoding='utf8').replace('from audit_written_interaction import main as audit_written_interaction','from audit_written_interaction import main as audit_written_interaction\nfrom audit_form_practice import main as audit_forms').replace("report['requiredWrittenInteraction'] = audit_written_interaction()","report['requiredWrittenInteraction'] = audit_written_interaction()\n    report['requiredPracticalForms'] = audit_forms()")
s=s.replace('an update from live build 188 pass','an update from the current live build pass');p.write_text(s,encoding='utf8')
print('Added typed form evidence to the actual reviewer screen and release audit.')
