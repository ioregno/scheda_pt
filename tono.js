// Pulsante di prova per scegliere il tono dell'app: Nero (Champagne), Grafite (scuro più morbido), Avorio (chiaro).
// La scelta resta salvata sul telefono (localStorage) e vale sia per la pagina Coach sia per l'app del cliente.
(function(){
  var TONI = ['nero', 'grafite', 'avorio'];
  var NOMI = {nero: 'Nero', grafite: 'Grafite', avorio: 'Avorio'};
  var BAR = {nero: '#0A0A0A', grafite: '#1F1E1C', avorio: '#F6F1E8'};
  var KEY = 'pt-tono', root = document.documentElement, acc0 = null;
  function get(){ try { var t = localStorage.getItem(KEY); return TONI.indexOf(t) >= 0 ? t : 'nero'; } catch(e){ return 'nero'; } }
  function meta(t){
    var ms = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < ms.length; i++) ms[i].setAttribute('content', BAR[t]);
  }
  // nel tono chiaro l'oro del coach va scurito, altrimenti le scritte color oro su bianco non si leggono
  function accento(t){
    if (acc0 === null) acc0 = root.style.getPropertyValue('--accent') || '';
    var on0 = root.style.getPropertyValue('--on-accent');
    if (t === 'avorio') {
      var base = acc0 || '#E6BE8A';
      root.style.setProperty('--accent', 'color-mix(in srgb,' + base + ' 68%,#000)');
      root.style.setProperty('--on-accent', '#FFFFFF');
    } else if (acc0) {
      root.style.setProperty('--accent', acc0);
      var n = parseInt(acc0.trim().slice(1), 16), lum = (0.299 * (n >> 16) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) / 255;
      root.style.setProperty('--on-accent', lum < 0.6 ? '#FFFFFF' : '#111111');
    } else { root.style.removeProperty('--accent'); root.style.removeProperty('--on-accent'); }
  }
  function apply(t){ root.dataset.tono = t; meta(t); if (document.readyState !== 'loading') accento(t); }
  apply(get());
  function avviso(txt){
    var d = document.getElementById('tonoMsg');
    if (!d) { d = document.createElement('div'); d.id = 'tonoMsg'; document.body.appendChild(d); }
    d.textContent = txt; d.classList.add('on');
    clearTimeout(d._t); d._t = setTimeout(function(){ d.classList.remove('on'); }, 1400);
  }
  function monta(){
    accento(get());
    var head = document.querySelector('.apphead');
    if (!head || document.getElementById('tonoBtn')) return;
    var b = document.createElement('button');
    b.id = 'tonoBtn'; b.type = 'button'; b.className = 'tonobtn';
    b.setAttribute('aria-label', 'Cambia tono dei colori');
    b.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor"/></svg>';
    b.addEventListener('click', function(){
      var t = TONI[(TONI.indexOf(get()) + 1) % TONI.length];
      try { localStorage.setItem(KEY, t); } catch(e){}
      apply(t); accento(t); avviso('Tono: ' + NOMI[t]);
    });
    var av = head.querySelector('.avatar');
    head.insertBefore(b, av || null);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monta); else monta();
})();
