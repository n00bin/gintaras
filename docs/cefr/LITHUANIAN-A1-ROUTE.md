# Lithuanian guided A1 checkpoint

This implementation is available in local preview. It is not a completed or certified A1 course and has not been deployed.

Subsequent work adds Spanish integration, a twenty-sixth Lithuanian placement and chapter return controls. See the [bilingual routes checkpoint](BILINGUAL-A1-ROUTES.md) for the current integration counts.

## Teaching and sequence

The guided route contains 12 chapters and 16 required practice visits. It launches the existing teaching lessons, begins with First words, uses existing taught-card progress, and returns to the current chapter when the learner leaves a lesson. Optional checks and speaking activities remain separate from completing a practice visit. Route milestones survive the activity log's 200-attempt retention limit.

Twenty-five optional activity cards now follow their actual prerequisite lessons. Gates require taught phrases, rather than merely opening a lesson. The original 969 Lithuanian card identities, lesson assignments and course PATH remain unchanged.

Six missing month cards complete the twelve-month set in a new lesson, The remaining months. The local Lithuanian course now contains 975 cards, 144 teaching lessons, 43 units and 35 existing course conversations. The six new full dialogue activities below are additional practice, separate from those 35 conversations.

## New practice

- Calendar, descriptions and rooms provide reading, listening, constrained writing and optional recorded self-comparison. Description tasks accept compatible person/trait pairs.
- Six full, recorded two-speaker dialogues use 32 turns composed from taught course phrases. Questions unlock after actual complete playback. Opening the transcript marks assistance. All six files can play on the first visit without a network connection after the app is installed and cached.
- Spoken requests compare the browser's recognised transcript with familiar requests. Recognition errors or unsupported browsers award no result. Negated requests cannot match a positive request through an alternate recognition result. This is not pronunciation or fluency assessment.
- The short-message coach supports original text, checks four requested details and flags a small set of familiar pattern errors. Unrecognised alternatives need review and are not automatically errors. Guided drafts have their own evidence category and do not count as independently assessed writing.

Both new message drafts and the existing A1–C2 writing portfolio detect conflicting saves from another tab, retain the newer stored version and allow the competing text to be exported. Draft text stays in its separate local storage, outside the activity outcome log.

## Audio and verification

Existing configured voices produced 376 missing standard lesson clips and six complete dialogue files. The Lithuanian standard audio audit covers 5,661 clips with no quiet clips detected. Dialogue playback was tested separately, including cold offline playback.

Browser checks cover the real teaching launch/return, source gates, all 23 bilingual topic flows, both held-feedback checks, six full dialogue recordings, unsupported recognition and recognition errors, message feedback and persistence, small screens, and existing introductions/adventures. All 36 A1–C2 writing projects passed preparation, draft, self-review, revision, storage failure, export and offline checks. A separate two-tab regression checks competing drafts and export.

Reproducible checks: `tools/check_a1_route.py`, `check_a1_course.py`, `check_a1_topics.py`, `check_a1_expansion.py`, `check_a1_message.py`, `check_draft_tabs.py`, `check_writing_studio.py`, `check_lithuanian_additions.js`, and `check_audio.py lt`. Browser verification artifacts are under `output/`.

## Scope still requiring work

Native-speaker and educator review have not been performed. Recognition adapter tests use a controlled recogniser; the live browser recognition service and a learner's microphone were not tested. Rule-based message feedback cannot assess arbitrary grammar, meaning or proficiency. Full A1 descriptor coverage and independent assessment remain unvalidated, and the broader four-skill A2–C2 curriculum is unfinished.

The [runtime coverage report](ACTIVITY-COVERAGE.md) records the current 42 Lithuanian and 25 Spanish A1 activity modules. Its counts describe implementation, not CEFR achievement. Writing workshop labels through C2 describe practice stages, not certified learner levels.
