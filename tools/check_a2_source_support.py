"""Verify A2 source coverage, upgrade preservation and missing-file/save failure gates."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/a2-source-support'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass


def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740});page=context.new_page();errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#skills');page.wait_for_function('window.WordamiSkillsStudio && Object.keys(WordamiSourceSupport.units).length===24')
            page.locator('#splash').wait_for(state='detached');page.evaluate(SEED);page.reload()
            assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete)')
            saved=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            writing=page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)")
            # A legacy completed course did not have A2 support signatures. Only
            # the new source study should be required; drafts/results must stay.
            page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));for(const id of ['A2','A2-services','A2-work','A2-meals'])s.levels[id].sourceSupportSignature=null;localStorage.setItem(k,JSON.stringify(s));}")
            page.reload();rows=page.evaluate('WordamiSkillsStudio.catalogue()')
            assert all(r['complete'] for r in rows[:4])
            assert rows[4]['open'] and not rows[4]['prepared']
            assert all(not r['open'] for r in rows[5:])
            assert not page.evaluate("WordamiActivities.begin('skills.A2.reading')")
            assert page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)")==writing
            for index,uid in enumerate(['A2','A2-services','A2-work','A2-meals']):
                page.evaluate('id=>{location.hash="skills-"+id;}',uid);d=page.locator('#skills-studio')
                d.get_by_role('button',name='Learn the language',exact=True).click()
                assert 'Extra language for these sources' in d.inner_text()
                assert d.get_by_role('button',name='Practise this meaning',exact=True).count()==0
                entries=page.evaluate('id=>WordamiSourceSupport.units[id]',uid)
                assert entries and all(e['context'] for e in entries)
                assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                d.get_by_role('checkbox').check()
                if index==0:
                    page.evaluate("()=>{window.__supportSave=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.skills.v1.'))throw new DOMException('full','QuotaExceededError');return window.__supportSave.call(this,k,v);};}")
                    d.get_by_role('button',name='Finish source preparation',exact=True).click()
                    assert 'could not be saved' in d.locator('[role=status]').inner_text()
                    assert not page.evaluate("WordamiSkillsStudio.canWrite('A2')")
                    page.evaluate('()=>{Storage.prototype.setItem=window.__supportSave;}')
                d.get_by_role('button',name='Finish source preparation',exact=True).click()
                assert page.evaluate('id=>WordamiSkillsStudio.canWrite(id)',uid)
            assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete)')
            restored=page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code))")
            old=json.loads(saved)
            for uid in old['levels']:
                assert restored['levels'][uid]['checks']==old['levels'][uid]['checks']
                assert restored['levels'][uid]['spoken']==old['levels'][uid]['spoken']
                assert restored['levels'][uid].get('writing')==old['levels'][uid].get('writing')
            # The A2 file alone may fail while A1 support remains available.
            before=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            page.route('**/a2-source-support.js',lambda route:route.abort())
            page.reload();page.wait_for_function('window.WordamiSkillsStudio')
            assert page.evaluate('WordamiSkillsStudio.catalogue().slice(0,4).every(u=>u.complete)')
            assert not page.evaluate("WordamiSkillsStudio.canWrite('A2')")
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==before
            page.unroute('**/a2-source-support.js');page.reload()
            assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete)')
            assert page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)")==writing
            assert not errors,errors
            reports.append({'language':lang,'A2Units':4,'additionalForms':sum(page.evaluate('id=>WordamiSourceSupport.units[id].length',uid) for uid in ['A2','A2-services','A2-work','A2-meals']),'A1StateUnchanged':True,'legacyDraftsAndResultsPreserved':True,'sourceOnlyUpgrade':True,'failedSaveRollsBack':True,'missingA2FileFailsClosed':True,'restoredFileReusesSavedStudy':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Both languages: A2 source preparation, old-progress preservation, quota rollback and missing-file recovery passed.')


if __name__=='__main__':main()
