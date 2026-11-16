/* renatotavares.com — comportamento mínimo, sem dependências.
 * Tudo aqui é aprimoramento: o site funciona inteiro sem JavaScript. */
(function () {
  'use strict';
  var root = document.documentElement;

  /* ---- âncoras da versão anterior do site (página única) ---- */
  if (location.pathname === '/' && location.hash) {
    var legacy = { '#sobre': '/sobre/', '#atuacao': '#s-pesquisa', '#tecnologias': '/trajetoria/#ferramentas', '#projetos': '#s-projetos', '#experiencia': '/trajetoria/#experiencia', '#contato': '#s-contato', '#home': '#conteudo' };
    if (legacy[location.hash]) location.replace(legacy[location.hash]);
  }

  /* ---- tema claro/escuro (a escolha fica só no navegador, em localStorage) ---- */
  var themeBtn = document.querySelector('.theme-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var current = root.getAttribute('data-theme');
      if (!current) current = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) { /* armazenamento indisponível */ }
    });
  }

  /* ---- menu em telas estreitas ---- */
  var menuBtn = document.querySelector('.menu-btn');
  var nav = document.getElementById('menu');
  function setMenu(open) {
    root.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? menuBtn.getAttribute('data-close') : menuBtn.getAttribute('data-open');
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && root.classList.contains('menu-open')) { setMenu(false); menuBtn.focus(); }
    });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    window.matchMedia('(min-width: 54.01rem)').addEventListener('change', function (m) { if (m.matches) setMenu(false); });
  }

  /* ---- árvore de predecessores: destacar a órbita de um número até 1 ---- */
  Array.prototype.forEach.call(document.querySelectorAll('.fig-tree'), function (svg) {
    var out = document.querySelector('[data-orbit-for="' + svg.id + '"]');
    var nodes = {};
    var edges = {};
    Array.prototype.forEach.call(svg.querySelectorAll('.nd'), function (g) { nodes[g.getAttribute('data-i')] = g; });
    Array.prototype.forEach.call(svg.querySelectorAll('.e'), function (p) { edges[p.getAttribute('data-c')] = p; });
    var idle = out ? out.innerHTML : '';
    function clear() {
      svg.classList.remove('has-sel');
      Array.prototype.forEach.call(svg.querySelectorAll('.on'), function (el) { el.classList.remove('on'); });
      if (out) out.innerHTML = idle;
    }
    function select(g) {
      clear();
      var orbit = [];
      var cur = g;
      while (cur) {
        cur.classList.add('on');
        orbit.push(cur.getAttribute('data-n'));
        var e = edges[cur.getAttribute('data-i')];
        if (e) e.classList.add('on');
        cur = nodes[cur.getAttribute('data-p')];
      }
      svg.classList.add('has-sel');
      if (out) {
        var steps = orbit.length - 1;
        out.innerHTML = '<b>' + orbit[0] + '</b> chega a 1 em ' + steps + (steps === 1 ? ' passo' : ' passos') + ': ' + orbit.join(' → ');
      }
    }
    svg.addEventListener('pointerover', function (e) { var g = e.target.closest('.nd'); if (g) select(g); });
    svg.addEventListener('pointerdown', function (e) { var g = e.target.closest('.nd'); if (g) select(g); });
    svg.addEventListener('pointerleave', clear);
  });

  /* ---- copiar citação ---- */
  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function (btn) {
    btn.addEventListener('click', function () {
      var src = document.getElementById(btn.getAttribute('data-copy'));
      if (!src || !navigator.clipboard) return;
      navigator.clipboard.writeText(src.textContent).then(function () {
        var old = btn.textContent;
        btn.textContent = btn.getAttribute('data-done') || 'Copiado';
        setTimeout(function () { btn.textContent = old; }, 1800);
      });
    });
  });

  /* ---- índice lateral: marcar a seção em leitura ---- */
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var targets = [];
    Array.prototype.forEach.call(tocLinks, function (a) {
      var el = document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1)));
      if (el) { byId[el.id] = a; targets.push(el); }
    });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var first = null;
      for (var i = 0; i < targets.length; i++) { if (visible[targets[i].id]) { first = targets[i].id; break; } }
      if (!first) return;
      Array.prototype.forEach.call(tocLinks, function (a) { a.removeAttribute('aria-current'); });
      byId[first].setAttribute('aria-current', 'true');
    }, { rootMargin: '-15% 0px -70% 0px' });
    targets.forEach(function (t) { io.observe(t); });
  }
})();
