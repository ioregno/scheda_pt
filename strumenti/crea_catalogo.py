# Crea catalogo/ (dati compatti + foto) dal catalogo dei produttori raccolto nel progetto.
# Uso: python3 strumenti/crea_catalogo.py /mnt/project-files/macchinari/
# catalogo/catalogo.json: {"v": data, "campi": [...], "m": [[id, nome, marca, linea, tipo, gruppi, distretto, foto, stato, link], ...]}
import json, os, sys, shutil, datetime
src = sys.argv[1]
root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'catalogo')
L = json.load(open(os.path.join(src, 'catalogo_produttori.json'), encoding='utf-8'))
os.makedirs(os.path.join(root, 'foto'), exist_ok=True)
out = []
for m in L:
    foto = ''
    if m.get('foto'):
        rel = 'catalogo/foto/' + m['cartella'] + '/' + m['id'] + '.jpg'
        dst = os.path.join(root, '..', rel)
        os.makedirs(os.path.dirname(dst), exist_ok=True)
        if not os.path.exists(dst) or os.path.getsize(dst) != os.path.getsize(os.path.join(src, m['foto'])):
            shutil.copyfile(os.path.join(src, m['foto']), dst)
        foto = rel
    note = m.get('note') or ''
    fp = 'fuori produzione' if 'fuori produzione' in note.lower() else ''
    out.append([m['id'], m['nome'], m['marca'], m.get('linea', ''), m.get('tipo', ''), m.get('gruppi', []), m.get('distretto', ''), foto, fp, m.get('link', '')])
data = {'v': datetime.date.today().isoformat(), 'campi': ['id', 'nome', 'marca', 'linea', 'tipo', 'gruppi', 'distretto', 'foto', 'stato', 'link'], 'm': out}
json.dump(data, open(os.path.join(root, 'catalogo.json'), 'w', encoding='utf-8'), ensure_ascii=False, separators=(',', ':'))
print(len(out), 'macchine,', sum(1 for x in out if x[7]), 'con foto')
