"""Insert lines before an anchor line in a scratch file: insp.py <file> <json list of {"before": text start, "who": "", "lt": .., "en": ..}>"""
import json, sys
f = sys.argv[1]; add = json.load(open(sys.argv[2], encoding='utf-8'))
s = open(f, encoding='utf-8').read()
esc = lambda t: t.replace("'", "\\'")
for p in add:
    i = s.index("'" + p['before'])
    ls = s.rindex('[', 0, i)
    s = s[:ls] + "['" + p.get('who', '') + "','" + esc(p['lt']) + "','" + esc(p['en']) + "'],\n  " + s[ls:]
open(f, 'w', encoding='utf-8').write(s); print('ok', len(add))
