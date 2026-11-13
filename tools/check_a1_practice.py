"""Verify taught prerequisites, audio-gated results and separate skill practice in both courses."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'a1-practice'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def seed(page, texts):
    page.evaluate("ts=>{for(const t of ts){const i=ITEMS.find(i=>i.lt===t);if(!i)throw Error('No card: '+t);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.sound=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}",texts)

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    base=f'http://127.0.0.1:{server.server_port}/'
    results=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
        context=browser.new_context(viewport={'width':390,'height':844})
        page=context.new_page()
        errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        for lang,words in [('lt',['kava','arbata','meniu','Aš noriu kavos']),('es',['café','el té','el menú','Un café, por favor'])]:
            page.goto(base+f'?preview=1&lang={lang}#a1-practice')
            page.wait_for_function('window.gintarasReady&&window.WordamiActivities')
            page.locator('#splash').wait_for(state='detached')
            d=page.locator('#a1-practice')
            assert d.is_visible()
            assert all(s['level'] is None for s in page.evaluate('WordamiActivities.summary()'))
            d.get_by_role('button',name='Read & listen',exact=True).click()
            assert 'Learn these phrases first' in d.inner_text()
            assert not page.evaluate("WordamiActivities.begin('a1.cafe-understanding')")
            seed(page,words[:-1])
            assert not page.evaluate("WordamiActivities.requirements('a1.cafe-understanding').ready")
            seed(page,words[-1:])
            page.reload()
            d.get_by_role('button',name='Read & listen',exact=True).click()
            before=page.evaluate('JSON.stringify(S)')
            d.locator('[data-answer=coffee]').click()
            assert 'Try again' in d.locator('[role=status]').inner_text()
            d.get_by_role('button',name='Show meanings',exact=True).click()
            d.locator('[data-answer=tea]').click()
            page.screenshot(path=str(OUT/f'{lang}-reading.png'))
            d.locator('[data-answer=coffee]').click()
            assert d.locator('[data-answer=coffee]').is_disabled()
            assert d.locator('[data-answer=tea]').is_disabled()
            # Skipping a recording cannot create listening evidence through the API either.
            assert not page.evaluate("()=>{const s=JSON.parse(localStorage.getItem('wordami.activity-session.v1.'+LANG.code));return WordamiActivities.record(s.attemptId,'hear1',{type:'answer',correct:true})}")
            d.get_by_role('button',name='Save & close',exact=True).click()
            page.reload()
            d.get_by_role('button',name='Continue reading & listening',exact=True).click()
            assert '3 of 4' in d.inner_text()
            # With sound off, playback must not enable choices or write a listening pass.
            page.evaluate('S.sound=false')
            d.get_by_role('button',name='Play recording',exact=True).click()
            d.locator('[role=status]').filter(has_text='could not play').wait_for()
            assert d.locator('[data-answer=coffee]').is_disabled()
            page.evaluate('S.sound=true')
            for index in range(2):
                d.get_by_role('button',name='Play again' if index==0 else 'Play recording',exact=True).click()
                d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                target=page.evaluate("i=>JSON.parse(localStorage.getItem('wordami.activity-session.v1.'+LANG.code)).targets[i]",index)
                d.locator('[data-answer='+target+']').click()
            assert 'Reading and listening practice complete' in d.inner_text()
            summaries=page.evaluate('WordamiActivities.summary()')
            read=next(s for s in summaries if s['skill']=='reading')
            listen=next(s for s in summaries if s['skill']=='listening')
            assert read['completed']==2 and read['unaided']==1
            assert listen['completed']==2 and listen['unaided']==2
            assert page.evaluate('JSON.stringify(S)')==before,'Practice changed lesson/FSRS state'
            # Re-open/reload does not double-count the same result.
            page.reload()
            assert page.evaluate('WordamiActivities.summary()')==summaries
            d.get_by_role('button',name='Practise speaking',exact=True).click()
            assert d.get_by_role('button',name='I compared my recording').is_disabled()
            d.locator('#recb').click()
            d.locator('#recb[aria-label="Stop recording"]').wait_for()
            page.wait_for_timeout(500)
            d.locator('#recb').click()
            d.get_by_role('button',name='I compared my recording').wait_for()
            d.get_by_role('button',name='Play my recording').click()
            d.get_by_role('button',name='Hear course example').click()
            page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
            d.get_by_role('button',name='I compared my recording').click()
            spoken=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='speaking')
            assert spoken['selfRecorded']==1 and spoken['completed']==0 and spoken['level'] is None
            assert 'Self-comparison; speaking ability not assessed.' in d.inner_text()
            # Keyboard close, narrow layout, and persistent offline shell.
            page.set_viewport_size({'width':320,'height':740})
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/f'{lang}-skills-mobile.png'))
            d.press('Escape')
            assert not d.is_visible()
            page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
            context.set_offline(True)
            page.reload()
            d.wait_for(state='visible')
            assert 'Your language practice' in d.inner_text()
            assert page.evaluate('WordamiActivities.summary()').__len__()==4
            context.set_offline(False)
            if lang=='es':
                d.get_by_role('button',name='Practise writing',exact=True).click()
                assert 'Learn these phrases first' in d.inner_text()
                seed(page,['La cuenta, por favor','¿Puedo pagar con tarjeta?'])
                page.reload()
                d.get_by_role('button',name='Practise writing',exact=True).click()
                d.get_by_role('textbox').fill('Un café, por favor')
                d.get_by_role('button',name='Send reply').click()
                d.get_by_role('button',name='Save & close').click()
                page.reload()
                d.get_by_role('button',name='Practise writing',exact=True).click()
                assert '2 of 3' in d.inner_text()
                for answer in ['La cuenta, por favor','¿Puedo pagar con tarjeta?']:
                    d.get_by_role('textbox').fill(answer)
                    d.get_by_role('button',name='Send reply').click()
                assert 'Writing practice complete' in d.inner_text()
                written=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')
                assert written['completed']==3 and written['unaided']==3
            results.append({'language':lang,'reading':read,'listening':listen,'speaking':spoken})
        # Switching course keeps independent result histories.
        page.goto(base+'?preview=1&lang=lt#a1-practice')
        assert next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='reading')['completed']==2
        assert page.evaluate("localStorage.getItem('wordami.activities.v1.lt')!==localStorage.getItem('wordami.activities.v1.es')")
        # New write evidence in the original café pilot is visible in the shared summary.
        seed(page,['Aš noriu arbatos','Sąskaitą, prašau','Ar galima mokėti kortele?'])
        page.goto(base+'?preview=1&lang=lt#adventure-cafe')
        cafe=page.locator('#cafe-adventure')
        cafe.get_by_role('button',name='Start activity').click()
        cafe.get_by_role('button',name='kava · coffee').click()
        for answer in ['Aš noriu kavos','Sąskaitą, prašau','Ar galima mokėti kortele?']:
            cafe.get_by_role('textbox').fill(answer)
            cafe.get_by_role('button',name='Send reply').click()
        writing=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')
        assert writing['completed']==3 and writing['unaided']==3 and writing['level'] is None
        # Empty prerequisites and invalid task skills cannot form a runnable activity.
        assert page.evaluate("()=>{try{WordamiActivities.define({id:'invalid',version:1,requiredPhrases:[],tasks:[{id:'x',skill:'reading',method:'comprehension'}]});return false;}catch(e){return true;}}")
        assert page.evaluate("WordamiActivities.begin('missing-activity')===null")
        page.goto(base+'?preview=0&lang=lt')
        assert page.evaluate('typeof window.WordamiActivities')=='undefined'
        assert page.locator('#a1-practice-card').count()==0
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'courses':results,'writing':writing,'pageErrors':errors},indent=2),encoding='utf8')
        browser.close()
    server.shutdown()
    print('A1 practice checks passed for Lithuanian and Spanish, including real media playback and local recording.')

if __name__=='__main__':
    main()
