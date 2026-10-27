/* Cloud layer: Supabase sign-in, progress sync, leaderboard. Loaded after the app script.
   If config.js still has placeholder values, everything here stays quiet and the app works offline-only. */
(function(){
const cfg=window.GINTARAS_CONFIG||{};
const configured=cfg.SUPABASE_URL&&!/YOUR-PROJECT/.test(cfg.SUPABASE_URL)&&cfg.SUPABASE_ANON_KEY&&!/YOUR-ANON/.test(cfg.SUPABASE_ANON_KEY)&&window.supabase;
const sb=configured?window.supabase.createClient(cfg.SUPABASE_URL,cfg.SUPABASE_ANON_KEY):null;
let user=null,profile=null,saveTimer=null,booted=false;

const $=s=>document.querySelector(s);
function esc(s){return String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));}
function monday(){const d=new Date();const day=(d.getDay()+6)%7;d.setDate(d.getDate()-day);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function msg(t,bad){const m=$('#auth-msg');if(!m)return;m.textContent=t||'';m.style.color=bad?'var(--bad)':'var(--muted)';}

/* ---------- merge local and cloud progress ---------- */
function mergeState(a,b){if(!a)return b;if(!b)return a;const out=Object.assign({},a);
  out.xp=Math.max(a.xp||0,b.xp||0);out.streak=Math.max(a.streak||0,b.streak||0);out.bestStreak=Math.max(a.bestStreak||0,b.bestStreak||0);
  out.lessonsDone=Math.max(a.lessonsDone||0,b.lessonsDone||0);out.perfects=Math.max(a.perfects||0,b.perfects||0);out.speakDone=Math.max(a.speakDone||0,b.speakDone||0);
  out.freezes=Math.max(a.freezes||0,b.freezes||0);out.lastDay=[a.lastDay||'',b.lastDay||''].sort().pop();
  out.lessons={};new Set(Object.keys(a.lessons||{}).concat(Object.keys(b.lessons||{}))).forEach(k=>out.lessons[k]=Math.max((a.lessons||{})[k]||0,(b.lessons||{})[k]||0));
  out.items={};new Set(Object.keys(a.items||{}).concat(Object.keys(b.items||{}))).forEach(k=>{const x=(a.items||{})[k],y=(b.items||{})[k];if(!x)out.items[k]=y;else if(!y)out.items[k]=x;else out.items[k]={lvl:Math.max(x.lvl,y.lvl),due:Math.max(x.due,y.due),seen:x.seen||y.seen,ok:Math.max(x.ok,y.ok),bad:Math.max(x.bad,y.bad)};const up=[x.up||'',y.up||''].sort().pop();if(up)out.items[k].up=up;});
  out.convs={};new Set(Object.keys(a.convs||{}).concat(Object.keys(b.convs||{}))).forEach(k=>{const x=(a.convs||{})[k]||{},y=(b.convs||{})[k]||{};out.convs[k]={};['text','speak'].forEach(m=>{const v=[x[m]||'',y[m]||''].sort().pop();if(v)out.convs[k][m]=v;});});
  out.badges=Object.assign({},a.badges||{},b.badges||{});
  if((b.todayDate||'')>(a.todayDate||'')){out.todayDate=b.todayDate;out.todayXp=b.todayXp;out.todayLessons=b.todayLessons;}
  if((b.weekStart||'')>(a.weekStart||'')){out.weekStart=b.weekStart;out.weekXp=b.weekXp;}else if(b.weekStart===a.weekStart)out.weekXp=Math.max(a.weekXp||0,b.weekXp||0);
  out.welcomed=true;return out;}

/* ---------- cloud save (debounced; called by the app's save()) ---------- */
window.cloudDirty=function(){if(!sb||!user||!booted)return;clearTimeout(saveTimer);saveTimer=setTimeout(cloudSave,1500);};
async function cloudSave(){if(!sb||!user)return;const S=window.S;if(!S)return;
  const wk=monday();if(S.weekStart!==wk){S.weekStart=wk;S.weekXp=0;}
  try{await sb.from('gintaras_progress').upsert({user_id:user.id,state:S,updated_at:new Date().toISOString()});
    if(profile)await sb.from('gintaras_profiles').update({xp:S.xp,streak:S.streak,week_xp:S.weekXp||0,week_start:wk,level_title:(window.levelFor?window.levelFor(S.xp).title:null),updated_at:new Date().toISOString()}).eq('id',user.id);
    setStatus('Saved to your account');}catch(e){setStatus('Could not save online; progress is kept on this device');}}

/* ---------- auth ---------- */
async function loadSession(){const {data}=await sb.auth.getSession();user=data.session?data.session.user:null;await afterAuth();}
async function afterAuth(){profile=null;
  if(user){const {data}=await sb.from('gintaras_profiles').select('*').eq('id',user.id).maybeSingle();profile=data||null;
    const {data:p}=await sb.from('gintaras_progress').select('state').eq('user_id',user.id).maybeSingle();
    if(p&&p.state){window.S=mergeState(window.S,p.state);window.save();window.renderAll();}
    booted=true;if(profile)cloudSave();}
  else booted=true;
  renderAuth();renderBoard();}
function setStatus(t){const s=$('#cloud-status');if(s)s.textContent=t;}

function renderAuth(){const box=$('#auth');if(!box)return;
  if(!sb){box.hidden=true;return;}
  if(user&&!profile)return showNickname();
  if(user){box.innerHTML='<h2>Account</h2><div class="setting"><span>Signed in as</span><strong>'+esc(profile?profile.nickname:user.email||'')+'</strong></div><p class="note" id="cloud-status">Progress syncs to your account on every lesson.</p><div class="setting"><span>Nickname</span><button class="chip" id="btn-nick">Change</button></div><button class="btn ghost" id="btn-out">Sign out</button>';
    $('#btn-out').onclick=async()=>{await sb.auth.signOut();user=null;profile=null;renderAuth();renderBoard();};
    $('#btn-nick').onclick=showNickname;return;}
  box.innerHTML='<h2>Account</h2><p class="note">Sign in to keep progress across devices and join the leaderboard. Everything you have done on this device comes with you.</p>'+
    (cfg.GOOGLE?'<button class="btn" id="btn-google">Continue with Google</button><div class="or">or with email</div>':'')+
    '<input id="auth-email" type="email" autocomplete="email" placeholder="Email"><input id="auth-pass" type="password" autocomplete="current-password" placeholder="Password (8+ characters)">'+
    '<div class="row2"><button class="btn amber" id="btn-in">Sign in</button><button class="btn ghost" id="btn-up">Create account</button></div><p class="note" id="auth-msg"></p>';
  if(cfg.GOOGLE)$('#btn-google').onclick=async()=>{msg('Opening Google…');const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error)msg(error.message,true);};
  $('#btn-in').onclick=async()=>{const email=$('#auth-email').value.trim(),password=$('#auth-pass').value;if(!email||!password)return msg('Enter your email and password',true);msg('Signing in…');
    const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)return msg(error.message,true);user=data.user;await afterAuth();};
  $('#btn-up').onclick=async()=>{const email=$('#auth-email').value.trim(),password=$('#auth-pass').value;if(!email||password.length<8)return msg('Enter an email and a password of 8 or more characters',true);msg('Creating account…');
    const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error)return msg(error.message,true);
    if(data.session){user=data.user;await afterAuth();}else msg('Check your email for a confirmation link, then sign in.');};}

function showNickname(){const box=$('#auth');box.innerHTML='<h2>Pick a nickname</h2><p class="note">This is what others see on the leaderboard. 2 to 20 characters.</p><input id="nick" type="text" maxlength="20" autocomplete="nickname" placeholder="Nickname" value="'+esc(profile?profile.nickname:'')+'"><button class="btn amber" id="btn-nick-save">Save</button><p class="note" id="auth-msg"></p>';
  $('#btn-nick-save').onclick=async()=>{const n=$('#nick').value.trim();if(n.length<2)return msg('A little longer',true);const S=window.S;
    const row={id:user.id,nickname:n,xp:S.xp,streak:S.streak,week_xp:S.weekXp||0,week_start:monday(),level_title:window.levelFor?window.levelFor(S.xp).title:null,updated_at:new Date().toISOString()};
    const {error}=await sb.from('gintaras_profiles').upsert(row);if(error)return msg(/duplicate|unique/i.test(error.message)?'That nickname is taken':error.message,true);profile=row;renderAuth();renderBoard();cloudSave();};}

/* ---------- leaderboard ---------- */
let boardMode='week';
async function renderBoard(){const box=$('#board');if(!box)return;
  if(!sb){box.innerHTML='<h2>Leaderboard</h2><p class="note">Online accounts are not set up yet.</p>';return;}
  box.innerHTML='<div class="row"><h2>Leaderboard</h2><span class="chips"><button class="chip'+(boardMode==='week'?' in':'')+'" data-bm="week">This week</button><button class="chip'+(boardMode==='all'?' in':'')+'" data-bm="all">All time</button></span></div><p class="note" id="board-note">Loading…</p><ol class="lb" id="lb"></ol>';
  box.querySelectorAll('[data-bm]').forEach(b=>b.onclick=()=>{boardMode=b.dataset.bm;renderBoard();});
  let q=sb.from('gintaras_profiles').select('id,nickname,xp,streak,week_xp,week_start,level_title').limit(50);
  q=boardMode==='week'?q.eq('week_start',monday()).order('week_xp',{ascending:false}):q.order('xp',{ascending:false});
  const {data,error}=await q;const note=$('#board-note'),ol=$('#lb');
  if(error){note.textContent='Could not load the board.';return;}
  if(!data.length){note.textContent=boardMode==='week'?'Nobody has earned XP this week yet. Be first.':'No players yet.';return;}
  note.textContent=user?'':'Sign in on the Profile tab to appear here.';
  ol.innerHTML=data.map((r,i)=>'<li class="'+(user&&r.id===user.id?'me':'')+'"><span class="rk num">'+(i+1)+'</span><span class="nm"><strong>'+esc(r.nickname)+'</strong><small>'+esc(r.level_title||'')+(r.streak?' · '+r.streak+' day streak':'')+'</small></span><span class="pts num">'+(boardMode==='week'?r.week_xp:r.xp)+' XP</span></li>').join('');}

/* ---------- boot ---------- */
function boot(){if(!sb){const tab=$('#tab-board');if(tab)tab.hidden=true;renderAuth();return;}
  sb.auth.onAuthStateChange((ev,session)=>{if(ev==='SIGNED_IN'&&session&&(!user||user.id!==session.user.id)){user=session.user;afterAuth();}});
  loadSession();}
if(window.gintarasReady)boot();else window.addEventListener('gintaras:ready',boot);
window.addEventListener('gintaras:xp',e=>{const S=window.S;const wk=monday();if(S.weekStart!==wk){S.weekStart=wk;S.weekXp=0;}S.weekXp=(S.weekXp||0)+e.detail;});
document.addEventListener('click',e=>{if(e.target.closest('#tab-board'))renderBoard();});
})();
