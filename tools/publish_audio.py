"""Publish the recordings to their own sites, two per language (see audio-host.js).

    python tools/publish_audio.py            copy new/changed recordings, commit, push, then check every file is served
    python tools/publish_audio.py --check    only check that every recording the app has is served by its site
    python tools/publish_audio.py --dry-run  show what would be copied

Short clips live in the GitHub repository n00bin/wordami-audio-<lang>, the long readings and listening recordings
(audio/graded/) in n00bin/wordami-audio-<lang>-long (public, GitHub Pages from branch main), with the same folder
layout as audio/ here. A working copy of each is kept in G:/AI_PROJECTS/.work/<repository>.
A new language needs its repositories created before its first publish.
Run this BEFORE pushing an app release that needs new recordings.
Old recordings are never deleted from the sites: phones that haven't updated yet may still ask for them.
"""
import concurrent.futures, filecmp, shutil, subprocess, sys, time, urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AUDIO = ROOT / 'audio'
WORK = Path('G:/AI_PROJECTS/.work')
SITE = 'https://n00bin.github.io/'
sys.stdout.reconfigure(encoding='utf-8')


def lang(rel):
    """The same rule as audio-host.js: audio/es/..., or a file named es.* / es-* / es_* in a shared folder."""
    if rel.startswith('es/'):
        return 'es'
    name = rel.rsplit('/', 1)[-1]
    return 'es' if name[:3] in ('es.', 'es-', 'es_') else 'lt'


def site(rel):
    """The same rule as audio-host.js: wordami-audio-<lang>, or wordami-audio-<lang>-long for audio/graded/."""
    return 'wordami-audio-' + lang(rel) + ('-long' if rel.startswith('graded/') else '')


def recordings():
    """{site name: [paths under audio/]} for every recording here."""
    out = {}
    for p in sorted(AUDIO.rglob('*.mp3')):
        rel = p.relative_to(AUDIO).as_posix()
        out.setdefault(site(rel), []).append(rel)
    return out


def git(repo, *args):
    return subprocess.run(['git', '-C', str(repo), *args], check=True, capture_output=True, text=True).stdout


def sync(name, files, dry):
    repo = WORK / name
    if not repo.exists():
        subprocess.run(['git', 'clone', '-q', f'https://github.com/n00bin/{name}.git', str(repo)], check=True)
    git(repo, 'pull', '-q', '--ff-only')
    changed = []
    for rel in files:
        src, dst = AUDIO / rel, repo / rel
        if dst.exists() and filecmp.cmp(src, dst, shallow=False):
            continue
        changed.append(rel)
        if not dry:
            dst.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(src, dst)
    print(f'{name}: {len(files)} recordings, {len(changed)} new or changed')
    if dry or not changed:
        return False
    (repo / '.nojekyll').write_text('')
    (repo / 'README.md').write_text(
        f'# Wordami recordings ({name})\n\nServed by GitHub Pages at {SITE}{name}/ and used by the Wordami app '
        '(n00bin/gintaras, see audio-host.js). Published with tools/publish_audio.py; do not edit by hand.\n',
        encoding='utf-8')
    git(repo, 'add', '-A')
    git(repo, 'commit', '-q', '-m', f'{len(changed)} recordings from Wordami ({time.strftime("%Y-%m-%d")})')
    subprocess.run(['git', '-C', str(repo), '-c', 'http.postBuffer=1048576000', 'push', '-q', 'origin', 'HEAD:main'],
                   check=True)
    return True


def wait_for_pages(name):
    """Wait until GitHub Pages has built the commit just pushed."""
    head = git(WORK / name, 'rev-parse', 'HEAD').strip()
    for _ in range(90):
        out = subprocess.run(['gh', 'api', f'repos/n00bin/{name}/pages/builds/latest', '--jq', '.commit + " " + .status'],
                             capture_output=True, text=True).stdout.strip()
        commit, _, status = out.partition(' ')
        if commit == head and status == 'built':
            return True
        if commit == head and status == 'errored':
            print(name, 'Pages build failed')
            return False
        time.sleep(20)
    print(name, 'Pages build did not finish in 30 minutes')
    return False


def served(url):
    for attempt in range(3):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, method='HEAD'), timeout=30) as r:
                return r.status == 200
        except Exception:
            time.sleep(2 * (attempt + 1))
    return False


def check(all_files):
    urls = [f'{SITE}{name}/{rel}' for name, files in all_files.items() for rel in files]
    with concurrent.futures.ThreadPoolExecutor(24) as pool:
        missing = [u for u, ok in zip(urls, pool.map(served, urls)) if not ok]
    print(f'served: {len(urls) - len(missing)} of {len(urls)}')
    for u in missing[:20]:
        print('  missing', u)
    return not missing


if __name__ == '__main__':
    files = recordings()
    if '--check' not in sys.argv:
        dry = '--dry-run' in sys.argv
        pushed = [name for name in files if sync(name, files[name], dry)]
        if dry:
            sys.exit(0)
        for name in pushed:
            print(name, 'waiting for the site to update...')
            if not wait_for_pages(name):
                sys.exit(1)
    sys.exit(0 if check(files) else 1)
