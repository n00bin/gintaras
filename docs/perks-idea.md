# Perks (chosen by the owner and built 2026-10-27)

Earning amber (only by learning): +1 any lesson or practice, +3 flawless, +5 conversation, +2 daily goal,
+10/+25/+50 on reaching a 7/30/100-day streak, +20 moving up a division, +15/10/5 for 1st/2nd/3rd in your league
(only when 2+ people in the group earned XP), +10 each week you stay in the Sun league, treasure chest (3-10) every 5th lesson.
Kept as two running totals in saved progress (amberEarned, amberSpent) so syncing never creates or loses any.

Shop (Profile, or tap the amber in the top bar):
- Spare rest day, 10: hold up to 2, on top of the 2 free rest days a week.
- Double XP for 15 minutes, 15: once a day, not during happy hour.
- Streak repair, 30: brings back a streak that broke in the last 2 days.
- League shield, 25: can't move down at the end of this week; once a month. Stored in gintaras_profiles.shield_week.
- Friend challenge, 10-50: tap a player on the League tab. Both stake the same; most XP by Sunday night wins both.
  Table gintaras_challenges; the weekly job settles it, a database trigger stops anyone answering for someone else.

Happy hour: one hour a day, the same for everyone, between noon and 10 pm (picked from the date), double XP.
Never stacks with bought double XP.

Not chosen: avatar colours, frames, titles, hints, bonus content packs.
Database setup: supabase/perks.sql (already run on the live project).

Leagues (2026-10-27): 7 leagues x 3 divisions (III, II, I) = 21 steps, stored as league 0-20. Moving up needs top 3 AND the league's XP bar,
the same for everyone: Sand 150, Pebble 200, Amber 250, Silver 300, Gold 350, Crystal 425, Sun 500 (supabase/league-bars.sql;
BARS in cloud.js must match). Daily goals are 7 XP per minute of pace (measured: a lesson is ~24 XP in 3-4 min). #1 in Sun gets a crown for the next week. Setup: supabase/divisions.sql
(already run; backups gintaras_profiles_backup_20261027 / gintaras_progress_backup_20261027 taken first).

Leagues v3 (2026-10-27, supabase/leagues10.sql, run): 10 leagues x 2 divisions (II, I) = steps 0-19. Sand, Pebble, Copper, Amber,
Silver, Gold, Crystal, Moon, Star, Sun; bars 150/175/200/250/275/300/350/400/450/500 (BARS in cloud.js must match).
Sun Cup: monthly from the first Monday. Round 1 = Sun league players with 500+ XP that week; top half (min 2) go through
to the semifinal, then the final; final top 3 get +100/50/25 amber (paid by the app, S.cupPaid), winner's cup_wins +1 (🏆 on name).
Table gintaras_cup. The weekly job is gintaras_league_settle(monday) (testable on any date) called by gintaras_league_rollover().
Backups taken first: *_backup_20261027, *_backup_20261027b, *_backup_20261027c.

Bar watcher (2026-10-27, supabase/bar-watcher.sql, run): each Monday, after settling with the bars shown all week, the job takes
each player's week XP per minute of lesson time (state.ltime), uses the median of players with 30+ minutes when there are 3+,
and moves gintaras_meta.bar_scale toward median/7: at most +/-10% a week, kept between 0.667 and 1.6. Bars = base x scale,
rounded to 5. Every Monday writes a row to gintaras_bar_log. The app reads gintaras_bars() and says when bars changed.
The Sun Cup entry follows the Sun bar. Backup *_backup_20261027d taken first.
