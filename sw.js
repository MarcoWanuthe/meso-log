// MESO-LOG Service Worker v3.1 "Alvorada" — cache bump
const CACHE_NAME = 'meso-log-v4';
const APP_SHELL = ['/meso-log/meso-log.html','/meso-log/manifest.json'];

self.addEventListener('install', evt => {
  self.skipWaiting();
  evt.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL).catch(e=>console.warn('[SW] cache err:',e))));
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch', evt => {
  const url = new URL(evt.request.url);
  if(evt.request.method!=='GET') return;
  if(url.hostname.includes('firebaseio.com')||url.hostname.includes('googleapis.com')||
     url.hostname.includes('emailjs.com')||url.hostname.includes('cdn.jsdelivr.net')||
     url.hostname.includes('gstatic.com')) return;
  evt.respondWith(
    caches.match(evt.request).then(cached=>{
      if(cached) return cached;
      return fetch(evt.request).then(res=>{
        if(res&&res.status===200&&res.type==='basic'){
          const clone=res.clone();
          caches.open(CACHE_NAME).then(c=>c.put(evt.request,clone));
        }
        return res;
      }).catch(()=>{ if(evt.request.mode==='navigate') return caches.match('/meso-log/meso-log.html'); });
    })
  );
});

self.addEventListener('sync', evt => {
  if(evt.tag==='meso-sync'){
    evt.waitUntil(self.clients.matchAll().then(cs=>cs.forEach(c=>c.postMessage({type:'SYNC_READY'}))));
  }
});

self.addEventListener('message', evt => {
  if(evt.data&&evt.data.type==='SKIP_WAITING') self.skipWaiting();
});