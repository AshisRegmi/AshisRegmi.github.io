/* Emergency Quick Reference — offline-first service worker.
 * v2: network-first (always try for fresh content when online), cache as
 * fallback for offline emergencies. Bump CACHE when you change the app shell.
 */

const CACHE = 'emerg-ref-v2';

// Core app shell. Pre-cached on install; failures are tolerated so install
// never breaks when an asset is not present yet.
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
  // Only handle same-origin requests; let cross-origin pass through.
  if (url.origin !== self.location.origin) return;

  // Network-first: get fresh content when online, fall back to cache offline.
  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req))
  );
});
