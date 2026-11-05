"""Listens to every clip in the audio map and fails on one that is silent or nearly so.

Google's voices sometimes return a whisper for a very short word ("Taip", "Tu"). The file and the map both look fine, so
nothing else catches it; a learner just hears nothing. Fix one with tools/rerecord_clips.py.

Run:  python tools/check_audio.py [language code, default lt]
"""
import json, os, re, subprocess, sys

import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_audio import AUDIO, FFMPEG, INDEX, RATE  # noqa: E402

QUIET = 20  # loudness of a clip out of 1000; the course's middle clip is about 110


def read_smap():
    text = open(INDEX, encoding='utf8', newline='').read()
    return json.loads(re.search(r'^const SMAP=(.*);\r?$', text, re.M).group(1))


def samples(voice, group):
    raw = subprocess.run([FFMPEG, '-v', 'error', '-i', os.path.join(AUDIO, f'{voice}_{group}.mp3'), '-f', 's16le', '-ac', '1',
                          '-ar', str(RATE), '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, dtype=np.int16).astype(np.float64) / 32768


def loudness(pcm, start, dur):
    bit = pcm[int(start * RATE):int((start + dur) * RATE)]
    return float(np.sqrt(np.mean(bit ** 2)) * 1000) if bit.size else 0.0


def main():
    smap, bad, n = read_smap(), [], 0
    for voice, groups in smap.items():
        for group, clips in groups.items():
            pcm = samples(voice, group)
            for clip, (start, dur) in clips.items():
                n += 1
                if loudness(pcm, start, dur) < QUIET:
                    bad.append(f'{voice}:{clip}')
    if bad:
        print(f'FAILED: {len(bad)} of {n} clips are too quiet to hear: ' + ' '.join(bad))
        return 1
    print(f'Audio ok: {n} clips, none too quiet to hear.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
