"""Update the current isolated production fixture to the local preview without losing progress."""
import http.server,threading,json,re
from pathlib import Path
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];OLD=R/'.release-lithuanian-art';OUT=R/'output/course-update';OUT.mkdir(parents=True,exist_ok=True)
from_build=int(re.search(r'const APP_VERSION=(\d+);',(OLD/'index.html').read_text(encoding='utf8')).group(1))
to_build=int(re.search(r'const APP_VERSION=(\d+);',(R/'index.html').read_text(encoding='utf8')).group(1))
assert to_build>from_build, 'Preview must advance beyond the production shell'
class Handler(http.server.SimpleHTTPRequestHandler):
 legacy=True
 def log_message(self,*args):pass
 def do_GET(self):
  # Snapshot swaps need a new response even when an older source file has a later mtime.
  if 'If-Modified-Since' in self.headers:del self.headers['If-Modified-Since']
  self.directory=str(OLD if type(self).legacy else R);super().do_GET()
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),Handler);threading.Thread(target=s.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{s.server_port}/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True);c=b.new_context();page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url);page.wait_for_function('window.WordamiUnitSkills');page.locator('#splash').wait_for(state='detached');assert page.evaluate('APP_VERSION')==from_build
 page.evaluate("()=>{S.welcomed=true;S.toured=true;S.signinAsked='test';S.meAsked=1;S.seenVersion=APP_VERSION;S.me={name:'Mark',g:'m'};for(const id of ['u1','u21']){creditUnit(id,{});for(const e of WordamiUnitSkills.entries(id))S.lessons['unit-skill:'+e.activityId]=1;}S.items['u3a-1:0']={intro:true,seen:true,lvl:2,ok:5,bad:1,due:Date.now()+12345678,s:3.2,d:4.6};S.xp=321;save();}")
 page.evaluate("()=>{S.convs={cv1:{done:true},cv16:{done:true}};save();}")
 baseline=page.evaluate('JSON.parse(JSON.stringify({items:S.items,lessons:S.lessons,me:S.me,xp:S.xp}))')
 assert page.evaluate("unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
 page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(r=>{if(navigator.serviceWorker.controller)r();else navigator.serviceWorker.addEventListener('controllerchange',r,{once:true})}))")
 Handler.legacy=False;page.evaluate('navigator.serviceWorker.getRegistration().then(r=>r.update())');page.goto(url+f'?update={to_build}')
 try:page.wait_for_function('build=>window.WordamiUnitSkills && APP_VERSION===build',arg=to_build)
 except Exception:print(page.evaluate('({build:APP_VERSION,skills:!!window.WordamiUnitSkills})'),errors,flush=True);raise
 page.locator('#splash').wait_for(state='detached')
 assert page.evaluate('JSON.parse(JSON.stringify({items:S.items,lessons:S.lessons,me:S.me,xp:S.xp}))')==baseline
 assert page.evaluate("stepDone('u1') && stepDone('u21') && unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
 assert page.evaluate('WordamiA1Placement.length')==3
 page.goto(url+'?preview=1&lang=lt');page.wait_for_function('window.WordamiCoursePath');counts=page.evaluate('({workshops:WordamiCoursePath.units().length,native:WordamiUnitPlacement.length,capstones:WordamiSkillsContent.capstones,preview:LANG_PREVIEW})');assert counts['workshops']==30 and counts['native']==43,(counts,errors)
 assert page.evaluate('JSON.parse(JSON.stringify({items:S.items,lessons:S.lessons,me:S.me,xp:S.xp}))')==baseline
 assert page.evaluate("unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
 assert not errors,errors;b.close()
s.shutdown();result={'passed':True,'fromBuild':from_build,'toBuild':to_build,'savedWordsAndLessonsUnchanged':True,'personalisationAndXpUnchanged':True,'unit3StillAccessible':True,'publicAndPreview':True,'pageErrors':errors};(OUT/'verification.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result))
