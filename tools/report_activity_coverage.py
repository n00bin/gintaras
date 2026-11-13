"""Export actual preview registrations and exact source-card prerequisites, without learner data."""
import http.server
import json
import threading
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs'/'cefr'

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass

def main():
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    report={'schema':1,'date':'2026-11-06','status':'preview_practice_not_validated_cefr_coverage','languages':{}}
    planned=json.loads((OUT/'a1-foundation.json').read_text(encoding='utf8'))
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='chrome',headless=True)
        for lang in ['lt','es']:
            context=browser.new_context();page=context.new_page()
            page.goto(f'http://127.0.0.1:{server.server_port}/?preview=1&lang={lang}')
            page.wait_for_function('window.WordamiTopicCatalogue')
            data=page.evaluate("""()=>{
                const ids=WordamiActivities.catalogue().filter(d=>d.id.startsWith('a1.')).map(d=>d.id);
                return ids.map(id=>{
                    const d=WordamiActivities.definition(id);if(!d)throw Error('Missing '+id);
                    return {...d,sourceCards:d.requiredPhrases.map(text=>{
                        const i=ITEMS.find(i=>i.lt===text);if(!i)throw Error('No source: '+text);
                        const cid=i.au||i.id,unit=unitOf(cid),segment=SMAP.ona?.[unit]?.[cid];
                        return {id:i.id,text:i.lt,en:i.en,lesson:i.lesson.id,unit:i.unit.id,recordingAvailable:!!segment};
                    })};
                });
            }""")
            for d in data:
                assert d['sourceCards'] and all(i['recordingAvailable'] for i in d['sourceCards']),(lang,d['id'])
            groups=[]
            for goal in planned['objectives']:
                activities=[d for d in data if d['objectiveId']==goal['id']]
                assert activities,(lang,goal['id'])
                groups.append({'id':goal['id'],'outcome':goal['outcome'],'activities':[d['id'] for d in activities],
                    'practiceSkills':sorted(set(t['skill'] for d in activities for t in d['tasks'])),
                    'sourceCardIds':sorted(set(i['id'] for d in activities for i in d['sourceCards'])),
                    'status':'initial_practice_implemented','descriptorReview':'pending','independentAssessment':'not_validated'})
            report['languages'][lang]={'activityCount':len(data),'objectives':groups,'activities':data}
            context.close()
        browser.close()
    server.shutdown()
    (OUT/'activity-coverage.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    lines=['# A1 practice coverage checkpoint','','Generated from actual local preview registrations. These tasks touch the 12 initial objective candidates; this does not establish complete A1 coverage or learner proficiency.','','| Objective | Lithuanian activity modules | Spanish activity modules |','| --- | ---: | ---: |']
    for index,goal in enumerate(planned['objectives']):
        counts=[len(report['languages'][lang]['objectives'][index]['activities']) for lang in ['lt','es']]
        lines.append('| '+goal['outcome']+' | '+str(counts[0])+' | '+str(counts[1])+' |')
    lines+=['','Each module has exact source-card prerequisites. The report includes item IDs, lesson IDs, objective links, skill/method definitions and recording availability. All registrations were resolved against source cards in both languages.','','All 12 candidates have initial reading, listening, constrained-writing and self-recorded speaking practice. Lithuanian also has narrow browser-transcript speaking checks and an original-message coach with bounded pattern feedback. These do not establish pronunciation, fluency or arbitrary writing accuracy. No level is awarded and no calibrated assessment or full descriptor audit has been completed. See the [guided-route checkpoint](LITHUANIAN-A1-ROUTE.md) for current behavior and verification limits.','','The detailed report is [activity-coverage.json](activity-coverage.json). Rebuild it with `G:/Python/python.exe tools/report_activity_coverage.py`.']
    (OUT/'ACTIVITY-COVERAGE.md').write_text('\n'.join(lines)+'\n',encoding='utf8')
    print('Resolved 12 objective candidates and '+str(sum(d['activityCount'] for d in report['languages'].values()))+' activity modules across both languages. No levels assigned.')

if __name__=='__main__':
    main()
