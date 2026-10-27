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
  out.freezes=Math.max(a.freezes||0,b.freezes||0);out.daysLearned=Math.max(a.daysLearned||0,b.daysLearned||0);
  if((b.restWeek||'')>(a.restWeek||'')){out.restWeek=b.restWeek;out.restsUsed=b.restsUsed;}else if(b.restWeek===a.restWeek)out.restsUsed=Math.max(a.restsUsed||0,b.restsUsed||0);
  if(b.me&&(!a.me||(b.me.at||0)>(a.me.at||0)))out.me=b.me;out.lastDay=[a.lastDay||'',b.lastDay||''].sort().pop();
  out.lessons={};new Set(Object.keys(a.lessons||{}).concat(Object.keys(b.lessons||{}))).forEach(k=>out.lessons[k]=Math.max((a.lessons||{})[k]||0,(b.lessons||{})[k]||0));
  out.items={};new Set(Object.keys(a.items||{}).concat(Object.keys(b.items||{}))).forEach(k=>{const x=(a.items||{})[k],y=(b.items||{})[k];if(!x)out.items[k]=y;else if(!y)out.items[k]=x;else out.items[k]={lvl:Math.max(x.lvl,y.lvl),due:Math.max(x.due,y.due),seen:x.seen||y.seen,ok:Math.max(x.ok,y.ok),bad:Math.max(x.bad,y.bad)};if(x&&y){const up=[x.up||'',y.up||''].sort().pop();if(up)out.items[k].up=up;}});
  out.convs={};new Set(Object.keys(a.convs||{}).concat(Object.keys(b.convs||{}))).forEach(k=>{const x=(a.convs||{})[k]||{},y=(b.convs||{})[k]||{};out.convs[k]={};['done','text','speak'].forEach(m=>{const v=[x[m]||'',y[m]||''].sort().pop();if(v)out.convs[k][m]=v;});const ps=[...new Set((x.paths||[]).concat(y.paths||[]))];if(ps.length)out.convs[k].paths=ps;});
  out.badges=Object.assign({},a.badges||{},b.badges||{});
  out.ltime={};new Set(Object.keys(a.ltime||{}).concat(Object.keys(b.ltime||{}))).forEach(k=>out.ltime[k]=Math.max((a.ltime||{})[k]||0,(b.ltime||{})[k]||0));
  out.amberEarned=Math.max(a.amberEarned||0,b.amberEarned||0);out.amberSpent=Math.max(a.amberSpent||0,b.amberSpent||0);
  out.boostUntil=Math.max(a.boostUntil||0,b.boostUntil||0);['boostDay','shieldWeek','shieldMonth'].forEach(k=>{const v=[a[k]||'',b[k]||''].sort().pop();if(v)out[k]=v;});
  out.chalLedger=Object.assign({},a.chalLedger||{});Object.entries(b.chalLedger||{}).forEach(([k,v])=>{if(out.chalLedger[k]!=='done')out.chalLedger[k]=v;});
  out.brokenStreak=a.brokenStreak!==undefined?a.brokenStreak:(b.brokenStreak||null);
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
  if(user){await ensureRollover();const {data}=await sb.from('gintaras_profiles').select('*').eq('id',user.id).maybeSingle();profile=data||null;
    const {data:p}=await sb.from('gintaras_progress').select('state').eq('user_id',user.id).maybeSingle();
    if(p&&p.state){window.S=mergeState(window.S,p.state);window.save();window.renderAll();}
    if(!profile)profile=await autoProfile();
    loadChallenges();
    booted=true;cloudSave();}
  else booted=true;
  renderAuth();renderBoard();
  if(user&&afterSignIn){const f=afterSignIn;afterSignIn=null;f();}
  leagueNotice();}
/* Signing in is enough for the leaderboard: the nickname starts as your first name (or the start of your email)
   and can be changed any time. If someone already has it, a couple of digits are added. */
let profileMaking=null;
function autoProfile(){return profileMaking||(profileMaking=(async()=>{const md=user.user_metadata||{};
  const raw=(md.given_name||md.full_name||md.name||(user.email||'').split('@')[0]||'').trim().split(/\s+/)[0]||'';
  let base=raw.replace(/[^\p{L}\p{N}._-]/gu,'').slice(0,16);if(base.length<2)base='Learner';base=base[0].toUpperCase()+base.slice(1);
  const S=window.S;const names=[base].concat([1,2,3,4].map(()=>base+Math.floor(10+Math.random()*90)),['Learner'+Math.floor(1000+Math.random()*9000)]);
  for(const n of names){const row={id:user.id,nickname:n,xp:S.xp,streak:S.streak,week_xp:S.weekXp||0,week_start:monday(),level_title:window.levelFor?window.levelFor(S.xp).title:null,updated_at:new Date().toISOString()};
    const {error}=await sb.from('gintaras_profiles').upsert(row);if(!error)return Object.assign(row,{league:0,league_moved:0});if(!/duplicate|unique/i.test(error.message))return null;}
  return null;})().finally(()=>{profileMaking=null;}));}
let afterSignIn=null;
function setStatus(t){const s=$('#cloud-status');if(s)s.textContent=t;}

/* Profile card: who you are when signed in; the sign-in box when not. */
function renderAuth(){const box=$('#auth');if(!box)return;renderAcct();renderReports();
  if(!sb){box.hidden=true;return;}
  if(user&&!profile){box.innerHTML='<p class="note">Setting up your account…</p>';return;}
  if(user){box.innerHTML='<div class="acct-who"><span class="av">'+esc((profile.nickname||'?')[0].toUpperCase())+'</span><div><strong>'+esc(profile.nickname)+'</strong><small>'+leagueOf(profile.league).icon+' '+esc(leagueOf(profile.league).lt)+' league · '+esc(user.email||'')+'</small></div><button type="button" class="chip" id="btn-nick-p">Change nickname</button></div><p class="note" id="cloud-status">Your progress is saved to your account after every lesson.</p>';
    $('#btn-nick-p').onclick=showNickname;return;}
  authWidget(box,{title:'Save your progress',lead:'Sign in to keep your progress on every device and join the leaderboard. Everything you have already done on this device comes with you.'});}

/* The sign-in box: Google, or "Continue with email" which opens the email fields. Everything is looked up inside
   the box, so it can appear in two places at once. onDone runs once the account is ready. */
function authWidget(box,o){o=o||{};afterSignIn=o.onDone||afterSignIn;
  box.innerHTML=(o.title?'<h2>'+esc(o.title)+'</h2>':'')+(o.lead?'<p class="note">'+esc(o.lead)+'</p>':'')+
    '<div class="stack" data-a="pick">'+(cfg.GOOGLE?'<div class="gbtn" data-a="gbtn"><button class="btn" data-a="google">Continue with Google</button></div>':'')+
    '<button type="button" class="btn ghost" data-a="email">Continue with email</button></div>'+
    '<div class="stack" data-a="form" hidden><input data-a="mail" type="email" autocomplete="email" placeholder="Email"><input data-a="pass" type="password" autocomplete="current-password" placeholder="Password (8+ characters)">'+
    '<div class="row2"><button class="btn amber" data-a="in">Sign in</button><button class="btn ghost" data-a="up">Create account</button></div><button type="button" class="linkbtn" data-a="back">Back</button></div><p class="note" data-a="msg" role="status"></p>';
  const q=k=>box.querySelector('[data-a="'+k+'"]');const say=(t,bad)=>{const m=q('msg');m.textContent=t||'';m.style.color=bad?'var(--bad)':'var(--muted)';};
  if(cfg.GOOGLE){q('google').onclick=googleRedirect;googleButton(q('gbtn'),say);}
  q('email').onclick=()=>{q('pick').hidden=true;q('form').hidden=false;say('');q('mail').focus();};
  q('back').onclick=()=>{q('form').hidden=true;q('pick').hidden=false;say('');};
  q('in').onclick=async()=>{const email=q('mail').value.trim(),password=q('pass').value;if(!email||!password)return say('Enter your email and password',true);say('Signing in…');
    const {data,error}=await sb.auth.signInWithPassword({email,password});if(error)return say(error.message,true);user=data.user;await afterAuth();};
  q('up').onclick=async()=>{const email=q('mail').value.trim(),password=q('pass').value;if(!email||password.length<8)return say('Enter an email and a password of 8 or more characters',true);say('Creating account…');
    const {data,error}=await sb.auth.signUp({email,password,options:{emailRedirectTo:location.origin+location.pathname}});if(error)return say(error.message,true);
    if(data.session){user=data.user;await afterAuth();}else say('Check your email for a confirmation link, then sign in.');};}
window.cloud={buyShield:()=>buyShield(),shieldOn:()=>shieldOn(),enabled:()=>!!sb,signedIn:()=>!!user,widget:authWidget,nickname:()=>profile&&profile.nickname,sendReports:()=>sendReports()};

function showNickname(){const box=$('#auth');const changing=!!profile;if(window.showView)window.showView('profile');
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
async function googleButton(box,say){if(!cfg.GOOGLE_CLIENT_ID||!navigator.onLine||!box)return;say=say||msg;
  try{await loadGsi();}catch(e){return;}
  if(!window.google||!google.accounts||!box.isConnected)return;
  const raw=crypto.getRandomValues(new Uint8Array(16)).reduce((s,b)=>s+b.toString(16).padStart(2,'0'),'');
  const hash=[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw)))].map(b=>b.toString(16).padStart(2,'0')).join('');
  google.accounts.id.initialize({client_id:cfg.GOOGLE_CLIENT_ID,nonce:hash,context:'signin',ux_mode:'popup',
    callback:async r=>{say('Signing in…');const {data,error}=await sb.auth.signInWithIdToken({provider:'google',token:r.credential,nonce:raw});
      if(error)return say(error.message,true);user=data.user;await afterAuth();}});
  box.innerHTML='';google.accounts.id.renderButton(box,{theme:'outline',size:'large',shape:'pill',text:'continue_with',width:Math.min(400,box.clientWidth||320)});}

/* ---------- problem reports ---------- */
/* Reports are queued in progress (S.reportQueue) and sent whenever we can, signed in or not.
   Only the owner's account can read them (database policy); for them a Problem reports card appears in Settings. */
const OWNER='n00binhard@gmail.com';
let sending=false;
async function sendReports(){const S=window.S;if(!sb||sending||!navigator.onLine||!S||!(S.reportQueue||[]).length)return;sending=true;
  try{while(S.reportQueue.length){const r=S.reportQueue[0];const {error}=await sb.from('gintaras_reports').insert({reason:r.reason,note:r.note,context:r.context});
      if(error)break;S.reportQueue.shift();window.save();}}finally{sending=false;}if(isOwner())renderReports();}
const isOwner=()=>!!(user&&(user.email||'').toLowerCase()===OWNER);
async function renderReports(){const box=$('#reports'),head=$('#reports-group');if(!box)return;const show=!!(sb&&isOwner());box.hidden=!show;head.hidden=!show;if(!show)return;
  box.innerHTML='<p class="note">Loading reports…</p>';
  const {data,error}=await sb.from('gintaras_reports').select('*').eq('status','open').order('created_at',{ascending:false}).limit(100);
  if(error){box.innerHTML='<p class="note">Could not load reports: '+esc(error.message)+'</p>';return;}
  if(!data.length){box.innerHTML='<h2>All clear</h2><p class="note">No open problem reports. Players can flag any card with the 🚩 at the top of a lesson.</p>';return;}
  box.innerHTML='<h2>'+data.length+' open report'+(data.length===1?'':'s')+'</h2>'+data.map(r=>{const x=r.context||{};
    return '<div class="rep" data-id="'+r.id+'"><span class="what">'+esc(r.reason)+' · '+esc(x.lt||x.drill||x.title||'(no card)')+(x.en?' <span class="note">('+esc(x.en)+')</span>':'')+'</span>'+
      (r.note?'<span>“'+esc(r.note)+'”</span>':'')+
      '<span class="meta">'+esc([x.kind,x.lesson||x.conv,x.type,x.item||x.line,x.answer?'answered: '+x.answer:'',x.typed?'typed: '+x.typed:'','voice: '+(x.voice||''),new Date(r.created_at).toLocaleString()].filter(Boolean).join(' · '))+'</span>'+
      '<span class="btns"><button type="button" class="chip" data-st="fixed">✓ Fixed</button><button type="button" class="chip" data-st="ignored">Ignore</button></span></div>';}).join('');
  box.querySelectorAll('[data-st]').forEach(b=>b.onclick=async()=>{const row=b.closest('.rep');const {error}=await sb.from('gintaras_reports').update({status:b.dataset.st}).eq('id',row.dataset.id);
    if(error){toast('Could not update: '+error.message);return;}renderReports();});}
window.addEventListener('online',()=>sendReports());

/* ---------- leagues ---------- */
/* Seven weekly leagues. The database settles each week once (top 3 move up, no XP means moving down);
   the app only shows where you stand. */
const LEAGUES=[{lt:'Smėlis',en:'Sand',icon:'🟫'},{lt:'Akmenėlis',en:'Pebble',icon:'🪨'},{lt:'Gintaras',en:'Amber',icon:'🟠'},{lt:'Sidabras',en:'Silver',icon:'🥈'},
  {lt:'Auksas',en:'Gold',icon:'🥇'},{lt:'Krištolas',en:'Crystal',icon:'💎'},{lt:'Saulė',en:'Sun',icon:'☀️'}];
const leagueOf=n=>LEAGUES[Math.max(0,Math.min(6,n||0))];
let rolled=null;
function ensureRollover(){return rolled||(rolled=sb.rpc('gintaras_league_rollover').then(()=>{},()=>{}));}
function weekEndsIn(){const now=new Date();const d=new Date(Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()));d.setUTCDate(d.getUTCDate()+((8-d.getUTCDay())%7||7));
  const days=Math.ceil((d-now)/86400000);return days<=1?'Ends tonight':'Ends in '+days+' days';}
function leagueNotice(){if(!profile||!profile.league_moved)return;const S=window.S;if(!S||S.leagueNotice===monday())return;S.leagueNotice=monday();window.save();
  const L=leagueOf(profile.league),up=profile.league_moved>0;const ov=document.createElement('div');ov.className='league-pop';
  ov.innerHTML='<div class="card"><div class="lg-icon big">'+L.icon+'</div><h2>'+(up?'You moved up!':'New week, new start')+'</h2><p class="note">'+(up?'You finished in the top 3, so you are now in the <b>'+esc(L.lt)+'</b> ('+esc(L.en)+') league. <b>+20 amber</b> for moving up!':'You are in the <b>'+esc(L.lt)+'</b> ('+esc(L.en)+') league this week. A few lessons and you will climb right back.')+'</p><button type="button" class="btn amber">'+(up?'Let\'s go':'I\'m on it')+'</button></div>';
  document.body.appendChild(ov);ov.querySelector('button').onclick=()=>ov.remove();if(up&&window.earnAmber)window.earnAmber(20,'league promotion');if(up&&window.sfxWin)window.sfxWin();}

/* ---------- perks that involve other players ---------- */
/* League shield: you can't move down at the end of this week (the weekly job reads shield_week). Once a month. */
const shieldOn=()=>!!(window.S&&window.S.shieldWeek===monday());
async function buyShield(){const S=window.S;if(!user||!profile)return toast('Sign in to join a league first');
  if(shieldOn())return toast('Your league is already shielded this week');
  if(S.shieldMonth===monday().slice(0,7))return toast('One shield a month. Next month!');
  if(!window.spendAmber(25))return;
  const {error}=await sb.from('gintaras_profiles').update({shield_week:monday()}).eq('id',user.id);
  if(error){window.earnAmber(25);return toast('Could not shield your league: '+error.message);}
  S.shieldWeek=monday();S.shieldMonth=monday().slice(0,7);window.save();toast('🛡️ Shield on: you can\'t move down a league this week');
  if(window.renderShop)window.renderShop();renderBoard();}
/* Friend challenges. Each side stakes amber when sending or accepting (recorded in S.chalLedger as "staked");
   once the weekly job settles it, each app pays its own player out exactly once and marks it "done". */
let chals=[],people={};
const nameOf=id=>(people[id]&&people[id].nickname)||'your friend';
const weekXpOf=id=>{const p=people[id];return p&&p.week_start===monday()?p.week_xp:0;};
async function loadChallenges(){if(!sb||!user){chals=[];return;}
  const {data,error}=await sb.from('gintaras_challenges').select('*').order('created_at',{ascending:false}).limit(40);if(error)return;chals=data||[];
  const ids=[...new Set(chals.flatMap(x=>[x.from_id,x.to_id]))];
  if(ids.length){const {data:ps}=await sb.from('gintaras_profiles').select('id,nickname,week_xp,week_start').in('id',ids);(ps||[]).forEach(p=>people[p.id]=p);}
  payChallenges();}
function payChallenges(){const S=window.S;if(!S)return;S.chalLedger=S.chalLedger||{};const msgs=[];
  chals.forEach(x=>{const k=String(x.id);if(S.chalLedger[k]!=='staked')return;const other=nameOf(x.from_id===user.id?x.to_id:x.from_id);
    if(['declined','cancelled','expired'].includes(x.status)){window.earnAmber(x.stake);S.chalLedger[k]='done';msgs.push('Your challenge with '+other+' didn\'t go ahead: '+x.stake+' amber back');}
    else if(x.status==='settled'){S.chalLedger[k]='done';
      if(x.winner===user.id){window.earnAmber(x.stake*2);msgs.push('🏆 You beat '+other+'! +'+x.stake*2+' amber');}
      else if(!x.winner){window.earnAmber(x.stake);msgs.push('A draw with '+other+': '+x.stake+' amber back');}
      else msgs.push(other+' won your challenge this time. Rematch?');}});
  if(msgs.length){window.save();toast(msgs[0]);}}
function openChallenge(pid){const nick=nameOf(pid);const have=window.amberBalance();
  if(chals.some(x=>x.week_start===monday()&&['pending','accepted'].includes(x.status)&&[x.from_id,x.to_id].includes(pid)))return toast('You already have a challenge with '+nick+' this week');
  const ov=document.createElement('div');ov.className='league-pop';let stake=0;
  ov.innerHTML='<div class="card" role="dialog" aria-label="Friend challenge"><h2>Challenge '+esc(nick)+'</h2><p class="note">Whoever earns more XP by Sunday night wins both stakes. '+esc(nick)+' has to accept first, and you get your amber back if they don\'t.</p>'+
    '<div class="stakes">'+[10,20,30,50].map(n=>'<button type="button" class="chip" data-st="'+n+'"'+(n>have?' disabled':'')+'>'+n+' amber</button>').join('')+'</div><p class="note">You have '+have+' amber.</p>'+
    '<div class="row2"><button type="button" class="btn ghost" data-x>Cancel</button><button type="button" class="btn amber" data-go disabled>Send challenge</button></div></div>';
  document.body.appendChild(ov);
  ov.querySelectorAll('[data-st]').forEach(b=>b.onclick=()=>{stake=Number(b.dataset.st);ov.querySelectorAll('[data-st]').forEach(x=>x.classList.toggle('in',x===b));ov.querySelector('[data-go]').disabled=false;});
  ov.querySelector('[data-x]').onclick=()=>ov.remove();ov.onclick=e=>{if(e.target===ov)ov.remove();};
  ov.querySelector('[data-go]').onclick=async()=>{if(!window.spendAmber(stake))return;ov.remove();
    const {data,error}=await sb.from('gintaras_challenges').insert({to_id:pid,stake,week_start:monday()}).select().single();
    if(error){window.earnAmber(stake);return toast(/duplicate|unique/i.test(error.message)?'You already challenged '+nick+' this week':'Could not send: '+error.message);}
    window.S.chalLedger=Object.assign(window.S.chalLedger||{},{[data.id]:'staked'});window.save();toast('Challenge sent to '+nick+'!');renderBoard();};}
async function answerChallenge(id,status){const x=chals.find(y=>y.id===id);if(!x)return;
  if(status==='accepted'&&!window.spendAmber(x.stake))return;
  const {error}=await sb.from('gintaras_challenges').update({status}).eq('id',id);
  if(error){if(status==='accepted')window.earnAmber(x.stake);return toast('Could not answer: '+error.message);}
  const S=window.S;S.chalLedger=S.chalLedger||{};
  if(status==='accepted')S.chalLedger[id]='staked';
  if(status==='cancelled'&&S.chalLedger[id]==='staked'){window.earnAmber(x.stake);S.chalLedger[id]='done';}
  window.save();toast(status==='accepted'?'Challenge on! Most XP by Sunday night wins.':status==='declined'?'Challenge declined':'Challenge cancelled, amber back');renderBoard();}
function renderChallenges(){const box=$('#chal-box');if(!box)return;if(!user){box.innerHTML='';return;}const me=user.id,wk=monday();
  const rows=chals.map(x=>{const mine=x.from_id===me,other=mine?x.to_id:x.from_id,nick=esc(nameOf(other));
    if(x.status==='pending'&&!mine)return '<div class="chal-row"><span><b>'+nick+'</b> challenges you: <b>'+x.stake+' amber</b> on this week\'s XP.</span><span class="btns"><button type="button" class="chip" data-ans="accepted" data-id="'+x.id+'">Accept ('+x.stake+' amber)</button><button type="button" class="chip" data-ans="declined" data-id="'+x.id+'">No thanks</button></span></div>';
    if(x.status==='pending')return '<div class="chal-row"><span>Waiting for <b>'+nick+'</b> to accept ('+x.stake+' amber).</span><span class="btns"><button type="button" class="chip" data-ans="cancelled" data-id="'+x.id+'">Cancel</button></span></div>';
    if(x.status==='accepted'){const a=window.S.weekXp&&window.S.weekStart===wk?window.S.weekXp:0,b=weekXpOf(other);
      return '<div class="chal-row"><span>⚔️ <b>You vs '+nick+'</b> · '+x.stake+' amber each</span><span>You <b>'+a+' XP</b> · '+nick+' <b>'+b+' XP</b> this week'+(a>b?' · you\'re ahead!':a<b?' · catch up!':'')+'</span></div>';}
    if(x.status==='settled'&&x.week_start>=new Date(Date.now()-14*86400000).toISOString().slice(0,10))
      return '<div class="chal-row"><span>'+(x.winner===me?'🏆 You beat <b>'+nick+'</b> (+'+x.stake*2+' amber)':!x.winner?'🤝 Draw with <b>'+nick+'</b>':'<b>'+nick+'</b> won last week\'s challenge')+'</span></div>';
    return '';}).filter(Boolean);
  box.innerHTML='<h2>Friend challenges</h2><p class="note">Tap any player above to challenge them. Whoever earns more XP this week wins both stakes.</p>'+(rows.length?'<div class="chal">'+rows.join('')+'</div>':'');
  box.querySelectorAll('[data-ans]').forEach(b=>b.onclick=()=>answerChallenge(Number(b.dataset.id),b.dataset.ans));}

/* ---------- leaderboard ---------- */
let boardMode='league';
async function renderBoard(){const box=$('#board');if(!box)return;
  if(!sb){box.innerHTML='<h2>League</h2><p class="note">Online accounts are not set up yet.</p>';return;}
  if(!navigator.onLine){box.innerHTML='<h2>League</h2><p class="note">You’re offline. Your league comes back when you reconnect, and your XP keeps counting in the meantime.</p>';return;}
  const mine=Math.max(0,Math.min(6,(profile&&profile.league)||0));const L=leagueOf(mine);
  box.innerHTML='<div class="seg"><button class="chip'+(boardMode==='league'?' in':'')+'" data-bm="league">My league</button><button class="chip'+(boardMode==='all'?' in':'')+'" data-bm="all">All time</button></div>'+
    (boardMode==='league'?'<div class="lg-head"><span class="lg-icon">'+L.icon+'</span><div><span class="eyebrow">This week · '+weekEndsIn()+'</span><h2>'+esc(L.lt)+' league</h2><small>'+esc(L.en)+' · league '+(mine+1)+' of 7</small></div></div>'+
      '<div class="ladder" aria-label="All leagues">'+LEAGUES.map((x,i)=>'<span class="'+(i===mine?'on':i<mine?'past':'')+'" title="'+esc(x.lt)+' ('+esc(x.en)+')">'+x.icon+'</span>').join('')+'</div>'+
      '<p class="note">Earn XP this week. The <b>top 3 move up</b> a league on Monday; no XP all week means moving down.</p>':'<h2>All time</h2>')+
    (user&&boardMode==='league'&&shieldOn()?'<p class="note shield-note">🛡️ Your league is shielded this week: you can\'t move down.</p>':'')+'<p class="note" id="board-note">Loading…</p><ol class="lb" id="lb"></ol><div id="chal-box"></div><div id="board-cta"></div><button type="button" class="btn ghost" id="board-invite" data-share>Invite friends to race you</button>';
  box.querySelectorAll('[data-bm]').forEach(b=>b.onclick=()=>{boardMode=b.dataset.bm;renderBoard();});
  const cta=$('#board-cta');
  if(!user){cta.innerHTML='<button type="button" class="btn amber" id="btn-join">Sign in to join a league</button>';$('#btn-join').onclick=()=>{if(window.showView)window.showView('profile');};}
  await ensureRollover();await loadChallenges();
  const cols='id,nickname,xp,streak,week_xp,week_start,level_title,league';
  const {data,error}=boardMode==='league'?await sb.from('gintaras_profiles').select(cols).eq('league',mine).limit(200):await sb.from('gintaras_profiles').select(cols).order('xp',{ascending:false}).limit(50);
  const note=$('#board-note'),ol=$('#lb');if(!note)return;
  if(error){note.textContent='Could not load the league. Check your connection and try again.';return;}
  renderChallenges();
  ol.onclick=e=>{const li=e.target.closest('li[data-pid]');if(li)openChallenge(li.dataset.pid);};
  data.forEach(r=>{people[r.id]=Object.assign(people[r.id]||{},r);});
  if(boardMode==='all'){if(!data.length){note.textContent='No players yet. Be the first!';return;}note.textContent='';
    ol.innerHTML=data.map((r,i)=>row(r,i,r.xp,'')).join('');return;}
  const wk=monday();const rows=data.map(r=>Object.assign(r,{wxp:r.week_start===wk?r.week_xp:0})).sort((a,b)=>b.wxp-a.wxp||a.nickname.localeCompare(b.nickname));
  if(!rows.length){note.textContent='Nobody here yet. Sign in and you start in this league.';return;}
  note.textContent='';const n=rows.length;
  ol.innerHTML=rows.map((r,i)=>{const up=mine<6&&i<3&&r.wxp>0;const down=mine>0&&(r.wxp===0||(n>=10&&i>=n-3));
    return (i===3&&mine<6&&rows[0].wxp>0?'<li class="zone up-line">▲ Top 3 move up</li>':'')+row(r,i,r.wxp,up?'up':down?'down':'');}).join('')+
    (mine>0&&rows.some(r=>r.wxp===0)?'<li class="zone down-line">▼ No XP this week means moving down</li>':'');}
function row(r,i,pts,zone){const ch=user&&profile&&r.id!==user.id;return '<li class="'+(user&&r.id===user.id?'me ':'')+(ch?'can-ch ':'')+zone+'"'+(ch?' data-pid="'+r.id+'" title="Challenge '+esc(r.nickname)+'"':'')+'><span class="rk num">'+(i+1)+'</span><span class="nm"><strong>'+esc(r.nickname)+'</strong><small>'+leagueOf(r.league).icon+' '+esc(leagueOf(r.league).lt)+(r.streak?' · '+r.streak+' day streak':'')+(ch?' · <span class="chbtn">⚔️ Challenge</span>':'')+'</small></span><span class="pts num">'+pts+' XP</span></li>';}

/* ---------- boot ---------- */
function boot(){if(!sb){const tab=$('#tab-board');if(tab)tab.hidden=true;renderAuth();return;}
  sb.auth.onAuthStateChange((ev,session)=>{if(ev==='SIGNED_IN'&&session&&(!user||user.id!==session.user.id)){user=session.user;afterAuth();}});
  loadSession().then(()=>{sendReports();const S=window.S;if(!user&&S&&S.welcomed&&!S.signinAsked&&navigator.onLine&&window.openSignin)window.openSignin('returning');});}
if(window.gintarasReady)boot();else window.addEventListener('gintaras:ready',boot);
window.addEventListener('online',()=>{if(sb&&user)cloudSave();renderBoard();});
window.addEventListener('gintaras:xp',e=>{const S=window.S;const wk=monday();if(S.weekStart!==wk){S.weekStart=wk;S.weekXp=0;}S.weekXp=(S.weekXp||0)+e.detail;});
document.addEventListener('click',e=>{if(e.target.closest('#tab-board'))renderBoard();});
})();
