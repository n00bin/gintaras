"""Exercise both recorded branches, real recording/replay, recovery and privacy in both languages."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/interaction-practice'
FAIL="""()=>{window.__exchangeSave=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.interaction-practice.v1.'))throw new DOMException('full','QuotaExceededError');return window.__exchangeSave.call(this,k,v);};}"""
RESTORE='()=>{Storage.prototype.setItem=window.__exchangeSave;}'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def recorded_review(page,d,reflection=False,quota=False):
    d.get_by_role('button',name='Start recording',exact=True).click()
    d.get_by_role('button',name='Stop recording',exact=True).wait_for();page.wait_for_timeout(1200)
    d.get_by_role('button',name='Stop recording',exact=True).click()
    page.wait_for_function("[...document.querySelectorAll('#a1-practice button')].some(b=>b.textContent==='Replay my response'&&!b.disabled)")
    assert d.get_by_role('button',name='Save this response review',exact=True).is_disabled()
    d.get_by_role('button',name='Replay my response',exact=True).click()
    page.wait_for_function("[...document.querySelectorAll('#a1-practice button')].some(b=>b.textContent==='Save this response review'&&!b.disabled)")
    d.get_by_role('button',name='Save this response review',exact=True).click()
    assert 'Confirm your review' in d.locator('[role=status]').inner_text()
    d.get_by_role('checkbox').check()
    if reflection:d.get_by_role('textbox',name='One improvement for this exchange',exact=True).fill('I will use the clarified detail rather than my original alternative.')
    if quota:
        old=page.evaluate("localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code)")
        page.evaluate(FAIL);d.get_by_role('button',name='Save this response review',exact=True).click()
        assert 'could not be saved' in d.locator('[role=status]').inner_text()
        assert page.evaluate("localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code)")==old
        page.evaluate(RESTORE)
    d.get_by_role('button',name='Save this response review',exact=True).click()


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},permissions=['microphone'],accept_downloads=True)
            context.add_init_script(FAST_AUDIO)
            context.add_init_script("(()=>{window.__exchangeStreams=[];if(navigator.mediaDevices){const native=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=async(...args)=>{const stream=await native(...args);window.__exchangeStreams.push(stream);return stream;};}})();")
            page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#guided-exchange-A1');page.wait_for_function('window.WordamiInteractionPractice');page.locator('#splash').wait_for(state='detached')
            d=page.locator('#a1-practice');assert 'Complete the unit' in d.inner_text()
            assert page.evaluate("localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code)") is None
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiInteractionPractice')
            baseline=page.evaluate('JSON.stringify(S)');course=page.evaluate('JSON.stringify(WordamiSkillsStudio.catalogue())');memory=page.evaluate('WordamiStudyMemory.summary().learned')
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiInteractionPracticeContent.units).filter(([id])=>id.startsWith('A1')))")
            for uid,spec in bank.items():
                page.goto(base+'#skills-'+uid);page.reload();page.wait_for_function('window.WordamiInteractionPractice')
                # All extension links must appear on a fresh direct URL, not only after another navigation.
                level=page.locator('#skills-studio')
                assert level.get_by_role('button',name='Apply this language in a new reading',exact=True).count()==1
                assert level.get_by_role('button',name='Apply this language in a new listening',exact=True).count()==1
                level.get_by_role('button',name='Practise checking and clarifying',exact=True).click()
                for index,(branch,text,meaning) in enumerate(spec['questions']):
                    d.get_by_role('button',name='Begin guided exchange' if index==0 else 'Practise another exchange',exact=True).click()
                    if uid=='A1' and index==0:
                        page.evaluate("()=>{window.__realExchangeAudio=window.Audio;window.Audio=function(url){const a=new __realExchangeAudio(url);a.play=()=>{queueMicrotask(()=>a.dispatchEvent(new Event('ended')));return Promise.resolve();};return a;};}")
                        d.get_by_role('button',name='Hear the situation',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('did not finish')")
                        assert '1 · Hear the situation' in d.inner_text()
                        page.evaluate('()=>{window.Audio=window.__realExchangeAudio;}')
                    d.get_by_role('button',name='Hear the situation',exact=True).click()
                    d.get_by_role('button',name='Ask: '+text,exact=True).wait_for()
                    d.get_by_role('button',name='Ask: '+text,exact=True).click()
                    played=page.evaluate('window.__completedMedia.length')
                    d.get_by_role('button',name='Hear the question model',exact=True).click()
                    page.wait_for_function('count=>window.__completedMedia.length>count',arg=played)
                    if uid=='A1' and index==0:
                        page.evaluate("()=>{window.__realExchangeMic=navigator.mediaDevices.getUserMedia;navigator.mediaDevices.getUserMedia=()=>Promise.reject(new DOMException('test denied','NotAllowedError'));}")
                        d.get_by_role('button',name='Start recording',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Microphone access')")
                        assert d.get_by_role('button',name='Save this response review',exact=True).is_disabled()
                        page.evaluate('()=>{navigator.mediaDevices.getUserMedia=window.__realExchangeMic;}')
                    recorded_review(page,d,quota=uid=='A1' and index==0)
                    assert '3 · Hear the clarification' in d.inner_text()
                    page.reload();page.wait_for_function('window.WordamiInteractionPractice')
                    assert '3 · Hear the clarification' in d.inner_text()
                    correct=spec['options'][spec['answer']]
                    assert d.get_by_role('button',name=correct,exact=True).is_disabled()
                    d.get_by_role('button',name='Hear the partner reply',exact=True).click()
                    page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Partner finished')")
                    d.get_by_role('button',name=spec['options'][(spec['answer']+1)%3],exact=True).click()
                    assert 'try again' in d.locator('[role=status]').inner_text()
                    d.get_by_role('button',name=correct,exact=True).click()
                    assert ('corrected the alternative' if branch=='correct' else 'confirmed the detail') in d.inner_text()
                    recorded_review(page,d,reflection=True)
                    assert 'Guided exchange self-reviewed' in d.inner_text()
                    assert page.evaluate('()=>window.__exchangeStreams.every(s=>s.getTracks().every(t=>t.readyState==="ended"))')
                    print(lang+' '+uid+' '+branch+' recorded exchange passed',flush=True)
            stored=page.evaluate("JSON.parse(localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code))")
            assert all(len(u['rounds'])==2 for u in stored['units'].values())
            assert all(r['assisted'] and r['questionReview']['selfReviewed'] and r['responseReview']['selfReviewed'] and r['detailUnderstood'] for u in stored['units'].values() for r in u['rounds'])
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate('JSON.stringify(WordamiSkillsStudio.catalogue())')==course
            assert page.evaluate('WordamiStudyMemory.summary().learned')==memory
            assert page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)") is None
            assert all(s['cefrLevel'] is None for s in page.evaluate('WordamiInteractionPractice.catalogue()'))
            d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-exchange-mobile.png')))
            with page.expect_download() as info:d.get_by_role('button',name='Export guided exchange records',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==4
            # Leaving while recording must stop the microphone and retain no fake review.
            d.get_by_role('button',name='Practise another exchange',exact=True).click()
            d.get_by_role('button',name='Hear the situation',exact=True).click()
            d.get_by_role('button',name='Ask: '+spec['questions'][0][1],exact=True).wait_for()
            d.get_by_role('button',name='Ask: '+spec['questions'][0][1],exact=True).click()
            d.get_by_role('button',name='Start recording',exact=True).click();d.get_by_role('button',name='Stop recording',exact=True).wait_for()
            d.get_by_role('button',name='Back to unit',exact=True).click();page.wait_for_timeout(200)
            assert page.evaluate('()=>window.__exchangeStreams.every(s=>s.getTracks().every(t=>t.readyState==="ended"))')
            assert not page.evaluate("JSON.parse(localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code)).units['A1-travel'].rounds.slice(-1)[0].questionReview")
            assert not errors,errors
            reports.append({'language':lang,'scenarios':4,'branchesCompleted':8,'ownRecordedResponses':16,'preparedLanguageGate':True,'realAudioAndRecordingRequired':True,'earlyEndedRejected':True,'microphoneFailureNoResult':True,'saveRollback':True,'replyResume':True,'branchesFollowSelection':True,'microphoneStopsOnLeave':True,'originalProgressAndHeldOutChecksUnchanged':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Both languages: all 16 branches and 32 own recordings passed playback, replay, rollback, resume, privacy and progress checks.')


if __name__=='__main__':main()
