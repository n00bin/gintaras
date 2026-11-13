"""Verify complete actual playback, hidden transcripts and separate listening evidence."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/listening-transfer'
FAIL="""()=>{window.__listenSave=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.listening-transfer.v1.'))throw new DOMException('full','QuotaExceededError');return window.__listenSave.call(this,k,v);};}"""
RESTORE='()=>{Storage.prototype.setItem=window.__listenSave;}'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},accept_downloads=True)
            context.add_init_script(FAST_AUDIO);page=context.new_page();errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#listen-transfer-A1');page.wait_for_function('window.WordamiListeningTransferChecks')
            page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
            assert 'Complete the connected unit' in d.inner_text()
            assert d.get_by_role('button',name='Begin a new version',exact=True).count()==0
            assert page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)") is None
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
            baseline=page.evaluate('JSON.stringify(S)');skills=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiListeningTransferContent.units).filter(([id])=>id.startsWith('A1')))")
            for unit_index,(uid,spec) in enumerate(bank.items()):
                page.goto(base+'#skills-'+uid)
                page.locator('#skills-studio').get_by_role('button',name='Apply this language in a new listening',exact=True).click()
                for visit in range(2):
                    d.get_by_role('button',name='Begin a new version' if visit==0 else 'Try the other new version',exact=True).click()
                    variant=spec['variants'][visit]
                    assert d.locator('.a1-panel[lang]').count()==0
                    assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
                    page.evaluate("document.querySelector('#a1-practice form').requestSubmit()")
                    assert page.evaluate("JSON.parse(localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)).units["+json.dumps(uid)+"].attempts.slice(-1)[0].answers.length")==0
                    if unit_index==0 and visit==0:
                        # A failed start and an early ended event grant no credit.
                        page.evaluate("()=>{window.__realListeningAudio=window.Audio;window.Audio=function(url){const a=new __realListeningAudio(url);a.play=()=>Promise.reject(Error('test playback failure'));return a;};}")
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('could not start')")
                        assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
                        page.evaluate("()=>{window.Audio=function(url){const a=new __realListeningAudio(url);a.play=()=>{queueMicrotask(()=>a.dispatchEvent(new Event('ended')));return Promise.resolve();};return a;};}")
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('did not finish')")
                        assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
                        page.evaluate('window.Audio=window.__realListeningAudio')
                        # A complete recording with an unsaved result also stays locked.
                        page.evaluate(FAIL)
                        d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                        page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('could not be saved')")
                        assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
                        page.evaluate(RESTORE)
                    d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                    page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')")
                    for index,q in enumerate(variant['questions']):
                        assert d.locator('.a1-panel[lang]').count()==0
                        assert 'Listening feedback' not in d.inner_text()
                        answer='raw-unknown-not-to-store' if unit_index==0 and visit==0 and index==0 else q['answers'][0]
                        d.get_by_role('textbox',name='Your short listening answer',exact=True).fill(answer)
                        if unit_index==0 and visit==0 and index==0:
                            before=page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)")
                            page.evaluate(FAIL);d.get_by_role('button',name='Record answer',exact=True).click()
                            assert page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)")==before
                            page.evaluate(RESTORE)
                        d.get_by_role('button',name='Record answer',exact=True).click()
                        if unit_index==0 and visit==0 and index==0:
                            page.reload();page.wait_for_function('window.WordamiListeningTransferChecks')
                            assert 'Detail 2 of 3' in d.inner_text()
                            assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
                            d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')")
                    assert ('2 of 3' if unit_index==0 and visit==0 else '3 of 3') in d.inner_text()
                    assert 'Transcript after the check' in d.inner_text()
                    assert d.locator('.a1-panel[lang]').inner_text()==variant['text']
                    assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                print(lang+' '+uid+' both listening versions passed',flush=True)
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==skills
            assert page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)") is None
            stored=page.evaluate("JSON.parse(localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code))")
            assert 'raw-unknown-not-to-store' not in json.dumps(stored)
            for unit in stored['units'].values():
                assert len(unit['attempts'])==2
                for attempt in unit['attempts']:
                    assert attempt['playbackCount']>=1 and attempt['audioHash']
                    assert all(a['audioHash']==attempt['audioHash'] and a['playbackCount']>=1 for a in attempt['answers'])
            d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-feedback-mobile.png')))
            with page.expect_download() as info:d.get_by_role('button',name='Export listening-check records',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==4
            # A repeat is explicit and cannot inherit the previous playback unlock.
            d.get_by_role('button',name='Repeat a used version',exact=True).click()
            assert 'Repeat practice' in d.inner_text()
            assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
            d.get_by_role('button',name='Listen to the complete message',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')")
            d.get_by_role('button',name='Save & close',exact=True).click()
            page.evaluate("WordamiListeningTransferChecks.open('A1-travel')")
            assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
            before=page.evaluate("JSON.parse(localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)).units['A1-travel'].attempts.slice(-1)[0].playbackCount")
            page.evaluate("()=>{const d=document.querySelector('#a1-practice');[...d.querySelectorAll('button')].find(b=>b.textContent==='Listen to the complete message').click();[...d.querySelectorAll('button')].find(b=>b.textContent==='Save & close').click();}")
            page.wait_for_timeout(200)
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)).units['A1-travel'].attempts.slice(-1)[0].playbackCount")==before
            page.evaluate("WordamiListeningTransferChecks.open('A1-travel')")
            assert d.get_by_role('button',name='Record answer',exact=True).is_disabled()
            saved_language=page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)")
            other='es' if lang=='lt' else 'lt'
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={other}#listen-transfer-A1')
            page.wait_for_function('window.WordamiListeningTransferChecks')
            assert page.evaluate('WordamiListeningTransferChecks.catalogue().every(s=>!s.ready&&s.attempts===0)')
            assert page.evaluate('lang=>localStorage.getItem("wordami.listening-transfer.v1."+lang)',lang)==saved_language
            assert not errors,errors
            reports.append({'language':lang,'units':4,'recordingsPlayed':8,'prerequisitesRequired':True,'transcriptHiddenUntilFeedback':True,'actualFullPlaybackRequired':True,'earlyEndedEventRejected':True,'failedPlaybackDoesNotUnlock':True,'failedSaveDoesNotUnlock':True,'answerSaveRollback':True,'reloadRequiresListeningAgain':True,'closeRequiresListeningAgain':True,'cancelledPlaybackDoesNotCount':True,'repeatRequiresNewPlayback':True,'readingAndOriginalStateUnchanged':True,'sameBrowserLanguageIsolation':True,'rawAnswersNotStored':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('All 16 complete recordings passed actual playback, hidden transcript, rollback, resume, export and language isolation checks.')


if __name__=='__main__':main()
