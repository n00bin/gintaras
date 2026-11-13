"""Starting an optional grammar retake must preserve the earlier completion milestone."""
import http.server,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import grammar_lesson
ROOT=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            page=browser.new_page();page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills-A1')
            page.wait_for_function('window.WordamiGrammar');page.locator('#splash').wait_for(state='detached')
            d=page.locator('#skills-studio');grammar_lesson(page,d,'A1')
            d.get_by_role('button',name='Revisit grammar',exact=True).click()
            g=page.locator('#a1-practice');g.get_by_role('button',name='Practise this lesson again',exact=True).click()
            assert page.evaluate("WordamiGrammar.ready('A1')")
            g.get_by_role('button',name='Back to unit',exact=True).click()
            assert 'Worked grammar practice complete' in d.inner_text()
            page.reload();assert page.evaluate("WordamiGrammar.ready('A1')")
            assert not page.evaluate("WordamiActivities.begin('skills.A1.reading')")
            page.close()
        browser.close()
    server.shutdown();print('Optional grammar retakes preserve completion across return and reload without bypassing unit preparation.')
if __name__=='__main__':main()
