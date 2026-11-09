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

Per chi si allena da solo con una scheda che ha già (non la crea l'app: la rende facile da seguire ogni giorno). Si apre da `solo.html` (o `coach.html#solo`). Intro corta: nome e palestra (le catene con almeno 30 centri, più "Un'altra palestra"), poi quanti allenamenti ha la scheda e quante volte a settimana. Poi si copia la scheda a mano nell'editor della pagina Coach: per ogni esercizio la macchina (prima quelle delle marche della catena) o il nome dell'esercizio, serie e ripetizioni. Con "Usa questa scheda" va nell'app (`index.html`), dove tutto resta com'è: pesi, stelle, storico, offline.

- `solo.js`: intro e `CATENE`, le marche note per catena (Green Theory: Panatta, Diamond, Lacertosus; Anytime Fitness: Life Fitness, Hammer Strength; Icon: Matrix, Technogym; McFit: gym80; Orange e Virgin Active: Technogym; le altre vuote finché non le sappiamo). Le macchine di quelle marche vengono proposte per prime; se la palestra è quella di `config.js` si usa la sua libreria.
- Niente lettura della scheda da foto: tolta il 2026-11-09 perché richiedeva un server con una chiave API pagata per ogni lettura (si trova nel commit d165cb6 se servisse).
- `solo-dati.js`: 90 esercizi senza macchina (nomi, muscoli, passi, consiglio, GIF), usati per dare animazione e muscoli agli esercizi liberi.
- `gif/<id>.gif`: animazioni (disegni Everkinetic, CC BY-SA 4.0, crediti in fondo all'editor e in "Backup e note" dell'app). Sulle macchine la GIF compare solo se il disegno è dello stesso tipo di macchina. Si salvano nel telefono quando arriva la scheda.
- Nell'app da solo: niente "chiedi al coach"; "Modifica la scheda" porta a `coach.html#solo-modifica`; il resoconto diventa facoltativo ("Condividi i tuoi ultimi 7 giorni" in "Backup e note"). Le schede dei PT non cambiano: i clienti senza scheda vedono ancora "La tua scheda arriva dal coach".
- Per una copia solo "da solo" (senza pagina per PT): in `config.js` metti `"modo": "solo"`, così l'app senza scheda apre subito l'intro.
- Il catalogo serve internet la prima volta; poi l'app funziona offline.
