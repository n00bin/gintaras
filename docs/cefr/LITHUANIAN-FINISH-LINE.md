# Lithuanian: the finish line for the full CEFR (A1–C2)

The owner's goal (12 November 2026) is for the Lithuanian course to cover the **whole CEFR, A1 to C2**. This file defines "complete". A level is finished only when every box under it is ticked and its checks pass.

Work goes down this list **without stopping to report between items**. Report only when a whole level is finished, or when blocked on something only the owner can do. `node tools/cefr_finish_line.js` measures the numbers and prints what's left. The live tracker is `docs/cefr/lithuanian-finish-line.json`.

## Rules that apply at every level

- Build on the live course (`lang/lt.js`) and the expansion workshops. Keep every published course name: `tools/check_progress_ids.js` must pass.
- New words go at the end of a lesson or in new lessons.
- All learner-facing text is plain English. See `docs/STYLE-POLISH-2026-11-12.md`.
- Every new Lithuanian sentence gets a recording through `tools/make_audio.py`. Pictures are Codex-drawn and reviewed, and only where a picture helps.
- All texts and recordings are original. Nothing is copied from textbooks, news or books.
- A level counts as finished on the build side when its boxes are ticked and every check passes. The native-speaker language review is tracked separately (last section). The app never calls finishing a level an official certificate.

## Targets per level

Vocabulary is counted in dictionary words (lemmas) the course teaches and practises, not word forms. Text lengths are for the main reading and listening sources at that level. **Reading lengths are counted on each text's English translation** (decided 12 November 2026). Lithuanian has no articles and packs meaning into endings, so it uses about 20–25% fewer words for the same content. Counting the English keeps the targets about how much a text says, not about padding Lithuanian.

| | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|
| Words taught and practised (lemmas, running total) | 700 | 1,500 | 2,750 | 4,500 | 6,500 | 8,500 |
| Reading texts (new at this level) | 20 | 25 | 30 | 30 | 30 | 30 |
| Reading length (words) | 30–150 | 120–300 | 250–600 | 500–1,000 | 800–1,500 | 1,200–2,500 |
| Listening recordings (new) | 20 | 25 | 30 | 30 | 30 | 30 |
| Listening length | 10–60 s | 40 s–2 min | 1–4 min | 2–6 min | 4–10 min | 6–15 min |
| Conversations to take part in | 15 | 20 | 20 | 20 | 15 | 15 |
| Writing tasks | 8 | 12 | 15 | 15 | 15 | 15 |
| Speaking tasks (recorded) | 8 | 12 | 15 | 15 | 15 | 15 |
| Unit check at the end of each part | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Grammar and language each level must teach and practise

**A1**
- Sounds and stress basics.
- Gender and the main noun endings (-as, -is, -ys, -us, -a, -ė).
- Nominative, accusative and genitive singular: what you have, what you want, "no X" (ne + genitive).
- Personal pronouns.
- Present tense of the three conjugations, and **būti**.
- Questions with **ar** and the question words.
- Numbers 0–100 with nouns.
- Time, days, months.
- Basic adjectives in agreement.
- Polite and informal "you".

**A2**
- Dative, instrumental and locative singular; all cases in the plural for common nouns.
- Simple past (būtasis kartinis) and future.
- Reflexive verbs (-si).
- Imperative.
- Possessives (mano, tavo, savo).
- Comparative and superlative.
- Numbers in cases; dates and prices.
- Frequency and time expressions.
- Joining words (ir, bet, nes, kai, jeigu).

**B1**
- All seven cases, vocative included, singular and plural, across all noun and adjective types.
- Past frequentative (būtasis dažninis).
- Conditional (tariamoji nuosaka).
- Verb prefixes and aspect (pa-, nu-, par-, iš-, at-…).
- Pronominal adjectives (gerasis).
- Present and past active participles as adjectives.
- Indirect speech with **kad**.
- Relative clauses (kuris).
- Collective and ordinal numbers.

**B2**
- Participles in full: active and passive, all tenses, including passive voice with **būti**.
- Half-participle (pusdalyvis) and gerund (padalyvis).
- Necessity forms (reikia, tenka, privaloma).
- Word formation: diminutives, -tojas/-ėjas and others.
- Complex sentences: concession, purpose, condition.
- Register: formal letters and spoken informality.
- Common idioms.

**C1**
- Relative mood (netiesioginė nuosaka) for reporting and hearsay.
- Būdinys.
- Advanced participle use in written style.
- Cohesion across long texts.
- Hedging and nuance.
- Formal, academic and professional registers.
- Stress patterns (accentuation classes) for recognition.
- Wider idiom and set phrases.

**C2**
- Full control of style and register, including literary and archaic forms in reading.
- Regional varieties for recognition (Žemaitian, Dzūkian features).
- Wordplay, irony and implied meaning.
- Precise paraphrase and mediation between sources.

## Kinds of practice each level must include

Each level needs all the kinds listed for it. A1–A2 already has most of them.

- **All levels:**
  - short practical texts
  - prepared and changed-detail reading and listening
  - guided conversations
  - writing with drafting and revising
  - recorded speaking with replay
  - a unit check
- **From A2:**
  - forms and tables
  - messages and emails
  - **overheard conversations** between two or more people (a dedicated listening type; missing today)
- **From B1:**
  - **talks and short lectures** with note-taking (missing today)
  - longer stories and articles
  - presenting and defending a view
  - explaining a text to someone else (mediation)
- **From B2:**
  - **radio-style and video-style recordings** (original, rights-cleared; missing today)
  - debates and negotiation
  - formal writing
- **From C1:**
  - academic and professional texts
  - summarising several sources
  - extended speaking (several minutes)
- **C2:**
  - literary and complex texts
  - near-native interaction under pressure
  - precise reformulation

## Finished means

For each level, all of these must hold:

1. Every number in the table is met or exceeded.
2. Every grammar and practice point above is taught before it is tested, and is used in that level's units.
3. Recordings exist for every new sentence.
4. These pass:
   - `node tools/check_course.js`
   - `node tools/check_progress_ids.js`
   - `node tools/check_data_safety.js`
   - the level's skills studio walk-through
5. The level appears on the course path in order, after the previous level.

## Outside the build: language review

A native Lithuanian speaker reviews each level: wording, accepted answers, pronunciation guides and recordings. Track it per level in the JSON as `native_review: pending | done`. It doesn't block building the next level, but no level is described to learners as checked until it's done.
