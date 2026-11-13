"""Make pictures with an AI image model on fal.ai, straight over the internet (no Unity needed), into art_pilot/ai/.

Nothing here touches the app: the pictures stay in art_pilot/ (git-excluded) until a style is chosen. The model, style
prompts, cast descriptions and word lists all live in tools/pictures.json.

Setup once:   python -m venv .venv  &&  .venv/Scripts/pip install pillow
See the plan: .venv/Scripts/python tools/make_pictures.py                 (spends nothing, doesn't read the key)
Spend:        .venv/Scripts/python tools/make_pictures.py --go --max 5
Options:      --job pilot   --unit u3   --only 01,09_flat   --style flat,story   --tries 2   --show-prompts

Needs the fal key in ~/.claude/secrets/fal_key.txt. Each picture is one try (01_flat_t1); --tries 2 adds a second try of
the ones it's given, and a picture already on disk is never made again.

Money: fal doesn't report what a request cost, so art_pilot/ai/ledger.jsonl counts it: each try is written down at the
model's listed price BEFORE it is sent, and only taken off if fal plainly refused it. So the total can run high, never
low. The ledger also keeps every prompt, setting and seed, and it is the budget across all runs: don't delete it.
"""
import argparse, io, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from datetime import datetime, timezone

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'tools', 'pictures.json')
OUT = os.path.join(ROOT, 'art_pilot', 'ai')
KEY_FILE = os.path.expanduser(os.path.join('~', '.claude', 'secrets', 'fal_key.txt'))
API_HOST = 'queue.fal.run'
PROMPT_MAX = 1000
GIVE_UP_AFTER = 2  # failed paid attempts at one picture before leaving it alone (a new --tries number starts afresh)
STOP_AFTER_FAILS = 3  # failures in a row before the whole run stops
POLL = 2
WAIT = 300
KEY = None


class Stop(Exception):
    """Stop the run with a plain message. Anything in flight is in the ledger, and the next run picks it up free."""


def ledger_path():
    return os.path.join(OUT, 'ledger.jsonl')


def read_key():
    if not os.path.exists(KEY_FILE):
        sys.exit('No fal key yet. Save it, on its own, in this file:\n  ' + KEY_FILE)
    key = open(KEY_FILE, encoding='utf-8').read().strip()
    if not key:
        sys.exit('The fal key file is empty:\n  ' + KEY_FILE)
    return key


def scrub(text):
    text = str(text)
    return text.replace(KEY, '[key]') if KEY else text


class NoRedirect(urllib.request.HTTPRedirectHandler):
    """A redirect would carry the key along to wherever it points."""
    def redirect_request(self, *a, **k):
        return None


NOREDIRECT = urllib.request.build_opener(NoRedirect)


def api(method, url, body=None):
    """A call that carries the key: only ever to fal's API address, whatever a response says."""
    u = urllib.parse.urlsplit(url)
    if u.scheme != 'https' or u.hostname != API_HOST:
        raise Stop('fal pointed somewhere unexpected, so the key was not sent: ' + scrub(url)[:200])
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode('utf8') if body is not None else None,
                                 headers={'Authorization': 'Key ' + KEY, 'Content-Type': 'application/json',
                                          'Accept': 'application/json', 'User-Agent': 'gintaras-make-pictures'})
    with NOREDIRECT.open(req, timeout=60) as r:
        return json.loads(r.read().decode('utf8'))


def fetch(url):
    """The finished picture: no key on this one, it lives on a file host."""
    if urllib.parse.urlsplit(url).scheme != 'https':
        raise ValueError('not https')
    req = urllib.request.Request(url, headers={'User-Agent': 'gintaras-make-pictures'})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read(30_000_001)
    if len(data) > 30_000_000:
        raise ValueError('over 30 MB')
    return data


def error_text(e):
    try:
        return scrub(e.read().decode('utf8', 'replace'))[:300]
    except Exception:
        return ''


class Ledger:
    def __init__(self):
        self.rows = []
        if os.path.exists(ledger_path()):
            for n, line in enumerate(open(ledger_path(), encoding='utf8'), 1):
                try:
                    self.rows.append(json.loads(line))
                except ValueError:
                    sys.exit('Line %d of the ledger is damaged, so the spending total can\'t be trusted. Stopping before '
                             'any money moves:\n  %s' % (n, ledger_path()))

    def add(self, ev, pic, **kw):
        row = {'ev': ev, 'pic': pic, 'at': datetime.now(timezone.utc).isoformat(timespec='seconds'), **kw}
        with open(ledger_path(), 'a', encoding='utf8') as f:
            f.write(json.dumps(row, ensure_ascii=False) + '\n')
            f.flush()
            os.fsync(f.fileno())
        self.rows.append(row)

    def spent(self):
        return round(sum(r['cost'] if r['ev'] == 'reserve' else -r['cost'] if r['ev'] == 'refused' else 0 for r in self.rows), 6)

    def state(self):
        """(tries with no outcome yet, failed paid attempts per picture)"""
        pending, fails = {}, {}
        for r in self.rows:
            if r['ev'] == 'reserve':
                pending[r['pic']] = {}
            elif r['ev'] == 'submitted':
                pending[r['pic']] = r
            elif r['ev'] in ('done', 'failed', 'refused'):
                pending.pop(r['pic'], None)
                if r['ev'] == 'failed':
                    fails[r['pic']] = fails.get(r['pic'], 0) + 1
        return pending, fails


def hex_rgb(c):
    return {'r': int(c[1:3], 16), 'g': int(c[3:5], 16), 'b': int(c[5:7], 16)}


def build_prompt(data, entry, style):
    subject = entry['subject']
    for name, look in data['cast'].items():
        subject = subject.replace('{' + name + '}', look)  # descriptions, not names: a name in the prompt invites lettering
    left = re.search(r'\{[^}]*\}', subject)
    if left:
        sys.exit('%s: no cast description for %s' % (entry['id'], left.group(0)))
    prompt = '%s Picture: %s. %s' % (data['styles'][style]['prompt'], subject, data['no_text'])
    if len(prompt) > PROMPT_MAX:
        sys.exit('%s_%s: the prompt is %d letters (limit %d)' % (entry['id'], style, len(prompt), PROMPT_MAX))
    return prompt


def plan(data, args):
    """Every picture asked for, in order, with exactly what would be sent for it."""
    model = data['model']
    if args.job not in data['jobs']:
        sys.exit('No job called "%s" in %s' % (args.job, DATA))
    styles = args.style.split(',') if args.style else list(data['styles'])
    for s in styles:
        if s not in data['styles']:
            sys.exit('No style called "%s". There are: %s' % (s, ', '.join(data['styles'])))
        if data['styles'][s]['params'].get('style', '').startswith('vector_illustration'):
            sys.exit('Style "%s" uses a vector preset, which costs double what the budget counts.' % s)
    only = args.only.split(',') if args.only else None
    pics = []
    for e in data['jobs'][args.job]:
        if not re.fullmatch(r'[\w.-]+', e['id']):
            sys.exit('Bad picture id: ' + e['id'])
        if args.unit and e.get('unit') != args.unit:
            continue
        for s in styles:
            for t in range(1, args.tries + 1):
                name = '%s_%s_t%d' % (e['id'], s, t)
                if only and not any(name == o or name.startswith(o + '_') for o in only):
                    continue
                params = dict(model['params'], **data['styles'][s]['params'])
                params['colors'] = [hex_rgb(c) for c in params.get('colors', [])]
                body = dict(params, prompt=build_prompt(data, e, s))
                seed = None
                if model.get('seed_param'):
                    seed = data['seed'] + t - 1  # the same picture again comes out the same; a new try differs
                    body[model['seed_param']] = seed
                pics.append({'name': name, 'id': e['id'], 'style': s, 'try': t, 'lt': e['lt'], 'body': body, 'seed': seed})
    return pics


def webp_path(name):
    return os.path.join(OUT, name + '.webp')


def to_webp(raw, size):
    """(the small square WebP, the original's file type)"""
    from PIL import Image
    im = Image.open(io.BytesIO(raw))
    im.load()
    kind = (im.format or 'img').lower()
    im = im.convert('RGBA')
    flat = Image.new('RGBA', im.size, 'white')
    flat.alpha_composite(im)
    w, h = flat.size
    side = min(w, h)
    flat = flat.convert('RGB').crop(((w - side) // 2, (h - side) // 2, (w + side) // 2, (h + side) // 2)).resize((size, size), Image.LANCZOS)
    buf = io.BytesIO()
    flat.save(buf, 'WEBP', quality=82, method=6)
    return buf.getvalue(), kind


def finish(led, name, sub, size):
    """A request fal has accepted (and so has been paid for): wait for it and save it. If the wait, or the download, runs
    out, it stays in the ledger as in flight and the next run collects it without paying again. True if saved."""
    deadline = time.time() + WAIT
    while True:
        try:
            s = api('GET', sub['status_url'])
            if s.get('status') == 'COMPLETED':
                if s.get('error'):
                    led.add('failed', name, reason=scrub(s.get('error'))[:300])
                    return False
                break
        except urllib.error.HTTPError as e:
            if e.code < 500 and e.code != 429:
                led.add('failed', name, reason='status %d: %s' % (e.code, error_text(e)))
                return False
        except (urllib.error.URLError, OSError, ValueError):
            pass
        if time.time() > deadline:
            raise Stop('fal is still working on %s. Run this again later: it picks up there without paying twice.' % name)
        time.sleep(POLL)
    url = None
    for wait in (2, 10, 30, None):
        try:
            res = api('GET', sub['response_url'])
            url = res['images'][0]['url']
            raw = fetch(url)
            break
        except urllib.error.HTTPError as e:
            if url is None and e.code < 500 and e.code != 429:  # the result itself came back as an error
                led.add('failed', name, reason='result %d: %s' % (e.code, error_text(e)))
                return False
        except (KeyError, IndexError, TypeError) as e:
            led.add('failed', name, reason='no picture in the answer: ' + scrub(repr(e))[:200])
            return False
        except (urllib.error.URLError, OSError, ValueError):
            pass
        if wait is None:
            raise Stop('Couldn\'t download %s. Run this again later: it picks up there without paying twice.' % name)
        time.sleep(wait)
    try:
        small, kind = to_webp(raw, size)
    except Exception as e:  # not a picture we can read
        led.add('failed', name, reason='unreadable picture: ' + scrub(repr(e))[:200], image_url=url)
        return False
    orig = os.path.join(OUT, 'orig', name + '.' + kind)
    os.makedirs(os.path.dirname(orig), exist_ok=True)
    with open(orig, 'wb') as f:
        f.write(raw)
    tmp = webp_path(name) + '.tmp'
    with open(tmp, 'wb') as f:
        f.write(small)
    os.replace(tmp, webp_path(name))
    led.add('done', name, file=os.path.basename(webp_path(name)), image_url=url, kb=round(len(small) / 1024, 1))
    return True


def make(led, pic, model, size):
    """Send one try and see it through. True if saved, False if this attempt failed."""
    name, price = pic['name'], model['price_per_image']
    for pause in (5, 20, None):
        led.add('reserve', name, cost=price, id=pic['id'], style=pic['style'], attempt_try=pic['try'], lt=pic['lt'],
                model=model['endpoint'], seed=pic['seed'], request=pic['body'])
        try:
            sub = api('POST', 'https://' + API_HOST + '/' + model['endpoint'], pic['body'])
        except urllib.error.HTTPError as e:
            why = error_text(e)
            if e.code == 429:
                led.add('refused', name, cost=price, reason='too busy')
                if pause is None:
                    raise Stop('fal keeps saying it\'s too busy. Nothing more was spent; try again later.')
                time.sleep(pause)
                continue
            if e.code in (401, 403):
                led.add('refused', name, cost=price, reason='%d: %s' % (e.code, why))
                raise Stop('fal turned the request down: the key is wrong, or the account is out of credit.\nfal said: ' + why)
            if e.code < 500:
                led.add('refused', name, cost=price, reason='%d: %s' % (e.code, why))
                raise Stop('fal rejected the request as sent, so it would reject the others too.\nfal said: ' + why)
            led.add('failed', name, reason='%d: %s' % (e.code, why))  # it might have started: stays counted
            return False
        except (urllib.error.URLError, OSError, ValueError) as e:
            led.add('failed', name, reason='no clear answer: ' + scrub(repr(e))[:200])  # the same
            return False
        if not (isinstance(sub, dict) and sub.get('status_url') and sub.get('response_url')):
            led.add('failed', name, reason='odd answer: ' + scrub(sub)[:200])
            return False
        led.add('submitted', name, request_id=sub.get('request_id'), status_url=sub['status_url'], response_url=sub['response_url'])
        return finish(led, name, sub, size)


def show_plan(data, args, pics, led):
    pending, fails = led.state()
    price, spent = data['model']['price_per_image'], led.spent()
    todo = [p for p in pics if not os.path.exists(webp_path(p['name'])) and p['name'] not in pending and fails.get(p['name'], 0) < GIVE_UP_AFTER]
    room = int(round(max(args.max - spent, 0) / price, 6))
    print('Model:    %s  (%s), $%.2f a picture, price checked %s' % (data['model']['name'], data['model']['endpoint'], price, data['model']['price_checked']))
    print('Terms:    ' + '  '.join(data['model']['terms']))
    print('Seed:     ' + ('%d' % data['seed'] if data['model'].get('seed_param') else 'this model has no seed setting: the ledger keeps the prompt and settings, and the originals are kept'))
    print('Key file: %s  (%s)' % (KEY_FILE, 'there' if os.path.exists(KEY_FILE) else 'not there yet'))
    print('Asked for %d pictures: %d to make, %d already made, %d in flight (free to collect), %d given up on' % (
        len(pics), len(todo), sum(os.path.exists(webp_path(p['name'])) for p in pics), sum(p['name'] in pending for p in pics),
        sum(fails.get(p['name'], 0) >= GIVE_UP_AFTER and not os.path.exists(webp_path(p['name'])) for p in pics)))
    for p in todo:
        print('  %-18s %s' % (p['name'], p['lt']))
        if args.show_prompts:
            print('      seed %s  %s' % (p['seed'], json.dumps(p['body'], ensure_ascii=False)))
    cost = len(todo) * price
    print('Would cost about $%.2f. Spent so far: $%.2f. Budget: $%.2f.' % (cost, spent, args.max))
    if len(todo) > room:
        print('Over budget: it would stop after %d of these (a failed try costs one too).' % room)
    else:
        print('Fits the budget, with room for %d failed or extra tries.' % (room - len(todo)))


def run(data, args, pics, led):
    pending, fails = led.state()
    model, size, price = data['model'], data['out_size'], data['model']['price_per_image']
    for name, sub in pending.items():
        if sub.get('status_url'):
            print('Collecting %s (already paid for)...' % name, flush=True)
            finish(led, name, sub, size)
        else:
            led.add('failed', name, reason='the last run ended before fal answered')  # stays counted
    pending, fails = led.state()
    made = bad = in_a_row = 0
    for n, pic in enumerate(pics, 1):
        name = pic['name']
        if os.path.exists(webp_path(name)):
            continue
        if fails.get(name, 0) >= GIVE_UP_AFTER:
            print('[%d/%d] %s: failed %d times, leaving it. A new try number (--tries) starts afresh.' % (n, len(pics), name, fails[name]))
            continue
        while fails.get(name, 0) < GIVE_UP_AFTER:
            if led.spent() + price > args.max + 1e-9:
                raise Stop('Stopped before the budget: $%.2f spent, and the next picture would go over $%.2f.' % (led.spent(), args.max))
            print('[%d/%d] %s (%s)... ' % (n, len(pics), name, pic['lt']), end='', flush=True)
            if make(led, pic, model, size):
                print('saved. About $%.2f of $%.2f spent.' % (led.spent(), args.max), flush=True)
                made += 1
                in_a_row = 0
                break
            fails[name] = fails.get(name, 0) + 1
            bad += 1
            in_a_row += 1
            print('failed: %s' % led.rows[-1].get('reason', '')[:200], flush=True)
            if in_a_row >= STOP_AFTER_FAILS:
                raise Stop('%d failures in a row, so stopping rather than spending more. The reasons are in %s' % (in_a_row, ledger_path()))
    print('Finished: %d made, %d failed attempts. About $%.2f of $%.2f spent (fal\'s own usage page has the real figure).' % (made, bad, led.spent(), args.max))


def main(argv=None):
    global KEY
    ap = argparse.ArgumentParser(description='Make pictures on fal.ai into art_pilot/ai/. Without --go it only shows the plan.')
    ap.add_argument('--go', action='store_true', help='really make them (this spends money)')
    ap.add_argument('--dry-run', action='store_true', help='only show the plan (the default)')
    ap.add_argument('--max', type=float, default=5.0, help='the most to spend in all, counted across every run (default 5)')
    ap.add_argument('--job', default='pilot')
    ap.add_argument('--unit', help='only this unit, like u3')
    ap.add_argument('--only', help='only these, like 01,09_flat,12_story_t2')
    ap.add_argument('--style', help='only these styles, like flat,story')
    ap.add_argument('--tries', type=int, default=1, help='tries of each picture (default 1)')
    ap.add_argument('--show-prompts', action='store_true')
    args = ap.parse_args(argv)
    if args.go and args.dry_run:
        sys.exit('--go and --dry-run contradict each other.')
    data = json.load(open(DATA, encoding='utf8'))
    pics = plan(data, args)
    if not pics:
        sys.exit('Nothing matches that.')
    led = Ledger()
    if not args.go:
        show_plan(data, args, pics, led)
        print('\nA plan only: nothing was sent and nothing was spent. Add --go to make them.')
        return
    try:
        from PIL import Image  # before any money moves
    except ImportError:
        sys.exit('Pillow is missing: .venv/Scripts/pip install pillow')
    KEY = read_key()
    os.makedirs(OUT, exist_ok=True)
    lock = os.path.join(OUT, '.running')
    try:
        os.close(os.open(lock, os.O_CREAT | os.O_EXCL))
    except FileExistsError:
        sys.exit('Another run seems to be going (two at once could overspend). If not, delete this file:\n  ' + lock)
    try:
        run(data, args, pics, led)
    except Stop as e:
        print('\n' + scrub(e))
        sys.exit(1)
    finally:
        os.remove(lock)


if __name__ == '__main__':
    sys.stdout.reconfigure(encoding='utf-8')
    main()
