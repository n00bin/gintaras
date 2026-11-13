"""Connect required written exchanges without changing existing workshop source signatures."""
from pathlib import Path
R=Path(__file__).resolve().parents[1]
p=R/'skills-studio.js';s=p.read_text(encoding='utf8');needle='WordamiInteractionPractice?.progress(l.id)?.complete===true});';assert s.count(needle)==1
s=s.replace(needle,"WordamiInteractionPractice?.progress(l.id)?.complete===true,writtenInteraction:!window.WordamiWrittenInteractionContent?.units[l.id]||window.WordamiWrittenInteraction?.progress(l.id)?.complete===true});")
needle="dialog.append(b('Review this unit";at=s.index(needle)
extra="if(window.WordamiWrittenInteractionContent?.units[l.id]){const written=b('Write and revise an exchange',()=>WordamiWrittenInteraction.open(l.id,null,()=>level(l)));written.disabled=!understood(l);const progress=window.WordamiWrittenInteraction?.progress(l.id);dialog.append(n('h3','Required written exchange'),n('p',(progress?.completedExchanges.length||0)+' of '+(progress?.requiredExchanges||0)+' exchanges revised. Ask a question, read the clarification, then revise your reply.'),written);}"
s=s[:at]+extra+s[at:];p.write_text(s,encoding='utf8')
p=R/'assessment-portfolio.js';s=p.read_text(encoding='utf8');needle='spoken:clone(s.spoken||{}),writing:writingEvidence(u)';assert needle in s
s=s.replace(needle,'spoken:clone(s.spoken||{}),writing:writingEvidence(u),writtenInteraction:window.WordamiWrittenInteraction?.evidence(id)||null');p.write_text(s,encoding='utf8')
p=R/'sw.js';s=p.read_text(encoding='utf8');s=s.replace('CORE.push(',"CORE.push('written-interaction-content.js','written-interaction.js');\nCORE.push(",1).replace('gintaras-shell-v189','gintaras-shell-v190');p.write_text(s,encoding='utf8')
p=R/'index.html';s=p.read_text(encoding='utf8').replace("APP_RELEASE='3.117-preview'","APP_RELEASE='3.118-preview'").replace('APP_VERSION=189','APP_VERSION=190');p.write_text(s,encoding='utf8')
p=R/'tools/course_content_loader.js';s=p.read_text(encoding='utf8');s=s.replace("'c2-application-content']","'c2-application-content','interaction-practice-content','higher-interaction-content','written-interaction-content']");p.write_text(s,encoding='utf8')
