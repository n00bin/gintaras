"""One-shot Supabase setup for Gintaras accounts and the leaderboard.

Creates (or reuses) a Supabase project, runs supabase/schema.sql, sets the sign-in URLs, turns off
email confirmation, and writes the project URL + public key into config.js.

Usage:  python tools/supabase_setup.py            (reads SUPABASE_ACCESS_TOKEN from the environment)
Get a token at https://supabase.com/dashboard/account/tokens. Revoke it afterwards if you like;
the app itself never uses it.
"""
import json, os, secrets, sys, time, urllib.error, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
API = 'https://api.supabase.com/v1'
SITE = 'https://n00bin.github.io/gintaras/'
NAME = 'gintaras'
REGION = os.environ.get('SUPABASE_REGION', 'us-east-1')
TOKEN = os.environ.get('SUPABASE_ACCESS_TOKEN', '').strip()


def call(method, path, body=None):
    req = urllib.request.Request(API + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json',
                                          'User-Agent': 'gintaras-setup'})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read()
            return json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        raise SystemExit(f'{method} {path} failed ({e.code}): {e.read().decode(errors="replace")[:500]}')


def project():
    projects = call('GET', '/projects')
    for p in projects:
        if p['name'] == NAME:
            print(f"Reusing project {p['id']} ({p.get('status')})")
            return p['id']
    orgs = call('GET', '/organizations')
    if not orgs:
        raise SystemExit('No Supabase organization found on this account.')
    org = orgs[0]
    print(f"Creating project '{NAME}' in {org['name']} ({REGION})...")
    p = call('POST', '/projects', {'name': NAME, 'organization_id': org['id'], 'region': REGION,
                                   'db_pass': secrets.token_urlsafe(24)})
    return p['id']


def wait_healthy(ref):
    for _ in range(90):
        status = call('GET', f'/projects/{ref}').get('status')
        if status == 'ACTIVE_HEALTHY':
            return
        print('  waiting, status', status, flush=True)
        time.sleep(10)
    raise SystemExit('Project did not come up in 15 minutes; run this again later.')


def public_key(ref):
    keys = call('GET', f'/projects/{ref}/api-keys')
    by = {k.get('name'): k.get('api_key') for k in keys}
    key = by.get('anon') or next((k['api_key'] for k in keys if k.get('type') == 'publishable'), None)
    if not key:
        raise SystemExit('Could not find the public (anon) key.')
    return key


def main():
    if not TOKEN:
        raise SystemExit('Set SUPABASE_ACCESS_TOKEN first.')
    ref = project()
    wait_healthy(ref)
    sql = open(os.path.join(ROOT, 'supabase', 'schema.sql'), encoding='utf8').read()
    call('POST', f'/projects/{ref}/database/query', {'query': sql})
    print('Database tables and access rules created.')
    call('PATCH', f'/projects/{ref}/config/auth', {'site_url': SITE, 'uri_allow_list': SITE + '**',
                                                    'mailer_autoconfirm': True})
    print('Sign-in configured (no email confirmation needed).')
    url, key = f'https://{ref}.supabase.co', public_key(ref)
    cfg = os.path.join(ROOT, 'config.js')
    open(cfg, 'w', encoding='utf8', newline='\n').write(
        '// Supabase project for accounts and the leaderboard. Written by tools/supabase_setup.py.\n'
        '// The anon key is safe to publish: it only allows what the database policies allow.\n'
        'window.GINTARAS_CONFIG = {\n'
        f'  SUPABASE_URL: "{url}",\n'
        f'  SUPABASE_ANON_KEY: "{key}",\n'
        '};\n')
    print('config.js updated:', url)


if __name__ == '__main__':
    main()
