# Course preview 3.117-preview / build 189

Local candidate: `output/course-preview-189-final`. This package has not been deployed. Production remains 3.116 / build 188.

## Implemented

- 80 source-bound foundation applications across Lithuanian and Spanish, including the retired Lithuanian sounds unit for review. Every application has two authored variants, each with two reading, two listening and two writing tasks, followed by recorded speaking and comparison. Existing ordinary lessons and conversations remain prerequisites. Test-out defers credit until every covered unit's checks finish.
- 60 required A1–C2 workshops: five per target band and language. Each has contextual vocabulary, taught phrases, meaning guides, grammar prerequisites, reading, listening, recorded production, three partner turns, mediation and revised writing.
- The original 48 workshops require both separate reading sources, both separate listening sources and both guided exchange branches. The 12 new band applications combine two previously prepared contexts for a new purpose; they are not unseen examinations.
- 84 project-specific writing models with 252 purpose exercises, saved planning, drafts and revision.
- Per-unit rubrics and artifact portfolios. Learners can explicitly retain recording copies locally, export actual audio and writing, receive reviewer feedback bound to the submitted artifacts, and delete device recording copies. Reviewer identity and calibration are not automatically verified. No CEFR level is awarded.
- Existing public Lithuanian Units 1–3 retain their required practical lessons outside preview mode. Spanish and the expanded course remain in preview. Existing card IDs, word progress and published art are preserved.

## Verification evidence

| Scope | Result |
| --- | --- |
| Foundation applications | All 160 variants passed actual playback, generated microphone/replay, writing, error handling, saved progress, mobile layout and offline restoration: `output/native-applications/verification.json`. |
| Original workshops | All 48 workshops and 72 projects passed the complete walkthrough, including newly required extensions: `output/skills-studio/verification.json`. |
| New band applications | All 12 passed six-skill workflows, actual media, writing revision, 320 px layout and offline restoration: `output/capstones/verification.json`. |
| Writing preparation | All 84 models and 252 purpose exercises passed plan persistence and draft-preservation checks: `output/writing-preparation/verification.json`. |
| Audio | All 720 entries match their sources, decode, have usable audio and appear in the offline list: `output/skills-studio/audio-audit.json`. Aliases reuse exact existing recordings; there are 558 distinct files. |
| Required test-out | Both languages passed multi-unit deferred credit, next-check navigation and reload recovery: `output/native-applications/testout-verification.json`. |
| Evidence review | Both languages passed actual recording retention/export, hash binding, tampering rejection, stale-feedback detection and persistent deletion: `output/assessment-portfolio/verification.json`. |
| Installed learner update | Live build 188 to preview 189 preserves word records, lessons, personalization, XP and Unit 3 access in public and preview modes: `output/course-update/verification.json`. |
| Curriculum migration | Newly inserted applications require completion before the next band while retaining original workshop work and later drafts: `output/learning-structure/migration-verification.json`. |

Browser microphone input is synthetic and playback is accelerated in tests. These checks verify behavior; they do not establish language accuracy, pronunciation, learner proficiency or calibrated assessment.

## Release boundary

The structure audit passes. The full CEFR release gate deliberately remains closed. The [task and evidence map](COURSE-EVIDENCE-MAP.md) identifies the implemented scope and gaps. The [review books](review/README.md) contain the actual sources, teaching, writing models, questions and audio links for all 30 workshops per language.

Remaining work includes exact-version language and descriptor review, broader syllabus/genre and spontaneous-interaction evidence, reviewer calibration and learner trials. The target-band labels and five workshops per band do not prove complete CEFR coverage. The outstanding Lithuanian artwork inventory remains separate; no new pictures were generated for this preview.

The root workspace contains extensive uncommitted work. Do not bulk-stage or publish it. The isolated production worktree has tested listening-buffer and test-out source-exposure fixes; those fixes have not been deployed either.
