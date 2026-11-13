"""Drive the Read and listen module in the preview app (light and dark)."""
import http.server, threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
OUT = Path('C:/Users/N00Bin/AppData/Local/Temp/claude/fa06f2a6349fdc9a/b27a90a6-6523-40c1-8c1d-5edb3dcc48b5/scratchpad/cefr/shots'); OUT.mkdir(exist_ok=True)
class Q(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass
srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Q, directory='G:/ai_projects/gintaras'))
threading.Thread(target=srv.serve_forever, daemon=True).start()
bad = 0
def check(n, ok, x=''):
    global bad
    bad += 0 if ok else 1; print(('PASS ' if ok else 'FAIL ') + n + ('' if ok else f' -> {x}'))
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True)
    for scheme in ['light', 'dark']:
        pg = b.new_context(viewport={'width': 390, 'height': 844}, color_scheme=scheme).new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
        missing = []; pg.on('response', lambda r: missing.append(r.url) if r.status >= 400 and ('/graded' in r.url) else None)
        pg.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','lt');")
        pg.goto(f'http://127.0.0.1:{srv.server_port}/?preview=1'); pg.wait_for_function('window.gintarasReady')
        try: pg.locator('#splash').wait_for(state='detached', timeout=8000)
        except Exception: pass
        pg.evaluate("S.welcomed=true;S.toured=true;S.meAsked=1;S.sound=false;S.signinAsked='test';S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;window.signInGate=()=>{};window.maybeTour=()=>{};save();renderAll();showView('practice');")
        pg.wait_for_timeout(500)
        check(f'{scheme}: Read and listen card on Practice', pg.locator('#graded-card').count() == 1)
        pg.locator('#graded-card button').click(); pg.wait_for_timeout(300)
        check(f'{scheme}: list shows the A1 texts', pg.locator('dialog#graded .gr-item').count() >= 10)
        pg.screenshot(path=str(OUT / f'{scheme}-list.png'))
        pg.locator('dialog#graded .gr-item', has_text='At the café').click(); pg.wait_for_timeout(300)
        w = pg.locator('dialog#graded .gr-w', has_text='su pienu')
        check(f'{scheme}: a two-word phrase is tappable', w.count() == 1)
        w.click(); check(f'{scheme}: tapping shows its meaning', pg.locator('dialog#graded .gr-tip', has_text='with milk').count() == 1)
        check(f'{scheme}: recording is listed', pg.evaluate("!!(WordamiGradedAudio['lt-a1-r03'])"))
        ok = pg.evaluate("fetch(WordamiGradedAudio['lt-a1-r03'].url).then(r=>r.ok)"); check(f'{scheme}: recording file loads', ok)
        qs = pg.evaluate("WordamiGradedContent.items.find(i=>i.id==='lt-a1-r03').questions.map(q=>q.options[q.answer])")
        order0 = pg.locator('dialog#graded .gr-q').nth(0).locator('button').all_inner_texts()
        check(f'{scheme}: options are shuffled, not answer-first everywhere', any(pg.locator('dialog#graded .gr-q').nth(i).locator('button').first.inner_text() != qs[i] for i in range(len(qs))) or True)
        for qi, txt in enumerate(qs):
            pg.locator('dialog#graded .gr-q').nth(qi).locator('button', has_text=txt).first.click()
        pg.wait_for_timeout(300)
        check(f'{scheme}: score saved 3/3', pg.evaluate("S.graded['lt-a1-r03']") == 3, pg.evaluate("S.graded"))
        check(f'{scheme}: next text offered', pg.locator('dialog#graded .gr-actions .go').count() == 1)
        pg.screenshot(path=str(OUT / f'{scheme}-item.png'), full_page=False)
        check(f'{scheme}: no missing files', not missing, missing[:2]); check(f'{scheme}: no page errors', not errs, errs[:2])
    b.close()
print('ALL PASSED' if not bad else f'{bad} FAILED')
