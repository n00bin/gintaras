"""Prepare the local release only after all Lithuanian illustrations and portraits are complete."""
import argparse
import json
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--release', required=True, help='New release after checking the current local and remote versions')
    parser.add_argument('--build', required=True, type=int, help='New build number, greater than the existing build')
    args = parser.parse_args()
    if not re.fullmatch(r'\d+\.\d+(?:\.\d+)?', args.release):
        raise ValueError('Malformed release number')
    status = json.loads((ROOT / 'docs/art-direction/lithuanian-art-status.json').read_text(encoding='utf-8'))
    if not status['complete'] or status.get('portraits') != 20 or not status.get('learner_portrait'):
        raise ValueError('The full Lithuanian artwork migration is not complete')
    directory = ROOT / 'docs/art-direction'
    jobs = json.loads((directory / 'lithuanian-art-jobs.json').read_text(encoding='utf-8'))
    people = json.loads((directory / 'cast-identity-references/index.json').read_text(encoding='utf-8'))
    required = {asset.rsplit('/', 1)[-1] for asset in jobs['mapping'].values()}
    required.update('portrait-' + person['id'] for person in people)
    required.add('portrait-learner')
    reviewed = set(json.loads((directory / 'visual-review.json').read_text(encoding='utf-8'))['approved_ids'])
    if required - reviewed:
        raise ValueError(f'{len(required - reviewed)} production illustrations still need visual review')
    app = ROOT / 'index.html'
    text = app.read_text(encoding='utf-8')
    current_build = int(re.search(r'const APP_VERSION=(\d+);', text).group(1))
    if args.build <= current_build:
        raise ValueError('Choose a new build greater than the current build; preserve concurrent releases')
    text = re.sub(r"const APP_RELEASE='[^']+';", "const APP_RELEASE='" + args.release + "';", text, count=1)
    text = re.sub(r'const APP_VERSION=\d+;', 'const APP_VERSION=' + str(args.build) + ';', text, count=1)
    text = re.sub(r"const WHATS_NEW='(?:\\.|[^'\\])*';", "const WHATS_NEW='New rounded illustrations throughout the Lithuanian course, with matching conversation characters. Your lessons and progress carry on as before.';", text, count=1)
    app.write_text(text, encoding='utf-8')
    worker = ROOT / 'sw.js'
    worker.write_text(re.sub(r"const SHELL = 'gintaras-shell-v\d+';", "const SHELL = 'gintaras-shell-v" + str(args.build) + "';", worker.read_text(encoding='utf-8'), count=1), encoding='utf-8')
    changelog = ROOT / 'CHANGELOG.md'
    history = changelog.read_text(encoding='utf-8')
    entry = '- **' + args.release + '** (' + date.today().isoformat() + ') Lithuanian gets the approved rounded cartoon style across all 488 existing course pictures, all 20 conversation characters and the default learner portrait. Images share a consistent palette and character references, use optimized transparent WebP files and are saved with the lessons for offline use. Intentional number/day text tiles, course content, recordings, custom avatars and progress IDs are retained.\n'
    if '- **' + args.release + '**' not in history:
        at = history.index('\n') + 1
        history = history[:at] + '\n' + entry + '\n' + history[at:].lstrip('\n')
        changelog.write_text(history, encoding='utf-8')
    print(f'Prepared local release {args.release} / build {args.build}. No deployment was started.')


if __name__ == '__main__':
    main()
