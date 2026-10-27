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

/* Profile card: who you are when signed in; Google or email sign-in when not. Account actions live in Settings → Account. */
function renderAuth(){const box=$('#auth');if(!box)return;renderAcct();
  if(!sb){box.hidden=true;return;}
  if(user&&!profile)return showNickname();
  if(user){box.innerHTML='<div class="acct-who"><span class="av">'+esc((profile.nickname||'?')[0].toUpperCase())+'</span><div><strong>'+esc(profile.nickname)+'</strong><small>'+esc(user.email||'')+'</small></div></div><p class="note" id="cloud-status">Your progress is saved to your account after every lesson.</p>';return;}
  box.innerHTML='<h2>Save your progress</h2><p class="note">Sign in to keep your progress on every device and join the leaderboard. Everything you have already done on this device comes with you.</p>'+
    '<div class="stack" id="auth-pick">'+(cfg.GOOGLE?'<div id="gbtn" class="gbtn"><button class="btn" id="btn-google">Continue with Google</button></div>':'')+
    '<button type="button" class="btn ghost" id="btn-email">Continue with email</button></div>'+
    '<div class="stack" id="auth-email-form" hidden><input id="auth-email" type="email" autocomplete="email" placeholder="Email"><input id="auth-pass" type="password" autocomplete="current-password" placeholder="Password (8+ characters)">'+
    '<div class="row2"><button class="btn amber" id="btn-in">Sign in</button><button class="btn ghost" id="btn-up">Create account</button></div><button type="button" class="linkbtn" id="btn-email-back">Back</button></div><p class="note" id="auth-msg"></p>';
  if(cfg.GOOGLE){$('#btn-google').onclick=googleRedirect;googleButton();}
  $('#btn-email').onclick=()=>{$('#auth-pick').hidden=true;$('#auth-email-form').hidden=false;msg('');$('#auth-email').focus();};
  $('#btn-email-back').onclick=()=>{$('#auth-email-form').hidden=true;$('#auth-pick').hidden=false;msg('');};
  $('#btn-in').onclick=async()=>{const email=$('#auth-email').value.trim(),password=$('#auth-pass').value;if(!email||!password)return msg('Enter your email and password',true);msg('Signing in…');
    const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)return msg(error.message,true);user=data.user;await afterAuth();};
  $('#btn-up').onclick=async()=>{const email=$('#auth-email').value.trim(),password=$('#auth-pass').value;if(!email||password.length<8)return msg('Enter an email and a password of 8 or more characters',true);msg('Creating account…');
    const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error)return msg(error.message,true);
    if(data.session){user=data.user;await afterAuth();}else msg('Check your email for a confirmation link, then sign in.');};}

function showNickname(){const box=$('#auth');const changing=!!profile;if(changing&&window.showView)window.showView('profile');
  box.innerHTML='<h2>'+(changing?'Change your nickname':'Pick a nickname')+'</h2><p class="note">This is what others see on the leaderboard. 2 to 20 characters.</p><input id="nick" type="text" maxlength="20" autocomplete="nickname" placeholder="Nickname" value="'+esc(profile?profile.nickname:'')+'"><button class="btn amber" id="btn-nick-save">Save</button>'+(changing?'<button type="button" class="linkbtn" id="btn-nick-cancel">Cancel</button>':'')+'<p class="note" id="auth-msg"></p>';
  if(changing)$('#btn-nick-cancel').onclick=renderAuth;
  $('#btn-nick-save').onclick=async()=>{const n=$('#nick').value.trim();if(n.length<2)return msg('A little longer',true);const S=window.S;
    const row={id:user.id,nickname:n,xp:S.xp,streak:S.streak,week_xp:S.weekXp||0,week_start:monday(),level_title:window.levelFor?window.levelFor(S.xp).title:null,updated_at:new Date().toISOString()};
    const {error}=await sb.from('gintaras_profiles').upsert(row);if(error)return msg(/duplicate|unique/i.test(error.message)?'That nickname is taken':error.message,true);profile=row;renderAuth();renderBoard();cloudSave();};}

/* Settings → Account: nickname, sign out, and deleting the account for good. */
function renderAcct(){const box=$('#acct'),head=$('#acct-group');if(!box)return;box.hidden=!sb;head.hidden=!sb;if(!sb)return;
  if(!user){box.innerHTML='<p class="note">You are not signed in. Sign in to keep your progress on every device, show your nickname on the leaderboard, and manage or delete your account here.</p><button type="button" class="btn amber" id="btn-acct-signin">Sign in</button>';
    $('#btn-acct-signin').onclick=()=>{if(window.showView)window.showView('profile');};return;}
  box.innerHTML='<div class="setting"><span>Signed in as</span><strong>'+esc(profile?profile.nickname:(user.email||''))+'</strong></div>'+
    '<div class="setting"><span>Nickname</span><button type="button" class="chip" id="btn-nick">Change</button></div>'+
    '<button type="button" class="btn ghost" id="btn-out">Sign out</button>'+
    '<div class="danger-zone"><button type="button" class="btn danger" id="btn-del">Delete my account</button>'+
    '<div class="confirm" id="del-confirm" hidden><span>This permanently deletes your account, your nickname and leaderboard spot, and the progress saved online. There is no undo. Progress on this device stays unless you also reset it below.</span>'+
    '<button type="button" class="btn danger" id="btn-del-yes">Yes, delete my account</button><button type="button" class="btn ghost" id="btn-del-no">Keep my account</button><p class="note" id="del-msg"></p></div></div>';
  $('#btn-nick').onclick=showNickname;
  $('#btn-out').onclick=async()=>{await sb.auth.signOut();user=null;profile=null;renderAuth();renderBoard();toast('Signed out');};
  $('#btn-del').onclick=()=>{$('#del-confirm').hidden=false;$('#btn-del').hidden=true;};
  $('#btn-del-no').onclick=()=>{$('#del-confirm').hidden=true;$('#btn-del').hidden=false;};
  $('#btn-del-yes').onclick=async()=>{const m=$('#del-msg');m.textContent='Deleting…';
    const {error}=await sb.rpc('gintaras_delete_account');if(error){m.textContent='Could not delete: '+error.message;return;}
    try{await sb.auth.signOut();}catch(e){}user=null;profile=null;renderAuth();renderBoard();toast('Your account has been deleted');};}
function toast(t){if(window.toastMsg)window.toastMsg(t);}

/* ---------- Google sign-in ----------
   Google's own button runs on this page, so Google's screen names n00bin.github.io instead of the Supabase server.
   Its ID token is handed to Supabase with a nonce. If Google's script can't load, the plain redirect button stays. */
async function googleRedirect(){msg('Opening Google…');const {error}=await sb.auth.signInWithOAuth({provider:'google',options:{redirectTo:location.origin+location.pathname}});if(error)msg(error.message,true);}
let gsi=null;
function loadGsi(){return gsi||(gsi=new Promise((ok,bad)=>{const sc=document.createElement('script');sc.src='https://accounts.google.com/gsi/client';sc.async=true;sc.onload=ok;sc.onerror=bad;document.head.appendChild(sc);}));}
async function googleButton(){if(!cfg.GOOGLE_CLIENT_ID||!navigator.onLine)return;
  try{await loadGsi();}catch(e){return;}
  const box=$('#gbtn');if(!box||!window.google||!google.accounts)return;
  const raw=crypto.getRandomValues(new Uint8Array(16)).reduce((s,b)=>s+b.toString(16).padStart(2,'0'),'');
  const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)))].map(b=>b.toString(16).padStart(2,'0')).join('');
  google.accounts.id.initialize({client_id:cfg.GOOGLE_CLIENT_ID,nonce:hash,context:'signin',ux_mode:'popup',
    callback:async r=>{msg('Signing in…');const {data,error}=await sb.auth.signInWithIdToken({provider:'google',token:r.credential,nonce:raw});
      if(error)return msg(error.message,true);user=data.user;await afterAuth();}});
  box.innerHTML='';google.accounts.id.renderButton(box,{theme:'outline',size:'large',shape:'pill',text:'continue_with',width:Math.min(400,box.clientWidth||320)});}

/* ---------- leaderboard ---------- */
let boardMode='week';
async function renderBoard(){const box=$('#board');if(!box)return;
  if(!sb){box.innerHTML='<h2>Leaderboard</h2><p class="note">Online accounts are not set up yet.</p>';return;}
  if(!navigator.onLine){box.innerHTML='<h2>Leaderboard</h2><p class="note">You’re offline. The leaderboard comes back when you reconnect, and your XP keeps counting in the meantime.</p>';return;}
  box.innerHTML='<div class="row"><h2>Leaderboard</h2><span class="chips"><button class="chip'+(boardMode==='week'?' in':'')+'" data-bm="week">This week</button><button class="chip'+(boardMode==='all'?' in':'')+'" data-bm="all">All time</button></span></div><p class="note" id="board-note">Loading…</p><ol class="lb" id="lb"></ol><div id="board-cta"></div>';
  box.querySelectorAll('[data-bm]').forEach(b=>b.onclick=()=>{boardMode=b.dataset.bm;renderBoard();});
  const cta=$('#board-cta');
  if(!user)cta.innerHTML='<button type="button" class="btn amber" id="btn-join">Sign in to join the leaderboard</button>';
  else if(!profile)cta.innerHTML='<button type="button" class="btn amber" id="btn-join">Pick a nickname to appear here</button>';
  const join=$('#btn-join');if(join)join.onclick=()=>{if(window.showView)window.showView('profile');};
  const load=m=>{const q=sb.from('gintaras_profiles').select('id,nickname,xp,streak,week_xp,week_start,level_title').limit(50);
    return m==='week'?q.eq('week_start',monday()).gt('week_xp',0).order('week_xp',{ascending:false}):q.order('xp',{ascending:false});};
  let mode=boardMode;let {data,error}=await load(mode);const note=$('#board-note'),ol=$('#lb');if(!note)return;
  if(error){note.textContent='Could not load the leaderboard. Check your connection and try again.';return;}
  let lead='';
  if(!data.length&&mode==='week'){lead='Nobody has earned XP this week yet, so here is the all-time board.';mode='all';const r=await load('all');data=r.error?[]:r.data;}
  if(!data.length){note.textContent='No players yet. Be the first!';return;}
  note.textContent=lead;
  ol.innerHTML=data.map((r,i)=>'<li class="'+(user&&r.id===user.id?'me':'')+'"><span class="rk num">'+(i+1)+'</span><span class="nm"><strong>'+esc(r.nickname)+'</strong><small>'+esc(r.level_title||'')+(r.streak?' · '+r.streak+' day streak':'')+'</small></span><span class="pts num">'+(mode==='week'?r.week_xp:r.xp)+' XP</span></li>').join('');}

/* ---------- boot ---------- */
function boot(){if(!sb){const tab=$('#tab-board');if(tab)tab.hidden=true;renderAuth();return;}
  sb.auth.onAuthStateChange((ev,session)=>{if(ev==='SIGNED_IN'&&session&&(!user||user.id!==session.user.id)){user=session.user;afterAuth();}});
  loadSession();}
if(window.gintarasReady)boot();else window.addEventListener('gintaras:ready',boot);
window.addEventListener('online',()=>{if(sb&&user)cloudSave();renderBoard();});
window.addEventListener('gintaras:xp',e=>{const S=window.S;const wk=monday();if(S.weekStart!==wk){S.weekStart=wk;S.weekXp=0;}S.weekXp=(S.weekXp||0)+e.detail;});
document.addEventListener('click',e=>{if(e.target.closest('#tab-board'))renderBoard();});
})();
