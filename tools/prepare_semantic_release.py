"""Prepare the scoped 3.133 release manifest without staging unrelated authoring work."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
def read(p):return json.loads(p.read_text(encoding='utf8'))
changelog=ROOT/'CHANGELOG.md'
text=changelog.read_text(encoding='utf8').replace('**3.133-preview / build 205** (2026-11-26, local)','**3.133 / build 205** (2026-11-26)').replace(' This preview has not been published.','')
changelog.write_text(text,encoding='utf8')
jobs=read(DIR/'semantic-fix-jobs.json');jobs['summary']['deployment']='Release 3.133/build 205; deployment status is tracked in GitHub Actions.'
(DIR/'semantic-fix-jobs.json').write_text(json.dumps(jobs,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
checks={name:read(ROOT/name) for name in ['output/semantic-fixes/verification.json','output/adventure/verification.json','output/a1-practice/verification.json']}
assert all(r['passed'] for r in checks.values())
(DIR/'semantic-release-validation.json').write_text(json.dumps({'release':'3.133','build':205,'local_browser_checks':checks},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
paths=['CHANGELOG.md','README.md','activities.js','adventures.js','foundation-practice.js','index.html','lang/es.js','lang/lt.js','sw.js','tools/check_a1_practice.py','tools/check_adventure.py','tools/export_course_art.py','topic-practice.js','unit-application.js']
paths+=['tools/'+n for n in ['approve_semantic_art.py','audit_image_inventory.js','build_semantic_audit_report.py','build_semantic_diagrams.py','check_semantic_visuals.py','finalize_semantic_fixes.py','integrate_semantic_fixes.py','plan_semantic_art_fixes.py','render_semantic_audit.py','review_semantic_fixes.py','verify_semantic_art_changes.js','prepare_semantic_release.py']]
paths+=['docs/art-direction/'+n for n in ['semantic-art-replacement-queue.json','semantic-audit-2026-11-26.html','semantic-audit-baseline.json','semantic-audit-findings.json','semantic-audit-results.json','semantic-fix-assets.json','semantic-fix-jobs.json','semantic-fix-mappings.json','semantic-release-validation.json']]
assets=read(DIR/'semantic-fix-assets.json')['assets'];assert len(assets)==51
paths += [a['asset'] for a in assets]
paths += [a['native_source'] for a in assets if a.get('native_source')]
paths += [p.relative_to(ROOT).as_posix() for p in (DIR/'semantic-records').glob('*.json')]
paths=sorted(set(paths));assert all((ROOT/p).is_file() for p in paths)
assert not any(p.startswith(('output/','.env','.release')) or '/masters/' in p for p in paths)
out=ROOT/'output/semantic-release';out.mkdir(exist_ok=True,parents=True)
(out/'paths.txt').write_text('\n'.join(paths)+'\n',encoding='utf8')
(out/'paths.json').write_text(json.dumps(paths,indent=2)+'\n',encoding='utf8')
print(f'Prepared explicit manifest: {len(paths)} files, {len(assets)} approved production images; no unrelated drafts, rejected image exports or masters.')
