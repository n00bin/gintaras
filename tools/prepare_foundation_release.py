"""Prepare only the first-three-unit release over the clean production worktree."""
from pathlib import Path
import shutil

ROOT=Path(__file__).resolve().parents[1]
DEST=ROOT/'.release-lithuanian-art'
index=(DEST/'index.html').read_text(encoding='utf8')
assert "const APP_VERSION=185;" in index, 'Expected production build 185'

core=(ROOT/'activity-core.js').read_text(encoding='utf8').replace('if(!LANG_PREVIEW)return;', "if(LANG.code!=='lt')return;")
(DEST/'foundation-evidence.js').write_text(core,encoding='utf8')
ui=(ROOT/'activities.js').read_text(encoding='utf8')
# Keep the shared modal, playback, and recording UI; exclude unrelated cafe activities.
ui='\n'.join(line for line in ui.splitlines() if not line.startswith('core.define(') and not line.startswith("if(!lt)core.define("))
start=ui.index(" const actions=n('div',null,'a1-actions');")
end=ui.index(' if(extraTopics.length)',start)
ui=ui[:start]+ui[end:]
start=ui.index('function start(fresh)')
end=ui.index('function playRecorded(text)',start)
ui=ui[:start]+ui[end:]
start=ui.index('function writing(fresh=false)')
end=ui.index('function open()',start)
ui=ui[:start]+ui[end:]
start=ui.index("openActivity(id){")
end=ui.index('const topic=extraTopics.find',start)
ui=ui[:start]+'openActivity(id){'+ui[end:]
ui=ui.replace("if(!core||!['lt','es'].includes(LANG.code))return;", "if(!core||LANG.code!=='lt')return;")
(DEST/'foundation-ui.js').write_text(ui,encoding='utf8')
shutil.copyfile(ROOT/'topic-practice.js',DEST/'foundation-practice.js')
placement=(ROOT/'a1-course.js').read_text(encoding='utf8')
placement=placement.replace("const entries=[{activityId:'a1.cafe-understanding',title:'Understand a café order'},{activityId:'a1.cafe-writing',title:'Write your café requests'},...ui.topics()];",'const entries=ui.topics();')
assert 'cafe-understanding' not in placement
(DEST/'foundation-path.js').write_text(placement,encoding='utf8')
index=index.replace("const APP_RELEASE='3.113';", "const APP_RELEASE='3.114';").replace('const APP_VERSION=185;', 'const APP_VERSION=186;')
start=index.index('const WHATS_NEW=');end=index.index('\n',start)
index=index[:start]+"const WHATS_NEW='Units 1–3 now have practical reading, listening, writing and speaking activities using the language you have learned, alongside the updated illustrations.';"+index[end:]
old=next(line for line in index.splitlines() if line.startswith('function playMine()'))
new=next(line for line in (ROOT/'index.html').read_text(encoding='utf8').splitlines() if line.startswith('async function playMine()'))
index=index.replace(old,new)
index=index.replace("b.className='lesson-row'+(c>0?' did':'');", "b.className='lesson-row'+(c>0?' did':'');b.dataset.lessonId=l.id;")
scripts=['foundation-evidence.js','foundation-ui.js','foundation-content.js','foundation-practice.js','foundation-path.js']
index=index.replace('<script src="config.js"></script>', '\n'.join('<script src="'+s+'"></script>' for s in scripts)+'\n<script src="config.js"></script>')
(DEST/'index.html').write_text(index,encoding='utf8')
sw=(DEST/'sw.js').read_text(encoding='utf8').replace("gintaras-shell-v185", "gintaras-shell-v186")
sw=sw.replace("const CORE = [", 'const CORE = ['+', '.join(repr(s) for s in scripts)+', ')
(DEST/'sw.js').write_text(sw,encoding='utf8')
tools=DEST/'tools';tools.mkdir(exist_ok=True)
shutil.copyfile(ROOT/'tools/audit_first_three_release.js', tools/'audit_first_three_release.js')
pack=(ROOT/'tools/package_site.py').read_text(encoding='utf8').replace("    assert 'learning-design.js' in names and 'source-support.js' in names\n",'')
(tools/'package_site.py').write_text(pack,encoding='utf8')
workflow=DEST/'.github/workflows/deploy.yml'
text=workflow.read_text(encoding='utf8');start=text.index('      - name: Unpack site');end=text.index('      - uses: actions/configure-pages',start)
text=text[:start]+'''      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - name: Check first three Lithuanian units
        run: node tools/audit_first_three_release.js
      - name: Package public site
        run: python tools/package_site.py --output site
'''+text[end:]
workflow.write_text(text,encoding='utf8')
print('Prepared build 186 over production build 185; no course data or cloud changes.')
