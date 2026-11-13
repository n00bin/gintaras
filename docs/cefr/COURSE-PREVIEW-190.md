# Course preview 3.118-preview / build 190

This is local development; production remains 3.116 / build 188. It extends the [189 preview](COURSE-PREVIEW-189.md) without changing the original target-language sources or ordinary lesson IDs.

## Required written interaction

Every workshop now includes written exchanges alongside the existing writing projects. The 48 original workshops each have two branches; the 12 band applications each revisit four branches from their two prepared source units. Total: **144 required written exchanges** across both languages.

The learner writes a question, reads the prepared partner's confirmation or correction, checks the clarified detail, drafts a response and revises it. Saved passages and a revision reflection record how the learner addressed the reply. Question and response frames are optional and their use is saved. The app accepts learner wording without pretending to judge its grammar or pragmatic success automatically.

All questions, partner messages and example responses are bound to already prepared source language. Source-unit order is checked. The two-source band applications require those source units first. No new vocabulary is silently introduced.

Existing workshop drafts and comprehension results remain stored. New exchanges are required before a unit is complete. Drafts resume locally and offline; exports include actual text and support use. Evidence review packets now show the written exchange as well as standalone writing projects.

## Speaking revision

New presentation attempts require a first recording/replay/self-review, then another recording/replay describing the change made. The first review and revised review are stored separately. Returning to a previously completed spoken task preserves its earned completion and previous review while the learner practises again.

Explicitly retained recordings use separate `production.first` and `production.0` roles. A retained first take cannot satisfy a reviewer check for the final presentation recording. Voice meaning and improvement are not automatically assessed. Browser test audio is generated, not human learner proficiency evidence.

## Verification

- All 144 written branches passed UI checks, draft reload, detail checks, mandatory revision, failed-save rollback/retry, original course-state preservation, 320 px layout and offline restoration: `output/written-interaction/verification.json`.
- All 60 presentation tasks passed first and revised generated-microphone recording/replay, distinct review retention and original course-state preservation: `output/speaking-revision/verification.json`.
- Reviewer packets, actual retained audio, tampering/stale-feedback rejection and persistent deletion passed: `output/assessment-portfolio/verification.json`.
- Update from live build 188 preserves word records, lessons, personalization, XP and Unit 3 access in public and preview modes: `output/course-update/verification.json`.
- The complete 60-workshop walkthrough passed for both languages (30 units and 42 writing projects per language), including required reading/listening variants, guided and written exchanges, both presentation takes, revision, unlocks, export and offline restoration. Both language runs reported zero page errors and unchanged original course state: `output/skills-studio/verification.json`. This uses synthetic test responses and generated microphone input; it does not establish learner proficiency.

The full CEFR release gate remains closed: broader syllabus and performance evidence, exact-version language/descriptor review, calibrated assessment and remaining art are not replaced by these workflow checks. No proficiency level is awarded.
