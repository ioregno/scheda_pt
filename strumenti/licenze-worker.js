// CODICI DI ATTIVAZIONE: piccolo server che controlla che ogni codice venduto sia usato al massimo su N telefoni.
// L'app, al primo avvio, chiede il codice e lo manda qui; poi funziona anche offline e ricontrolla ogni tanto quando c'è rete.
//
// Come metterlo online (gratis) con Cloudflare Workers:
//   1. dash.cloudflare.com > Storage & Databases > KV > Create: chiamalo "licenze"
//   2. Workers & Pages > Create > Worker: incolla questo file e premi Deploy
//   3. nel worker, Settings > Bindings > Add > KV namespace: nome variabile LICENZE, namespace "licenze"
//   4. Settings > Variables and Secrets:
//        segreto ADMIN   = una password lunga, solo tua (serve per creare i codici)
//        variabile ORIGINE = indirizzo dell'app, es. https://latuascheda.pages.dev (più indirizzi separati da virgola)
//   5. copia l'indirizzo del worker (es. https://licenze.tuonome.workers.dev) nel campo "licenze" di config.js
// Per creare e gestire i codici apri l'indirizzo del worker con /admin alla fine e inserisci la password ADMIN.
//
// Limiti gratis di Cloudflare: 100.000 richieste e 1.000 attivazioni al giorno. Non costa niente.

const ALFA = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';   // niente 0/O e 1/I/L, per non sbagliare a scriverlo
const rnd = n => { const b = crypto.getRandomValues(new Uint8Array(n)); return Array.from(b, x => ALFA[x % ALFA.length]).join(''); };
const nuovoCodice = () => rnd(4) + '-' + rnd(4) + '-' + rnd(4);
const pulisci = c => String(c || '').toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/^(.{4})(.{4})(.{4})$/, '$1-$2-$3');
const json = (o, status, h) => new Response(JSON.stringify(o), {status: status || 200, headers: Object.assign({'content-type': 'application/json'}, h || {})});

async function leggi(env, codice){ const r = await env.LICENZE.getWithMetadata('c:' + codice, 'json'); return r.value; }
async function scrivi(env, codice, v){
  await env.LICENZE.put('c:' + codice, JSON.stringify(v), {metadata: {nota: (v.nota || '').slice(0, 80), n: v.tel.length, max: v.max, b: v.bloccato ? 1 : 0, d: v.creato}});
}

export default {
  async fetch(req, env){
    const url = new URL(req.url), via = url.pathname.replace(/\/+$/, '') || '/';
    const permesse = String(env.ORIGINE || '').split(',').map(s => s.trim()).filter(Boolean);
    const da = req.headers.get('origin') || '';
    const cors = {'access-control-allow-origin': permesse.includes(da) ? da : (permesse[0] || '*'), 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type', 'vary': 'origin'};

    if (via === '/admin' && req.method === 'GET') return new Response(ADMIN_HTML, {headers: {'content-type': 'text/html; charset=utf-8'}});
    if (via === '/admin/api' && req.method === 'POST') return admin(req, env);

    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (req.method !== 'POST' || (via !== '/attiva' && via !== '/verifica')) return new Response('Non trovato', {status: 404});
    if (permesse.length && !permesse.includes(da)) return json({errore: 'origine'}, 403, cors);
    let b; try { b = await req.json(); } catch (e) { return json({errore: 'richiesta'}, 400, cors); }
    const codice = pulisci(b.codice);
    if (!/^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/.test(codice)) return json({errore: 'codice'}, 404, cors);
    const v = await leggi(env, codice);
    if (!v || v.bloccato) return json({errore: 'codice'}, 404, cors);

    if (via === '/verifica') {
      const ok = v.tel.some(t => t.token === String(b.token || ''));
      return json({ok}, 200, cors);
    }
    // /attiva: stesso telefono = stesso token; telefono nuovo solo se c'è posto
    const disp = String(b.dispositivo || '').slice(0, 64);
    if (!disp) return json({errore: 'richiesta'}, 400, cors);
    const gia = v.tel.find(t => t.id === disp);
    if (gia) return json({ok: true, token: gia.token, nota: v.nota || ''}, 200, cors);
    if (v.tel.length >= v.max) return json({errore: 'pieno', max: v.max}, 409, cors);
    const t = {id: disp, token: rnd(24), quando: new Date().toISOString().slice(0, 16), tipo: String(b.tipo || '').slice(0, 40)};
    v.tel.push(t); await scrivi(env, codice, v);
    return json({ok: true, token: t.token, nota: v.nota || ''}, 200, cors);
  }
};

async function admin(req, env){
  if (!env.ADMIN || req.headers.get('x-admin') !== env.ADMIN) return json({errore: 'password'}, 401);
  let b; try { b = await req.json(); } catch (e) { return json({errore: 'richiesta'}, 400); }
  if (b.azione === 'crea') {
    const quanti = Math.max(1, Math.min(50, +b.quanti || 1)), max = Math.max(1, Math.min(10, +b.max || 2)), out = [];
    for (let i = 0; i < quanti; i++) {
      let c; do { c = nuovoCodice(); } while (await env.LICENZE.get('c:' + c));
      await scrivi(env, c, {nota: String(b.nota || '').slice(0, 200), max, tel: [], bloccato: false, creato: new Date().toISOString().slice(0, 10)});
      out.push(c);
    }
    return json({codici: out});
  }
  if (b.azione === 'lista') {
    const out = []; let cursor;
    do { const r = await env.LICENZE.list({prefix: 'c:', cursor}); r.keys.forEach(k => out.push(Object.assign({codice: k.name.slice(2)}, k.metadata || {}))); cursor = r.list_complete ? null : r.cursor; } while (cursor);
    return json({codici: out});
  }
  const codice = pulisci(b.codice), v = await leggi(env, codice);
  if (!v) return json({errore: 'codice'}, 404);
  if (b.azione === 'vedi') return json(Object.assign({codice}, v, {tel: v.tel.map(t => ({quando: t.quando, tipo: t.tipo}))}));
  if (b.azione === 'libera') { v.tel = []; await scrivi(env, codice, v); return json({ok: true}); }
  if (b.azione === 'blocca') { v.bloccato = !!b.si; await scrivi(env, codice, v); return json({ok: true}); }
  if (b.azione === 'elimina') { await env.LICENZE.delete('c:' + codice); return json({ok: true}); }
  return json({errore: 'azione'}, 400);
}

const ADMIN_HTML = `<!doctype html><html lang="it"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Codici di attivazione</title><style>
[hidden]{display:none!important}
body{font:15px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;margin:0;background:#F4EFE7;color:#1d1b18}
main{max-width:640px;margin:0 auto;padding:20px 16px 60px}h1{font:600 26px/1.2 ui-serif,Georgia,serif;margin:8px 0 16px}
.card{background:#fff;border-radius:18px;padding:16px;margin:0 0 14px;display:grid;gap:10px}
label{display:grid;gap:4px;font-size:13px;color:#6b645a}input{font:16px/1.3 inherit;padding:10px 12px;border:1.5px solid #d8cfc2;border-radius:12px;background:#faf7f2;color:inherit}
.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}button{font:600 15px/1 inherit;padding:12px 16px;border-radius:999px;border:1.5px solid #9c8463;background:#9c8463;color:#fff;cursor:pointer}
button.g{background:transparent;color:#1d1b18;border-color:#d8cfc2}button.s{padding:7px 11px;font-size:13px}
.new{font:600 18px/1.6 ui-monospace,Menlo,monospace;user-select:all;background:#faf7f2;border-radius:12px;padding:10px 12px;white-space:pre-wrap}
table{width:100%;border-collapse:collapse;font-size:14px}td,th{padding:8px 4px;border-bottom:1px solid #eee5d8;text-align:left;vertical-align:top}
td.c{font:600 13px/1.3 ui-monospace,Menlo,monospace;white-space:nowrap}.m{color:#6b645a;font-size:13px}.err{color:#b3261e}.b{text-decoration:line-through;opacity:.6}
</style></head><body><main>
<h1>Codici di attivazione</h1>
<div class="card" id="login"><label>Password (ADMIN)<input id="pw" type="password" autocomplete="current-password"></label><button id="entra">Entra</button><div id="e0" class="err"></div></div>
<div id="app" hidden>
<div class="card"><b>Nuovo codice</b><label>A chi lo dai (nome, telefono, ordine…)<input id="nota" placeholder="Es. Maria Rossi, 333…"></label>
<div class="two"><label>Telefoni per codice<input id="max" type="number" min="1" max="10" value="2"></label><label>Quanti codici<input id="quanti" type="number" min="1" max="50" value="1"></label></div>
<button id="crea">Crea</button><div id="nuovi"></div></div>
<div class="card"><b>Codici creati</b><p class="m" style="margin:0">"Libera" toglie i telefoni attivati (per chi cambia telefono): sul vecchio l'app si blocca alla prossima connessione. "Blocca" ferma il codice.</p><div id="lista">…</div></div>
</div>
<script>
var PW = sessionStorage.getItem('pw') || '';
function api(o){ return fetch('/admin/api', {method:'POST', headers:{'content-type':'application/json','x-admin':PW}, body:JSON.stringify(o)}).then(function(r){ return r.json().then(function(j){ if(!r.ok) throw new Error(j.errore||r.status); return j; }); }); }
function esc(s){ return String(s==null?'':s).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }
function lista(){ api({azione:'lista'}).then(function(j){ var c=j.codici.sort(function(a,b){return (b.d||'').localeCompare(a.d||'');});
  document.getElementById('lista').innerHTML = c.length ? '<table><tr><th>Codice</th><th>Per</th><th>Telefoni</th><th></th></tr>' + c.map(function(x){ return '<tr class="'+(x.b?'b':'')+'"><td class="c">'+esc(x.codice)+'<div class="m">'+esc(x.d||'')+'</div></td><td>'+esc(x.nota||'')+'</td><td>'+(x.n||0)+' / '+(x.max||'?')+'</td><td><button class="g s" data-a="libera" data-c="'+esc(x.codice)+'">Libera</button> <button class="g s" data-a="blocca" data-si="'+(x.b?'':'1')+'" data-c="'+esc(x.codice)+'">'+(x.b?'Sblocca':'Blocca')+'</button></td></tr>'; }).join('') + '</table>' : '<p class="m">Ancora nessun codice.</p>'; }); }
function entra(){ api({azione:'lista'}).then(function(){ sessionStorage.setItem('pw',PW); document.getElementById('login').hidden=true; document.getElementById('app').hidden=false; lista(); }).catch(function(){ document.getElementById('e0').textContent='Password sbagliata (o ADMIN non impostato nel worker).'; }); }
document.getElementById('entra').onclick=function(){ PW=document.getElementById('pw').value; entra(); };
document.getElementById('crea').onclick=function(){ api({azione:'crea', nota:document.getElementById('nota').value, max:document.getElementById('max').value, quanti:document.getElementById('quanti').value}).then(function(j){ document.getElementById('nuovi').innerHTML='<div class="m">Copia e mandalo a chi ha pagato:</div><div class="new">'+j.codici.join('\\n')+'</div>'; document.getElementById('nota').value=''; lista(); }); };
document.getElementById('lista').onclick=function(e){ var b=e.target.closest('button'); if(!b) return; if(b.dataset.a==='libera' && !confirm('Liberare i telefoni di '+b.dataset.c+'?')) return; api({azione:b.dataset.a, codice:b.dataset.c, si:!!b.dataset.si}).then(lista); };
if (PW) entra();
</script></main></body></html>`;
