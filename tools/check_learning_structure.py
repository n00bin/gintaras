"""Verify the teach-before-writing boundary and storage-failure gates in both languages."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from check_skills_studio import FAST_AUDIO, answer_check, grammar_lesson, vocabulary_lesson

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'learning-structure'
FAIL_SAVE = """()=>{window.__save=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.skills.v1.'))throw new DOMException('full','QuotaExceededError');return window.__save.call(this,k,v);};}"""
RESTORE_SAVE = '()=>{Storage.prototype.setItem=window.__save;}'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    reports = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        for lang in ['lt', 'es']:
            context = browser.new_context(service_workers='block', viewport={'width': 320, 'height': 740})
            context.add_init_script(FAST_AUDIO)
            page = context.new_page(); errors = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills-A1')
            page.wait_for_function('window.WordamiSkillsStudio && window.WordamiLearningDesign')
            page.locator('#splash').wait_for(state='detached')
            d = page.locator('#skills-studio')
            baseline = page.evaluate('JSON.stringify(S)')
            project = page.evaluate("'writing.A1.'+WordamiWritingContent.levels[0].projects[0][0]")
            assert not page.evaluate('id=>WordamiActivities.begin(id)', project)
            assert not page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert d.get_by_role('button', name='Open A1 writing projects', exact=True).is_disabled()
            d.get_by_text('Your learning plan', exact=True).click()
            assert 'Start here' in d.inner_text()
            assert 'Listening:' in d.inner_text() and 'Writing:' in d.inner_text()
            assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
            d.get_by_role('button', name='Learn the language', exact=True).click()
            assert d.locator('blockquote').inner_text()
            vocabulary_lesson(page, d, 'A1')
            level = page.evaluate('WordamiSkillsContent.units[0]')
            assert 'Notice how the language works' in d.inner_text()
            for index, phrase in enumerate(level['writing']['phrases']):
                d.get_by_role('button', name='Practise this meaning', exact=True).click()
                if index == 0:
                    count = page.evaluate('WordamiSkillsStudio.introduced().length')
                    page.evaluate(FAIL_SAVE)
                    d.get_by_role('button', name=phrase[1], exact=True).click()
                    assert 'could not be saved' in d.locator('[role=status]').inner_text()
                    assert page.evaluate('WordamiSkillsStudio.introduced().length') == count
                    page.evaluate(RESTORE_SAVE)
                d.get_by_role('button', name=phrase[1], exact=True).click()
            d.get_by_role('button', name='Back to stage', exact=True).click()
            grammar_lesson(page, d, 'A1')
            d.get_by_role('button', name='Learn the language', exact=True).click()
            d.get_by_role('checkbox').check()
            page.evaluate(FAIL_SAVE)
            d.get_by_role('button', name='Finish source preparation', exact=True).click()
            assert 'could not be saved' in d.locator('[role=status]').inner_text()
            assert not page.evaluate("WordamiActivities.requirements('skills.A1.reading').ready")
            assert not page.evaluate('WordamiSkillsStudio.catalogue()[0].prepared')
            page.evaluate(RESTORE_SAVE)
            d.get_by_role('button', name='Finish source preparation', exact=True).click()
            assert not page.evaluate('id=>WordamiActivities.begin(id)', project)
            answer_check(page, d, level, 'reading')
            assert not page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert not page.evaluate('id=>WordamiActivities.begin(id)', project)
            answer_check(page, d, level, 'listening')
            assert page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert d.get_by_role('button', name='Open A1 writing projects', exact=True).is_enabled()
            # The writing model still has its own preparation; comprehension is not
            # a shortcut around that second prerequisite.
            assert not page.evaluate('id=>WordamiActivities.requirements(id).ready', project)
            d.get_by_role('button', name='Open A1 writing projects', exact=True).click()
            w = page.locator('#writing-studio')
            w.get_by_role('button', name='Begin language preparation', exact=True).click()
            content = page.evaluate('WordamiWritingContent.levels[0]')
            for phrase in content['phrases']:
                w.get_by_role('button', name='Practise this phrase', exact=True).click()
                w.get_by_role('button', name=phrase[1], exact=True).click()
            for _, choices, answer in content['questions']:
                w.get_by_role('button', name=choices[answer], exact=True).click()
            w.get_by_role('button', name='Begin writing projects', exact=True).click()
            assert page.evaluate('id=>WordamiActivities.requirements(id).ready', project)
            assert page.evaluate('JSON.stringify(S)') == baseline
            saved = page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)")
            w.get_by_role('button', name='Save & close', exact=True).click()
            page.route('**/source-support.js', lambda route: route.abort())
            page.reload(); page.wait_for_function('window.WordamiSkillsStudio')
            assert not page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert not page.evaluate('id=>WordamiActivities.requirements(id).ready', project)
            assert page.evaluate("localStorage.getItem('wordami.skills.v1.'+LANG.code)") == saved
            page.unroute('**/source-support.js')
            page.reload(); page.wait_for_function('window.WordamiSourceSupport && window.WordamiSkillsStudio')
            assert page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert page.evaluate('id=>WordamiActivities.requirements(id).ready', project)
            # A changed source-support version requires only the new source study;
            # existing comprehension, phrases and writing preparation are retained.
            page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.levels.A1.sourceSupportSignature='previous-source-version';localStorage.setItem(k,JSON.stringify(s));}")
            page.reload(); page.wait_for_function('window.WordamiSkillsStudio')
            assert not page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert page.evaluate('WordamiSkillsStudio.catalogue()[0].reading && WordamiSkillsStudio.catalogue()[0].listening')
            assert page.evaluate('WordamiWritingStudio.catalogue()[0].prepared')
            page.evaluate("location.hash='skills-A1'")
            d.get_by_role('button', name='Learn the language', exact=True).click()
            assert 'Extra language for these sources' in d.inner_text()
            assert d.get_by_role('button', name='Practise this meaning', exact=True).count() == 0
            d.get_by_role('checkbox').check()
            d.get_by_role('button', name='Finish source preparation', exact=True).click()
            assert page.evaluate("WordamiSkillsStudio.canWrite('A1')")
            assert page.evaluate('id=>WordamiActivities.requirements(id).ready', project)
            d.get_by_text('Your learning plan', exact=True).click()
            page.screenshot(path=str(OUT / (lang + '-learning-plan-mobile.png')))
            assert not errors, errors
            reports.append({'language': lang, 'contextAndPlan': True, 'phraseSaveRollback': True,
                            'sourceSaveRollback': True, 'writingRequiresBothComprehensionChecks': True,
                            'missingSourceSupportFailsClosed': True, 'sourceSupportMigrationPreservesWork': True,
                            'writingStillRequiresOwnPreparation': True, 'originalProgressUnchanged': True,
                            'pageErrors': errors})
            context.close()
        browser.close()
    server.shutdown()
    (OUT / 'verification.json').write_text(json.dumps({'passed': True, 'languages': reports}, indent=2) + '\n', encoding='utf8')
    print('Both languages: learning plans, actual source contexts, save rollback and teach-before-writing gates passed.')


if __name__ == '__main__':
    main()
