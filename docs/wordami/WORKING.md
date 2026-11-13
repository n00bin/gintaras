# Wordami / Ami published

Owner approved renaming the visible app to Wordami and replacing Gintarėlis with Ami the amber-yellow parrot on 2026-11-05. The approved mascot concept is `approved-ami-concept.png`; match it and the existing `../art-direction/approved-style-reference.png`.

This task handles branding, app icons and mascot interactions. The separate Lithuanian/Spanish lesson illustration rollout continues independently. Preserve that session's changes and its course-image mappings. Keep the repository folder, existing public URL, authentication configuration, database identifiers, localStorage keys and internal events compatible.

Production poses: welcome, happy, cheer, think, rest, encourage, listen, speak. One transparent image per pose, preserved masters and generation records, 512px WebP exports. Also generate a dedicated maskable-safe app icon.

Completed locally as release 3.111 / build 183. All eight poses, install icons and the sharing card are integrated. `tools/check_wordami.py` passed for both language contexts, real correct/wrong answer feedback, existing-format progress reload, missing-image fallback and offline reload. Both course checkers passed. See `verification.json` and the gallery/mobile screenshots for evidence. This session did not commit, push or publish changes. The other session's ongoing course-art changes remain in the working tree.

## Publication update

The owner then requested publication. **Wordami 3.111 / build 183 is live** at `https://n00bin.github.io/gintaras/`, from commit `ffb597c546c217d72879b1cdadd6a88f2b09468f`. GitHub Pages run `42125872327` succeeded. Live browser checks confirmed the new title, manifest, first lesson, all eight Ami poses and all five icon exports, with no page errors. See `live-verification.json` and `live-lesson-mobile.png`.

The release was prepared and committed in the isolated worktree `G:/ai_projects/.work/wordami-publish` from the previously published `763127b`, then pushed to remote main. Unfinished course-art mappings and assets were excluded. The release also includes the already-reviewed Spanish starter-note corrections and a minimal `picFor` fallback for the existing Spanish images so the isolated published course works with shared app helpers.

**Important for the course-art session:** this original checkout's dirty files and branch HEAD were deliberately left in place. Remote main now contains the Wordami release. Reconcile against that commit before the next push; do not force-push or replace the locally newer art integrations with the older published course files. The original working files already contain Wordami/Ami plus the in-progress art changes.
