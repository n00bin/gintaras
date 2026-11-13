"""Render preserved starter objects at current review sizes; does not approve assets."""
import json
from pathlib import Path
from PIL import Image,ImageDraw,ImageFont
R=Path(__file__).resolve().parents[1]
rows=json.loads((R/'docs/art-direction/spanish-sounds-assets.json').read_text(encoding='utf8'))
sheet=Image.new('RGB',(1200,850),'#f3f5f0');d=ImageDraw.Draw(sheet);font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
for n,row in enumerate(rows):
 x=20+(n%5)*235;y=30+(n//5)*300;d.rounded_rectangle((x,y,x+220,y+270),radius=14,fill='white')
 im=Image.open(R/row['asset']).convert('RGBA');im.thumbnail((112,112));sheet.paste(im,(x+10,y+15),im)
 d.rounded_rectangle((x+144,y+40,x+208,y+104),radius=6,fill='#14264e');im=Image.open(R/row['asset']).convert('RGBA');im.thumbnail((56,56));sheet.paste(im,(x+148,y+44),im)
 d.text((x+12,y+170),row['id'],fill='#14264e',font=font)
target=R/'docs/art-direction/review-pages/spanish/starter-review.png';target.parent.mkdir(parents=True,exist_ok=True);sheet.save(target);print(target)
