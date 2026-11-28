/* Offline helper for Kaden's Games.
   Pages: try the internet first so updates arrive, fall back to the saved copy when offline.
   Everything else (three.js, icons): use the saved copy, fetch it if missing.
   Bump VERSION when three.min.js or the icons change. */
const VERSION='kg-pages-v6',FONTS='kg-fonts';
const CORE=['./','index.html','hotel.html','mart.html','barber.html','icecream.html','kraft.html','three.min.js','manifest.json','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('kg-pages-')&&k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
const keep=(name,req,res)=>{if(res&&(res.ok||res.type==='opaque')){const c=res.clone();caches.open(name).then(ca=>ca.put(req,c))}return res};
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.origin===location.origin){
  const page=r.mode==='navigate'||u.pathname.endsWith('.html')||u.pathname.endsWith('/');
  if(page){e.respondWith(fetch(r).then(res=>keep(VERSION,r,res)).catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||caches.match('index.html'))));return}
  e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>keep(VERSION,r,res))));return}
 if(/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname))
  e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(m=>{const net=fetch(r).then(res=>keep(FONTS,r,res)).catch(()=>m);return m||net})))});
