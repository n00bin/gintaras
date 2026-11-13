"""Insert graded items from a scratch file into graded-content-lt.js, replacing any with the same id."""
import re, sys
G = 'G:/ai_projects/gintaras/graded-content-lt.js'
s = open(G, encoding='utf-8').read(); new = open(sys.argv[1], encoding='utf-8').read().rstrip() + '\n'
ANCHOR = '];\nwindow.WordamiGradedContent'
for i in re.findall(r"^\{id:'([^']+)'", new, re.M):
    m = re.search(r"^\{id:'" + re.escape(i) + r"'.*?(?=^\{id:'|^/\* -|^\];\nwindow)", s, re.M | re.S)
    if m: s = s[:m.start()] + s[m.end():]
k = s.index(ANCHOR); s = s[:k] + new + s[k:]
open(G, 'w', encoding='utf-8').write(s); print('ok', len(re.findall(r"^\{id:'", new, re.M)), 'items')
