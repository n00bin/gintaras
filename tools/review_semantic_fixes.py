"""Make 112px/56px light/dark review sheets; does not approve their contents."""
import json,sys
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/'docs/art-direction/semantic-records'
OUT=ROOT/'output/semantic-fixes';OUT.mkdir(exist_ok=True,parents=True)
records=[json.loads(p.read_text(encoding='utf8')) for p in sorted(DIR.glob('*.json'))]
records=[r for r in records if r.get('status')=='exported' and r.get('review_status')!='needs-revision']
if '--unreviewed' in sys.argv:records=[r for r in records if r.get('review_status')!='approved']
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',14)
pages=[]
for start in range(0,len(records),16):
    chunk=records[start:start+16]
    sheet=Image.new('RGB',(1200,960),'#eff3ee');draw=ImageDraw.Draw(sheet)
    for pos,r in enumerate(chunk):
        x=(pos%4)*300;y=(pos//4)*240
        draw.rounded_rectangle((x+4,y+4,x+296,y+236),12,fill='white')
        draw.rounded_rectangle((x+164,y+32,x+284,y+152),8,fill='#14264e')
        src=Image.open(ROOT/r['asset']).convert('RGBA')
        for dx,dy,size in [(x+28,y+32,112),(x+196,y+64,56)]:
            im=src.copy();im.thumbnail((size,size));sheet.paste(im,(dx+(size-im.width)//2,dy+(size-im.height)//2),im)
        draw.text((x+13,y+173),r['id'],font=font,fill='#14264e')
        draw.text((x+13,y+200),r.get('review_status','unreviewed'),font=font,fill='#456359')
    name=f'review-{start//16+1:02}.png';sheet.save(OUT/name)
    pages.append({'file':name,'ids':[r['id'] for r in chunk]})
(OUT/'review-index.json').write_text(json.dumps(pages,indent=2)+'\n')
print(f'{len(records)} assets on {len(pages)} review sheets.')
