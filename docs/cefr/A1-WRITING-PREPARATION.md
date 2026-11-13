# A1 project-specific writing preparation

The twelve existing A1 writing projects now have twelve worked models, thirty-six guided purpose exercises and saved project plans across Lithuanian and Mexican Spanish. These support existing activities rather than add new course units or independent assessment results.

## Learn, plan, write and revise

Each project now shows a short model that actually meets that project's goals, followed by an explanation of what each line gives its reader. The introduction, home note, meeting message, shopping note, visitor note and directions task use different examples and purposes.

The guided exercise asks which of three familiar lines supplies a particular piece of information. A wrong choice gives a prompt to compare its purpose; a correct choice explains the connection. All three purposes can be practised before planning a message. This exercise is supported practice and does not award proficiency, introduce new review items or complete the project.

Learners can then enter their own details under the three goals. Planning notes are saved with the existing project. **Write using my plan** moves to the draft without copying a model or the planning notes into the learner's response. The existing feedback, revision, quoted evidence and reflection stages remain required for a self-reviewed completion.

## Length guidance

The first projects previously displayed a generic 20–60-word range, while later A1 notes suggested 25–70 words. Several short models that already meet their practical goals fall below those ranges. That guidance could encourage padding instead of a useful message.

Effective A1 ranges are now project-specific practice suggestions:

| Project | Suggested words |
| --- | ---: |
| Introduction | 8–35 |
| Home note and invitation | 6–30 |
| First-meeting message | 8–30 |
| Shopping note | 6–25 |
| Visitor note | 8–35 |
| Directions | 12–40 |

These are authoring estimates, not CEFR requirements or minimum pass marks. Every worked model fits its displayed range and uses target-language forms that have explicit preparation by that point. Source review books show the effective ranges and exact teaching models.

## Progress and privacy

Teaching support is stored separately from the original course content objects. Original unit signatures, project IDs, source preparation, drafts and completion records remain compatible. Planning fields have stable IDs so saved details can be reused after normal copy updates.

Plans use the project's existing local storage and autosave/conflict handling; they are excluded from account sync. Draft text exports now include planning notes, including visible unsaved notes when a storage-full error prevents saving. The learner's draft is never replaced automatically. The privacy page describes planning-note storage alongside drafts and reflections.

## Verification

- All twelve models pass exact-form preparation checks and match the existing narrow goal coach.
- All thirty-six guided purpose exercises pass correct/incorrect choice and explanation checks in both languages.
- Browser tests cover saved-plan reloads, unchanged drafts, unchanged original course/review progress, 320-pixel layout and storage-full recovery through export.
- Existing A1 feedback tests still pass eight spoken-production and twelve writing contexts.
- Prior-writing preparation reuse, completed-course migration and both original card-path prerequisite checks pass.
- Cold offline checks complete a purpose exercise and save a project plan in both languages with synthetic prerequisite fixtures. They report no page errors or failed requests.

Commands: `python tools/audit_writing_preparation.py`, `python tools/check_writing_preparation.py`, `python tools/check_a1_feedback.py`, and `python tools/check_skills_offline.py`.

The source audit is included in release checks. A1 review fingerprints include the support implementation. This does not close linguistic review, complete CEFR breadth or establish independent productive-skill assessment. No production push was performed.
