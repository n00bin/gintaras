# Gintaras — Learn Lithuanian

A bite-size Lithuanian course for complete beginners, from first sounds to a real conversation. One HTML file, real Lithuanian audio, plain-English pronunciation, spaced review, streaks, levels, badges, and an optional online leaderboard.

Live: https://n00bin.github.io/gintaras/

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app: course content, exercises, review scheduler, progress, UI |
| `cloud.js` | Sign-in, progress sync and leaderboard (Supabase). Does nothing until `config.js` is filled in |
| `config.js` | Your Supabase URL and public key |
| `audio/` | Lithuanian audio, one file per unit or conversation per voice (Ona, Leonas) |
| `tools/` | The audio recorder (`make_audio.py`) and the script it uses to read the course |
| `supabase/schema.sql` | The two database tables and their access rules |
| `manifest.json`, `icon-*.png` | Lets phones install it to the home screen |

Progress is saved in the browser. With an account it also syncs to the cloud, so it follows you across devices.

## Turning on accounts and the leaderboard (about 10 minutes)

1. Go to https://supabase.com and create a free project. Pick any name and a strong database password (you won't need it again).
2. In the project, open **SQL Editor → New query**, paste the contents of `supabase/schema.sql`, and click **Run**.
3. Open **Project Settings → API**. Copy the **Project URL** and the **anon public** key into `config.js`. Commit and push.
4. **Authentication → URL Configuration**: set *Site URL* to `https://n00bin.github.io/gintaras/` and add the same to *Redirect URLs*.
5. Email + password works immediately. To skip email confirmation (simpler for friends): **Authentication → Providers → Email**, turn off *Confirm email*.
6. Google sign-in (optional): **Authentication → Providers → Google** and follow Supabase's link to create a Google OAuth client. Paste the client ID and secret. Supabase shows you the redirect URL to give Google.

That's it. The Profile tab shows a sign-in card and the Board tab fills up as people play.

## How the course is laid out

Seven parts, 26 units and 10 conversations, in teaching order: sounds first, then hello and talking about yourself, then food, getting around, plans, people, travel, and extra words. Every couple of units there is a conversation that uses only words from before it. Each one can be done as a text chat (pick the right reply) or out loud (say your part; browsers that can listen check it with the microphone).

How a lesson works for a total beginner:

- Each new word is shown with a picture (where one fits), real audio, a "sounds like" and sometimes a memory trick, then quizzed straight away.
- Every question has an "I don't know" button. A missed word comes back two cards later.
- A word moves up at most one step a day, so after a lesson it really does come back tomorrow, still as tap-to-choose. Letter tiles come before typing.
- Each lesson also slips in up to three words from earlier lessons.
- The first lesson of a unit opens with that unit's tip.

## Editing the course

Everything is in `index.html`:

- `const COURSE = [...]` and `COURSE.push(...)` hold the units, lessons and words. Each word is `['Lithuanian', 'English', 'optional note', ['accepted alternatives']]`.
- `const PATH = [...]` sets the order of units and conversations and the part headings. `RESHAPE` regroups older lessons into units.
- `const CONVS = [...]` holds the conversations. Use only words taught earlier on the path.
- `const PRON = {...}` is the "sounds like" respelling. Hyphens split syllables, CAPS marks the stressed one. Key: ah, e/eh, ay, i, ee, oh, u, oo, ow, ai (the "eye" sound), and y is always the y in "yes".
- `EMOJI` and `HOOK` add pictures and memory tricks by Lithuanian word.

**Lesson ids never change.** Saved progress and audio clips are keyed to them, so add new lessons with new ids instead of renaming or reordering words inside an existing lesson.

### Recording audio for new words

Audio is made with Microsoft's neural voices through `edge-tts` (Ona and Leonas). One-time setup:

```
python -m venv .venv
.venv/Scripts/pip install edge-tts imageio-ffmpeg
```

Then, after adding or changing any Lithuanian text:

```
.venv/Scripts/python tools/make_audio.py
```

It records only what is new or changed (both voices), packs each unit or conversation into one file under `audio/`, and updates `SMAP` in `index.html`. It needs Node and an internet connection.

The pronunciation respellings and stress marks were written by hand and have not been checked by a native speaker yet.

## Local preview

Any static server works, for example `python3 -m http.server` in this folder, then open http://localhost:8000.
