"""Records single clips again and puts them back in their audio files, leaving every other clip's sound as it is.

A take is kept only when it is loud enough to hear (a short word can come back as a whisper, so it gets a few tries).

Run:  python tools/rerecord_clips.py leonas:u1b-1:0 ona:u9b-2:0
Needs the Google key in ~/.claude/secrets/gintaras_tts_key.txt; costs about $0.03 per 1,000 letters beyond Google's free allowance.
"""
import json, os, re, subprocess, sys, tempfile, wave

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from check_audio import QUIET, loudness, read_smap  # noqa: E402
from make_audio import AUDIO, FFMPEG, INDEX, RATE, VOICES, LANG, course, google_key, pcm, synth  # noqa: E402

sys.stdout.reconfigure(encoding='utf-8')
KEEP = max(QUIET, 40)  # the loudness a new take has to reach


def take(key, text, voice, folder):
    """The first take loud enough to keep, as raw samples, and the letters sent to Google. None when every try is quiet."""
    letters, f = 0, os.path.join(folder, 'take.mp3')
    variants=[text, text, text.rstrip('.!?') + '.', text.rstrip('.!?') + '!']
    if LANG == 'es':
        bare=text.strip('¿¡.!? ').capitalize()
        variants += [bare, '¡'+bare+'!']
        if bare.lower() in ('qué','quién','dónde','cuándo','cómo','cuánto','cuál') or text.startswith('¿'):
            variants.append('¿'+bare+'?')
    for words in variants:
        synth(key, words, VOICES.get(voice, voice), f)
        letters += len(words)
        raw = pcm(f)
        pc = np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768
        level = loudness(pc, 0, len(pc) / RATE)
        print(f'  "{words}" {len(pc) / RATE:.2f} s, loudness {level:.0f}', flush=True)
        if level >= KEEP:
            return raw, letters
    return None, letters


def main():
    want = [a.split(':', 1) for a in sys.argv[1:] if ':' in a]
    if not want:
        sys.exit(__doc__)
    texts = {e['id']: e['text'] for es in course()['groups'].values() for e in es}
    smap, key, letters, failed = read_smap(), google_key(), 0, []
    changed = {}
    with tempfile.TemporaryDirectory() as tmp:
        for voice, clip in want:
            group = next(g for g, c in smap[voice].items() if clip in c)
            print(f'{voice} {clip} ({texts[clip]})', flush=True)
            raw, used = take(key, texts[clip], voice, tmp)
            letters += used
            if raw is None:
                failed.append(f'{voice}:{clip}')
                continue
            changed.setdefault((voice, group), []).append((clip, raw))
        for (voice, group), takes in changed.items():
            path = os.path.join(AUDIO, f'{voice}_{group}.mp3')
            data, clips = pcm(path), smap[voice][group]
            # from the last clip back, so that the places of the ones still to do don't move
            for clip, raw in sorted(takes, key=lambda t: -clips[t[0]][0]):
                start, dur = clips[clip]
                a, b = int(start * RATE) * 2, int((start + dur) * RATE) * 2
                data = data[:a] + raw + data[b:]
                new = round(len(raw) / 2 / RATE, 3)
                for c in clips.values():
                    if c[0] > start:
                        c[0] = round(c[0] + new - dur, 3)
                clips[clip] = [start, new]
            wav = os.path.join(tmp, 'group.wav')
            with wave.open(wav, 'wb') as w:
                w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(data)
            subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', wav, '-ac', '1', '-ar', str(RATE), '-b:a', '48k', path], check=True)
    text = open(INDEX, encoding='utf8', newline='').read()
    line = 'const SMAP=' + json.dumps(smap, ensure_ascii=False, separators=(',', ':')) + ';'
    text, n = re.subn(r'^const SMAP=.*;(?=\r?$)', lambda m: line, text, count=1, flags=re.M)
    assert n == 1, 'SMAP line not found'
    open(INDEX, 'w', encoding='utf8', newline='').write(text)
    print(f'Done. {letters} letters sent to Google.' + (' Still quiet, kept as they were: ' + ' '.join(failed) if failed else ''))
    return 1 if failed else 0


if __name__ == '__main__':
    sys.exit(main())
