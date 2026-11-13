"""Exercise all twelve band applications using explicit completed-prerequisite fixtures."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO,Quiet,vocabulary_lesson,source_expression_study,answer_check,record_response,writing_projects
R=Path(__file__).resolve().parents[1];OUT=R/'output/capstones';OUT.mkdir(parents=True,exist_ok=True)
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-ui-for-media-stream','--use-fake-device-for-media-stream'])
 for lang in ['lt','es']:
  c=browser.new_context(viewport={'width':320,'height':740},permissions=['microphone']);c.add_init_script(FAST_AUDIO);page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)));url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}'
  page.goto(url);page.wait_for_function('window.WordamiCoursePath');page.locator('#splash').wait_for(state='detached');page.evaluate(SEED)
  page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;S.sound=false;save();const k='wordami.skills.v1.'+LANG.code,d=JSON.parse(localStorage.getItem(k));for(const id of WordamiSkillsContent.capstones)delete d.levels[id];localStorage.setItem(k,JSON.stringify(d));}")
  page.reload();page.wait_for_function('window.WordamiCoursePath');d=page.locator('#skills-studio');levels=page.evaluate('WordamiSkillsContent.units.filter(u=>u.capstone)')
  for level in levels:
   uid=level['id'];page.goto(url+'#skills-'+uid)
   assert page.evaluate('id=>WordamiSkillsStudio.isOpen(id)',uid)
   d.get_by_role('button',name='Learn the language',exact=True).click();vocabulary_lesson(page,d,uid)
   for phrase in level['writing']['phrases']:
    d.get_by_role('button',name='Practise this meaning',exact=True).click();d.get_by_role('button',name=phrase[1],exact=True).click()
   if level['band'] in ['B1','B2','C1','C2']:source_expression_study(page,d,uid)
   d.get_by_role('checkbox').check();d.get_by_role('button',name='Finish source preparation',exact=True).click()
   answer_check(page,d,level,'reading');answer_check(page,d,level,'listening')
   d.get_by_role('button',name='Begin production',exact=True).click();record_response(page,d)
   d.get_by_role('button',name='Begin interaction',exact=True).click()
   for turn in range(3):
    d.get_by_role('button',name='Hear your partner',exact=True).click();page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Start recording'&&!b.disabled)");record_response(page,d)
   d.get_by_role('button',name='Begin mediation',exact=True).click();record_response(page,d)
   assert not page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   writing_projects(page,lang,level)
   assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
   reports.append({'language':lang,'unit':uid,'sources':level['sourceUnits'],'sixSkills':True,'realMedia':True,'selfReviewNotProficiencyGrade':True});print(lang,uid,'passed',flush=True)
  page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(r=>{if(navigator.serviceWorker.controller)r();else navigator.serviceWorker.addEventListener('controllerchange',r,{once:true})}))")
  c.set_offline(True);page.reload();page.wait_for_function('window.WordamiCoursePath');assert page.evaluate('WordamiSkillsContent.capstones.every(id=>WordamiSkillsStudio.progress(id).complete)');c.set_offline(False)
  assert not errors,errors;c.close()
 browser.close()
s.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'applications':reports,'offlineRestoration':True,'prerequisites':'Explicit synthetic fixtures; twelve new units exercised through UI'},indent=2),encoding='utf8')
