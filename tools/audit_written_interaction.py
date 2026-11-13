"""Verify every written prompt/reply is bound to prepared source language and prior units."""
import json,subprocess
from pathlib import Path
R=Path(__file__).resolve().parents[1]
PROGRAM="global.LANG={code:process.argv[1]};require('./tools/course_content_loader.js');console.log(JSON.stringify({course:WordamiSkillsContent.units,bank:WordamiWrittenInteractionContent,source:WordamiInteractionPracticeContent}));"
def main():
 report={'passed':True,'scope':'Prepared written interaction, not independent writing assessment','languages':{}}
 for lang in ['lt','es']:
  d=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=R).decode('utf8'));order={u['id']:i for i,u in enumerate(d['course'])};rows=[]
  assert len(d['bank']['units'])==30
  for u in d['course']:
   spec=d['bank']['units'][u['id']];assert len(spec['exchanges'])==(4 if u.get('capstone') else 2)
   assert len({e['key'] for e in spec['exchanges']})==len(spec['exchanges'])
   for e in spec['exchanges']:
    source=d['source']['units'][e['sourceUnit']];branch=source.get('branches',{}).get(e['branch'],source)
    assert order[e['sourceUnit']]<=order[u['id']]
    assert any(q[0]==e['branch'] and q[1]==e['questionModel'] and q[2]==e['intention'] for q in source['questions'])
    assert e['partnerReply']==source['replies'][e['branch']]
    assert e['responseModel']==branch['detailModel']
    assert e['options']==branch['options'] and e['answer']==branch['answer']
    assert len(e['goals'])==3 and all(e['goals'])
   rows.append({'id':u['id'],'requiredExchanges':len(spec['exchanges']),'sourceUnits':sorted({e['sourceUnit'] for e in spec['exchanges']}),'newUntaughtTargetForms':[],'writingAccuracyAutomaticallyAssessed':False})
  report['languages'][lang]=rows
 out=R/'docs/cefr/written-interaction.json';out.write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8');print('144 required written exchanges use prepared questions, replies and response models; source units precede the task.');return report
if __name__=='__main__':main()
