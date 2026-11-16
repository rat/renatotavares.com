import site from '../site.config.mjs';
import { sec, st, personLd, websiteLd } from '../lib/components.mjs';
import { treeSvg } from '../lib/figures.mjs';
import { withMath } from '../lib/tex.mjs';
import { publications, inPreparation } from '../data/publications.mjs';
import { experience, education } from '../data/career.mjs';
import { dataCurta } from '../lib/util.mjs';

const big = treeSvg({ depth: 13, colW: 38, rowH: 15, cls: 'tree-l', idPrefix: 'arvore' });
const small = treeSvg({ depth: 10, colW: 31, rowH: 19, cls: 'tree-s', idPrefix: 'arvore-m' });

export const refItem = (p) => `<li class="ref">
  <p class="ref-y">${p.year}</p>
  <div>
    <h3 class="ref-t"><a href="/publicacoes/${p.slug}/" lang="en">${p.title}</a></h3>
    <p class="ref-m">${p.kind}, ${p.ids.map((i) => `<a class="idn" href="${i.url}">${i.type === 'arXiv' ? 'arXiv:' : 'doi:'}${i.value}</a>`).join(' e ')}</p>
    <p class="ref-s">${p.summaryPt}</p>
  </div>
</li>`;

const hero = `<section class="hero" aria-labelledby="nome">
  <div class="wrap grid">
    <div class="hero-text">
      <h1 id="nome">${site.name}<span>Cientista da computação. Goiânia, Brasil.</span></h1>
      <p class="statement">Pesquiso problemas de teoria dos números em que o computador faz parte do argumento, e escrevo o software que torna esse argumento verificável.</p>
      <p>Minha pesquisa atual está no problema 3n+1 e no programa de Wirsching para a densidade de predecessores. Fora da matemática, dirijo o desenvolvimento de sistemas de gestão na Metaprime, faço mestrado em processamento digital de imagens na UFG e publico aplicativos Android.</p>
      <dl class="kv">
        <dt>Vínculos</dt><dd>Universidade Federal de Goiás, Instituto de Informática (mestrado)<br>Metaprime Sistemas (diretor)</dd>
        <dt>Identificadores</dt><dd><a href="${site.profiles.orcid}" rel="me noopener">ORCID ${site.person.orcid}</a>, <a href="${site.profiles.lattes}" rel="noopener">Lattes</a>, <a href="${site.profiles.scholar}" rel="noopener">Google Scholar</a></dd>
        <dt>Contato</dt><dd><a href="mailto:${site.person.email}">${site.person.email}</a></dd>
      </dl>
    </div>
    <figure class="hero-fig fig" id="fig-1">
      ${big.svg}
      ${small.svg}
      <p class="orbit tree-l" data-orbit-for="arvore" aria-live="polite">Passe o cursor sobre um número para ver o caminho dele até 1.</p>
      <p class="orbit tree-s" data-orbit-for="arvore-m" aria-live="polite">Toque em um número para ver o caminho dele até 1.</p>
      <figcaption>${withMath(`<b>Figura 1.</b> Os predecessores de 1 no problema $3n+1$: cada número leva ao da esquerda em um passo de $T$, com $T(n) = n/2$ se $n$ é par e $T(n) = (3n+1)/2$ se $n$ é ímpar. Os traços amarelos são os passos ímpares. A conjectura de Collatz afirma que a árvore completa contém todos os inteiros positivos. A pergunta em que trabalho é mais fraca e também está em aberto: se a árvore que nasce de um inteiro $a$ não divisível por 3 ocupa uma fração positiva dos inteiros.`)}</figcaption>
    </figure>
  </div>
</section>`;

const lines = [
  {
    href: '/pesquisa/programa-de-wirsching/',
    title: 'O programa de Wirsching',
    text: 'Em 2003, Günther Wirsching reduziu a densidade positiva de predecessores a uma cadeia de cinco condições, organizadas em três conjecturas. Demonstrei duas delas.',
    side: [['proved', 'Conjecturas 1 e 3'], ['open', 'Conjectura 2 e a densidade positiva']],
  },
  {
    href: '/pesquisa/cobertura-fraca/',
    title: 'A Conjectura da Cobertura Fraca',
    text: 'Quantos termos são necessários para que certas somas de potências de 2 e de 3 atinjam todos os resíduos módulo 3<sup>ℓ</sup>? O cálculo exato agora vai até ℓ = 23.',
    side: [['comp', 'Tabela exata até ℓ = 23'], ['proved', 'O excesso não é limitado'], ['cond', 'Cota superior linear'], ['open', 'A conjectura']],
  },
  {
    href: '/pesquisa/expoente-5x-mais-1/',
    title: 'O expoente de contagem do mapa 5x+1',
    text: 'Dois modelos estocásticos preveem expoentes diferentes para o crescimento da árvore reversa. Enumerei a árvore e calibrei o estimador para ver qual deles os dados favorecem.',
    side: [['comp', 'Leitura calibrada: 0,64926'], ['conj', 'Existência do expoente']],
  },
  {
    href: '/pesquisa/processamento-de-imagens/',
    title: 'Processamento de imagens e visão computacional',
    text: 'Tema do meu mestrado na UFG. O primeiro trabalho público compara técnicas de pré-processamento para o reconhecimento de placas veiculares por OCR.',
    side: [['comp', 'Estudo experimental (arXiv, 2024)']],
  },
  {
    href: '/pesquisa/metodo/',
    title: 'Método: computação como parte da prova',
    text: 'Como separo teorema, resultado condicional, evidência e conjectura; o que aceito como certificado numérico; e como uso sistemas de IA sem terceirizar a responsabilidade pelo resultado.',
    side: [],
  },
];

const research = sec(
  'Pesquisa',
  `<ul class="rows">${lines
    .map(
      (l) => `<li class="row"><div class="row-main"><h3><a href="${l.href}">${l.title}</a></h3><p>${l.text}</p></div><div class="row-side">${l.side.length ? `<ul aria-label="Situação dos resultados">${l.side.map(([k, t]) => `<li>${st(k)}<span>${t}</span></li>`).join('')}</ul>` : ''}</div></li>`,
    )
    .join('')}</ul>
  <p class="note measure">Os quadrados indicam a situação de cada resultado: ${st('proved')}demonstrado em preprint, ${st('cond')}condicional, ${st('comp')}evidência computacional, ${st('conj')}conjectura, ${st('open')}em aberto. Nenhum destes trabalhos passou ainda por revisão por pares. <a href="/pesquisa/">Ver as linhas de pesquisa</a></p>`,
);

const pubs = sec(
  'Publicações',
  `<ol class="refs">${publications.filter((p) => !p.supersededBy).map(refItem).join('')}</ol>
  <p class="note measure">Em preparação: ${inPreparation.map((i) => `<span lang="en">${i.title}</span>`).join('; ')}. <a href="/publicacoes/">Todas as publicações, com resumos e citações</a></p>`,
  { small: 'Preprints' },
);

const projects = sec(
  'Projetos',
  `<div class="feature">
    <div class="feature-t">
      <h3><a href="/projetos/aplicativos-android/">Aplicativos Android que funcionam sem conexão</a></h3>
      <p>Sete aplicativos publicados no Google Play, escritos em Kotlin e Jetpack Compose: jogos de lógica, calculadoras e obras de referência. Os dados ficam no aparelho por projeto, não por promessa.</p>
      <p class="note">Na imagem, o Sudoku Offline.</p>
    </div>
    <div class="feature-m shots">
      ${[['sudoku-1', 'Tela de jogo do Sudoku Offline, com o tabuleiro 9×9, contador de erros e teclado numérico'], ['sudoku-2', 'Dica do Sudoku Offline explicando a técnica usada para preencher uma casa'], ['sudoku-3', 'Tela inicial do Sudoku Offline com partida em andamento, desafio do dia e outros modos']]
        .map(([f, alt]) => `<img src="/assets/img/apps/${f}-360.webp" srcset="/assets/img/apps/${f}-360.webp 360w, /assets/img/apps/${f}-720.webp 720w" sizes="(max-width: 54rem) 30vw, 15rem" width="360" height="640" loading="lazy" decoding="async" alt="${alt}">`)
        .join('\n      ')}
    </div>
  </div>
  <ul class="rows">
    <li class="row"><div class="row-main"><h3><a href="/projetos/computacao-para-a-cobertura-fraca/">Um cálculo exato com 263 GiB de estado</a></h3><p>O motor em Rust que levou a tabela de j*(ℓ) de ℓ = 20 a ℓ = 23 em um computador comum, e o que foi preciso para confiar no resultado.</p></div><div class="row-side">Rust, programação dinâmica sobre conjuntos de bits, verificação cruzada em Python</div></li>
    <li class="row"><div class="row-main"><h3><a href="/projetos/documentacao-pronta-para-recuperacao/">Documentação escrita para ser recuperada</a></h3><p>Um pipeline de RAG para a documentação de um ERP, em que o contrato de escrita da documentação e o mecanismo de busca foram projetados juntos.</p></div><div class="row-side">PostgreSQL, pgvector, busca híbrida, LangGraph, avaliação com ablações</div></li>
    <li class="row"><div class="row-main"><h3><a href="/projetos/researchos/">ResearchOS: um caderno de laboratório para pesquisa com IA</a></h3><p>A estrutura de hipóteses, experimentos e registros que usei para investigar o problema de Collatz com agentes de IA, publicada inteira.</p></div><div class="row-side">Python, Git, protocolos de hipótese, experimento e checkpoint</div></li>
  </ul>
  <p class="more"><a href="/projetos/">Todos os projetos</a></p>`,
);

const period = (r) => `${dataCurta(r.from)} – ${r.to ? dataCurta(r.to) : 'atual'}`;
const career = sec(
  'Trajetória',
  `<div class="duo">
    <div>
      <h3>Experiência profissional</h3>
      <ul class="plain">${experience.map((e) => `<li><strong>${e.org}</strong>${e.roles.map((r) => `<span>${r.title}, ${period(r)}</span>`).join('')}</li>`).join('')}</ul>
    </div>
    <div>
      <h3>Formação</h3>
      <ul class="plain">${education.map((e) => `<li><strong>${e.degree}</strong><span>${e.org}${e.when ? `. ${e.when}` : ''}</span></li>`).join('')}</ul>
    </div>
  </div>
  <p class="more"><a href="/trajetoria/">Trajetória completa e ferramentas de trabalho</a></p>`,
);

const contact = sec(
  'Contato',
  `<p class="contact-mail"><a href="mailto:${site.person.email}">${site.person.email}</a></p>
  <p class="measure">Escrevo de volta para perguntas sobre os preprints, correções, propostas de colaboração em que eu possa contribuir de fato e conversas sobre os projetos. Para assuntos acadêmicos, o endereço institucional é <a href="mailto:${site.person.academicEmail}">${site.person.academicEmail}</a>.</p>
  <ul class="links">
    <li><a href="${site.profiles.orcid}" rel="me noopener">ORCID</a></li>
    <li><a href="${site.profiles.scholar}" rel="noopener">Google Scholar</a></li>
    <li><a href="${site.profiles.lattes}" rel="noopener">Currículo Lattes</a></li>
    <li><a href="${site.profiles.github}" rel="me noopener">GitHub</a></li>
    <li><a href="${site.profiles.linkedin}" rel="noopener">LinkedIn</a></li>
  </ul>`,
);

export default {
  path: '/',
  title: 'Renato Augusto Tavares — ciência da computação, matemática computacional e engenharia de software',
  ogTitle: 'Renato Augusto Tavares',
  description: 'Cientista da computação em Goiânia. Pesquisa em matemática computacional (problema 3n+1, dinâmica 3-ádica, teoria dos números), inteligência artificial e engenharia de software. Preprints, projetos e trajetória.',
  alternates: [
    { lang: 'pt-BR', path: '/' },
    { lang: 'en', path: '/en/' },
    { lang: 'x-default', path: '/' },
  ],
  jsonld: [personLd(), websiteLd()],
  body: hero + research + pubs + projects + career + contact,
};
