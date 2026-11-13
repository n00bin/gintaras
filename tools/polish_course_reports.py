from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'tools/check_skills_offline.py';s=p.read_text(encoding='utf8').replace("WordamiLearningDesign?.units||{}).length===24","WordamiLearningDesign?.units||{}).length===30").replace("WordamiSourceSupport?.units||{}).length===24","WordamiSourceSupport?.units||{}).length===30").replace("WordamiSkillsContent.units.length')==24","WordamiSkillsContent.units.length')==30");p.write_text(s,encoding='utf8')
p=R/'tools/export_curriculum_review.py';s=p.read_text(encoding='utf8').replace('all 24 built units','all 30 built units');p.write_text(s,encoding='utf8')
p=R/'tools/check_writing_preparation.py';s=p.read_text(encoding='utf8').replace('Seventy-two A1-C2 worked models, 216 purpose exercises','Eighty-four A1-C2 worked models, 252 purpose exercises');p.write_text(s,encoding='utf8')
