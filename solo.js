// VERSIONE "DA SOLO": procedura guidata alla prima apertura e generatore della scheda.
// La carica coach.html quando l'indirizzo è coach.html#solo (vedi solo.html). La scheda creata va nell'editor
// della pagina Coach (modificabile) e poi, con "Usa questa scheda", nell'app (index.html), come se arrivasse da un coach.
import {ESERCIZI, PASSI_MACCHINA, CREDITI_GIF} from './solo-dati.js';
export {CREDITI_GIF};

// ---------- libreria ----------
export const LIBRERIA = ESERCIZI.trim().split('\n').map(r => {
  const f = r.split('|');
  return {k: f[0], n: f[1], g: f[2].split(','), eq: f[3], lv: +f[4], b: +f[5], z: f[6] ? f[6].split(',') : [],
    re: f[7] ? new RegExp(f[7].replace(/\//g, '|'), 'i') : null, c: f[8] ? f[8].split(';') : [], p: f[9] || '', x: f[10] || '', t: f[11] || '', r: f[12] || ''};
});
// macchine che il nome farebbe scambiare per un altro tipo (es. "Rear Delt Fly" non è una pectoral machine)
const NO = {c07: /rear|reverse|delt|lateral/i, c08: /inclin|declin|shoulder/i, x07: /bench|panca/i, q02: /calf/i, s02: /straight|pullover/i,
  s04: /upright|t-?bar/i, t10: /dip|push/i, b10: /leg|wrist/i, p01: /seated|sitting/i, q03: /back|lombar|tricep/i, h03: /chest/i};
// le panche che sono "macchine" a sé: hyperextension e panca per addominali
const PANCA_OK = new Set(['s09', 'a06']);

export const ZONE = [
  ['spalle', 'Spalle'], ['collo', 'Collo e cervicale'], ['schiena', 'Schiena bassa'],
  ['ginocchia', 'Ginocchia'], ['anche', 'Anche'], ['polsi', 'Polsi e gomiti']
];
export const OBIETTIVI = [
  ['dimagrire', 'Dimagrire', 'Perdere grasso e sentirti più leggero'],
  ['massa', 'Massa', 'Mettere su muscoli e forza'],
  ['tonificare', 'Tonificare', 'Rassodare e definire senza ingrossare'],
  ['salute', 'Salute', 'Stare bene, muoverti meglio, senza fretta']
];
export const LIVELLI = [
  [0, 'Mai fatto', 'Non mi sono mai allenato in sala pesi, o è passato tanto tempo'],
  [1, 'Qualche mese', 'Conosco le macchine principali'],
  [2, 'Più di un anno', 'Mi alleno con costanza']
];

// zone caricate da una macchina che non è in libreria, dal nome
const ZRE = [
  ['spalle', /shoulder|overhead|military|deltoid|lateral|\bdips?\b|fly|pec|butterfly|upright|pullover/i],
  ['collo', /shrug|upright|neck/i],
  ['schiena', /squat|dead|good morning|back ext|hyper|lombar|lower back|t-?bar|standing calf|belt/i],
  ['ginocchia', /squat|leg press|leg ext|hack|lunge|pendul|step|knee ext/i],
  ['anche', /abduct|adduct|hip|thigh/i],
  ['polsi', /\bdips?\b|tricep|french|curl(?!.*leg)(?!.*knee)|wrist/i]
];
const BASE_RE = /press|row|pull|squat|hack|\bdips?\b|chin|lunge|dead|thrust|pendul|belt/i, ISO_RE = /calf|curl|fly|ext|raise|lateral|abdom|crunch|delt/i;
const GRUPPI_OK = ['Petto', 'Spalle', 'Schiena', 'Trapezio', 'Tricipiti', 'Bicipiti', 'Quadricipiti', 'Femorali', 'Glutei', 'Adduttori', 'Lombari', 'Polpacci', 'Addominali'];

// cosa abilita una macchina scelta: cavi, multipower, panche, rack
function abilita(m, att){
  const n = (m.nome || '') + ' ' + (m.linea || '');
  if (m.tipo === 'cavi/multistazione' || /cable|crossover|pulley|functional|cavi/i.test(n)) att.C = 1;
  if (/smith|multipower/i.test(n)) att.S = 1;
  if (m.tipo === 'panca/rack') { if (/rack|cage|squat|platform/i.test(n)) att.B = 1; if (/bench|panca/i.test(n)) att.D = 1; if (/\bdips?\b|chin|pull ?up|parallel/i.test(n)) att.X = 1; }
}
// da una macchina scelta a un esercizio: prima la libreria (con GIF e passi), poi i muscoli del catalogo
export function daMacchina(m){
  const nome = String(m.nome || '');
  const lib = LIBRERIA.find(e => e.eq === 'M' && e.re && e.re.test(nome) && !(NO[e.k] && NO[e.k].test(nome)) && (m.tipo !== 'panca/rack' || PANCA_OK.has(e.k)));
  if (lib) return {key: 'm:' + m.id, m: m.id, g: lib.g, b: lib.b, lv: lib.lv, z: lib.z, c: lib.c, p: lib.p, x: lib.x, t: lib.t, r: lib.r, eq: 'M', lib: lib.k, tipo: m.tipo};
  if (m.tipo === 'panca/rack' || m.tipo === 'cavi/multistazione') return null;
  const g = (m.gruppi || []).filter(x => GRUPPI_OK.includes(x));
  if (!g.length) return null;
  const z = ZRE.filter(([, re]) => re.test(nome)).map(([k]) => k);
  if (/Quadricipiti/.test(g[0]) && !z.includes('ginocchia')) z.push('ginocchia');
  return {key: 'm:' + m.id, m: m.id, g, b: BASE_RE.test(nome) && !ISO_RE.test(nome) ? 1 : 0, lv: 0, z, c: PASSI_MACCHINA, p: '', x: '', t: '', r: '', eq: 'M', lib: '', tipo: m.tipo};
}

// ---------- schemi della settimana ----------
// [muscolo, base] in ordine di importanza: si prendono i primi che stanno nel tempo a disposizione
const S = (s) => s.split(' ').map(x => [{Q: 'Quadricipiti', F: 'Femorali', G: 'Glutei', P: 'Petto', D: 'Schiena', S: 'Spalle', B: 'Bicipiti', T: 'Tricipiti', A: 'Addominali', C: 'Polpacci', L: 'Lombari', R: 'Trapezio'}[x[0]], +x[1]]);
const SCHEMI = {
  FB1: ['Total body A', S('Q1 P1 D1 S1 F0 A0 B0 T0 C0 G0')],
  FB2: ['Total body B', S('D1 G1 P1 F0 S0 T0 B0 A0 Q0 C0')],
  FB3: ['Total body C', S('P1 Q1 D1 S1 G0 B0 T0 A0 F0 C0')],
  UA: ['Parte alta A', S('P1 D1 S1 P0 D1 T0 B0 S0 A0')],
  LA: ['Gambe A', S('Q1 F0 G1 Q0 C0 A0 G0 F0')],
  UB: ['Parte alta B', S('D1 P1 S1 D1 P0 B0 T0 S0 A0')],
  LB: ['Gambe B', S('G1 F0 Q1 F0 G0 C0 A0 Q0')],
  PUSH: ['Petto, spalle e tricipiti', S('P1 P1 S1 P0 S0 T0 T0 A0')],
  PULL: ['Schiena e bicipiti', S('D1 D1 D0 L0 B0 B0 S0 A0')],
  LEGS: ['Gambe', S('Q1 F0 Q0 G1 F0 C0 A0 G0')],
  PT: ['Petto e tricipiti', S('P1 P1 P0 T0 T0 A0 P0')],
  DB: ['Schiena e bicipiti', S('D1 D1 D0 B0 B0 L0 D0')],
  GQ: ['Gambe e quadricipiti', S('Q1 Q1 Q0 F0 C0 A0 G0')],
  SA: ['Spalle e addome', S('S1 S0 S0 R0 A0 A0 S0')],
  GG: ['Glutei e femorali', S('G1 F0 G0 F0 Q0 C0 A0')]
};
function schemaSettimana(p){
  const n = Math.max(2, Math.min(6, +p.giorni || 3));
  if (n === 2) return ['FB1', 'FB2'];
  if (n === 3) return p.livello >= 2 && p.obiettivo === 'massa' ? ['PUSH', 'PULL', 'LEGS'] : ['FB1', 'FB2', 'FB3'];
  if (n === 4) return ['UA', 'LA', 'UB', 'LB'];
  if (n === 5) return ['PT', 'DB', 'GQ', 'SA', 'GG'];
  return ['PUSH', 'PULL', 'LEGS', 'PUSH', 'PULL', 'LEGS'];
}

// serie e ripetizioni secondo obiettivo e livello
function dose(p, ex, slotBase){
  const L = +p.livello || 0, base = ex.b && slotBase, o = p.obiettivo;
  if (ex.r) return {s: L ? 3 : 2, r: ex.r};
  if (ex.g[0] === 'Addominali') return {s: L ? 3 : 2, r: '15'};
  if (ex.g[0] === 'Polpacci') return {s: 3, r: '15'};
  if (o === 'massa') return base ? {s: L ? 4 : 3, r: L >= 2 ? '6-8' : '8-10'} : {s: 3, r: '10-12'};
  if (o === 'dimagrire') return {s: base || L ? 3 : 2, r: base ? '12' : '15'};
  if (o === 'salute') return {s: L ? 3 : 2, r: base ? '10-12' : '12-15'};
  return {s: base || L ? 3 : 2, r: base ? '10-12' : '12-15'};   // tonificare
}
const RECUPERO = {massa: '90 secondi - 2 minuti sui primi esercizi, 60-90 secondi sugli altri', tonificare: '60-75 secondi', dimagrire: '45-60 secondi', salute: '60-90 secondi'};

// ---------- generatore ----------
// p: {nome, obiettivo, livello, giorni, minuti, macchine: [oggetti macchina], att: {D,B,C,S}, zone: []}
export function genera(p){
  const L = +p.livello || 0, zone = new Set(p.zone || []), att = Object.assign({D: 0, B: 0, C: 0, S: 0, X: 0}, p.att || {});
  const lvMax = p.obiettivo === 'salute' ? Math.min(L, 1) : L;
  (p.macchine || []).forEach(m => abilita(m, att));
  if (att.B) att.X = 1;   // dove c'è un rack di solito ci sono anche sbarra e parallele
  const libere = LIBRERIA.filter(e => e.eq !== 'M' && e.eq !== 'Z' && (e.eq === 'F' || att[e.eq]))
    .map(e => ({key: 'k:' + e.k, n: e.n, g: e.g, b: e.b, lv: e.lv, z: e.z, c: e.c, p: e.p, x: e.x, t: e.t, r: e.r, eq: e.eq, lib: e.k}));
  const macchine = [], viste = new Set();
  (p.macchine || []).forEach(m => { const c = daMacchina(m); if (c && !viste.has(c.key)) { viste.add(c.key); macchine.push(c); } });
  const ok = c => c.lv <= lvMax && !c.z.some(z => zone.has(z));
  const tutti = macchine.concat(libere).filter(ok);
  const tolti = macchine.concat(libere).filter(c => !ok(c) && c.z.some(z => zone.has(z))).length;

  const uso = {A: {}, B: {}, C: {}};   // quante volte un esercizio è già nella settimana, per variante
  const tipoUso = {};                  // stesso esercizio della libreria (es. due leg press diverse)
  const voto = (c, slot, v, gia, giaTipo, altri, prim) => {
    const [g, sb] = slot;
    let s = 0;
    if (c.g[0] === g || (g === 'Glutei' && c.g[0] === 'Adduttori')) s += 4;
    else if (sb && c.b && c.g.includes(g) && !prim.has(c.g[0])) s += 1.2;
    else return -99;
    if (c.b === sb) s += 2; else if (sb && !c.b) s -= 1.5;
    if (c.eq === 'M') s += v === 'A' ? 2.5 : v === 'B' ? 1.2 : 0;
    if (c.eq === 'M' && c.x) s += .3;
    if (L === 0 && (c.eq === 'B' || c.eq === 'X')) s -= 1.5;
    if (L === 0 && c.eq === 'M' && c.tipo === 'a dischi') s -= .5;
    if (p.obiettivo === 'salute' && c.eq === 'M') s += .8;
    if (L >= 2 && c.lv === 2) s += .4;
    s -= 3 * (uso[v][c.key] || 0) + 1.2 * (tipoUso[v + c.lib] || 0);
    if (altri.some(a => a.key === c.key)) s -= 6;
    if (altri.some(a => a.lib && a.lib === c.lib)) s -= 2.5;
    if (gia.has(c.key) || (c.m && giaTipo.has('m:' + c.m))) return -99;
    return s;
  };
  const scegli = (pool, slot, v, gia, giaTipo, altri, prim) => {
    let best = null, bv = -50;
    pool.forEach(c => { const x = voto(c, slot, v, gia, giaTipo, altri, prim); if (x > bv) { bv = x; best = c; } });
    return best;
  };

  // tempo: riscaldamento 8 minuti (e cardio finale per chi vuole dimagrire), ogni serie con recupero circa 2,3 minuti
  const min = Math.max(20, Math.min(120, +p.minuti || 60));
  const cardio = p.obiettivo === 'dimagrire' ? (min >= 60 ? 15 : min >= 45 ? 10 : 0) : 0;
  const budget = min - 8 - cardio;
  const nomi = {}, giorni = [];
  schemaSettimana(p).forEach((sk, di) => {
    const [nome0, slots] = SCHEMI[sk];
    nomi[nome0] = (nomi[nome0] || 0) + 1;
    const nome = nomi[nome0] > 1 ? nome0 + ' 2' : nome0;
    const day = {id: 'g' + (di + 1), nome, nota: '', A: [], B: [], C: []};
    const gia = {A: new Set(), B: new Set(), C: new Set()}, tipo = {A: new Set(), B: new Set(), C: new Set()}, prim = {A: new Set(), B: new Set(), C: new Set()};
    let tempo = 0;
    for (const slot of slots) {
      if (day.A.length >= 10) break;
      const a = scegli(tutti, slot, 'A', gia.A, tipo.A, [], prim.A);
      if (!a) continue;
      const d = dose(p, a, slot[1]), costo = d.s * 2.3 + 1;
      if (day.A.length >= 3 && tempo + costo > budget) break;
      tempo += costo;
      const b = scegli(tutti, slot, 'B', gia.B, tipo.B, [a], prim.B) || a;
      const c = scegli(tutti.filter(x => x.eq === 'F' || x.eq === 'D'), slot, 'C', gia.C, tipo.C, [a, b], prim.C);
      [['A', a], ['B', b], ['C', c]].forEach(([v, x]) => {
        if (!x) return;
        gia[v].add(x.key); prim[v].add(x.g[0]); if (x.m) tipo[v].add('m:' + x.m);
        uso[v][x.key] = (uso[v][x.key] || 0) + 1; tipoUso[v + x.lib] = (tipoUso[v + x.lib] || 0) + 1;
        day[v].push(voce(x, dose(p, x, slot[1])));
      });
    }
    // la variante C serve solo se ha almeno metà degli esercizi
    if (day.C.length < Math.max(2, Math.ceil(day.A.length / 2))) day.C = [];
    if (JSON.stringify(day.B) === JSON.stringify(day.A)) day.B = [];
    day.nota = 'Riscaldamento 5-8 minuti. Recupero ' + RECUPERO[p.obiettivo || 'tonificare'] + ' tra le serie.' + (cardio ? ' Alla fine ' + cardio + ' minuti di cardio a ritmo sostenuto.' : '');
    if (day.A.length) giorni.push(day);
  });
  return {giorni, tolti, varC: att.D ? 'Pesi liberi' : 'Corpo libero', note: note(p, zone, cardio, att.D ? 'Pesi liberi' : 'Corpo libero')};
}
function voce(x, d){
  const e = {s: d.s, r: d.r, g: x.g.filter(g => g !== 'Adduttori').slice(0, 3)};
  if (!e.g.length) e.g = ['Glutei'];
  if (x.m) e.m = x.m; else e.n = x.n;
  if (x.p) e.p = x.p;
  if (x.c && x.c.length) e.c = x.c.slice();
  if (x.x) e.x = x.x;
  if (x.t) e.xt = x.t;
  return e;
}
function note(p, zone, cardio, varC){
  const n = [];
  const L = +p.livello || 0;
  n.push(L === 0 ? 'Le prime 2 settimane usa pesi leggeri: impara il movimento prima di caricare.' : 'Quando fai tutte le ripetizioni con facilità per due allenamenti di fila, aumenta un po\' il peso.');
  if (p.obiettivo === 'dimagrire') n.push('Per dimagrire conta molto anche cosa mangi e quanto ti muovi fuori dalla palestra: cammina tutti i giorni.' + (cardio ? '' : ' Se hai tempo, aggiungi 10-15 minuti di cardio alla fine.'));
  if (p.obiettivo === 'massa') n.push('Per crescere servono abbastanza proteine e sonno: il muscolo cresce mentre recuperi.');
  if (p.obiettivo === 'salute') n.push('Muoviti con calma e senza dolore: la costanza conta più del peso.');
  n.push('Alterna le varianti A e B: stessi muscoli, macchine diverse. La variante "' + varC + '" è per quando le macchine sono occupate.');
  if (zone.size) n.push('Hai indicato fastidi a: ' + ZONE.filter(([k]) => zone.has(k)).map(([, l]) => l.toLowerCase()).join(', ') + '. Ho tolto gli esercizi che caricano di più queste zone. Se senti dolore (non fatica) fermati, e se il fastidio dura parlane con un medico o un fisioterapista.');
  else n.push('Se senti dolore (non fatica) durante un esercizio, fermati e cambialo.');
  return n;
}

// ---------- procedura guidata ----------
// ctx dalla pagina Coach: {C, $, esc, toast, loadCat, pool, macroOf, rankOf, MACRO, riconosci(cb), crea(profilo, risultato, macchine), annulla}
const wz = {step: 0, p: null, brand: '', gr: '', q: '', tutte: false, ritorno: false};
const P0 = () => ({nome: '', obiettivo: '', livello: null, giorni: 3, minuti: 60, macchine: [], att: {D: 1, B: 1, C: 1, S: 0}, zone: []});
export function avvia(profilo, ritorno){
  wz.p = Object.assign(P0(), profilo ? JSON.parse(JSON.stringify(profilo)) : {});
  wz.step = profilo ? 1 : 0; wz.brand = ''; wz.q = ''; wz.ritorno = !!ritorno;
}
const PASSI = 5;
export function render(ctx){
  const {$, esc} = ctx, p = wz.p || (avvia(), wz.p);
  const sel = new Set(p.macchine);
  const bar = n => '<div class="wzbar" aria-label="Passo ' + n + ' di ' + PASSI + '">' + Array.from({length: PASSI}, (_, i) => '<span' + (i < n ? ' class="on"' : '') + '></span>').join('') + '</div>';
  const scelta = (key, val, lab, sub, on) => '<button type="button" class="wzopt" data-w="' + key + '" data-val="' + esc(val) + '" aria-pressed="' + !!on + '"><b>' + esc(lab) + '</b>' + (sub ? '<small>' + esc(sub) + '</small>' : '') + '</button>';
  let h = '', foot = '';
  const avanti = (ok, lab) => '<button type="button" class="primary" data-w="next"' + (ok ? '' : ' disabled') + '>' + (lab || 'Avanti') + '</button>';
  if (wz.step === 0) {
    const ios = /iPhone|iPad/.test(navigator.userAgent) && !navigator.standalone;
    h = '<section class="wzhero"><div class="eyebrow">' + esc(ctx.C.palestra ? 'Ti alleni da solo · ' + ctx.C.palestra : 'Ti alleni da solo') + '</div><h2>Creiamo la tua scheda</h2>' +
      '<p>Cinque domande semplici, due minuti. Alla fine trovi la scheda pronta: esercizi, serie, ripetizioni e come si fanno. Puoi cambiarla quando vuoi.</p></section>' +
      '<div class="card"><label class="f">Come ti chiami? (facoltativo)<input id="wzNome" value="' + esc(p.nome) + '" placeholder="Es. Marco" autocomplete="given-name"></label></div>' +
      (ios ? '<p class="hint">Consiglio: prima aggiungi l\'app alla schermata Home (Condividi, poi "Aggiungi alla schermata Home") e fai la procedura da lì, così la scheda resta nell\'app.</p>' : '');
    foot = '<button type="button" class="primary" data-w="next">Iniziamo</button>';
  } else if (wz.step === 1) {
    h = bar(1) + '<h2>Qual è il tuo obiettivo?</h2><div class="wzlist">' + OBIETTIVI.map(([k, l, s]) => scelta('obiettivo', k, l, s, p.obiettivo === k)).join('') + '</div>';
    foot = avanti(!!p.obiettivo);
  } else if (wz.step === 2) {
    h = bar(2) + '<h2>Quanta esperienza hai?</h2><div class="wzlist">' + LIVELLI.map(([k, l, s]) => scelta('livello', k, l, s, p.livello === k)).join('') + '</div>';
    foot = avanti(p.livello !== null && p.livello !== undefined);
  } else if (wz.step === 3) {
    h = bar(3) + '<h2>Quanto tempo hai?</h2>' +
      '<div class="card"><div class="eyebrow">Giorni a settimana</div><div class="wzchips">' + [2, 3, 4, 5, 6].map(n => scelta('giorni', n, String(n), '', p.giorni === n)).join('') + '</div>' +
      '<div class="eyebrow">Minuti per allenamento</div><div class="wzchips">' + [30, 45, 60, 75, 90].map(n => scelta('minuti', n, String(n), '', p.minuti === n)).join('') + '</div>' +
      '<p class="hint">' + esc(riassuntoTempo(p)) + '</p></div>';
    foot = avanti(true);
  } else if (wz.step === 4) {
    h = bar(4) + renderPalestra(ctx, p, sel);
    foot = avanti(true, sel.size ? 'Avanti con ' + sel.size + (sel.size === 1 ? ' macchina' : ' macchine') : 'Avanti senza macchine');
  } else if (wz.step === 5) {
    h = bar(5) + '<h2>Hai fastidi o zone da evitare?</h2><p class="hint">Tocca tutte quelle che ti danno noia. Toglierò gli esercizi che le caricano di più.</p>' +
      '<div class="wzchips wzwrap">' + ZONE.map(([k, l]) => scelta('zona', k, l, '', p.zone.includes(k))).join('') + '</div>' +
      scelta('nozone', '1', 'Nessun fastidio', '', !p.zone.length) +
      '<p class="hint">Non è un parere medico: se hai un dolore che dura, o un infortunio recente, senti prima un medico o un fisioterapista.</p>';
    foot = '<button type="button" class="primary" data-w="crea">Crea la mia scheda</button>';
  }
  if (wz.step > 0) h = '<div class="top"><button type="button" class="back" data-w="prev">‹ Indietro</button>' + (wz.ritorno ? '<button type="button" class="ghost small" data-w="esci">Annulla</button>' : '') + '</div>' + h;
  $('v').innerHTML = '<div class="wz">' + h + '</div>';
  $('foot').hidden = false; $('footIn').innerHTML = foot;
}
function riassuntoTempo(p){
  const n = schemaSettimana(p).map(k => SCHEMI[k][0]);
  const uniq = n.filter((x, i) => n.indexOf(x) === i);
  return p.giorni + ' allenamenti diversi a settimana: ' + uniq.join(', ').toLowerCase() + '.' + (p.minuti <= 30 ? ' Con 30 minuti faremo pochi esercizi ben scelti.' : '');
}

// passo 4: macchine della palestra, dalla lista con le foto o fotografandole
let CATL = null;
function renderPalestra(ctx, p, sel){
  const {esc} = ctx;
  if (!CATL) ctx.loadCat().then(c => { CATL = c || []; if (wz.step === 4) render(ctx); });
  const pool = ctx.pool(), by = {};
  pool.forEach(m => by[m.id] = m);
  const lib = pool.filter(m => m.lib);
  let h = '<h2>Dove ti alleni?</h2><p class="hint">Segna le macchine che ci sono nella tua palestra: la scheda userà quelle. Non serve segnarle tutte, ne bastano una decina.</p>' +
    '<button type="button" class="ghost" data-w="foto">Fotografale</button>';
  // marche
  const marche = {};
  pool.forEach(m => { if (m.lib) return; marche[m.marca] = (marche[m.marca] || 0) + 1; });
  const LIBN = ctx.C.palestra || 'La tua palestra';
  h += '<div class="card"><div class="eyebrow">Oppure scegli dalla lista: che marca sono?</div>' +
    '<label class="f"><input id="wzQ" type="search" value="' + esc(wz.q) + '" placeholder="Cerca per nome: leg press, chest press…" autocomplete="off"></label>' +
    '<div class="wzchips wzwrap">' + (lib.length ? '<button type="button" class="wzopt" data-w="brand" data-val="__lib" aria-pressed="' + (wz.brand === '__lib') + '"><b>' + esc(LIBN) + '</b></button>' : '') +
    Object.keys(marche).sort().map(b => '<button type="button" class="wzopt" data-w="brand" data-val="' + esc(b) + '" aria-pressed="' + (wz.brand === b) + '"><b>' + esc(b) + '</b></button>').join('') + '</div>' +
    (CATL === null ? '<p class="hint">Carico il catalogo delle macchine… (serve internet)</p>' : !CATL.length ? '<p class="hint">Non riesco a scaricare il catalogo: controlla la connessione. Puoi andare avanti anche senza macchine, userò manubri, bilanciere e corpo libero.</p>' : '') +
    '<div id="wzList">' + listaMacchine(ctx, pool, sel) + '</div></div>';
  // scelte
  const scelte = p.macchine.map(id => by[id] || ctx.M[id]).filter(Boolean);
  h += '<div class="card"><div class="eyebrow">Le tue macchine · ' + scelte.length + '</div>' +
    (scelte.length ? '<ul class="wzsel">' + scelte.map(m => '<li><span>' + esc(m.nome) + '<small>' + esc(m.lib ? LIBN : m.marca) + '</small></span><button type="button" class="ghost small" data-w="tog" data-val="' + esc(m.id) + '" aria-label="Togli">Togli</button></li>').join('') + '</ul>'
      : '<p class="hint">Ancora nessuna.</p>') + '</div>';
  h += '<div class="card"><div class="eyebrow">Nella tua palestra ci sono anche</div>' +
    [['D', 'Manubri e panche'], ['B', 'Bilanciere, rack e sbarra'], ['C', 'Cavi (pulley, croci ai cavi)'], ['S', 'Multipower']].map(([k, l]) => '<label class="wzchk"><input type="checkbox" data-att="' + k + '"' + (p.att[k] ? ' checked' : '') + '> ' + l + '</label>').join('') + '</div>';
  return h;
}
function listaMacchine(ctx, pool, sel){
  const {esc} = ctx;
  let list;
  if (wz.q.trim()) {
    const w = wz.q.toLowerCase().split(/\s+/).filter(Boolean);
    list = pool.filter(m => w.every(x => (m.nome + ' ' + (m.linea || '') + ' ' + (m.marca || '')).toLowerCase().includes(x))).slice(0, 60);
  } else if (wz.brand) {
    list = pool.filter(m => wz.brand === '__lib' ? m.lib : !m.lib && m.marca === wz.brand);
  } else return '';
  if (!list.length) return '<p class="hint">Nessuna macchina trovata.</p>';
  // per gruppo muscolare, prima le più usate
  const gruppi = {};
  list.forEach(m => { const g = ctx.macroOf(m) || 'Altro'; (gruppi[g] = gruppi[g] || []).push(Object.assign({}, m, {rk: ctx.rankOf(m, g)})); });
  const ordine = ctx.MACRO.map(o => o.n).concat('Altro').filter(g => (gruppi[g] || []).length);
  const ord = l => l.sort((a, b) => a.rk - b.rk || (a.stato ? 1 : 0) - (b.stato ? 1 : 0) || a.nome.localeCompare(b.nome));
  // con una ricerca si vede tutto; con una marca si sceglie un gruppo di muscoli alla volta, così la lista resta corta
  if (wz.q.trim()) return ordine.map(g => '<div class="eyebrow wzg">' + esc(g) + '</div><div class="wzgrid">' + ord(gruppi[g]).map(m => tile(ctx, m, sel.has(m.id))).join('') + '</div>').join('');
  if (!ordine.includes(wz.gr)) wz.gr = ordine[0];
  const quante = g => gruppi[g].filter(m => sel.has(m.id)).length;
  let h = '<div class="wzchips wzwrap wztabs">' + ordine.map(g => '<button type="button" class="wzopt" data-w="gr" data-val="' + esc(g) + '" aria-pressed="' + (g === wz.gr) + '"><b>' + esc(g) + (quante(g) ? ' · ' + quante(g) : '') + '</b></button>').join('') + '</div>';
  const l = ord(gruppi[wz.gr]);
  const vis = wz.tutte || wz.brand === '__lib' ? l : l.filter(m => (m.rk < 99 && !m.stato) || sel.has(m.id));
  const nasc = l.length - vis.length;
  h += vis.length ? '<div class="wzgrid">' + vis.map(m => tile(ctx, m, sel.has(m.id))).join('') + '</div>' : '<p class="hint">Nessuna tra le più usate.</p>';
  if (nasc) h += '<button type="button" class="ghost small" data-w="tutte">Mostra anche le altre ' + nasc + ' (meno comuni o fuori produzione)</button>';
  return h;
}
const tile = (ctx, m, on) => '<button type="button" class="wzt" data-w="tog" data-val="' + ctx.esc(m.id) + '" aria-pressed="' + on + '">' +
  (m.foto ? '<img src="' + ctx.esc(m.foto) + (m.lib ? '' : '?c') + '" alt="" loading="lazy">' : '<span class="noimg"></span>') +
  '<span>' + ctx.esc(m.nome) + (m.stato ? '<small>' + ctx.esc(m.stato) + '</small>' : '') + '</span></button>';

// eventi della procedura (li chiama la pagina Coach)
export function click(ctx, t){
  const p = wz.p, w = t.dataset.w, val = t.dataset.val;
  const nome = ctx.$('wzNome'); if (nome) p.nome = nome.value.trim();
  if (w === 'next') { if (wz.step < PASSI) { wz.step++; render(ctx); scrollTo(0, 0); } return true; }
  if (w === 'prev') { if (wz.step > 0) { wz.step--; render(ctx); scrollTo(0, 0); } return true; }
  if (w === 'esci') { ctx.annulla(); return true; }
  if (w === 'obiettivo') { p.obiettivo = val; wz.step = 2; render(ctx); scrollTo(0, 0); return true; }
  if (w === 'livello') { p.livello = +val; wz.step = 3; render(ctx); scrollTo(0, 0); return true; }
  if (w === 'giorni' || w === 'minuti') { p[w] = +val; render(ctx); return true; }
  if (w === 'zona') { const i = p.zone.indexOf(val); if (i < 0) p.zone.push(val); else p.zone.splice(i, 1); render(ctx); return true; }
  if (w === 'nozone') { p.zone = []; render(ctx); return true; }
  if (w === 'brand') { wz.brand = wz.brand === val ? '' : val; wz.q = ''; wz.tutte = false; render(ctx); const l = ctx.$('wzList'); if (l && wz.brand) l.scrollIntoView({block: 'start', behavior: 'smooth'}); return true; }
  if (w === 'tutte') { wz.tutte = true; redrawList(ctx); return true; }
  if (w === 'gr') { wz.gr = val; wz.tutte = false; redrawList(ctx); return true; }
  if (w === 'tog') { toggle(ctx, val); return true; }
  if (w === 'foto') {
    ctx.riconosci(m => { if (!p.macchine.includes(m.id)) p.macchine.push(m.id); ctx.toast('Aggiunta: ' + m.nome + ' · scatta la prossima'); });
    return true;
  }
  if (w === 'crea') { crea(ctx); return true; }
  return false;
}
function toggle(ctx, id){
  const p = wz.p, i = p.macchine.indexOf(id);
  if (i < 0) p.macchine.push(id); else p.macchine.splice(i, 1);
  const y = scrollY; render(ctx); scrollTo(0, y);
}
function redrawList(ctx){ const l = ctx.$('wzList'); if (l) l.innerHTML = listaMacchine(ctx, ctx.pool(), new Set(wz.p.macchine)); }
export function input(ctx, t){
  if (t.id === 'wzQ') { wz.q = t.value; redrawList(ctx); return true; }
  if (t.dataset.att) { wz.p.att[t.dataset.att] = t.checked ? 1 : 0; return true; }
  if (t.id === 'wzNome') { wz.p.nome = t.value.trim(); return true; }
  return false;
}
function crea(ctx){
  const p = wz.p, by = {};
  ctx.pool().forEach(m => by[m.id] = m);
  const macchine = p.macchine.map(id => by[id] || ctx.M[id]).filter(Boolean);
  const r = genera(Object.assign({}, p, {macchine}));
  if (!r.giorni.length) { ctx.toast('Non sono riuscito a creare la scheda: prova a togliere qualche zona da evitare'); return; }
  ctx.crea(JSON.parse(JSON.stringify(p)), r, macchine);
}
export function riassunto(p){
  if (!p) return '';
  const o = (OBIETTIVI.find(x => x[0] === p.obiettivo) || [])[1] || '', l = (LIVELLI.find(x => x[0] === p.livello) || [])[1] || '';
  return [o, l, p.giorni + ' giorni da ' + p.minuti + ' minuti', p.macchine.length + (p.macchine.length === 1 ? ' macchina' : ' macchine'),
    p.zone.length ? 'evita ' + ZONE.filter(([k]) => p.zone.includes(k)).map(([, x]) => x.toLowerCase()).join(', ') : ''].filter(Boolean).join(' · ');
}
