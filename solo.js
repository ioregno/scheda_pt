// VERSIONE "DA SOLO": per chi si allena senza PT ma ha già una scheda (dal PT, dalla palestra, su carta).
// L'app non crea la scheda: te la fa seguire ogni giorno. La carica coach.html quando l'indirizzo è coach.html#solo
// (vedi solo.html). Ingresso a schermi corti (Inizia, Come funziona, nome, palestra, copia la scheda), poi "La tua scheda"
// identica a come è scritta, con la figura di ogni esercizio e un "?" sui macchinari da scegliere (li sceglie la persona),
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
// largo = per la sola figura: anche se due esercizi si somigliano uguale, prende il primo
function somigliaLibero(n, largo){
  const u = toks(n).filter(w => !/^\d+$/.test(w)).map(radice); if (!u.length) return null;
  const r = LIBRERIA.filter(e => e.eq !== 'M').map(e => {
    const l = toks(e.n).map(radice), presi = l.filter(x => u.includes(x)).length;
    return {e, v: (l[0] === u[0] ? 1 : 0) + presi / l.length + .5 * presi / u.length, testa: l[0] === u[0], quota: presi / l.length};
  }).filter(x => x.testa && x.quota >= .5).sort((a, b) => b.v - a.v);
  return r.length && (largo || r.length === 1 || r[0].v - r[1].v >= .1) ? r[0].e : null;
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

// ---------- la scheda come l'hai scritta (richiesta di giulio, 2026-11-09) ----------
// Il nome resta quello scritto. Esercizi senza macchina: animazione (anche solo la più simile, per la figura).
// Macchinari: nessuna scelta automatica. L'esercizio ha un "?" e la persona sceglie la sua macchina tra quelle di quel tipo,
// prima quelle della sua palestra (e.q = da scegliere, e.k = tipi di macchina da cercare, e.ch = come l'app ha capito il nome).
// cardio e riscaldamento: il catalogo ha solo macchine da forza, quindi niente "?"
const CARDIO = /\b(tapis|treadmill|cyclette|bici\w*|bike|ellittic\w*|vogatore|rower|riscaldamento|corsa|camminat\w*|spinning|stepper|scale|mountain|climbers?|burpees?|salt\w+|cardio)\b/;
const maiusc = s => s.charAt(0).toUpperCase() + s.slice(1);
export function scritta(o, gruppiOk, scelte){
  const giorni = o.giorni.slice(0, 6).map((g, gi) => ({
    id: 'g' + (gi + 1), nome: String(g.nome || (o.giorni.length > 1 ? 'Allenamento ' + String.fromCharCode(65 + gi) : 'Allenamento')).slice(0, 40), nota: '', B: [], C: [],
    A: g.esercizi.slice(0, 20).map(x => comeScritto(x, gruppiOk))
  }));
  // macchine già scelte prima di riscrivere la scheda: restano
  if (scelte) giorni.forEach(g => g.A.forEach(e => { const id = e.q && scelte[e.ch]; if (id) { e.m = id; delete e.q; } }));
  return {giorni};
}
function comeScritto(x, gruppiOk){
  const tempo = x.serie == null && /\d\s*(min|')/i.test(x.ripetizioni || '');
  const e = {n: maiusc(x.nome).slice(0, 80), s: tempo ? 1 : Math.max(1, Math.min(12, Math.round(+x.serie) || 3)), r: String(x.ripetizioni || '10').slice(0, 20), ch: x.chiave || norm(x.nome)};
  const p = [x.note, x.recupero ? 'Recupero ' + x.recupero : ''].filter(Boolean).join(' · '); if (p) e.p = p;
  let lib = x.libreria ? daNome(x.libreria) : null;
  if (!lib && x.attrezzo === 'forse') lib = somigliaLibero(e.ch, true);   // solo per la figura: il nome resta il tuo
  if (lib) {
    if (lib.x) { e.x = lib.x; if (lib.t) e.xt = lib.t; }
    if (lib.c.length) e.c = lib.c.slice(); e.g = lib.g.filter(g => gruppiOk.includes(g));
  } else if ((x.attrezzo === 'macchina' || x.attrezzo === 'forse') && !CARDIO.test(e.ch)) { e.q = 1; e.k = (x.tipi || []).slice(0, 6); }
  return e;
}
// macchine da proporre per un esercizio: dello stesso tipo, prima quelle della palestra (libreria) e delle marche della catena
export function candidati(e, pool, palestra){
  const marche = marcheDi(palestra).map(x => x.toLowerCase());
  const tipi = (e.k && e.k.length ? e.k : [e.ch || e.n]).map(t => norm(t).split(' ').filter(x => x.length > 1 && !STOP.has(x) && !STOPL.has(x) && !/^\d+$/.test(x))).filter(w => w.length);
  const parole = toks(e.ch || e.n).filter(w => w.length >= 4 && !STOP.has(w) && !/^(manubri|manubrio|bilanciere|seduto|presa|stretta|larga|avanti|dietro)$/.test(w));
  const nomiMarche = [...new Set(pool.map(m => norm(m.marca)).filter(x => x.length > 2))];
  const marcaScritta = nomiMarche.find(b => (' ' + norm(e.n) + ' ').includes(' ' + b + ' ')) || '';
  const casa = m => !!m.lib || marche.includes(String(m.marca || '').toLowerCase());
  const voto = (m, base) => base + (m.lib ? 4 : 0) + (marcaScritta && norm(m.marca) === marcaScritta ? 3 : 0) + (casa(m) ? 2 : 0) - (m.stato ? 2 : 0) - norm(m.nome).split(' ').length * .1
    - (/inclin|declin/.test(norm(m.nome)) && !/inclin|declin/.test(norm(e.n + ' ' + tipi.flat().join(' '))) ? 1.2 : 0);
  const pari = (w, nw) => nw.some(y => y === w || (w.length >= 4 && y.startsWith(w)));
  let c = [];
  pool.forEach(m => {
    const nw = norm(m.nome + ' ' + (m.linea || '')).split(' ');
    const i = tipi.findIndex(w => w.every(x => pari(x, nw)));
    if (i >= 0) c.push({m, v: voto(m, 10 - i * .3), casa: casa(m)});
  });
  if (!c.length && parole.length) pool.forEach(m => {   // tipo non riconosciuto: macchine con almeno una parola in comune
    const nw = norm(m.nome + ' ' + (m.linea || '')).split(' '), n = parole.filter(w => pari(w, nw)).length;
    if (n) c.push({m, v: voto(m, n * 2), casa: casa(m)});
  });
  c.sort((a, b) => b.v - a.v);
  return c;
}
export function cerca(q, pool, palestra){
  const marche = marcheDi(palestra).map(x => x.toLowerCase()), w = norm(q).split(' ').filter(Boolean);
  if (!w.length) return [];
  return pool.filter(m => { const t = norm(m.nome + ' ' + (m.linea || '') + ' ' + (m.marca || '')); return w.every(x => t.includes(x)); })
    .map(m => ({m, casa: !!m.lib || marche.includes(String(m.marca || '').toLowerCase())}))
    .sort((a, b) => (b.casa - a.casa) || (!!a.m.stato - !!b.m.stato) || a.m.nome.localeCompare(b.m.nome));
}

// ---------- ingresso: una cosa per schermo, poche parole (modello: il modulo dello Studio Trotta) ----------
// ctx dalla pagina Coach: vedi sctx in coach.html
const wz = {step: 0, p: null, ritorno: '', testo: '', stato: '', altra: false};
const ESEMPIO = 'Giorno A\nPanca piana manubri 4x10 rec 90"\nChest press 3x12\nPush down corda 3x12\n\nGiorno B\nLeg press 4x10\nLeg curl 3x12\nCrunch 3x20';
const P0 = () => ({nome: '', palestra: '', citta: '', volte: 3});
// ritorno: '' prima volta, 'profilo' cambia nome e palestra, 'testo' riscrive la scheda
export function avvia(profilo, ritorno, testo){
  wz.p = Object.assign(P0(), profilo ? JSON.parse(JSON.stringify(profilo)) : {});
  wz.ritorno = ritorno || ''; wz.step = ritorno === 'testo' ? 4 : ritorno ? 2 : 0; wz.stato = ''; wz.altra = false;
  if (testo != null) wz.testo = testo;
  else if (!wz.testo) try { wz.testo = localStorage.getItem('solo-pt-bozza') || ''; } catch (e) {}
}
const PASSI = [
  ['Copia la tua scheda', 'Come sul foglio, una riga per esercizio.'],
  ['Scegli i tuoi macchinari', 'Ti mostro quelli della tua palestra.'],
  ['Allenati', 'Ogni giorno sai cosa fare. Anche senza internet.']
];
export function render(ctx){
  const {$, esc} = ctx, p = wz.p || (avvia(), wz.p);
  const chip = (key, val, lab, on) => '<button type="button" class="wzopt" data-w="' + key + '" data-val="' + esc(val) + '" aria-pressed="' + !!on + '"><b>' + esc(lab) + '</b></button>';
  const btn = (w, t) => '<button type="button" class="primary" data-w="' + w + '">' + t + '</button>';
  let h = '';
  if (wz.step === 0) {
    h = '<h2>La tua scheda, facile ogni giorno</h2><p>Hai già una scheda? Copiala qui. Ogni giorno ti dico cosa fare e su quale macchina, e mi ricordo i tuoi pesi.</p>' +
      '<div class="wzic" aria-hidden="true">' + ICONA + '</div>' + btn('next', 'Inizia');
  } else if (wz.step === 1) {
    h = '<h2>Come funziona</h2><ol class="wzpassi">' + PASSI.map(x => '<li><b>' + x[0] + '</b><span>' + x[1] + '</span></li>').join('') + '</ol>' + btn('next', 'Iniziamo');
  } else if (wz.step === 2) {
    h = '<h2>Come ti chiami?</h2><label class="f"><span class="sr">Il tuo nome</span><input id="wzNome" value="' + esc(p.nome) + '" placeholder="Il tuo nome" autocomplete="given-name" enterkeyhint="next"></label>' + btn('next', 'Avanti');
  } else if (wz.step === 3) {
    const altra = (p.palestra && !NOMI_CATENE.includes(p.palestra)) || wz.altra;
    h = '<h2>Dove ti alleni?</h2><p>Ho i macchinari di tutte le palestre: dimmi la tua e ti mostro i suoi.</p>' +
      '<div class="wzchips wzwrap">' + NOMI_CATENE.map(c => chip('palestra', c, c, p.palestra === c)).join('') + chip('altra', '1', 'Un\'altra', altra) + '</div>' +
      (altra ? '<label class="f"><span class="sr">Nome della palestra</span><input id="wzPal" value="' + esc(NOMI_CATENE.includes(p.palestra) ? '' : p.palestra) + '" placeholder="Nome della palestra" autocomplete="off"></label>' : '') +
      btn(wz.ritorno === 'profilo' ? 'crea' : 'next', wz.ritorno === 'profilo' ? 'Salva' : 'Avanti');
  } else {
    h = '<h2>Copia la tua scheda</h2><p>Una riga per esercizio, come sul foglio.</p>' +
      '<label class="f wztesto"><span class="sr">La tua scheda</span><textarea id="wzTesto" rows="12" autocapitalize="sentences" spellcheck="false" placeholder="' + esc(ESEMPIO) + '">' + esc(wz.testo || '') + '</textarea></label>' +
      btn('scrivi', wz.stato ? 'Un attimo…' : 'Fatto');
  }
  const su = wz.ritorno ? '<button type="button" class="back" data-w="esci">‹ Indietro</button>' : wz.step > 0 ? '<button type="button" class="back" data-w="prev">‹ Indietro</button>' : '';
  const punti = wz.ritorno ? '' : '<div class="wzdots" aria-hidden="true">' + [0, 1, 2, 3, 4].map(i => '<span' + (i <= wz.step ? ' class="on"' : '') + '></span>').join('') + '</div>';
  $('v').innerHTML = '<div class="wz">' + (su || punti ? '<div class="top">' + (su || '<span></span>') + punti + '</div>' : '') + '<section class="wzc">' + h + '</section></div>';
  $('foot').hidden = true; $('footIn').innerHTML = '';
  const f = $('wzNome') || (wz.step === 3 && $('wzPal')); if (f && !f.value && !/iPhone|iPad|Android/.test(navigator.userAgent)) f.focus();
}
const ICONA = '<svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="8" width="36" height="48" rx="6"/><path d="M24 8v-2h16v2"/><path d="M22 24h20M22 33h20M22 42h12"/></svg>';
export function click(ctx, t){
  const p = wz.p, w = t.dataset.w, val = t.dataset.val;
  leggi(ctx);
  if (w === 'next') {
    if (wz.step === 2 && !p.nome) { ctx.toast('Scrivi il tuo nome'); const n = ctx.$('wzNome'); if (n) n.focus(); return true; }
    if (wz.step === 3 && !p.palestra) { ctx.toast('Scegli la tua palestra'); return true; }
    wz.step++; render(ctx); scrollTo(0, 0); return true;
  }
  if (w === 'prev') { wz.step = Math.max(0, wz.step - 1); render(ctx); scrollTo(0, 0); return true; }
  if (w === 'esci') { ctx.annulla(); return true; }
  if (w === 'palestra') { p.palestra = val; wz.altra = false; render(ctx); return true; }
  if (w === 'altra') { p.palestra = ''; wz.altra = true; render(ctx); const i = ctx.$('wzPal'); if (i) i.focus(); return true; }
  if (w === 'crea') { if (!p.palestra) { ctx.toast('Scegli la tua palestra'); return true; } ctx.crea(JSON.parse(JSON.stringify(p))); return true; }
  if (w === 'scrivi') { scrivi(ctx); return true; }
  return false;
}
async function scrivi(ctx){
  if (wz.stato) return;
  const o = leggiTesto(wz.testo);
  if (!o.giorni.length) { ctx.toast('Scrivi almeno un esercizio, uno per riga'); const t = ctx.$('wzTesto'); if (t) t.focus(); return; }
  wz.stato = 'leggo'; render(ctx);
  ctx.loadCat();   // il catalogo serve dopo, per scegliere le macchine: intanto si scarica
  const out = scritta(o, ctx.GRUPPI, ctx.scelte());
  wz.stato = '';
  ctx.creaDaTesto(JSON.parse(JSON.stringify(wz.p)), out, wz.testo);
}
function leggi(ctx){
  const x = ctx.$('wzTesto'); if (x) { wz.testo = x.value; try { localStorage.setItem('solo-pt-bozza', wz.testo); } catch (e) {} }
  const n = ctx.$('wzNome'); if (n) wz.p.nome = n.value.trim();
  const g = ctx.$('wzPal'); if (g && g.value.trim()) wz.p.palestra = g.value.trim();
}
export function input(ctx, t){
  leggi(ctx);
  return true;
}
export function tasto(ctx, e){
  if (e.key === 'Enter' && (e.target.id === 'wzNome' || e.target.id === 'wzPal')) { e.preventDefault(); click(ctx, {dataset: {w: wz.ritorno === 'profilo' && wz.step === 3 ? 'crea' : 'next'}}); }
}
export function riassunto(p){
  if (!p) return '';
  return [p.palestra, p.volte ? p.volte + ' volte a settimana' : ''].filter(Boolean).join(' · ');
}

// ---------- la tua scheda: come l'hai scritta, con la figura di ogni esercizio ----------
export function renderScheda(ctx, c){
  const {$, esc, M} = ctx;
  const giorni = c.giorni.filter(g => (g.A || []).length || c.giorni.length === 1);
  const mancano = c.giorni.reduce((n, g) => n + (g.A || []).filter(e => e.q && !e.m).length, 0);
  const fig = (e, gi, i) => {
    const m = e.m && M[e.m];
    const in_ = m ? (m.foto ? '<img src="' + esc(ctx.foto(m)) + '" alt="" loading="lazy">' : '<span class="fx">' + esc((m.nome || '?').charAt(0)) + '</span>')
      : e.q ? '<span class="fq">?</span>'
      : e.x ? '<img src="gif/' + esc(e.x) + '.gif" alt="" loading="lazy">' : '<span class="fx">' + MANUBRIO + '</span>';
    const lab = m ? 'Macchinario: ' + m.nome + '. Tocca per cambiarlo' : e.q ? 'Scegli il macchinario' : 'Figura dell\'esercizio';
    return (e.q || m ? '<button type="button" class="sfig' + (e.q && !m ? ' q' : '') + '" data-s="scegli" data-i="' + gi + '|' + i + '" aria-label="' + esc(lab) + '">' : '<span class="sfig">') + in_ + (e.q || m ? '</button>' : '</span>');
  };
  let h = '<div class="top"><span class="eyebrow">' + esc(c.cliente ? 'Ciao ' + c.cliente : (c.profilo && c.profilo.palestra) || '') + '</span><button type="button" class="ghost small" data-s="riscrivi">Riscrivi</button></div>' +
    '<section><h2>La tua scheda</h2>' + (mancano ? '<p class="shint">Tocca <span class="fq mini">?</span> e scegli il tuo macchinario.</p>' : '') + '</section>';
  c.giorni.forEach((g, gi) => {
    if (!giorni.includes(g)) return;
    h += '<section class="card sday c-' + g.id + '"><h3 class="sdn"><span class="sw"></span>' + esc(g.nome) + '</h3>' +
      '<ul class="sx">' + (g.A || []).map((e, i) => {
        const m = e.m && M[e.m];
        return '<li>' + fig(e, gi, i) + '<button type="button" class="st" data-ed="' + gi + '|A|' + i + '"><b>' + esc(e.n || (m ? m.nome : 'Esercizio')) + '</b>' +
          '<small>' + esc((e.s || 3) + ' × ' + (e.r || '10')) + (e.p ? ' · ' + esc(e.p) : '') + '</small>' +
          (m ? '<small class="sm">' + esc([m.marca, m.nome].filter(Boolean).join(' · ')) + '</small>' : e.q ? '<small class="sm q">Scegli il macchinario</small>' : '') + '</button></li>';
      }).join('') + '</ul><button type="button" class="linkbtn sadd" data-add="' + gi + '|A">+ Esercizio</button></section>';
  });
  h += '<button type="button" class="linkbtn sprof" data-act="wiz">Cambia nome o palestra</button>' +
    (c.nuova ? '' : '<a class="ghost" style="text-align:center;text-decoration:none;color:var(--ink)" href="index.html">Torna all\'app senza salvare</a>') +
    '<p class="hint">' + esc(CREDITI_GIF) + '</p>';
  $('v').innerHTML = h;
  $('foot').hidden = false;
  $('footIn').innerHTML = '<button type="button" class="primary" data-act="usa">' + (c.nuova ? 'Usa questa scheda' : 'Salva e torna all\'app') + '</button>';
}
const MANUBRIO = '<svg viewBox="0 0 48 48" width="34" height="34" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M8 18v12M14 14v20M34 14v20M40 18v12M14 24h20"/></svg>';
export function clickScheda(ctx, c, t){
  const a = t.dataset.s;
  if (a === 'riscrivi') { ctx.riscrivi(); return; }
  if (a === 'scegli') { const [gi, i] = t.dataset.i.split('|').map(Number); scegli(ctx, c, gi, i); }
}

// ---------- "Scegli il macchinario": le macchine di quel tipo, prima quelle della tua palestra. Scegli tu. ----------
const sc = {c: null, gi: 0, i: 0, q: '', tutte: false, piu: false};
export async function scegli(ctx, c, gi, i){
  Object.assign(sc, {c, gi, i, q: '', tutte: false, piu: false});
  const sh = ctx.$('sheet'), d = ctx.$('dlg');
  sh.innerHTML = '<div class="grab"></div><h3>Scegli il macchinario</h3><p class="hint">Un attimo…</p>';
  if (!d.open) d.showModal();
  sh.onclick = ev => cliccaScelta(ctx, ev);
  sh.oninput = ev => { if (ev.target.id === 'scQ') { sc.q = ev.target.value; disegnaLista(ctx); } };
  const cat = await ctx.loadCat();
  if (!d.open || sc.c !== c) return;
  disegnaScelta(ctx, !cat);
}
function disegnaScelta(ctx, senzaCat){
  const {esc} = ctx, e = sc.c.giorni[sc.gi].A[sc.i];
  ctx.$('sheet').innerHTML = '<div class="grab"></div><h3>Scegli il macchinario</h3>' +
    '<p class="hint">Quale usi per <b>' + esc(e.n || '') + '</b>?' + (senzaCat ? ' Senza internet vedo solo le macchine già salvate.' : '') + '</p>' +
    '<label class="f"><span class="sr">Cerca</span><input id="scQ" type="search" value="' + esc(sc.q) + '" placeholder="Cerca per nome o marca" autocomplete="off"></label>' +
    '<div id="scL"></div>' +
    (e.m ? '<button type="button" class="ghost" data-sc="togli">Togli il macchinario</button>' : '') +
    '<button type="button" class="ghost" data-sc="libero">Non è un macchinario</button>' +
    '<button type="button" class="ghost close" data-sc="chiudi">Chiudi</button>';
  disegnaLista(ctx);
}
function disegnaLista(ctx){
  const {esc} = ctx, e = sc.c.giorni[sc.gi].A[sc.i], pal = (sc.c.profilo || {}).palestra || '', pool = ctx.pool(pal);
  const tile = x => '<button type="button" class="wzt" data-sm="' + esc(x.m.id) + '" aria-pressed="' + (x.m.id === e.m) + '">' +
    (x.m.foto ? '<img src="' + esc(ctx.foto(x.m)) + '" alt="" loading="lazy">' : '<span class="noimg"></span>') +
    '<span>' + esc(x.m.nome) + '<small>' + esc(x.m.lib ? (ctx.C.palestra || pal) : [x.m.marca, x.m.linea, x.m.stato ? 'fuori produzione' : ''].filter(Boolean).join(' · ')) + '</small></span></button>';
  let h;
  if (sc.q.trim()) {
    const r = cerca(sc.q, pool, pal);
    h = r.length ? '<div class="wzgrid">' + r.slice(0, 40).map(tile).join('') + '</div>' + (r.length > 40 ? '<p class="hint">Altre ' + (r.length - 40) + ': scrivi di più.</p>' : '') : '<p class="hint">Nessun macchinario con questo nome.</p>';
  } else {
    const r = candidati(e, pool, pal), casa = r.filter(x => x.casa), altre = r.filter(x => !x.casa);
    const mostra = varie(casa.length && !sc.tutte ? casa : r), n = sc.piu ? 90 : 24;
    h = !r.length ? '<p class="hint">Non trovo macchinari per questo esercizio: cercalo per nome qui sopra.</p>'
      : '<div class="eyebrow">' + (casa.length && !sc.tutte ? (pal ? 'Di solito a ' + esc(pal) : 'Nella tua palestra') : 'Tutte le marche') + '</div>' +
        '<div class="wzgrid">' + mostra.slice(0, n).map(tile).join('') + '</div>' +
        (mostra.length > n ? '<button type="button" class="ghost small" data-sc="piu">Mostra altri ' + (mostra.length - n) + '</button>' : '') +
        (casa.length && altre.length && !sc.tutte ? '<button type="button" class="ghost small" data-sc="tutte">Non c\'è? Vedi altre marche (' + altre.length + ')</button>' : '');
  }
  ctx.$('scL').innerHTML = h;
}
// prima la migliore di ogni marca, poi le altre: così in cima ci sono marche diverse e non dieci modelli della stessa
function varie(r){
  const marche = [], per = {};
  r.forEach(x => { const k = x.m.lib ? '' : x.m.marca; if (!per[k]) { per[k] = []; marche.push(k); } per[k].push(x); });
  if (marche.length < 2) return r;
  const out = []; for (let i = 0; out.length < r.length; i++) marche.forEach(k => { if (per[k][i]) out.push(per[k][i]); });
  return out;
}
function cliccaScelta(ctx, ev){
  const e = sc.c.giorni[sc.gi].A[sc.i];
  const m = ev.target.closest('[data-sm]');
  if (m) {
    const x = ctx.pool((sc.c.profilo || {}).palestra).find(y => y.id === m.dataset.sm); if (!x) return;
    ctx.tieni(x);
    if (e.mx) { delete e.x; delete e.xt; delete e.mx; }
    e.m = x.id; delete e.q;
    if (x.gruppi && x.gruppi.length) e.g = x.gruppi.filter(g => ctx.GRUPPI.includes(g));
    const d = daMacchina(x); if (d && d.x && !e.x) { e.x = d.x; if (d.t) e.xt = d.t; e.mx = 1; }
    (sc.c.scelte = sc.c.scelte || {})[e.ch || norm(e.n)] = x.id;
    return fine(ctx);
  }
  const b = ev.target.closest('[data-sc]'); if (!b) return;
  const a = b.dataset.sc;
  if (a === 'tutte') { sc.tutte = true; disegnaLista(ctx); return; }
  if (a === 'piu') { sc.piu = true; disegnaLista(ctx); return; }
  if (a === 'togli' || a === 'libero') {
    if (e.mx) { delete e.x; delete e.xt; delete e.mx; }
    delete e.m; if (sc.c.scelte) delete sc.c.scelte[e.ch || norm(e.n)];
    if (a === 'togli') e.q = 1; else delete e.q;
    if (a === 'libero' && !e.x) { const l = somigliaLibero(e.ch || e.n, true); if (l && l.x) { e.x = l.x; if (l.t) e.xt = l.t; } }
    return fine(ctx);
  }
  if (a === 'chiudi') ctx.$('dlg').close();
}
function fine(ctx){ ctx.salva(sc.c); ctx.$('dlg').close(); ctx.ridisegna(); }
