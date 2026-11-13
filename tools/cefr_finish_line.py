"""Measure the Lithuanian course against the full-CEFR finish line (docs/cefr/LITHUANIAN-FINISH-LINE.md).

Loads the real app (preview mode) in a headless browser, so every content file loads in its proper order, then counts
per CEFR level: words, reading texts and their lengths, recordings and their durations, conversations, writing and
speaking tasks, and which grammar points are taught. It prints what is missing and saves the numbers into
docs/cefr/lithuanian-finish-line.json under "measured".

Run: python tools/cefr_finish_line.py            (read-only apart from the "measured" block of the tracker)
Live-course units and grammar points are assigned to levels in the tracker's "live_units" and "grammar" blocks.
"""
import http.server, json, re, threading
import sys
sys.stdout.reconfigure(encoding='utf-8')
from functools import partial
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
TRACK = ROOT / 'docs' / 'cefr' / 'lithuanian-finish-line.json'
LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']
TARGET = {  # from LITHUANIAN-FINISH-LINE.md
    'lemmas_total': dict(zip(LEVELS, [700, 1500, 2750, 4500, 6500, 8500])),
    'reading': dict(zip(LEVELS, [20, 25, 30, 30, 30, 30])),
    'reading_words': dict(zip(LEVELS, [(30, 150), (120, 300), (250, 600), (500, 1000), (800, 1500), (1200, 2500)])),
    'listening': dict(zip(LEVELS, [20, 25, 30, 30, 30, 30])),
    'listening_seconds': dict(zip(LEVELS, [(10, 60), (40, 120), (60, 240), (120, 360), (240, 600), (360, 900)])),
    'conversations': dict(zip(LEVELS, [15, 20, 20, 20, 15, 15])),
    'writing': dict(zip(LEVELS, [8, 12, 15, 15, 15, 15])),
    'speaking': dict(zip(LEVELS, [8, 12, 15, 15, 15, 15])),
}

COLLECT = r"""
() => {
  const band = id => (String(id).match(/^(A1|A2|B1|B2|C1|C2)/) || [])[1] || null;
  const words = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;
  const audio = Object.assign({}, window.WordamiSkillsAudio || {}, window.WordamiListeningTransferAudio || {},
    window.WordamiInteractionPracticeAudio || {}, window.WordamiCapstoneAudio || {});
  const dur = Object.fromEntries(Object.entries(audio).filter(([k, v]) => k.startsWith('lt.') && v && v.duration).map(([k, v]) => [k, v.duration]));
  const out = {reading: [], listening: [], conversations: [], writing: [], speaking: [], vocab: {}, live: {}};
  const S = window.WordamiSkillsContent;
  for (const u of (S && S.units) || []) {
    const b = band(u.id); if (!b) continue;
    if (u.reading) out.reading.push({level: b, id: u.id + ':reading', words: words(u.reading)});
    for (const [i, r] of (u.extraRead || []).entries()) out.reading.push({level: b, id: u.id + ':extra-' + i, words: words(Array.isArray(r) ? r[0] : (r && (r.text || r.lt)) || r)});
    if (u.listen) out.listening.push({level: b, id: u.id + ':listen', seconds: dur['lt.' + u.id + '.listen'] || words(u.listen) / 2.2});
    if ((u.turns || []).length) out.conversations.push({level: b, id: u.id + ':turns', turns: u.turns.length});
    for (const p of (u.writing && u.writing.projects) || []) out.writing.push({level: b, id: u.id + ':' + (p.id || p.title || 'project')});
    for (const [i] of (u.production || []).entries()) out.speaking.push({level: b, id: u.id + ':production-' + i});
  }
  const T = window.WordamiTransferContent;
  for (const [id, u] of Object.entries((T && T.units) || {})) { const b = band(id); if (!b) continue;
    for (const v of u.variants || []) out.reading.push({level: b, id: id + ':transfer-' + (v.id || ''), words: words(v.text || v.document || (v.lines || []).join(' '))}); }
  const L = window.WordamiListeningTransferContent;
  for (const [id, u] of Object.entries((L && L.units) || {})) { const b = band(id); if (!b) continue;
    for (const v of u.variants || []) { const key = Object.keys(dur).find(k => k.includes(id) && v.id && k.includes(v.id));
      out.listening.push({level: b, id: id + ':listening-transfer-' + (v.id || ''), seconds: key ? dur[key] : words(v.text || v.transcript) / 2.2}); } }
  const E = window.WordamiExtendedReadingContent;
  for (const [id, u] of Object.entries((E && E.units) || {})) { const b = band(id); if (!b) continue;
    const text = (u.parts || u.sections || []).map(p => p.text || p.lt || (Array.isArray(p) ? p[0] : '')).join(' ') || u.text || '';
    out.reading.push({level: b, id: id + ':extended', words: words(text)}); }
  const I = window.WordamiInteractionPracticeContent;
  for (const [id, u] of Object.entries((I && I.units) || {})) { const b = band(id); if (b) out.conversations.push({level: b, id: id + ':interaction'}); }
  const W = window.WordamiWrittenInteractionContent;
  for (const [id, u] of Object.entries((W && W.units) || {})) { const b = band(id); if (b) out.writing.push({level: b, id: id + ':written-exchange'}); }
  for (const [id, list] of Object.entries((window.WordamiVocabularyContent && window.WordamiVocabularyContent.units) || {})) {
    const b = band(id); if (b) out.vocab[b] = (out.vocab[b] || 0) + list.length; }
  const G = window.WordamiGradedContent, GA = window.WordamiGradedAudio || {};
  for (const it of (G && G.items) || []) {
    const text = it.lines.map(l => l[1]).join(' ');
    // reading length is counted on the English translation (see LITHUANIAN-FINISH-LINE.md)
    if (it.kind === 'write') { out.writing.push({level: it.level, id: it.id}); continue; }
    if (it.kind === 'speak') { out.speaking.push({level: it.level, id: it.id}); continue; }
    if (it.kind === 'read') out.reading.push({level: it.level, id: it.id, words: words(it.lines.map(l => l[2]).join(' '))});
    else out.listening.push({level: it.level, id: it.id, seconds: (GA[it.id] && GA[it.id].duration) || words(text) / 2.2});
  }
  // the live course: cards and conversations per unit, so the tracker can assign units to levels
  for (const u of COURSE) {
    const items = ITEMS.filter(i => i.unit === u);
    const forms = new Set(); for (const i of items) for (const w of (i.lt0 || i.lt).toLowerCase().replace(/[^a-ząčęėįšųūž ]/g, ' ').split(/\s+/)) if (w) forms.add(w);
    out.live[u.id] = {title: u.en, cards: items.length, forms: [...forms]};
  }
  out.path = PATH.filter(x => typeof x === 'string');
  return out;
}"""


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


def main():
    track = json.loads(TRACK.read_text(encoding='utf8'))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    with sync_playwright() as p:
        b = p.chromium.launch(channel='chrome', headless=True); pg = b.new_page()
        pg.add_init_script("localStorage.setItem('gintaras.preview','1');localStorage.setItem('gintaras.lang','lt');")
        pg.goto(f'http://127.0.0.1:{srv.server_port}/?preview=1'); pg.wait_for_function('window.gintarasReady'); pg.wait_for_timeout(1500)
        d = pg.evaluate(COLLECT); b.close()
    live_units = track.get('live_units', {})  # level -> [unit ids]
    unit_level = {u: lv for lv, us in live_units.items() for u in us}
    unassigned = [u for u in d['live'] if u not in unit_level]
    conv_level, cur = {}, 'A1'  # a live conversation belongs to the level of the unit before it on the path
    for step in d['path']:
        if step in unit_level: cur = unit_level[step]
        elif step not in d['live']: conv_level.setdefault(cur, []).append({'id': step})
    grammar = track.get('grammar', {})  # level -> {point: [where taught]} ; empty list = not taught yet
    measured, lines, total_forms = {}, [], set()
    for lv in LEVELS:
        forms = set()
        for u in live_units.get(lv, []): forms.update(d['live'].get(u, {}).get('forms', []))
        total_forms |= forms
        lo, hi = TARGET['reading_words'][lv]; slo, shi = TARGET['listening_seconds'][lv]
        reads = [r for r in d['reading'] if r['level'] == lv]; listens = [r for r in d['listening'] if r['level'] == lv]
        read_ok = [r for r in reads if lo <= r['words'] <= hi * 1.2]; listen_ok = [r for r in listens if slo <= r['seconds'] <= shi * 1.2]
        convs = [c for c in d['conversations'] if c['level'] == lv] + conv_level.get(lv, [])
        writing = [w for w in d['writing'] if w['level'] == lv]; speaking = [s for s in d['speaking'] if s['level'] == lv]
        g = grammar.get(lv, {}); g_missing = [k for k, v in g.items() if not v]
        m = {
            'word_forms_running_total': len(total_forms) + sum(d['vocab'].get(x, 0) for x in LEVELS[:LEVELS.index(lv) + 1]),
            'reading_at_length': len(read_ok), 'reading_any_length': len(reads),
            'listening_at_length': len(listen_ok), 'listening_any_length': len(listens),
            'conversations': len(convs), 'writing': len(writing), 'speaking': len(speaking),
            'grammar_points': len(g), 'grammar_missing': g_missing,
        }
        measured[lv] = m
        gaps = []
        if m['word_forms_running_total'] < TARGET['lemmas_total'][lv]: gaps.append(f"words {m['word_forms_running_total']}/{TARGET['lemmas_total'][lv]} (word forms; lemma list pending)")
        if m['reading_at_length'] < TARGET['reading'][lv]: gaps.append(f"reading at {lo}-{hi} words {m['reading_at_length']}/{TARGET['reading'][lv]} (any length: {m['reading_any_length']})")
        if m['listening_at_length'] < TARGET['listening'][lv]: gaps.append(f"listening at {slo}-{shi}s {m['listening_at_length']}/{TARGET['listening'][lv]} (any length: {m['listening_any_length']})")
        for k in ['conversations', 'writing', 'speaking']:
            if m[k] < TARGET[k][lv]: gaps.append(f"{k} {m[k]}/{TARGET[k][lv]}")
        if not g: gaps.append('grammar checklist not tagged yet')
        elif g_missing: gaps.append(f"grammar missing {len(g_missing)}/{len(g)}: " + ', '.join(g_missing))
        lines.append(f"{lv}: " + ('MET on every measure' if not gaps else '; '.join(gaps)))
    track['measured'] = {'levels': measured, 'unassigned_live_units': unassigned}
    TRACK.write_text(json.dumps(track, indent=1, ensure_ascii=False) + '\n', encoding='utf8')
    print('\n'.join(lines))
    if unassigned: print('Live units not yet assigned to a level:', ', '.join(unassigned))


if __name__ == '__main__':
    main()
