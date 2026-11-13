"""Two-tab regression: stale pages must preserve newer local writing drafts."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def load(context, url, route):
    page = context.new_page()
    page.goto(url + '?preview=1&lang=lt#' + route)
    page.wait_for_function('window.WordamiA1MessageCoach && window.WordamiWritingStudio')
    page.locator('#splash').wait_for(state='detached')
    return page

def main():
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}/'
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        context = browser.new_context(accept_downloads=True)
        seed = load(context, url, 'a1-message')
        seed.evaluate("""()=>{for(const text of WordamiActivities.definition('a1.original-message').requiredPhrases){const i=ITEMS.find(i=>i.lt===text);S.items[i.id]={seen:true,intro:true};}S.welcomed=true;S.toured=true;S.meAsked=1;S.signinAsked='test';S.seenVersion=APP_VERSION;S.sound=false;save();}""")
        seed.close()
        stale = load(context, url, 'a1-message')
        fresh = load(context, url, 'a1-message')
        d = fresh.locator('#a1-practice')
        d.get_by_role('button', name='Start your message').click()
        d.get_by_role('textbox').fill('Newer message in the second tab')
        fresh.wait_for_function("JSON.parse(localStorage.getItem('wordami.a1-message.v1.lt')).draft==='Newer message in the second tab'")
        expected = fresh.evaluate("localStorage.getItem('wordami.a1-message.v1.lt')")
        stale.evaluate("WordamiPracticeUI.hub()")
        assert stale.evaluate("localStorage.getItem('wordami.a1-message.v1.lt')") == expected
        stale.evaluate("WordamiPracticeUI.openActivity('a1.original-message')")
        sd = stale.locator('#a1-practice')
        sd.get_by_role('button', name='Start your message').click()
        sd.get_by_role('textbox').fill('Unsaved competing version')
        stale.wait_for_function("document.querySelector('#a1-practice [role=status]').textContent.includes('another tab')")
        assert stale.evaluate("localStorage.getItem('wordami.a1-message.v1.lt')") == expected
        with stale.expect_download() as download:
            sd.get_by_role('button', name='Export this draft').click()
        assert Path(download.value.path()).read_text(encoding='utf8') == 'Unsaved competing version'
        context.close()

        context = browser.new_context(accept_downloads=True)
        fresh = load(context, url, 'writing-A1')
        d = fresh.locator('#writing-studio')
        d.get_by_role('button', name='Begin language preparation').click()
        phrases = fresh.evaluate('WordamiWritingContent.levels[0].phrases')
        for phrase in phrases:
            d.get_by_role('button', name='Practise this phrase').click()
            d.get_by_role('button', name=phrase[1], exact=True).click()
        for _, answers, correct in fresh.evaluate('WordamiWritingContent.levels[0].questions'):
            d.get_by_role('button', name=answers[correct], exact=True).click()
        d.get_by_role('button', name='Begin writing projects').click()
        d.get_by_role('button', name='Start project', exact=True).first.click()
        d.locator('#ws-draft').fill('First saved writing version')
        fresh.wait_for_function("localStorage.getItem('wordami.writing.v1.lt').includes('First saved writing version')")
        stale = load(context, url, 'writing')
        stale.locator('#writing-studio').get_by_role('button', name='Continue your A1 draft', exact=True).click()
        d.locator('#ws-draft').fill('Newer writing version in the first tab')
        fresh.wait_for_function("localStorage.getItem('wordami.writing.v1.lt').includes('Newer writing version in the first tab')")
        expected = fresh.evaluate("localStorage.getItem('wordami.writing.v1.lt')")
        stale.locator('#ws-draft').fill('Competing writing draft to export')
        stale.wait_for_function("document.querySelector('#ws-status').textContent.includes('another tab')")
        stale.evaluate("window.dispatchEvent(new Event('pagehide'))")
        assert stale.evaluate("localStorage.getItem('wordami.writing.v1.lt')") == expected
        with stale.expect_download() as download:
            stale.locator('#writing-studio').get_by_role('button', name='Export this draft').click()
        assert 'Competing writing draft to export' in Path(download.value.path()).read_text(encoding='utf8')
        context.close()
        browser.close()
    server.shutdown()
    out = ROOT / 'output' / 'draft-tabs'
    out.mkdir(parents=True, exist_ok=True)
    (out / 'verification.json').write_text(json.dumps({'passed': True, 'checks': ['inactive coach tab', 'competing coach draft and export', 'competing portfolio draft, pagehide and export']}), encoding='utf8')
    print('Two-tab message and writing drafts preserve newer storage and export competing versions.')

if __name__ == '__main__':
    main()
