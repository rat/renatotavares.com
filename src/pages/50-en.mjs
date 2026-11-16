import site from '../site.config.mjs';
import { personLd, sec, st } from '../lib/components.mjs';
import { publications } from '../data/publications.mjs';
import { dateEn } from '../lib/util.mjs';

// Página única em inglês: um resumo acadêmico. As demais páginas existem só em
// português; por isso apenas a página inicial declara hreflang para esta.

const p = site.profiles;
const pubs = publications
  .map(
    (x) => `<li class="ref"><p class="ref-y">${x.year}</p><div>
      <h3 class="ref-t">${x.title}</h3>
      <p class="ref-m">Preprint, ${dateEn(x.date)}. ${x.ids.map((i) => `<a class="idn" href="${i.url}">${i.type === 'arXiv' ? 'arXiv:' : 'doi:'}${i.value}</a>`).join(' and ')}${x.supersededBy ? '. Superseded by the Conjectures 1 and 3 preprint above' : ''}. Not peer reviewed.</p>
      <p class="ref-m">${x.links.filter((l) => /GitHub|Zenodo/.test(l.label)).map((l) => `<a href="${l.url}">${/GitHub/.test(l.label) ? 'Code (GitHub)' : 'Archive (Zenodo)'}</a>`).join(' ')}</p>
    </div></li>`,
  )
  .join('');

const hero = `<section class="hero" aria-labelledby="name">
  <div class="wrap grid">
    <div class="hero-text" style="grid-column: 1 / span 9">
      <h1 id="name">${site.name}<span>Computer scientist. Goiânia, Brazil.</span></h1>
      <p class="statement">I work on problems in number theory where the computer is part of the argument, and I write the software that makes that argument checkable.</p>
      <p>My current research is on the 3n+1 problem and Wirsching’s program for positive predecessor density. Outside mathematics, I direct the development of business management software at Metaprime, I am a master’s student in digital image processing at the Federal University of Goiás (UFG), and I publish Android apps.</p>
      <p class="note">This page is a summary in English. The full site, with detailed research notes and project write-ups, is <a href="/" lang="pt-BR" hreflang="pt-BR">in Portuguese</a>.</p>
    </div>
  </div>
</section>`;

const research = sec(
  'Research',
  `<ul class="rows">
    <li class="row"><div class="row-main"><h3>Wirsching’s program for positive predecessor density</h3><p>In 2003, Günther Wirsching reduced uniform positive predecessor density for the 3n+1 map to a chain of five conditions organized into three conjectures. A 2026 preprint proves Conjectures 1 and 3 and reduces the chain to a single condition, (⋆3). Conjecture 2, and positive predecessor density itself, remain open.</p></div><div class="row-side"><ul><li>${st('proved')}<span>Conjectures 1 and 3 (preprint)</span></li><li>${st('open')}<span>Conjecture 2, positive density</span></li></ul><p><a href="/pesquisa/programa-de-wirsching/" hreflang="pt-BR">Notes in Portuguese</a></p></div></li>
    <li class="row"><div class="row-main"><h3>Wirsching’s Weak Covering Conjecture</h3><p>Exact computation of the covering budget j*(ℓ) extended from ℓ = 20 to ℓ = 23; an unconditional proof that the excess over the counting rate is unbounded; a linear upper bound conditional on a computationally verified correspondence with a mean-payoff game; and theorems on the residues that resist coverage. The conjecture remains open.</p></div><div class="row-side"><ul><li>${st('comp')}<span>Exact table to ℓ = 23</span></li><li>${st('proved')}<span>e(ℓ) ≥ ¼ log₂ ℓ − O(1)</span></li><li>${st('cond')}<span>j*(ℓ) ≤ 9ℓ/8 + 33/2</span></li><li>${st('open')}<span>The conjecture</span></li></ul><p><a href="/pesquisa/cobertura-fraca/" hreflang="pt-BR">Notes in Portuguese</a></p></div></li>
    <li class="row"><div class="row-main"><h3>The counting exponent of the 5x+1 reverse tree</h3><p>A calibrated computational study comparing the Kontorovich–Lagarias prediction (0.650919) with Volkov’s (0.678). Under stated, unproved assumptions, the calibrated reading of the arithmetic tree is consistent with the former. This is computational evidence, not a proof.</p></div><div class="row-side"><ul><li>${st('comp')}<span>Calibrated reading: 0.64926</span></li><li>${st('conj')}<span>Existence of the exponent</span></li></ul><p><a href="/pesquisa/expoente-5x-mais-1/" hreflang="pt-BR">Notes in Portuguese</a></p></div></li>
    <li class="row"><div class="row-main"><h3>Image processing and computer vision</h3><p>The subject of my master’s studies. A 2024 preprint evaluates image preprocessing techniques for licence-plate OCR on Brazilian plates and reports a negative result: none of the techniques outperformed the baseline.</p></div><div class="row-side"><ul><li>${st('comp')}<span>Experimental study</span></li></ul><p><a href="/pesquisa/processamento-de-imagens/" hreflang="pt-BR">Notes in Portuguese</a></p></div></li>
  </ul>
  <p class="note measure">Markers show the status of each result: ${st('proved')}proved in a preprint, ${st('cond')}conditional, ${st('comp')}computational evidence, ${st('conj')}conjecture, ${st('open')}open. None of this work has been peer reviewed yet.</p>
  <p class="measure">I try to keep theorems, conditional results, empirical observations and open questions explicitly apart; to use exact arithmetic or certified interval arithmetic whenever a number enters a statement; to write independent implementations of expensive computations; and to archive code and data with a DOI. I also use multi-agent AI systems as research instruments, for literature search, hypothesis generation, code auditing and manuscript critique. Direction, claims and responsibility remain mine.</p>`,
  { id: 'research' },
);

const publicationsSec = sec('Publications', `<ol class="refs">${pubs}</ol>`, { id: 'publications', small: 'Preprints' });

const background = sec(
  'Background',
  `<div class="duo">
    <div><h3>Education</h3><ul class="plain">
      <li><strong>Master’s studies in Digital Image Processing</strong><span>Institute of Informatics, Federal University of Goiás (UFG). 2024 to present</span></li>
      <li><strong>MBA in Software Engineering with Artificial Intelligence</strong><span>Full Cycle. 2026</span></li>
      <li><strong>Postgraduate specialization in Databases with emphasis on Big Data</strong><span>Institute of Informatics, UFG. Completed 2023</span></li>
      <li><strong>Technology degree in Systems Analysis and Development</strong><span>Centro Universitário de Goiás (UNIGOIÁS)</span></li>
    </ul></div>
    <div><h3>Professional experience</h3><ul class="plain">
      <li><strong>Metaprime Sistemas</strong><span>Director, since 2022; IT Development Manager, 2019 to 2022. Business management (ERP) software</span></li>
      <li><strong>MR Automação Industrial</strong><span>Hardware Engineer, 2017 to 2019. Custom hardware and embedded firmware</span></li>
      <li><strong>SGS Unigeo Agricultura de Precisão</strong><span>Senior Programmer, 2014 to 2017. Software for precision agriculture</span></li>
    </ul></div>
  </div>`,
  { id: 'background' },
);

const contact = sec(
  'Contact',
  `<p class="contact-mail"><a href="mailto:${site.person.email}">${site.person.email}</a></p>
  <p class="measure">For academic correspondence: <a href="mailto:${site.person.academicEmail}">${site.person.academicEmail}</a>. I welcome corrections to the preprints and genuine scientific collaboration in areas where I can contribute substantively.</p>
  <ul class="links">
    <li><a href="${p.orcid}" rel="me noopener">ORCID</a></li>
    <li><a href="${p.scholar.replace('hl=pt-BR', 'hl=en')}" rel="noopener">Google Scholar</a></li>
    <li><a href="${p.lattes}" rel="noopener">Lattes CV</a></li>
    <li><a href="${p.github}" rel="me noopener">GitHub</a></li>
    <li><a href="${p.linkedin}" rel="noopener">LinkedIn</a></li>
  </ul>`,
  { id: 'contact' },
);

const ld = personLd();
ld.jobTitle = 'Computer scientist and software engineer';
ld.description = 'Computer scientist and researcher working on computational mathematics (number theory, 3-adic dynamics, the 3n+1 problem), artificial intelligence and software engineering.';

export default {
  path: '/en/',
  lang: 'en',
  title: 'Renato Augusto Tavares — computer science, computational mathematics, software engineering',
  ogTitle: 'Renato Augusto Tavares',
  description: 'Computer scientist in Goiânia, Brazil. Research in computational mathematics (the 3n+1 problem, 3-adic dynamics, number theory), artificial intelligence and software engineering. Preprints, research summary and contact.',
  alternates: [
    { lang: 'pt-BR', path: '/' },
    { lang: 'en', path: '/en/' },
    { lang: 'x-default', path: '/' },
  ],
  jsonld: [ld],
  body: hero + research + publicationsSec + background + contact,
};
