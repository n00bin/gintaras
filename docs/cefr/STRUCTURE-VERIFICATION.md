# Learning structure changes and verification

The 7 November 2026 structure pass covers both existing card paths and the 48 connected all-skills units. It fixes verified teaching and workflow gaps. It does not approve a complete CEFR syllabus or certify learner proficiency.

## Changes learners see

- Every unit has a learning plan: prerequisite, communicative purpose, goals for six skills, support guidance and an ordered learning cycle.
- Every unit explains three actual sentence-pattern examples with language-specific notes. The selected CEFR scale goals link to the Companion volume and exact activity IDs; they are design targets awaiting review.
- All 384 vocabulary introductions show an actual source sentence. Meaning practice hides the studied answer and offers an explicit help button.
- The eight A1 units include 115 additional form explanations for reading, listening and partner questions. These include time changes, question words, polite forms, inflections, and names. They supplement the scheduled vocabulary deck rather than inflate its count.
- All writing tasks require the connected unit's vocabulary, sources, grammar and both comprehension checks. Original writing projects retain their own model preparation as an additional requirement.
- Failed phrase/source saves roll back their in-memory completion markers. New or unavailable A1 source support blocks practice until preparation is available, without erasing drafts or previous results.
- A changed early prerequisite blocks every later unit, including units whose immediately preceding activity had already been completed. Studying the new material restores existing completed work without replaying it.

## Verification evidence

The full browser walkthrough completed all 48 units and 72 writing projects in both languages. It exercised actual audio completion, generated microphone recording and replay, comprehension, grammar, revision, unlocks, export and offline reload. Generated microphone input verifies the recording workflow, not language performance.

The focused learning-structure test additionally verifies both writing prerequisites, failed-save rollback, missing-source failure, source-support migration, source contexts and 320-pixel layout. A separate synthetic completed-course fixture proves that an early preparation change preserves later drafts and completion records while enforcing the full prerequisite sequence.

Existing card-path checks passed in both languages, including conversation words taught earlier, mini-chat prerequisites, drill safeguards, pronunciation references, pictures and path identities. The Spanish check verified 807 cards, all recordings and 226 new conversation utterances; the Lithuanian compatibility check preserved all 969 original cards and path assignments.

Vocabulary and FSRS tests passed taught-only gates, saved schedules, assistance handling, distinct Spanish word senses, calendar-based FSRS progression and quota rollback. Cold offline tests passed in both languages with the learning plans, source support and previously unused advanced audio available. All 21 character portraits are now in the installation cache; those offline runs reported no failed requests or page errors.

Useful commands:

```text
node tools/check_course.js lt
node tools/check_course.js es
node tools/check_spanish.js
node tools/check_lithuanian_additions.js
python tools/audit_curriculum_release.py
python tools/check_learning_structure.py
python tools/check_curriculum_migration.py
python tools/check_skills_studio.py
python tools/check_skills_offline.py
python tools/check_vocabulary_study.py
python tools/check_phrase_review.py
python tools/package_site.py --check
```

## Release preparation

Static packaging includes the app and public assets through an allowlist. It checks HTML, installation icons and every service-worker cache path. Local output, source review books, tools, worktrees, screenshots and environment files are excluded. The GitHub Pages workflow runs the structure audit and uses this packager.

The [release audit](CURRICULUM-AUDIT.md) still records pending language/prerequisite and descriptor review, incomplete assessment and unestablished full-course breadth. The local build number also predates the saved remote reference; a release must reconcile newer live changes and advance the version. No production release, commit or push was performed in this pass.

CEFR design references: the [Council of Europe classroom guidance](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-in-the-classroom) links goals, teaching and assessment; its [assessment-linking manual](https://www.coe.int/en/web/common-european-framework-reference-languages/relating-examinations-to-the-cefr) describes the evidence-building process for relating examinations to CEFR levels. These references guide the audit, not an endorsement of Wordami.
