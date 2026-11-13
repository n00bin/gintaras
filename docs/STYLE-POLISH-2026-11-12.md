# Style polish, 12 November 2026

The app's own look now matches the approved illustration style (`docs/art-direction/STYLE.md`). This was published to production as **3.124** from the isolated release worktree. The same changes were applied here in the root, so this checkout and production share them.

## Rules for new work

- **Use the colour tokens from `index.html`, never fixed hex colours**, in any CSS a script injects. The CEFR windows used about 140 fixed greens. They now use tokens, which is why they work in dark mode.
  - `--bg`, `--surface`, `--surface-2`, `--fg`, `--muted`, `--line`
  - `--pine` (turquoise action colour) with `--on-pine` for text on it
  - `--pine-soft`, `--amber`, `--amber-soft`, `--coral`, `--band` (navy panel with white text)
  - `--ok`, `--bad`, `--bad-soft`
- **Palette:** navy `#14264E` text, deep turquoise `#00756E` actions, amber `#FFB400`, coral `#FF6355`, cream background `#FFF9F0`. Dark mode is navy (`#0F1830`).
- **Activity windows** (`#a1-practice`, `#skills-studio`, `#writing-studio`, `#cafe-adventure`) get a shared header and button look from `index.html`. Close sits beside the title as a small pill.
- **Faces:** "Pick your face" replaced the Notionists face builder. There are 24 people × 5 top colours in `pics/faces/fNN-<colour>.webp`. Masters and prompts are in `docs/art-direction/face-masters/`.
  - A picked face is stored as the look `99.<face>.<colour>.0.0.0.0.0.0`, which passes the existing database check.
  - Old builder looks still render through `avatars.js`.
  - Players without a look get a seeded picture-style face.

## Plain wording

Learner-facing text in `skills-studio.js`, `writing-studio.js`, `course-path.js`, `foundation-ui.js` and `activities.js` was rewritten in plain English. The honesty is unchanged: practice is not an official level. Headings and sentences that `tools/check_*.py` use as anchors were left as they were.

Keep new learner text plain. Say "checked for you" and "you check yourself", not "comprehension feedback" and "self-review". Say "not an official level", not "not a CEFR award". Reviewer-only text in `assessment-portfolio.js` may stay technical.

## Known, not caused by this change

`tools/check_a1_practice.py` fails at `typeof window.WordamiActivities=='undefined'` with or without these edits.
