"""Keep the scoped live course available while the expanded course stays in preview."""
from pathlib import Path
R=Path(__file__).resolve().parents[1];live=R/'.release-lithuanian-art'
names=['foundation-'+part+'.js' for part in ['evidence','ui','content','practice','path','unit-skills']]
for name in names:
 s=(live/name).read_text(encoding='utf8');needle="'use strict';";assert s.count(needle)==1
 s=s.replace(needle,needle+'\nif(LANG_PREVIEW)return;',1);(R/name).write_text(s,encoding='utf8')
p=R/'index.html';s=p.read_text(encoding='utf8');assert 'src="foundation-evidence.js"' not in s
s=s.replace('</body>','\n'.join('<script src="'+name+'"></script>' for name in names)+'\n</body>');p.write_text(s,encoding='utf8')
p=R/'sw.js';s=p.read_text(encoding='utf8');start="CORE.push('capstone-content.js'"
# Cache the live modules alongside the preview modules; both remain usable offline.
marker="CORE.push(\"capstone-content.js\"";assert marker in s
s=s.replace(marker,'CORE.push('+','.join(repr(n) for n in names)+');\n'+marker,1);p.write_text(s,encoding='utf8')
