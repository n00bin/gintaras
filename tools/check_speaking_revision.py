"""Verify actual first/second recordings, replay and self-review throughout both courses."""
import http.server,threading,json
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO,record_response
R=Path(__file__).resolve().parents[1];OUT=R/'output/speaking-revision';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();reports=[]
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
 for lang in ['lt','es']:
  c=b.new_context(permissions=['microphone'],viewport={'width':320,'height':740},service_workers='block');c.add_init_script(FAST_AUDIO);page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{s.server_port}/?preview=1&lang={lang}#skills');page.wait_for_function('window.WordamiWrittenInteraction');page.locator('#splash').wait_for(state='detached');page.evaluate(SEED)
  page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}");page.reload();page.wait_for_function('window.WordamiWrittenInteraction');d=page.locator('#skills-studio');baseline=page.evaluate('JSON.stringify(S)')
  ids=page.evaluate('WordamiSkillsContent.units.map(u=>u.id)')
  for uid in ids:
   page.evaluate('id=>WordamiSkillsStudio.openUnit(id)',uid);d.get_by_role('button',name='Practise production again',exact=True).click();assert d.locator('#production-revision').count()==0
   assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid),'A new practice attempt must retain earned completion'
   record_response(page,d)
   spoken=page.evaluate("id=>JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels[id].spoken.production",uid)
   assert spoken['firstReview']['reviewedAt'] and spoken['completedAt'] and len(spoken['turns'])==1
   assert spoken['firstReview']['reflection']!=spoken['turns'][0]['reflection']
   assert spoken['firstReview']['duration']>=1 and spoken['turns'][0]['duration']>=1
   assert page.evaluate('id=>WordamiSkillsStudio.progress(id).complete',uid)
   print(lang,uid,'two recorded takes passed',flush=True)
  assert page.evaluate('JSON.stringify(S)')==baseline;assert not errors,errors;reports.append({'language':lang,'units':len(ids),'actualRecordings':len(ids)*2,'replayAndReviewRequired':True,'firstAndRevisedReviewsPreserved':True,'courseWordsUnchanged':True,'pageErrors':errors});c.close()
 b.close()
s.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports,'scope':'Generated microphone input verifies workflow, not actual speech improvement'},indent=2),encoding='utf8')
