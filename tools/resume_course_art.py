"""Inventory and record explicit visual reviews for resumable built-in generation."""
import argparse,json
from datetime import datetime,timezone
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
def read(path):return json.loads(path.read_text(encoding='utf8'))
def save(path,data):path.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
p=argparse.ArgumentParser();p.add_argument('--take',type=int,default=3);p.add_argument('--approve',nargs='+');args=p.parse_args()
review=read(DIR/'visual-review.json')
if args.approve:
    approved=set(review['approved_ids'])
    for key in args.approve:
        record=read(DIR/'lt-records'/f'{key}.json')
        assert record['status']=='exported' and (ROOT/record['asset']).is_file(),key
        approved.add(key)
    review['approved_ids']=sorted(approved);review['last_review_utc']=datetime.now(timezone.utc).isoformat()
    for item in review.get('needs_revision',[]):
        if item.get('replacement') in approved:item['resolved']=True
    save(DIR/'visual-review.json',review)
plan=read(DIR/'lithuanian-art-jobs.json');pending=[];unreviewed=[]
for job in plan['jobs']:
    path=DIR/'lt-records'/f"{job['id']}.json";record=read(path) if path.is_file() else {}
    if record.get('status')!='exported' or not (ROOT/record.get('asset','missing')).is_file():pending.append(job)
    elif job['id'] not in review['approved_ids']:unreviewed.append(job['id'])
save(DIR/'lithuanian-art-pending.json',{'jobs':pending,'unreviewed_exported_ids':unreviewed})
state=read(DIR/'migration-run.json');state.update(generation_status='in_progress',pending_course_jobs=len(pending),visually_reviewed_assets=len(review['approved_ids']),last_checkpoint_utc=datetime.now(timezone.utc).isoformat())
for key in ['quota_reset_utc','quota_reset_local','stop_reason']:state.pop(key,None)
state['deployment']='Partial artwork and Units 1–3 activities live in 3.114; new artwork remains local until reviewed.'
save(DIR/'migration-run.json',state)
print(json.dumps({'pending':len(pending),'unreviewed':unreviewed,'jobs':pending[:args.take]},ensure_ascii=False))
