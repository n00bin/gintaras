"""Exercise required practical forms, exact-source details, persistence and failure handling."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
R=Path(__file__).resolve().parents[1];OUT=R/'output/form-practice';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  for lang in ['lt','es']:
   c=browser.new_context(viewport={'width':320,'height':740},accept_downloads=True);page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#forms-A2-services'
   page.goto(url);page.wait_for_function('window.WordamiForms');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
   assert 'Complete this unit' in d.inner_text();assert d.locator('input,blockquote').count()==0
   page.evaluate(SEED);page.evaluate("()=>{localStorage.removeItem('wordami.forms.v1.'+LANG.code);S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}");page.reload();page.wait_for_function('window.WordamiForms')
   baseline=page.evaluate('JSON.stringify(S)');skills=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)");specs=page.evaluate('Object.values(WordamiFormContent.units)');total=0
   assert page.evaluate("WordamiSkillsStudio.isOpen('C2')"),'Previously started later work must remain accessible without auto-crediting forms'
   for spec in specs:
    uid=spec['id'];assert not page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
    page.evaluate('id=>WordamiForms.open(id)',uid)
    d.get_by_role('button',name='Learn the form labels',exact=True).click();assert spec['note'] in d.inner_text();d.get_by_role('button',name='I studied the form labels',exact=True).click()
    for index,field in enumerate(spec['fields']):
     if index==0:d.get_by_role('button',name=spec['fields'][1]['meaning'],exact=True).click();assert 'try again' in d.locator('[role=status]').inner_text()
     d.get_by_role('button',name=field['meaning'],exact=True).click()
    for vi,v in enumerate(spec['variants']):
     d.get_by_role('button',name='Complete this form',exact=True).first.click();d.get_by_role('button',name='Check all form details',exact=True).click();assert 'Fill all three' in d.locator('[role=status]').inner_text()
     if uid=='A1' and vi==0:d.get_by_role('button',name='Show a completed example',exact=True).click()
     # Wrong fields do not earn completion and are kept for correction.
     wrong=spec['variants'][1-vi]['values']
     for field,value in zip(spec['fields'],wrong):d.get_by_role('textbox',name=field['label']+' · '+field['meaning'],exact=True).fill(value)
     d.get_by_role('button',name='Check all form details',exact=True).click();assert 'Some details need another look' in d.inner_text();assert not page.evaluate('id=>WordamiForms.progress(id).complete',uid)
     if uid=='A1' and vi==0:
      page.reload();page.wait_for_function('window.WordamiForms');page.evaluate("()=>WordamiForms.open('A1','original')");assert d.get_by_role('textbox',name=spec['fields'][0]['label']+' · '+spec['fields'][0]['meaning'],exact=True).input_value()==wrong[0]
     for field,value in zip(spec['fields'],v['values']):d.get_by_role('textbox',name=field['label']+' · '+field['meaning'],exact=True).fill(value)
     if uid=='A1' and vi==0:
      raw=page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)");page.evaluate("()=>{window.__formSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.forms.v1.'))throw new DOMException('full','QuotaExceededError');return __formSet.call(this,k,v);};}")
      d.get_by_role('button',name='Check all form details',exact=True).click();assert 'could not be saved' in d.locator('[role=status]').inner_text();assert page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)")==raw;assert not page.evaluate("WordamiForms.progress('A1').complete");page.evaluate('()=>{Storage.prototype.setItem=window.__formSet;}')
     d.get_by_role('button',name='Check all form details',exact=True).click();assert 'Form details checked correctly.' in d.inner_text();assert d.evaluate('e=>e.scrollWidth<=e.clientWidth');d.get_by_role('button',name='All forms in this unit',exact=True).click();total+=1
    assert page.evaluate('id=>WordamiForms.progress(id).complete',uid);assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
    assert page.evaluate('id=>WordamiAssessments.snapshot(id).forms.record.forms.original.values.length===3',uid)
   assert total==6 and page.evaluate('JSON.stringify(S)')==baseline
   assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==skills
   with page.expect_download() as download:d.get_by_role('button',name='Export form work',exact=True).click()
   exported=json.loads(Path(download.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==3
   page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(r=>{if(navigator.serviceWorker.controller)r();else navigator.serviceWorker.addEventListener('controllerchange',r,{once:true})}))");c.set_offline(True);page.reload();page.wait_for_function('window.WordamiForms');assert page.evaluate('WordamiForms.catalogue().every(r=>r.complete)');c.set_offline(False)
   original=page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)")
   page.evaluate("()=>{WordamiFormContent.units.A1.note+=' Explicit changed-source test fixture.';WordamiForms.open('A1');}")
   assert not page.evaluate("WordamiForms.progress('A1').complete")
   d.get_by_role('button',name='Learn the form labels',exact=True).click()
   assert page.evaluate("WordamiForms.evidence('A1').history[0].forms.original.completedAt && !!WordamiForms.evidence('A1').history[0].definition")
   page.evaluate("raw=>localStorage.setItem('wordami.forms.v1.'+LANG.code,raw)",original);page.reload();page.wait_for_function('window.WordamiForms')
   assert page.evaluate('WordamiForms.catalogue().every(r=>r.complete)')
   # Two real tabs share storage. A stale tab may export its draft but cannot overwrite.
   page.evaluate("()=>{const k='wordami.forms.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));delete s.units.A1.forms.changed.completedAt;localStorage.setItem(k,JSON.stringify(s));}");page.reload();page.wait_for_function('window.WordamiForms');page.evaluate("()=>WordamiForms.open('A1','changed')")
   other=c.new_page();other.goto(url);other.wait_for_function('window.WordamiForms');other.locator('#splash').wait_for(state='detached');other.evaluate("()=>WordamiForms.open('A1','changed')")
   name=specs[0]['fields'][0]['label']+' · '+specs[0]['fields'][0]['meaning'];other.locator('#a1-practice').get_by_role('textbox',name=name,exact=True).fill('Another tab draft')
   page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('another tab')")
   remote=page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)")
   d.get_by_role('textbox',name=name,exact=True).fill('My unsaved copy');d.get_by_role('button',name='Check all form details',exact=True).click()
   assert page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)")==remote
   with page.expect_download() as download:d.get_by_role('button',name='Export form work',exact=True).click()
   copy=json.loads(Path(download.value.path()).read_text(encoding='utf8'));assert copy['unsavedDraft']['values'][0]=='My unsaved copy'
   # The app's existing single-active-tab handover reloads this tab when the other closes.
   with page.expect_navigation(wait_until='domcontentloaded'):other.close()
   page.wait_for_function('window.WordamiForms')
   page.evaluate("raw=>localStorage.setItem('wordami.forms.v1.'+LANG.code,raw)",original);page.reload();page.wait_for_function('window.WordamiForms')
   assert page.evaluate('JSON.stringify(S)')==baseline
   assert not errors,errors;reports.append({'language':lang,'units':3,'forms':total,'wrongDetailsRejected':True,'labelsTaughtAndChecked':True,'requiredForUnitCompletion':True,'laterWorkPreserved':True,'draftResume':True,'quotaRollbackAndRetry':True,'changedSourceKeepsHistory':True,'crossTabConflictPreventsOverwrite':True,'unsavedDraftExport':True,'offline':True,'originalProgressUnchanged':True,'pageErrors':errors});c.close()
  browser.close()
 (OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2),encoding='utf8');print(json.dumps(reports))
finally:s.shutdown();s.server_close()
