"""First offline reopen of either language must load the complete skills studio."""
import http.server,json,threading,sys
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import FAST_AUDIO
from check_curriculum_migration import SEED
from check_interaction_practice import recorded_review
ROOT=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
        languages=[sys.argv[sys.argv.index('--language')+1]] if '--language' in sys.argv else ['lt','es']
        for lang in languages:
            context=browser.new_context(permissions=['microphone']);context.add_init_script(FAST_AUDIO);page=context.new_page();errors=[];failures=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.on('requestfailed',lambda r:failures.append(r.url))
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills')
            page.wait_for_function('window.WordamiSkillsStudio');print(lang+' online shell ready',flush=True)
            try:page.evaluate("Promise.race([navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})})),new Promise((_,reject)=>setTimeout(()=>reject(Error('Installation timed out')),45000))])")
            except Exception:
                print('Installation diagnostics',lang,failures,errors,page.evaluate("async()=>({registrations:(await navigator.serviceWorker.getRegistrations()).map(r=>({installing:r.installing?.state,waiting:r.waiting?.state,active:r.active?.state})),cached:await Promise.all((await caches.keys()).map(async k=>[k,(await (await caches.open(k)).keys()).length]))})"),flush=True);raise
            print(lang+' cache installed',flush=True)
            cached=page.evaluate("async()=>{const out=[];for(const name of await caches.keys())for(const r of await (await caches.open(name)).keys())out.push(new URL(r.url).pathname);return out;}")
            context.set_offline(True);page.reload();print(lang+' offline shell reopened',flush=True)
            result=page.evaluate("()=>({studio:!!window.WordamiSkillsStudio,content:!!window.WordamiSkillsContent,writing:!!window.WordamiWritingContent,grammar:!!window.WordamiGrammar,phraseReview:!!window.WordamiStudyMemory,learningPlans:Object.keys(window.WordamiLearningDesign?.units||{}).length===30,sourceSupport:Object.keys(window.WordamiSourceSupport?.units||{}).length===30})")
            assert all(result.values()), result
            assert page.evaluate('WordamiSkillsContent.units.length')==30
            assert page.evaluate('WordamiGrammar.catalogue().length')==6
            page.evaluate('WordamiStudyMemory.open()')
            assert 'Complete vocabulary or phrase preparation' in page.locator('#a1-practice').inner_text()
            assert page.evaluate('WordamiStudyMemory.summary().learned')==0
            page.evaluate("WordamiGrammar.open('C2')")
            assert 'source preview' in page.locator('#a1-practice').inner_text()
            assert not page.evaluate("WordamiActivities.begin('grammar.C2')")
            played=page.evaluate("()=>new Promise(resolve=>{const a=window.__offlineTestAudio=new Audio(WordamiSkillsAudio[LANG.code+'.C2-register.listen'].url);const timer=setTimeout(()=>{a.pause();resolve(false);},20000);const done=ok=>{clearTimeout(timer);resolve(ok);};a.onended=()=>done(a.currentTime>40);a.onerror=()=>done(false);a.play().catch(()=>done(false));})");print(lang+' first advanced playback: '+str(played),flush=True)
            assert played
            assert not page.evaluate("WordamiActivities.status('skills.C2-register.listening').finished")
            result['firstNewAdvancedAudioOffline']=played
            assert page.evaluate('!!window.WordamiTransferChecks && Object.keys(WordamiTransferContent.units).length===24')
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiTransferChecks')
            page.evaluate("WordamiTransferChecks.open('A1')")
            check=page.locator('#a1-practice')
            check.get_by_role('button',name='Begin a new version',exact=True).click()
            questions=page.evaluate('WordamiTransferContent.units.A1.variants[0].questions')
            for question in questions:
                check.get_by_role('textbox',name='Your short reading answer',exact=True).fill(question['answers'][0])
                check.get_by_role('button',name='Record answer',exact=True).click()
            assert '3 of 3 details correct' in check.inner_text()
            result['readingTransferOfflineWithSyntheticPrerequisites']=True
            assert page.evaluate('!!window.WordamiListeningTransferChecks && Object.keys(WordamiListeningTransferContent.units).length===24')
            page.evaluate("WordamiListeningTransferChecks.open('A1')")
            check.get_by_role('button',name='Begin a new version',exact=True).click()
            assert check.locator('.a1-panel[lang]').count()==0
            assert check.get_by_role('button',name='Record answer',exact=True).is_disabled()
            check.get_by_role('button',name='Listen to the complete message',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')",timeout=20000)
            questions=page.evaluate('WordamiListeningTransferContent.units.A1.variants[0].questions')
            for question in questions:
                check.get_by_role('textbox',name='Your short listening answer',exact=True).fill(question['answers'][0])
                check.get_by_role('button',name='Record answer',exact=True).click()
            assert '3 of 3 details correct' in check.inner_text()
            assert 'Transcript after the check' in check.inner_text()
            result['firstListeningTransferOfflineWithSyntheticPrerequisites']=True
            assert page.evaluate("!!window.WordamiA1Feedback && WordamiA1Feedback.plans.length===10 && WordamiA1Feedback.analyse('A1.profile',WordamiWritingContent.levels[0].model).checks.every(c=>c.found)")
            result['guidedA1FeedbackOffline']=True
            assert page.evaluate("!!window.WordamiWritingPreparation && Object.keys(WordamiWritingPreparation.lessons).length===42 && !!WordamiWritingPreparation.get('A1.home-note').model")
            result['writingPreparationOffline']=True
            page.evaluate("()=>{const k='wordami.writing.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.projects['A1.profile'].stage='draft';delete s.projects['A1.profile'].completedAt;localStorage.setItem(k,JSON.stringify(s));}")
            page.reload();page.wait_for_function('window.WordamiSkillsStudio && window.WordamiWritingPreparation')
            page.evaluate("location.hash='writing-A1'")
            writer=page.locator('#writing-studio');writer.get_by_role('button',name='Continue draft',exact=True).click()
            writer.get_by_role('button',name='Practise the purpose of each line',exact=True).click()
            lines=page.evaluate("WordamiWritingPreparation.get('A1.profile').lines")
            for line in lines:
                writer.get_by_role('button',name=line['text'],exact=True).click()
                writer.get_by_role('button',name='Next purpose',exact=True).click()
            assert 'Purpose practice complete' in writer.inner_text()
            writer.get_by_role('textbox',name='Plan: '+lines[0]['goal'],exact=True).fill('Saved while offline')
            page.wait_for_timeout(350)
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.writing.v1.'+LANG.code)).projects['A1.profile'].planNotes.name")=='Saved while offline'
            result['purposePracticeAndPlanSaveOfflineWithSyntheticPrerequisites']=True
            page.evaluate("WordamiInteractionPractice.open('A1')")
            exchange=page.locator('#a1-practice');exchange.get_by_role('button',name='Begin guided exchange',exact=True).click()
            exchange.get_by_role('button',name='Hear the situation',exact=True).click()
            scene=page.evaluate('WordamiInteractionPracticeContent.units.A1')
            exchange.get_by_role('button',name='Ask: '+scene['questions'][1][1],exact=True).wait_for()
            exchange.get_by_role('button',name='Ask: '+scene['questions'][1][1],exact=True).click()
            played=page.evaluate('window.__completedMedia.length')
            exchange.get_by_role('button',name='Hear the question model',exact=True).click()
            page.wait_for_function('count=>window.__completedMedia.length>count',arg=played)
            recorded_review(page,exchange)
            exchange.get_by_role('button',name='Hear the partner reply',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Partner finished')")
            exchange.get_by_role('button',name=scene['options'][scene['answer']],exact=True).click()
            recorded_review(page,exchange,reflection=True)
            assert 'Guided exchange self-reviewed' in exchange.inner_text()
            result['guidedExchangeOfflineWithSyntheticPrerequisitesAndMic']=True
            page.evaluate(SEED)
            page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.levels['A2-work'].writing={draft:'Offline A2 draft',baseline:'',stage:'draft',excerpts:['','',''],reflection:'',revisions:[]};localStorage.setItem(k,JSON.stringify(s));}")
            page.reload();page.wait_for_function('window.WordamiInteractionPractice && window.WordamiWritingPreparation')
            assert page.evaluate("WordamiSourceSupport.units['A2-work'].every(e=>e.context&&e.meaning)")
            page.evaluate("location.hash='skills-A2-work'")
            a2=page.locator('#skills-studio');a2.get_by_role('button',name='Open writing assignment',exact=True).click()
            a2.get_by_role('button',name='Practise the purpose of each line',exact=True).click()
            lines=page.evaluate("WordamiWritingPreparation.get('A2-work.writing').lines")
            for line in lines:
                a2.get_by_role('button',name=line['text'],exact=True).click()
                a2.get_by_role('button',name='Next purpose',exact=True).click()
            a2.get_by_role('textbox',name='Plan: '+lines[0]['goal'],exact=True).fill('Temporary change planned offline')
            page.wait_for_timeout(350)
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels['A2-work'].writing.planNotes.change")=='Temporary change planned offline'
            result['A2PreparationAndPlanOfflineWithSyntheticPrerequisites']=True
            page.evaluate("WordamiTransferChecks.open('A2-work')")
            check.get_by_role('button',name='Begin a new version',exact=True).click()
            questions=page.evaluate("WordamiTransferContent.units['A2-work'].variants[0].questions")
            for question in questions:
                assert 'Reading feedback' not in check.inner_text()
                assert question['explanation'] not in check.inner_text()
                check.get_by_role('form',name='Choose the meaning',exact=True).get_by_role('button',name=question['options'][question['answer']],exact=True).click()
            assert '3 of 3 details correct' in check.inner_text()
            assert all(q['explanation'] in check.inner_text() for q in questions)
            result['A2ReadingMeaningChoicesOfflineWithSyntheticPrerequisites']=True
            page.evaluate("WordamiListeningTransferChecks.open('A2-work')")
            check.get_by_role('button',name='Begin a new version',exact=True).click()
            choices=check.get_by_role('form',name='Choose the meaning',exact=True).get_by_role('button')
            assert all(button.is_disabled() for button in choices.all())
            assert check.locator('.a1-panel[lang]').count()==0
            check.get_by_role('button',name='Listen to the complete message',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')",timeout=20000)
            questions=page.evaluate("WordamiListeningTransferContent.units['A2-work'].variants[0].questions")
            for question in questions:
                assert check.locator('.a1-panel[lang]').count()==0
                assert question['explanation'] not in check.inner_text()
                check.get_by_role('form',name='Choose the meaning',exact=True).get_by_role('button',name=question['options'][question['answer']],exact=True).click()
            assert '3 of 3 details correct' in check.inner_text()
            assert 'Transcript after the check' in check.inner_text()
            assert all(q['explanation'] in check.inner_text() for q in questions)
            result['A2ListeningActualPlaybackAndMeaningChoicesOfflineWithSyntheticPrerequisites']=True
            assert not errors and not failures,(errors,failures)
            reports.append({'language':lang,'result':result,'pageErrors':errors,'failures':failures,'cached':cached})
            context.close()
        browser.close()
    server.shutdown();out=ROOT/'output'/'skills-studio';out.mkdir(parents=True,exist_ok=True)
    (out/('offline-verification-'+languages[0]+'.json' if len(languages)==1 else 'offline-verification.json')).write_text(json.dumps(reports,indent=2),encoding='utf8')
    for r in reports:print(json.dumps({k:v for k,v in r.items() if k!='cached'}))
    assert all(r['result']['studio'] for r in reports)
if __name__=='__main__':main()
