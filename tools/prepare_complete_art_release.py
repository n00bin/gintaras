"""Prepare the complete reviewed art on the isolated build-188 production checkout."""
import hashlib,json,re,shutil
from pathlib import Path
R=Path(__file__).resolve().parents[1];D=R/'.release-lithuanian-art'
def read(p):return p.read_text(encoding='utf8')
def write(p,s):p.parent.mkdir(parents=True,exist_ok=True);p.write_text(s,encoding='utf8')
def copy(n):
 p=D/n;p.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(R/n,p)
assert (D/'.git').is_file()
base=read(D/'lang/lt.js');local=read(R/'lang/lt.js')
pat=r'// BEGIN APPROVED PICTURE ASSETS\n.*?// END APPROVED PICTURE ASSETS'
block=re.search(pat,local,re.S).group()
mapping=json.loads(re.search(r'const PICTURE_ASSETS=(\{.*?\});',block,re.S).group(1))
before=json.loads(re.search(r'const PICTURE_ASSETS=(\{.*?\});',base,re.S).group(1))
approved=set(json.loads(read(R/'docs/art-direction/visual-review.json'))['approved_ids'])
assert len(mapping)==488 and len(before)==297
assert all(mapping.get(w)==a for w,a in before.items())
assert {a.split('/')[-1] for a in mapping.values()}<=approved
updated,n=re.subn(pat,lambda _:block,base,count=1,flags=re.S);assert n==1
assert re.sub(pat,'',updated,flags=re.S)==re.sub(pat,'',base,flags=re.S)
assert 'const PICTURE_MIGRATION_COMPLETE=true;' in updated
write(D/'lang/lt.js',updated)
new=sorted({a for w,a in mapping.items() if before.get(w)!=a});assert len(new)==191
for a in new:
 key=a.split('/')[-1];record=json.loads(read(R/'docs/art-direction/lt-records'/f'{key}.json'))
 assert record['status']=='exported'
 copy('pics/'+a+'.webp');copy('docs/art-direction/lt-records/'+key+'.json')
app=read(D/'index.html');assert "const APP_RELEASE='3.116';" in app and 'const APP_VERSION=188;' in app
app=app.replace("const APP_RELEASE='3.116';","const APP_RELEASE='3.119';").replace('const APP_VERSION=188;','const APP_VERSION=191;')
app,n=re.subn(r"const WHATS_NEW='(?:\\.|[^'\\])*';","const WHATS_NEW='The new illustration style now covers every Lithuanian course picture and conversation character. Required unit skill lessons and your saved progress continue as before.';",app,count=1);assert n==1
write(D/'index.html',app)
worker=read(D/'sw.js');assert "gintaras-shell-v188" in worker
write(D/'sw.js',worker.replace('gintaras-shell-v188','gintaras-shell-v191'))
history=read(D/'CHANGELOG.md');at=history.index('\n')+1
entry='- **3.119** (2026-11-09) Completed all 488 Lithuanian course picture mappings in the approved illustration style, with all 20 conversation portraits and the default learner. Existing number/day text tiles, vocabulary, recordings, progress IDs and custom avatars remain. Unit test-out keeps source phrases taught; recorded audio waits for the full file before seeking so cold-cache listening works reliably.\n'
write(D/'CHANGELOG.md',history[:at]+'\n'+entry+'\n'+history[at:].lstrip('\n'))
for name in ['lithuanian-art-jobs.json','lithuanian-art-pending.json','lithuanian-art-status.json','visual-review.json','art-job-overrides.json']:
 copy('docs/art-direction/'+name)
copy('tools/check_lithuanian_art.py')
write(D/'docs/art-direction/MIGRATION-NOTES.md','# Lithuanian artwork complete\n\nRelease 3.119/build 191 includes all 488 reviewed course picture mappings, all 20 conversation portraits and the default learner portrait. Every export was reviewed at 112px and 56px on light and dark backgrounds. Exact prompts and references are in lt-records/; preserved masters remain local.\n\nCourse vocabulary, IDs, recordings, customized avatars and saved progress are preserved. This scoped production release retains the existing required Units 1–3 skills. The broader curriculum preview is separate and is not published by this image release.\n')
paths=['lang/lt.js','index.html','sw.js','CHANGELOG.md','foundation-ui.js','foundation-unit-skills.js','tools/check_lithuanian_art.py','docs/art-direction/MIGRATION-NOTES.md']
paths+=['docs/art-direction/'+n for n in ['lithuanian-art-jobs.json','lithuanian-art-pending.json','lithuanian-art-status.json','visual-review.json','art-job-overrides.json']]
paths += [p for a in new for p in ['pics/'+a+'.webp','docs/art-direction/lt-records/'+a.split('/')[-1]+'.json']]
write(R/'output/complete-art-release-paths.json',json.dumps(paths,indent=2)+'\n')
print(json.dumps({'release':'3.119','build':191,'newAssets':len(new),'total':len(mapping),'stageManifest':'output/complete-art-release-paths.json'}))
