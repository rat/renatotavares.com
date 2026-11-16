// Publicações. Cada campo vem de um registro público verificável (ORCID, arXiv,
// Figshare, Crossref/SSRN, Zenodo ou README do repositório). Nada aqui foi
// inferido: se um campo não tem fonte pública, ele não existe.
//
// `status` descreve a situação editorial tal como consta nos registros públicos.
// Nenhum destes trabalhos passou por revisão por pares até a data de `checked`.

export const checked = '2026-11-16';

export const publications = [
  {
    slug: 'programa-de-wirsching-conjecturas-1-e-3',
    title: "Wirsching's Positive-Predecessor-Density Program: Proofs of Conjectures 1 and 3",
    titlePt: 'O programa de Wirsching para densidade positiva de predecessores: demonstrações das Conjecturas 1 e 3',
    authors: ['Renato Augusto Tavares'],
    date: '2026-08-27',
    year: 2026,
    kind: 'Preprint',
    status: 'Preprint no arXiv (math.GM), 36 páginas. Não revisado por pares.',
    area: 'Matemática',
    line: 'programa-de-wirsching',
    ids: [
      { type: 'arXiv', value: '2608.27617', url: 'https://arxiv.org/abs/2608.27617' },
    ],
    links: [
      { label: 'Resumo no arXiv', url: 'https://arxiv.org/abs/2608.27617' },
      { label: 'PDF (arXiv)', url: 'https://arxiv.org/pdf/2608.27617v1' },
      { label: 'Código e certificados (GitHub)', url: 'https://github.com/faculdade/wirsching-conjectures-1-and-3' },
      { label: 'Arquivo de reprodutibilidade (Zenodo)', url: 'https://doi.org/10.5281/zenodo.22116225' },
    ],
    keywords: ['3x+1 problem', 'Collatz problem', 'predecessor density', 'invariant density', 'two-scale difference equation', 'log-periodic asymptotics', 'uniform saddlepoint method', 'Mellin transform', 'Riemann zeta function'],
    msc: 'Primária 11B83; secundárias 39B22, 41A60, 11M06, 60J05',
    abstract:
      'Wirsching (2003) reduces uniform positive predecessor density for the 3n+1 map to a chain of five conditions, organized into three conjectures. We prove two of them. Conjecture 1 concerns his path-counting generators: in the convolution carrying them to his Elka functions the partition weights grow subexponentially while the binomial ratio decays geometrically, so a window of width O(√ℓ) dominates and its radius fits inside the hypothesis. Conjecture 3 concerns the asymptotics near 0 of an invariant density φ, a base-3 analogue of the Fabius density, against an explicit φ₀ due to Berg and Krüppel. The exact log-Laplace transform of φ splits into a smooth part, a log 3-periodic correction H, and a doubly exponentially small remainder. Berg and Krüppel represented that correction as an infinite product in 1998; their analysis did not determine whether it is constant. We give H as a Fourier series with coefficients in closed form in Γ and ζ; a classical zero-free theorem for ζ shows it is not constant, and we enclose its oscillation rigorously. Wirsching’s comparison class fixes one phase of H, and there Conjecture 3 holds with limit e^{H(0)}, certified to lie in (0.53412203666478, 0.53412203666479). Off that class the phase sweeps a full period, so the unrestricted asymptotic φ(t) ∼ κφ₀(t) fails. Condition (⋆4) follows, at every window radius, with μ = 1/3: what Wirsching’s argument needs is weaker than Conjecture 3 itself, and the same saddlepoint chain settles it directly. With Conjecture 1 the chain reduces to the single condition (⋆3). Conjecture 2 is his route to it and remains open.',
    summaryPt:
      'Demonstra duas das três conjecturas que Wirsching deixou em aberto em 2003 e reduz a sua cadeia de cinco condições a uma única, (⋆3). A Conjectura 2, que levaria a ela, continua em aberto, assim como a densidade positiva de predecessores.',
    bibtexKey: 'Tavares2026Wirsching13',
    bibtex: { type: 'misc', eprint: '2608.27617', archivePrefix: 'arXiv', primaryClass: 'math.GM', note: 'Preprint' },
  },
  {
    slug: 'conjectura-3-de-wirsching',
    title: "Wirsching's Conjecture 3, and the Periodic Correction to Berg–Krüppel's Density Asymptotic",
    titlePt: 'A Conjectura 3 de Wirsching e a correção periódica à assintótica de densidade de Berg–Krüppel',
    authors: ['Renato Augusto Tavares'],
    date: '2026-08-14',
    year: 2026,
    kind: 'Preprint',
    status: 'Preprint no Figshare (CC BY 4.0). Não revisado por pares. O conteúdo foi incorporado e ampliado no preprint das Conjecturas 1 e 3 (arXiv:2608.27617).',
    area: 'Matemática',
    line: 'programa-de-wirsching',
    supersededBy: 'programa-de-wirsching-conjecturas-1-e-3',
    ids: [
      { type: 'DOI', value: '10.6084/m9.figshare.33260829', url: 'https://doi.org/10.6084/m9.figshare.33260829' },
    ],
    links: [
      { label: 'Preprint (Figshare)', url: 'https://doi.org/10.6084/m9.figshare.33260829' },
      { label: 'Código (GitHub)', url: 'https://github.com/faculdade/wirsching-conjecture3-proof' },
      { label: 'Arquivo de reprodutibilidade (Zenodo)', url: 'https://doi.org/10.5281/zenodo.21854549' },
    ],
    keywords: ['Wirsching Conjecture 3', 'Collatz conjecture', '3n+1 problem', 'predecessor density', 'invariant density', 'log-periodic asymptotics', 'Mellin transform', 'saddle-point method', 'Riemann zeta function', 'interval arithmetic'],
    msc: '11B83, 39B22, 44A15, 41A60, 11M06',
    abstract:
      'Wirsching’s 2003 argument for positive predecessor density under the 3n + 1 map reduces to three conjectures. Conjecture 3 concerns the near-zero asymptotics of an invariant density φ, compared against an explicit asymptotic φ₀ due to Berg and Krüppel. The exact log-Laplace transform of φ decomposes as a smooth part, a periodic correction H, and a doubly exponentially small remainder. Berg and Krüppel gave this correction, for this eigenfunction, as an infinite product in 1998, five years before Wirsching’s conjecture; they did not ask whether it is constant. We give H instead as a Fourier series with closed-form coefficients in Γ and ζ: a classical zero-free theorem for ζ shows directly that it is not constant, and we rigorously enclose its oscillation. Wirsching’s own comparison class fixes a single phase of H; there, Conjecture 3 holds, with an explicit limit. Away from that class the phase sweeps a full period, so the stronger, unrestricted asymptotic φ(t) ∼ κφ₀(t) as t → 0⁺ fails. Wirsching needs less than the literal statement of Conjecture 3; we check directly that his actual requirement holds with a wide margin. This settles Conjecture 3 alone; Wirsching’s other two conjectures, and positive predecessor density itself, remain open.',
    summaryPt:
      'Primeira versão do resultado sobre a Conjectura 3: a correção periódica H em série de Fourier, a prova de que ela não é constante e o certificado intervalar da sua oscilação.',
    bibtexKey: 'Tavares2026Wirsching3',
    bibtex: { type: 'misc', doi: '10.6084/m9.figshare.33260829', howpublished: 'Figshare', note: 'Preprint' },
  },
  {
    slug: 'conjectura-da-cobertura-fraca',
    title: "Wirsching's Weak Covering Conjecture: An Extended Computation, a Conditional Bound, and the Structure of What Resists It",
    titlePt: 'A Conjectura da Cobertura Fraca de Wirsching: um cálculo estendido, uma cota condicional e a estrutura do que resiste à cobertura',
    authors: ['Renato Augusto Tavares'],
    date: '2026-08-14',
    year: 2026,
    kind: 'Preprint',
    status: 'Preprint no Figshare (CC BY 4.0) e no SSRN. Não revisado por pares.',
    area: 'Matemática',
    line: 'cobertura-fraca',
    ids: [
      { type: 'DOI', value: '10.6084/m9.figshare.33260757', url: 'https://doi.org/10.6084/m9.figshare.33260757' },
      { type: 'DOI', value: '10.2139/ssrn.7282479', url: 'https://doi.org/10.2139/ssrn.7282479' },
    ],
    links: [
      { label: 'Preprint (Figshare)', url: 'https://doi.org/10.6084/m9.figshare.33260757' },
      { label: 'Preprint (SSRN)', url: 'https://doi.org/10.2139/ssrn.7282479' },
      { label: 'Código e dados (GitHub)', url: 'https://github.com/faculdade/weak-covering-conjecture' },
      { label: 'Arquivo de reprodutibilidade (Zenodo)', url: 'https://doi.org/10.5281/zenodo.21877643' },
    ],
    keywords: ['Collatz conjecture', '3n+1 problem', 'Wirsching weak covering conjecture', 'computational number theory', '3-adic dynamics', 'mean-payoff games', 'exponential sums'],
    msc: '11B50, 11K70, 91A50, 11L07, 37A44',
    abstract:
      'Wirsching’s 1998 Weak Covering Conjecture asks for a sub-exponential K(l) such that a large enough set R_{j−1,j} is forced to cover every unit residue modulo 3^l. We extend the exact computation of j*(l), the smallest covering budget, from l = 20 to l = 23, and compare four growth models for e(l) := j*(l) − l log₄ 3 against its tail. A constant model is unconditionally impossible: we prove e(l) ≥ ¼ log₂ l − O(1), while the growing alternatives are not distinguished by the available data. Our best bound, j*(l) ≤ (9/8) l + 33/2, comes from a mean-payoff-game relaxation via a correspondence verified computationally but not proven in general. The Fourier route is blocked at its first step: its positivity criterion is provably unreachable at every budget; even granting it, square-root cancellation could not improve the mean-payoff bound. We further study the residues that resist coverage. For budgets j ≥ l, the uncovered set at budget j+1 is contained in both twice and four times the uncovered set at budget j, yielding a recursive upper bound on j*(l). This bound is proven exact over a substantial computed range and remains empirically exact farther. We also prove congruence restrictions on the last uncovered residues, falsify a natural cost-1 repair rule, and identify narrower open questions suggested by the computations. The Weak Covering Conjecture itself remains open.',
    summaryPt:
      'Estende de ℓ = 20 para ℓ = 23 o cálculo exato do orçamento de cobertura j*(ℓ), prova que o excesso sobre a taxa prevista não é limitado, obtém uma cota superior linear condicional e descreve a estrutura dos resíduos que resistem à cobertura. A conjectura continua em aberto.',
    bibtexKey: 'Tavares2026WeakCovering',
    bibtex: { type: 'misc', doi: '10.6084/m9.figshare.33260757', howpublished: 'Figshare', note: 'Preprint. Também em SSRN, doi:10.2139/ssrn.7282479' },
  },
  {
    slug: 'expoente-de-contagem-5x-mais-1',
    title: 'A calibrated computational study of the accelerated 5x + 1 predecessor-count exponent',
    titlePt: 'Um estudo computacional calibrado do expoente de contagem de predecessores do mapa 5x + 1 acelerado',
    authors: ['Renato Augusto Tavares'],
    date: '2026-09',
    year: 2026,
    kind: 'Preprint',
    status: 'Preprint no SSRN. Não revisado por pares.',
    area: 'Matemática',
    line: 'expoente-5x-mais-1',
    ids: [
      { type: 'DOI', value: '10.2139/ssrn.7445805', url: 'https://doi.org/10.2139/ssrn.7445805' },
    ],
    links: [
      { label: 'Preprint (SSRN)', url: 'https://doi.org/10.2139/ssrn.7445805' },
      { label: 'Código, dados e saídas (GitHub)', url: 'https://github.com/faculdade/accelerated-5x1-predecessor-exponent' },
      { label: 'Arquivo de reprodutibilidade (Zenodo)', url: 'https://doi.org/10.5281/zenodo.22182794' },
    ],
    keywords: ['5x+1 problem', 'predecessor trees', 'counting exponents', 'branching random walks', 'Collatz-type maps'],
    abstract:
      'Two stochastic models predict different counting exponents for the 5x+1 reverse tree: about 0.650919 from Kontorovich and Lagarias, an exponent whose existence is their Conjecture 7.2, and about 0.678 from Volkov, for an expectation and conjecturally for the count of non-escaping integers. The gap is 0.027, and Kontorovich and Lagarias write that Volkov’s own data seems insufficient to discriminate between the values. We enumerate the tree exactly. A fixed-window estimator reads 0.639 and excludes neither value, but on an unconstrained construction with a known target it reads 0.038 low, more than the gap, so a raw reading cannot decide the question. We calibrate it with six matched constructions that keep the tree’s sibling structure, exactly or in relaxed form, four assigned 0.650919 and two assigned 0.678. At the deepest matched checkpoint decade the arithmetic tree reads 0.64926. That lies inside the span of the four constructions assigned the Kontorovich-Lagarias value, and 0.02432 below the lower of the two assigned Volkov’s, with 95% bootstrap interval [0.0208, 0.0273]. The reading assumes that each construction’s realized exponent equals its target and that the calibrated bias transfers to the deterministic tree. Neither is proved here, and three further inputs are open problems.',
    summaryPt:
      'Enumera exatamente a árvore reversa do mapa 5x+1 e calibra o estimador do expoente de contagem com seis construções sintéticas de alvo conhecido. A leitura calibrada é compatível com a previsão de Kontorovich–Lagarias; trata-se de evidência computacional sob hipóteses declaradas, não de demonstração.',
    bibtexKey: 'Tavares2026FiveXPlusOne',
    bibtex: { type: 'misc', doi: '10.2139/ssrn.7445805', howpublished: 'SSRN', note: 'Preprint' },
  },
  {
    slug: 'pre-processamento-para-ocr-de-placas',
    title: 'Comparison of Image Preprocessing Techniques for Vehicle License Plate Recognition Using OCR: Performance and Accuracy Evaluation',
    titlePt: 'Comparação de técnicas de pré-processamento de imagens para reconhecimento de placas veiculares usando OCR: avaliação de desempenho e precisão',
    authors: ['Renato Augusto Tavares'],
    date: '2024-10-15',
    year: 2024,
    kind: 'Preprint',
    status: 'Preprint no arXiv (cs.CV), 12 páginas, 13 figuras. Não revisado por pares.',
    area: 'Visão computacional',
    line: 'processamento-de-imagens',
    ids: [
      { type: 'arXiv', value: '2410.13622', url: 'https://arxiv.org/abs/2410.13622' },
    ],
    links: [
      { label: 'Resumo no arXiv', url: 'https://arxiv.org/abs/2410.13622' },
      { label: 'PDF (arXiv)', url: 'https://arxiv.org/pdf/2410.13622v1' },
      { label: 'Notebook, dados e resultados brutos (GitHub)', url: 'https://github.com/faculdade/projeto-final-pdi' },
    ],
    keywords: ['OCR', 'license plate recognition', 'image preprocessing', 'CLAHE', 'bilateral filter', 'computer vision'],
    abstract:
      'The growing use of Artificial Intelligence solutions has led to an explosion in image capture and its application in machine learning models. However, the lack of standardization in image quality generates inconsistencies in the results of these models. To mitigate this problem, Optical Character Recognition (OCR) is often used as a preprocessing technique, but it still faces challenges in scenarios with inadequate lighting, low resolution, and perspective distortions. This work aims to explore and evaluate various preprocessing techniques, such as grayscale conversion, CLAHE in RGB, and Bilateral Filter, applied to vehicle license plate recognition. Each technique is analyzed individually and in combination, using metrics such as accuracy, precision, recall, F1-score, ROC curve, AUC, and ANOVA, to identify the most effective method. The study uses a dataset of Brazilian vehicle license plates, widely used in OCR applications. The research provides a detailed analysis of best preprocessing practices, offering insights to optimize OCR performance in real-world scenarios.',
    summaryPt:
      'Compara conversão para escala de cinza, CLAHE em RGB e filtro bilateral — isoladas e combinadas — como pré-processamento para OCR de placas veiculares brasileiras, com acurácia, precisão, recall, F1, curva ROC, AUC e ANOVA.',
    bibtexKey: 'Tavares2024PlateOCR',
    bibtex: { type: 'misc', eprint: '2410.13622', archivePrefix: 'arXiv', primaryClass: 'cs.CV', note: 'Preprint' },
  },
];

// Trabalhos com material público, mas ainda sem preprint registrado.
export const inPreparation = [
  {
    title: 'Retrieval-Ready Documentation: Co-generating ERP Documentation and a Hybrid RAG Pipeline',
    note: 'Manuscrito concluído; o repositório de reprodutibilidade já é público e aguarda o identificador do preprint.',
    url: 'https://github.com/faculdade/docs-designed-for-retrieval',
    urlLabel: 'Repositório de reprodutibilidade',
    project: '/projetos/documentacao-pronta-para-recuperacao/',
  },
  {
    title: 'A Closed-Form Pressure Equation for the Accelerated qx+1 Branching Process',
    note: 'Manuscrito em revisão pelo autor; o material de verificação numérica é público.',
    url: 'https://github.com/faculdade/collatz-qx1-pressure',
    urlLabel: 'Material de verificação',
  },
];

export const bySlug = (slug) => publications.find((p) => p.slug === slug);

export function bibtex(p) {
  const b = p.bibtex;
  const [y, m] = p.date.split('-');
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const lines = [
    `  author = {Tavares, Renato Augusto}`,
    `  title = {{${p.title.replace(/–/g, '--')}}}`,
    `  year = {${y}}`,
    m ? `  month = ${months[Number(m) - 1]}` : null,
    b.eprint ? `  eprint = {${b.eprint}}` : null,
    b.archivePrefix ? `  archivePrefix = {${b.archivePrefix}}` : null,
    b.primaryClass ? `  primaryClass = {${b.primaryClass}}` : null,
    b.howpublished ? `  howpublished = {${b.howpublished}}` : null,
    b.doi ? `  doi = {${b.doi}}` : null,
    b.note ? `  note = {${b.note}}` : null,
  ].filter(Boolean);
  return `@${b.type}{${p.bibtexKey},\n${lines.join(',\n')}\n}`;
}

/** Referência em formato autor–data, em HTML. */
export function reference(p) {
  const id = p.ids[0];
  const where = id.type === 'arXiv' ? `arXiv:${id.value}` : `doi:${id.value}`;
  return `Tavares, R. A. (${p.year}). <cite>${p.title}</cite>. Preprint. ${where}.`;
}
