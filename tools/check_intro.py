"""(Round 10 #1, Round 11: make-a-sentence cards too) Build and play the first lessons many times (fresh learner each run, random right/wrong answers) and fail on
any card that tests a word before its New word card. Needs the local server (python -m http.server 8765). usage: python tools/check_intro.py [runs] [lessons]"""
import sys
from playwright.sync_api import sync_playwright
sys.stdout.reconfigure(encoding='utf-8')
RUNS = int(sys.argv[1]) if len(sys.argv) > 1 else 100
NL = int(sys.argv[2]) if len(sys.argv) > 2 else 3
JS = r"""([runs,nl])=>{window.save=()=>{};window.saveSoon=()=>{};window.say=()=>{};window.sfx=()=>{};const bad=[];let cards=0;
  const STEPS=new Set(['intro','tip','revtip','metip','mesay','maketip','spkask']);let makes=0;if(!WORD_ITEMS)wordLvl('');
  for(let run=0;run<runs;run++){
    const keep=JSON.stringify(S);S.items={};S.lessons={};S.cando={};S.replies={};S.welcomed=true;S.toured=true;
    try{
    COURSE[0].lessons.slice(0,nl).forEach(l=>{Q=null;startLesson(l);if(!Q)return;
      const introd=new Set();let n=0;
      while(Q&&Q.idx<Q.queue.length&&n++<200){for(let k=0;k<25&&settleCard();k++);const e=Q.queue[Q.idx];if(!e)break;cards++;
        if(e.type==='intro'){introd.add(e.item.id);const r=rec(e.item.id);r.seen=true;r.intro=1;Q.idx++;continue;}
        if(STEPS.has(e.type)){Q.idx++;continue;}
        /* (Round 11) a sentence you make: every word of it taught (or met on its New word card) before it is asked */
        if(e.type==='make'){makes++;ltWords(e.sent.lt).forEach(w=>{if(!NAMEISH(w)&&!(WORD_ITEMS[w]||[]).some(i=>taught(i)||introd.has(i.id)))bad.push(run+' '+l.id+' make card "'+e.sent.lt+'": '+w);});Q.idx++;continue;}
        (e.item?[e.item]:e.items||[]).forEach(i=>{if(!taught(i)&&!introd.has(i.id))bad.push(run+' '+l.id+' card '+Q.idx+' '+e.type+': '+i.lt);
          else if(!introd.has(i.id)&&l.items.includes(i)&&!(peek(i.id).lvl>=2))bad.push(run+' '+l.id+' card '+Q.idx+' '+e.type+': '+i.lt+' (taught before this lesson?)');});
        /* answer: mostly right, sometimes wrong (a miss comes back) */
        const it=e.item;if(it){const ok=Math.random()>0.2;Q.answer=ok?it.lt:'zzz';
          try{if(['type','speak','dictate','build','tiles','gaps','cloze'].includes(e.type)){if(e.type==='cloze')Q.answer=ok?e.word:'zzz';reveal(ok,'',false,'','');}else{Q.answer=ok?it:null;reveal(ok,'',false,'','');}}catch(x){}}
        stopAutoNext&&stopAutoNext();Q.idx++;}
      Q.idx=Q.queue.length;try{finish&&0;}catch(x){}S.lessons[l.id]=1;Q=null;});
    }catch(err){bad.push('ERR '+run+' '+err.message);}
    const s2=JSON.parse(keep);Object.keys(S).forEach(k=>delete S[k]);Object.assign(S,s2);}
  return {bad:[...new Set(bad)].slice(0,40),n:bad.length,cards,makes};}"""
with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome'); pg = b.new_page()
    errs = []; pg.on('pageerror', lambda e: errs.append(str(e)))
    pg.goto('http://localhost:8765/'); pg.wait_for_timeout(1500)
    r = pg.evaluate(JS, [RUNS, NL])
    print('cards played', r['cards'], '| make-a-sentence cards', r['makes'], '| test-before-intro:', r['n'])
    for x in r['bad']: print('  ', x)
    print('errors', errs[:5])
    b.close()
    sys.exit(1 if r['n'] else 0)
