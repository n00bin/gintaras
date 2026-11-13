"""Generate or verify guided interaction replies using the existing TTS setup."""
import argparse
import hashlib
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import numpy as np
import make_audio as audio

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'audio/interaction-practice'
MANIFEST=OUT/'manifest.json'
def voice_for_id(uid):
    if '.B1-housing.' in uid:return 'Achernar' if '.question-' in uid else 'Iapetus'
    return 'Iapetus' if '.question-' in uid else 'Achernar'


def content(lang):
    program="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};require('./writing-content.js');require('./skills-content.js');require('./curriculum-content.js');require('./interaction-practice-content.js');require('./higher-interaction-content.js');console.log(JSON.stringify(WordamiInteractionPracticeContent));"
    return json.loads(subprocess.check_output(['node','-e',program,lang],cwd=ROOT).decode('utf8'))


def expected():
    for lang in ['lt','es']:
        for uid,spec in content(lang)['units'].items():
            recordings=list(spec['replies'].items())+[(f'question-{q[0]}',q[1]) for q in spec['questions']]
            for branch,text in recordings:
                digest=hashlib.sha256(json.dumps([lang,text,voice_for_id(f'{lang}.{uid}.{branch}')],ensure_ascii=False).encode()).hexdigest()[:12]
                yield f"{lang}.{uid}.{branch}",lang,text,digest


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--check',action='store_true');args=parser.parse_args()
    if not args.check:
        from audit_interaction_practice import main as audit_content
        audit_content(check_audio=False)
    old=json.loads(MANIFEST.read_text(encoding='utf8')) if MANIFEST.exists() else {}
    assets={};jobs=[]
    for uid,lang,text,digest in expected():
        asset=old.get(uid)
        if asset and asset['hash']==digest and (ROOT/asset['url']).is_file():assets[uid]=asset
        else:jobs.append((uid,lang,text,digest))
    if args.check:
        assert not jobs,'Missing or changed interaction recordings: '+str(len(jobs))
        worker=(ROOT/'sw.js').read_text(encoding='utf8')
        for uid,lang,text,digest in expected():
            asset=assets[uid];pcm=audio.pcm(str(ROOT/asset['url']));samples=np.frombuffer(pcm,dtype=np.int16).astype(np.float32)
            assert asset['characters']==len(text) and asset['language']==lang and asset['voice']==voice_for_id(uid)
            assert samples.size>audio.RATE*.4 and float(np.abs(samples).mean())>=40,uid
            assert abs(samples.size/audio.RATE-asset['duration'])<.05,uid
            assert asset['url'] in worker,uid
        result={'passed':True,'recordings':len(assets),'seconds':round(sum(a['duration'] for a in assets.values()),3),'bytes':sum((ROOT/a['url']).stat().st_size for a in assets.values()),'allDecoded':True,'sourceHashesMatch':True,'allInOfflineCache':True}
        target=ROOT/'output/interaction-practice';target.mkdir(parents=True,exist_ok=True)
        (target/'audio-audit.json').write_text(json.dumps(result,indent=2)+'\n',encoding='utf8');print(json.dumps(result));return
    OUT.mkdir(parents=True,exist_ok=True)
    if jobs:
        key=audio.google_key()
        # The service helper's language is process-global, so finish each language
        # before switching it; parallel jobs within one language use the same voice.
        for lang in ['lt','es']:
            audio.LANG=lang;audio.GOOGLE=audio.LANGS[lang][0]+'-Chirp3-HD-'
            def record(job):
                uid,language,text,digest=job;target=OUT/(uid+'.'+digest+'.mp3');temporary=target.with_suffix('.recording.mp3')
                try:
                    audio.synth(key,text,voice_for_id(uid),str(temporary))
                except (Exception,SystemExit) as error:
                    raise RuntimeError('Recording service failed for '+uid+' ('+type(error).__name__+')') from None
                samples=np.frombuffer(audio.pcm(str(temporary)),dtype=np.int16).astype(np.float32)
                if samples.size<audio.RATE*.4 or float(np.abs(samples).mean())<40:raise RuntimeError('Quiet recording: '+uid)
                temporary.replace(target)
                return uid,{'hash':digest,'url':'audio/interaction-practice/'+target.name,'duration':round(samples.size/audio.RATE,3),'characters':len(text),'language':language,'voice':voice_for_id(uid)}
            with ThreadPoolExecutor(max_workers=3) as pool:
                futures=[pool.submit(record,job) for job in jobs if job[1]==lang]
                for future in as_completed(futures):
                    uid,asset=future.result();assets[uid]=asset
                    MANIFEST.write_text(json.dumps({**old,**assets},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
                    print('Recorded '+uid+' ('+str(asset['duration'])+' seconds)',flush=True)
    MANIFEST.write_text(json.dumps(assets,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (ROOT/'interaction-practice-audio.js').write_text('globalThis.WordamiInteractionPracticeAudio='+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
    worker=ROOT/'sw.js';text=worker.read_text(encoding='utf8')
    line="CORE.push('interaction-practice-audio.js',"+','.join(json.dumps(a['url']) for a in assets.values())+');'
    previous=next((s for s in text.splitlines() if s.startswith("CORE.push('interaction-practice-audio.js'")),None)
    text=text.replace(previous,line) if previous else text.replace("self.addEventListener('install'",line+"\nself.addEventListener('install'",1)
    worker.write_text(text,encoding='utf8')
    print(f'Ready: {len(assets)} complete recordings; {sum(len(j[2]) for j in jobs)} new source characters.')


if __name__=='__main__':main()
