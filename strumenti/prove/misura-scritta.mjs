// Come misura.mjs, ma per la scheda "come l'hai scritta" (quella che usa l'app adesso): l'app non sceglie le macchine,
// mette un "?" e la persona sceglie. Qui si controlla che:
//   macchine (M:)  → abbiano il "?" e che tra le prime 24 proposte per una palestra Green Theory ci sia quella giusta
//   libreria (L:)  → abbiano l'animazione giusta
//   nome libero (N) → non abbiano il "?" per sbaglio o, se ce l'hanno, che sia almeno una figura
// Uso: node strumenti/prove/misura-scritta.mjs strumenti/prove/righe-1.mjs
import fs from 'fs';
import path from 'path';
const root = process.cwd();
const S = await import(path.join(root, 'solo.js'));
const {CASI} = await import(path.resolve(process.argv[2] || 'strumenti/prove/righe-1.mjs'));
const d = JSON.parse(fs.readFileSync(path.join(root, 'catalogo/catalogo.json'))); const CAT = d.m.map(a => Object.fromEntries(d.campi.map((k, i) => [k, a[i]])));
const C = new Function(fs.readFileSync(path.join(root, 'config.js'), 'utf8') + '; return CONFIG;')();
const pool = C.macchine.map(m => Object.assign({}, m, {lib: true})).concat(CAT);
let ok = 0, tot = 0; const sbagli = [];
for (const [riga, att] of CASI) {
  if (att === 'H') continue;
  tot++;
  const e = S.scritta(S.leggiTesto('Giorno X\n' + riga), C.gruppi).giorni[0]?.A[0];
  if (!e) { sbagli.push(riga + '  → niente'); continue; }
  let giusto = false, cosa = e.q ? '?' : e.x ? 'figura ' + e.x : 'nessuna figura';
  if (att.startsWith('M:')) {
    const re = new RegExp(att.slice(3, -1), 'i'), c = e.q ? S.candidati(e, pool, 'Green Theory').slice(0, 24) : [];
    giusto = c.some(x => re.test(x.m.nome));
    if (e.q) cosa += c.length ? ' (proposte: ' + c.slice(0, 3).map(x => x.m.nome).join(', ') + '…)' : ' (nessuna proposta)';
  } else if (att.startsWith('L:')) { const L = S.daNome(att.slice(2)); giusto = !e.q && !!L && e.x === L.x; if (!giusto && e.q) { const re = new RegExp(att.slice(2), 'i'); giusto = S.candidati(e, pool, 'Green Theory').slice(0, 24).some(x => x.m.lib && re.test(x.m.nome)); } }
  else if (att === 'N') giusto = !e.q || S.candidati(e, pool, 'Green Theory').length > 0;
  if (giusto) ok++; else sbagli.push(riga + '  → ' + cosa + '   (atteso ' + att + ')');
}
console.log('esercizi giusti: ' + ok + '/' + tot);
if (sbagli.length) console.log(sbagli.join('\n'));
