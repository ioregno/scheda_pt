// VERSIONE "DA SOLO": per chi si allena senza PT ma ha già una scheda (dal PT, dalla palestra, su carta).
// L'app non crea la scheda: te la fa seguire ogni giorno. La carica coach.html quando l'indirizzo è coach.html#solo
// (vedi solo.html). Intro corta: nome, palestra, poi la scheda scritta come sul foglio (una riga per esercizio), che diventa
// la scheda nell'editor della pagina Coach
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

// ---------- scheda scritta come sul foglio ----------
// Una riga per esercizio ("Leg press 4x10 rec 90"), il nome dell'allenamento sopra ("Giorno A", "Petto e tricipiti:").
// L'app riconosce gli esercizi senza macchina (con animazione) e le macchine del catalogo, prima quelle della palestra.
const GIORNO = /^(giorno|allenamento|day|scheda|seduta|workout|sessione|lunedi|lunedì|martedi|martedì|mercoledi|mercoledì|giovedi|giovedì|venerdi|venerdì|sabato|domenica)(?=$|[\s:.\-–)\d])/i;
const MUSCOLO = /^(petto|pettorali|schiena|dorso|dorsali|spalle|deltoidi|gambe|quadricipiti|femorali|glutei|polpacci|braccia|bicipiti|tricipiti|addominali|addome|core|cardio|total|full|body|upper|lower|push|pull|legs?|e|ed|\+|&|,|\/|-)$/i;
function intestazione(t){
  t = t.replace(/[^\p{L}\p{N}\s:.,()\/+&'’°"-]/gu, ' ').trim();
  const s = t.replace(/[:\s]+$/, '').trim();
  if (!s || /\d\s*[x×*]\s*\d|\bserie\b/i.test(s)) return null;
  if (GIORNO.test(s) || /:\s*$/.test(t) || /^[A-F]\)?$/i.test(s)) return /^[A-F]\)?$/i.test(s) ? 'Allenamento ' + s[0].toUpperCase() : s;
  const w = s.toLowerCase().split(/[\s\/+,&\-]+/).filter(Boolean);
  return w.length && w.every(x => MUSCOLO.test(x)) && !/\d/.test(s) ? s : null;
}
function riga(t){
  let s = ' ' + t.replace(/^\s*(?:[-•*·–]|\d{1,2}[.)])\s+/, '') + ' ', serie = null, rip = null, rec = null;
  const note = [];
  const tempo = '(?:"|\'\'|’’|sec(?:ondi)?\\b|s\\b|min(?:uti)?\\b|\'|’)';
  s = s.replace(new RegExp('\\b(?:rec(?:upero)?|pausa|riposo)\\.?\\s*:?\\s*(\\d+(?:[.,]\\d+)?\\s*' + tempo + '?)', 'i'), (_, r) => { rec = r.replace(/\s+/g, ''); return ' '; });
  s = s.replace(/\b(?:x|per|a)\s+(braccio|gamba|lato)\b/i, (m) => { note.push(m.trim()); return ' '; });
  s = s.replace(new RegExp('(\\d{1,2})\\s*(?:[x×*]|da)\\s*(max\\b|\\d+(?:\\s*[-\\/,]\\s*\\d+)*\\s*(?:' + tempo + '|rip(?:etizioni)?\\b|reps?\\b)?)', 'i'), (_, a, b) => { serie = +a; rip = b.replace(/\s+/g, '').replace(/(rip(etizioni)?|reps?)$/i, ''); return ' '; });
  if (serie == null) s = s.replace(/(\d{1,2})\s*serie\s*(?:da|di|x|per)?\s*(\d+(?:\s*[-\/,]\s*\d+)*)?\s*(?:rip(?:etizioni)?\b|reps?\b)?/i, (_, a, b) => { serie = +a; if (b) rip = b.replace(/\s+/g, ''); return ' '; });
  if (rip == null) s = s.replace(/(\d+(?:\s*[-\/]\s*\d+)*)\s*(?:rip(?:etizioni)?|reps?)\b/i, (_, b) => { rip = b.replace(/\s+/g, ''); return ' '; });
  if (rip == null) s = s.replace(new RegExp('(\\d+)\\s*' + tempo, 'i'), m => { rip = m.replace(/\s+/g, ''); return ' '; });
  s = s.replace(/\(([^)]*)\)/g, (_, n) => { if (n.trim()) note.push(n.trim()); return ' '; });
  let nome = s.replace(/\s+/g, ' ').trim().replace(/^(petto|schiena|spalle|braccia|bicipiti|tricipiti|gambe|glutei|polpacci|addome|addominali|core|cardio)\s*:\s*/i, '');
  const d = nome.split(/\s+[-–—]\s+/); nome = d.shift().replace(/[:;,.\-–]+$/, '').trim(); if (d.length) note.push(d.join(' - '));
  return {nome, serie, ripetizioni: rip, recupero: rec, note: note.join(' · ')};
}
const STOPL = new Set(['con', 'al', 'alla', 'ai', 'agli', 'alle', 'la', 'il', 'lo', 'i', 'le', 'a', 'da', 'di', 'su', 'e', 'in', 'per', 'the', 'sul']);
const ATTREZZI = /^(bilanciere|manubri|manubrio|cavo|cavi|corda|multipower|corpo|libero|panca|ez)$/;
const toks = s => norm(s).split(' ').filter(x => x && !STOPL.has(x));
const simile = (w, x) => w === x || (w.length > 3 && x.length > 3 && (x.startsWith(w) || w.startsWith(x)));
// esercizio senza macchina dal nome scritto: uguale, oppure con in più solo l'attrezzo ("affondi" = "Affondi con manubri")
function cercaLibero(n){
  const u = toks(n); if (!u.length) return null;
  const libs = LIBRERIA.filter(e => e.eq !== 'M');
  const ex = libs.find(e => norm(e.n) === norm(n)); if (ex) return {e: ex, extra: 0};
  let best = [], bx = 99, extraW = [];
  for (const e of libs) {
    const l = toks(e.n);
    if (!u.every(w => l.some(x => simile(w, x)))) continue;
    const ex2 = l.filter(x => !u.some(w => simile(w, x)));
    if (ex2.length < bx) { bx = ex2.length; best = [e]; extraW = ex2; } else if (ex2.length === bx) best.push(e);
  }
  if (best.length !== 1 || bx > 1) return null;
  return {e: best[0], extra: bx, attrezzo: bx === 1 && ATTREZZI.test(extraW[0])};
}
// se non c'è un nome uguale: l'esercizio della libreria che ha la stessa prima parola e più parole in comune
const radice = w => w.length > 4 ? w.slice(0, 5) : w.replace(/[aeios]$/, '');
function somigliaLibero(n){
  const u = toks(n).filter(w => !/^\d+$/.test(w)).map(radice); if (!u.length) return null;
  const r = LIBRERIA.filter(e => e.eq !== 'M').map(e => {
    const l = toks(e.n).map(radice), presi = l.filter(x => u.includes(x)).length;
    return {e, v: (l[0] === u[0] ? 1 : 0) + presi / l.length + .5 * presi / u.length, testa: l[0] === u[0], quota: presi / l.length};
  }).filter(x => x.testa && x.quota >= .5).sort((a, b) => b.v - a.v);
  return r.length && (r.length === 1 || r[0].v - r[1].v >= .1) ? r[0].e : null;
}
// come si scrive il tipo di macchina in italiano → come lo scrivono i produttori (il primo che corrisponde vince)
const SIN = [
  [/high row|rematore alto/, ['high row']],
  [/lat ?machine|lat ?pull ?down|pull ?down|\blat\b|trazioni? (alla )?(lat|macchina)|wide pull/, ['lat machine', 'lat pulldown', 'pulldown', 'pull down']],
  [/pulley|rematore (seduto|alla macchina|macchina|al pulley)|low row|row machine|rowing|pulley basso/, ['low row', 'pulley', 'seated row', 'rowing', 'row']],
  [/rear delt|deltoidi posteriori|reverse (fly|pec\w*)|alzate posteriori (alla )?macchina|back deltoid/, ['rear delt', 'reverse fly', 'back deltoid']],
  [/pectoral|peck ?deck|pec ?deck|butterfly|croci (alla )?macchina|chest fly|fly machine|peck fly/, ['pectoral', 'butterfly', 'pec fly', 'peck fly', 'chest fly', 'flight']],
  [/chest ?press|distensioni (alla )?macchina|panca (alla )?macchina|spinte? (petto )?(alla )?macchina/, ['chest press']],
  [/shoulder ?press|lento (avanti )?(alla )?macchina|spalle (alla )?macchina|deltoid press/, ['shoulder press', 'deltoid press']],
  [/alzate laterali (alla )?macchina|lateral raise|lateral deltoid/, ['lateral raise', 'lateral deltoid']],
  [/leg ?press|pressa/, ['leg press']],
  [/leg ?ext|leg ?est|extension (gambe|quadricipiti)|quadricipiti (alla )?macchina/, ['leg extension']],
  [/leg ?curl\w* (sdraiat|pron|lying)/, ['lying leg curl', 'prone leg curl']],
  [/leg ?curl\w* (sedut|seated)/, ['seated leg curl']],
  [/leg ?curl\w* (in piedi|standing|kneeling|inginocchiat)/, ['standing leg curl', 'kneeling leg curl']],
  [/leg ?curl|femorali (alla )?macchina/, ['leg curl']],
  [/adduttor|adductor|adduction/, ['adductor', 'adduction']],
  [/abduttor|abductor|abduction/, ['abductor', 'abduction']],
  [/\bhack\b|hack ?squat/, ['hack squat', 'hack']],
  [/pendulum/, ['pendulum']],
  [/hip ?thrust/, ['hip thrust']],
  [/\bglute\b|gluteus|kick ?back (alla )?macchina|glutei (alla )?macchina/, ['glute', 'gluteus']],
  [/calf\w* (in piedi|standing)|polpacci in piedi/, ['standing calf']],
  [/calf\w* (sedut|seated|sitting)|polpacci sedut/, ['seated calf', 'sitting calf']],
  [/calf|polpacci (alla )?macchina/, ['calf']],
  [/multipower|smith/, ['smith']],
  [/pull ?over/, ['pullover']],
  [/dip (alla )?macchina|dips? (press|machine)/, ['dip']],
  [/curl (alla )?macchina|bicipiti (alla )?macchina|biceps|scott (alla )?macchina/, ['biceps curl', 'arm curl', 'curling machine', 'biceps', 'preacher']],
  [/tricipiti (alla )?macchina|triceps|french press (alla )?macchina/, ['triceps', 'tricep', 'french press machine']],
  [/crunch (alla )?macchina|abdominal|addominali (alla )?macchina/, ['abdominal', 'crunch machine']],
  [/lombari|hyper ?extension|iperestensioni|back extension|lower back/, ['hyper extension', 'hyperextension', 'lower back', 'back extension']],
  [/torsione|rotary|torso/, ['rotary torso', 'torso']],
  [/scrollate (alla )?macchina|shrug/, ['shrug']]
];
// scritto di fretta → parole che l'app conosce: parole attaccate, errori di battitura, nomi da palestra
const ATTACCATE = /\b(leg|chest|lat|push|pull|kick|hip|seated|glute|calf|low|high|pec|peck)(press|extension|ext|curl|down|machine|back|thrust|row|raise|deck|fly)\b/g;
const ALIAS = [
  [/^(flessioni|push ?ups?|pushups?)\b.*/, 'piegamenti'],
  [/^(military( press)?|lento avanti|lento)$/, 'lento avanti con bilanciere'],
  [/^arnold$/, 'arnold press'],
  [/^(hammer|curl (a )?martello|martello)$/, 'hammer curl'],
  [/^(panca )?scott$|^curl (alla )?(panca )?scott$/, 'curl alla panca scott'],
  [/^curl concentrat\w*$/, 'curl di concentrazione'],
  [/^(stacco|stacchi)( da terra)?$/, 'stacco da terra'],
  [/^(stacco|stacchi) rumen\w*$|^rdl$/, 'stacco rumeno'],
  [/^goblet( squat)?$/, 'squat con manubri'],
  [/^(squat )?bulgar\w*$/, 'squat bulgaro con manubri'],
  [/^(croci )?(ai )?cavi( alti| bassi)?$|^cross ?over$|^croci (ai )?cavi .*/, 'croci ai cavi'],
  [/^kick ?back( (con )?manubri\w*)?( tricipiti)?$|^kick ?back tricipiti\b.*/, 'kickback con manubrio'],
  [/^(kick ?back|slanci)( (al|dietro|ai|dietro al))? cav[oi]$/, 'slanci dietro al cavo'],
  [/^(glute bridge|ponte( per)?( glutei)?)( (con )?(bilanciere|manubri\w*))?$/, 'ponte per glutei'],
  [/^(leg raises?|alzate gambe|sollevamenti gambe)$/, 'sollevamento gambe'],
  [/^bicycle( crunch)?$/, 'bicycle crunch'],
  [/^push ?down( (al )?cavo| (alla )?(sbarra|barra|v))?$|^tricipiti (al )?cavo$/, 'push down al cavo'],
  [/^push ?down (alla |con la |con )?corda$/, 'push down con la corda'],
  [/^french( press)?( (con )?(bilanciere|ez))?$/, 'french press con bilanciere'],
  [/^french( press)? manubri\w*$/, 'french press con manubrio'],
  [/^trazioni( (alla )?sbarra)?$|^pull ?ups?$/, 'trazioni alla sbarra'],
  [/^dips?( (alle )?parallele)?$/, 'dip alle parallele'],
  [/^(spinte|distensioni) (con )?manubri inclinat\w*$|^panca (inclinata )?(30|45)\D*manubri$/, 'panca inclinata con manubri'],
  [/^alzate lat(erali)?( (con )?manubri)?$|^laterali( manubri)?$/, 'alzate laterali con manubri'],
  [/^addominali crunch$|^crunch addominal\w*$|^addominali$/, 'crunch'],
  [/^(peck|pec)$/, 'pectoral'],
  [/^alzate posteriori( (con )?manubri\w*)?$|^(alzate )?posteriori busto\b.*/, 'alzate posteriori a busto chino'],
  [/^extension$/, 'leg extension'],
  [/^curl manubri alternat\w*$|^curl alternat\w*( manubri)?$/, 'curl con manubri'],
  [/^squat (al )?multi ?power$/, 'squat al multipower'],
  [/^trazioni assistit\w*$/, 'assist chin'],
  [/^spinte .*spalle|^spinte (con )?manubri sedut\w*$/, 'shoulder press con manubri'],
  [/^curl (alla |con la )?corda$/, 'hammer curl alla corda'],
  [/^squat (libero|bilanciere)$/, 'squat con bilanciere'],
  [/^affondi bulgar\w*$/, 'squat bulgaro con manubri'],
  [/^crunch obliqu\w*$|^obliqu\w*$/, 'crunch incrociato'],
  [/^cavi incrociat\w*$/, 'croci ai cavi'],
  [/^parallele$/, 'dip alle parallele'],
  [/^bench( press)?$/, 'panca piana con bilanciere'],
  [/^(deadlift|stacco classico)$/, 'stacco da terra'],
  [/^(back )?squat (con )?bilanciere$|^back squat$/, 'squat con bilanciere'],
  [/^bulgarian( split)?( squat)?$|^split squat$/, 'squat bulgaro con manubri'],
  [/^lento (avanti )?(con )?manubri\w*$/, 'shoulder press con manubri'],
  [/^(curl )?martello( (con )?manubri\w*)?$|^hammer( curl)?( (con )?manubri\w*)?$/, 'hammer curl'],
  [/^tricipiti (alla |con la )?corda$/, 'push down con la corda'],
  [/^dips? .*panc\w*$/, 'dip su panca'],
  [/^stacc\w* (a )?gambe (tese|semitese)$/, 'stacco rumeno'],
  [/^(polpacci|calf) (al )?multipower$/, 'calf al multipower']
];
const PAROLE = ('pectoral pendulum extension thrust pulley machine adductor abductor press curl row calf hack squat leg chest shoulder glute ' +
  'hyperextension pulldown crossover kickback bilanciere manubri manubrio multipower corda cavo cavi panca piana inclinata declinata ' +
  'seduto sdraiato piedi presa stretta larga avanti dietro alto basso alti bassi alzate laterali frontali posteriori croci rematore trazioni ' +
  'affondi stacco rumeno scrollate tirate mento crunch plank addominali polpacci glutei femorali quadricipiti adduttori abduttori ' +
  'tricipiti bicipiti spalle petto schiena gambe lombari iperestensioni concentrazione martello hammer piegamenti flessioni kick back lat pec peck deck').split(' ');
const VOCE = new Set(PAROLE.concat(...LIBRERIA.map(e => norm(e.n).split(' '))));
function distanza(a, b){
  if (Math.abs(a.length - b.length) > 2) return 9;
  const d = Array.from({length: a.length + 1}, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) for (let j = 1; j <= b.length; j++) {
    d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
  }
  return d[a.length][b.length];
}
function correggi(w){
  if (w.length < 4 || VOCE.has(w) || /\d/.test(w)) return w;
  const max = w.length >= 8 ? 2 : 1;
  let best = null, bd = 9, pari = 0;
  VOCE.forEach(v => { if (v.length < 4) return; const d = distanza(w, v); if (d < bd) { bd = d; best = v; pari = 1; } else if (d === bd) pari++; });
  return bd <= max && pari === 1 ? best : w;
}
export function capisci(nome){
  let n = norm(nome).replace(ATTACCATE, '$1 $2').replace(/\bmulti power\b/g, 'multipower').replace(/\bpully\b/g, 'pulley')
    .replace(/\b(bil|bilan|bilanc)\b/g, 'bilanciere').replace(/\b(man|manub)\b/g, 'manubri').replace(/\b(leg|chest|shoulder|deltoid|military) (pres|pess|presss)\b/g, '$1 press')
    .replace(/\bleg (cur|curll)\b/g, 'leg curl').replace(/\bpush (dow|donw)\b/g, 'push down');
  n = n.split(' ').map(correggi).join(' ').replace(ATTACCATE, '$1 $2');
  for (const [re, to] of ALIAS) if (re.test(n)) return to;
  return n;
}
export function leggiTesto(testo){
  const giorni = []; let g = null;
  String(testo || '').split(/\r?\n/).forEach(t => {
    if (!t.trim()) return;
    const h = intestazione(t);
    if (h) { g = {nome: h.slice(0, 40), esercizi: []}; giorni.push(g); return; }
    const x = riga(t); if (!x.nome) return;
    if (!g) { g = {nome: '', esercizi: []}; giorni.push(g); }
    const n = x.chiave = capisci(x.nome), lib = cercaLibero(n), sin = SIN.find(s => s[0].test(n)); let lib2;
    if (lib && (lib.extra === 0 || (!sin && lib.attrezzo))) { x.libreria = lib.e.n; x.attrezzo = 'libero'; }
    else if (sin) { x.attrezzo = 'macchina'; x.tipi = sin[1]; }
    else if (!/macchin|machine/.test(n) && (lib2 = somigliaLibero(n))) { x.libreria = lib2.n; x.attrezzo = 'libero'; }
    else if (/macchin|machine/.test(n)) { x.attrezzo = 'macchina'; x.tipi = [n.replace(/\b(macchin\w*|machine|alla|al)\b/g, ' ')]; }
    else { x.attrezzo = 'forse'; x.tipi = [n]; }
    g.esercizi.push(x);
  });
  return {giorni: giorni.filter(x => x.esercizi.length)};
}
// dalla scheda scritta agli esercizi dell'editor: macchina del catalogo (marche della palestra prima), o esercizio libero con animazione
export function trasforma(o, pool, palestra, gruppiOk){
  const marche = marcheDi(palestra).map(x => x.toLowerCase());
  const nomiMarche = [...new Set(pool.map(m => norm(m.marca)).filter(x => x.length > 2))];
  const giorni = o.giorni.slice(0, 6).map((g, gi) => ({
    id: 'g' + (gi + 1), nome: String(g.nome || 'Allenamento ' + String.fromCharCode(65 + gi)).slice(0, 40), nota: '', B: [], C: [],
    A: g.esercizi.slice(0, 20).map(x => esercizio(x, pool, marche, gruppiOk, nomiMarche))
  }));
  return {giorni, controlla: giorni.reduce((n, g) => n + g.A.filter(e => e.chk).length, 0)};
}
function esercizio(x, pool, marche, gruppiOk, nomiMarche){
  const tempo = x.serie == null && /\d\s*(min|')/i.test(x.ripetizioni || '');   // "tapis roulant 10 min": una volta sola
  const e = {s: tempo ? 1 : Math.max(1, Math.min(12, Math.round(+x.serie) || 3)), r: String(x.ripetizioni || '10').slice(0, 20)};
  const p = [x.note, x.recupero ? 'Recupero ' + x.recupero : ''].filter(Boolean).join(' · '); if (p) e.p = p;
  const lib = x.libreria ? daNome(x.libreria) : null;
  if (!lib && (x.attrezzo === 'macchina' || x.attrezzo === 'forse')) {
    const n = norm(x.nome), marca = nomiMarche.find(b => (' ' + n + ' ').includes(' ' + b + ' ')) || '';
    const t = trovaMacchina(x.tipi, marca, pool, marche, x.attrezzo === 'forse' ? 2 : 1);
    if (t) {
      e.m = t.m.id; if (t.dubbio) e.chk = 1;
      e.g = (t.m.gruppi || []).filter(g => gruppiOk.includes(g));
      const d = daMacchina(t.m); if (d && d.x) { e.x = d.x; if (d.t) e.xt = d.t; }
      if (norm(t.m.nome) !== n) e.p = [e.p, 'Sulla scheda: ' + x.nome].filter(Boolean).join(' · ');
      return e;
    }
  }
  e.n = (lib && (cercaLibero(x.chiave || x.nome) || {}).extra === 0 ? lib.n : x.nome.charAt(0).toUpperCase() + x.nome.slice(1)).slice(0, 80);
  if (x.attrezzo === 'macchina') e.chk = 1;   // macchina non trovata nel catalogo: da scegliere a mano
  if (lib) { if (lib.x) { e.x = lib.x; if (lib.t) e.xt = lib.t; } if (lib.c.length) e.c = lib.c.slice(); e.g = lib.g.filter(g => gruppiOk.includes(g)); if (!e.p && lib.p) e.p = lib.p; }
  return e;
}
const STOP = new Set(['machine', 'macchina', 'the', 'di', 'a', 'al', 'alla', 'con']);
function trovaMacchina(tipi, marca, pool, marche, minParole){
  const alt = tipi.map(t => norm(t).split(' ').filter(x => x.length > 1 && !STOP.has(x) && !/^\d+$/.test(x))).filter(w => w.length >= (minParole || 1));
  if (!alt.length) return null;
  const mk = norm(marca), tutto = tipi.join(' ');
  const c = [];
  pool.forEach(m => {
    if (minParole > 1 && m.tipo === 'panca/rack') return;   // "panca piana" scritto da solo è col bilanciere, non una panca del catalogo
    const nw = norm(m.nome + ' ' + (m.linea || '')).split(' ');
    const i = alt.findIndex(w => w.every(x => nw.some(y => y === x || (x.length >= 4 && y.startsWith(x)))));
    if (i < 0) return;
    const v = (m.lib ? 4 : 0) + (mk && norm(m.marca) === mk ? 3 : 0) + (marche.includes(String(m.marca || '').toLowerCase()) ? 2 : 0) - (m.stato ? 1 : 0)
      - norm(m.nome).split(' ').length * .1 - i * .3 - (/inclin|declin/.test(norm(m.nome)) && !/inclin|declin/.test(norm(tutto)) ? 1.2 : 0);
    c.push({m, v});
  });
  if (!c.length) return null;
  c.sort((a, b) => b.v - a.v);
  // sicura solo se è l'unica di quel tipo tra le macchine più probabili (prima quelle della palestra, poi le marche della catena)
  const top = c[0], pari = c.filter(x => x.v >= top.v - 1).length;
  return {m: top.m, dubbio: pari > 1};
}

// ---------- intro ----------
// ctx dalla pagina Coach: {C, $, esc, toast, crea(profilo), annulla, haMacchine(palestra)}
const wz = {step: 0, p: null, ritorno: false, testo: '', stato: ''};
const ESEMPIO = 'Giorno A\nPanca piana con manubri 4x10 rec 90"\nChest press 3x12\nPush down corda 3x12\n\nGiorno B\nLeg press 4x10\nLeg curl seduto 3x12\nCrunch 3x20';
const P0 = () => ({nome: '', palestra: '', citta: '', allenamenti: 3, volte: 3});
export function avvia(profilo, ritorno){
  wz.p = Object.assign(P0(), profilo ? JSON.parse(JSON.stringify(profilo)) : {});
  wz.step = 0; wz.ritorno = !!ritorno;
  if (!wz.testo) try { wz.testo = localStorage.getItem('solo-pt-bozza') || ''; } catch (e) {}
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
    h = '<h2>Scrivi la tua scheda</h2><p class="hint" style="margin:0">Copiala come sul foglio: una riga per esercizio, con serie e ripetizioni. Se ha più allenamenti, scrivi il nome sopra a ognuno (Giorno A, Giorno B…). Le macchine le riconosco io' + (ctx.haMacchine(p.palestra) ? ', prima quelle di ' + esc(p.palestra) : '') + '.</p>' +
      '<label class="f wztesto"><span class="sr">La tua scheda</span><textarea id="wzTesto" rows="13" autocapitalize="sentences" spellcheck="false" placeholder="' + esc(ESEMPIO) + '">' + esc(wz.testo || '') + '</textarea></label>' +
      '<div class="card"><div class="eyebrow">Quante volte ti alleni a settimana</div><div class="wzchips">' + [2, 3, 4, 5, 6].map(n => chip('volte', n, String(n), p.volte === n)).join('') + '</div></div>' +
      '<button type="button" class="linkbtn wzmano" data-w="vuota">Preferisci aggiungere gli esercizi uno alla volta?</button>';
    foot = '<button type="button" class="primary" data-w="scrivi">' + (wz.stato ? 'Un attimo…' : 'Crea la scheda') + '</button>';
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
  if (w === 'vuota') { ctx.crea(Object.assign(JSON.parse(JSON.stringify(p)), {allenamenti: 1})); return true; }
  if (w === 'scrivi') { scrivi(ctx); return true; }
  return false;
}
async function scrivi(ctx){
  if (wz.stato) return;
  const o = leggiTesto(wz.testo);
  if (!o.giorni.length) { ctx.toast('Scrivi almeno un esercizio, uno per riga'); const t = ctx.$('wzTesto'); if (t) t.focus(); return; }
  wz.stato = 'leggo'; render(ctx);
  await ctx.loadCat();   // il catalogo dei produttori (la prima volta serve internet); senza, solo le macchine della palestra
  const out = trasforma(o, ctx.pool(wz.p.palestra), wz.p.palestra, ctx.GRUPPI);
  wz.stato = '';
  ctx.creaDaTesto(JSON.parse(JSON.stringify(wz.p)), out);
}
function leggi(ctx){
  const x = ctx.$('wzTesto'); if (x) { wz.testo = x.value; try { localStorage.setItem('solo-pt-bozza', wz.testo); } catch (e) {} }
  const n = ctx.$('wzNome'); if (n) wz.p.nome = n.value.trim();
  const g = ctx.$('wzPal'); if (g && g.value.trim()) wz.p.palestra = g.value.trim();
}
export function input(ctx){ leggi(ctx); return true; }
export function riassunto(p){
  if (!p) return '';
  return [p.palestra, p.volte ? p.volte + ' volte a settimana' : ''].filter(Boolean).join(' · ');
}
