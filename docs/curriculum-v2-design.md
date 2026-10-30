# Lithuanian course, edition 2: design

Status (2026-10-30): built the safe way, without renumbering (owner agreed). 3.53 Little words unit early and can/must/need to Part 3 (PATH/RESHAPE moves); 3.54 boss-fight unit checks; 3.55 placement check for new learners; 3.56 Everyday words unit (missing top-frequency words, new ids); 3.57 look-alike sets spread by moving bite-size parts (MOVE_BITES). The full renumbering rebuild below was dropped: it was the only risky part and added the least.

## Why

The owner approved reordering the course while almost nobody has progress (the league shows one learner in unit 1-2).

Measured against the 50,000 most common Lithuanian words in film and TV subtitles (OpenSubtitles 2018, via the FrequencyWords project; used for ranking only, never shipped):

| Most common words | Taught now | Taught in the first third |
|---|---|---|
| top 100 | 74% | 48 |
| top 300 | 54% | 93 |
| top 1,000 | 30% | 136 |

The glue that holds sentences together comes very late: *kad, bet, nes, kai, jau, buvo* at unit 31-32 of 41, *reikia* at 26, *gal* at 28. *jei, apie, savo, mūsų, jūsų, dėl* are not taught at all. Meanwhile whole units are look-alike sets (all colours, all numbers, all family, all body parts), which blur together.

## Decisions (proposed)

1. **Frequency first, inside can-do units.** Every unit keeps a real-life goal ("order at a café", "say what you did"), but its words are picked from the most common words first. Target: the top 300 by the end of Part 3, the top 1,000 by the end of the course.
2. **Glue words early.** Want, have, can, need, go, is, not, and, but, because, that, if, already, still, was, will be: all in Parts 1-3, each used in phrases straight away.
3. **No look-alike units.** Colours, numbers, family, days, months and the body are spread in small doses (2-3 at a time) across units where they are needed (numbers with prices, days with plans, family with introductions).
4. **Phrases as whole units stay.** "Kiek kainuoja?", "Kur yra...?", "Aš nesuprantu" are taught as chunks first and taken apart later.
5. **Part 1 stays as it is** (sounds, greetings, small talk, the first two conversations): it already follows these rules, and it is where everyone currently is.
6. **Every unit ends with a conversation and a checkpoint.** The checkpoint is a short mixed test of the unit's can-do goal: pass and the unit is done; miss words and you get a review of just those.
7. **Placement check.** "I already know some Lithuanian" on the welcome screen runs a quick test that marks words you know as learned, so you start where you are.
8. **Topics come back.** Later units reuse earlier words in new situations (the café words return when ordering for a friend, the hotel words when complaining).
9. **Conversations are kept where they fit.** The 34 existing conversations are moved to wherever their words are taught, and rewritten only where a learner line uses a word that now comes later. New ones are written where a unit has none.

## Keeping everyone's progress

- Item ids are built from lesson ids, so moved words get new ids. A one-time migration (`S.courseRev`) moves each saved word record to its new id by matching the Lithuanian text. Words that no longer exist keep their record under the old id (harmless).
- A lesson counts as finished if it was finished before, or if all its words already have records.
- Conversation ids stay the same, so stars and reply cards carry over.
- The same migration runs in `mergeState` for records coming from another device on an older version.
- The cloud copy is only overwritten after the migration, so an old phone can't undo it.
- Spanish is untouched (separate file).

## Building it

Part by part, as before, each one shipped and tried by the owner before the next:

1. Word plan: rank every current item and every top-1,000 word, and assign each to a unit (a spreadsheet-style table in this doc's appendix, reviewed by the owner).
2. Parts 2-3 rebuilt (glue words, numbers with prices, time with plans), with the migration, checkpoints and the placement check.
3. Parts 4-10 rebuilt one at a time.
4. Native-speaker check of new items, as with everything else.

`tools/check_course.js` gains two checks: the share of the top 300 / 1,000 taught by each part, and no unit with more than 3 words from one look-alike set.

## Open questions for the owner

- Is the frequency list a good basis, given it comes from films and TV (lots of "kill", "police", "sir")? Proposal: use it, but leave out words that only films use.
- Course length: reaching the top 1,000 roughly doubles the course (about 920 items now). Proposal: the top 1,000 over 10 parts, with the extras unit kept.

## Revisions after review (2026-10-30)

An independent review said REVISE. These changes are now part of the design:

1. **Stable word keys.** Every item gets a fixed `key` (written into lt.js once, from its current text). Saved records move by key, never by matching text, so editing a word's spelling later (native-speaker check) can't orphan anyone's progress. Duplicate texts (Taip, Ačiū in several lessons) keep their own keys.
2. **Migration is a chain of numbered steps** (`courseRev` 1→2→3...), one per rebuilt part, each safe to run twice. Old ids are removed after moving, so nothing is counted twice.
3. **Two devices, old versions.** `courseRev` is stored in the saved state and in the cloud copy. `mergeState` brings both sides up to the current rev before merging; `courseRev` merges as the highest. A new app never overwrites a cloud copy with a higher rev. Before the first rebuilt part ships, an app update goes out that refuses to run on an older course ("please update") and clears old cached files.
4. **Lessons and crowns.** A rebuilt lesson counts as finished only if it was finished before *and* all its words carry over; mixed lessons (some old, some new words) start unfinished. Part 1 ids are pinned and covered by a test.
5. **Reply cards and conversations.** Conversation line ids stay fixed. A rewritten learner line keeps its id (and its reply card) only if its meaning is unchanged; otherwise its card is dropped. Stars and tried choices are never reset.
6. **Checkpoints and placement have proper saved fields and merge rules** (highest wins / union). Checkpoint: about 10 mixed questions, pass at 80%; a miss gives a short review of just the missed words and can be retried; it doesn't block anyone who already passed the unit. Placement is only offered to brand-new learners (and from Settings); words it confirms start at level 2 with a normal schedule, so they can't inflate crowns or XP.
7. **The owner's progress is the test case.** Before anything ships: back up the cloud row, run the migration on a copy of the owner's real state, and fail the build if any word with progress, any reply card or any conversation star is lost. `check_course.js` gains a mapping report (how many old words move, how many have no new home).
8. **Word choice rules.** Count dictionary words, not every inflected form. A manual exclude list (film-only words: weapons, police drama, swearing) and a bump list (travel and daily life). Numbers 1-10 and the days of the week stay as complete sets, in one unit each; colours, family and body parts are spread. When a useful phrase contains a rarer word, the phrase wins.
9. **Scope.** Commit now only to the machinery (keys, migration chain, update gate) plus Parts 2-3. Decide Parts 4-10 after the owner has used them.

**Suggested first release** (from the review): add one early glue-words unit (want, can, need, because, but, that, already, was) without renumbering anything. It tests the key and migration machinery on a small change before the big rebuild, and helps learners straight away.
