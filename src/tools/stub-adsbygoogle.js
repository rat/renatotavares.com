/* Simulador local da tag do AdSense, usado só no teste do consentimento (SITE_ADS_TEST=1).
 * ?tcf=1&p1=1  simula a CMP do Google informando que o GDPR se aplica, com consentimento ao Propósito 1
 * ?tcf=1&p1=0  idem, sem consentimento
 * ?tcf=0       simula a CMP informando que o GDPR não se aplica
 * (sem ?tcf)   nenhuma CMP presente */
(function () {
  window.__stubAdsLoaded = true;
  var q = new URLSearchParams(location.search);
  if (!q.has('tcf')) return;
  var gdpr = q.get('tcf') === '1';
  window.__tcfapi = function (cmd, ver, cb) {
    if (cmd !== 'addEventListener') return;
    setTimeout(function () {
      cb({ gdprApplies: gdpr, eventStatus: gdpr ? 'useractioncomplete' : 'tcloaded', purpose: { consents: { 1: q.get('p1') === '1' } } }, true);
    }, 50);
  };
})();
