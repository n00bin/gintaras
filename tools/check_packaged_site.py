"""Smoke-test the actual static release candidate, with a fresh browser per language."""
import argparse
import hashlib
import http.server
import json
import subprocess
import sys
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from package_site import ROOT, inventory
from curriculum_fixtures import FOUNDATIONS_SEED


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--candidate',default='output/release-candidate-20261108-a2-listening');args=parser.parse_args()
    candidate = ROOT / args.candidate
    files = inventory()
    for path in files:
        assert hashlib.sha256((ROOT/path).read_bytes()).digest() == hashlib.sha256((candidate/path).read_bytes()).digest(), str(path)
    assert not any((candidate / name).exists() for name in ['output', 'tools', 'docs', '.release-lithuanian-art', '.env.imagegen.local'])
    gate = subprocess.run([sys.executable, 'tools/audit_curriculum_release.py', '--gate'], cwd=ROOT, capture_output=True)
    assert gate.returncode == 1 and b'NOT READY' in gate.stdout
    server = http.server.ThreadingHTTPServer(('127.0.0.1',0), partial(Quiet,directory=str(candidate)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    reports = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context = browser.new_context(service_workers='block')
            page = context.new_page(); errors = []; missing = []
            page.on('pageerror', lambda error: errors.append(str(error)))
            page.on('response', lambda response: missing.append(response.url) if response.status >= 400 and response.url.startswith('http://127.0.0.1:') else None)
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills-A1')
            page.wait_for_function('window.WordamiSkillsStudio && window.WordamiSourceSupport && window.WordamiLearningDesign')
            page.locator('#splash').wait_for(state='detached')
            assert page.evaluate('LANG.code') == lang
            assert page.evaluate('Object.keys(WordamiLearningDesign.units).length') == 30
            assert page.evaluate('Object.keys(WordamiSourceSupport.units).length') == 30
            assert page.evaluate('!!window.WordamiTransferChecks && Object.keys(WordamiTransferContent.units).length===24')
            assert page.evaluate('!!window.WordamiListeningTransferChecks && Object.keys(WordamiListeningTransferContent.units).length===24 && Object.keys(WordamiListeningTransferAudio).length===96')
            assert page.evaluate('!!window.WordamiA1Feedback && WordamiA1Feedback.plans.length===10')
            assert page.evaluate('!!window.WordamiWritingPreparation && Object.keys(WordamiWritingPreparation.lessons).length===42')
            assert page.evaluate("!!WordamiWritingPreparation.get('A2-work.writing') && WordamiSourceSupport.units['A2-work'].every(e=>e.context)")
            assert page.evaluate('!!window.WordamiInteractionPractice && Object.keys(WordamiInteractionPracticeContent.units).length===24 && Object.keys(WordamiInteractionPracticeAudio).length===192')
            assert page.evaluate('!!window.WordamiForms && Object.keys(WordamiFormContent.units).length===3 && Object.values(WordamiFormContent.units).every(u=>u.variants.length===2)')
            assert page.evaluate('!!window.WordamiDocuments && Object.keys(WordamiDocumentContent.units).length===3')
            assert page.evaluate('!!window.WordamiExtendedReading && Object.keys(WordamiExtendedReadingContent.units).length===4')
            assert not page.evaluate('WordamiSkillsStudio.isOpen("A1")')
            page.evaluate(FOUNDATIONS_SEED);page.evaluate('WordamiSkillsStudio.openUnit("A1")')
            assert page.locator('#skills-studio').get_by_role('heading',name='Required guided exchange',exact=True).count()==1
            assert page.locator('#skills-studio').get_by_text('Your learning plan', exact=True).count() == 1
            assert not errors and not missing, (errors,missing)
            reports.append({'language':lang,'previewWorks':True,'pageErrors':errors,'missingLocalRequests':missing})
            context.close()
        page = browser.new_page()
        page.goto(f'http://127.0.0.1:{server.server_port}/?preview=0&lang=lt#skills')
        page.wait_for_function('typeof ITEMS!=="undefined"')
        assert page.evaluate('ITEMS.length') == 975
        assert page.locator('#skills-studio').count() == 0
        assert page.evaluate('WordamiActivities.catalogue().length') == 6
        assert page.evaluate("['u1','u21','u3'].every(id=>WordamiUnitSkills.entries(id).length===1)")
        browser.close()
    server.shutdown()
    result={'passed':True,'candidate':str(candidate.relative_to(ROOT)),'filesMatchSource':len(files),'fullCefrGateBlocksRelease':True,'publicLithuanianPreserved':True,'languages':reports}
    (ROOT/'output/learning-structure/package-verification.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8')
    print(f'Packaged candidate matches all {len(files)} public files; both previews work; public Lithuanian is preserved; incomplete CEFR release is blocked.')


if __name__ == '__main__':
    main()
