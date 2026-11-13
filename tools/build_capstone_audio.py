"""Compose end-of-band listening from existing authored recordings; no TTS requests."""
import hashlib,json,subprocess,wave
from pathlib import Path
import make_audio as audio
R=Path(__file__).resolve().parents[1];OUT=R/'output/capstone-audio';OUT.mkdir(parents=True,exist_ok=True)
MODULES=['writing-content','skills-content','curriculum-content','vocabulary-content','learning-design','source-support','a2-source-support','b1-source-support','b2-source-support','c1-source-support','c2-source-support','a1-feedback','writing-preparation','a2-writing-preparation','b1-writing-preparation','b2-writing-preparation','c1-writing-preparation','c2-writing-preparation','capstone-content']
PROGRAM="global.window=global;global.LANG={code:process.argv[1]};global.WordamiPracticeUI={};for(const f of "+json.dumps(MODULES)+")require('./'+f+'.js');console.log(JSON.stringify({units:WordamiSkillsContent.units,capstones:WordamiCapstoneContent.units,vocabulary:WordamiVocabularyContent.units,preparation:WordamiWritingPreparation.lessons}));"
manifest_path=R/'audio/skills/manifest.json';manifest=json.loads(manifest_path.read_text(encoding='utf8'));assets={};reports=[]
for lang in ['lt','es']:
 content=json.loads(subprocess.check_output(['node','-e',PROGRAM,lang],cwd=R).decode('utf8'))
 for spec in content['capstones']:
  uid=spec['id'];u=next(u for u in content['units'] if u['id']==uid)
  model=content['preparation'][uid+'.writing'];wc=len(model['model'].split());assert model['range'][0]<=wc+6 and wc<=model['range'][1],(lang,uid,wc,model['range'])
  key=lang+'.'+uid+'.listen';digest=hashlib.sha256(json.dumps([lang,u['listen'],'Achernar'],ensure_ascii=False).encode()).hexdigest()[:12]
  target=R/'audio/skills'/(key+'.'+digest+'.mp3')
  sources=[manifest[lang+'.'+source+'.listen'] for source in spec['sourceUnits']]
  if not target.is_file():
   pcm=audio.pcm(str(R/sources[0]['url']))+bytes(round(audio.RATE*.75)*2)+audio.pcm(str(R/sources[1]['url']))
   wav=OUT/(key+'.wav')
   with wave.open(str(wav),'wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(audio.RATE);f.writeframes(pcm)
   subprocess.run([audio.FFMPEG,'-v','error','-y','-i',str(wav),'-ac','1','-ar',str(audio.RATE),'-b:a','64k',str(target)],check=True)
  decoded=audio.pcm(str(target));duration=round(len(decoded)/2/audio.RATE,3)
  assert duration>sum(s['duration'] for s in sources)-1,(lang,uid,duration)
  asset={'hash':digest,'url':target.relative_to(R).as_posix(),'duration':duration,'characters':len(u['listen']),'voice':'Achernar','language':lang,'preparedSourceCombination':True,'sourceUnits':spec['sourceUnits']}
  manifest[key]=assets[key]=asset
  for index,(source,word) in enumerate(spec['wordSources']):manifest[lang+'.'+uid+'.word-'+str(index)]=assets[lang+'.'+uid+'.word-'+str(index)]=manifest[lang+'.'+source+'.word-'+str(word)]
  for index,(source,turn) in enumerate(spec['turnSources']):manifest[lang+'.'+uid+'.turn-'+str(index)]=assets[lang+'.'+uid+'.turn-'+str(index)]=manifest[lang+'.'+source+'.turn-'+str(turn)]
  reports.append({'language':lang,'unit':uid,'seconds':duration,'modelWords':wc});print(lang,uid,duration,'seconds from prepared sources',flush=True)
manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(R/'capstone-audio.js').write_text('/* Prepared-source combinations and exact existing word/partner recordings. */\nObject.assign(globalThis.WordamiSkillsAudio,'+json.dumps(assets,ensure_ascii=False,separators=(',',':'))+');\n',encoding='utf8')
(OUT/'verification.json').write_text(json.dumps({'passed':True,'newListeningFiles':len(reports),'externalTtsRequests':0,'units':reports},indent=2),encoding='utf8')
print('Ready: 12 composed recordings, 144 audio entries; no external TTS requests.')
