"""Draws the word pictures: every word in tools/art/art.js becomes pics/art/<name>.webp, 256 x 256.
Drawn at 4x and shrunk, so edges stay clean. Needs Chrome through Playwright, Pillow, and the local server for the course
(python -m http.server 8765 in the gintaras folder), which gives each word's file name and checks the word is in the course.
usage: python tools/make_art.py [--only "Labas,Ačiū"] [--out folder]
       python tools/make_art.py --check   (opens every picture in pics/art/ fully: fails on one that is damaged or the wrong size)"""
import argparse, io, json, os, sys
from playwright.sync_api import sync_playwright
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, 'tools', 'art', 'art.js')


def check(folder):
    bad = []
    names = sorted(os.listdir(folder)) if os.path.isdir(folder) else []
    for n in names:
        try:
            with Image.open(os.path.join(folder, n)) as im:
                im.load()
                if im.size != (256, 256): bad.append('%s is %d x %d' % (n, im.size[0], im.size[1]))
        except Exception as e:
            bad.append('%s can\'t be opened: %s' % (n, e))
    for x in bad: print('✗ ' + x)
    print('%d pictures opened, %d bad' % (len(names), len(bad)))
    return 1 if bad or not names else 0


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    ap = argparse.ArgumentParser()
    ap.add_argument('--only', default='')
    ap.add_argument('--out', default=os.path.join(ROOT, 'pics', 'art'))
    ap.add_argument('--check', action='store_true')
    a = ap.parse_args()
    if a.check: sys.exit(check(a.out))
    only = set(x.strip() for x in a.only.split(',') if x.strip())
    os.makedirs(a.out, exist_ok=True)
    src = open(ART, encoding='utf8').read().replace('const WORDS_ART=', 'var WORDS_ART=').replace('function artSvg', 'var artSvg=function')
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome')
        pg = b.new_context(viewport={'width': 300, 'height': 300}, device_scale_factor=4, service_workers='block').new_page()
        pg.goto('http://localhost:8765/'); pg.wait_for_function('window.Ava'); pg.wait_for_timeout(500)
        pg.evaluate("src=>{(0,eval)(src);}", src)
        words = pg.evaluate("()=>WORDS_ART.map((w,k)=>({k,lt:w.lt,name:artSlug(w.lt),known:ITEMS.some(i=>i.lt===w.lt)}))")
        bad = [w['lt'] for w in words if not w['known']]
        if bad: sys.exit('Not words in the course: ' + ', '.join(bad))
        sizes = {}
        for w in words:
            if only and w['lt'] not in only: continue
            svg = pg.evaluate("k=>artSvg(WORDS_ART[k])", w['k'])
            pg.evaluate("svg=>{document.body.innerHTML='<div id=\"a\" style=\"width:256px;height:256px\">'+svg+'</div>';document.body.style.cssText='margin:0;background:transparent';document.documentElement.style.background='transparent';}", svg)
            png = pg.locator('#a').screenshot(omit_background=True)
            im = Image.open(io.BytesIO(png)).convert('RGBA').resize((256, 256), Image.LANCZOS)
            al = im.getchannel('A'); flat = Image.new('RGB', im.size, 'white'); flat.paste(im.convert('RGB'), mask=al.point(lambda v: 255 if v else 0)); flat.putalpha(al)  # see-through pixels are white, not black, for viewers that ignore transparency
            path = os.path.join(a.out, w['name'] + '.webp')
            flat.save(path, 'WEBP', quality=66, alpha_quality=80, method=6, exact=True)
            sizes[w['lt']] = os.path.getsize(path)
        b.close()
    tot = sum(sizes.values())
    print('%d pictures, %.1f KB in all, %.1f KB each on average, %.1f KB the largest' % (len(sizes), tot / 1024, tot / 1024 / max(1, len(sizes)), max(sizes.values() or [0]) / 1024))
    print(json.dumps(sorted(sizes, key=sizes.get, reverse=True)[:5], ensure_ascii=False))


if __name__ == '__main__':
    main()
