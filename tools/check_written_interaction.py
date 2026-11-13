"""Exercise all 144 written branches, version gates and actual saved writing through the UI."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
R=Path(__file__).resolve().parents[1];OUT=R/'output/written-interaction';OUT.mkdir(parents=True,exist_ok=True)
FAIL="""()=>{window.__writtenSet=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.written-interaction.v1.'))throw new DOMException('full','QuotaExceededError');return window.__writtenSet.call(this,k,v);};}"""
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True)
 for lang in ['lt','es']:
  c=browser.new_context(viewport={'width':320,'height':740},accept_downloads=True);page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#written-exchange-C2'
  page.goto(url);page.wait_for_function('window.WordamiWrittenInteraction');page.locator('#splash').wait_for(state='detached');d=page.locator('#a1-practice')
  assert 'Complete this unit' in d.inner_text();assert d.locator('textarea,blockquote').count()==0
  page.evaluate(SEED);page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();localStorage.removeItem('wordami.written-interaction.v1.'+LANG.code);}")
  page.reload();page.wait_for_function('window.WordamiWrittenInteraction');baseline=page.evaluate('JSON.stringify(S)');skills=page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
  specs=page.evaluate('Object.values(WordamiWrittenInteractionContent.units)');total=0
  for unit in specs:
   uid=unit['id'];assert page.evaluate('id=>WordamiSkillsStudio.isOpen(id)',uid)
   assert not page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   page.evaluate('id=>WordamiWrittenInteraction.open(id)',uid)
   for index,spec in enumerate(unit['exchanges']):
    d.get_by_role('button',name='Open written exchange',exact=True).first.click()
    if uid=='A1' and index==0:
     d.get_by_role('button',name='Send practice question',exact=True).click();assert 'Write your question' in d.locator('[role=status]').inner_text()
     d.get_by_role('button',name='Show a question frame',exact=True).click()
    d.get_by_role('textbox',name='Your checking message',exact=True).fill(spec['questionModel']);page.wait_for_timeout(350)
    if uid=='A1' and index==0:
     page.reload();page.wait_for_function('window.WordamiWrittenInteraction');assert d.get_by_role('textbox',name='Your checking message',exact=True).input_value()==spec['questionModel']
    d.get_by_role('checkbox').check();d.get_by_role('button',name='Send practice question',exact=True).click()
    assert spec['partnerReply'] in d.inner_text()
    if uid=='A1' and index==0:
     d.get_by_role('button',name=spec['options'][(spec['answer']+1)%3],exact=True).click();assert 'try again' in d.locator('[role=status]').inner_text()
    d.get_by_role('button',name=spec['options'][spec['answer']],exact=True).click()
    d.get_by_role('textbox',name='Your reply',exact=True).fill(spec['questionModel']);d.get_by_role('button',name='Save first reply',exact=True).click()
    if uid=='A1' and index==0:
     d.get_by_role('button',name='Save revised exchange',exact=True).click();assert 'Revise your reply' in d.locator('[role=status]').inner_text()
    revised=spec['responseModel']
    if revised.strip()==spec['questionModel'].strip():revised+=' '+spec['partnerReply']
    d.get_by_role('textbox',name='Your reply',exact=True).fill(revised)
    for i in range(3):d.get_by_role('textbox',name='Reply evidence '+str(i+1),exact=True).fill(spec['responseModel'])
    d.get_by_role('textbox',name='Your message revision reflection',exact=True).fill('I changed my question into a reply that preserves the clarified detail.')
    if uid=='A1' and index==0:
     page.wait_for_timeout(350);before=page.evaluate("localStorage.getItem('wordami.written-interaction.v1.'+LANG.code)");page.evaluate(FAIL);d.get_by_role('button',name='Save revised exchange',exact=True).click();assert 'could not be saved' in d.locator('[role=status]').inner_text();assert page.evaluate("localStorage.getItem('wordami.written-interaction.v1.'+LANG.code)")==before;page.evaluate('()=>{Storage.prototype.setItem=window.__writtenSet;}')
    d.get_by_role('button',name='Save revised exchange',exact=True).click();assert 'Exchange revised and self-reviewed' in d.inner_text();assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
    d.get_by_role('button',name='All exchanges in this unit',exact=True).click();total+=1
   assert page.evaluate('id=>WordamiWrittenInteraction.progress(id).complete',uid)
   assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   print(lang,uid,'written exchanges passed',flush=True)
  assert total==72,total
  assert page.evaluate('JSON.stringify(S)')==baseline
  assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")==skills
  assert page.evaluate("WordamiAssessments.snapshot('A1').writtenInteraction.exchanges[0].record.question")
  with page.expect_download() as info:d.get_by_role('button',name='Export written exchanges',exact=True).click()
  exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['units'])==30
  before=page.evaluate("localStorage.getItem('wordami.written-interaction.v1.'+LANG.code)")
  page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));delete s.levels.A1.sourceSupportSignature;localStorage.setItem(k,JSON.stringify(s));}");page.reload();page.wait_for_function('window.WordamiWrittenInteraction');assert 'Complete this unit' in d.inner_text();assert d.locator('textarea,blockquote').count()==0;assert page.evaluate("localStorage.getItem('wordami.written-interaction.v1.'+LANG.code)")==before
  page.evaluate("raw=>localStorage.setItem('wordami.skills.v1.'+LANG.code,raw)",skills);page.reload();page.wait_for_function('window.WordamiWrittenInteraction')
  page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(r=>{if(navigator.serviceWorker.controller)r();else navigator.serviceWorker.addEventListener('controllerchange',r,{once:true})}))");c.set_offline(True);page.reload();page.wait_for_function('window.WordamiWrittenInteraction');assert page.evaluate('WordamiWrittenInteraction.catalogue().every(u=>u.complete)');c.set_offline(False)
  assert not errors,errors;reports.append({'language':lang,'units':30,'exchanges':total,'draftResume':True,'meaningCheckAndRevisionRequired':True,'quotaRollbackAndRetry':True,'originalProgressUnchanged':True,'offline':True,'pageErrors':errors});c.close()
 browser.close()
s.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports,'scope':'Workflow tests use prepared model wording, not learner proficiency evidence'},indent=2),encoding='utf8');print(json.dumps({'passed':True,'languages':reports}))
