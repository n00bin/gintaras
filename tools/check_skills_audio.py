"""Audit every current course recording against its source, manifest and offline cache list."""
import hashlib,json
from pathlib import Path
import numpy as np
import make_audio as audio
from build_skills_audio import content
ROOT=Path(__file__).resolve().parents[1]
def main():
    manifest=json.loads((ROOT/'audio/skills/manifest.json').read_text(encoding='utf8'))
    worker=(ROOT/'sw.js').read_text(encoding='utf8')
    files=[];decoded={}
    for lang in ['lt','es']:
        course=content(lang)
        for unit in course.get('units',course['levels']):
            for part,text,voice in [('listen',unit['listen'],'Achernar')]+[(f'turn-{i}',t[0],'Iapetus') for i,t in enumerate(unit['turns'])]+[(f'word-{i}',w['text'],'Achernar') for i,w in enumerate(course['vocabulary'][unit['id']])]:
                id=f"{lang}.{unit['id']}.{part}"
                expected=hashlib.sha256(json.dumps([lang,text,voice],ensure_ascii=False).encode()).hexdigest()[:12]
                asset=manifest[id]
                assert asset['hash']==expected and asset['characters']==len(text),id
                assert asset['url'] in worker,id
                pcm=decoded.get(asset['url'])
                if pcm is None:
                    pcm=audio.pcm(str(ROOT/asset['url']));decoded[asset['url']]=pcm
                samples=np.frombuffer(pcm,dtype=np.int16).astype(np.float32)
                assert samples.size>2400 and float(np.abs(samples).mean())>=40,id
                assert abs(samples.size/audio.RATE-asset['duration'])<.05,id
                files.append((id,asset))
    result={'passed':True,'files':len(files),'uniqueFiles':len({a['url'] for _,a in files}),'bytes':sum((ROOT/url).stat().st_size for url in {a['url'] for _,a in files}),'listeningSeconds':round(sum(a['duration'] for id,a in files if id.endswith('.listen')),3),'allSourceHashesMatch':True,'allDecoded':True,'noQuietFiles':True,'allInOfflineCacheList':True}
    out=ROOT/'output/skills-studio';out.mkdir(parents=True,exist_ok=True)
    (out/'audio-audit.json').write_text(json.dumps(result,indent=2),encoding='utf8')
    print(json.dumps(result))
if __name__=='__main__':main()
