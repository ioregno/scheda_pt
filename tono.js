// Interruttore chiaro/scuro: Avorio (chiaro) e Grafite (scuro morbido). Finché non lo tocchi segue il telefono
// (iPhone in modalità chiara = Avorio, scura = Grafite). La scelta resta salvata e vale per pagina Coach e app del cliente.
(function(){
  var TONI = ['avorio', 'grafite'];
  var BAR = {grafite: '#1F1E1C', avorio: '#F6F1E8'};
  var KEY = 'pt-tono', root = document.documentElement, acc0 = null;
  var MQ = window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function auto(){ return MQ && MQ.matches ? 'grafite' : 'avorio'; }
  function saved(){ try { var t = localStorage.getItem(KEY); return TONI.indexOf(t) >= 0 ? t : ''; } catch(e){ return ''; } }
  function get(){ return saved() || auto(); }
  function meta(t){
    var ms = document.querySelectorAll('meta[name="theme-color"]');
    for (var i = 0; i < ms.length; i++) ms[i].setAttribute('content', BAR[t]);
  }
  // nel tono chiaro l'oro del coach va scurito, altrimenti le scritte color oro su bianco non si leggono
  function accento(t){
    if (acc0 === null) acc0 = root.style.getPropertyValue('--accent') || '';
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
  function apply(t){
    root.dataset.tono = t; meta(t); if (document.readyState !== 'loading') accento(t);
    var b = document.getElementById('tonoBtn'); if (b) b.setAttribute('aria-checked', t === 'grafite' ? 'true' : 'false');
  }
  if (MQ && MQ.addEventListener) MQ.addEventListener('change', function(){ if (!saved()) apply(auto()); });
  apply(get());
  function monta(){
    accento(get());
    var head = document.querySelector('.apphead');
    if (!head || document.getElementById('tonoBtn')) return;
    var b = document.createElement('button');
    b.id = 'tonoBtn'; b.type = 'button'; b.className = 'tonosw';
    b.setAttribute('role', 'switch'); b.setAttribute('aria-label', 'Tema scuro');
    b.setAttribute('aria-checked', get() === 'grafite' ? 'true' : 'false');
    b.innerHTML = '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>' +
      '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor"/></svg><span class="knob"></span>';
    b.addEventListener('click', function(){
      var t = get() === 'grafite' ? 'avorio' : 'grafite';
      try { localStorage.setItem(KEY, t); } catch(e){}
      root.classList.add('tono-anim'); apply(t); accento(t);
      setTimeout(function(){ root.classList.remove('tono-anim'); }, 350);
    });
    var av = head.querySelector('.avatar');
    head.insertBefore(b, av || null);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', monta); else monta();
})();
