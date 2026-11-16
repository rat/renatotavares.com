import { article, claims, crumbsLd, figure, HOME, legend, pageHead, prose, sec, st, STATUS, toc } from '../lib/components.mjs';
import { hSvg, jstarSvg, JSTAR, klvSvg, phiSvg } from '../lib/figures.mjs';
import { withMath } from '../lib/tex.mjs';
import { bySlug } from '../data/publications.mjs';

const BASE = { href: '/pesquisa/', label: 'Pesquisa' };
const pubLink = (slug, label) => { const p = bySlug(slug); return `<a href="/publicacoes/${p.slug}/">${label ?? p.titlePt}</a>`; };
const side = ({ situacao, area, pubs, code, items }) => `
  <dl class="kv">
    <dt>Situação</dt><dd>${situacao}</dd>
    <dt>Área</dt><dd>${area}</dd>
    <dt>Publicações</dt><dd>${pubs.join('<br>')}</dd>
    ${code ? `<dt>Código e dados</dt><dd>${code.join('<br>')}</dd>` : ''}
  </dl>
  ${toc(items)}`;
const pager = (prev, next) => `<nav class="pager" aria-label="Outras linhas de pesquisa">${prev ? `<a href="${prev.href}"><span>Anterior</span>${prev.label}</a>` : '<span></span>'}${next ? `<a href="${next.href}"><span>Seguinte</span>${next.label}</a>` : ''}</nav>`;

/* =====================================================================
 * Índice
 * =================================================================== */
const indice = {
  path: '/pesquisa/',
  title: 'Pesquisa',
  description: 'Linhas de pesquisa de Renato Augusto Tavares: o programa de Wirsching e o problema 3n+1, a Conjectura da Cobertura Fraca, o expoente do mapa 5x+1, processamento de imagens e o método de pesquisa assistida por computador.',
  jsonld: [crumbsLd([HOME, BASE])],
  body:
    pageHead({
      trail: [HOME, BASE],
      title: 'Pesquisa',
      lede: 'Trabalho em duas direções que se alimentam: matemática computacional, onde o computador entra na demonstração, e inteligência artificial, onde ele é instrumento e objeto de estudo.',
    }) +
    sec(
      'Como ler esta seção',
      `${prose(`<p>Em problemas difíceis é fácil confundir o que foi provado com o que apenas parece verdadeiro. Por isso cada afirmação nestas páginas vem marcada com a sua situação, e a marca é parte do conteúdo, não um enfeite.</p>`)}
      <div class="claims">${Object.entries(STATUS).map(([k, v]) => `<div class="claim"><p class="claim-k">${st(k)}<span>${v.label}</span></p><div class="claim-b"><p>${v.long}</p></div></div>`).join('')}</div>
      ${prose(`<p>Todos os trabalhos listados aqui são preprints. Nenhum passou por revisão por pares, e “demonstrado” significa que a prova está escrita e pública, aberta a quem quiser conferi-la.</p>`)}`,
    ) +
    sec(
      'Matemática computacional',
      `<ul class="rows">
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/programa-de-wirsching/">O programa de Wirsching para a densidade de predecessores</a></h3><p>Teoria dos números e dinâmica 3-ádica do mapa 3n+1. Duas das três conjecturas de Wirsching (2003) demonstradas; análise assintótica com transformada de Mellin, método do ponto de sela uniforme e uma correção log-periódica com coeficientes em Γ e ζ.</p></div><div class="row-side"><ul><li>${st('proved')}<span>Conjecturas 1 e 3</span></li><li>${st('proved')}<span>Condição (⋆4), com μ = 1/3</span></li><li>${st('open')}<span>Conjectura 2, condição (⋆3), densidade positiva</span></li></ul></div></li>
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/cobertura-fraca/">A Conjectura da Cobertura Fraca</a></h3><p>Um problema de cobertura de resíduos módulo 3<sup>ℓ</sup> que nasce da mesma monografia. Cálculo exato em grande escala, jogos de payoff médio, somas exponenciais e a estrutura dos resíduos que resistem.</p></div><div class="row-side"><ul><li>${st('comp')}<span>j*(ℓ) exato para ℓ = 1…23</span></li><li>${st('proved')}<span>e(ℓ) ≥ ¼ log₂ ℓ − O(1)</span></li><li>${st('cond')}<span>j*(ℓ) ≤ ⁹⁄₈ ℓ + ³³⁄₂</span></li><li>${st('open')}<span>A conjectura</span></li></ul></div></li>
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/expoente-5x-mais-1/">O expoente de contagem do mapa 5x+1</a></h3><p>Um experimento calibrado para comparar duas previsões probabilísticas concorrentes sobre o crescimento de uma árvore aritmética.</p></div><div class="row-side"><ul><li>${st('proved')}<span>Congruência entre irmãos na árvore</span></li><li>${st('comp')}<span>Leitura calibrada compatível com 0,650919</span></li><li>${st('conj')}<span>Existência do expoente (Kontorovich–Lagarias)</span></li></ul></div></li>
      </ul>`,
    ) +
    sec(
      'Inteligência artificial',
      `<ul class="rows">
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/processamento-de-imagens/">Processamento de imagens e visão computacional</a></h3><p>Tema do mestrado em andamento no Instituto de Informática da UFG. O primeiro estudo público avalia pré-processamentos para OCR de placas veiculares.</p></div><div class="row-side"><ul><li>${st('comp')}<span>Estudo experimental com resultado negativo</span></li></ul></div></li>
        <li class="row"><div class="row-main"><h3><a href="/projetos/documentacao-pronta-para-recuperacao/">Recuperação de informação e geração aumentada</a></h3><p>Como escrever documentação técnica para que um sistema de busca a encontre, e como medir se encontrou. Descrito na seção de projetos, com manuscrito em preparação.</p></div><div class="row-side"><ul><li>${st('comp')}<span>Avaliação com conjuntos de referência e ablações</span></li></ul></div></li>
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/metodo/#ia">IA aplicada à pesquisa matemática</a></h3><p>Sistemas de vários agentes usados para buscar literatura, propor e tentar refutar hipóteses, escrever e auditar código e criticar manuscritos.</p></div><div class="row-side"></div></li>
      </ul>`,
    ) +
    sec(
      'Computação científica',
      `<ul class="rows">
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/metodo/">Método: computação como parte da prova</a></h3><p>Aritmética intervalar e de precisão arbitrária, implementações independentes, controles negativos, arquivamento com DOI: o que faz um número poder entrar em um enunciado.</p></div><div class="row-side"></div></li>
      </ul>`,
    ) +
    sec(
      'Em andamento',
      prose(`<p>Dois trabalhos estão em preparação e ainda não têm resultados que eu apresente como públicos:</p>
      <ul>
        <li>uma equação de pressão em forma fechada para o processo de ramificação associado ao mapa $qx+1$ acelerado, cujo <a href="https://github.com/faculdade/collatz-qx1-pressure">material de verificação numérica</a> já está disponível;</li>
        <li>o gap espectral mínimo de árvores, em teoria espectral de grafos computacional.</li>
      </ul>
      <p>Quando houver preprint, eles passam para a lista acima com a mesma classificação de resultados.</p>`),
    ),
};

/* =====================================================================
 * Programa de Wirsching
 * =================================================================== */
const chain = [
  ['Teorema 1', '(⋆1) ⇒ densidade positiva uniforme de predecessores', 'proved', 'Demonstrado por Wirsching (2003)'],
  ['Conjectura 1', '(⋆2) ⇒ (⋆1)', 'proved', 'Demonstrada no preprint'],
  ['Teorema 2', '(⋆3) ⇒ (⋆2)', 'proved', 'Enunciado por Wirsching; prova escrita no preprint'],
  ['Conjectura 2', '(⋆4) ⇒ (⋆3)', 'open', 'Em aberto'],
  ['Condição (⋆4)', 'vale para todo raio de janela, com μ = 1/3', 'proved', 'Demonstrada no preprint, diretamente'],
  ['Conjectura 3', 'a condição (⋆5)', 'proved', 'Demonstrada no preprint'],
];

const wirsching = {
  path: '/pesquisa/programa-de-wirsching/',
  title: 'O programa de Wirsching para a densidade de predecessores',
  description: 'Demonstração de duas das três conjecturas de Wirsching (2003) sobre a densidade positiva de predecessores do mapa 3n+1: o que foi provado, o que é assistido por computador e o que continua em aberto.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/pesquisa/programa-de-wirsching/', label: 'Programa de Wirsching' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Programa de Wirsching' }],
      title: 'O programa de Wirsching para a densidade de predecessores',
      lede: 'Em 2003, Günther Wirsching mostrou que a densidade positiva de predecessores do mapa $3n+1$ decorre de uma cadeia de cinco condições, e deixou três conjecturas no caminho. Demonstrei duas delas; resta uma.',
      article: true,
    }) +
    article({
      side: side({
        situacao: 'Preprint, agosto de 2026. Sem revisão por pares.',
        area: 'Teoria dos números, sistemas dinâmicos discretos, análise assintótica',
        pubs: [pubLink('programa-de-wirsching-conjecturas-1-e-3', 'Conjecturas 1 e 3 (arXiv)'), pubLink('conjectura-3-de-wirsching', 'Conjectura 3 (Figshare)')],
        code: ['<a href="https://github.com/faculdade/wirsching-conjectures-1-and-3">GitHub</a>', '<a href="https://doi.org/10.5281/zenodo.22116225">Zenodo</a>'],
        items: [
          { id: 'problema', label: 'O problema' },
          { id: 'cadeia', label: 'A cadeia de cinco condições' },
          { id: 'conjectura-1', label: 'Conjectura 1' },
          { id: 'conjectura-3', label: 'Conjectura 3 e a correção H' },
          { id: 'resultados', label: 'Resultados, por situação' },
          { id: 'limites', label: 'O que isto não mostra' },
          { id: 'conferir', label: 'Como conferir' },
        ],
      }),
      main:
        prose(`
<h2 id="problema">O problema</h2>
<p>O mapa do problema $3n+1$, na forma que Wirsching usa, é</p>
$$T(n) = \\frac{n}{2} \\;\\text{ se } n \\text{ é par}, \\\\ T(n) = \\frac{3n+1}{2} \\;\\text{ se } n \\text{ é ímpar}.$$
<p>A conjectura de Collatz diz que toda órbita chega a 1. Olhando de trás para a frente, ela diz que o conjunto dos <em>predecessores</em> de 1, os inteiros que algum dia passam por 1, é o conjunto de todos os inteiros positivos. A <a href="/#fig-1">Figura 1</a>, na página inicial, mostra o começo dessa árvore.</p>
<p>Uma pergunta mais fraca, e ainda em aberto, é se o conjunto dos predecessores de um inteiro $a$ tem <em>densidade positiva</em>: se, entre os inteiros até $x$, uma fração que não tende a zero chega a $a$. O melhor resultado publicado nessa direção, de Krasikov e Lagarias (2003), garante pelo menos $x^{0,84}$ predecessores abaixo de $x$, para cada $a$ não divisível por 3 e $x$ grande. É uma contagem sublinear. O que Wirsching procura é mais forte: uma densidade da ordem de $x/a$, uniforme em $a$.</p>

<h2 id="cadeia">A cadeia de cinco condições</h2>
<p>Na monografia de 1998 e no artigo de 2003, Wirsching estuda os conjuntos de predecessores por meio de uma construção de médias nos inteiros 3-ádicos. Uma família de operadores, construída a partir da contagem de caminhos no grafo de predecessores, converge para um operador-limite cuja parte essencial é uma cadeia de Markov em $[0, 1]$. Essa cadeia tem uma única densidade invariante, $\\varphi$.</p>
<p>O artigo de 2003 reduz a densidade positiva uniforme a uma cadeia de cinco condições, de $(\\star 1)$ a $(\\star 5)$, sobre $\\varphi$ e sobre as contagens de caminhos. Alguns elos são teoremas; três ficaram como conjecturas. A tabela mostra cada elo e a sua situação depois do preprint.</p>
`) +
        `<div class="table-wrap" tabindex="0" role="group" aria-label="Tabela: a cadeia de Wirsching"><table>
          <caption>A cadeia de Wirsching e a situação de cada elo</caption>
          <thead><tr><th scope="col">Elo</th><th scope="col">Enunciado</th><th scope="col">Situação</th></tr></thead>
          <tbody>${chain.map(([a, b, k, t]) => `<tr><th scope="row">${a}</th><td>${b}</td><td>${st(k)}${t}</td></tr>`).join('')}</tbody>
        </table></div>` +
        prose(`
<p>Com isso, a cadeia inteira se reduz a uma única condição: $(\\star 3)$ sozinha implica a densidade positiva uniforme, passando apenas por implicações demonstradas. A Conjectura 2 é o caminho que Wirsching propôs para chegar a $(\\star 3)$, e continua em aberto.</p>

<h2 id="conjectura-1">Conjectura 1</h2>
<p>A primeira conjectura trata dos <em>geradores</em> de Wirsching, que contam caminhos no grafo de predecessores. Ela pede que uma cota inferior pontual sobre os geradores, relativa à sua média de Haar 3-ádica, se transfira para as funções que contam os caminhos propriamente ditos.</p>
<p>A prova olha para a convolução que leva uns às outras. Nela, os pesos de partição crescem subexponencialmente, enquanto uma razão de binomiais decai geometricamente. Uma janela de largura $O(\\sqrt{\\ell})$ domina a soma, e o raio dessa janela cabe dentro da hipótese.</p>

<h2 id="conjectura-3">Conjectura 3 e a correção periódica <i>H</i></h2>
<p>A terceira conjectura é sobre a densidade invariante $\\varphi$ perto de zero. Essa densidade é o único ponto fixo, de massa 1 e suporte em $[0, 1]$, do operador</p>
$$(W_3 f)(x) = \\frac{3}{2} \\int_{3x-2}^{3x} f(t)\\, dt ,$$
<p>um análogo em base 3 da densidade de Fabius.</p>
`) +
        figure({
          n: 2,
          svg: phiSvg(),
          caption: 'A densidade invariante $\\varphi$, calculada para esta página iterando o operador $W_3$ em uma grade de $3^8$ células. A compilação do site confere três propriedades conhecidas antes de desenhar: massa 1, simetria em torno de $1/2$ e $\\varphi = 3/2$ no terço central. A Conjectura 3 diz respeito ao comportamento na ponta esquerda, onde $\\varphi$ decai mais depressa que qualquer potência.',
        }) +
        prose(`
<p>Wirsching compara $\\varphi$, perto de zero, com uma função explícita $\\varphi_0$ obtida por Berg e Krüppel em 1998, e conjectura que a razão entre as duas converge ao longo de uma certa classe de sequências.</p>
<p>O ponto central do preprint é que a transformada log-Laplace exata de $\\varphi$ se decompõe em três partes: uma parte suave, uma correção $H$ que é periódica de período $\\log 3$, e um resto duplamente exponencialmente pequeno. Berg e Krüppel haviam escrito essa correção como um produto infinito, sem determinar se ela é constante. Aqui ela aparece como série de Fourier com coeficientes em forma fechada:</p>
$$\\hat{H}(m) = -\\frac{2^{i\\omega_m}}{c}\\, \\Gamma(-i\\omega_m)\\, \\zeta(1 - i\\omega_m), \\qquad m \\ne 0, \\\\ \\omega_m = \\frac{2\\pi m}{c}, \\qquad c = \\log 3 .$$
<p>Como a função zeta não se anula na reta $\\operatorname{Re} s = 1$, o coeficiente $\\hat{H}(1)$ não é zero, e portanto $H$ não é constante. Nenhum cálculo numérico entra nesse passo.</p>
`) +
        figure({
          n: 3,
          svg: hSvg(),
          caption: 'Um período de $H$, em torno da média. A amplitude total é de cerca de $4,19 \\times 10^{-4}$: pequena, mas diferente de zero, e é essa diferença que decide a conjectura. A curva foi recalculada para esta página a partir da série de Fourier, e a compilação só a aceita se reproduzir três valores certificados no preprint: $e^{H(0)}$, a diferença $H(0) - H(\\log \\tfrac{3}{2})$ e a oscilação.',
        }) +
        prose(`
<p>A classe de sequências que Wirsching usa na comparação fixa uma única fase de $H$. Nessa fase a razão converge, e a Conjectura 3 é verdadeira. Fora dessa classe a fase percorre um período inteiro, e a versão mais forte da afirmação, sem restrição, é falsa. São dois enunciados sobre a mesma razão, com alcances diferentes; só o restrito é a Conjectura 3.</p>

<h2 id="resultados">Resultados, por situação</h2>
`) +
        claims([
          { kind: 'proved', html: '<p><strong>Conjectura 1.</strong> A condição $(\\star 2)$ implica $(\\star 1)$.</p>', src: 'arXiv:2608.27617, Seção 4' },
          { kind: 'proved', html: '<p><strong>Conjectura 3.</strong> Ao longo da classe de comparação de Wirsching, a razão $\\varphi / \\varphi_0$ converge, com limite $e^{H(0)}$.</p>', src: 'arXiv:2608.27617, Seção 10' },
          { kind: 'proved', label: 'Demonstrado, com auxílio de computador', html: '<p>$e^{H(0)}$ está no intervalo $(0,53412203666478,\\; 0,53412203666479)$. O intervalo é um certificado de aritmética de bolas, não uma estimativa de ponto flutuante.</p>', src: 'arXiv:2608.27617, Seção 6; Arb via python-flint' },
          { kind: 'proved', html: '<p>A correção $H$ <strong>não é constante</strong>. Segue do teorema clássico de que $\\zeta$ não tem zeros em $\\operatorname{Re} s = 1$, sem computação.</p>' },
          { kind: 'proved', label: 'Demonstrado, com auxílio de computador', html: '<p>A oscilação de $H$ fica entre $4,1874494771 \\times 10^{-4}$ e $4,187981 \\times 10^{-4}$.</p>', src: 'doi:10.6084/m9.figshare.33260829, Seção 3' },
          { kind: 'proved', html: '<p>A assintótica irrestrita $\\varphi(t) \\sim \\kappa \\varphi_0(t)$ quando $t \\to 0^+$ é <strong>falsa</strong>: a razão oscila indefinidamente.</p>' },
          { kind: 'proved', html: '<p>A condição $(\\star 4)$ vale para todo raio de janela, com $\\mu = 1/3$. O que o argumento de Wirsching precisa é mais fraco que a Conjectura 3, e sai diretamente da mesma cadeia de ponto de sela.</p>', src: 'arXiv:2608.27617, Seção 11' },
          { kind: 'open', html: '<p>A <strong>Conjectura 2</strong>, isto é, a implicação $(\\star 4) \\Rightarrow (\\star 3)$; a própria condição $(\\star 3)$; e, com elas, a densidade positiva de predecessores.</p>' },
        ]) +
        prose(`
<h2 id="limites">O que isto não mostra</h2>
<p>Não demonstrei a densidade positiva de predecessores, e muito menos a conjectura de Collatz. O que mudou foi o mapa do problema: dos três elos conjecturais do programa de Wirsching, resta um. A condição que falta, $(\\star 3)$, pede uma cota inferior pontual sobre fatias de custo fixo dos geradores, em resolução 3-ádica crescente e uniforme na variável 3-ádica. É uma exigência de natureza diferente das duas que foram resolvidas, e o preprint discute até onde as ferramentas usadas aqui alcançam e onde param.</p>
<p>Também não conheço resolução publicada anterior de nenhuma das três conjecturas; o artigo de 2003 é pouco citado. Se você conhece trabalho relacionado que eu deveria ter lido, <a href="/contato/">escreva</a>.</p>

<h2 id="conferir">Como conferir</h2>
<p>O repositório que acompanha o preprint tem uma pasta por seção do artigo, e cada número citado no texto é produzido por um script que roda sozinho, sem rede e sem caminhos fixos. Três afirmações dependem de computador, todas sobre $H$: os dois intervalos acima e as cotas para as derivadas $H'$ e $H''$. Elas usam aritmética de bolas (Arb, por meio do python-flint), e a saída impressa da execução é o certificado. O restante usa aritmética exata, inteira ou racional, ou ponto flutuante de alta precisão identificado como tal.</p>
<p>A versão arquivada no Zenodo fixa, em um único commit, o código, o TeX e o PDF. Uma primeira versão do resultado sobre a Conjectura 3, sozinha, saiu duas semanas antes no Figshare e continua disponível.</p>
`) +
        pager(null, { href: '/pesquisa/cobertura-fraca/', label: 'A Conjectura da Cobertura Fraca' }),
    }),
};

/* =====================================================================
 * Cobertura Fraca
 * =================================================================== */
const cobertura = {
  path: '/pesquisa/cobertura-fraca/',
  title: 'A Conjectura da Cobertura Fraca de Wirsching',
  description: 'Cálculo exato do orçamento de cobertura j*(ℓ) até ℓ = 23, uma cota inferior demonstrada, uma cota superior condicional e a estrutura dos resíduos que resistem à cobertura. A conjectura continua em aberto.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/pesquisa/cobertura-fraca/', label: 'Cobertura Fraca' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Cobertura Fraca' }],
      title: 'A Conjectura da Cobertura Fraca',
      lede: 'Na monografia de 1998, Wirsching perguntou quão grande um certo conjunto de somas de potências de 2 e de 3 precisa ser para atingir todos os resíduos módulo $3^\\ell$. Estendi o cálculo exato, provei que a resposta mais simples está errada e descrevi o que resiste.',
      article: true,
    }) +
    article({
      side: side({
        situacao: 'Preprint, agosto de 2026. Sem revisão por pares.',
        area: 'Teoria computacional dos números, dinâmica 3-ádica',
        pubs: [pubLink('conjectura-da-cobertura-fraca', 'Preprint (Figshare e SSRN)')],
        code: ['<a href="https://github.com/faculdade/weak-covering-conjecture">GitHub</a>', '<a href="https://doi.org/10.5281/zenodo.21877643">Zenodo</a>'],
        items: [
          { id: 'pergunta', label: 'A pergunta' },
          { id: 'tabela', label: 'A tabela até ℓ = 23' },
          { id: 'resultados', label: 'Resultados, por situação' },
          { id: 'resiste', label: 'O que resiste' },
          { id: 'aberto', label: 'O que fica em aberto' },
        ],
      }),
      main:
        prose(`
<h2 id="pergunta">A pergunta</h2>
<p>Para inteiros $j, k \\ge 0$, considere o conjunto de inteiros</p>
$$R_{j,k} = \\left\\{ \\sum_{i=0}^{j} 2^{a_i} 3^{i} \\;:\\; j + k \\ge a_0 > a_1 > \\cdots > a_j \\ge 0 \\right\\}.$$
<p>Cada elemento vem de uma sequência estritamente decrescente de $j+1$ expoentes. Nenhum desses números é divisível por 3; são <em>unidades</em> 3-ádicas. A pergunta é de cobertura: fixada uma precisão $\\ell$, quando é que $R_{j-1,j}$, reduzido módulo $3^\\ell$, atinge <em>todas</em> as $2 \\cdot 3^{\\ell-1}$ unidades?</p>
<p>Chame de $j^*(\\ell)$ o menor $j$ para o qual isso acontece: o <em>orçamento de cobertura</em>. O conjunto $R_{j-1,j}$ tem $\\binom{2j}{j}$ elementos, cerca de $4^j$, e só por contagem seriam necessários $j \\approx \\ell \\log_4 3$ termos. A Conjectura da Cobertura Fraca (Conjectura V.3.9 da monografia) pede que o tamanho necessário exceda essa contagem por um fator apenas subexponencial. Em termos do excesso</p>
$$e(\\ell) = j^*(\\ell) - \\ell \\log_4 3 ,$$
<p>se a conjectura vale, $e(\\ell)$ cresce mais devagar do que qualquer função linear de $\\ell$.</p>

<h2 id="tabela">A tabela até ℓ = 23</h2>
<p>Um manuscrito meu anterior, não publicado, tinha os valores exatos de $j^*(\\ell)$ até $\\ell = 20$. O preprint leva a tabela a $\\ell = 23$. Cada nível triplica o número de resíduos, e o último exigiu cerca de 263 GiB de estado e 104 horas em um computador de mesa. A <a href="/projetos/computacao-para-a-cobertura-fraca/">engenharia desse cálculo</a> está descrita à parte.</p>
`) +
        figure({
          n: 4,
          svg: jstarSvg(),
          caption: 'Os 23 valores exatos de $j^*(\\ell)$ (pontos), entre a cota inferior demonstrada $j^*(\\ell) \\ge \\ell$ e a cota superior condicional (tracejada), e acima da taxa $\\ell \\log_4 3$ que a contagem sozinha prevê (pontilhada). Os dois pontos vazados, $\\ell = 22$ e $23$, não têm verificação cruzada por implementação independente. Dados: Tabela 1 do preprint. A compilação deste site recalcula $j^*(\\ell)$ por força bruta para $\\ell \\le 6$ e compara com a tabela.',
        }) +
        [[0, 12], [12, 23]]
          .map(
            ([from, to], k) => `<div class="table-wrap" tabindex="0" role="group" aria-label="Tabela: valores de j*(ℓ), ℓ de ${from + 1} a ${to}"><table>
          <caption>${k === 0 ? 'Orçamento de cobertura j*(ℓ) e excesso e(ℓ) = j*(ℓ) − ℓ log₄ 3' : 'Continuação: ℓ de 13 a 23'}</caption>
          <thead><tr><th scope="col" class="num">ℓ</th>${JSTAR.slice(from, to).map((_, i) => `<th scope="col" class="num">${from + i + 1}</th>`).join('')}</tr></thead>
          <tbody><tr><th scope="row" class="num">j*(ℓ)</th>${JSTAR.slice(from, to).map((j) => `<td class="num">${j}</td>`).join('')}</tr>
          <tr><th scope="row" class="num">e(ℓ)</th>${JSTAR.slice(from, to).map((j, i) => `<td class="num">${(j - ((from + i + 1) * Math.log(3)) / Math.log(4)).toFixed(2).replace('.', ',')}</td>`).join('')}</tr></tbody>
        </table></div>`,
          )
          .join('') +
        prose(`<h2 id="resultados">Resultados, por situação</h2>`) +
        claims([
          { kind: 'comp', html: '<p>Tabela exata de $j^*(\\ell)$ para $\\ell = 1, \\dots, 23$. Os valores até $\\ell = 20$ reproduzem o manuscrito anterior e foram recalculados em Rust; $\\ell = 21$ foi conferido por uma implementação independente em Python.</p><p>Os níveis $\\ell = 22$ e $23$ vêm de uma única implementação. O preprint diz isso com todas as letras.</p>', src: 'Seção 2 e Tabela 1' },
          { kind: 'proved', html: '<p>$j^*(\\ell) \\ge \\ell$ para $\\ell = 2, \\dots, 23$, e, sem condição alguma,</p>$$e(\\ell) \\ge \\tfrac{1}{4} \\log_2 \\ell - O(1).$$<p>Um modelo em que o excesso é constante está, portanto, descartado.</p>' },
          { kind: 'cond', html: '<p>A melhor cota superior obtida:</p>$$j^*(\\ell) \\le \\tfrac{9}{8}\\,\\ell + \\tfrac{33}{2}.$$<p>Ela vem de reformular o orçamento como um jogo de payoff médio, e depende de uma correspondência entre o jogo e a cobertura que foi verificada por computador para $\\ell = 1, \\dots, 12$, mas não está provada em geral.</p>', src: 'Seção 4; doze certificados armazenados e um verificador independente' },
          { kind: 'proved', html: '<p>A rota natural por análise de Fourier está bloqueada no primeiro passo: o seu critério de positividade é inalcançável em qualquer orçamento. Mesmo admitindo-o, um cancelamento de raiz quadrada não melhoraria a cota do jogo.</p>', src: 'Seção 5' },
          { kind: 'proved', html: '<p><strong>Inclusão por duplicação.</strong> Seja $H(\\ell, j)$ o conjunto dos resíduos ainda não cobertos no orçamento $j$. Para $j \\ge \\ell$,</p>$$H(\\ell, j+1) \\subseteq 2H(\\ell, j) \\cap 4H(\\ell, j).$$<p>Daí sai uma cota superior recursiva para $j^*(\\ell)$, exata em uma faixa demonstrada e empiricamente exata além dela.</p>', src: 'Seção 6' },
          { kind: 'proved', html: '<p>Sempre que $j^*(\\ell) \\ge \\ell + 1$, todo último resíduo a ser coberto é $\\equiv 1 \\pmod{3}$; e vale uma lei de contenção em duas classes módulo 9.</p>'.replace('\\pmod{3}', '\\;(\\bmod 3)') },
          { kind: 'comp', html: '<p>A comparação de quatro modelos de crescimento para $e(\\ell)$, na cauda da tabela, desfavorece o constante e não distingue entre os crescentes (logarítmico, raiz quadrada, linear lento). São escores de ajuste penalizados, não evidência estatística calibrada.</p>', src: 'Seção 3' },
          { kind: 'comp', html: '<p>Uma regra natural de “reparo de custo 1”, sugerida pelo teorema da duplicação, é falsa: em dois níveis consecutivos ela falha para 100 de 1458 e para 332 de 4374 casos. Isso não exclui que exista algum custo de reparo limitado.</p>' },
          { kind: 'open', html: '<p>A <strong>Conjectura da Cobertura Fraca</strong> e a taxa exata de crescimento de $e(\\ell)$.</p>' },
        ]) +
        prose(`
<h2 id="resiste">O que resiste</h2>
<p>A parte mais longa do trabalho é uma tentativa de fechar a distância até a taxa conjecturada, e o registro honesto de por que ela não fecha. A versão ingênua da abordagem por somas exponenciais falha por uma razão que se pode verificar. O passo seguinte foi estudar diretamente os resíduos que demoram a ser cobertos, e é dali que vêm o teorema da duplicação, as restrições de congruência e a regra de reparo que acabou refutada.</p>
<p>Gosto desse tipo de resultado: um teorema sobre a estrutura do obstáculo é menos do que a conjectura, mas não desaparece se a conjectura for decidida por outro caminho.</p>

<h2 id="aberto">O que fica em aberto</h2>
<p>Além da conjectura em si, o preprint enuncia com precisão duas perguntas mais estreitas que ela, sugeridas pelos cálculos: excluir uma das duas classes módulo 9 e estabelecer uma propriedade de redundância em todas as larguras. Cada uma merece um ataque próprio.</p>
`) +
        pager({ href: '/pesquisa/programa-de-wirsching/', label: 'O programa de Wirsching' }, { href: '/pesquisa/expoente-5x-mais-1/', label: 'O expoente do mapa 5x+1' }),
    }),
};

/* =====================================================================
 * 5x+1
 * =================================================================== */
const cincoX = {
  path: '/pesquisa/expoente-5x-mais-1/',
  title: 'O expoente de contagem do mapa 5x+1',
  description: 'Um estudo computacional calibrado que compara as previsões de Kontorovich–Lagarias (0,650919) e de Volkov (0,678) para o expoente de contagem de predecessores do mapa 5x+1 acelerado.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/pesquisa/expoente-5x-mais-1/', label: 'Expoente 5x+1' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Expoente 5x+1' }],
      title: 'O expoente de contagem do mapa 5x+1',
      lede: 'Dois modelos probabilísticos preveem expoentes diferentes para o número de predecessores na árvore do mapa $5x+1$: cerca de 0,650919 e cerca de 0,678. A diferença é menor que o erro de uma medição ingênua. Este trabalho mede com um instrumento calibrado.',
      article: true,
    }) +
    article({
      side: side({
        situacao: 'Preprint, setembro de 2026. Sem revisão por pares.',
        area: 'Mapas do tipo Collatz, passeios aleatórios ramificados',
        pubs: [pubLink('expoente-de-contagem-5x-mais-1', 'Preprint (SSRN)')],
        code: ['<a href="https://github.com/faculdade/accelerated-5x1-predecessor-exponent">GitHub</a>', '<a href="https://doi.org/10.5281/zenodo.22182794">Zenodo</a>'],
        items: [
          { id: 'duas-previsoes', label: 'Duas previsões' },
          { id: 'instrumento', label: 'O problema do instrumento' },
          { id: 'calibracao', label: 'A calibração' },
          { id: 'resultados', label: 'Resultados, por situação' },
          { id: 'controles', label: 'Controles negativos' },
        ],
      }),
      main:
        prose(`
<h2 id="duas-previsoes">Duas previsões</h2>
<p>Troque o 3 por um 5 no problema de Collatz e o comportamento muda: acredita-se que quase todas as órbitas do mapa $5x+1$ escapam para o infinito. A árvore reversa de um inteiro, formada pelos seus predecessores, ainda existe e cresce, mas devagar: o número de predecessores abaixo de $x$ deve se comportar como $x^{\\eta}$ para algum expoente $\\eta$ menor que 1.</p>
<p>Há duas previsões para esse expoente. Kontorovich e Lagarias chegam a $\\eta \\approx 0,650919$ por um modelo de passeio aleatório ramificado; a própria existência do expoente é a Conjectura 7.2 deles. Volkov, por outro modelo estocástico, chega a cerca de $0,678$. A distância entre as duas é de 0,027, e Kontorovich e Lagarias observam que os dados de Volkov não pareciam suficientes para discriminar entre os valores.</p>

<h2 id="instrumento">O problema do instrumento</h2>
<p>A árvore pode ser enumerada exatamente. Um estimador de janela fixa aplicado a essa enumeração lê 0,639, com intervalo de 95% entre 0,633 e 0,645, o que não exclui nenhum dos dois valores. E há algo pior: aplicado a uma construção sintética cujo expoente é conhecido, o mesmo estimador lê 0,038 abaixo do alvo. O viés do instrumento é maior que a diferença que se quer medir. Uma leitura crua, por mais dígitos que tenha, não decide a questão.</p>

<h2 id="calibracao">A calibração</h2>
<p>A saída foi construir seis árvores sintéticas que preservam a estrutura de irmãos da árvore aritmética, de forma exata ou relaxada, e que são ajustadas para ter um expoente escolhido: quatro para 0,650919 e duas para 0,678. O estimador é então lido na árvore verdadeira e nas seis construções, década por década, e a pergunta passa a ser em qual das duas faixas a leitura verdadeira cai.</p>
`) +
        figure({
          n: 5,
          svg: klvSvg(),
          caption: 'Leitura do estimador na árvore aritmética (ponto e traço) em cada década de contagem, contra a faixa das construções ajustadas a 0,650919 (barra cheia) e a faixa das ajustadas a 0,678 (barra hachurada). As linhas pontilhadas são os alvos nominais; as barras ficam abaixo deles porque o estimador tem viés. Na década mais profunda, a leitura 0,64926 cai dentro da primeira faixa e 0,02432 abaixo da segunda. Dados: tabela por década do preprint.',
        }) +
        prose(`<h2 id="resultados">Resultados, por situação</h2>`) +
        claims([
          { kind: 'proved', html: '<p><strong>Congruência entre irmãos.</strong> Na árvore reversa do mapa $qx+1$ acelerado, filhos consecutivos de um mesmo nó satisfazem exatamente</p>$$w\' = 2^{d} w + \\frac{2^{d} - 1}{q}, \\qquad d = \\operatorname{ord}_q(2).$$<p>Para $q = 5$, isso é $w\' = 16w + 3$. É o único enunciado demonstrado do trabalho, e é o que as construções sintéticas precisam preservar.</p>'.replace(/w\\'/g, "w'") },
          { kind: 'comp', html: '<p>Na década $10^{9} \\to 10^{10}$, a árvore aritmética lê <strong>0,64926</strong>, com intervalo de 95% entre 0,64818 e 0,65027. As quatro construções ajustadas a 0,650919 leem entre 0,64738 e 0,65122; as duas ajustadas a 0,678, entre 0,67358 e 0,67748.</p><p>A leitura fica 0,02432 abaixo da menor das duas construções de Volkov, com intervalo de bootstrap de 95% entre 0,0208 e 0,0273.</p>', src: '300 raízes abaixo de 10⁴; enumeração em C com OpenMP' },
          { kind: 'comp', html: '<p>A regra de parada do experimento original de Volkov, reimplementada, reproduz as três primeiras estimativas dele e dá 0,681 contra o 0,680 publicado.</p>' },
          { kind: 'conj', label: 'Hipóteses da leitura', html: '<p>A comparação supõe que o expoente realizado por cada construção é igual ao seu alvo e que o viés calibrado se transfere para a árvore determinística. Nenhuma das duas coisas é provada. Outras três entradas do argumento são problemas em aberto, entre elas a existência do expoente.</p>' },
          { kind: 'open', html: '<p>Se o limite é 0,650919 ou algum valor abaixo dele. O trabalho não diz, e não poderia dizer.</p>' },
        ]) +
        prose(`
<p>Em uma frase: sob as hipóteses declaradas, os dados são compatíveis com a previsão de Kontorovich e Lagarias e ficam separados da de Volkov. Isso é evidência computacional, não uma refutação.</p>

<h2 id="controles">Controles negativos</h2>
<p>Uma verificação que nunca foi vista falhar não é evidência de nada. Três conferências do repositório vêm acompanhadas de controles negativos executados: uma sonda para cada elo da cadeia de cálculo da pressão, uma réplica do gerador de números aleatórios comparada com o código em C, e três mutações que o filtro de comparação de saídas tem de detectar.</p>
<p>Todo arquivo de saída versionado se reproduz byte a byte a partir do código e dos dados, com duas exceções documentadas, que carregam um tempo de relógio embutido. O repositório também registra um erro que aconteceu durante a revisão, quando duas amostras de 300 raízes, que compartilham apenas 31, foram confundidas; a conferência que hoje distingue as duas existe por causa disso.</p>
`) +
        pager({ href: '/pesquisa/cobertura-fraca/', label: 'A Conjectura da Cobertura Fraca' }, { href: '/pesquisa/processamento-de-imagens/', label: 'Processamento de imagens' }),
    }),
};

/* =====================================================================
 * Processamento de imagens
 * =================================================================== */
const imagens = {
  path: '/pesquisa/processamento-de-imagens/',
  title: 'Processamento de imagens e visão computacional',
  description: 'Linha de pesquisa do mestrado em Processamento Digital de Imagens na UFG. Estudo experimental sobre pré-processamento de imagens para OCR de placas veiculares brasileiras, com resultado negativo.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/pesquisa/processamento-de-imagens/', label: 'Processamento de imagens' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Processamento de imagens' }],
      title: 'Processamento de imagens e visão computacional',
      lede: 'Faço mestrado em Processamento Digital de Imagens no Instituto de Informática da UFG. O trabalho público desta linha é um estudo sobre o que fazer com uma imagem antes de entregá-la a um OCR, e a resposta foi: neste caso, nada.',
      article: true,
    }) +
    article({
      side: side({
        situacao: 'Preprint, outubro de 2024. Sem revisão por pares.',
        area: 'Visão computacional, processamento digital de imagens',
        pubs: [pubLink('pre-processamento-para-ocr-de-placas', 'Preprint (arXiv)')],
        code: ['<a href="https://github.com/faculdade/projeto-final-pdi">GitHub</a>'],
        items: [
          { id: 'pergunta', label: 'A pergunta' },
          { id: 'experimento', label: 'O experimento' },
          { id: 'resultados', label: 'Resultados' },
          { id: 'adiante', label: 'Adiante' },
        ],
      }),
      main:
        prose(`
<h2 id="pergunta">A pergunta</h2>
<p>É prática comum tratar a imagem antes do reconhecimento de caracteres: converter para tons de cinza, equalizar o contraste, suavizar o ruído. A justificativa é razoável, porque fotos de placas têm iluminação ruim, baixa resolução e distorção de perspectiva. A pergunta do estudo é se essa etapa ainda ajuda quando o OCR é um modelo moderno de aprendizado profundo, que já aprendeu a lidar com imagens imperfeitas.</p>

<h2 id="experimento">O experimento</h2>
<p>O estudo começa com uma revisão sistemática da literatura na IEEE Digital Library, que partiu de 190 artigos e analisou 146 depois dos critérios de exclusão e da remoção de duplicatas. Em seguida, avalia quatro condições sobre um conjunto de imagens de placas veiculares brasileiras, usando o EasyOCR: nenhuma etapa de pré-processamento, conversão para escala de cinza, equalização adaptativa de histograma (CLAHE) aplicada em RGB e filtro bilateral. Cada técnica é medida isoladamente e em combinação, com acurácia, precisão, recall, F1, curva ROC, AUC, análise de variância e tempo de execução.</p>
<p>O notebook, as imagens e os resultados brutos de cada condição estão no repositório, de modo que as tabelas do artigo podem ser refeitas.</p>

<h2 id="resultados">Resultados</h2>
`) +
        claims([
          { kind: 'comp', html: '<p>Nenhuma das técnicas de pré-processamento superou a linha de base. Sem pré-processamento, a acurácia foi de <strong>71,7%</strong>; com escala de cinza, CLAHE ou filtro bilateral, caiu para <strong>70,75%</strong> nos três casos.</p>', src: 'arXiv:2410.13622, conclusão; conjunto de placas brasileiras, EasyOCR' },
          { kind: 'comp', html: '<p>O pré-processamento aumentou o tempo médio de processamento em relação aos 7,26 segundos da linha de base.</p>' },
          { kind: 'open', html: '<p>Se a conclusão se mantém em outros conjuntos de dados, com outras condições de captura e outros motores de OCR. O estudo usa um conjunto e um motor.</p>' },
        ]) +
        prose(`
<p>É um resultado negativo, e por isso útil: uma etapa que custa tempo e não melhora o reconhecimento pode ser retirada do pipeline. A leitura que o artigo propõe é que o modelo de OCR já é robusto às imperfeições que essas técnicas tentam corrigir, e que em alguns casos elas introduzem artefatos que atrapalham.</p>

<h2 id="adiante">Adiante</h2>
<p>Minha formação anterior em aprendizado de máquina vem da especialização em Banco de Dados com ênfase em Big Data, também na UFG, concluída com um trabalho sobre previsão de vendas a partir de séries históricas.</p>
<p>Os temas de aplicação que me interessam em visão computacional, como agricultura de precisão, sensoriamento remoto, imagens médicas e sistemas autônomos, ainda não têm resultados publicados meus. Quando tiverem, aparecem aqui com a mesma classificação usada no restante da seção.</p>
`) +
        pager({ href: '/pesquisa/expoente-5x-mais-1/', label: 'O expoente do mapa 5x+1' }, { href: '/pesquisa/metodo/', label: 'Método' }),
    }),
};

/* =====================================================================
 * Método
 * =================================================================== */
const metodo = {
  path: '/pesquisa/metodo/',
  title: 'Método: computação como parte da prova',
  description: 'Como Renato Augusto Tavares conduz pesquisa matemática assistida por computador: separação entre teorema e evidência, certificados numéricos, implementações independentes, controles negativos, arquivamento e uso de IA.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/pesquisa/metodo/', label: 'Método' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Método' }],
      title: 'Método: computação como parte da prova',
      lede: 'Interessam-me os problemas em que o computador não serve só para gerar exemplos, mas entra em um fluxo de trabalho matemático disciplinado. Estas são as regras que sigo para que um número possa aparecer em um enunciado.',
      article: true,
    }) +
    article({
      tocOnly: true,
      side: toc([
        { id: 'separar', label: 'Separar o que é de cada tipo' },
        { id: 'certificado', label: 'O que conta como certificado' },
        { id: 'independencia', label: 'Implementações independentes' },
        { id: 'falhar', label: 'Verificações que podem falhar' },
        { id: 'arquivo', label: 'Arquivar o que foi rodado' },
        { id: 'falsificar', label: 'Falsificar antes de promover' },
        { id: 'ia', label: 'IA na pesquisa' },
      ]),
      main:
        prose(`
<h2 id="separar">Separar o que é de cada tipo</h2>
<p>Um teorema, um resultado condicional, uma observação empírica e uma pergunta em aberto são coisas diferentes, e um texto que as mistura induz o leitor ao erro mesmo sem conter uma única frase falsa. Nos meus preprints e neste site, cada afirmação é de um desses tipos e diz qual.</p>
`) +
        legend() +
        prose(`
<p>Isso tem um custo de estilo: os resumos ficam cheios de ressalvas, e as frases mais fortes são as que dizem o que <em>não</em> foi provado. Prefiro esse custo ao outro.</p>

<h2 id="certificado">O que conta como certificado</h2>
<p>Quando um número de ponto flutuante participa de uma afirmação matemática, ele precisa vir com uma garantia sobre o erro. Uso aritmética de bolas (Arb, por meio do python-flint): cada operação devolve um intervalo que contém o valor verdadeiro, e a saída impressa da execução, com as bolas de entrada e o intervalo final, é o certificado.</p>
<p>Onde isso não é necessário, uso aritmética exata, inteira ou racional. Onde uso ponto flutuante de alta precisão sem certificado, o texto diz “avaliação numérica” e não tira conclusões que dependam dos últimos dígitos. Scripts que afirmam uma desigualdade rigorosa a verificam e terminam com erro se ela falhar.</p>

<h2 id="independencia">Implementações independentes</h2>
<p>Um resultado computacional caro merece uma segunda implementação, escrita de outro jeito, de preferência em outra linguagem. Na Cobertura Fraca, o motor principal é em Rust e o nível $\\ell = 21$ foi conferido por um programa em Python. No estudo do mapa $5x+1$, o enumerador em C só é usado depois de ser validado contra uma versão em Python.</p>
<p>Quando a segunda implementação não é viável, digo isso. Os dois últimos níveis da tabela da Cobertura Fraca aparecem no gráfico com um símbolo diferente por essa razão.</p>

<h2 id="falhar">Verificações que podem falhar</h2>
<p>Uma conferência que nunca foi vista falhar não é evidência de nada. Para as verificações mais importantes escrevo controles negativos: entradas deliberadamente erradas que o verificador precisa rejeitar, e que ficam no repositório junto com ele.</p>
<p>O mesmo vale para estimadores estatísticos. Antes de ler um expoente em um objeto desconhecido, leio o mesmo estimador em objetos construídos para ter um expoente conhecido. Foi assim que apareceu um viés de 0,038 no estudo do mapa $5x+1$, maior que o efeito que eu queria medir.</p>

<h2 id="arquivo">Arquivar o que foi rodado</h2>
<p>Cada preprint tem um repositório organizado pelas seções do artigo, em que cada tabela e cada número citado aponta para o script que o produz e para o comando que o executa. As versões citadas são arquivadas no Zenodo e recebem DOI, de modo que o código referido no texto não muda depois.</p>
<p>Quando refazer o cálculo é caro demais, a saída fica armazenada, com o custo declarado: memória, tempo e máquina. E quando um número do artigo não se reproduz a partir do repositório, por exemplo porque depende de um pico de memória modelado e não medido, o repositório diz qual é e por quê.</p>

<h2 id="falsificar">Falsificar antes de promover</h2>
<p>Uma ideia só vira conjectura depois de sobreviver a tentativas sérias de derrubá-la. As hipóteses de cada projeto ficam registradas com a situação de cada uma, e as refutadas continuam no registro. Os experimentos corrigidos mantêm um arquivo de correção ao lado do original, em vez de serem reescritos em silêncio.</p>
<p>Esse registro é público em dois casos: o <a href="https://github.com/rat/weak-covering-conjecture">caderno de hipóteses da Cobertura Fraca</a> e o <a href="/projetos/researchos/">ResearchOS</a>, com 136 pastas de experimentos sobre o problema de Collatz.</p>

<h2 id="ia">IA na pesquisa</h2>
<p>Uso sistemas de inteligência artificial com vários agentes como instrumento de pesquisa: busca e leitura de literatura, geração de hipóteses, manipulação simbólica, escrita e auditoria de código de experimentos, tentativa de refutação de argumentos e crítica de manuscritos em rodadas sucessivas, por modelos diferentes que leem só o PDF.</p>
<p>Três coisas não delego. A direção da pesquisa: o que vale a pena perguntar. A decisão sobre o que é afirmado: nada entra em um enunciado sem que eu entenda a prova ou tenha um certificado que eu saiba ler. E a responsabilidade: os erros que restarem são meus.</p>
<p>As rodadas de crítica feitas por modelos são úteis, e encontraram erros reais nos meus rascunhos. Elas não são revisão por pares, e não as apresento como tal. Todos os meus trabalhos de matemática são, hoje, preprints à espera de leitores humanos.</p>
`) +
        pager({ href: '/pesquisa/processamento-de-imagens/', label: 'Processamento de imagens' }, null),
    }),
};

export default [indice, wirsching, cobertura, cincoX, imagens, metodo];
