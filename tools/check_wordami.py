"""Verify Wordami's branding, Ami interactions, progress compatibility and offline use."""
import http.server
import json
import re
import threading
from functools import partial
from pathlib import Path

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/wordami'
POSES = ['welcome', 'happy', 'cheer', 'think', 'rest', 'encourage', 'listen', 'speak']

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def ready(page):
    page.wait_for_function('window.gintarasReady === true')
    page.locator('#splash').wait_for(state='detached')

def main():
    report = {'poses': {}, 'languages': {}, 'page_errors': []}
    for pose in POSES:
        path = ROOT / f'pics/ami/{pose}.webp'
        with Image.open(path) as im:
            im.load()
            assert im.size == (512, 512) and im.mode == 'RGBA'
            assert im.getchannel('A').getextrema() == (0, 255), pose
            report['poses'][pose] = {'size': list(im.size), 'transparent': True, 'bytes': path.stat().st_size}
    manifest = json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
    assert manifest['short_name'] == 'Wordami'
    assert manifest['id'] == manifest['start_url'] == manifest['scope'] == './'
    for icon in manifest['icons']:
        with Image.open(ROOT/icon['src']) as im:
            assert f'{im.width}x{im.height}' == icon['sizes']
    report['install_identity'] = 'preserved; all icon exports decode'
    html = (ROOT/'index.html').read_text(encoding='utf-8')
    release = re.search(r'const APP_VERSION=(\d+);', html)[1]
    assert f'gintaras-shell-v{release}' in (ROOT/'sw.js').read_text(encoding='utf-8')
    assert "const KEY=LANG_CODE==='lt'?'gintaras.v2':'gintaras.v2.'+LANG_CODE;" in html
    assert "const SHARED_KEY='gintaras.shared';" in html
    assert 'https://n00bin.github.io/gintaras/' in html

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='chrome', headless=True)
            context = browser.new_context(viewport={'width':390,'height':844}, device_scale_factor=1)
            context.add_init_script("localStorage.setItem('gintaras.preview','1');")
            page = context.new_page()
            page.on('pageerror', lambda e: report['page_errors'].append(str(e)))
            page.goto(url)
            ready(page)
            assert page.title() == 'Wordami · Learn Languages'
            assert page.locator('header .brand h1').inner_text() == 'Wordami'
            page.wait_for_function("document.querySelector('#welcome [data-ami=welcome] img').naturalWidth > 0")
            page.screenshot(animations='disabled',path=str(OUT/'welcome-mobile.png'))
            # Load an existing-format learning record, then reopen it under the new brand.
            page.evaluate("""() => {S.sound=false;S.welcomed=true;S.toured=true;S.signinAsked=true;S.seenVersion=APP_VERSION;S.xp=173;S.me=Object.assign({},S.me,{name:'Alex'});const r=rec(ITEMS[0].id);r.seen=true;r.lvl=2;save();}""")
            page.reload()
            ready(page)
            assert page.evaluate('S.xp') == 173
            assert page.evaluate('S.me.name') == 'Alex'
            assert page.evaluate('rec(ITEMS[0].id).lvl') == 2
            assert page.evaluate("localStorage.getItem('gintaras.v2') !== null")
            report['progress_reload'] = 'existing-format XP, name and word level preserved'
            page.screenshot(animations='disabled',path=str(OUT/'home-mobile.png'))

            def exercise(kind):
                page.evaluate("""kind=>{stopAutoNext();stopAllAudio();const r=rec(ITEMS[0].id);r.seen=true;r.intro=1;r.lvl=2;delete r.prodD;startLesson(COURSE[0].lessons.find(l=>!l.speak));Q.queue=[{type:kind,item:ITEMS[0]}];Q.idx=0;Q.__rdk=-1;drawStep();}""", kind)

            for code in ['lt','es']:
                if page.evaluate('LANG.code') != code:
                    page.evaluate('code=>pickLang(code)',code)
                    page.wait_for_function('code=>window.gintarasReady && LANG.code===code',arg=code)
                    ready(page)
                page.evaluate("S.sound=false;S.welcomed=true;S.toured=true;S.signinAsked=true;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;rec(ITEMS[0].id).seen=true;save();")
                exercise('listen')
                assert page.locator('#stage [data-ami=listen]').count() == 1
                page.wait_for_function("document.querySelector('#stage [data-ami=listen] img').naturalWidth>0")
                page.screenshot(animations='disabled',path=str(OUT/f'{code}-listening-mobile.png'))
                exercise('speak')
                assert page.locator('#stage [data-ami=speak]').count() == 1
                page.wait_for_function("document.querySelector('#stage [data-ami=speak] img').naturalWidth>0")
                page.screenshot(animations='disabled',path=str(OUT/f'{code}-speaking-mobile.png'))
                exercise('mc_lt_en')
                page.locator('#stage .opt[data-ok="1"]').click()
                page.wait_for_function('Date.now()-Math.max(Q.shownAt||0,Q.footAt||0)>=750')
                page.locator('#btn-check').click()
                page.evaluate('stopAutoNext()')
                if page.locator('#fb-m [data-ami=cheer],#fb-m [data-ami=happy]').count() != 1:
                    page.screenshot(animations='disabled',path=str(OUT/'feedback-debug.png'))
                    raise AssertionError(page.evaluate("({foot:document.querySelector('#foot').innerHTML,type:Q&&Q.queue[Q.idx].type,answer:Q&&Q.answer&&Q.answer.lt})"))
                exercise('mc_lt_en')
                page.locator('#stage .opt:not([data-ok])').first.click()
                page.wait_for_function('Date.now()-Math.max(Q.shownAt||0,Q.footAt||0)>=750')
                page.locator('#btn-check').click()
                page.evaluate('stopAutoNext()')
                assert page.locator('#fb-m [data-ami=encourage]').count() == 1
                page.wait_for_function("document.querySelector('#fb-m img').naturalWidth>0")
                page.screenshot(animations='disabled',path=str(OUT/f'{code}-retry-mobile.png'))
                report['languages'][code] = 'listening, speaking choice and real correct/wrong answer callbacks passed'
                page.evaluate("quit();document.querySelector('#welcome').hidden=true;")

            # Verify all assets through the shared production renderer, including its safe default.
            page.evaluate("poses=>{const box=document.createElement('div');box.id='ami-check';box.innerHTML=poses.map(p=>mascot(p)).join('')+mascot('unknown');document.body.appendChild(box)}",POSES)
            page.wait_for_function("[...document.querySelectorAll('#ami-check img')].every(i=>i.complete&&i.naturalWidth>0)")
            assert page.locator('#ami-check [data-ami=happy]').count() == 2
            page.evaluate("document.querySelector('#ami-check img').src='pics/ami/intentionally-missing.webp'")
            page.wait_for_function("document.querySelector('#ami-check img').src.endsWith('wordami-icon-512.png') && document.querySelector('#ami-check img').naturalWidth>0")
            report['missing_asset_fallback'] = 'local parrot icon loads'
            page.evaluate("document.querySelector('#ami-check').remove()")
            # Every pose must already be in the PICS cache, even before it is individually shown.
            page.evaluate('navigator.serviceWorker.ready')
            page.reload()
            ready(page)
            page.wait_for_function('!!navigator.serviceWorker.controller')
            page.wait_for_function("""async poses=>{const c=await caches.open('gintaras-pics-v1');return(await Promise.all(poses.map(p=>c.match(new URL('pics/ami/'+p+'.webp',location.href).href)))).every(Boolean)}""",arg=POSES)
            context.set_offline(True)
            page.reload()
            ready(page)
            page.evaluate("poses=>{document.body.insertAdjacentHTML('beforeend','<div id=ami-offline>'+poses.map(p=>mascot(p)).join('')+'</div>')}",POSES)
            page.wait_for_function("[...document.querySelectorAll('#ami-offline img')].length===8 && [...document.querySelectorAll('#ami-offline img')].every(i=>i.complete&&i.naturalWidth>0&&i.currentSrc.endsWith('.webp'))")
            report['offline'] = 'all eight real WebP poses render after offline app reload'
            context.set_offline(False)
            assert not report['page_errors'],report['page_errors']

            review = browser.new_page(viewport={'width':1440,'height':1000})
            review.goto(url+'docs/wordami/gallery.html')
            review.wait_for_function('[...document.images].every(i=>i.complete&&i.naturalWidth>0)')
            review.screenshot(animations='disabled',path=str(OUT/'gallery-desktop.png'),full_page=True)
            review.set_viewport_size({'width':390,'height':844})
            review.screenshot(animations='disabled',path=str(OUT/'gallery-mobile.png'),full_page=True)
            review.set_viewport_size({'width':1200,'height':630})
            review.goto(url+'docs/wordami/sharing-card.html')
            review.evaluate('document.fonts.ready')
            review.wait_for_function('document.images[0].complete&&document.images[0].naturalWidth>0')
            review.screenshot(animations='disabled',path=str(ROOT/'wordami-og.png'))
            report['sharing_card'] = '1200x630 rendered with actual Ami artwork'
            browser.close()
    finally:
        server.shutdown()
        server.server_close()
    (OUT/'verification.json').write_text(json.dumps(report,indent=2)+'\n',encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False))

if __name__ == '__main__':
    main()
