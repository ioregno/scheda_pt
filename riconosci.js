// Riconoscimento di un macchinario da una foto, tutto sul dispositivo del coach (nessuna foto parte dal telefono).
// Metodo: un piccolo modello di visione (DINOv2-small, 24 MB, si scarica una volta e resta in memoria del browser)
// trasforma la foto in 384 numeri; si confronta con le "impronte" delle foto del catalogo (catalogo/impronte.bin,
// fatte da strumenti/crea_impronte.mjs). Vince la macchina più simile.
// Facoltativo: chiedere un secondo parere a Claude (chiave API del coach, salvata solo sul suo telefono).
const TF = 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.2';
const MODELLO = 'Xenova/dinov2-small';
let st = null;
export function pronto(onStato){
  return st = st || (async () => {
    onStato && onStato('Scarico il modello di riconoscimento (24 MB, solo la prima volta)…');
    const [tf, meta, bin] = await Promise.all([
      import(TF), fetch('catalogo/impronte.json').then(r => r.json()), fetch('catalogo/impronte.bin').then(r => r.arrayBuffer())]);
    tf.env.allowLocalModels = false;
    const pipe = await tf.pipeline('image-feature-extraction', MODELLO, {quantized: true});
    return {tf, pipe, ids: meta.ids, dim: meta.dim, scala: meta.scala, mat: new Int8Array(bin)};
  })().catch(e => { st = null; throw e; });
}
// foto (File/Blob) o fotogramma (canvas/video) -> canvas con lato massimo 448, già dritta
export async function preparaFoto(src, max = 448){
  let w, h, draw;
  if (src instanceof Blob) { let bm; try { bm = await createImageBitmap(src, {imageOrientation: 'from-image'}); } catch (e) { bm = await createImageBitmap(src); } w = bm.width; h = bm.height; draw = (c, cw, ch) => c.drawImage(bm, 0, 0, cw, ch); }
  else { w = src.videoWidth || src.width; h = src.videoHeight || src.height; draw = (c, cw, ch) => c.drawImage(src, 0, 0, cw, ch); }
  const k = Math.min(1, max / Math.max(w, h)), cv = document.createElement('canvas');
  cv.width = Math.round(w * k); cv.height = Math.round(h * k); draw(cv.getContext('2d'), cv.width, cv.height);
  return cv;
}
const blobOf = (cv, q = .85) => new Promise(r => cv.toBlob(r, 'image/jpeg', q));
// impronta della foto: 384 numeri di lunghezza 1
export async function impronta(cv){
  const m = await pronto(), img = await m.tf.RawImage.fromBlob(await blobOf(cv));
  const q = (await m.pipe(img)).data.slice(0, m.dim); let n = 0; for (const x of q) n += x * x; n = Math.sqrt(n) || 1;
  return Float32Array.from(q, x => x / n);
}
// somiglianza (-1..1) con tutte le foto del catalogo e poi con i "ricordi" (foto già riconosciute dal coach nella sua palestra)
export async function confronta(q, ricordi = []){
  const m = await pronto(), N = m.ids.length, sim = new Float32Array(N + ricordi.length);
  for (let i = 0; i < N; i++) { let s = 0; const o = i * m.dim; for (let j = 0; j < m.dim; j++) s += q[j] * m.mat[o + j]; sim[i] = s / m.scala; }
  ricordi.forEach((r, k) => { let s = 0; for (let j = 0; j < m.dim; j++) s += q[j] * r.v[j]; sim[N + k] = s; });
  return {ids: m.ids.concat(ricordi.map(r => r.id)), sim, n: N};
}
// le k macchine più simili, una volta sola ciascuna; mem = trovata grazie a un ricordo
export function migliori(res, k = 6){
  const ord = Array.from(res.sim.keys()).sort((a, b) => res.sim[b] - res.sim[a]), out = [], visti = new Set();
  for (const i of ord) { const id = res.ids[i]; if (visti.has(id)) continue; visti.add(id); out.push({id, sim: res.sim[i], mem: i >= res.n}); if (out.length >= k) break; }
  return out;
}
// ricordo compatto (circa 520 caratteri) da salvare nei dati del coach, e ritorno
export function codifica(q){
  const s = 127 / Math.max(...Array.from(q, Math.abs)), b = new Int8Array(q.length);
  q.forEach((x, i) => b[i] = Math.round(x * s));
  let t = ''; new Uint8Array(b.buffer).forEach(c => t += String.fromCharCode(c));
  return {s: +s.toFixed(3), b: btoa(t)};
}
export function decodifica(r){
  const t = atob(r.b), b = new Int8Array(t.length); for (let i = 0; i < t.length; i++) b[i] = (t.charCodeAt(i) << 24) >> 24;
  return Float32Array.from(b, x => x / r.s);
}
// secondo parere di Claude: legge anche loghi e scritte. Costa pochi centesimi a foto. La chiave resta sul telefono del coach.
export async function chiediAClaude(cv, candidati, chiave, modello = 'claude-sonnet-5-5'){
  const b64 = (await new Promise(r => { const f = new FileReader(); f.onload = () => r(f.result.split(',')[1]); blobOf(cv, .8).then(b => f.readAsDataURL(b)); }));
  const elenco = candidati.map((c, i) => (i + 1) + ') ' + c.id + ' = ' + c.etichetta).join('\n');
  const r = await fetch('https://api.anthropic.com/v1/messages', {method: 'POST',
    headers: {'content-type': 'application/json', 'x-api-key': chiave, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true'},
    body: JSON.stringify({model: modello, max_tokens: 300, messages: [{role: 'user', content: [
      {type: 'image', source: {type: 'base64', media_type: 'image/jpeg', data: b64}},
      {type: 'text', text: 'Questa è la foto di un macchinario da palestra. Candidati proposti da un confronto automatico (spesso sbagliati):\n' + elenco +
        '\n\nSe nella foto si leggono il logo, la marca o il nome della macchina (targhette, adesivi), usali: contano più della forma. Rispondi SOLO con un JSON: {"id":"<id del candidato giusto, oppure null se nessuno lo è>","marca":"<marca letta o dedotta, oppure null>","nome":"<nome del modello come scritto sulla macchina, in inglese se è in inglese, oppure null>","tipo":"<che macchina è, in italiano, es. lat machine>","motivo":"<una frase in italiano>"}'}]}]})});
  if (!r.ok) throw new Error('Claude ha risposto ' + r.status + (r.status === 401 ? ' (chiave non valida)' : ''));
  const t = (await r.json()).content.map(b => b.text || '').join('');
  const j = t.match(/\{[\s\S]*\}/); if (!j) throw new Error('Risposta non leggibile');
  return JSON.parse(j[0]);
}
