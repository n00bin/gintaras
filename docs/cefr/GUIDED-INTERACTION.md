# A1 checking and clarification practice

The four A1 units in each language now offer a guided checking exchange: eight scenarios with two recorded branches each. They practise meeting times, prices, key locations and directions using language already prepared in those units.

## Activity sequence

1. Hear the unit's familiar listening message completely.
2. Choose a short checking question, hear its model if needed, then record and replay the question.
3. Confirm that the recording asks the selected question. The selection drives a prepared confirmation or correction from the partner.
4. Hear the partner's complete reply and identify the clarified detail.
5. Record and replay a response using that detail, self-review it and name one improvement.

Both checking questions are legitimate. One asks about the stated detail; the other checks an alternative, which the partner corrects. The goal is to use the clarified information instead of repeating an assumption. The partner follows the learner's selected question, not an automatic interpretation of their voice. This is guided recorded practice, not a live adaptive conversation or independent proficiency test.

The checking questions use familiar fragments with questioning intonation. Written models and sixteen spoken question models support this strategy. Sixteen separate partner replies provide the confirmation/correction branches. No new target-language forms are demanded; the source audit checks the questions and replies against cumulative explicit teaching.

## Recordings and state

Initial situations reuse the existing prepared unit recordings, not the separate held-out reading/listening-transfer documents. The new clips include sixteen question models using Iapetus and sixteen replies using Achernar, matching the prepared speaker's voice. The current thirty-two clips total 60.864 seconds and 243,456 bytes. Source hashes, actual decoding and offline cache membership pass; an idempotent generation rerun creates no new source characters.

Each own response requires actual recording, complete replay and a checked self-review criterion. The final response also requires an improvement reflection. Local recording replay uses the media element's natural completion state, avoiding unreliable comparisons between encoded audio length and wall-clock recording duration.

Audio stays in the session and can be downloaded. Moving on or leaving stops the microphone and revokes temporary recording URLs. Saved reviews contain approximate duration, timestamps and self-review metadata, never uploaded or persistent audio. Interrupted rounds resume from their last saved stage; an unsaved recording must be recorded again. Partner replies must finish again after reopening their listening stage.

Records use `wordami.interaction-practice.v1.<language>` and retain eight recent rounds per unit. They are explicitly assisted/self-reviewed and can be exported. They do not change original course completion, XP, FSRS, or the separate transfer-check exposure records, and do not award CEFR levels.

## Verification

- All eight scenarios and sixteen branches pass in both languages with thirty-two own recordings and replay.
- The content audit verifies prepared forms, source-matched clarified details and recording hashes.
- Audio tests decode all thirty-two current clips and validate durations, quiet-file thresholds and cache membership.
- Browser tests reject an early completion event and microphone denial; failed review saves roll back without discarding the current recording.
- Tests cover wrong-detail retries, saved-stage reloads, export, unchanged original progress and transfer-check records, 320-pixel layout, and microphone shutdown when leaving mid-recording.
- Cold offline tests finish a correction branch with two real recording/replay cycles using synthetic course prerequisites and generated microphone input, in both languages. No page errors or failed requests are reported.

Fresh direct unit URLs now refresh optional activity links after extension scripts load. This fixes reading/listening/interaction links that could previously require another navigation before appearing.

Commands: `python tools/audit_interaction_practice.py`, `python tools/build_interaction_practice_audio.py --check`, `python tools/check_interaction_practice.py`, and `python tools/check_skills_offline.py`. Source review books contain the actual question and partner branches with recording links.

Linguistic review, broader interaction coverage, varied spontaneous follow-up and calibrated productive-skill assessment remain incomplete. The curriculum release gate stays blocked. This work remains local; no production push was performed.
