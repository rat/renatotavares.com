/* Consentimento para publicidade — só é publicado quando `ads.enabled` é true
 * em src/site.config.mjs. Com a publicidade desligada este arquivo não existe
 * no site e nenhum aviso é exibido, porque não há nada a consentir.
 *
 * O que este script garante:
 *
 * 1. Fora da Europa (inclusive no Brasil), NENHUM código do Google é carregado
 *    antes da escolha do visitante. O aviso oferece Recusar, Aceitar e
 *    Personalizar com o mesmo destaque. Recusar = nenhum anúncio.
 *
 * 2. No EEE, no Reino Unido e na Suíça, o Google exige uma plataforma de
 *    consentimento (CMP) certificada e integrada ao TCF da IAB. Um aviso feito
 *    em casa NÃO atende a essa exigência. Por isso, ali quem pergunta é a CMP
 *    do próprio Google ("Privacidade e mensagens" do AdSense), que chega junto
 *    com a tag do AdSense. A tag é carregada em pausa (pauseAdRequests = 1):
 *    nenhum anúncio é pedido antes de a CMP informar consentimento para o
 *    Propósito 1 do TCF. Se a mensagem europeia não estiver publicada no painel
 *    do AdSense, os anúncios simplesmente não são exibidos nessa região.
 *
 * 3. A região é estimada pelo fuso horário do navegador (um site estático não
 *    tem geolocalização). O erro é sempre para o lado seguro: quem estiver na
 *    Europa com fuso de fora ainda recebe a CMP do Google depois de aceitar, e
 *    quem estiver fora com fuso europeu cai no aviso próprio assim que o TCF
 *    informa que o GDPR não se aplica.
 *
 * 4. O link "Preferências de privacidade" do rodapé reabre a escolha: a CMP do
 *    Google onde o GDPR se aplica, o aviso próprio nos demais lugares.
 */
(function () {
  'use strict';
  var self = document.currentScript;
  var CLIENT = self.getAttribute('data-client');
  var SRC = self.getAttribute('data-src') || 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + encodeURIComponent(CLIENT);
  var KEY = 'consent.v1';
  var MAX_AGE = 365 * 24 * 3600 * 1000; // a escolha é pedida de novo após 12 meses
  var EUROPE = /^(Europe\/|Atlantic\/(Azores|Madeira|Canary|Faroe|Reykjavik)|Arctic\/Longyearbyen|Africa\/Ceuta|Asia\/(Nicosia|Famagusta))/;

  var state = { tagLoaded: false, gdpr: null, banner: null };

  function timeZone() { try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) { return ''; } }
  function read() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY));
      if (v && v.ts && Date.now() - v.ts < MAX_AGE && (v.ads === 'granted' || v.ads === 'denied')) return v;
    } catch (e) { /* sem armazenamento: a escolha vale só para esta página */ }
    return null;
  }
  function write(v) { v.ts = Date.now(); try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) { /* idem */ } state.memory = v; }

  /* ---- tag do AdSense, sempre carregada em pausa ---- */
  function loadTag() {
    if (state.tagLoaded) return;
    state.tagLoaded = true;
    var q = (window.adsbygoogle = window.adsbygoogle || []);
    q.pauseAdRequests = 1;
    var s = document.createElement('script');
    s.async = true; s.src = SRC; s.crossOrigin = 'anonymous';
    s.setAttribute('data-ads-tag', '1');
    document.head.appendChild(s);
  }
  function serve(personalized) {
    var q = (window.adsbygoogle = window.adsbygoogle || []);
    q.requestNonPersonalizedAds = personalized ? 0 : 1;
    q.pauseAdRequests = 0;
    document.documentElement.setAttribute('data-ads-state', personalized ? 'personalized' : 'non-personalized');
  }
  function hold() { document.documentElement.setAttribute('data-ads-state', 'paused'); }

  /* ---- TCF: descobre se a CMP do Google assumiu a pergunta ---- */
  function watchTcf(onGdpr, onNoGdpr) {
    var tries = 0;
    (function wait() {
      if (typeof window.__tcfapi === 'function') {
        window.__tcfapi('addEventListener', 2, function (tc, ok) {
          if (!ok || !tc) return;
          if (tc.gdprApplies === false) { state.gdpr = false; onNoGdpr(); return; }
          state.gdpr = true;
          if (tc.eventStatus === 'tcloaded' || tc.eventStatus === 'useractioncomplete') onGdpr(!!(tc.purpose && tc.purpose.consents && tc.purpose.consents[1]));
        });
      } else if (++tries < 25) setTimeout(wait, 200);
      else { state.gdpr = false; onNoGdpr(); } // sem CMP após 5 s
    })();
  }

  /* ---- aviso próprio (fora do alcance do GDPR) ---- */
  function el(tag, attrs, html) { var n = document.createElement(tag); for (var k in attrs) n.setAttribute(k, attrs[k]); if (html) n.innerHTML = html; return n; }
  function closeBanner() { if (state.banner) { state.banner.remove(); state.banner = null; } }
  function openBanner(current) {
    closeBanner();
    var box = el('section', { class: 'consent', role: 'region', 'aria-labelledby': 'consent-h' });
    box.innerHTML =
      '<div class="consent-in"><h2 id="consent-h" tabindex="-1">Anúncios neste site</h2>' +
      '<p>Este site pode exibir anúncios do Google. Para isso, o Google e seus parceiros usam cookies e identificadores do seu navegador. Nada disso é carregado sem a sua escolha, e recusar não muda o conteúdo que você vê. Detalhes na <a href="/termos.html#site-publicidade">Política de Privacidade</a>.</p>' +
      '<fieldset hidden><legend class="vh">Tipo de anúncio</legend>' +
      '<label><input type="radio" name="consent-kind" value="np" checked> Anúncios não personalizados: usam o assunto da página e a localização aproximada; ainda usam cookies para limitar repetições, medir e evitar fraude.</label>' +
      '<label><input type="radio" name="consent-kind" value="p"> Anúncios personalizados: usam também o seu histórico de interesses.</label>' +
      '</fieldset>' +
      '<div class="consent-actions">' +
      '<button type="button" class="btn" data-act="deny">Recusar</button>' +
      '<button type="button" class="btn" data-act="grant">Aceitar</button>' +
      '<button type="button" class="btn" data-act="custom" aria-expanded="false">Personalizar</button>' +
      '</div></div>';
    var fs = box.querySelector('fieldset');
    if (current && current.ads === 'granted' && current.personalized) box.querySelector('input[value="p"]').checked = true;
    box.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-act]');
      if (!b) return;
      var act = b.getAttribute('data-act');
      if (act === 'custom') {
        if (fs.hidden) { fs.hidden = false; b.textContent = 'Salvar escolha'; b.setAttribute('aria-expanded', 'true'); return; }
        decide({ ads: 'granted', personalized: box.querySelector('input[name="consent-kind"]:checked').value === 'p' });
      } else if (act === 'grant') decide({ ads: 'granted', personalized: true });
      else decide({ ads: 'denied', personalized: false });
    });
    document.body.appendChild(box);
    state.banner = box;
    if (current) box.querySelector('h2').focus();
  }
  function decide(choice) {
    var previous = state.memory || read();
    write(choice);
    closeBanner();
    // retirar um consentimento já usado exige recarregar: os anúncios já estão na página
    if (previous && previous.ads === 'granted' && state.tagLoaded) { location.reload(); return; }
    apply(choice);
  }
  function apply(choice) {
    if (choice.ads !== 'granted') { hold(); return; }
    if (state.gdpr === false && state.tagLoaded) { serve(choice.personalized); return; }
    hold();
    loadTag();
    // se, apesar do fuso, o Google disser que o GDPR se aplica, quem decide é a CMP dele
    watchTcf(function (purpose1) { if (purpose1) serveTcf(); else hold(); }, function () { serve(choice.personalized); });
  }
  function serveTcf() {
    // sob o TCF a personalização é decidida pelo próprio Google a partir da string de consentimento
    var q = (window.adsbygoogle = window.adsbygoogle || []);
    q.pauseAdRequests = 0;
    document.documentElement.setAttribute('data-ads-state', 'tcf');
  }

  /* ---- início ---- */
  function start() {
    var saved = read();
    if (EUROPE.test(timeZone())) {
      hold();
      loadTag();
      watchTcf(
        function (purpose1) { if (purpose1) serveTcf(); else hold(); },
        function () { if (saved) apply(saved); else openBanner(null); },
      );
    } else if (saved) apply(saved);
    else { hold(); openBanner(null); }
  }

  function openPreferences() {
    if (state.gdpr === true && window.googlefc && window.googlefc.callbackQueue) window.googlefc.callbackQueue.push(window.googlefc.showRevocationMessage);
    else openBanner(state.memory || read() || { ads: 'denied' });
  }
  document.addEventListener('click', function (e) { if (e.target.closest('[data-consent-open]')) openPreferences(); });

  start();
  // chegada pelo link "Preferências de privacidade" de uma página sem anúncios
  if (location.hash === '#preferencias-de-privacidade') setTimeout(openPreferences, 1500);
})();
