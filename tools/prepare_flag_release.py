"""Publish the header chooser without including the unfinished Spanish expansion."""
import re
import shutil
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'.release-lithuanian-art'
source=(ROOT/'index.html').read_text(encoding='utf-8')
app=(DEST/'index.html').read_text(encoding='utf-8')
assert "const APP_RELEASE='3.112';" in app
css=source[source.index('.course-flag{'):source.index('/* Main column */')]
app=app.replace('/* Main column */',css+'/* Main column */',1)
start=app.index('.top{');end=app.index('.brand{',start)
app=app[:start]+app[start:end].replace('gap:12px}','gap:12px;flex-wrap:wrap}')+app[end:]
header=source[source.index('<header class="top">'):source.index('</dialog>',source.index('<header class="top">'))+len('</dialog>')]
app=re.sub(r'<header class="top">[\s\S]*?</header>',lambda _:header,app,count=1)
app=app.replace('      <div class="setting"><span>Language</span><select class="lang-select" id="lang-select" aria-label="Language to learn"></select></div>\n      <p class="note" id="lang-note"></p>\n','',1)
pick=source[source.index('function pickLang(code)'):source.index('\nrenderLangPick();',source.index('function pickLang(code)'))]
a=app.index('function pickLang(code)');b=app.index('\nrenderLangPick();',a)
app=app[:a]+pick+app[b:]
lang=re.search(r'^const LANG_CODE=.*$',source,re.M).group()
app=re.sub(r'^const LANG_CODE=.*$',lambda _:lang,app,count=1,flags=re.M)
app=app.replace("const APP_RELEASE='3.112';","const APP_RELEASE='3.113';").replace('const APP_VERSION=184;','const APP_VERSION=185;')
app=re.sub(r"const WHATS_NEW='(?:\\.|[^'\\])*';","const WHATS_NEW='Tap the flag in the top bar to choose your course language. Each language keeps its own progress and streak.';",app,count=1)
(DEST/'index.html').write_text(app,encoding='utf-8')
worker=(DEST/'sw.js').read_text(encoding='utf-8').replace("gintaras-shell-v184","gintaras-shell-v185")
worker=worker.replace("const AMI_FILES =", "CORE.push('pics/1f1f1-1f1f9.svg','pics/1f1f2-1f1fd.svg');\nconst AMI_FILES =",1)
(DEST/'sw.js').write_text(worker,encoding='utf-8')
history=(DEST/'CHANGELOG.md').read_text(encoding='utf-8');at=history.index('\n')+1
entry='- **3.113** (2026-11-06) The current course flag opens a language chooser from the top bar, replacing the Settings selector. Switching preserves each course’s saved progress, updates direct preview links, and keeps unfinished languages behind Coming soon. Flags are cached for offline use; the chooser supports keyboard dismissal and mobile layouts.\n'
(DEST/'CHANGELOG.md').write_text(history[:at]+'\n'+entry+'\n'+history[at:].lstrip('\n'),encoding='utf-8')
shutil.copy2(ROOT/'tools/check_course_switch.py',DEST/'tools/check_course_switch.py')
(DEST/'docs/spanish').mkdir(parents=True,exist_ok=True)
print('Prepared isolated 3.113 / build 185: header language chooser only.')
