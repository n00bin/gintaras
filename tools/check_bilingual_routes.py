"""Exercise every guided chapter, its activity links, lesson placements and language isolation."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'bilingual-routes'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    reports = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(viewport={'width':320, 'height':740})
        for lang, language, first, visits, placements in [('lt','Lithuanian','u1a-0',16,26), ('es','Spanish','u1a-1',13,15)]:
            page = context.new_page()
            page.set_default_timeout(10000)
            errors = []
            page.on('pageerror', lambda e: errors.append(str(e)))
            page.goto(url + f'?preview=1&lang={lang}#a1-route')
            page.wait_for_function('window.WordamiA1Route && window.WordamiA1Placement')
            page.locator('#splash').wait_for(state='detached')
            d = page.locator('#a1-practice')
            assert language + ' A1' in d.inner_text()
            assert '0 of 12 chapters practised' in d.inner_text()
            chapters = page.evaluate('WordamiA1Route')
            assert len(chapters) == 12 and sum(len(c['activities']) for c in chapters) == visits
            assert len(page.evaluate('WordamiA1Placement')) == placements
            path = page.evaluate('JSON.stringify(PATH)')
            page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.sound=false;S.seenVersion=APP_VERSION;document.querySelector('#welcome').hidden=true;save();}")
            d.get_by_role('button', name='Open chapter', exact=True).first.click()
            assert 'First words' in d.inner_text() if lang == 'lt' else 'Greetings' in d.inner_text()
            d.get_by_role('button', name='Learn the next phrases').click()
            assert page.evaluate('Q.lesson.id') == first
            page.evaluate('quit()')
            assert d.is_visible() and 'Meet someone new' in d.inner_text()
            # Opening/abandoning a lesson never introduces its cards or completes practice.
            assert not page.evaluate("WordamiActivities.requirements('a1.introductions').ready")
            assert not page.evaluate("WordamiActivities.status('a1.introductions').finished")
            # Isolate link/return tests from teaching content: seed taught cards, never activity results.
            page.evaluate("()=>{ITEMS.forEach(i=>S.items[i.id]={seen:true,intro:true,lvl:4});COURSE.forEach(u=>{OPEN_UNITS.add(u.id);u.lessons.forEach(l=>S.lessons[l.id]=1)});ALL_PARTS=true;save();renderTree();}")
            page.wait_for_function('n=>document.querySelectorAll(".a1-course-practice").length===n', arg=placements)
            assert page.evaluate("()=>[...document.querySelectorAll('.a1-course-practice')].every(card=>{const row=[...card.closest('.unit').querySelectorAll('[data-lesson-id]')].find(r=>r.dataset.lessonId===card.dataset.afterLesson);return row&&!!(row.compareDocumentPosition(card)&Node.DOCUMENT_POSITION_FOLLOWING)})")
            for _ in range(3):
                page.evaluate('renderTree()')
                page.wait_for_function('n=>document.querySelectorAll(".a1-course-practice").length===n', arg=placements)
            for index, chapter in enumerate(chapters):
                d.get_by_role('button', name='All A1 chapters', exact=True).click()
                d.get_by_role('button', name='Open chapter', exact=True).nth(index).click()
                for activity_index, activity_id in enumerate(chapter['activities']):
                    d.get_by_role('button', name='Open activity', exact=True).nth(activity_index).click()
                    active = page.locator('#cafe-adventure') if lang == 'lt' and activity_id == 'a1.cafe-writing' else d
                    assert active.is_visible(), activity_id
                    assert active.evaluate('(e)=>e.scrollWidth<=e.clientWidth'), activity_id
                    assert active.get_by_role('button', name='Back to chapter', exact=True).count() == 1, activity_id
                    active.get_by_role('button', name='Back to chapter', exact=True).click()
                    assert d.locator('h2').inner_text() == chapter['title']
            # Starting the activities above must not have awarded a chapter.
            d.get_by_role('button', name='All A1 chapters', exact=True).click()
            assert '0 of 12 chapters practised' in d.inner_text()
            for chapter_index in [2,11]:
                d.get_by_role('button', name='Open chapter', exact=True).nth(chapter_index).click()
                d.get_by_role('button', name='Try the chapter check', exact=True).click()
                assert 'Begin check' in d.inner_text()
                assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                d.get_by_role('button', name='Back to chapter', exact=True).click()
                assert d.locator('h2').inner_text() == chapters[chapter_index]['title']
                d.get_by_role('button', name='All A1 chapters', exact=True).click()
            # Complete one synthetic attempt to exercise milestone collection and history retention.
            page.evaluate("()=>{const id='a1.introductions',a=WordamiActivities.begin(id);for(const t of WordamiActivities.definition(id).tasks){if(t.skill==='listening')WordamiActivities.record(a,t.id,{type:'audio_complete'});WordamiActivities.record(a,t.id,{type:'answer',correct:true});}WordamiActivities.finish(a);for(let i=0;i<205;i++)WordamiActivities.begin(id);}")
            assert not page.evaluate("WordamiActivities.status('a1.introductions').finished")
            page.reload()
            assert '1 of 12 chapters practised' in d.inner_text()
            assert page.evaluate('JSON.stringify(PATH)') == path
            assert all(s['level'] is None for s in page.evaluate('WordamiActivities.summary()'))
            page.set_viewport_size({'width':320, 'height':740})
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT / (lang + '-route-mobile.png')))
            assert not errors, errors
            reports.append({'language':lang, 'chapters':12, 'practiceVisits':visits, 'placements':placements, 'firstLesson':first, 'everyActivityReturns':True, 'milestonesSurviveHistoryTrim':True, 'pageErrors':errors})
            page.close()
        # Distinct storage keys prevent one language's milestones being used for the other.
        page = context.new_page()
        page.goto(url + '?preview=1&lang=es#a1-route')
        assert page.evaluate("JSON.parse(localStorage.getItem('wordami.a1-route.v1.es')).practisedActivities") == ['a1.introductions']
        assert page.evaluate("JSON.parse(localStorage.getItem('wordami.a1-route.v1.lt')).practisedActivities") == ['a1.introductions']
        second = context.new_page()
        second.goto(url + '?preview=1&lang=es#a1-route')
        second.evaluate("()=>{const id='a1.clarification',a=WordamiActivities.begin(id);for(const t of WordamiActivities.definition(id).tasks){if(t.skill==='listening')WordamiActivities.record(a,t.id,{type:'audio_complete'});WordamiActivities.record(a,t.id,{type:'answer',correct:true});}WordamiActivities.finish(a);}")
        page.locator('#a1-practice').get_by_role('button', name='Open chapter', exact=True).last.click()
        assert set(page.evaluate("JSON.parse(localStorage.getItem('wordami.a1-route.v1.es')).practisedActivities")) == {'a1.introductions','a1.clarification'}
        assert page.evaluate("JSON.parse(localStorage.getItem('wordami.a1-route.v1.lt')).practisedActivities") == ['a1.introductions']
        context.close()
        browser.close()
    server.shutdown()
    (OUT / 'verification.json').write_text(json.dumps({'passed':True, 'languages':reports}, indent=2), encoding='utf8')
    print('Both guided routes passed all 24 chapters, 29 activity links and returns, 41 placements, teaching gates and retained milestones.')

if __name__ == '__main__':
    main()
