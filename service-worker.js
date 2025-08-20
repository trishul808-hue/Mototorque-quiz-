const CACHE_NAME = 'autoiq-cache-v1';
const PRECACHE_URLS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => (k !== CACHE_NAME) && caches.delete(k))))
    .then(self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        // Cache a copy for next time (only GETs)
        if (request.method === 'GET' && response && response.status === 200 && response.type === 'basic') {
          const respClone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, respClone));
        }
        return response;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
