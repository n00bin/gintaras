# Expanded course build

Historical 36-unit checkpoint. The current build has 60 workshops; see [current continuation](COURSE-PREVIEW-193.md) and [generated implementation inventory](SKILLS-COVERAGE.md).

This 36-unit checkpoint has since expanded to [48 units with vocabulary preparation and pronunciation](VOCABULARY-EXPANSION.md). The generated inventory contains current counts.

The course now contains eighteen connected all-skills units per language: three units at each target band, A1 through C2. This adds twenty-four units across Lithuanian and Mexican Spanish to the twelve original workshops. The build and automated verification continue independently of the deferred language review.

## Unit sequence

| Target band | Original workshop | Added unit | Added unit |
| --- | --- | --- | --- |
| A1 | Meet and make a plan | Buy everyday things | Welcome someone to your home |
| A2 | Change an everyday plan | Arrange and change an appointment | Plan a working day |
| B1 | Handle a travel complication | Solve an access problem | Organise a community event |
| B2 | Weigh a public-service decision | Negotiate a working arrangement | Read a report critically |
| C1 | Separate evidence from inference | Evaluate competing explanations | Interpret a cultural dispute |
| C2 | Preserve nuance under challenge | Communicate uncertainty precisely | Interpret voice and ambiguity |

All units include eight phrase-preparation exercises, source-language reading, an English guide, distinct listening material and its guide, six comprehension questions, spoken production, three recorded partner turns, and spoken mediation. New units include their own writing assignment rather than reusing the original library-service writing briefs for unrelated topics.

The new materials add 192 bilingual phrase preparations, twenty-four reading sources, twenty-four listening sources, seventy-two partner prompts and twenty-four topic-specific writing assignments. Their grammar and strategy teaching addresses the situation: object/request forms and agreement at A1, schedule and confirmation distinctions at A2, connected accounts and clarification at B1, negotiated conditions and causal claims at B2, selection and competing values at C1, and decision thresholds, framing, irony and ambiguity at C2.

## Learning and progression

The course overview groups the three units under each band. A unit opens after the preceding unit’s comprehension, recorded tasks and writing work are complete. This gives a sequence of eighteen units rather than one workshop followed immediately by the next target band.

Existing original workshop IDs and saved results remain intact. Added units have new IDs and separate state. A learner with completed original workshops retains that work, while newly inserted units still need to be completed to follow the expanded sequence. This change does not relabel the original 975 Lithuanian or 807 Spanish cards, modify PATH, award XP, or alter FSRS schedules.

Comprehension answer positions are shuffled while retaining their source keys, so a repeating option position cannot substitute for reading or listening.

Locked units provide read-only source previews and audio. Looking ahead does not mark preparation complete, begin an activity or award comprehension results.

## Writing in new units

Each added unit has a reader, purpose, three specific goals and a suggested length. Drafts autosave on the device. Learners save an initial draft, revise it, quote evidence from the revision for all three goals and explain a change. A reviewed version is saved only after these process requirements. The latest two reviewed revisions remain in the portfolio, and individual drafts or the full portfolio can be exported.

Storage failures retain the draft without completing the assignment. Conflicting saves preserve the newer tab’s stored work and allow export of the local version. Quotes and reflections remain in the local portfolio, separate from the outcome-only activity log. These mechanisms verify a revision process; they do not grade language accuracy or replace the deferred language review.

## Current inventory

- 36 all-skills units across both languages.
- 216 comprehension questions.
- 180 required recorded responses.
- 60 writing projects: 36 original projects plus 24 new unit assignments.
- 144 audio files: 36 complete listening recordings plus 108 partner prompts.
- Approximately 23 minutes 30 seconds of complete listening material; all course audio files total 7,016,352 bytes.

The [complete source books](review/README.md) include all teaching material, questions, keys, audio links and writing briefs for the deferred review.

The latest audio batch uses the existing configured Google service and voices, adding 96 files from 15,843 characters. Regeneration is idempotent and updates the offline cache list. The [generated coverage inventory](SKILLS-COVERAGE.md) records exact source lengths, tasks and files per unit.

## Verification and release state

`tools/check_skills_studio.py` walks all thirty-six units, including the sixty writing projects, with real audio decode/end events and Chromium-generated microphone input. It covers source gates, held feedback, incorrect-answer retry, recording and replay, reflections, revision, autosave/resume, quota-failure rollback, next-unit unlocks, exports, small screens, offline reload and unchanged course state.

`tools/check_skills_audio.py` checks all 144 recordings against source hashes, durations, decoded signal and the installation-cache list. `tools/check_skills_errors.py` covers missing or cancelled playback, microphone errors, late permission cleanup and competing-tab saves. `tools/check_skills_offline.py` checks both languages and first offline playback of a newly added advanced recording. Prior writing preparation is covered by `tools/check_skills_prior_writing.py`.

The build remains in local preview at `?preview=1&lang=lt#skills` and `?preview=1&lang=es#skills`. No production deployment or language-review signoff was performed. The inventory describes built material; it does not establish complete CEFR descriptor coverage or calibrated proficiency assessment.
