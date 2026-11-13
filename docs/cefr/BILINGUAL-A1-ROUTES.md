# Guided routes and independent task checks in both languages

Local preview now has a guided A1 route for Lithuanian and Mexican Spanish. Both contain twelve chapters and launch real existing teaching lessons. Lithuanian has sixteen required practice visits and Spanish has thirteen; the additional Lithuanian calendar, descriptions and rooms activities are not silently substituted into Spanish.

Every chapter links to its actual activities. A Back to chapter button returns from those activities, including the separate Lithuanian café adventure. Returning restores the guided-route URL, so a reload no longer unexpectedly reopens the activity that was just left. No lesson or activity is marked complete by opening it or returning from it.

There are now twenty-six lesson-adjacent activity cards in Lithuanian and fifteen in Spanish. This includes café writing, which previously lacked a direct source-lesson placement; the Spanish guide's missing café-writing launch connection is also fixed. Original course PATH entries and saved lesson/card identities are unchanged.

## Optional independent checks

Both languages have a meeting-details check and a price/quantity check. Each has two reading answers, two listening answers and two written familiar requests. Listening requires actual playback. Answers are submitted once and feedback is held until all six have been attempted. Incorrect answers remain in the result; completing the visit does not mean every answer was correct.

The Spanish versions use taught Spanish course cards, Mexican pesos and context-specific requests. They accept whole-number quantities, whole-hour time notation and price notation separately. A time such as `2:00` cannot match a quantity, and a euro amount cannot match a peso price. No additional audio generation or external assessment service was required.

Checks are linked from the route overview and the relevant prices/arrangements chapters. They have their own taught-language gates and are optional; neither completing a check nor practising every chapter awards a CEFR level or changes FSRS, XP or course mastery.

## Persistence and verification

Route milestones are stored under separate language keys. A completed visit remains recorded after the activity log's 200-attempt retention window. Two tabs merge these milestones when saving the route, so changing chapter in an older tab preserves milestones recorded by another tab. This merge applies to route milestones; it does not claim full multi-tab synchronisation of every app feature.

`tools/check_bilingual_routes.py` exercises both real first lessons, all 24 chapters, all 29 required activity links and return controls, all 41 placements, both languages' optional checks, retention after history trimming, language isolation, competing-tab route saves and 320-pixel layouts. `tools/check_spanish_checks.py` verifies real Spanish audio, held feedback, resume, incorrect answers, currency/number rejection and unchanged course state. Existing Lithuanian check, shared practice and café-adventure regressions also pass.

The runtime report now contains 42 Lithuanian and 27 Spanish A1 modules. These are implementation counts, not validated descriptor coverage. Native-speaker and educator review, complete A1 assessment and the broader four-skill A2–C2 programme remain outstanding. The existing A1–C2 writing workshops remain guided practice and self-review, rather than proficiency certification.

Preview: `?preview=1&lang=lt#a1-route` or `?preview=1&lang=es#a1-route`. No production deployment was performed for this checkpoint.
