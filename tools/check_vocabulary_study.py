"""Vocabulary preparation must be taught, persisted and distinct from sentence preparation."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import FAST_AUDIO
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'vocabulary-study'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740});page=context.new_page();page.add_init_script(FAST_AUDIO)
            page.goto(url+f'?preview=1&lang={lang}#skills-C2-register');page.wait_for_function('window.WordamiSkillsStudio');page.locator('#splash').wait_for(state='detached')
            assert page.locator('#skills-studio').get_by_text('Preview vocabulary',exact=True).count()==1
            assert page.evaluate('WordamiStudyMemory.summary().learned')==0
            page.goto(url+f'?preview=1&lang={lang}#skills-A1');d=page.locator('#skills-studio')
            words=page.evaluate('WordamiVocabularyContent.units.A1')
            d.get_by_role('button',name='Learn the language',exact=True).click()
            for index,word in enumerate(words):
                if index==0:
                    d.get_by_role('button',name='Hear this word',exact=True).click()
                    page.wait_for_function("document.querySelector('#skills-studio [role=status]').textContent.includes('Word recording finished')")
                    assert page.evaluate('WordamiStudyMemory.summary().learned')==0
                d.get_by_role('button',name='Practise this word',exact=True).click()
                if index==0:
                    d.get_by_role('button',name=words[3]['meaning'],exact=True).click()
                    assert page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabulary')==0
                    assert page.evaluate('WordamiStudyMemory.summary().learned')==0
                if index==1:
                    page.evaluate("()=>{window.__setItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.skills.v1.'))throw new DOMException('full','QuotaExceededError');return __setItem.call(this,k,v);};}")
                    d.get_by_role('button',name=word['meaning'],exact=True).click()
                    assert page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabulary')==1
                    assert page.evaluate('WordamiStudyMemory.summary().learned')==1
                    page.evaluate('()=>{Storage.prototype.setItem=window.__setItem;}')
                d.get_by_role('button',name=word['meaning'],exact=True).click()
            assert page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabularyReady')
            assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].prepared')
            assert not page.evaluate("WordamiActivities.begin('skills.A1.reading')")
            assert page.evaluate('WordamiStudyMemory.summary().learned')==8
            before=page.evaluate('WordamiStudyMemory.catalogue()')
            d.get_by_role('button',name='Practise this meaning',exact=True).click()
            meaning=page.evaluate('WordamiWritingContent.levels[0].phrases[0][1]')
            d.get_by_role('button',name=meaning,exact=True).click()
            assert page.evaluate('WordamiStudyMemory.catalogue()')==before
            page.reload();d.get_by_role('button',name='Learn the language',exact=True).click()
            assert 'Phrase 2 of 8' in d.inner_text()
            page.route('**/vocabulary-content.js',lambda route:route.fulfill(status=200,content_type='application/javascript',body='/* missing vocabulary fixture */'))
            page.reload()
            assert page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabulary')==8
            assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabularyReady')
            assert 'Saved progress is retained' in d.inner_text()
            d.get_by_role('button',name='Save & close',exact=True).click()
            page.unroute('**/vocabulary-content.js');page.reload()
            assert page.evaluate('WordamiSkillsStudio.catalogue()[0].vocabularyReady')
            assert page.evaluate('WordamiStudyMemory.catalogue()')==before
            d.get_by_role('button',name='Learn the language',exact=True).click()
            assert 'Phrase 2 of 8' in d.inner_text()
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/(lang+'-mobile.png')))
            if lang=='es':
                senses=page.evaluate("WordamiVocabularyContent.deck().filter(d=>d.text.toLowerCase()==='llave')")
                assert {d['meaning'] for d in senses}>={'key','tap'}
                assert len({d['id'] for d in senses})==len(senses)
            reports.append({'language':lang,'previewDoesNotIntroduce':True,'wrongAnswerDoesNotIntroduce':True,'failedSaveRollback':True,'sourceGate':True,'resume':True,'existingSchedulePreserved':True,'missingVocabularyPreservesProgress':True})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2),encoding='utf8')
    print('Vocabulary gates, failed-save rollback, source separation, resume, schedule preservation and Spanish word senses passed.')
if __name__=='__main__':main()
