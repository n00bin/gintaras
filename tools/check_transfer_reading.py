"""Exercise controlled reading transfer in both languages with synthetic taught-state fixtures."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output/transfer-reading'
FAIL="""()=>{window.__transferSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.transfer.v1.'))throw new DOMException('full','QuotaExceededError');return window.__transferSet.call(this,k,v);};}"""
RESTORE='()=>{Storage.prototype.setItem=window.__transferSet;}'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},accept_downloads=True)
            page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#transfer-A1');page.wait_for_function('window.WordamiTransferChecks')
            page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
            assert 'Complete the connected unit' in d.inner_text()
            assert d.get_by_role('button',name='Begin a new version',exact=True).count()==0
            assert page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")==None
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiTransferChecks')
            baseline=page.evaluate('JSON.stringify(S)')
            skills=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            bank=page.evaluate("Object.fromEntries(Object.entries(WordamiTransferContent.units).filter(([id])=>id.startsWith('A1')))")
            for unit_index,(uid,spec) in enumerate(bank.items()):
                page.goto(base+'#skills-'+uid)
                page.locator('#skills-studio').get_by_role('button',name='Apply this language in a new reading',exact=True).click()
                for visit in range(3):
                    start_name='Begin a new version' if visit==0 else 'Try the other new version' if visit==1 else 'Repeat a used version'
                    if unit_index==0 and visit==0:
                        page.evaluate(FAIL);d.get_by_role('button',name=start_name,exact=True).click()
                        assert 'could not be saved' in d.locator('[role=status]').inner_text()
                        assert page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")==None
                        page.evaluate(RESTORE)
                    d.get_by_role('button',name=start_name,exact=True).click()
                    state=page.evaluate("JSON.parse(localStorage.getItem('wordami.transfer.v1.'+LANG.code))")
                    attempt=state['units'][uid]['attempts'][-1]
                    variant=next(v for v in spec['variants'] if v['id']==attempt['variantId'])
                    assert attempt['firstExposure']==(visit<2)
                    assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                    for index,q in enumerate(variant['questions']):
                        assert 'Reading feedback' not in d.inner_text()
                        answer='unknown-answer-not-to-be-stored' if unit_index==0 and visit==0 and index==0 else '4.0' if uid=='A1-shopping' and visit==0 and index==1 else q['answers'][0]
                        field=d.get_by_role('textbox',name='Your short reading answer',exact=True)
                        field.fill(answer)
                        if unit_index==0 and visit==0 and index==0:
                            before=page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")
                            page.evaluate(FAIL);d.get_by_role('button',name='Record answer',exact=True).click()
                            assert 'could not be saved' in d.locator('[role=status]').inner_text()
                            assert page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")==before
                            page.evaluate(RESTORE)
                        d.get_by_role('button',name='Record answer',exact=True).click()
                        if index==0:
                            page.reload();page.wait_for_function('window.WordamiTransferChecks')
                            assert 'Detail 2 of 3' in d.inner_text()
                    assert ('2 of 3' if visit==0 and unit_index in [0,1] else '3 of 3') in d.inner_text()
                    assert 'Reading feedback' in d.inner_text()
                    if visit==2:assert 'Repeat practice with a previously seen document' in d.inner_text()
                status=page.evaluate('id=>WordamiTransferChecks.catalogue().find(s=>s.id===id)',uid)
                assert status['completed']==3 and status['firstExposureCompleted']==2 and status['sourceVariantsSeen']==2 and status['cefrLevel'] is None
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==skills
            assert 'unknown-answer-not-to-be-stored' not in page.evaluate("localStorage.getItem('wordami.transfer.v1.'+LANG.code)")
            with page.expect_download() as info:d.get_by_role('button',name='Export reading-check records',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==4
            page.screenshot(path=str(OUT/(lang+'-reading-feedback-mobile.png')))
            # A competing save blocks a write and keeps both versions available.
            d.get_by_role('button',name='Repeat a used version',exact=True).click()
            page.evaluate("()=>{const k='wordami.transfer.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.externalNote='another-tab';localStorage.setItem(k,JSON.stringify(s));}")
            d.get_by_role('textbox',name='Your short reading answer',exact=True).fill('test')
            d.get_by_role('button',name='Record answer',exact=True).click()
            assert 'another tab' in d.locator('[role=status]').inner_text()
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.transfer.v1.'+LANG.code)).externalNote")=='another-tab'
            # Revising answer aliases invalidates that task version, but an
            # unchanged document must not be presented as unseen again.
            def revised_bank(route):
                response=route.fetch()
                route.fulfill(response=response,body=response.text()+"\nWordamiTransferContent.units['A1-travel'].variants[0].questions[0].answers.push('extra-reviewed-alias');")
            page.route('**/transfer-content.js',revised_bank)
            page.reload();page.wait_for_function('window.WordamiTransferChecks')
            assert 'All versions have been seen' in d.inner_text()
            assert d.get_by_role('button',name='Begin a new version',exact=True).count()==0
            d.get_by_role('button',name='Repeat a used version',exact=True).click()
            updated=page.evaluate("JSON.parse(localStorage.getItem('wordami.transfer.v1.'+LANG.code))")
            assert updated['units']['A1-travel']['attempts'][-1]['firstExposure'] is False
            page.unroute('**/transfer-content.js')
            assert not errors,errors
            reports.append({'language':lang,'units':4,'documentVariants':8,'completedTestVisits':12,'prerequisitesRequired':True,'feedbackHeld':True,'saveRollback':True,'resume':True,'repeatExposureRetained':True,'answerKeyChangesDoNotResetExposure':True,'decimalValuesNotCollapsed':True,'conflictProtected':True,'rawAnswersNotStored':True,'originalProgressUnchanged':True,'pageErrors':errors})
            context.close()
        public=browser.new_page();public.goto(f'http://127.0.0.1:{server.server_port}/?preview=0&lang=lt#transfer-A1');assert public.locator('#a1-practice').count()==0
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Both languages: all 16 reading documents passed prerequisites, held feedback, save rollback, resume, repeat tracking, export and conflict checks.')


if __name__=='__main__':main()
