"""Record any Lithuanian that has no audio yet, in both voices, and update the audio map in index.html.

Each audio file holds one group (a unit like u20, or a conversation like cv3): every clip back to back
with a short gap, and SMAP stores where each clip starts and how long it is.

Setup once:   python -m venv .venv  &&  .venv/Scripts/pip install edge-tts imageio-ffmpeg
Run:          .venv/Scripts/python tools/make_audio.py
Needs Node (to read the course out of index.html) and an internet connection (for the voices).
"""
import asyncio, json, os, re, subprocess, sys, tempfile, wave

import edge_tts
import imageio_ffmpeg

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INDEX = os.path.join(ROOT, 'index.html')
AUDIO = os.path.join(ROOT, 'audio')
MANIFEST = os.path.join(AUDIO, 'manifest.json')
VOICES = {'ona': 'lt-LT-OnaNeural', 'leonas': 'lt-LT-LeonasNeural'}
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
        changed = known is not None and any(known.get(e['id']) != e['text'] for e in entries)
        if missing or changed:
            out.append(g)
        elif known is None:
            manifest[g] = {e['id']: e['text'] for e in entries}  # recorded before the manifest existed
    return out


async def tts_all(jobs):
    sem = asyncio.Semaphore(6)

    async def one(text, voice, dest):
        async with sem:
            for attempt in range(4):
                try:
                    await edge_tts.Communicate(text, voice).save(dest)
                    return
                except Exception:
                    if attempt == 3:
                        raise
                    await asyncio.sleep(2 * (attempt + 1))

    await asyncio.gather(*(one(*j) for j in jobs))


def pcm(path):
    """Decode a clip to raw 16-bit mono samples at RATE."""
    return subprocess.run([FFMPEG, '-v', 'error', '-i', path, '-f', 's16le', '-ac', '1', '-ar', str(RATE), '-'],
                          capture_output=True, check=True).stdout


def build_group(g, entries, tmp):
    jobs = []
    for v, voice in VOICES.items():
        for k, e in enumerate(entries):
            jobs.append((e['text'], voice, os.path.join(tmp, f'{v}_{g}_{k}.mp3')))
    asyncio.run(tts_all(jobs))
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
            write_smap(smap)
    json.dump(manifest, open(MANIFEST, 'w', encoding='utf8'), ensure_ascii=False, indent=0, sort_keys=True)
    print('Done.')


if __name__ == '__main__':
    sys.exit(main())
