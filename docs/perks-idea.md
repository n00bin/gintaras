# Perks (chosen by the owner and built 2026-10-27)

Earning amber (only by learning): +1 any lesson or practice, +3 flawless, +5 conversation, +2 daily goal,
+10/+25/+50 on reaching a 7/30/100-day streak, +20 league promotion, treasure chest (3-10) every 5th lesson.
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
