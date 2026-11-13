# Historical continuation — build 190

Current work is tracked in [live 191 / preview 193](COURSE-PREVIEW-193.md). The versions, counts and running tasks below are historical.

Owner: continue until the full course and pictures are complete; do not stop at small milestones. Production remains 3.116 / build 188; root is 3.118-preview / build 190. Do not bulk-stage, reset or publish the dirty root.

## Implemented in the current continuation

- `written-interaction-content.js` binds all 60 workshops to prepared question/reply branches: 144 required written exchanges. The 48 original workshops have two each; the 12 band applications have four from their previously completed source units.
- `written-interaction.js` requires an actual question, partner-detail check, draft, revised reply, evidence excerpts and reflection. Frames are optional and tracked. Local autosave, resume, quota rollback, cross-tab conflict protection and JSON exports are implemented. Pure `progress` avoids prerequisite recursion.
- Unit completion requires these exchanges through `skills-studio.js`; they appear inside the unit. `assessment-portfolio.js` includes and displays actual messages, revisions and support use. No automatic writing-accuracy or proficiency grading.
- New presentation attempts require two microphone recordings, replays and separate first/revised reflections. `previousReview` preserves earned completion during a retake; starting another practice attempt must not revoke the earlier result. Explicitly retained first/final clips have separate roles, `production.first` / `production.0`; reviewer checks require the correct final role.
- Content-only loader, source review books, task map, service-worker cache and prerequisite fixtures include the new writing tasks. New task sources enter the curriculum audit fingerprint.

## Verification

- `tools/check_written_interaction.py`: all 144 exchanges passed both languages, actual UI writing, reload, incorrect detail, mandatory revision, quota rollback/retry, mobile, original-state preservation and offline. Report `output/written-interaction/verification.json`.
- `tools/check_speaking_revision.py`: all 60 tasks / 120 generated-microphone recordings passed, including preservation of earned completion during retakes. Report `output/speaking-revision/verification.json`.
- `tools/check_assessment_portfolio.py`: actual first and revised recording copies, packet export, role distinction, reviewer workflow, hashes, stale feedback and deletion passed both languages. Test explicitly saves the second take via the UI; no first audio is relabelled as final.
- `tools/check_curriculum_migration.py` and live 188 → local 190 `tools/check_full_course_update.py` passed. Saved words, lessons, personalization, XP and Unit 3 access remain.
- A fresh full 60-workshop walk is running: exec session **48012**, `tools/check_skills_studio.py`. At last check it had passed Lithuanian A2 services. It includes both recorded takes and the new written exchanges. It writes per-unit synthetic snapshots to `output/skills-studio/<lang>-walkthrough-checkpoint.json`. Do not claim its final pass before it finishes.
- Earlier full walk failed only because `required_application_flow.py` clicked a nonexistent separate exchange return button for capstones. Fixed by clicking Back only when that bank exists. No product failure was hidden. The walk restarted after that fix.
- `tools/check_skills_studio.py` uses `written_interaction_flow.py`; `record_response` now supports two takes and optional actual retention. Keep these helpers when updating tests.

## Artwork continuation

The daily image reset passed. Built-in image generation is working. Imagegen skill was read and announced; use built-in only, one call per asset, no CLI/API fallback. Inspect the actual reference and exports; preserve masters and rejected versions.

Latest picture counts are always in `docs/art-direction/lithuanian-art-status.json`; the queue is `lithuanian-art-pending.json`. At the latest saved check **323 / 488** course mappings were integrated. The active continuation has also approved `quiet`, `long`, `short-length`, `heavy-difficult`, `light-easy`, `hot`, `comfortable`, `dirty`, `cold-v2`, `interesting` and `my-sister-is-tall`. All 20 portraits plus the learner portrait were already complete. All new assets are local; no push.

At the latest saved check, generated/exported but not yet reviewed: **`this-book-is-interesting`**. This is an explicit semantic reuse of the reviewed `interesting` scene, which already shows Tomas pointing into a book with fascinated attention. It has its own versioned record/master/export and a `semantic_reuse` rationale; no new image-generation claim is made. Use the queue's `unreviewed_exported_ids` for the live list. A contact sheet was just rendered at `docs/art-direction/review-pages/unreviewed/review-001.png`. View it, then approve only if acceptable, integrate, and continue. `white-v3`, `white-v4` and `cold` were rejected; masters retained. Approved replacements are `white-v5` and `cold-v2`.

Built-in generation paths are extracted from tool `output_hint`; every result is copied immediately into a versioned master by `tools/export_course_art.py`. Exact prompts/references live in `docs/art-direction/lt-records/<id>.json`; active exports in `pics/art-v2/`. Original built-in files are under `C:/Users/N00Bin/.codex/generated_images/01a1ad98-4962-7700-8017-11070cf0da0a` and remain untouched.

Use `tools/resume_course_art.py --take 3` to read pending jobs; it excludes exported unreviewed assets, so always finish the review queue first. `--approve id...` records explicit visual review; `tools/integrate_course_art.py` connects only reviewed, valid exports and preserves old art for unfinished words. It modifies picture mappings, not source cards/IDs/audio.

Reference board: `docs/art-direction/approved-style-reference.png` (already viewed). Tomas identity: `lt-learner-character-sheet.png` (already viewed): brown wavy hair, amber sweatshirt, navy trousers, cream shoes. Named Ruta scenes need `lt-ruta-character-sheet.png` inspected. Generic people are allowed where no fixed character identity is prescribed. Never replace every person with Tomas or use a male learner for a female/family/profession noun.

Next: continue artwork and the full walk, update source/release audits and the final public-file package once the build stabilizes. Build 189's package is historical and no longer matches root. Broader CEFR coverage/independent performance, expert language review and calibration remain real gaps; do not fabricate approvals or mark full-course readiness from these workflow tests.
