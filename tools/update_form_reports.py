"""Include required forms in the source task map and implementation inventory."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'tools/report_course_evidence.py';s=p.read_text(encoding='utf8')
s=s.replace("'tasks':goal['practiceIds']","'tasks':goal['practiceIds']+goal.get('relatedPracticeIds',[])")
s=s.replace("'writtenExchanges':len(c['writtenInteraction'][uid]['exchanges']),","'writtenExchanges':len(c['writtenInteraction'][uid]['exchanges']),'formTasks':len(c.get('forms',{}).get(uid,{}).get('variants',[])),")
s=s.replace('All six skill families have explicit goals, preparation and evidence routes.','All six skill families have explicit goals, preparation and evidence routes. Twelve required practical forms across the two languages teach labels and field formats before original and changed source details are checked.')
p.write_text(s,encoding='utf8')
p=R/'tools/report_skills_coverage.py';s=p.read_text(encoding='utf8')
s=s.replace("reviewCardCapacity:WordamiVocabularyContent.deck().length","forms:WordamiFormContent.units,reviewCardCapacity:WordamiVocabularyContent.deck().length")
s=s.replace("'independentProficiencyAssessment':False","'practicalForms':len(content['forms'].get(level['id'],{}).get('variants',[])),'independentProficiencyAssessment':False")
s=s.replace('All units include eight contextual vocabulary exercises','Twelve additional short practical forms teach labels and field formats and check details from original and changed prepared sources. These are not additional essay projects or independent proficiency tests. All units include eight contextual vocabulary exercises')
p.write_text(s,encoding='utf8')
print('Form tasks are included in task IDs, counts and source-only review documentation.')
