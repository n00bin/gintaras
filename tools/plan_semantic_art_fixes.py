"""Prepare resumable, per-asset built-in generation jobs from the semantic audit."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DIR=ROOT/'docs/art-direction'
review=json.loads((DIR/'semantic-audit-findings.json').read_text(encoding='utf8'))
style='docs/art-direction/approved-style-reference.png'
base=('Use case: stylized-concept. Create ONE production vocabulary illustration for Wordami. '
      'Reference 1 is the authoritative STYLE reference only, not a board to reproduce. '
      'Rounded geometric flat cartoon, large expressive oval eyes when people appear, chunky rounded hands, '
      'solid turquoise/amber/coral/navy/cream colours, very little detail, nearly no outlines. '
      'No gradients, texture, cast shadows, bloom, glow, fog or vignette. '
      'One complete centered scene on a square TRUE TRANSPARENT background with generous empty margins, '
      'opaque object interiors and broad silhouettes readable at 56 pixels. '
      'No words, letters, labels, logos or watermarks. Do not produce a grid, board or alternative variants. ')
cast=('Tomas: young adult learner, light warm skin, short light brown wavy hair, amber jumper, navy trousers, cream shoes, no glasses or facial hair. '
      'Danutė: older woman, light warm skin, short white bob, small round dark glasses, coral hoodie, navy trousers. '
      'Rūta: young adult woman, light warm skin, long straight dark brown hair with short blunt fringe, green blouse with a few dark leaf motifs, coral trousers, cream shoes. ')
diagrams={'a1x-popiete','sister','brother','a1x-teta','a1x-dede','a1x-pusbrolis','a1x-pussesere','es-city-block','money','cake','a-tall-man','es-dog','es-wake-up'}
runtime={'i-am-from-america','my-name-is-tomas','i-am-a-teacher-v3','i-m-doing'}
jobs=[]
for f in review['findings']:
    if f.get('resolved') or f['asset'] in diagrams|runtime:continue
    key='semantic-'+f['asset']
    refs=[style]
    if f['asset'] in {'some-coffee','some-tea','please','hello-formal'}:refs+=['docs/art-direction/lt-danute-character-sheet.png']
    if f['asset'] in {'good-evening','how-are-you','bye'}:refs+=['docs/art-direction/lt-ruta-character-sheet.png']
    if f['asset'] in {'i-get-dressed','please-help'}:refs+=['docs/art-direction/lt-learner-character-sheet.png']
    subject=f['brief']
    if f['asset']=='bedroom':subject='One isolated complete BED with mattress, blanket and two pillows, no room, nightstand, lamp, windows or walls. This is the noun bed, not bedroom.'
    if f['asset']=='please-help':subject='Tomas struggling to lift one heavy box, extending his open hand toward another adult who is reaching out to help. A question mark above Tomas. The request for help is primary; no completed handover.'
    if f['asset']=='breakfast':subject='A hotel reception desk with a booking card carrying a large green checkmark next to a clearly shown breakfast plate with toast, egg and juice. This communicates breakfast included. No money or numbers.'
    if f['asset']=='milk':subject='A curious person pointing to a bowl of cereal while asking a server whether it contains milk: a large thought bubble shows a milk carton with a cow symbol and a red question mark. No words.'
    if f['asset']=='child':subject='Two adults conversing; one has a questioning gesture and a large speech bubble containing two small children with a red question mark. Show asking whether someone has children, not a solitary child portrait.'
    if f['asset']=='white-v5':subject='One plain neutral WHITE short-sleeved shirt, opaque pure white central fabric, a thin navy outline for contrast on white. No cream, beige or yellow fabric.'
    if f['asset']=='fish':subject='One COOKED FISH FILLET on a plate with a lemon slice and a fork beside the plate. Opaque cooked interior, no eyes, no smiling face, no live animal. This is fish as food.'
    jobs.append({'id':key,'finding':f['asset'],'words':f.get('words'), 'prompt':base+cast+'Subject: '+subject,'references':refs,'status':'pending'})
for f in review['new_interactive_asset_briefs']:
    jobs.append({'id':f['id'],'interactive':True,'prompt':base+'Subject: '+f['brief'],'references':[style],'status':'pending'})
out=DIR/'semantic-fix-jobs.json'
if out.exists():
    old={j['id']:j for j in json.loads(out.read_text(encoding='utf8'))['jobs']}
    jobs=[old.get(j['id'],j) for j in jobs]
out.write_text(json.dumps({'jobs':jobs,'diagram_findings':sorted(diagrams),'runtime_findings':sorted(runtime)},ensure_ascii=False,indent=2)+'\n',encoding='utf8')
print(f'{len(jobs)} illustration jobs; {len(diagrams)} exact diagram fixes; {len(runtime)} runtime/context fixes.')
