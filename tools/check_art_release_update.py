"""Verify installed production build 188 updates to art build 191 without state loss."""
import http.server,json,subprocess,threading
from pathlib import Path
from functools import partial
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];D=R/'.release-lithuanian-art'
old={n:subprocess.check_output(['git','show','4878b63:'+n],cwd=D) for n in ['index.html','sw.js','lang/lt.js','foundation-ui.js','foundation-unit-skills.js']}
class Handler(http.server.SimpleHTTPRequestHandler):
 legacy=True
 def log_message(self,*a):pass
 def do_GET(self):
  name=urlsplit(self.path).path.strip('/') or 'index.html'
  if type(self).legacy and name in old:
   data=old[name];self.send_response(200);self.send_header('Content-Type','text/html' if name.endswith('.html') else 'application/javascript');self.send_header('Cache-Control','no-cache');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
  else:
   if 'If-Modified-Since' in self.headers:del self.headers['If-Modified-Since']
   super().do_GET()
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(D)));threading.Thread(target=s.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{s.server_port}/'
try:
 with sync_playwright() as p:
  b=p.chromium.launch(channel='chrome',headless=True);c=b.new_context();page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(url);page.wait_for_function('window.WordamiUnitSkills && APP_VERSION===188');page.locator('#splash').wait_for(state='detached')
  page.evaluate("""()=>{for(const id of ['u1','u21']){creditUnit(id,{});for(const e of WordamiUnitSkills.entries(id))S.lessons['unit-skill:'+e.activityId]=1;}S.convs={cv1:{done:true},cv16:{done:true}};S.items['u3a-1:0']={intro:true,seen:true,lvl:2,ok:5,bad:1,due:Date.now()+12345678,s:3.2,d:4.6};S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.me={name:'Mark',g:'m'};S.seenVersion=188;S.xp=321;save();}""")
  snapshot="JSON.parse(JSON.stringify({items:S.items,lessons:S.lessons,convs:S.convs,xp:S.xp,me:S.me}))";before=page.evaluate(snapshot)
  assert page.evaluate("unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
  page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(r=>{if(navigator.serviceWorker.controller)r();else navigator.serviceWorker.addEventListener('controllerchange',r,{once:true})}))")
  path=page.evaluate("picFile(picFor('kava'))");page.evaluate('p=>fetch(p)',path)
  page.wait_for_function("async p=>!!(await(await caches.open('gintaras-pics-v1')).match(new URL(p,location.href).href))",arg=path)
  Handler.legacy=False;page.evaluate('navigator.serviceWorker.getRegistration().then(r=>r.update())');page.goto(url+'?art-update=191');page.wait_for_function('window.WordamiUnitSkills && APP_VERSION===191')
  assert page.evaluate(snapshot)==before
  assert page.evaluate("stepDone('u1') && stepDone('u21') && unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
  assert page.evaluate('Object.keys(PICTURE_ASSETS).length===488 && PICTURE_MIGRATION_COMPLETE')
  assert not page.evaluate("LANGS.find(l=>l.code==='es').ready")
  c.set_offline(True);page.reload();page.wait_for_function('window.WordamiUnitSkills && APP_VERSION===191')
  assert page.evaluate(snapshot)==before
  assert page.evaluate("unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
  assert page.evaluate("async p=>!!(await(await caches.open('gintaras-pics-v1')).match(new URL(p,location.href).href))",path)
  assert not errors,errors;b.close()
 result={'passed':True,'fromBuild':188,'toBuild':191,'mappings':488,'unit3Accessible':True,'savedStateUnchanged':True,'offlineReload':True,'pageErrors':errors}
 out=R/'output/complete-art-release';out.mkdir(parents=True,exist_ok=True);(out/'update-verification.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result))
finally:s.shutdown();s.server_close()
