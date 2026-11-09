// VERSIONE "DA SOLO": per chi si allena senza PT ma ha già una scheda (dal PT, dalla palestra, su carta).
// L'app non crea la scheda: te la fa seguire ogni giorno. La carica coach.html quando l'indirizzo è coach.html#solo
// (vedi solo.html). Intro corta: nome, palestra, quanti allenamenti; poi si copia la scheda nell'editor della pagina Coach
// e con "Usa questa scheda" va nell'app (index.html), come se arrivasse da un coach.
// (La prima versione con il generatore di schede è nel commit 5e4a1dc: giulio ha scelto di non crearle.)
import {ESERCIZI, CREDITI_GIF} from './solo-dati.js';
export {CREDITI_GIF};

// ---------- libreria degli esercizi: serve per le animazioni e i passi, non per scegliere ----------
export const LIBRERIA = ESERCIZI.trim().split('\n').map(r => {
  const f = r.split('|');
  return {k: f[0], n: f[1], g: f[2].split(','), eq: f[3], re: f[7] ? new RegExp(f[7].replace(/\//g, '|'), 'i') : null,
    c: f[8] ? f[8].split(';') : [], p: f[9] || '', x: f[10] || '', t: f[11] || ''};
});
// macchine che il nome farebbe scambiare per un altro tipo (es. "Rear Delt Fly" non è una pectoral machine)
const NO = {c07: /rear|reverse|delt|lateral/i, c08: /inclin|declin|shoulder/i, x07: /bench|panca/i, q02: /calf/i, s02: /straight|pullover/i,
  s04: /upright|t-?bar/i, t10: /dip|push/i, b10: /leg|wrist/i, p01: /seated|sitting/i, q03: /back|lombar|tricep/i, h03: /chest/i};
const PANCA_OK = new Set(['s09', 'a06']);
// animazione e passi per una macchina scelta, solo se il disegno è lo stesso tipo di macchina
export function daMacchina(m){
  const nome = String(m.nome || '');
  return LIBRERIA.find(e => e.eq === 'M' && e.re && e.re.test(nome) && !(NO[e.k] && NO[e.k].test(nome)) && (m.tipo !== 'panca/rack' || PANCA_OK.has(e.k))) || null;
}
// esercizi senza macchina: nomi da suggerire mentre si scrive, e animazione se il nome coincide
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9àèéìòù]+/g, ' ').trim();
export const NOMI_LIBERI = LIBRERIA.filter(e => e.eq !== 'M').map(e => e.n);
export function daNome(n){ const k = norm(n); return k ? LIBRERIA.find(e => e.eq !== 'M' && norm(e.n) === k) || null : null; }

// ---------- palestre ----------
// catene italiane con almeno 30 sedi (Business Fit Consulting, classifiche low cost e budget/premium, dati al 31/05/2026)
// m: marche delle macchine che usa la catena, dove c'è una fonte (2026-11-09). Vuota = non si sa: si vedono tutte le marche.
//   Green Theory: sito della catena (Panatta, Diamond by Presti, Lacertosus). McFit: rsggroup.com (gym80). Virgin Active: Technogym (club Bocconi, rinnovo 2023).
//   Icon: schede dei club su Fitprime (Matrix, Technogym, Sterling). Anytime Fitness: Life Fitness / Hammer Strength (Padova, partnership hub). Orange: Technogym (club di Palermo).
export const CATENE = [
  {n: 'FitActive', m: []}, {n: 'Fit Up', m: []}, {n: 'Up Level', m: []},
  {n: 'Green Theory', m: ['Panatta', 'Diamond', 'Lacertosus']},
  {n: 'Anytime Fitness', m: ['Life Fitness', 'Hammer Strength']},
  {n: 'Icon', m: ['Matrix', 'Technogym']}, {n: 'Fit Express', m: []},
  {n: 'McFit', m: ['gym80']}, {n: 'Orange Palestre Italiane', m: ['Technogym']}, {n: 'Virgin Active', m: ['Technogym']}
];
const NOMI_CATENE = CATENE.map(c => c.n);
export const marcheDi = p => (CATENE.find(c => c.n.toLowerCase() === String(p || '').toLowerCase()) || {m: []}).m;

// ---------- lettura della scheda da foto (Claude) ----------
// Con "lettore" in config.js le foto vanno al tuo server (strumenti/lettore-worker.js, che tiene la chiave API);
// senza, per le prove, si può usare una chiave API salvata solo su questo telefono.
export const MODELLO = 'claude-sonnet-5-5';
function jpeg(file, max){
  return new Promise((ok, ko) => {
    const u = URL.createObjectURL(file), im = new Image();
    im.onload = () => {
      const k = Math.min(1, max / Math.max(im.naturalWidth, im.naturalHeight)), cv = document.createElement('canvas');
      cv.width = Math.round(im.naturalWidth * k); cv.height = Math.round(im.naturalHeight * k);
      cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height); URL.revokeObjectURL(u);
      ok(cv.toDataURL('image/jpeg', .85).split(',')[1]);
    };
    im.onerror = () => { URL.revokeObjectURL(u); ko(new Error('foto non leggibile')); };
    im.src = u;
  });
}
const PROMPT = () => 'Queste foto sono la scheda di allenamento di una persona (scritta a mano o stampata, anche su più pagine). Trascrivila fedelmente: non inventare e non aggiungere esercizi. ' +
  'Rispondi SOLO con un JSON, senza altro testo:\n' +
  '{"giorni":[{"nome":"nome dell\'allenamento come scritto (es. Giorno A, Petto e tricipiti)","esercizi":[{"nome":"nome dell\'esercizio come scritto, sistemato in italiano leggibile",' +
  '"attrezzo":"macchina|manubri|bilanciere|cavi|corpo libero|altro","tipo_en":"solo per le macchine: il tipo di macchina in inglese come lo scrivono i produttori (es. leg press, seated leg curl, lying leg curl, lat pulldown, chest press, pectoral, shoulder press, low row, leg extension, abductor, adductor, calf), altrimenti null",' +
  '"marca":"marca o modello se scritti, altrimenti null","serie":numero o null,"ripetizioni":"come scritte (es. 10, 8-10, 12/10/8, 30 sec) o null","recupero":"es. 90 sec, o null","note":"indicazioni scritte per l\'esercizio, o null",' +
  '"libreria":"il nome esatto dalla lista qui sotto se è lo stesso esercizio, altrimenti null"}]}],' +
  '"volte":numero di allenamenti a settimana se scritto, altrimenti null,"note":["indicazioni generali scritte sulla scheda"],"dubbi":["parole o numeri che non sei riuscito a leggere bene, con la tua ipotesi"]}\n' +
  'Se gli esercizi non sono divisi in giorni, metti un solo giorno. Superserie e circuiti: un esercizio per riga, con "superserie con ..." nelle note.\n\nLista esercizi:\n' +
  LIBRERIA.map(e => e.n).join('; ');
export async function leggiScheda(files, {url, chiave}){
  const imgs = [];
  for (const f of files.slice(0, 4)) imgs.push(await jpeg(f, 1600));
  const messages = [{role: 'user', content: imgs.map(d => ({type: 'image', source: {type: 'base64', media_type: 'image/jpeg', data: d}})).concat({type: 'text', text: PROMPT()})}];
  let r;
  if (url) r = await fetch(url, {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({messages})});
  else if (chiave) r = await fetch('https://api.anthropic.com/v1/messages', {method: 'POST',
    headers: {'content-type': 'application/json', 'x-api-key': chiave, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true'},
    body: JSON.stringify({model: MODELLO, max_tokens: 6000, messages})});
  else throw new Error('la lettura delle foto non è ancora attiva');
  if (!r.ok) throw new Error('il lettore ha risposto ' + r.status + (r.status === 401 ? ' (chiave non valida)' : r.status === 429 ? ' (troppe richieste, riprova tra poco)' : ''));
  const t = ((await r.json()).content || []).map(b => b.text || '').join('');
  const j = t.match(/\{[\s\S]*\}/); if (!j) throw new Error('risposta non leggibile');
  const o = JSON.parse(j[0]);
  if (!o || !Array.isArray(o.giorni) || !o.giorni.some(g => (g.esercizi || []).length)) throw new Error('nella foto non ho trovato esercizi');
  return o;
}
// dalla scheda letta agli esercizi dell'editor: macchina del catalogo (marche della palestra prima), o esercizio libero con animazione
export function trasforma(o, pool, palestra, gruppiOk){
  const marche = marcheDi(palestra).map(x => x.toLowerCase());
  const giorni = o.giorni.filter(g => (g.esercizi || []).length).slice(0, 6).map((g, gi) => ({
    id: 'g' + (gi + 1), nome: String(g.nome || 'Allenamento ' + String.fromCharCode(65 + gi)).slice(0, 40), nota: '', B: [], C: [],
    A: g.esercizi.slice(0, 15).map(x => esercizio(x, pool, marche, gruppiOk))
  }));
  return {giorni, volte: +o.volte || 0, note: (o.note || []).filter(Boolean).map(String), dubbi: (o.dubbi || []).filter(Boolean).map(String),
    controlla: giorni.reduce((n, g) => n + g.A.filter(e => e.chk).length, 0)};
}
function esercizio(x, pool, marche, gruppiOk){
  const e = {s: Math.max(1, Math.min(12, Math.round(+x.serie) || 3)), r: String(x.ripetizioni || '10').slice(0, 20)};
  const p = [x.note, x.recupero ? 'Recupero ' + x.recupero : ''].filter(Boolean).join(' · '); if (p) e.p = p;
  const lib = x.libreria ? daNome(x.libreria) : null;
  if (x.attrezzo === 'macchina' && !lib) {
    const t = trovaMacchina(x.tipo_en || x.nome, x.marca, pool, marche);
    if (t) {
      e.m = t.m.id; if (t.dubbio) e.chk = 1;
      e.g = (t.m.gruppi || []).filter(g => gruppiOk.includes(g));
      const d = daMacchina(t.m); if (d && d.x) { e.x = d.x; if (d.t) e.xt = d.t; }
      if (x.nome) e.p = [e.p, 'Sulla scheda: ' + x.nome].filter(Boolean).join(' · ');
      return e;
    }
  }
  e.n = String(x.nome || (lib && lib.n) || 'Esercizio').slice(0, 80);
  if (x.attrezzo === 'macchina' && !lib) e.chk = 1;   // macchina non trovata nel catalogo: da scegliere a mano
  if (lib) { if (lib.x) { e.x = lib.x; if (lib.t) e.xt = lib.t; } if (lib.c.length) e.c = lib.c.slice(); e.g = lib.g.filter(g => gruppiOk.includes(g)); if (!e.p && lib.p) e.p = lib.p; }
  return e;
}
const STOP = new Set(['machine', 'macchina', 'the', 'di', 'a', 'al', 'alla', 'con']);
function trovaMacchina(tipo, marca, pool, marche){
  const w = norm(tipo).split(' ').filter(x => x.length > 1 && !STOP.has(x));
  if (!w.length) return null;
  const mk = norm(marca);
  let c = pool.filter(m => { const n = norm(m.nome + ' ' + (m.linea || '')); return w.every(x => n.includes(x)); });
  if (!c.length) return null;
  const voto = m => (m.lib ? 4 : 0) + (mk && norm(m.marca).split(' ').some(x => x && mk.includes(x)) ? 3 : 0) + (marche.includes(String(m.marca || '').toLowerCase()) ? 2 : 0) - (m.stato ? 1 : 0) - norm(m.nome).split(' ').length * .1 - (/inclin|declin/.test(norm(m.nome)) && !/inclin|declin/.test(norm(tipo)) ? 1.2 : 0);
  c = c.map(m => ({m, v: voto(m)})).sort((a, b) => b.v - a.v);
  // sicura solo se è l'unica di quel tipo tra le macchine più probabili (prima quelle della palestra, poi le marche della catena)
  const top = c[0], pari = c.filter(x => x.v >= top.v - 1).length;
  return {m: top.m, dubbio: pari > 1};
}

// ---------- intro ----------
// ctx dalla pagina Coach: {C, $, esc, toast, crea(profilo), annulla}
const wz = {step: 0, p: null, ritorno: false, foto: [], stato: '', errore: ''};
const P0 = () => ({nome: '', palestra: '', citta: '', allenamenti: 3, volte: 3});
export function avvia(profilo, ritorno){
  wz.p = Object.assign(P0(), profilo ? JSON.parse(JSON.stringify(profilo)) : {});
  wz.step = 0; wz.ritorno = !!ritorno; wz.foto = []; wz.stato = ''; wz.errore = '';
}
export function render(ctx){
  const {$, esc} = ctx, p = wz.p || (avvia(), wz.p);
  const chip = (key, val, lab, on) => '<button type="button" class="wzopt" data-w="' + key + '" data-val="' + esc(val) + '" aria-pressed="' + !!on + '"><b>' + esc(lab) + '</b></button>';
  let h = '', foot = '';
  if (wz.step === 0) {
    const altra = p.palestra && !NOMI_CATENE.includes(p.palestra);
    const ios = /iPhone|iPad/.test(navigator.userAgent) && !navigator.standalone;
    h = '<section class="wzhero"><div class="eyebrow">Ti alleni da solo</div><h2>La tua scheda, facile ogni giorno</h2>' +
      '<p>Copia qui la scheda che hai già. L\'app ti dice cosa fare oggi, ti mostra macchine e movimenti e si ricorda i tuoi pesi. Anche senza internet.</p></section>' +
      '<div class="card"><label class="f">Come ti chiami?<input id="wzNome" value="' + esc(p.nome) + '" placeholder="Es. Marco" autocomplete="given-name"></label>' +
      '<div class="eyebrow">Dove ti alleni?</div><div class="wzchips wzwrap">' + NOMI_CATENE.map(c => chip('palestra', c, c, p.palestra === c)).join('') + chip('altra', '1', 'Un\'altra palestra', altra) + '</div>' +
      (altra || wz.altra ? '<label class="f">Nome della palestra<input id="wzPal" value="' + esc(altra ? p.palestra : '') + '" placeholder="Es. Palestra Olimpia" autocomplete="off"></label>' : '') +
      '</div>' +
      (ios ? '<p class="hint">Su iPhone: prima aggiungi l\'app alla schermata Home (Condividi, poi "Aggiungi alla schermata Home") e continua da lì, così la scheda resta nell\'app.</p>' : '');
    foot = wz.ritorno ? '<button type="button" class="primary" data-w="crea">Salva</button>' : '<button type="button" class="primary" data-w="next">Avanti</button>';
  } else if (wz.step === 1) {
    const prova = !ctx.lettore();
    h = '<h2>Carica la tua scheda</h2><p class="hint" style="margin:0">Fotografala con tutte le pagine: la leggo io e la trasformo. Dopo controlli e correggi quello che serve.</p>' +
      '<input type="file" id="wzFoto" accept="image/*" multiple hidden>' +
      (wz.foto.length ? '<div class="wzfoto">' + wz.foto.map((f, i) => '<span><img src="' + f.u + '" alt="Pagina ' + (i + 1) + '"><button type="button" data-w="togfoto" data-val="' + i + '" aria-label="Togli">×</button></span>').join('') + '</div>' : '') +
      (wz.stato === 'leggo' ? '<div class="card wzread"><b>Sto leggendo la scheda…</b><span class="hint">Di solito ci vogliono 20-40 secondi. Serve internet.</span></div>'
        : '<button type="button" class="' + (wz.foto.length ? 'ghost' : 'primary') + '" data-w="foto">' + (wz.foto.length ? '+ Un\'altra pagina' : 'Fotografa la scheda') + '</button>') +
      (wz.errore ? '<div class="card"><b>Non sono riuscito a leggerla</b><p class="hint" style="margin:0">' + esc(wz.errore) + '. Riprova con una foto più dritta e luminosa, oppure scrivila a mano.</p></div>' : '') +
      (prova ? '<details class="card"' + (ctx.chiave() ? '' : ' open') + '><summary><b>Lettura delle foto: modalità prova</b></summary><p class="hint">Il server che legge le foto non è ancora collegato (campo "lettore" in config.js). Per provarla adesso inserisci una chiave API di Anthropic: resta solo su questo telefono.</p>' +
        '<label class="f">Chiave API<input id="wzKey" type="password" autocomplete="off" placeholder="sk-ant-…" value="' + esc(ctx.chiave()) + '"></label></details>' : '') +
      '<button type="button" class="linkbtn wzmano" data-w="mano">Preferisci scriverla a mano?</button>';
    foot = wz.foto.length && wz.stato !== 'leggo' ? '<button type="button" class="primary" data-w="leggi">Leggi la scheda (' + wz.foto.length + (wz.foto.length === 1 ? ' foto' : ' foto') + ')</button>' : '';
  } else {
    h = '<h2>Com\'è la tua scheda?</h2>' +
      '<div class="card"><div class="eyebrow">Quanti allenamenti diversi ha</div><p class="hint" style="margin:0">Es. "giorno A, B e C" sono 3. Una scheda total body uguale tutti i giorni è 1.</p>' +
      '<div class="wzchips">' + [1, 2, 3, 4, 5].map(n => chip('allenamenti', n, String(n), p.allenamenti === n)).join('') + '</div>' +
      '<div class="eyebrow">Quante volte ti alleni a settimana</div><div class="wzchips">' + [2, 3, 4, 5, 6].map(n => chip('volte', n, String(n), p.volte === n)).join('') + '</div></div>' +
      '<p class="hint">Dopo copi gli esercizi: per ognuno la macchina (' + (ctx.haMacchine(p.palestra) ? 'quelle di ' + esc(p.palestra) + ' sono già pronte' : 'la cerchi per nome o la fotografi') + '), le serie e le ripetizioni.</p>';
    foot = '<button type="button" class="primary" data-w="crea">Scrivi la scheda</button>';
  }
  if (wz.step > 0 || wz.ritorno) h = '<div class="top">' + (wz.step > 0 ? '<button type="button" class="back" data-w="prev">‹ Indietro</button>' : '<span></span>') + (wz.ritorno ? '<button type="button" class="ghost small" data-w="esci">Annulla</button>' : '') + '</div>' + h;
  $('v').innerHTML = '<div class="wz">' + h + '</div>';
  $('foot').hidden = !foot; $('footIn').innerHTML = foot;
  const fi = $('wzFoto');
  if (fi) fi.onchange = () => { Array.from(fi.files || []).forEach(f => { if (wz.foto.length < 4) wz.foto.push({f, u: URL.createObjectURL(f)}); }); wz.errore = ''; render(ctx); };
}
export function click(ctx, t){
  const p = wz.p, w = t.dataset.w, val = t.dataset.val;
  leggi(ctx);
  if (w === 'next') {
    if (!p.palestra) { ctx.toast('Scegli la tua palestra'); return true; }
    wz.step = 1; render(ctx); scrollTo(0, 0); return true;
  }
  if (w === 'prev') { wz.step = wz.step === 2 ? 1 : 0; render(ctx); scrollTo(0, 0); return true; }
  if (w === 'mano') { wz.step = 2; render(ctx); scrollTo(0, 0); return true; }
  if (w === 'foto') { const f = ctx.$('wzFoto'); if (f) { f.value = ''; f.click(); } return true; }
  if (w === 'togfoto') { const x = wz.foto.splice(+val, 1)[0]; if (x) URL.revokeObjectURL(x.u); render(ctx); return true; }
  if (w === 'leggi') { leggiOra(ctx); return true; }
  if (w === 'esci') { ctx.annulla(); return true; }
  if (w === 'palestra') { p.palestra = val; wz.altra = false; render(ctx); return true; }
  if (w === 'altra') { p.palestra = ''; wz.altra = true; render(ctx); const i = ctx.$('wzPal'); if (i) i.focus(); return true; }
  if (w === 'allenamenti' || w === 'volte') { p[w] = +val; render(ctx); return true; }
  if (w === 'crea') { ctx.crea(JSON.parse(JSON.stringify(p))); return true; }
  return false;
}
async function leggiOra(ctx){
  if (!ctx.lettore() && !ctx.chiave()) { wz.errore = 'manca la chiave API per la prova (sezione qui sotto)'; render(ctx); return; }
  wz.stato = 'leggo'; wz.errore = ''; render(ctx);
  try {
    const o = await leggiScheda(wz.foto.map(x => x.f), {url: ctx.lettore(), chiave: ctx.chiave()});
    await ctx.loadCat();
    const out = trasforma(o, ctx.pool(wz.p.palestra), wz.p.palestra, ctx.GRUPPI);
    wz.stato = ''; wz.foto.forEach(x => URL.revokeObjectURL(x.u)); wz.foto = [];
    ctx.creaDaLettura(JSON.parse(JSON.stringify(wz.p)), out);
  } catch (e) { wz.stato = ''; wz.errore = String(e.message || e); render(ctx); }
}
function leggi(ctx){
  const k = ctx.$('wzKey'); if (k) ctx.chiave(k.value.trim());
  const n = ctx.$('wzNome'); if (n) wz.p.nome = n.value.trim();
  const g = ctx.$('wzPal'); if (g && g.value.trim()) wz.p.palestra = g.value.trim();
}
export function input(ctx){ leggi(ctx); return true; }
export function riassunto(p){
  if (!p) return '';
  return [p.palestra, p.volte ? p.volte + ' volte a settimana' : ''].filter(Boolean).join(' · ');
}
