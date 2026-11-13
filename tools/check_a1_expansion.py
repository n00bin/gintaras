"""Check new dialogue media and the browser-recognition adapter, with no user microphone."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'a1-expansion'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass

FAKE_RECOGNIZER="""
window.__speechActions=[];
class TestRecognizer {
 start(){window.__speechLanguage=this.lang;this.timer=setTimeout(()=>{const a=window.__speechActions.shift()||{error:'no-speech'};if(a.error)this.onerror?.({error:a.error});else this.onresult?.({results:[a.texts.map(transcript=>({transcript}))]});this.onend?.();},20);}
 abort(){clearTimeout(this.timer);this.onend?.();}
}
window.SpeechRecognition=TestRecognizer;
"""
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        context=browser.new_context(viewport={'width':390,'height':844});context.add_init_script(FAKE_RECOGNIZER)
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(url+'?preview=1&lang=lt#a1-listening');page.wait_for_function('window.WordamiA1Placement')
        page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
        assert len(page.evaluate('WordamiA1Placement'))==25
        assert not page.evaluate("WordamiActivities.requirements('a1.spoken-requests').ready")
        ids=page.evaluate("WordamiA1DialogueContent.map(d=>'a1.dialogue-'+d.id)")+['a1.spoken-requests']
        phrases=page.evaluate('ids=>[...new Set(ids.flatMap(id=>WordamiActivities.definition(id).requiredPhrases))]',ids)
        page.evaluate("ts=>{for(const text of ts){const i=ITEMS.find(i=>i.lt===text);if(!i)throw Error(text);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.toured=true;S.meAsked=1;S.sound=true;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}",phrases)
        page.reload();baseline=page.evaluate('JSON.stringify(S)')
        dialogues=page.evaluate('WordamiA1DialogueContent')
        for index,dialogue in enumerate(dialogues):
            if index==0:
                page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
                context.set_offline(True)
            page.goto(url+'?preview=1&lang=lt#listen-'+dialogue['id'])
            d.get_by_role('button',name='Start listening',exact=True).click()
            assert all(e.is_disabled() for e in d.locator('[data-dialogue-answer]').all())
            if index==0:d.get_by_role('button',name='Read the conversation',exact=True).click()
            d.get_by_role('button',name='Play conversation',exact=True).click()
            d.locator('[role=status]').filter(has_text='Conversation finished').wait_for(timeout=30000)
            for q,(_,options,correct) in enumerate(dialogue['questions']):
                if q==0:
                    d.locator('[data-dialogue-answer="'+str(1-correct)+'"]').click()
                    assert 'try another answer' in d.locator('[role=status]').inner_text()
                d.locator('[data-dialogue-answer="'+str(correct)+'"]').click()
            assert 'Conversation practice complete' in d.inner_text()
            if index==0:context.set_offline(False)
            print('Dialogue '+dialogue['id']+' decoded and completed',flush=True)
        listening=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='listening')
        assert listening['completed']==12
        assert page.evaluate('JSON.stringify(S)')==baseline
        page.goto(url+'?preview=1&lang=lt#spoken-requests')
        d.get_by_role('button',name='Begin speaking check').click()
        page.evaluate("window.__speechActions.push({error:'network'})")
        d.get_by_role('button',name='Speak your reply').click()
        d.locator('[role=status]').filter(has_text='No response was recorded').wait_for()
        assert d.get_by_role('button',name='Record this response').count()==0
        drink=page.evaluate("JSON.parse(localStorage.getItem('wordami.spoken-check.v1.lt')).drink")
        negative='Aš nenoriu kavos' if drink==0 else 'Aš nenoriu arbatos'
        for transcript in [negative,'Kur yra stotis?','Kelintą valandą?']:
            page.evaluate('t=>window.__speechActions.push({texts:t.startsWith("A\u0161 nenoriu")?[t,t.replace("nenoriu","noriu")]:[t]})',transcript)
            d.get_by_role('button',name='Speak your reply').click()
            d.get_by_role('button',name='Record this response').wait_for()
            assert page.evaluate('window.__speechLanguage')=='lt-LT'
            d.get_by_role('button',name='Record this response').click()
        assert '2 of 3 requests matched' in d.inner_text()
        spoken=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='speaking')
        assert spoken['speechMatched']==2 and spoken['completed']==0 and spoken['selfRecorded']==0 and spoken['level'] is None
        assert negative not in page.evaluate("localStorage.getItem('wordami.activities.v1.lt')")
        d.get_by_role('button',name='Try a fresh check').click()
        page.evaluate('window.SpeechRecognition=undefined;window.webkitSpeechRecognition=undefined')
        page.reload()
        # Reload reinstalls the fixture; remove it and redraw using the registered route.
        page.evaluate('window.SpeechRecognition=undefined;window.webkitSpeechRecognition=undefined;WordamiPracticeUI.openActivity("a1.spoken-requests")')
        assert 'Live speech recognition is unavailable' in d.inner_text()
        assert d.get_by_role('button',name='Practise with a recording instead').count()==1
        assert next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='speaking')['speechMatched']==2
        page.set_viewport_size({'width':320,'height':740});assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
        page.screenshot(path=str(OUT/'speaking-unavailable-mobile.png'))
        page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
        context.set_offline(True)
        page.goto(url+'?preview=1&lang=lt#listen-home')
        assert 'Conversation practice complete' in d.inner_text()
        d.get_by_role('button',name='Listen again',exact=True).click()
        d.get_by_role('button',name='Play conversation').click()
        d.locator('[role=status]').filter(has_text='Conversation finished').wait_for(timeout=30000)
        context.set_offline(False)
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'dialoguesPlayed':len(dialogues),'listening':listening,'speakingAdapter':spoken,'recognitionNote':'Synthetic recognizer responses test the adapter; no live recognition service or user microphone was used.','pageErrors':errors},indent=2),encoding='utf8')
        browser.close()
    server.shutdown();print('Full dialogue playback, offline audio and speaking-adapter/error checks passed.')
if __name__=='__main__':main()
