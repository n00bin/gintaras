"""Save the resumable artwork state after the built-in image tool's quota is exhausted.

--record-reviewed-pages records only pages the operator has already visually inspected.
It never marks newly rendered or unseen pages reviewed automatically.
"""
import argparse
import json
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIR = ROOT / 'docs/art-direction'
REVISIONS = {
    'nobody': ('nobody-v2', 'A person is shown for nobody; use a genuinely empty scene.'),
    'only': ('only-v2', 'A plain coffee cup does not distinguish only from coffee; show one selected item.'),
    'because': ('because-v2', 'A food thought bubble does not convey causation; use a clear cause and effect.'),
}


def save(path, value):
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--record-reviewed-pages', action='store_true')
    args = parser.parse_args()
    review_path = DIR / 'visual-review.json'
    review = json.loads(review_path.read_text(encoding='utf-8'))
    approved = set(review['approved_ids'])
    for old_id, (new_id, reason) in REVISIONS.items():
        old = DIR / 'lt-records' / (old_id + '.json')
        if old.exists():
            record = json.loads(old.read_text(encoding='utf-8'))
            record.update(status='needs_revision', replacement=new_id, revision_reason=reason)
            save(old, record)
        approved.discard(old_id)
    if args.record_reviewed_pages:
        pages = json.loads((DIR / 'review-pages/unreviewed/index.json').read_text(encoding='utf-8'))
        for page in pages:
            for key in page['asset_ids']:
                if key not in REVISIONS:
                    approved.add(key)
    review['approved_ids'] = sorted(approved)
    review['needs_revision'] = [{'id': key, 'replacement': replacement, 'reason': reason} for key, (replacement, reason) in REVISIONS.items()]
    save(review_path, review)

    plan = json.loads((DIR / 'lithuanian-art-jobs.json').read_text(encoding='utf-8'))
    pending = []
    for job in plan['jobs']:
        file = DIR / 'lt-records' / (job['id'] + '.json')
        record = json.loads(file.read_text(encoding='utf-8')) if file.exists() else {}
        if record.get('status') != 'exported' or not (ROOT / record.get('asset', 'missing-art-file')).is_file():
            pending.append(job)
    reset = datetime.fromtimestamp(1794001004, timezone.utc)
    state = json.loads((DIR / 'migration-run.json').read_text(encoding='utf-8'))
    state.update(generation_status='waiting_for_image_quota', active_tool_cell=None,
                 stopped_tool_cells=['g2:72'], stop_reason='usage_limit_reached',
                 quota_reset_utc=reset.isoformat(), quota_reset_local=reset.astimezone().isoformat(),
                 pending_course_jobs=len(pending), visually_reviewed_assets=len(approved))
    save(DIR / 'migration-run.json', state)
    save(DIR / 'lithuanian-art-pending.json', {'quota_reset_utc': reset.isoformat(), 'jobs': pending})
    print(json.dumps({'pending_course_jobs': len(pending), 'reviewed_assets': len(approved), 'revisions': list(REVISIONS), 'quota_reset_local': state['quota_reset_local']}))


if __name__ == '__main__':
    main()
