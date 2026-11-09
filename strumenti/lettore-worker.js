// LETTORE DELLE SCHEDE (versione da solo): piccolo server che riceve le foto della scheda dall'app e le passa a Claude.
// Serve perché la chiave API non può stare dentro l'app (chiunque potrebbe leggerla e usarla a tue spese).
//
// Come metterlo online (gratis fino a 100.000 richieste al giorno) con Cloudflare Workers:
//   1. crea un account su dash.cloudflare.com, poi Workers & Pages > Create > Worker, incolla questo file e premi Deploy
//   2. Settings > Variables and Secrets: aggiungi il segreto ANTHROPIC_API_KEY (la chiave da console.anthropic.com)
//      e la variabile ORIGINE con l'indirizzo dell'app, es. https://ioregno.github.io
//   3. copia l'indirizzo del worker (es. https://lettore-schede.tuonome.workers.dev) nel campo "lettore" di config.js
// Costo: lo paga la chiave API, circa 1-3 centesimi a scheda letta (dipende da quante foto). Su console.anthropic.com
// imposta un limite di spesa mensile.
//
// Cosa controlla: solo richieste dall'indirizzo dell'app, al massimo 4 foto da 5 MB, modello e lunghezza della risposta fissati qui.
const MODELLO = 'claude-sonnet-5-5';
const MAX_FOTO = 4, MAX_BYTES = 5 * 1024 * 1024;

export default {
  async fetch(req, env){
    const origine = env.ORIGINE || '*';
    const cors = {'access-control-allow-origin': origine, 'access-control-allow-methods': 'POST, OPTIONS', 'access-control-allow-headers': 'content-type'};
    if (req.method === 'OPTIONS') return new Response(null, {headers: cors});
    if (req.method !== 'POST') return new Response('Solo POST', {status: 405, headers: cors});
    const da = req.headers.get('origin') || '';
    if (origine !== '*' && da !== origine) return new Response('Origine non permessa', {status: 403, headers: cors});
    let body;
    try { body = await req.json(); } catch (e) { return new Response('JSON non valido', {status: 400, headers: cors}); }
    const msg = body && Array.isArray(body.messages) && body.messages.length === 1 ? body.messages[0] : null;
    const parti = msg && msg.role === 'user' && Array.isArray(msg.content) ? msg.content : null;
    if (!parti) return new Response('Richiesta non valida', {status: 400, headers: cors});
    const foto = parti.filter(p => p.type === 'image'), testo = parti.filter(p => p.type === 'text');
    if (!foto.length || foto.length > MAX_FOTO || testo.length !== 1 || parti.length !== foto.length + 1) return new Response('Servono da 1 a 4 foto e un testo', {status: 400, headers: cors});
    if (foto.some(p => !p.source || p.source.type !== 'base64' || p.source.media_type !== 'image/jpeg' || String(p.source.data || '').length * .75 > MAX_BYTES))
      return new Response('Foto non valide', {status: 400, headers: cors});
    if (String(testo[0].text || '').length > 8000) return new Response('Testo troppo lungo', {status: 400, headers: cors});
    const r = await fetch('https://api.anthropic.com/v1/messages', {method: 'POST',
      headers: {'content-type': 'application/json', 'x-api-key': env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01'},
      body: JSON.stringify({model: MODELLO, max_tokens: 6000, messages: [{role: 'user', content: parti}]})});
    return new Response(r.body, {status: r.status, headers: Object.assign({'content-type': 'application/json'}, cors)});
  }
};
