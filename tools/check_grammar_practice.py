"""Grammar preview, worked-example gates, resume, hints, accent keys and failed-save rollback."""
import http.server,json,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'output'/'grammar-practice'
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();url=f'http://127.0.0.1:{server.server_port}/'
    reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            page=browser.new_page(viewport={'width':320,'height':740});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            page.goto(url+f'?preview=1&lang={lang}#grammar-C2');page.wait_for_function('window.WordamiGrammar');page.locator('#splash').wait_for(state='detached')
            d=page.locator('#a1-practice')
            assert 'source preview' in d.inner_text()
            assert d.get_by_role('button',name='I have studied the examples').count()==0
            assert not page.evaluate("WordamiActivities.begin('grammar.C2')")
            page.goto(url+f'?preview=1&lang={lang}#grammar-A1')
            assert not page.evaluate("WordamiActivities.begin('grammar.A1')")
            page.evaluate("()=>{S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;save();}")
            baseline=page.evaluate('JSON.stringify(S)')
            tasks=page.evaluate('WordamiGrammarContent.lessons[0].tasks')
            d.get_by_role('button',name='I have studied the examples',exact=True).click()
            attempt=page.evaluate("JSON.parse(localStorage.getItem('wordami.grammar.v1.'+LANG.code)).lessons.A1.attemptId")
            for index,t in enumerate(tasks):
                if index==0:
                    d.get_by_role('button',name=t['options'][(t['answer']+1)%3],exact=True).click()
                    assert 'try again' in d.locator('[role=status]').inner_text()
                if index==2:
                    d.get_by_role('button',name='Show the worked model',exact=True).click()
                    page.reload();d.get_by_role('button',name='Continue grammar practice',exact=True).click()
                if t['kind']=='choice':d.get_by_role('button',name=t['options'][t['answer']],exact=True).click()
                else:
                    text=t['accept'][0];field=d.get_by_role('textbox',name='Your learned sentence')
                    if index==4:
                        accent=next(c for c in text if c in page.evaluate('LANG.letters'))
                        position=text.index(accent);field.fill(text[:position]+text[position+1:])
                        field.evaluate('(e,p)=>{e.focus();e.setSelectionRange(p,p)}',position)
                        d.get_by_role('button',name='Insert '+accent,exact=True).click()
                        assert field.input_value()==text
                    else:field.fill(text)
                    d.get_by_role('button',name='Check sentence',exact=True).click()
                if index==5:
                    page.evaluate("()=>{window.__setItem=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.grammar.v1.'))throw new DOMException('full','QuotaExceededError');return __setItem.call(this,k,v);};}")
                    d.get_by_role('button',name='Continue',exact=True).click()
                    assert not page.evaluate("WordamiGrammar.ready('A1')")
                    assert not page.evaluate("WordamiActivities.status('grammar.A1').finished")
                    page.evaluate('()=>{Storage.prototype.setItem=window.__setItem;}')
                d.get_by_role('button',name='Continue',exact=True).click()
            assert page.evaluate("WordamiGrammar.ready('A1')")
            assert not page.evaluate("WordamiActivities.begin('skills.A1.reading')")
            assert page.evaluate('WordamiStudyMemory.summary().learned')==0
            evidence=page.evaluate('id=>WordamiActivities.attempt(id)',attempt)
            assert evidence['completedAt'] and evidence['tasks']['g0']['tries']==2 and evidence['tasks']['g2']['assisted']
            assert page.evaluate('JSON.stringify(S)')==baseline
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            page.screenshot(path=str(OUT/(lang+'-mobile.png')))
            assert not errors,errors
            reports.append({'language':lang,'workedSourceGate':True,'futureLevelLocked':True,'resume':True,'hintSurvivesReload':True,'accentKeys':True,'quotaRollback':True,'courseStateUnchanged':True})
            page.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2),encoding='utf8')
    print('Grammar gates, resume, persistent hints, accent keys and failed-save rollback passed in both languages.')
if __name__=='__main__':main()
