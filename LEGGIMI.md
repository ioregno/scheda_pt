# App schede per personal trainer (versione offline)

Prodotto da vendere una tantum ai PT, ricavato dall'app schede di giulio. Online (dopo aver attivato GitHub Pages): https://ioregno.github.io/scheda_pt/ (app del cliente) e https://ioregno.github.io/scheda_pt/coach.html (pagina del coach).

- `index.html`: app del cliente. `coach.html`: pagina dove il PT crea, duplica e manda le schede.
- `config.js`: l'unico file da personalizzare (nome, coach, palestra, colore, WhatsApp, libreria macchine, scheda di esempio).
- `tema.css`: la grafica, separata dalla logica. Predefinito: Champagne (sempre scuro, accento oro, titoli con grazie). `temi/sport.css`: il tema sportivo chiaro/scuro col verde fluo.
- `foto/`: foto delle macchine. `sw.js`: copia offline (salva pagine, config e foto alla prima apertura).
- `GUIDA-PT.md`: guida da dare al PT.
- `strumenti/crea_esempio.py`: rigenera `config.js` e `foto/` di esempio dal catalogo macchine e dalla scheda di giulio (in /mnt/project-files). Le foto dell'esempio sono di giulio e servono solo per la demo.

Come viaggia la scheda: il PT la compone in `coach.html`, l'app la comprime (deflate) e la mette nel link dopo `#s=`. La parte dopo `#` non arriva a nessun server. Il cliente conferma e la scheda resta in localStorage; storico e pesi sono separati, quindi un link nuovo aggiorna la scheda senza perdere niente.

Catalogo dei produttori (`catalogo/`): `catalogo.json` (2.180 macchine da forza di 12 marchi, circa 50 KB compresso) e `catalogo/foto/<marca>/<id>.jpg` (circa 67 MB). Non fa parte della copia offline: la pagina Coach lo scarica quando il PT cerca una macchina e chiede le foto con `?c` (non restano nel telefono del PT). Le macchine scelte viaggiano nel link (`mac`: nome, marca, linea, muscoli, foto, link ufficiale); l'app del cliente salva solo quelle foto nella cache `catalogo-foto`, che sopravvive ai cambi di versione. Si rigenera con `python3 strumenti/crea_catalogo.py /mnt/project-files/macchinari/` dal catalogo raccolto nel progetto (fonti e note in macchinari/RICERCA-PRODUTTORI.md). Le foto sono dei produttori: prima di vendere l'app, chiedere il permesso ai marchi o ai distributori.

Prova in locale: `python3 -m http.server 8765` nella cartella, poi http://localhost:8765/coach.html.

## Prova a tempo (facoltativa)

Per far provare l'app a un PT per qualche giorno: pubblica la sua copia sul tuo account e in `config.js` metti `"scadenza": "2026-11-10"` e `"assistenza": "39333..."` (il tuo WhatsApp). Fino a quella data la pagina Coach mostra "Prova gratuita fino al…"; dal giorno dopo si blocca con il tasto "Attiva la versione completa" (apre WhatsApp verso di te) e il backup delle schede. I clienti del PT continuano a usare la scheda che hanno. Quando paga, svuoti `scadenza` e aumenti `versione`. Lasciata vuota, non c'è nessun limite.

Riconoscere una macchina da una foto (solo pagina Coach): `riconosci.js` carica da jsDelivr transformers.js 2.17.2 e il modello `Xenova/dinov2-small` (24 MB, dalla CDN di Hugging Face, poi resta nella cache del browser), trasforma la foto in 384 numeri e li confronta con `catalogo/impronte.bin` (Int8, una riga per foto del catalogo e della libreria di config.js, ordine in `catalogo/impronte.json`). Rifare le impronte quando cambiano le foto: `cd strumenti && npm i @xenova/transformers@2.17.2 && node crea_impronte.mjs`. "Inquadra dal vivo" usa la fotocamera (serve https) e rifà il confronto di continuo, mediando gli ultimi fotogrammi. Prove fatte (2026-11-04, foto del catalogo ritagliate, ruotate, sfocate e messe su sfondi di palestra): macchina giusta al primo posto 93%, tra le prime 5 99%; con ritagli più stretti 62% e 82%. Con 15 foto vere della Green Theory (2026-11-04, togliendo dal confronto le foto della libreria che erano le stesse) va molto peggio: il modello giusto esce primo 1 volta su 15 e il tipo di macchina giusto è tra i primi 5 circa 7 volte su 15. Per questo ci sono i ricordi: quando il coach sceglie la macchina dopo una foto, l'impronta resta in `db.ricordi` (massimo 4 per macchina, anche nel backup) e una foto simile della stessa macchina viene poi riconosciuta (15 su 15 su secondi scatti simulati). Da angolazioni molto diverse (targhetta da vicino e macchina intera) il ricordo non basta. Facoltativo "Chiedi a Claude": chiamata diretta dal browser all'API Anthropic con la chiave del coach (localStorage `coach-pt-claude`), manda la foto e i 12 candidati e chiede marca e nome letti su targhette e loghi; la pagina poi cerca quel nome in tutto il catalogo.

## Versione "da solo" (senza PT)

Per chi si allena da solo con una scheda che ha già (non la crea l'app: la rende facile da seguire ogni giorno). Si apre da `solo.html` (o `coach.html#solo`). Intro corta: nome e palestra (le catene con almeno 30 centri, più "Un'altra palestra"), poi "Scrivi la tua scheda": la si copia come sul foglio, una riga per esercizio ("Leg press 4x10 rec 90", "3 serie da 12", note tra parentesi), con il nome dell'allenamento sopra ("Giorno A", "Gambe:"). `leggiTesto` e `trasforma` in `solo.js` riconoscono gli esercizi senza macchina (nome uguale alla libreria, o con in più solo l'attrezzo) e le macchine (tabella `SIN` dall'italiano ai nomi dei produttori, poi le macchine della palestra, la marca scritta, le marche della catena). Prima di cercare, `capisci` sistema come si scrive di fretta: parole attaccate ("legpress"), errori di battitura (distanza di 1-2 lettere dalle parole conosciute), abbreviazioni ("bil", "man") e nomi da palestra (`ALIAS`, es. "flessioni" = Piegamenti, "military" = Lento avanti). Se ci sono più macchine simili l'esercizio resta in arancio da controllare nell'editor. Prove: `node strumenti/prove/misura.mjs strumenti/prove/righe-3.mjs` (quattro gruppi di righe scritte come le scrive la gente; i gruppi 3 e 4 prima delle correzioni davano 82% e 80%). Chi preferisce può aggiungere gli esercizi uno alla volta. Con "Usa questa scheda" va nell'app (`index.html`), dove tutto resta com'è: pesi, stelle, storico, offline.

- `solo.js`: intro e `CATENE`, le marche note per catena (Green Theory: Panatta, Diamond, Lacertosus; Anytime Fitness: Life Fitness, Hammer Strength; Icon: Matrix, Technogym; McFit: gym80; Orange e Virgin Active: Technogym; le altre vuote finché non le sappiamo). Le macchine di quelle marche vengono proposte per prime; se la palestra è quella di `config.js` si usa la sua libreria.
- Niente lettura della scheda da foto: tolta il 2026-11-09 perché richiedeva un server con una chiave API pagata per ogni lettura (si trova nel commit d165cb6 se servisse).
- `solo-dati.js`: 90 esercizi senza macchina (nomi, muscoli, passi, consiglio, GIF), usati per dare animazione e muscoli agli esercizi liberi.
- `gif/<id>.gif`: animazioni (disegni Everkinetic, CC BY-SA 4.0, crediti in fondo all'editor e in "Backup e note" dell'app). Sulle macchine la GIF compare solo se il disegno è dello stesso tipo di macchina. Si salvano nel telefono quando arriva la scheda.
- Nell'app da solo: niente "chiedi al coach"; "Modifica la scheda" porta a `coach.html#solo-modifica`; il resoconto diventa facoltativo ("Condividi i tuoi ultimi 7 giorni" in "Backup e note"). Le schede dei PT non cambiano: i clienti senza scheda vedono ancora "La tua scheda arriva dal coach".
- Per una copia solo "da solo" (senza pagina per PT): in `config.js` metti `"modo": "solo"`, così l'app senza scheda apre subito l'intro.
- Il catalogo serve internet la prima volta; poi l'app funziona offline.

## Codici di attivazione (facoltativi)

Per vendere l'app senza che chi la compra la giri agli amici. Con `"licenze"` in `config.js` (indirizzo del server) l'app al primo avvio chiede un codice tipo `ABCD-EF23-GH45`; il server controlla che ogni codice sia attivo al massimo su 2 telefoni (si cambia quando lo crei). Dopo l'attivazione l'app funziona anche offline e ogni 3 giorni, se c'è rete, ricontrolla: un codice bloccato o "liberato" smette di funzionare su quel telefono. Se il server non risponde l'app continua a funzionare.

- `licenza.js`: la schermata "Attiva l'app" (caricata da `index.html` e `coach.html`). Non chiede niente nelle demo (`#prova`, `#esempio`, `prova.html`) e ai clienti di un PT (scheda arrivata dal coach); la chiede nella versione da solo e nella pagina Coach.
- `strumenti/licenze-worker.js`: il server (Cloudflare Worker + KV, gratis). Istruzioni in cima al file. Con `/admin` alla fine dell'indirizzo c'è la pagina per creare i codici (con il nome di chi li ha comprati), vedere quanti telefoni li usano, liberarli o bloccarli.
- Su iPhone Safari e l'app sulla schermata Home hanno memorie separate: attivarla in entrambi usa 2 telefoni. Per questo la schermata dice di attivarla dalla Home.
- Non è una protezione assoluta: il codice dell'app è comunque scaricabile dal browser e chi sa programmare può togliere il controllo. Ferma l'amica che riceve il link. Per non rendere pubblico anche il repository, pubblicare l'app con Cloudflare Pages da un repository privato invece di GitHub Pages.

### Spostare l'app su Cloudflare Pages (repository privato)

1. dash.cloudflare.com > Workers & Pages > Create > Pages > Connect to Git: autorizza GitHub e scegli questo repository, ramo `main`. Framework: nessuno, build command vuoto, output directory `/`.
2. L'indirizzo sarà `nome-progetto.pages.dev` (si sceglie il nome del progetto). Mettilo in `ORIGINE` del worker dei codici.
3. Solo dopo, su GitHub: Settings > General > Change visibility > Private (GitHub Pages smette di funzionare).
4. Attenzione: i dati dell'app (scheda, pesi, storico) sono legati all'indirizzo. Chi l'ha già usata dal vecchio indirizzo deve fare il backup e ricaricarlo nel nuovo.

