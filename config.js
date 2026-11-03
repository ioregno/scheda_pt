// CONFIGURAZIONE DELL'APP: l'unico file da cambiare (vedi GUIDA-PT.md).
// Questa è la configurazione di ESEMPIO, creata da strumenti/crea_esempio.py.
//   versione   aumentala (2, 3...) ogni volta che cambi questo file o le foto: i telefoni scaricano la copia nuova
//   app        nome sotto l'icona e in alto nell'app
//   coach      il tuo nome;  palestra  nome della palestra
//   colore     colore principale, es. "#E6BE8A" (oro); vuoto = colore del tema
//   whatsapp   tuo numero con prefisso, es. "393331234567": i clienti ti mandano il resoconto lì
//   indirizzo  (facoltativo) indirizzo dell'app online, es. "https://mario-pt.netlify.app/"
//   gruppi     muscoli tra cui scegliere
//   macchine   la tua libreria: id (senza spazi), nome, marca, distretto, gruppi, esecuzione (passi), consiglio, foto ("foto/nome.jpg")
//   esempio    scheda di esempio: la vedono i clienti in "Guarda un esempio" e tu come modello
var CONFIG = {
 "versione": "1",
 "app": "Scheda",
 "coach": "Il tuo coach",
 "indirizzo": "",
 "palestra": "Green Theory",
 "colore": "#E6BE8A",
 "whatsapp": "",
 "gruppi": [
  "Petto",
  "Spalle",
  "Schiena",
  "Trapezio",
  "Tricipiti",
  "Bicipiti",
  "Quadricipiti",
  "Femorali",
  "Glutei",
  "Lombari",
  "Polpacci",
  "Addominali"
 ],
 "macchine": [
  {
   "id": "inclined-chest-press",
   "nome": "Inclined Chest Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto alto (porzione superiore del gran pettorale) e deltoide anteriore",
   "gruppi": [
    "Spalle",
    "Petto"
   ],
   "esecuzione": [
    "Regola la seduta in modo che le impugnature siano all'altezza della parte alta del petto.",
    "Scapole addotte e depresse, petto alto: spingi verso l'alto e in avanti senza staccare la schiena.",
    "Ritorna lento fino a sentire lo stiramento del petto alto, senza far rimbalzare il carico."
   ],
   "consiglio": "Gomiti a circa 45-60° dal busto: se li apri troppo lavora più la spalla. Ottima come primo esercizio della giornata petto.",
   "foto": "foto/inclined-chest-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/inclined-chest-press/"
  },
  {
   "id": "vertical-chest-press",
   "nome": "Vertical Chest Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto centrale (porzione centrale del gran pettorale)",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Seduta regolata con le impugnature a metà sterno.",
    "Petto in fuori e scapole chiuse, spingi fino quasi a distendere le braccia senza bloccare i gomiti.",
    "Rientra controllando 2-3 secondi."
   ],
   "consiglio": "Usa le leve indipendenti per qualche serie a un braccio se un lato del petto è più indietro.",
   "foto": "foto/vertical-chest-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/vertical-chest-press/"
  },
  {
   "id": "declined-chest-press",
   "nome": "Declined Chest Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto basso (porzione inferiore del gran pettorale), deltoide anteriore",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Regola lo schienale per avere un buon pre-stiramento senza dolore alla spalla.",
    "Spingi in basso e in avanti, chiudendo il petto.",
    "Ritorno controllato fino al punto di stiramento."
   ],
   "consiglio": "Per tenerla sul petto usa la presa prona; la presa neutra la sposta sulla spalla anteriore.",
   "foto": "foto/declined-chest-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/declined-chest-press/"
  },
  {
   "id": "middle-chest-flight-machine",
   "nome": "Middle Chest Flight Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto centrale, isolamento (croci)",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Seduta con le maniglie all'altezza del petto, gomiti leggermente flessi e fermi.",
    "Chiudi le braccia ad arco come per abbracciare un albero, stringi il petto 1 secondo.",
    "Apri lento fino a sentire lo stiramento, senza portare le spalle in avanti."
   ],
   "consiglio": "Non spingere con le mani: pensa a portare i gomiti uno verso l'altro. Carico moderato, 10-15 ripetizioni.",
   "foto": "foto/middle-chest-flight-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/middle-chest-flight-machine/"
  },
  {
   "id": "upper-chest-flight-machine",
   "nome": "Upper Chest Flight Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto alto, isolamento (croci inclinate)",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Seduta regolata in modo che il movimento chiuda all'altezza delle clavicole.",
    "Chiudi verso l'alto e in avanti con i gomiti semi-flessi.",
    "Apri lento, petto alto, scapole ferme."
   ],
   "consiglio": "Ottima dopo una spinta inclinata per finire il petto alto senza caricare i tricipiti.",
   "foto": "foto/upper-chest-flight-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/upper-chest-flight-machine/"
  },
  {
   "id": "power-smith-machine-multi-angles",
   "nome": "Power Smith Machine Multi Angles",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Petto (tutti i fasci), deltoide anteriore e laterale, tricipiti",
   "gruppi": [
    "Spalle",
    "Schiena",
    "Trapezio"
   ],
   "esecuzione": [
    "Scegli l'inclinazione: -20° petto basso, 0° petto centrale, 45° petto alto, 80° spalle.",
    "Piedi saldi, scapole addotte, spingi lungo la traiettoria convergente.",
    "Scendi controllato fino a un buono stiramento."
   ],
   "consiglio": "Utile per cambiare angolo tra un ciclo e l'altro senza cambiare macchina.",
   "foto": "foto/power-smith-machine-multi-angles.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/power-smith-machine-multi-angles/"
  },
  {
   "id": "pullover-machine",
   "nome": "Pullover Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Gran pettorale e gran dorsale",
   "gruppi": [
    "Schiena",
    "Petto"
   ],
   "esecuzione": [
    "Regola seduta e schienale in modo che la spalla sia allineata col perno della macchina.",
    "Allaccia la cintura, parti con le braccia in alto dietro la testa.",
    "Porta la barra verso le cosce con le braccia quasi tese, poi ritorna lento in allungamento."
   ],
   "consiglio": "Per il dorsale pensa a spingere coi gomiti verso il basso; per il petto chiudi più stretto. Tocca il fondo dell'allungamento senza fretta.",
   "foto": "foto/pullover-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/pullover-machine/"
  },
  {
   "id": "deltoid-press",
   "nome": "Deltoid Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Deltoidi (soprattutto anteriore) e fasci clavicolari del petto",
   "gruppi": [
    "Spalle"
   ],
   "esecuzione": [
    "Regola la seduta: le impugnature partono all'altezza delle spalle.",
    "Schiena appoggiata, addome contratto, spingi sopra la testa senza bloccare i gomiti.",
    "Riscendi lento fino all'altezza del mento o poco sotto."
   ],
   "consiglio": "Presa neutra se senti fastidio alla spalla. Prima delle alzate, quando sei fresco.",
   "foto": "foto/deltoid-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/deltoid-press/"
  },
  {
   "id": "viking-press",
   "nome": "Viking Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Deltoidi e fasci clavicolari del gran pettorale (spalle e petto alto)",
   "gruppi": [
    "Spalle",
    "Petto"
   ],
   "esecuzione": [
    "In piedi o seduto secondo regolazione, impugnature all'altezza delle spalle.",
    "Spingi in alto lungo l'arco della macchina, busto fermo.",
    "Ritorno controllato, senza perdere la tensione in basso."
   ],
   "consiglio": "Alternativa più pesante alla Deltoid Press: buona per lavorare in 6-8 ripetizioni.",
   "foto": "foto/viking-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/viking-press/"
  },
  {
   "id": "lateral-deltoids",
   "nome": "Lateral Deltoids",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Capo laterale del deltoide",
   "gruppi": [
    "Spalle"
   ],
   "esecuzione": [
    "Seduta regolata: la spalla allineata col perno delle leve.",
    "Solleva i gomiti di lato fino all'altezza delle spalle, mignolo leggermente più alto.",
    "Scendi lento, senza riposare in basso."
   ],
   "consiglio": "Spingi con i gomiti, non con le mani, e non alzare le spalle verso le orecchie. 12-20 ripetizioni.",
   "foto": "foto/lateral-deltoids.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/lateral-deltoids/"
  },
  {
   "id": "back-deltoids",
   "nome": "Back Deltoids",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Capo posteriore del deltoide",
   "gruppi": [
    "Spalle"
   ],
   "esecuzione": [
    "Petto contro lo schienale, braccia tese avanti all'altezza delle spalle.",
    "Apri le braccia all'indietro ad arco, fermandoti quando le braccia sono in linea col busto.",
    "Ritorna controllato."
   ],
   "consiglio": "Non stringere le scapole: se chiudi troppo dietro lavora il trapezio. Carico leggero e tante ripetizioni.",
   "foto": "foto/back-deltoids.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/back-deltoids/"
  },
  {
   "id": "shrug-machine",
   "nome": "Shrug Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Trapezio superiore ed elevatore della scapola",
   "gruppi": [
    "Trapezio"
   ],
   "esecuzione": [
    "Braccia tese lungo i fianchi, collo neutro.",
    "Alza le spalle verso le orecchie in linea retta, tieni 1 secondo in alto.",
    "Scendi lento fino al massimo allungamento."
   ],
   "consiglio": "Niente rotazioni delle spalle: solo su e giù. Pausa in alto per sentire il trapezio.",
   "foto": "foto/shrug-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/shrug-machine/"
  },
  {
   "id": "curling-machine",
   "nome": "Curling Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Bicipiti e brachiale",
   "gruppi": [
    "Bicipiti"
   ],
   "esecuzione": [
    "Regola la seduta: l'ascella appoggia in cima al cuscino, gomiti allineati col perno.",
    "Fletti i gomiti fino in alto senza staccare i gomiti dal cuscino.",
    "Riscendi lento quasi a braccio teso."
   ],
   "consiglio": "Presa stretta per il capo lungo, larga per il capo corto. Non usare la schiena per tirare.",
   "foto": "foto/curling-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/curling-machine/"
  },
  {
   "id": "french-press-machine",
   "nome": "French Press Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Tricipiti, soprattutto il capo lungo",
   "gruppi": [
    "Tricipiti"
   ],
   "esecuzione": [
    "Seduta regolata: gomiti in alto vicino alla testa.",
    "Estendi i gomiti spingendo il maniglione in avanti e in alto.",
    "Ritorna lento lasciando che il tricipite si allunghi dietro la testa."
   ],
   "consiglio": "Tieni i gomiti stretti e fermi: tutto il movimento è al gomito.",
   "foto": "foto/french-press-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/french-press-machine/"
  },
  {
   "id": "dips-press",
   "nome": "Dips Press",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Tricipiti, con gran pettorale e deltoide anteriore",
   "gruppi": [
    "Petto",
    "Tricipiti"
   ],
   "esecuzione": [
    "Seduto, impugnature ai lati, busto dritto.",
    "Spingi verso il basso fino a distendere i gomiti.",
    "Risali lento fino a gomiti a circa 90°."
   ],
   "consiglio": "Busto dritto e gomiti vicini = più tricipiti; busto in avanti = più petto.",
   "foto": "foto/dips-press.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/dips-press/"
  },
  {
   "id": "lat-machine-convergent",
   "nome": "Lat Machine Convergent",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Gran dorsale e grande rotondo (larghezza della schiena)",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Blocca le gambe sotto i rulli, petto alto.",
    "Tira portando i gomiti verso i fianchi, non dietro.",
    "Risali lento fino a sentire il dorsale allungato."
   ],
   "consiglio": "Prima abbassa le scapole, poi tira con le braccia. Un braccio alla volta se un lato è più debole.",
   "foto": "foto/lat-machine-convergent.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/lat-machine-convergent/"
  },
  {
   "id": "lat-pulldown-circular",
   "nome": "Lat Pulldown Circular",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Grande rotondo e parte alta del gran dorsale (ampiezza del dorso)",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Gambe bloccate, busto leggermente indietro.",
    "Tira ad arco portando i gomiti in basso e di lato.",
    "Risali controllato, braccia quasi tese."
   ],
   "consiglio": "Presa prona larga per insistere sul grande rotondo.",
   "foto": "foto/lat-pulldown-circular.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/lat-pulldown-circular/"
  },
  {
   "id": "high-row",
   "nome": "High Row",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Dorso completo: gran dorsale, grande rotondo, romboidi, trapezio",
   "gruppi": [
    "Schiena",
    "Trapezio"
   ],
   "esecuzione": [
    "Petto contro il cuscino, gambe bloccate.",
    "Tira dall'alto verso il petto portando i gomiti dietro e in basso.",
    "Ritorna lento."
   ],
   "consiglio": "Una via di mezzo tra lat e rematore: buona per lavorare larghezza e spessore insieme.",
   "foto": "foto/high-row.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/high-row/"
  },
  {
   "id": "low-row",
   "nome": "Low Row",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Parte alta del dorso (spessore)",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Petto contro il cuscino, schiena neutra.",
    "Tira verso il basso addome portando i gomiti indietro e stringendo le scapole.",
    "Ritorna allungando bene le scapole in avanti."
   ],
   "consiglio": "Lascia ruotare le impugnature: il polso trova da solo la posizione.",
   "foto": "foto/low-row.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/low-row/"
  },
  {
   "id": "rowing-machine",
   "nome": "Rowing Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Parte centrale del dorso (spessore)",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Petto contro il cuscino.",
    "Tira portando i gomiti indietro, petto fermo.",
    "Pausa di un secondo a scapole chiuse, poi ritorno lento."
   ],
   "consiglio": "Presa prona e gomiti larghi per la parte alta, neutra e gomiti stretti per il dorsale.",
   "foto": "foto/rowing-machine.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/rowing-machine/"
  },
  {
   "id": "power-row",
   "nome": "Power Row",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Parte centrale del dorso (spessore)",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Seduta regolata con le maniglie all'altezza del petto basso.",
    "Tira coi gomiti verso i fianchi.",
    "Ritorno lento a braccia tese."
   ],
   "consiglio": "Buono per carichi alti in 6-10 ripetizioni.",
   "foto": "foto/power-row.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/power-row/"
  },
  {
   "id": "adjustable-row-45",
   "nome": "Adjustable Row 45°",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Parte alta e centrale del dorso: gran dorsale, romboidi, trapezio, deltoide posteriore",
   "gruppi": [
    "Schiena",
    "Spalle"
   ],
   "esecuzione": [
    "Scegli la convergenza: più è alta, più allungamento in basso.",
    "Petto contro l'imbottitura a 45°, tira i gomiti indietro.",
    "Ritorna lentamente sfruttando l'allungamento."
   ],
   "consiglio": "Prova le tre convergenze in cicli diversi: è come avere tre rematori.",
   "foto": "foto/adjustable-row-45.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/adjustable-row-45/"
  },
  {
   "id": "dorsy-bar",
   "nome": "Dorsy Bar",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Dorso completo: gran dorsale, romboidi, trapezio, deltoide posteriore, erettori spinali",
   "gruppi": [
    "Schiena",
    "Spalle"
   ],
   "esecuzione": [
    "Piedi sulle pedane, busto inclinato in avanti con schiena neutra.",
    "Tira verso l'addome portando i gomiti indietro.",
    "Ritorna lento senza perdere la posizione della schiena."
   ],
   "consiglio": "Lavora anche la zona lombare: tienila neutra e non partire col busto.",
   "foto": "foto/dorsy-bar.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/dorsy-bar/"
  },
  {
   "id": "hack-squat",
   "nome": "Hack Squat",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Quadricipiti, poi glutei e femorali",
   "gruppi": [
    "Quadricipiti",
    "Glutei"
   ],
   "esecuzione": [
    "Schiena e spalle ben appoggiate, piedi a larghezza spalle.",
    "Scendi controllato fino a cosce almeno parallele.",
    "Spingi con tutto il piede senza bloccare le ginocchia in alto."
   ],
   "consiglio": "Piedi bassi e stretti = più quadricipite; piedi alti e larghi = più glutei.",
   "foto": "foto/hack-squat.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/hack-squat/"
  },
  {
   "id": "pendulum-squat",
   "nome": "Pendulum Squat",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Cosce, con enfasi sui quadricipiti; glutei",
   "gruppi": [
    "Quadricipiti",
    "Glutei"
   ],
   "esecuzione": [
    "Spalle sotto i cuscini, piedi al centro della pedana.",
    "Scendi profondo seguendo l'arco della macchina.",
    "Risali spingendo, busto appoggiato."
   ],
   "consiglio": "Permette di scendere molto: sfrutta tutta l'escursione con carichi gestibili.",
   "foto": "foto/pendulum-squat.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/pendulum-squat/"
  },
  {
   "id": "squat-machine-and-calf",
   "nome": "Squat and Calf Machine",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Quadricipiti, glutei, femorali; polpacci (gastrocnemio e soleo)",
   "gruppi": [
    "Quadricipiti",
    "Femorali"
   ],
   "esecuzione": [
    "Squat: scendi seguendo la guida trovando il tuo assetto, risali spingendo coi talloni.",
    "Calf: apri le pedane, appoggia l'avampiede, scendi in allungamento e sali sulle punte.",
    "Pausa di un secondo in alto e in basso."
   ],
   "consiglio": "Per i polpacci gamba tesa = gastrocnemio. Ripetizioni lente, niente rimbalzi.",
   "foto": "foto/squat-machine-and-calf.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/squat-machine-and-calf/"
  },
  {
   "id": "leg-press-45",
   "nome": "Leg Press 45°",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Cosce complete: quadricipiti, glutei",
   "gruppi": [
    "Quadricipiti",
    "Glutei"
   ],
   "esecuzione": [
    "Schiena e bacino ben appoggiati, piedi a larghezza spalle.",
    "Scendi finché il bacino resta attaccato allo schienale.",
    "Spingi senza bloccare le ginocchia."
   ],
   "consiglio": "Non scendere tanto da staccare il sedere: è lì che soffre la schiena.",
   "foto": "foto/leg-press-45.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/leg-press-45/"
  },
  {
   "id": "leg-press-bridge",
   "nome": "Leg Press Bridge",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Cosce complete e glutei",
   "gruppi": [
    "Glutei"
   ],
   "esecuzione": [
    "Scegli l'inclinazione dello schienale.",
    "Piedi al centro, scendi controllato.",
    "Spingi con tutto il piede."
   ],
   "consiglio": "Piedi alti sulla pedana per più glutei e femorali.",
   "foto": "foto/leg-press-bridge.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/leg-press-bridge/"
  },
  {
   "id": "leg-extension",
   "nome": "Leg Extension",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Quadricipiti, isolamento",
   "gruppi": [
    "Quadricipiti"
   ],
   "esecuzione": [
    "Ginocchio allineato al perno, rullo sopra la caviglia.",
    "Estendi fino in alto e stringi 1 secondo.",
    "Scendi lento."
   ],
   "consiglio": "Schienale più inclinato indietro = più retto femorale.",
   "foto": "foto/leg-extension.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/leg-extension/"
  },
  {
   "id": "seated-leg-curling",
   "nome": "Seated Leg Curling",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Femorali (ischiocrurali), da seduto",
   "gruppi": [
    "Femorali"
   ],
   "esecuzione": [
    "Ginocchio allineato al perno, rullo superiore stretto sulle cosce.",
    "Fletti le ginocchia portando i talloni sotto la seduta.",
    "Ritorna lento fino quasi a gamba tesa."
   ],
   "consiglio": "Da seduto i femorali sono già allungati all'anca: lavorano molto bene.",
   "foto": "foto/seated-leg-curling.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/seated-leg-curling/"
  },
  {
   "id": "kneeling-leg-curling",
   "nome": "Kneeling Leg Curling",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Femorali (bicipite femorale, semitendinoso, semimembranoso), una gamba alla volta",
   "gruppi": [
    "Femorali"
   ],
   "esecuzione": [
    "Ginocchio sul cuscino, bacino fermo.",
    "Porta il tallone verso il gluteo.",
    "Ritorna lento."
   ],
   "consiglio": "Ideale per pareggiare una gamba più debole.",
   "foto": "foto/kneeling-leg-curling.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/kneeling-leg-curling/"
  },
  {
   "id": "hip-thrust",
   "nome": "Hip Thrust",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Glutei e muscoli posteriori della coscia",
   "gruppi": [
    "Glutei",
    "Femorali"
   ],
   "esecuzione": [
    "Schiena sullo schienale, rullo sul bacino, piedi a larghezza anche.",
    "Spingi il bacino in alto fino ad allineare busto e cosce, stringi i glutei 1-2 secondi.",
    "Scendi controllato."
   ],
   "consiglio": "Mento verso il petto e niente iperestensione lombare in alto.",
   "foto": "foto/hip-thrust.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/hip-thrust/"
  },
  {
   "id": "standing-hip-thrust",
   "nome": "Standing Hip Thrust",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Glutei, con femorali",
   "gruppi": [
    "Femorali",
    "Glutei"
   ],
   "esecuzione": [
    "In piedi, bacino contro l'imbottitura.",
    "Estendi le anche spingendo il bacino in avanti.",
    "Ritorna piegando le anche, schiena neutra."
   ],
   "consiglio": "Alternativa all'hip thrust da sdraiato, più rapida da impostare.",
   "foto": "foto/standing-hip-thrust.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/standing-hip-thrust/"
  },
  {
   "id": "seated-calf",
   "nome": "Seated Calf",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Polpacci, soprattutto il soleo",
   "gruppi": [
    "Polpacci"
   ],
   "esecuzione": [
    "Seduto, cuscino sopra le ginocchia, avampiede sulla pedana.",
    "Scendi col tallone fino al massimo allungamento.",
    "Sali sulle punte e tieni 1 secondo."
   ],
   "consiglio": "Ripetizioni lente e piene, 12-20. Abbinala a un lavoro a gamba tesa per il gastrocnemio.",
   "foto": "foto/seated-calf.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/seated-calf/"
  },
  {
   "id": "abdominal-crunch-2",
   "nome": "Abdominal Crunch",
   "marca": "Panatta",
   "linea": "Freeweight One",
   "distretto": "Addominali e core",
   "gruppi": [
    "Addominali"
   ],
   "esecuzione": [
    "Regola il poggiaspalle e siediti ben appoggiato.",
    "Arrotola il busto portando lo sterno verso il bacino.",
    "Ritorna lento senza mollare la tensione."
   ],
   "consiglio": "Espira mentre chiudi. Non tirare con le braccia.",
   "foto": "foto/abdominal-crunch-2.jpg",
   "link": "https://www.panattasport.com/it/freeweight-one/abdominal-crunch-2/"
  },
  {
   "id": "dap-incline-chest-press",
   "nome": "DAP Incline Chest Press",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Petto alto (porzione clavicolare), deltoide anteriore, tricipiti",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Seduta con le impugnature all'altezza del petto alto.",
    "Spingi in alto e in avanti con le scapole chiuse.",
    "Ritorno controllato."
   ],
   "consiglio": "Alternativa a dischi della Inclined Chest Press Panatta.",
   "foto": "foto/dap-incline-chest-press.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-incline-chest-press/"
  },
  {
   "id": "dap-incline-peck-fly",
   "nome": "DAP Incline Peck Fly",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Gran pettorale, soprattutto la porzione clavicolare (isolamento)",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Braccia aperte con i gomiti semi-flessi.",
    "Chiudi verso l'alto stringendo il petto.",
    "Apri lento fino allo stiramento."
   ],
   "consiglio": "Carico moderato, pensa a chiudere coi gomiti.",
   "foto": "foto/dap-incline-peck-fly.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-incline-peck-fly/"
  },
  {
   "id": "dap-wide-pull-down",
   "nome": "DAP Wide Pull Down",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Gran dorsale, romboidi, muscolatura scapolare",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Gambe bloccate, petto alto.",
    "Tira portando i gomiti in basso e larghi.",
    "Risali lento."
   ],
   "consiglio": "Alternativa a dischi della Lat Machine Convergent.",
   "foto": "foto/dap-wide-pull-down.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-wide-pull-down/"
  },
  {
   "id": "dap-smith-row",
   "nome": "DAP Smith Row",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Gran dorsale, romboidi, trapezio, deltoide posteriore",
   "gruppi": [
    "Schiena",
    "Spalle"
   ],
   "esecuzione": [
    "Busto inclinato e stabile, schiena neutra.",
    "Tira verso l'addome coi gomiti vicini al corpo.",
    "Ritorno controllato."
   ],
   "consiglio": "Un rematore con bilanciere guidato: puoi caricare molto.",
   "foto": "foto/dap-smith-row.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-smith-row/"
  },
  {
   "id": "dap-chopper-row",
   "nome": "DAP Chopper Row",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Gran dorsale, romboidi, trapezio, deltoide posteriore",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Petto sul supporto, scegli rotazione e ampiezza delle maniglie.",
    "Tira coi gomiti indietro.",
    "Ritorna allungando."
   ],
   "consiglio": "Maniglie larghe per la parte alta, strette per il dorsale.",
   "foto": "foto/dap-chopper-row.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-chopper-row/"
  },
  {
   "id": "dap-supported-chest-t-bar",
   "nome": "DAP Supported Chest T-Bar",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Dorsali, romboidi, trapezi, deltoide posteriore (parte alta della schiena)",
   "gruppi": [
    "Schiena",
    "Spalle"
   ],
   "esecuzione": [
    "Regola l'altezza del cuscino petto.",
    "Tira portando i gomiti indietro e le scapole insieme.",
    "Ritorno lento."
   ],
   "consiglio": "Ottima se la zona lombare si affatica nei rematori liberi.",
   "foto": "foto/dap-supported-chest-t-bar.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-supported-chest-t-bar/"
  },
  {
   "id": "dap-low-row",
   "nome": "DAP Low Row",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Dorsali, romboidi, trapezi",
   "gruppi": [
    "Schiena",
    "Trapezio"
   ],
   "esecuzione": [
    "Seduta e supporto toracico regolati.",
    "Tira verso l'addome stringendo le scapole.",
    "Ritorna lento."
   ],
   "consiglio": "Alternativa a dischi della Low Row Panatta.",
   "foto": "foto/dap-low-row.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-low-row/"
  },
  {
   "id": "dap-perfect-squat",
   "nome": "DAP Perfect Squat",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Quadricipiti, glutei, catena posteriore",
   "gruppi": [
    "Quadricipiti",
    "Glutei"
   ],
   "esecuzione": [
    "Spalle sotto i cuscini, piedi a larghezza spalle.",
    "Scendi fino a cosce parallele o sotto.",
    "Risali spingendo con tutto il piede."
   ],
   "consiglio": "Alternativa all'Hack Squat.",
   "foto": "foto/dap-perfect-squat.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-perfect-squat/"
  },
  {
   "id": "dap-incline-leg-press-45",
   "nome": "DAP Incline Leg Press 45°",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Quadricipiti, glutei, femorali",
   "gruppi": [
    "Quadricipiti",
    "Glutei"
   ],
   "esecuzione": [
    "Bacino attaccato allo schienale, mani alle maniglie sotto il sedile.",
    "Scendi controllato.",
    "Spingi senza bloccare le ginocchia."
   ],
   "consiglio": "Piedi bassi per quadricipiti, alti per glutei e femorali.",
   "foto": "foto/dap-incline-leg-press-45.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-incline-leg-press-45/"
  },
  {
   "id": "dap-hip-press",
   "nome": "DAP Hip Press",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Quadricipiti, glutei, femorali",
   "gruppi": [
    "Quadricipiti",
    "Femorali"
   ],
   "esecuzione": [
    "Seduto, schiena ben appoggiata, piedi sulla pedana.",
    "Spingi in avanti.",
    "Ritorna controllato."
   ],
   "consiglio": "Piedi alti e larghi per spostarla sui glutei.",
   "foto": "foto/dap-hip-press.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-hip-press/"
  },
  {
   "id": "dap-easy-hip-thrust",
   "nome": "DAP Easy Hip Thrust",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Glutei, femorali, catena posteriore",
   "gruppi": [
    "Glutei",
    "Femorali"
   ],
   "esecuzione": [
    "Schiena sul supporto, bacino sotto il cuscino.",
    "Spingi il bacino in alto e stringi i glutei.",
    "Scendi controllato."
   ],
   "consiglio": "Alternativa all'Hip Thrust Panatta.",
   "foto": "foto/dap-easy-hip-thrust.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-easy-hip-thrust/"
  },
  {
   "id": "dap-hyper-extension",
   "nome": "DAP Hyper Extension",
   "marca": "Diamond Andrea Presti",
   "linea": "Diamond Presti (DAP)",
   "distretto": "Zona lombare, glutei, ischiocrurali",
   "gruppi": [
    "Lombari",
    "Glutei",
    "Femorali"
   ],
   "esecuzione": [
    "Bacino sul cuscino, piedi bloccati.",
    "Scendi col busto, poi risali fino ad allineare busto e gambe.",
    "Niente iperestensione in alto."
   ],
   "consiglio": "Schiena arrotondata e bacino che spinge = più glutei; schiena dritta = più lombari.",
   "foto": "foto/dap-hyper-extension.jpg",
   "link": "https://www.diamondfitnesspro.com/prodotti/dap-hyper-extension/"
  },
  {
   "id": "reverse-hyperextension",
   "nome": "Reverse Hyperextension",
   "marca": "Panatta",
   "linea": "Freeweight Special",
   "distretto": "Glutei, femorali, lombari",
   "gruppi": [
    "Glutei",
    "Femorali",
    "Lombari"
   ],
   "esecuzione": [
    "Sdraiato a pancia in giù sulla panca, avambracci sugli appoggi con le impugnature.",
    "Rullo lungo sulle caviglie (o sopra le ginocchia): alza le gambe estendendo le anche, fino ad allinearle al busto.",
    "Stringi i glutei in alto 1 secondo, scendi lento senza far dondolare il carico."
   ],
   "consiglio": "Niente slancio e niente iperestensione lombare in alto: il movimento parte dai glutei. Carico a dischi sul braccio verde.",
   "foto": "foto/reverse-hyperextension.jpg"
  },
  {
   "id": "diamond-sitting-calf",
   "nome": "Sitting Calf",
   "marca": "Diamond",
   "linea": "Diamond",
   "distretto": "Polpacci, soprattutto il soleo",
   "gruppi": [
    "Polpacci"
   ],
   "esecuzione": [
    "Seduto, cuscino sopra le ginocchia, avampiede sulle pedane.",
    "Scendi con i talloni fino al massimo allungamento.",
    "Sali sulle punte e tieni 1 secondo."
   ],
   "consiglio": "A ginocchio flesso il gastrocnemio lavora poco e tocca al soleo: ripetizioni lente e piene.",
   "foto": "foto/diamond-sitting-calf.jpg"
  },
  {
   "id": "panatta-standing-calf",
   "nome": "Standing Calf Raise",
   "marca": "Panatta",
   "linea": "Fit Evo",
   "distretto": "Polpacci, gastrocnemio (a gamba tesa)",
   "gruppi": [
    "Polpacci"
   ],
   "esecuzione": [
    "In piedi, spalle sotto i cuscini, avampiede sulla pedana.",
    "Scendi con i talloni in allungamento, gambe tese.",
    "Sali sulle punte, tieni 1 secondo in alto."
   ],
   "consiglio": "A gamba tesa lavora il gastrocnemio, il polpaccio che si vede. Niente rimbalzi in basso.",
   "foto": "foto/panatta-standing-calf.jpg"
  },
  {
   "id": "exoform-tricep-extension",
   "nome": "Tricep Extension (Exoform)",
   "marca": "Exoform",
   "linea": "Exoform",
   "distretto": "Tricipiti",
   "gruppi": [
    "Tricipiti"
   ],
   "esecuzione": [
    "Scegli il carico, regola il sedile e siediti con la schiena dritta contro lo schienale.",
    "Allinea il gomito con il punto di rotazione della leva.",
    "Estendi le braccia allontanando la leva dal petto, lentamente.",
    "Torna piano alla posizione di partenza."
   ],
   "consiglio": "Gomiti fermi sull'asse della leva: tutto il movimento è all'articolazione del gomito. Foto del pannello della macchina scattata da giulio.",
   "foto": "foto/exoform-tricep-extension.jpg"
  },
  {
   "id": "panca-inclinata-manubri",
   "nome": "Panca inclinata con manubri",
   "marca": "Manubri",
   "linea": "Manubri",
   "distretto": "Petto alto, deltoide anteriore, tricipiti",
   "gruppi": [
    "Petto"
   ],
   "esecuzione": [
    "Panca a circa 30°: manubri sulle cosce, poi li porti ai lati del petto alto.",
    "Scapole strette, piedi piantati: spingi in alto e un po' verso il centro, fino a braccia quasi tese.",
    "Scendi in 2-3 secondi finché senti il petto alto allungarsi, gomiti a circa 45° dal busto."
   ],
   "consiglio": "Non superare i 45° di inclinazione, sennò lavora la spalla. Foto: evolutionfit.it (spinte panca alta 2 manubri), inviata da giulio.",
   "foto": "foto/panca-inclinata-manubri.jpg",
   "link": "https://www.evolutionfit.it/esercizi/pettorali/spinte-panca-alta-2-manubri/"
  },
  {
   "id": "lacertosus-alzate-laterali",
   "nome": "Alzate laterali a dischi",
   "marca": "Lacertosus",
   "linea": "Lacertosus",
   "distretto": "Spalle, capo laterale del deltoide",
   "gruppi": [
    "Spalle"
   ],
   "esecuzione": [
    "Regola l'altezza e mettiti in piedi tra i supporti, con le braccia lungo il corpo.",
    "Metti i dischi sui perni: parti leggero, il carico si sente molto in alto.",
    "Porta i gomiti verso l'esterno fino all'altezza delle spalle, senza alzare i trapezi.",
    "Torna giù lento, senza far appoggiare i dischi."
   ],
   "consiglio": "Gomiti appena piegati e spalle basse: se parte il trapezio, scarica. Macchina della Green Theory fotografata da giulio, nome e regolazioni da confermare in palestra.",
   "foto": "foto/lacertosus-alzate-laterali.jpg"
  },
  {
   "id": "diamond-lat-convergent",
   "nome": "Lat Machine Convergent (Diamond)",
   "marca": "Diamond",
   "linea": "Diamond",
   "distretto": "Dorsali, romboidi, muscolatura scapolare",
   "gruppi": [
    "Schiena"
   ],
   "esecuzione": [
    "Regola il sedile in modo che i cuscini blocchino le cosce.",
    "Afferra le maniglie in alto: le leve sono indipendenti e convergono verso il centro.",
    "Porta i gomiti verso i fianchi e giù, stringendo i dorsali, senza dondolare il busto.",
    "Risali lento fino a distendere le braccia, con la scapola che si allunga."
   ],
   "consiglio": "Il movimento è convergente: le leve si avvicinano scendendo. Tira coi gomiti, non con le mani. Macchina Diamond a dischi fotografata da giulio, nome e regolazioni da confermare.",
   "foto": "foto/diamond-lat-convergent.jpg"
  },
  {
   "id": "leg-extension-nera",
   "nome": "Leg Extension",
   "marca": "Green Theory",
   "linea": "A pila",
   "distretto": "Quadricipiti, isolamento",
   "gruppi": [
    "Quadricipiti"
   ],
   "esecuzione": [
    "Siediti con la schiena appoggiata e regola lo schienale con la leva gialla: l'asse del ginocchio deve coincidere con quello della macchina.",
    "Regola l'angolo di partenza con il disco forato (ROM) e il cuscino sopra le caviglie.",
    "Estendi le gambe fino quasi a tese, stringi il quadricipite 1 secondo.",
    "Scendi in 3 secondi senza far cadere la pila."
   ],
   "consiglio": "Regola prima di tutto lo schienale: ginocchio all'asse. Con la schiena più inclinata lavori di più il retto femorale.",
   "foto": "foto/leg-extension-nera.jpg"
  },
  {
   "id": "lacertosus-leg-extension",
   "nome": "Leg Extension a dischi",
   "marca": "Lacertosus",
   "linea": "Plate loaded",
   "distretto": "Quadricipiti, isolamento",
   "gruppi": [
    "Quadricipiti"
   ],
   "esecuzione": [
    "Siediti con la schiena appoggiata, bacino fermo e cuscini sopra le caviglie.",
    "Carica i dischi sui due bracci (uno per gamba).",
    "Estendi le gambe stringendo il quadricipite 1 secondo in alto.",
    "Scendi lento in 3 secondi; con i bracci indipendenti puoi lavorare una gamba sola."
   ],
   "consiglio": "I due bracci sono indipendenti: parti dalla gamba più debole e pareggia le serie.",
   "foto": "foto/lacertosus-leg-extension.jpg"
  }
 ],
 "esempio": {
  "id": "esempio",
  "cliente": "Giulio",
  "obiettivo": 4,
  "varC": "Corpo libero",
  "data": "2026-11-03",
  "giorni": [
   {
    "id": "g1",
    "nome": "Petto e braccia",
    "breve": "Petto",
    "gruppi": [
     "Petto",
     "Tricipiti",
     "Bicipiti"
    ],
    "nota": "Petto dall'alto verso il basso, poi isolamento e braccia. Recupero 2 minuti sui multiarticolari, 60-90 secondi sul resto.",
    "A": [
     {
      "m": "panca-inclinata-manubri",
      "s": 4,
      "r": "6-10",
      "g": [
       "Petto"
      ],
      "p": "Apri col petto alto, il più difficile da riempire, quando sei fresco. Al posto della Inclined Chest Press, che in palestra non c'è.",
      "c": [
       "Panca a circa 30° (non più di 45°, sennò lavora la spalla): manubri sulle cosce, poi li porti ai lati del petto alto.",
       "Scapole strette e piedi ben piantati; spingi in alto e un po' verso il centro, fino a braccia quasi tese senza far sbattere i manubri.",
       "Scendi in 2-3 secondi finché senti il petto alto allungarsi, gomiti a circa 45° dal busto."
      ]
     },
     {
      "m": "vertical-chest-press",
      "s": 3,
      "r": "8-10",
      "g": [
       "Petto"
      ],
      "p": "Il centro del petto, dove sta la massa.",
      "c": [
       "Maniglie all'altezza del centro del petto, scapole schiacciate contro lo schienale.",
       "Spingi dritto avanti stringendo il petto, gomiti leggermente sotto le spalle.",
       "Non bloccare i gomiti in alto: tieni il petto in tensione."
      ]
     },
     {
      "m": "declined-chest-press",
      "s": 3,
      "r": "8-10",
      "g": [
       "Petto"
      ],
      "p": "Chiude il petto in basso con meno spalla dell'inclinata.",
      "c": [
       "Inclinazione: la macchina spinge verso il basso, circa -15°/-20° (petto basso).",
       "Regola il sedile così le maniglie partono sotto il petto.",
       "Spingi in basso e avanti, come se unissi le mani sotto il mento: lavora la parte bassa.",
       "Spalle basse e lontane dalle orecchie, ritorno lento."
      ]
     },
     {
      "m": "middle-chest-flight-machine",
      "s": 3,
      "r": "10-15",
      "g": [
       "Petto"
      ],
      "p": "Croci con stiramento: lavora il petto senza i tricipiti.",
      "c": [
       "Sedile con le maniglie all'altezza del petto, gomiti leggermente piegati.",
       "Porta le braccia davanti a te come per abbracciare, stringendo il petto in chiusura.",
       "Torna indietro fino a sentire l'allungamento, senza far andare le spalle in avanti."
      ]
     },
     {
      "m": "french-press-machine",
      "s": 3,
      "r": "10-12",
      "g": [
       "Tricipiti"
      ],
      "p": "Le spinte hanno già caricato i capi laterale e mediale, qui prendi il capo lungo.",
      "c": [
       "Gomiti vicini alla testa, schiena appoggiata.",
       "Distendi le braccia in alto: il lavoro è del tricipite, le spalle restano ferme.",
       "Scendi lento fino a sentire il tricipite allungato."
      ]
     },
     {
      "m": "curling-machine",
      "s": 3,
      "r": "10-12",
      "g": [
       "Bicipiti"
      ],
      "p": "La camma tiene la tensione per tutta la corsa.",
      "c": [
       "Gomiti appoggiati e fermi, spalle basse.",
       "Piega le braccia portando le mani verso le spalle senza dondolare il busto.",
       "Ritorno in 3 secondi fino a quasi distendere il braccio: il bicipite resta sotto tensione."
      ]
     }
    ],
    "B": [
     {
      "m": "dap-incline-chest-press",
      "s": 4,
      "r": "6-10",
      "g": [
       "Petto"
      ],
      "p": "Stesso petto alto, ma a dischi: carico più pesante e tensione costante.",
      "c": [
       "Inclinazione: schienale fisso a circa 30-40° (petto alto).",
       "Regola il sedile per partire con le maniglie all'altezza della clavicola.",
       "Spingi in alto e avanti, concentrati sul petto alto più che sulle spalle.",
       "Scendi controllato, a dischi la tensione resta costante."
      ]
     },
     {
      "n": "Panca piana con manubri",
      "s": 3,
      "r": "8-10",
      "g": [
       "Petto"
      ],
      "p": "Il centro del petto con i pesi liberi: ogni braccio lavora da solo e scendi più in basso che alla macchina. Panca a 0°, gomiti a 45° dal busto, manubri che si avvicinano in alto."
     },
     {
      "m": "dips-press",
      "s": 3,
      "r": "8-12",
      "g": [
       "Petto",
       "Tricipiti"
      ],
      "p": "Al posto della declinata: col busto in avanti lavora il petto basso e carica i tricipiti.",
      "c": [
       "Busto inclinato in avanti, mani sulle impugnature.",
       "Scendi fino a sentire il petto basso allungarsi, gomiti larghi.",
       "Risali spingendo e stringendo il petto: tricipiti aiutano, ma guidi col petto."
      ]
     },
     {
      "m": "dap-incline-peck-fly",
      "s": 3,
      "r": "10-15",
      "g": [
       "Petto"
      ],
      "p": "Croci su piano inclinato: stesso isolamento, angolo diverso.",
      "c": [
       "Inclinazione: piano a circa 30° sulla parte alta del petto.",
       "Sedile con le maniglie all'altezza della parte alta del petto, gomiti morbidi.",
       "Chiudi verso l'alto e al centro, stringendo il petto alto.",
       "Apri fino a sentire l'allungamento, senza portare i gomiti dietro la linea del busto."
      ]
     },
     {
      "m": "exoform-tricep-extension",
      "s": 3,
      "r": "10-12",
      "g": [
       "Tricipiti"
      ],
      "p": "Seduto, a cavi: tricipiti con una leva diversa dalla French Press della variante A. Macchina Exoform, non Panatta né Presti.",
      "c": [
       "Scegli il carico, regola il sedile e tieni la schiena dritta contro lo schienale.",
       "Allinea il gomito con il punto di rotazione della leva.",
       "Estendi le braccia allontanando la leva dal petto, poi torna lento: il lavoro è del tricipite, le spalle restano ferme."
      ]
     },
     {
      "n": "Curl con manubri in piedi",
      "s": 3,
      "r": "10-12",
      "g": [
       "Bicipiti"
      ],
      "p": "Il classico su e giù coi manubri, al posto della Curling Machine che nella variante A è la stessa macchina. Alterna le braccia, senza slancio.",
      "c": [
       "In piedi, un manubrio per mano, gomiti fermi lungo i fianchi.",
       "Sali supinando il polso (mignolo verso l'alto), uno alla volta o insieme, senza dondolare il busto.",
       "Scendi in 3 secondi fino a quasi distendere il braccio."
      ]
     }
    ],
    "C": [
     {
      "n": "Piegamenti con piedi rialzati su panca",
      "s": 4,
      "r": "8-15",
      "g": [
       "Petto"
      ],
      "p": "Petto alto: più alzi i piedi e più lavora la parte alta. Corpo in linea, scendi finché il petto sfiora terra. Se è troppo facile metti un disco sulla schiena."
     },
     {
      "n": "Panca piana con manubri (o floor press a terra)",
      "s": 3,
      "r": "8-12",
      "g": [
       "Petto"
      ],
      "p": "Il centro del petto. Gomiti a 45° dal busto, manubri che si toccano in alto. A terra la corsa è più corta e la spalla soffre meno."
     },
     {
      "n": "Piegamenti con mani rialzate su panca",
      "s": 3,
      "r": "10-15",
      "g": [
       "Petto"
      ],
      "p": "Petto basso: con le mani in alto spingi verso il basso e lavora la parte bassa del petto. Scendi lento, 2 secondi."
     },
     {
      "n": "Croci ai cavi (cable crossover)",
      "s": 3,
      "r": "10-15",
      "g": [
       "Petto"
      ],
      "p": "Isolamento con tensione costante: cavi alti, un passo avanti, gomiti appena piegati e fissi, porta le mani davanti al petto in basso e stringi 1 secondo. Con i cavi bassi lavori il petto alto."
     },
     {
      "n": "French press con un manubrio da sdraiato",
      "s": 3,
      "r": "10-12",
      "g": [
       "Tricipiti"
      ],
      "p": "Capo lungo del tricipite: il manubrio scende dietro la testa, gomiti fermi e puntati al soffitto."
     },
     {
      "n": "Curl con manubri alternato da seduto",
      "s": 3,
      "r": "10-12",
      "g": [
       "Bicipiti"
      ],
      "p": "Supina il polso salendo (mignolo verso l'alto). Niente slancio: scendi in 2 secondi."
     }
    ]
   },
   {
    "id": "g2",
    "nome": "Gambe A · quadricipiti",
    "breve": "Gambe A",
    "gruppi": [
     "Quadricipiti",
     "Glutei",
     "Polpacci"
    ],
    "nota": "Dal più pesante all'isolamento, poi i polpacci a gambe già stanche.",
    "A": [
     {
      "m": "hack-squat",
      "s": 4,
      "r": "6-10",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Traiettoria guidata che carica i quadricipiti e protegge la schiena: puoi spingere forte.",
      "c": [
       "Piedi a larghezza spalle, schiena appoggiata e scendi controllato.",
       "Scendi fino a cosce parallele o poco sotto, ginocchia nella direzione dei piedi.",
       "Spingi coi talloni senza stendere del tutto le ginocchia: i quadricipiti restano in tensione."
      ]
     },
     {
      "m": "leg-press-45",
      "s": 3,
      "r": "10-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Secondo multiarticolare, più volume e meno equilibrio richiesto.",
      "c": [
       "Gradi: la pedana è a 45°, schienale appoggiato.",
       "Piedi a larghezza spalle, nella parte bassa della pedana per più quadricipiti.",
       "Scendi finché le ginocchia si piegano a circa 90°, senza staccare la zona lombare.",
       "Spingi senza bloccare le ginocchia."
      ]
     },
     {
      "m": "pendulum-squat",
      "s": 3,
      "r": "8-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Terzo multiarticolare, ma a pendolo: si scende molto e il carico resta gestibile, ottimo per i quadricipiti. Modello da verificare in palestra.",
      "c": [
       "Piedi a larghezza spalle sul piano, schiena appoggiata ai cuscini: il pendolo guida il movimento.",
       "Scendi più che puoi, anche oltre i 90° alle ginocchia, senza staccare il bacino.",
       "Spingi coi talloni senza bloccare le ginocchia in alto.",
       "Piedi bassi e stretti = più quadricipiti; piedi alti e larghi = più glutei."
      ]
     },
     {
      "m": "leg-extension-nera",
      "s": 3,
      "r": "12-15",
      "g": [
       "Quadricipiti"
      ],
      "p": "Chiude i quadricipiti: pila con regolazione dello schienale e dell'angolo di partenza.",
      "c": [
       "Regola lo schienale (le leve gialle) in modo che il ginocchio sia all'asse della macchina e il cuscino sia sopra le caviglie.",
       "Regola anche l'angolo di partenza (ROM) sul disco con i fori, a ginocchia non troppo estese.",
       "Estendi le gambe stringendo il quadricipite 1 secondo in alto.",
       "Scendi in 3 secondi senza far cadere la pila."
      ]
     },
     {
      "m": "panatta-standing-calf",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "In piedi a gamba tesa lavora il gastrocnemio, il polpaccio che si vede.",
      "c": [
       "Spalle sotto i cuscini, gambe tese, avampiede sulla pedana.",
       "Scendi con i talloni fino al massimo allungamento, poi sali sulle punte.",
       "Tieni 1 secondo in alto: a gamba tesa lavora il gastrocnemio."
      ]
     },
     {
      "n": "Polpacci a corpo libero (sul gradino)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Alzate sulle punte a una gamba alla volta, talloni fuori dal gradino: in basso ti allunghi, in alto tieni 1 secondo. Aggiungi kg con un manubrio in mano.",
      "c": [
       "In piedi su un gradino, una gamba alla volta, appoggiandoti a un sostegno.",
       "Sali sulle punte tenendo 1 secondo e scendi con il tallone sotto il gradino.",
       "Aggiungi kg con un manubrio in mano quando 20 ripetizioni sono facili."
      ]
     }
    ],
    "B": [
     {
      "m": "dap-perfect-squat",
      "s": 4,
      "r": "6-10",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "L'alternativa Presti all'hack squat: spalle sotto i cuscini, scendi sotto il parallelo.",
      "c": [
       "Spalle sotto i cuscini, piedi a larghezza spalle.",
       "Scendi sotto il parallelo, ginocchia nella direzione dei piedi.",
       "Spingi coi talloni: quadricipiti e glutei lavorano insieme."
      ]
     },
     {
      "m": "dap-incline-leg-press-45",
      "s": 3,
      "r": "10-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Stessa pressa a 45°, ma a dischi: curva di carico diversa dalla Panatta.",
      "c": [
       "Gradi: la pedana è a 45°, schienale appoggiato.",
       "Piedi bassi e a larghezza spalle sulla pedana.",
       "Scendi controllato fino a circa 90° alle ginocchia.",
       "Spingi senza bloccare le ginocchia: i dischi tengono la tensione costante."
      ]
     },
     {
      "n": "Squat bulgaro con manubri",
      "s": 3,
      "r": "8-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Una gamba alla volta, piede dietro su una panca: copre i lati deboli e carica i quadricipiti in modo diverso dalle macchine.",
      "c": [
       "Il bulgaro non è una macchina: piede dietro su una panca, manubri lungo i fianchi.",
       "Scendi dritto col busto, ginocchio davanti sopra il piede.",
       "Spingi col tallone davanti, una gamba alla volta."
      ]
     },
     {
      "m": "lacertosus-leg-extension",
      "s": 3,
      "r": "12-15",
      "g": [
       "Quadricipiti"
      ],
      "p": "Leg extension a dischi con due bracci indipendenti: curva di carico diversa dalla pila, puoi lavorare una gamba alla volta.",
      "c": [
       "Macchina a dischi con due bracci indipendenti: carica un disco per lato (o uno solo se lavori una gamba).",
       "Cuscini sopra le caviglie, schienale che tenga il bacino appoggiato.",
       "Estendi stringendo il quadricipite 1 secondo, scendi lento in 3 secondi.",
       "Puoi lavorare una gamba alla volta, ogni braccio è indipendente."
      ]
     },
     {
      "m": "diamond-sitting-calf",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "Da seduto, a ginocchio flesso: lavora soprattutto il soleo.",
      "c": [
       "Seduto, cuscino sopra le ginocchia, avampiede sulle pedane.",
       "Scendi con i talloni fino al massimo allungamento e sali sulle punte.",
       "A ginocchio piegato lavora il soleo: ripetizioni lente e piene."
      ]
     },
     {
      "n": "Polpacci a corpo libero (sul gradino)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Alzate sulle punte a una gamba alla volta, talloni fuori dal gradino: in basso ti allunghi, in alto tieni 1 secondo. Aggiungi kg con un manubrio in mano.",
      "c": [
       "In piedi su un gradino, una gamba alla volta.",
       "Sali sulle punte tenendo 1 secondo e scendi sotto il gradino.",
       "Aggiungi kg con un manubrio quando diventa facile."
      ]
     }
    ],
    "C": [
     {
      "n": "Squat bulgaro con manubri",
      "s": 4,
      "r": "8-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Il multiarticolare pesante: piede dietro su una panca, busto dritto e ginocchio davanti che supera un po' la punta del piede. Una gamba alla volta."
     },
     {
      "n": "Goblet squat con manubrio",
      "s": 3,
      "r": "10-15",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Manubrio al petto, tallone a terra, scendi sotto il parallelo con la schiena dritta."
     },
     {
      "n": "Sissy squat (appoggiandoti a un montante)",
      "s": 3,
      "r": "10-15",
      "g": [
       "Quadricipiti"
      ],
      "p": "Isolamento dei quadricipiti al posto della leg extension: ginocchia avanti, talloni alti, busto inclinato indietro. Se è duro fallo ridotto."
     },
     {
      "n": "Affondi indietro con manubri",
      "s": 3,
      "r": "10-12",
      "g": [
       "Quadricipiti",
       "Glutei"
      ],
      "p": "Terzo esercizio per le cosce al posto del tibiale: un passo indietro, ginocchio vicino a terra, spingi col piede davanti. Alterna le gambe."
     },
     {
      "n": "Calf in piedi a una gamba (manubrio)",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "Come in piedi in macchina: gamba tesa, scendi bene col tallone e sali sulla punta, 1 secondo fermo in alto."
     },
     {
      "n": "Calf da seduto (manubri sulle cosce)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Come la seduta Diamond: ginocchio piegato, lavora il soleo. Manubri sulle cosce, punte su un gradino."
     }
    ]
   },
   {
    "id": "g3",
    "nome": "Spalle e schiena",
    "breve": "Spalle",
    "gruppi": [
     "Spalle",
     "Schiena",
     "Trapezio"
    ],
    "nota": "Spinta e tirata alternate, così il muscolo che riposa non è quello che lavora subito dopo.",
    "A": [
     {
      "m": "deltoid-press",
      "s": 4,
      "r": "6-10",
      "g": [
       "Spalle"
      ],
      "p": "Spinta verticale pesante, da fare per prima con le spalle fresche.",
      "c": [
       "Gradi: schienale quasi verticale, circa 85-90°.",
       "Sedile con le maniglie all'altezza delle spalle.",
       "Spingi in alto senza arcuare la schiena: il lavoro è del deltoide.",
       "Scendi fino a spalle e gomiti all'altezza delle orecchie, senza rimbalzo."
      ]
     },
     {
      "m": "diamond-lat-convergent",
      "s": 4,
      "r": "8-10",
      "g": [
       "Schiena"
      ],
      "p": "Larghezza della schiena su leve convergenti a dischi Diamond, al posto della Lat Machine Panatta che in palestra non c'è.",
      "c": [
       "Regola il sedile in modo che i cuscini blocchino le cosce.",
       "Afferra le maniglie in alto: le leve sono indipendenti e convergono verso il centro scendendo.",
       "Porta i gomiti giù verso i fianchi stringendo i dorsali, poi risali lento fino a distendere le braccia."
      ]
     },
     {
      "m": "low-row",
      "s": 3,
      "r": "8-12",
      "g": [
       "Schiena"
      ],
      "p": "Lo spessore che la lat non dà, con impugnature rotanti.",
      "c": [
       "Petto appoggiato, impugnature rotanti.",
       "Tira i gomiti indietro stringendo le scapole.",
       "Ritorno lento: schiena neutra, senza dondolare."
      ]
     },
     {
      "m": "lacertosus-alzate-laterali",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Isolamento del capo laterale, quello che allarga le spalle, su macchina a dischi Lacertosus: al posto della Lateral Deltoids Panatta.",
      "c": [
       "Regola l'altezza della macchina in modo che le leve partano all'altezza dei fianchi.",
       "Porta i gomiti verso l'esterno fino all'altezza delle spalle, spalle basse e senza slancio.",
       "Scendi lento in 2-3 secondi: il carico è a dischi, parti leggero."
      ]
     },
     {
      "n": "Alzate posteriori da seduto, busto chino (manubri)",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Il tuo esercizio preferito per il deltoide posteriore: il peso lo controlli tu.",
      "c": [
       "Seduto con il busto inclinato in avanti, manubri leggeri.",
       "Alza le braccia di lato stringendo la parte posteriore della spalla.",
       "Gomiti leggermente piegati, senza usare lo slancio."
      ]
     },
     {
      "m": "shrug-machine",
      "s": 3,
      "r": "10-12",
      "g": [
       "Trapezio"
      ],
      "p": "Chiudi col trapezio alto, che le tirate lavorano poco.",
      "c": [
       "Impugnature lungo i fianchi, braccia distese.",
       "Alza le spalle verso le orecchie e stringi 1 secondo.",
       "Scendi lento: non ruotare le spalle."
      ]
     }
    ],
    "B": [
     {
      "m": "power-smith-machine-multi-angles",
      "s": 4,
      "r": "6-10",
      "g": [
       "Spalle"
      ],
      "p": "Panca quasi verticale e bilanciere guidato: spinta pesante sopra la testa, diversa dalla Deltoid Press della variante A. Al posto della Viking Press, che in palestra non c'è.",
      "c": [
       "Gradi: schienale a circa 80-85° (quasi verticale); non scendere sotto i 75° o diventa una spinta per il petto alto.",
       "Panca quasi verticale, il bilanciere guidato parte all'altezza del mento.",
       "Spingi sopra la testa senza arcuare la schiena: il lavoro è del deltoide.",
       "Scendi fino al mento controllato, polsi dritti."
      ]
     },
     {
      "m": "dap-wide-pull-down",
      "s": 4,
      "r": "8-10",
      "g": [
       "Schiena"
      ],
      "p": "Lat a dischi con presa larga: stessa larghezza, macchina progettata diversa.",
      "c": [
       "Cosce bloccate sotto i cuscini, petto alto.",
       "Tira i gomiti in basso e larghi stringendo il dorsale.",
       "Risali lento fino all'allungamento, senza dondolare."
      ]
     },
     {
      "m": "dap-chopper-row",
      "s": 3,
      "r": "8-12",
      "g": [
       "Schiena"
      ],
      "p": "Rematore col petto appoggiato e maniglie a scelta: spessore della schiena senza caricare la lombare. Al posto della T-Bar, che in palestra non c'è.",
      "c": [
       "Petto appoggiato al supporto, scegli la presa che senti meglio.",
       "Tira i gomiti indietro stringendo le scapole.",
       "Ritorno controllato: schiena neutra, spessore della schiena e deltoide posteriore."
      ]
     },
     {
      "m": "lateral-deltoids",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Unica macchina per le laterali: un lato per volta cambia lo stimolo.",
      "c": [
       "Un braccio alla volta, gomito vicino al busto.",
       "Alza il gomito di lato fino all'altezza della spalla.",
       "Scendi lento senza slancio."
      ]
     },
     {
      "m": "back-deltoids",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Al posto delle alzate con manubri: deltoide posteriore guidato dalla macchina.",
      "c": [
       "Petto appoggiato al cuscino, impugnature all'altezza delle spalle.",
       "Apri le braccia all'indietro stringendo il deltoide posteriore.",
       "Gomiti appena piegati, nessun dondolio."
      ]
     },
     {
      "m": "power-smith-machine-multi-angles",
      "s": 3,
      "r": "8-12",
      "g": [
       "Schiena",
       "Trapezio"
      ],
      "p": "Rematore al bilanciere guidato: schiena alta e trapezio medio.",
      "c": [
       "Gradi: in piedi, bilanciere guidato, nessuna panca (0°).",
       "Bilanciere guidato davanti alle cosce, braccia distese.",
       "Alza le spalle verso le orecchie e stringi 1 secondo in alto.",
       "Scendi lento senza piegare i gomiti."
      ]
     }
    ],
    "C": [
     {
      "n": "Lento avanti con manubri in piedi",
      "s": 4,
      "r": "6-10",
      "g": [
       "Spalle"
      ],
      "p": "Spinta verticale pesante, per prima con le spalle fresche. Core stretto, manubri sopra la testa senza inarcare la schiena."
     },
     {
      "n": "Trazioni alla sbarra (anche negative)",
      "s": 4,
      "r": "5-10",
      "g": [
       "Schiena"
      ],
      "p": "Larghezza della schiena: presa un po' più larga delle spalle, petto verso la sbarra. Se non ne fai ancora: sali con un salto e scendi in 4 secondi."
     },
     {
      "n": "Rematore a un braccio con manubrio su panca",
      "s": 3,
      "r": "8-12",
      "g": [
       "Schiena"
      ],
      "p": "Spessore della schiena: tira il gomito verso l'anca, non verso la spalla, e senti la schiena chiudersi."
     },
     {
      "n": "Alzate laterali con manubri",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Capo laterale: gomiti appena piegati, sali fino all'altezza delle spalle con il mignolo un po' più alto del pollice."
     },
     {
      "n": "Alzate posteriori con manubri, busto chino",
      "s": 3,
      "r": "12-15",
      "g": [
       "Spalle"
      ],
      "p": "Deltoide posteriore: busto quasi parallelo al pavimento, apri le braccia come ali senza tirare con i trapezi."
     },
     {
      "n": "Pullover con manubrio su panca",
      "s": 3,
      "r": "10-12",
      "g": [
       "Schiena"
      ],
      "p": "Dorsali e dentato: manubrio in due mani, scendi dietro la testa a braccia quasi tese e riporta sopra il petto sentendo la schiena. Un lavoro diverso dalle trazioni."
     }
    ]
   },
   {
    "id": "g4",
    "nome": "Gambe B · femorali e glutei",
    "breve": "Gambe B",
    "gruppi": [
     "Femorali",
     "Glutei",
     "Lombari",
     "Polpacci"
    ],
    "nota": "Catena posteriore: estensione d'anca per glutei e femorali, poi flessione del ginocchio.",
    "A": [
     {
      "m": "hip-thrust",
      "s": 4,
      "r": "8-12",
      "g": [
       "Glutei",
       "Femorali"
      ],
      "p": "Lo schienale basculante segue il movimento e tiene la tensione sui glutei.",
      "c": [
       "Gradi: schienale basculante, parti con il busto a circa 30° e arrivi vicino all'orizzontale (0°) in alto.",
       "Schiena sullo schienale, rullo sul bacino, piedi a larghezza anche.",
       "Spingi il bacino in alto fino ad allineare busto e cosce, stringi i glutei 1-2 secondi.",
       "Scendi controllato, mento verso il petto, senza iperestendere la zona lombare."
      ]
     },
     {
      "m": "seated-leg-curling",
      "s": 4,
      "r": "10-12",
      "g": [
       "Femorali"
      ],
      "p": "Da seduto l'anca flessa allunga i femorali e li lavora a fondo.",
      "c": [
       "Cuscino sulle cosce, ginocchio allineato con l'asse della macchina.",
       "Piega le gambe verso di te portando i talloni verso i glutei.",
       "Torna in 3 secondi: da seduto i femorali sono già allungati."
      ]
     },
     {
      "m": "dap-hyper-extension",
      "s": 3,
      "r": "10-12",
      "g": [
       "Lombari",
       "Glutei",
       "Femorali"
      ],
      "p": "Completa la catena posteriore e rinforza la zona lombare.",
      "c": [
       "Cuscino sotto i fianchi, schiena dritta.",
       "Scendi con il busto e risali stringendo glutei e femorali, fino ad allinearti.",
       "Non risalire oltre la linea dritta, per non caricare la lombare."
      ]
     },
     {
      "n": "Polpacci davanti e lato",
      "s": 3,
      "r": "12-15",
      "g": [
       "Polpacci"
      ],
      "p": "Tibiale anteriore e zona laterale della gamba. Macchina della Green Theory, nome da confermare.",
      "c": [
       "Punta verso l'alto e verso l'esterno, movimento lento.",
       "Nessun rimbalzo in basso.",
       "Lavora la parte davanti e laterale della gamba."
      ]
     },
     {
      "m": "panatta-standing-calf",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "In piedi a gamba tesa lavora il gastrocnemio, il polpaccio che si vede.",
      "c": [
       "Spalle sotto i cuscini, gambe tese, avampiede sulla pedana.",
       "Scendi con i talloni in allungamento e sali sulle punte tenendo 1 secondo.",
       "A gamba tesa lavora il gastrocnemio."
      ]
     },
     {
      "n": "Polpacci a corpo libero (sul gradino)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Alzate sulle punte a una gamba alla volta, talloni fuori dal gradino: in basso ti allunghi, in alto tieni 1 secondo. Aggiungi kg con un manubrio in mano.",
      "c": [
       "In piedi su un gradino, una gamba alla volta.",
       "Sali sulle punte tenendo 1 secondo e scendi sotto il gradino.",
       "Aggiungi kg con un manubrio quando diventa facile."
      ]
     }
    ],
    "B": [
     {
      "m": "dap-easy-hip-thrust",
      "s": 4,
      "r": "8-12",
      "g": [
       "Glutei",
       "Femorali"
      ],
      "p": "Hip thrust a dischi Presti: stesso movimento, leva e curva diverse.",
      "c": [
       "Schiena sullo schienale, il carico sul bacino, piedi a larghezza anche.",
       "Spingi il bacino in alto stringendo i glutei 1-2 secondi.",
       "Scendi controllato: i dischi mantengono la tensione costante."
      ]
     },
     {
      "m": "kneeling-leg-curling",
      "s": 4,
      "r": "10-12",
      "g": [
       "Femorali"
      ],
      "p": "In ginocchio, una gamba per volta: pareggia il lato più debole.",
      "c": [
       "In ginocchio, una gamba alla volta, cuscino sopra il tallone.",
       "Piega il ginocchio portando il tallone verso il gluteo.",
       "Torna lento senza inarcare la schiena: parti dalla gamba più debole."
      ]
     },
     {
      "m": "reverse-hyperextension",
      "s": 3,
      "r": "12-15",
      "g": [
       "Glutei",
       "Femorali",
       "Lombari"
      ],
      "p": "Estensione d'anca a pancia in giù con carico a dischi: completa la catena posteriore, al posto della hyper extension. Nome del modello da confermare in palestra.",
      "c": [
       "Gradi: panca fissa piatta (0°); le gambe salgono fino a circa 0° (in linea col busto).",
       "A pancia in giù sulla panca, avambracci sugli appoggi, rullo sulle caviglie.",
       "Alza le gambe estendendo le anche fino ad allinearle al busto, stringendo i glutei 1 secondo.",
       "Scendi lento senza slancio e senza iperestendere la zona lombare."
      ]
     },
     {
      "m": "diamond-sitting-calf",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "Da seduto, a ginocchio flesso: lavora soprattutto il soleo.",
      "c": [
       "Seduto, cuscino sopra le ginocchia, avampiede sulle pedane.",
       "Scendi con i talloni in allungamento e sali sulle punte.",
       "A ginocchio piegato lavora il soleo: ripetizioni lente e piene."
      ]
     },
     {
      "n": "Polpacci a corpo libero (sul gradino)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Alzate sulle punte a una gamba alla volta, talloni fuori dal gradino: in basso ti allunghi, in alto tieni 1 secondo. Aggiungi kg con un manubrio in mano.",
      "c": [
       "In piedi su un gradino, una gamba alla volta.",
       "Sali sulle punte tenendo 1 secondo e scendi sotto il gradino.",
       "Aggiungi kg con un manubrio quando diventa facile."
      ]
     }
    ],
    "C": [
     {
      "n": "Hip thrust con manubrio su panca",
      "s": 4,
      "r": "8-12",
      "g": [
       "Glutei",
       "Femorali"
      ],
      "p": "Spalle appoggiate alla panca, manubrio sulle anche, spingi con i talloni fino ad allineare busto e cosce e stringi i glutei 1 secondo. Per più difficoltà: una gamba sola."
     },
     {
      "n": "Leg curl a terra con asciugamano",
      "s": 4,
      "r": "8-12",
      "g": [
       "Femorali"
      ],
      "p": "Sdraiato, talloni su un asciugamano su pavimento liscio: sali col bacino e porta i talloni verso i glutei, poi estendi lento. Al posto del leg curl."
     },
     {
      "n": "Stacco rumeno con manubri",
      "s": 3,
      "r": "10-12",
      "g": [
       "Lombari",
       "Glutei",
       "Femorali"
      ],
      "p": "Catena posteriore: ginocchia appena piegate, manubri vicino alle gambe, porta indietro il bacino fino a sentire i femorali tirare, schiena sempre dritta."
     },
     {
      "n": "Punte alzate, schiena al muro",
      "s": 3,
      "r": "12-15",
      "g": [
       "Polpacci"
      ],
      "p": "Tibiale anteriore e zona davanti-lato della gamba: talloni a terra, sollevi le punte dei piedi il più possibile."
     },
     {
      "n": "Calf in piedi a una gamba (manubrio)",
      "s": 3,
      "r": "12-20",
      "g": [
       "Polpacci"
      ],
      "p": "Gamba tesa, scendi bene col tallone e sali sulla punta, 1 secondo fermo in alto."
     },
     {
      "n": "Calf da seduto (manubri sulle cosce)",
      "s": 3,
      "r": "15-20",
      "g": [
       "Polpacci"
      ],
      "p": "Ginocchio piegato, lavora il soleo. Manubri sulle cosce, punte su un gradino."
     }
    ]
   }
  ],
  "note": [
   "Dopo i pesi: 20 minuti di cyclette.",
   "Alterna A, B e Corpo libero ogni volta che rifai lo stesso giorno: le fasce muscolari e il loro ordine sono sempre gli stessi, cambiano macchine, dischi o manubri.",
   "Il Corpo libero (C) usa solo il peso del corpo, manubri, una panca e una sbarra: serve quando la palestra è piena o quando ti alleni a casa.",
   "Dove una macchina è l'unica del catalogo per quel muscolo (curling, french press, laterali, leg extension) la variante B cambia l'esecuzione invece della macchina.",
   "Le macchine sono quelle delle linee Panatta Freeweight One e Diamond by Presti: quali ci sono davvero alla Green Theory va verificato in palestra."
  ]
 }
};
