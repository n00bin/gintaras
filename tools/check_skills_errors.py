"""No false skill results from interrupted audio, microphone failures or conflicting saves."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import FAST_AUDIO,answer_check,grammar_lesson,vocabulary_lesson

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'skills-studio'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass

def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        context=browser.new_context(service_workers='block',permissions=['microphone'],accept_downloads=True)
        context.add_init_script(FAST_AUDIO)
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(url+'?preview=1&lang=es#skills-A1');page.wait_for_function('window.WordamiSkillsStudio');page.locator('#splash').wait_for(state='detached')
        d=page.locator('#skills-studio');level=page.evaluate('WordamiSkillsContent.levels[0]')
        d.get_by_role('button',name='Learn the language',exact=True).click()
        vocabulary_lesson(page,d,'A1')
        for phrase in level['writing']['phrases']:
            d.get_by_role('button',name='Practise this meaning').click();d.get_by_role('button',name=phrase[1],exact=True).click()
        d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation').click()
        grammar_lesson(page,d,'A1')
        answer_check(page,d,level,'reading')
        d.get_by_role('button',name='Begin \u00b7 Listen and understand',exact=True).click()
        # An HTTP/media error must leave all response buttons disabled and record no hearing credit.
        page.route('**/audio/skills/*',lambda route:route.abort())
        d.get_by_role('button',name='Listen to the full recording').click()
        d.locator('[role=status]').filter(has_text='Audio could not').wait_for()
        assert d.get_by_role('button',name=level['questions'][0][1][0],exact=True).is_disabled()
        assert page.evaluate("()=>Object.keys(JSON.parse(localStorage.getItem('wordami.skills.v1.es')).levels.A1.checks.listening.answers).length") == 0
        page.unroute('**/audio/skills/*')
        # Cancel before real playback ends. The late media callback cannot grant audio completion.
        d.get_by_role('button',name='Listen to the full recording').click()
        d.get_by_role('button',name='Back to stage',exact=True).click()
        attempt=page.evaluate("()=>WordamiActivities.attempt(JSON.parse(localStorage.getItem('wordami.skills.v1.es')).levels.A1.checks.listening.attemptId)")
        assert not attempt['tasks']
        # After a completed play and one answer, reload must require hearing the recording again.
        d.get_by_role('button',name='Begin \u00b7 Listen and understand',exact=True).click()
        d.get_by_role('button',name='Listen to the full recording').click()
        page.wait_for_function("document.querySelector('#skills-studio [role=status]').textContent.includes('Recording finished')")
        q=level['questions'][0];d.get_by_role('button',name=q[1][q[2]],exact=True).click()
        page.reload();d.get_by_role('button',name='Begin \u00b7 Listen and understand',exact=True).click()
        q=level['questions'][1];assert d.get_by_role('button',name=q[1][q[2]],exact=True).is_disabled()
        d.get_by_role('button',name='Listen to the full recording').click()
        page.wait_for_function("document.querySelector('#skills-studio [role=status]').textContent.includes('Recording finished')")
        for q in level['questions'][1:]:d.get_by_role('button',name=q[1][q[2]],exact=True).click()
        d.get_by_role('button',name='Back to stage',exact=True).click()
        # Permission denial and unsupported recording cannot complete spoken practice.
        d.get_by_role('button',name='Begin production',exact=True).click()
        page.evaluate("()=>{window.__realMic=navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);navigator.mediaDevices.getUserMedia=async()=>{throw new DOMException('test denied','NotAllowedError');};}")
        d.get_by_role('button',name='Start recording',exact=True).click()
        assert 'Microphone access was unavailable' in d.locator('[role=status]').inner_text()
        assert d.get_by_role('button',name='Save self-review').is_disabled()
        page.evaluate("()=>{navigator.mediaDevices.getUserMedia=window.__realMic;window.__realRecorder=window.MediaRecorder;window.MediaRecorder=undefined;}")
        d.get_by_role('button',name='Start recording',exact=True).click()
        assert 'Recording is unavailable' in d.locator('[role=status]').inner_text()
        page.evaluate('()=>{window.MediaRecorder=window.__realRecorder;}')
        assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].spoken.production')
        # Navigating away while permission is pending must stop the eventually returned stream.
        page.evaluate("()=>{navigator.mediaDevices.getUserMedia=()=>new Promise(resolve=>window.__resolveMic=()=>__realMic({audio:true}).then(s=>{window.__lateStream=s;resolve(s);}));}")
        d.get_by_role('button',name='Start recording',exact=True).click()
        d.get_by_role('button',name='Back to stage',exact=True).click()
        page.evaluate('()=>window.__resolveMic()')
        page.wait_for_function('window.__lateStream?.getTracks().every(t=>t.readyState==="ended")')
        page.evaluate('()=>{navigator.mediaDevices.getUserMedia=window.__realMic;}')
        # A second tab's newer practice save cannot be overwritten by a stale source-preparation page.
        d.get_by_role('button',name='Revisit language preparation',exact=True).click()
        second=context.new_page();second.goto(url+'?preview=1&lang=es#skills-A1')
        sd=second.locator('#skills-studio');sd.get_by_role('button',name='Review \u00b7 Read and understand',exact=True).click()
        sd.get_by_role('button',name='Try a fresh check',exact=True).click()
        q=level['readingQuestions'][0];sd.get_by_role('button',name=q[1][q[2]],exact=True).click()
        expected=second.evaluate("localStorage.getItem('wordami.skills.v1.es')")
        d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation').click()
        assert 'another tab' in d.locator('[role=status]').inner_text()
        assert page.evaluate("localStorage.getItem('wordami.skills.v1.es')") == expected
        d.get_by_role('button',name='Back to stage',exact=True).click();d.get_by_role('button',name='All skill stages',exact=True).click()
        with page.expect_download() as info:d.get_by_role('button',name='Export skills portfolio').click()
        assert json.loads(Path(info.value.path()).read_text(encoding='utf8'))['language']=='es'
        assert not errors,errors
        context.close()
        # Fresh installation, then first-ever playback of an advanced asset entirely offline.
        context=browser.new_context();context.add_init_script(FAST_AUDIO);page=context.new_page()
        page.goto(url+'?preview=1&lang=lt#skills')
        page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
        context.set_offline(True);page.reload();page.wait_for_function('window.WordamiSkillsStudio')
        result=page.evaluate("()=>new Promise(resolve=>{const a=new Audio(WordamiSkillsAudio['lt.C2.listen'].url);a.onended=()=>resolve(a.currentTime>70);a.onerror=()=>resolve(false);a.play().catch(()=>resolve(false));})")
        assert result
        assert not page.evaluate("WordamiActivities.status('skills.C2.listening').finished")
        context.close();browser.close()
    server.shutdown();OUT.mkdir(parents=True,exist_ok=True)
    (OUT/'errors-verification.json').write_text(json.dumps({'passed':True,'checks':['missing audio','cancelled audio','partial check reload','microphone denied','unsupported recording','late permission stream cleanup','conflicting tab save and export','first advanced recording playback offline']},indent=2),encoding='utf8')
    print('Audio and microphone failures, cancellation, resume, tab conflicts and cold offline advanced playback passed.')

if __name__=='__main__':main()
