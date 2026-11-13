"""Render the existing cast locally as identity references, without starting the app or network."""
import base64
import html
import json
import unicodedata
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/art-direction/cast-identity-references'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    app = (ROOT / 'index.html').read_text(encoding='utf-8')
    faces = app[app.index('const FACE_BG='):app.index('const castFace=')]
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 1000})
        page.set_content('<style>.face{display:block;border-radius:50%;overflow:hidden;width:256px;height:256px}.face svg{width:100%;height:100%}</style><div id="portrait" style="width:256px;height:256px;background:white"></div>')
        page.add_script_tag(path=str(ROOT / 'avatars.js'))
        page.add_script_tag(content='function esc(s){return s};function norm(s){return s.toLowerCase().trim()};')
        page.add_script_tag(path=str(ROOT / 'lang/lt.js'))
        page.add_script_tag(content=faces)
        people = page.evaluate("[...new Set(CONVS.flatMap(c=>c.cast.map(p=>p.name)))].map(name=>({name,markup:faceHtml(CAST_LOOK[name],name,256,name)}))")
        cards = []
        for person in people:
            slug = ''.join(c for c in unicodedata.normalize('NFD', person['name'].lower()) if c.isascii() and c.isalpha())
            person['id'] = slug
            person['file'] = (OUT / (slug + '.png')).relative_to(ROOT).as_posix()
            page.locator('#portrait').evaluate('(el,markup)=>el.innerHTML=markup', person.pop('markup'))
            page.locator('#portrait').screenshot(path=str(ROOT / person['file']))
            uri = 'data:image/png;base64,' + base64.b64encode((ROOT / person['file']).read_bytes()).decode()
            cards.append('<figure><img src="'+uri+'"><figcaption>'+html.escape(person['name'])+'</figcaption></figure>')
        (OUT / 'index.json').write_text(json.dumps(people, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
        document = '<!doctype html><meta charset="utf-8"><style>body{font:16px system-ui;background:#f3f5f0;padding:20px}.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}figure{margin:0;background:white;text-align:center;border-radius:18px;padding:12px}img{width:170px;height:170px}</style><h1>Live cast: identity references only</h1><div class="grid">'+''.join(cards)+'</div>'
        (OUT / 'index.html').write_text(document, encoding='utf-8')
        page.set_content(document)
        page.screenshot(path=str(OUT / 'cast-contact-sheet.png'), full_page=True)
        print(json.dumps(people, ensure_ascii=False))
        browser.close()


if __name__ == '__main__':
    main()
