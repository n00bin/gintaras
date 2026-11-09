"""Keep rejected artwork and create a versioned replacement job; never overwrite masters."""
import argparse,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
def read(p):return json.loads(p.read_text(encoding='utf8'))
def save(p,v):p.write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
changes={
 'right':'Unwanted glow and coloured fog around the characters.',
 'when-a-question':'Unwanted glow and coloured fog around the clock and calendar.',
 'where-are-you-from':'Unwanted glow and coloured fog around the scene.',
 'no-i-m-american':'US flag has an incorrect stripe/star arrangement; use the official flag reference.',
 'i-am-a-teacher':'The board has an unintended transparent hole.',
 'two':'Unwanted glow and coloured fog around the apples.',
 'i-am-a-teacher-v2':'The dark board still has a transparency defect; replace its surface with a solid opaque light mint whiteboard.',
 'one-hundred':'Remove the decorative counting block grid, whose count can contradict the numeral. Show ONLY the exact numeral 100 in rounded amber shapes, no other objects.',
 'when-does-it-arrive':'The arrival arrow points away from the stop. It must point LEFT from the bus on the right toward the shelter on the left.'
}
parser=argparse.ArgumentParser()
parser.add_argument('--rejections',type=Path,help='JSON array of explicitly reviewed {id, reason} entries')
args=parser.parse_args()
if args.rejections:
    changes={item['id']:item['reason'] for item in read(args.rejections)}
plan=read(DIR/'lithuanian-art-jobs.json');review=read(DIR/'visual-review.json')
overrides_path=DIR/'art-job-overrides.json';overrides=read(overrides_path) if overrides_path.is_file() else {}
for old,reason in changes.items():
    job=next((j for j in plan['jobs'] if j['id']==old),None)
    if not job:continue
    version=re.search(r'-v(\d+)$',old)
    replacement=re.sub(r'-v\d+$','',old)+'-v'+str(int(version[1])+1) if version else old+'-v2'
    record_path=DIR/'lt-records'/f'{old}.json';record=read(record_path)
    record.update(status='needs_revision',replacement=replacement,revision_reason=reason);save(record_path,record)
    job['id']=replacement
    job['prompt']=record['prompt']+' CRITICAL CORRECTION: '+reason+' Use crisp flat solid-colour shapes with opaque interiors. The background must be completely transparent immediately outside each shape. NO BLOOM, NO GLOW, NO BLUR, NO FOG, NO LIGHT SPILL, NO VIGNETTE, NO HALO, NO SHADOW. Any object interiors (board, clothing, flag) must remain fully opaque. Square canvas, with generous empty transparent margins.'
    plan['mapping'][job['word']]='art-v2/'+replacement
    overrides[job['word']]={'id':replacement,'prompt':job['prompt']}
    if not any(r['id']==old for r in review.get('needs_revision',[])):
        review.setdefault('needs_revision',[]).append({'id':old,'replacement':replacement,'reason':reason})
save(DIR/'lithuanian-art-jobs.json',plan);save(DIR/'visual-review.json',review);save(overrides_path,overrides)
print('Preserved rejected masters and prepared versioned replacement jobs.')
