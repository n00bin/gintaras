"""Verify that controlled transfer introduces no untaught target-language forms."""
import json
import re
import subprocess
import unicodedata
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
PROGRAM="""global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of ['writing-content','skills-content','curriculum-content','vocabulary-content','learning-design','source-support','a2-source-support','b1-source-support','b2-source-support','c1-source-support','c2-source-support','transfer-content','a2-transfer-content','listening-transfer-content','a2-listening-transfer-content','b1-application-content','b2-application-content','c1-application-content','c2-application-content'])require('./'+f+'.js');console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,support:WordamiSourceSupport.units,banks:[WordamiTransferContent,WordamiListeningTransferContent]}));"""


def words(text):
    return set(re.findall(r'[^\W\d_]+',unicodedata.normalize('NFC',text).lower()))


def main():
    report={'schema':1,'scope':'controlled reading and listening transfer, not complete CEFR assessment','languages':{}}
    for lang in ['lt','es']:
        data=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=ROOT).decode('utf8'))
        taught=set();rows=[];documents=set()
        for unit in data['units']:
            taught.update(words(' '.join(p[0] for p in unit['writing']['phrases'])))
            taught.update(words(' '.join(w['text'] for w in data['vocabulary'][unit['id']])))
            taught.update(words(' '.join(w['text'] for w in data['support'].get(unit['id'],[]))))
            for bank in data['banks']:
                spec=bank['units'].get(unit['id'])
                if not spec:continue
                assert len(spec['variants'])==2
                assert len({v['id'] for v in spec['variants']})==2
                for variant in spec['variants']:
                    unknown=words(variant['text'])-taught
                    assert not unknown,(lang,unit['id'],variant['id'],unknown)
                    canonical=re.sub(r'\s+',' ',variant['text']).strip().lower()
                    assert canonical not in documents,'Repeated document across banks'
                    documents.add(canonical)
                    assert variant['text'] not in [unit['reading'],unit['listen']]
                    assert len(variant['questions'])==3
                    for q in variant['questions']:
                        assert q['prompt'] and q['model']
                        if 'options' in q:
                            assert len(q['options'])==3 and len(set(q['options']))==3
                            assert type(q['answer']) is int and 0<=q['answer']<3 and q['explanation']
                        else:assert q['answers']
                        assert words(q['model'])<=words(variant['text']),(lang,unit['id'],q['model'])
                        assert q['model'].rstrip('.!?').lower() in variant['text'].lower()
                rows.append({'unitId':unit['id'],'skill':bank['skill'],'variants':2,'questions':6,'newTargetLanguageForms':[],'scope':'changed details using explicitly prepared language'})
        assert set(data['banks'][0]['units'])==set(data['banks'][1]['units'])
        assert len(rows)==sum(len(b['units']) for b in data['banks'])
        report['languages'][lang]=rows
    target=ROOT/'docs/cefr/transfer-coverage.json'
    target.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    counts={skill:sum(r['variants'] for rows in report['languages'].values() for r in rows if r['skill']==skill) for skill in ['reading','listening']}
    report['counts']={**counts,'questions':3*sum(counts.values())}
    target.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(f"{counts['reading']} reading documents and {counts['listening']} separate listening messages, {3*sum(counts.values())} questions: all target-language forms have explicit preparation.")
    return report


if __name__=='__main__':main()
