/* Wordami service worker: lets the app install, and open without signal.
   - The page and its scripts: network first, so updates arrive as soon as you are online; the saved copy is the fallback.
   - Audio: each file is saved the first time it plays (or when the app saves what comes next), then served from the
     device. The player asks for byte ranges, so ranges are cut from the saved file.
   - Pictures: saved the first time they show, then served from the device (checked for a newer drawing once a visit).
   - Recordings and pictures keep the same cache name across updates, so an update never throws them away; only the
     page and its scripts (SHELL) are replaced with each version.
   - Fonts and the sign-in library from CDNs: saved copy first.
   - Supabase (accounts, leaderboard) is never touched.
   - Notifications: a push shows on the phone, unless the app is open on screen, which then shows it itself. */
const SHELL = 'gintaras-shell-v183';
const AUDIO = 'gintaras-audio-v2';
const CDN = 'gintaras-cdn-v1';
const PICS = 'gintaras-pics-v1';
const KEEP = [SHELL, AUDIO, CDN, PICS];
const CORE = ['./', 'index.html', 'lang/lt.js', 'avatars.js', 'cloud.js', 'config.js', 'manifest.json', 'icon.svg', 'gem.svg', 'icon-192.png', 'icon-512.png'];
const AMI_FILES = ["pics/ami/welcome.webp", "pics/ami/happy.webp", "pics/ami/cheer.webp", "pics/ami/think.webp", "pics/ami/rest.webp", "pics/ami/encourage.webp", "pics/ami/listen.webp", "pics/ami/speak.webp"];
CORE.push('wordami-icon-180.png','wordami-icon-192.png','wordami-icon-512.png','wordami-icon-maskable-192.png','wordami-icon-maskable-512.png');
const CDN_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const CDN_CORE = ['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];
// the app's fonts (the same address as in index.html), saved at install so even the first offline open has them
const FONT_CSS = 'https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Nunito:ital,wght@0,400;0,600;0,700;0,800;1,400&display=swap';

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([
    caches.open(SHELL).then(c => c.addAll(CORE)),
    caches.open(PICS).then(c => c.addAll(AMI_FILES)),
    caches.open(CDN).then(c => c.addAll(CDN_CORE)).catch(() => {}),
    saveFonts().catch(() => {}),
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(async keys => {
      // pictures saved by an older version (with the page, or with the recordings) move to their own cache first
      const pics = await caches.open(PICS);
      for (const k of keys.filter(k => k !== PICS && k !== CDN)) {
        const c = await caches.open(k);
        for (const r of await c.keys()) if (new URL(r.url).pathname.includes('/pics/')) {
          if (!(await pics.match(r.url))) { const hit = await c.match(r); if (hit) await pics.put(r.url, hit); }
          if (k === AUDIO) await c.delete(r);
        }
      }
      return Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k)));
    })
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.endsWith('.mp3')) e.respondWith(audio(req));
    else if (url.pathname.includes('/pics/')) e.respondWith(picture(req, e));
    else e.respondWith(networkFirst(req, e));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(cacheFirst(req));
  }
});

// (Round 12) set when the network was too slow and the saved copy stood in: for 20 seconds the app's files come from the
// device straight away (each one waited 3 s in turn, so opening on a weak signal took 10 s); fresh copies still land in the cache
let slowUntil = 0;
async function networkFirst(req, ev) {
  const cache = await caches.open(SHELL);
  const saved = async () => await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' && await cache.match('index.html'));
  // 'no-cache' asks the server whether the file changed, so an update shows up on the next open, not 10 minutes later.
  const net = fetch(req, { cache: 'no-cache' }).then(res => { if (res.ok) cache.put(req, res.clone()); return res; });
  if (ev) ev.waitUntil(net.catch(() => {}));
  if (Date.now() < slowUntil) { const hit = await saved(); if (hit) return hit; }
  let netDone = false; net.then(() => { netDone = true; }, () => {});
  // (Round 10) on a weak signal the network can hang for half a minute: after 3 seconds the saved copy is shown, and the
  // fresh one still lands in the cache for the next open
  const slow = new Promise(r => setTimeout(r, 3000)).then(saved).then(hit => { if (hit && !netDone) slowUntil = Date.now() + 20000; return hit || net; });
  try {
    return await Promise.race([net, slow]);
  } catch (err) {
    const hit = await saved();
    if (hit) return hit;
    throw err;
  }
}

// A picture: the saved copy straight away; once a visit it is also checked for a newer drawing in the background.
const checked = new Set();
async function picture(req, e) {
  const cache = await caches.open(PICS);
  const hit = await cache.match(req.url);
  const fresh = () => fetch(req.url, { cache: 'no-cache' }).then(res => { if (res.ok) cache.put(req.url, res.clone()); return res; });
  if (hit) {
    if (!checked.has(req.url)) { checked.add(req.url); e.waitUntil(fresh().catch(() => {})); }
    return hit;
  }
  checked.add(req.url);
  return fresh();
}

// The font stylesheet and its files for the letters the app uses (latin and latin-ext, which has ą č ę ė į š ų ū ž).
async function saveFonts() {
  const cache = await caches.open(CDN);
  // the saved font list when there is one (its files are what the page asks for), otherwise a fresh one
  const had = await cache.match(FONT_CSS);
  const res = had || await fetch(FONT_CSS);
  if (!res.ok) return;
  const css = await res.clone().text(), files = [];
  // (Round 12) latin and latin-ext, and the one small cyrillic file: it also holds the combining accent mark (U+0301) the
  // page uses, so the browser asks for it, and offline it was missing
  css.replace(/\/\*\s*(latin(?:-ext)?|cyrillic)\s*\*\/[^}]*?url\(([^)]+)\)/g, (m, sub, u) => { if (!files.includes(u)) files.push(u); });
  await Promise.all(files.map(async u => { if (!(await cache.match(u))) { const r = await fetch(u); if (r.ok) await cache.put(u, r); } }));
  if (!had) await cache.put(FONT_CSS, res);
}

async function cacheFirst(req) {
  const cache = await caches.open(CDN);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok || res.type === 'opaque') cache.put(req, res.clone());
  return res;
}

async function audio(req) {
  const cache = await caches.open(AUDIO);
  let full = await cache.match(req.url);
  if (!full) {
    try {
      const res = await fetch(req.url);
      if (!res.ok) return res;
      await cache.put(req.url, res.clone());
      full = res;
      // a newer recording of the same file replaces the old one
      const path = new URL(req.url).pathname;
      for (const k of await cache.keys()) if (new URL(k.url).pathname === path && k.url !== req.url) cache.delete(k);
    } catch (err) {
      return fetch(req);
    }
  }
  const range = req.headers.get('range');
  if (!range) return full;
  const buf = await full.arrayBuffer();
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  const len = buf.byteLength;
  // "bytes=-500" means the last 500 bytes
  let start = m[1] ? Number(m[1]) : m[2] ? Math.max(0, len - Number(m[2])) : 0;
  let end = m[1] && m[2] ? Math.min(Number(m[2]), len - 1) : len - 1;
  if (start >= len || end < start) return new Response(null, { status: 416, headers: { 'Content-Range': `bytes */${len}` } });
  return new Response(buf.slice(start, end + 1), {
    status: 206,
    headers: {
      'Content-Type': 'audio/mpeg',
      'Content-Range': `bytes ${start}-${end}/${buf.byteLength}`,
      'Content-Length': String(end - start + 1),
      'Accept-Ranges': 'bytes',
    },
  });
}

self.addEventListener('push', e => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) {}
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    // Skip the phone notification only when the app is open in front of you (it shows the message itself).
    const open = list.find(c => c.visibilityState === 'visible' && c.focused !== false);
    if (open) { open.postMessage({ type: 'gintaras-note' }); return; }
    return self.registration.showNotification(!d.title || d.title === 'Gintaras' ? 'Wordami' : d.title, {
      body: d.body || '', icon: 'wordami-icon-192.png', badge: 'wordami-icon-192.png', tag: d.tag || 'gintaras', renotify: true, data: { tag: d.tag },
    });
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  const tag = (e.notification.data && e.notification.data.tag) || '';
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    if (list.length) { list[0].postMessage({ type: 'gintaras-open', tag }); return list[0].focus(); }
    return self.clients.openWindow('./?from=' + tag);
  }));
});
