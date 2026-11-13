"""Verify actual audio retention, bound evidence exports and explicit reviewer feedback."""
import base64,hashlib,http.server,threading,json
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_curriculum_migration import SEED
from check_skills_studio import FAST_AUDIO,record_response
R=Path(__file__).resolve().parents[1];OUT=R/'output/assessment-portfolio';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)))
threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
 for lang in ['lt','es']:
  context=browser.new_context(permissions=['microphone'],accept_downloads=True,viewport={'width':320,'height':740});context.add_init_script(FAST_AUDIO)
  page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  url=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills-A1'
  page.goto(url);page.wait_for_function('window.WordamiAssessments');page.locator('#splash').wait_for(state='detached')
  assert page.evaluate('WordamiAssessments.catalogue().length')==30
  assert page.evaluate("async()=>{try{await WordamiAssessments.submit('A1');return false;}catch(e){return e.message.includes('Finish');}}")
  page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiAssessments')
  d=page.locator('#skills-studio');d.get_by_role('button',name='Practise production again',exact=True).click()
  d.get_by_role('button',name='Start recording',exact=True).click();d.get_by_role('button',name='Stop recording',exact=True).wait_for();page.wait_for_timeout(1200)
  d.get_by_role('button',name='Stop recording',exact=True).click()
  page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Replay my response'&&!b.disabled)")
  d.get_by_role('button',name='Replay my response',exact=True).click()
  page.wait_for_function("[...document.querySelectorAll('#skills-studio button')].some(b=>b.textContent==='Save self-review'&&!b.disabled)")
  d.get_by_role('button',name='Save a portfolio copy',exact=True).click()
  d.locator('[role=status]').filter(has_text='Recording copy saved').wait_for()
  d.get_by_role('checkbox').check() if d.get_by_role('checkbox').count()==1 else None
  for box in d.get_by_role('checkbox').all():box.check()
  d.get_by_role('textbox',name='Your speaking reflection',exact=True).fill('I will make the personal details easier to distinguish.')
  d.get_by_role('button',name='Save self-review',exact=True).click()
  assert d.locator('#production-revision').count()==1
  record_response(page,d,retain=True)
  # The retained first take cannot substitute for the final presentation take.
  clips=page.evaluate("async()=>await WordamiAssessments.recordings('A1')")
  assert len(clips)==2 and {c['role'] for c in clips}=={'production.first','production.0'}
  d.get_by_role('button',name='Review this unit’s evidence',exact=True).click();e=page.locator('#a1-practice')
  e.get_by_role('button',name='Save this unit’s evidence',exact=True).click()
  e.get_by_role('heading',name='Evidence saved',exact=False).wait_for()
  with page.expect_download() as info:e.get_by_role('button',name='Export evidence packet',exact=True).click()
  packet=json.loads(Path(info.value.path()).read_text(encoding='utf8'))
  assert packet['evidence']['sources']['reading'] and len(packet['evidence']['writing'])==3
  assert len(packet['audio'])==2 and {a['role'] for a in packet['audio']}=={'production.0','production.first'}
  audio=base64.b64decode(packet['audio'][0]['dataURL'].split(',',1)[1]);assert len(audio)>128
  assert hashlib.sha256(audio).hexdigest()==packet['audio'][0]['hash']
  assert page.evaluate("async packet=>{const bad=structuredClone(packet);bad.evidence.writing[0].draft+='tampered';try{await WordamiAssessments.reviewPacket(bad);return false;}catch(e){return e.message.includes('changed');}}",packet)
  page.evaluate('packet=>WordamiAssessments.reviewPacket(packet)',packet)
  assert e.get_by_role('heading',name='Practical forms',exact=True).count()==1
  assert e.get_by_role('heading',name='Practical table reading',exact=True).count()==1
  for field,value in zip(packet['evidence']['forms']['task']['fields'],packet['evidence']['forms']['record']['forms']['original']['values']):
   assert field['label']+' · '+field['meaning']+': '+value in e.inner_text()
  e.get_by_role('textbox',name='Reviewer name',exact=True).fill('Workflow test reviewer')
  for skill in ['production','interaction','mediation','writing']:
   e.get_by_role('combobox',name=skill+' judgement',exact=True).select_option('developing' if skill=='production' else 'met' if skill=='writing' else 'not_assessed')
   e.get_by_role('textbox',name=skill+' reviewer feedback',exact=True).fill('Concrete workflow-test feedback; no language proficiency judgement is claimed.')
  with page.expect_download() as info:e.get_by_role('button',name='Export reviewer feedback',exact=True).click()
  review=json.loads(Path(info.value.path()).read_text(encoding='utf8'))
  assert review['cefrLevel'] is None
  result=page.evaluate('review=>WordamiAssessments.importReview(review)',review)
  assert result['current'] and result['reviewerIdentityVerified'] is False and result['calibrated'] is False
  page.evaluate("()=>{const k='wordami.writing.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.projects['A1.profile'].draft+=' A revised response';localStorage.setItem(k,JSON.stringify(s));}")
  result=page.evaluate('review=>WordamiAssessments.importReview(review)',review);assert result['current'] is False
  page.reload();page.wait_for_function('window.WordamiAssessments')
  assert page.evaluate("async()=>(await WordamiAssessments.recordings('A1')).length") ==2
  page.evaluate("async()=>WordamiAssessments.removeRecordings('A1')")
  page.reload();page.wait_for_function('window.WordamiAssessments')
  assert page.evaluate("async()=>(await WordamiAssessments.recordings('A1')).length") ==0
  assert not errors,errors
  reports.append({'language':lang,'unitRubrics':page.evaluate('WordamiAssessments.catalogue().length'),'realAudioBytes':len(audio),'exportHashVerified':True,'tamperingRejected':True,'staleFeedbackDetected':True,'deleteRecordingCopiesPersists':True,'automaticCefrAward':False})
  context.close()
 browser.close()
server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2),encoding='utf8')
print(json.dumps({'passed':True,'languages':reports}))
