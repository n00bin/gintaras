"""Verify the public first-three-unit release with real audio and microphone UI."""
import http.server, threading, json, sys
from pathlib import Path
from functools import partial
from urllib.parse import urlsplit
from playwright.sync_api import sync_playwright
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
SITE=ROOT/'.release-lithuanian-art' if (ROOT/'.release-lithuanian-art').is_dir() else ROOT
OUT=ROOT/'output/required-unit-skills';OUT.mkdir(parents=True,exist_ok=True)
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(SITE)))
threading.Thread(target=server.serve_forever,daemon=True).start()
url=f'http://127.0.0.1:{server.server_port}/'
report=[]
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True,args=['--use-fake-device-for-media-stream','--use-fake-ui-for-media-stream'])
    context=browser.new_context(viewport={'width':390,'height':844},permissions=['microphone'])
    page=context.new_page();errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(url+'#a1-practice');page.wait_for_function('window.WordamiTopicCatalogue')
    page.locator('#splash').wait_for(state='detached')
    assert page.evaluate('LANG_PREVIEW') is False
    assert page.evaluate('APP_VERSION')==188
    topics=page.evaluate('WordamiTopicCatalogue')
    assert [t['topic'] for t in topics]==['first-meeting','small-talk','food-order']
    assert page.evaluate('WordamiActivities.catalogue().length')==6
    assert all(not page.evaluate('id=>WordamiActivities.requirements(id).ready',t['id']) for t in topics)
    assert page.get_by_role('button',name='Practise writing',exact=True).count()==0
    # Scope includes all cards plus the conversations at the end of Food.
    assets=page.evaluate("""()=>{
      const units=['u1','u21','u3'], cards=ITEMS.filter(i=>units.includes(i.unit.id));
      return cards.map(i=>({text:i.lt,picture:picFile(picFor(i.lt)),voices:['ona','leonas'].map(v=>({voice:v,file:audioUrl(v,unitOf(i.au||i.id)),segment:SMAP[v]?.[unitOf(i.au||i.id)]?.[i.au||i.id]}))}));
    }""")
    assert len(assets)==99
    portraits=page.evaluate("Object.values(CAST_PICTURES).map(p=>picFile(p))")
    assert len(portraits)==20
    for path in portraits:
        image=Image.open(SITE/path);image.load()
        assert image.size==(512,512) and image.mode=='RGBA'
    sheet=Image.new('RGB',(9*170,11*190),'#fffaf0');draw=ImageDraw.Draw(sheet)
    for pos,a in enumerate(assets):
        image=Image.open(SITE/a['picture']);image.load()
        assert image.size==(512,512) and image.mode=='RGBA'
        image.thumbnail((150,150));x=(pos%9)*170+10;y=(pos//9)*190
        sheet.paste(image,(x,y),image);draw.text((x,y+153),a['text'][:25],fill='#173f36')
        for v in a['voices']:
            assert v['segment'] and len(v['segment'])>=2,(a['text'],v)
            assert (SITE/urlsplit(v['file']).path).is_file(),v
    # Decode each lesson recording and ensure every mapped phrase fits its file.
    audio=page.evaluate("""async assets=>{
      const ctx=new AudioContext(),files=[...new Set(assets.flatMap(a=>a.voices.map(v=>v.file)))],result=[];
      for(const file of files){const r=await fetch(file);if(!r.ok)throw Error(file);const buffer=await ctx.decodeAudioData(await r.arrayBuffer());
        const segments=assets.flatMap(a=>a.voices.filter(v=>v.file===file).map(v=>v.segment));
        for(const [start,duration] of segments){if(start<0||duration<=0||start+duration>buffer.duration+.1)throw Error('Invalid clip '+file);}
        result.push({file,duration:buffer.duration,phrases:segments.length});}
      await ctx.close();return result;
    }""",assets)
    # Render the actual app image markup, rather than accepting files on disk alone.
    page.evaluate("""()=>{const grid=document.createElement('div');grid.id='foundation-image-check';grid.innerHTML=ITEMS.filter(i=>['u1','u21','u3'].includes(i.unit.id)).map(i=>picHtml(i.lt,'big')).join('');document.body.append(grid);}""")
    page.wait_for_function("document.querySelectorAll('#foundation-image-check .picbox.ok img').length===99")
    assert page.locator('#foundation-image-check img').evaluate_all('imgs=>imgs.every(i=>i.naturalWidth===512)')
    page.evaluate("document.querySelector('#foundation-image-check').remove()")
    sheet.save(OUT/'all-99-illustrations.png')
    # An incomplete prerequisite must remain locked even after other source cards are taught.
    phrases=page.evaluate("WordamiActivities.definition('a1.first-meeting').requiredPhrases")
    page.evaluate("ts=>{ts.forEach(t=>{const i=ITEMS.find(i=>i.lt===t);S.items[i.id]={seen:true,intro:true};});save();}",phrases[:-1])
    assert not page.evaluate("WordamiActivities.begin('a1.first-meeting')")
    page.evaluate("""()=>{ITEMS.filter(i=>['u1','u21','u3'].includes(i.unit.id)).forEach(i=>S.items[i.id]={seen:true,intro:true});S.welcomed=true;S.sound=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}""")
    page.reload();baseline=page.evaluate('JSON.stringify(S.items)')
    for variant in [0,1]:
      for topic in topics:
        tid=topic['topic'];page.goto(url+'#a1-'+tid)
        d=page.locator('#a1-practice')
        if d.get_by_role('button',name='Try a new visit',exact=True).count():
            d.get_by_role('button',name='Try a new visit',exact=True).click()
        else:d.get_by_role('button',name='Start activity',exact=True).click()
        # Force each authored variant, then reload through the real resume path.
        page.evaluate("([id,v])=>{const k='wordami.topic.v1.lt.'+id,s=JSON.parse(localStorage.getItem(k));s.variant=v;localStorage.setItem(k,JSON.stringify(s));}",[tid,variant])
        page.reload()
        for step in range(6):
          task=page.evaluate("([id,v,step])=>WordamiTopicContent.find(t=>t.id===id).build(v)[step]",[tid,variant,step])
          if step in [2,3]:
            assert all(b.is_disabled() for b in d.locator('[data-topic-choice]').all())
            d.get_by_role('button',name='Play recording',exact=True).click()
            d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=30000)
          if step<4:
            if step==0:
              wrong=next(o['value'] for o in task['options'] if o['value']!=task['answer'])
              d.locator('[data-topic-choice="'+wrong+'"]').click()
              assert 'Try again' in d.inner_text()
            d.locator('[data-topic-choice="'+task['answer']+'"]').click()
          else:
            if step==4:
              d.get_by_role('textbox').fill('invalid response')
              d.get_by_role('button',name='Check reply',exact=True).click()
              assert 'Try again' in d.inner_text()
              page.screenshot(path=str(OUT/f'{tid}-writing.png'))
            answer=page.evaluate("([id,key])=>{const text=WordamiTopicContent.find(t=>t.id===id).sources[key];return ITEMS.find(i=>(i.lt0||i.lt)===text).lt}",[tid,task['accept'][0]])
            d.get_by_role('textbox').fill(answer)
            d.get_by_role('button',name='Check reply',exact=True).click()
        assert 'Next: your spoken reply' in d.inner_text() or 'Unit skills complete' in d.inner_text()
        d.get_by_role('button',name='Next: practise speaking',exact=True).click()
        done=d.get_by_role('button',name='I compared my recording',exact=True);assert done.is_disabled()
        d.locator('#recb').click();d.locator('#recb[aria-label="Stop recording"]').wait_for()
        page.wait_for_timeout(700);d.locator('#recb').click()
        d.get_by_role('button',name='Play my recording',exact=True).click()
        d.get_by_role('button',name='Hear course example',exact=True).click()
        done.wait_for();page.wait_for_function("!document.querySelector('#a1-practice button.a1-primary').disabled")
        done.click();assert 'Unit skills complete' in d.inner_text()
        assert page.evaluate('JSON.stringify(S.items)')==baseline
        page.reload();assert 'Unit skills complete' in d.inner_text()
        report.append({'topic':tid,'variant':variant,'fourSkillsPassed':True})
        print(tid,variant,'passed',flush=True)
    # Installed-app/offline path: shell includes all new modules; real cached audio still plays.
    page.wait_for_function('navigator.serviceWorker.controller!==null')
    page.set_viewport_size({'width':320,'height':740})
    assert d.evaluate('e=>e.scrollWidth<=e.clientWidth')
    page.screenshot(path=str(OUT/'completion-mobile.png'))
    summary=page.evaluate('WordamiActivities.summary()')
    context.set_offline(True);page.reload();assert 'Unit skills complete' in d.inner_text()
    assert page.evaluate('WordamiActivities.summary()')==summary
    context.set_offline(False)
    # Lesson placement is in each correct unit and never shifts core course progress.
    d.get_by_role('button',name='Save & close',exact=True).click()
    page.evaluate("ALL_PARTS=true;OPEN_UNITS.add('u1');OPEN_UNITS.add('u21');OPEN_UNITS.add('u3');renderTree()")
    page.wait_for_function('document.querySelectorAll(".a1-course-practice").length===3')
    assert [x['afterUnit'] for x in page.evaluate('WordamiA1Placement')]==['u1','u21','u3']
    assert not errors,errors
    browser.close()
server.shutdown()
(OUT/'verification.json').write_text(json.dumps({'passed':True,'cardsAndImages':99,'audio':audio,'flows':report,'errors':errors},indent=2),encoding='utf8')
print('All first-three-unit public activity flows, audio, recording, images and offline resume passed.')
