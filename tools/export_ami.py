"""Export approved generated Ami masters without altering their artwork."""
from pathlib import Path
import json
import shutil
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
DOCS = ROOT / 'docs/wordami'
POSES = ['welcome', 'happy', 'cheer', 'think', 'rest', 'encourage', 'listen', 'speak']

def main():
    records = json.loads((DOCS / 'assets.json').read_text(encoding='utf-8'))
    for record in records:
        master = ROOT / record['master']
        if not master.exists():
            shutil.copy2(record['source_generated'], master)
        with Image.open(master) as im:
            im.load()
            if record['id'] == 'app-icon':
                assert im.width == im.height, 'App icon must be square'
                for size in [180, 192, 512]:
                    im.convert('RGB').resize((size, size), Image.Resampling.LANCZOS).save(ROOT / f'wordami-icon-{size}.png', optimize=True)
                for size in [192, 512]:
                    im.convert('RGB').resize((size, size), Image.Resampling.LANCZOS).save(ROOT / f'wordami-icon-maskable-{size}.png', optimize=True)
                record['exports'] = ['wordami-icon-180.png', 'wordami-icon-192.png', 'wordami-icon-512.png', 'wordami-icon-maskable-192.png', 'wordami-icon-maskable-512.png']
            else:
                assert record['id'] in POSES
                assert im.mode == 'RGBA' and im.getchannel('A').getextrema()[0] == 0, f'{master} must have real transparency'
                target = ROOT / 'pics/ami' / (record['id'] + '.webp')
                # Retain the generator's complete square canvas, including the clear gesture margins.
                assert im.width == im.height, f'{master} must be square'
                im.resize((512, 512), Image.Resampling.LANCZOS).save(target, 'WEBP', quality=85, alpha_quality=100, method=6, exact=True)
                record['asset'] = target.relative_to(ROOT).as_posix()
                record['bytes'] = target.stat().st_size
    (DOCS / 'assets.json').write_text(json.dumps(records, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    cards = ''.join(f'<article><h2>{pose.title()}</h2><div class="full"><img src="../../pics/ami/{pose}.webp" alt="Ami: {pose}"></div><div class="sizes"><div><img src="../../pics/ami/{pose}.webp" width="56" height="56" alt=""><small>56px · light</small></div><div class="dark"><img src="../../pics/ami/{pose}.webp" width="56" height="56" alt=""><small>56px · dark</small></div></div></article>' for pose in POSES)
    (DOCS / 'gallery.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Wordami · Meet Ami</title><style>*{box-sizing:border-box}body{margin:0;padding:28px;background:#f3f5f0;color:#14264e;font:16px system-ui,sans-serif}h1{margin:0;font-size:36px}header p{margin:8px 0 24px}main{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;max-width:1400px;margin:auto}article{background:white;border-radius:20px;overflow:hidden;border:1px solid #d5ddd3}h2{font-size:17px;padding:14px 16px;margin:0}.full{height:220px;padding:12px;display:grid;place-items:center}.full img{display:block;width:196px;height:196px;max-width:100%;object-fit:contain}.sizes{display:grid;grid-template-columns:1fr 1fr}.sizes>div{display:grid;justify-items:center;padding:12px;gap:7px}.dark{background:#14264e;color:white}small{font-size:11px}header{max-width:1400px;margin:auto}@media(max-width:700px){body{padding:16px}main{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.full{height:160px}.full img{width:136px;height:136px}.sizes{grid-template-columns:1fr}.sizes>div{padding:8px}h1{font-size:28px}}</style><header><h1>Meet Ami</h1><p>Wordami's language buddy · eight interaction poses</p></header><main>'''+cards+'</main></html>', encoding='utf-8')
    (DOCS / 'sharing-card.html').write_text('''<!doctype html><html lang="en"><meta charset="utf-8"><title>Wordami sharing card</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&display=swap"><style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#14264e;color:#fff8ec;display:flex;align-items:center;padding:70px;font-family:Fredoka,system-ui,sans-serif}.copy{width:650px;position:relative;z-index:1}small{font-size:25px;color:#55d8ce}h1{font-size:112px;font-weight:600;line-height:1.05;margin:16px 0 25px;letter-spacing:-3px}p{font-size:32px;line-height:1.45;margin:0}img{width:460px;height:460px;object-fit:contain;margin-left:-25px}b{color:#ffb900;font-weight:500}</style><div class="copy"><small>LEARN LANGUAGES WITH AMI</small><h1>Wordami</h1><p>Little lessons.<br><b>Real conversations.</b></p></div><img src="../../pics/ami/welcome.webp" alt="Ami waving"></html>''', encoding='utf-8')
    print(json.dumps({'poses': len(POSES), 'webp_bytes': sum(r.get('bytes',0) for r in records), 'app_icon_sizes': [180,192,512]}))

if __name__ == '__main__':
    main()
