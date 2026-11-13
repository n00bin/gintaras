"""Synthetic completed-course fixtures verify migration without erasing later work."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from curriculum_fixtures import FOUNDATION_BODY, APPLICATIONS_BODY

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'output' / 'learning-structure'


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


SEED = """()=>{
 const writing={schema:1,lessons:{},projects:{}},skills={schema:1,levels:{}},grammar={schema:1,lessons:{}},at='2026-11-07T10:00:00.000Z';
 for(const l of WordamiWritingContent.levels){
  writing.lessons[l.id]={signature:JSON.stringify([WordamiWritingContent.version,l.phrases,l.model,l.questions]),learned:Array(8).fill(true),reading:l.questions.map(()=>true),ready:true};
  for(const p of l.projects)writing.projects[l.id+'.'+p[0]]={draft:'Synthetic saved draft '+l.id,baseline:'Synthetic initial draft',stage:'done',completedAt:at,excerpts:Array(4).fill('Synthetic'),reflection:'Synthetic test reflection',revisions:[]};
 }
 for(const l of WordamiGrammarContent.lessons)grammar.lessons[l.id]={signature:JSON.stringify([WordamiGrammarContent.version,l]),studied:true,step:6,completedAt:at};
 for(const l of WordamiSkillsContent.units){
  let h=2166136261;for(const c of JSON.stringify([WordamiSkillsContent.version,l]))h=Math.imul(h^c.charCodeAt(0),16777619);
  const support=WordamiSourceSupport.units[l.id];
  skills.levels[l.id]={signature:(h>>>0).toString(16),learned:Array(8).fill(true),vocabularySignature:JSON.stringify([WordamiVocabularyContent.version,WordamiVocabularyContent.units[l.id]]),vocabulary:Array(8).fill(true),sources:true,
   sourceSupportSignature:support?JSON.stringify([WordamiSourceSupport.version,support]):null,
   ...(['B1','B2','C1','C2'].includes(l.band||l.id)&&support?{sourcePractice:{signature:JSON.stringify([WordamiSourceSupport.version,support]),learned:support.map(()=>true)}}:{}),
   checks:{reading:{passed:true},listening:{passed:true}},spoken:Object.fromEntries(['production','interaction','mediation'].map(k=>[k,{completedAt:at,turns:[]}]))};
  if(l.project)skills.levels[l.id].writing={draft:'Synthetic saved later assignment '+l.id,completedAt:at};
 }
 localStorage.setItem('wordami.writing.v1.'+LANG.code,JSON.stringify(writing));
 localStorage.setItem('wordami.grammar.v1.'+LANG.code,JSON.stringify(grammar));
 localStorage.setItem('wordami.skills.v1.'+LANG.code,JSON.stringify(skills));
}"""
SEED=SEED.replace('()=>{','()=>{'+FOUNDATION_BODY+APPLICATIONS_BODY,1)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    reports = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        for lang in ['lt', 'es']:
            context = browser.new_context(service_workers='block'); page = context.new_page()
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}#skills')
            page.wait_for_function('window.WordamiSourceSupport && window.WordamiSkillsStudio')
            page.locator('#splash').wait_for(state='detached')
            page.evaluate(SEED); page.reload(); page.wait_for_function('window.WordamiSkillsStudio')
            assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete && u.open)')
            # A learner who finished the original 24 workshops keeps that work;
            # the newly inserted application is required before the next band.
            old_draft=page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels['C2-register'].writing.draft")
            page.evaluate("()=>{const k='wordami.skills.v1.'+LANG.code,d=JSON.parse(localStorage.getItem(k));for(const id of WordamiSkillsContent.capstones)delete d.levels[id];localStorage.setItem(k,JSON.stringify(d));}")
            page.reload();page.wait_for_function('window.WordamiCoursePath')
            cap_rows=page.evaluate('WordamiSkillsStudio.catalogue()')
            assert all(r['complete'] for r in cap_rows if not r['id'].endswith('-capstone'))
            first_cap=next(i for i,r in enumerate(cap_rows) if r['id']=='A1-capstone')
            assert cap_rows[first_cap]['open'] and not cap_rows[first_cap]['complete']
            assert all(not r['open'] for r in cap_rows[first_cap+1:])
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels['C2-register'].writing.draft")==old_draft
            page.evaluate(SEED);page.reload();page.wait_for_function('window.WordamiCoursePath')
            saved_writing = page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)")
            saved_later = page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels['C2-register'].writing.draft")
            page.evaluate("()=>{const key='wordami.skills.v1.'+LANG.code,data=JSON.parse(localStorage.getItem(key));delete data.levels.A1.sourceSupportSignature;localStorage.setItem(key,JSON.stringify(data));}")
            page.reload(); page.wait_for_function('window.WordamiSkillsStudio')
            rows = page.evaluate('WordamiSkillsStudio.catalogue()')
            assert rows[0]['open'] and not rows[0]['complete']
            assert all(not row['open'] for row in rows[1:]), rows
            assert page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)") == saved_writing
            assert page.evaluate("JSON.parse(localStorage.getItem('wordami.skills.v1.'+LANG.code)).levels['C2-register'].writing.draft") == saved_later
            page.evaluate("location.hash='skills-A1'"); d = page.locator('#skills-studio')
            d.get_by_role('button', name='Learn the language', exact=True).click()
            assert d.get_by_role('button', name='Practise this meaning', exact=True).count() == 0
            d.get_by_role('checkbox').check()
            d.get_by_role('button', name='Finish source preparation', exact=True).click()
            assert page.evaluate('WordamiSkillsStudio.catalogue().every(u=>u.complete && u.open)')
            assert page.evaluate("localStorage.getItem('wordami.writing.v1.'+LANG.code)") == saved_writing
            reports.append({'language':lang,'syntheticFixture':True,'allLaterUnitsRespectChangedEarlierPrerequisite':True,'draftsAndCompletedTasksPreserved':True,'onlyNewSourcePreparationRequired':True})
            context.close()
        browser.close()
    server.shutdown()
    (OUT / 'migration-verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Both languages: changed early prerequisites block every later unit; saved work returns after only the new preparation.')


if __name__ == '__main__':
    main()
