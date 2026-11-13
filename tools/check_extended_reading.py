"""Upgrade the actual completed build-193 walkthrough state and play every new activity."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from extended_reading_flow import extended_reading
R=Path(__file__).resolve().parents[1];OUT=R/'output/extended-reading';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  for lang in ['lt','es']:
   c=browser.new_context(viewport={'width':320,'height':740},accept_downloads=True);page=c.new_page();page.set_default_timeout(15000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)));url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#extended-B1-community'
   page.goto(url);page.wait_for_function('window.WordamiExtendedReading');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice');assert 'Complete this unit' in d.inner_text()
   old=json.loads((R/f'output/skills-studio/{lang}-with-tables-complete-checkpoint.json').read_text(encoding='utf8'));assert old['unitsPassed']==30 and old['lastPassedUnit']=='C2-capstone'
   page.evaluate('entries=>{localStorage.clear();for(const [k,v] of Object.entries(entries))localStorage.setItem(k,v);}',old['localStorage']);page.reload();page.wait_for_function('window.WordamiExtendedReading');page.locator('#splash').wait_for(state='detached');page.evaluate('()=>{S.seenVersion=APP_VERSION;save();}')
   baseline=page.evaluate('JSON.stringify(S)');previous=page.evaluate("Object.fromEntries(['skills','writing','forms','documents'].map(name=>[name,localStorage.getItem('wordami.'+({skills:'skills',writing:'writing',forms:'forms',documents:'documents'}[name])+'.v1.'+LANG.code)]))")
   catalogue=page.evaluate('WordamiSkillsStudio.catalogue()');assert sum(u['complete'] for u in catalogue)==26 and all(u['open'] for u in catalogue),catalogue
   assert page.evaluate("()=>{const old=S.placedTo;S.placedTo=STEPS.length;const required=!stepDone('course.B1-community');S.placedTo=old;return required;}")
   specs=page.evaluate('Object.values(WordamiExtendedReadingContent.units)')
   for spec in specs:
    extended_reading(page,spec['id'],wrong=spec['id']=='B1-community')
    assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',spec['id'])
    assert page.evaluate('JSON.stringify(S)')==baseline
    print(lang+' '+spec['id']+' full reading, notes and revised brief passed',flush=True)
   assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete&&u.open)')
   assert page.evaluate("Object.fromEntries(['skills','writing','forms','documents'].map(name=>[name,localStorage.getItem('wordami.'+name+'.v1.'+LANG.code)]))")==previous
   page.evaluate("WordamiExtendedReading.open('C2-science','brief')");assert d.evaluate('e=>e.scrollWidth<=e.clientWidth');page.screenshot(path=str(OUT/(lang+'-brief-mobile.png')))
   with page.expect_download() as info:d.get_by_role('button',name='Export reading portfolio',exact=True).click()
   exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==4 and all(u['brief']['revisions'] for u in exported['units'].values())
   assert page.evaluate("WordamiAssessments.snapshot('C2-science').extendedReading.record.notes.length")==4
   submission=page.evaluate("async()=>await WordamiAssessments.submit('C2-science')")
   with page.expect_download() as info:packet=page.evaluate('async s=>await WordamiAssessments.exportPacket(s)',submission)
   assert packet['evidence']['extendedReading']['record']['checkedNotes'][0]['quote']
   assert page.evaluate("async p=>{const bad=structuredClone(p);bad.evidence.extendedReading.record.brief.draft+='changed';try{await WordamiAssessments.reviewPacket(bad);return false;}catch(e){return e.message.includes('changed');}}",packet)
   page.evaluate('p=>WordamiAssessments.reviewPacket(p)',packet);assert d.get_by_role('heading',name='Longer reading, notes and source-based brief',exact=True).count()==1
   assert packet['evidence']['extendedReading']['record']['brief']['draft'] in d.inner_text()
   page.wait_for_function('navigator.serviceWorker.controller!==null',timeout=45000);c.set_offline(True);page.reload();page.wait_for_function('window.WordamiExtendedReading');assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete)');c.set_offline(False)
   (OUT/(lang+'-completed-workflow.json')).write_text(json.dumps({'scope':'Synthetic completed workflow, not learner evidence','baseline':baseline,'localStorage':page.evaluate('Object.fromEntries(Object.keys(localStorage).map(k=>[k,localStorage.getItem(k)]))')},ensure_ascii=False),encoding='utf8')
   reports.append({'language':lang,'portfolios':4,'sections':16,'preparedPassages':sum(len(s['lines']) for u in specs for s in u['sections']),'wholeTextQuestions':16,'purposefulNotes':16,'revisedBriefs':4,'originalBuild193CheckpointUsed':True,'all30UnitsCompleteAfterNewTasks':True,'olderWorkUnchanged':True,'wrongAnswersAndWrongSectionQuotesRejected':True,'allStagesRequired':True,'mobile320':True,'actualArtifactExport':True,'offline':True,'pageErrors':errors});assert not errors,errors;c.close()
  browser.close()
 (OUT/'verification.json').write_text(json.dumps({'passed':True,'scope':'Synthetic workflow and actual saved-checkpoint upgrade, not proficiency evidence','languages':reports},indent=2)+'\n',encoding='utf8');print(json.dumps(reports))
finally:s.shutdown();s.server_close()
