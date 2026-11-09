"""Exercise an installed build-187 app updating to 188 with a Unit-3 learner."""
import http.server, threading, subprocess, json
from pathlib import Path
from functools import partial
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];SITE=ROOT/'.release-lithuanian-art' if (ROOT/'.release-lithuanian-art').is_dir() else ROOT
old={name:subprocess.check_output(['git','show','6c7c739:'+name],cwd=SITE) for name in ['index.html','sw.js']}
class Handler(http.server.SimpleHTTPRequestHandler):
    legacy=True
    def log_message(self,*args):pass
    def do_GET(self):
        name=urlsplit(self.path).path.strip('/') or 'index.html'
        if type(self).legacy and name in old:
            content=old[name];self.send_response(200)
            self.send_header('Content-Type','text/html' if name=='index.html' else 'application/javascript')
            self.send_header('Cache-Control','no-cache');self.send_header('Content-Length',str(len(content)));self.end_headers();self.wfile.write(content)
        else:super().do_GET()
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(SITE)))
threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    context=browser.new_context();page=context.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(url);page.wait_for_function('window.gintarasReady')
    assert page.evaluate('APP_VERSION')==187
    page.wait_for_function('navigator.serviceWorker.controller!==null')
    page.evaluate("""()=>{
      for(const id of ['u1','u21']){creditUnit(id,Object.fromEntries(unitItems(UNIT_BY[id]).map(i=>[i.id,1])));}
      S.convs={cv1:{done:true},cv16:{done:true}};
      S.items['u3a-1:0']={intro:true,seen:true,lvl:2,ok:5,bad:1,due:Date.now()+12345678,s:3.2,d:4.6};
      S.welcomed=true;S.sound=true;S.toured=true;S.meAsked=1;S.me={name:'Mark',g:'m'};S.signinAsked='test';S.seenVersion=187;S.xp=321;save();
    }""")
    state=page.evaluate('JSON.parse(JSON.stringify(S))')
    # The existing picture cache is retained, not emptied by the new shell.
    path=page.evaluate("picFile(picFor('kava'))")
    page.evaluate('path=>fetch(path)',path)
    page.wait_for_function("async path=>!!(await (await caches.open('gintaras-pics-v1')).match(new URL(path,location.href).href))",arg=path)
    Handler.legacy=False
    page.evaluate('navigator.serviceWorker.getRegistration().then(r=>r.update())')
    page.wait_for_function("async()=>{const r=await navigator.serviceWorker.getRegistration();return r.active&&!!(await caches.keys()).find(k=>k==='gintaras-shell-v188')} ")
    page.reload();page.wait_for_function('window.WordamiUnitSkills')
    assert page.evaluate('APP_VERSION')==188
    assert page.evaluate("unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))")
    assert page.evaluate("!stepDone('u1') && WordamiUnitSkills.entries('u1').length===1")
    after=page.evaluate('JSON.parse(JSON.stringify(S))')
    for key in ['items','lessons','convs','xp','me']:
        assert after[key]==state[key],key
    assert page.evaluate('WordamiActivities.requirements("a1.first-meeting").ready')
    assert page.evaluate('WordamiActivities.requirements("a1.small-talk").ready')
    assert not page.evaluate('WordamiActivities.requirements("a1.food-order").ready')
    context.set_offline(True);page.goto(url+'#a1-first-meeting')
    page.wait_for_function('window.WordamiTopicCatalogue')
    assert page.locator('#a1-practice').is_visible()
    assert page.evaluate("async path=>!!(await (await caches.open('gintaras-pics-v1')).match(new URL(path,location.href).href))",path)
    assert not errors,errors
    browser.close()
server.shutdown()
out=ROOT/'output/required-unit-skills/update-verification.json'
out.write_text(json.dumps({'passed':True,'fromBuild':187,'toBuild':188,'preserved':['items','lessons','convs','xp','me','picture-cache'],'offlineLaunch':True},indent=2),encoding='utf8')
print('Build 187 to 188: Unit-3 progress, FSRS fields, XP, names, conversations, cache and offline launch preserved.')
