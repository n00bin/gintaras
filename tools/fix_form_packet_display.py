"""One-shot correction: render forms in the review view, not packet validation."""
from pathlib import Path
p=Path(__file__).resolve().parents[1]/'assessment-portfolio.js';s=p.read_text(encoding='utf8')
start=s.index('if(packet.evidence.forms){');end=s.index('for(const audio of packet.audio)',start)
block=s[start:end];assert "Practical forms" in block and 'dialog.append' in block
s=s[:start]+s[end:]
anchor='if(packet.evidence.documents){';assert s.count(anchor)==1
s=s.replace(anchor,block+anchor,1);p.write_text(s,encoding='utf8')
print('Practical forms are rendered inside the opened review screen; packet validation no longer mutates the view.')
