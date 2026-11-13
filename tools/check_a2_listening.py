"""A2 listening choices: real decoded media, synthetic prerequisite state."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO
from check_listening_transfer import FAIL, RESTORE

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/a2-listening'
STATE="localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)"


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def play(page,d):
    d.get_by_role('button',name='Listen to the complete message',exact=True).click()
    page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')",timeout=20000)


def locked(d):
    assert d.locator('.a1-panel[lang]').count()==0
    assert all(b.is_disabled() for b in d.get_by_role('form',name='Choose the meaning').get_by_role('button').all())


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},accept_downloads=True)
            context.add_init_script(FAST_AUDIO);page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#listen-transfer-A2');page.wait_for_function('window.WordamiListeningTransferChecks')
            page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
            assert 'Complete the connected unit' in d.inner_text()
            assert d.locator('form,.a1-panel[lang]').count()==0 and page.evaluate(STATE) is None
            # Make an A1 result before loading the extended listening bank.
            page.route('**/a2-listening-transfer-content.js',lambda route:route.fulfill(status=200,body='/* previous bank */'))
            for band in ['b1','b2','c1','c2']:
                page.route('**/'+band+'-application-content.js',lambda route:route.fulfill(status=200,body='/* previous bank */'))
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
            assert page.evaluate('Object.keys(WordamiListeningTransferContent.units).length')==4
            page.evaluate("WordamiListeningTransferChecks.open('A1')")
            d.get_by_role('button',name='Begin a new version',exact=True).click();play(page,d)
            for q in page.evaluate('WordamiListeningTransferContent.units.A1.variants[0].questions'):
                d.get_by_role('textbox',name='Your short listening answer',exact=True).fill(q['answers'][0])
                d.get_by_role('button',name='Record answer',exact=True).click()
            original_a1=json.loads(page.evaluate(STATE))['units']['A1']
            for band in ['b1','b2','c1','c2']:page.unroute('**/'+band+'-application-content.js')
            page.unroute('**/a2-listening-transfer-content.js');page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
            assert '3 of 3 details correct' in d.inner_text()
            baseline=page.evaluate('JSON.stringify(S)');prepared=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            reading=page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiListeningTransferContent.units).filter(([id])=>id.startsWith('A2')))")
            assert len(bank)==4
            for unit_index,(uid,spec) in enumerate(bank.items()):
                page.goto(base+'#skills-'+uid)
                page.locator('#skills-studio').get_by_role('button',name='Apply this language in a new listening',exact=True).click()
                for visit in range(3):
                    start='Begin a new version' if visit==0 else 'Try the other new version' if visit==1 else 'Repeat a used version'
                    if unit_index==0 and visit==0:
                        before=page.evaluate(STATE);page.evaluate(FAIL)
                        d.get_by_role('button',name=start,exact=True).click()
                        assert 'could not be saved' in d.locator('[role=status]').inner_text()
                        assert page.evaluate(STATE)==before;page.evaluate(RESTORE)
                    d.get_by_role('button',name=start,exact=True).click();locked(d)
                    attempt=json.loads(page.evaluate(STATE))['units'][uid]['attempts'][-1]
                    assert attempt['firstExposure']==(visit<2)
                    variant=next(v for v in spec['variants'] if v['id']==attempt['variantId'])
                    before=page.evaluate(STATE)
                    # A forced handler cannot bypass the complete-playback gate.
                    page.evaluate("()=>{const b=document.querySelector('#a1-practice form button');b.disabled=false;b.click();}")
                    assert page.evaluate(STATE)==before
                    if unit_index==0 and visit==0:
                        page.evaluate("()=>{window.__realAudio=window.Audio;window.Audio=function(url){const a=new __realAudio(url);a.play=()=>Promise.reject(Error('test failure'));return a;};}")
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('could not start')");locked(d)
                        page.evaluate("()=>{window.Audio=function(url){const a=new __realAudio(url);a.play=()=>{queueMicrotask(()=>a.dispatchEvent(new Event('ended')));return Promise.resolve();};return a;};}")
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('did not finish')");locked(d)
                        page.evaluate('window.Audio=window.__realAudio')
                        page.evaluate(FAIL)
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('could not be saved')");locked(d)
                        assert page.evaluate(STATE)==before;page.evaluate(RESTORE)
                    play(page,d)
                    for index,q in enumerate(variant['questions']):
                        assert d.locator('.a1-panel[lang]').count()==0
                        assert 'Listening feedback' not in d.inner_text() and q['explanation'] not in d.inner_text()
                        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                        form=d.get_by_role('form',name='Choose the meaning',exact=True)
                        assert form.get_by_role('button').count()==3
                        choice=q['options'][(q['answer']+1)%3] if unit_index==0 and visit==0 and index==0 else q['options'][q['answer']]
                        if unit_index==0 and visit==0 and index==0:
                            d.get_by_role('button',name=choice,exact=True).scroll_into_view_if_needed()
                            page.screenshot(path=str(OUT/(lang+'-question-mobile.png')))
                            before=page.evaluate(STATE);page.evaluate(FAIL)
                            form.get_by_role('button',name=choice,exact=True).click()
                            assert 'could not be saved' in d.locator('[role=status]').inner_text() and page.evaluate(STATE)==before
                            page.evaluate(RESTORE)
                        form.get_by_role('button',name=choice,exact=True).click()
                        if index==0:
                            page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
                            assert 'Detail 2 of 3' in d.inner_text();locked(d);play(page,d)
                    assert 'Listening feedback' in d.inner_text()
                    assert ('2 of 3' if unit_index==0 and visit==0 else '3 of 3')+' details correct' in d.inner_text()
                    assert d.locator('.a1-panel[lang]').inner_text()==variant['text']
                    for q in variant['questions']:assert q['explanation'] in d.inner_text()
                    if visit==2:assert 'Repeat practice with a previously heard recording' in d.inner_text()
                status=page.evaluate('id=>WordamiListeningTransferChecks.catalogue().find(s=>s.id===id)',uid)
                assert status['completed']==3 and status['firstExposureCompleted']==2 and status['sourceVariantsSeen']==2 and status['cefrLevel'] is None
                print(lang+' '+uid+' both sources and repeat passed',flush=True)
            stored=json.loads(page.evaluate(STATE))
            assert stored['units']['A1']==original_a1
            for u in stored['units'].values():
                for a in u['attempts']:
                    assert a['playbackCount']>=1 and a['audioHash']
                    assert all(set(r)=={'correct','answeredAt','audioHash','playbackCount'} and r['audioHash']==a['audioHash'] and r['playbackCount']>=1 for r in a['answers'])
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==prepared
            assert page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")==reading
            with page.expect_download() as info:d.get_by_role('button',name='Export listening-check records',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert exported['language']==lang and {'A1',*bank}.issubset(exported['units'])
            d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-feedback-mobile.png')))
            # No added source support: preserve results but do not expose feedback.
            before=page.evaluate(STATE)
            page.route('**/a2-source-support.js',lambda route:route.fulfill(status=200,body='/* unavailable */'))
            page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
            assert 'Complete the connected unit' in d.inner_text() and d.locator('form,.a1-panel[lang]').count()==0
            assert page.evaluate(STATE)==before and page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            page.unroute('**/a2-source-support.js');page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
            d.get_by_role('button',name='Repeat a used version',exact=True).click();locked(d)
            # A missing recording keeps all choices locked.
            page.evaluate("()=>{window.__savedAssets=WordamiListeningTransferAudio;window.WordamiListeningTransferAudio={};}")
            d.get_by_role('button',name='Listen to the complete message',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('unavailable')");locked(d)
            page.evaluate('window.WordamiListeningTransferAudio=window.__savedAssets')
            # Close during playback: late callbacks must not record completion.
            before=page.evaluate(STATE)
            page.evaluate("()=>{const d=document.querySelector('#a1-practice');[...d.querySelectorAll('button')].find(b=>b.textContent==='Listen to the complete message').click();[...d.querySelectorAll('button')].find(b=>b.textContent==='Save & close').click();}")
            page.wait_for_timeout(200);assert page.evaluate(STATE)==before
            page.evaluate("WordamiListeningTransferChecks.open('A2-meals')");locked(d);play(page,d)
            d.get_by_role('button',name='Save & close',exact=True).click()
            page.evaluate("WordamiListeningTransferChecks.open('A2-meals')");locked(d);play(page,d)
            # Another tab's save wins rather than being overwritten by a choice.
            page.evaluate("()=>{const k='wordami.listening-transfer.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.externalNote='other-tab';localStorage.setItem(k,JSON.stringify(s));}")
            d.get_by_role('form',name='Choose the meaning').get_by_role('button').first.click()
            assert 'another tab' in d.locator('[role=status]').inner_text()
            assert json.loads(page.evaluate(STATE))['externalNote']=='other-tab'
            other='es' if lang=='lt' else 'lt'
            assert page.evaluate('lang=>localStorage.getItem("wordami.listening-transfer.v1."+lang)',other) is None
            assert not errors,errors
            reports.append({'language':lang,'A2Units':4,'uniqueRecordings':8,'questions':24,'visits':12,'actualDecodedPlaybackRequired':True,'transcriptAndFeedbackHeld':True,'failedAndEarlyPlaybackRejected':True,'quotaRollback':True,'reloadAndCloseRequireReplay':True,'cancelledPlaybackNotSaved':True,'missingRecordingStaysLocked':True,'A1ResultPreserved':True,'sourceGateRequired':True,'exportOutcomesOnly':True,'conflictProtected':True,'originalAndReadingProgressUnchanged':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('All 16 A2 recordings / 48 meaning questions passed actual playback, held transcripts, save/reload, repeats, privacy and A1 preservation checks.')


if __name__=='__main__':main()
