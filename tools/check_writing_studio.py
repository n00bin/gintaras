"""Verify the full A1–C2 writing process in both languages without claiming proficiency."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'writing-studio'
LEVELS=['A1','A2','B1','B2','C1','C2']

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(viewport={'width':390,'height':844},accept_downloads=True)
            page=context.new_page();errors=[]
            page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url+f'?preview=1&lang={lang}#writing-C2')
            page.wait_for_function('window.WordamiWritingStudio')
            page.locator('#splash').wait_for(state='detached')
            d=page.locator('#writing-studio')
            assert 'Complete and self-review the three C1' in d.inner_text()
            assert not page.evaluate("WordamiActivities.begin('writing.C2.synthesis-essay')")
            d.get_by_role('button',name='Preview this lesson',exact=True).click()
            assert 'Lesson preview' in d.inner_text()
            assert d.get_by_role('textbox').count()==0
            assert not page.evaluate("WordamiActivities.begin('writing.C2.synthesis-essay')")
            d.get_by_role('button',name='Back to C2',exact=True).click()
            page.evaluate("S.welcomed=true;S.sound=false;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save()")
            baseline=page.evaluate('JSON.stringify(S)')
            catalogue=page.evaluate('WordamiWritingStudio.catalogue()')
            assert [l['id'] for l in catalogue]==LEVELS
            assert all(len(l['projects'])==3 for l in catalogue)
            for level_index,level in enumerate(LEVELS):
                page.goto(url+f'?preview=1&lang={lang}#writing-{level}')
                assert d.get_by_role('button',name='Start project').first.is_disabled()
                assert not page.evaluate("id=>WordamiActivities.requirements('writing.'+id).ready",catalogue[level_index]['projects'][0]['id'])
                d.get_by_role('button',name='Begin language preparation').click()
                phrases=page.evaluate("id=>WordamiWritingContent.levels.find(l=>l.id===id).phrases",level)
                for index in range(8):
                    d.get_by_role('button',name='Practise this phrase').click()
                    if index==0:
                        wrong=phrases[3][1]
                        d.get_by_role('button',name=wrong,exact=True).click()
                        assert 'Try again' in d.locator('[role=status]').inner_text()
                    d.get_by_role('button',name=phrases[index][1],exact=True).click()
                assert 'Read and notice' in d.inner_text()
                assert not page.evaluate("id=>WordamiActivities.requirements('writing.'+id).ready",catalogue[level_index]['projects'][0]['id'])
                questions=page.evaluate("id=>WordamiWritingContent.levels.find(l=>l.id===id).questions",level)
                for question_index,(_,answers,correct) in enumerate(questions):
                    if question_index==0:
                        d.get_by_role('button',name=answers[1-correct],exact=True).click()
                        assert 'Look again' in d.locator('[role=status]').inner_text()
                    d.get_by_role('button',name=answers[correct],exact=True).click()
                d.get_by_role('button',name='Begin writing projects').click()
                assert page.evaluate("id=>WordamiActivities.requirements('writing.'+id).ready",catalogue[level_index]['projects'][0]['id'])
                for spec_index,project in enumerate(catalogue[level_index]['projects']):
                    d.get_by_role('button',name='Start project',exact=True).first.click()
                    model=page.evaluate("id=>WordamiWritingContent.levels.find(l=>l.id===id).model",level)
                    # The test text exercises persistence and review mechanics; it is not a scored learner essay.
                    original=model+'\n\n'+phrases[0][0]
                    editor=d.locator('#ws-draft');editor.fill(original)
                    if level=='A1' and spec_index==0:
                        d.get_by_role('button',name='Save & close').click()
                        page.goto(url+f'?preview=1&lang={lang}#writing')
                        d.get_by_role('button',name='Continue your A1 draft',exact=True).click()
                        assert d.locator('#ws-draft').input_value()==original
                    d.get_by_role('button',name='Get revision guidance').click()
                    d.get_by_role('button',name='Save revised project').click()
                    assert 'Revise the draft' in d.locator('[role=status]').inner_text()
                    revised=original+'\n\n'+phrases[1][0]
                    d.locator('#ws-draft').fill(revised)
                    d.get_by_role('button',name='Save revised project').click()
                    assert 'quote a short passage' in d.locator('[role=status]').inner_text()
                    for i in range(4):d.get_by_role('textbox',name='Evidence for criterion '+str(i+1)).fill(phrases[0][0])
                    d.locator('#ws-reflection').fill('I clarified the structure and added a more specific final point.')
                    if level=='A1' and spec_index==0:
                        page.evaluate("()=>{window.__writingTestSetItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(String(k).startsWith('wordami.writing.v1.'))throw new DOMException('test full','QuotaExceededError');return window.__writingTestSetItem.call(this,k,v)}}")
                        d.get_by_role('button',name='Save revised project').click()
                        assert 'storage is full or unavailable' in d.locator('[role=status]').inner_text()
                        assert not page.evaluate('WordamiWritingStudio.catalogue()[0].projects[0].completed')
                        assert next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')['selfReviewed']==0
                        page.evaluate('()=>{Storage.prototype.setItem=window.__writingTestSetItem}')
                    if level=='C2' and spec_index==0:
                        page.set_viewport_size({'width':320,'height':740})
                        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                        page.screenshot(path=str(OUT/f'{lang}-c2-revision-mobile.png'))
                    d.get_by_role('button',name='Save revised project').click()
                    assert 'Project revised and self-reviewed' in d.inner_text()
                    assert page.evaluate('JSON.stringify(S)')==baseline
                    if level=='A1' and spec_index==0:
                        with page.expect_download() as download_info:d.get_by_role('button',name='Export reviewed text').click()
                        exported=download_info.value
                        export_path=OUT/f'{lang}-export.txt';exported.save_as(export_path)
                        assert revised in export_path.read_text(encoding='utf8')
                        assert 'proficiency not assessed' in export_path.read_text(encoding='utf8')
                    d.get_by_role('button',name='Continue the writing pathway').click()
                print(lang+' '+level+' writing projects passed',flush=True)
            catalogue=page.evaluate('WordamiWritingStudio.catalogue()')
            assert all(l['prepared'] and all(x['completed'] for x in l['projects']) for l in catalogue)
            written=next(s for s in page.evaluate('WordamiActivities.summary()') if s['skill']=='writing')
            assert written['selfReviewed']==18 and written['completed']==0 and written['level'] is None
            page.reload()
            assert all(all(x['completed'] for x in l['projects']) for l in page.evaluate('WordamiWritingStudio.catalogue()'))
            page.evaluate("navigator.serviceWorker.ready.then(()=>new Promise(resolve=>{if(navigator.serviceWorker.controller)resolve();else navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true})}))")
            context.set_offline(True);page.reload()
            assert all(all(x['completed'] for x in l['projects']) for l in page.evaluate('WordamiWritingStudio.catalogue()'))
            context.set_offline(False)
            page.goto(url+f'?preview=1&lang={lang}#writing')
            d.get_by_role('button',name='Your writing portfolio',exact=True).click()
            assert d.get_by_role('button',name='Open project',exact=True).count()==18
            page.screenshot(path=str(OUT/f'{lang}-portfolio.png'))
            assert not errors,errors
            reports.append({'language':lang,'completedProjects':18,'writingSummary':written,'pageErrors':errors})
            context.close()
        # A fresh context cannot inherit another device/context's writing progress.
        public=browser.new_page();public.goto(url+'?preview=0&lang=lt#writing')
        assert public.locator('#writing-studio').count()==0
        browser.close()
    server.shutdown()
    (OUT/'verification.json').write_text(json.dumps({'passed':True,'courses':reports,'notes':'Tests verify process and persistence, not linguistic proficiency or CEFR validation.'},indent=2),encoding='utf8')
    print('All 36 A1-C2 writing projects passed preparation, draft, self-review, revision, storage-failure, export and offline checks.')

if __name__=='__main__':
    main()
