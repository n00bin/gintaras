# A1 speaking and writing feedback

The existing A1 activities now have task-specific, local prepared-pattern feedback in both languages. This adds support to twelve writing projects and eight spoken-production activities; it does not add or relabel course units.

## Writing

The three original A1 projects have different goals: an introduction, a home note and a first-meeting message. The shopping, visitor-note and directions assignments each have their own goal set as well. The coach checks the learner's current draft after revision guidance opens.

Recognised patterns include an excerpt from the actual draft. Missing matches produce a specific next step and an option to revisit prepared examples. Four limited error patterns per language family provide concrete corrections where implemented, such as the Lithuanian residence form or Spanish adjective agreement. Help examples are checked against language prepared by that point in the course.

Editing the draft clears the old feedback. Learners can check again, improve the message, and then use the existing quote-and-reflection review. Coach feedback does not complete the assignment or bypass evidence, revision or saving requirements. Different valid wording remains available for self-review instead of being declared incorrect.

## Speaking

The four spoken-production activities offer optional notes after recording and replay. The note checker remains disabled until the learner has actually recorded and replayed a response. It checks only notes the learner types about that replay; it does not recognise the recording, assess pronunciation or judge whether the notes match the voice.

The coach highlights familiar task details and suggests one specific change. Learners can record again using that change. Starting a new recording invalidates the earlier note feedback and requires another replay. Notes and feedback are temporary and disappear on leaving the activity. They are not added to saved speaking results, exports or account sync.

## Scope and evidence

There are ten feedback contexts per language: six writing and four spoken-production contexts. The rule set distinguishes item quantity from price, avoids recognising negated statements as positive task details in the tested patterns, and does not treat unmatched alternative wording as a language error. These are narrow checks, not general semantic assessment, full grammar correction, intelligibility scoring or CEFR proficiency evidence.

Tests cover twenty positive examples, negative statements, unknown valid alternatives, narrow corrections and prepared help language. Browser tests exercise all twenty contexts, real recording and replay with generated microphone input, revision, feedback invalidation, temporary-note privacy and unchanged original course state. Coach feedback cannot supply a successful task result. Browser tests also verify that existing self-review evidence remains required.

Returning to a saved writing URL now refreshes its prerequisites after the connected skills module loads. This fixes a link that could remain visibly locked despite completed preparation. Existing draft data and lesson identities remain unchanged. Prior-writing reuse and completed-course migration checks still pass.

The module is cached for offline use. Cold offline tests in both languages load the feedback code and recognise the prepared introduction model without a scoring service. The review books include the actual feedback goals and help examples.

Commands:

```text
python tools/check_a1_feedback_content.py
python tools/check_a1_feedback.py
python tools/check_learning_structure.py
python tools/check_curriculum_migration.py
python tools/check_skills_prior_writing.py
python tools/check_skills_offline.py
```

The curriculum audit includes the feedback content checks and binds A1 review fingerprints to the feedback implementation. Language/descriptor review and calibrated independent productive assessment are still incomplete. No production release or push was performed.
