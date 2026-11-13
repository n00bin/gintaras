"""Reuse an explicitly reviewed scene for another meaning only with an operator-supplied rationale."""
import argparse,json,subprocess,sys
from pathlib import Path
R=Path(__file__).resolve().parents[1];D=R/'docs/art-direction'
p=argparse.ArgumentParser();p.add_argument('target');p.add_argument('source');p.add_argument('--reason',required=True);args=p.parse_args()
plan=json.loads((D/'lithuanian-art-jobs.json').read_text(encoding='utf8'));job=next(j for j in plan['jobs'] if j['id']==args.target)
approved=json.loads((D/'visual-review.json').read_text(encoding='utf8'))['approved_ids'];assert args.source in approved
record=json.loads((D/'lt-records'/f'{args.source}.json').read_text(encoding='utf8'));assert record['status']=='exported'
target=D/'lt-records'/f'{args.target}.json';assert not target.exists(),'Use a new version instead of overwriting a record'
out={**job,'prompt':record['prompt'],'requested_prompt':job['prompt'],'source':str(R/record['master']),'references':record.get('references',[]),'semantic_reuse':{'source_id':args.source,'reason':args.reason}}
target.write_text(json.dumps(out,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
subprocess.run([sys.executable,str(R/'tools/export_course_art.py'),str(target)],check=True)
