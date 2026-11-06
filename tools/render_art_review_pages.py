"""Render paginated contact sheets from actual production exports for human visual QA."""
import base64
import html
import json
import sys
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'docs/art-direction/review-pages'
if '--unreviewed' in sys.argv:
    OUT = OUT / 'unreviewed'


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    records = []
    review = ROOT / 'docs/art-direction/visual-review.json'
    approved = set(json.loads(review.read_text(encoding='utf-8'))['approved_ids']) if '--unreviewed' in sys.argv and review.exists() else set()
    for file in sorted((ROOT / 'docs/art-direction/lt-records').glob('*.json')):
        record = json.loads(file.read_text(encoding='utf-8'))
        if record.get('status') == 'exported' and record['id'] not in approved:
            records.append(record)
    page_index = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='chrome', headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 1500}, device_scale_factor=1)
        for start in range(0, len(records), 20):
            chunk = records[start:start+20]
            cards = []
            for record in chunk:
                uri = 'data:image/webp;base64,' + base64.b64encode((ROOT / record['asset']).read_bytes()).decode()
                label = record.get('word', record.get('name', record['id']))
                english = record.get('en', 'Conversation portrait')
                cards.append('<article><div class="images"><img src="'+uri+'"><img class="small" src="'+uri+'"></div><strong>'+html.escape(label)+'</strong><p>'+html.escape(english)+'</p><small>'+html.escape(record['id'])+'</small></article>')
            number = 1 + start // 20
            document = '<!doctype html><meta charset="utf-8"><style>*{box-sizing:border-box}body{margin:0;background:#F3F5F0;color:#14264E;font:14px system-ui;padding:24px}h1{font-size:24px;margin:0 0 18px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}article{padding:14px;background:white;border-radius:20px;min-height:236px}.images{height:150px;display:flex;align-items:center;gap:12px;justify-content:center}.images img{width:140px;height:140px;object-fit:contain}.images .small{width:56px;height:56px;background:#14264E;border-radius:8px}strong{display:block;margin-top:8px}p{margin:4px 0;font-size:12px;color:#5F6F66}small{font-size:10px;color:#708079}</style><h1>Gintaras · Lithuanian visual review · '+str(number)+'</h1><section class="grid">'+''.join(cards)+'</section>'
            page.set_content(document)
            page.locator('img').evaluate_all('(imgs)=>Promise.all(imgs.map(i=>i.decode()))')
            name = f'review-{number:03d}.png'
            page.screenshot(path=str(OUT / name), full_page=True)
            page_index.append({'page': name, 'asset_ids': [r['id'] for r in chunk]})
        browser.close()
    (OUT / 'index.json').write_text(json.dumps(page_index, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
    print(f'Rendered {len(records)} exports on {len(page_index)} review pages. Rendering does not mark them visually reviewed.')


if __name__ == '__main__':
    main()
