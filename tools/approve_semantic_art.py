"""Record specific, already-performed assistant visual reviews, including file hashes."""
import argparse,hashlib,json
from pathlib import Path
from datetime import datetime,timezone
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
p=argparse.ArgumentParser();p.add_argument('ids',nargs='+');p.add_argument('--reason',required=True);p.add_argument('--reject',action='store_true');args=p.parse_args()
findings={f['asset'] for f in json.loads((DIR/'semantic-audit-findings.json').read_text(encoding='utf8'))['findings']}
for key in args.ids:
    file=DIR/'semantic-records'/f'{key}.json';r=json.loads(file.read_text(encoding='utf8'))
    assert r['status']=='exported',key
    if args.reject:
        r.update(review_status='needs-revision',replacement=key+'-v2',revision_reason=args.reason)
        file.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf8');continue
    assert r.get('review_status')!='needs-revision',key
    if not r.get('finding') and key.removeprefix('semantic-') in findings:r['finding']=key.removeprefix('semantic-')
    r.update(review_status='approved',reviewer='assistant visual review',review_reason=args.reason,
             reviewed_utc=datetime.now(timezone.utc).isoformat(),reviewed_sha256=hashlib.sha256((ROOT/r['asset']).read_bytes()).hexdigest())
    file.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'Recorded explicit review for {len(args.ids)} assets.')
