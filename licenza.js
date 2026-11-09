// CODICE DI ATTIVAZIONE (facoltativo): solo se in config.js c'è "licenze" (indirizzo del server, strumenti/licenze-worker.js).
// Al primo avvio l'app chiede il codice ricevuto dopo l'acquisto; il server controlla che non sia già su troppi telefoni.
// Poi funziona anche offline e ogni 3 giorni, se c'è rete, ricontrolla (così un codice bloccato o liberato smette di funzionare).
// Non serve: alle demo (#prova, #esempio, prova.html) e ai clienti di un PT (scheda arrivata dal coach).
(function(){
  var C = window.CONFIG || {}, SRV = String(C.licenze || '').replace(/\/+$/, '');
  if (!SRV) return;
  var K = 'scheda-licenza-v1', KD = 'scheda-licenza-disp', OGNI = 3 * 864e5;
  var h = location.hash, pag = location.pathname.split('/').pop() || 'index.html';
  function get(k){ try { return localStorage.getItem(k); } catch (e) { return null; } }
  function set(k, v){ try { if (v == null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) {} }
  if (/^#(prova|esempio)/.test(h) || pag === 'prova.html' || pag === 'solo.html') return;
  if (pag === 'index.html') {
    // l'app del cliente: serve il codice solo nella versione da solo
    var sch = null; try { sch = JSON.parse(get('scheda-pt-scheda-v1')); } catch (e) {}
    var solo = C.modo === 'solo' || get('scheda-pt-modo') === 'solo' || (sch && sch.solo);
    if (/^#s=/.test(h) || !solo) return;
  }
  var st = null; try { st = JSON.parse(get(K)); } catch (e) {}
  function disp(){ var d = get(KD); if (!d) { d = ''; var a = 'abcdefghijkmnpqrstuvwxyz23456789', b = new Uint8Array(16); crypto.getRandomValues(b); for (var i = 0; i < 16; i++) d += a[b[i] % a.length]; set(KD, d); } return d; }
  function post(via, body){
    return fetch(SRV + via, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify(body)})
      .then(function(r){ return r.json().catch(function(){ return {}; }).then(function(j){ j._s = r.status; return j; }); });
  }

  if (st && st.token) {
    // già attiva: controllo in silenzio ogni tanto; senza rete o se il server non risponde si continua a usarla
    if (navigator.onLine !== false && Date.now() - (st.verificata || 0) > OGNI) {
      post('/verifica', {codice: st.codice, token: st.token}).then(function(j){
        if (j.ok) { st.verificata = Date.now(); set(K, JSON.stringify(st)); }
        else if (j._s === 200 || j._s === 404) { set(K, null); blocca('Il codice di questa app non è più attivo su questo telefono.'); }
      }).catch(function(){});
    }
    return;
  }
  blocca('');

  function blocca(motivo){
    if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', function(){ blocca(motivo); }); return; }
    if (document.getElementById('licenza')) return;
    var ios = /iPhone|iPad/.test(navigator.userAgent) && !navigator.standalone;
    var wa = String(C.assistenza || '').replace(/\D/g, '');
    var s = document.createElement('style');
    s.textContent = '#licenza{position:fixed;inset:0;z-index:2147483000;overflow:auto;background:var(--bg,#F4EFE7);color:var(--ink,#1d1b18);padding:max(28px,env(safe-area-inset-top)) 16px 40px;font:400 16px/1.45 var(--body,-apple-system,sans-serif)}' +
      '#licenza .in{max-width:440px;margin:0 auto;display:grid;gap:16px}#licenza h2{font:500 34px/1.1 var(--display,ui-serif,Georgia,serif);margin:4px 0 0}' +
      '#licenza p{margin:0}#licenza .ey{font:500 12px/1.25 var(--body,sans-serif);letter-spacing:.18em;text-transform:uppercase;color:var(--muted,#6b645a)}' +
      '#licenza input{font:600 22px/1.2 ui-monospace,Menlo,monospace;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:16px 12px;border-radius:16px;border:1.5px solid var(--line2,#d8cfc2);background:var(--surface,#fff);color:inherit;width:100%;box-sizing:border-box}' +
      '#licenza .hint{font-size:14px;color:var(--muted,#6b645a)}#licenza .err{color:#C0392B;font-weight:600;min-height:1.4em}#licenza a{color:inherit}';
    var d = document.createElement('div'); d.id = 'licenza'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
    d.innerHTML = '<div class="in"><div class="ey">' + esc(C.app || 'La tua scheda') + '</div><h2>Attiva l\'app</h2>' +
      '<p>' + (motivo ? esc(motivo) + ' ' : '') + 'Scrivi il codice che hai ricevuto dopo l\'acquisto. Serve internet solo adesso: dopo l\'app funziona anche offline.</p>' +
      (ios ? '<p class="hint">Su iPhone: prima aggiungi l\'app alla schermata Home (Condividi, poi "Aggiungi alla schermata Home") e attivala da lì. Se la attivi qui in Safari usi uno dei telefoni del tuo codice.</p>' : '') +
      '<input id="licCod" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="XXXX-XXXX-XXXX" aria-label="Codice di attivazione">' +
      '<button type="button" class="primary" id="licOk">Attiva</button><div class="err" id="licErr" role="alert"></div>' +
      (wa ? '<p class="hint">Non hai un codice o hai cambiato telefono? <a href="https://wa.me/' + wa + '?text=' + encodeURIComponent('Ciao, ho bisogno di un codice per l\'app ' + (C.app || 'della scheda')) + '">Scrivici su WhatsApp</a>.</p>'
          : '<p class="hint">Non hai un codice? Chiedilo a chi ti ha dato l\'app.</p>') + '</div>';
    document.head.appendChild(s); document.body.appendChild(d); document.documentElement.style.overflow = 'hidden';
    var inp = d.querySelector('#licCod'), ok = d.querySelector('#licOk'), err = d.querySelector('#licErr');
    inp.addEventListener('input', function(){
      var v = inp.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 12);
      inp.value = v.replace(/^(.{4})(.{1,4})?(.{1,4})?$/, function(_, a, b, c){ return a + (b ? '-' + b : '') + (c ? '-' + c : ''); });
      err.textContent = '';
    });
    inp.addEventListener('keydown', function(e){ if (e.key === 'Enter') attiva(); });
    ok.addEventListener('click', attiva);
    function attiva(){
      var cod = inp.value.trim();
      if (cod.replace(/-/g, '').length !== 12) { err.textContent = 'Il codice ha 12 lettere e numeri, es. ABCD-EF23-GH45.'; return; }
      ok.disabled = true; ok.textContent = 'Controllo…'; err.textContent = '';
      post('/attiva', {codice: cod, dispositivo: disp(), tipo: ios ? 'iPhone Safari' : (/iPhone|iPad/.test(navigator.userAgent) ? 'iPhone app' : /Android/.test(navigator.userAgent) ? 'Android' : 'altro')}).then(function(j){
        if (j.ok && j.token) {
          set(K, JSON.stringify({codice: cod, token: j.token, nota: j.nota || '', verificata: Date.now()}));
          d.remove(); s.remove(); document.documentElement.style.overflow = '';
          return;
        }
        err.textContent = j.errore === 'pieno' ? 'Questo codice è già attivo su ' + (j.max || 2) + ' telefoni. Se hai cambiato telefono scrivici e lo liberiamo.'
          : j.errore === 'origine' ? 'Questa copia dell\'app non è autorizzata.'
          : 'Codice non valido. Controlla di averlo scritto giusto.';
      }).catch(function(){ err.textContent = 'Non riesco a collegarmi. Serve internet per attivare l\'app (solo la prima volta).'; })
        .then(function(){ ok.disabled = false; ok.textContent = 'Attiva'; });
    }
  }
  function esc(x){ return String(x == null ? '' : x).replace(/[&<>"']/g, function(c){ return {'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]; }); }
})();
