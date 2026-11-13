# A1 scenario batch

Ten additional scenarios now run in local preview in both Lithuanian and Spanish. Together with the café and introductions, these provide initial practice for all 12 objective candidates in `a1-foundation.json`. This is not a complete A1 descriptor inventory, validated A1 syllabus or proficiency assessment.

| Scenario | Practical task | Preview hash |
| --- | --- | --- |
| A day in your life | Read a diary, understand routines, compose two different familiar sentences | `#a1-routines` |
| Find your way | Follow a sign on a small accessible map, find a place, write a route | `#a1-directions` |
| Reply to an invitation | Find place/time, accept or decline, ask for a missing time | `#a1-messages` |
| Check a price | Interpret price/quantity labels and recordings, ask about a price | `#a1-prices` |
| Read a simple schedule | Find an appointment day/time and communicate them | `#a1-times` |
| Talk about family | Read a profile, understand family information, describe a practice family | `#a1-family` |
| Describe a home | Read a description, understand a practical question, write home facts | `#a1-home` |
| Find a shared interest | Understand preferences, choose two familiar interests, ask a question | `#a1-preferences` |
| Choose an item | Interpret a shopping request and fit problem, ask a shop question | `#a1-shopping` |
| Keep a conversation going | Recognise misunderstanding and ask for repetition | `#a1-clarification` |

Prepend `?preview=1&lang=lt` or `?preview=1&lang=es` to open a scenario. All are also reachable through the practice hub. No deployment was made.

## Structure

Each scenario has a briefing, two reading tasks, two listening tasks and two writing tasks, followed by optional recorded speaking practice. Two authored variants change selected details or ordering where the source language supports it. Labels and choices are shuffled; unchanged details remain unchanged where only one taught source example exists.

The tasks reuse exact course cards. Every target-language line, audio source and writing hint must resolve to one of those cards. Entry and result recording require those cards to satisfy the existing `taught` rule. Untaught content stays hidden behind an English lesson-source list, including on a direct preview link.

Writing supports three contracts:

- One appropriate learned request or reply, accepting the course's valid alternatives.
- Two sentences/instructions in a specified order for a particular route or practice profile.
- Any two different learned statements for a chosen routine or set of interests.

Lines may be separated by newlines or sentence-ending punctuation. Repeating the same sentence does not fulfil an “any two” task. Invitation replies accept either a positive or negative choice; declining is not a language error. Prompts specify practice roles where a response need not describe the learner's real life.

These are bounded sentence-pattern checks. They cannot evaluate general writing quality, flexible dialogue, spontaneous speaking or a full CEFR level. The speaking task remains self-comparison, not an automatic pronunciation score.

## Runtime and evidence

`topic-content.js` contains language-specific source references and scenario definitions. `topic-practice.js` validates and registers them, then uses the shared modal, audio and recording controls from `activities.js`. Each registration has an objective ID, activity version, skill/method definitions and exact prerequisites.

The session key is `wordami.topic.v1.<language>.<topic>`. It stores only the attempt ID, task position, variant and source signature. Typed replies and recordings are not stored in practice evidence. Completion and hints use the existing device-local per-language activity store, independent from course state, XP and FSRS.

The menu now lists activities before practice totals, shows which ones still require teaching, and distinguishes ongoing from completed reading/listening/writing visits. It does not label a CEFR level as achieved.

The [coverage checkpoint](ACTIVITY-COVERAGE.md) is generated from actual preview registrations, including source-card IDs, lesson IDs and recording availability. It resolves 25 internal activity modules per language across the 12 candidate objectives. Module counts are implementation detail, not separate courses or proficiency outcomes.

## Validation

`G:/Python/python.exe -u tools/check_a1_topics.py` passed all 20 new scenario flows and 120 task steps. The browser tests cover new/partially taught learner locks, deliberate wrong choices, missing audio completion, interrupted playback and resume, transcript assistance, invalid/duplicate writing, valid acceptance and refusal, actual lesson-audio playback, synthetic-microphone self-comparison, unchanged course state, reload without duplicate results, mobile layout and offline resume.

The café, first A1 set and introduction browser checks also pass after the shared menu changes. Screenshots and reports are in `output/a1-topics/`, `output/a1-practice/`, `output/introductions/` and `output/adventure/`.

## Remaining programme work

The first practice pass is implemented across the 12 candidates. Educator/native-language review, comprehensive descriptor mapping, broader reading documents, extended listening, open-ended writing, genuine spoken interaction, calibrated assessments, account-synced evidence and learner trials remain. A2–C2 development is still outstanding. This milestone makes none of those completion claims.
