// Moldura comum a todas as páginas: <head>, cabeçalho, rodapé.

import site from '../site.config.mjs';
import { esc, jsonld } from './util.mjs';

/** Marca do site: um nó e seus dois predecessores (n → 2n e n → (2n−1)/3). */
export const mark = (size = 22) =>
  `<svg class="mark" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 17.5C11 17.5 11 6.5 18.5 6.5M5 17.5H18.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="5" cy="17.5" r="3.1" fill="currentColor"/><circle class="mark-y" cx="18.5" cy="6.5" r="3.1"/><circle cx="18.5" cy="17.5" r="2.4" fill="currentColor"/></svg>`;

const T = {
  'pt-BR': {
    skip: 'Ir para o conteúdo', home: 'página inicial', navLabel: 'Principal', menu: 'Menu', close: 'Fechar',
    theme: 'Alternar entre tema claro e escuro', otherLang: 'English', otherLangHref: '/en/', otherLangCode: 'en',
    footNav: 'Mapa do site', profiles: 'Perfis', legal: 'Documentos legais', privacy: 'Política de Privacidade', terms: 'Termos de Uso',
    consent: 'Preferências de privacidade',
    footLine: 'Ciência da computação, matemática computacional e engenharia de software. Goiânia, Brasil.',
    rights: 'Textos e figuras deste site: todos os direitos reservados, salvo indicação em contrário. Preprints e código seguem as licenças indicadas em cada repositório.',
    noTrack: 'Este site não usa cookies, não exibe anúncios e não carrega recursos de terceiros.',
  },
  en: {
    skip: 'Skip to content', home: 'home', navLabel: 'Main', menu: 'Menu', close: 'Close',
    theme: 'Switch between light and dark theme', otherLang: 'Português', otherLangHref: '/', otherLangCode: 'pt-BR',
    footNav: 'Site map', profiles: 'Profiles', legal: 'Legal', privacy: 'Privacy Policy (Portuguese)', terms: 'Terms of Use (Portuguese)',
    consent: 'Privacy preferences',
    footLine: 'Computer science, computational mathematics and software engineering. Goiânia, Brazil.',
    rights: 'Text and figures on this site: all rights reserved unless stated otherwise. Preprints and code follow the licences stated in each repository.',
    noTrack: 'This site uses no cookies, shows no ads and loads no third-party resources.',
  },
};

const NAV_EN = [
  { href: '/en/#research', label: 'Research' },
  { href: '/en/#publications', label: 'Publications' },
  { href: '/en/#background', label: 'Background' },
  { href: '/en/#contact', label: 'Contact' },
];

/** Meta description: no máximo ~160 caracteres, cortando em fim de frase quando possível. */
function metaDesc(text) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= 160) return t;
  const cut = t.slice(0, 161);
  const end = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf('; '), cut.lastIndexOf(': '));
  if (end >= 90) return t.slice(0, end).replace(/[;:]$/, '') + '.';
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:]$/, '') + '…';
}

function head(page, assets) {
  const url = site.url + page.path;
  const title = page.path === '/' ? page.title : `${page.title} — ${site.name}`;
  const desc = metaDesc(page.description);
  const img = `${site.url}${page.image ?? '/assets/img/og.png'}`;
  const lang = page.lang ?? 'pt-BR';
  const robots = page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large';
  const alternates = (page.alternates ?? [])
    .map((a) => `<link rel="alternate" hreflang="${a.lang}" href="${site.url}${a.path}">`)
    .join('\n  ');
  const adsOn = site.ads.enabled && !site.ads.excludedPaths.includes(page.path) && !page.noAds;
  return `<!doctype html>
<html lang="${lang}"${adsOn ? ' data-ads="1"' : ''}>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}">
  <meta name="author" content="${esc(site.name)}">
  <meta name="robots" content="${robots}">
  <link rel="canonical" href="${url}">
  ${alternates}
  <meta name="color-scheme" content="light dark">
  <meta name="theme-color" content="#f2f3ef" media="(prefers-color-scheme: light)">
  <meta name="theme-color" content="#14171a" media="(prefers-color-scheme: dark)">
  <meta property="og:type" content="${page.ogType ?? 'website'}">
  <meta property="og:site_name" content="${esc(site.name)}">
  <meta property="og:locale" content="${lang === 'en' ? 'en_US' : 'pt_BR'}">
  <meta property="og:title" content="${esc(page.ogTitle ?? page.title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${img}">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${esc(site.name)}: ciência da computação, matemática computacional e engenharia de software">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(page.ogTitle ?? page.title)}">
  <meta name="twitter:description" content="${esc(desc)}">
  <meta name="twitter:image" content="${img}">
  ${(page.meta ?? []).map(([n, c]) => `<meta name="${esc(n)}" content="${esc(c)}">`).join('\n  ')}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="icon" href="/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="me" href="${site.profiles.orcid}">
  <link rel="me" href="${site.profiles.github}">
  <link rel="alternate" type="application/atom+xml" title="Publicações de ${esc(site.name)}" href="/publicacoes/feed.xml">
  <link rel="preload" href="/assets/fonts/source-serif-4.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/source-serif-4-display.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/ibm-plex-sans.woff2" as="font" type="font/woff2" crossorigin>
  <script>(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}document.documentElement.className+=' js'})()</script>
  <link rel="stylesheet" href="${assets.css}">
  ${(page.jsonld ?? []).map(jsonld).join('\n  ')}
</head>`;
}

function header(page) {
  const lang = page.lang ?? 'pt-BR';
  const t = T[lang];
  const nav = lang === 'en' ? NAV_EN : site.nav;
  const current = (href) => (page.path === href || (href !== '/' && page.path.startsWith(href)) ? ' aria-current="page"' : '');
  const homeHref = lang === 'en' ? '/en/' : '/';
  return `<a class="skip" href="#conteudo">${t.skip}</a>
<header class="site-head">
  <div class="wrap head-row">
    <a class="brand" href="${homeHref}" aria-label="${esc(site.name)}, ${t.home}">${mark()}<span>${esc(site.name)}</span></a>
    <nav class="nav" id="menu" aria-label="${t.navLabel}">
      <ul>
        ${nav.map((n) => `<li><a href="${n.href}"${current(n.href)}>${n.label}</a></li>`).join('\n        ')}
        <li class="nav-lang"><a href="${page.otherLangHref ?? t.otherLangHref}" lang="${t.otherLangCode}" hreflang="${t.otherLangCode}">${t.otherLang}</a></li>
      </ul>
    </nav>
    <div class="head-tools">
      <a class="lang" href="${page.otherLangHref ?? t.otherLangHref}" lang="${t.otherLangCode}" hreflang="${t.otherLangCode}">${t.otherLang}</a>
      <button class="tool theme-btn" type="button" aria-label="${t.theme}" title="${t.theme}"><svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M12 3.8a8.2 8.2 0 0 1 0 16.4z" fill="currentColor"/></svg></button>
      <button class="tool menu-btn" type="button" aria-expanded="false" aria-controls="menu" data-open="${t.menu}" data-close="${t.close}">${t.menu}</button>
    </div>
  </div>
</header>`;
}

function footer(page) {
  const lang = page.lang ?? 'pt-BR';
  const t = T[lang];
  const nav = lang === 'en' ? NAV_EN : site.nav;
  const p = site.profiles;
  const adsOn = site.ads.enabled;
  // Nas páginas com anúncios, o botão reabre a escolha ali mesmo. Nas páginas que nunca
  // carregam o código de consentimento (como a página legal), é um link para a inicial.
  const adsHere = adsOn && !site.ads.excludedPaths.includes(page.path) && !page.noAds;
  const prefs = !adsOn ? '' : adsHere
    ? `<li id="preferencias-de-privacidade"><button type="button" class="linklike" data-consent-open>${t.consent}</button></li>`
    : `<li><a href="/#preferencias-de-privacidade">${t.consent}</a></li>`;
  return `<footer class="site-foot">
  <div class="wrap foot-grid">
    <div class="foot-id">
      <p class="foot-name">${mark(20)}<span>${esc(site.name)}</span></p>
      <p>${t.footLine}</p>
      <p><a href="mailto:${site.person.email}">${site.person.email}</a></p>
    </div>
    <nav aria-label="${t.footNav}">
      <h2>${t.footNav}</h2>
      <ul>
        ${nav.map((n) => `<li><a href="${n.href}">${n.label}</a></li>`).join('\n        ')}
      </ul>
    </nav>
    <nav aria-label="${t.profiles}">
      <h2>${t.profiles}</h2>
      <ul>
        <li><a href="${p.orcid}" rel="me noopener">ORCID</a></li>
        <li><a href="${p.scholar}" rel="noopener">Google Scholar</a></li>
        <li><a href="${p.lattes}" rel="noopener">Currículo Lattes</a></li>
        <li><a href="${p.github}" rel="me noopener">GitHub</a></li>
        <li><a href="${p.linkedin}" rel="noopener">LinkedIn</a></li>
      </ul>
    </nav>
    <nav aria-label="${t.legal}">
      <h2>${t.legal}</h2>
      <ul>
        <li><a href="/termos.html#privacidade">${t.privacy}</a></li>
        <li><a href="/termos.html#termos">${t.terms}</a></li>
        ${prefs}
      </ul>
    </nav>
  </div>
  <div class="wrap foot-base">
    <p>© ${new Date().getFullYear()} ${esc(site.name)}. ${t.rights}</p>
    ${adsOn ? '' : `<p>${t.noTrack}</p>`}
  </div>
</footer>`;
}

export function renderPage(page, assets) {
  const adsOn = site.ads.enabled && !site.ads.excludedPaths.includes(page.path) && !page.noAds;
  return `${head(page, assets)}
<body${page.bodyClass ? ` class="${page.bodyClass}"` : ''}>
${header(page)}
<main id="conteudo" tabindex="-1">
${page.body}
</main>
${footer(page)}
<script src="${assets.js}" defer></script>
${adsOn ? `<script src="${assets.consent}" defer data-client="${esc(site.ads.client)}"${site.ads.testScriptUrl ? ` data-src="${esc(site.ads.testScriptUrl)}"` : ''}></script>` : ''}
</body>
</html>
`;
}
