"""Prepare source-only review books; never exports learner drafts or recording data."""
import json
from pathlib import Path
from build_skills_audio import content
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'/'cefr'/'review'

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    assets=json.loads((ROOT/'audio/skills/manifest.json').read_text(encoding='utf8'))
    listening_assets=json.loads((ROOT/'audio/listening-transfer/manifest.json').read_text(encoding='utf8'))
    exchange_assets=json.loads((ROOT/'audio/interaction-practice/manifest.json').read_text(encoding='utf8'))
    for lang,name in [('lt','Lithuanian'),('es','Mexican Spanish')]:
        course=content(lang);units=course.get('units',course['levels'])
        lines=['# '+name+' course review book','','30 units, A1–C2. These are the actual built source materials and task keys. This book contains no learner data. See the generated curriculum audit for structural checks; language and descriptor approvals remain separate and pending.','','## Contents','']
        lines += [f"- [{u.get('band',u['id'])} · {u['theme']}](#{u['id'].lower()})" for u in units]
        for u in units:
            lines += ['',f"<a id=\"{u['id'].lower()}\"></a>",'## '+u.get('band',u['id'])+' · '+u['theme'],'','Unit reference: '+u['id'],'']
            plan=course['learningPlans'][u['id']]
            lines += ['### Learning goal','',plan['goal'],'','Builds on: '+(plan['prerequisite'] or 'Start here'),'','### Pattern explanation','',plan['pattern']['explanation'],'','### Support plan','',plan['support'],'','### Skill targets','']
            lines += ['- '+skill+': '+outcome['goal']+' (selected scale: '+outcome['scale']+')' for skill,outcome in plan['outcomes'].items()]
            lines += ['','### Vocabulary in context','']
            lines += ['- '+w['text']+' - '+w['meaning']+' [Hear](../../../'+assets[lang+'.'+u['id']+'.word-'+str(i)]['url']+')' for i,w in enumerate(course['vocabulary'][u['id']])]
            support=course['sourceSupport'].get(u['id'],[])
            if support:
                lines += ['','### Additional source language','']
                for entry in support:
                    lines += ['- '+entry['text']+' — '+entry['meaning'],'  - '+entry['context']]
            lines += ['','### Sentence-pattern preparation','']
            lines += ['- '+t+' — '+meaning for t,meaning in u['writing']['phrases']]
            lines += ['','### Teaching notes','']+['- '+t for t in u['writing']['lesson']]
            lines += ['','### Reading source','',u['reading'],'','English guide:',u['readingGuide']]
            if u['writing'].get('sources'):
                for i,(title,text) in enumerate(u['writing']['sources']):lines += ['',title,'',text,'',u['sourceGuides'][i]]
            lines += ['','### Listening source','',u['listen'],'','English guide:',u['translation'],'']
            # The audio links are taken from the generated asset manifest.
            lines += ['[Full listening recording](../../../'+assets[lang+'.'+u['id']+'.listen']['url']+')']
            for title,questions in [('Reading',u['readingQuestions']),('Listening',u['questions'])]:
                lines += ['','### '+title+' task key','']
                for i,(prompt,choices,correct) in enumerate(questions):
                    lines += [str(i+1)+'. '+prompt]+['   - '+text+(' **[key]**' if index==correct else '') for index,text in enumerate(choices)]
            lines += ['','### Spoken production','',u['production'][0],'']+['- '+t for t in u['production'][1]]
            lines += ['','### Recorded partner role-play','']
            for i,(text,meaning,goal) in enumerate(u['turns']):
                asset=assets[lang+'.'+u['id']+'.turn-'+str(i)]
                lines += [str(i+1)+'. '+text,'   - Meaning: '+meaning,'   - Response goal: '+goal,'   - [Partner audio](../../../'+asset['url']+')']
            lines += ['','### Spoken mediation','',u['mediation'],'','### Writing assignments','']
            projects=[u['project']] if u.get('project') else [dict(title=p[1],audience=p[2],brief=p[3],goals=p[4],range=p[5] if len(p)>5 else u['writing']['range']) for p in u['writing']['projects']]
            for project_index,p in enumerate(projects):
                prep_id=u['id']+'.writing' if u.get('project') else u['id']+'.'+u['writing']['projects'][project_index][0]
                preparation=course['writingPreparation'].get(prep_id)
                practice_range=preparation['range'] if preparation else p['range']
                lines += ['#### '+p['title'],'','Reader: '+p['audience'],'',p['brief'],'','Suggested length: '+'–'.join(str(x) for x in practice_range)+' words.','']+['- '+t for t in p['goals']]+['']
                if preparation:
                    lines += ['','##### Project-specific preparation','',preparation['guidance'],'','Worked model:',preparation['model'],'','Purpose practice (correct line and explanation):','']
                    for entry in preparation['lines']:
                        lines += ['- '+entry['goal'],'  - '+entry['text'],'  - '+entry['why']]
                    lines += ['','Learners can save their own planning details with the draft. Purpose practice does not complete or grade the project.','']
            transfer=course['readingTransfer'].get(u['id'])
            if transfer:
                lines += ['','### Controlled reading transfer','',transfer['documentKind'],'','Changed combinations of prepared language. Feedback is held to the end. Repeated source versions are labelled as repeat practice; this does not establish a CEFR level.']
                for variant in transfer['variants']:
                    lines += ['','#### '+variant['id'],'',variant['text'],'']
                    for question in variant['questions']:
                        lines += ['- '+question['prompt'],'  - Model detail: '+question['model']]
                        if question.get('options'):
                            lines += ['  - '+text+(' **[key]**' if index==question['answer'] else '') for index,text in enumerate(question['options'])]
                            lines += ['  - Explanation: '+question['explanation']]
            listening=course['listeningTransfer'].get(u['id'])
            if listening:
                lines += ['','### Controlled listening transfer','',listening['documentKind'],'','The learner hears the complete recording before answering. The transcript below appears only after all three answers in the learner interface. First attempts and repeats are tracked separately.']
                for variant in listening['variants']:
                    recording=listening_assets[lang+'.'+u['id']+'.'+variant['id']]
                    lines += ['','#### '+variant['id'],'','[Complete recording](../../../'+recording['url']+')','',variant['text'],'']
                    for question in variant['questions']:
                        lines += ['- '+question['prompt'],'  - Model detail: '+question['model']]
                        if question.get('options'):
                            lines += ['  - '+text+(' **[key]**' if index==question['answer'] else '') for index,text in enumerate(question['options'])]
                            lines += ['  - Explanation: '+question['explanation']]
            extended=course.get('extendedReading',{}).get(u['id'])
            if extended:
                lines+=['','### Required longer reading portfolio','',extended['purpose'],extended['strategy'],'','Original fictional '+extended['genre']+'. Every source sentence is prepared before the whole-text check.']
                for section in extended['sections']:
                    lines+=['','#### '+section['title'],'']
                    for target,meaning in section['lines']:lines+=['- '+target,'  - Preparation meaning: '+meaning]
                lines+=['','Whole-text questions (feedback held until all four answers):']
                for q in extended['questions']:lines+=['- '+q['prompt']]+['  - '+choice+(' **[key]**' if i==q['answer'] else '') for i,choice in enumerate(q['options'])]+['  - '+q['explanation']+' Relevant parts: '+', '.join(str(i+1) for i in q['sections'])]
                lines+=['','Notes and brief teaching:']+['- '+t for t in extended['noteTeaching']]+['','Worked quotation: '+extended['noteExample']['quote'],'Worked note: '+extended['noteExample']['note'],'Meaning: '+extended['noteExample']['meaning'],'','Brief goals:']+['- '+g for g in extended['goals']]+['','Practice length: '+str(extended['practiceRange'])+' words; no automatic proficiency judgement.']
            documents=course.get('documents',{}).get(u['id'])
            if documents:
                lines+=['','### Required practical table reading','']+documents['teaching']
                for row in documents['rows']:lines+=['- '+row['label']+': '+'; '.join(f['label']+' = '+row['values'][i] for i,f in enumerate(documents['fields']))]
                for variant in documents['variants']:
                    lines+=['','#### '+variant['title'],'','Layout: '+variant['layout'],'','Displayed comparison source:',documents['rows'][variant['sourceIndex']]['source']]
                    if variant['layout']=='rows':
                        headers=['Source details']+[f['label'] for f in documents['fields']]
                        table_rows=[[row['label']]+row['values'] for row in documents['rows']]
                    else:
                        headers=['Field']+[row['label'] for row in documents['rows']]
                        table_rows=[[field['label']]+[row['values'][i] for row in documents['rows']] for i,field in enumerate(documents['fields'])]
                    table_row=lambda cells:'| '+' | '.join(str(s).replace('|','\\|').replace('\n',' ') for s in cells)+' |'
                    lines+=['',table_row(headers),table_row(['---']*len(headers))]+[table_row(row) for row in table_rows]+['']
                    for question in variant['questions']:
                        lines+=['- '+question['prompt']]+['  - '+choice+(' **[key]**' if choice==question['answer'] else '') for choice in question['choices']]+['  - Explanation: '+question['explanation']]
            forms=course.get('forms',{}).get(u['id'])
            if forms:
                lines+=['','### Required practical forms','','The labels and field formats are explicitly taught. Both prepared-source forms are required; detail checking is not an open-writing accuracy grade.',forms['note'],'','Label preparation:']
                for field in forms['teaching']:lines+=['- '+field['label']+' — '+field['meaning']+'; original: '+field['example']+'; changed: '+field['secondExample']]
                for variant in forms['variants']:
                    lines+=['','#### '+variant['title'],'','Source: '+variant['sourceKind'],'',variant['source'],'','Field key:']+['- '+field['label']+': '+variant['values'][i] for i,field in enumerate(forms['fields'])]
            written=course.get('writtenInteraction',{}).get(u['id'])
            if written:
                lines+=['','### Required written exchanges','','Write the question, understand the prepared partner reply, then draft and revise a response. Own writing is self-reviewed; no automatic accuracy or CEFR grade is assigned.']
                for e in written['exchanges']:
                    lines+=['','#### '+e['key'],'','Question purpose: '+e['intention'],'','Prepared question: '+e['questionModel'],'','Partner message: '+e['partnerReply'],'','Detail check: '+e['detailQuestion'],'','Key: '+e['options'][e['answer']],'','Optional response frame: '+e['responseModel'],'','Response goals:']+['- '+g for g in e['goals']]
            feedback={key:value for key,value in course['guidedFeedback'].items() if key.startswith(u['id']+'.')}
            if feedback:
                lines += ['','### Guided prepared-pattern feedback','','Local pattern recognition supports revision; unmatched wording can be valid. No grammar, pronunciation or proficiency score is assigned. Speaking feedback checks optional notes typed after a real recording and replay, not the audio itself.']
                for task,checks in feedback.items():
                    lines += ['','#### '+task,'']
                    for check in checks:lines += ['- '+check['label'],'  - Prepared example: '+check['example']]
            exchange=course['guidedInteraction'].get(u['id'])
            if exchange:
                lines += ['','### Guided checking exchange','',exchange['goal'],'','Reuses the prepared listening source. The learner selects the question they intend to say; that selection drives a recorded branch. Both own responses require recording, replay and self-review. Speech is not automatically interpreted or graded.']
                for branch,text,meaning in exchange['questions']:
                    question=exchange_assets[lang+'.'+u['id']+'.question-'+branch]
                    reply=exchange_assets[lang+'.'+u['id']+'.'+branch]
                    lines += ['','- Checking question: '+text,'  - Meaning: '+meaning,'  - [Question model](../../../'+question['url']+')','  - Partner reply: '+exchange['replies'][branch],'  - [Recorded partner](../../../'+reply['url']+')']
                if exchange.get('branches'):
                    lines += ['','B1–C2 question frames are optional and their use is saved. Intention selection drives the partner; speech is never interpreted automatically.']
                    for branch,check in exchange['branches'].items():
                        lines += ['','#### Reply-specific follow-up: '+branch,'',check['detailQuestion'],'','Key: '+check['options'][check['answer']],'','Own-response goal: '+check['responseGoal'],'','Prepared wording: '+check['detailModel']]
                else:
                    lines += ['','Partner-detail check: '+exchange['detailQuestion'],'','Key: '+exchange['options'][exchange['answer']],'','Own-response goal: '+exchange['responseGoal'],'','Prepared wording: '+exchange['detailModel']]
        (OUT/(lang+'.md')).write_text('\n'.join(lines)+'\n',encoding='utf8')
    (OUT/'README.md').write_text('# Complete source review books\n\n- [Lithuanian](lt.md)\n- [Mexican Spanish](es.md)\n- [Lithuanian grammar](grammar-lt.md)\n- [Spanish grammar](grammar-es.md)\n\nEach book exports all 30 built units, teaching notes, sources, English guides, task keys, partner prompts, audio links and writing assignments. No learner data is included.\n\n[Editorial queue](review-queue.json) identifies exact unit versions and language/design questions. The [pending record template](pending-review-records.json) contains blank, unapproved records. Completed reviews need the actual reviewer, date, substantive findings and matching current content hash. These exporters never create approvals or write the active `docs/cefr/curriculum-reviews.json` file. Editorial approval alone does not establish complete syllabus breadth or calibrated proficiency assessment.\n\nRegenerate books with `G:/Python/python.exe tools/export_curriculum_review.py`. After rebuilding `tools/audit_curriculum_release.py`, regenerate assignments with `G:/Python/python.exe -X utf8 tools/export_curriculum_review_queue.py`.\n',encoding='utf8')
    print('Exported both 30-unit source review books with all audio links, task keys and writing briefs.')
if __name__=='__main__':main()
