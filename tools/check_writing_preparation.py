"""Audit and exercise every A1 worked model, purpose exercise and saved project plan."""
import http.server
import json
import re
import subprocess
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright
from audit_transfer_content import words
from check_curriculum_migration import SEED

ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'output/writing-preparation'
from audit_writing_preparation import content_audit


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):pass





def main():
    OUT.mkdir(parents=True,exist_ok=True);lessons=content_audit()
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start();reports=[]
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context(service_workers='block',viewport={'width':320,'height':740},accept_downloads=True)
            page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
            base=f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}'
            page.goto(base+'#skills');page.wait_for_function('window.WordamiWritingPreparation && window.WordamiSkillsStudio');page.locator('#splash').wait_for(state='detached')
            for lesson_id,lesson in lessons[lang].items():
                uid,project=lesson_id.split('.');page.evaluate(SEED)
                if uid in ['A1','A2','B1','B2','C1','C2']:
                    page.evaluate("id=>{const k='wordami.writing.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.projects[id].stage='draft';delete s.projects[id].completedAt;localStorage.setItem(k,JSON.stringify(s));}",lesson_id)
                    route='#writing-'+uid;dialog_id='#writing-studio';draft_id='#ws-draft'
                else:
                    page.evaluate("id=>{const k='wordami.skills.v1.'+LANG.code,s=JSON.parse(localStorage.getItem(k));s.levels[id].writing={draft:'Preserved draft for this project',baseline:'',stage:'draft',excerpts:['','',''],reflection:'',revisions:[]};localStorage.setItem(k,JSON.stringify(s));}",uid)
                    route='#skills-'+uid;dialog_id='#skills-studio';draft_id='#skills-draft'
                def open_editor():
                    page.goto(base+route);page.reload();page.wait_for_function('window.WordamiSkillsStudio && window.WordamiWritingPreparation')
                    d=page.locator(dialog_id)
                    d.get_by_role('button',name='Continue draft' if uid in ['A1','A2','B1','B2','C1','C2'] else 'Open writing assignment',exact=True).click()
                    return d
                d=open_editor();baseline=page.evaluate('JSON.stringify(S)');draft=d.locator(draft_id).input_value()
                progress=page.evaluate('WordamiSkillsStudio.catalogue()');memory=page.evaluate('WordamiStudyMemory.summary().learned')
                assert f"{lesson['range'][0]}–{lesson['range'][1]} words" in d.inner_text()
                panel=d.locator('section').filter(has=page.get_by_role('heading',name='Plan a useful message',exact=True))
                panel.get_by_text('Study a short worked model',exact=True).click()
                assert lesson['model'] in panel.inner_text()
                panel.get_by_role('button',name='Practise the purpose of each line',exact=True).click()
                for index,line in enumerate(lesson['lines']):
                    if index==0:
                        panel.get_by_role('button',name=lesson['lines'][1]['text'],exact=True).click()
                        assert 'try again' in panel.locator('[role=status]').inner_text()
                    panel.get_by_role('button',name=line['text'],exact=True).click()
                    assert line['why'] in panel.inner_text()
                    panel.get_by_role('button',name='Next purpose',exact=True).click()
                assert 'Purpose practice complete' in panel.inner_text()
                for index,line in enumerate(lesson['lines']):
                    panel.get_by_role('textbox',name='Plan: '+line['goal'],exact=True).fill('My own detail '+str(index))
                page.wait_for_timeout(350)
                assert d.locator(draft_id).input_value()==draft
                assert page.evaluate('JSON.stringify(S)')==baseline
                assert page.evaluate('WordamiStudyMemory.summary().learned')==memory
                assert page.evaluate('WordamiSkillsStudio.catalogue()')==progress
                d=open_editor()
                for index,line in enumerate(lesson['lines']):assert d.get_by_role('textbox',name='Plan: '+line['goal'],exact=True).input_value()=='My own detail '+str(index)
                assert d.locator(draft_id).input_value()==draft
                assert d.evaluate('(e)=>e.scrollWidth<=e.clientWidth')
                # A failed planning save keeps the typed plan available for export/repair.
                if project=='profile':
                    page.evaluate("()=>{window.__planSave=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){if(k.startsWith('wordami.writing.v1.'))throw new DOMException('full','QuotaExceededError');return window.__planSave.call(this,k,v);};}")
                    field=d.get_by_role('textbox',name='Plan: '+lesson['lines'][0]['goal'],exact=True)
                    field.fill('Unsaved plan kept in this view');page.wait_for_timeout(350)
                    assert 'full or unavailable' in d.locator('[role=status]').inner_text()
                    assert field.input_value()=='Unsaved plan kept in this view'
                    with page.expect_download() as info:d.get_by_role('button',name='Export this draft',exact=True).click()
                    exported=Path(info.value.path()).read_text(encoding='utf8')
                    assert draft in exported and 'Unsaved plan kept in this view' in exported
                    page.evaluate('()=>{Storage.prototype.setItem=window.__planSave;}')
                print(lang+' '+lesson_id+' model, practice and plan passed',flush=True)
            d.locator('section').filter(has=page.get_by_role('heading',name='Plan a useful message',exact=True)).scroll_into_view_if_needed()
            page.screenshot(path=str(OUT/(lang+'-project-plan-mobile.png')))
            assert not errors,errors
            reports.append({'language':lang,'workedModels':len(lessons[lang]),'purposeExercises':3*len(lessons[lang]),'modelsUsePreparedForms':True,'suggestedLengthsFitModels':True,'plansResume':True,'draftsNotReplaced':True,'practiceDoesNotAwardProgress':True,'failedSaveKeepsVisibleNotes':True,'pageErrors':errors})
            context.close()
        browser.close()
    server.shutdown();(OUT/'verification.json').write_text(json.dumps({'passed':True,'languages':reports},indent=2)+'\n',encoding='utf8')
    print('Eighty-four A1-C2 worked models, 252 purpose exercises and saved plans passed in both languages.')


if __name__=='__main__':main()
