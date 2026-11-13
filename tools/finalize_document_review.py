"""One-shot review-button and report wiring; do not rerun."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def replace(path,old,new):
 p=R/path;s=p.read_text(encoding='utf8');assert old in s;(p).write_text(s.replace(old,new,1),encoding='utf8')
replace('document-reading.js',"b('Review table guide',()=>{if(update(next=>next.units[id].studied=false))open(id);})", "b('Review table guide',()=>open(id,'guide'))")
replace('tools/report_skills_coverage.py','forms:WordamiFormContent.units,','forms:WordamiFormContent.units,documents:WordamiDocumentContent.units,')
replace('tools/report_skills_coverage.py',"'practicalForms':", "'practicalTables':len(content['documents'].get(level['id'],{}).get('variants',[])),'practicalForms':")
replace('tools/report_skills_coverage.py','Twelve additional short practical forms teach labels', 'Twelve required table-reading tasks teach headings, rows and source comparison in selected A1–A2 units. Twelve additional short practical forms teach labels')
replace('tools/report_course_evidence.py','Twelve required practical forms across', 'Twelve required table-reading tasks check two layouts and comparison with prepared messages in selected A1–A2 units. Twelve required practical forms across')
print('Reviewing a completed table guide preserves completion; coverage reports include exact table task counts.')
