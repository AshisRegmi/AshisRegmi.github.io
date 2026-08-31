/* Emergency Quick Reference — offline-first service worker */
/* Runs as a classic service-worker script in the browser. */

const CACHE = 'emerg-ref-v1';

// Core app shell. Pre-cached on install; failures are tolerated so install
// never breaks when an asset is not present yet (e.g. UI still in progress).
const CORE = [
  '/',
  'index.html',
  'assets/manifest.webmanifest',
  'assets/icon.svg',
  'sw.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => Promise.allSettled(
        CORE.map((url) => cache.add(url).catch(() => undefined))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Only handle same-origin requests; let cross-origin (e.g. maps) pass through.
  if (url.origin !== self.location.origin) return;

  // Navigations: try network first (fresh content), fall back to cached shell
  // so the app still opens offline in an emergency.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() =>
        caches.match('index.html').then((r) => r || caches.match('/'))
      )
    );
    return;
  }

  // Static assets: cache-first, then network, and populate the cache at runtime.
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((res) => {
          if (res && res.status === 200 && res.type === 'basic') {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
    })
  );
});
