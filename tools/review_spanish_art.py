"""Render unreviewed Spanish exports, or record explicit approval after visual inspection."""
import argparse,json
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1];A=R/'docs/art-direction'
p=argparse.ArgumentParser();p.add_argument('--approve',nargs='*',default=[]);args=p.parse_args()
review=json.loads((A/'visual-review.json').read_text(encoding='utf8'));approved=set(review['approved_ids'])
records={q.stem:json.loads(q.read_text(encoding='utf8')) for q in (A/'es-records').glob('*.json')}
registry=R/'docs/spanish/generated-art-approved.json'
data=json.loads(registry.read_text(encoding='utf8')) if registry.exists() else {'status':'visually_reviewed_exports','mappings':[]}
for key in args.approve:
 row=records[key];assert row['status']=='exported' and (R/row['asset']).is_file()
 if key not in approved:
  approved.add(key);data['mappings'].append({'word':row['word'],'en':row['en'],'asset':'art-v2/'+key,'record':'docs/art-direction/es-records/'+key+'.json','reason':'Original Spanish scene inspected at 112px and 56px on light and dark backgrounds.'})
if args.approve:
 review['approved_ids']=sorted(approved);(A/'visual-review.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf8');registry.write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
rows=[r for key,r in records.items() if key not in approved and r.get('status')=='exported']
dest=A/'review-pages/spanish';dest.mkdir(parents=True,exist_ok=True)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16);small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',12)
for start in range(0,len(rows),12):
 sheet=Image.new('RGB',(1200,1100),'#f3f5f0');d=ImageDraw.Draw(sheet);d.text((24,18),'Spanish artwork: 112px light / 56px dark',fill='#14264e',font=font)
 for n,row in enumerate(rows[start:start+12]):
  x=24+(n%4)*294;y=60+(n//4)*330;d.rounded_rectangle((x,y,x+276,y+310),radius=16,fill='white')
  im=Image.open(R/row['asset']).convert('RGBA');im.thumbnail((112,112));sheet.paste(im,(x+20,y+16),im)
  d.rounded_rectangle((x+169,y+44,x+233,y+108),radius=8,fill='#14264e');im=Image.open(R/row['asset']).convert('RGBA');im.thumbnail((56,56));sheet.paste(im,(x+173,y+48),im)
  d.text((x+12,y+154),row['word'],fill='#14264e',font=font);d.text((x+12,y+186),row['en'],fill='#14264e',font=small);d.text((x+12,y+218),row['id'],fill='#52625f',font=small)
 target=dest/f'review-{start//12+1:03}.png';sheet.save(target)
print(json.dumps({'approvedTotal':len(data['mappings']),'unreviewed':[r['id'] for r in rows],'pages':(len(rows)+11)//12}))
