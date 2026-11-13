/* Read and listen: graded Lithuanian texts and recordings for every CEFR level (A1-C2). Content lives in
   graded-content-lt.js, recordings in graded-audio.js. Each item: tap a word for its meaning, listen (normal or slow),
   show the English if you need it, then answer three questions. Best score per item is kept in S.graded[id] (0-3).
   Listening items hide the text until the questions are answered, so the recording does the work. */
(()=>{
'use strict';
const C=window.WordamiGradedContent;
if(!C||typeof LANG==='undefined'||LANG.code!==C.language)return;
const A=window.WordamiGradedAudio||{};
const LEVELS=['A1','A2','B1','B2','C1','C2'];
const KIND={read:'Reading',listen:'Listening',overheard:'Overheard conversation',talk:'Talk',write:'Writing',speak:'Speaking'};
const NAME={A1:'Beginner',A2:'Elementary',B1:'Intermediate',B2:'Upper intermediate',C1:'Advanced',C2:'Mastery'};
let dlg=null,player=null;
const el=(t,c,txt)=>{const e=document.createElement(t);if(c)e.className=c;if(txt!=null)e.textContent=txt;return e;};
const btn=(txt,cls,fn)=>{const b=el('button',cls||'',txt);b.type='button';b.onclick=fn;return b;};
const best=id=>(S.graded||{})[id];
const norm=w=>w.toLowerCase().replace(/[.,!?;:"“”„«»()…–—]/g,'');

function style(){if(document.getElementById('graded-style'))return;const s=el('style');s.id='graded-style';
  s.textContent='dialog#graded{width:min(660px,calc(100% - 20px));max-height:calc(100dvh - 20px);border:0;border-radius:24px;padding:22px;background:var(--bg);color:var(--fg);overflow:auto;box-shadow:0 18px 50px rgba(15,24,48,.28)}'+
  'dialog#graded::backdrop{background:rgba(15,24,48,.6)}dialog#graded header{display:flex;align-items:flex-start;gap:10px;margin-bottom:8px}'+
  'dialog#graded header h2{flex:1 1 0;min-width:0;margin:0;font-family:var(--display);font-weight:600;line-height:1.2}'+
  'dialog#graded header>button{flex:0 0 auto;min-height:38px;padding:7px 14px;border-radius:999px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font-weight:700}'+
  '.gr-level{margin:16px 0 6px;font-family:var(--display);font-weight:600}.gr-list{display:grid;gap:8px}'+
  '.gr-item{display:flex;justify-content:space-between;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:14px;background:var(--surface);color:var(--fg);text-align:left;font:inherit;width:100%}'+
  '.gr-item small{display:block;color:var(--muted)}.gr-item b.gr-score{flex:none;color:var(--ok)}'+
  '.gr-text{font-size:19px;line-height:1.75;background:var(--surface);border:1px solid var(--line);border-radius:16px;padding:16px;margin:12px 0}'+
  '.gr-text p{margin:0 0 10px}.gr-text .who{font-weight:800;color:var(--pine)}'+
  '.gr-w{border:0;background:none;padding:0;font:inherit;color:inherit;border-bottom:2px dotted var(--pine);cursor:pointer}'+
  '.gr-tip{display:inline-block;margin-left:4px;padding:1px 8px;border-radius:8px;background:var(--pine-soft);font-size:15px}'+
  '.gr-en{color:var(--muted);font-size:16px;line-height:1.55;margin:8px 0}'+
  '.gr-play{display:flex;gap:8px;flex-wrap:wrap;margin:10px 0}.gr-play button,.gr-q button,.gr-actions button{min-height:44px;padding:9px 14px;border-radius:13px;border:2px solid var(--line);background:var(--surface);color:var(--fg);font:inherit;font-weight:700;box-shadow:0 3px 0 rgba(20,38,78,.12)}'+
  '.gr-play button.main{background:var(--pine);border-color:var(--pine);color:var(--on-pine)}'+
  '.gr-q{margin:14px 0}.gr-q p{font-weight:700;margin:0 0 8px}.gr-q .opts{display:grid;gap:8px}.gr-q button{text-align:left}'+
  '.gr-q button.right{border-color:var(--ok);background:var(--ok-soft)}.gr-q button.wrong{border-color:var(--bad);background:var(--bad-soft)}'+
  '.gr-draft{width:100%;font:inherit;font-size:17px;padding:12px;border:2px solid var(--line);border-radius:14px;background:var(--surface);color:var(--fg)}'+
  '.gr-check{display:flex;gap:8px;align-items:flex-start;margin:8px 0;font-size:16px}.gr-check input{width:20px;height:20px;flex:none;margin-top:2px}'+
  '.gr-useful ul{margin:6px 0 10px;padding-left:20px}.gr-useful li{margin:4px 0}'+
  '.gr-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}.gr-actions .go{background:var(--amber);border-color:var(--amber);color:#14264E}';
  document.head.append(s);}

function open(){style();if(!dlg){dlg=el('dialog');dlg.id='graded';dlg.setAttribute('aria-labelledby','graded-title');document.body.append(dlg);
  dlg.addEventListener('close',stop);}if(!dlg.open)dlg.showModal();}
function stop(){if(player){player.pause();player=null;}}
function head(title,back){dlg.replaceChildren();const h=el('header');const t=el('h2',null,title);t.id='graded-title';t.tabIndex=-1;
  h.append(t,btn(back?'Back':'Close','',back||(()=>dlg.close())));dlg.append(h);setTimeout(()=>t.focus(),0);}

function list(){open();stop();head('Read and listen');
  dlg.append(el('p','note','Texts and recordings for every level. Start where it feels easy; each one has three questions.'));
  for(const lv of LEVELS){const items=C.items.filter(i=>i.level===lv);if(!items.length)continue;
    const doneN=items.filter(i=>best(i.id)!=null).length;
    dlg.append(el('h3','gr-level',lv+' · '+NAME[lv]+' ('+doneN+' of '+items.length+' done)'));
    const box=el('div','gr-list');
    for(const it of items){const b=el('button','gr-item');b.type='button';const s=el('span');s.append(el('strong',null,it.title),el('small',null,KIND[it.kind]+(A[it.id]?' · '+Math.round(A[it.id].duration)+' s':'')+(it.kind==='read'?' · '+words(it)+' words':'')+(it.kind==='write'?' · write '+(it.minWords||'')+'+ words':'')));
      b.append(s);const sc=best(it.id);if(sc!=null)b.append(el('b','gr-score','✓ '+sc+'/'+(it.questions||it.checklist||[]).length));b.onclick=()=>show(it);box.append(b);}
    dlg.append(box);}}

const words=it=>it.lines.map(l=>l[1]).join(' ').split(/\s+/).filter(Boolean).length;

/* Glossary entries can be several words ("su pienu"): at each word, the longest entry that matches wins. */
function textBox(it){const gl=Object.fromEntries((it.glossary||[]).map(([lt,en])=>[lt.split(/\s+/).map(norm).join(' '),en]));
  const longest=Math.max(1,...Object.keys(gl).map(k=>k.split(' ').length));const box=el('div','gr-text');box.lang='lt';
  for(const [who,line] of it.lines){const p=el('p');if(who){p.append(el('span','who',who+': '));}
    const parts=line.split(/(\s+)/);let i=0;
    while(i<parts.length){let hit=null;
      if(parts[i].trim())for(let n=longest;n>=1&&!hit;n--){const span=parts.slice(i,i+2*n-1);if(span.length<2*n-1)continue;
        const key=span.filter((_,k)=>k%2===0).map(norm).join(' ');if(gl[key])hit={n,text:span.join(''),en:gl[key]};}
      if(hit){const w=btn(hit.text,'gr-w',()=>{const tip=w.nextSibling;if(tip&&tip.classList&&tip.classList.contains('gr-tip'))tip.remove();else w.after(el('span','gr-tip',hit.en));});
        w.setAttribute('aria-label',hit.text+': tap for meaning');p.append(w);i+=2*hit.n-1;}
      else{p.append(document.createTextNode(parts[i]));i++;}}
    box.append(p);}
  return box;}

function playBar(it){const a=A[it.id];const bar=el('div','gr-play');if(!a)return bar;
  const play=rate=>{stop();player=new Audio(a.url);player.playbackRate=rate;player.play().catch(()=>{});};
  bar.append(btn('▶ Listen','main',()=>play(1)),btn('🐢 Slower','',()=>play(0.75)));return bar;}

/* Writing and speaking tasks: plan with useful phrases, produce your own answer (a saved draft or a recording),
   then compare with a model answer and tick a self-check. Nothing is marked automatically; the score is how many
   self-check points you ticked. */
const draftKey=id=>'gintaras.graded.draft.'+id;
function produce(it){open();stop();head(it.title,list);
  dlg.append(el('p','note',KIND[it.kind]+' · '+it.level+' · '+it.task));
  if(it.useful&&it.useful.length){const box=el('div','gr-useful');box.append(el('p','note','Useful phrases (tap to hear the whole model later):'));
    const ul=el('ul');for(const [lt,en] of it.useful){const li=el('li');const b=el('b',null,lt);b.lang='lt';li.append(b,document.createTextNode(' – '+en));ul.append(li);}box.append(ul);dlg.append(box);}
  const work=el('div','gr-work');dlg.append(work);let made=false;
  if(it.kind==='write'){
    const ta=el('textarea','gr-draft');ta.rows=7;ta.lang='lt';ta.placeholder='Write in Lithuanian…';
    try{ta.value=localStorage.getItem(draftKey(it.id))||'';}catch(e){}
    const count=el('p','note');const upd=()=>{const n=ta.value.trim().split(/\s+/).filter(Boolean).length;count.textContent=n+' words'+(it.minWords?' (aim for at least '+it.minWords+')':'');made=n>=(it.minWords||1);try{localStorage.setItem(draftKey(it.id),ta.value);}catch(e){}};
    ta.oninput=upd;upd();work.append(ta,count);}
  else{
    const status=el('p','note','Record your answer, then listen to yourself.');let rec=null,chunks=[],url=null;
    const recBtn=btn('🎙️ Record','',async()=>{if(rec&&rec.state==='recording'){rec.stop();return;}
      try{const s=await navigator.mediaDevices.getUserMedia({audio:true});rec=new MediaRecorder(s);chunks=[];
        rec.ondataavailable=e=>chunks.push(e.data);rec.onstop=()=>{s.getTracks().forEach(t=>t.stop());if(url)URL.revokeObjectURL(url);url=URL.createObjectURL(new Blob(chunks));made=true;recBtn.textContent='🎙️ Record again';play.hidden=false;status.textContent='Recorded. Play it back, then compare with the model.';};
        rec.start();recBtn.textContent='⏹ Stop';status.textContent='Recording… speak now.';}
      catch(e){status.textContent='The microphone is not available. You can still say your answer out loud, then compare with the model.';made=true;}});
    const play=btn('▶ Play my answer','',()=>{if(url){stop();player=new Audio(url);player.play().catch(()=>{});}});play.hidden=true;
    const bar=el('div','gr-play');bar.append(recBtn,play);work.append(bar,status);}
  const end=el('div','gr-actions');dlg.append(end);
  end.append(btn('Compare with a model answer','go',()=>{if(!made){end.prepend(el('p','note',it.kind==='write'?'Write your answer first.':'Record (or say) your answer first.'));return;}compare();}));
  function compare(){end.replaceChildren();const m=el('div');m.append(el('h3','gr-level','A model answer'),playBar(it),textBox(it));
    const en=el('div','gr-en');en.hidden=true;en.append(...it.lines.map(l=>el('p',null,l[2])));const enBtn=btn('Show English','',()=>{en.hidden=!en.hidden;enBtn.textContent=en.hidden?'Show English':'Hide English';});
    m.append(enBtn,en,el('h3','gr-level','Check your own answer'));
    const checks=it.checklist.map(c=>{const lab=el('label','gr-check');const cb=el('input');cb.type='checkbox';lab.append(cb,document.createTextNode(' '+c));m.append(lab);return cb;});
    m.append(el('p','note','Tick what your answer does. This is your own check: nothing is marked automatically.'));
    const save=btn('Save','go',()=>{const n=checks.filter(c=>c.checked).length;S.graded=S.graded||{};S.graded[it.id]=Math.max(n,S.graded[it.id]||0);save_();
      end.replaceChildren(el('p','note','Saved: '+n+' of '+checks.length+' points.'+(n<checks.length?' Try again with the points you missed.':' Nicely done.')),btn('Try again','',()=>produce(it)),btn('All tasks','',list));if(typeof renderAll==='function')renderAll();});
    m.append(save);end.append(m);}}
const save_=()=>{if(typeof save==='function')save();};

function show(it){if(it.kind==='write'||it.kind==='speak')return produce(it);open();stop();head(it.title,list);
  const listening=it.kind!=='read';
  dlg.append(el('p','note',KIND[it.kind]+' · '+it.level+(it.intro?' · '+it.intro:'')));
  dlg.append(playBar(it));
  const textWrap=el('div');const en=el('div','gr-en');en.hidden=true;en.append(...it.lines.map(l=>el('p',null,(l[0]?l[0]+': ':'')+l[2])));
  const showText=()=>{textWrap.replaceChildren(textBox(it),en);};
  if(!listening)showText();else textWrap.append(el('p','note','Listen first. The text appears after the questions.'));
  dlg.append(textWrap);
  const enBtn=btn('Show English','',()=>{en.hidden=!en.hidden;enBtn.textContent=en.hidden?'Show English':'Hide English';});if(listening)enBtn.hidden=true;
  const acts=el('div','gr-actions');acts.append(enBtn);dlg.append(acts);
  let right=0,answered=0;const qs=el('div');
  it.questions.forEach((q,qi)=>{const box=el('div','gr-q');box.append(el('p',null,(qi+1)+'. '+q.q));const opts=el('div','opts');
    /* The answer is written first in the content; show the options in a fixed shuffled order (the same every time for this question). */
    let h=0;for(const ch of it.id+'#'+qi)h=(h*31+ch.charCodeAt(0))>>>0;
    const order=q.options.map((_,i)=>i);for(let i=order.length-1;i>0;i--){h=(h*1103515245+12345)>>>0;const j=(h>>>16)%(i+1);[order[i],order[j]]=[order[j],order[i]];}
    let rightBtn=null;
    order.forEach(oi=>{const o=q.options[oi];const b=btn(o,'',()=>{if(box.dataset.done)return;box.dataset.done='1';answered++;
        if(oi===q.answer){right++;b.classList.add('right');}else{b.classList.add('wrong');rightBtn.classList.add('right');}
        if(answered===it.questions.length)finish();});if(oi===q.answer)rightBtn=b;opts.append(b);});
    box.append(opts);qs.append(box);});
  dlg.append(qs);
  const end=el('div','gr-actions');dlg.append(end);
  function finish(){S.graded=S.graded||{};S.graded[it.id]=Math.max(right,S.graded[it.id]||0);save();
    if(listening){showText();enBtn.hidden=false;}
    end.replaceChildren(el('p','note',right+' of '+it.questions.length+' right.'+(right<it.questions.length?' Read it again with the recording, then try once more.':' Nicely done.')));
    const same=C.items.filter(i=>i.level===it.level),next=same[same.indexOf(it)+1];
    end.append(btn('Try again','',()=>show(it)));if(next)end.append(btn('Next: '+next.title,'go',()=>show(next)));end.append(btn('All texts','',list));if(typeof renderAll==='function')renderAll();}}

function card(){const prac=document.getElementById('view-practice');if(!prac)return;let box=document.getElementById('graded-card');
  if(!box){box=el('div','card');box.id='graded-card';const game=document.getElementById('game-card');prac.insertBefore(box,game||null);}
  const n=C.items.length,k=C.items.filter(i=>best(i.id)!=null).length;
  box.replaceChildren(el('span','eyebrow','Read and listen'),el('h2',null,'📖 Stories and recordings'),
    el('p','note','Short texts and recordings for every level, from beginner up. Tap a word for its meaning, listen, then answer three questions. '+k+' of '+n+' done.'),
    btn(k?'Carry on':'Start reading','btn ghost',list));}
const prev=window.renderPractice;
if(typeof prev==='function')window.renderPractice=function(){prev.apply(this,arguments);card();};
card();
window.WordamiGraded=Object.freeze({open:list,show:id=>{const it=C.items.find(i=>i.id===id);if(it)show(it);},items:()=>C.items.map(i=>({id:i.id,level:i.level,kind:i.kind}))});
})();
