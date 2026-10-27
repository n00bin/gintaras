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
