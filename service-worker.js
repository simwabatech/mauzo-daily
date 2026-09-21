const CACHE_NAME = 'mauzo-daily-v1';

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

// Network-first: app inatumia data ya moja kwa moja (Firestore), kwa hiyo
// hatuhifadhi kurasa kwenye cache kwa muda mrefu — tunaruhusu tu app
// kutambulika kama "installable" na kufanya kazi vizuri offline kidogo.
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
