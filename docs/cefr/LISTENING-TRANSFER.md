# Controlled listening transfer

[A2 spoken transfer](A2-LISTENING.md) now extends this A1 bank with sixteen complete messages and forty-eight meaning questions. The combined bank has thirty-two recordings and ninety-six questions. Existing A1 sources, typed-answer keys and saved task identities are preserved.

The four A1 units per language now have two additional complete spoken messages each: sixteen recordings and forty-eight listening-detail questions across Lithuanian and Mexican Spanish. The listening texts differ from the prepared sources and the reading-transfer documents. The content audit checks every target-language form against earlier explicit teaching.

Learners open **Apply this language in a new listening** from a unit or use `#listen-transfer`. Vocabulary, source-language, grammar and both prepared-source comprehension checks are required first. These are controlled tasks on known language, not an independent full A1 examination.

## Learner flow

1. Begin a new recording version, or resume an interrupted check.
2. Read the question and listen to the complete message. Answers stay locked until playback finishes successfully.
3. Enter three short details in English or the target language. Feedback is held until all three are recorded. The message may be replayed.
4. See the answer feedback and transcript, then return to the unit or try the other version.
5. After both versions have been attempted, subsequent visits are labelled repeat practice.

The transcript is absent from the question interface, including its accessible text. An early `ended` event, a failed audio start, cancelled playback or an unsaved completion does not unlock answers. Moving between questions retains the completed playback for that visit. Closing or reloading an unfinished check requires listening again.

## Recordings and evidence

Recordings use the existing Google text-to-speech configuration and Achernar voice. They total 142.944 seconds and 571,776 bytes. Generation used 1,668 new source characters; an idempotent rerun generated no new source characters. These are synthetic voices, not evidence of varied human-speaker coverage or reviewed pronunciation quality.

The independent manifest records source hashes, voice, language, duration and file paths. All sixteen MP3 files decode, pass the existing quiet-file threshold and match the source hashes. Every file is included in the installation cache.

Listening outcomes use `wordami.listening-transfer.v1.<language>`, separately from reading outcomes and original course progress. They retain source exposure, versioned attempts, completed-playback counts, the recording hash used for answers, timestamps and answer outcomes. Raw typed answers are not saved or uploaded. Records can be exported, are excluded from account sync, and do not change XP, FSRS or workshop completion. No CEFR level is assigned.

The existing reading workflow now shares the transfer engine; its storage key, source signatures, routes and records remain compatible. Changes to an answer key do not reset exposure to an unchanged source.

## Verification

- All sixteen recordings were decoded and actually played to completion in Chromium tests with accelerated playback.
- Both-language browser tests cover every version, all forty-eight questions, incorrect answers and held feedback.
- Failure tests reject early completion events, failed playback, failed playback saves and failed answer saves.
- Tests cover reload/resume, closing/reopening, cancellation, transcript visibility, repeats, export, 320-pixel layout and language isolation within the same browser context.
- Reading-transfer regression tests still pass all sixteen reading documents, storage conflicts, source exposure and answer-key changes.
- Cold offline installation tests load both banks and complete the first previously unused listening recording, using synthetic prerequisite fixtures. Both languages report no page errors or failed requests.

Commands: `python tools/audit_transfer_content.py`, `python tools/build_listening_transfer_audio.py --check`, `python tools/check_listening_transfer.py`, `python tools/check_transfer_reading.py`, and `python tools/check_skills_offline.py`. Source review books contain every listening transcript, recording link and model answer, without learner data.

## Remaining scope

This provides controlled A1 listening application after teaching. Longer discourse, more genres and speaker variation, higher-level transfer, language/descriptor review and calibrated speaking/writing assessment remain incomplete. The [release audit](CURRICULUM-AUDIT.md) still blocks a full CEFR-course launch. This work remains local; no production push was performed.
