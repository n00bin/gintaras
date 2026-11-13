"""Prepare the tested, scoped required-unit release on top of live 3.115."""
from pathlib import Path
import re, shutil
ROOT=Path(__file__).resolve().parents[1]
R=ROOT/'.release-lithuanian-art'
p=R/'index.html';s=p.read_text(encoding='utf8')
assert "const APP_RELEASE='3.115';" in s and 'const APP_VERSION=187;' in s
s=s.replace("const APP_RELEASE='3.115';","const APP_RELEASE='3.116';").replace('const APP_VERSION=187;','const APP_VERSION=188;')
s,n=re.subn(r"const WHATS_NEW='(?:\\.|[^'\\])*';","const WHATS_NEW='Units 1–3 now include required reading, listening, writing and recorded speaking lessons. Unit test-out checks those skills too. Your word progress is preserved.';",s,count=1)
assert n==1;p.write_text(s,encoding='utf8')
p=R/'sw.js';s=p.read_text(encoding='utf8');assert "gintaras-shell-v187" in s
p.write_text(s.replace('gintaras-shell-v187','gintaras-shell-v188'),encoding='utf8')
p=R/'CHANGELOG.md';s=p.read_text(encoding='utf8');at=s.index('\n')+1
entry='- **3.116** (2026-11-09) Required practical lessons now sit inside Lithuanian Units 1–3 and count toward unit completion. Vocabulary test-out defers skip credit until independent reading/listening/writing checks and recorded speaking are complete. Resume, offline access and previously learned words are preserved. Speaking is self-compared, not assigned a proficiency score.\n'
p.write_text(s[:at]+'\n'+entry+'\n'+s[at:].lstrip('\n'),encoding='utf8')
p=R/'tools/check_foundation_update.py';s=p.read_text(encoding='utf8').replace('187','188').replace('186','187').replace('ad846ea:','6c7c739:').replace('output/art-release','output/required-unit-skills')
s=s.replace("page.reload();page.wait_for_function('window.WordamiTopicCatalogue')","page.reload();page.wait_for_function('window.WordamiUnitSkills')")
s=s.replace("assert page.evaluate('APP_VERSION')==188","assert page.evaluate('APP_VERSION')==188\n    assert page.evaluate(\"unitUnlocked(COURSE.findIndex(u=>u.id==='u3'))\")\n    assert page.evaluate(\"!stepDone('u1') && WordamiUnitSkills.entries('u1').length===1\")")
p.write_text(s,encoding='utf8')
(R/'output/required-unit-skills').mkdir(parents=True,exist_ok=True)
for name in ['check_required_unit_gates.py','check_required_unit_flows.py']:
 s=(ROOT/'tools'/name).read_text(encoding='utf8').replace("assert page.evaluate('APP_VERSION')==187","assert page.evaluate('APP_VERSION')==188")
 (R/'tools'/name).write_text(s,encoding='utf8')
p=R/'tools/verify_foundation_live.py';s=p.read_text(encoding='utf8').replace('3.115','3.116').replace('187','188').replace('output/art-release','output/required-unit-skills')
s=s.replace("page.wait_for_function('window.WordamiTopicCatalogue')","page.wait_for_function('window.WordamiUnitSkills')")
s=s.replace("assert page.evaluate('APP_VERSION')==188","assert page.evaluate('APP_VERSION')==188\n    assert page.locator('#a1-practice-card').count()==0\n    assert len(page.evaluate('WordamiA1Placement'))==3\n    assert page.locator('[data-required=true]').count()==3\n    assert all('Required' in text for text in page.locator('[data-required=true]').all_inner_texts())")
p.write_text(s,encoding='utf8')
shutil.copy2(ROOT/'docs/cefr/REQUIRED-UNIT-SKILLS.md',R/'docs/REQUIRED-UNIT-SKILLS.md')
print('Prepared 3.116/build 188 required-unit release and update/live checks.')
