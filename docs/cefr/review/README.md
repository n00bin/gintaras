# Complete source review books

- [Lithuanian](lt.md)
- [Mexican Spanish](es.md)
- [Lithuanian grammar](grammar-lt.md)
- [Spanish grammar](grammar-es.md)

Each book exports all 30 built units, teaching notes, sources, English guides, task keys, partner prompts, audio links and writing assignments. No learner data is included.

[Editorial queue](review-queue.json) identifies exact unit versions and language/design questions. The [pending record template](pending-review-records.json) contains blank, unapproved records. Completed reviews need the actual reviewer, date, substantive findings and matching current content hash. These exporters never create approvals or write the active `docs/cefr/curriculum-reviews.json` file. Editorial approval alone does not establish complete syllabus breadth or calibrated proficiency assessment.

Regenerate books with `G:/Python/python.exe tools/export_curriculum_review.py`. After rebuilding `tools/audit_curriculum_release.py`, regenerate assignments with `G:/Python/python.exe -X utf8 tools/export_curriculum_review_queue.py`.
