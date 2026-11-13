# Grammar practice and phrase retention

The phrase-only checkpoint below has since expanded to [word and phrase review with contextual vocabulary preparation](VOCABULARY-EXPANSION.md). Existing phrase-review identities and schedules are retained.

The eighteen-unit course in each language now includes a worked grammar lesson at every target band. Six lessons per language add 36 worked examples and 72 exercises across Lithuanian and Mexican Spanish: 48 meaning/form choices and 24 controlled sentence responses.

| Target | Lithuanian focus | Spanish focus |
| --- | --- | --- |
| A1 | Location forms and adjective agreement | Origin, location, ser/estar examples and agreement |
| A2 | Past/future forms, reasons and conditions | Past events, future plans, reasons and conditional alternatives |
| B1 | Connected accounts, contrast and attribution | Event/background distinctions, contrast and attribution |
| B2 | Concession, conditional recommendations and negation scope | Concession, conditional recommendations and limited claims |
| C1 | Attribution, evidential limits and review conditions | Reporting, evidential limits and conditional reconsideration |
| C2 | Negation scope, entailment and hypothetical revision | Quantifier scope, inference and hypothetical revision conditions |

Learners study the examples before beginning the six practice tasks. Wrong responses retain their attempts and receive a specific explanation. Revealing a model or revisiting the examples is recorded as assistance. Grammar practice completes only after every task has matched the learned pattern. Starting an optional retake preserves the earlier completion milestone, including across reload, so revision does not unexpectedly lock the later course. Future grammar lessons can be previewed but cannot be completed before their course level opens.

Grammar completion is required alongside phrase and source preparation before a unit's comprehension checks open. The original reading, listening, spoken and writing results remain stored; adding this requirement does not delete those results or change existing lesson IDs or FSRS schedules. Grammar exercises are learning practice, not independent proficiency assessment.

## Remembering the new course language

The course's 144 phrase introductions per language resolve to 143 distinct recall phrases in each language. Only phrases actually introduced in preparation enter the deck. Read-only previews add nothing. Identical learned wording shared by units has one memory record with multiple source references.

The deck calls the app's existing `fsReview` function and therefore uses the same FSRS-4.5 calculations and weights. It stores its own records under `wordami.phrase-review.v1.<language>` and does not call the original `grade`, change existing item records, award XP or assign CEFR levels.

- New phrases receive a first follow-up the next day.
- Due reviews update FSRS after an actual recall response, with a next-day learning step before longer intervals.
- Successful extra practice does not extend the scheduled due date.
- A mismatch or model-assisted response creates a ten-minute relearning follow-up.
- The scheduler's existing once-per-day protection prevents repeated same-day stability gains.
- Model assistance persists across reload, so reopening a review cannot turn a revealed phrase into unaided recall.

The recall exercise expects the wording actually studied. It normalises equivalent Unicode, case, spacing and punctuation while preserving accents. A different valid expression is not automatically a language error; the feedback explains the bounded recall target. Raw typed responses are not stored. The deck retains grades, times, schedules and source references, with a bounded outcome log.

Grammar and review can be resumed. Failed writes do not advance progress or alter the saved schedule. Conflicting tabs preserve the newer stored state and allow export. Accent-letter buttons are available in grammar, recall and both writing interfaces, including insertion at the cursor and selection replacement.

## Verification

The full `tools/check_skills_studio.py` course walkthrough now includes the grammar prerequisites for all six bands in each language and checks that taught phrases enter review. It still covers all 36 units and 60 writing projects, real media events, spoken self-review, writing revision, unlocks, export, offline use and unchanged original course state.

`tools/check_grammar_retake.py` verifies preservation of earlier completion during optional revision. `tools/check_grammar_practice.py` checks future-level previews, source gates, wrong-answer retry, assisted responses across reload, accent insertion, quota-failure rollback and unchanged course state. `tools/check_phrase_review.py` uses a controlled calendar to verify taught-only selection, resume, persistent assistance, quota rollback, first follow-ups, genuine FSRS growth over successive days, no interval inflation from extra practice, exports, language isolation and absence of raw answers in storage.

The source-only [grammar review books](review/README.md) and [machine-readable learning-support report](learning-support.json) can be regenerated with `tools/report_learning_support.py`. Language review remains deferred. These additions build learning support; they do not establish complete CEFR coverage or independently assessed speaking and writing proficiency.

Local routes: `#grammar`, `#grammar-A1` through `#grammar-C2`, and `#phrase-review`. No production deployment was performed.
