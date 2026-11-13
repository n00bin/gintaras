# Wordami — Learn Languages

A bite-size language course for complete beginners, Lithuanian first and now Mexican Spanish, from first sounds to a real conversation. One HTML file, real Lithuanian audio, plain-English pronunciation, spaced review, streaks, levels, badges, and an optional online leaderboard.

Live: https://n00bin.github.io/gintaras/

Live is **3.119/build 191**, with every Lithuanian course illustration updated. The broader **3.122-preview/build 194** remains local; its 60 required workshops, forms, table reading and longer reading portfolios are described in the [current checkpoint](docs/cefr/COURSE-PREVIEW-194.md). Full CEFR breadth and independent review remain unfinished.

## What's in here

| File | What it is |
|---|---|
| `index.html` | Main exercises, review scheduler, progress and navigation. It loads one language file and the optional preview learning modules |
| `skills-content.js`, `curriculum-content.js`, `skills-studio.js` | The 60-unit local A1–C2 all-skills workshop sequence, including unit writing assignments |
| `form-practice-content.js`, `form-practice.js`, `document-reading-content.js`, `document-reading.js` | Required practical forms and table reading in selected A1–A2 units, with source-bound records and exports |
| `extended-reading-content.js`, `extended-reading.js` | Required B1–C2 four-part readings, passage preparation, whole-text questions, purposeful notes and revised source-based briefs |
| `vocabulary-content.js` | Contextual word forms and expressions, with preparation, source checks and pronunciation |
| `grammar-content.js`, `grammar-practice.js` | Worked grammar examples and required practice at each target band |
| `phrase-review.js` | Taught-only word/phrase recall, preserving distinct meanings and reusing the existing FSRS calculations with separate records |
| `lang/lt.js`, `lang/es.js` | One file per language: its course, conversations, sounds-like, audio map, About-me sentences, tips, and the grammar help for wrong answers |
| `cloud.js` | Sign-in, progress sync and leaderboard (Supabase) |
| `config.js` | The Supabase project URL, publishable key, and the Google sign-in switch |
| `audio/`, `audio/es/` | Lithuanian audio in `audio/`, Spanish in `audio/es/`: one file per unit or conversation per voice (`ona` = the woman's lesson voice, `leonas` = the man's, plus one voice per conversation character) |
| `tools/` | The course checker (`check_course.js`), the audio recorders (`make_audio.py`, `make_voices.py`) and the script they use to read a language file |
| `supabase/schema.sql` | The two `gintaras_` tables and their access rules |
| `manifest.json`, `icon-*.png` | The app's name, colours and icons for installing it |
| `sw.js` | Service worker: makes it installable and lets it open without signal. Audio is saved the first time it plays, or all at once from **Profile → Use it offline** (about 13 MB: your voice for every unit plus both voices for the conversations) |

Players can install it as an app from **Profile → Install as an app**, which has a one-tap button where the browser supports it and step-by-step instructions for iPhone, Android and computers. When you change `sw.js` itself, bump the cache names at the top so old copies are cleared.

Original lesson progress is saved in the browser and syncs with an account. The local preview workshops, grammar and phrase-review records stay on the device and offer exports.

The course build is available at `?preview=1&lang=lt#skills` or `?preview=1&lang=es#skills`. See the [current structure and release audit](docs/cefr/CURRICULUM-AUDIT.md), [grammar and retention notes](docs/cefr/GRAMMAR-AND-RETENTION.md), and [source review books](docs/cefr/review/README.md). Target-band labels do not certify learner proficiency. Each unit has a learning plan and explained language patterns; 115 additional A1 source glosses support the first reading/listening and partner tasks. Writing requires the connected comprehension work.

Before packaging, run `python tools/audit_curriculum_release.py` and `python tools/package_site.py --check`. The optional audit `--gate` exits unsuccessfully while the complete CEFR release remains unready. Site packaging uses an allowlist so local output, review books, worktrees and environment files are excluded.

The four A1 and four A2 units per language also offer controlled reading transfer: [A1 short answers](docs/cefr/CONTROLLED-TRANSFER.md) and [A2 meaning choices](docs/cefr/A2-READING.md), totalling thirty-two documents and ninety-six questions in prepared language. Feedback is held to the end, attempts resume and first visits are tracked separately from repeats. Open from the unit or `#transfer`; this is reading practice, not a level award.

[Controlled listening transfer](docs/cefr/LISTENING-TRANSFER.md) covers A1 and [A2 spoken messages](docs/cefr/A2-LISTENING.md): thirty-two complete recordings and ninety-six questions, opened from the unit or `#listen-transfer`. Complete playback is required; transcripts and explanations appear after all three answers. Listening results have their own local records, separate from reading and account sync.

[Guided A1 feedback](docs/cefr/A1-GUIDED-FEEDBACK.md) now supports the six writing projects and four spoken-production activities per language. It checks prepared patterns and task details, clears stale feedback after edits, and offers concrete revision guidance. Speaking feedback checks temporary notes typed after recording and replay; it does not assess the recording or award proficiency.

[A1 writing preparation](docs/cefr/A1-WRITING-PREPARATION.md) adds project-specific worked models, purpose practice and saved planning notes before drafting. Text exports include plans, and suggested lengths now fit each short task. Original project IDs, drafts and completion records are preserved.

[Guided A1 checking exchanges](docs/cefr/GUIDED-INTERACTION.md) practise confirming or correcting a time, price, location or direction. Learners select and record a checking question, hear a prepared partner reply, then record a response to the clarified detail. Open from the unit or `#guided-exchange`. These are self-reviewed recorded branches, not automatic speech assessment.

[A2 preparation](docs/cefr/A2-PREPARATION.md) adds contextual source explanations and six worked writing models per language, with purpose practice and saved plans. A2 source study is required before comprehension and productive tasks; existing drafts and earlier results are retained. The combined A1–A2 writing support has twenty-four models and seventy-two guided exercises.

## Accounts and the leaderboard

These are switched on. They run on the Supabase project in the **SAVAGE** organization ("n00bin's Project"), shared because the free plan allows only two projects. Everything Wordami stores lives in two tables named `gintaras_profiles` (nickname and XP for the leaderboard) and `gintaras_progress` (each player's saved progress, readable only by them). `supabase/schema.sql` creates both.

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
- Amber, the shop and happy hour: amber is earned by learning and spent on spare rest days, 15 minutes of double XP, streak repair, a league shield and friend challenges; a daily happy hour doubles XP on reviews (due words, Tricky words, the unit check) for everyone. Details in `docs/perks-idea.md`; database setup in `supabase/perks.sql`.
- Kind streaks: everyone gets 2 free rest days a week, so a missed day never breaks a streak. Doubling the daily goal earns a spare one (up to 2). The profile celebrates words known and days learned, not just the streak.

## Editing the course

The app-wide illustration direction is documented in [the art style guide](docs/art-direction/STYLE.md), with the owner's approved visual reference and character specifications. Use this reference for new artwork in both languages; the older sketch-style preview is superseded.

Each language lives in its own file in `lang/` (`lt.js` Lithuanian, `es.js` Spanish). The app code in `index.html` never names a language; it reads `LANG` (name, speech code, letters, audio folder, praise words) and the rest from the loaded file. Both files have the same shape:

- `COURSE` holds the units, lessons and words. Each word is `['word', 'English', 'optional note', ['accepted alternatives']]`.
- `PATH` sets the order of units and conversations and the part headings. `RESHAPE` (Lithuanian) regroups older lessons into units.
- `CONVS` holds the conversations, with `CAST_GV` (each person's Google voice) and `CAST_LOOK` (their face). Use only words taught earlier on the path.
- `PRON` is the "sounds like" respelling. Hyphens split syllables, CAPS marks the stressed one. Lithuanian is written by hand; Spanish is worked out from the spelling by `autoPron` (Spanish spelling and stress are regular), with `PRON` only for exceptions.
- `PICTURE_ASSETS` maps words to the approved rounded cartoon illustrations in `pics/art-v2/`; names describe meanings so courses can share an asset. `CAST_PICTURES` maps conversation characters to their portraits, and `LEARNER_PICTURE` supplies the default learner while customized player avatars keep their chosen look. `EMOJI` supplies fallbacks and the older illustrations while migration is in progress; a value starting with `#` is an intentional text tile (numbers, days, months). `HOOK` adds memory tricks.
- `LESSON_TIPS`, `SPEAK_TIPS`, `PATTERNS` and `DRILLS` hold the tips, pattern cards and fill-the-gap drills.
- `ME_*`, `meBank` and `PERS` hold the About-me sentences and how your name, country and gender go into the course. `ALSO`, `marksNote` and `endingWhy` explain wrong answers; `GUIDE_HTML` is the pronunciation guide.

New illustrations follow [the approved art direction](docs/art-direction/STYLE.md). Exact generation prompts and the frozen Lithuanian asset plan are recorded in `docs/art-direction/`; full-resolution masters stay in the local authoring workspace, and the app uses transparent 512px WebPs. Use `tools/integrate_course_art.py` to connect valid exports and `tools/check_lithuanian_art.py --require-complete` before the full Lithuanian rollout. The service worker saves the pictures and conversation portraits for offline use.

Fallback and legacy pictures: [Twemoji](https://github.com/jdecked/twemoji) by Twitter, Inc. and contributors, licensed [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) (credited in the app under Settings → About).

Before recording audio or pushing, run `node tools/check_course.js` (Lithuanian) and `node tools/check_course.js es` (Spanish). It checks that every lesson has a tip, every word a "sounds like" and a picture, no two answers clash, and every word you must write in a conversation was taught earlier.

**Lesson ids never change.** Saved progress and audio clips are keyed to them, so add new lessons with new ids instead of renaming or reordering words inside an existing lesson. Each language keeps its own progress, so Spanish can reuse ids like `u1` or `cv1`.

### Adding a language

Copy `lang/es.js` to `lang/<code>.js` and replace its content, add the language to `LANGS` in `index.html` (with `ready:false` it shows as Coming soon), add its Google voice language and audio folder to `LANGS` in `tools/make_audio.py`, record its audio, and add a row for it in `gintaras_meta` (see `supabase/languages_es.sql`) so it gets its own league.

### Recording audio for new words

Audio is Google's natural voices (Chirp 3 HD). One-time setup:

```
python -m venv .venv
.venv/Scripts/pip install imageio-ffmpeg
```

The Google key (restricted to Cloud Text-to-Speech) goes in `~/.claude/secrets/gintaras_tts_key.txt`. Then, after adding or changing any text:

```
.venv/Scripts/python tools/make_audio.py es      (lessons and About me, both lesson voices)
.venv/Scripts/python tools/make_voices.py es     (each conversation person in their own voice)
```

Leave out `es` for Lithuanian. They record only what is new or changed, pack each unit or conversation into one file, and update `SMAP` in the language file. They need Node and an internet connection.

The Lithuanian respellings were written by hand and have not been checked by a native speaker yet. The Spanish course is waiting for a check by native Mexican speakers.

## Local preview

Any static server works, for example `python3 -m http.server` in this folder, then open http://localhost:8000.


## Wordami branding and Ami

The owner renamed the app to **Wordami** and approved **Ami the parrot** on 2026-11-05. See [the mascot guide](docs/wordami/README.md) for every interaction, source master, export and generation prompt.

The public address remains `https://n00bin.github.io/gintaras/`, and the repository remains `gintaras`. Existing local progress, cloud identifiers, PWA install identity and internal events deliberately retain their `gintaras` names. Existing Google project/OAuth labels described above are unchanged. This is a visible brand update, not an account or URL migration.
