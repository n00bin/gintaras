"""Record versioned two-speaker dialogues with the project's existing Google voices."""
import hashlib
import json
import subprocess
import tempfile
from pathlib import Path
import numpy as np
import make_audio as audio

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'audio'/'a1'
MANIFEST=OUT/'manifest.json'

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    source="const fs=require('fs');require('./a1-dialogue-content.js');const c={};new Function('c',\"function norm(s){return s.toLowerCase().trim()}function esc(s){return s;}\"+fs.readFileSync('lang/lt.js','utf8')+';c.items=ITEMS.map(i=>i.lt);')(c);for(const d of WordamiA1DialogueContent)for(const l of d.lines)if(!c.items.includes(l[1]))throw Error('Untaught source '+l[1]);console.log(JSON.stringify(WordamiA1DialogueContent));"
    dialogues=json.loads(subprocess.check_output(['node','-e',source],cwd=ROOT).decode('utf8'))
    old=json.loads(MANIFEST.read_text(encoding='utf8')) if MANIFEST.exists() else {}
    assets={};characters=0
    with tempfile.TemporaryDirectory() as temporary:
        folder=Path(temporary);key=None
        for dialogue in dialogues:
            digest=hashlib.sha256(json.dumps([dialogue['lines'],audio.VOICES],ensure_ascii=False).encode()).hexdigest()[:10]
            name=dialogue['id']+'.'+digest+'.mp3';target=OUT/name
            previous=old.get(dialogue['id'])
            if target.exists() and previous and previous.get('hash')==digest:
                assets[dialogue['id']]=previous;continue
            if key is None:key=audio.google_key()
            samples=bytearray();segments=[];position=0
            print('Recording full dialogue '+dialogue['id'],flush=True)
            for index,(speaker,text) in enumerate(dialogue['lines']):
                take=folder/f'{index}.mp3';pcm=None
                for attempt in range(3):
                    audio.synth(key,text,audio.VOICES[speaker],str(take));characters+=len(text)
                    candidate=audio.pcm(str(take));level=float(np.abs(np.frombuffer(candidate,dtype=np.int16).astype(np.float32)).mean())
                    if level>=40:pcm=candidate;break
                if pcm is None:raise RuntimeError('Quiet recording: '+dialogue['id']+' turn '+str(index))
                length=len(pcm)/2/audio.RATE
                segments.append({'speaker':speaker,'text':text,'start':round(position,3),'duration':round(length,3)})
                samples.extend(pcm);samples.extend(b'\x00\x00'*int(.3*audio.RATE));position+=length+.3
            raw=folder/'dialogue.pcm';raw.write_bytes(samples)
            subprocess.run([audio.FFMPEG,'-v','error','-y','-f','s16le','-ar',str(audio.RATE),'-ac','1','-i',str(raw),'-b:a','64k',str(target)],check=True)
            assets[dialogue['id']]={'hash':digest,'url':'audio/a1/'+name,'duration':round(position,3),'segments':segments}
            old[dialogue['id']]=assets[dialogue['id']];MANIFEST.write_text(json.dumps(old,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
    (ROOT/'a1-dialogue-assets.js').write_text('globalThis.WordamiA1DialogueAssets='+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+';\n',encoding='utf8')
    print('Ready: '+str(len(assets))+' full dialogues; synthesized '+str(characters)+' characters.',flush=True)

if __name__=='__main__':main()
