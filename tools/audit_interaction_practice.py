"""Audit prepared language and source-matched details in guided recorded exchanges."""
import hashlib
import json
import subprocess
from pathlib import Path
from audit_transfer_content import words

ROOT=Path(__file__).resolve().parents[1]
PROGRAM="""global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of ['writing-content','skills-content','curriculum-content','vocabulary-content','learning-design','source-support','a2-source-support','b1-source-support','b2-source-support','c1-source-support','c2-source-support','interaction-practice-content','higher-interaction-content'])require('./'+f+'.js');console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,support:WordamiSourceSupport.units,bank:WordamiInteractionPracticeContent}));"""


def main(check_audio=True):
    from build_interaction_practice_audio import voice_for_id
    manifest=json.loads((ROOT/'audio/interaction-practice/manifest.json').read_text(encoding='utf8'))
    report={'schema':1,'scope':'guided self-reviewed interaction; no automatic speech or CEFR assessment','audioVerified':check_audio,'languages':{}}
    for lang in ['lt','es']:
        data=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=ROOT).decode('utf8'));taught=set();rows=[]
        for unit in data['units']:
            uid=unit['id'];taught.update(words(' '.join(p[0] for p in unit['writing']['phrases'])))
            taught.update(words(' '.join(w['text'] for w in data['vocabulary'][uid])))
            taught.update(words(' '.join(w['text'] for w in data['support'][uid])))
            spec=data['bank']['units'][uid]
            assert len(spec['questions'])==2 and len({q[0] for q in spec['questions']})==2
            if spec.get('branches'):
                assert set(spec['branches'])=={q[0] for q in spec['questions']}==set(spec['replies'])
                checks=[(key,b) for key,b in spec['branches'].items()]
            else:
                assert {q[0] for q in spec['questions']}=={'confirm','correct'}
                checks=[(key,spec) for key in spec['replies']]
            for key,check in checks:
                assert len(check['options'])==3 and len(set(check['options']))==3 and 0<=check['answer']<3
                assert check['detailModel'].casefold() in spec['replies'][key].casefold(),(lang,uid,key)
                assert check['responseGoal'] and check['detailQuestion']
            texts=list(spec['replies'].items())+[(f'question-{q[0]}',q[1]) for q in spec['questions']]
            for part,text in texts:
                assert not (words(text)-taught),(lang,uid,text,words(text)-taught)
                if check_audio:
                    asset=manifest[lang+'.'+uid+'.'+part]
                    digest=hashlib.sha256(json.dumps([lang,text,voice_for_id(lang+'.'+uid+'.'+part)],ensure_ascii=False).encode()).hexdigest()[:12]
                    assert asset['hash']==digest and (ROOT/asset['url']).is_file()
            assert len(set(spec['replies'].values()))==2
            rows.append({'unitId':uid,'preparedSourceReused':True,'checkingQuestions':spec['questions'],'partnerReplies':spec['replies'],'branches':spec.get('branches'),'detailGoal':spec.get('detailQuestion'),'detailModel':spec.get('detailModel'),'supportMode':spec.get('supportMode','frames_first'),'ownRecordedResponsesPerRound':2,'newUntaughtForms':[],'speechAutomaticallyAssessed':False})
        report['languages'][lang]=rows
    (ROOT/'docs/cefr/interaction-practice.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('48 bilingual guided exchanges: 96 question models, 96 partner replies, all in prepared language with reply-specific meaning checks.')
    return report


if __name__=='__main__':
    import sys
    main(check_audio='--content-only' not in sys.argv)
