"""Walk every B1-C2 reading/listening variant, using real media and synthetic readiness."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/advanced-application'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass

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
            page.goto(base+'#transfer-B1');page.wait_for_function('window.WordamiTransferChecks && window.WordamiListeningTransferChecks')
            page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
            assert 'Complete the connected unit' in d.inner_text() and d.locator('form,.a1-panel[lang]').count()==0
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert page.evaluate('Object.keys(WordamiListeningTransferAudio).length')==96
            baseline=page.evaluate('JSON.stringify(S)');prepared=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            result={'language':lang,'readingVariants':0,'listeningVariants':0,'questionsAnswered':0}
            for listening in [False,True]:
                api='WordamiListeningTransferChecks' if listening else 'WordamiTransferChecks'
                bank_name='WordamiListeningTransferContent' if listening else 'WordamiTransferContent'
                route='listen-transfer' if listening else 'transfer';label='listening' if listening else 'reading'
                key='wordami.'+('listening-transfer' if listening else 'transfer')+'.v1.'+lang
                bank=page.evaluate(f"Object.fromEntries(Object.entries({bank_name}.units).filter(([id])=>!id.startsWith('A')))" )
                assert len(bank)==16
                for unit_index,(uid,spec) in enumerate(bank.items()):
                    page.goto(base+'#skills-'+uid)
                    page.locator('#skills-studio').get_by_role('button',name='Apply this language in a new '+label,exact=True).click()
                    for visit,variant in enumerate(spec['variants']):
                        d.get_by_role('button',name='Begin a new version' if visit==0 else 'Try the other new version',exact=True).click()
                        state=page.evaluate('key=>JSON.parse(localStorage.getItem(key))',key)
                        attempt=state['units'][uid]['attempts'][-1]
                        assert attempt['variantId']==variant['id'] and attempt['firstExposure']
                        def hear():
                            choices=d.get_by_role('form',name='Choose the meaning').get_by_role('button')
                            assert all(b.is_disabled() for b in choices.all())
                            assert d.locator('.a1-panel[lang]').count()==0
                            d.get_by_role('button',name='Listen to the complete message',exact=True).click()
                            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Recording finished')",timeout=25000)
                        if listening:hear()
                        wrong=unit_index%4==0 and visit==0
                        for index,q in enumerate(variant['questions']):
                            assert q['explanation'] not in d.inner_text()
                            assert label.title()+' feedback' not in d.inner_text()
                            if listening:assert d.locator('.a1-panel[lang]').count()==0
                            choice=q['options'][(q['answer']+1)%3] if wrong and index==0 else q['options'][q['answer']]
                            d.get_by_role('form',name='Choose the meaning').get_by_role('button',name=choice,exact=True).click();result['questionsAnswered']+=1
                            if index==0 and unit_index%4==0 and visit==0:
                                page.reload();page.wait_for_function('window.'+api)
                                assert 'Detail 2 of 3' in d.inner_text()
                                if listening:hear()
                        assert ('2 of 3' if wrong else '3 of 3')+' details correct' in d.inner_text()
                        assert all(q['explanation'] in d.inner_text() for q in variant['questions'])
                        assert d.locator('.a1-panel[lang]').inner_text()==variant['text']
                        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                        result['listeningVariants' if listening else 'readingVariants']+=1
                        if listening:
                            state=page.evaluate('key=>JSON.parse(localStorage.getItem(key))',key)
                            saved=state['units'][uid]['attempts'][-1]
                            asset=page.evaluate('id=>WordamiListeningTransferAudio[id]',lang+'.'+uid+'.'+variant['id'])
                            assert asset['voice']==variant.get('voice','Achernar') and saved['audioHash']==asset['hash']
                            assert saved['playbackCount']>=1 and all(a['audioHash']==asset['hash'] for a in saved['answers'])
                    status=page.evaluate(f'id=>{api}.catalogue().find(s=>s.id===id)',uid)
                    assert status['completed']==2 and status['firstExposureCompleted']==2 and status['sourceVariantsSeen']==2 and status['cefrLevel'] is None
                    if unit_index%4==0:
                        d.get_by_role('button',name='Repeat a used version',exact=True).click()
                        assert 'Repeat practice' in d.inner_text()
                        state=page.evaluate('key=>JSON.parse(localStorage.getItem(key))',key)
                        assert state['units'][uid]['attempts'][-1]['firstExposure'] is False
                        if listening:assert all(b.is_disabled() for b in d.get_by_role('form',name='Choose the meaning').get_by_role('button').all())
                    print(lang+' '+label+' '+uid+' both variants passed',flush=True)
                with page.expect_download() as info:d.get_by_role('button',name='Export '+label+'-check records',exact=True).click()
                exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==16 and exported['language']==lang
                fields={'correct','answeredAt'}|({'audioHash','playbackCount'} if listening else set())
                assert all(set(a)==fields for u in exported['units'].values() for attempt in u['attempts'] for a in attempt['answers'])
                d.evaluate('(e)=>e.scrollTop=0');page.screenshot(path=str(OUT/(lang+'-'+label+'-c2-feedback-mobile.png')))
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==prepared
            assert result['questionsAnswered']==192 and result['readingVariants']==32 and result['listeningVariants']==32
            assert not errors,errors
            result.update({'actualDecodedPlayback':True,'transcriptsHeld':True,'wrongAnswersAndDelayedFeedback':True,'resumeAcrossAllBands':True,'repeatsLabelled':True,'voiceHashesMatch':True,'exportsOutcomesOnly':True,'originalProgressUnchanged':True,'pageErrors':errors});reports.append(result)
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('All 128 B1-C2 application sources / 384 questions passed real media, held feedback, resume, repeat, export and mobile checks.')
if __name__=='__main__':main()
