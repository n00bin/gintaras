# Gintaras expansion plan (locked 2026-10-27)

Goal: a complete beginner who finishes the course can hold a basic conversation (about A2, roughly 1,000 dictionary words),
and every lesson builds sentence structure in order, from easy to hard.

## Rules every stage follows

- Each part adds exactly one new way to build sentences. A lesson only uses words and structures taught before it.
- Lesson ids never change (progress and audio are keyed to them). Existing lessons move between units through `RESHAPE` and `PATH`.
- Every conversation line only uses words from earlier on the path. Re-check after any reorder.
- Every lesson has a tip (`LESSON_TIPS`), every unit a speaking tip (`SPEAK_TIPS`), every new word a hand-written `PRON`.
- New audio comes from `tools/make_audio.py`. Run the content checks before recording.
- Build part by part; test in a real browser; push each part.

## The sentence ladder

| Part | Sentence skill | Existing units | New units |
|---|---|---|---|
| 1 First words | Set phrases | Sounds, Basics (greetings, yes/no, who I am), Small talk | |
| 2 Simple sentences | Who + does; *ar* questions; *ne-* | Talking, Question words, About me | Core verbs |
| 3 Numbers, time, my day | When | Numbers, Time (days, parts of day) | My day |
| 4 Food and drink | Who + does + what (object endings) | Food, Restaurant | |
| 5 Getting around | To / in / from (*į*, *-e*, *iš*) | City, Getting by, Transport, Shopping | Clothes |
| 6 People and things | Describing, agreement, my/his/her, *man patinka* | Colours, Family, Talking about family, Weather and feelings | Describing, Jobs, Home |
| 7 Plans and the future | can/must/want + verb; future tense | Verb dictionary, Free time, Making plans, Seasons | Can, must, need; Tomorrow |
| 8 Telling stories | Past tense; joining words | | Joining words; Yesterday; What did you do? |
| 9 Real conversations | Opinions; keeping a chat going | Travel, Hotel, Emergencies | Opinions; Keep it going; Body and health |
| Extras | | Animals, Culture | |

## Conversations (15)

Existing 10 stay, re-placed so each sits after everything it uses. New: My morning (Part 3), Buying a jacket (Part 5),
Holiday plans (Part 7), What did you do at the weekend? (Part 8), Dinner debate (Part 9, final).

Each reply: Step 1 write it (typing, with help ladder), Step 2 say it (microphone check).

## New learning tools

- Pattern card: a new sentence structure shown in coloured slots (who | does | what | where | when) with examples.
- Pick the right ending: *Aš valgau ___* → duona / duoną / duonos.
- Swap it in: a sentence frame with one slot to change.
- Sentence building that grows from 2–3 words to sentences with *bet* / *nes*.

## Open item

A native speaker should check the new Lithuanian, especially past and future tense forms.

## Status

- 2026-10-27: built. 11 parts, 41 units, 15 conversations, about 920 words and phrases. All checks in `tools/check_course.js` pass.
- Still open: native-speaker review of the new Lithuanian (especially past and future tense) and of the stress marks.
