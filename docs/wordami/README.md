# Wordami and Ami

Approved 2026-11-05: **Wordami** is the app's visible name; **Ami** is its friendly parrot mascot. The app teaches multiple languages through small lessons that build toward real conversations.

## Visual identity

The owner-approved [Ami concept](approved-ami-concept.png) governs character identity. The existing [illustration style board](../art-direction/approved-style-reference.png) governs the shared flat cartoon style used for Lithuanian and Mexican Spanish course illustrations.

Ami has an oversized amber-yellow head, three curved amber tuft feathers, big white oval eyes with dark brown pupils, a short curved coral beak, a plump amber body, turquoise wings and tail, and small coral feet. Use rounded shapes, sparse darker colour shapes and no black perimeter outlines. No clothing, realistic feathers or 3D rendering. Keep the same identity in every pose.

## Interaction coverage

| Asset | Interaction |
| --- | --- |
| `welcome.webp` | Splash screen, app header, first welcome, welcome back |
| `happy.webp` | Correct-answer encouragement, happy-hour notices, partial conversation completion, safe default for unknown moods |
| `cheer.webp` | Correct answers, lesson/review/unit-check completion, successful placement, Quick chat and conversation completion, XP boosts, repaired streaks, treasure chests and update notices |
| `think.webp` | Lesson/review tips, sentence-building tips, recall guidance, review-first dialog, leave confirmation, language switching and another-tab notice |
| `rest.webp` | Empty review state, purchased or used rest days, protected-streak notices |
| `encourage.webp` | Wrong-answer feedback, failed unit checks and placement attempts; always kind and supportive |
| `listen.webp` | Listening multiple choice, dictation and conversation listening exercises |
| `speak.webp` | Speaking tips, speaking exercises and spoken conversation turns |

All production poses are individual transparent **512 × 512 WebP** files under `pics/ami/`. The original PNG masters and exact prompts are preserved here in `masters/` and `assets.json`; generation uses the built-in `image_gen` tool. Every pose is precached when the service worker installs. Decorative images have empty alt text because the interaction's visible text communicates the meaning. A missing pose falls back to the local app icon.

The dedicated app-icon master uses a navy background and generous maskable margins. Exports cover 180px Apple touch, 192px and 512px regular and maskable icons. `wordami-og.png` is the 1200 × 630 social sharing card, rendered from the actual mascot asset and app typography.

Open [the mascot gallery](gallery.html) to inspect all poses at full size and 56px on light and dark backgrounds. `tools/check_wordami.py` verifies real browser interactions, fallback, progress preservation, the multilingual brand, and offline use; it saves screenshots and a JSON report here.

## Compatibility

The folder/repository and public URL remain `gintaras` and `https://n00bin.github.io/gintaras/`. PWA manifest `id`, `start_url` and `scope` remain unchanged. LocalStorage keys, cloud tables, auth configuration, internal events and cache namespaces retain their existing names so saved learning progress and integrations continue to work. Existing Google project and OAuth display names have not been changed. Amber remains the in-app reward currency and the Lithuanian vocabulary word `gintaras` still means amber.

The lesson-illustration rollout is separate; no lesson identifiers, audio clips, learner records or lesson-picture mappings are renamed by this branding update.
