"""Record any Lithuanian that has no audio yet, in both voices, and update the audio map in lang/lt.js.

Each audio file holds one group (a unit like u20, or a conversation like cv3): every clip back to back
with a short gap, and SMAP stores where each clip starts and how long it is.

The voices are Google's natural Lithuanian voices (Chirp 3 HD). The two everyday voices keep their old names in the
app ('ona' = the woman's voice, 'leonas' = the man's) so everyone's saved choice carries over; VOICES says which Google
voice each one is. Changing a voice here re-records everything in it. Conversations are recorded by make_voices.py.

Setup once:   python -m venv .venv  &&  .venv/Scripts/pip install imageio-ffmpeg
Run:          .venv/Scripts/python tools/make_audio.py
Needs Node (to read the course out of lang/lt.js), an internet connection, and the Google key in
~/.claude/secrets/gintaras_tts_key.txt (restricted to Cloud Text-to-Speech). Cost: about $0.03 per 1,000 letters
beyond Google's free monthly allowance; the whole course is about 30,000 letters.
"""
import base64, json, os, re, subprocess, sys, tempfile, time, urllib.error, urllib.request, wave
from concurrent.futures import ThreadPoolExecutor

import imageio_ffmpeg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, 'lang', 'lt.js')  # the language file holding the course and its audio map (SMAP)
AUDIO = os.path.join(ROOT, 'audio')
MANIFEST = os.path.join(AUDIO, 'manifest.json')
VOICES = {'ona': 'Achernar', 'leonas': 'Iapetus'}
GOOGLE = 'lt-LT-Chirp3-HD-'
KEY_FILE = os.path.expanduser(os.path.join('~', '.claude', 'secrets', 'gintaras_tts_key.txt'))
RATE = 24000
GAP = 0.35
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()


def course():
    raw = subprocess.run(['node', os.path.join(ROOT, 'tools', 'audio_list.js'), INDEX],
                         capture_output=True, check=True).stdout
    return json.loads(raw.decode('utf8'))


def stale_groups(groups, smap, manifest):
    """A group needs recording if any clip is missing, or its text changed since it was last recorded."""
    out = []
    for g, entries in groups.items():
        missing = any(e['id'] not in smap.get(v, {}).get(g, {}) for v in VOICES for e in entries)
        known = manifest.get(g)
        changed = known is not None and (manifest.get('_voices', {}).get(g) != VOICES or any(known.get(e['id']) != e['text'] for e in entries))
        if missing or changed:
            out.append(g)
        elif known is None:
            manifest[g] = {e['id']: e['text'] for e in entries}  # recorded before the manifest existed
    return out


def google_key():
    if not os.path.exists(KEY_FILE):
        sys.exit('No Google key file: ' + KEY_FILE)
    return open(KEY_FILE, encoding='utf-8').read().strip()


def synth(key, text, voice, dest):
    """One clip from Google. voice is a Chirp 3 HD name like 'Kore'."""
    body = {'input': {'text': text}, 'voice': {'languageCode': 'lt-LT', 'name': GOOGLE + voice[:1].upper() + voice[1:]},
            'audioConfig': {'audioEncoding': 'MP3'}}
    req = urllib.request.Request('https://texttospeech.googleapis.com/v1/text:synthesize?key=' + key,
                                 data=json.dumps(body).encode(), headers={'Content-Type': 'application/json'})
    for attempt in range(8):
        try:
            res = json.load(urllib.request.urlopen(req, timeout=60))
            open(dest, 'wb').write(base64.b64decode(res['audioContent']))
            return
        except urllib.error.HTTPError as e:
            if attempt == 7 or e.code < 500 and e.code != 429:
                sys.exit(f'Google said {e.code}: ' + e.read().decode()[:300])
            time.sleep(15 * (attempt + 1))  # 429: Google's per-minute limit; wait and try again
        except OSError:
            if attempt == 7:
                raise
            time.sleep(5)


def tts_all(jobs):
    key = google_key()
    with ThreadPoolExecutor(3) as ex:
        list(ex.map(lambda j: synth(key, *j), jobs))


def pcm(path):
    """Decode a clip to raw 16-bit mono samples at RATE."""
    return subprocess.run([FFMPEG, '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(RATE), '-'],
                          capture_output=True, check=True).stdout


def build_group(g, entries, tmp):
    jobs = []
    for v, voice in VOICES.items():
        for k, e in enumerate(entries):
            jobs.append((e['text'], voice, os.path.join(tmp, f'{v}_{g}_{k}.mp3')))
    tts_all(jobs)
    maps = {}
    gap = b'\x00\x00' * int(GAP * RATE)
    for v in VOICES:
        data, seg, t = bytearray(), {}, 0.0
        for k, e in enumerate(entries):
            samples = pcm(os.path.join(tmp, f'{v}_{g}_{k}.mp3'))
            dur = len(samples) / 2 / RATE
            seg[e['id']] = [round(t, 3), round(dur, 3)]
            data += samples + gap
            t += dur + GAP
        wav = os.path.join(tmp, f'{v}_{g}.wav')
        with wave.open(wav, 'wb') as w:
            w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(bytes(data))
        subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', wav, '-ac', '1', '-ar', str(RATE), '-b:a', '48k',
                        os.path.join(AUDIO, f'{v}_{g}.mp3')], check=True)
        maps[v] = seg
    return maps


def write_smap(smap):
    html = open(INDEX, encoding='utf8').read()
    line = 'const SMAP=' + json.dumps(smap, ensure_ascii=False, separators=(',', ':')) + ';'
    html, n = re.subn(r'^const SMAP=.*;$', lambda m: line, html, count=1, flags=re.M)
    assert n == 1, 'SMAP line not found'
    open(INDEX, 'w', encoding='utf8', newline='').write(html)


def main():
    data = course()
    groups, smap = data['groups'], data['smap']
    manifest = json.load(open(MANIFEST, encoding='utf8')) if os.path.exists(MANIFEST) else {}
    todo = stale_groups(groups, smap, manifest)
    for v in VOICES:
        smap.setdefault(v, {})
    if not todo:
        print('All audio is up to date.')
    with tempfile.TemporaryDirectory() as tmp:
        for g in todo:
            print(f'Recording {g} ({len(groups[g])} clips x {len(VOICES)} voices)...', flush=True)
            maps = build_group(g, groups[g], tmp)
            for v, seg in maps.items():
                smap[v][g] = seg
            manifest[g] = {e['id']: e['text'] for e in groups[g]}
            manifest.setdefault('_voices', {})[g] = VOICES
            json.dump(manifest, open(MANIFEST, 'w', encoding='utf8'), ensure_ascii=False, indent=0, sort_keys=True)
            write_smap(smap)
    json.dump(manifest, open(MANIFEST, 'w', encoding='utf8'), ensure_ascii=False, indent=0, sort_keys=True)
    print('Done.')


if __name__ == '__main__':
    sys.exit(main())
