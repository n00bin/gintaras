"""Teach before test, played for real.

Plays the course in the app itself, the way a brand-new learner does: every lesson in path order, with the app's own
lesson builder (warm-ups, sentence cards, picks, tiles, cards that come back after a miss, a reload part way), a review
after each unit, and then again from a "Check my level" start where half of the first unit was missed.

It FAILS when a card shows a Lithuanian word (the word asked, a sentence, a choice, a tile, a match pair) before that
word's New word card, when a card is drawn blank, or when the page throws.

Needs Python with Playwright and Chrome:  python tools/check_cards.py   (about two minutes)
"""
import http.server, os, socketserver, sys, threading
from functools import partial
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUICK = '--quick' in sys.argv          # the first three units only
PAGE = next((a.split('=',1)[1] for a in sys.argv if a.startswith('--page=')), '')   # another copy of the page, for testing the checker

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

srv = socketserver.TCPServer(('127.0.0.1', 0), partial(Quiet, directory=ROOT))
threading.Thread(target=srv.serve_forever, daemon=True).start()
URL = 'http://127.0.0.1:%d/' % srv.server_address[1]

# in the page: the Lithuanian words on the card as drawn, before you answer
SCAN = r"""()=>{const e=Q&&Q.queue[Q.idx];if(!e)return null;const st=$('#stage');
  const nameish=typeof NAMEISH==='function'?NAMEISH:w=>properNoun(w)||PERS.baseNames.includes(norm(w))||strip(w).startsWith(strip(S.me.name).slice(0,3)),tg=typeof taught==='function'?taught:i=>!!peek(i.id).intro;
  if(!window.__LTW){if(!WORD_ITEMS)wordLvl('');const en=new Set();ITEMS.forEach(i=>norm(i.en||'').split(/[^\p{L}]+/u).forEach(w=>en.add(w)));
    norm(document.body.innerText).split(/[^\p{L}]+/u).forEach(w=>{});window.__LTW=new Set(Object.keys(WORD_ITEMS).filter(w=>!en.has(w)&&/\p{L}/u.test(w)));}
  const c=st.cloneNode(true);c.querySelectorAll('.pron,.why,.note,.eyebrow,.sr-only,[hidden]').forEach(x=>x.remove());
  /* an ending drill's choices are other endings of its answer's own word (duona / duonos for duoną): allowed, as in the app */
  const st3=s=>strip(s),stem=(a,b)=>{a=st3(a);b=st3(b);let n=0;while(n<a.length&&n<b.length&&a[n]===b[n])n++;return n>=3&&a.length-n<=3&&b.length-n<=3;};
  const ansW=e.drill?norm(e.drill.ans).split(' '):[];
  const words=norm(c.innerText||'').split(/[^\p{L}]+/u).filter(w=>window.__LTW.has(w)&&!nameish(w)&&!(e.type==='frame'&&ansW.some(a=>stem(a,w))));
  return {type:e.type,id:e.item&&e.item.id,lt:e.item&&e.item.lt,drill:e.drill&&e.drill.frame,blank:!STEPLESS[e.type]&&!(st.innerText||'').trim(),
    words:[...new Set(words)].map(w=>({w,items:(WORD_ITEMS[w]||[]).map(i=>i.id),app:(WORD_ITEMS[w]||[]).filter(tg).map(i=>i.id+':'+JSON.stringify(peek(i.id)))}))};}"""

# in the page: answer the card on screen (right, or "I don't know"); returns what it did
ANSWER = r"""(wrong)=>{const e=Q&&Q.queue[Q.idx];if(!e)return 'none';const st=$('#stage'),btn=$('#btn-check'),idk=$('#btn-idk');
  const vis=b=>b&&!b.hidden&&!b.disabled&&b.offsetParent!==null;
  if(STEPLESS[e.type]){btn.click();return 'step';}
  if(wrong&&vis(idk)){idk.click();return 'idk';}
  const it=e.item,txt=b=>norm((b.querySelector('.ot span')||b).textContent||'');
  const pick=want=>{const o=[...st.querySelectorAll('.opt')].find(b=>txt(b)===norm(want));if(o){o.click();return true;}return false;};
  if(e.type==='mc_en_lt'&&pick(it.lt)||(e.type==='mc_lt_en'||e.type==='listen')&&pick(it.en)||e.type==='frame'&&pick(e.drill.ans)||e.type==='hear'&&pick(e.line.en)){if(vis(btn)&&/check/i.test(btn.textContent))btn.click();return 'pick';}
  if(e.type==='match'){e.items.forEach(i=>{const l=st.querySelector('.opt[data-side="l"][data-id="'+i.id+'"]'),r=st.querySelector('.opt[data-side="r"][data-id="'+i.id+'"]');if(l&&r){l.click();r.click();}});return 'match';}
  if(e.type==='gaps'){const bs=[...st.querySelectorAll('.lb')];if(bs.length&&vis(idk)){idk.click();return 'idk';}}
  if(/^(type|speak|dictate|build|tiles|cloze)$/.test(e.type)){const a=e.type==='cloze'?e.word:it.lt;const inp=$('#ans');if(inp&&!inp.readOnly){inp.value=a;inp.dispatchEvent(new Event('input',{bubbles:true}));}
    Q.answer=e.type==='build'||e.type==='tiles'?a.replace(/[?!.,]/g,'').toLowerCase():a;if(btn.disabled)btn.disabled=false;btn.click();return 'typed';}
  if(vis(idk)){idk.click();return 'idk';}
  return 'stuck';}"""

# in the page: get past whatever is showing after an answer (Continue, a self-rating, a speaking link)
NEXT = r"""()=>{const btn=$('#btn-check'),st=$('#stage');const r=st.querySelector('[data-rate="3"],[data-rate="good"],[data-rate]:last-of-type');
  if(r&&!r.hidden&&r.offsetParent!==null){r.click();return 'rate';}
  const sh=st.querySelector('#showme,#reveal,.showme');if(sh&&sh.offsetParent!==null){sh.click();return 'show';}
  if(btn&&!btn.hidden&&!btn.disabled){btn.click();return 'btn';}return 'wait';}"""

fails = []
seen_types = {}
def bad(msg):
    fails.append(msg); print('  FAIL', msg)

def play(pg, label, taught, wrong_every=4, reload_at=None):
    """Plays the session on screen to the end. taught: ids whose New word card has been shown (kept across sessions)."""
    s = pg.evaluate; n = 0; last = None; same = 0; cards = 0
    while True:
        st = s("()=>Q?{idx:Q.idx,len:Q.queue.length}:null")
        if not st or st['idx'] >= st['len']: break
        key = (st['idx'], st['len'])
        same = same + 1 if key == last else 0; last = key
        if same > 8:
            bad('%s: stuck on card %s (%s)' % (label, st['idx'], s("Q.queue[Q.idx].type"))); s("()=>{Q.idx++;renderStep();}"); continue
        if same == 0:
            sc = s(SCAN)
            if sc is None: break
            seen_types[sc['type']] = seen_types.get(sc['type'], 0) + 1
            if sc['type'] == 'intro' and sc['id']: taught.add(sc['id'])
            elif sc['blank']: bad('%s: blank %s card (%s)' % (label, sc['type'], sc['lt'] or sc['drill']))
            elif sc['type'] not in ('tip', 'revtip', 'metip', 'mesay', 'intro'):
                for w in sc['words']:
                    if not any(i in taught for i in w['items']):
                        bad('%s: "%s" shown on a %s card (%s) before its New word card%s' % (label, w['w'], sc['type'], sc['lt'] or sc['drill'], (' [app counts as taught: %s]' % '; '.join(w['app'])[:300]) if w['app'] else ''))
            cards += 1
            if reload_at and cards == reload_at:
                pg.reload(); pg.wait_for_function("typeof Q!=='undefined'&&typeof S!=='undefined'"); pg.wait_for_timeout(1200); s("window.signInGate=()=>{};window.say=()=>{};window.autoNext=()=>{};window.maybeTour=()=>{}")
                if not s("!!Q"): s("resumePlace()")
                pg.wait_for_timeout(200); last = None; continue
            n += 1
            s(ANSWER, n % wrong_every == 0)
        else:
            s(NEXT)
        pg.wait_for_timeout(30)
    s("()=>{if(document.querySelector('.gate'))document.querySelectorAll('.gate,.league-pop').forEach(x=>x.remove());if(Q)quit();document.querySelectorAll('.league-pop,.gate,.levelup').forEach(x=>x.remove());}")

def fresh(pg, name='Bob'):
    s = pg.evaluate
    # nothing is saved on the way out, or the last profile comes back
    s("()=>{window.save=window.saveSoon=()=>{};window.onbeforeunload=null;Q=null;localStorage.clear();}"); pg.reload(); pg.wait_for_timeout(1200)
    if pg.evaluate("Object.keys(S.items).length"): bad('could not start from an empty profile')
    s("()=>{S.welcomed=true;S.signinAsked='x';S.toured=true;S.meAsked=1;S.sound=false;S.selfRate=true;S.noRecDay=today();S.autoNext=false;S.me={name:'%s',g:'m'};save();}" % name)
    pg.reload(); pg.wait_for_timeout(1200)
    s("window.signInGate=()=>{};window.say=()=>{};window.autoNext=()=>{};window.maybeTour=()=>{}")

def course(pg, taught, units, tag):
    s = pg.evaluate
    lessons = s("""u=>COURSE.filter(x=>u.includes(x.id)).flatMap(x=>x.lessons.filter(l=>!l.conv).map(l=>l.id))""", units)
    for k, lid in enumerate(lessons):
        s("id=>{personalise();const l=LESSON_BY[id];S.gateDay=today();buildSession(l.items,'lesson',l);openSheet();}", lid)
        pg.wait_for_timeout(100)
        play(pg, '%s lesson %s' % (tag, lid), taught, reload_at=7 if k % 3 == 1 else None)
        if k + 1 == len(lessons) or s("([a,b])=>LESSON_BY[a].unit!==LESSON_BY[b].unit", [lid, lessons[k + 1]]):
            # a review of everything so far, as if it were the next day
            s("()=>{practised().forEach(i=>{const r=rec(i.id);r.due=Date.now()-1;r.prodD=null;r.dD=null;r.okD=null;r.recD=null;});S.drillDay=null;save();}")
            if s("dueNow().length>0"):
                s("()=>{startReview(false);}"); pg.wait_for_timeout(100)
                play(pg, '%s review after %s' % (tag, lid), taught, reload_at=5)

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome'); ctx = b.new_context(viewport={'width': 1100, 'height': 900}); pg = ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.on('console', lambda m: errs.append(m.text) if 'could not be drawn' in m.text else None)
    pg.goto(URL + PAGE); pg.wait_for_timeout(1000)
    units = pg.evaluate("STEPS.filter(id=>UNIT_BY[id]&&!UNIT_BY[id].retire)")
    if QUICK: units = units[:3]
    print('Fresh learner,', len(units), 'units')
    fresh(pg); taught = set()
    course(pg, taught, units, 'fresh')
    # a learner who started with "Check my level" and missed half of the first unit
    print('After Check my level (half of', units[0], 'missed)')
    fresh(pg, 'Mark')
    got = pg.evaluate("""u=>{const its=unitItems(UNIT_BY[u]),got={};its.forEach((i,k)=>{if(k%2===0)got[i.id]=1;});creditUnit(u,got);save();return Object.keys(got);}""", units[0])
    taught = set(got)
    course(pg, taught, units[1:3], 'placed')
    for e in errs: bad('page error: ' + e[:200])
    b.close()
srv.shutdown()
print('cards drawn:', sum(seen_types.values()), ' '.join('%s %d' % kv for kv in sorted(seen_types.items())))
print('check_cards:', 'FAILED, %d problem%s' % (len(fails), '' if len(fails) == 1 else 's') if fails else 'all cards taught before tested')
sys.exit(1 if fails else 0)
