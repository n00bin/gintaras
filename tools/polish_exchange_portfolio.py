from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'skills-studio.js';s=p.read_text(encoding='utf8');needle="keepRecording(l.id,kind+'.'+turn,blob,{taskId,";assert needle in s
s=s.replace(needle,"keepRecording(l.id,kind==='production'&&!saved.firstReview?'production.first':kind+'.'+turn,blob,{take:kind==='production'?(saved.firstReview?'revised':'first'):'response',taskId,");p.write_text(s,encoding='utf8')
p=R/'assessment-portfolio.js';s=p.read_text(encoding='utf8')
start=s.index('function missingSpokenEvidence(');end=s.index('\n',start)
s=s[:start]+"function missingSpokenEvidence(records,skills){for(const [skill,roles] of [['production',['production.0']],['interaction',['interaction.0','interaction.1','interaction.2']],['mediation',['mediation.0']]])if(skills[skill]?.judgement!=='not_assessed'&&!roles.every(role=>records.some(r=>r.role===role)))return skill;return null;}"+s[end:]
needle='for(const audio of packet.audio){const player=';at=s.index(needle)
extra="if(packet.evidence.writtenInteraction){dialog.append(n('h3','Written exchanges'));for(const item of packet.evidence.writtenInteraction.exchanges||[]){const r=item.record,s=item.scenario;if(!r)continue;const panel=n('section',null,'a1-panel');panel.append(n('h3',s.title),n('p','Question purpose: '+s.intention),n('p','Learner question: '+r.question),n('p','Partner reply: '+s.partnerReply),n('p','First reply: '+(r.baseline||'')),n('p','Revised reply: '+(r.draft||'')),n('p','Revision reflection: '+(r.reflection||'')));for(const goal of s.goals||[])panel.append(n('p',goal));panel.append(n('p','Question frame: '+(r.questionFrameViewed?'used':'not opened')+'. Response frame: '+(r.responseFrameViewed?'used':'not opened')+'.'));dialog.append(panel);}}"
s=s[:at]+extra+s[at:];p.write_text(s,encoding='utf8')
