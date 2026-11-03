# Guida per il personal trainer

La tua app di schede, tutta tua: ogni cliente ha la sua scheda sul telefono, funziona anche senza internet, e non paghi abbonamenti né server.

## Come funziona in breve

- **L'app** è una cartella da mettere online una volta, gratis.
- **Tu** apri la pagina **Coach** (`coach.html`), crei la scheda di un cliente e la mandi con un link su WhatsApp.
- **Il cliente** apre il link, la scheda si salva nel suo telefono e da lì l'app funziona anche offline. Segna pesi, ripetizioni, stelle e cardio.
- **Quando cambi la scheda** la rimandi con un nuovo link: al cliente restano storico, pesi e stelle.
- **Il cliente ti manda il resoconto** della settimana con un tasto, già scritto, su WhatsApp.

I dati dei clienti restano sui loro telefoni: tu non vedi niente in automatico, vedi solo i resoconti che ti mandano.

## 1. Personalizza (10 minuti)

Nella cartella dell'app cambi solo queste cose:

1. **`config.js`**: apri il file con un editor di testo (Blocco note va bene) e cambia nome dell'app, il tuo nome, la palestra, il colore e il tuo numero WhatsApp. In cima al file c'è la spiegazione di ogni voce.
2. **Le macchine**: nella lista `macchine` di `config.js` lascia solo quelle della tua palestra e aggiungi le tue. Per ognuna: un `id` senza spazi, il nome, i muscoli, i passi di esecuzione e la foto.
3. **Le foto**: mettile nella cartella `foto/`, una per macchina, in JPG, larghe circa 900 pixel. Il nome del file deve essere quello scritto in `foto` (es. `foto/leg-press.jpg`).
4. **Grafica**: il tema predefinito è Champagne (nero e oro). In `temi/sport.css` c'è quello sportivo chiaro/scuro: per usarlo copialo al posto di `tema.css`.
5. **Icona**: sostituisci `icon-180.png` e `icon-512.png` con il tuo logo (quadrato, 180×180 e 512×512 pixel).
6. **Nome sotto l'icona**: in `manifest.webmanifest` cambia `name` e `short_name`.

Ogni volta che cambi `config.js` o le foto, aumenta `versione` (da "1" a "2" e così via): così i telefoni dei clienti prendono la copia nuova.

Non vuoi farlo tu? Manda nome, logo, colore, lista delle macchine e foto a chi ti ha venduto l'app: te la configura lui.

## 2. Metti online (gratis, 5 minuti)

Il modo più semplice è **Netlify Drop**:

1. Vai su https://app.netlify.com/drop e crea un account gratuito.
2. Trascina la cartella dell'app nella pagina.
3. Ti dà un indirizzo tipo `https://nome-a-caso.netlify.app`. Nelle impostazioni del sito puoi cambiarlo in `https://mario-pt.netlify.app`.
4. Scrivi questo indirizzo in `config.js` alla voce `indirizzo` e ricarica la cartella.

Vanno bene anche **Cloudflare Pages** o **GitHub Pages**. Se vuoi un dominio tuo (es. `app.studiomario.it`) costa circa 10-15 euro l'anno.

Per aggiornare l'app: trascini di nuovo la cartella su Netlify (Deploys, poi trascina).

## 3. Crea la scheda di un cliente

1. Apri `https://il-tuo-indirizzo/coach.html` dal telefono o dal computer. Salvala nei preferiti (o "Aggiungi alla schermata Home").
2. **Nuovo cliente**: parti da una scheda vuota, dalla scheda di esempio o da quella di un altro cliente.
3. Scrivi il nome del cliente e quante volte a settimana si allena.
4. Per ogni allenamento: nome, una nota se serve, e gli esercizi. Ogni esercizio può essere una macchina della tua libreria (con foto e spiegazione) o un esercizio libero.
5. **Varianti A, B e C**: puoi fare fino a 3 versioni dello stesso allenamento, stessi muscoli su macchine diverse. L'app le alterna da sola. Se lasci vuote B e C, il cliente vede solo la A. Il tasto "Copia da A" ti fa partire dalla A e cambi solo le macchine.
6. **Duplica** crea una copia della scheda per un altro cliente.
7. **Catalogo dei produttori**: nel foglio dell'esercizio tocca "Cerca tra tutte le macchine dei produttori". Trovi più di 2.000 macchine da forza di Technogym, Panatta, Life Fitness, Hammer Strength, Cybex, Matrix, Precor, Impulse, gym80, Diamond, Nautilus e Lacertosus: cerca per nome, marca (la ricorda) e muscolo. Serve internet. La macchina scelta va al cliente con la sua foto, che si salva nel suo telefono quando apre il link: in palestra la vede anche offline.

Le schede che crei stanno nel browser che usi per la pagina Coach. **Scarica un backup ogni tanto** (in fondo alla lista clienti): serve se cambi telefono o se il browser viene svuotato.

## 4. Manda la scheda

Premi **Manda al cliente**, poi **WhatsApp**: si apre WhatsApp con il messaggio e il link già scritti, scegli il cliente e invia.

Il cliente:
1. apre il link con **Safari** (su Android con Chrome);
2. preme **Inizia**;
3. preme Condividi e poi **"Aggiungi alla schermata Home"**: da quel momento è un'icona sul telefono e funziona anche senza internet.

Con **Anteprima** vedi la scheda come la vede il cliente.

## Domande frequenti

**Il link è lunghissimo, è normale?** Sì: dentro c'è tutta la scheda. Una scheda di 4 allenamenti con 3 varianti e tante note arriva a circa 9.000 caratteri, WhatsApp lo gestisce senza problemi.

**Se il cliente cambia telefono?** Nell'app, in "Backup e note", copia il backup e lo incolla sul telefono nuovo. Tu gli rimandi il link della scheda.

**Posso vedere i progressi dei clienti?** Solo con il resoconto che ti mandano dal tasto "Manda il resoconto al coach". Una dashboard con i dati di tutti i clienti richiede un server e sarà una versione a parte.

**Il cliente vede la pagina Coach?** Solo se conosce l'indirizzo `coach.html`, e anche così vedrebbe le schede salvate sul suo telefono, cioè nessuna. Le tue schede stanno solo sul tuo dispositivo.
