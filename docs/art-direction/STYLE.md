# Gintaras illustration direction

Approved by the owner on 2026-11-05 for the whole app, Lithuanian and Spanish.

Brand update on 2026-11-05: the app's visible name is now **Wordami** and its mascot is **Ami the parrot**. See [the mascot guide](../wordami/README.md). The existing style board remains authoritative for all course illustrations; continue the course-art rollout with the same cast and semantic mappings. The repository folder and public URL still use `gintaras`.

The visual source of truth is [the approved style board](approved-style-reference.png). Use the actual image as a reference on every generation; a text prompt alone is not enough to preserve the look. The earlier SVG preview in `docs/art-preview/` is a rejected direction, not the production reference.

## Shape and finish

Playful flat cartoon illustrations with oversized expressive heads, large white oval eyes and dark pupils, rounded geometric bodies, short limbs, chunky hands and clear silhouettes. Use bright solid colours and sparse darker colour shapes for folds or depth. The reference has slight softness; keep the overall result flat and clean rather than textured or shaded.

Keep faces friendly and expressions readable at small sizes. Use a few large features instead of small details. No black perimeter outlines, sketch strokes, realistic anatomy, beige circular frames or complex backgrounds. Create original Gintaras characters and objects in this visual language.

This direction covers lesson objects and phrase scenes, conversation portraits, onboarding, celebrations, review and empty screens in both languages. It establishes an illustration style; changing the app's interface colours or layout is a separate implementation task.

## Working palette

These are production target colours inferred from the approved board, not exact sampled values. The board governs the overall visual match.

| Role | Colour | Hex |
| --- | --- | --- |
| Main clothing and objects | Turquoise | `#00BFB3` |
| Rewards and Diego's sweatshirt | Amber | `#FFB900` |
| Mariana's trousers, hearts and accents | Coral | `#FF6355` |
| Text and Diego's trousers | Navy | `#14264E` |
| Hair | Deep brown | `#4B241C` |
| Mariana's skin | Warm brown | `#D99149` |
| Diego's skin | Warm brown | `#D5873B` |
| Eye whites and highlights | Warm white | `#FFF8EC` |
| Preview background | White | `#FFFFFF` |

Match the reference's skin tones and hair shapes consistently; lighting must not change a character's identity. The wider cast can have varied skin tones, ages and builds.

## Character specifications

The [Mariana and Diego character sheet](mariana-diego-character-sheet.png) provides front, three-quarter and side views plus happy, confused and celebrating expressions. It has been visually checked against the approved board; the original board remains authoritative if details differ.

### Mariana

A young adult Mexican woman. Large rounded head, dark brown bob with a broad side sweep and curved ends, white oval eyes, expressive eyebrows, small rounded nose, gold round earrings. Turquoise loose sweatshirt, coral trousers, warm cream shoes. Cheerful and approachable. Keep the same hairstyle, face, earrings, skin tone and outfit across poses. Her final production proportions follow the character sheet and approved board.

### Diego

A young adult Mexican man. Large rounded head, dark brown short wavy hair with a chunky raised tuft, white oval eyes, thick expressive eyebrows, small rounded nose. Amber sweatshirt, navy trousers, warm cream shoes. Friendly and expressive. Keep the same face, hair, skin tone and outfit across poses. No moustache or beard.

### Other course characters

Redesign the Lithuanian cast in this same style while retaining their identities and teaching roles. Mariana and Diego belong to the Spanish cast; the shared style does not replace every person with them. Create a character sheet for each recurring person before producing their lesson scenes.

## Reusable generation brief

> Use the attached approved Gintaras style board as the visual reference for style, proportions, shape language and colour. Create an original flat cartoon illustration for a language-learning app. Big expressive white oval eyes, oversized rounded heads, simple geometric bodies, chunky rounded hands, bright flat colours, minimal interior details and no black perimeter outlines. Match the referenced character's identity exactly. Subject: [one object, character pose or clearly described action]. Composition: [single centred subject or simple two-person scene], generous transparent margins, no cropped heads or gestures. No text, letters, labels, logos, watermark, beige disc or busy scenery. Use a transparent background for production assets.

For a character sheet, use a white background and show full-body front, three-quarter and side views, followed by a small set of clearly separated expressions and gestures. Treat a new sheet as a proposed reference until visually checked against the approved board.

## Asset workflow

1. Refer to this board and the relevant character sheet when generating an asset. Generate one production asset per request. Style boards are review artifacts, not sprite sheets to cut up into production pictures.
2. Use concrete objects for nouns and understandable actions for phrases. A picture must not spell out the answer. Some abstract words need no picture.
3. Share assets by meaning across languages where appropriate, with explicit course mappings. Distinct meanings get distinct assets even when their English labels happen to match.
4. Keep the original master and export a transparent WebP for the app. Start with 512px square exports; inspect at the app's actual display size before settling on export dimensions and compression.
5. Check identity, extra fingers or limbs, silhouette, transparency, margins and meaning. Inspect at 56px and at lesson size on light and dark backgrounds.
6. Integrate a small complete unit first, verify picture loading and offline caching, then expand unit by unit. Do not change lesson IDs, recordings or progress keys as part of an art replacement.

## Rollout order

Owner's updated priority: **replace every Lithuanian course picture before continuing Spanish**. This includes the 99 earlier custom illustrations and the 389 older emoji pictures. Keep the 22 intentional number/day text tiles. The exact frozen inventory is `lt-inventory.json`; `lithuanian-art-jobs.json` records every replacement job and semantic mapping. The six core Lithuanian character references are `lt-ruta-character-sheet.png`, `lt-jonas-character-sheet.png`, `lt-danute-character-sheet.png`, `lt-darius-character-sheet.png`, `lt-egle-character-sheet.png` and `lt-learner-character-sheet.png`.

Five already generated object assets are reused by meaning: coffee, chocolate, giraffe, hotel and telephone. Other Lithuanian assets are generated individually against the approved style board and the appropriate Lithuanian character reference. Each completed asset has a preserved master, transparent WebP and exact prompt record in `lt-records/`. `lithuanian-art-status.json` tracks progress; a partially populated map is not a completed migration.

`tools/integrate_course_art.py` connects only valid finished exports, preserving old pictures until replacements exist. `tools/check_lithuanian_art.py --require-complete` must pass before the full rollout is called complete. Its checks cover all image decodes, a real mobile lesson, fallback behavior, offline reload and browser errors; it also creates `lithuanian-gallery.html` for visual review.

Spanish's first object unit was prepared before this priority change and is held in preview. After the complete Lithuanian migration, continue Spanish, then apply the same references to onboarding, celebrations and empty screens.

The approved board and the first Mariana/Diego character sheet are saved locally. Spanish's Sounds unit is the first production rollout: ten individual illustrations in `pics/art-v2/`, mapped in `lang/es.js`. Other units retain their previous pictures until their replacements are ready. Spanish remains in preview.

## Spanish Sounds deliverables

The ten semantic assets are giraffe, tortilla, pineapple, hotel, chocolate, coffee, telephone, guitar, taco and cereal. Generated PNG masters are preserved in `masters/`; the app uses transparent 512px WebP exports. [The asset manifest](spanish-sounds-assets.json) records each master, export and exact prompt. Generation uses the built-in `image_gen` tool.

Run `node tools/check_course.js es` to check the mappings and course. Run `G:/Python/python.exe tools/check_spanish_art.py` to check the actual mobile lesson, every exported image, the missing-image fallback and a full offline reload. It also saves mobile screenshots here for visual review. The test uses an isolated local browser session and local HTTP server.
