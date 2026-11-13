"""One-shot retention of reviewed notes separately from editable drafts. Do not rerun."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
def replace(file,old,new):
 p=R/file;s=p.read_text(encoding='utf8');assert old in s,(file,old[:60]);p.write_text(s.replace(old,new,1),encoding='utf8')
replace('extended-reading.js',"if(update(next=>next.units[id].notes=values()))unsavedDraft=null;", "if(update(next=>{const r=next.units[id];if(r.notesCompletedAt&&!r.checkedNotes)r.checkedNotes=clone(r.notes);r.notes=values();}))unsavedDraft=null;")
replace('extended-reading.js',"next.units[id].notes=notes;next.units[id].notesCompletedAt=", "next.units[id].notes=notes;next.units[id].checkedNotes=clone(notes);next.units[id].notesCompletedAt=")
replace('extended-reading.js',"for(const [i,note] of row.notes.entries())notes.append", "for(const [i,note] of (row.checkedNotes||row.notes).entries())notes.append")
replace('extended-reading.js',"Object.assign(next.units[id].brief,copy,{baseline:copy.draft,stage:'revise'})", "Object.assign(next.units[id].brief,copy,{baseline:copy.draft,noteBasis:clone(row.checkedNotes||row.notes),stage:'revise'})")
replace('extended-reading.js',"{...copy,at:r.completedAt}", "{...copy,noteBasis:clone(row.checkedNotes||row.notes),at:r.completedAt}")
replace('assessment-portfolio.js',"e.record?.notes?.[i]?.text", "(e.record?.checkedNotes||e.record?.notes)?.[i]?.text")
replace('assessment-portfolio.js',"e.record?.notes?.[i]?.quote", "(e.record?.checkedNotes||e.record?.notes)?.[i]?.quote")
replace('assessment-portfolio.js',"dialog.append(n('p','First brief: '+(e.record?.brief?.baseline||''))", "for(const goal of e.task.goals)dialog.append(n('p','Brief criterion: '+goal));dialog.append(n('p','Last self-reviewed brief: '+(e.record?.brief?.revisions?.at(-1)?.draft||e.record?.brief?.draft||'')),n('p','First brief: '+(e.record?.brief?.baseline||''))")
print('Preserved checked notes and note bases separately from unfinished edits.')
