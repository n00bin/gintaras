from pathlib import Path
p=Path(__file__).resolve().parents[1]/'assessment-portfolio.js'
s=p.read_text(encoding='utf8')
for old,new in [
 ('title:u.project.title,...clone','title:u.project.title,task:u.project.brief,audience:u.project.audience,goals:u.project.goals,...clone'),
 ('title:p[1],...clone','title:p[1],audience:p[2],task:p[3],goals:p[4],...clone'),
 ('rubric:rubric(id),reading:','rubric:rubric(id),sources:{reading:u.reading,listening:u.listen,readingGuide:u.readingGuide,listeningGuide:u.translation,partnerTurns:u.turns},reading:'),
 ("for(const draft of packet.evidence.writing)dialog.append(n('h3',draft.title),n('p',draft.draft||'No draft supplied.','a1-panel'));", "const sources=packet.evidence.sources;if(sources){const sourceView=n('details');sourceView.append(n('summary','Task sources and partner prompts'));for(const [title,text] of [['Written source',sources.reading],['Written-source meaning guide',sources.readingGuide],['Spoken-source transcript',sources.listening],['Spoken-source meaning guide',sources.listeningGuide]])sourceView.append(n('h3',title),n('p',text));for(const turn of sources.partnerTurns||[])sourceView.append(n('p',turn[0]+' — '+turn[1]));dialog.append(sourceView);}for(const draft of packet.evidence.writing){dialog.append(n('h3',draft.title),n('p',draft.task||''),n('p','Reader: '+(draft.audience||'')));for(const goal of draft.goals||[])dialog.append(n('p',goal));dialog.append(n('p',draft.draft||'No draft supplied.','a1-panel'));}"),
]:
 assert old in s,old[:100]
 s=s.replace(old,new)
p.write_text(s,encoding='utf8')
