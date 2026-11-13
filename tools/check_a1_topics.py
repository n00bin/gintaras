"""Run every new A1 scenario through the browser in both languages."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'a1-topics'
TOPICS=['routines','directions','messages','prices','times','family','home','preferences','shopping','clarification']

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    report=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
        for lang in ['lt','es']:
            context=browser.new_context(viewport={'width':390,'height':844})
            page=context.new_page();errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url+f'?preview=1&lang={lang}#a1-practice')
            page.wait_for_function('window.WordamiTopicCatalogue')
            page.locator('#splash').wait_for(state='detached')
            expected=TOPICS+(['calendar','descriptions','rooms'] if lang=='lt' else [])
            assert [t['topic'] for t in page.evaluate('WordamiTopicCatalogue')]==expected
            definitions=page.evaluate("WordamiTopicCatalogue.map(t=>WordamiActivities.definition(t.id))")
            assert len(definitions)==len(expected)
            assert all(len(d['tasks'])==6 for d in definitions)
            assert all(not page.evaluate('id=>WordamiActivities.requirements(id).ready',d['id']) for d in definitions)
            # The same source card can be shared, but each activity still requires all of its sources.
            source_phrases=definitions[0]['requiredPhrases']
            page.evaluate("ts=>{ts.forEach(t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};});save();}",source_phrases[:-1])
            page.goto(url+f'?preview=1&lang={lang}#a1-routines')
            d=page.locator('#a1-practice')
            assert 'Learn these phrases first' in d.inner_text()
            assert not page.evaluate("WordamiActivities.begin('a1.routines')")
            all_phrases=list(dict.fromkeys(t for definition in definitions for t in definition['requiredPhrases']))
            page.evaluate("ts=>{ts.forEach(t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};});S.welcomed=true;S.sound=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}",all_phrases)
            page.reload()
            baseline=page.evaluate('JSON.stringify(S)')
            for topic in expected:
                page.goto(url+f'?preview=1&lang={lang}#a1-{topic}')
                d.get_by_role('button',name='Start activity',exact=True).click()
                for step in range(6):
                    task=page.evaluate("([id,step])=>{const t=WordamiTopicContent.find(t=>t.id===id),s=JSON.parse(localStorage.getItem('wordami.topic.v1.'+LANG.code+'.'+id));return t.build(s.variant)[step]}",[topic,step])
                    if step in [0,2]:
                        if step==2:
                            assert all(b.is_disabled() for b in d.locator('[data-topic-choice]').all())
                            d.get_by_role('button',name='Show transcript and meaning').click()
                            d.get_by_role('button',name='Play recording').click()
                            # Leaving during playback must not allow a listening result.
                            if topic=='routines':
                                d.get_by_role('button',name='Save & close').click()
                                page.reload()
                                assert '3 of 6' in d.inner_text()
                                assert all(b.is_disabled() for b in d.locator('[data-topic-choice]').all())
                                d.get_by_role('button',name='Play recording').click()
                            d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                        # A different answer must be rejected even when all vocabulary is known.
                        other=next(o['value'] for o in task['options'] if o['value']!=task['answer'])
                        d.locator('[data-topic-choice="'+other+'"]').click()
                        assert 'Try again' in d.locator('[role=status]').inner_text()
                    elif step==3:
                        d.get_by_role('button',name='Play recording').click()
                        d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                    if step<4:
                        if topic=='directions' and step==0:
                            assert d.locator('[role=img]').count()==1
                            page.screenshot(path=str(OUT/f'{lang}-map.png'))
                        d.locator('[data-topic-choice="'+task['answer']+'"]').click()
                    else:
                        sources=page.evaluate("id=>{const t=WordamiTopicContent.find(t=>t.id===id);return Object.fromEntries(Object.entries(t.sources).map(([key,text])=>[key,ITEMS.find(i=>(i.lt0||i.lt)===text).lt]));}",topic)
                        keys=task['pairs'][0] if task['policy']=='compatible-pair' else task['accept'][:2] if task['policy']!='one' else task['accept'][:1]
                        answer='\n'.join(sources[k] for k in keys)
                        if step==4:
                            invalid=(sources[task['accept'][0]]+'\n'+sources[task['accept'][0]]) if task['policy']=='any-two' else 'not a valid reply'
                            d.get_by_role('textbox').fill(invalid)
                            d.get_by_role('button',name='Check reply',exact=True).click()
                            assert 'Try again' in d.locator('[role=status]').inner_text()
                        d.get_by_role('textbox').fill(answer)
                        if topic=='routines' and step==4:page.screenshot(path=str(OUT/f'{lang}-routine-writing.png'))
                        d.get_by_role('button',name='Check reply',exact=True).click()
                assert 'Reading, listening and writing complete' in d.inner_text(),topic
                if topic=='routines':
                    d.get_by_role('button',name='Next: practise speaking').click()
                    d.locator('#recb').click();d.locator('#recb[aria-label="Stop recording"]').wait_for()
                    page.wait_for_timeout(500);d.locator('#recb').click()
                    d.get_by_role('button',name='Play my recording').click()
                    d.get_by_role('button',name='Hear course example').click()
                    page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
                    d.get_by_role('button',name='I compared my recording').click()
                    assert 'Reading, listening and writing complete' in d.inner_text()
                summary=page.evaluate('WordamiActivities.summary()')
                page.reload()
                assert 'Reading, listening and writing complete' in d.inner_text()
                assert page.evaluate('WordamiActivities.summary()')==summary
                assert page.evaluate('JSON.stringify(S)')==baseline
                print(lang+' '+topic+' passed',flush=True)
            # Both valid responses to an invitation must be accepted.
            page.goto(url+f'?preview=1&lang={lang}#a1-messages')
            d.get_by_role('button',name='Try a new visit',exact=True).click()
            for step in range(4):
                task=page.evaluate("step=>{const s=JSON.parse(localStorage.getItem('wordami.topic.v1.'+LANG.code+'.messages'));return WordamiTopicContent.find(t=>t.id==='messages').build(s.variant)[step]}",step)
                if step>=2:
                    d.get_by_role('button',name='Play recording').click()
                    d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                d.locator('[data-topic-choice="'+task['answer']+'"]').click()
            decline=page.evaluate("()=>{const text=WordamiTopicContent.find(t=>t.id==='messages').sources.no;return ITEMS.find(i=>(i.lt0||i.lt)===text).lt}")
            d.get_by_role('textbox').fill(decline);d.get_by_role('button',name='Check reply').click()
            assert '6 of 6' in d.inner_text()
            page.set_viewport_size({'width':320,'height':740})
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/f'{lang}-message-mobile.png'))
            page.reload();assert '6 of 6' in d.inner_text()
            page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
            context.set_offline(True);page.reload();assert '6 of 6' in d.inner_text();context.set_offline(False)
            report.append({'language':lang,'topicsCompleted':expected,'summary':page.evaluate('WordamiActivities.summary()'),'pageErrors':errors})
            assert not errors,errors
            context.close()
        browser.close()
    server.shutdown()
    (OUT/'verification.json').write_text(json.dumps({'passed':True,'courses':report},indent=2),encoding='utf8')
    print('All 23 A1 topic flows passed, including 138 task steps, recordings, rejection cases and offline resume.')

if __name__=='__main__':
    main()
