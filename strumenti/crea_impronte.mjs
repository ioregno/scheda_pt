// Crea catalogo/impronte.bin + impronte.json: l'"impronta" (384 numeri) di ogni foto del catalogo e della libreria,
// usata dalla pagina Coach per riconoscere un macchinario da una foto (riconosci.js).
// Uso:  cd strumenti && npm i @xenova/transformers@2.17.2 && node crea_impronte.mjs
// Va rifatto quando cambiano le foto del catalogo (crea_catalogo.py) o la libreria in config.js.
import { pipeline, RawImage } from '@xenova/transformers';
import fs from 'fs'; import path from 'path'; import vm from 'vm';
const R = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const MODEL = 'Xenova/dinov2-small', DIM = 384;
const cat = JSON.parse(fs.readFileSync(R + '/catalogo/catalogo.json'));
const items = cat.m.map(a => Object.fromEntries(cat.campi.map((c, i) => [c, a[i]])));
const ctx = {}; vm.runInNewContext(fs.readFileSync(R + '/config.js', 'utf8') + ';this.C=CONFIG', ctx);
(ctx.C.macchine || []).forEach(m => items.push({id: m.id, foto: m.foto}));
const list = items.filter(m => m.foto && fs.existsSync(R + '/' + m.foto));
console.log(list.length, 'foto');
const p = await pipeline('image-feature-extraction', MODEL, {quantized: true});
const vecs = [];
for (const [n, m] of list.entries()) {
  const o = await p(await RawImage.read(R + '/' + m.foto));
  const v = o.data.slice(0, DIM); let s = 0; for (const x of v) s += x * x; s = Math.sqrt(s) || 1;
  vecs.push(Float32Array.from(v, x => x / s));
  if (n % 200 === 0) console.log(n);
}
const scale = 127 / Math.max(...vecs.map(v => Math.max(...v.map(Math.abs))));
const bin = new Int8Array(vecs.length * DIM);
vecs.forEach((v, i) => v.forEach((x, j) => bin[i * DIM + j] = Math.round(x * scale)));
fs.writeFileSync(R + '/catalogo/impronte.bin', bin);
fs.writeFileSync(R + '/catalogo/impronte.json', JSON.stringify({v: new Date().toISOString().slice(0, 10), modello: MODEL, dim: DIM, scala: scale, ids: list.map(m => m.id)}));
console.log('fatto', bin.length, 'byte');
