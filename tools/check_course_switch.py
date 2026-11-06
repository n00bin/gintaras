"""Check the header flag chooser, keyboard dismissal, mobile fit and per-language progress."""
import http.server
import json
import threading
from pathlib import Path
from functools import partial
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass

def ready(page):
    page.wait_for_function('window.gintarasReady')
    page.locator('#splash').wait_for(state='detached')
    page.evaluate("S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.sound=false;S.seenVersion=APP_VERSION;save();document.querySelector('#welcome').hidden=true;")

def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(channel='chrome',headless=True)
            context=browser.new_context(viewport={'width':390,'height':844})
            page=context.new_page(); errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url);ready(page)
            assert page.locator('#course-flag-image').get_attribute('src')=='pics/1f1f1-1f1f9.svg'
            assert page.locator('#lang-select').count()==0
            page.locator('#btn-course-language').click()
            assert page.locator('#course-picker').is_visible()
            assert page.locator('[data-course-language="es"]').is_disabled()
            page.keyboard.press('Escape')
            assert not page.locator('#course-picker').is_visible()
            assert page.locator('#btn-course-language').evaluate('(b)=>b===document.activeElement')
            # Preview unlocks Spanish, then switching saves and restores the distinct progress records.
            page.goto(url+'?preview=1&lang=lt');ready(page)
            page.evaluate("S.xp=321;save();")
            page.locator('#btn-course-language').click()
            with page.expect_navigation():page.locator('[data-course-language="es"]').click()
            ready(page)
            assert page.evaluate('LANG.code')=='es'
            assert 'lang=es' in page.url
            assert page.locator('#course-flag-image').get_attribute('src')=='pics/1f1f2-1f1fd.svg'
            assert page.evaluate("JSON.parse(localStorage.getItem('gintaras.v2')).xp")==321
            page.evaluate("S.xp=123;save();")
            page.locator('#btn-course-language').click()
            with page.expect_navigation():page.locator('[data-course-language="lt"]').click()
            ready(page)
            assert page.evaluate('LANG.code')=='lt'
            assert page.evaluate('S.xp')==321
            assert page.evaluate("JSON.parse(localStorage.getItem('gintaras.v2.es')).xp")==123
            for width in [320,390,1024]:
                page.set_viewport_size({'width':width,'height':844})
                assert page.locator('header.top').evaluate('(h)=>h.scrollWidth<=h.clientWidth'),f'Header overflows at {width}'
                page.locator('#btn-course-language').click()
                assert page.locator('#course-picker').evaluate('(d)=>{const r=d.getBoundingClientRect();return r.left>=0&&r.right<=innerWidth&&r.top>=0&&r.bottom<=innerHeight}')
                if width==390:page.screenshot(path=str(ROOT/'docs/spanish/header-language-picker-mobile.png'))
                page.keyboard.press('Escape')
            assert not errors,errors
            print(json.dumps({'flag_chooser':'passed','coming_soon_guard':'passed','keyboard_close_and_focus':'passed','switch_both_directions':'passed','progress_restored':'passed','widths':[320,390,1024],'page_errors':errors}))
            browser.close()
    finally:
        server.shutdown();server.server_close()

if __name__=='__main__':main()
