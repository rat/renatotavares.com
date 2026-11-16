#!/usr/bin/env node
// Gerador do site: lê src/ e escreve HTML estático na raiz do repositório,
// que é a raiz pública do site na hospedagem.
//
//   node src/build.mjs          gera tudo e valida os links internos
//
// Sem dependências: só Node.js (18+). O resultado é HTML, CSS e JS puros.

import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import site from './site.config.mjs';
import { renderPage } from './lib/layout.mjs';
import { jstarBruteForce, JSTAR } from './lib/figures.mjs';

const SRC = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(SRC);
const MANIFEST = join(SRC, '.build-manifest.json');

const written = [];
function write(rel, content) {
  const abs = join(ROOT, rel);
  mkdirSync(dirname(abs), { recursive: true });
  writeFileSync(abs, content);
  written.push(rel);
}
const hash = (buf) => createHash('sha256').update(buf).digest('hex').slice(0, 10);

// ---------------------------------------------------------------- conferências
// A figura do orçamento de cobertura usa a tabela publicada; aqui a definição é
// reimplementada e comparada com a tabela para ℓ pequeno antes de gerar o site.
for (let l = 1; l <= 6; l++) {
  const j = jstarBruteForce(l);
  if (j !== JSTAR[l - 1]) throw new Error(`j*(${l}) calculado = ${j}, tabela = ${JSTAR[l - 1]}`);
}

// --------------------------------------------------------------------- assets
const css = readFileSync(join(SRC, 'styles/site.css'));
const js = readFileSync(join(SRC, 'scripts/site.js'));
write('assets/css/site.css', css);
write('assets/js/site.js', js);
const assets = { css: `/assets/css/site.css?v=${hash(css)}`, js: `/assets/js/site.js?v=${hash(js)}`, consent: '' };
if (site.ads.enabled) {
  if (!/^ca-pub-\d{16}$/.test(site.ads.client)) throw new Error('ads.enabled = true exige ads.client no formato ca-pub-0000000000000000');
  const consent = readFileSync(join(SRC, 'scripts/consent.js'));
  write('assets/js/consent.js', consent);
  assets.consent = `/assets/js/consent.js?v=${hash(consent)}`;
}

// --------------------------------------------------------------------- páginas
const pages = [];
for (const f of readdirSync(join(SRC, 'pages')).filter((n) => n.endsWith('.mjs')).sort()) {
  const mod = await import(pathToFileURL(join(SRC, 'pages', f)).href);
  const list = Array.isArray(mod.default) ? mod.default : [mod.default];
  for (const p of list) pages.push({ ...p, source: f });
}

const outPath = (p) => (p.path.endsWith('/') ? `${p.path}index.html` : p.path).replace(/^\//, '');
const seen = new Set();
for (const p of pages) {
  if (!p.path || !p.title || !p.description) throw new Error(`${p.source}: página sem path, title ou description`);
  if (seen.has(p.path)) throw new Error(`caminho duplicado: ${p.path}`);
  seen.add(p.path);
  if (p.raw) write(outPath(p), p.body);
  else write(outPath(p), renderPage(p, assets));
}

// --------------------------------------------------------- sitemap e robots
const today = new Date().toISOString().slice(0, 10);
const indexable = pages.filter((p) => !p.noindex && !p.raw && p.path !== '/404.html');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((p) => {
    const alts = (p.alternates ?? []).map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${site.url}${a.path}"/>`).join('');
    return `  <url>\n    <loc>${site.url}${p.path}</loc>\n    <lastmod>${p.modified ?? today}</lastmod>${alts}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;
write('sitemap.xml', sitemap);
write(
  'robots.txt',
  `# renatotavares.com
User-agent: *
Allow: /
Disallow: /src/

Sitemap: ${site.url}/sitemap.xml
`,
);

// ------------------------------------------------- validação de links internos
const htmlFiles = written.filter((f) => f.endsWith('.html'));
const idsByFile = new Map();
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  idsByFile.set(f, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])));
}
const errors = [];
const external = new Set();
for (const f of htmlFiles) {
  const html = readFileSync(join(ROOT, f), 'utf8');
  if (/\$[^$<>\n]{1,60}\$/.test(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<annotation[\s\S]*?<\/annotation>/g, ''))) errors.push(`${f}: possível fórmula não convertida ($…$)`);
  for (const m of html.matchAll(/\s(?:href|src)="([^"]+)"/g)) {
    const url = m[1].replace(/&amp;/g, '&');
    if (/^(https?:)?\/\//.test(url)) { external.add(url); continue; }
    if (/^(mailto:|tel:|data:|javascript:)/.test(url)) continue;
    const [pathPart, frag] = url.split('#');
    let target;
    if (pathPart === '') target = f;
    else if (pathPart.startsWith('/')) target = pathPart.split('?')[0].replace(/^\//, '');
    else { errors.push(`${f}: link relativo não permitido «${url}» (use caminho absoluto)`); continue; }
    if (target === '' || target.endsWith('/')) target += 'index.html';
    if (!existsSync(join(ROOT, target)) || !statSync(join(ROOT, target)).isFile()) { errors.push(`${f}: destino inexistente «${url}»`); continue; }
    if (frag && target.endsWith('.html')) {
      const ids = idsByFile.get(target) ?? new Set([...readFileSync(join(ROOT, target), 'utf8').matchAll(/\sid="([^"]+)"/g)].map((x) => x[1]));
      if (!ids.has(decodeURIComponent(frag))) errors.push(`${f}: âncora inexistente «${url}»`);
    }
  }
  // regras de publicidade: a página legal nunca pode carregar tags de anúncio
  if (f === 'termos.html' && /adsbygoogle|googlesyndication|fundingchoices/.test(html)) errors.push('termos.html contém tag de publicidade/consentimento');
  if (!site.ads.enabled && /googlesyndication|doubleclick|google-analytics|googletagmanager|fonts\.googleapis/.test(html)) errors.push(`${f}: recurso de terceiros com publicidade desligada`);
  for (const m of html.matchAll(/<(?:script|link|img|iframe|source)\b[^>]*\s(?:src|href|srcset)="(https?:)?\/\/[^"]+"/g)) {
    if (/<link\b[^>]*rel="(canonical|alternate|me)"/.test(m[0])) continue;
    if (!site.ads.enabled) errors.push(`${f}: recurso carregado de outro domínio: ${m[0].slice(0, 120)}`);
  }
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) errors.push(`${f}: ${h1} elementos <h1> (esperado 1)`);
}

// ---------------------------------------------- limpeza de arquivos obsoletos
const previous = existsSync(MANIFEST) ? JSON.parse(readFileSync(MANIFEST, 'utf8')) : [];
for (const old of previous) {
  if (!written.includes(old) && existsSync(join(ROOT, old))) rmSync(join(ROOT, old));
}
writeFileSync(MANIFEST, `${JSON.stringify(written.sort(), null, 2)}\n`);
writeFileSync(join(SRC, '.external-links.json'), `${JSON.stringify([...external].sort(), null, 2)}\n`);

if (errors.length) {
  console.error(`\n${errors.length} problema(s):\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`${pages.length} páginas, ${written.length} arquivos. Links internos e âncoras: ok. Links externos distintos: ${external.size}.`);
