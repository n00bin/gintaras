"""Exercise the optional café pilot through the actual browser UI."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'adventure'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width':390,'height':844})
        page = context.new_page()
        errors = []
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.goto(url+'?preview=1&lang=lt#adventure-cafe')
        page.wait_for_function('window.gintarasReady')
        page.locator('#splash').wait_for(state='detached')
        page.evaluate("S.sound=false;S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';document.querySelector('#welcome').hidden=true")
        dialog = page.locator('#cafe-adventure')
        assert dialog.is_visible()
        assert 'Learn the café phrases first' in dialog.inner_text()
        assert dialog.get_by_role('textbox').count()==0
        # A lesson flag or incidental exposure must not bypass teach-before-test.
        page.evaluate("ITEMS.forEach(i=>{S.items[i.id]={seen:true};S.lessons[i.lesson.id]=1});save()")
        page.reload()
        assert 'Learn the café phrases first' in dialog.inner_text()
        required=['kava','arbata','meniu','Aš noriu kavos','Aš noriu arbatos','Sąskaitą, prašau','Ar galima mokėti kortele?']
        page.evaluate("ts=>{ts.forEach(t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true}});save()}",required[:-1])
        page.reload()
        assert 'Learn the café phrases first' in dialog.inner_text(), 'One unlearned phrase must lock the activity'
        page.evaluate("t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};save()}",required[-1])
        page.reload()
        assert 'Your mission' in dialog.inner_text(), page.evaluate("ts=>ts.map(t=>{const i=ITEMS.find(i=>i.lt===t);return [t,i?.id,i&&peek(i.id),i&&taught(i)]})",required)
        page.evaluate('S.sound=false;save()')
        before = page.evaluate('JSON.stringify(S)')
        assert page.evaluate("['Aš noriu kavos','Aš noriu arbatos','Sąskaitą, prašau'].every(t=>ITEMS.some(i=>i.lt===t))")
        page.evaluate('ALL_PARTS=true;renderTree()')
        page.wait_for_selector('#cafe-adventure-card', state='attached')
        assert page.locator('#unit-u15 + #cafe-adventure-card').count()==1
        dialog.get_by_role('button', name='Start activity').click()
        dialog.get_by_role('button', name='Menu', exact=True).click()
        assert 'kava' in dialog.locator('[role=status]').inner_text()
        dialog.get_by_role('button', name='arbata · tea').click()
        dialog.get_by_role('textbox').fill('hello')
        dialog.get_by_role('button', name='Send reply').click()
        assert 'Try again' in dialog.locator('[role=status]').inner_text()
        dialog.get_by_role('button', name='Save & close').click()
        page.reload()
        dialog.wait_for(state='visible')
        assert 'tea' in dialog.inner_text()
        dialog.get_by_role('textbox').fill('Arbatos, prašau')
        dialog.get_by_role('textbox').press('Enter')
        assert 'Ask for the bill' in dialog.inner_text()
        dialog.get_by_role('textbox').fill('Sąskaitą, prašau')
        dialog.get_by_role('textbox').press('Enter')
        dialog.get_by_role('textbox').fill('Ar galiu mokėti kortele?')
        dialog.get_by_role('button', name='Send reply').click()
        assert 'You did it on your own!' in dialog.inner_text()
        saved = page.evaluate("JSON.parse(localStorage.getItem('wordami.adventure.lt.cafe.v2'))")
        assert saved['completed'] and saved['independent']
        assert page.evaluate('JSON.stringify(S)')==before, 'Adventure must not change course state'
        dialog.get_by_role('button', name='Try another visit').click()
        dialog.get_by_role('button', name='Start activity').click()
        dialog.get_by_role('button', name='kava · coffee').click()
        dialog.get_by_role('button', name='Show a hint').click()
        assert dialog.locator('.cafe-hint').inner_text()=='Aš noriu kavos'
        dialog.get_by_role('textbox').fill('Noriu kavos')
        dialog.get_by_role('button', name='Send reply').click()
        dialog.get_by_role('textbox').fill('Sąskaitą, prašau')
        dialog.get_by_role('button', name='Send reply').click()
        page.set_viewport_size({'width':320,'height':740})
        assert dialog.evaluate('(d)=>d.scrollWidth<=d.clientWidth')
        page.screenshot(path=str(OUT/'cafe-mobile.png'))
        dialog.get_by_role('textbox').fill('Ar galima mokėti kortele?')
        dialog.get_by_role('button', name='Send reply').click()
        assert 'You finished with help' in dialog.inner_text()
        assert not page.evaluate("JSON.parse(localStorage.getItem('wordami.adventure.lt.cafe.v2')).independent")
        # Wait for shell cache before testing an offline reload.
        page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
        context.set_offline(True)
        page.reload()
        page.locator('#cafe-adventure').wait_for(state='visible')
        assert 'Café adventure complete' in page.locator('#cafe-adventure').inner_text()
        assert page.locator('#cafe-adventure img').evaluate('(i)=>i.complete&&i.naturalWidth>0')
        context.set_offline(False)
        page.goto(url+'?preview=0&lang=lt')
        page.wait_for_function('window.gintarasReady')
        assert page.locator('#cafe-adventure').count()==0
        page.goto(url+'?preview=1&lang=es')
        page.wait_for_function('window.gintarasReady')
        assert page.locator('#cafe-adventure').count()==0
        assert not errors, errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'checks':['fresh learner locked','seen and lesson flags do not bypass prerequisites','one missing phrase locks direct link','all taught phrases unlock','coffee and tea','ordered activity tasks','typed alternatives','wrong reply feedback','resume','independent vs assisted','FSRS and course state unchanged','320px layout','offline reload and art','public and Spanish isolation'],'pageErrors':errors},indent=2))
        browser.close()
    server.shutdown()
    print('Café adventure browser checks passed.')

if __name__=='__main__':
    main()

