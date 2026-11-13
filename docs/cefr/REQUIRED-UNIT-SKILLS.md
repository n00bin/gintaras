# Required skills within each unit

Owner correction, November 9, 2026: CEFR-aligned activities belong to the unit and to testing out of the unit. They must not appear as optional enrichment.

Published as **3.116 / build 188**, commit 4878b635205d7e022984d2adf7257f1325e0286d. See docs/REQUIRED-SKILLS-LIVE-RELEASE.md. This implementation covers all three practical activities currently public, in Lithuanian Units 1–3. The separate larger A1–C2 curriculum remains unfinished and must adopt this same required-unit model as it is completed.

Local update, November 9: [preview build 189](COURSE-PREVIEW-189.md) now applies the required-unit model to all 80 foundation applications and integrates all 60 advanced workshops into the course path. Separate source checks and guided exchanges are also required in the original 48 workshops. This expanded implementation has not been deployed; the public Units 1–3 implementation remains preserved outside preview mode.

## Behaviour

- Each assigned application sits inside its unit immediately after the last prerequisite lesson, explicitly labelled required. The separate top-level optional-practice card is removed.
- Unit completion requires both the existing taught lessons and the assigned reading/listening/writing application plus its recorded speaking activity. Speaking strengthening replays may remain optional; the assigned speaking task is required.
- Existing word learning, FSRS records, lesson IDs and reached units are preserved. Previously started units stay accessible; missing applications remain visible in their source units.
- Vocabulary test-out defers all skip credit for affected units until the required skill checks finish. Its reading/listening/writing attempt must be first-time correct without hints. Wrong answers require another attempt; the vocabulary result survives reload. Speaking requires recording, playback and self-comparison with the course example.
- Completion markers use the existing lesson-progress collection. Practice attempts keep their versioned device evidence. The in-progress test-out is saved in the language's course state.
- Recorded self-comparison is participation evidence, **not independent validation of speaking quality**. Browser microphone support is needed to complete that task. No CEFR level or pronunciation score is awarded.

## Verification

`tools/check_required_unit_flows.py` passed all six authored variants with real course audio, generated microphone input, playback, writing errors and corrections, persistence, mobile layout and offline resume. Word-review records remained unchanged.

`tools/check_required_unit_gates.py` passed required path placement, incomplete-unit locking after word lessons, speaking completion gating, deferred test-out credit, absence of hints during independent checks, failure/retry, reload/resume and final course credit after actual audio and microphone UI. No browser errors.

Course structural validation and public packaging preflight also passed. Before publishing, bump the app and service-worker release together, verify an installed app updating from build 187, and stage only this scoped change. Keep the separate root curriculum preview out of the release.

## CEFR interpretation

Unit objectives should select relevant can-do descriptors and connect teaching to demonstrations in a task. Passing a single familiar unit does not establish a whole CEFR level or broad mastery. Full level judgments require broader performance evidence across contexts and skills.

Sources: https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors and https://www.coe.int/en/web/common-european-framework-reference-languages/classroom-assessment.
