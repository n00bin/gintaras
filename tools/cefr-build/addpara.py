"""Append lines to graded items in a scratch file: addpara.py <file> <json of {id: [[lt,en] or [who,lt,en], ...]}>"""
import json, sys
f = sys.argv[1]; add = json.load(open(sys.argv[2], encoding='utf-8'))
s = open(f, encoding='utf-8').read()
esc = lambda t: t.replace("'", "\\'")
for iid, paras in add.items():
    a = s.index("{id:'" + iid + "'"); b = s.index("]],\n glossary:", a)
    extra = ''.join(",\n  ['" + (p[0] if len(p) == 3 else '') + "','" + esc(p[-2]) + "','" + esc(p[-1]) + "']" for p in paras)
    s = s[:b] + ']' + extra + s[b + 1:]
open(f, 'w', encoding='utf-8').write(s); print('ok')
