"""Exercise the introduction sequence, taught-language gates and personalised course cards."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'introductions'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
        context=browser.new_context(viewport={'width':390,'height':844})
        page=context.new_page()
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        for lang in ['lt','es']:
            page.goto(url+f'?preview=1&lang={lang}#a1-introductions')
            page.wait_for_function("window.WordamiActivities?.definition('a1.introductions')")
            page.locator('#splash').wait_for(state='detached')
            d=page.locator('#a1-practice')
            assert 'Learn these phrases first' in d.inner_text()
            assert d.get_by_role('textbox').count()==0
            phrases=page.evaluate("WordamiActivities.definition('a1.introductions').requiredPhrases")
            assert len(phrases)==3
            page.evaluate("ts=>{for(const t of ts){const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.sound=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}",phrases[:2])
            page.reload()
            assert 'Learn these phrases first' in d.inner_text()
            page.evaluate("t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};save();}",phrases[2])
            page.reload()
            d.get_by_role('button',name='Start introductions',exact=True).click()
            before=page.evaluate('JSON.stringify(S)')
            guest_name=page.evaluate("()=>{const text=WordamiActivities.definition('a1.introductions').requiredPhrases[0];return ITEMS.find(i=>i.lt===text).en.replace(/^My name is\\s+/i,'').replace(/[.!]$/,'')}")
            d.get_by_role('textbox').fill('wrong')
            d.get_by_role('button',name='Check reply').click()
            assert 'Try again' in d.locator('[role=status]').inner_text()
            d.get_by_role('textbox').fill(guest_name)
            d.get_by_role('textbox').press('Enter')
            assert 'Where is this guest from?' in d.inner_text()
            target=page.evaluate("JSON.parse(localStorage.getItem('wordami.introductions.v1.'+LANG.code)).order[0]")
            d.locator('[data-intro-choice="'+str(target)+'"]').click()
            assert all(d.locator('[data-intro-choice="'+str(i)+'"]').is_disabled() for i in [0,1])
            d.get_by_role('button',name='Save & close').click()
            page.reload()
            assert '3 of 6' in d.inner_text()
            for step in [0,1]:
                if step==0:
                    d.get_by_role('button',name='Show transcript and meaning').click()
                d.get_by_role('button',name='Play introduction').click()
                d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                target=page.evaluate("i=>JSON.parse(localStorage.getItem('wordami.introductions.v1.'+LANG.code)).order[i]",step)
                d.locator('[data-intro-choice="'+str(target)+'"]').click()
            assert 'Write a sentence saying your name' in d.inner_text()
            d.get_by_role('textbox').fill('123')
            d.get_by_role('button',name='Check reply').click()
            assert 'Try again' in d.locator('[role=status]').inner_text()
            own_reply='Mano vardas Živilė' if lang=='lt' else 'Me llamo María-José'
            d.get_by_role('textbox').fill(own_reply)
            page.screenshot(path=str(OUT/f'{lang}-writing.png'))
            d.get_by_role('button',name='Check reply').click()
            # A valid origin sentence for the other guest must not answer this task.
            order=page.evaluate("JSON.parse(localStorage.getItem('wordami.introductions.v1.'+LANG.code)).order")
            d.get_by_role('textbox').fill(phrases[1+order[1]])
            d.get_by_role('button',name='Check reply').click()
            assert 'Try again' in d.locator('[role=status]').inner_text()
            d.get_by_role('textbox').fill(phrases[1+order[0]])
            d.get_by_role('button',name='Check reply').click()
            assert 'Introduction practice complete' in d.inner_text()
            saved=page.evaluate("localStorage.getItem('wordami.activities.v1.'+LANG.code)")
            assert own_reply not in saved,'Typed names must not be saved in evidence'
            assert page.evaluate('JSON.stringify(S)')==before,'Activity mutated course state'
            totals=page.evaluate('WordamiActivities.summary()')
            assert next(s for s in totals if s['skill']=='reading')['completed']==2
            listening=next(s for s in totals if s['skill']=='listening')
            assert listening['completed']==2 and listening['unaided']==1
            assert next(s for s in totals if s['skill']=='writing')['completed']==2
            d.get_by_role('button',name='Next: practise speaking').click()
            assert 'Say your introduction' in d.inner_text()
            assert d.get_by_role('button',name='I compared my recording').is_disabled()
            d.locator('#recb').click()
            d.locator('#recb[aria-label="Stop recording"]').wait_for()
            page.wait_for_timeout(500)
            d.locator('#recb').click()
            d.get_by_role('button',name='Play my recording').click()
            d.get_by_role('button',name='Hear course example').click()
            page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
            d.get_by_role('button',name='I compared my recording').click()
            assert 'Introduction practice complete' in d.inner_text()
            spoken=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='speaking')
            assert spoken['selfRecorded']==1 and spoken['level'] is None
            page.set_viewport_size({'width':320,'height':740})
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/f'{lang}-complete-mobile.png'))
            page.reload()
            assert 'Introduction practice complete' in d.inner_text()
            assert next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')['completed']==2
            page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
            context.set_offline(True)
            page.reload()
            assert 'Introduction practice complete' in d.inner_text()
            context.set_offline(False)
            reports.append({'language':lang,'summary':page.evaluate('WordamiActivities.summary()')})
        # A customised name remains tied to the same taught card, not the default Tomas text.
        page.goto(url+'?preview=1&lang=lt#a1-practice')
        page.evaluate("S.me={name:'Alex',g:'f',from:'ca'};save()")
        page.reload()
        assert page.get_by_role('button',name='Introductions · meet someone new').count()==1
        current=page.evaluate("WordamiActivities.definition('a1.introductions').requiredPhrases[0]")
        assert 'Alex' in current
        assert page.evaluate("WordamiActivities.requirements('a1.introductions').ready")
        page.goto(url+'?preview=0&lang=lt#a1-introductions')
        assert page.locator('#a1-practice').count()==0
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports,'personalisedNameChecked':True,'pageErrors':errors},indent=2),encoding='utf8')
        browser.close()
    server.shutdown()
    print('Introduction activity checks passed in both languages, including audio, recording, resume, personalisation and offline reload.')

if __name__=='__main__':
    main()
