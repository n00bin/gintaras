# Gintaras — Learn Lithuanian

A bite-size Lithuanian course for complete beginners, from first sounds to a real conversation. One HTML file, real Lithuanian audio, plain-English pronunciation, spaced review, streaks, levels, badges, and an optional online leaderboard.

Live: https://n00bin.github.io/gintaras/

## What's in here

| File | What it is |
|---|---|
| `index.html` | The whole app: course content, exercises, review scheduler, progress, UI |
| `cloud.js` | Sign-in, progress sync and leaderboard (Supabase) |
| `config.js` | The Supabase project URL, publishable key, and the Google sign-in switch |
| `audio/` | Lithuanian audio, one file per unit or conversation per voice (Ona, Leonas) |
| `tools/` | The audio recorder (`make_audio.py`) and the script it uses to read the course |
| `supabase/schema.sql` | The two `gintaras_` tables and their access rules |
| `manifest.json`, `icon-*.png` | The app's name, colours and icons for installing it |
| `sw.js` | Service worker: makes it installable and lets it open without signal. Audio is saved the first time it plays, or all at once from **Profile → Use it offline** (about 13 MB: your voice for every unit plus both voices for the conversations) |

Players can install it as an app from **Profile → Install as an app**, which has a one-tap button where the browser supports it and step-by-step instructions for iPhone, Android and computers. When you change `sw.js` itself, bump the cache names at the top so old copies are cleared.

Progress is saved in the browser. With an account it also syncs to the cloud, so it follows you across devices.

## Accounts and the leaderboard

These are switched on. They run on the Supabase project in the **SAVAGE** organization ("n00bin's Project"), shared because the free plan allows only two projects. Everything Gintaras stores lives in two tables named `gintaras_profiles` (nickname and XP for the leaderboard) and `gintaras_progress` (each player's saved progress, readable only by them). `supabase/schema.sql` creates both.

Settings in Supabase:

- **Authentication → URL Configuration:** Site URL is `https://n00bin.github.io/gintaras/`.
- **Authentication → Sign In / Providers:** "Confirm email" is off. Supabase's built-in email sender only delivers to your own team, so with it on, friends could never finish signing up.
- **Google sign-in** is on. The Google side lives in Google Cloud project **gintaras-512908** (Google Auth Platform: app "Gintaras", published to production, client "Gintaras web"). Its client ID and secret are pasted into Supabase under **Auth Providers → Google**. `GOOGLE: true` in `config.js` shows the button.
- The app uses Google's own sign-in button (`GOOGLE_CLIENT_ID` in `config.js`), so Google's screen says "continue to n00bin.github.io". If Google's script can't load, a plain redirect button is used instead, and that one names the Supabase server. To show "Gintaras" instead of the address, get the branding verified (Google Auth Platform → Verification Center). Adding a logo would require that review too.
- `privacy.html` is the privacy policy Google links to.

**Leagues:** seven weekly leagues (Smėlis/Sand → Akmenėlis/Pebble → Gintaras/Amber → Sidabras/Silver → Auksas/Gold → Krištolas/Crystal → Saulė/Sun). Each Monday the top 3 of a league move up; anyone with no XP that week moves down, and so do the bottom 3 once a league has 10 or more players. `supabase/leagues.sql` sets this up: the league columns (players cannot write them), and `gintaras_league_rollover()`, which settles each week exactly once the first time any app calls it after Monday.

**Problem reports:** every lesson and conversation card has a 🚩 button. Players pick what is wrong (translation, audio, "sounds like", picture, marked right answer wrong, other), add an optional note, and the app records which card it was. Reports queue on the device until they can be sent. `supabase/reports.sql` creates the table: anyone can send, only n00binhard@gmail.com can read them, and that account sees a **Problem reports** card in Settings with Fixed / Ignore buttons.

`config.js` holds the project URL and the publishable key. That key is meant to be public; the table rules decide what anyone can do.

## How the course is laid out

About 920 words and phrases in 11 parts, built as a **sentence ladder**: each part adds one new way to build sentences, and every lesson only uses what came before it. The plan behind it is in `docs/expansion-plan.md`.

1. First words: sounds, hello, set phrases
2. Simple sentences: who + does, questions with *ar*, "not" with *ne-*
3. Numbers and time: prices, days, times, your daily routine
4. Food and drink: who + does + what (the "what" changes its ending)
5. Getting around: to / in / from, shopping, clothes
6. People and things: describing words, jobs, home, family, feelings
7. Plans and the future: can / must / want + a verb, and "I will"
8. Telling stories: past tense and joining words (and, but, because)
9. Travelling and health: hotels, trains, the body, emergencies
10. Real conversations: opinions, reactions, keeping a chat going
11. Extras: animals and culture

There are 15 conversations along the way. In each one you **write** every reply (with Lithuanian letter keys and a help ladder), then **say** it out loud; the microphone checks you where the browser can listen.

How a lesson works for a total beginner:

- Each new word is shown with a picture (where one fits), real audio, a "sounds like" and sometimes a memory trick, then quizzed straight away.
- Every question has an "I don't know" button. A missed word comes back two cards later.
- A word moves up at most one step a day, so after a lesson it really does come back tomorrow, still as tap-to-choose. Letter tiles come before typing.
- Each lesson also slips in up to three words from earlier lessons.
- Every lesson opens with a tip for its own words. A unit's first lesson also shows the unit tip and a colour-coded pattern card (who | does | what | where | when).
- Fill-the-gap drills on endings and word order are mixed into every lesson.
- A wrong typed answer explains itself in one or two plain lines ("After iš the word takes its from-ending…", "that's the man's form…", "you left out ne…"). Leaving out aš / tu / mes / jūs counts as right, and a one-letter typo inside a longer word is forgiven; a wrong ending never is. The rules live under WHY WAS I WRONG in `index.html`.
- **About me** (Review tab): the learner picks their name, country, city, job, family, likes and reason for learning, and gets their own introduction in Lithuanian plus a lesson to practise it. Every sentence comes from a fixed, checked bank (ABOUT ME: SENTENCE BANK, recorded as audio group `me1`); only the name is typed. To add an option, add it to the right `ME_` list and run `tools/make_audio.py`.
- Branching conversations: some replies are a choice (`['c', ...]` lines in CONVS). Every option is right; the other person reacts differently to each before the conversation joins up again. The conversation card counts how many choices you've tried.
- Amber, the shop and happy hour: amber is earned by learning and spent on spare rest days, 15 minutes of double XP, streak repair, a league shield and friend challenges; a daily happy hour doubles XP for everyone. Details in `docs/perks-idea.md`; database setup in `supabase/perks.sql`.
- Kind streaks: everyone gets 2 free rest days a week, so a missed day never breaks a streak. Doubling the daily goal earns a spare one (up to 2). The profile celebrates words known and days learned, not just the streak.

## Editing the course

Everything is in `index.html`:

- `const COURSE = [...]` and `COURSE.push(...)` hold the units, lessons and words. Each word is `['Lithuanian', 'English', 'optional note', ['accepted alternatives']]`.
- `const PATH = [...]` sets the order of units and conversations and the part headings. `RESHAPE` regroups older lessons into units.
- `const CONVS = [...]` holds the conversations. Use only words taught earlier on the path.
- `const PRON = {...}` is the "sounds like" respelling. Hyphens split syllables, CAPS marks the stressed one. Key: ah, e/eh, ay, i, ee, oh, u, oo, ow, ai (the "eye" sound), and y is always the y in "yes".
- `EMOJI` gives every word and phrase a picture; `HOOK` adds memory tricks. Pictures are Twemoji illustrations stored in `pics/` (same on every phone, offline), named by the emoji's code points. A value starting with `#` is a text tile instead (numbers past ten, days, months). After adding new pictures, download any missing files from `https://cdn.jsdelivr.net/gh/jdecked/twemoji@15.1.0/assets/svg/`.

Pictures: [Twemoji](https://github.com/jdecked/twemoji) by Twitter, Inc. and contributors, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (credited in the app under Settings → About).
- `LESSON_TIPS`, `SPEAK_TIPS`, `PATTERNS` and `DRILLS` hold the tips, pattern cards and fill-the-gap drills.

Before recording audio or pushing, run `node tools/check_course.js`. It checks that every lesson has a tip, every word a "sounds like", no two answers clash, and every word you must write in a conversation was taught earlier.

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
