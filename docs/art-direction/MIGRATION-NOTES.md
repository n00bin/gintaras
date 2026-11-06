# Lithuanian artwork continuation

Release 3.112 ships 148 reviewed course pictures, 20 named portraits and the default learner portrait. The 340 pending course jobs are recorded in lithuanian-art-pending.json. PICTURE_MIGRATION_COMPLETE remains false, so unfinished words retain their current artwork.

Use approved-style-reference.png and the character references for subsequent generation. Preserve vocabulary, lesson IDs, recordings, customized avatars and saved progress. Review every new output before integration. Do not regenerate completed assets. Full-resolution masters and generation service paths remain local; the production WebPs and exact prompts are saved here.

Run tools/check_course.js, tools/check_art_compatibility.js and tools/check_lithuanian_art.py before the next rollout. The finalizer requires the complete set and must not be used for a partial release.
