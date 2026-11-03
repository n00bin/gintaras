"""Offline, at the edges: what the offline judge (round 9) found, checked for real.

- A learner finishes lesson 1 and closes the app on the finish screen (no Continue): the next units still save.
- Offline, a lesson beyond what is saved: no word is read by a voice of the wrong language, the New word card says
  its sound downloads next time, and the speaker looks switched off.
- The status line is about sound: a picture that isn't saved (or that the server doesn't have) never makes it say
  "reading and typing" while the sound is there; offline it says how far you are ready.
- On a phone-sized screen the header fits when the Offline sign shows.
- Offline: sign-in buttons are switched off, the report dialog says it sends later, the whole-course download says
  to connect first. After the whole course is saved, Settings says so.
- The fonts are saved when the app installs, and the review intro's count matches Practice.

Needs Python with Playwright and Chrome:  python tools/check_offline_edges.py   (about two minutes)
"""
import http.server, os, socketserver, sys, threading, re
from functools import partial
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8')
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HERE = os.path.dirname(os.path.abspath(__file__))


class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass


class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


def serve(port=0):
    srv = Server(('127.0.0.1', port), partial(Quiet, directory=ROOT))
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    return srv


src = open(os.path.join(HERE, 'check_cards.py'), encoding='utf8').read()
ANSWER = re.search(r'ANSWER = r"""(.*?)"""', src, re.S).group(1)
NEXT = re.search(r'NEXT = r"""(.*?)"""', src, re.S).group(1)
FAST_AUTO = "()=>{AUTO_LOCK=150;if(!window.__an){window.__an=autoNext;window.autoNext=ms=>__an(40);}}"
# the phone's own voice, every time it is asked to speak, and with which language
TTS = "()=>{window.__tts=[];const s0=speechSynthesis.speak.bind(speechSynthesis);speechSynthesis.speak=u=>{__tts.push({t:u.text,v:u.voice&&u.voice.lang});};}"

fails = []


def bad(msg):
    fails.append(msg)
    print('  FAIL', msg)


def ok(msg):
    print('  ok', msg)


def play(pg, stop_on_finish=True):
    s = pg.evaluate
    last = None; same = 0
    for _ in range(600):
        st = s("()=>Q?{idx:Q.idx,len:Q.queue.length}:null")
        if not st or st['idx'] >= st['len']:
            break
        key = (st['idx'], st['len'])
        same = same + 1 if key == last else 0
        last = key
        if same > 0 and s("()=>!!(Q&&Q.lockedTo>Date.now())"):
            pg.wait_for_timeout(60); continue
        if same > 10:
            s("()=>{Q.idx++;renderStep();}"); continue
        if same == 0:
            s(ANSWER, False)
            pg.wait_for_timeout(100)
            s("()=>{const b=$('#btn-check');if(b&&!b.hidden&&!b.disabled)b.click();}")
        else:
            s(NEXT)
        pg.wait_for_timeout(40)


def boot(pg):
    pg.wait_for_function("typeof Q!=='undefined'&&typeof S!=='undefined'&&typeof prefetchReady==='function'")
    pg.wait_for_timeout(600)
    pg.evaluate("()=>{window.signInGate=()=>{};window.maybeTour=()=>{};window.openSignin=()=>{};}")
    pg.evaluate(FAST_AUTO)


srv = serve()
PORT = srv.server_address[1]
URL = 'http://127.0.0.1:%d/' % PORT
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome')
    ctx = b.new_context(viewport={'width': 390, 'height': 844}, device_scale_factor=1)
    pg = ctx.new_page()
    errs = []
    pg.on('pageerror', lambda e: errs.append(str(e)))
    s = pg.evaluate
    pg.goto(URL); pg.wait_for_timeout(800)
    s("()=>navigator.serviceWorker.ready")
    s("()=>{window.save=window.saveSoon=()=>{};Q=null;localStorage.clear();}")
    pg.reload(); pg.wait_for_timeout(1000)
    s("()=>{S.welcomed=true;S.signinAsked='x';S.toured=true;S.meAsked=1;S.sound=true;S.selfRate=true;S.noRecDay=today();S.iosNudge='x';save();}")
    pg.reload(); boot(pg)

    print('Fonts saved at install')
    n = s("async()=>{const c=await caches.open('gintaras-cdn-v1');return (await c.keys()).map(r=>r.url).filter(u=>/fonts\\.(googleapis|gstatic)/.test(u)).length;}")
    if n < 3:
        bad('the fonts are not saved at install (%d font files)' % n)
    else:
        ok('%d font files saved' % n)

    print('Lesson 1, then the app is closed on the finish screen')
    s("()=>{const l=COURSE[0].lessons[0];startLesson(l);}")
    pg.wait_for_timeout(1000)
    play(pg)
    if not s("()=>!!document.querySelector('#stage .done')"):
        bad('lesson 1 did not reach its finish screen')
    # no Continue: wait while the finish screen shows, then close
    for k in range(60):
        pg.wait_for_timeout(500)
        if s("!pf&&haveReady&&readyPlan().files.filter(f=>isMp3(f)).every(f=>HAVE.has(f))"):
            break
    saved = s("readyPlan().files.filter(f=>HAVE.has(f)).length+' of '+readyPlan().files.length")
    if not s("readyPlan().files.filter(f=>isMp3(f)).every(f=>HAVE.has(f))"):
        bad('closing on the finish screen: the next units were not saved (%s)' % saved)
    else:
        ok('saved from the finish screen, before Continue: %s files' % saved)

    print('The status line is about sound')
    pic = s("readyPlan().files.find(f=>!isMp3(f))")
    s("async u=>{const c=await caches.open('gintaras-pics-v1');await c.delete(u);HAVE.delete(u);renderReady();}", pic)
    line = s("()=>{renderReady();return $('#offready').innerText}")
    if not line.startswith('✓ Ready offline'):
        bad('a picture not saved made the line say: %s' % line)
    else:
        ok('one picture missing, still: %s' % line)
    s("u=>{gone(u);renderReady();}", pic)
    if pic in s("readyPlan().files"):
        bad('a file the server does not have is still in the ready window')
    s("u=>{GONE.delete(u);localStorage.removeItem('gintaras.gone');}", pic)

    print('Offline, past the saved units')
    ctx.set_offline(True)
    pg.wait_for_timeout(500)
    line = s("()=>{renderReady();return $('#offready').innerText}")
    if 'reading and typing' in line and '✓' not in line:
        bad('offline, with the first units saved, the line says: %s' % line)
    else:
        ok('offline line: %s' % line)
    # the header fits a phone screen
    s("()=>{S.xp=25000;S.streak=120;renderAll();}"); pg.wait_for_timeout(200)
    w = s("()=>({page:document.documentElement.scrollWidth,view:innerWidth,stats:$('.stats').getBoundingClientRect().right,gear:$('#btn-settings').getBoundingClientRect().right})")
    if w['page'] > w['view'] or w['gear'] > w['view']:
        bad('offline at 390 px the header overflows: %s' % w)
    else:
        ok('header fits at 390 px (settings gear ends at %d)' % w['gear'])
    # a lesson beyond the saved units, as on a computer with only English voices
    s(TTS)
    far = s("()=>{const u=COURSE.find((u,i)=>i>4&&!u.retire&&!filesOf(u.lessons.flatMap(l=>l.items)).every(f=>HAVE.has(f)));return u&&u.id;}")
    s("id=>{const u=UNIT_BY[id];startLesson(u.lessons[0]);}", far)
    pg.wait_for_timeout(1500)
    toast = s("$('#toast').classList.contains('show')?$('#toast').textContent:''")
    if 'downloads next time' not in toast:
        bad('starting a lesson whose sound is not saved: no note (toast: "%s")' % toast)
    else:
        ok('note: %s' % toast)
    seen_intro = False
    for k in range(40):
        e = s("()=>Q&&Q.queue[Q.idx]&&Q.queue[Q.idx].type")
        if e == 'intro':
            seen_intro = True
            txt = s("$('#stage').innerText")
            if 'downloads next time you’re online' not in txt:
                bad('New word card offline still says to tap the speaker')
            if not s("!!document.querySelector('#stage .spk.nosound')"):
                bad('the speaker on a New word card without its sound does not look switched off')
            s("()=>{const b=document.querySelector('#stage .spk');b.click();}")
            pg.wait_for_timeout(300)
            break
        s("()=>{Q.idx++;renderStep();}"); pg.wait_for_timeout(100)
    if not seen_intro:
        bad('no New word card came up in %s' % far)
    play(pg)
    wrong = s("()=>__tts.filter(x=>!x.v||!/^lt/i.test(x.v))")
    if wrong:
        bad('the phone read Lithuanian with a voice of another language %d times, e.g. %s' % (len(wrong), wrong[0]))
    else:
        ok('no wrong-language voice (%d device-voice lines, all Lithuanian)' % len(s("__tts")))
    s("()=>{document.querySelectorAll('.gate,.league-pop,.levelup').forEach(x=>x.remove());if(Q)quit();}")

    print('Offline: what needs internet says so')
    s("()=>showView('settings')"); pg.wait_for_timeout(600)
    dis = s("()=>[...document.querySelectorAll('#auth [data-a=\"pick\"] button')].map(b=>b.disabled)")
    if not dis or not all(dis):
        bad('offline the sign-in buttons can still be tapped: %s' % dis)
    else:
        ok('sign-in buttons switched off')
    d = s("()=>{const b=$('#btn-offline');return b?{dis:b.disabled,t:$('#offline-box').innerText}:null}")
    if not d or not d['dis'] or 'Connect to the internet' not in d['t']:
        bad('offline the whole-course download is not switched off with a reason: %s' % d)
    else:
        ok('download: ' + d['t'].replace('\n', ' / ')[:120])
    s("()=>{showView('learn');startLesson(COURSE[0].lessons[0]);}"); pg.wait_for_timeout(800)
    s("()=>openFlag()"); pg.wait_for_timeout(200)
    t = s("$('.flag-pop').innerText")
    if 'back online' not in t:
        bad('offline the report dialog does not say it sends later')
    else:
        ok('report dialog says it sends when back online')
    s("()=>{document.querySelector('.flag-pop').remove();quit();}")

    print('Back online: the whole course')
    ctx.set_offline(False); pg.wait_for_timeout(1500)
    if s("()=>[...document.querySelectorAll('#auth [data-a=\"pick\"] button')].some(b=>b.disabled)"):
        bad('back online, the sign-in buttons are still switched off')
    s("()=>{showView('settings');}"); pg.wait_for_timeout(800)
    s("()=>{const b=$('#btn-offline');b.click();}")
    for k in range(400):
        pg.wait_for_timeout(500)
        if s("!dl"):
            break
    pg.wait_for_timeout(800)
    t = s("$('#offline-box').innerText")
    if '✓ Whole course saved' not in t:
        bad('after the whole course is saved Settings says: %s' % t.replace('\n', ' / ')[:200])
    else:
        ok('Settings: ✓ Whole course saved')

    print('Review intro count')
    s("""()=>{const now=Date.now();COURSE.slice(0,4).forEach(u=>u.lessons.forEach(l=>l.items.forEach(i=>{S.items[i.id]={lvl:2,seen:true,intro:1,due:now-DAY,ok:1,bad:0};})));}""")
    s("()=>{showView('practice');renderAll();startReview(false);}"); pg.wait_for_timeout(600)
    h = s("$('#stage h3')?$('#stage h3').innerText:''")
    n = s("dueNow().length")
    if str(n) not in h and n > 10:
        bad('Practice says %d due, the review intro says: %s' % (n, h))
    else:
        ok('review intro: %s (Practice: %d)' % (h, n))
    s("()=>{if(Q)quit();}")

    if errs:
        for e in errs:
            bad('page error: ' + e)
    b.close()
srv.shutdown()
print('\n' + ('%d problem(s)' % len(fails) if fails else 'All offline edge checks passed.'))
sys.exit(1 if fails else 0)
