"""Verify taught-only phrase review, real FSRS updates, retries, clocks and language isolation."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import FAST_AUDIO
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'phrase-review'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
CLOCK="""(()=>{const NativeDate=Date;window.__reviewNow=Number(sessionStorage.getItem('test.review.clock'))||NativeDate.UTC(2026,10,6,18);window.Date=class extends NativeDate{constructor(...args){super(...(args.length?args:[window.__reviewNow]));}static now(){return window.__reviewNow;}};window.__advanceReviewTime=ms=>{window.__reviewNow+=ms;sessionStorage.setItem('test.review.clock',String(window.__reviewNow));};})();"""
def answer(page,d,text):
    d.get_by_role('textbox',name='Your recalled wording').fill(text)
    d.get_by_role('button',name='Check recall',exact=True).click()
def correct(page,d):
    meaning=d.locator('h3').inner_text()
    card=next(c for c in page.evaluate('WordamiStudyMemory.catalogue()') if c['meaning']==meaning)
    answer(page,d,card['text'])
    return card
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        context=browser.new_context(accept_downloads=True,viewport={'width':320,'height':740});context.add_init_script(CLOCK);context.add_init_script(FAST_AUDIO)
        page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
        for lang in ['lt','es']:
            page.goto(url+f'?preview=1&lang={lang}#skills-C2');page.wait_for_function('window.WordamiStudyMemory');page.locator('#splash').wait_for(state='detached')
            assert page.evaluate('WordamiStudyMemory.summary().learned')==0
            assert not page.evaluate("WordamiActivities.begin('grammar.C2')")
            page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}")
            page.goto(url+f'?preview=1&lang={lang}#skills-A1')
            baseline=page.evaluate('JSON.stringify(S)')
            d=page.locator('#skills-studio');d.get_by_role('button',name='Learn the language',exact=True).click()
            phrases=page.evaluate('WordamiVocabularyContent.units.A1')
            for phrase in phrases[:3]:
                d.get_by_role('button',name='Practise this word').click();d.get_by_role('button',name=phrase['meaning'],exact=True).click()
            assert page.evaluate('WordamiStudyMemory.summary().learned')==3
            before=page.evaluate('WordamiStudyMemory.catalogue()')
            assert all(c['due']>page.evaluate('Date.now()') for c in before)
            page.evaluate("location.hash='phrase-review'");d=page.locator('#a1-practice')
            assert d.get_by_role('button',name='Review due items',exact=True).is_disabled()
            d.get_by_role('button',name='Extra recall practice',exact=True).click()
            # A failed storage write must preserve both the schedule and the current queue item.
            page.evaluate("()=>{window.__setItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.phrase-review.v1.'))throw new DOMException('full','QuotaExceededError');return __setItem.call(this,k,v);};}")
            first=correct(page,d)
            assert 'could not be saved' in d.locator('[role=status]').inner_text()
            assert page.evaluate('WordamiStudyMemory.summary().reviews')==0
            assert page.evaluate('WordamiStudyMemory.catalogue()')==before
            page.evaluate('()=>{Storage.prototype.setItem=window.__setItem;}')
            correct(page,d)
            d.get_by_role('button',name='Hear learned word',exact=True).click()
            page.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('Word recording finished')")
            assert page.evaluate('WordamiStudyMemory.catalogue()')==before
            d.get_by_role('button',name='Continue review',exact=True).click()
            # Resume at the next unsubmitted card; typed text is never stored.
            page.reload();d.get_by_role('button',name='Resume phrase review',exact=True).click()
            d.get_by_role('textbox',name='Your recalled wording').fill('PRIVATE_BAD_ANSWER_123')
            d.get_by_role('button',name='Check recall',exact=True).click()
            assert 'did not match' in d.locator('[role=status]').inner_text()
            assert 'PRIVATE_BAD_ANSWER_123' not in page.evaluate("localStorage.getItem('wordami.phrase-review.v1.'+LANG.code)")
            assert page.evaluate('WordamiStudyMemory.summary().lapses')==1
            d.get_by_role('button',name='Continue review',exact=True).click()
            # Seeing the model cannot count as unassisted recall even with matching typed text.
            d.get_by_role('button',name='Reveal learned wording',exact=True).click()
            page.reload();d.get_by_role('button',name='Resume phrase review',exact=True).click()
            correct(page,d);d.get_by_role('button',name='Continue review',exact=True).click()
            assert '1 of 3' in d.inner_text()
            assert page.evaluate('WordamiStudyMemory.summary().lapses')==2
            assert page.evaluate('JSON.stringify(S)')==baseline
            # The next day all three cards are due; each gets a learning-step follow-up.
            page.evaluate('__advanceReviewTime(86400001)')
            d.get_by_role('button',name='Review summary',exact=True).click()
            assert page.evaluate('WordamiStudyMemory.summary().due')==3
            d.get_by_role('button',name='Review due items',exact=True).click()
            for _ in range(3):correct(page,d);d.get_by_role('button',name='Continue review',exact=True).click()
            first_pass=page.evaluate('WordamiStudyMemory.catalogue()')
            assert all(c['due']>page.evaluate('Date.now()') for c in first_pass)
            assert page.evaluate('WordamiStudyMemory.summary().due')==0
            # A further day permits genuine FSRS growth, not repeated same-day inflation.
            page.evaluate('__advanceReviewTime(86400001)');d.get_by_role('button',name='Review summary',exact=True).click()
            d.get_by_role('button',name='Review due items',exact=True).click()
            for _ in range(3):correct(page,d);d.get_by_role('button',name='Continue review',exact=True).click()
            second_pass=page.evaluate('WordamiStudyMemory.catalogue()')
            assert all(c['fs']['s']>next(old['fs']['s'] for old in first_pass if old['id']==c['id']) for c in second_pass)
            d.get_by_role('button',name='Review summary',exact=True).click()
            with page.expect_download() as info:d.get_by_role('button',name='Export review progress',exact=True).click()
            exported=json.loads(Path(info.value.path()).read_text(encoding='utf8'));assert len(exported['cards'])==3
            assert exported['language']==lang and page.evaluate('WordamiStudyMemory.summary().level') is None
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/(lang+'-mobile.png')))
            reports.append({'language':lang,'taughtCards':3,'reviews':page.evaluate('WordamiStudyMemory.summary().reviews'),'fsrsGrowth':True,'rawAnswersNotStored':True,'quotaRollback':True,'modelNotUnaided':True})
        assert page.evaluate("JSON.parse(localStorage.getItem('wordami.phrase-review.v1.lt')).log.length")==9
        assert not errors,errors
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports,'pageErrors':errors},indent=2),encoding='utf8')
    print('Both phrase decks passed taught-only gates, quota rollback, resume, hints, real FSRS growth, export and language isolation.')
if __name__=='__main__':main()
