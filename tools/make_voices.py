"""Record the conversations with a different Google voice for every person in them, and update the audio map.

Everyone in a conversation has their own voice (CAST_GV in the language file, lang/lt.js), and your own lines are recorded in both a
man's and a woman's voice (ME_GV). Each voice gets one file per conversation, audio/<voice>_<conversation>.mp3,
holding only the lines that voice says (plus audio/<voice>_me2.mp3 for their lines that use your name or country).
Lessons use the two everyday voices made by make_audio.py.

Needs the Google key in ~/.claude/secrets/gintaras_tts_key.txt (restricted to Cloud Text-to-Speech).
Run:  .venv/Scripts/python tools/make_voices.py [language code, default lt]   (only records what changed; costs about $0.03 per 1,000 letters
      beyond Google's free allowance, so a full re-record of every conversation is well under a dollar)
"""
import json, os, sys, tempfile, wave

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from make_audio import course, pcm, write_smap, synth, google_key, FFMPEG, RATE, GAP, AUDIO  # noqa: E402
import subprocess

MANIFEST = os.path.join(AUDIO, 'voices_manifest.json')


def main():
    key = google_key()
    data = course()
    groups, smap, speakers = data['groups'], data['smap'], data['speakers']
    cast_gv, me_gv = data['castGv'], data['meGv']
    manifest = json.load(open(MANIFEST, encoding='utf8')) if os.path.exists(MANIFEST) else {}
    letters = 0
    with tempfile.TemporaryDirectory() as tmp:
        for g, entries in groups.items():
            if not (g.startswith('cv') or g == 'me2'):
                continue
            by_voice = {}
            for e in entries:
                # me2 holds conversation lines with your name or country in them: me2:<line id>~<what changed>
                who = speakers.get(e['id'][4:].split('~')[0] if g == 'me2' else e['id'])
                voices = list(me_gv.values()) if who == 'me' else [cast_gv[who]] if who in cast_gv else []
                for v in voices:
                    by_voice.setdefault(v, []).append(e)
            for v, es in by_voice.items():
                want = {e['id']: e['text'] for e in es}
                if manifest.get(f'{v}_{g}') == want and all(i in smap.get(v, {}).get(g, {}) for i in want):
                    continue
                print(f'Recording {g} in {v} ({len(es)} lines)...', flush=True)
                data_, seg, t = bytearray(), {}, 0.0
                gap = b'\x00\x00' * int(GAP * RATE)
                for k, e in enumerate(es):
                    f = os.path.join(tmp, f'{v}_{g}_{k}.mp3')
                    synth(key, e['text'], v, f)
                    letters += len(e['text'])
                    samples = pcm(f)
                    dur = len(samples) / 2 / RATE
                    seg[e['id']] = [round(t, 3), round(dur, 3)]
                    data_ += samples + gap
                    t += dur + GAP
                wav = os.path.join(tmp, f'{v}_{g}.wav')
                with wave.open(wav, 'wb') as w:
                    w.setnchannels(1); w.setsampwidth(2); w.setframerate(RATE); w.writeframes(bytes(data_))
                subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', wav, '-ac', '1', '-ar', str(RATE), '-b:a', '48k',
                                os.path.join(AUDIO, f'{v}_{g}.mp3')], check=True)
                smap.setdefault(v, {})[g] = seg
                manifest[f'{v}_{g}'] = want
                write_smap(smap)
                json.dump(manifest, open(MANIFEST, 'w', encoding='utf8'), ensure_ascii=False, indent=0, sort_keys=True)
    print(f'Done. {letters} letters sent to Google.')


if __name__ == '__main__':
    sys.exit(main())
