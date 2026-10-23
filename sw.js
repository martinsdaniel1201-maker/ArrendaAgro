const V='arr-v5',F=['./','./index.html','./manifest.webmanifest','./icon-192.png?v=3','./icon-512.png?v=3'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(caches.match(e.request).then(m=>m||fetch(e.request).then(r=>{if(r.ok&&(r.type==='basic'||r.type==='cors')){const c=r.clone();caches.open(V).then(x=>x.put(e.request,c))}return r}).catch(()=>e.request.mode==='navigate'?caches.match('./index.html'):undefined)))});
