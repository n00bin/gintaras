"""Verify the guided route launches real teaching and returns without invented progress."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output'/'a1-route'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True);page=browser.new_page(viewport={'width':390,'height':844});errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(url+'?preview=1&lang=lt#a1-route');page.wait_for_function('window.WordamiA1Route');page.locator('#splash').wait_for(state='detached')
        d=page.locator('#a1-practice');assert len(page.evaluate('WordamiA1Route'))==12
        assert sum(len(c['activities']) for c in page.evaluate('WordamiA1Route'))==16
        original_path=page.evaluate('JSON.stringify(PATH)')
        page.evaluate("S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.sound=false;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;save()")
        d.get_by_role('button',name='Continue · Meet someone new').click()
        assert 'First words' in d.inner_text()
        d.get_by_role('button',name='Learn the next phrases').click()
        assert not d.is_visible()
        assert page.locator('#sheet').is_visible()
        assert page.evaluate('Q.lesson.id')=='u1a-0'
        assert page.evaluate('Q.mode')=='lesson'
        page.evaluate('quit()')
        assert d.is_visible() and 'Meet someone new' in d.inner_text()
        assert page.evaluate('JSON.stringify(PATH)')==original_path
        assert page.evaluate("WordamiActivities.status('a1.introductions').finished") is False
        # Reuse real introduced-card records; the guide must not force a completed learner to restart teaching.
        page.evaluate("()=>{const ts=WordamiActivities.definition('a1.introductions').requiredPhrases;for(const t of ts){const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};}for(const i of LESSON_BY['u1a-0'].items)S.items[i.id]={seen:true,intro:true};save();}")
        d.get_by_role('button',name='All A1 chapters').click()
        d.get_by_role('button',name='Open chapter',exact=True).first.click()
        assert 'The required language has been introduced' in d.inner_text()
        assert d.get_by_role('button',name='Learn the next phrases').count()==0
        d.get_by_role('button',name='Open activity',exact=True).click()
        assert 'Start introductions' in d.inner_text()
        page.goto(url+'?preview=1&lang=lt#a1-route')
        assert '0 of 12 chapters practised' in d.inner_text()
        page.set_viewport_size({'width':320,'height':740});assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
        page.screenshot(path=str(OUT/'route-mobile.png'))
        assert page.evaluate('JSON.stringify(PATH)')==original_path
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'chapters':12,'practiceVisits':16,'firstLesson':'u1a-0','originalPathUnchanged':True,'pageErrors':errors},indent=2),encoding='utf8');browser.close()
    server.shutdown();print('Guided A1 route: real teaching, return flow, existing progress and 12 chapters passed.')
if __name__=='__main__':main()
