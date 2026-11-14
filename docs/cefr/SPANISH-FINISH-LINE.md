# Mexican Spanish: the finish line for the full CEFR (A1–C2)

The owner asked on 13 November 2026 for the Mexican Spanish course to cover the **whole CEFR, A1 to C2**, the same way Lithuanian does (see `LITHUANIAN-FINISH-LINE.md`). This file defines "complete". A level is finished only when every box under it is ticked and its checks pass.

Work goes down this list **without stopping to report between items**. Report only when a whole level is finished, or when blocked on something only the owner can do. `python tools/cefr_finish_line.py --lang es` measures the numbers and prints what's left. The live tracker is `docs/cefr/spanish-finish-line.json`.

## Rules that apply at every level

- Build on the live course (`lang/es.js`) and the all-skills units. Keep every published course name: `tools/check_progress_ids.js` must pass.
- New words go at the end of a lesson or in new lessons.
- **Mexican Spanish**: ustedes (no vosotros), Mexican vocabulary and usage (carro, celular, ahorita, ¿mande?, platicar), the preterite where Mexico prefers it. Other varieties appear only for recognition, and are labelled.
- All learner-facing text is plain English.
- Every new Spanish sentence gets a recording. Pictures only where a picture helps.
- All texts and recordings are original. Nothing is copied from textbooks, news, songs or books.
- The course stays behind "Coming soon" until a native speaker has reviewed it and the owner says it's ready.
- A level counts as finished on the build side when its boxes are ticked and every check passes. The native-speaker review is tracked separately. The app never calls finishing a level an official certificate.

## Targets per level

Vocabulary is counted in word forms the course teaches (running total), as for Lithuanian, until a lemma list exists. **Reading lengths are counted on each text's English translation**, the same rule as Lithuanian, so both courses measure how much a text says.

| | A1 | A2 | B1 | B2 | C1 | C2 |
|---|---|---|---|---|---|---|
| Words taught and practised (running total) | 700 | 1,500 | 2,750 | 4,500 | 6,500 | 8,500 |
| Reading texts (new at this level) | 20 | 25 | 30 | 30 | 30 | 30 |
| Reading length (words) | 30–150 | 120–300 | 250–600 | 500–1,000 | 800–1,500 | 1,200–2,500 |
| Listening recordings (new) | 20 | 25 | 30 | 30 | 30 | 30 |
| Listening length | 10–60 s | 40 s–2 min | 1–4 min | 2–6 min | 4–10 min | 6–15 min |
| Conversations to take part in | 15 | 20 | 20 | 20 | 15 | 15 |
| Writing tasks | 8 | 12 | 15 | 15 | 15 | 15 |
| Speaking tasks (recorded) | 8 | 12 | 15 | 15 | 15 | 15 |

## Grammar and language each level must teach and practise

**A1**
- Sounds, stress and written accents.
- Gender, articles (el, la, los, las, un, una) and plurals.
- Adjective agreement and position.
- Ser and estar (basic uses), and hay.
- Present tense of regular -ar, -er, -ir verbs.
- Common irregular verbs in the present (tener, ir, hacer, querer, poder, venir, decir).
- Gustar and similar verbs.
- Questions and question words.
- Numbers 0–100, time, days, months.
- Possessives (mi, tu, su, nuestro).
- Tú, usted and ustedes.

**A2**
- Preterite: regular verbs and the common irregulars.
- Imperfect: description and habits.
- Ir a + infinitive.
- Reflexive verbs.
- Direct and indirect object pronouns.
- Comparatives and superlatives.
- Commands for tú and usted (affirmative).
- Estar + gerund.
- Por and para (basic uses).
- Frequency and time expressions.
- Joining words (y, pero, porque, cuando, si).

**B1**
- Preterite and imperfect together in stories.
- Present perfect, and the Mexican preference for the preterite.
- Future and conditional.
- Present subjunctive: wishes, advice, feelings, doubt.
- Negative commands.
- Double object pronouns (se lo).
- Relative words (que, quien, donde, lo que).
- Reported speech (dijo que…).
- Ordinal numbers and dates.

**B2**
- Subjunctive after cuando, para que, aunque, antes de que.
- Imperfect subjunctive.
- Si-clauses with the imperfect subjunctive.
- Pluperfect.
- Passive with ser, passive and impersonal se.
- Future and conditional perfect.
- Register: formal letters and Mexican informal speech.
- Common idioms.

**C1**
- Pluperfect subjunctive and past si-clauses.
- Fine points of the subjunctive (aunque + indicative or subjunctive, el hecho de que).
- Verb phrases (llevar + gerund, acabar de, volver a, ponerse a, seguir + gerund).
- Academic and formal connectors; nominalisation.
- Reported speech with tense changes.
- Other varieties for recognition (Spain, Río de la Plata, Caribbean).

**C2**
- Literary and legal forms for recognition (future subjunctive in legal texts, pretérito anterior).
- Word order for emphasis and style.
- Irony, wordplay and double meanings (doble sentido), kept clean.
- Paraphrase and mediation.
- Specialised registers: legal, academic, administrative.
- Sayings and proverbs (refranes).

## Native-speaker review

Each level is reviewed by a native Mexican Spanish speaker before Spanish leaves "Coming soon". Tracked in the tracker's `native_review` per level.
