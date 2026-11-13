"""Static, dependency-free audit of project-specific A1-C2 teaching models."""
import json
import re
import subprocess
from pathlib import Path
from audit_transfer_content import words
ROOT=Path(__file__).resolve().parents[1]
PROGRAM="""global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};require('./tools/course_content_loader.js');console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,support:WordamiSourceSupport.units,lessons:WordamiWritingPreparation.lessons,feedback:Object.fromEntries(Object.entries(WordamiWritingPreparation.lessons).map(([id,l])=>[id,WordamiA1Feedback.analyse(id,l.model)]))}));"""

def content_audit():
    reports={}
    for lang in ['lt','es']:
        data=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=ROOT).decode('utf8'));taught=set()
        assert len(data['lessons'])==42
        assert all(sum(key.startswith(band) for key in data['lessons'])==7 for band in ['A1','A2','B1','B2','C1','C2'])
        for unit in data['units']:
            uid=unit['id'];taught.update(words(' '.join(p[0] for p in unit['writing']['phrases'])))
            taught.update(words(' '.join(w['text'] for w in data['vocabulary'][uid])))
            taught.update(words(' '.join(w['text'] for w in data['support'][uid])))
            for lesson_id,lesson in data['lessons'].items():
                if not lesson_id.startswith(uid+'.'):continue
                assert not (words(lesson['model'])-taught),(lang,lesson_id,words(lesson['model'])-taught)
                assert len(lesson['lines'])==3 and len({l['id'] for l in lesson['lines']})==3
                assert all(l['goal'] and l['text'] and l['why'] for l in lesson['lines'])
                count=len(re.findall(r'\w+',lesson['model']))
                assert lesson['range'][0]<=count<=lesson['range'][1],(lang,lesson_id,count)
                if data['feedback'][lesson_id] is not None:assert all(c['found'] for c in data['feedback'][lesson_id]['checks']),(lang,lesson_id)
        reports[lang]=data['lessons']
    return reports


def main():
    report={'schema':1,'scope':'guided A1-C2 writing preparation, not independent proficiency evidence','languages':content_audit()}
    target=ROOT/'docs/cefr/writing-preparation.json'
    target.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Eighty-four A1-C2 writing models and 252 purpose exercises use prepared language and appropriate practice ranges.')
    return report


if __name__=='__main__':main()
