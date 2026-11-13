"""Preserve generated masters and export the first Spanish unit's WebP illustrations.

Usage: python tools/export_spanish_art.py path/to/generation-records.json
Records contain id, source (local generated PNG), and prompt for each individual asset.
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def main():
    records = json.loads(Path(sys.argv[1]).read_text(encoding='utf-8'))
    masters = ROOT / 'docs' / 'art-direction' / 'masters'
    output = ROOT / 'pics' / 'art-v2'
    masters.mkdir(parents=True, exist_ok=True)
    output.mkdir(parents=True, exist_ok=True)
    report = []
    for record in records:
        key = record['id']
        if not key.isascii() or not all(ch.islower() or ch == '-' for ch in key):
            raise ValueError(f'Invalid asset id: {key}')
        master = masters / (key + '.png')
        if master.exists():
            raise FileExistsError(f'Preserve existing master: {master}')
        shutil.copy2(record['source'], master)
        with Image.open(master) as source:
            image = source.convert('RGBA')
            if image.getchannel('A').getextrema()[0] != 0:
                raise ValueError(f'{key} needs a genuinely transparent background')
            image.thumbnail((512, 512), Image.Resampling.LANCZOS)
            canvas = Image.new('RGBA', (512, 512))
            canvas.paste(image, ((512-image.width)//2, (512-image.height)//2))
            target = output / (key + '.webp')
            if target.exists():
                raise FileExistsError(f'Preserve existing export: {target}')
            canvas.save(target, 'WEBP', quality=85, alpha_quality=100, method=6, exact=True)
        report.append({'id': key, 'master': master.relative_to(ROOT).as_posix(),
                       'asset': target.relative_to(ROOT).as_posix(), 'bytes': target.stat().st_size,
                       'generator': 'built-in image_gen', 'prompt': record['prompt']})
    manifest = ROOT / 'docs' / 'art-direction' / 'spanish-sounds-assets.json'
    manifest.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f'Preserved {len(report)} masters; exported {len(report)} transparent 512px WebPs, {sum(r["bytes"] for r in report)/1024:.1f} KB total.')


if __name__ == '__main__':
    main()
