"""Integrate explicitly reviewed replacements without changing source cards or IDs."""
import json,re,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
review=json.loads((DIR/'semantic-audit-findings.json').read_text(encoding='utf8'))
baseline=json.loads((DIR/'semantic-audit-baseline.json').read_text(encoding='utf8'))
records=[json.loads(p.read_text(encoding='utf8')) for p in (DIR/'semantic-records').glob('*.json')]
records=[r for r in records if r.get('review_status')=='approved']
for r in records:
    assert hashlib.sha256((ROOT/r['asset']).read_bytes()).hexdigest()==r['reviewed_sha256'],r['id']
by_finding={r['finding']:r for r in records if r.get('finding')}
by_id={r['id']:r for r in records}
overrides={'lt':{},'es':{}}
changes=[]
for f in review['findings']:
    if f['asset'] not in by_finding:continue
    record=by_finding[f['asset']];assert (ROOT/record['asset']).is_file()
    source=next(a for a in baseline['assets'] if a['picture']=='art-v2/'+f['asset'])
    for use in source['uses']:
        if f.get('words') and use['word'] not in f['words']:continue
        if f['asset']=='fish' and use['word']=='el pez':continue
        target=record
        if f['asset']=='please-help' and use['word']=='¿Necesitas ayuda?':
            if 'semantic-offer-help' not in by_id:continue
            target=by_id['semantic-offer-help']
        overrides[use['lang']][use['word']]='art-v2/'+target['id']
        changes.append({'lang':use['lang'],'word':use['word'],'from':source['picture'],'to':'art-v2/'+target['id'],'finding':f['asset']})
    f.update(resolved=True,resolution='Reviewed replacement '+record['asset']+' integrated for the specific affected mappings; unrelated noun uses retained.'+(' Separate helper-offering and learner-requesting scenes are mapped by who asks the question.' if f['asset']=='please-help' else ''))
for lang,words in {'lt':['Mano vardas Tomas','Aš esu Tomas'],'es':['Me llamo Tomás']}.items():
    if 'semantic-personal-name' in by_id:
        for word in words:overrides[lang][word]='art-v2/semantic-personal-name'
for lang,values in overrides.items():
    file=ROOT/'lang'/f'{lang}.js';source=file.read_text(encoding='utf8')
    block='// BEGIN SEMANTIC IMAGE FIXES\nObject.assign(PICTURE_ASSETS,'+json.dumps(values,ensure_ascii=False,indent=2)+');\n// END SEMANTIC IMAGE FIXES\n'
    if '// BEGIN SEMANTIC IMAGE FIXES' in source:source=re.sub(r'// BEGIN SEMANTIC IMAGE FIXES\n.*?// END SEMANTIC IMAGE FIXES\n',lambda _:block,source,flags=re.S)
    else:source=source.replace('function picFor(',block+'function picFor(',1)
    file.write_text(source,encoding='utf8')
(DIR/'semantic-fix-mappings.json').write_text(json.dumps({'changes':changes,'overrides':overrides},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
(DIR/'semantic-audit-findings.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
worker=ROOT/'sw.js';source=worker.read_text(encoding='utf8')
cache='// BEGIN SEMANTIC IMAGE CACHE\nCORE.push('+','.join(json.dumps(r['asset']) for r in sorted(records,key=lambda r:r['id']))+');\n// END SEMANTIC IMAGE CACHE\n'
if '// BEGIN SEMANTIC IMAGE CACHE' in source:source=re.sub(r'// BEGIN SEMANTIC IMAGE CACHE\n.*?// END SEMANTIC IMAGE CACHE\n',lambda _:cache,source,flags=re.S)
else:
    assert "self.addEventListener('install'" in source
    source=source.replace("self.addEventListener('install'",cache+"self.addEventListener('install'",1)
worker.write_text(source,encoding='utf8')
print(f'Integrated {len(changes)} phrase mappings from {len(by_finding)} reviewed replacement assets.')
