"""A multi-unit test-out must require every covered application, survive reload, and resume."""
import http.server,threading,json
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
 for lang,target in [('lt','u21'),('es','u1')]:
  context=browser.new_context(permissions=['microphone'],service_workers='block');page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}');page.wait_for_function('window.WordamiCoursePath');page.locator('#splash').wait_for(state='detached')
  page.evaluate("target=>{S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.sound=true;document.querySelector('#welcome').hidden=true;startTestOut(UNIT_BY[target]);Q.place.right=Q.place.need;Q.place.passed=[target];placeFinish();}",target)
  covered=page.evaluate('S.unitSkillTestout.units');assert len(covered)==2,covered
  page.wait_for_timeout(800);page.get_by_role('button',name='Continue to unit skills',exact=True).click();d=page.locator('#a1-practice')
  for number in range(2):
   entry=page.evaluate('WordamiUnitSkills.nextPending()');assert entry
   topic=page.evaluate('id=>WordamiUnitApplicationCatalogue.find(t=>t.id===id)',entry['activityId'])
   d.get_by_role('button',name='Start activity',exact=True).click()
   state=page.evaluate('id=>JSON.parse(localStorage.getItem("wordami.topic.v1."+LANG.code+"."+id))',topic['topic'])
   for step in range(6):
    task=page.evaluate('([id,v,step])=>WordamiUnitApplicationContent.find(t=>t.id===id).build(v)[step]',[topic['topic'],state['variant'],step])
    assert d.get_by_role('button',name='Show a hint',exact=True).count()==0
    if task['skill']=='listening':
     d.get_by_role('button',name='Play recording',exact=True).click()
     try:d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=30000)
     except Exception:
      print('Direct retry',page.evaluate('async ([id,key])=>{const v=WordamiUnitApplicationContent.find(t=>t.id===id).sources[key],i=typeof v==="object"?BYID[v.cardId]:ITEMS.find(i=>(i.lt0||i.lt)===v);try{await WordamiPracticeUI.listen(i.lt);return "ok";}catch(e){return {error:e.message,url:audioUrl("ona",unitOf(i.au||i.id))};}}',[topic['topic'],task['audio']]),flush=True)
      print(lang,topic['id'],step,d.inner_text(),page.evaluate('([id,key])=>{const v=WordamiUnitApplicationContent.find(t=>t.id===id).sources[key],i=typeof v==="object"?BYID[v.cardId]:ITEMS.find(i=>(i.lt0||i.lt)===v);return {sound:S.sound,pending:S.unitSkillTestout,text:i.lt,assess:WordamiUnitSkills.canAssessPhrase(i.lt),taught:taught(i),audio:i.au||i.id,segment:SMAP.ona?.[unitOf(i.au||i.id)]?.[i.au||i.id]};}',[topic['topic'],task['audio']]),errors,flush=True);raise
    if 'options' in task:d.locator('[data-topic-choice="'+task['answer']+'"]').click()
    else:
     text=page.evaluate('([id,key])=>{const v=WordamiUnitApplicationContent.find(t=>t.id===id).sources[key];return (typeof v==="object"?BYID[v.cardId]:ITEMS.find(i=>(i.lt0||i.lt)===v)).lt}',[topic['topic'],task['accept'][0]])
     d.get_by_role('textbox').fill(text);d.get_by_role('button',name='Check reply',exact=True).click()
   d.get_by_role('button',name='Next: practise speaking',exact=True).click()
   d.locator('#recb').click();d.locator('#recb[aria-label="Stop recording"]').wait_for();page.wait_for_timeout(700);d.locator('#recb').click()
   d.get_by_role('button',name='Play my recording',exact=True).click();d.get_by_role('button',name='Hear course example',exact=True).click()
   page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
   d.get_by_role('button',name='I compared my recording',exact=True).click()
   if number==0:
    assert page.evaluate('!!S.unitSkillTestout')
    assert page.evaluate('ids=>ids.every(id=>!UNIT_BY[id].lessons.some(l=>crowns(l.id)))',covered)
    d.get_by_role('button',name='Next required check',exact=True).click()
    page.reload();page.wait_for_function('window.WordamiCoursePath');assert d.get_by_role('button',name='Start activity',exact=True).count()==1
  assert not page.evaluate('!!S.unitSkillTestout')
  assert page.evaluate('ids=>ids.every(id=>stepDone(id))',covered)
  assert 'Unit skills complete' in d.inner_text()
  assert not errors,errors
  reports.append({'language':lang,'covered':covered,'creditAfterAllSkills':True,'nextCheckAndReload':True,'pageErrors':errors})
  context.close()
 browser.close()
server.shutdown();result={'passed':True,'languages':reports};out=R/'output/native-applications/testout-verification.json';out.parent.mkdir(parents=True,exist_ok=True);out.write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result))
