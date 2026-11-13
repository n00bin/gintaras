"""Audit prepared table sources, heading preparation, choices and linked reading targets."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def main():
 report={'schema':1,'scope':'Selected practical table reading; no complete scale or proficiency claim','languages':{}}
 for lang in ['lt','es']:
  script="global.LANG={code:process.argv[1]};require('./tools/course_content_loader.js');console.log(JSON.stringify({documents:WordamiDocumentContent.units,forms:WordamiFormContent.units,plans:WordamiLearningDesign.units}));"
  data=json.loads(subprocess.check_output(['node','-e',script,lang],cwd=R).decode('utf8'));rows=[]
  assert set(data['documents'])==set(data['forms'])=={'A1','A1-travel','A2-services'}
  for uid,spec in data['documents'].items():
   forms=data['forms'][uid]
   assert len(spec['teaching'])==3 and spec['fields']==forms['fields']
   assert [r['source'] for r in spec['rows']]==[v['source'] for v in forms['variants']]
   assert [r['values'] for r in spec['rows']]==[v['values'] for v in forms['variants']]
   assert [v['layout'] for v in spec['variants']]==['rows','columns']
   for v in spec['variants']:
    assert len(v['questions'])==3
    assert 'documents.'+uid+'.'+v['id'] in data['plans'][uid]['outcomes']['reading']['relatedPracticeIds']
    for q in v['questions']:assert len(set(q['choices']))==len(q['choices'])>=2 and q['answer'] in q['choices'] and q['explanation']
   rows.append({'unitId':uid,'tasks':2,'questions':6,'preparedFields':3,'sourceHash':hashlib.sha256(json.dumps(spec,ensure_ascii=False,sort_keys=True).encode()).hexdigest()})
  report['languages'][lang]=rows
 (R/'docs/cefr/document-reading-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print('Twelve practical table tasks have prepared headings, exact source bindings, distinct answer choices and reading targets.')
 return report
if __name__=='__main__':main()
