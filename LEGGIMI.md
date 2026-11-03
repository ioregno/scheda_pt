# App schede per personal trainer (versione offline)

Prodotto da vendere una tantum ai PT, ricavato dall'app schede di giulio. Online (dopo aver attivato GitHub Pages): https://ioregno.github.io/scheda_pt/ (app del cliente) e https://ioregno.github.io/scheda_pt/coach.html (pagina del coach).

- `index.html`: app del cliente. `coach.html`: pagina dove il PT crea, duplica e manda le schede.
- `config.js`: l'unico file da personalizzare (nome, coach, palestra, colore, WhatsApp, libreria macchine, scheda di esempio).
- `tema.css`: la grafica, separata dalla logica. Predefinito: Champagne (sempre scuro, accento oro, titoli con grazie). `temi/sport.css`: il tema sportivo chiaro/scuro col verde fluo.
- `foto/`: foto delle macchine. `sw.js`: copia offline (salva pagine, config e foto alla prima apertura).
- `GUIDA-PT.md`: guida da dare al PT.
- `strumenti/crea_esempio.py`: rigenera `config.js` e `foto/` di esempio dal catalogo macchine e dalla scheda di giulio (in /mnt/project-files). Le foto dell'esempio sono di giulio e servono solo per la demo.

Come viaggia la scheda: il PT la compone in `coach.html`, l'app la comprime (deflate) e la mette nel link dopo `#s=`. La parte dopo `#` non arriva a nessun server. Il cliente conferma e la scheda resta in localStorage; storico e pesi sono separati, quindi un link nuovo aggiorna la scheda senza perdere niente.

Prova in locale: `python3 -m http.server 8765` nella cartella, poi http://localhost:8765/coach.html.
