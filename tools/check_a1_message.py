"""Verify useful message feedback, unknown-phrase handling and private local draft persistence."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output'/'a1-message'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True);page=browser.new_page(viewport={'width':390,'height':844});errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(url+'?preview=1&lang=lt#a1-message');page.wait_for_function('window.WordamiA1MessageCoach');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
        assert 'Learn these phrases first' in d.inner_text()
        page.evaluate("()=>{for(const t of WordamiActivities.definition('a1.original-message').requiredPhrases){const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.toured=true;S.meAsked=1;S.sound=false;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}")
        page.reload();baseline=page.evaluate('JSON.stringify(S)');d.get_by_role('button',name='Start your message').click()
        bad='Labas! Mano vardas Živilė. Aš gyvena Vilnius. Ar nori eiti kartu? Septintą valandą.'
        d.get_by_role('textbox').fill(bad);d.get_by_role('button',name='Check my message').click()
        assert 'use “Aš gyvenu”' in d.inner_text()
        assert d.get_by_role('button',name='Save this guided message').count()==0
        # Another valid way to introduce yourself is left for review, not declared a language error.
        unknown='Labas! Esu Živilė. Gyvenu Vilniuje. Ar nori eiti kartu? Septintą valandą.'
        d.get_by_role('textbox').fill(unknown);d.get_by_role('button',name='Check my message').click()
        assert 'Not recognised yet: Introduce yourself' in d.inner_text()
        d.get_by_role('button',name='Save for later review').click()
        assert next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')['guidedDrafted']==0
        good='Labas! Mano vardas Živilė. Aš gyvenu Vilniuje. Ar nori eiti kartu? Septintą valandą.'
        d.get_by_role('textbox').fill(good);d.get_by_role('button',name='Save & close').click();page.reload()
        assert d.get_by_role('textbox').input_value()==good
        d.get_by_role('button',name='Check my message').click()
        d.get_by_role('button',name='Save this guided message').click()
        assert 'Guided message saved' in d.locator('[role=status]').inner_text()
        summary=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')
        assert summary['guidedDrafted']==1 and summary['completed']==0 and summary['level'] is None
        assert good not in page.evaluate("localStorage.getItem('wordami.activities.v1.lt')")
        assert page.evaluate('JSON.stringify(S)')==baseline
        page.set_viewport_size({'width':320,'height':740});assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
        page.screenshot(path=str(OUT/'feedback-mobile.png'))
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'writing':summary,'pageErrors':errors},indent=2),encoding='utf8');browser.close()
    server.shutdown();print('Original-message guidance, grammar-pattern checks, local drafts and unrecognised-valid handling passed.')
if __name__=='__main__':main()
