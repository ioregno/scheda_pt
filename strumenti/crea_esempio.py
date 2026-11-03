# Crea la configurazione di ESEMPIO (config.js + foto/) dal catalogo macchine e dalla scheda di giulio.
# Serve solo per la demo: un PT vero scrive il suo config.js (vedi GUIDA-PT.md) e mette le sue foto in foto/.
# Uso: python3 strumenti/crea_esempio.py [cartella_progetto]   (default /mnt/project-files)
import json, os, subprocess, sys

P = sys.argv[1] if len(sys.argv) > 1 else "/mnt/project-files"
SCHEDA, MACC = os.path.join(P, "scheda"), os.path.join(P, "macchinari")
sys.path.insert(0, SCHEDA)
from dati_scheda import GIORNI, GRUPPI, NOTE_FINALI   # noqa: E402
from come_usarla import COME                          # noqa: E402

QUI = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
APP = QUI   # l'app sta nella cartella principale del repo
FOTO = os.path.join(APP, "foto")
os.makedirs(FOTO, exist_ok=True)

cat = json.load(open(os.path.join(MACC, "macchinari.json"), encoding="utf-8"))
cat += json.load(open(os.path.join(SCHEDA, "macchine_extra.json"), encoding="utf-8"))
IMG_DIRS = [os.path.join(SCHEDA, "img"), os.path.join(MACC, "img")]

def foto(slug):
    src = None
    for d in IMG_DIRS:
        f = next((x for x in sorted(os.listdir(d)) if x.rsplit(".", 1)[0] == slug), None)
        if f:
            src = os.path.join(d, f)
            break
    if not src:
        return None
    out = os.path.join(FOTO, slug + ".jpg")
    w = subprocess.run(["identify", "-format", "%w", src + "[0]"], capture_output=True, text=True).stdout
    # grandi ridotte a 900px; i ritagli piccoli (~200px) ingranditi con un filtro di qualità
    scala = ["-filter", "Lanczos", "-resize", "900x900>"] if int(w or 0) >= 450 else ["-distort", "Resize", "300%", "-unsharp", "0x1.2+0.7+0.02"]
    subprocess.run(["convert", src + "[0]", "-background", "white", "-flatten", *scala, "-strip", "-quality", "80", out], check=True)
    return "foto/" + slug + ".jpg"

# muscoli di ogni macchina: prima come la usa la scheda di giulio, poi dal gruppo del catalogo
USO = {}
for g in GIORNI:
    for v in "ABC":
        for e in g[v]:
            if e[0]:
                USO.setdefault(e[0], [])
                USO[e[0]] += [x for x in e[4] if x not in USO[e[0]]]
SIN = {"dorso": "Schiena", "dorsal": "Schiena", "schiena": "Schiena", "spalle": "Spalle", "deltoid": "Spalle", "petto": "Petto",
       "bicipit": "Bicipiti", "tricipit": "Tricipiti", "quadricipit": "Quadricipiti", "femoral": "Femorali", "glute": "Glutei",
       "polpacc": "Polpacci", "lombar": "Lombari", "trapezi": "Trapezio", "addom": "Addominali"}
GRUPPI = GRUPPI + ["Addominali"]

macchine, visti = [], set()
for m in cat:
    if m["slug"] in visti:
        continue
    visti.add(m["slug"])
    testo = ((m.get("gruppo") or "") + " " + (m.get("distretto") or "")).lower()
    g = USO.get(m["slug"]) or list(dict.fromkeys(v for k, v in SIN.items() if k in testo))[:2]
    macchine.append({k: v for k, v in {
        "id": m["slug"], "nome": m["nome"], "marca": m.get("marca") or "", "linea": m.get("linea") or "",
        "distretto": m.get("distretto") or "", "gruppi": g, "esecuzione": m.get("esecuzione") or [],
        "consiglio": m.get("consiglio") or "", "foto": foto(m["slug"]), "link": m.get("url") or "",
    }.items() if v})
ids = {m["id"] for m in macchine}

giorni = []
for g in GIORNI:
    d = {"id": g["id"], "nome": g["nome"], "breve": g["breve"], "gruppi": g["gruppi"], "nota": g["nota"]}
    for v in "ABC":
        lst = []
        for i, e in enumerate(g[v]):
            x = {"m": e[0]} if e[0] in ids else {"n": e[1] or e[0]}
            x.update({"s": e[2], "r": e[3], "g": e[4], "p": e[5]})
            if COME.get((g["id"], v, i)):
                x["c"] = COME[(g["id"], v, i)]
            lst.append(x)
        d[v] = lst
    giorni.append(d)

esempio = {"id": "esempio", "cliente": "Marco", "obiettivo": 4, "varC": "Corpo libero", "data": "2026-11-03",
           "giorni": giorni, "note": NOTE_FINALI}

cfg = {
    "versione": "2", "app": "Scheda", "coach": "Il tuo coach", "indirizzo": "", "palestra": "Green Theory", "colore": "#E6BE8A", "whatsapp": "",
    "gruppi": GRUPPI, "macchine": macchine, "esempio": esempio,
}
txt = ("// CONFIGURAZIONE DELL'APP: l'unico file da cambiare (vedi GUIDA-PT.md).\n"
       "// Questa è la configurazione di ESEMPIO, creata da strumenti/crea_esempio.py.\n"
       "//   versione   aumentala (2, 3...) ogni volta che cambi questo file o le foto: i telefoni scaricano la copia nuova\n"
       "//   app        nome sotto l'icona e in alto nell'app\n"
       "//   coach      il tuo nome;  palestra  nome della palestra\n"
       "//   colore     colore principale, es. \"#E6BE8A\" (oro); vuoto = colore del tema\n"
       "//   whatsapp   tuo numero con prefisso, es. \"393331234567\": i clienti ti mandano il resoconto lì\n"
       "//   indirizzo  (facoltativo) indirizzo dell'app online, es. \"https://mario-pt.netlify.app/\"\n"
       "//   gruppi     muscoli tra cui scegliere\n"
       "//   macchine   la tua libreria: id (senza spazi), nome, marca, distretto, gruppi, esecuzione (passi), consiglio, foto (\"foto/nome.jpg\")\n"
       "//   esempio    scheda di esempio: la vedono i clienti in \"Guarda un esempio\" e tu come modello\n"
       "var CONFIG = " + json.dumps(cfg, ensure_ascii=False, indent=1) + ";\n")
open(os.path.join(APP, "config.js"), "w", encoding="utf-8").write(txt)
nf = sum(1 for m in macchine if m.get("foto"))
print(f"macchine: {len(macchine)}, con foto: {nf}, config.js: {len(txt)//1024} KB")
