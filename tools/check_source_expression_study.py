"""All advanced source teaching: migration, saved meaning checks and fail-closed access."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/source-expressions'
FAIL="""()=>{window.__sourceSave=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.skills.v1.'))throw new DOMException('full','QuotaExceededError');return window.__sourceSave.call(this,k,v);};}"""
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740});page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#skills');page.wait_for_function('window.WordamiSkillsStudio && Object.keys(WordamiSourceSupport.units).length===24')
            page.locator('#splash').wait_for(state='detached');page.evaluate(SEED);page.reload()
            original=page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code))")
            writing=page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)");baseline=page.evaluate('JSON.stringify(S)')
            page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));for(const u of WordamiSkillsContent.units.slice(8))delete s.levels[u.id].sourcePractice;localStorage.setItem(k,JSON.stringify(s));}")
            page.reload();rows=page.evaluate('WordamiSkillsStudio.catalogue()')
            assert all(u['complete'] for u in rows[:8]) and rows[8]['open'] and not rows[8]['prepared']
            assert all(not u['open'] for u in rows[9:])
            units=page.evaluate('WordamiSkillsContent.units.slice(8).map(u=>u.id)');d=page.locator('#skills-studio');checked=0
            for unit_index,uid in enumerate(units):
                page.goto(base+'#skills-'+uid)
                d.get_by_role('button',name='Learn the language',exact=True).click()
                d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation',exact=True).click()
                assert 'Practise the source expressions' in d.locator('[role=status]').inner_text()
                assert not page.evaluate('id=>WordamiSkillsStudio.canWrite(id)',uid)
                entries=page.evaluate('id=>WordamiSourceSupport.units[id]',uid);assert entries
                d.get_by_role('button',name='Practise source expressions',exact=True).click()
                for index,entry in enumerate(entries):
                    assert 'Expression '+str(index+1)+' of '+str(len(entries)) in d.inner_text()
                    d.get_by_role('button',name='Practise this expression',exact=True).click()
                    assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                    if unit_index==0 and index==0:
                        # Distractors are shuffled, so select a rendered incorrect meaning.
                        rendered=d.get_by_role('button').all()
                        for button in rendered:
                            if button.inner_text() not in [entry['meaning'],'Save & close','Practise this expression','Show the meaning again','Return to source study']:
                                button.click();break
                        assert 'try again' in d.locator('[role=status]').inner_text()
                        before=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)");page.evaluate(FAIL)
                        d.get_by_role('button',name=entry['meaning'],exact=True).click()
                        assert 'could not be saved' in d.locator('[role=status]').inner_text()
                        assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==before
                        page.evaluate('()=>{Storage.prototype.setItem=window.__sourceSave;}')
                    d.get_by_role('button',name=entry['meaning'],exact=True).click();checked+=1
                    if unit_index==0 and index==0:
                        page.reload();page.wait_for_function('window.WordamiSkillsStudio')
                        d.get_by_role('button',name='Learn the language',exact=True).click()
                        d.get_by_role('button',name='Practise source expressions',exact=True).click()
                    else:d.get_by_role('button',name='Next expression',exact=True).click()
                assert 'source expressions checked' in d.inner_text()
                d.get_by_role('button',name='Return to source study',exact=True).click()
                d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation',exact=True).click()
                assert page.evaluate('id=>WordamiSkillsStudio.canWrite(id)',uid)
                assert page.evaluate('id=>WordamiSkillsStudio.catalogue().find(u=>u.id===id).complete',uid)
                print(lang+' '+uid+' '+str(len(entries))+' source expressions passed',flush=True)
            stored=page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code))")
            for uid,old in original['levels'].items():
                for field in ['checks','spoken','writing','learned','vocabulary']:assert stored['levels'][uid].get(field)==old.get(field),(lang,uid,field)
            assert page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)")==writing
            assert page.evaluate('JSON.stringify(S)')==baseline
            for script,uid in [('b1-source-support','B1'),('b2-source-support','B2'),('c1-source-support','C1'),('c2-source-support','C2')]:
                before=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
                page.route('**/'+script+'.js',lambda route:route.fulfill(status=200,body='/* unavailable */'))
                page.reload();page.wait_for_function('window.WordamiSkillsStudio')
                assert not page.evaluate('id=>WordamiSkillsStudio.canWrite(id)',uid)
                assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==before
                page.unroute('**/'+script+'.js');page.reload()
                assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete)')
            assert not errors,errors
            reports.append({'language':lang,'advancedUnits':16,'sourceExpressionsPractised':checked,'savedWorkPreserved':True,'resume':True,'quotaRollback':True,'missingFilesFailClosed':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('All 32 advanced units: source-expression teaching, preserved work, resume, failed saves and missing-file gates passed.')
if __name__=='__main__':main()
