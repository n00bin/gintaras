"""Exercise A1 revision feedback and replay-note gates with synthetic course fixtures."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/a1-feedback'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def record_and_replay(page,d):
    d.get_by_role('button',name='Start recording',exact=True).click()
    d.get_by_role('button',name='Stop recording',exact=True).wait_for()
    page.wait_for_timeout(1200)
    d.get_by_role('button',name='Stop recording',exact=True).click()
    page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Replay my response'&&!b.disabled)")
    d.get_by_role('button',name='Replay my response',exact=True).click()
    page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Check my replay notes'&&!b.disabled)")


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},permissions=['microphone'])
            context.add_init_script(FAST_AUDIO);page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#skills');page.wait_for_function('window.WordamiA1Feedback && window.WordamiSkillsStudio');page.locator('#splash').wait_for(state='detached')
            for uid in ['A1','A1-shopping','A1-home','A1-travel']:
                page.evaluate(SEED);page.goto(base+'#skills-'+uid);page.reload();page.wait_for_function('window.WordamiA1Feedback && window.WordamiSkillsStudio');d=page.locator('#skills-studio')
                baseline=page.evaluate('JSON.stringify(S)')
                d.get_by_role('button',name='Practise production again',exact=True).click()
                feedback=d.get_by_role('button',name='Check my replay notes',exact=True)
                assert feedback.is_disabled()
                record_and_replay(page,d)
                notes=d.get_by_role('textbox',name='Notes from your speaking replay',exact=True)
                notes.fill('private-replay-note-do-not-save')
                feedback.click();assert 'Not recognised yet' in d.inner_text()
                good=page.evaluate("id=>WordamiSkillsContent.units.find(u=>u.id===id).reading",uid)
                notes.fill(good);assert 'Your text changed' in d.inner_text()
                feedback.click();assert 'Feedback on prepared patterns' in d.inner_text()
                assert 'does not listen to or assess your audio' in d.inner_text()
                assert not page.evaluate("()=>Object.values(localStorage).some(v=>v.includes('private-replay-note-do-not-save'))")
                assert page.evaluate('JSON.stringify(S)')==baseline
                assert not page.evaluate('id=>WordamiSkillsStudio.catalogue().find(u=>u.id===id).spoken.production',uid)
                assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                # A new recording invalidates the replay-note feedback gate.
                d.get_by_role('button',name='Record again',exact=True).click()
                d.get_by_role('button',name='Stop recording',exact=True).wait_for()
                assert feedback.is_disabled()
                assert 'Feedback on prepared patterns' not in d.inner_text()
                d.get_by_role('button',name='Back to stage',exact=True).click()
                assert not page.evaluate("()=>Object.values(localStorage).some(v=>v.includes('private-replay-note-do-not-save'))")
            cases=[('A1','profile'),('A1','home-note'),('A1','meeting-message'),('A1-shopping',None),('A1-home',None),('A1-travel',None)]
            for uid,project_id in cases:
                page.evaluate(SEED)
                if project_id:
                    page.evaluate("id=>{const k='wordami.writing.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.projects['A1.'+id].stage='draft';delete s.projects['A1.'+id].completedAt;localStorage.setItem(k,JSON.stringify(s));}",project_id)
                    page.goto(base+'#writing-A1');page.reload();page.wait_for_function('window.WordamiA1Feedback && window.WordamiSkillsStudio');d=page.locator('#writing-studio')
                    index=['profile','home-note','meeting-message'].index(project_id)
                    d.get_by_role('button',name='Continue draft',exact=True).click()
                    field=d.locator('#ws-draft');before=2
                else:
                    page.evaluate("id=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.levels[id].writing={draft:'Synthetic starting draft',baseline:'',stage:'draft',excerpts:['','',''],reflection:'',revisions:[]};localStorage.setItem(k,JSON.stringify(s));}",uid)
                    page.goto(base+'#skills-'+uid);page.reload();page.wait_for_function('window.WordamiA1Feedback && window.WordamiSkillsStudio');d=page.locator('#skills-studio')
                    d.get_by_role('button',name='Open writing assignment',exact=True).click();field=d.locator('#skills-draft');before=0
                bad='Aš gyvena Vilnius.' if lang=='lt' else 'Yo vive en México.'
                field.fill(bad);d.get_by_role('button',name='Get revision guidance',exact=True).click()
                d.get_by_role('button',name='Check the task details',exact=True).click()
                assert 'Not recognised yet' in d.inner_text()
                assert ('verb form' if lang=='lt' else 'use vivo') in d.inner_text()
                good=page.evaluate("id=>WordamiSkillsContent.units.find(u=>u.id===id).reading",uid)
                field=d.locator('#ws-draft' if project_id else '#skills-draft')
                field.fill(good);assert 'Your text changed' in d.inner_text()
                d.get_by_role('button',name='Check the task details',exact=True).click()
                assert 'Feedback on prepared patterns' in d.inner_text()
                assert page.evaluate('id=>WordamiSkillsStudio.catalogue().find(u=>u.id===id).writing',uid)==before
                save_name='Save revised project' if project_id else 'Save revised assignment'
                d.get_by_role('button',name=save_name,exact=True).click()
                assert 'quote' in d.locator('[role=status]').inner_text().lower()
                assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-writing-feedback-mobile.png')))
            assert not errors,errors
            reports.append({'language':lang,'speakingContexts':4,'writingContexts':6,'actualRecordingAndReplayRequired':True,'recordAgainInvalidatesFeedback':True,'revisionClearsStaleFeedback':True,'notesNotStored':True,'feedbackDoesNotCompleteTasks':True,'selfReviewEvidenceStillRequired':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Both languages: 8 speaking and 12 writing feedback contexts passed recording gates, revision, privacy and no-score checks.')


if __name__=='__main__':main()
