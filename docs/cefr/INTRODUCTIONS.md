# Introduction activity

Implemented in local preview for Lithuanian and Spanish. Open `?preview=1&lang=lt#a1-introductions` or `?preview=1&lang=es#a1-introductions`. Also available under “More activities” in the skill-practice screen.

One sequence has six tasks, followed by optional speaking practice:

1. Read a two-line practice profile and identify the name.
2. Identify where that guest is from.
3. Hear a recorded origin phrase and identify the country.
4. Hear the other origin phrase and identify that country.
5. Write a simple introduction with a name of the learner's choosing.
6. Write an origin sentence for the practice guest.
7. Record an origin introduction, play it back and compare with the course recording.

The two origin roles and choice order vary between visits. All source phrases must first satisfy the existing course `taught` rule. Target-language material is hidden while prerequisites are missing. A transcript counts as assistance; listening choices remain disabled until audio finishes. Retries and hint use stay distinct from first-time unassisted results.

## Sources and personalization

The default authored name sources are `Mano vardas Tomas` and `Me llamo Tomás`. The activity resolves the original course card (`lt0` where personalized), then uses its current taught text and English meaning. A learner who has already learned their personalized name card does not need to relearn the default name.

Lithuanian origin sources: `Aš esu iš Lietuvos`, `Aš esu iš Anglijos`.

Spanish origin sources: `Soy de Estados Unidos`, `Soy de México`. The first source uses its current personalized wording where applicable. Both examples must be taught and have distinct meanings. If a required source is removed or examples collapse to the same origin, the activity does not register.

All names and countries shown in the activity come from these taught cards. The learner may use a different proper name in their own writing; this is optional and the typed answer is not saved in activity evidence. The name-writing check recognises familiar introductory sentence frames followed by a name. It does not judge broader writing quality or whether the supplied name is real. Origin writing uses existing accepted-answer handling.

## Shared runtime and storage

`activities.js` exposes a small topic-extension interface so new modules reuse the same modal, audio lifecycle, taught-language checks, speaking comparison and practice hub. `introductions.js` registers `a1.introductions` and `a1.introductions-speaking`, linked to objective `a1.personal-introduction`.

The first activity contributes two reading, two listening and two constrained-writing tasks. Speaking remains self-comparison only. The per-language session key is `wordami.introductions.v1.<language>`. The session stores task position, role order, attempt ID and source-text signature; it stores no typed response or learner recording. Profile changes invalidate an incompatible in-progress source signature rather than silently reusing a different exercise. Existing café sessions and evidence are preserved.

Results remain local, separate from XP/FSRS and separate by language. This is an additional A1-oriented practice sequence, not completion of A1 or assessment of general conversational proficiency. Target-language spelling and the broader curriculum still require educator review.

## Verification

`G:/Python/python.exe tools/check_introductions.py` passes in both languages, including prerequisite locks, partial locks, wrong replies, actual lesson-audio playback, transcript assistance, typed names with accents/hyphens, origin accuracy, self-recording via a synthetic microphone, unchanged course state, resume without duplicate credit, personalized name cards, 320px layout, offline reload and public-mode exclusion. The automated tests do not access the user's microphone.

`G:/Python/python.exe tools/check_a1_practice.py` also passes after the shared speaking/topic changes. Evidence and screenshots are in `output/introductions/` and `output/a1-practice/`.
