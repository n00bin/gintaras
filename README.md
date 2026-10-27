# Gintaras — Learn Lithuanian

A bite-size Lithuanian course for travelers. One HTML file, real Lithuanian audio, plain-English pronunciation, spaced review, streaks, levels, badges, and an optional online leaderboard.

Live: https://n00bin.github.io/gintaras/

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app: course content, exercises, review scheduler, progress, UI |
| `cloud.js` | Sign-in, progress sync and leaderboard (Supabase). Does nothing until `config.js` is filled in |
| `config.js` | Your Supabase URL and public key |
| `audio/` | Lithuanian audio, one file per unit per voice (Ona, Leonas) |
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

## Editing the course

Everything is in `index.html`:

- `const COURSE = [...]` — units, lessons, words. Each word is `['Lithuanian', 'English', 'optional note']`.
- `const PRON = {...}` — the "sounds like" respelling for every word. Hyphens split syllables, CAPS marks the stressed one (shown lowercase and bold on screen).
- `const ORDER = [...]` — the order units appear in.

Adding words means also generating audio for them. The audio was made with `edge-tts` (voices `lt-LT-OnaNeural` and `lt-LT-LeonasNeural`), one clip per word, then concatenated per unit with 0.35 s gaps; `SMAP` in `index.html` holds each word's start time and length. Ask Claude Code to "regenerate the audio sprites" and it will redo that.

## Local preview

Any static server works, for example `python3 -m http.server` in this folder, then open http://localhost:8000.
