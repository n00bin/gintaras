"""Reuse existing phrase preparation while keeping new comprehension gates closed."""
import http.server,threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import vocabulary_lesson
ROOT=Path(__file__).resolve().parents[1]
class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a):pass
def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            page=browser.new_page();page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#writing-A1')
            page.wait_for_function('window.WordamiSkillsStudio');page.locator('#splash').wait_for(state='detached')
            d=page.locator('#writing-studio');l=page.evaluate('WordamiWritingContent.levels[0]')
            d.get_by_role('button',name='Begin language preparation').click()
            for phrase in l['phrases']:
                d.get_by_role('button',name='Practise this phrase').click();d.get_by_role('button',name=phrase[1],exact=True).click()
            for _,answers,correct in l['questions']:d.get_by_role('button',name=answers[correct],exact=True).click()
            d.get_by_role('button',name='Begin writing projects').click()
            d.get_by_role('button',name='Save & close').click()
            page.evaluate("location.hash='skills-A1'")
            d=page.locator('#skills-studio');d.get_by_role('button',name='Learn the language',exact=True).click()
            vocabulary_lesson(page,d,'A1')
            assert 'study the sources' in d.locator('h2').inner_text()
            assert d.get_by_role('button',name='Practise this meaning').count()==0
            assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].prepared')
            assert not page.evaluate("WordamiActivities.begin('skills.A1.reading')")
            assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].reading')
            page.close()
        browser.close()
    server.shutdown();print('Prior writing preparation is reused in both languages without skipping source study or comprehension checks.')
if __name__=='__main__':main()
