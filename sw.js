// MESO-LOG Service Worker v6 — cache busted 2026-07-02
const CACHE_NAME = 'meso-log-v6';
const ASSETS = [
  '/meso-log/meso-log.html',
  '/meso-log/manifest.json'
];

// Instala e pré-cacheia os assets
self.addEventListener('install', event => {
  self.skipWaiting(); // força ativação imediata sem esperar fechar abas
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Ativa e apaga todos os caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim()) // assume controle imediato de todas as abas
  );
});

// Serve do cache com fallback para rede
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => {
      // Sempre busca versão atualizada em background (stale-while-revalidate)
      const fetchPromise = fetch(event.request).then(response => {
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
