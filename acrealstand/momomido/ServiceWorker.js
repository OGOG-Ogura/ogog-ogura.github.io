const cacheName = "OguLabo-AcRealStand-0.1.0";
const contentToCache = [
    "Build/e4044ed6d85cd18ecb2c6e50e8b6b269.loader.js",
    "Build/3b13978925d26f7ea8c4daf048d98b2f.framework.js",
    "Build/55b36d5c9f52dfa51b35e2aa7a3bb628.data",
    "Build/5ec94abe809cb0e83f6df5af4a3b5ddd.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
