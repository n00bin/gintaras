# Reviewed images published

Release **3.115 / build 187**, commit `6c7c739ebee99a9afc93b52c8e21f662620785c3`, was pushed from the isolated `.release-lithuanian-art` checkout on top of live build 186. GitHub Pages deployment succeeded: https://github.com/n00bin/gintaras/actions/runs/42564538232.

This release adds **149 approved Lithuanian illustrations**, bringing the connected course picture total to **297 / 488**. The remaining 191 mappings retain their previous pictures. All 20 named portraits and the default learner portrait remain available.

Only the approved picture mapping block, approved image exports and authoring records, release metadata and relevant image tools/checks were published. Course content outside the picture block is byte-for-byte unchanged. Vocabulary, lesson IDs, learning path, recordings, practical activities and Spanish availability are preserved. The separate unfinished root curriculum was excluded.

Checks passed: course structure, first three unit readiness, exact vocabulary/path/conversation/audio compatibility, all 297 image decodes, real mobile lesson, fallback handling, offline reload and public package preflight. An installed build-186 app updated to 187 with Unit-3 progress, FSRS fields, XP, names, conversations and picture cache preserved.

The root working tree remains on an older base with unfinished preview work. Do not push it wholesale. Use current remote main and the isolated checkout for any subsequent scoped release.
