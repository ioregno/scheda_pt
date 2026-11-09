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

// ---------- intro ----------
// ctx dalla pagina Coach: {C, $, esc, toast, crea(profilo), annulla, haMacchine(palestra)}
const wz = {step: 0, p: null, ritorno: false};
const P0 = () => ({nome: '', palestra: '', citta: '', allenamenti: 3, volte: 3});
export function avvia(profilo, ritorno){
  wz.p = Object.assign(P0(), profilo ? JSON.parse(JSON.stringify(profilo)) : {});
  wz.step = 0; wz.ritorno = !!ritorno;
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
}
export function click(ctx, t){
  const p = wz.p, w = t.dataset.w, val = t.dataset.val;
  leggi(ctx);
  if (w === 'next') {
    if (!p.palestra) { ctx.toast('Scegli la tua palestra'); return true; }
    wz.step = 1; render(ctx); scrollTo(0, 0); return true;
  }
  if (w === 'prev') { wz.step = 0; render(ctx); scrollTo(0, 0); return true; }
  if (w === 'esci') { ctx.annulla(); return true; }
  if (w === 'palestra') { p.palestra = val; wz.altra = false; render(ctx); return true; }
  if (w === 'altra') { p.palestra = ''; wz.altra = true; render(ctx); const i = ctx.$('wzPal'); if (i) i.focus(); return true; }
  if (w === 'allenamenti' || w === 'volte') { p[w] = +val; render(ctx); return true; }
  if (w === 'crea') { ctx.crea(JSON.parse(JSON.stringify(p))); return true; }
  return false;
}
function leggi(ctx){
  const n = ctx.$('wzNome'); if (n) wz.p.nome = n.value.trim();
  const g = ctx.$('wzPal'); if (g && g.value.trim()) wz.p.palestra = g.value.trim();
}
export function input(ctx){ leggi(ctx); return true; }
export function riassunto(p){
  if (!p) return '';
  return [p.palestra, p.volte ? p.volte + ' volte a settimana' : ''].filter(Boolean).join(' · ');
}
