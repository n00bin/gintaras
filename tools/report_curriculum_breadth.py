"""Expose concrete breadth gaps alongside actual task evidence; never infer level coverage."""
import hashlib,json,re
from pathlib import Path
from build_skills_audio import content
R=Path(__file__).resolve().parents[1];OUT=R/'docs/cefr'
SOURCE='https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4'
# Authored review categories, not quotations, CEFR pass criteria or an exhaustive descriptor list.
FAMILIES=[
 ('read-short','Short practical texts','reading',[54,55],'reading','Vary layout, purpose and contextual detail beyond the prepared message bank.'),
 ('read-changed','Changed written details','reading',[54,58],'readingTransfer','Broaden genres and interpretations; keep first exposure separate from repeats.'),
 ('read-long','Extended reading and leisure reading','reading',[56,58],'extendedReading','Prepared four-part narrative and analytical readings exist in selected B1–C2 units. Broaden text length, genres, independent transfer and leisure reading.'),
 ('read-visual','Tables, diagrams and embedded information','reading',[55,56],'documents','Prepared practical tables are present in selected A1–A2 units. Add varied documents and higher-band visual sources with explicit preparation.'),
 ('hear-prepared','Prepared recorded messages','listening',[48,51],'listen','Current sources have controlled recordings. Review pace, variety and discourse demands by band.'),
 ('hear-changed','Changed recorded details','listening',[51,52],'listeningTransfer','Extend beyond short controlled messages with varied speakers and purposes.'),
 ('hear-others','Overheard conversation','listening',[49],None,'Add complete exchanges between distinct speakers and questions about the relationship between turns.'),
 ('hear-lecture','Talks and lectures','listening',[50],None,'Add sustained talks with taught preparation, a note-taking purpose and questions about structure and emphasis.'),
 ('hear-media','Broadcasts and audiovisual material','listening',[52],None,'Add rights-cleared audio/video and teach relevant nonverbal and genre cues.'),
 ('say-experience','Describe and explain in speech','speaking',[62,63],'production','Broaden subjects and require varied responses across several occasions.'),
 ('say-case','Present and defend a position','speaking',[64,65],'production','Current higher-band prompts support selected positions. Add audience-specific presentations and follow-up challenges.'),
 ('say-public','Public announcements and audience delivery','speaking',[64,65],None,'Add complete announcement and presentation tasks with audience, register and delivery preparation.'),
 ('talk-scripted','Prepared partner exchanges','interaction',[72,73],'turns','Recorded fixed turns and selected branches are practice, not unpredictable conversation.'),
 ('talk-repair','Clarification and conversational repair','interaction',[88,89],'guidedInteraction','Current branch selection drives the partner response. Add further clarification chains and transfer contexts.'),
 ('talk-live','Unpredictable conversation and discussion','interaction',[73,75],None,'Add a live interlocutor workflow and record observations against task-specific criteria.'),
 ('talk-group','Group planning, meetings and collaboration','interaction',[75,76],None,'Teach shared decision making, floor management and responding to genuinely different contributions.'),
 ('talk-services','Services, interviews and telephone use','interaction',[77,81],'turns','Foundation and workshop tasks contain selected service situations. Audit systematic breadth and add interviews and telephone-specific tasks.'),
 ('write-projects','Purposeful extended writing','writing',[66,68],'writingPreparation','There are 84 guided projects. Review genre breadth and repeated independent performance by band.'),
 ('write-exchanges','Written clarification and replies','writing',[82],'writtenInteraction','There are prepared message exchanges. Add varied audiences, purposes and less predictable replies.'),
 ('write-forms','Forms and practical field use','writing',[83],'forms','Original and changed-source forms exist in meeting, travel and service units. Expand practical documents only where appropriate.'),
 ('online-group','Online discussion and collaboration','writing',[84,86],None,'Add threaded discussion, contributions from multiple people and a shared outcome; prepared one-to-one messages cover only part of this demand.'),
 ('mediate-spoken','Explain and reformulate source information','mediation',[93,101],'mediation','Current tasks preserve source details in recorded self-reviewed responses. Broaden audience and source demands.'),
 ('mediate-data','Explain quantitative or visual information','mediation',[96],None,'Add charts/tables with taught labels and require a useful interpretation for a specified audience.'),
 ('mediate-written-notes','Purposeful notes from written sources','mediation',[98,101],'extendedReading','Written-source notes are reused in revised audience briefs. Broaden source genres and independent performance.'),
 ('mediate-notes','Useful notes from sustained input','mediation',[105],None,'Written-source preparation is implemented separately. Add purposeful notes during lectures, meetings and seminars; reading notes do not demonstrate this oral-input scale.'),
 ('mediate-translation','Translate for a concrete purpose','mediation',[102],None,'Teach meaning-preserving translation choices and evaluate the actual translated artifact.'),
 ('mediate-literary','Respond to voice and interpretation','mediation',[106,107],'literature','A short higher-band literature workshop exists. Broaden texts, genres and supported alternative interpretations.'),
 ('mediate-social','Construct shared meaning and resolve disagreement','mediation',[109,116],None,'Add collaborative concept building and delicate communication with actual contributions from other people.'),
 ('plan-repair','Planning and revising a response','strategies',[69,70],'writingPreparation','Planning, self-review and revision are implemented. Review transfer without frames and adequacy of independent repairs.'),
 ('infer-cues','Infer from context and evidence','strategies',[60],'readingTransfer','Higher-band changed-source questions target selected interpretations. Audit the variety of cues and assess inference on different occasions.'),
 ('language-control','Vocabulary, grammar, spelling and sound control','competence',[130,136],'vocabulary','Prepared vocabulary, controlled grammar, audio models and replay exist. These do not establish independent control, intelligibility or broad range.'),
 ('discourse-register','Coherence, precision, register and fluency','competence',[136,142],'register','Some higher-band tasks teach these choices. Independent performance and broader discourse evidence are still needed.')
]

def evidence(c,kind):
 if kind is None:return []
 if kind in ['reading','listen','production','turns','mediation']:return [{'unitId':u['id'],'band':u.get('band',u['id']),'task':'skills.'+u['id']+'.'+{'listen':'listening','turns':'interaction'}.get(kind,kind)} for u in c['units']]
 if kind in ['vocabulary','readingTransfer','listeningTransfer','guidedInteraction','writtenInteraction','forms','documents','extendedReading']:
  return [{'unitId':uid,'band':next(u.get('band',u['id']) for u in c['units'] if u['id']==uid),'task':kind+'.'+uid} for uid in c[kind]]
 if kind=='writingPreparation':return [{'unitId':uid.split('.')[0],'band':uid.split('.')[0].split('-')[0],'task':'writing.'+uid} for uid in c[kind]]
 if kind=='literature':return [{'unitId':u['id'],'band':'C2','task':'skills.'+u['id']+'.mediation'} for u in c['units'] if u['id']=='C2-literature']
 if kind=='register':return [{'unitId':u['id'],'band':u.get('band',u['id']),'task':'skills.'+u['id']+'.writing'} for u in c['units'] if u['id'] in ['B2-workplace','C1-professional','C2-register']]
 raise ValueError(kind)

def main():
 audio=json.loads((R/'audio/skills/manifest.json').read_text(encoding='utf8'))
 report={'schema':1,'scope':'Authored task-family gap inventory for spoken/written Lithuanian and Mexican Spanish; not an exhaustive official descriptor inventory','source':SOURCE,'sourceChecked':'2026-11-10','completeCefrCoverageEstablished':False,'languages':{}}
 lines=['# Curriculum breadth: evidence and remaining work','','This checklist makes the remaining work concrete. It is informed by Chapters 3–5 of the [CEFR Companion volume]('+SOURCE+'), uses authored task-family labels and contains no official descriptor quotations. A linked task is an implemented example, not proof that a complete scale or level is covered. Signing competence is outside this spoken/written course profile.','','## Current source sizes','','There is no automatic CEFR pass threshold based on text length or audio duration. These measurements describe the current material and help a reviewer assess breadth and sustained discourse.','','| Language | Band | Workshops | Main reading words (range) | Main audio seconds (range) | Forms |','| --- | --- | ---: | ---: | ---: | ---: |']
 for lang in ['lt','es']:
  c=content(lang);metrics=[];families=[]
  for band in ['A1','A2','B1','B2','C1','C2']:
   units=[u for u in c['units'] if u.get('band',u['id'])==band];words=[len(re.findall(r'\w+',u['reading'])) for u in units];seconds=[audio[lang+'.'+u['id']+'.listen']['duration'] for u in units];forms=sum(len(c['forms'].get(u['id'],{}).get('variants',[])) for u in units)
   metrics.append({'band':band,'units':[u['id'] for u in units],'themes':[u['theme'] for u in units],'readingWordsRange':[min(words),max(words)],'mainAudioSecondsRange':[min(seconds),max(seconds)],'forms':forms})
   lines.append(f"| {lang} | {band} | {len(units)} | {min(words)}–{max(words)} | {min(seconds):.1f}–{max(seconds):.1f} | {forms} |")
  for key,label,skill,pages,kind,next_work in FAMILIES:
   tasks=evidence(c,kind)
   families.append({'id':key,'family':label,'skill':skill,'referencePages':pages,'status':'selected_examples_require_breadth_review' if tasks else 'dedicated_task_family_not_implemented','evidence':tasks,'nextWork':next_work,'independentAssessmentEstablished':False})
  report['languages'][lang]={'contentHash':hashlib.sha256(json.dumps(c,ensure_ascii=False,sort_keys=True).encode()).hexdigest(),'metrics':metrics,'families':families}
 lines+=['','## Task-family gaps','','Both languages currently have the same workflow families. The JSON inventory links the actual task and unit IDs independently for each language.','','| Family | Current status | Concrete remaining work |','| --- | --- | --- |']
 for row in report['languages']['lt']['families']:lines.append('| '+row['family']+' | '+('Selected examples' if row['evidence'] else 'Dedicated family missing')+' | '+row['nextWork']+' |')
 lines+=['','## Review and implementation order','','1. Review each band’s prepared language and actual sources, using the exact-version review books. Resolve incorrect or prematurely introduced forms.','2. Add missing practical document and sustained-input tasks with explicit teaching, source guides and task-specific criteria. Link them to their units and preserve previous work.','3. Broaden speaker, genre, discourse and interaction demands; include different occasions and genuine transfer.','4. Collect independently judged speech/writing and live-interaction evidence; calibrate reviewers and run learner trials.','5. Reconcile the full public course candidate, accessibility review and deployment checks. The current live image release remains usable while this work continues.','','[Machine-readable evidence and task IDs](curriculum-breadth.json). This report contains source materials and implementation facts, never learner data or fabricated approvals.']
 (OUT/'curriculum-breadth.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8');(OUT/'CURRICULUM-BREADTH.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
 print(f'Reported {len(FAMILIES)} task families in each language; missing families and selective coverage remain explicit.')
 return report
if __name__=='__main__':main()
