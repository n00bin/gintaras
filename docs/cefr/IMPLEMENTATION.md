# A1 foundation: first working milestone

Implemented 6 November 2026. Available locally with `?preview=1&lang=lt#a1-practice` or `?preview=1&lang=es#a1-practice`. Not deployed, and not a complete A1 course or CEFR assessment.

Second checkpoint: [introductions](INTRODUCTIONS.md) now adds a six-task reading/listening/writing sequence and self-recorded speaking practice in both languages, using the shared activity runtime.

Third checkpoint: [ten additional scenarios](A1-SCENARIOS.md) extend the same structure to the other initial A1 objective candidates. These are practice drafts, not validation of the complete A1 level.

## Playable activities

Both languages have a preview practice entry at the top of the learning path and four separate skill summaries:

- Reading: identify a drink on a small menu and understand a familiar coffee request.
- Listening: identify two drinks from existing course recordings. Choices remain disabled until the relevant audio segment finishes. Sound-off, playback failure and cancellation do not produce a successful listening result.
- Speaking: record a coffee request, play it back, hear the course example and explicitly mark self-comparison complete. This records self-comparison practice only, not assessed speaking ability. The recording is not uploaded or persisted in the progress store. The browser must support recording, and the learner controls microphone permission.
- Writing: type an order, bill request and card-payment question. Lithuanian reuses the existing café adventure. Spanish has a new three-stage writing visit using existing taught phrases. These are constrained requests, not assessment of original writing.

All displayed and requested target-language phrases resolve against exact course cards. The activities check the existing `taught` rule before allowing entry and before recording results. A missing phrase shows source lesson names without revealing the untaught answer. Listening and speaking reuse existing recordings rather than generating new material.

## Shared activity contract

`activity-core.js` registers activity IDs, versions, objective IDs, exact phrase prerequisites and task definitions. Each task identifies a skill and method (`comprehension`, `constrained_response`, or `self_recording`). Empty prerequisite lists and unsupported definitions are rejected. Definitions and returned attempts are copied so UI consumers cannot accidentally mutate the registry or evidence store.

Attempts preserve start/completion dates, language, activity version, objective, tries, hint use and whether listening playback completed. Progress summaries distinguish first-time unassisted responses from supported/retried responses. Self-recording appears separately from assessed/comprehension responses. `level` remains null; there is no conversion to CEFR proficiency.

Attempt histories are device-local, per language, under `wordami.activities.v1.lt` / `.es`, capped at 200 attempts. They do not sync to accounts. Sessions use `wordami.activity-session.v1.<language>`, `wordami.writing-session.v1.es`, and the existing `wordami.adventure.lt.cafe.v2` key. Replaying creates a new practice attempt; reloading does not duplicate an existing result. Previously completed café visits are not retroactively converted into new skill evidence.

The core does not change course records, XP, FSRS or Can Do awards. It only runs in preview. Script and picture assets join the offline shell. Existing audio remains available offline once downloaded into the normal audio cache.

The shared recording player's rejected playback promise is now handled so an unavailable/unplayable recording produces a retry message instead of an unhandled browser error.

## Verification

`G:/Python/python.exe tools/check_a1_practice.py` exercises both languages through browser controls, actual course-audio decoding, and a synthetic browser microphone (no user microphone was accessed by the automated tests). It verifies:

- New and partially taught learners are locked; missing/empty activity definitions fail closed.
- Reading errors and hints do not count as first-time unaided responses.
- Listening answers cannot be recorded before playback; sound-off does not unlock choices.
- Reload resumes the reading/listening visit without duplicate results.
- Speaking completion requires a recording, playback and the model example; the summary keeps it unassessed.
- Spanish writing prerequisites and resume work; Lithuanian café writing feeds the same per-skill summary.
- Language histories are separate, course/FSRS state is unchanged, and public mode exposes no practice UI.
- Layout fits 320px, Escape closes the modal, and offline reload restores the hub and saved summaries.

`G:/Python/python.exe tools/check_adventure.py` also passes the original café flow and offline/regression checks after integration. Screenshots and machine-readable results are under `output/a1-practice/` and `output/adventure/`.

## Remaining work

The initial milestone exercises one narrow café objective; the second checkpoint adds initial personal-introduction practice. The remaining A1 objectives, broader document comprehension, longer listening, original messages, spontaneous speaking, calibrated assessment, teacher review and learner trials remain outstanding. A2–C2 remain roadmap work. Practice counters must not be presented as a CEFR level or certificate.
