# Image migration restart checkpoint

Saved November 8, 2026, after the built-in image tool returned HTTP 429 `usage_limit_reached` while requesting `old`.

- Lithuanian: **297 / 488** course mappings approved, exported and connected locally. **191** remain.
- All 20 recurring portraits and the default learner portrait are complete.
- This run added 149 reviewed course mappings, from the previous 148.
- No exported active job awaits review. Rejected originals are preserved and excluded from integration.
- Daily image limit: `limit_window_minutes: 1440`. Tool-reported reset: **2026-11-09 21:54:17 UTC**, **November 9, 2026, 3:54:17 p.m. America/Chicago**. This is the image tool's limit, not an inference from the Codex usage page.
- Generation used the built-in image tool, one request per asset. No API/CLI fallback was used.
- App exports: `pics/art-v2/`. Preserved PNG originals: `docs/art-direction/masters/`. Exact prompts and export metadata: `docs/art-direction/lt-records/`.
- Current production remains **3.114 / build 186**, commit `ad846ea5a57280140e3f51a47c65bf24ced97aea`. These new images have not been deployed.

## Resume

Run `tools/resume_course_art.py --take 24` after the reset to refresh the pending list. This changes generation status back to in-progress, so do not run it merely to inspect while quota remains unavailable.

The first pending jobs are `white-v3`, `pink-v3`, then `old`. Generate fresh short briefs for revisions instead of repeating the rejected composition. For white, use a fully opaque white polar bear with navy eyes and nose, no ball or hole. For pink, use a fully opaque pink T-shirt, no ball or ring. Check opaque interiors as well as the outer alpha edge. Preserve original masters; every retry gets a new versioned ID.

`tools/revise_course_art.py --rejections <file.json>` accepts an array of `{id, reason}` for explicitly rejected images. It preserves old files, records the rejection, updates semantic mappings and persists overrides for future plan rebuilding. It must not be used to reject uninspected assets.

Only approve after visually checking the asset at lesson size and 56px on light and dark backgrounds. `tools/render_art_review_pages.py --unreviewed` renders the actual exports without approving them. Then use `tools/resume_course_art.py --approve ...`, followed by `tools/integrate_course_art.py`. Keep all lesson IDs, source words, audio and progress data unchanged.

## Latest verification

At 297 mappings, `tools/check_lithuanian_art.py` passed all image decodes, a real mobile lesson, missing-image fallback and offline reload, with no browser errors. Full migration is intentionally still incomplete; do not claim completion or use the complete release label until all 488 mappings and the required checks pass.

Finish Lithuanian images, then Spanish artwork, then return to the remaining CEFR work as requested. Do not publish unrelated unfinished root changes or overwrite the scoped live release with the root working tree. The broad CEFR curriculum remains unfinished; this image run made no new CEFR completion claim.
