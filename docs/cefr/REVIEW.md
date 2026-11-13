# Wordami CEFR coverage review

Review date: 6 November 2026.

This is a historical review of an earlier source snapshot. See [current implementation and remaining review gaps](COURSE-PREVIEW-193.md) and [task-family breadth](CURRICULUM-BREADTH.md); later implementation does not substitute for independent review.

**Finding: both full local courses have substantial beginner and everyday-life content relevant to A1–A2, with selected preparation for B1 tasks. Neither currently has sufficient assessment evidence to promise a complete A2 or B1 outcome.** This is an internal curriculum and exercise-code review, not a learner assessment or external validation.

## Scope and sources

Reviewed `lang/lt.js`, `lang/es.js`, their teaching paths, lesson cards, grammar references, sentence builders, conversation scripts, and the shared exercise and speech code in `index.html`. Reviewed the separate Lithuanian café preview as one narrow example of prerequisite-gated practice. No learner records were accessed and no course content or public labels were changed.

The comparison uses the Council of Europe's [global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-%201-cefr-3.3-common-reference-levels-global-scale) and [2020 Companion volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4). Relevant printed pages are 48 (listening), 54–56 (reading), 62–63 (oral production), 66–67 (writing), 72–79 (interaction), and 82–84 (written interaction). Page numbers printed in the document differ from PDF indices.

In brief, the descriptors progress from supported personal exchanges, through routine practical communication, to more independent discussion and connected accounts. Listening, reading, speaking, and writing require distinct evidence. A topic name, a tense, a vocabulary total, or a remembered sentence cannot by itself establish a CEFR level. This review's curriculum judgements below are our interpretation of those official descriptions.

## What was actually counted

| Local course | Units | Teaching lessons | Cards | Scripted conversations | Grammar tables |
| --- | ---: | ---: | ---: | ---: | ---: |
| Lithuanian | 43 | 143 | 969 | 35 | 11 |
| Expanded Spanish draft | 37 | 162 | 807 | 15 | 11 |

Additional exercise definitions: Lithuanian has 89 drills and 203 sentence builders; Spanish has 37 drills and 36 sentence builders. These are practice definitions, not separate CEFR competencies or proficiency scores.

The saved `origin/main` reference, commit `d27b417882fee2a8fe7645a4fb072d5b5e4da8a7`, has the same Lithuanian totals. Its Spanish starter has only 3 units, 13 lessons, 62 cards and 2 conversations. The expanded Spanish draft remains local and is the Spanish course assessed in this report; these findings do not describe the publicly available Spanish starter. This audit did not re-fetch the remote or inspect the deployment.

The 969 Lithuanian cards include 445 single-token entries and 524 multi-token entries. Single tokens can be inflected forms or expressions, and phrases contain additional vocabulary. This is not a count of distinct dictionary headwords. Counts are reproducible with `node tools/report_cefr_inventory.js`; the generated [inventory](inventory.json) preserves item IDs, lesson sources, path order, and conversation lines.

## Curriculum evidence

Here, **supported practice** means relevant lessons and exercises exist. **Partial** means relevant language exists but transfer or skill breadth is weak. **Not established** means this review found no sufficient course-level evidence. None of these labels means a learner has passed a level.

| Ability area and approximate task band | Lithuanian evidence | Spanish draft evidence | Review judgement |
| --- | --- | --- | --- |
| Personal information and greetings, A1 | `u1`, `u20`, `cv1`, `cv2` | `u1`, `u25`, `cv1`, `cv2` | Supported practice in both |
| Ask for repetition and clarification, A1–A2 | `u21`, `cv16` | `u21`, `cv16` | Supported phrases and scripted repair exchanges |
| Numbers, prices, dates and times, A1–A2 | `u2`, `u7`, `u24`, `cv20`, `cv21` | `u2`, `u5`, `u18` | Supported language; interpreting real schedules remains partial |
| Food, shopping and transport transactions, A1–A2 | `u3`, `u15`, `u14`, `u16`, `cv3`, `cv5`, `cv23` | `u3`, `u15`, `u7`, `u16`, `cv4`, `cv6`, `cv7` | Strong topic coverage; independent variations need testing |
| Family, home, work and routines, A1–A2 | `u20`, `u25`, `u28`, `u31`, `u32`, `cv11`, `cv25`–`cv27` | `u6`, `u26`, `u30`, `u31`, `cv3`, `cv8` | Supported phrases and conversations; sustained personal descriptions are partial |
| Invitations, preferences and arrangements, A2 | `u22`, `u23`, `u33`, `u34`, `cv6`, `cv13`, `cv28` | `u8`, `u32`, `u33`, `cv9` | Supported practice; independently negotiating changes remains partial |
| Travel and health problems, A2 with possible B1 extensions | `u17`, `u18`, `u40`, `cv8`, `cv9`, `cv32`, `cv33` | `u10`, `u13`, `u36`, `cv11`, `cv12` | Relevant requests exist; handling unexpected complications is not established |
| Describe past events and link ideas, A2 with B1 preparation | `u35`–`u37`, `cv14`, `cv30` | `u34`, `u35`, `u41`, `cv10` | Partial: short accounts are rehearsed; independent connected narratives are not established |
| Give opinions and respond to others, A2 with B1 preparation | `u38`, `u39`, `cv15`, `cv34` | `u37`, `u38`, `cv13` | Partial: opinion phrases exist, but an extended discussion is not established |
| Understand new short texts and practical documents, A1–A2 | Written cards, scripted chats and some sign vocabulary | Written cards, scripted chats, messages vocabulary | Partial: systematic reading of documents with comprehension tasks is a gap |
| Write original messages and descriptions, A1–A2 | Typed answers to expected prompts | Typed answers; `u39`, `cv14` teach contact and request phrases | Partial: flexible message composition is not established |
| Independently sustain unfamiliar versions of familiar situations, B1 | Later scripts supply ingredients | Later scripts supply ingredients | Not established in either course |
| Extended reading, argument and fluent discussion, B2+ | No sufficient evidence in reviewed path | No sufficient evidence in reviewed path | No basis for a B2, C1 or C2 claim |

Specific examples show why later material is useful but insufficient for a B1 claim:

- Lithuanian `u37` teaches sequencing and a short past account; `cv14` rehearses a weekend conversation. Learners still follow expected replies rather than freely narrating their own experience.
- Lithuanian `u38` teaches an opinion, agreement and a brief reason; `cv15` is titled “Dinner debate”, but the title does not demonstrate extended argument.
- Spanish `u35` introduces past background forms such as `vivía` and combines event sequences. `cv10` prompts a particular childhood exchange. Knowledge of these forms alone does not show independent storytelling.
- Spanish `u39` and `cv14` practise exchanging contact details and asking for help. Producing a suitable original message for a new recipient is a separate task that still needs assessment.

## What the exercise engine already does well

The shared engine moves from recognition to production: choices and tiles, then gap fills, typed recall, speaking and dictation. `typesFor`, `ladderStep` and `LADDER` implement this progression. Conversations also fade English prompts and offer audio-only NPC lines when language is familiar (`promptHtml`, `earLine`). Therefore it would be inaccurate to say the app is only flashcards or always shows translations.

It also has grammar practice, acceptable-answer handling, personalised forms, branching scripted exchanges and spaced recall. These are useful teaching mechanisms. They do not establish independent performance across the four skills.

## Where the evidence stops

| Skill | Current mechanism | Missing evidence before claiming an overall level |
| --- | --- | --- |
| Listening | Recorded words and scripted lines, dictation, selective audio-only conversation turns | Comprehension of fresh recordings using learned language: meaning, intention and practical details rather than transcript reproduction alone |
| Reading | Short cards, subtitles and messages inside known scripts | Fresh menus, notices, schedules, messages and short passages, with practical comprehension questions |
| Spoken interaction | Scripted role-play, branching choices, browser recognition and record/compare fallback | Suitable spontaneous responses, follow-up questions, clarification and success when details change |
| Spoken production | Saying or recording expected phrases | An original description or account assessed for meaning, intelligibility, range and connectedness |
| Writing | Typed expected answers and sentence construction | Original short messages and linked descriptions that achieve a purpose, with several valid solutions |

`matchScore` compares the browser transcript against a target line. It is not a calibrated pronunciation, fluency or CEFR assessment. Device recognition and optional self-comparison also give different kinds of evidence. Speaking can be deferred; a completed course path therefore cannot guarantee demonstrated speaking ability.

Existing Can Do awards use item recall at level 4 (`CAN_LVL`, `canState`, `checkCando`). They do not currently require a separate real-world performance assessment. XP levels and FSRS retention likewise cannot be converted directly into CEFR levels.

The café preview now requires seven introduced course cards and practices three typed requests in a clear sequence. That is useful narrow transactional practice. Its hints, replayability and expected answers mean completion should remain a café-practice record, not evidence of a whole CEFR level.

## Priority work

1. **Map the beginner path to observable objectives.** For each objective, identify teaching cards, supported practice, independent practice and missing skills. Confirm prerequisite words before testing them. Audit ordinary conversations separately: some scripts deliberately introduce unfamiliar NPC language with preparation; the café's strict gate does not automatically apply to every conversation.
2. **Add independent checks using learned language.** Begin with introductions, café orders, directions, shopping, routines and arrangements. Vary names, amounts, destinations and needs; offer valid choices rather than one memorised transcript. Keep hints available for practice, and record whether they were used.
3. **Add reading and listening tasks with a purpose.** Use a new menu or message, find an item or meeting time, hear a new order and identify what was requested. Teach every required word first. “New” should initially mean a new combination or situation, not unexplained vocabulary.
4. **Add original speaking and writing.** Ask learners to describe their routine, send an invitation or recount a short event. Evaluate whether the response does the job, rather than whether it reproduces one sentence. Calibrate assessment with qualified teachers; retain separate skill results.
5. **Build B1 breadth after those foundations.** Longer connected accounts, explaining reasons, follow-up questions, repairing misunderstandings and handling changed plans need varied practice and repeat evidence.
6. **Validate before publishing CEFR claims.** Have qualified Lithuanian and Mexican Spanish reviewers check language and curriculum; trial tasks with learners and calibrate scoring. Spanish editorial review is still pending. Avoid a numeric “CEFR completion percentage” generated from counts or keywords.

## Current wording decision

Internally: “A1–A2-oriented everyday language content, with selected B1 preparation; coverage and independent assessment still incomplete.”

For users today, describe concrete topics and task progress. Do not label course completion, the café badge, recall mastery, or XP as “A2 achieved” or “B1 fluent”. This audit does not establish any learner's level or a guaranteed end-of-course level.
