# Guided writing pathway: A1–C2

Implemented in local preview for Lithuanian and Mexican Spanish. Open `?preview=1&lang=lt#writing` or `?preview=1&lang=es#writing`.

There are **18 projects per language, three in each of six target bands**. These are original guided workshop materials, not an externally validated curriculum, examination or automatic CEFR assessment. The other skills do not acquire a C2 curriculum merely because this writing workshop has six stages.

## Intended progression

The design draws on the Council of Europe's [2020 Companion volume](https://rm.coe.int/cefr-companion-volume-with-new-descriptors-2020/16809ea0d4), especially the writing and reports/essays scales on printed pages 66–68. Our interpretation progresses from personal messages and linked everyday accounts to supported argument, source synthesis and deliberate control of genre and nuance. Source relationships, reader needs and revision matter more than counts. Level labels remain provisional design targets pending curriculum and language review.

| Band | Projects |
| --- | --- |
| A1 | Personal introduction; home note; meeting message |
| A2 | Account of an outing; changed arrangement; recommendation |
| B1 | Unexpected event; reasoned review; practical complaint |
| B2 | Public-service argument; options comparison; formal response |
| C1 | Committee recommendation; public briefing; critical response |
| C2 | Synthesis essay; executive brief; critical commentary |

The C1 and C2 projects use two original fictional practice sources about a library service proposal. They are explicitly labelled fictional, not presented as real research. The projects require different audiences, purposes and structures; the executive brief has a shorter suggested range than the analytical essay. Word ranges are authoring guidance, not official CEFR word requirements or pass thresholds.

## Actual learner workflow

1. **Prepare the language.** Each band has eight useful target-language phrases with English meanings and writing guidance. The learner studies each phrase and answers a meaning question. Errors can be retried.
2. **Study a model.** Original target-language model texts, an English meaning/purpose explanation and two comprehension questions introduce the writing approach. Advanced stages also provide the two practice sources. Models are teaching materials rather than independent reading assessments.
3. **Draft for a reader.** A project defines a recipient, purpose and three requirements. The learner writes an original response in a free-text editor. Language/planning help and source documents remain available.
4. **Review.** Transparent draft checks report word count, paragraph count, exact repeated sentences and copying of the full model where detected. They do not determine language correctness, relevance, coherence or CEFR ability.
5. **Revise.** The learner changes the draft, quotes relevant passages for four review criteria and explains a change. Quote fields must contain actual excerpts from the revised text. This checks the review process, not the correctness of the learner's judgement.
6. **Keep and revisit.** The reviewed project enters a device-local portfolio. The learner can export the text, read their reflection and quoted evidence, or revise again. The latest two reviewed versions are retained.

All three projects in a band must have a self-reviewed revision before the next band opens for drafting. Preparation must also be complete for that band. This is a practice sequence, not a judgement that a learner has attained a CEFR level. Locked bands can be inspected with a read-only lesson preview; looking ahead does not satisfy their study gates.

Supplementary phrases are explicitly taught in this module before writing opens. They are separate from the original lesson-card prerequisite system and do not add FSRS mastery or course crowns. The module does not claim that studying eight phrases supplies all the vocabulary or grammar needed for a full CEFR band. Further curriculum development is required.

## Progress, storage and assessment boundaries

`writing-content.js` owns the language-specific teaching, model texts and source passages alongside shared project specifications. `writing-studio.js` provides the editor, study gates, review, portfolio, export and progression.

The per-language key is `wordami.writing.v1.<language>`. Unlike short constrained practice replies, studio drafts, reflections and review excerpts **are stored locally** so they can be revised and exported. Autosave runs after typing; close and page-hide flush pending saves. No account sync, AI request, teacher upload or other outbound transfer is performed. The learner-facing interface explains local storage and self-review.

The shared activity core now supports a fail-closed `requiredStudy` gate and a `portfolio_revision` method. Missing or false study checks prevent beginning or completing a project. Writing history reports `selfReviewed` separately from constrained-response `completed` and `unaided` totals. `level` stays null. A completed revision records that a writing process was followed, not that its content was linguistically correct. XP, FSRS, crowns and existing Can Do awards remain untouched.

If saving fails, the editor preserves the current in-memory draft, displays the actual storage problem and offers export. A failed save does not unlock the next stage or record a reviewed-project result. Existing completed projects retain their historical completion when reopened for revision.

## Verification

`G:/Python/python.exe -u tools/check_writing_studio.py` passed all 36 projects through the UI. It verifies:

- C2 cannot be started directly, and previewing a lesson does not unlock it.
- Every band requires phrase practice and both model-comprehension answers before drafting.
- Incorrect study answers do not advance preparation.
- Drafts survive quick close/reload; no lost pending autosave.
- An unchanged draft, missing quoted evidence and a missing reflection cannot complete review.
- An induced storage-quota failure preserves editing and does not award completion or unlock progress.
- Valid review completion, reloading, local portfolio and text export work.
- Both languages keep independent progress; every writing result remains unassessed at the proficiency level.
- Existing course state remains unchanged, the UI fits 320px and the workshop reloads offline after caching.
- Public mode does not create the studio.

Test drafts deliberately exercise workflow and persistence; they are not learner samples and do not validate the level labels. Screenshots, exported test texts and machine-readable results are under `output/writing-studio/`.

Existing café and A1 practice checks pass. A recording-start race found during the introduction regression was fixed by preventing the course example from interrupting startup of the learner's recording; the introduction test then passed.

## What remains

Native-language editing, educator review of genre/level calibration, more varied topics and models, real learner trials, calibrated feedback on original language, teacher/expert moderation and account-synced portfolios are not implemented or validated here. C2 cannot be awarded from self-review, word length or completion alone. The full reading/listening/spoken programme beyond the current foundation remains outstanding.
