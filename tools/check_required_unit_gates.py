"""Required unit completion and independent test-out through the real UI/media."""
import http.server, threading, json, sys
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'.release-lithuanian-art' if (ROOT/'.release-lithuanian-art').is_dir() else ROOT
if '--root' in sys.argv:SITE=ROOT
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(SITE)))
threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/'
if '--url' in sys.argv:url=sys.argv[sys.argv.index('--url')+1]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
 context=browser.new_context(viewport={'width':390,'height':844},permissions=['microphone'])
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url);page.wait_for_function('window.WordamiUnitSkills');page.locator('#splash').wait_for(state='detached')
 page.evaluate("""()=>{S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.sound=true;document.querySelector('#welcome').hidden=true;creditUnit('u1',{});ITEMS.filter(i=>i.unit.id==='u1').forEach(i=>rec(i.id).intro=true);save();renderTree();}""")
 assert not page.evaluate("stepDone('u1')")
 assert not page.evaluate("stepUnlocked(STEPS[STEPS.indexOf('u1')+1])")
 assert page.locator('#unit-u1 [data-required=true]').count()==1
 assert 'Required' in page.locator('#unit-u1 [data-required=true]').inner_text()
 assert page.locator('#a1-practice-card').count()==0
 page.evaluate("""()=>{const c=WordamiActivities,id=c.begin('a1.first-meeting');for(const t of c.definition('a1.first-meeting').tasks){if(t.skill==='listening')c.record(id,t.id,{type:'audio_complete'});c.record(id,t.id,{type:'answer',correct:true});}c.finish(id);}""")
 assert not page.evaluate("stepDone('u1')"),'Speaking must be required'
 page.evaluate("""()=>{const c=WordamiActivities,id=c.begin('a1.first-meeting-speaking');c.record(id,'say-it',{type:'answer',correct:true,assisted:true});c.finish(id);}""")
 assert page.evaluate("stepDone('u1')")
 page.reload();page.wait_for_function('window.WordamiUnitSkills');assert page.evaluate("stepDone('u1')")
 # A fresh learner passes the vocabulary phase. No course credit until all skills finish.
 context.close();context=browser.new_context(viewport={'width':390,'height':844},permissions=['microphone']);page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url);page.wait_for_function('window.WordamiUnitSkills');page.locator('#splash').wait_for(state='detached')
 page.evaluate("""()=>{S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.sound=true;document.querySelector('#welcome').hidden=true;startTestOut(UNIT_BY.u1);Q.place.right=Q.place.need;Q.place.passed=['u1'];placeFinish();}""")
 assert page.evaluate("!!S.unitSkillTestout && !stepDone('u1') && !UNIT_BY.u1.lessons.some(l=>crowns(l.id))")
 assert not page.evaluate("WordamiActivities.requirements('a1.food-order').ready")
 page.wait_for_timeout(800) # Respect the app's existing double-tap guard.
 page.get_by_role('button',name='Continue to unit skills',exact=True).click()
 d=page.locator('#a1-practice');d.get_by_role('button',name='Start activity',exact=True).click()
 def tasks(wrong=False):
  for step in range(6):
   task=page.evaluate("step=>{const s=JSON.parse(localStorage.getItem('wordami.topic.v1.lt.first-meeting'));return WordamiTopicContent[0].build(s.variant)[step]}",step)
   assert d.get_by_role('button',name='Show a hint',exact=True).count()==0
   assert d.get_by_role('button',name='Show transcript and meaning',exact=True).count()==0
   if step in [2,3]:
    assert all(b.is_disabled() for b in d.locator('[data-topic-choice]').all())
    d.get_by_role('button',name='Play recording',exact=True).click()
    d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=30000)
   if step<4:
    if wrong and step==0:
     bad=next(o['value'] for o in task['options'] if o['value']!=task['answer']);d.locator('[data-topic-choice="'+bad+'"]').click()
    d.locator('[data-topic-choice="'+task['answer']+'"]').click()
   else:
    answer=page.evaluate("key=>{const text=WordamiTopicContent[0].sources[key];return ITEMS.find(i=>(i.lt0||i.lt)===text).lt}",task['accept'][0])
    d.get_by_role('textbox').fill(answer);d.get_by_role('button',name='Check reply',exact=True).click()
 tasks(True)
 assert 'Practise, then try again' in d.inner_text()
 assert not page.evaluate("stepDone('u1')")
 page.reload();page.wait_for_function('window.WordamiUnitSkills')
 assert 'Practise, then try again' in d.inner_text()
 d.get_by_role('button',name='Retry unit skills',exact=True).click();tasks()
 assert not page.evaluate("stepDone('u1')")
 d.get_by_role('button',name='Next: practise speaking',exact=True).click()
 done=d.get_by_role('button',name='I compared my recording',exact=True);assert done.is_disabled()
 d.locator('#recb').click();d.locator('#recb[aria-label="Stop recording"]').wait_for();page.wait_for_timeout(700);d.locator('#recb').click()
 d.get_by_role('button',name='Play my recording',exact=True).click()
 d.get_by_role('button',name='Hear course example',exact=True).click()
 page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
 done.click()
 assert page.evaluate("!S.unitSkillTestout&&stepDone('u1')&&UNIT_BY.u1.lessons.every(l=>crowns(l.id)>0)")
 assert 'Unit skills complete' in d.inner_text()
 assert page.evaluate("WordamiActivities.requirements('a1.first-meeting').ready")
 assert not errors,errors
 browser.close()
server.shutdown()
print(json.dumps({'passed':True,'requiredPath':True,'speakingGate':True,'testoutCreditDeferred':True,'independentRetry':True,'resume':True,'realAudioAndRecording':True,'pageErrors':errors}))
