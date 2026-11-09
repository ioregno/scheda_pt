// Misura quanto bene la versione da solo capisce una scheda scritta a mano.
// Uso: node strumenti/prove/misura.mjs strumenti/prove/righe-1.mjs   (dalla cartella principale dell'app)
// Ogni riga di prova: [testo, atteso, serie, ripetizioni]; atteso = 'H' intestazione, 'L:Nome' esercizio della libreria,
// 'M:/regex/' macchina il cui nome corrisponde, 'N' resta com'è scritto (nessun abbinamento).
import fs from 'fs';
import path from 'path';
const root = process.cwd();
const S = await import(path.join(root, 'solo.js'));
const {CASI} = await import(path.resolve(process.argv[2] || 'strumenti/prove/righe-1.mjs'));
const d = JSON.parse(fs.readFileSync(path.join(root, 'catalogo/catalogo.json'))); const CAT = d.m.map(a => Object.fromEntries(d.campi.map((k, i) => [k, a[i]])));
const C = new Function(fs.readFileSync(path.join(root, 'config.js'), 'utf8') + '; return CONFIG;')();
const pool = C.macchine.map(m => Object.assign({}, m, {lib: true})).concat(CAT);
let ok = 0, okNum = 0, totNum = 0; const sbagli = [];
for (const [riga, att, s, r] of CASI) {
  const o = S.leggiTesto('Giorno X\n' + riga);
  if (att === 'H') { if (!o.giorni.some(x => x.esercizi.length)) ok++; else sbagli.push(riga + '  → letto come esercizio'); continue; }
  const e = S.trasforma(o, pool, 'Green Theory', C.gruppi).giorni[0]?.A[0];
  if (!e) { sbagli.push(riga + '  → niente'); continue; }
  const m = e.m ? pool.find(x => x.id === e.m) : null;
  let giusto = false;
  if (att.startsWith('M:')) giusto = !!m && new RegExp(att.slice(3, -1), 'i').test(m.nome);
  else if (att.startsWith('L:')) { const L = S.daNome(att.slice(2)); giusto = (!m && !!L && e.x === L.x && (e.c || []).join() === (L.c || []).join()) || (!!m && m.lib && m.nome.toLowerCase() === att.slice(2).toLowerCase()); }
  else if (att === 'N') giusto = !m && !e.chk;
  if (giusto) ok++; else sbagli.push(riga + '  → ' + (m ? 'macchina ' + m.nome : e.n) + (e.chk ? ' [da controllare]' : '') + '   (atteso ' + att + ')');
  if (s !== undefined) { totNum++; if ((s === null || e.s === s) && (r === null || e.r === r)) okNum++; else sbagli.push(riga + '  → numeri ' + e.s + 'x' + e.r); }
}
console.log('righe capite: ' + ok + '/' + CASI.length + '   serie e ripetizioni giuste: ' + okNum + '/' + totNum);
if (sbagli.length) console.log(sbagli.join('\n'));
