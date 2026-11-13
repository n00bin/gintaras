"""Extend source-only exports and exact-count checks to the six authored applications."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'tools/build_skills_audio.py';s=p.read_text(encoding='utf8');start=s.index("require('./writing-content.js');");end=s.index('console.log(JSON.stringify',start)
s=s[:start]+"require('./tools/course_content_loader.js');require('./interaction-practice-content.js');require('./higher-interaction-content.js');"+s[end:];p.write_text(s,encoding='utf8')
for name in ['tools/check_assessment_portfolio.py','tools/check_packaged_site.py','tools/export_curriculum_review.py']:
 p=R/name;s=p.read_text(encoding='utf8')
 if 'assessment' in name:s=s.replace('==24','==30')
 if 'packaged' in name:
  s=s.replace("Object.keys(WordamiLearningDesign.units).length') == 24","Object.keys(WordamiLearningDesign.units).length') == 30").replace("Object.keys(WordamiSourceSupport.units).length') == 24","Object.keys(WordamiSourceSupport.units).length') == 30").replace('lessons).length===36','lessons).length===42')
  s=s.replace("name='Practise checking and clarifying'","name='Required guided exchange'")
 if 'export' in name:s=s.replace('24 units, A1','30 units, A1')
 p.write_text(s,encoding='utf8')
