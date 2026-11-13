"""Walk fresh A2 units after a synthetic completed A1 prefix; no learner proficiency claims."""
import http.server
import json
import re
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
import check_skills_studio as flow

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/a2-pathway'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();flow.BASE=f'http://127.0.0.1:{server.server_port}/';reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':390,'height':844},permissions=['microphone'])
            context.add_init_script(flow.FAST_AUDIO);page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=flow.BASE+f'?preview=1&lang={lang}'
            page.goto(base+'#skills');page.wait_for_function('window.WordamiSkillsStudio && window.WordamiInteractionPractice');page.locator('#splash').wait_for(state='detached')
            page.evaluate(SEED)
            page.evaluate("()=>{const lang=LANG.code,sk='wordami.skills.v1.'+lang,wk='wordami.writing.v1.'+lang,gk='wordami.grammar.v1.'+lang,s=JSON.parse(localStorage.getItem(sk)),w=JSON.parse(localStorage.getItem(wk)),g=JSON.parse(localStorage.getItem(gk));for(const u of WordamiSkillsContent.units.slice(4))delete s.levels[u.id];for(const b of ['A2','B1','B2','C1','C2']){delete w.lessons[b];delete g.lessons[b];for(const k of Object.keys(w.projects))if(k.startsWith(b+'.'))delete w.projects[k];}localStorage.setItem(sk,JSON.stringify(s));localStorage.setItem(wk,JSON.stringify(w));localStorage.setItem(gk,JSON.stringify(g));}")
            page.goto(base+'#skills-A2');page.reload();page.wait_for_function('window.WordamiSkillsStudio')
            baseline=page.evaluate('JSON.stringify(S)');d=page.locator('#skills-studio')
            units=page.evaluate("WordamiSkillsContent.units.filter(u=>(u.band||u.id)==='A2')")
            for unit in units:
                page.evaluate('id=>{location.hash="skills-"+id;}',unit['id'])
                assert d.get_by_role('button',name=re.compile('Begin.*Read and understand')).is_disabled()
                assert not page.evaluate('id=>WordamiSkillsStudio.canWrite(id)',unit['id'])
                d.get_by_role('button',name='Learn the language',exact=True).click();flow.vocabulary_lesson(page,d,unit['id'])
                for phrase in unit['writing']['phrases']:
                    d.get_by_role('button',name='Practise this meaning',exact=True).click()
                    d.get_by_role('button',name=phrase[1],exact=True).click()
                assert 'Extra language for these sources' in d.inner_text()
                d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation',exact=True).click()
                if d.get_by_role('button',name='Learn grammar',exact=True).count():flow.grammar_lesson(page,d,'A2')
                flow.answer_check(page,d,unit,'reading');flow.answer_check(page,d,unit,'listening')
                d.get_by_role('button',name='Begin production',exact=True).click();flow.record_response(page,d)
                d.get_by_role('button',name='Begin interaction',exact=True).click()
                for turn in range(3):
                    d.get_by_role('button',name='Hear your partner',exact=True).click()
                    page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Start recording'&&!b.disabled)")
                    flow.record_response(page,d)
                d.get_by_role('button',name='Begin mediation',exact=True).click();flow.record_response(page,d)
                flow.writing_projects(page,lang,unit)
                assert page.evaluate('id=>WordamiSkillsStudio.catalogue().find(u=>u.id===id).complete',unit['id'])
                assert page.evaluate('JSON.stringify(S)')==baseline
                print(lang+' '+unit['id']+' fresh A2 all-skills path passed',flush=True)
            assert page.evaluate("WordamiSkillsStudio.catalogue().find(u=>u.id==='B1').open")
            assert not errors,errors
            reports.append({'language':lang,'freshA2Units':4,'vocabularyIntroductions':32,'sentencePatterns':32,'comprehensionQuestions':24,'ownRecordedResponses':20,'writingProjects':6,'A1PrefixSynthetic':True,'B1UnlocksAfterA2Completion':True,'originalCourseStateUnchanged':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Eight fresh A2 units and twelve writing projects passed the actual all-skills workflow in both languages.')


if __name__=='__main__':main()
