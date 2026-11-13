"""Record original A1-C2 listening and partner prompts using the existing configured TTS service."""
import hashlib
import json
import subprocess
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path
import numpy as np
import make_audio as audio

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'audio' / 'skills'
MANIFEST = OUT / 'manifest.json'

def content(lang):
    source = "global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};require('./tools/course_content_loader.js');require('./interaction-practice-content.js');require('./higher-interaction-content.js');console.log(JSON.stringify({...WordamiSkillsContent,vocabulary:WordamiVocabularyContent.units,learningPlans:WordamiLearningDesign.units,sourceSupport:WordamiSourceSupport.units,readingTransfer:WordamiTransferContent.units,listeningTransfer:WordamiListeningTransferContent.units,writingPreparation:WordamiWritingPreparation.lessons,guidedInteraction:WordamiInteractionPracticeContent.units,writtenInteraction:WordamiWrittenInteractionContent.units,forms:WordamiFormContent.units,documents:WordamiDocumentContent.units,extendedReading:WordamiExtendedReadingContent.units,guidedFeedback:Object.fromEntries(WordamiA1Feedback.plans.map(id=>[id,WordamiA1Feedback.analyse(id,'').checks.map(c=>({label:c.label,example:c.example}))])),reviewCardCapacity:WordamiVocabularyContent.deck().length}));"
    return json.loads(subprocess.check_output(['node','-e',source,lang],cwd=ROOT).decode('utf8'))

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    manifest = json.loads(MANIFEST.read_text(encoding='utf8')) if MANIFEST.exists() else {}
    assets = {}
    key = None
    total_chars = 0
    for lang in ['lt','es']:
        audio.LANG = lang
        audio.GOOGLE = audio.LANGS[lang][0] + '-Chirp3-HD-'
        jobs = [];pending={};aliases={}
        available={a['hash']:a for a in manifest.values() if a.get('language')==lang and (ROOT/a['url']).is_file()}
        course = content(lang)
        for level in course.get('units', course['levels']):
            texts = [('listen', level['listen'], 'Achernar')] + [(f'turn-{i}',turn[0],'Iapetus') for i,turn in enumerate(level['turns'])] + [(f'word-{i}',word['text'],'Achernar') for i,word in enumerate(course['vocabulary'][level['id']])]
            for part,text,voice in texts:
                id = f"{lang}.{level['id']}.{part}"
                digest = hashlib.sha256(json.dumps([lang,text,voice],ensure_ascii=False).encode()).hexdigest()[:12]
                target = OUT / (id + '.' + digest + '.mp3')
                if target.exists() and manifest.get(id,{}).get('hash') == digest:
                    assets[id] = manifest[id]
                elif digest in available:
                    assets[id]=manifest[id]=available[digest]
                elif digest in pending:
                    aliases[pending[digest]].append(id)
                else:
                    jobs.append((id,text,voice,digest,target));pending[digest]=id;aliases[id]=[id]
        if jobs and key is None:
            key = audio.google_key()
        def record(job):
            id,text,voice,digest,target = job
            temporary = target.with_suffix('.recording.mp3')
            for _ in range(3):
                audio.synth(key,text,voice,str(temporary))
                pcm = audio.pcm(str(temporary))
                rms = float(np.abs(np.frombuffer(pcm,dtype=np.int16).astype(np.float32)).mean())
                if rms >= 40:
                    temporary.replace(target)
                    return id, {'hash':digest,'url':'audio/skills/'+target.name,'duration':round(len(pcm)/2/audio.RATE,3),'characters':len(text),'voice':voice,'language':lang}
            raise RuntimeError('Quiet recording: '+id)
        with ThreadPoolExecutor(max_workers=3) as pool:
            futures = [pool.submit(record,job) for job in jobs]
            for future in as_completed(futures):
                id,asset = future.result()
                for alias in aliases[id]:
                    assets[alias]=manifest[alias]=asset
                total_chars += asset['characters']
                MANIFEST.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
                print('Recorded '+id+' ('+str(asset['duration'])+' seconds)',flush=True)
    MANIFEST.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (ROOT/'skills-audio.js').write_text('globalThis.WordamiSkillsAudio='+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
    worker=ROOT/'sw.js'
    shell=worker.read_text(encoding='utf8')
    previous=next(line for line in shell.splitlines() if line.startswith("CORE.push('skills-content.js'"))
    replacement="CORE.push('skills-content.js','skills-audio.js','skills-studio.js',"+','.join(json.dumps(a['url']) for a in {a['url']:a for a in assets.values()}.values())+");"
    worker.write_text(shell.replace(previous,replacement),encoding='utf8')
    print(f"Ready: {len(assets)} audio entries, {len({a['url'] for a in assets.values()})} unique files; {total_chars} new characters.",flush=True)

if __name__ == '__main__':
    main()
