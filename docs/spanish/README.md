# Spanish course authoring

The Spanish course uses Mexican vocabulary and informal **tú**, polite **usted**, and plural **ustedes**. The learning path moves from set phrases to constructing sentences, practical situations, plans, past events and extended conversations. It is a beginner course draft, rather than a certified proficiency assessment.

The original Sounds, Basics and Small talk card IDs and the two original conversation scripts remain stable. The pictured drink **café** is clarified as “coffee”, and **Nosotras** is accepted for “we”. New material is appended with new IDs. Lithuanian course content and saved-progress keys are unchanged.

## Edit and build

- `tools/spanish/units.js`: new words and phrases, five-card lessons and teaching notes.
- `tools/spanish/practice.js`: path, conversations, branching replies and drills.
- `tools/spanish/structures.js`: sentence patterns, grammar references and sentence-building prompts.
- `tools/spanish/glossary.json`: word-level meanings for phrase cards and conversation help.
- `node tools/build_spanish.js`: compile these sources into `lang/es.js`, the self-contained pack the app loads. Preserve the starter content outside the marked expansion blocks.
- `node tools/report_spanish.js`: update `status.json`, the full `COURSE.md` review document and the pending artwork inventory.

Never run the compiler while an audio recorder is writing `lang/es.js`. The compiler preserves the current SMAP, but concurrent writes could lose a just-completed group.

## Validation

```
node tools/check_course.js es
node tools/check_spanish.js
python tools/check_spanish_flow.py
python tools/check_cards.py --lang=es --units=u22,u15,u34
```

The dedicated checks cover stable starter IDs, both speakers and distractors in new conversations, first-lesson pattern prerequisites, grading, personalised forms, actual mobile rendering, isolated language progress and offline playback of new recordings. The card checker plays exercises with a fresh learner and a learner returning after placement.

After recording, also run:

```
node tools/check_spanish.js --require-audio
python tools/check_audio.py es
```

## Voices and artwork

Use the existing project tools `tools/make_audio.py es` and `tools/make_voices.py es`. They record only missing or changed groups and update SMAP. The voice setup uses Google's Spanish (United States) voices for Latin American Spanish audio; Mexican wording does not by itself establish a Mexican accent. Listen to samples during native-speaker review. Credentials stay in the existing local credential file and are never included in the course or review artifacts.

The ten approved Sounds illustrations and matching shared object illustrations are reused. Other words use an existing meaningful fallback or wait for an approved illustration. The pending illustration inventory does not override the owner's priority to finish the live Lithuanian artwork first. No image generation is needed to edit or test this course.

Spanish remains `ready:false`. Use `?preview=1&lang=es` to inspect it directly on a local server. A language link without preview permission cannot bypass the Coming soon gate. The outstanding editorial pass should check Mexican phrasing, register, translations, accepted variants, pronunciation respellings and the recordings before a public launch.

Reference material for the editorial review: [Instituto Cervantes A1–A2 grammar inventory](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/02_gramatica_inventario_a1-a2.htm) and [communicative functions](https://cvc.cervantes.es/ensenanza/biblioteca_ele/plan_curricular/niveles/05_funciones_inventario_a1-a2.htm). These do not certify the course or replace a native-speaker review.
