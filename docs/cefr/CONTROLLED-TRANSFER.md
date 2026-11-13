# Controlled reading transfer

The four A1 units in each language now offer two changed-detail reading documents each: sixteen documents and forty-eight short-answer comprehension questions across Lithuanian and Mexican Spanish.

[A2 reading](A2-READING.md) extends the same bank with sixteen further documents and forty-eight meaning-choice questions. A1 sources, short-answer keys and saved identities remain unchanged.

Learners open **Apply this language in a new reading** from the connected unit, or use `#transfer`. Both prepared-source comprehension checks, vocabulary, source-language and grammar preparation must be complete first. The document and question models are not shown in the learner interface before that gate.

## What changes

- Invitations recombine familiar names and meeting times.
- Shopping notes change the relationship between quantity, price and payment.
- Visitor notes change room descriptions, key locations and offered drinks.
- Directions change the relationship between a landmark, a turn and an arrival time.

The bank uses explicitly prepared target-language forms. `tools/audit_transfer_content.py` checks every document against cumulative phrase preparation, scheduled vocabulary and additional source glosses, and checks that its model details occur in the actual document. These documents combine learned language; they are not unrehearsed long texts or a complete independent A1 assessment.

## Evidence and feedback

Each check collects three short answers, with feedback held until all three are recorded. English and specified target-language forms are accepted. Accent marks are not graded because this is a comprehension task, not a spelling or writing assessment. Decimal punctuation between digits is preserved when matching numerical details, so `4.0` cannot turn into `40`.

There are two source versions per unit. A saved exposure marker distinguishes a document's first visit from repeat practice. Document exposure is stored separately from the task/answer-key signature: changing accepted aliases does not make an unchanged document unseen again. The interface clearly labels repeat practice once both documents have been used.

Records keep up to eight recent attempts per unit and retain the source-exposure markers beyond that attempt window. Exports contain versions, timestamps and answer outcomes, never the short answers learners typed. Records stay on the device, use their own `wordami.transfer.v1.<language>` key, and do not change original course progress, XP, FSRS schedules, workshop completion or account sync. No CEFR level is assigned.

A failed save rolls back the answer or new attempt. A competing tab's save blocks an overwrite. Interrupted checks resume at the unanswered detail; a restart cannot quietly convert a repeat into fresh evidence.

## Verification

- The content audit passes all sixteen documents and forty-eight questions, with no untaught target-language forms.
- Both-language browser checks cover all source variants, incorrect answers, withheld feedback, prerequisites, quota rollback, interruption/resume, exports, cross-tab conflicts and first-versus-repeat status.
- A changed answer-key fixture confirms that previously seen documents retain their exposure status.
- Original course state and workshop progress remain unchanged during checks.
- A 320-pixel browser viewport passes layout checks.
- Cold offline tests load the bank and complete a reading check using synthetic prerequisite fixtures, in both languages, with no page errors or failed requests.

Commands: `python tools/audit_transfer_content.py`, `python tools/check_transfer_reading.py`, and `python tools/check_skills_offline.py`. The full source review books include every document and its model details. No new audio generation or scoring service is used.

## What remains

This closes part of the changed-detail reading gap at A1. [Controlled listening transfer](LISTENING-TRANSFER.md) now adds sixteen separate recordings. Broader genres and longer discourse, the higher-level transfer bank, linguistic/descriptor review and calibrated productive-skill assessment remain incomplete. The [release audit](CURRICULUM-AUDIT.md) continues to block a full CEFR-course launch. This addition remains in local preview; no production push was made.
