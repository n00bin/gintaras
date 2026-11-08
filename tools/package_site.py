"""Build a static site from an allowlist; exclude authoring files and worktrees.

No destination is removed or overwritten. Use --check for a read-only preflight.
"""
import argparse
import json
import shutil
import subprocess
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1]
ROOT_FILES = {'index.html', 'privacy.html', 'manifest.json', '.nojekyll'}
ROOT_SUFFIXES = {'.js', '.svg'}
ASSET_SUFFIXES = {'.mp3', '.ogg', '.wav', '.webm', '.m4a', '.webp', '.png', '.jpg', '.jpeg', '.svg', '.json', '.js'}


class References(HTMLParser):
    def __init__(self):
        super().__init__(); self.paths = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        for key in ['src', 'href']:
            value = attrs.get(key)
            if not value or value.startswith(('#', '//')):
                continue
            parsed = urlsplit(value)
            if not parsed.scheme and parsed.path:
                path = unquote(parsed.path).removeprefix('./').lstrip('/')
                self.paths.append(path or 'index.html')


def inventory():
    files = {p.relative_to(ROOT) for p in ROOT.iterdir()
             if p.is_file() and (p.name in ROOT_FILES or p.suffix in ROOT_SUFFIXES
                                or p.suffix == '.png' and p.name.startswith(('icon-', 'wordami-'))
                                or p.name == 'og-image.png')}
    for folder in ['audio', 'pics', 'lang']:
        for path in (ROOT / folder).rglob('*'):
            if path.is_file() and not path.is_symlink() and path.suffix.lower() in ASSET_SUFFIXES:
                if any(part.startswith('.') for part in path.relative_to(ROOT).parts):
                    continue
                files.add(path.relative_to(ROOT))
    # A symlink at the root or in an asset subtree must never escape the workspace.
    for path in files:
        if not (ROOT / path).resolve().is_relative_to(ROOT.resolve()):
            raise ValueError('Asset resolves outside the project: ' + str(path))
    return files


def validate(files):
    names = {p.as_posix() for p in files}
    assert ROOT_FILES <= names, 'Missing site entry file'
    for filename in ['index.html', 'privacy.html']:
        refs = References(); refs.feed((ROOT / filename).read_text(encoding='utf8'))
        for path in refs.paths:
            assert path in names, filename + ' references an unpackaged file: ' + path
    manifest = json.loads((ROOT / 'manifest.json').read_text(encoding='utf8'))
    for icon in manifest.get('icons', []):
        assert icon['src'].lstrip('./') in names, 'Unpackaged installation icon'
    program = "const fs=require('fs'),s=fs.readFileSync('sw.js','utf8');console.log(JSON.stringify(new Function(s.split('self.addEventListener')[0]+';return CORE;')()));"
    core = json.loads(subprocess.check_output(['node', '-e', program], cwd=ROOT).decode('utf8'))
    assert len(core) == len(set(core)), 'Duplicate offline cache path'
    for path in core:
        assert (path.removeprefix('./') or 'index.html') in names, 'Offline asset not packaged: ' + path
    assert not any(any(part.startswith('.') for part in p.parts) for p in files if p.name != '.nojekyll')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true')
    parser.add_argument('--output', type=Path)
    args = parser.parse_args()
    files = inventory(); validate(files)
    size = sum((ROOT / p).stat().st_size for p in files)
    if args.output:
        destination = args.output.resolve()
        if not destination.is_relative_to(ROOT.resolve()) or destination == ROOT.resolve():
            raise ValueError('Output must be a new directory within this project')
        if destination.exists() and any(destination.iterdir()):
            raise ValueError('Output must be empty; nothing will be overwritten')
        destination.mkdir(parents=True, exist_ok=True)
        for path in sorted(files):
            target = destination / path
            target.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(ROOT / path, target)
    elif not args.check:
        parser.error('Choose --check or --output')
    print(json.dumps({'passed': True, 'files': len(files), 'bytes': size,
                      'authoringFilesIncluded': False, 'output': str(args.output) if args.output else None}))


if __name__ == '__main__':
    main()
