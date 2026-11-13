# Spanish expansion verification

Story: open the Spanish preview, load the self-contained course and recorded audio, complete lessons and conversations, save Spanish progress independently, and reload with audio offline.

## Results

- `node tools/check_course.js es`: all structural checks passed. All new lessons have tips, glossary entries and pronunciation; conversation replies use taught words.
- `node tools/check_spanish.js --require-audio`: 37 units, 807 cards, 15 conversations; 226 new conversation utterances checked on both sides; zero missing standard lesson or character recordings. Existing starter IDs and conversation scripts retained.
- `python tools/check_spanish_flow.py`: all 807 introduction cards rendered; 18 grading cases passed; personalised feminine forms passed; new audio played offline; language storage isolated; no browser errors. A public language link cannot bypass Coming soon.
- `python tools/check_cards.py --lang=es --units=u22,u15,u34`: 914 exercise cards drawn across fresh-learner and placement-returning flows. All tested words were introduced before testing, including conversation replies. This plays representative units; it is not a full 37-unit exercise playthrough.
- `python tools/check_audio.py es`: 3,031 mapped clips checked; none below the loudness threshold after repairing 14 quiet clips. This verifies usable signal, not the accuracy of every spoken pronunciation.
- Lithuanian course checker passed. Vocabulary, path, conversation scripts and audio mappings match published commit `cf2b092`.

The first browser pass exposed a missing Spanish name helper which skipped tip cards; fixed in the Spanish rules block. Missing starter conversation glosses were added. Spanish now opts out of the generic arbitrary-word-order acceptance rule and rejects incomplete question replies such as “Y” for “¿Y tú?”.

## Remaining before public launch

- Native Mexican Spanish review: wording, register, translations, accepted variants, respellings and recorded pronunciation.
- Current artwork (2026-11-12): 472 of 807 cards have approved pictures (334 unique files): 157 newly linked Lithuanian pictures after a meaning check (euro prices, wrong colours and a male picture for "la maestra" were excluded), 64 new Spanish pictures, and Mariana and Diego chat portraits. New art was drawn with Codex's built-in image tool, run through the Codex CLI at the owner's request; every picture was inspected at full size, 56px, light and dark, and checked for stray specks. The 55 number/day/month text tiles stay. The other 280 cards (verb forms, question words, time phrases, abstract sentences) stay as word cards. `python tools/check_spanish_picture_library.py` passed: every image decodes, all mappings approved, offline reload, fallback and saved state unchanged. Chat faces render in cv1 and are cached for offline use.
- Spanish remains `ready:false`; no Spanish expansion has been pushed or deployed by this work.

Local preview: `http://127.0.0.1:8767/?preview=1&lang=es` while the preview server is running. The preview flag is stored on that browser origin; `?preview=0` disables it.

## Header language chooser

The current course flag is a button in the top bar. It opens an accessible language dialog; the Settings language control is removed, while first-run language selection is retained. Existing local SVG flags are included in the service-worker shell. `python tools/check_course_switch.py` passed switching in both directions, saved progress restoration, Coming soon restrictions, Escape dismissal and focus restoration, and layout at 320, 390 and 1024 pixels. The preview link's language parameter follows the selected course so it cannot pin the previous language after a switch.
