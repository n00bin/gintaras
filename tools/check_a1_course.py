"""Verify source-lesson placement and fresh, held-feedback task checks."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'a1-course'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    url=f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        page=browser.new_page(viewport={'width':390,'height':844});errors=[]
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(url+'?preview=1&lang=lt#meeting-check')
        page.wait_for_function('window.WordamiA1Placement')
        page.locator('#splash').wait_for(state='detached')
        d=page.locator('#a1-practice')
        assert 'Learn these phrases first' in d.inner_text()
        assert not page.evaluate("WordamiActivities.begin('a1.meeting-check')")
        placements=page.evaluate('WordamiA1Placement')
        assert len(placements)==26
        page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.sound=true;S.seenVersion=APP_VERSION;ITEMS.forEach(i=>S.items[i.id]={seen:true,intro:true,lvl:4});COURSE.forEach(u=>{OPEN_UNITS.add(u.id);u.lessons.forEach(l=>S.lessons[l.id]=1)});S.convs=Object.fromEntries(CONVS.map(c=>[c.id,{done:today()}]));save();ALL_PARTS=true;renderTree();}")
        page.wait_for_function("document.querySelectorAll('.a1-course-practice').length===26")
        page.evaluate("document.querySelector('#welcome').hidden=true")
        assert page.evaluate("()=>[...document.querySelectorAll('.a1-course-practice')].every(card=>{const row=[...card.closest('.unit').querySelectorAll('[data-lesson-id]')].find(r=>r.dataset.lessonId===card.dataset.afterLesson);return row&&!!(row.compareDocumentPosition(card)&Node.DOCUMENT_POSITION_FOLLOWING)})")
        for _ in range(3):
            page.evaluate('renderTree()')
            page.wait_for_function("document.querySelectorAll('.a1-course-practice').length===26")
        assert page.evaluate("new Set([...document.querySelectorAll('.a1-course-practice')].map(n=>n.id)).size===26")
        # Card routes open the correct activity without resetting source progress.
        page.locator('#a1-practice').get_by_role('button',name='Save & close').click()
        page.locator('[data-activity="a1.routines"]').get_by_role('button').click()
        assert 'A day in your life' in d.inner_text()
        page.screenshot(path=str(OUT/'placed-activity.png'))
        page.goto(url+'?preview=1&lang=lt#meeting-check')
        # Let normal startup record game availability after synthetic course completion.
        page.reload()
        baseline=page.evaluate('JSON.stringify(S)')
        checks=[]
        for name in ['meeting-check','price-check']:
            page.goto(url+'?preview=1&lang=lt#'+name)
            d.get_by_role('button',name='Begin check').click()
            state=page.evaluate("id=>JSON.parse(localStorage.getItem('wordami.check.v1.lt.'+id))",name)
            values=[['Monday','Tuesday'],['7','8']] if name=='meeting-check' else [['2','3'],['2','10']]
            for step in range(6):
                if step in [2,3]:
                    assert d.get_by_role('button',name='Record answer').is_disabled()
                    assert d.get_by_role('button',name='Show a hint').count()==0
                    d.get_by_role('button',name='Listen to the details').click()
                    d.locator('[role=status]').filter(has_text='Recording finished').wait_for(timeout=15000)
                if step==0:answer='wrong'
                elif step<4:answer=values[step%2][state['read'][step%2] if step<2 else 1-state['read'][step%2]]
                else:answer=(['Šiandien negaliu','Kelintą valandą?'] if name=='meeting-check' else ['Kiek kainuoja?','Ar turite obuolių?'])[step-4]
                if name=='meeting-check' and step in [1,3]:answer='0'+answer+':00'
                if name=='price-check' and step in [1,3]:answer=answer+'.00'
                d.get_by_role('textbox').fill(answer)
                d.get_by_role('button',name='Record answer').click()
                if step<5:assert 'Try again' not in d.inner_text() and 'correct' not in d.inner_text()
                if step==1:
                    d.get_by_role('button',name='Save & close').click();page.reload()
                    assert '3 of 6' in d.inner_text()
            assert 'Reading: 1 of 2 correct' in d.inner_text()
            assert 'Listening: 2 of 2 correct' in d.inner_text()
            assert 'Writing familiar requests: 2 of 2 correct' in d.inner_text()
            assert 'Speaking: not independently checked' in d.inner_text()
            a=page.evaluate("id=>{const s=JSON.parse(localStorage.getItem('wordami.check.v1.lt.'+id));return WordamiActivities.attempt(s.attemptId)}",name)
            assert a['completedAt'] and not a['tasks']['read-a']['correct']
            actual=page.evaluate('JSON.stringify(S)')
            before_obj=json.loads(baseline);after_obj=json.loads(actual)
            assert actual==baseline,{k:[str(before_obj.get(k))[:180],str(after_obj.get(k))[:180]] for k in set(before_obj)|set(after_obj) if before_obj.get(k)!=after_obj.get(k)}
            page.reload();assert 'Your task check' in d.inner_text()
            checks.append({'id':name,'finished':True,'wrongAnswerRetained':True})
        page.set_viewport_size({'width':320,'height':740})
        assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
        page.screenshot(path=str(OUT/'results-mobile.png'))
        assert not errors,errors
        (OUT/'verification.json').write_text(json.dumps({'passed':True,'placements':placements,'checks':checks,'pageErrors':errors},indent=2),encoding='utf8')
        browser.close()
    server.shutdown()
    print('All 26 path placements and both held-feedback task checks passed.')

if __name__=='__main__':
    main()
