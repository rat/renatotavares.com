import site from '../site.config.mjs';
import { article, crumbsLd, HOME, pageHead, prose, sec } from '../lib/components.mjs';
import { bibtex, bySlug, checked, inPreparation, publications, reference } from '../data/publications.mjs';
import { dataLonga, esc } from '../lib/util.mjs';
import { refItem } from './00-inicio.mjs';

const BASE = { href: '/publicacoes/', label: 'Publicações' };
const LINES = {
  'programa-de-wirsching': ['/pesquisa/programa-de-wirsching/', 'O programa de Wirsching'],
  'cobertura-fraca': ['/pesquisa/cobertura-fraca/', 'A Conjectura da Cobertura Fraca'],
  'expoente-5x-mais-1': ['/pesquisa/expoente-5x-mais-1/', 'O expoente do mapa 5x+1'],
  'processamento-de-imagens': ['/pesquisa/processamento-de-imagens/', 'Processamento de imagens'],
};

const indice = {
  path: '/publicacoes/',
  title: 'Publicações',
  description: 'Preprints de Renato Augusto Tavares em matemática computacional e visão computacional, com resumos, identificadores (arXiv, DOI), repositórios de reprodutibilidade e citação em BibTeX.',
  jsonld: [
    crumbsLd([HOME, BASE]),
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Publicações de Renato Augusto Tavares',
      url: `${site.url}/publicacoes/`,
      author: { '@id': `${site.url}/#pessoa` },
      hasPart: publications.map((p) => ({ '@type': 'ScholarlyArticle', headline: p.title, url: `${site.url}/publicacoes/${p.slug}/` })),
    },
  ],
  body:
    pageHead({
      trail: [HOME, BASE],
      title: 'Publicações',
      lede: 'Cinco preprints, de 2024 a 2026. Cada um tem página própria com resumo, identificadores persistentes, material de reprodutibilidade e citação.',
    }) +
    sec('Preprints', `<ol class="refs">${publications.map(refItem).join('')}</ol>`, { small: 'Do mais recente ao mais antigo' }) +
    sec(
      'Em preparação',
      `<ul class="rows">${inPreparation
        .map((i) => `<li class="row"><div class="row-main"><h3 lang="en">${i.title}</h3><p>${i.note}</p></div><div class="row-side"><a href="${i.url}" class="ext">${i.urlLabel}</a>${i.project ? `<br><a href="${i.project}">Descrição do projeto</a>` : ''}</div></li>`)
        .join('')}</ul>`,
    ) +
    sec(
      'Sobre esta lista',
      prose(`<p>Todos os trabalhos acima são <strong>preprints</strong>: estão públicos e podem ser citados, mas nenhum passou por revisão por pares. A lista confere com o meu <a href="${site.profiles.orcid}">registro ORCID</a> e com os repositórios de origem (arXiv, Figshare, SSRN e Zenodo) em ${dataLonga(checked)}.</p>
      <p>Perfis acadêmicos: <a href="${site.profiles.orcid}">ORCID</a>, <a href="${site.profiles.scholar}">Google Scholar</a> e <a href="${site.profiles.lattes}">Currículo Lattes</a>. Há também um <a href="/publicacoes/feed.xml">feed Atom</a> com as publicações.</p>`),
    ),
};

function detail(p) {
  const url = `${site.url}/publicacoes/${p.slug}/`;
  const trail = [HOME, BASE, { href: `/publicacoes/${p.slug}/`, label: p.titlePt.split(':')[0] }];
  const line = LINES[p.line];
  const sup = p.supersededBy ? bySlug(p.supersededBy) : null;
  const doi = p.ids.find((i) => i.type === 'DOI');
  const arxiv = p.ids.find((i) => i.type === 'arXiv');
  const meta = [
    ['citation_title', p.title],
    ['citation_author', 'Tavares, Renato Augusto'],
    ['citation_author_orcid', site.profiles.orcid],
    ['citation_publication_date', p.date.replace(/-/g, '/')],
    ['citation_language', 'en'],
    ['citation_abstract_html_url', url],
    ['citation_keywords', p.keywords.join('; ')],
    ['DC.title', p.title],
    ['DC.creator', 'Tavares, Renato Augusto'],
    ['DC.date', p.date],
    ['DC.type', 'Preprint'],
    ['DC.language', 'en'],
    ...(doi ? [['citation_doi', doi.value], ['DC.identifier', `doi:${doi.value}`]] : []),
    ...(arxiv ? [['citation_arxiv_id', arxiv.value], ['DC.identifier', `arXiv:${arxiv.value}`]] : []),
  ];
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    '@id': `${url}#artigo`,
    headline: p.title,
    name: p.title,
    alternativeHeadline: p.titlePt,
    author: { '@id': `${site.url}/#pessoa`, '@type': 'Person', name: site.name, identifier: site.profiles.orcid },
    datePublished: p.date,
    inLanguage: 'en',
    abstract: p.abstract,
    keywords: p.keywords.join(', '),
    creativeWorkStatus: 'Preprint',
    isAccessibleForFree: true,
    url,
    mainEntityOfPage: url,
    sameAs: p.ids.map((i) => i.url),
    identifier: p.ids.map((i) => ({ '@type': 'PropertyValue', propertyID: i.type, value: i.value })),
  };
  const side = `
    <dl class="kv">
      <dt>Autor</dt><dd>${p.authors.join(', ')}</dd>
      <dt>Data</dt><dd><time datetime="${p.date}">${dataLonga(p.date)}</time></dd>
      <dt>Situação</dt><dd>${p.status}</dd>
      <dt>Identificadores</dt><dd>${p.ids.map((i) => `<a class="idn" href="${i.url}">${i.type === 'arXiv' ? 'arXiv:' : 'doi:'}${i.value}</a>`).join('<br>')}</dd>
      ${p.msc ? `<dt>MSC 2020</dt><dd>${p.msc}</dd>` : ''}
      ${line ? `<dt>Linha de pesquisa</dt><dd><a href="${line[0]}">${line[1]}</a></dd>` : ''}
    </dl>`;
  const main =
    prose(`
      <p class="lead-in">${p.summaryPt}</p>
      ${sup ? `<p><strong>Versão mais recente.</strong> O conteúdo deste preprint foi incorporado e ampliado em <a href="/publicacoes/${sup.slug}/">${sup.titlePt}</a>.</p>` : ''}
      <h2 id="acesso">Acesso</h2>
      <ul>${p.links.map((l) => `<li><a href="${l.url}">${l.label}</a></li>`).join('')}</ul>
      <h2 id="resumo">Resumo</h2>
      <p lang="en">${esc(p.abstract)}</p>
      <p class="note">Resumo no idioma original da publicação.${line ? ` Uma apresentação em português, com os resultados classificados por situação, está em <a href="${line[0]}">${line[1]}</a>.` : ''}</p>
      <h2 id="palavras-chave">Palavras-chave</h2>
      <p lang="en">${p.keywords.join(', ')}.</p>
      <h2 id="citar">Como citar</h2>
      <p>${reference(p)}</p>
    `) +
    `<div class="cite-box"><pre id="bib-${p.slug}" tabindex="0" aria-label="Citação em BibTeX"><code>${esc(bibtex(p))}</code></pre><button class="btn" type="button" data-copy="bib-${p.slug}" data-done="Copiado">Copiar BibTeX</button></div>` +
    `<nav class="pager" aria-label="Publicações"><a href="/publicacoes/"><span>Voltar</span>Todas as publicações</a></nav>`;
  return {
    path: `/publicacoes/${p.slug}/`,
    title: p.titlePt,
    ogTitle: p.title,
    description: p.summaryPt,
    ogType: 'article',
    meta,
    modified: p.date.length === 10 ? p.date : `${p.date}-15`,
    jsonld: [crumbsLd(trail), ld],
    body:
      pageHead({ trail: [HOME, BASE, { href: '', label: p.kind }], title: `<span lang="en">${p.title}</span>`, article: true }) + article({ side, main }),
  };
}

const feed = {
  path: '/publicacoes/feed.xml',
  title: 'Feed Atom',
  description: 'Feed Atom das publicações',
  raw: true,
  body: `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xml:lang="pt-BR">
  <title>Publicações de ${site.name}</title>
  <id>${site.url}/publicacoes/</id>
  <link rel="self" type="application/atom+xml" href="${site.url}/publicacoes/feed.xml"/>
  <link rel="alternate" type="text/html" href="${site.url}/publicacoes/"/>
  <updated>${publications[0].date}T12:00:00Z</updated>
  <author><name>${site.name}</name><uri>${site.url}/</uri></author>
${publications
  .map((p) => {
    const d = p.date.length === 10 ? p.date : `${p.date}-15`;
    return `  <entry>
    <title>${esc(p.title)}</title>
    <id>${site.url}/publicacoes/${p.slug}/</id>
    <link rel="alternate" type="text/html" href="${site.url}/publicacoes/${p.slug}/"/>
    <published>${d}T12:00:00Z</published>
    <updated>${d}T12:00:00Z</updated>
    <summary>${esc(p.summaryPt)}</summary>
  </entry>`;
  })
  .join('\n')}
</feed>
`,
};

export default [indice, ...publications.map(detail), feed];
