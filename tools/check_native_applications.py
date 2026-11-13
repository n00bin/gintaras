"""Play all 160 native-unit variants with real course clips and generated microphone input."""
import http.server,threading,json,time
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];OUT=R/'output/native-applications';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)))
threading.Thread(target=server.serve_forever,daemon=True).start();results=[]
FAST="""(()=>{const Native=Audio;window.Audio=function(url){const a=new Native(url);a.defaultPlaybackRate=4;a.playbackRate=4;a.addEventListener('loadedmetadata',()=>a.playbackRate=4);return a;};window.Audio.prototype=Native.prototype;})();"""
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
 for lang,count in [('lt',43),('es',37)]:
  context=browser.new_context(permissions=['microphone'],viewport={'width':390,'height':844});context.add_init_script(FAST)
  page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  url=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
  page.goto(url);page.wait_for_function('window.WordamiCoursePath');page.locator('#splash').wait_for(state='detached')
  page.evaluate("""()=>{S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.sound=true;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;for(const u of COURSE)for(const l of u.lessons)S.lessons[l.id]=1;for(const i of ITEMS)S.items[i.id]={seen:true,intro:true,lvl:2};save();renderTree();}""")
  baseline=page.evaluate('JSON.stringify(S.items)');topics=page.evaluate('WordamiUnitApplicationCatalogue');assert len(topics)==count
  d=page.locator('#a1-practice')
  for number,topic in enumerate(topics):
   for variant in [0,1]:
    page.evaluate('v=>Math.random=()=>v?0.8:0.2',variant)
    page.evaluate('id=>WordamiPracticeUI.openActivity(id)',topic['id'])
    again=d.get_by_role('button',name='Try a new visit',exact=True)
    (again if again.count() else d.get_by_role('button',name='Start activity',exact=True)).click()
    for step in range(6):
     task=page.evaluate('([id,v,step])=>WordamiUnitApplicationContent.find(t=>t.id===id).build(v)[step]',[topic['topic'],variant,step])
     if task['skill']=='listening':
      assert all(b.is_disabled() for b in d.locator('[data-topic-choice]').all())
      d.get_by_role('button',name='Play recording',exact=True).click()
      d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=30000)
     if 'options' in task:
      if number==0 and step==0:
       wrong=next(o['value'] for o in task['options'] if o['value']!=task['answer']);d.locator('[data-topic-choice="'+wrong+'"]').click();assert 'Try again' in d.inner_text()
      d.locator('[data-topic-choice="'+task['answer']+'"]').click()
     else:
      text=page.evaluate('([id,key])=>{const value=WordamiUnitApplicationContent.find(t=>t.id===id).sources[key];return (typeof value==="object"?BYID[value.cardId]:ITEMS.find(i=>(i.lt0||i.lt)===value)).lt}',[topic['topic'],task['accept'][0]])
      if number==0 and step==4:
       d.get_by_role('textbox').fill('not a valid answer');d.get_by_role('button',name='Check reply',exact=True).click();assert 'Try again' in d.inner_text()
      d.get_by_role('textbox').fill(text);d.get_by_role('button',name='Check reply',exact=True).click()
    d.get_by_role('button',name='Next: practise speaking',exact=True).click()
    done=d.get_by_role('button',name='I compared my recording',exact=True);assert done.is_disabled()
    d.locator('#recb').click();d.locator('#recb[aria-label="Stop recording"]').wait_for();page.wait_for_timeout(700);d.locator('#recb').click()
    d.get_by_role('button',name='Play my recording',exact=True).click();d.get_by_role('button',name='Hear course example',exact=True).click()
    page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
    done.click();assert 'Unit skills complete' in d.inner_text()
    assert page.evaluate('id=>WordamiUnitSkills.done(id)',topic['unitId'])
    assert page.evaluate('JSON.stringify(S.items)')==baseline
    results.append({'language':lang,'unit':topic['unitId'],'activity':topic['id'],'variant':variant,'passed':True})
    (OUT/'progress.json').write_text(json.dumps({'complete':False,'variantsPassed':len(results),'flows':results},indent=2),encoding='utf8')
   print(lang,topic['unitId'],str(number+1)+'/'+str(count),'both variants passed',flush=True)
  page.set_viewport_size({'width':320,'height':740});assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
  page.screenshot(path=str(OUT/(lang+'-completion-mobile.png')))
  page.wait_for_function('navigator.serviceWorker.controller!==null');page.reload();page.wait_for_function('window.WordamiCoursePath');assert 'Unit skills complete' in d.inner_text()
  context.set_offline(True);page.reload();page.wait_for_function('window.WordamiCoursePath');assert 'Unit skills complete' in d.inner_text()
  assert not errors,errors
  context.close()
 browser.close()
server.shutdown()
(OUT/'verification.json').write_text(json.dumps({'passed':True,'variants':len(results),'flows':results,'scope':'UI/media workflow, not language proficiency assessment'},indent=2),encoding='utf8')
print('All 160 source-bound variants, speaking recordings, saved word records and offline resumes passed.')
