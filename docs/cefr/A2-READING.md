# A2 reading: reasons, changes and conditions

The four A2 units in each language now include two additional reading documents per unit: sixteen documents and forty-eight meaning questions across Lithuanian and Mexican Spanish. The combined A1–A2 reading bank has thirty-two documents and ninety-six questions. The separate listening bank now also covers A1–A2; the earlier A1 sources and saved identities remain unchanged.

Learners open **Apply this language in a new reading** from the connected unit or use `#transfer`. Vocabulary, sentence patterns, contextual source preparation, grammar and both prepared-source comprehension checks must be complete first. The preceding-unit sequence still applies. A missing A2 preparation file does not expose documents or saved feedback.

## Learning demands

| Unit | New reading focus |
| --- | --- |
| Changed arrangement | Explain why a plan changes, identify a replacement, interpret a rain condition and distinguish a proposal from agreement |
| Services | Separate an existing appointment from a requested replacement, follow instructions and identify a confirmation request |
| Work | Connect a temporary change to its reason, follow a changed time, assign responsibilities and distinguish an explicit deadline from an unstated one |
| Meals | Separate changed details from retained requests, interpret group needs and distinguish a conditional delay from a confirmed delay |

Each source recombines forms already explicitly introduced by that point. Sources differ from the prepared reading and listening texts and from other transfer documents. The cumulative-form audit checks exact forms, including inflections; it does not establish linguistic accuracy, number of dictionary words known or mastery.

## Activity and feedback

Each question offers three shuffled meanings in English. This keeps the task focused on understanding the target-language message. It is not an original-writing or target-language production task. Learners record one choice per question; the interface gives no correctness feedback until all three are saved.

The end screen gives the exact source evidence and an explanation of each relationship. For example, asking for confirmation does not mean confirmation has arrived. A short check result describes only those three questions and awards no CEFR level.

The existing reading store and A1 task identities are preserved. A1 continues accepting short typed answers. Records contain outcomes and timestamps, without chosen option text or raw typed answers. Separate source-exposure hashes distinguish first visits from repeats even if a question or rationale changes. Interrupted checks resume; failed saves roll back; competing saves are not overwritten. Original course progress, FSRS schedules and workshop completion do not change.

## Verification

- Static checks now pass all thirty-two reading documents and thirty-two separate A1–A2 listening messages: 192 questions with explicitly prepared target-language forms and source evidence.
- A2 browser tests exercise all sixteen new documents and forty-eight questions, wrong choices, delayed explanations, first visits and repeats, reloads, quota rollback, export privacy and a missing preparation file in both languages.
- An A1 result created with the old four-unit reading bank survives loading the extended bank. Editing an A2 question explanation changes task validity without resetting source exposure.
- The existing A1 reading and recorded-listening regression suites pass after the shared renderer change.
- Mobile checks run at 320 pixels. Cold offline tests complete an A2 meaning check in each language with synthetic prerequisites and no page errors or failed requests.
- The packaged candidate contains the new bank and preserves the public Lithuanian route. These are source/workflow checks, not proficiency validation.

Commands: `python tools/audit_transfer_content.py`, `python tools/check_a2_reading.py`, `python tools/check_transfer_reading.py`, `python tools/check_listening_transfer.py`, `python tools/check_skills_offline.py`, and `python tools/check_packaged_site.py`.

[A2 listening transfer](A2-LISTENING.md) now adds sixteen separate spoken messages and forty-eight meaning questions. Wider genres and settings, higher-level transfer, linguistic/descriptor review and calibrated productive-skill assessment remain unfinished. The full CEFR release gate stays blocked. This addition remains local preview; no production push was performed.
