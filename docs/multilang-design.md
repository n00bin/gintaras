# Multi-language design

Gintaras teaches more than one language. First: Lithuanian (today's course) and Mexican Spanish (new).

## Decisions (locked with the owner, 2026-10-30)

1. **Spanish is Mexican Spanish.** Mexican voices, *ustedes* (never *vosotros*), Mexican everyday words. The owner's wife and kids are native speakers and check the course.
2. **The language is chosen the first time the app opens**, and can be switched at any time (Settings, and the top bar).
3. **Each language has its own leagues.** Spanish learners only meet Spanish learners. Weekly XP, divisions, the cup, bars and challenges are all per language.
4. **Separate per language:** XP, streak, rest days, daily goal and pace, words, lessons, crowns, conversations, stars, Quick chat cards, badges, amber (rest days and shields are bought with it), time in lessons, real-life skills.
5. **Shared across languages:** the account and nickname, the face, About me (name, gender, family, job...), settings (sound, effects, sounds-like, auto-next, lesson voice), the study reminder and notifications (one daily nudge that opens the language used last).

## How it works

### Language packs
Everything that belongs to one language moves out of `index.html` into a pack file, loaded before the app code:

- `lang/lt.js`: today's data block (COURSE, PATH, CONVS, PRON, SMAP, EMOJI, tips, drills, About-me banks, CANDO...) plus the Lithuanian-only helpers (name endings, a woman's word forms, auto sounds-like).
- `lang/es.js`: the same shape for Spanish.
- Each pack also defines `LANG`: code, English name, native name, speech code (`lt-LT` / `es-US`), the special letters for the keyboard, level titles, the audio folder, the Google voice language, Translate tab default.

Top-level `const`s in a classic script are visible to later scripts, so the app code keeps using `COURSE`, `PATH` and the rest unchanged. A tiny inline script reads the chosen language and writes the matching `<script src="lang/xx.js">` before the app script, so loading stays synchronous. Switching language saves, then reloads.

App code never says "Lithuanian" itself; it says `LANG.name`.

### Saved progress on the device
- Lithuanian keeps `gintaras.v2` (existing saves need no migration).
- Spanish uses `gintaras.v2.es`.
- Shared fields (`me`, `look`, `lookAt`, settings, `studyTime`, `notify`, `pushAsked`, `toured`) also live in `gintaras.shared` and are copied into whichever language is loaded, and saved back from it.
- The chosen language is `gintaras.lang`. With no choice yet but an existing Lithuanian save, it is `lt` (no picker for current users until Spanish has content).

### Server (Supabase)
- `gintaras_progress` gets `lang text not null default 'lt'`; the key becomes (user_id, lang).
- League data moves off the shared profile into a per-language table `gintaras_players` (user_id, lang, xp, streak, week_xp, week_start, league, league_moved, shield_week, daily_goal, last_rank, last_league, cup_wins, level_title, updated_at). `gintaras_profiles` keeps the shared identity (nickname, look).
- `gintaras_challenges`, `gintaras_cup`, `gintaras_bar_log` get a `lang` column; settle, rollover, bars, amber, challenge guard and the "passed you" notification run per language.
- Today's rows become `lang = 'lt'`. Everything is backed up first, and counts are checked before and after. Nobody loses data.
- SQL is handed to the owner to run (the assistant does not run schema changes).

### Audio and tools
- Spanish audio lives in `audio/es/`; Lithuanian stays in `audio/`.
- `check_course.js`, `audio_list.js`, `make_audio.py` and `make_voices.py` take the language and read its pack.
- The service worker caches both packs.

## Status

- Phase 1 shipped in 3.38 (course in lang/lt.js, language picker).
- Phase 2 shipped in 3.39 (supabase/languages.sql run 2026-10-30; checks: 9/9 players, 0 mismatches, backups kept).
- Phase 3 (Spanish Part 1) not started.

## Phases

1. **Split, plus the picker.** Lithuanian pack extracted, `LANG` object, pack loader, per-language saves with shared settings, tools and service worker updated. The language picker and switcher appear now, with Spanish shown as **Coming soon** (visible, not selectable) until its course exists (owner's call, 2026-10-30). Ship and confirm Lithuanian behaves exactly as before.
2. **Server per language.** Progress and leagues keyed by language, with backup and verification. Ship the matching `cloud.js`.
3. **Spanish goes live.** Picker on first open, switcher in Settings and the top bar, Spanish Part 1 with Mexican voices, checked by the family.

After that, Spanish and Lithuanian parts are built one at a time, in whatever order the owner picks.

## Revisions after review (2026-10-30)

1. **Shared settings are timestamped** (`sharedAt`, last write wins) and sync on their own, never through the higher-XP merge. Shared also covers `seenVersion`, `signinAsked`, `noSpeakUntil`, `welcomed`, `toured`. Per language also covers the amber ledgers, `cupPaid`, `chalLedger`, `chalSeen`, `leagueNotice`, shields, `goalDay`, `brokenStreak`, `freezes`, boosts, `ltime`, rest days. `voice` is mapped per language (woman/man), since voice ids differ. Reports carry `lang`. `gintaras.shared` is seeded from the existing Lithuanian save on first run. A pending cloud save is flushed before switching.
2. **`gintaras_progress` is not changed.** It stays the Lithuanian row; other languages get a new table. Old cached clients keep working.
3. **Server per language:** `gintaras_amber_of` and `gintaras_study_tick` take a `lang`; `gintaras_notify.last_lang` picks the language for the nudge; `gintaras_meta` gets a row per language; `gintaras_cup` and `gintaras_bar_log` keys include `lang`; challenges require both players on the same language; `gintaras_passed` moves to the per-language table and filters by language. Profile columns stay the live Lithuanian store with a guarded mirror trigger; nothing is dropped. Order: back up and count, add new tables and columns (backfill `lt`), mirror trigger, ship cloud.js, switch functions, and only then create Spanish rows. Never run it near Monday's settle.
4. **A missing language file shows a retry screen** and falls back to Lithuanian, never a blank page. The service worker pre-caches only `lang/lt.js`, other packs are cached when chosen, and a pack's `LANG.rev` must match the app version.
5. **Badges, level titles, league names and path checks come from the pack.** An empty or partial pack must not unlock anything.
6. **Phase 1 is client-only:** the pack split, `LANG` hooks (speech code, letters, levels), the loader with its guard, and the picker with Spanish shown as Coming soon. With only Lithuanian selectable, shared-settings sync and per-language saves land with Phase 2, and the page text ("Lithuanian" in static HTML) becomes `LANG`-driven in Phase 3.

## Not in scope here
Charging, moving the course behind sign-in, and app-store builds. Those come later, separately.
