"""Close the audited findings only after fresh browser checks pass."""
import collections,json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1];DIR=ROOT/'docs/art-direction'
read=lambda p:json.loads(p.read_text(encoding='utf8'))
jobs_file=DIR/'semantic-fix-jobs.json'
reports=['output/semantic-fixes/verification.json','output/adventure/verification.json','output/a1-practice/verification.json']
for name in reports:
    p=ROOT/name;assert p.stat().st_mtime>(DIR/'semantic-audit-baseline.json').stat().st_mtime,name
    assert read(p)['passed'],name
review=read(DIR/'semantic-audit-findings.json')
runtime={
 'i-am-from-america':'Personalized origin sentences now resolve to a neutral learner/globe/pin diagram in both languages. Browser checks passed with Canada and Japan; the literal US mapping remains valid for the unpersonalized source phrase.',
 'my-name-is-tomas':'Neutral name-badge diagram mapped to the introduction phrases and retained through the actual personalization path. Browser checks passed with Ava in both languages.',
 'i-am-a-teacher-v3':'Female teacher and Lithuanian female student forms use existing matching artwork. Changed job sentences without an exact suitable illustration stay text-only instead of inheriting the student or male-teacher picture. Browser checks cover female teachers in both languages and actual Lithuanian teacher/engineer job substitutions.',
 'i-m-doing':'The mixing illustration remains only on the translated introduction card as an example of doing. Small answer/review thumbnails suppress it, so it is not presented as a unique visual definition of the general verb. Actual renderer checks passed for both sizes.'}
for f in review['findings']:
    if f['asset'] in runtime:f.update(resolved=True,resolution=runtime[f['asset']])
interactive={
 'cafe-drink-contrast':'Distinct reviewed espresso and tea-glass images are connected to the words and both drink choices in the reading/listening practice and writing adventure. Both choices receive equal thumbnails and retain accessible text names. Both-language real reading/listening checks passed.',
 'cafe-state':'Empty table before ordering, selected drink as a choice rather than a delivered order, empty coffee cup or tea glass after finishing, then isolated bill and terminal at the payment stage. Resume, independent/assisted completion, 320px layout and offline image reload passed without changing course state.',
 'cv1-seat':'Reviewed empty-seat and crowded-counter assets are connected to an optional Look around the café panel in the actual cv1 conversation. Each button gives scene feedback; no dialogue or saved conversation IDs changed. The empty-seat image contains no substitute character. Actual replay and button checks passed.',
 'directions-map':'Existing park, library and shop illustrations supplement the labelled map in all three runners. North/left/right geometry is preserved in code. Actual mobile directions practice verified all three image positions and no overflow.',
 'practical-source-visuals':'Neutral topic illustrations appear on the practice briefings for home, family, shopping, prices, schedules and messages. Exact source text and amounts remain app-rendered, and task answer panels receive no answer-revealing decoration. The directions map is the illustrated source where geography is the task.'}
for f in review['interactive']:f.update(resolved=True,resolution=interactive[f['id']])
versions={'free-seat':'free-seat-v2','cafe-bill':'cafe-bill-v2'}
for f in review['new_interactive_asset_briefs']:
    f.update(status='integrated-and-verified',asset='pics/art-v2/'+versions.get(f['id'],f['id'])+'.webp')
    if f['id']=='cafe-empty-cup':f['tea_variant']='pics/art-v2/a1x-stikline.webp'
review['validation']=reports
review['method']='Initial assistant visual inspection of all 653 vocabulary images and 23 portraits, joined to both language packs. Replacements reviewed at 112px/light and 56px/dark; 65 corrected mappings, personalization, café flows, map geometry, media, recording, resume, offline loading and progress preservation verified locally. Historical source findings and rejected masters are preserved.'
assert all(f.get('resolved') for f in review['findings'])
(DIR/'semantic-audit-findings.json').write_text(json.dumps(review,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
records=[read(p) for p in (DIR/'semantic-records').glob('*.json')]
approved=[r for r in records if r.get('review_status')=='approved']
(DIR/'semantic-fix-assets.json').write_text(json.dumps({'assets':sorted(approved,key=lambda r:r['id']),'validation':reports},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
jobs=read(jobs_file)
for job in jobs['jobs']:
    candidates=[r for r in approved if r['id']==job['id'] or r.get('finding')==job.get('finding') and job.get('finding') or job.get('interactive') and r['id']==versions.get(job['id'],job['id'])]
    assert candidates,job['id']
    job.update(status='integrated-and-verified',result_asset=candidates[0]['asset'],generation_record='docs/art-direction/semantic-records/'+candidates[0]['id']+'.json')
jobs['summary']={'findings_resolved':len(review['findings']),'new_reviewed_assets':len(approved),'by_generator':dict(collections.Counter(r['generator'] for r in approved)),'validation':reports,'deployment':'local preview only'}
jobs_file.write_text(json.dumps(jobs,ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(json.dumps(jobs['summary'],ensure_ascii=False,indent=2))
