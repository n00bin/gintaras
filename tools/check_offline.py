"""Offline that never stops learning, played for real.

A brand-new learner does lesson 1 online. The app then saves its "ready window" by itself. The server is switched off
and the browser goes offline, and the learner keeps going: the rest of the first unit, the conversation after it
(Say it, out loud), the whole next unit and its conversation, a review of due words, every game, About me, the
pronunciation guide and Quick chat. Then the app is reloaded offline, closed and opened again, and finally goes back
online.

It FAILS when, offline:
- a recording plays that isn't saved on the device (a silent card, or the phone's own voice standing in);
- a listening card (listen, dictate, hear) is drawn although its recording isn't saved;
- a picture can't be shown (its emoji stands in, so it isn't blank, but inside the ready window it should be saved);
- a conversation waits on "Listen first" for a line it can't play, or anything gets stuck;
- the page throws, the app doesn't open offline, or progress made offline is lost when it merges with an older copy.

Needs Python with Playwright and Chrome:  python tools/check_offline.py   (about three minutes)
"""
import http.server, os, socketserver, sys, threading, re
from functools import partial
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def serve(port=0):
    srv = Server(('127.0.0.1', port), partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


srv = serve()
PORT = srv.server_address[1]
URL = 'http://127.0.0.1:%d/' % PORT

# the card answering, from the teach-before-test check
src = open(os.path.join(HERE, 'check_cards.py'), encoding='utf8').read()
ANSWER = re.search(r'ANSWER = r"""(.*?)"""', src, re.S).group(1)
NEXT = re.search(r'NEXT = r"""(.*?)"""', src, re.S).group(1)
FAST_AUTO = "()=>{AUTO_LOCK=150;if(!window.__an){window.__an=autoNext;window.autoNext=ms=>__an(40);}}"
# cloud.js keeps its merge private: the same function, for the merge check
CLOUD = open(os.path.join(ROOT, 'cloud.js'), encoding='utf8').read()
MERGE = CLOUD[CLOUD.index('function mergeState('):CLOUD.index('/* ---------- cloud save')]

# every recording the app plays, and every time it falls back to the phone's own voice
SPY = r"""()=>{if(window.__spy)return;window.__spy=1;window.__said=[];window.__tts=[];
  const s0=say;window.say=function(item,slow,voice){try{if(item&&S.sound)__said.push({id:item.au||item.id,lt:item.lt,url:audioAt(item.au||item.id,voice),on:navigator.onLine,where:Q?Q.mode+' '+((Q.queue[Q.idx]||{}).type||''):CV?'conv '+CV.c.id+' '+CV.mode:'game'});}catch(e){}return s0.apply(this,arguments);};
  const t0=speak;window.speak=function(text){if(!navigator.onLine)__tts.push(text);return t0.apply(this,arguments);};
  const ct=convTurn;window.convTurn=function(ln){window.__ln=ln;return ct.apply(this,arguments);};}"""

fails = []
notes = []


def bad(msg):
    fails.append(msg)
    print('  FAIL', msg)


def note(msg):
    notes.append(msg)
    print('  ', msg)


def pics_ok(pg, label):
    """every picture on screen loaded from the device (an emoji standing in counts as a miss)"""
    pg.wait_for_timeout(200)
    miss = pg.evaluate("()=>[...document.querySelectorAll('#stage .picbox,.fall .picbox')].filter(b=>!b.classList.contains('ok')&&!b.querySelector('img')).map(b=>b.textContent)")
    for m in miss:
        bad('%s: a picture is not saved (%s shows instead)' % (label, m))


def play(pg, label):
    """Plays the lesson or review on screen to the end, answering right; listening cards must have their recording."""
    s = pg.evaluate
    last = None; same = 0; cards = 0
    while True:
        st = s("()=>Q?{idx:Q.idx,len:Q.queue.length}:null")
        if not st or st['idx'] >= st['len']:
            break
        key = (st['idx'], st['len'])
        same = same + 1 if key == last else 0
        last = key
        if same > 0 and s("()=>!!(Q&&Q.lockedTo>Date.now())"):
            same -= 1; pg.wait_for_timeout(60); continue
        if same > 10:
            bad('%s: stuck on card %s (%s)' % (label, st['idx'], s("Q.queue[Q.idx].type")))
            s("()=>{Q.idx++;renderStep();}"); continue
        if same == 0:
            e = s("""()=>{const e=Q.queue[Q.idx];if(!e)return null;const it=e.item||e.line;
              return {type:e.type,lt:it&&(it.lt||''),url:it?audioAt(it.au||it.id,e.line?castVoice(e.line.conv.cast[e.line.who]||e.line.conv.cast[0]):undefined):''};}""")
            if e is None:
                break
            cards += 1
            if e['type'] in ('listen', 'dictate', 'hear') and not s("navigator.onLine"):
                if not s("u=>caches.match(u).then(r=>!!r)", e['url']):
                    bad('%s: a %s card for "%s" was drawn offline without its recording' % (label, e['type'], e['lt']))
            pics_ok(pg, '%s, %s card "%s"' % (label, e['type'], e['lt']))
            s(ANSWER, False)
            pg.wait_for_timeout(120)
            s("()=>{const b=$('#btn-check');if(b&&!b.hidden&&!b.disabled)b.click();}")
        else:
            s(NEXT)
        pg.wait_for_timeout(40)
    s("()=>{document.querySelectorAll('.gate,.league-pop,.levelup').forEach(x=>x.remove());if(Q)quit();document.querySelectorAll('.league-pop,.gate,.levelup').forEach(x=>x.remove());}")
    return cards


def conversation(pg, cid, label):
    """Say it (out loud, written first as the microphone is off): every line they say must play from the device."""
    s = pg.evaluate
    s("id=>{S.convs=S.convs||{};S.convs[id]=Object.assign({},S.convs[id],{done:today(),text:today()});save();startConv(id,'speak');}", cid)
    t = 0; waited = 0; last = None
    while t < 900:
        t += 1
        pg.wait_for_timeout(100)
        st = s("""()=>{if(!CV)return {end:true};const b=$('#btn-check'),sin=$('#sin'),cin=$('#cin'),o=[...document.querySelectorAll('#turn .opt')].filter(x=>!x.disabled&&x.offsetParent);
          return {i:CV.i,btn:b.textContent,dis:b.disabled,sin:!!(sin&&sin.offsetParent&&!sin.disabled&&!sin.value),cin:!!(cin&&cin.offsetParent&&!cin.disabled&&!cin.value),opts:o.length,fin:!!document.querySelector('#stage .fin, #stage .tiles')&&!document.querySelector('#turn .turn')};}""")
        if st.get('end'):
            break
        if st['dis'] and st['btn'] == 'Listen first':
            waited += 1
            if waited > 150:  # 15 s: a few of their lines can play back to back
                bad('%s: stuck on "Listen first" (line %s)' % (label, st['i'])); break
            continue
        waited = 0
        if st['sin'] or st['cin']:
            s("""()=>{const x=$('#sin')&&$('#sin').offsetParent?$('#sin'):$('#cin');x.value=__ln.lt;x.dispatchEvent(new Event('input',{bubbles:true}));const b=$('#btn-check');b.disabled=false;b.click();}""")
            continue
        if st['opts']:
            s("()=>{const o=[...document.querySelectorAll('#turn .opt')].filter(x=>!x.disabled&&x.offsetParent);o[0].click();const b=$('#btn-check');if(b&&!b.disabled&&/check/i.test(b.textContent))b.click();}")
            continue
        if not st['dis']:
            key = (st['i'], st['btn'])
            s("()=>{const b=$('#btn-check');b.click();}")
            if key == last and st['btn'] not in ('I said it', 'Check'):
                pass
            last = key
            continue
    else:
        bad('%s: the conversation never finished' % label)
    done = s("id=>!!((S.convs||{})[id]||{}).speak", cid)
    if not done:
        bad('%s: Say it was not recorded as done' % label)
    s("()=>{if(CV)quit();document.querySelectorAll('.league-pop,.gate,.levelup').forEach(x=>x.remove());}")


def check_said(pg, label):
    """every recording played offline is saved on the device; the phone's own voice never stood in"""
    s = pg.evaluate
    res = s("""async()=>{const out=[];for(const x of __said){if(x.on)continue;if(!x.url||!(await caches.match(x.url)))out.push(x.where+': '+x.lt);}__said=[];const t=__tts.slice();__tts=[];return {miss:out,tts:t};}""")
    for m in res['miss']:
        bad('%s: played without a saved recording: %s' % (label, m))
    for m in res['tts']:
        bad('%s: the phone\'s own voice stood in for "%s"' % (label, m))


def boot(pg):
    pg.wait_for_function("typeof Q!=='undefined'&&typeof S!=='undefined'&&typeof prefetchReady==='function'")
    pg.wait_for_timeout(600)
    s = pg.evaluate
    s("()=>{window.signInGate=()=>{};window.maybeTour=()=>{};window.openSignin=()=>{};}")
    s(FAST_AUTO); s(SPY)


with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    ctx = b.new_context(viewport={'width': 1100, 'height': 900})
    pg = ctx.new_page()
    errs = []
    hook = lambda e: errs.append(str(e))
    pg.on('pageerror', hook)
    s = pg.evaluate
    pg.goto(URL); pg.wait_for_timeout(800)
    s("()=>navigator.serviceWorker.ready")
    # a brand-new learner, sound on, microphone off (it writes its replies)
    s("()=>{window.save=window.saveSoon=()=>{};window.onbeforeunload=null;Q=null;localStorage.clear();}")
    pg.reload(); pg.wait_for_timeout(1000)
    s("()=>{S.welcomed=true;S.signinAsked='x';S.toured=true;S.meAsked=1;S.sound=true;S.selfRate=true;S.noRecDay=today();S.me={name:'Tomas',g:'m',at:1};S.iosNudge='x';save();}")
    pg.reload(); boot(pg)
    if not s("!!navigator.serviceWorker.controller"):
        bad('the service worker is not running')
    print('Online: lesson 1')
    first = s("STEPS.filter(id=>UNIT_BY[id])[0]")
    s("()=>{personalise();const l=COURSE[0].lessons[0];startLesson(l);}")
    pg.wait_for_timeout(300)
    play(pg, 'online lesson 1')
    s("()=>{S.lessonsDone=Math.max(1,S.lessonsDone||0);save();window.dispatchEvent(new Event('gintaras:idle'));}")
    # the ready window saves itself
    for k in range(240):
        pg.wait_for_timeout(500)
        st = s("()=>({pf:!!pf,have:HAVE.size,need:readyPlan().files.filter(f=>!HAVE.has(f)).length,total:readyPlan().files.length})")
        if not st['pf'] and st['need'] == 0 and k > 4:
            break
    else:
        bad('the ready window did not finish saving (%s)' % st)
    w = s("""()=>{const fs=readyPlan().files;return {n:fs.length,mp3:fs.filter(f=>f.includes('.mp3')).length,mb:(fs.reduce((n,f)=>n+fileBytes(f),0)/1e6).toFixed(1),
      steps:readyPlan().steps.map(x=>x.u?x.u.id:x.c.id).join(' '),line:document.querySelector('#offready').innerText}}""")
    note('ready window: %s files (%s recordings), about %s MB, steps %s' % (w['n'], w['mp3'], w['mb'], w['steps']))
    note('Learn says: %s' % w['line'])
    if not w['line'].startswith('✓ Ready offline'):
        bad('the Learn screen does not say it is ready offline: %r' % w['line'])
    real = s("""async()=>{let n=0;for(const f of readyPlan().files){const r=await caches.match(f);if(r)n+=(await r.clone().arrayBuffer()).byteLength;}return (n/1e6).toFixed(1);}""")
    note('saved on the device: %s MB (estimated %s MB)' % (real, w['mb']))
    older = s("JSON.stringify(S)")

    # ---------- offline ----------
    print('Offline: the server is off and the browser has no signal')
    srv.shutdown(); srv.server_close()
    ctx.set_offline(True)
    pg.wait_for_timeout(500)
    if s("navigator.onLine"):
        bad('the browser still says it is online')
    if s("$('#offbar').hidden"):
        bad('no offline banner on Learn')
    else:
        note('banner: ' + s("$('#offbar').innerText"))
    steps = s("readyPlan().steps.map(x=>x.u?x.u.id:x.c.id)")
    # the rest of the first unit, the conversation after it, the next unit and its conversation
    path = s("()=>{const out=[];let units=0;for(const id of STEPS){if(UNIT_BY[id]){if(++units>2)break;}out.push(id);}return out;}")
    for sid in path:
        if s("id=>!!UNIT_BY[id]", sid):
            for lid in s("id=>UNIT_BY[id].lessons.filter(l=>crowns(l.id)<1).map(l=>l.id)", sid):
                s("id=>{personalise();startLesson(LESSON_BY[id]);}", lid)
                pg.wait_for_timeout(200)
                if not s("!!Q"):
                    s("()=>{const r=[...document.querySelectorAll('.gate .btn,.sheet:not([hidden]) .btn')].find(b=>/learn|lesson|new/i.test(b.textContent));if(r)r.click();}")
                    pg.wait_for_timeout(200)
                if not s("!!Q"):
                    bad('lesson %s did not start offline' % lid); continue
                n = play(pg, 'offline lesson ' + lid)
                check_said(pg, 'offline lesson ' + lid)
                print('  lesson %s: %d cards' % (lid, n))
        else:
            if not s("id=>stepUnlocked(id)", sid):
                s("id=>{const u=STEPS[STEPS.indexOf(id)-1];if(UNIT_BY[u])UNIT_BY[u].lessons.forEach(l=>{S.lessons[l.id]=Math.max(1,S.lessons[l.id]||0);});}", sid)
            conversation(pg, sid, 'offline conversation ' + sid)
            check_said(pg, 'offline conversation ' + sid)
            print('  conversation %s (Say it): done' % sid)
    # a review of due words
    s("()=>{practised().forEach(i=>{const r=rec(i.id);r.due=Date.now()-1;r.prodD=null;r.dD=null;r.okD=null;r.recD=null;});S.drillDay=null;S.reviewDay=null;save();}")
    s("()=>startReview(false)"); pg.wait_for_timeout(200)
    if s("!!Q"):
        n = play(pg, 'offline review'); check_said(pg, 'offline review'); print('  review: %d cards' % n)
    else:
        bad('the review did not start offline')
    # the games
    for g, fn in (('Ear catcher', 'startEar'), ('Speed match', 'startSpeed'), ('Falling words', 'startFall')):
        s("f=>window[f]()", fn); pg.wait_for_timeout(700)
        if not s("!!document.querySelector('.fall')"):
            bad('%s did not open offline' % g); continue
        if fn == 'startEar':
            for k in range(10):
                pg.wait_for_timeout(250)
                if not s("!!document.querySelector('.fall .opt:not([disabled])')"): break
                s("()=>{const o=document.querySelector('.fall .opt:not([disabled])');if(o)o.click();}")
                pg.wait_for_timeout(1700)
        else:
            pg.wait_for_timeout(1500)
        pics_ok(pg, g)
        s("()=>{const x=document.querySelector('.fall #g-x,.fall #fall-x');if(x)x.click();}"); pg.wait_for_timeout(400)
        s("()=>{const d=document.querySelector('.fall #g-done,.fall .fall-res .btn.ghost');if(d)d.click();}"); pg.wait_for_timeout(200)
        if s("!!document.querySelector('.fall')"):
            bad('%s did not close' % g)
        check_said(pg, g)
        print('  %s: played' % g)
    # About me
    s("()=>startMe()"); pg.wait_for_timeout(300)
    if s("!!Q"):
        n = play(pg, 'offline About me'); check_said(pg, 'offline About me'); print('  About me: %d cards' % n)
    else:
        bad('About me did not start offline')
    # the pronunciation guide
    s("()=>openGuide()"); pg.wait_for_timeout(200)
    if s("$('#guide').hidden||!$('#guide-body').innerText.trim()"):
        bad('the pronunciation guide is empty offline')
    s("()=>{$('#guide').hidden=true;document.body.style.overflow='';}")
    print('  pronunciation guide: shown')
    # Quick chat
    # the replies from the conversations above, known well enough that what they say is audio only
    s("()=>{S.repliesSeeded=0;seedReplies();Object.values(S.replies).forEach(r=>{r.lvl=4;r.due=Date.now()-1;});save();startQuick(true);}"); pg.wait_for_timeout(500)
    if s("!!(CV&&CV.quick)"):
        for k in range(400):
            pg.wait_for_timeout(100)
            st = s("()=>{if(!CV)return 'end';const cin=$('#cin'),sin=$('#sin');if(cin&&cin.offsetParent&&!cin.value||sin&&sin.offsetParent&&!sin.value)return 'type';const o=document.querySelector('#turn .opt:not([disabled])');if(o)return 'opt';const b=$('#btn-check');return b.disabled?'wait':'btn';}")
            if st == 'end': break
            if st == 'type':
                s("()=>{const x=$('#cin')&&$('#cin').offsetParent?$('#cin'):$('#sin');x.value=__ln.lt;x.dispatchEvent(new Event('input',{bubbles:true}));const b=$('#btn-check');b.disabled=false;b.click();}")
            elif st == 'opt':
                s("()=>document.querySelector('#turn .opt:not([disabled])').click()")
            elif st == 'btn':
                s("()=>$('#btn-check').click()")
        s("()=>{if(CV)quit();document.querySelectorAll('.league-pop,.gate,.levelup').forEach(x=>x.remove());}")
        check_said(pg, 'offline Quick chat'); print('  Quick chat: played')
    else:
        note('Quick chat had no replies ready (fine for a learner this new)')
    done_off = s("()=>({lessons:Object.keys(S.lessons).filter(k=>S.lessons[k]>=1).length,xp:S.xp,convs:Object.keys(S.convs||{}).length,items:Object.keys(S.items).length})")

    # reload offline, then close and open again
    print('Offline: reload, then close and open again')
    pg.reload()
    try:
        boot(pg)
    except Exception as e:
        bad('the app did not open on reload offline: %s' % e)
    after = s("()=>({lessons:Object.keys(S.lessons).filter(k=>S.lessons[k]>=1).length,xp:S.xp})")
    note('after reload: %s (before: %s)' % (after, done_off))
    pg.close()
    pg = ctx.new_page(); pg.on('pageerror', hook); s = pg.evaluate
    try:
        pg.goto(URL); boot(pg)
        note('opened again offline: Learn says %r' % s("$('#bite-title').innerText"))
        if s("$('#offbar').hidden"):
            bad('no offline banner after opening again')
    except Exception as e:
        bad('the app did not open again offline: %s' % str(e)[:200])

    # back online: the copy made offline merges with the older one and loses nothing
    print('Back online')
    srv = serve(PORT); ctx.set_offline(False); pg.wait_for_timeout(800)
    if not s("navigator.onLine"):
        bad('the browser did not come back online')
    m = s("""([older,code])=>{eval(code.replace('function mergeState(','window.__merge=function('));const a=JSON.parse(JSON.stringify(S)),o=JSON.parse(older);
      const m1=__merge(a,o),m2=__merge(o,a);const lost=[];
      for(const m of [m1,m2]){Object.keys(a.lessons).forEach(k=>{if((m.lessons[k]||0)<a.lessons[k])lost.push('lesson '+k);});if(m.xp<a.xp)lost.push('xp');
        Object.keys(a.items).forEach(k=>{const x=a.items[k],y=m.items[k];if(!y)lost.push('word '+k);else if(x.fs&&y.fs&&x.fs.t>((o.items[k]||{}).fs||{}).t&&(y.due!==x.due||y.lvl!==x.lvl))lost.push('schedule '+k);});}
      return lost;}""", [older, MERGE])
    for x in m[:10]:
        bad('merging the offline progress with the older copy lost: %s' % x)
    if not m:
        note('the offline progress merges with the older copy, nothing lost, newer reviews set the schedule')
    for e in errs:
        bad('page error: ' + e[:200])
    b.close()
srv.shutdown()
print('check_offline:', 'FAILED, %d problem%s' % (len(fails), '' if len(fails) == 1 else 's') if fails else 'learning carries on offline')
sys.exit(1 if fails else 0)
