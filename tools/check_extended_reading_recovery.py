"""Exercise resume, quota failure, source changes and genuine two-tab conflicts."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];OUT=R/'output/extended-reading'
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
try:
 with sync_playwright() as p:
  browser=p.chromium.launch(channel='chrome',headless=True)
  for lang in ['lt','es']:
   c=browser.new_context(viewport={'width':320,'height':740},accept_downloads=True);page=c.new_page();page.set_default_timeout(15000);errors=[];page.on('pageerror',lambda e:errors.append(str(e)));url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#extended-B1-community'
   page.goto(url);page.wait_for_function('window.WordamiExtendedReading');saved=json.loads((OUT/(lang+'-completed-workflow.json')).read_text(encoding='utf8'))
   page.evaluate('values=>{localStorage.clear();for(const [k,v] of Object.entries(values))localStorage.setItem(k,v);}',saved['localStorage']);page.reload();page.wait_for_function('window.WordamiExtendedReading');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice');baseline=page.evaluate('JSON.stringify(S)');raw=page.evaluate("localStorage.getItem('wordami.extended-reading.v1.'+LANG.code)")
   # Existing later work stays available; an unstarted later workshop must finish the new prerequisite.
   skillRaw=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
   page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,v=JSON.parse(localStorage.getItem(k));delete v.levels['B1-housing'];localStorage.setItem(k,JSON.stringify(v));}")
   # Remove the new earlier requirement without altering any of its older source lessons.
   page.evaluate("()=>{const k='wordami.extended-reading.v1.'+LANG.code,v=JSON.parse(localStorage.getItem(k));delete v.units['B1-community'];localStorage.setItem(k,JSON.stringify(v));}");page.reload();page.wait_for_function('window.WordamiExtendedReading');assert not page.evaluate("WordamiSkillsStudio.isOpen('B1-housing')")
   page.evaluate("([a,b])=>{localStorage.setItem('wordami.skills.v1.'+LANG.code,a);localStorage.setItem('wordami.extended-reading.v1.'+LANG.code,b);}",[skillRaw,raw]);page.reload();page.wait_for_function('window.WordamiExtendedReading');assert page.evaluate("WordamiSkillsStudio.isOpen('B1-housing')")
   spec=page.evaluate("WordamiExtendedReadingContent.units['B1-community']");d.get_by_role('button',name='Practise the whole-text check again',exact=True).click();q=spec['questions'][0];d.get_by_role('button',name=q['options'][q['answer']],exact=True).click();assert page.evaluate("WordamiExtendedReading.progress('B1-community').complete")
   page.reload();page.wait_for_function('window.WordamiExtendedReading');d.get_by_role('button',name='Practise the whole-text check again',exact=True).click();assert 'Question 2 of 4' in d.inner_text();assert page.evaluate("WordamiExtendedReading.evidence('B1-community').record.attempts.at(-1).answers.length")==1
   page.evaluate("WordamiExtendedReading.open('B1-community','notes')");note=d.get_by_role('textbox',name='Note for part 1',exact=True);original=note.input_value();checked=page.evaluate("WordamiExtendedReading.evidence('B1-community').record.checkedNotes")
   note.fill(original+' '+spec['sections'][0]['lines'][-1][0]);page.reload();page.wait_for_function('window.WordamiExtendedReading');page.evaluate("WordamiExtendedReading.open('B1-community','notes')");assert d.get_by_role('textbox',name='Note for part 1',exact=True).input_value()!=original;assert page.evaluate("WordamiExtendedReading.evidence('B1-community').record.checkedNotes")==checked
   before=page.evaluate("localStorage.getItem('wordami.extended-reading.v1.'+LANG.code)");page.evaluate("()=>{window.__readingSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.extended-reading.v1.'))throw new DOMException('full','QuotaExceededError');return __readingSet.call(this,k,v);};}")
   note=d.get_by_role('textbox',name='Note for part 1',exact=True);note.fill('Explicit unsaved synthetic reading note');assert 'could not be saved' in d.locator('[role=status]').inner_text();assert page.evaluate("localStorage.getItem('wordami.extended-reading.v1.'+LANG.code)")==before
   with page.expect_download() as info:d.get_by_role('button',name='Export reading portfolio',exact=True).click()
   copy=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert copy['unsavedDraft']['notes'][0]['text']=='Explicit unsaved synthetic reading note'
   page.evaluate('()=>{Storage.prototype.setItem=window.__readingSet;}');note.fill(original);assert page.evaluate("WordamiExtendedReading.evidence('B1-community').record.notes[0].text")==original
   # A changed source must retain the completed previous source version, not credit the replacement.
   page.evaluate("()=>{WordamiExtendedReadingContent.units['B1-community'].strategy+=' Explicit source-change fixture.';WordamiExtendedReading.open('B1-community');}");assert not page.evaluate("WordamiExtendedReading.progress('B1-community').complete");d.get_by_role('button',name='Prepare this reading',exact=True).click();assert page.evaluate("WordamiExtendedReading.evidence('B1-community').history[0].brief.completedAt && !!WordamiExtendedReading.evidence('B1-community').history[0].definition")
   page.evaluate("raw=>localStorage.setItem('wordami.extended-reading.v1.'+LANG.code,raw)",raw);page.reload();page.wait_for_function('window.WordamiExtendedReading');page.evaluate("WordamiExtendedReading.open('B1-community','notes')")
   other=c.new_page();other.goto(url);other.wait_for_function('window.WordamiExtendedReading');other.evaluate("()=>{const k='wordami.extended-reading.v1.'+LANG.code,v=JSON.parse(localStorage.getItem(k));v.units['B1-community'].notes[0].text='Remote synthetic note';localStorage.setItem(k,JSON.stringify(v));}")
   page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('another tab')");remote=page.evaluate("localStorage.getItem('wordami.extended-reading.v1.'+LANG.code)");d.get_by_role('textbox',name='Note for part 1',exact=True).fill('My unsaved synthetic copy');assert page.evaluate("localStorage.getItem('wordami.extended-reading.v1.'+LANG.code)")==remote
   with page.expect_download() as info:d.get_by_role('button',name='Export reading portfolio',exact=True).click()
   copy=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert copy['unsavedDraft']['notes'][0]['text']=='My unsaved synthetic copy' and copy['units']['B1-community']['notes'][0]['text']!='Remote synthetic note'
   assert page.evaluate('JSON.stringify(S)')==baseline and not errors,errors
   reports.append({'language':lang,'freshLaterUnitCannotBypass':True,'existingLaterWorkPreserved':True,'unfinishedCheckResumes':True,'priorPassPreserved':True,'draftResume':True,'checkedNotesPreservedDuringEditing':True,'quotaRollbackRetryAndUnsavedExport':True,'changedSourceArchivesEvidence':True,'twoTabConflictPreventsOverwrite':True,'originalProgressUnchanged':True,'pageErrors':errors});c.close()
  browser.close()
 (OUT/'recovery-verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8');print(json.dumps(reports))
finally:s.shutdown();s.server_close()
