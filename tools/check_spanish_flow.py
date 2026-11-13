"""Verify Spanish grading, complete course rendering, language isolation and offline playback."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/spanish'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(channel='chrome',headless=True)
            public=browser.new_context()
            public_page=public.new_page()
            public_page.goto(url+'?lang=es')
            public_page.wait_for_function('window.gintarasReady')
            assert public_page.evaluate('LANG.code')=='lt', 'A deep link must not bypass Coming soon'
            public.close()
            context=browser.new_context(viewport={'width':390,'height':844})
            page=context.new_page()
            errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.add_init_script("localStorage.setItem('gintaras.lang','lt');")
            page.goto(url+'?preview=1&lang=es')
            page.wait_for_function('window.gintarasReady')
            page.locator('#splash').wait_for(state='detached')
            page.evaluate("S.welcomed=true;S.toured=true;S.meAsked=1;S.sound=false;S.signinAsked='test';S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;window.signInGate=()=>{};window.maybeTour=()=>{};wordLvl('');")
            assert page.evaluate('LANG.code')=='es'
            assert page.evaluate('LANG.freeOrder') is False
            pairs=[
                ('Estoy aquí','Estoy aquí',True),('Soy aquí','Estoy aquí',False),
                ('Me gustan los libros','Me gustan los libros',True),('Me gusta los libros','Me gustan los libros',False),
                ('Tengo que trabajar','Tengo que trabajar',True),('Tengo a trabajar','Tengo que trabajar',False),
                ('Voy a estudiar','Voy a estudiar',True),('Voy estudiar','Voy a estudiar',False),
                ('No como carne','No como carne',True),('Como no carne','No como carne',False),
                ('Ayer fui al mercado','Ayer fui al mercado',True),('Ayer voy al mercado','Ayer fui al mercado',False),
                ('Una camisa roja','Una camisa roja',True),('Una camisa rojo','Una camisa roja',False),
                ('Y','¿Y tú?',False),('Yo','Tú',False),
            ]
            for given,target,ok in pairs:
                got=page.evaluate('([g,t])=>judgeTyped(g,[t]).ok',[given,target])
                assert got==ok,(given,target,ok,got)
            variants=page.evaluate("(()=>{const i=ITEMS.find(i=>i.lt==='Estoy aquí');return answersFor(i)})()")
            assert page.evaluate("A=>judgeAll('Yo estoy aquí',A).ok",variants)
            assert not page.evaluate("A=>judgeAll('Yo me gusta leer',A).ok",page.evaluate("answersFor(ITEMS.find(i=>i.lt==='Me gusta leer'))"))
            report=page.evaluate("""()=>{
              const results=[];let cards=0;
              for(const u of COURSE){
                for(const l of u.lessons.filter(l=>!l.speak)){
                  buildSession(l.items,'lesson',l);
                  if(!Q||!Q.queue.length)throw Error('Empty lesson '+l.id);
                  for(const item of l.items){Q.queue=[{type:'intro',item}];Q.idx=0;drawStep();
                    if(!document.querySelector('#stage').textContent.trim())throw Error('Blank '+item.id);cards++;}
                  Q=null;
                  l.items.forEach(i=>S.items[i.id]={lvl:1,intro:1,seen:true,due:Date.now()+86400000,ok:1,bad:0});
                  S.lessons[l.id]=1;
                }
                results.push({id:u.id,lessons:u.lessons.length});
              }
              return {units:results.length,cards,conversations:CONVS.length};
            }""")
            page.evaluate("S.me={name:'Ana',g:'f'};personalise();")
            assert page.evaluate("ITEMS.find(i=>(i.lt0||i.lt)==='Estoy enfermo').lt")=='Estoy enferma'
            page.evaluate("S.me={name:'Tomás',g:'m'};personalise();Q=null;startLesson(LESSON_BY['u15b-1']);Q.queue=[{type:'intro',item:ITEMS.find(i=>i.lt==='Un café, por favor')}];Q.idx=0;drawStep();")
            page.screenshot(path=str(OUT/'restaurant-mobile.png'))
            # New conversations render with the real branching and reply interface.
            page.evaluate("quit();startConv('cv13','text');")
            page.wait_for_function("CV&&CV.c.id==='cv13'&&document.querySelector('#sheet').classList.contains('conv')")
            page.screenshot(path=str(OUT/'conversation-mobile.png'))
            page.evaluate('quit();save();')
            before=page.evaluate("localStorage.getItem('gintaras.v2.es')")
            assert before
            assert page.evaluate("localStorage.getItem('gintaras.v2')") is None
            # Save a newly recorded group and a shared production image through the real service worker.
            page.evaluate('navigator.serviceWorker.ready')
            page.reload()
            page.wait_for_function('!!navigator.serviceWorker.controller&&window.gintarasReady')
            paths=['audio/es/ona_u22.mp3','audio/es/leonas_u22.mp3','pics/art-v2/coffee.webp']
            page.evaluate("ps=>Promise.all(ps.map(p=>fetch(p).then(r=>{if(!r.ok)throw Error(p);return r.arrayBuffer()})))",paths)
            page.wait_for_function("""async ps=>{const files=await Promise.all(ps.map(p=>caches.match(new URL(p,location.href).href)));return files.every(Boolean)}""",arg=paths)
            context.set_offline(True)
            page.reload()
            page.wait_for_function("window.gintarasReady&&LANG.code==='es'")
            assert page.evaluate("ps=>Promise.all(ps.map(p=>fetch(p).then(r=>r.ok)))",paths)==[True]*len(paths)
            assert not errors,errors
            report.update(grading_cases=len(pairs)+2,language_storage='isolated',gender_personalisation='passed',offline_new_audio='passed',page_errors=errors)
            (OUT/'verification.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
            print(json.dumps(report))
            browser.close()
    finally:
        server.shutdown()
        server.server_close()

if __name__=='__main__':
    main()
