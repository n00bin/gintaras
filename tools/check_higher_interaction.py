"""A2-C2 intention-led guided exchanges, with real recording/replay and branch-specific checks."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO
from check_interaction_practice import recorded_review
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/higher-interaction'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},permissions=['microphone'],accept_downloads=True)
            context.add_init_script(FAST_AUDIO)
            context.add_init_script("(()=>{window.__exchangeStreams=[];const native=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=async(...args)=>{const stream=await native(...args);window.__exchangeStreams.push(stream);return stream;};})();")
            page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#guided-exchange-B1');page.wait_for_function('window.WordamiInteractionPractice');page.locator('#splash').wait_for(state='detached')
            d=page.locator('#a1-practice');assert 'Complete the unit' in d.inner_text()
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiInteractionPractice')
            assert page.evaluate('Object.keys(WordamiInteractionPracticeAudio).length')==192
            baseline=page.evaluate('JSON.stringify(S)');course=page.evaluate('JSON.stringify(WordamiSkillsStudio.catalogue())');memory=page.evaluate('WordamiStudyMemory.summary().learned')
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiInteractionPracticeContent.units).filter(([id])=>!id.startsWith('A1')))")
            assert len(bank)==20;recordings=0
            for unit_index,(uid,spec) in enumerate(bank.items()):
                page.goto(base+'#skills-'+uid);page.reload();page.wait_for_function('window.WordamiInteractionPractice')
                page.locator('#skills-studio').get_by_role('button',name='Practise checking and clarifying',exact=True).click()
                for index,(branch,target,meaning) in enumerate(spec['questions']):
                    check=spec['branches'][branch]
                    d.get_by_role('button',name='Begin guided exchange' if index==0 else 'Practise another exchange',exact=True).click()
                    d.get_by_role('button',name='Hear the situation',exact=True).click()
                    name='Ask about: '+meaning if spec['supportMode']=='intent_first' else 'Ask: '+target
                    d.get_by_role('button',name=name,exact=True).wait_for();d.get_by_role('button',name=name,exact=True).click()
                    use_help=spec['supportMode']=='intent_first' and unit_index%4==0 and index==0
                    if spec['supportMode']=='intent_first':
                        assert d.locator('.a1-panel[lang]').count()==0
                        if use_help:
                            d.get_by_role('button',name='Show a question frame',exact=True).click()
                            assert d.locator('.a1-panel[lang]').inner_text()==target
                            before=page.evaluate('window.__completedMedia.length')
                            d.get_by_role('button',name='Hear the question model',exact=True).click()
                            page.wait_for_function('n=>window.__completedMedia.length>n',arg=before)
                    recorded_review(page,d);recordings+=1
                    assert 'Hear the partner’s reply' in d.inner_text()
                    if index==0:
                        page.reload();page.wait_for_function('window.WordamiInteractionPractice')
                    correct=check['options'][check['answer']]
                    assert d.get_by_role('button',name=correct,exact=True).is_disabled()
                    assert spec['replies'][branch] not in d.inner_text()
                    d.get_by_role('button',name='Hear the partner reply',exact=True).click()
                    page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Partner finished')")
                    if unit_index%4==0:
                        d.get_by_role('button',name=check['options'][(check['answer']+1)%3],exact=True).click()
                        assert 'try again' in d.locator('[role=status]').inner_text()
                    d.get_by_role('button',name=correct,exact=True).click()
                    assert check['responseGoal'] in d.inner_text()
                    assert d.get_by_text(check['detailModel'],exact=True).is_hidden()
                    assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                    recorded_review(page,d,reflection=True);recordings+=1
                    assert 'Guided exchange self-reviewed' in d.inner_text()
                    assert page.evaluate('()=>window.__exchangeStreams.every(s=>s.getTracks().every(t=>t.readyState==="ended"))')
                    current=page.evaluate("id=>JSON.parse(localStorage.getItem('wordami.interaction-practice.v1.'+LANG.code)).units[id].rounds.slice(-1)[0]",uid)
                    assert current['question']==branch and current['completedAt'] and current['detailUnderstood']
                    assert current['assisted'] and current['questionReview']['selfReviewed'] and current['responseReview']['selfReviewed']
                    assert bool(current.get('questionFrameViewedAt'))==use_help and bool(current.get('questionModelHeardAt'))==use_help
                    print(lang+' '+uid+' '+branch+' recorded branch passed',flush=True)
            assert recordings==80
            assert page.evaluate('JSON.stringify(S)')==baseline and page.evaluate('JSON.stringify(WordamiSkillsStudio.catalogue())')==course
            assert page.evaluate('WordamiStudyMemory.summary().learned')==memory
            assert page.evaluate("localStorage.getItem('wordami.listening-transfer.v1.'+LANG.code)") is None
            assert all(s['cefrLevel'] is None for s in page.evaluate('WordamiInteractionPractice.catalogue()'))
            with page.expect_download() as info:d.get_by_role('button',name='Export guided exchange records',exact=True).click()
            raw=Path(info.value.path()).read_text(encoding='utf8');exported=json.loads(raw)
            assert len(exported['units'])==20 and exported['language']==lang and 'blob:' not in raw and 'data:audio' not in raw
            assert all(len(u['rounds'])==2 for u in exported['units'].values())
            d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-c2-exchange-feedback-mobile.png')))
            assert not errors,errors
            reports.append({'language':lang,'A2C2Scenarios':20,'branchesCompleted':40,'ownRecordings':recordings,'questionFramesOptionalFromB1':True,'modelUseRecorded':True,'repliesFollowIntentionSelection':True,'replySpecificChecks':True,'resumeRequiresReplyReplay':True,'microphoneTracksStopped':True,'originalProgressUnchanged':True,'noAudioInExport':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('All 80 new A2-C2 branches and 160 own recordings passed intention selection, optional support, media, reply meaning, resume and privacy checks.')
if __name__=='__main__':main()
