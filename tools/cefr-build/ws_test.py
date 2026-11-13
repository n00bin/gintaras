"""Drive the new writing and speaking tasks in the preview app."""
import http.server, threading
from functools import partial
from playwright.sync_api import sync_playwright
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
    pg = b.new_context(viewport={'width': 390, 'height': 844}).new_page(); errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','lt');")
    pg.goto(f'http://127.0.0.1:{srv.server_port}/?preview=1'); pg.wait_for_function('window.gintarasReady')
    pg.evaluate("S.welcomed=true;S.toured=true;S.meAsked=1;S.sound=false;S.signinAsked='test';S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;window.signInGate=()=>{};window.maybeTour=()=>{};save();")
    pg.evaluate("WordamiGraded.show('lt-a2-w01')"); pg.wait_for_timeout(300)
    check('writing task shows a draft box', pg.locator('dialog#graded textarea.gr-draft').count() == 1)
    pg.locator('dialog#graded .gr-actions .go').click(); pg.wait_for_timeout(200)
    check('it asks you to write first', pg.locator('dialog#graded', has_text='Write your answer first').count() == 1)
    pg.fill('dialog#graded textarea.gr-draft', ' '.join(['Labas Eglė kviečiu tave į gimtadienį šeštadienį septintą valandą'] * 5))
    check('draft is saved on the device', 'kviečiu' in (pg.evaluate("localStorage.getItem('gintaras.graded.draft.lt-a2-w01')") or ''))
    pg.locator('dialog#graded .gr-actions .go').first.click(); pg.wait_for_timeout(300)
    check('model answer and self-check appear', pg.locator('dialog#graded .gr-check').count() == 5)
    for i in range(4): pg.locator('dialog#graded .gr-check input').nth(i).check()
    pg.locator('dialog#graded button', has_text='Save').click(); pg.wait_for_timeout(300)
    check('self-check score saved (4 of 5)', pg.evaluate("S.graded['lt-a2-w01']") == 4, pg.evaluate("S.graded"))
    pg.screenshot(path='G:/ai_projects/gintaras/tools/cefr-build/write.png')
    pg.evaluate("WordamiGraded.show('lt-a2-s01')"); pg.wait_for_timeout(300)
    check('speaking task shows a record button', pg.locator('dialog#graded button', has_text='Record').count() == 1)
    pg.locator('dialog#graded button', has_text='Record').click(); pg.wait_for_timeout(800)
    pg.locator('dialog#graded .gr-actions .go').first.click(); pg.wait_for_timeout(300)
    check('after speaking (or no microphone) the model and self-check appear', pg.locator('dialog#graded .gr-check').count() == 5)
    check('model recording exists for the speaking task', pg.evaluate("!!WordamiGradedAudio['lt-a2-s01']"))
    check('no page errors', not errs, errs[:2]); b.close()
print('ALL PASSED' if not bad else f'{bad} FAILED')
