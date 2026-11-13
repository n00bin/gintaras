"""Prepare the reviewed Lithuanian subset on top of an isolated current-main checkout."""
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / '.release-lithuanian-art'
assert (DEST / '.git').is_file(), 'Create the isolated release worktree first'

def read(path):
    return path.read_text(encoding='utf-8')

def write(path, text):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding='utf-8')

def copy(relative):
    target = DEST / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / relative, target)

local = read(ROOT / 'lang/lt.js')
base = read(DEST / 'lang/lt.js')
# Preserve current-main's legacy picture settings and course content.
for pattern in [r'const NO_PIC=new Set\(\[.*?\]\);', r'const ART_UNITS=\[.*?\];', r'const ART=new Set\(\[.*?\]\);']:
    original = re.search(pattern, base, re.S).group()
    local, count = re.subn(pattern, lambda _: original, local, count=1, flags=re.S)
    assert count == 1
write(DEST / 'lang/lt.js', local)

mapping = json.loads(re.search(r'const PICTURE_ASSETS=(\{.*?\});', local, re.S).group(1))
portraits = json.loads(re.search(r'const CAST_PICTURES=(\{.*?\});', local, re.S).group(1))
assets = set(mapping.values()) | set(portraits.values()) | {'art-v2/portrait-learner'}
review = json.loads(read(ROOT / 'docs/art-direction/visual-review.json'))
assert {a.split('/')[-1] for a in assets} <= set(review['approved_ids'])
assert len(mapping) == 148 and len(portraits) == 20
for asset in assets:
    copy('pics/' + asset + '.webp')

# The local index differs from current main only by the reviewed portrait/offline helpers.
copy('index.html')
app = read(DEST / 'index.html')
assert "const APP_RELEASE='3.111';" in app
app = app.replace("const APP_RELEASE='3.111';", "const APP_RELEASE='3.112';")
app, count = re.subn(r'const APP_VERSION=\d+;', 'const APP_VERSION=184;', app, count=1)
assert count == 1
app, count = re.subn(r"const WHATS_NEW='(?:\\.|[^'\\])*';", "const WHATS_NEW='Fresh rounded illustrations for 148 Lithuanian course pictures, plus matching conversation characters. More pictures are on the way. Your progress carries on as before.';", app, count=1)
assert count == 1
write(DEST / 'index.html', app)
worker, count = re.subn(r"const SHELL = 'gintaras-shell-v\d+';", "const SHELL = 'gintaras-shell-v184';", read(DEST / 'sw.js'), count=1)
assert count == 1
write(DEST / 'sw.js', worker)
history = read(DEST / 'CHANGELOG.md')
entry = '- **3.112** (2026-11-05) First Lithuanian artwork rollout: 148 course pictures, all 20 conversation portraits and the default learner portrait use the approved rounded cartoon style. Optimized transparent WebPs load with lessons and remain available offline. The remaining 340 pictures retain their existing artwork while replacements are prepared. Course content, recordings, saved progress and customized avatars are preserved.\n'
at = history.index('\n') + 1
write(DEST / 'CHANGELOG.md', history[:at] + '\n' + entry + '\n' + history[at:].lstrip('\n'))
for name in ['.github/workflows/deploy.yml', '.gitignore', 'tools/check_course.js', 'tools/check_art_compatibility.js', 'tools/check_lithuanian_art.py', 'tools/build_lithuanian_art_jobs.js', 'tools/export_course_art.py', 'tools/integrate_course_art.py', 'tools/inventory_art.js', 'tools/render_art_review_pages.py', 'tools/render_cast_references.py', 'tools/checkpoint_art_migration.py', 'tools/finalize_lithuanian_art.py']:
    copy(name)
for name in ['STYLE.md', 'approved-style-reference.png', 'lt-inventory.json', 'lithuanian-art-jobs.json', 'lithuanian-art-pending.json', 'lithuanian-art-status.json', 'visual-review.json']:
    copy('docs/art-direction/' + name)
for path in (ROOT / 'docs/art-direction').glob('lt-*-character-sheet.png'):
    copy(str(path.relative_to(ROOT)))
for folder in ['cast-identity-references', 'lt-records']:
    shutil.copytree(ROOT / 'docs/art-direction' / folder, DEST / 'docs/art-direction' / folder, dirs_exist_ok=True)
write(DEST / 'docs/art-direction/MIGRATION-NOTES.md', '# Lithuanian artwork continuation\n\nRelease 3.112 ships 148 reviewed course pictures, 20 named portraits and the default learner portrait. The 340 pending course jobs are recorded in lithuanian-art-pending.json. PICTURE_MIGRATION_COMPLETE remains false, so unfinished words retain their current artwork.\n\nUse approved-style-reference.png and the character references for subsequent generation. Preserve vocabulary, lesson IDs, recordings, customized avatars and saved progress. Review every new output before integration. Do not regenerate completed assets. Full-resolution masters and generation service paths remain local; the production WebPs and exact prompts are saved here.\n\nRun tools/check_course.js, tools/check_art_compatibility.js and tools/check_lithuanian_art.py before the next rollout. The finalizer requires the complete set and must not be used for a partial release.\n')
print(f'Prepared 3.112 / build 184 with {len(assets)} reviewed production assets.')
