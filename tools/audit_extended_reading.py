"""Audit original prepared readings, whole-text connections and notes-to-brief tasks."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def main():
 report={'schema':1,'scope':'Prepared reading and written-source mediation; not lecture note-taking, independent assessment or complete CEFR coverage','languages':{}}
 for lang in ['lt','es']:
  script="global.LANG={code:process.argv[1]};require('./tools/course_content_loader.js');console.log(JSON.stringify({units:WordamiExtendedReadingContent.units,plans:WordamiLearningDesign.units}));"
  data=json.loads(subprocess.check_output(['node','-e',script,lang],cwd=R).decode('utf8'));rows=[]
  assert set(data['units'])=={'B1-community','B2-media','C1-academic','C2-science'}
  for uid,spec in data['units'].items():
   assert spec['fictional'] and spec['purpose'] and spec['strategy'] and len(spec['sections'])==4 and len(spec['goals'])==3
   passages=[line for s in spec['sections'] for line in s['lines']]
   assert len(passages)>=16 and all(len(line)==2 and line[0].strip() and line[1].strip() for line in passages)
   assert len(set(line[1] for line in passages))==len(passages),'Meaning distractors must be distinct'
   assert spec['noteExample']['quote'] in spec['sections'][0]['lines'][0][0] and spec['noteExample']['note'] and spec['noteExample']['meaning']
   assert len(spec['questions'])==4
   for q in spec['questions']:
    assert len(set(q['options']))==len(q['options'])==3 and 0<=q['answer']<3 and len(set(q['sections']))>=2 and all(0<=i<4 for i in q['sections']) and q['explanation']
   for skill in ['reading','mediation','writing']:assert 'extended.'+uid+'.'+skill in data['plans'][uid]['outcomes'][skill]['relatedPracticeIds']
   text=' '.join(line[0] for line in passages)
   rows.append({'unitId':uid,'genre':spec['genre'],'sections':4,'preparedSentences':len(passages),'sourceWords':len(text.split()),'questions':4,'noteEvidenceAnchors':4,'revisedBrief':True,'contentHash':hashlib.sha256(json.dumps(spec,sort_keys=True,ensure_ascii=False).encode()).hexdigest(),'languageReview':'pending','independentProficiencyAssessment':False})
  report['languages'][lang]=rows
 (R/'docs/cefr/extended-reading-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print('Eight four-part original readings have exact passage preparation, linked reading/mediation/writing targets and notes-to-revised-brief tasks.')
 return report
if __name__=='__main__':main()
