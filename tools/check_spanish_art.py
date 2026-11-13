"""Check the Spanish starter art in lesson cards, including fallback and offline reload."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='chrome', headless=True)
            context = browser.new_context(viewport={'width': 390, 'height': 844})
            page = context.new_page()
            errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','es');")
            page.goto(url + '?preview=1')
            page.wait_for_function("window.gintarasReady && typeof picFor==='function'")
            page.locator('#splash').wait_for(state='detached')
            page.evaluate("S.sound=false;S.welcomed=true;S.toured=true;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;startLesson(COURSE[0].lessons[0]);")
            page.evaluate("Q.queue=[{type:'intro',item:ITEMS.find(i=>i.lt==='jirafa')}];Q.idx=0;drawStep();")
            page.locator('#stage .picbox.ok img').wait_for()
            assert page.locator('#stage img[src="pics/art-v2/giraffe.webp"]').count() == 1
            output = ROOT / 'docs' / 'art-direction'
            page.screenshot(path=str(output / 'spanish-first-lesson-mobile.png'))

            # Exercise the actual shared picture renderer for every item in the unit.
            rows = page.evaluate("""() => COURSE[0].lessons.filter(l=>!l.speak).flatMap(l=>l.items).map(i=>({word:i.lt,path:picFile(picFor(i.lt)),markup:picHtml(i.lt,'big')}))""")
            assert len(rows) == 10
            for row in rows:
                with Image.open(ROOT / row['path']) as im:
                    im.load()
                    assert im.size == (512, 512), row['path']
                    assert im.mode == 'RGBA' and im.getchannel('A').getextrema()[0] == 0, row['path']

            page.evaluate("""rows=>{document.head.appendChild(document.querySelector('body>style').cloneNode(true));document.body.style.overflow='auto';document.body.innerHTML='<main style="display:grid;grid-template-columns:repeat(2,1fr);gap:16px;padding:20px">'+rows.map(r=>'<article style="text-align:center;padding:12px;background:white;border-radius:18px">'+r.markup+'<p>'+r.word+'</p></article>').join('')+'</main>';}""", rows)
            page.wait_for_function("[...document.querySelectorAll('.picbox')].every(p=>p.classList.contains('ok'))")
            assert page.locator('.picbox.ok').count() == 10
            page.screenshot(path=str(output / 'spanish-sounds-gallery-mobile.png'), full_page=True)

            # A failed custom image leaves its emoji visible instead of a broken-image icon.
            page.evaluate("document.body.innerHTML=picHtml('jirafa','big').replace('giraffe.webp','missing-fallback-check.webp')")
            page.wait_for_function("document.querySelector('.picbox') && !document.querySelector('.picbox img')")
            assert page.locator('.pic-e').is_visible()
            assert page.locator('.pic-e').inner_text()

            # Reload under the real service worker, save all ten pictures, then reload offline.
            page.goto(url)
            page.evaluate("navigator.serviceWorker.ready")
            page.reload()
            page.wait_for_function('!!navigator.serviceWorker.controller')
            paths = [row['path'] for row in rows]
            page.evaluate("paths=>Promise.all(paths.map(p=>fetch(p).then(r=>{if(!r.ok)throw Error(p)})))", paths)
            page.wait_for_function("""async paths=>{const c=await caches.open('gintaras-pics-v1');return (await Promise.all(paths.map(p=>c.match(new URL(p,location.href).href)))).every(Boolean)}""", arg=paths)
            context.set_offline(True)
            page.reload()
            page.wait_for_function("typeof picFor==='function' && LANG.code==='es'")
            page.evaluate("""rows=>{document.body.innerHTML=rows.map(r=>r.markup).join('')}""", rows)
            page.wait_for_function("document.querySelectorAll('.picbox.ok').length===10")
            assert not errors, errors
            print(json.dumps({'illustrations': len(rows), 'mobile_lesson': 'passed', 'fallback': 'passed', 'offline_reload': 'passed', 'page_errors': errors}))
            browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
