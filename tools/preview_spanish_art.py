"""Render a standalone six-picture Spanish style proposal without changing the app."""
import base64
import html
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs' / 'art-preview'

SCENES = r"""() => {
  CLOTH.Mariana='#8DBB7A'; CLOTH.Diego='#7FB8D6';
  MOUTH.Mariana=14; MOUTH.Diego=23;
  return [
    {id:'hola',es:'Hola',en:'Hello',draw:()=>chat('Mariana',102,284,275,{g:'waveLongArm',lips:5})+wave(206,62)},
    {id:'gracias',es:'Gracias',en:'Thank you',draw:()=>chat('me',70,262,222)+chat('Mariana',188,262,222,{flip:true})+heart(128,26,1.2)},
    {id:'tortilla',es:'tortilla',en:'Tortilla',draw:()=>
      '<ellipse cx="128" cy="198" rx="92" ry="20" class="c6 o"/>'+
      '<ellipse cx="128" cy="179" rx="79" ry="23" class="cr o"/>'+
      '<ellipse cx="128" cy="171" rx="79" ry="23" class="c8 o"/>'+
      '<path d="M52 144 C38 100 60 56 121 52 C182 42 216 79 208 123 C201 166 170 185 121 183 C81 181 59 169 52 144Z" class="c2 o"/>'+
      [[80,101,6],[117,76,5],[157,83,7],[181,119,5],[141,130,7],[92,146,6],[145,159,4],[111,110,4],[69,124,3],[173,149,4]].map(([x,y,r])=>dot(x,y,r,'cr')).join('')},
    {id:'cafe',es:'café',en:'Coffee',draw:()=>WORDS_ART.find(w=>w.lt==='kava').draw()},
    {id:'no-entiendo',es:'No entiendo',en:'I don’t understand',draw:()=>chat('me',98,278,258,{lips:1})+qm(188,72,1.1)},
    {id:'conversacion',es:'Una conversación',en:'Conversation scene',draw:()=>
      chat('Mariana',64,278,218)+chat('Diego',194,278,218,{flip:true})+
      bubble(44,48,48,22,dot(54,71,3,'c4')+dot(68,71,3,'c4')+dot(82,71,3,'c4'))+
      bubble(148,62,48,22,dot(158,85,3,'nv')+dot(172,85,3,'nv')+dot(186,85,3,'nv'))}
  ].map(w=>({id:w.id,es:w.es,en:w.en,svg:artSvg(w)}));
}"""


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 1100}, device_scale_factor=1)
        page.set_content('<html><body></body></html>')
        page.add_script_tag(path=str(ROOT / 'avatars.js'))
        page.add_script_tag(content="const TOMAS_LOOK='6.0.0.9.2.1.4.3.1'; const CAST_LOOK={Mariana:'37.0.0.15.6.2.18.4.3',Diego:'33.3.0.6.9.3.8.9.5'};")
        page.add_script_tag(path=str(ROOT / 'tools' / 'art' / 'art.js'))
        scenes = page.evaluate(SCENES)
        cards = []
        for scene in scenes:
            (OUT / (scene['id'] + '.svg')).write_text(scene['svg'], encoding='utf-8')
            uri = 'data:image/svg+xml;base64,' + base64.b64encode(scene['svg'].encode()).decode()
            cards.append(f'<article><div class="art"><img src="{uri}" alt="{html.escape(scene["en"])}"></div>'
                         f'<div class="caption"><div><h2>{html.escape(scene["es"])}</h2><p>{html.escape(scene["en"])}</p></div>'
                         f'<img class="small" src="{uri}" alt="Small-size preview"></div></article>')
        document = '''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Gintaras · Spanish illustration preview</title><style>
*{box-sizing:border-box}body{margin:0;background:#f9f5ec;color:#29382e;font-family:Arial,sans-serif}
main{max-width:1160px;margin:auto;padding:38px 32px 26px}.eyebrow{font-size:12px;font-weight:700;letter-spacing:2px;color:#756145}
h1{font-size:36px;letter-spacing:-1px;margin:10px 0}header p{max-width:760px;line-height:1.5;color:#627064;margin:0}
.swatches{display:flex;gap:8px;margin:20px 0 24px}.swatches span{width:24px;height:24px;border-radius:50%;border:1px solid #0001}
.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}article{background:white;border:1px solid #e6dfd1;border-radius:22px;padding:12px 18px 14px}
.art{display:flex;justify-content:center}.art img{width:236px;height:236px}.caption{display:flex;align-items:center;justify-content:space-between;border-top:1px solid #eee9df;padding-top:8px}
h2{font-size:20px;margin:0 0 5px}article p{font-size:13px;color:#6c756e;margin:0}.small{width:56px;height:56px}
footer{font-size:12px;color:#6c756e;line-height:1.5;margin-top:20px}footer strong{color:#394f40}
@media(max-width:760px){.grid{grid-template-columns:repeat(2,1fr)}main{padding:24px 14px}.art img{width:100%;height:auto}h1{font-size:28px}.small{width:44px;height:44px}h2{font-size:17px}}
@media(max-width:420px){.grid{grid-template-columns:1fr}}
</style><main><header><div class="eyebrow">GINTARAS / SPANISH / STYLE PROPOSAL 01</div>
<h1>A warm, shared illustration library</h1><p>Simple objects, familiar faces and small scenes. Amber, green and sky blue connect Spanish to the existing Gintaras world.</p>
<div class="swatches"><span style="background:#E89A1E"></span><span style="background:#2F6B4A"></span><span style="background:#7FB8D6"></span><span style="background:#D9644A"></span><span style="background:#FBEBCB"></span></div></header>
<section class="grid">''' + ''.join(cards) + '''</section>
<footer><strong>Review the style:</strong> Do the faces feel right? Are the scenes clear? Each card includes a 56px preview.<br>
Proposal only · Labels sit outside the artwork · Conversation scene is an illustration sample, not a new course card.<br>
Character artwork: Notionists by Zoish (CC0), rendered with the bundled DiceBear code (MIT). Objects and scenes use the existing Gintaras drawing system.</footer></main></html>'''
        target = OUT / 'spanish-style-preview.html'
        target.write_text(document, encoding='utf-8')
        page.set_content(document)
        page.locator('img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
        page.screenshot(path=str(OUT / 'spanish-style-preview.png'), full_page=True)
        print(f'Created {len(scenes)} SVG samples, standalone HTML, and PNG preview in {OUT}')
        browser.close()


if __name__ == '__main__':
    main()
