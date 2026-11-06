"""Connect only fully exported approved illustrations; retain old art until its replacement is ready."""
import json
import re
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / 'docs/art-direction'


def main():
    jobs = json.loads((DIR / 'lithuanian-art-jobs.json').read_text(encoding='utf-8'))
    ready = {}
    for word, asset in jobs['mapping'].items():
        file = ROOT / 'pics' / (asset + '.webp')
        # A file may exist while an export is still being written. Integrate only committed records.
        if asset.rsplit('/', 1)[-1] not in {'coffee', 'chocolate', 'giraffe', 'hotel', 'telephone'}:
            record = DIR / 'lt-records' / (asset.rsplit('/', 1)[-1] + '.json')
            try:
                if json.loads(record.read_text(encoding='utf-8')).get('status') != 'exported':
                    continue
            except (FileNotFoundError, json.JSONDecodeError):
                continue
        if not file.exists():
            continue
        with Image.open(file) as im:
            im.load()
            if im.size != (512, 512) or im.mode != 'RGBA':
                raise ValueError(f'Invalid production image: {file}')
        ready[word] = asset
    target = ROOT / 'lang/lt.js'
    text = target.read_text(encoding='utf-8')
    complete = len(ready) == len(jobs['mapping'])
    block = '// BEGIN APPROVED PICTURE ASSETS\nconst PICTURE_ASSETS=' + json.dumps(ready, ensure_ascii=False, indent=2) + ';\nconst PICTURE_MIGRATION_COMPLETE=' + str(complete).lower() + ';\n// END APPROVED PICTURE ASSETS'
    text, count = re.subn(r'// BEGIN APPROVED PICTURE ASSETS\n.*?// END APPROVED PICTURE ASSETS', lambda _: block, text, flags=re.S)
    if count != 1:
        raise ValueError('Expected exactly one picture mapping block')
    cast = {}
    references = DIR / 'cast-identity-references/index.json'
    people = json.loads(references.read_text(encoding='utf-8')) if references.exists() else []
    for person in people:
        record = DIR / 'lt-records' / ('portrait-' + person['id'] + '.json')
        try:
            data = json.loads(record.read_text(encoding='utf-8'))
        except (FileNotFoundError, json.JSONDecodeError):
            continue
        if data.get('status') == 'exported' and (ROOT / data['asset']).exists():
            cast[person['name']] = 'art-v2/portrait-' + person['id']
    learner = False
    try:
        data = json.loads((DIR / 'lt-records/portrait-learner.json').read_text(encoding='utf-8'))
        learner = data.get('status') == 'exported' and (ROOT / data['asset']).exists()
    except (FileNotFoundError, json.JSONDecodeError):
        pass
    cast_block = '// BEGIN APPROVED CAST PICTURES\nconst CAST_PICTURES=' + json.dumps(cast, ensure_ascii=False, indent=2) + ';\nconst LEARNER_PICTURE=' + json.dumps('art-v2/portrait-learner' if learner else '') + ';\n// END APPROVED CAST PICTURES'
    text, count = re.subn(r'// BEGIN APPROVED CAST PICTURES\n.*?// END APPROVED CAST PICTURES', lambda _: cast_block, text, flags=re.S)
    if count != 1:
        raise ValueError('Expected exactly one cast mapping block')
    temporary = target.with_suffix('.js.tmp')
    temporary.write_text(text, encoding='utf-8')
    temporary.replace(target)
    units = {}
    for job in jobs['jobs']:
        u = units.setdefault(job['unit'], {'ready': 0, 'total': 0})
        u['total'] += 1
        u['ready'] += int(job['word'] in ready)
    status = {'mapped': len(ready), 'total': len(jobs['mapping']), 'complete': len(ready) == len(jobs['mapping']), 'portraits': len(cast), 'portraits_total': len(people), 'learner_portrait': learner, 'units': units}
    (DIR / 'lithuanian-art-status.json').write_text(json.dumps(status, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps(status))


if __name__ == '__main__':
    main()
