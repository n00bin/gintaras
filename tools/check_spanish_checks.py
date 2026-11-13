"""Spanish held-feedback checks: taught phrases, real audio, persistence and no course awards."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'spanish-checks'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    reports = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width':390, 'height':844})
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(url + '?preview=1&lang=es#meeting-check')
        page.wait_for_function('window.WordamiA1Placement')
        page.locator('#splash').wait_for(state='detached')
        d = page.locator('#a1-practice')
        assert 'Learn these phrases first' in d.inner_text()
        assert not page.evaluate("WordamiActivities.begin('a1.meeting-check')")
        assert len(page.evaluate('WordamiA1Placement')) == 15
        page.evaluate("()=>{for(const id of ['a1.meeting-check','a1.price-check'])for(const text of WordamiActivities.definition(id).requiredPhrases){const i=ITEMS.find(i=>i.lt===text);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.sound=true;S.seenVersion=APP_VERSION;save();}")
        page.reload()
        baseline = page.evaluate('JSON.stringify(S)')
        for name in ['meeting-check', 'price-check']:
            page.goto(url + '?preview=1&lang=es#' + name)
            d.get_by_role('button', name='Begin check').click()
            state = page.evaluate("id=>JSON.parse(localStorage.getItem('wordami.check.v1.es.'+id))", name)
            values = [['Monday','Tuesday'],['6','8']] if name == 'meeting-check' else [['2','3'],['20','30']]
            for step in range(6):
                if step in [2,3]:
                    assert d.get_by_role('button', name='Record answer').is_disabled()
                    d.get_by_role('button', name='Listen to the details').click()
                    d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=20000)
                if step == 0:
                    answer = 'wrong'
                elif step < 4:
                    answer = values[step % 2][state['read'][step % 2] if step < 2 else 1-state['read'][step % 2]]
                else:
                    answers = ['No puedo, tengo que trabajar', '\u00bfA qu\u00e9 hora?'] if name == 'meeting-check' else ['\u00bfCu\u00e1nto cuesta?', 'Quiero dos manzanas']
                    answer = answers[step-4]
                if name == 'meeting-check' and step in [1,3]:
                    answer = '0' + answer + ':00'
                if name == 'price-check' and step in [1,3]:
                    answer = ('MXN ' + answer + '.00') if step == 1 else (answer + ' pesos')
                assert d.get_by_role('button', name='Show a hint').count() == 0
                d.get_by_role('textbox').fill(answer)
                d.get_by_role('button', name='Record answer').click()
                if step < 5:
                    assert 'Try again' not in d.inner_text() and 'correct' not in d.inner_text()
                if step == 1:
                    d.get_by_role('button', name='Save & close').click()
                    page.reload()
                    assert '3 of 6' in d.inner_text()
            assert 'Reading: 1 of 2 correct' in d.inner_text()
            assert 'Listening: 2 of 2 correct' in d.inner_text()
            assert 'Writing familiar requests: 2 of 2 correct' in d.inner_text()
            assert page.evaluate('JSON.stringify(S)') == baseline
            attempt = page.evaluate("id=>WordamiActivities.status('a1.'+id)", name)
            assert attempt['finished'] and not attempt['matched']
            page.reload()
            assert 'Your task check' in d.inner_text()
            # A currency from the other course and time-formatted prices must not match pesos.
            if name == 'price-check':
                d.get_by_role('button', name='Try a fresh check').click()
                state = page.evaluate("JSON.parse(localStorage.getItem('wordami.check.v1.es.price-check'))")
                d.get_by_role('textbox').fill('2:00')
                d.get_by_role('button', name='Record answer').click()
                price = ['20','30'][state['read'][1]]
                d.get_by_role('textbox').fill('\u20ac' + price)
                d.get_by_role('button', name='Record answer').click()
                saved = page.evaluate('id=>WordamiActivities.attempt(id)', state['attemptId'])
                assert not saved['tasks']['read-a']['correct']
                assert not saved['tasks']['read-b']['correct']
            reports.append({'id':name, 'realAudioCompleted':True, 'wrongAnswerRetained':True, 'heldFeedback':True, 'courseStateUnchanged':True})
        page.set_viewport_size({'width':320, 'height':740})
        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
        page.screenshot(path=str(OUT / 'mobile.png'))
        assert not errors, errors
        browser.close()
    server.shutdown()
    (OUT / 'verification.json').write_text(json.dumps({'passed':True, 'checks':reports, 'pageErrors':errors}, indent=2), encoding='utf8')
    print('Spanish meeting and peso checks passed real audio, held feedback, resume, currency handling and unchanged course progress.')

if __name__ == '__main__':
    main()
