"""Export authored grammar material and the phrase-deck capacity, without learner data."""
import json,subprocess,re,unicodedata
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'/'cefr'
def main():
    report={'schema':1,'languages':{},'phraseReview':{'engine':'existing fsReview / FSRS-4.5','storage':'separate per-language local deck','newPhraseFollowup':'one day','missedPhraseFollowup':'ten minutes','successfulExtraPractice':'does not extend the due date','typedAnswersStored':False,'cefrLevelAssigned':False}}
    program="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of ['./writing-content.js','./skills-content.js','./curriculum-content.js','./vocabulary-content.js','./grammar-content.js'])require(f);console.log(JSON.stringify({units:WordamiSkillsContent.units,vocabulary:WordamiVocabularyContent.units,reviewCardCapacity:WordamiVocabularyContent.deck().length,grammar:WordamiGrammarContent.lessons}));"
    for lang in ['lt','es']:
        source=json.loads(subprocess.check_output(['node','-e',program,lang],cwd=ROOT).decode('utf8'))
        lessons=source['grammar'];assert [l['id'] for l in lessons]==['A1','A2','B1','B2','C1','C2']
        for l in lessons:
            assert len(l['examples'])==3 and len(l['tasks'])==6
            assert sum(t['kind']=='typed' for t in l['tasks'])==2
            for t in l['tasks']:
                assert t['why']
                if t['kind']=='typed':assert t['accept']
                else:assert len(t['options'])==3 and 0<=t['answer']<3
        punct=''.join(chr(n) for n in [46,44,33,63,191,161,58,59,8220,8221,34,39])
        fold=lambda s:re.sub(r'\s+',' ',unicodedata.normalize('NFC',s).lower().translate(str.maketrans('','',punct))).strip()
        phrases=[p[0] for u in source['units'] for p in u['writing']['phrases']]
        report['languages'][lang]={'grammarLessons':6,'workedExamples':18,'choiceExercises':24,'typedExercises':12,'vocabularyEntries':sum(len(v) for v in source['vocabulary'].values()),'senseAwareReviewItems':source['reviewCardCapacity'],'phraseIntroductions':len(phrases),'uniqueReviewPhrases':len(set(map(fold,phrases))),'lessons':lessons}
        lines=['# '+('Lithuanian' if lang=='lt' else 'Mexican Spanish')+' grammar review book','','Six worked-example lessons with practice keys. These are learning exercises, not an independent proficiency assessment.']
        for l in lessons:
            lines += ['','## '+l['id']+' · '+l['title'],'',l['rule'],'','### Worked examples','']
            for text,meaning,why in l['examples']:lines += ['- '+text,'  - '+meaning,'  - '+why]
            lines += ['','### Practice key','']
            for i,t in enumerate(l['tasks']):
                lines += [str(i+1)+'. '+t['prompt']]
                if t['kind']=='typed':lines += ['   - Learned response: '+t['accept'][0]]
                else:lines += ['   - '+text+(' **[key]**' if index==t['answer'] else '') for index,text in enumerate(t['options'])]
                lines += ['   - Feedback: '+t['why']]
        folder=OUT/'review';folder.mkdir(parents=True,exist_ok=True)
        (folder/('grammar-'+lang+'.md')).write_text('\n'.join(lines)+'\n',encoding='utf8')
    (OUT/'learning-support.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print('Verified 12 grammar lessons, 36 worked examples, 72 exercises with the vocabulary and sense-aware review inventory.')
if __name__=='__main__':main()
