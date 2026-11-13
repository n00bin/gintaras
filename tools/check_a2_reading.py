"""A2 meaning choices with synthetic prerequisites; no learner proficiency claims."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_transfer_reading import FAIL, RESTORE

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/a2-reading'
STATE="localStorage.getItem('wordami.transfer.v1.'+LANG.code)"


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
            page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#transfer-A2');page.wait_for_function('window.WordamiTransferChecks')
            page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
            assert 'Complete the connected unit' in d.inner_text()
            assert d.locator('form,.a1-panel[lang]').count()==0
            assert page.evaluate(STATE) is None
            # Create an actual A1 result with the old four-unit bank, then extend it.
            page.route('**/a2-transfer-content.js',lambda route:route.fulfill(status=200,body='/* previous bank */'))
            for band in ['b1','b2','c1','c2']:
                page.route('**/'+band+'-application-content.js',lambda route:route.fulfill(status=200,body='/* previous bank */'))
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert page.evaluate('Object.keys(WordamiTransferContent.units).length')==4
            page.evaluate("WordamiTransferChecks.open('A1')")
            d.get_by_role('button',name='Begin a new version',exact=True).click()
            for q in page.evaluate('WordamiTransferContent.units.A1.variants[0].questions'):
                d.get_by_role('textbox',name='Your short reading answer',exact=True).fill(q['answers'][0])
                d.get_by_role('button',name='Record answer',exact=True).click()
            assert '3 of 3 details correct' in d.inner_text()
            original_a1=json.loads(page.evaluate(STATE))['units']['A1']
            for band in ['b1','b2','c1','c2']:page.unroute('**/'+band+'-application-content.js')
            page.unroute('**/a2-transfer-content.js');page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert '3 of 3 details correct' in d.inner_text()
            baseline=page.evaluate('JSON.stringify(S)')
            prepared=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiTransferContent.units).filter(([id])=>id.startsWith('A2')))")
            assert len(bank)==4
            for unit_index,(uid,spec) in enumerate(bank.items()):
                page.goto(base+'#skills-'+uid)
                page.locator('#skills-studio').get_by_role('button',name='Apply this language in a new reading',exact=True).click()
                for visit in range(3):
                    start='Begin a new version' if visit==0 else 'Try the other new version' if visit==1 else 'Repeat a used version'
                    if unit_index==0 and visit==0:
                        before=page.evaluate(STATE);page.evaluate(FAIL)
                        d.get_by_role('button',name=start,exact=True).click()
                        assert 'could not be saved' in d.locator('[role=status]').inner_text()
                        assert page.evaluate(STATE)==before;page.evaluate(RESTORE)
                    d.get_by_role('button',name=start,exact=True).click()
                    attempt=json.loads(page.evaluate(STATE))['units'][uid]['attempts'][-1]
                    assert attempt['firstExposure']==(visit<2)
                    variant=next(v for v in spec['variants'] if v['id']==attempt['variantId'])
                    for index,q in enumerate(variant['questions']):
                        assert 'Reading feedback' not in d.inner_text()
                        assert q['explanation'] not in d.inner_text()
                        assert d.get_by_role('textbox').count()==0
                        form=d.get_by_role('form',name='Choose the meaning',exact=True)
                        assert form.get_by_role('button').count()==3
                        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                        choice=q['options'][(q['answer']+1)%3] if unit_index==0 and visit==0 and index==0 else q['options'][q['answer']]
                        if unit_index==0 and visit==0 and index==0:
                            before=page.evaluate(STATE);page.evaluate(FAIL)
                            form.get_by_role('button',name=choice,exact=True).click()
                            assert 'could not be saved' in d.locator('[role=status]').inner_text()
                            assert page.evaluate(STATE)==before
                            assert form.get_by_role('button').count()==3;page.evaluate(RESTORE)
                        form.get_by_role('button',name=choice,exact=True).click()
                        if index==0:
                            page.reload();page.wait_for_function('window.WordamiTransferChecks')
                            assert 'Detail 2 of 3' in d.inner_text(),(uid,visit,d.inner_text(),page.evaluate('WordamiSkillsStudio.catalogue().slice(0,7)'))
                    assert 'Reading feedback' in d.inner_text()
                    assert ('2 of 3' if unit_index==0 and visit==0 else '3 of 3')+' details correct' in d.inner_text()
                    for q in variant['questions']:assert q['explanation'] in d.inner_text()
                    if visit==2:assert 'Repeat practice with a previously seen document' in d.inner_text()
                status=page.evaluate('id=>WordamiTransferChecks.catalogue().find(s=>s.id===id)',uid)
                assert status['completed']==3 and status['firstExposureCompleted']==2 and status['sourceVariantsSeen']==2 and status['cefrLevel'] is None
            assert json.loads(page.evaluate(STATE))['units']['A1']==original_a1
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==prepared
            with page.expect_download() as info:d.get_by_role('button',name='Export reading-check records',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'))
            assert exported['language']==lang and {'A1',*bank}.issubset(exported['units'])
            assert all(set(a)=={'correct','answeredAt'} for u in exported['units'].values() for t in u['attempts'] for a in t['answers'])
            page.screenshot(path=str(OUT/(lang+'-a2-reading-feedback-mobile.png')))
            # Losing the source preparation must not reveal a saved A2 feedback page.
            before=page.evaluate(STATE)
            page.route('**/a2-source-support.js',lambda route:route.fulfill(status=200,body='/* unavailable */'))
            page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert 'Complete the connected unit' in d.inner_text()
            assert d.locator('form,.a1-panel[lang]').count()==0
            assert page.evaluate(STATE)==before
            assert page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            page.unroute('**/a2-source-support.js')
            # Revising a question changes task validity, never source exposure.
            def revised(route):
                response=route.fetch()
                route.fulfill(response=response,body=response.text()+"\nWordamiTransferContent.units['A2-meals'].variants[0].questions[0].explanation+=' Clarified rationale.';")
            page.route('**/a2-transfer-content.js',revised)
            page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert 'All versions have been seen' in d.inner_text()
            d.get_by_role('button',name='Repeat a used version',exact=True).click()
            assert json.loads(page.evaluate(STATE))['units']['A2-meals']['attempts'][-1]['firstExposure'] is False
            assert not errors,errors
            reports.append({'language':lang,'A2Units':4,'documentVariants':8,'questions':24,'testVisits':12,'heldFeedback':True,'wrongAnswerHandled':True,'quotaRollback':True,'resume':True,'A1ResultPreserved':True,'sourceGateRequired':True,'questionEditRetainsExposure':True,'originalProgressUnchanged':True,'exportsOnlyAnswerOutcomes':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('A2: all 16 documents / 48 meaning questions passed mobile workflow, held feedback, resume, storage rollback, exposure, export and A1 preservation checks.')


if __name__=='__main__':main()
