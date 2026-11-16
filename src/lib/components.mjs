// Componentes de marcação reutilizados pelas páginas.

import site from '../site.config.mjs';
import { esc } from './util.mjs';
import { withMath } from './tex.mjs';

/* ---- situação epistêmica de uma afirmação ---- */
export const STATUS = {
  proved: { label: 'Demonstrado', long: 'Demonstrado no preprint, com prova escrita. Ainda sem revisão por pares.' },
  cond: { label: 'Condicional', long: 'Demonstrado sob uma hipótese que não está provada.' },
  comp: { label: 'Evidência computacional', long: 'Resultado de cálculo ou experimento, com alcance declarado. Não é demonstração.' },
  conj: { label: 'Conjectura', long: 'Afirmação que se acredita verdadeira, sem prova.' },
  open: { label: 'Em aberto', long: 'Pergunta sem resposta conhecida.' },
};
export const st = (kind) => `<span class="st st-${kind}" aria-hidden="true"></span>`;
export const stLabel = (kind, text) => `${st(kind)}<span>${text ?? STATUS[kind].label}</span>`;

export function legend(kinds = Object.keys(STATUS)) {
  return `<ul class="legend" aria-label="Legenda da situação de cada afirmação">${kinds.map((k) => `<li>${stLabel(k)}</li>`).join('')}</ul>`;
}

/** Lista de afirmações classificadas. items: [{ kind, label?, html, src? }] */
export function claims(items) {
  return `<div class="claims">${items
    .map(
      (c) => `<div class="claim"><p class="claim-k">${stLabel(c.kind, c.label)}</p><div class="claim-b">${withMath(c.html)}${c.src ? `<p class="src">${c.src}</p>` : ''}</div></div>`,
    )
    .join('')}</div>`;
}

/* ---- estrutura de página ---- */
export function crumbs(trail) {
  // trail: [{ href, label }], o último é a página atual
  return `<nav class="crumbs" aria-label="Você está em"><ol>${trail
    .map((t, i) => (i === trail.length - 1 ? `<li aria-current="page">${esc(t.label)}</li>` : `<li><a href="${t.href}">${esc(t.label)}</a></li>`))
    .join('')}</ol></nav>`;
}

export function pageHead({ trail, title, lede, article = false }) {
  return `<header class="page-head${article ? ' is-article' : ''}"><div class="wrap grid">${trail ? crumbs(trail) : ''}<h1>${title}</h1>${lede ? `<p class="lede">${withMath(lede)}</p>` : ''}</div></header>`;
}

export function sec(title, body, { id, small } = {}) {
  const hid = id ?? `s-${title.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  return `<section class="sec" aria-labelledby="${hid}"><div class="wrap grid"><h2 class="sec-h" id="${hid}">${title}${small ? `<small>${small}</small>` : ''}</h2><div class="sec-b">${body}</div></div></section>`;
}

/** Página de leitura longa: coluna lateral (metadados, índice) + texto. */
export function article({ side, main, tocOnly = false }) {
  return `<div class="article"><div class="wrap grid"><aside class="article-side${tocOnly ? ' has-toc-only' : ''}">${side}</aside><div class="article-main">${main}</div></div></div>`;
}

export function figure({ n, svg, caption, scroll = true, cls = '' }) {
  return `<figure class="fig ${cls}"${n ? ` id="fig-${n}"` : ''}><div class="${scroll ? 'fig-scroll' : ''}"${scroll ? ' tabindex="0" role="group" aria-label="Figura (role na horizontal em telas estreitas)"' : ''}>${svg}</div><figcaption>${n ? `<b>Figura ${n}.</b> ` : ''}${withMath(caption)}</figcaption></figure>`;
}

export const prose = (html, cls = '') => `<div class="prose ${cls}">${withMath(html)}</div>`;

export function toc(items) {
  return `<h2 id="toc-h">Nesta página</h2><nav class="toc" aria-labelledby="toc-h"><ol>${items.map((i) => `<li><a href="#${i.id}">${i.label}</a></li>`).join('')}</ol></nav>`;
}

/* ---- dados estruturados ---- */
export const personLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${site.url}/#pessoa`,
  name: site.name,
  givenName: site.person.givenName,
  familyName: site.person.familyName,
  url: `${site.url}/`,
  email: `mailto:${site.person.email}`,
  jobTitle: 'Cientista da computação e engenheiro de software',
  description: 'Cientista da computação e pesquisador. Trabalha com matemática computacional (teoria dos números, dinâmica 3-ádica, problema 3n+1), inteligência artificial e engenharia de software.',
  address: { '@type': 'PostalAddress', addressLocality: 'Goiânia', addressRegion: 'GO', addressCountry: 'BR' },
  identifier: { '@type': 'PropertyValue', propertyID: 'ORCID', value: site.person.orcid },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Universidade Federal de Goiás', url: 'https://ufg.br/' },
    { '@type': 'CollegeOrUniversity', name: 'Centro Universitário de Goiás' },
  ],
  affiliation: { '@type': 'CollegeOrUniversity', name: 'Universidade Federal de Goiás', url: 'https://ufg.br/' },
  worksFor: { '@type': 'Organization', name: 'Metaprime Sistemas', url: 'https://metaprime.com.br/' },
  knowsAbout: ['Computational number theory', 'Collatz conjecture', '3-adic dynamics', 'Discrete dynamical systems', 'Computer-assisted proofs', 'Machine learning', 'Computer vision', 'Information retrieval', 'Software engineering'],
  knowsLanguage: ['pt-BR', 'en'],
  sameAs: [site.profiles.orcid, site.profiles.scholar, site.profiles.lattes, site.profiles.github, site.profiles.linkedin],
});

export const websiteLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#site`,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: ['pt-BR', 'en'],
  author: { '@id': `${site.url}/#pessoa` },
});

export const crumbsLd = (trail) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.label, item: `${site.url}${t.href}` })),
});

export const HOME = { href: '/', label: 'Início' };
