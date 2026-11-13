# All-skills A1–C2 workshop pathway

The initial checkpoint below has been expanded to [36 connected course units](CURRICULUM-BUILD.md). The [generated inventory](SKILLS-COVERAGE.md) contains the current counts; this document preserves the original twelve-workshop scope.

Both Lithuanian and Mexican Spanish now have working reading, listening, spoken production, recorded spoken interaction, spoken mediation and writing activities at every target band from A1 to C2. This is twelve cross-skill workshops, one per band and language, connected to the existing thirty-six writing projects. It is an initial implemented pathway, not a complete, reviewed CEFR curriculum.

## What a learner does

1. Learn eight useful phrases by comparing meaning and completing meaning-choice practice. Previously completed writing preparation can supply that same phrase preparation.
2. Study the reading passage, an English guide, the distinct listening script and its English guide, and the partner questions and response patterns. Preparation must be completed before either check starts.
3. Read a target-language passage and answer three comprehension questions. Then hear a separate recording and answer three listening questions. Listening response controls stay disabled until the recording actually ends. Feedback is held until the end of each check; an incorrect check requires source review and a fresh attempt before spoken practice opens.
4. Record a spoken presentation, replay it completely, review three criteria and write a reflection. The learner can download the recording.
5. Respond to three recorded partner prompts. Each prompt must finish before recording is enabled, and every reply must be recorded, replayed and self-reviewed. These are fixed role-play prompts, not a live adaptive conversation.
6. Record a mediation task that combines information from the written and spoken sources for a new listener.
7. Complete the three existing writing projects: preparation, drafting, criterion-based self-review with quoted evidence, revision, reflection and export. A button returns to the corresponding all-skills stage.

The next workshop opens only when both comprehension checks, all three spoken task types and the three writing projects are complete. Future-stage previews do not complete preparation or unlock practice. Chapter and workshop progress do not modify the original card IDs, PATH, FSRS, XP or course mastery.

## Increasing task demands

| Target | Main task context | Understanding and response focus |
| --- | --- | --- |
| A1 | Introductions and a meeting | Identify people, places and times; give a short useful reply |
| A2 | Changed arrangements | Distinguish old and proposed plans, reasons and conditional alternatives |
| B1 | A disrupted journey | Connect a complication, response, trade-off and outcome; give practical advice |
| B2 | A library-service proposal | Weigh a position and objection, support a recommendation and propose evaluation |
| C1 | Limited trial evidence | Interpret qualifications, distinguish observation from inference and adapt a synthesis |
| C2 | Framing a policy decision | Distinguish hypothetical and observed claims, expose an assumption and preserve nuance under challenge |

These are original design targets informed by the [Council of Europe global scale](https://www.coe.int/en/web/common-european-framework-reference-languages/table-1-cefr-3.3-common-reference-levels-global-scale). They are not validated level assignments. In particular, a single workshop cannot establish the broad, varied, fluent performance associated with a CEFR band.

## Content and audio

The pathway contains 72 comprehension questions, 60 required recorded responses and links to 36 writing projects across both languages. Forty-eight new fingerprinted audio files provide twelve complete listening recordings and thirty-six partner prompts. The twelve listening recordings total about 9 minutes 20 seconds; all audio files total 2,721,696 bytes. All 48 files decode and pass the quiet-file audit. Recordings use the project's existing Google TTS service and configured voices, with 10,137 newly synthesised characters.

The reading passages and writing models are shared intentionally within a workshop, while the listening source changes details or presents an additional perspective. English guides, phrase preparation and partner-language preparation teach the source material before checks. Advanced sources and scenarios are fictional practice material, rather than claims of actual research. The [generated inventory](SKILLS-COVERAGE.md) records the exact scope per language and band.

## Results and privacy

Fixed-answer comprehension results are separate from recorded self-review. Spoken task completion means that recording, replay and self-review happened; it does not establish grammatical accuracy, pronunciation, fluency or successful spontaneous interaction. Writing remains self-reviewed. No new automated language assessor or overall CEFR proficiency score was introduced, and every core skill summary retains `level: null`.

Recordings remain in session memory and are cleared when the learner leaves the recording screen, unless the learner downloads a copy. Reflection text and workshop state are stored under `wordami.skills.v1.<language>`, separate from the outcome-only activity log and account-synced course state. They can be exported as a local portfolio. Conflicting writes from another tab fail closed and preserve the newer stored state.

## Verification

`tools/check_skills_studio.py` walks all twelve workshop stages and all thirty-six writing projects. It verifies taught-source gates, held feedback and retry, actual recording and complete replay, self-review requirements, quota-failure recovery, writing integration, next-stage unlocks, small screens, exports, offline reload and unchanged course state. Chromium generates test microphone input; no user's microphone is used. Playback is accelerated in tests while decoding full recordings and using actual media completion events.

`tools/check_skills_errors.py` covers unavailable audio, interrupted playback, replay after partial-check reload, denied and unsupported microphones, cleanup after delayed microphone permission, competing-tab saves and export, and the first offline playback of an advanced recording. `tools/check_skills_offline.py` verifies both language bundles on the first offline reopen. This exposed and fixed a missing Spanish bundle in the installation cache.

The original bilingual routes, café adventure and writing draft-conflict checks remain covered by their existing regression scripts. Audio and coverage artifacts are under `output/skills-studio/`; `tools/report_skills_coverage.py` regenerates the inventory.

## Current release boundary

Available locally at `?preview=1&lang=lt#skills` and `?preview=1&lang=es#skills`, plus an all-skills card on the learning path. These changes have not been deployed. Language/educator review, greater breadth within every band, varied real-world material and calibrated independent speaking/writing assessment remain necessary before presenting this as a complete CEFR course.
