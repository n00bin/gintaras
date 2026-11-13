"""Inspect initial paths and required extensions in both language previews."""
import http.server,threading,json
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)))
threading.Thread(target=server.serve_forever,daemon=True).start()
reports=[]
with sync_playwright() as p:
 browser=p.chromium.launch(channel='chrome',headless=True)
 for lang,total in [('lt',43),('es',37)]:
  context=browser.new_context(service_workers='block');page=context.new_page();errors=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}')
  page.wait_for_function('window.WordamiCoursePath && window.WordamiUnitSkills')
  page.locator('#splash').wait_for(state='detached')
  assert not errors,errors
  assert page.evaluate('WordamiUnitApplicationCatalogue.length')==total
  assert page.evaluate('WordamiCoursePath.units().length')==30
  assert page.evaluate('STEPS.filter(id=>WordamiCoursePath.isUnit(id)).length')==30
  assert page.evaluate('new Set(STEPS).size===STEPS.length')
  assert page.evaluate('JSON.stringify(WordamiCoursePath.units().map(u=>u.unitId))===JSON.stringify(WordamiSkillsContent.units.map(u=>u.id))')
  assert page.locator('#skills-path-card,#a1-route-card,#a1-practice-card').count()==0
  assert not page.evaluate('WordamiSkillsStudio.progress("A1").complete')
  assert not page.evaluate('WordamiSkillsStudio.progress("C2-register").complete')
  assert all(not x['complete'] for x in page.evaluate('WordamiSkillsStudio.catalogue()'))
  page.evaluate('ALL_PARTS=true;renderTree()')
  assert page.locator('[data-curriculum-unit]').count()==30
  assert page.locator('[data-curriculum-unit][data-required=true]').count()==30
  assert page.evaluate('WordamiTransferChecks.progress("A1").requiredVariants')==2
  assert page.evaluate('WordamiInteractionPractice.progress("A1").requiredBranches')==2
  reports.append({'language':lang,'nativeApplications':total,'requiredAdvancedUnits':30,'pageErrors':errors})
  context.close()
 browser.close()
server.shutdown()
print(json.dumps({'passed':True,'paths':reports}))
