"""Produce numbered contact sheets of current assets and their actual English meanings."""
import json, textwrap
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/image-semantic-audit'
data=json.loads((OUT/'inventory.json').read_text(encoding='utf8'))
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
small=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',13)
assets=data['assets']+data['portraits']
pages=[]
for start in range(0,len(assets),30):
    canvas=Image.new('RGB',(1500,1500),'#eef2ef'); draw=ImageDraw.Draw(canvas)
    chunk=assets[start:start+30]
    for pos,a in enumerate(chunk):
        x=(pos%6)*250;y=(pos//6)*300
        draw.rounded_rectangle((x+4,y+4,x+246,y+296),10,fill='white')
        if a['exists']:
            im=Image.open(ROOT/a['file']).convert('RGBA');im.thumbnail((175,175))
            canvas.paste(im,(x+36+(175-im.width)//2,y+12+(175-im.height)//2),im)
        draw.text((x+10,y+191),f"{start+pos+1}. {a['picture'].split('/')[-1]}",fill='#18334b',font=small)
        labels=[]
        for u in a['uses']:
            label=u['lang']+': '+u['en']
            if label not in labels:labels.append(label)
        if not labels:labels=['Mapping only: '+', '.join(u['word'] for u in a.get('mappingOnly',[]))]
        lines=textwrap.wrap(' / '.join(labels),width=29)
        for j,line in enumerate(lines[:5]):draw.text((x+10,y+213+j*16),line,fill='black',font=small)
    name=f'sheet-{start//30+1:02}.jpg';canvas.save(OUT/name,quality=92)
    pages.append({'file':name,'first':start+1,'last':start+len(chunk),'assets':[a['picture'] for a in chunk]})
(OUT/'sheets.json').write_text(json.dumps(pages,indent=2)+'\n')
print(f'{len(assets)} assets on {len(pages)} contact sheets')
