/* Gintaras service worker: lets the app install, and open without signal.
   - The page and its scripts: network first, so updates arrive as soon as you are online; the saved copy is the fallback.
   - Audio: each file is saved the first time it plays, then served from the device. The player asks for byte
     ranges, so ranges are cut from the saved file.
   - Fonts and the sign-in library from CDNs: saved copy first.
   - Supabase (accounts, leaderboard) is never touched.
   - Notifications: a push shows on the phone, unless the app is open on screen, which then shows it itself. */
const SHELL = 'gintaras-shell-v112';
const AUDIO = 'gintaras-audio-v2';
const CDN = 'gintaras-cdn-v1';
const KEEP = [SHELL, AUDIO, CDN];
const CORE = ['./', 'index.html', 'lang/lt.js', 'avatars.js', 'cloud.js', 'config.js', 'manifest.json', 'icon.svg', 'gem.svg', 'icon-192.png', 'icon-512.png'];
const CDN_HOSTS = ['cdn.jsdelivr.net', 'fonts.googleapis.com', 'fonts.gstatic.com'];
const CDN_CORE = ['https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js'];

self.addEventListener('install', e => {
  e.waitUntil(Promise.all([
    caches.open(SHELL).then(c => c.addAll(CORE)),
    caches.open(CDN).then(c => c.addAll(CDN_CORE)).catch(() => {}),
  ]).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => !KEEP.includes(k)).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (url.pathname.endsWith('.mp3')) e.respondWith(audio(req));
    else e.respondWith(networkFirst(req));
  } else if (CDN_HOSTS.includes(url.hostname)) {
    e.respondWith(cacheFirst(req));
  }
});

async function networkFirst(req) {
  const cache = await caches.open(SHELL);
  try {
    // 'no-cache' asks the server whether the file changed, so an update shows up on the next open, not 10 minutes later.
    const res = await fetch(req, { cache: 'no-cache' });
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: true }) || (req.mode === 'navigate' && await cache.match('index.html'));
    if (hit) return hit;
    throw err;
  }
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
    return self.registration.showNotification(d.title || 'Gintaras', {
      body: d.body || '', icon: 'icon-192.png', badge: 'icon-192.png', tag: d.tag || 'gintaras', renotify: true, data: { tag: d.tag },
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
