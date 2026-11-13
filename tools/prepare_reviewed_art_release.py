"""Prepare only approved image changes on the isolated build-186 checkout."""
import hashlib
import json
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / '.release-lithuanian-art'
ART = ROOT / 'docs/art-direction'
def read(p): return p.read_text(encoding='utf8')
def write(p, value):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(value, encoding='utf8')
def copy(name):
    target = DEST / name
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / name, target)

assert (DEST / '.git').is_file()
base = read(DEST / 'lang/lt.js')
local = read(ROOT / 'lang/lt.js')
pattern = r'// BEGIN APPROVED PICTURE ASSETS\n.*?// END APPROVED PICTURE ASSETS'
block = re.search(pattern, local, re.S).group()
mapping = json.loads(re.search(r'const PICTURE_ASSETS=(\{.*?\});', block, re.S).group(1))
before = json.loads(re.search(r'const PICTURE_ASSETS=(\{.*?\});', base, re.S).group(1))
approved = set(json.loads(read(ART / 'visual-review.json'))['approved_ids'])
assert len(mapping) == 297 and len(before) == 148
assert all(mapping.get(word) == asset for word, asset in before.items())
assert {asset.split('/')[-1] for asset in mapping.values()} <= approved
app = read(DEST / 'index.html')
assert "const APP_RELEASE='3.114';" in app and 'const APP_VERSION=186;' in app
worker = read(DEST / 'sw.js')
assert "const SHELL = 'gintaras-shell-v186';" in worker
updated, count = re.subn(pattern, lambda _: block, base, count=1, flags=re.S)
assert count == 1
assert re.sub(pattern, '', updated, flags=re.S) == re.sub(pattern, '', base, flags=re.S)
write(DEST / 'lang/lt.js', updated)
new_assets = sorted({asset for word, asset in mapping.items() if before.get(word) != asset})
assert len(new_assets) == 149
for asset in new_assets:
    key = asset.split('/')[-1]
    record = json.loads(read(ART / 'lt-records' / (key + '.json')))
    assert record['status'] == 'exported'
    filename = 'pics/' + asset + '.webp'
    if (DEST / filename).exists():
        assert hashlib.sha256((DEST / filename).read_bytes()).digest() == hashlib.sha256((ROOT / filename).read_bytes()).digest()
    copy(filename)
    copy('docs/art-direction/lt-records/' + key + '.json')
app = app.replace("const APP_RELEASE='3.114';", "const APP_RELEASE='3.115';").replace('const APP_VERSION=186;', 'const APP_VERSION=187;')
app, count = re.subn(r"const WHATS_NEW='(?:\\.|[^'\\])*';", "const WHATS_NEW='149 more Lithuanian pictures now use our rounded illustration style. Your lessons and saved progress carry on as before.';", app, count=1)
assert count == 1
write(DEST / 'index.html', app)
write(DEST / 'sw.js', worker.replace("const SHELL = 'gintaras-shell-v186';", "const SHELL = 'gintaras-shell-v187';"))
history = read(DEST / 'CHANGELOG.md')
at = history.index('\n') + 1
entry = '- **3.115** (2026-11-08) Added 149 reviewed Lithuanian illustrations, bringing course picture coverage to 297 of 488. Existing pictures remain for the 191 pending replacements. Lesson content, IDs, recordings, activities, saved progress and persistent audio/picture caches are preserved.\n'
write(DEST / 'CHANGELOG.md', history[:at] + '\n' + entry + '\n' + history[at:].lstrip('\n'))
for name in ['lithuanian-art-jobs.json', 'lithuanian-art-pending.json', 'lithuanian-art-status.json', 'visual-review.json', 'art-job-overrides.json']:
    copy('docs/art-direction/' + name)
for name in ['integrate_course_art.py', 'resume_course_art.py', 'revise_course_art.py', 'build_lithuanian_art_jobs.js', 'prepare_reviewed_art_release.py']:
    copy('tools/' + name)
write(DEST / 'docs/art-direction/MIGRATION-NOTES.md', '# Lithuanian artwork continuation\n\nRelease 3.115 / build 187 ships 297 reviewed course mappings, all 20 named portraits and the default learner portrait. The remaining 191 course jobs retain existing artwork. PICTURE_MIGRATION_COMPLETE remains false.\n\nExact prompts are stored in lt-records/. Full-resolution masters remain local. Continue with the approved style and character references. Review every new image before integration. Preserve all vocabulary, lesson IDs, recordings, progress and customized avatars.\n\nChecks: check_course.js, audit_first_three_release.js, check_art_compatibility.js and check_lithuanian_art.py. Use --require-complete only when the entire 488-picture migration is complete.\n')
print(json.dumps({'release':'3.115', 'build':187, 'new_assets':len(new_assets), 'mapped':len(mapping), 'remaining':488-len(mapping)}))
