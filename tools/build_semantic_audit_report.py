"""Join explicit human findings with current mappings; never infer visual approval."""
import collections
import hashlib
import html
import json
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/'docs/art-direction'
OUT=ROOT/'output/image-semantic-audit'
read=lambda p:json.loads(p.read_text(encoding='utf8'))
inventory=read(OUT/'inventory.json')
review=read(DIR/'semantic-audit-findings.json')
findings=review['findings']
records=[read(p) for p in (DIR/'semantic-records').glob('*.json')] if (DIR/'semantic-records').exists() else []
approved={r['id']:r for r in records if r.get('review_status')=='approved'}
current=inventory['assets']+inventory['portraits']
seen={a['picture'] for a in current}
extras=[{'picture':'art-v2/'+r['id'],'file':r['asset'],'exists':(ROOT/r['asset']).is_file(),'uses':[{'lang':'app','word':r['id'],'en':'Interactive scene or personalized illustration'}]} for r in approved.values() if 'art-v2/'+r['id'] not in seen]
by_asset=collections.defaultdict(list)
for finding in findings:by_asset[finding['asset']].append(finding)
results=[]
for position,asset in enumerate(current+extras,1):
    key=asset['picture'].split('/')[-1]
    record=approved.get(key,{})
    notes=by_asset.get(key,[]) or by_asset.get(record.get('finding'),[])
    pending=[f for f in notes if not f.get('resolved')]
    results.append({**asset,'number':position,'sha256':hashlib.sha256((ROOT/asset['file']).read_bytes()).hexdigest(),
        'verdict':pending[0]['severity'] if pending else 'no-obvious-mismatch',
        'review_basis':'Visually inspected on numbered contact sheet against current meanings; not a 56px/mobile interaction certification.',
        'findings':notes,'replacement_review':record})
assert all(r['exists'] for r in results)
coverage={lang:dict(collections.Counter('raster' if i['picture'].startswith('art') else 'text-tile' if i['picture'].startswith('#') else 'no-picture' if not i['picture'] else 'other' for i in data['items'])) for lang,data in inventory['languages'].items()}
summary={'date':review['date'],'vocabulary_assets':len(inventory['assets']),'portraits':len(inventory['portraits']),
    'supplementary_assets':len(extras),'new_reviewed_assets':len(approved),
    'missing_referenced_files':sum(not r['exists'] for r in results),'findings':len(findings),
    'resolved_findings':sum(bool(f.get('resolved')) for f in findings),
    'pending_by_type':dict(collections.Counter(f['severity'] for f in findings if not f.get('resolved'))),
    'coverage':coverage,'method':review['method'],
    'limits':['Current local checkout, not the deployed site.','All current vocabulary raster mappings and named/default portraits were inspected; decorative branding, selectable avatar variants and unused historic assets are outside the word/phrase audit.',
              'Text tiles and text-only cards are inventoried separately, not counted as illustrations. No picture is not automatically a defect, especially for abstract advanced sentences.',
              'No-obvious-mismatch means no contradiction seen at contact-sheet size; it does not certify that a picture uniquely expresses every grammatical distinction or every personalized variant.',
              'Replacement assets have separate assistant review records and hashes. Release 3.133/build 205 deployment status is tracked in GitHub Actions.']}
result={'summary':summary,'assets':results,'interactive':review['interactive'],'new_interactive_asset_briefs':review['new_interactive_asset_briefs']}
(DIR/'semantic-audit-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
queue=[f for f in findings if not f.get('resolved') and f['severity'] in ['mismatch','replace','split-sense','improve']]
(DIR/'semantic-art-replacement-queue.json').write_text(json.dumps({'date':review['date'],'status':'complete-locally' if not queue else 'in-progress','items':queue,'interactive':review['new_interactive_asset_briefs']},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
esc=lambda s:html.escape(str(s))
parts=['<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wordami image meaning audit</title>',
'''<style>*{box-sizing:border-box}body{font:16px/1.5 system-ui,sans-serif;color:#17332f;background:#f2f5f1;margin:0}main{max-width:1250px;margin:auto;padding:24px}h1{font-size:32px}h2{margin-top:32px}.intro,.issue{background:white;border:1px solid #d4ded6;border-radius:12px;padding:18px;margin-bottom:12px}.controls{position:sticky;top:0;background:#f2f5f1;padding:12px 0;z-index:1;display:flex;gap:10px;flex-wrap:wrap}input,select{font:inherit;padding:10px;border:1px solid #a9bdb0;border-radius:8px;max-width:100%}input{flex:1;min-width:180px}.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(275px,1fr));gap:14px}article{background:white;border:1px solid #d4ded6;border-radius:12px;padding:16px}article>img{display:block;width:144px;height:144px;object-fit:contain;margin:auto}.small-proof{display:flex;justify-content:center;gap:8px;margin-top:8px}.small-proof img{width:56px;height:56px;object-fit:contain;background:#14264e;border-radius:6px}.small-proof img:first-child{background:#fff}.tag{display:inline-block;font-size:12px;border-radius:6px;background:#e6efe8;padding:4px 8px}.warn{background:#ffe3ba}.bad{background:#ffdad5}small{color:#456359}ul{padding-left:22px}summary{cursor:pointer;font-weight:650}p{margin:10px 0}.muted{color:#456359}[hidden]{display:none!important}a{color:#176650}code{overflow-wrap:anywhere}button{font:inherit;padding:8px}</style><main>''',
f'<h1>Wordami image meaning audit · {esc(review["date"])}</h1>',
f'<div class="intro"><p><strong>{len(inventory["assets"])} vocabulary images + {len(inventory["portraits"])} portraits visually inspected. No referenced raster files are missing.</strong></p><p>{esc(review["method"])}</p>',
f'<p>{len(findings)} recorded findings; {summary["resolved_findings"]} addressed through reviewed replacements, precise diagrams, mapping corrections and runtime fixes. {len(approved)} new assets reviewed; {len(extras)} supplementary scene/personalized assets. Pending: {esc(summary["pending_by_type"])}.</p>',
'<p>Meaning checks include singular/plural counts, sleeping/awake actions, food/animal senses, time of day, gestures, contrast pairs and all cross-language reuse. Existing historical approval records were not changed.</p>',
'<ul>'+''.join('<li>'+esc(s)+'</li>' for s in summary['limits'])+'</ul>',
'<p>Reproduce: <code>node tools/audit_image_inventory.js</code>, then <code>G:/Python/python.exe tools/render_semantic_audit.py</code>, then <code>G:/Python/python.exe tools/build_semantic_audit_report.py</code>. Running these tools does not perform or renew human review.</p></div>',
'<h2>Priority findings and exact fixes</h2>']
for f in findings:
    label='Corrected' if f.get('resolved') else f['severity']
    parts.append(f'<div class="issue"><span class="tag warn">{esc(label)}</span> <strong>{esc(f["asset"])}</strong><p>{esc(f["reason"])}</p>')
    if f.get('words'):parts.append('<p>Specific phrases: '+esc(' · '.join(f['words']))+'</p>')
    parts.append('<p><strong>Action:</strong> '+esc(f.get('resolution',f['brief']))+'</p></div>')
parts.append('<h2>Interactive practice</h2>')
for i in review['interactive']:
    parts.append('<div class="issue"><strong>'+esc(i['id'])+' · '+esc('Corrected' if i.get('resolved') else i['priority'])+'</strong><p>'+esc(i['finding'])+'</p><p><strong>Action:</strong> '+esc(i.get('resolution',i['action']))+'</p><small>'+esc(', '.join(i['files']))+'</small></div>')
parts.append('<h2>New interactive image briefs</h2><ul>')
for b in review['new_interactive_asset_briefs']:parts.append('<li><strong>'+esc(b['id'])+'</strong> ('+esc(b['status'])+'): '+esc(b['brief'])+'</li>')
parts.append('</ul><h2>Coverage gaps</h2><p>These counts describe source cards, not distinct words. A text tile is not an illustration. Text-only advanced phrases should not receive generic pictures merely to fill a count.</p>')
for lang,stats in coverage.items():
    parts.append('<details><summary>'+esc(lang.upper())+' · '+esc(stats)+'</summary><ul>')
    for i in inventory['languages'][lang]['items']:
        if not i['picture']:parts.append('<li>'+esc(i['unit'])+' · '+esc(i['word'])+' — '+esc(i['en'])+'</li>')
    parts.append('</ul></details>')
parts.append('''<h2>Every inspected image and its current phrases</h2><p>Each card shows 144px plus 56px light/dark previews. Small previews are provided for follow-up review; their presence is not a new approval. Search filters the inventory cards below.</p><div class="controls"><input id="search" aria-label="Search assets and phrases" placeholder="Search English, Lithuanian, Spanish, or asset name"><select id="status" aria-label="Filter review result"><option value="all">All inspected images</option><option value="issues">Pending findings</option><option value="no-obvious-mismatch">No obvious mismatch</option><option value="mismatch">Mismatch</option><option value="replace">Replace</option><option value="context">Needs context</option><option value="runtime-gap">Runtime gap</option><option value="improve">Improve</option><option value="split-sense">Split food/animal sense</option></select><span id="count" role="status"></span></div><div class="grid">''')
for a in results:
    terms=a['picture']+' '+' '.join(u.get('word','')+' '+u['en']+' '+u['lang'] for u in a['uses'])
    cls='' if a['verdict']=='no-obvious-mismatch' else 'bad' if a['verdict']=='mismatch' else 'warn'
    src='../../'+a['file']
    parts.append(f'<article data-status="{esc(a["verdict"])}" data-search="{esc(terms.lower())}"><img loading="lazy" src="{esc(src)}" alt="{esc(a["picture"])}"><div class="small-proof"><img loading="lazy" src="{esc(src)}" alt="56 pixel light background"><img loading="lazy" src="{esc(src)}" alt="56 pixel dark background"></div><p><small>#{a["number"]}</small> <strong>{esc(a["picture"].split("/")[-1])}</strong></p><span class="tag {cls}">{esc(a["verdict"])}</span><ul>')
    seen=set()
    for u in a['uses']:
        use=(u['lang'],u.get('word',''),u['en'])
        if use not in seen:parts.append('<li>'+esc(' · '.join(use[:2]))+' — '+esc(use[2])+'</li>');seen.add(use)
    parts.append('</ul>')
    for f in a['findings']:parts.append('<p>'+esc(f.get('resolution',f['reason']))+'</p>')
    parts.append('</article>')
parts.append('''</div></main><script>const q=document.querySelector('#search'),s=document.querySelector('#status'),cards=[...document.querySelectorAll('article')];function filter(){let shown=0;for(const c of cards){const matches=q.value.toLowerCase().trim().split(/\s+/).every(t=>c.dataset.search.includes(t));const status=s.value==='all'||s.value===c.dataset.status||(s.value==='issues'&&c.dataset.status!=='no-obvious-mismatch');c.hidden=!(matches&&status);if(!c.hidden)shown++}document.querySelector('#count').textContent=shown+' images'}q.addEventListener('input',filter);s.addEventListener('change',filter);filter();</script></html>''')
target=DIR/'semantic-audit-2026-11-26.html'
target.write_text('\n'.join(parts),encoding='utf8')
print(json.dumps(summary,ensure_ascii=False,indent=2))
print('Report: '+str(target))
