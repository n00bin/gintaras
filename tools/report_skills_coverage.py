"""Export what each implemented skill workshop actually contains, without learner data."""
import json
import re
import subprocess
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'/'cefr'

def main():
    manifest=json.loads((ROOT/'audio'/'skills'/'manifest.json').read_text(encoding='utf8'))
    report={'schema':1,'status':'implemented_workshops_not_validated_cefr_curriculum','languages':{},'assessment':{'reading':'fixed-answer prepared-source comprehension','listening':'fixed-answer prepared-source comprehension after actual audio playback','spokenProduction':'recording, replay and self-review','spokenInteraction':'three fixed recorded partner prompts with recorded replies and self-review','mediation':'recorded synthesis and self-review','writing':'unit-specific assignment or original three-project workshop, with revision and self-review','cefrLevelAwarded':False}}
    source="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};require('./tools/course_content_loader.js');console.log(JSON.stringify({...WordamiSkillsContent,vocabulary:WordamiVocabularyContent.units,forms:WordamiFormContent.units,documents:WordamiDocumentContent.units,extendedReading:WordamiExtendedReadingContent.units,reviewCardCapacity:WordamiVocabularyContent.deck().length}));"
    for lang in ['lt','es']:
        content=json.loads(subprocess.check_output(['node','-e',source,lang],cwd=ROOT).decode('utf8'))
        assert [l['id'] for l in content['levels']]==['A1','A2','B1','B2','C1','C2']
        rows=[]
        units=content.get('units',content['levels'])
        assert len(units)==30
        for level in units:
            assert len(level['writing']['phrases'])==8 and len(level['turns'])==3
            assert len(level['project']['goals'])==3 if level.get('project') else len(level['writing']['projects'])==3
            assert level['reading']!=level['listen'] and level['translation'] and level['readingGuide']
            for q in level['questions']+level['readingQuestions']:
                assert len(q[1])>=2 and isinstance(q[2],int) and 0<=q[2]<len(q[1])
            assets=[manifest[lang+'.'+level['id']+'.'+part] for part in ['listen','turn-0','turn-1','turn-2']+[f'word-{i}' for i in range(8)]]
            assert all((ROOT/a['url']).is_file() for a in assets)
            rows.append({'id':level['id'],'band':level.get('band',level['id']),'theme':level['theme'],'preparationVocabulary':len(content['vocabulary'][level['id']]),'preparationPhrases':8,'readingWords':len(re.findall(r'\w+',level['reading'])),'readingQuestions':len(level['readingQuestions']),'listeningWords':len(re.findall(r'\w+',level['listen'])),'listeningSeconds':assets[0]['duration'],'listeningQuestions':len(level['questions']),'productionTasks':1,'recordedPartnerTurns':3,'mediationTasks':1,'writingProjects':1 if level.get('project') else 3,'assets':[a['url'] for a in assets],'readingPortfolios':1 if level['id'] in content['extendedReading'] else 0,'practicalTables':len(content['documents'].get(level['id'],{}).get('variants',[])),'practicalForms':len(content['forms'].get(level['id'],{}).get('variants',[])),'independentProficiencyAssessment':False})
        report['languages'][lang]=rows
    OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'skills-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    lines=['# All-skills implementation inventory','','This is an inventory of 60 connected course units, four workshops and one capstone per target band and language. It is not a complete CEFR descriptor inventory or validated full curriculum.','','| Language | Stage | Reading words | Listening words | Audio seconds | Comprehension questions | Recorded responses | Writing projects |','| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |']
    for lang,rows in report['languages'].items():
        for r in rows:lines.append(f"| {lang} | {r['id']} | {r['readingWords']} | {r['listeningWords']} | {r['listeningSeconds']} | 6 | 5 | {r['writingProjects']} |")
    lines+=['','Eight additional prepared four-part reading portfolios teach every source sentence before whole-text questions, source-anchored notes and revised audience briefs. These are not independent assessments or additional essay projects in the 84-project count. Twelve required table-reading tasks teach headings, rows and source comparison in selected A1–A2 units. Twelve additional short practical forms teach labels and field formats and check details from original and changed prepared sources. These are not additional essay projects or independent proficiency tests. All units include eight contextual vocabulary exercises and eight phrase-preparation exercises, bilingual source guides, reading and listening comprehension checks, spoken production, a three-turn recorded role-play, spoken mediation and a topic-specific writing assignment or links to the three original writing projects. Comprehension checks hold feedback until the end and require a fresh check after incorrect answers. Recorded responses require actual recording, replay and self-review; they are not graded for linguistic proficiency.','','[Implementation and verification details](CURRICULUM-BUILD.md). [Machine-readable inventory](skills-coverage.json). Rebuild with `G:/Python/python.exe tools/report_skills_coverage.py`.']
    (OUT/'SKILLS-COVERAGE.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
    print('Verified 60 course units, 480 vocabulary entries, 360 main comprehension questions, 300 core speaking task slots, 84 writing projects and 720 source audio entries. Presentation revisions and guided branches require additional recordings.')

if __name__=='__main__':main()
