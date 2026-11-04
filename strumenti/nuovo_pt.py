# Crea (o aggiorna) la copia dell'app per un personal trainer, pronta da pubblicare su Netlify.
#
# Uso:  python3 strumenti/nuovo_pt.py <cartella_del_pt> [--out <cartella_sito>]
#
# Nella cartella del PT servono:
#   dati.json   i dati del PT (vedi l'esempio in fondo a questo file, o lancia lo script senza dati.json: te lo crea)
#   logo.png    facoltativo: il logo, diventa l'icona dell'app. Senza logo l'icona porta le iniziali del coach
#   foto/       solo per il pacchetto con le sue macchine: una foto per macchina, col nome del file scritto in dati.json
#
# Il sito esce in <cartella_del_pt>/sito/ e si trascina così com'è su Netlify (o si ricarica sullo stesso sito).
# Ogni volta che lo rilanci la "versione" sale di 1 da sola: i telefoni di coach e clienti prendono la copia nuova.
# Per togliere la prova a tempo dopo il pagamento: in dati.json metti "scadenza": "" e rilancia.
# La copia parte vuota (nessuna scheda d'esempio); con "esempio": true tiene quella di base.
# Pacchetto 99 €: "macchine": [] (il PT usa il catalogo o scrive gli esercizi a mano). Pacchetto 139 €: le sue macchine con le foto.
import json, os, re, shutil, subprocess, sys, unicodedata

QUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))   # cartella dell'app (radice del repo)
PAGINE = ["index.html", "coach.html", "tema.css", "tono.js", "sw.js", "manifest.webmanifest"]

ESEMPIO_DATI = {
    "pacchetto": "139",
    "coach": "Mario Rossi",
    "app": "Mario PT",
    "palestra": "Palestra Esempio",
    "colore": "#E6BE8A",
    "whatsapp": "393331234567",
    "indirizzo": "https://mario-rossi-pt.netlify.app/",
    "scadenza": "",
    "assistenza": "",
    "esempio": False,
    "macchine": [
        {"nome": "Leg press", "foto": "leg-press.jpg", "marca": "Panatta", "gruppi": ["Quadricipiti", "Glutei"],
         "esecuzione": ["Schiena ben appoggiata", "Piedi alla larghezza delle spalle", "Scendi piano, spingi senza bloccare le ginocchia"],
         "consiglio": ""}
    ],
}

# muscoli indovinati dal nome, se in dati.json mancano (meglio scriverli: servono per trovare la macchina nella pagina Coach)
INDOVINA = [
    (r"leg press|pressa|hack|squat|pendul|leg extension|estensi", ["Quadricipiti", "Glutei"]),
    (r"leg curl|femoral", ["Femorali"]),
    (r"glute|hip thrust|kick|slancio", ["Glutei"]),
    (r"adduct|addutt", ["Adduttori"]),
    (r"abduct|abdutt", ["Glutei"]),
    (r"calf|polpacc", ["Polpacci"]),
    (r"chest|pec|fly|croci|panca|bench|dip", ["Petto", "Tricipiti"]),
    (r"tricep|tricip|french|push ?down", ["Tricipiti"]),
    (r"lat|pulldown|trazion|row|rematore|pulley|pull ?over", ["Schiena", "Bicipiti"]),
    (r"bicep|bicip|curl", ["Bicipiti"]),
    (r"lombar|lower back|back ext|hyperext|iperest", ["Lombari"]),
    (r"shoulder|spalle|lento|military|lateral|alzate|deltoid|rear|reverse", ["Spalle"]),
    (r"shrug|trapez", ["Trapezio"]),
    (r"abdom|addom|crunch|torso|rotar", ["Addominali"]),
    (r"cavi|cable|crossover|smith|multipower|rack|functional", ["Total body"]),
]


def esci(msg):
    print("ERRORE:", msg)
    sys.exit(1)


def slug(t):
    t = unicodedata.normalize("NFKD", t).encode("ascii", "ignore").decode().lower()
    return re.sub(r"[^a-z0-9]+", "-", t).strip("-") or "macchina"


def leggi_config(path):
    txt = open(path, encoding="utf-8").read()
    i = txt.index("var CONFIG =")
    testa = txt[:i]
    corpo = txt[i + len("var CONFIG ="):].strip().rstrip(";")
    return testa, json.loads(corpo)


def main():
    a = sys.argv[1:]
    if not a or a[0] in ("-h", "--help"):
        print(__doc__ or open(__file__, encoding="utf-8").read().split("import json")[0])
        sys.exit(0)
    pt = os.path.abspath(a[0])
    out = os.path.abspath(a[a.index("--out") + 1]) if "--out" in a else os.path.join(pt, "sito")
    fdati = os.path.join(pt, "dati.json")
    if not os.path.exists(fdati):
        os.makedirs(os.path.join(pt, "foto"), exist_ok=True)
        json.dump(ESEMPIO_DATI, open(fdati, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
        esci("non c'era dati.json: ne ho creato uno di esempio in " + fdati + ", compilalo e rilancia")
    d = json.load(open(fdati, encoding="utf-8"))
    if not (d.get("coach") or "").strip():
        esci("in dati.json manca \"coach\" (il nome del PT)")
    col = d.get("colore") or ""
    if col and not re.fullmatch(r"#[0-9a-fA-F]{6}", col):
        esci("colore non valido: \"" + col + "\" (serve tipo \"#E6BE8A\")")
    if d.get("scadenza") and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", d["scadenza"]):
        esci("scadenza non valida: \"" + d["scadenza"] + "\" (serve AAAA-MM-GG, es. 2026-11-11, o vuota)")

    testa, base = leggi_config(os.path.join(QUI, "config.js"))

    # versione: se il sito esiste già sale di 1, così i telefoni scaricano la copia nuova
    versione = 1
    if os.path.exists(os.path.join(out, "config.js")):
        try:
            versione = int(leggi_config(os.path.join(out, "config.js"))[1].get("versione", 0)) + 1
        except Exception:
            versione = 2
    os.makedirs(out, exist_ok=True)

    # pagine dell'app (la pagina di vendita prova.html e gli strumenti restano fuori)
    for f in PAGINE:
        if os.path.exists(os.path.join(QUI, f)):
            shutil.copyfile(os.path.join(QUI, f), os.path.join(out, f))
    if os.path.isdir(os.path.join(QUI, "catalogo")):
        shutil.copytree(os.path.join(QUI, "catalogo"), os.path.join(out, "catalogo"), dirs_exist_ok=True)

    # la libreria del PT: le sue macchine con le sue foto
    fdir = os.path.join(out, "foto")
    if os.path.isdir(fdir):
        shutil.rmtree(fdir)
    os.makedirs(fdir)
    macchine, ids, avvisi = [], set(), []
    for m in d.get("macchine") or []:
        nome = (m.get("nome") or "").strip()
        if not nome:
            avvisi.append("una macchina senza nome è stata saltata")
            continue
        mid = slug(nome)
        while mid in ids:
            mid += "-2"
        ids.add(mid)
        gruppi = m.get("gruppi") or next((g for r, g in INDOVINA if re.search(r, nome.lower())), [])
        if not m.get("gruppi"):
            avvisi.append(nome + ": muscoli non scritti, " + ("indovinati: " + ", ".join(gruppi) if gruppi else "NON trovati (non comparirà tra i muscoli nella pagina Coach)"))
        foto = ""
        if m.get("foto"):
            src = os.path.join(pt, "foto", m["foto"])
            if os.path.exists(src):
                foto = "foto/" + mid + ".jpg"
                subprocess.run(["convert", src + "[0]", "-auto-orient", "-background", "white", "-flatten",
                                "-resize", "900x900>", "-strip", "-quality", "80", os.path.join(out, foto)], check=True)
            else:
                avvisi.append(nome + ": foto " + m["foto"] + " non trovata in foto/")
        else:
            avvisi.append(nome + ": senza foto")
        # tutti i campi sempre presenti (anche vuoti): l'app li legge senza controllare
        macchine.append({
            "id": mid, "nome": nome, "marca": m.get("marca") or "", "linea": m.get("linea") or "",
            "distretto": m.get("distretto") or "", "gruppi": gruppi, "esecuzione": m.get("esecuzione") or [],
            "consiglio": m.get("consiglio") or "", "foto": foto, "link": m.get("link") or "",
        })

    # scheda d'esempio: quella di base; le macchine che il PT non ha diventano esercizi col solo nome
    nomi_base = {m["id"]: m["nome"] for m in base.get("macchine") or []}
    esempio = json.loads(json.dumps(base.get("esempio") or {}))
    for g in esempio.get("giorni") or []:
        for v in "ABC":
            for e in g.get(v) or []:
                if e.get("m") and e["m"] not in ids:
                    e["n"] = nomi_base.get(e["m"], e["m"])
                    del e["m"]

    # la copia del PT parte vuota: niente scheda d'esempio, a meno che in dati.json ci sia "esempio": true
    if d.get("esempio") is not True:
        esempio = None

    cfg = dict(base)
    cfg.update({
        "versione": str(versione), "app": d.get("app") or base.get("app") or "Scheda", "coach": d["coach"].strip(),
        "indirizzo": d.get("indirizzo") or "", "palestra": d.get("palestra") or "", "colore": col,
        "whatsapp": re.sub(r"\D", "", d.get("whatsapp") or ""), "scadenza": d.get("scadenza") or "",
        "assistenza": re.sub(r"\D", "", d.get("assistenza") or ""), "macchine": macchine, "esempio": esempio,
    })
    testa = testa.replace("Questa è la configurazione di ESEMPIO, creata da strumenti/crea_esempio.py.",
                          "Configurazione di " + cfg["coach"] + ", creata da strumenti/nuovo_pt.py.")
    open(os.path.join(out, "config.js"), "w", encoding="utf-8").write(
        testa + "var CONFIG = " + json.dumps(cfg, ensure_ascii=False, indent=1) + ";\n")

    # nome sotto l'icona
    fm = os.path.join(out, "manifest.webmanifest")
    man = json.load(open(fm, encoding="utf-8"))
    man["name"] = man["short_name"] = cfg["app"]
    json.dump(man, open(fm, "w", encoding="utf-8"), ensure_ascii=False, indent=1)

    # icona: il logo su fondo bianco, o le iniziali del coach nel suo colore
    logo = next((os.path.join(pt, x) for x in ("logo.png", "logo.jpg", "logo.jpeg") if os.path.exists(os.path.join(pt, x))), None)
    for px in (512, 180):
        dst = os.path.join(out, "icon-%d.png" % px)
        if logo:
            subprocess.run(["convert", logo + "[0]", "-auto-orient", "-background", "white", "-flatten",
                            "-resize", "%dx%d" % (px * 82 // 100, px * 82 // 100), "-gravity", "center",
                            "-extent", "%dx%d" % (px, px), dst], check=True)
        else:
            ini = "".join(w[0] for w in cfg["coach"].split()[:2]).upper()
            subprocess.run(["convert", "-size", "%dx%d" % (px, px), "xc:#141210", "-fill", col or "#E6BE8A",
                            "-font", "DejaVu-Serif-Bold", "-pointsize", str(px * 40 // 100), "-gravity", "center",
                            "-annotate", "0", ini, dst], check=True)

    nf = sum(1 for m in macchine if m.get("foto"))
    mb = sum(os.path.getsize(os.path.join(r, f)) for r, _, fs in os.walk(out) for f in fs) / 1e6
    print("Copia di %s pronta in %s" % (cfg["coach"], out))
    print("  versione %s · %d macchine sue (%d con foto) · %s · %.0f MB" % (
        cfg["versione"], len(macchine), nf, "catalogo dei produttori incluso" if os.path.isdir(os.path.join(out, "catalogo")) else "senza catalogo", mb))
    print("  prova a tempo: " + ("fino al " + cfg["scadenza"] if cfg["scadenza"] else "no"))
    print("  WhatsApp per i resoconti: " + (cfg["whatsapp"] or "nessuno (il cliente condivide o copia il testo)"))
    for x in avvisi:
        print("  ATTENZIONE: " + x)
    print("Ora trascina la cartella su Netlify (stesso sito se esiste già). Pagina del coach: <indirizzo>/coach.html")


if __name__ == "__main__":
    main()
