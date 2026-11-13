"""Record every graded Lithuanian text (graded-content-lt.js) with the project's configured Google voices.

Narration uses one voice; in dialogues each named speaker keeps their own voice. Lines are joined with short pauses
into one MP3 per item under audio/graded/, and graded-audio.js lists url + duration. Unchanged items are reused
(file name carries a hash of the text and voices), so running it again only records what is new or edited.
Run: python tools/build_graded_audio.py
"""
import hashlib, json, subprocess, sys, tempfile
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parent))
import make_audio as audio

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'audio' / 'graded'
MANIFEST = ROOT / 'graded-audio.js'
NARRATOR = 'Achernar'
SPEAKER_VOICES = ['Iapetus', 'Kore', 'Charon', 'Aoede', 'Orus', 'Despina']  # assigned in order of first appearance
PAUSE = 0.35  # seconds between lines


def items():
    src = "global.window=global;require('./graded-content-lt.js');console.log(JSON.stringify(window.WordamiGradedContent.items))"
    return json.loads(subprocess.check_output(['node', '-e', src], cwd=ROOT).decode('utf8'))


def plan(item):
    # an item may name a voice per speaker ({'Eglė': 'Kore'}) so women and men sound right; others are assigned in order
    voices, out = dict(item.get('voices') or {}), []
    for who, lt, _en in item['lines']:
        if not who: out.append((lt, NARRATOR)); continue
        if who not in voices: voices[who] = SPEAKER_VOICES[len(voices) % len(SPEAKER_VOICES)]
        out.append((lt, voices[who]))
    return out


def main():
    audio.LANG = 'lt'; audio.GOOGLE = audio.LANGS['lt'][0] + '-Chirp3-HD-'
    OUT.mkdir(parents=True, exist_ok=True)
    old = {}
    if MANIFEST.exists():
        text = MANIFEST.read_text(encoding='utf8'); old = json.loads(text[text.index('{'):text.rindex('}') + 1])
    manifest, jobs = {}, []
    for it in items():
        lines = plan(it)
        digest = hashlib.sha256(json.dumps(lines, ensure_ascii=False).encode()).hexdigest()[:12]
        target = OUT / f"{it['id']}.{digest}.mp3"
        if target.exists() and old.get(it['id'], {}).get('hash') == digest: manifest[it['id']] = old[it['id']]
        else: jobs.append((it['id'], lines, digest, target))
    key = audio.google_key() if jobs else None

    def record(job):
        iid, lines, digest, target = job
        chunks = []
        with tempfile.TemporaryDirectory() as tmp:
            for n, (text, voice) in enumerate(lines):
                f = str(Path(tmp) / f'{n}.mp3')
                for _ in range(3):
                    audio.synth(key, text, voice, f); pcm = audio.pcm(f)
                    if float(np.abs(np.frombuffer(pcm, dtype=np.int16).astype(np.float32)).mean()) >= 40: break
                else: raise RuntimeError(f'Quiet recording: {iid} line {n}')
                chunks.append(pcm); chunks.append(b'\x00\x00' * int(audio.RATE * PAUSE))
            raw = b''.join(chunks[:-1])
            subprocess.run([audio.FFMPEG, '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(audio.RATE), '-ac', '1', '-i', '-',
                            '-b:a', '64k', str(target)], input=raw, check=True)
        return iid, {'hash': digest, 'url': 'audio/graded/' + target.name, 'duration': round(len(raw) / 2 / audio.RATE, 2)}

    with ThreadPoolExecutor(max_workers=3) as pool:
        for iid, asset in pool.map(record, jobs): manifest[iid] = asset; print('recorded', iid, asset['duration'], 's')
    keep = {Path(a['url']).name for a in manifest.values()}
    for stale in OUT.glob('*.mp3'):
        if stale.name not in keep: stale.unlink()
    MANIFEST.write_text('/* Recordings for graded-content-lt.js, made by tools/build_graded_audio.py. */\nglobalThis.WordamiGradedAudio=' +
                        json.dumps(dict(sorted(manifest.items())), ensure_ascii=False) + ';\n', encoding='utf8')
    print(f'{len(manifest)} items, {len(jobs)} newly recorded')


if __name__ == '__main__':
    main()
