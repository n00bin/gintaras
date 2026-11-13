"""Verify every current Spanish illustration, approved mapping and offline rendering."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
R=Path(__file__).resolve().parents[1];OUT=R/'output/spanish-art';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*a):pass
s=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(R)));threading.Thread(target=s.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{s.server_port}/?preview=1&lang=es'
try:
 with sync_playwright() as p:
  b=p.chromium.launch(channel='chrome',headless=True);c=b.new_context(viewport={'width':390,'height':844});page=c.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
  page.goto(url);page.wait_for_function("window.gintarasReady && LANG.code==='es'");page.locator('#splash').wait_for(state='detached')
  rows=page.evaluate("()=>Object.entries(PICTURE_ASSETS).map(([word,asset])=>({word,asset,path:picFile(asset),markup:picHtml(word,'big')}))")
  approved=set(json.loads((R/'docs/art-direction/visual-review.json').read_text(encoding='utf8'))['approved_ids'])
  for row in rows:
   assert row['asset'].split('/')[-1] in approved,row
   with Image.open(R/row['path']) as im:im.load();assert im.size==(512,512) and im.mode=='RGBA' and im.getchannel('A').getextrema()[0]==0,row
  before=page.evaluate('JSON.stringify(S)')
  learner=page.evaluate("()=>{const before=S.look;delete S.look;const normal=myFace(36);S.look=CAST_LOOK.Diego;const custom=myFace(36);if(before===undefined)delete S.look;else S.look=before;return {normal,custom,asset:LEARNER_PICTURE,path:picFile(LEARNER_PICTURE)};}")
  assert learner['asset']=='art-v2/portrait-learner' and 'cast-art' in learner['normal'] and 'cast-art' not in learner['custom']
  assert learner['asset'].split('/')[-1] in approved
  page.evaluate("markup=>{const box=document.createElement('div');box.id='es-learner';box.innerHTML=markup;document.body.append(box)}",learner['normal'])
  page.wait_for_function("document.querySelector('#es-learner .cast-art.ok img')?.naturalWidth===512")
  page.evaluate("rows=>{const grid=document.createElement('div');grid.id='es-library';grid.innerHTML=rows.map(r=>r.markup).join('');document.body.append(grid)}",rows)
  page.wait_for_function("n=>document.querySelectorAll('#es-library .picbox.ok img').length===n",arg=len(rows))
  assert page.locator('#es-library img').evaluate_all('imgs=>imgs.every(i=>i.naturalWidth===512)')
  assert page.evaluate('JSON.stringify(S)')==before
  page.evaluate("document.querySelector('#es-library').remove()")
  page.evaluate('navigator.serviceWorker.ready');page.reload();page.wait_for_function('!!navigator.serviceWorker.controller')
  paths=sorted({r['path'] for r in rows});page.evaluate('ps=>Promise.all(ps.map(p=>fetch(p)))',paths)
  page.evaluate('p=>fetch(p)',learner['path'])
  page.wait_for_function("async ps=>{const c=await caches.open('gintaras-pics-v1');return(await Promise.all(ps.map(p=>c.match(new URL(p,location.href).href)))).every(Boolean)}",arg=paths)
  c.set_offline(True);page.reload();page.wait_for_function("window.gintarasReady && LANG.code==='es'")
  page.evaluate("rows=>{const grid=document.createElement('div');grid.id='es-library';grid.innerHTML=rows.map(r=>r.markup).join('');document.body.append(grid)}",rows)
  page.wait_for_function("n=>document.querySelectorAll('#es-library .picbox.ok img').length===n",arg=len(rows))
  page.evaluate("markup=>{const box=document.createElement('div');box.id='es-learner';box.innerHTML=markup;document.body.append(box)}",learner['normal'])
  page.wait_for_function("document.querySelector('#es-learner .cast-art.ok img')?.naturalWidth===512")
  page.evaluate("document.querySelector('#es-library').innerHTML=picHtml('jirafa','big').replace('giraffe.webp','missing-library-check.webp')")
  page.wait_for_function("!document.querySelector('#es-library img')")
  assert page.locator('#es-library .pic-e').is_visible()
  assert not errors,errors;b.close()
 result={'passed':True,'illustrations':len(rows),'uniqueFiles':len(paths),'defaultLearnerPortrait':True,'customAvatarPreserved':True,'learnerPortraitOffline':True,'allMappingsApproved':True,'allImagesDecoded':True,'savedStateUnchanged':True,'offlineReload':True,'missingImageFallback':True,'pageErrors':errors}
 (OUT/'verification.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(json.dumps(result))
finally:s.shutdown();s.server_close()
