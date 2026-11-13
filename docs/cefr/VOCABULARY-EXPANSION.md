# Vocabulary and curriculum expansion

The local course now has 24 units per language: four units at each target band from A1 through C2. This batch adds twelve all-skills units across Lithuanian and Mexican Spanish and adds explicit vocabulary preparation to every existing and new unit.

## New units

| Target band | Added situation | Communication focus |
| --- | --- | --- |
| A1 | Find a stop and buy a ticket | Locate a stop, distinguish left/right, ask for a ticket and understand a time |
| A2 | Plan a meal for a group | Explain preferences, update quantities and times, and request confirmation |
| B1 | Arrange a household repair | Report observations, negotiate access and distinguish arrival from completion |
| B2 | Balance access in a public space | Compare needs, qualify a trial and define evaluation conditions |
| C1 | Clarify a professional commitment | Reconcile an email, meeting note and update without inventing promises or intent |
| C2 | Change register without changing force | Adapt a decision for different audiences while preserving conditions and commitments |

Each new unit includes vocabulary, sentence patterns, grammar preparation, distinct reading and listening sources, six comprehension questions, spoken production, three recorded partner turns, spoken mediation and a dedicated writing assignment. The original units retain their IDs, source texts and stored writing/review records.

## Vocabulary teaching

Every unit now teaches eight contextual word forms or short expressions before its eight sentence patterns. The 48 units provide 384 vocabulary entries and 384 sentence-pattern introductions across both languages. These figures count authored learning entries, not dictionary lemmas or proof of CEFR coverage.

The vocabulary lesson presents a target form, an English meaning and practice choices. Incorrect choices leave it unintroduced. Failed saves roll back the new marker and do not add a review card. A read-only source preview adds nothing. The word form must appear in that unit’s actual reading, listening, phrases or partner language; all 384 entries pass this source check.

Forms are taught in context rather than silently changed into supposed dictionary headwords. Examples include Lithuanian location/object forms and short Spanish expressions. Previously completed writing preparation still supplies its identical sentence patterns, while the newly added vocabulary and distinct listening preparation remain required.

Vocabulary signatures are separate from the original unit-content signatures. Updating or temporarily failing to load the vocabulary does not erase saved drafts, sentence preparation or other unit results. Practice stays locked when its vocabulary source is unavailable, and resumes from retained progress when the file returns.

## Retention and pronunciation

Studied words join the existing taught-only FSRS deck alongside phrases. The deck now has capacity for 372 review items in Lithuanian and 364 in Spanish. These are wording-and-context items, not unique lemma counts. Existing 143 phrase-review identities in each language are preserved.

Different meanings of the same spelling are kept separate. For example, Spanish `llave` as a key and as a tap have different review records. Meaning-equivalent wording shared with an earlier phrase keeps its existing schedule rather than creating a second memory record.

All 384 vocabulary slots have pronunciation audio. The vocabulary lesson offers playback before meaning practice; playback alone grants no introduction marker. Review offers word playback with the revealed model or after an answer, preserving the distinction between assisted and unaided recall. Identical pronunciation recordings are reused independently of meaning-specific review records.

There are 576 source-to-audio mappings backed by 546 unique MP3 files, totalling 10,725,984 bytes. The inventory includes 48 complete listening recordings, 144 partner prompts and 384 vocabulary pronunciation slots. Complete listening passages total approximately 29 minutes 55 seconds. The new unit batch and vocabulary recordings use the existing Google service and configured voices; the generator is idempotent and deduplicates identical text/voice recordings.

## Current build totals

- 48 all-skills units, 24 per language.
- 384 contextual vocabulary entries and 384 sentence-pattern introductions.
- 288 reading/listening comprehension questions.
- 240 required recorded spoken responses.
- 72 writing projects.
- 12 worked grammar lessons with 72 exercises.
- 372 Lithuanian and 364 Spanish word/phrase review items available after their sources are studied.

The [generated inventory](SKILLS-COVERAGE.md), [learning-support report](learning-support.json) and [complete source books](review/README.md) contain the actual built material. Review books include vocabulary pronunciation links and task keys without learner data.

## Verification

The full course walkthrough passes all 48 units and 72 writing projects, including vocabulary, grammar gates, actual media completion, recording/replay, revision, next-unit unlocks, offline reload and unchanged original course state. Microphone input is generated by Chromium for testing; language proficiency is not inferred from it.

`tools/check_vocabulary_content.py` verifies source membership, vocabulary completeness, all six four-unit band groups, old phrase-review identities and separate word senses. `tools/check_vocabulary_study.py` covers preview/incorrect-answer gates, failed saves, resume, existing schedules, pronunciation and temporary vocabulary-file failure. `tools/check_phrase_review.py` checks real FSRS progression under a controlled calendar, persistent assistance, raw-answer privacy and word playback without schedule inflation.

The audio audit decodes all mappings, checks source hashes, validates durations and quiet-file thresholds, and verifies offline cache membership. The first offline reopen and previously unused advanced playback pass in both languages. The test retains its media element and bounds installation/playback waits so a stalled test cannot wait indefinitely.

This is an expanded, tested local build. Language review remains deferred; complete CEFR descriptor coverage and calibrated independent speaking/writing assessment remain unvalidated. No production deployment was performed.
