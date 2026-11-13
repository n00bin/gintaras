# Lithuanian café activity

Local preview only, after the Food and drink restaurant unit (`u15`).

The activity has a mission briefing followed by four tasks in one café visit:

1. Choose coffee or tea from the menu.
2. Type an order for that drink.
3. Type a request for the bill.
4. Type a question about paying by card.

Every Lithuanian phrase displayed or required is drawn from existing course cards:

| Required card | Course source |
| --- | --- |
| kava, arbata | Food: At the table |
| meniu | Food: Eating out |
| Aš noriu kavos | Food: Eating out |
| Aš noriu arbatos | Food: At the table |
| Sąskaitą, prašau | Food: Eating out |
| Ar galima mokėti kortele? | Restaurant: Paying and details |

Requirements resolve against actual course items, including split lesson IDs. All seven cards must satisfy the app's existing `taught` rule: an introduction card was presented, or the item has reached recall level 2. Incidental exposure, lesson flags alone, and a direct preview link do not bypass the check. Missing prerequisites show their source lessons in English, without displaying the unlearned Lithuanian answers. This checks prior teaching, not long-term mastery.

English scene directions introduce no additional target-language dialogue. All three written tasks accept valid alternatives; alternatives are not required or shown as new teaching. Optional answer hints use the exact taught course phrase. Any hint makes the visit assisted.

Progress is device-local under `wordami.adventure.lt.cafe.v2`, separate from the earlier design pilot. The activity changes no course progress, XP, FSRS, or Can Do badges. No claim of proficiency or certification is made.

Verification: `G:/Python/python.exe tools/check_adventure.py` covers fresh and partial prerequisite locks, incidental-exposure rejection, full unlock, both drink choices, task sequence, valid alternative replies, errors, resume, assisted completion, unchanged course state, mobile layout, offline reload, and Lithuanian preview isolation.
