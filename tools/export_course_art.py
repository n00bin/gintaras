"""Export one recorded AI illustration, preserving its master and resumable metadata."""
import argparse
import json
import re
import shutil
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('record', type=Path)
    args = parser.parse_args()
    record = json.loads(args.record.read_text(encoding='utf-8'))
    key = record['id']
    if not re.fullmatch(r'[a-z0-9-]+', key):
        raise ValueError('Invalid asset id')
    masters = ROOT / 'docs/art-direction/masters'
    exports = ROOT / 'pics/art-v2'
    masters.mkdir(parents=True, exist_ok=True)
    exports.mkdir(parents=True, exist_ok=True)
    master, export = masters / (key + '.png'), exports / (key + '.webp')
    if not master.exists():
        shutil.copy2(record['source'], master)
    with Image.open(master) as source:
        image = source.convert('RGBA')
        if image.getchannel('A').getextrema()[0] != 0:
            raise ValueError(f'{key}: background is opaque')
        image.thumbnail((512, 512), Image.Resampling.LANCZOS)
        canvas = Image.new('RGBA', (512, 512))
        canvas.paste(image, ((512-image.width)//2, (512-image.height)//2))
        canvas.save(export, 'WEBP', quality=85, alpha_quality=100, method=4, exact=True)
    record.update(master=master.relative_to(ROOT).as_posix(), asset=export.relative_to(ROOT).as_posix(),
                  bytes=export.stat().st_size, generator='built-in image_gen', status='exported')
    # No machine-specific source path is needed after preserving the original.
    record.pop('source', None)
    args.record.write_text(json.dumps(record, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'{key}: exported {record["bytes"]} bytes')


if __name__ == '__main__':
    main()
