"""Verify approved Lithuanian illustrations in real cards, fallbacks and offline reload.

Use --require-complete before publishing the full migration. Builds a review gallery too.
"""
import html
import http.server
import json
import sys
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/art-direction'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    status = json.loads((OUT / 'lithuanian-art-status.json').read_text(encoding='utf-8'))
    if '--require-complete' in sys.argv and not status['complete']:
        raise ValueError(f'Migration incomplete: {status["mapped"]}/{status["total"]}')
    if '--require-complete' in sys.argv and status.get('portraits') != status.get('portraits_total'):
        raise ValueError('Conversation portrait migration is incomplete')
    if '--require-complete' in sys.argv and not status.get('learner_portrait'):
        raise ValueError('Default learner portrait is incomplete')
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
            page.add_init_script("localStorage.setItem('gintaras.lang','lt');")
            page.goto(url)
            page.wait_for_function("window.gintarasReady && typeof picFor==='function'")
            page.locator('#splash').wait_for(state='detached')
            rows = page.evaluate("""() => Object.entries(PICTURE_ASSETS).map(([word,asset])=>({word,en:ITEMS.find(i=>i.lt===word).en,path:picFile(asset),markup:picHtml(word,'big')}))""")
            portraits = page.evaluate("""() => Object.entries(CAST_PICTURES).map(([name,asset])=>({word:name,en:'Conversation character',path:picFile(asset),markup:castFace({name},64)}))""")
            if status.get('learner_portrait'):
                portraits += page.evaluate("[{word:'Tomas',en:'Default learner portrait',path:picFile(LEARNER_PICTURE),markup:myFace(64)}]")
                assert page.evaluate("(()=>{const look=S.look;try{S.look=TOMAS_LOOK;return !myFace(64).includes('cast-art')}finally{S.look=look}})()"), 'A customized player avatar must retain its chosen look'
            assert len(rows) == status['mapped']
            if '--require-complete' in sys.argv:
                remaining = page.evaluate("ITEMS.filter(i=>{const p=picFor(i.lt);return p && p[0]!=='#' && !p.startsWith('art-v2/')}).map(i=>i.lt)")
                assert not remaining, ('Legacy course pictures remain', remaining)
            for row in rows + portraits:
                with Image.open(ROOT / row['path']) as im:
                    im.load()
                    assert im.size == (512, 512) and im.mode == 'RGBA', row['path']
                    assert im.getchannel('A').getextrema()[0] == 0, row['path']
            first = page.evaluate("ITEMS.find(i=>PICTURE_ASSETS[i.lt]).lt")
            page.evaluate("""word=>{S.sound=false;S.welcomed=true;S.toured=true;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;const it=ITEMS.find(i=>i.lt===word);startLesson(it.lesson);Q.queue=[{type:'intro',item:it}];Q.idx=0;drawStep();}""", first)
            page.locator('#stage .picbox.ok img').wait_for()
            page.screenshot(path=str(OUT / 'lt-first-lesson-mobile.png'))

            # Leave the app's DOM intact while its reminder and loading timers run.
            page.evaluate("rows=>document.body.insertAdjacentHTML('beforeend','<div id=\"art-test\" style=\"position:fixed;inset:0;z-index:999999;background:white;overflow:auto\">'+rows.map(r=>r.markup).join('')+'</div>')", rows)
            page.wait_for_function("n=>document.querySelectorAll('#art-test .picbox.ok img').length===n", arg=len(rows))
            assert page.locator('#art-test .picbox.ok img').evaluate_all('(imgs)=>imgs.every(i=>i.naturalWidth===512)')
            if portraits:
                page.evaluate("rows=>document.querySelector('#art-test').insertAdjacentHTML('beforeend', rows.map(r=>r.markup).join(''))", portraits)
                page.wait_for_function("n=>document.querySelectorAll('#art-test .cast-art.ok').length===n", arg=len(portraits))
                assert page.locator('#art-test .cast-art.ok .cast-fallback').evaluate_all("els=>els.every(el=>getComputedStyle(el).visibility==='hidden')")
                expected = page.evaluate("CONVS.flatMap(c=>castPictureFiles(c)).concat(LEARNER_PICTURE?[absUrl(picFile(LEARNER_PICTURE))]:[])")
                available = page.evaluate('offlineFiles()')
                assert all(file in available for file in expected)

            fallback = page.evaluate("ITEMS.find(i=>PICTURE_ASSETS[i.lt] && !NO_PIC.has(i.lt)).lt")
            page.evaluate("word=>{document.querySelector('#art-test').innerHTML=picHtml(word,'big').replace(/pics\\/art-v2\\/[^\"]+/, 'pics/art-v2/missing-fallback-check.webp')}", fallback)
            page.wait_for_function("document.querySelector('#art-test .picbox') && !document.querySelector('#art-test .picbox img')")
            assert page.locator('#art-test .pic-e').is_visible()
            assert page.locator('#art-test .pic-e').inner_text()

            page.goto(url)
            page.evaluate('navigator.serviceWorker.ready')
            page.reload()
            page.wait_for_function('!!navigator.serviceWorker.controller')
            paths = sorted(set(row['path'] for row in rows + portraits))
            page.evaluate("paths=>Promise.all(paths.map(p=>fetch(p).then(r=>{if(!r.ok)throw Error(p)})))", paths)
            page.wait_for_function("""async paths=>{const c=await caches.open('gintaras-pics-v1');return (await Promise.all(paths.map(p=>c.match(new URL(p,location.href).href)))).every(Boolean)}""", arg=paths)
            context.set_offline(True)
            page.reload()
            page.wait_for_function("window.gintarasReady && LANG.code==='lt'")
            page.evaluate("rows=>document.body.insertAdjacentHTML('beforeend','<div id=\"art-test\">'+rows.map(r=>r.markup).join('')+'</div>')", rows)
            page.wait_for_function("n=>document.querySelectorAll('#art-test .picbox.ok img').length===n", arg=len(rows))
            if portraits:
                page.evaluate("rows=>document.querySelector('#art-test').insertAdjacentHTML('beforeend',rows.map(r=>r.markup).join(''))", portraits)
                page.wait_for_function("n=>document.querySelectorAll('#art-test .cast-art.ok').length===n", arg=len(portraits))
            assert not errors, errors
            context.set_offline(False)

            cards = ''.join('<figure><div class="images"><img src="../../'+r['path']+'" alt=""><img class="small" src="../../'+r['path']+'" alt=""></div><figcaption><strong>'+html.escape(r['word'])+'</strong><span>'+html.escape(r['en'])+'</span></figcaption></figure>' for r in rows + portraits)
            document = '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gintaras Lithuanian art review</title><style>*{box-sizing:border-box}body{margin:0;background:#F3F5F0;color:#14264E;font:15px system-ui}main{max-width:1200px;margin:auto;padding:24px}h1{margin:0 0 8px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}figure{margin:0;padding:16px;background:white;border-radius:20px}.images{display:flex;align-items:center;justify-content:center;gap:10px}.images img{width:140px;height:140px;object-fit:contain}.images .small{width:56px;height:56px}figcaption{margin-top:12px}figcaption span{display:block;font-size:12px;color:#5F6F66;margin-top:4px}</style><main><h1>Lithuanian illustration review</h1><p>'+str(len(rows))+' of '+str(status['total'])+' picture mappings · approved rounded cartoon style · large and 56px previews</p><section class="grid">'+cards+'</section></main></html>'
            (OUT / 'lithuanian-gallery.html').write_text(document, encoding='utf-8')
            page.goto(url + 'docs/art-direction/lithuanian-gallery.html')
            page.locator('img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
            page.set_viewport_size({'width': 1200, 'height': 960})
            page.screenshot(path=str(OUT / 'lt-gallery-preview.png'))
            assert not errors, errors
            print(json.dumps({'mapped': len(rows), 'portraits': len(portraits), 'total': status['total'], 'complete': status['complete'], 'mobile_lesson': 'passed', 'all_images_decoded': 'passed', 'fallback': 'passed', 'offline_reload': 'passed', 'page_errors': errors}))
            browser.close()
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
