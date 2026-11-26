"""Verify current language mappings, real picture rendering and personalized/scene behaviour."""
import hashlib,http.server,json,threading
from functools import partial
from pathlib import Path
from PIL import Image
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/semantic-fixes';OUT.mkdir(exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass
def main():
    records=[json.loads(p.read_text(encoding='utf8')) for p in (ROOT/'docs/art-direction/semantic-records').glob('*.json')]
    approved=[r for r in records if r.get('review_status')=='approved']
    for r in approved:
        file=ROOT/r['asset'];assert hashlib.sha256(file.read_bytes()).hexdigest()==r['reviewed_sha256'],r['id']
        with Image.open(file) as im:
            im.load();assert im.size==(512,512) and im.mode=='RGBA',r['id']
            assert im.getchannel('A').getextrema()==(0,255),r['id']
    mappings=json.loads((ROOT/'docs/art-direction/semantic-fix-mappings.json').read_text(encoding='utf8'))['overrides']
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    errors=[];results=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(viewport={'width':390,'height':844})
            page=context.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url+f'?preview=1&lang={lang}')
            page.wait_for_function('window.gintarasReady')
            page.locator('#splash').wait_for(state='detached')
            page.evaluate("S.sound=false;S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true")
            # Evaluate exact mappings before personalization. The renderer then loads every corrected image.
            got=page.evaluate('words=>Object.fromEntries(words.map(w=>[w,picFor(w)]))',list(mappings[lang]))
            for word,expected in mappings[lang].items():assert got[word]==expected,(lang,word,got[word],expected)
            rows=page.evaluate("words=>words.map(word=>({word,picture:picFor(word),markup:picHtml(word,'big')}))",list(mappings[lang]))
            page.evaluate("rows=>{const host=document.createElement('section');host.id='semantic-proof';host.style.cssText='position:fixed;inset:0;z-index:999999;background:var(--bg);overflow:auto;padding:18px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px';host.innerHTML=rows.map(r=>'<article style=\"text-align:center;overflow-wrap:anywhere\">'+r.markup+'<p>'+esc(r.word)+'</p></article>').join('');document.body.append(host);}",rows)
            page.wait_for_function("[...document.querySelectorAll('#semantic-proof img')].every(i=>i.complete&&i.naturalWidth>0)")
            page.locator('#semantic-proof img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
            page.evaluate('new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))')
            assert page.locator('#semantic-proof .picbox.ok').count()==len(rows)
            page.screenshot(path=str(OUT/f'{lang}-actual-mappings-mobile.png'))
            page.evaluate("document.querySelector('#semantic-proof').remove()")
            # Exercise the real personalization entry point with changed country, name and gender.
            personal=[]
            for country in ['ca','jp']:
                state=page.evaluate("""country=>{S.me={name:'Ava',g:'f',from:country};persSig=null;personalise();const name=ITEMS.find(i=>/^(Mano vardas Tomas|Me llamo Tomás)$/.test(i.lt0||''));const origin=ITEMS.find(i=>PERS.fromRe.test(i.lt0||''));const teacher=ITEMS.find(i=>/^(Aš esu mokytojas|Soy maestro)$/.test(i.lt0||''));return {country,name:name&&{text:name.lt,pic:picFor(name.lt)},origin:origin&&{text:origin.lt,pic:picFor(origin.lt)},teacher:teacher&&{text:teacher.lt,pic:picFor(teacher.lt)}};}""",country)
                assert state['name'] and state['name']['pic']=='art-v2/semantic-personal-name',state
                assert state['origin'] and state['origin']['pic']=='art-v2/semantic-personal-origin',state
                if state['teacher']:assert state['teacher']['pic']=='art-v2/es-teacher-woman',state
                personal.append(state)
            jobs=page.evaluate("""()=>['teacher','engineer'].flatMap(job=>['m','f'].map(g=>{S.me={name:'Ava',g,from:'ca',job};persSig=null;personalise();const line=CONVS.flatMap(c=>c.all).find(x=>x.lt0===PERS.studentLine);return {job,g,text:line?.lt,picture:line?picFor(line.lt):null};}))""")
            if lang=='lt':assert all(j['text'] is not None for j in jobs),jobs
            assert all(j['picture'] is None or 'i-am-a-student' not in j['picture'] for j in jobs),jobs
            assert all(j['picture']=='art-v2/es-teacher-woman' for j in jobs if j['job']=='teacher' and j['g']=='f' and j['picture'] is not None),jobs
            if lang=='es':
                assert page.evaluate("picFor('el pez')")=='art-v2/fish'
                assert page.evaluate("picFor('el pescado')")=='art-v2/semantic-fish'
                assert page.evaluate("picFor('la silla')")=='art-v2/es-chair-v2'
                assert page.evaluate("picFor('Hay dos sillas')")=='art-v2/semantic-es-chair-v2'
                assert page.evaluate("picFor('el gato')")=='art-v2/cat'
                assert page.evaluate("picFor('Mi gato duerme')")=='art-v2/semantic-cat-v2'
            else:
                assert page.evaluate("picHtml('Aš darau','sm')")==''
                assert page.evaluate("picHtml('Aš darau','big')")!=''
                # Simulated earned conversation progress unlocks an actual conversation replay.
                page.evaluate("S.convs=S.convs||{};S.convs.cv1={done:true,text:true};startConv('cv1','text')")
                page.locator('.cv-cafe summary').click()
                page.locator('[data-cafe-place=counter]').click()
                assert 'crowded' in page.locator('.cv-cafe [role=status]').inner_text()
                page.locator('[data-cafe-place=seat]').click()
                assert 'Rūta' in page.locator('.cv-cafe [role=status]').inner_text()
                page.locator('.cv-cafe img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
                page.screenshot(path=str(OUT/'cv1-scene-mobile.png'))
                assert page.locator('.cv-cafe').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                page.evaluate("for(const text of ['kairėn','dešinėn','tiesiai','Kur yra stotis?']){const i=ITEMS.find(i=>(i.lt0||i.lt)===text);if(!i)throw Error(text);S.items[i.id]={seen:true,intro:true};}save()")
                page.goto(url+'?preview=1&lang=lt#a1-directions')
                page.wait_for_function('window.gintarasReady')
                practice=page.locator('#a1-practice')
                practice.get_by_role('button',name='Start activity',exact=True).click()
                map_panel=practice.locator('.topic-map')
                assert map_panel.locator('img').count()==3
                assert map_panel.locator('div').nth(1).inner_text()=='Park · north'
                assert map_panel.locator('div').nth(3).inner_text()=='Library · west'
                assert map_panel.locator('div').nth(5).inner_text()=='Shop · east'
                map_panel.locator('img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
                assert map_panel.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                page.screenshot(path=str(OUT/'directions-map-mobile.png'))
            results.append({'lang':lang,'rendered_corrected_mappings':len(rows),'personalized':personal,'personalized_jobs':jobs})
            context.close()
        browser.close()
    server.shutdown();assert not errors,errors
    report={'passed':True,'approved_assets':len(approved),'checks':results,'page_errors':errors}
    (OUT/'verification.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
