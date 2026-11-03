// Copia offline dell'app: alla prima apertura salva pagine, config e foto; poi funziona senza rete.
// Se c'è rete prende la versione nuova (così gli aggiornamenti del coach arrivano da soli).
importScripts('config.js');
const VER = (self.CONFIG && self.CONFIG.versione) || '1';
const CACHE = 'scheda-pt-' + VER;
const FILES = ['./', 'index.html', 'coach.html', 'tema.css', 'config.js', 'manifest.webmanifest', 'icon-180.png', 'icon-512.png']
  .concat(((self.CONFIG && self.CONFIG.macchine) || []).map(m => m.foto).filter(Boolean));
self.addEventListener('install', e => {
  // una foto mancante non deve bloccare tutto: ognuna si salva per conto suo
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(FILES.map(f => c.add(f).catch(() => {})))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x.startsWith('scheda-pt-') && x !== CACHE).map(x => caches.delete(x)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(fetch(e.request).then(r => { if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); } return r; })
    .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('index.html'))));
});
