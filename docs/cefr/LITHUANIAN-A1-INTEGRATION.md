# Lithuanian A1 integration checkpoint

Local preview only. This checkpoint connects existing teaching and practice; it does not declare the course complete or award a CEFR level.

## Changes implemented

Fourteen optional practice/check cards now sit beside the lessons that introduce their required language. Placement is calculated from the actual source cards and teaching-path order, rather than a manually guessed unit number. Open units show cards after the latest required lesson; folded units keep their practice reachable. Several activities sharing a lesson retain a stable order.

The twelve practice situations are the café, introductions, routines, directions, messages, prices, schedules, family, home, preferences, shopping and clarification. Two additional cards offer checks of meeting details and prices/quantities. The separate original restaurant-writing adventure remains available after the restaurant unit.

Locked activities now offer “Find this lesson” links to their teaching on the learning path. These links scroll to the source unit and do not award teaching, mark a lesson complete or bypass its ordinary unlock conditions. Activity navigation updates its supported hash route so a reload returns to the intended activity.

No unit, lesson, item or conversation IDs were changed. `PATH`, course order, existing progress keys, XP, crowns and FSRS are preserved. The cards are additions to the existing course, not a reordered or independently validated A1 syllabus.

## Held-feedback checks

`#meeting-check` uses familiar days, times, a meeting place and invitation phrases. `#price-check` uses familiar quantities, prices and shopping requests. Both require all source cards to have been taught before entry.

Each check has two reading, two listening and two constrained-writing tasks. The reading and listening details use different combinations; listening joins existing recorded source clips into a fresh pair of details. These are controlled recordings, not a natural multi-speaker listening exam.

Answers are entered without choices, hints or per-answer correctness feedback. The learner records each response once, then sees separate task counts and example answers after the sixth response. Invalid empty responses and unavailable audio do not advance. Listening responses cannot be submitted before both audio segments finish. Reload resumes without revealing feedback early.

An attempt with incorrect responses still finishes and retains those outcomes. Completing the attempt does not mean passing it. The shared activity core recognises this `checkpoint` kind while preserving the all-correct completion rule for normal practice. No overall level is calculated. Speaking is explicitly marked as not independently checked; existing self-comparison practice is not substituted for assessment.

Arabic time and price formats such as `07:00` and `2.00` are accepted alongside the relevant learned phrases. Either accepting or declining the separate invitation-writing situation is valid. Typed replies are not retained in the check record; the attempt stores task outcomes and source-variant indices.

## Evidence and remaining gaps

`G:/Python/python.exe tools/check_a1_course.py` verifies all fourteen placements, repeated tree renders without duplicate cards, placement after actual source lessons, activity routing, direct-link prerequisite locks, held feedback, deliberate incorrect answers, actual recorded playback, reload/resume, numeric formats, completion with errors retained, separate skill results, unchanged course state and 320px layout. Results are in `output/a1-course/verification.json`.

The earlier [runtime coverage report](ACTIVITY-COVERAGE.md) shows that the twelve practice situations sample 49 distinct existing course cards. A topic appearing in that report does not establish comprehensive teaching or assessment of the corresponding skill.

The principal content gaps to address next are:

| Area | Existing sample | Missing breadth or independent evidence |
| --- | --- | --- |
| Personal information | A name and origin | Varied personal forms, contact details and follow-up exchanges |
| Numbers/time | A few quantities, prices, days and times | Broader dates, changing schedules and practical information combinations |
| Reading | Short profiles, labels and notes | More varied original messages, notices and short practical documents |
| Listening | Familiar recorded words/phrases, now combined | Fresh natural short recordings with varied speakers and meaning-focused questions |
| Directions | Left/right/straight and a place question | Multi-step routes and checking misunderstandings |
| Descriptions | A small set of family/home statements | Varied people, objects, rooms and personal descriptions |
| Writing | Familiar requests and bounded sentence combinations | Original short messages judged for task success and language accuracy |
| Speaking | Record, replay and compare | Independently assessed spoken production and live response/repair |
| Curriculum | Existing lessons linked to initial objectives | Educator-reviewed descriptor coverage and a coherent level-specific teaching sequence |

The writing studio adds open-ended workshop drafts and self-review, but does not close the assessment gaps above. Native-language review, assessment calibration, learner trials, account sync and deployment remain outstanding. No “A1 achieved” claim is justified by this checkpoint alone.
