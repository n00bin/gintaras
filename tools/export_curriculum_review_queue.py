"""Prepare exact-version editorial assignments. Never creates or imports an approval."""
import json
from datetime import datetime,timezone
from pathlib import Path
R=Path(__file__).resolve().parents[1];OUT=R/'docs/cefr/review'
def main():
 audit=json.loads((R/'docs/cefr/curriculum-audit.json').read_text(encoding='utf8'))
 assert audit['structurePassed'],'Resolve structural errors before assigning editorial review'
 queue={'schema':1,'createdAt':datetime.now(timezone.utc).isoformat(),'build':audit['localBuild'],'scope':'Editorial tasks, not approval records or learner proficiency evidence','tasks':[]}
 blank={}
 for lang,units in audit['languages'].items():
  for unit in units:
   key=lang+'.'+unit['id'];digest=unit['contentHash']
   blank[key]={kind:{'status':'pending','contentHash':digest,'reviewer':'','date':'','notes':''} for kind in ['language','descriptors']}
   queue['tasks'].append({'key':key,'language':lang,'unitId':unit['id'],'theme':unit['theme'],'bandTarget':unit['band'],'contentHash':digest,'sourceBook':'docs/cefr/review/'+lang+'.md','grammarBook':'docs/cefr/review/grammar-'+lang+'.md','sourceFormsForTriage':unit['sourceFormsBeyondExplicitPreparation'],'languageReview':'pending','descriptorReview':'pending','languageQuestions':['Check the source text, English guide, accepted forms and answer feedback for accuracy and natural register.','Listen to the linked recordings and check wording, pronunciation and clarity.','Verify that the connected lesson actually prepares each assessed form and meaning; triage items are prompts for judgement, not automatic errors.','Check practical form labels/values and table headings against their exact sources where present.'],'designQuestions':['Assess each task against the named scale and target band, using the actual language and discourse demands.','Check scaffolding, task validity and what a correct answer demonstrates; flag answers that can be found without the intended reading/listening.','Identify missing task types, domains, strategies, genres and repeated transfer; selected examples do not establish full coverage.'],'decisions':{'language':None,'descriptors':None}})
 OUT.mkdir(parents=True,exist_ok=True)
 (OUT/'review-queue.json').write_text(json.dumps(queue,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 (OUT/'pending-review-records.json').write_text(json.dumps(blank,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
 print(f'Prepared {len(queue["tasks"])} exact-version editorial tasks and pending-only records; no approvals or active review records were written.')
if __name__=='__main__':main()
