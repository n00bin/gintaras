"""Open the preview app and check the new A2 word units load and show."""
import http.server, threading
from functools import partial
from playwright.sync_api import sync_playwright
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Q, directory='G:/ai_projects/gintaras'))
threading.Thread(target=srv.serve_forever, daemon=True).start()
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    pg = b.new_context(viewport={'width': 390, 'height': 844}).new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','lt');")
    pg.goto(f'http://127.0.0.1:{srv.server_port}/?preview=1'); pg.wait_for_function('window.gintarasReady')
    r = pg.evaluate("""()=>{const ids=[];for(let i=44;i<=241;i++)ids.push('u'+i);const us=COURSE.filter(u=>ids.includes(u.id));
      return {units:us.length,lessons:us.reduce((s,u)=>s+u.lessons.length,0),items:ITEMS.filter(i=>ids.includes(i.unit.id)).length,
       inPath:ids.filter(x=>PATH.includes(x)).length,speak:us.filter(u=>u.lessons.some(l=>l.speak)).length,
       sample:BYID['u44c-1:0']&&[BYID['u44c-1:0'].lt,BYID['u44c-1:0'].en,picFor?String(picFor(BYID['u44c-1:0'])).slice(0,40):'']}}""")
    print(r); print('errors', errs[:3]); b.close()
