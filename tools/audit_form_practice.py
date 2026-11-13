"""Check exact source bindings and explicit label/value preparation for the form activities."""
import hashlib,json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def main():
 report={'schema':1,'scope':'Prepared-source form practice, not an independent writing test','languages':{}}
 for lang in ['lt','es']:
  script="global.LANG={code:process.argv[1]};require('./tools/course_content_loader.js');console.log(JSON.stringify({units:WordamiSkillsContent.units,forms:WordamiFormContent.units,plans:WordamiLearningDesign.units}));"
  data=json.loads(subprocess.check_output(['node','-e',script,lang],cwd=R).decode('utf8'));sources={u['id']:u for u in data['units']};rows=[]
  assert set(data['forms'])=={'A1','A1-travel','A2-services'}
  for uid,spec in data['forms'].items():
   assert spec['note'] and len(spec['fields'])==3 and len(spec['teaching'])==3 and len(spec['variants'])==2
   assert [v['source'] for v in spec['variants']]==[sources[uid]['reading'],sources[uid]['listen']]
   assert spec['variants'][0]['values']!=spec['variants'][1]['values']
   for i,field in enumerate(spec['fields']):
    assert field['key'] and field['label'] and field['meaning']
    assert spec['teaching'][i]['label']==field['label'] and spec['teaching'][i]['meaning']==field['meaning']
    assert spec['teaching'][i]['example']==spec['variants'][0]['values'][i]
    assert spec['teaching'][i]['secondExample']==spec['variants'][1]['values'][i]
   for v in spec['variants']:
    assert len(v['values'])==3 and all(isinstance(s,str) and s.strip() for s in v['values'])
    assert 'forms.'+uid+'.'+v['id'] in data['plans'][uid]['outcomes']['writing']['relatedPracticeIds']
   rows.append({'unitId':uid,'forms':2,'labelsTaught':3,'valuesExplicitlyPrepared':6,'hash':hashlib.sha256(json.dumps(spec,ensure_ascii=False,sort_keys=True).encode()).hexdigest(),'sourceBinding':'current prepared reading and message','independentAssessment':False})
  report['languages'][lang]=rows
 (R/'docs/cefr/form-practice-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print('Twelve source-bound forms across six units have explicit labels, field formats, original/changed values and linked writing targets.')
 return report
if __name__=='__main__':main()
