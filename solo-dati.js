// LIBRERIA DEGLI ESERCIZI per la versione "da solo" (procedura guidata, solo.js).
// Una riga per esercizio: chiave | nome | muscoli (il primo è il principale) | attrezzo | livello | base | zone | macchine | passi | consiglio | GIF | nota GIF | ripetizioni
//   attrezzo  M macchina (serve una macchina scelta che corrisponda a "macchine"), D manubri e panca, B bilanciere e rack,
//             C cavi, S multipower, F corpo libero, X sbarra o parallele, Z non usato dal generatore
//   livello   0 va bene anche a chi non si è mai allenato, 1 dopo qualche mese, 2 dopo più di un anno
//   base      1 esercizio multiarticolare (va all'inizio), 0 complementare
//   zone      parti del corpo che l'esercizio carica: spalle, collo, schiena (zona lombare), ginocchia, anche, polsi (e gomiti)
//   macchine  espressione (alternative separate da /) che riconosce il nome della macchina nel catalogo (solo per M): la GIF si mostra solo se il disegno è lo stesso tipo di macchina
//   GIF       file gif/<id>.gif (disegni Everkinetic, CC BY-SA 4.0); vuota = come la chiave
export const ESERCIZI = `
q01|Squat con bilanciere|Quadricipiti,Glutei|B|1|1|ginocchia,schiena||Bilanciere sulle spalle (non sul collo), piedi poco più larghi delle spalle.;Scendi portando indietro il bacino, schiena dritta e ginocchia nella direzione delle punte.;Risali spingendo con tutto il piede.|Scendi solo fin dove la schiena resta dritta.|quadricipiti-01
q02|Leg press|Quadricipiti,Glutei|M|0|1|ginocchia|leg ?press|Schiena e bacino ben appoggiati, piedi a metà pedana alla larghezza delle spalle.;Scendi finché le ginocchia si avvicinano al petto, senza staccare il bacino.;Spingi con i talloni e non bloccare le ginocchia in fondo.|Il bacino non si stacca mai dallo schienale.|quadricipiti-02
q03|Leg extension|Quadricipiti|M|0|0|ginocchia|leg ?ext/knee ext/estension.*gamb/quadricep|Regola lo schienale: il ginocchio va all'altezza del perno della macchina.;Distendi le gambe senza scatti e tieni un attimo in alto.;Torna giù lento.|Movimento lento, niente slanci.|quadricipiti-03
q04|Hack squat|Quadricipiti,Glutei|M|1|1|ginocchia,schiena|hack|Spalle sotto i cuscinetti, piedi a metà pedana.;Scendi controllando fino a che le cosce sono parallele alla pedana.;Risali spingendo coi talloni.|Schiena sempre appoggiata.|quadricipiti-04
q05|Front squat con bilanciere|Quadricipiti,Glutei|B|2|1|ginocchia,schiena,polsi||Bilanciere appoggiato davanti sulle spalle, gomiti alti.;Scendi col busto dritto.;Risali spingendo con tutto il piede.|Se i polsi fanno male, incrocia le braccia sul bilanciere.|quadricipiti-05
q06|Squat al multipower|Quadricipiti,Glutei|S|1|1|ginocchia||Bilanciere sulle spalle, piedi un po' avanti rispetto al bilanciere.;Scendi controllando, schiena dritta.;Risali spingendo coi talloni.|Il multipower guida il bilanciere: buono per imparare lo squat.|quadricipiti-06
q07|Affondi con manubri|Quadricipiti,Glutei|D|1|1|ginocchia,anche||Manubri lungo i fianchi, fai un passo lungo in avanti.;Scendi finché il ginocchio dietro sfiora terra.;Spingi col piede davanti e torna in piedi.|Il ginocchio davanti resta sopra il piede, non va verso l'interno.|quadricipiti-07
q08|Squat bulgaro con manubri|Quadricipiti,Glutei|D|1|1|ginocchia,anche||Piede dietro appoggiato su una panca, manubri lungo i fianchi.;Scendi in verticale col busto dritto.;Risali spingendo col piede davanti.|Prima tutte le ripetizioni con una gamba, poi l'altra.|quadricipiti-08|Nel disegno c'è il bilanciere: tu tieni i manubri lungo i fianchi.
q09|Step up con manubri|Quadricipiti,Glutei|D|0|1|ginocchia||Davanti a una panca stabile, manubri in mano.;Sali appoggiando tutto il piede sulla panca.;Scendi controllando.|Spingi con la gamba che sta sopra, non con quella a terra.|quadricipiti-09
q10|Squat con manubri|Quadricipiti,Glutei|D|0|1|ginocchia||Manubri lungo i fianchi, piedi alla larghezza delle spalle.;Scendi portando indietro il bacino, schiena dritta.;Risali spingendo coi talloni.|Ottimo per imparare lo squat.|quadricipiti-10
x04|Sissy squat|Quadricipiti|F|2|0|ginocchia||Tieniti a un montante, sali sulle punte.;Scendi portando le ginocchia avanti e il busto indietro.;Risali controllando.|Puoi farlo senza peso.|app-extra-04|Nel disegno c'è un disco al petto: puoi farlo anche senza peso.
x05|Affondi indietro con manubri|Quadricipiti,Glutei|D|1|1|ginocchia,anche||Manubri lungo i fianchi, fai un passo indietro.;Scendi finché il ginocchio dietro sfiora terra.;Torna in piedi spingendo col piede davanti.|Più facile per le ginocchia degli affondi in avanti.|app-extra-05
f01|Stacco rumeno|Femorali,Glutei|B|1|1|schiena||Bilanciere davanti alle cosce, ginocchia appena piegate.;Scendi portando indietro il bacino, il bilanciere scivola lungo le gambe.;Risali stringendo i glutei.|Schiena sempre dritta: scendi fin dove senti tirare dietro le cosce.|femorali-glutei-01
f02|Leg curl sdraiato|Femorali|M|0|0||(lying/prone/sdraiat).*curl/leg curl.*(lying/prone)|Sdraiato a pancia in giù, il ginocchio all'altezza del perno.;Piega le gambe portando i talloni verso i glutei.;Torna giù lento.|Il bacino resta appoggiato.|femorali-glutei-02
f03|Leg curl seduto|Femorali|M|0|0||(seated/sitting).*curl/curl.*(seated/sitting)|Seduto, ginocchio all'altezza del perno, cuscinetto sopra le cosce.;Piega le gambe portando i talloni sotto la seduta.;Torna su lento.|Blocca bene le cosce prima di partire.|femorali-glutei-03
f04|Leg curl in piedi|Femorali|M|0|0||(kneeling/standing).*leg curl/leg curl.*(kneeling/standing)|Appoggia il ginocchio sul cuscino e il tallone sotto il rullo.;Porta il tallone verso il gluteo.;Torna giù lento.|Una gamba alla volta.|femorali-glutei-04
f05|Ponte per glutei|Glutei,Femorali|F|0|1|||Sdraiato a terra, ginocchia piegate e piedi vicini al bacino.;Solleva il bacino stringendo i glutei.;Tieni un secondo in alto e scendi.|Quando diventa facile, appoggia un disco o un manubrio sul bacino.|femorali-glutei-05
f06|Slanci dietro al cavo|Glutei|C|0|0|||Cavigliera al cavo basso, mani sulla macchina.;Porta la gamba indietro stringendo il gluteo.;Torna avanti controllando.|Non inarcare la schiena.|femorali-glutei-06
f07|Abductor machine|Glutei|M|0|0|anche|abduct/abdutt/outer thigh/hip abd|Seduto con la schiena appoggiata, cuscinetti sul lato esterno delle ginocchia.;Apri le gambe spingendo verso l'esterno.;Chiudi lento.|Busto fermo.|femorali-glutei-07
f08|Adductor machine|Adduttori|M|0|0|anche|adduct/addutt/inner thigh/hip add|Seduto, cuscinetti sul lato interno delle ginocchia.;Chiudi le gambe.;Riaprile lento fin dove è comodo.|Non partire con le gambe troppo aperte.|femorali-glutei-08
f09|Good morning con bilanciere|Femorali,Lombari|B|2|1|schiena||Bilanciere sulle spalle, ginocchia appena piegate.;Inclina il busto in avanti portando indietro il bacino.;Risali stringendo i glutei.|Carichi leggeri, schiena sempre dritta.|femorali-glutei-09
f10|Squat sumo con manubrio|Glutei,Quadricipiti,Adduttori|D|0|1|ginocchia,anche||Piedi larghi e punte in fuori, un manubrio tenuto in mezzo alle gambe.;Scendi dritto.;Risali spingendo coi talloni.|Ginocchia nella direzione delle punte.|femorali-glutei-10
p02|Calf seduto alla macchina|Polpacci|M|0|0||(seated/sitting).*calf/calf.*(seated/sitting)|Avampiedi sulla pedana, cuscinetto sopra le ginocchia.;Sali sulle punte più che puoi.;Scendi fino a sentire allungare il polpaccio.|Tieni un attimo in alto.|polpacci-02
p01|Calf in piedi alla macchina|Polpacci|M|0|0|schiena|calf|Spalle sotto i cuscinetti, avampiedi sul bordo.;Sali sulle punte.;Scendi lento sotto il livello del bordo.|Gambe quasi tese, senza molleggiare.|polpacci-01
p05|Calf in piedi con bilanciere|Polpacci|B|1|0|schiena||Bilanciere sulle spalle, avampiedi su un rialzo.;Sali sulle punte.;Scendi lento.|Fermati un attimo in alto.|polpacci-05
p06|Calf al multipower|Polpacci|S|0|0|||Bilanciere sulle spalle, avampiedi su un rialzo.;Sali sulle punte.;Scendi lento.|Fermati un attimo in alto.|polpacci-06
p07|Calf seduto con manubrio|Polpacci|D|0|0|||Seduto su una panca, avampiede su un rialzo e manubrio sul ginocchio.;Sali sulla punta.;Scendi lento.|Una gamba alla volta.|polpacci-07
p11|Polpacci a corpo libero sul gradino|Polpacci|F|0|0|||Avampiedi sul bordo di un gradino, tieniti a qualcosa.;Sali sulle punte.;Scendi sotto il livello del gradino.|Quando è facile, fallo su una gamba sola.|polpacci-05|Nel disegno c'è il bilanciere: tu fai lo stesso movimento senza pesi.|15
c01|Panca piana con bilanciere|Petto,Tricipiti,Spalle|B|1|1|spalle,polsi||Sdraiato, occhi sotto il bilanciere, scapole strette.;Scendi fino a sfiorare il petto.;Spingi in alto senza staccare i glutei.|Con carichi pesanti fatti assistere.|petto-01
c02|Panca piana con manubri|Petto,Tricipiti|D|0|1|||Sdraiato, manubri all'altezza del petto.;Spingi in alto avvicinando i manubri.;Scendi lento.|Gomiti a circa 45 gradi dal busto.|petto-02
c03|Panca inclinata con bilanciere|Petto,Spalle|B|1|1|spalle||Schienale a 30 gradi, scapole strette.;Scendi verso la parte alta del petto.;Spingi in alto.|Lavora di più la parte alta del petto.|petto-03
c04|Panca inclinata con manubri|Petto,Spalle|D|0|1|||Schienale a 30 gradi, manubri all'altezza del petto.;Spingi in alto.;Scendi lento.|Gomiti a circa 45 gradi.|petto-04
c05|Croci con manubri|Petto|D|1|0|spalle||Sdraiato, braccia in alto e gomiti appena piegati.;Apri le braccia fino a sentire allungare il petto.;Richiudi come per abbracciare.|Peso leggero, il movimento è largo.|petto-05
c06|Croci ai cavi|Petto|C|1|0|spalle||In piedi tra i cavi alti, busto un po' in avanti.;Porta le mani avanti e in basso fino a farle incontrare.;Torna lento.|Gomiti sempre appena piegati.|petto-06
c07|Pectoral machine|Petto|M|0|0|spalle|pec/butterfly/\\bfly/flight/chest fly|Seduto, impugnature all'altezza del petto.;Chiudi le braccia davanti.;Riaprile lento senza andare oltre la linea delle spalle.|Petto in fuori, schiena appoggiata.|petto-07
x07|Chest press inclinata|Petto,Spalle|M|0|1||inclin.*(press/chest)|Regola la seduta: impugnature all'altezza della parte alta del petto.;Spingi in alto e in avanti.;Torna lento.|Scapole strette per tutto il movimento.|app-extra-07
c08|Chest press|Petto,Tricipiti|M|0|1||chest press/bench press/vertical press/horizontal press/distension/press.*chest/chest.*press|Seduta regolata: impugnature a metà petto.;Spingi fino quasi a distendere le braccia.;Torna lento.|Non bloccare i gomiti in fondo.|petto-08
c09|Dip alle parallele|Petto,Tricipiti|X|2|1|spalle,polsi||Braccia tese sulle parallele, busto un po' in avanti.;Scendi piegando i gomiti.;Risali spingendo.|Scendi solo fin dove le spalle stanno bene.|petto-09
c10|Piegamenti|Petto,Tricipiti|F|1|1|polsi||Mani poco più larghe delle spalle, corpo dritto.;Scendi col petto verso terra.;Spingi su.|Se è troppo difficile, appoggia le ginocchia.|petto-10
c11|Piegamenti con mani rialzate su panca|Petto,Tricipiti|F|0|1|polsi||Mani sul bordo di una panca, corpo dritto.;Scendi col petto verso la panca.;Spingi su.|Più la panca è alta, più è facile.|petto-10|Nel disegno le mani sono a terra: tu le appoggi sulla panca, così è più facile.
x01|Piegamenti con piedi rialzati|Petto,Spalle|F|2|1|polsi,spalle||Piedi su una panca, mani a terra.;Scendi col petto verso terra.;Spingi su.|Lavora di più la parte alta del petto.|app-extra-01
s01|Trazioni alla sbarra|Schiena,Bicipiti|X|2|1|||Presa poco più larga delle spalle.;Sali fino a portare il mento sopra la sbarra.;Scendi lento.|Se non ci riesci ancora, usa la lat machine.|schiena-01
s02|Lat machine|Schiena,Bicipiti|M|0|1||lat ?pull/pull ?down/lat machine/^lat\\b/\\blat$|Cosce bloccate sotto i cuscinetti, presa larga.;Tira la barra verso la parte alta del petto.;Risali lento fino a braccia tese.|Petto in fuori, non tirare dietro la nuca.|schiena-02
s04|Pulley basso|Schiena,Bicipiti|M|0|1||low row/seated row/pulley/cable row/rowing|Seduto, piedi in appoggio, schiena dritta.;Tira la maniglia verso l'ombelico.;Torna avanti lento.|Stringi le scapole alla fine del movimento.|schiena-04
s05|Rematore con bilanciere|Schiena,Bicipiti|B|1|1|schiena||Busto inclinato in avanti, schiena dritta.;Tira il bilanciere verso l'ombelico.;Scendi lento.|Il busto non si muove.|schiena-05
s06|Rematore con manubrio|Schiena,Bicipiti|D|0|1|||Ginocchio e mano sulla panca, schiena dritta.;Tira il manubrio verso il fianco.;Scendi lento.|Gomito vicino al corpo.|schiena-06
s07|T-bar row|Schiena,Bicipiti|M|1|1|schiena|t-?bar|Petto sul cuscino se c'è, schiena dritta.;Tira le maniglie verso il petto.;Scendi lento.|Stringi le scapole.|schiena-07
s08|Stacco da terra|Schiena,Femorali,Glutei|B|2|1|schiena||Bilanciere sopra metà piede, schiena dritta.;Sali spingendo coi piedi e tenendo il bilanciere vicino alle gambe.;Scendi con lo stesso percorso.|Impara la tecnica con poco peso.|schiena-08
s09|Hyperextension|Lombari,Glutei|M|0|0|schiena|hyper/back ext/lower back/roman chair/lombar|Bacino sul cuscino, piedi bloccati.;Scendi col busto dritto.;Risali fino alla linea del corpo, non oltre.|Non inarcare in alto.|schiena-09
s10|Pull down a braccia tese|Schiena|C|1|0|spalle||Al cavo alto, braccia tese.;Porta la barra verso le cosce.;Torna su lento.|Gomiti quasi tesi per tutto il movimento.|schiena-10
x06|Pullover con manubrio|Schiena,Petto|D|1|0|spalle||Sdraiato di traverso sulla panca, manubrio sopra il petto.;Porta il manubrio dietro la testa con le braccia quasi tese.;Torna sopra il petto.|Peso leggero.|app-extra-06
x08|Rematore al multipower|Schiena,Bicipiti|S|1|1|schiena||Busto inclinato, schiena dritta.;Tira il bilanciere verso l'ombelico.;Scendi lento.|Il busto non si muove.|app-extra-08
h01|Shoulder press con manubri|Spalle,Tricipiti|D|0|1|spalle||Seduto, manubri all'altezza delle orecchie.;Spingi in alto.;Scendi lento.|Non inarcare la schiena.|spalle-01
h02|Lento avanti con bilanciere|Spalle,Tricipiti|B|1|1|spalle,schiena||Seduto, bilanciere davanti al petto.;Spingi in alto.;Scendi davanti al viso.|Mai dietro la nuca.|spalle-02
h03|Shoulder press|Spalle,Tricipiti|M|0|1|spalle|shoulder press/overhead press/military/deltoid press/viking/press.*shoulder|Seduta regolata: impugnature all'altezza delle spalle.;Spingi in alto.;Scendi lento.|Schiena appoggiata.|spalle-03
h04|Arnold press|Spalle,Tricipiti|D|1|1|spalle||Manubri davanti al viso, palmi verso di te.;Spingi in alto ruotando i palmi in avanti.;Torna giù ruotando indietro.|Movimento fluido, peso medio.|spalle-04
h05|Alzate laterali con manubri|Spalle|D|0|0|spalle||In piedi, manubri lungo i fianchi.;Alza le braccia di lato fino all'altezza delle spalle.;Scendi lento.|Gomiti appena piegati, peso leggero.|spalle-05
h06|Alzate frontali con manubri|Spalle|D|0|0|spalle||In piedi, manubri davanti alle cosce.;Alza le braccia davanti fino all'altezza delle spalle.;Scendi lento.|Peso leggero.|spalle-06
h07|Alzate posteriori a busto chino|Spalle|D|1|0|||Busto inclinato in avanti, manubri sotto il petto.;Apri le braccia di lato.;Scendi lento.|Lavora la parte dietro della spalla.|spalle-07
h08|Alzate posteriori al cavo|Spalle|C|1|0|||Tra i cavi, braccia incrociate davanti.;Apri le braccia indietro.;Torna lento.|Peso leggero.|spalle-08
h09|Tirate al mento|Spalle,Trapezio|B|2|0|spalle,collo,polsi||Bilanciere davanti alle cosce, presa media.;Tira verso il petto alzando i gomiti.;Scendi lento.|Non oltre l'altezza delle spalle.|spalle-09
h10|Scrollate con bilanciere|Trapezio|B|1|0|collo||Bilanciere davanti alle cosce.;Alza le spalle verso le orecchie.;Scendi lento.|Non ruotare le spalle.|spalle-10
b01|Curl con bilanciere|Bicipiti|B|0|0|polsi||In piedi, presa larga come le spalle.;Piega i gomiti portando il bilanciere al petto.;Scendi lento.|Gomiti fermi ai fianchi.|bicipiti-01
b02|Curl con bilanciere EZ|Bicipiti|B|0|0|||Presa sulla parte curva del bilanciere.;Piega i gomiti.;Scendi lento.|Più comodo per i polsi del bilanciere dritto.|bicipiti-02
b03|Curl con manubri|Bicipiti|D|0|0|||In piedi, manubri lungo i fianchi.;Piega i gomiti ruotando i palmi verso l'alto.;Scendi lento.|Niente slanci col busto.|bicipiti-03
b04|Hammer curl|Bicipiti|D|0|0|||Palmi rivolti verso le gambe.;Piega i gomiti tenendo la presa a martello.;Scendi lento.|Lavora anche l'avambraccio.|bicipiti-04
b05|Curl alla panca Scott|Bicipiti|B|1|0|polsi||Braccia appoggiate sul cuscino inclinato.;Piega i gomiti.;Scendi lento senza distendere di scatto.|Non mollare in fondo.|bicipiti-05
b06|Curl di concentrazione|Bicipiti|D|0|0|||Seduto, gomito appoggiato all'interno della coscia.;Piega il gomito.;Scendi lento.|Un braccio alla volta.|bicipiti-06
b07|Curl su panca inclinata|Bicipiti|D|1|0|spalle||Schienale inclinato, braccia lungo i fianchi.;Piega i gomiti.;Scendi lento.|Peso leggero.|bicipiti-07
b08|Curl al cavo|Bicipiti|C|0|0|||Al cavo basso con la barra.;Piega i gomiti.;Scendi lento.|Gomiti fermi.|bicipiti-08
b09|Hammer curl alla corda|Bicipiti|C|0|0|||Al cavo basso con la corda.;Piega i gomiti con presa a martello.;Scendi lento.|Gomiti fermi.|bicipiti-09
b10|Curl alla macchina|Bicipiti|M|0|0||bicep/biceps/arm curl/curl(ing)? machine/preacher/scott|Braccia sul cuscino, gomiti in linea col perno.;Piega i gomiti.;Torna lento.|Niente slanci.|bicipiti-10
x03|Curl con manubri da seduto|Bicipiti|D|0|0|||Seduto, manubri lungo i fianchi.;Piega i gomiti.;Scendi lento.|Puoi alternare un braccio alla volta.|app-extra-03
t01|Push down al cavo|Tricipiti|C|0|0|||Al cavo alto con la barra, gomiti ai fianchi.;Distendi le braccia verso il basso.;Risali lento.|I gomiti non si muovono.|tricipiti-01
t02|Push down con la corda|Tricipiti|C|0|0|||Al cavo alto con la corda.;Distendi le braccia aprendo la corda in fondo.;Risali lento.|Gomiti ai fianchi.|tricipiti-02
t03|French press con bilanciere|Tricipiti|B|1|0|polsi||Sdraiato, bilanciere sopra la fronte.;Piega i gomiti portando il bilanciere verso la fronte.;Distendi le braccia.|Gomiti fermi e stretti.|tricipiti-03
t04|Estensioni sopra la testa|Tricipiti|B|1|0|spalle,polsi||Seduto, bilanciere sopra la testa.;Piega i gomiti dietro la testa.;Distendi le braccia.|Peso leggero.|tricipiti-04
t05|Kickback con manubrio|Tricipiti|D|0|0|||Busto inclinato, gomito alto vicino al fianco.;Distendi il braccio indietro.;Torna lento.|Il gomito resta fermo.|tricipiti-05
t06|Dip alle parallele (tricipiti)|Tricipiti,Petto|X|2|1|spalle,polsi||Busto dritto sulle parallele.;Scendi piegando i gomiti.;Risali.|Scendi solo fin dove le spalle stanno bene.|tricipiti-06
t07|Dip su panca|Tricipiti|F|1|0|spalle,polsi||Mani sul bordo di una panca, gambe avanti.;Scendi piegando i gomiti.;Risali.|Bacino vicino alla panca.|tricipiti-07
t08|Panca piana presa stretta|Tricipiti,Petto|B|1|1|polsi||Presa alla larghezza delle spalle.;Scendi verso il petto coi gomiti vicini al corpo.;Spingi su.|Gomiti stretti.|tricipiti-08
t09|Dip alla macchina|Tricipiti,Petto|M|0|1|spalle|\\bdips?\\b/dip press|Seduto, impugnature ai fianchi.;Spingi verso il basso fino a braccia distese.;Risali lento.|Busto dritto.|tricipiti-09
t10|Tricipiti alla macchina|Tricipiti|M|0|0||tricep/tricip/french press/arm ext|Gomiti appoggiati e in linea col perno.;Distendi le braccia.;Torna lento.|Niente slanci.|tricipiti-10
x02|French press con manubrio|Tricipiti|D|0|0|polsi||Sdraiato, manubrio tenuto con due mani sopra il petto.;Piega i gomiti portando il manubrio dietro la testa.;Distendi.|Gomiti stretti.|app-extra-02
a01|Crunch|Addominali|F|0|0|collo||Sdraiato, ginocchia piegate, mani vicino alle tempie.;Solleva le spalle da terra.;Scendi lento.|Non tirare la testa con le mani.|addominali-01||15
a02|Crunch inverso|Addominali|F|0|0|||Sdraiato, ginocchia piegate in alto.;Porta le ginocchia verso il petto alzando il bacino.;Scendi lento.|Movimento corto e controllato.|addominali-02||15
a03|Sollevamento gambe|Addominali|F|1|0|schiena,anche||Sdraiato, mani sotto il bacino.;Alza le gambe tese fino in verticale.;Scendi lento senza toccare terra.|Zona lombare appoggiata.|addominali-03||12
a04|Bicycle crunch|Addominali|F|1|0|collo||Sdraiato, mani alle tempie.;Porta il gomito verso il ginocchio opposto, alternando.;Movimento lento.|Conta una ripetizione per lato.|addominali-04||20
a05|Crunch incrociato|Addominali|F|0|0|collo||Sdraiato, ginocchia piegate.;Sali portando la spalla verso il ginocchio opposto.;Scendi e cambia lato.|Lavora gli obliqui.|addominali-05||15
a06|Crunch su panca declinata|Addominali|M|1|0|collo|declin.*(bench/panca)/ab bench/abdominal bench/sit ?up|Piedi bloccati, schiena sulla panca.;Sali arrotolando la schiena.;Scendi lento.|Non tirare la testa.|addominali-06||15
a07|Crunch al cavo|Addominali|C|1|0|||In ginocchio al cavo alto con la corda.;Arrotola il busto verso il basso.;Torna su lento.|Il movimento parte dagli addominali, non dalle braccia.|addominali-07||15
a09|Plank laterale|Addominali|F|0|0|||Su un fianco, appoggiato sull'avambraccio.;Solleva il bacino e tieni il corpo dritto.;Tieni il tempo, poi cambia lato.|Respira normalmente.|addominali-09||30 sec
a10|Piegamenti laterali con manubrio|Addominali|D|0|0|schiena||In piedi, manubrio in una mano.;Piega il busto di lato.;Torna dritto.|Prima un lato, poi l'altro.|addominali-10||15
`;

// passi generici per una macchina che non è in libreria
export const PASSI_MACCHINA = [
  'Prima di iniziare regola sedile e leve: le articolazioni che lavorano devono essere allineate al perno della macchina.',
  'Fai il movimento in circa 2 secondi, senza scatti, e torna indietro in 2-3 secondi.',
  'Scegli un peso con cui le ultime ripetizioni sono faticose ma pulite.'
];

export const CREDITI_GIF = 'Animazioni degli esercizi: disegni Everkinetic (everkinetic.com), licenza CC BY-SA 4.0 (creativecommons.org/licenses/by-sa/4.0/deed.it), animati e ricolorati.';
