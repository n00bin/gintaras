# A2 listening: events, plans and practical updates

The four A2 units in each language now have two separate complete spoken messages: sixteen new recordings and forty-eight meaning questions across Lithuanian and Mexican Spanish. The A2 audio totals 277.992 seconds (about 4 minutes 38 seconds). These messages are distinct from both prepared unit sources and the reading-transfer documents.

The complete A1–A2 transfer bank now has thirty-two reading documents, thirty-two spoken messages and 192 questions. Reading and listening retain separate local records. These are controlled checks of prepared language, not a calibrated level assessment.

## Learning focus

| Unit | What the learner listens for |
| --- | --- |
| Arrangements and a day out | Work end versus proposed meeting time, a rain condition, sequence of past events, the stated reason for returning home and a new proposal |
| Appointments | The original booking versus a requested or offered replacement, the reason for a change, the confirmation channel and the need to reply |
| Work | Starting time versus meeting time, responsibilities, sequence, the reason for working remotely, online attendance and a condition for asking for help |
| Meals | Changed group size and time, retained requests, a stated wait versus a possible delay, and whether acceptance has actually been given |

The texts recombine forms introduced by that point through vocabulary, sentence patterns and contextual source preparation. The cumulative-form check finds no new unprepared target-language forms. It does not establish linguistic accuracy or mastery; language and descriptor review remain pending.

## Activity behaviour

Learners open **Apply this language in a new listening** from the unit or use `#listen-transfer`. The connected preparation and both prepared-source comprehension checks must be complete, including the preceding-unit sequence. If A2 source support is unavailable, the interface retains saved results but does not expose a document, transcript or saved feedback.

The three answer choices are shuffled. They express meanings in English so the task checks listening rather than original writing. Answers stay disabled until the complete recording has played successfully and that playback record has saved. A failed start, early end, cancelled playback, missing recording or full storage does not unlock answers. A forced answer handler also cannot bypass the gate.

All three answers must save before the transcript, exact source evidence and explanations appear. Incorrect choices receive no immediate signal. Reloading or closing an unfinished activity requires hearing the message again. New and repeated source visits remain explicitly distinguished, without claiming independent proficiency.

The existing A1 sources and task signatures are unchanged. Adding A2 preserves real A1 attempt records created with the old four-unit listening bank. The same `wordami.listening-transfer.v1.<language>` store keeps outcomes, timestamps, source exposure and playback metadata. It does not store chosen option text or raw typed answers. Failed saves roll back and another tab's save is not overwritten. Listening checks do not change reading records, original course progress, FSRS, XP or workshop completion.

## Audio and verification

The existing configured Google TTS service generated the new Lithuanian and US Spanish recordings using Achernar. The course's Spanish target remains Mexican Spanish; this is the existing `es-US` voice configuration. Each source is recorded as one complete message, with a content/voice hash and decoded duration in the manifest. The combined listening bank has thirty-two active recordings, 420.936 seconds and 1,683,744 bytes. All decode, match their source hashes, exceed the quiet-file threshold and are included in the offline cache. These checks do not replace listening by a language reviewer.

- Static structure checks pass all sixty-four transfer sources and 192 questions, with exact source evidence and explicit preparation.
- Both-language A2 browser checks exercise all sixteen new recordings, forty-eight questions and repeat visits using real decoded media at accelerated playback speed and synthetic prerequisite fixtures.
- Tests cover delayed transcripts/explanations, incorrect answers, failed and early playback, missing audio, quota rollback, cancellation, replay after reload/close, export privacy, competing saves and A1 result preservation.
- Existing A1 listening tests still pass, including short typed answers and same-browser language isolation.
- A 320-pixel viewport passes layout checks. Cold offline tests complete A2 reading and listening activities in both languages with no page errors or failed requests.
- The packaged candidate contains both augmented banks and all audio, preserves the public Lithuanian route and continues to block a complete CEFR launch.

Commands: `python tools/build_listening_transfer_audio.py --check`, `python tools/audit_curriculum_release.py`, `python tools/check_a2_listening.py`, `python tools/check_listening_transfer.py`, `python tools/check_skills_offline.py`, and `python tools/check_packaged_site.py`.

Wider domains, speaker variation, more natural dialogue, higher-level transfer, linguistic/descriptor review and calibrated speaking/writing assessment remain unfinished. This work stays in local preview; no production push was performed.
