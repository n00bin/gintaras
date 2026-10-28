"""Problem reports: list the open ones, or mark some as fixed.

Usage (from G:\\ai_projects\\gintaras):
    python tools/reports.py list
    python tools/reports.py fixed 4 5

It drives the Supabase SQL editor in the Chrome window started with --remote-debugging-port=9333
(already signed in to Supabase). The only change it can make is setting status = 'fixed' on reports
that are still open; report ids must be whole numbers, so nothing else can be slipped into the query.
"""
import sys
from playwright.sync_api import sync_playwright

EDITOR = 'https://supabase.com/dashboard/project/jwafxaaaadojafquvhrw/sql/new'


def query(args):
    if args[:1] == ['list'] and len(args) == 1:
        return ("select id, created_at::date as day, reason, note, context->>'lt' as word, context->>'en' as meaning "
                "from public.gintaras_reports where status = 'open' order by id;")
    if args[:1] == ['fixed'] and len(args) > 1 and all(a.isdigit() for a in args[1:]):
        ids = ', '.join(str(int(a)) for a in args[1:])
        return (f"update public.gintaras_reports set status = 'fixed' where status = 'open' and id in ({ids}) "
                "returning id, status;")
    sys.exit(__doc__)


def run(sql):
    with sync_playwright() as p:
        b = p.chromium.connect_over_cdp('http://127.0.0.1:9333')
        ctx = b.contexts[0]
        pages = [x for x in ctx.pages if 'supabase.com/dashboard' in x.url]
        page = pages[-1] if pages else ctx.new_page()
        page.goto(EDITOR)
        page.wait_for_load_state('networkidle')
        page.wait_for_timeout(4000)
        for t in ['Understood', 'Dismiss']:
            d = page.get_by_role('button', name=t)
            if d.count() and d.first.is_visible():
                d.first.click()
                page.wait_for_timeout(500)
        ed = page.locator('.monaco-editor').first
        ed.click()
        page.keyboard.press('Control+A')
        page.keyboard.press('Delete')
        page.keyboard.insert_text(sql)
        page.wait_for_timeout(800)
        page.keyboard.press('Control+Enter')
        page.wait_for_timeout(3000)
        # Supabase asks before running anything that writes; this tool only writes report status.
        for name in ['Run this query', 'Run query']:
            c = page.get_by_role('button', name=name)
            if c.count() > (1 if name == 'Run query' else 0):
                c.last.click()
                page.wait_for_timeout(4000)
        print(page.inner_text('body').split('Results')[-1][:1500].replace('\n', ' | '))


if __name__ == '__main__':
    run(query(sys.argv[1:]))
