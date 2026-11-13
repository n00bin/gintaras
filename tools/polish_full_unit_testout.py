from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'unit-application.js';s=p.read_text(encoding='utf8')
old="b('Try a new visit',()=>start(true)));return;}"
new="b('Try a new visit',()=>start(true)));const next=window.WordamiUnitSkills?.nextPending();if(spoken&&next&&next.activityId!==id)dialog.append(n('p','This test-out also covers earlier units. Continue with the next required check.'),b('Next required check',()=>WordamiUnitSkills.continueTestout(),'a1-primary'));return;}"
assert old in s;s=s.replace(old,new);p.write_text(s,encoding='utf8')
p=R/'tools/build_native_applications.js';s=p.read_text(encoding='utf8');anchor="fs.writeFileSync(path.join(root,'unit-application.js'),runner);"
extra="runner=runner.replace(\"b('Try a new visit',()=>start(true)));return;}\",\"b('Try a new visit',()=>start(true)));const next=window.WordamiUnitSkills?.nextPending();if(spoken&&next&&next.activityId!==id)dialog.append(n('p','This test-out also covers earlier units. Continue with the next required check.'),b('Next required check',()=>WordamiUnitSkills.continueTestout(),'a1-primary'));return;}\");\n"
assert anchor in s;s=s.replace(anchor,extra+anchor);p.write_text(s,encoding='utf8')
p=R/'index.html';s=p.read_text(encoding='utf8');old="function startTestOut(u){S.testout=S.testout||{};"
new="function startTestOut(u){if(window.WordamiUnitSkills&&S.unitSkillTestout?.language===LANG.code&&S.unitSkillTestout.units.includes(u.id)){WordamiUnitSkills.continueTestout();return;}S.testout=S.testout||{};"
assert old in s;s=s.replace(old,new);p.write_text(s,encoding='utf8')
