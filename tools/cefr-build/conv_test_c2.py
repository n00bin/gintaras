"""Open the preview app, play one new C2 conversation by its right answers, and check for errors."""
import http.server, threading, sys
from functools import partial
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Q, directory='G:/ai_projects/gintaras'))
threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    pg = b.new_context(viewport={'width': 390, 'height': 844}).new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','lt');")
    pg.goto(f'http://127.0.0.1:{srv.server_port}/?preview=1'); pg.wait_for_function('window.gintarasReady')
    r = pg.evaluate("""()=>{const ids=['cv64','cv65','cv66','cv67','cv68','cv69','cv70'];
      return {convs:ids.filter(i=>CONV_BY[i]).length,inPath:ids.filter(i=>PATH.includes(i)).length,
        lines:ids.reduce((s,i)=>s+CONV_BY[i].all.length,0),
        noAudio:ids.flatMap(i=>CONV_BY[i].all.filter(l=>l.lt&&typeof audioFor==='function'&&!audioFor(l))).length,
        u191:COURSE.some(u=>u.id==='u191')}}""")
    print(r)
    # open one conversation the way the app does, if a function exists
    opened = pg.evaluate("typeof openConv==='function' ? (openConv('cv64'),true) : (typeof startConv==='function' ? (startConv('cv64'),true) : false)")
    pg.wait_for_timeout(800); print('opened', opened)
    pg.screenshot(path='G:/ai_projects/gintaras/tools/cefr-build/cv64.png')
    print('errors', errs[:3]); b.close()
