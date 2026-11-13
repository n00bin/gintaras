"""Exercise actual table UI, unit gating, held feedback, resume and storage safeguards."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from document_reading_flow import practical_tables
R=Path(__file__).resolve().parents[1];OUT=R/'output/document-reading';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  for lang in ['lt','es']:
   c=browser.new_context(viewport={'width':320,'height':740},accept_downloads=True);page=c.new_page();page.set_default_timeout(15000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)));url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#documents-A1'
   page.goto(url);page.wait_for_function('window.WordamiDocuments');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
   assert 'Complete the unit' in d.inner_text() and not d.locator('table').count()
   page.evaluate(SEED);page.evaluate("()=>{localStorage.removeItem('wordami.documents.v1.'+LANG.code);S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}");page.reload();page.wait_for_function('window.WordamiDocuments')
   # Previously begun workshop preparation remains accessible on a direct link,
   # including when a learner has reset the separate ordinary word lessons.
   page.evaluate("()=>{S.lessons={};S.convs={};S.items={};S.placedTo=0;save();}");page.reload();page.wait_for_function('window.WordamiCoursePath');page.locator('#splash').wait_for(state='detached');assert d.get_by_role('button',name='Learn table reading',exact=True).count()==1
   page.evaluate(SEED);page.evaluate("localStorage.removeItem('wordami.documents.v1.'+LANG.code)");page.reload();page.wait_for_function('window.WordamiCoursePath');page.locator('#splash').wait_for(state='detached')
   baseline=page.evaluate('JSON.stringify(S)');forms=page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)");skills=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
   assert page.evaluate("()=>{const old=S.placedTo;S.placedTo=STEPS.length;const required=!stepDone('course.A1');if(old===undefined)delete S.placedTo;else S.placedTo=old;return required;}")
   assert page.evaluate("WordamiSkillsStudio.isOpen('C2')"),'Previously started work must stay accessible'
   assert not page.evaluate("WordamiSkillsStudio.progress('A1').complete")
   d.get_by_role('button',name='Learn table reading',exact=True).click();d.get_by_role('button',name='I studied the table guide',exact=True).click();d.get_by_role('button',name='Read this table',exact=True).first.click()
   spec=page.evaluate('WordamiDocumentContent.units.A1');variant=spec['variants'][0];q=variant['questions'][0]
   assert d.locator('table caption').count()==1 and d.locator('th[scope=col]').count()==4 and d.locator('th[scope=row]').count()==2
   assert d.locator('thead th').evaluate_all('(cells,lang)=>cells.slice(1).every(c=>c.lang===lang)',lang)
   region=d.get_by_role('region',name='Source details table. Scroll horizontally to read all columns.',exact=True);region.focus();page.keyboard.press('ArrowRight');page.wait_for_function("document.querySelector('#a1-practice [role=region]').scrollLeft>0")
   assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
   wrong=next(x for x in q['choices'] if x!=q['answer']);d.get_by_role('button',name=wrong,exact=True).click()
   assert 'Source answer:' not in d.inner_text() and 'Question 2 of 3' in d.inner_text()
   page.reload();page.wait_for_function('window.WordamiDocuments');d.get_by_role('button',name='Resume this table',exact=True).click();assert 'Question 2 of 3' in d.inner_text()
   for q in variant['questions'][1:]:d.get_by_role('button',name=q['answer'],exact=True).click()
   assert 'Review the table details' in d.inner_text() and not page.evaluate("WordamiDocuments.progress('A1').complete")
   d.get_by_role('button',name='All table tasks',exact=True).click()
   for uid in ['A1','A1-travel','A2-services']:
    practical_tables(page,uid);assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   print(lang+' all table tasks and unit gates passed',flush=True)
   page.evaluate("WordamiDocuments.open('A1')");d.get_by_role('button',name='Review table guide',exact=True).click();assert page.evaluate("WordamiDocuments.progress('A1').complete");d.get_by_role('button',name='I studied the table guide',exact=True).click()
   page.evaluate("WordamiDocuments.open('A1')");d.get_by_role('button',name='Practise this table again',exact=True).first.click()
   assert page.evaluate("WordamiDocuments.progress('A1').complete"),'An unfinished repeat must preserve the earlier pass'
   raw=page.evaluate("localStorage.getItem('wordami.documents.v1.'+LANG.code)")
   page.evaluate("()=>{window.__tableSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.documents.v1.'))throw new DOMException('full','QuotaExceededError');return __tableSet.call(this,k,v);};}")
   d.get_by_role('button',name=spec['variants'][0]['questions'][0]['answer'],exact=True).click();assert 'could not be saved' in d.locator('[role=status]').inner_text();assert page.evaluate("localStorage.getItem('wordami.documents.v1.'+LANG.code)")==raw
   page.evaluate('()=>{Storage.prototype.setItem=window.__tableSet;}');d.get_by_role('button',name=spec['variants'][0]['questions'][0]['answer'],exact=True).click();assert 'Question 2 of 3' in d.inner_text()
   page.screenshot(path=str(OUT/(lang+'-table-mobile.png')));assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
   d.get_by_role('region',name='Source details table. Scroll horizontally to read all columns.',exact=True).evaluate('e=>e.scrollLeft=e.scrollWidth');page.screenshot(path=str(OUT/(lang+'-table-mobile-last-columns.png')))
   page.evaluate("WordamiDocuments.open('A1')")
   with page.expect_download() as info:d.get_by_role('button',name='Export table records',exact=True).click()
   exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==3 and len(exported['units']['A1']['attempts'])==4
   assert page.evaluate("WordamiAssessments.snapshot('A1').documents.record.attempts.length")==4
   print(lang+' quota, retry and evidence export passed',flush=True)
   page.wait_for_function('navigator.serviceWorker.controller!==null',timeout=45000);c.set_offline(True);page.reload();page.wait_for_function('window.WordamiDocuments');assert page.evaluate('WordamiDocuments.catalogue().every(p=>p.complete)');c.set_offline(False)
   print(lang+' offline passed',flush=True)
   # Source edits invalidate only the new checks and retain the old source and attempts.
   page.evaluate("()=>{WordamiDocumentContent.units.A1.teaching.push('Explicit changed-source fixture');WordamiDocuments.open('A1');}");assert not page.evaluate("WordamiDocuments.progress('A1').complete");d.get_by_role('button',name='Learn table reading',exact=True).click();assert page.evaluate("WordamiDocuments.evidence('A1').history[0].attempts.length")==4
   assert page.evaluate('JSON.stringify(S)')==baseline and page.evaluate("localStorage.getItem('wordami.forms.v1.'+LANG.code)")==forms and page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==skills
   print(lang+' source-history and progress preservation passed',flush=True)
   # Restore source state before an actual storage event from another browser tab.
   page.reload();page.wait_for_function('window.WordamiDocuments');page.evaluate("WordamiDocuments.open('A1')");other=c.new_page();other.goto(url);other.wait_for_function('window.WordamiDocuments');other.evaluate("()=>{const k='wordami.documents.v1.'+LANG.code,d=JSON.parse(localStorage.getItem(k));d.units.A1.remoteFixture=true;localStorage.setItem(k,JSON.stringify(d));}")
   page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('another tab')");remote=page.evaluate("localStorage.getItem('wordami.documents.v1.'+LANG.code)");d.get_by_role('button',name='Learn table reading',exact=True).click();assert page.evaluate("localStorage.getItem('wordami.documents.v1.'+LANG.code)")==remote
   with page.expect_download() as info:d.get_by_role('button',name='Export table records',exact=True).click()
   saved=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert not saved['units']['A1'].get('remoteFixture')
   assert not errors,errors;reports.append({'language':lang,'units':3,'tableTasks':6,'questionsPerTask':3,'heldFeedback':True,'wrongAnswersDoNotPass':True,'unfinishedAttemptResumes':True,'earlierPassSurvivesRepeat':True,'requiredForUnitCompletion':True,'laterWorkPreserved':True,'existingFormsAndSkillsUnchanged':True,'sourceChangeKeepsHistory':True,'quotaRollbackAndRetry':True,'crossTabConflictPreventsOverwrite':True,'actualEvidenceExport':True,'mobile320':True,'offline':True,'pageErrors':errors});c.close()
  browser.close()
 (OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8');print(json.dumps(reports))
finally:s.shutdown();s.server_close()
