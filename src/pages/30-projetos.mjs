import { article, crumbsLd, figure, HOME, pageHead, prose, sec, toc } from '../lib/components.mjs';
import { ragSvg } from '../lib/figures.mjs';
import { apps, playUrl } from '../data/apps.mjs';
import { ragRecall } from '../data/rag-recall.mjs';

const BASE = { href: '/projetos/', label: 'Projetos' };
const shot = (f, alt, sizes = '(max-width: 54rem) 30vw, 15rem') => {
  const h = f.startsWith('markup') ? 800 : 640;
  return `<img src="/assets/img/apps/${f}-360.webp" srcset="/assets/img/apps/${f}-360.webp 360w, /assets/img/apps/${f}-720.webp 720w" sizes="${sizes}" width="360" height="${h}" loading="lazy" decoding="async" alt="${alt}">`;
};
const facts = (rows) => `<dl class="kv">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>`;
const back = `<nav class="pager" aria-label="Projetos"><a href="/projetos/"><span>Voltar</span>Todos os projetos</a></nav>`;

/* ===================================================================== índice */
const indice = {
  path: '/projetos/',
  title: 'Projetos',
  description: 'Projetos de Renato Augusto Tavares: aplicativos Android publicados, o motor de cálculo exato da Conjectura da Cobertura Fraca, um pipeline de RAG para documentação de ERP e o ResearchOS.',
  jsonld: [crumbsLd([HOME, BASE])],
  body:
    pageHead({
      trail: [HOME, BASE],
      title: 'Projetos',
      lede: 'Uma seleção curta, do que é público e pode ser examinado. O trabalho interno de empresa e o que ainda não foi lançado ficam de fora.',
    }) +
    sec(
      'Software publicado',
      `<div class="feature">
        <div class="feature-t">
          <h3><a href="/projetos/aplicativos-android/">Aplicativos Android que funcionam sem conexão</a></h3>
          <p>Sete aplicativos no Google Play: jogos de lógica, calculadoras e obras de referência, em Kotlin e Jetpack Compose. Três deles nem sequer pedem permissão de acesso à internet.</p>
          <p class="note">Kotlin, Jetpack Compose, Room, DataStore, Hilt</p>
        </div>
        <div class="feature-m shots">${shot('sudoku-1', 'Tela de jogo do Sudoku Offline')}${shot('sudoku-2', 'Dica do Sudoku Offline explicando o raciocínio')}${shot('markup-2', 'Tela do Markup com as taxas de um anúncio de marketplace')}</div>
      </div>`,
    ) +
    sec(
      'Software de pesquisa',
      `<ul class="rows">
        <li class="row"><div class="row-main"><h3><a href="/projetos/computacao-para-a-cobertura-fraca/">Um cálculo exato com 263 GiB de estado</a></h3><p>O motor que estendeu a tabela de j*(ℓ) de ℓ = 20 a ℓ = 23: programação dinâmica sobre conjuntos de bits, em Rust, em um computador com 62 GiB de memória.</p></div><div class="row-side">Rust, rayon, Python, C++; código e certificados sob DOI</div></li>
        <li class="row"><div class="row-main"><h3><a href="/projetos/researchos/">ResearchOS: um caderno de laboratório para pesquisa com IA</a></h3><p>Hipóteses, experimentos e correções de uma investigação do problema de Collatz conduzida com agentes de IA, publicados como foram feitos.</p></div><div class="row-side">Python, Git; 136 experimentos documentados em português e inglês</div></li>
      </ul>`,
    ) +
    sec(
      'Inteligência artificial aplicada',
      `<ul class="rows">
        <li class="row"><div class="row-main"><h3><a href="/projetos/documentacao-pronta-para-recuperacao/">Documentação escrita para ser recuperada</a></h3><p>Um pipeline de RAG para as 473 páginas de documentação de um ERP brasileiro, em que a forma de escrever os documentos e o mecanismo de busca foram projetados juntos, e medidos com ablações.</p></div><div class="row-side">PostgreSQL, pgvector, busca híbrida, LangGraph; manuscrito em preparação</div></li>
        <li class="row"><div class="row-main"><h3><a href="/pesquisa/processamento-de-imagens/">Pré-processamento para OCR de placas</a></h3><p>O experimento do preprint de 2024, com notebook, imagens e resultados brutos. Descrito na seção de pesquisa.</p></div><div class="row-side">Python, OpenCV, EasyOCR, scikit-learn</div></li>
      </ul>`,
    ) +
    sec(
      'Outros repositórios',
      prose(`<ul>
        <li><a href="https://github.com/rat/youtube-stream-download">youtube-stream-download</a>: utilitário de shell que monitora um canal do YouTube e baixa uma transmissão ao vivo assim que ela começa. Licença MIT.</li>
        <li><a href="https://github.com/faculdade">Repositórios de reprodutibilidade</a> de cada preprint, com o código organizado pelas seções do artigo.</li>
      </ul>`),
    ),
};

/* ============================================================== apps Android */
const appsPage = {
  path: '/projetos/aplicativos-android/',
  title: 'Aplicativos Android que funcionam sem conexão',
  description: 'Sete aplicativos Android publicados no Google Play por Renato Augusto Tavares, em Kotlin e Jetpack Compose: Sudoku Offline, Markup, Calculadora Financeira, Mapa Astral Completo, Bíblia Católica Offline e outros.',
  ogType: 'article',
  jsonld: [
    crumbsLd([HOME, BASE, { href: '/projetos/aplicativos-android/', label: 'Aplicativos Android' }]),
    ...apps.map((a) => ({
      '@context': 'https://schema.org',
      '@type': 'MobileApplication',
      name: a.name,
      operatingSystem: 'Android',
      applicationCategory: a.category,
      author: { '@type': 'Person', name: 'Renato Augusto Tavares', url: 'https://renatotavares.com/' },
      installUrl: playUrl(a.pkg),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'BRL' },
    })),
  ],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Aplicativos Android' }],
      title: 'Aplicativos Android que funcionam sem conexão',
      lede: 'Sete aplicativos publicados no Google Play. O ponto de partida de todos é o mesmo: o que o usuário digita fica no aparelho dele, e o aplicativo tem de funcionar no ônibus, no avião e na roça.',
      article: true,
    }) +
    article({
      side:
        facts([
          ['Plataforma', 'Android, Google Play'],
          ['Papel', 'Projeto, desenvolvimento e publicação'],
          ['Tecnologias', 'Kotlin, Jetpack Compose, Room, DataStore, Hilt, WorkManager; um app em Java'],
          ['Privacidade', '<a href="/termos.html#aplicativos">O que cada aplicativo faz com os dados</a>'],
        ]) +
        toc([
          { id: 'abordagem', label: 'Abordagem' },
          { id: 'aplicativos', label: 'Os sete aplicativos' },
          { id: 'detalhes', label: 'Dois detalhes de engenharia' },
          { id: 'anuncios', label: 'Anúncios e dados' },
        ]),
      main:
        prose(`
<h2 id="abordagem">Abordagem</h2>
<p>Nenhum destes aplicativos tem cadastro, login ou servidor meu por trás. Os dados são gravados em um banco local (Room) e as preferências em DataStore; a única cópia fora do aparelho é a do backup do próprio Android, na conta do usuário, quando ele o mantém ativado. Três dos sete não declaram sequer a permissão de acesso à internet, de modo que “offline” não é uma promessa da descrição: é uma propriedade que o sistema operacional garante.</p>
<p>A interface é escrita em Jetpack Compose, com injeção de dependências por Hilt nos aplicativos maiores. Um deles, o simulado de placas de trânsito, é em Java com Views.</p>
`) +
        `<div class="shots">${shot('sudoku-1', 'Tela de jogo do Sudoku Offline, com o tabuleiro 9×9, contador de erros e teclado numérico', '(max-width: 54rem) 30vw, 14rem')}${shot('sudoku-2', 'Dica do Sudoku Offline explicando a técnica Hidden Single', '(max-width: 54rem) 30vw, 14rem')}${shot('sudoku-3', 'Tela inicial do Sudoku Offline com desafio do dia e outros modos de jogo', '(max-width: 54rem) 30vw, 14rem')}</div>` +
        prose(`<h2 id="aplicativos">Os sete aplicativos</h2>`) +
        `<ul class="chrono">${apps
          .map(
            (a) => `<li><p class="chrono-when">${a.category}<br>versão ${a.version}</p><div><h3>${a.name}</h3><p class="role">${a.stack}${a.ads ? '. Com anúncios' : '. Sem anúncios'}${a.internet ? '' : ' e sem acesso à internet'}</p><p>${a.blurb}</p><p class="note"><a class="ext" href="${playUrl(a.pkg)}">Ver no Google Play</a></p></div></li>`,
          )
          .join('')}</ul>` +
        prose(`
<h2 id="detalhes">Dois detalhes de engenharia</h2>
<h3>Tabuleiros gerados no aparelho</h3>
<p>O Sudoku não traz uma lista de tabuleiros prontos. Cada partida é gerada no próprio dispositivo, em sete níveis de dificuldade, e as dicas não entregam o número: explicam qual técnica de resolução se aplica àquela casa e por quê.</p>
<h3>Astronomia sem rede</h3>
<p>O Mapa Astral precisa da posição dos astros em um instante e lugar quaisquer. Em vez de consultar um serviço, o aplicativo embarca as efemérides (Swiss Ephemeris) e uma base de cerca de 167 mil cidades (GeoNames, CC BY 4.0), com coordenadas e fuso horário. O cálculo, a busca de cidades e os textos de interpretação funcionam em modo avião.</p>
`) +
        `<div class="shots">${shot('markup-1', 'Tela do Markup com os campos de custo, taxas e margem e o preço de venda calculado', '(max-width: 54rem) 45vw, 14rem')}${shot('markup-2', 'Tela do Markup com a comissão e a taxa fixa de um anúncio de marketplace', '(max-width: 54rem) 45vw, 14rem')}</div>` +
        prose(`
<h2 id="anuncios">Anúncios e dados</h2>
<p>Quatro dos sete aplicativos exibem anúncios do Google AdMob; os outros três não têm anúncios nem acesso à rede. Nos que têm, o SDK do Google trata dados do aparelho para veicular e medir os anúncios, e isso está descrito, aplicativo por aplicativo, na <a href="/termos.html#aplicativos">Política de Privacidade</a>. O que você digita nos aplicativos não é enviado a mim nem repassado ao sistema de anúncios.</p>
`) +
        back,
    }),
};

/* ===================================================== computação cobertura */
const computacao = {
  path: '/projetos/computacao-para-a-cobertura-fraca/',
  title: 'Um cálculo exato com 263 GiB de estado',
  description: 'Como a tabela exata do orçamento de cobertura j*(ℓ) foi estendida de ℓ = 20 a ℓ = 23 em um computador comum: programação dinâmica sobre conjuntos de bits em Rust, memória virtual e verificação independente.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/projetos/computacao-para-a-cobertura-fraca/', label: 'Cálculo da Cobertura Fraca' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Cálculo da Cobertura Fraca' }],
      title: 'Um cálculo exato com 263 GiB de estado',
      lede: 'A tabela de $j^*(\\ell)$ da Conjectura da Cobertura Fraca parava em $\\ell = 20$. Levá-la a $\\ell = 23$ multiplica o problema por 27. Este é o registro de como isso coube em um computador de 62 GiB, e do que foi preciso para confiar no resultado.',
      article: true,
    }) +
    article({
      side:
        facts([
          ['Contexto', '<a href="/pesquisa/cobertura-fraca/">A Conjectura da Cobertura Fraca</a>'],
          ['Papel', 'Autor único: algoritmo, implementação, execução e verificação'],
          ['Tecnologias', 'Rust (rayon), Python (NumPy, SciPy), C++17'],
          ['Máquina', 'AMD Ryzen 7 5700U, 8 núcleos e 16 threads, 62 GiB de RAM, sem GPU'],
          ['Código', '<a href="https://github.com/faculdade/weak-covering-conjecture">GitHub</a><br><a href="https://doi.org/10.5281/zenodo.21877643">Zenodo</a>'],
        ]) +
        toc([
          { id: 'problema', label: 'O problema' },
          { id: 'algoritmo', label: 'O algoritmo' },
          { id: 'custo', label: 'O custo' },
          { id: 'confianca', label: 'Como confiar' },
          { id: 'entorno', label: 'O que mais o repositório calcula' },
        ]),
      main:
        prose(`
<h2 id="problema">O problema</h2>
<p>É preciso encontrar, para cada precisão $\\ell$, o menor $j$ tal que as somas $\\sum_{i} 2^{a_i} 3^{i}$, com $j$ expoentes estritamente decrescentes escolhidos entre $0$ e $2j-1$, atinjam todas as unidades módulo $3^\\ell$. Enumerar as somas é inviável: são $\\binom{2j}{j}$ delas, e para $\\ell = 23$ o orçamento é $j = 27$. A enumeração direta deixa de ser tratável depois de $\\ell = 4$.</p>

<h2 id="algoritmo">O algoritmo</h2>
<p>O que importa não é a lista de somas, mas o conjunto de resíduos que elas atingem. Esse conjunto cabe em um vetor de bits com $3^\\ell$ posições, e somar uma constante a todos os seus elementos é uma rotação cíclica do vetor.</p>
<p>O programa é uma programação dinâmica do tipo mochila 0/1 sobre os expoentes, percorridos em ordem decrescente. Para cada quantidade de termos já escolhidos há um vetor de bits com os resíduos alcançáveis; considerar um novo expoente é girar cada vetor pelo valor correspondente e fazer um OU com o vetor da camada seguinte. Em Rust, os vetores são <code>Vec&lt;u64&gt;</code>, e cada rotação com OU é repartida entre os núcleos com a biblioteca rayon.</p>
<p>A memória necessária é exata e previsível: $(\\ell + 1) \\cdot 3^{\\ell} / 8$ bytes.</p>

<h2 id="custo">O custo</h2>
`) +
        `<div class="table-wrap" tabindex="0" role="group" aria-label="Tabela: custo por nível"><table>
          <caption>Custo do cálculo por nível, na máquina de referência</caption>
          <thead><tr><th scope="col">Nível</th><th scope="col" class="num">Estado</th><th scope="col" class="num">Tempo de parede</th><th scope="col">Observação</th></tr></thead>
          <tbody>
            <tr><th scope="row">ℓ = 1 a 16</th><td class="num">até 0,1 GiB</td><td class="num">6 s</td><td></td></tr>
            <tr><th scope="row">ℓ = 17 a 19</th><td class="num">até 2,7 GiB</td><td class="num">3,5 min</td><td></td></tr>
            <tr><th scope="row">ℓ = 20</th><td class="num">9 GiB</td><td class="num">10 min</td><td>Limite da tabela anterior</td></tr>
            <tr><th scope="row">ℓ = 21</th><td class="num">27 GiB</td><td class="num">748 s</td><td>Cabe na memória física</td></tr>
            <tr><th scope="row">ℓ = 22</th><td class="num">84 GiB</td><td class="num">10 749 s</td><td>Exigiu 500 GiB de swap</td></tr>
            <tr><th scope="row">ℓ = 23</th><td class="num">263 GiB</td><td class="num">375 615 s</td><td>Cerca de 104 horas</td></tr>
          </tbody>
        </table></div>` +
        prose(`
<p>A partir de $\\ell = 22$ o estado não cabe na memória física, e o cálculo passa a depender de 500 GiB de memória virtual em disco. O último nível levou mais de quatro dias. Cada orçamento descartado é registrado em um arquivo de progresso, para que um reinício não refaça o que já foi excluído. Não há retomada do estado completo: interromper o processo perde a tentativa em curso.</p>
<p>A tabela para em $\\ell = 23$ porque esse é o último nível com resultado completo e verificado. O seguinte pediria cerca de 820 GiB.</p>

<h2 id="confianca">Como confiar</h2>
<p>Um número que custou 104 horas é exatamente o tipo de número em que não se deve confiar por cansaço. As defesas, em ordem crescente de alcance:</p>
<ul>
  <li><strong>Enumeração direta</strong> para $\\ell \\le 4$, em um programa que não compartilha nenhum caminho de código com a programação dinâmica.</li>
  <li><strong>Valores de referência</strong> para $\\ell = 1$ a $7$ e uma conferência pontual, em $\\ell = 2$ e $j = 2$, em que a imagem é $\\{1, 2, 5, 7\\}$ módulo 9 e faltam $\\{4, 8\\}$. Essa validação é o primeiro comando das instruções, antes de qualquer execução longa.</li>
  <li><strong>Uma implementação independente em Python</strong>, validada contra a tabela até $\\ell = 17$, que confirma $j^*(21) = 25$.</li>
  <li><strong>Um lema</strong>, com prova, de que nenhum orçamento menor que $\\ell$ cobre, o que fecha a busca por baixo sem depender do programa.</li>
</ul>
<p>Para $\\ell = 22$ e $23$ não existe verificação cruzada por um segundo programa. O preprint diz isso, e os gráficos marcam esses dois pontos de forma diferente.</p>

<h2 id="entorno">O que mais o repositório calcula</h2>
<p>O mesmo repositório guarda o restante da parte computacional do artigo, com o custo de cada item declarado: o solucionador do jogo de payoff médio, com doze certificados armazenados (o maior tem 60 MB) e um verificador independente que os reconfere em menos de um minuto; o espectro de somas exponenciais em $\\ell = 18$, que usa 22 GiB; e os conjuntos de resíduos não cobertos até $\\ell = 21$, que sustentam os teoremas sobre a estrutura do que resiste.</p>
<p>Cada tabela e cada afirmação numérica do artigo aponta para uma pasta e um comando.</p>
`) +
        back,
    }),
};

/* ======================================================================= RAG */
const rag = {
  path: '/projetos/documentacao-pronta-para-recuperacao/',
  title: 'Documentação escrita para ser recuperada',
  description: 'Um pipeline de RAG híbrido para a documentação de um ERP brasileiro (473 documentos, 4,1 milhões de tokens), em que o contrato de escrita da documentação e o mecanismo de busca foram projetados juntos e avaliados com ablações.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/projetos/documentacao-pronta-para-recuperacao/', label: 'Documentação para recuperação' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'Documentação para recuperação' }],
      title: 'Documentação escrita para ser recuperada',
      lede: 'Um sistema que responde perguntas de suporte sobre a documentação de um ERP. A ideia central é simples: se quem escreve a documentação é um modelo de linguagem seguindo um contrato, o mecanismo de busca pode contar com a estrutura que o contrato garante.',
      article: true,
    }) +
    article({
      side:
        facts([
          ['Situação', 'Em produção; manuscrito concluído, ainda sem identificador de preprint'],
          ['Papel', 'Autor: arquitetura, implementação e avaliação'],
          ['Tecnologias', 'Python, PostgreSQL 18, pgvector, busca textual, LangGraph, GitHub Actions'],
          ['Corpus', '473 documentos, 4,1 milhões de tokens, em português'],
          ['Código e dados', '<a href="https://github.com/faculdade/docs-designed-for-retrieval">GitHub</a> (MIT)'],
        ]) +
        toc([
          { id: 'contrato', label: 'O contrato de documentação' },
          { id: 'busca', label: 'A busca' },
          { id: 'medir', label: 'Como medir' },
          { id: 'resultados', label: 'O que os números dizem' },
          { id: 'limites', label: 'Limites' },
        ]),
      main:
        prose(`
<h2 id="contrato">O contrato de documentação</h2>
<p>O corpus é a documentação de um ERP brasileiro com cerca de 270 telas: 473 documentos em português, de telas, relatórios, regras de negócio, integrações e estruturas de dados. Ela é gerada por um modelo de linguagem a partir do código-fonte do produto, e regenerada por integração contínua a cada versão.</p>
<p>O modelo escreve sob um <em>contrato</em>: todo documento tem os mesmos campos de cabeçalho, as mensagens de erro aparecem em tabelas com o texto exato que o sistema exibe, as permissões têm formato fixo, e há mais de mil pares de pergunta e resposta frequentes. O contrato existe para o leitor humano, mas dá ao buscador algo raro em documentação: estrutura em que se pode confiar.</p>

<h2 id="busca">A busca</h2>
<p>Tudo roda em uma única instância de PostgreSQL, com busca vetorial (pgvector, índice HNSW) e busca textual lado a lado. Os documentos são divididos em seis tipos de trecho, cerca de 39,7 mil no total: seções, linhas de tabela, mensagens, permissões, perguntas frequentes e resumos.</p>
<ul>
  <li><strong>Atalhos de correspondência exata.</strong> Se a pergunta contém uma mensagem de erro ou um nome de permissão que existe nas tabelas, a resposta vem delas, sem passar pela busca semântica.</li>
  <li><strong>Busca híbrida.</strong> Cinquenta candidatos da busca densa e cinquenta da lexical, combinados por fusão de postos recíprocos.</li>
  <li><strong>Reordenação</strong> por um modelo cross-encoder.</li>
  <li><strong>Expansão para a seção-mãe</strong>, para que a resposta seja escrita com o contexto inteiro e não com um fragmento.</li>
</ul>

<h2 id="medir">Como medir</h2>
<p>O mapa da documentação fornece pares de pergunta e documento correto, separados em um conjunto de desenvolvimento (929 perguntas) e um de teste (214), que não é usado para ajustar nada. Como essas perguntas reutilizam o vocabulário dos documentos, há um terceiro conjunto, de 214 paráfrases em linguagem coloquial, e conjuntos operacionais com mensagens de erro coladas.</p>
<p>Cada componente do pipeline foi removido em uma ablação, e 23 modelos de embedding foram comparados sob o mesmo protocolo. Todos os números do manuscrito estão mapeados, em um arquivo do repositório, para o arquivo e o campo de onde saíram, e um script confere os que podem ser conferidos.</p>
`) +
        figure({
          n: 1,
          svg: ragSvg(ragRecall),
          caption: 'Recall@10 de 23 modelos de embedding e do pipeline em produção, com o mesmo reordenador. Nas perguntas literais (círculos vazados) todos parecem perfeitos; são as paráfrases (círculos cheios) que os separam. Um conjunto de teste que só repete o vocabulário dos documentos mediria quase nada. Dados: arquivo <code>recall-por-modelo.csv</code> do repositório público.',
        }) +
        prose(`
<h2 id="resultados">O que os números dizem</h2>
<ul>
  <li>No conjunto de teste literal, o pipeline completo encontra o documento certo entre os dez primeiros em todas as 214 perguntas (recall@10 de 1,000; MRR de 0,927).</li>
  <li>Nas paráfrases, o recall@10 cai para 0,874. É o número que descreve melhor o uso real.</li>
  <li>A busca lexical sozinha vai muito bem nas perguntas literais (0,981) e desaba nas paráfrases (0,16). A busca densa sozinha perde o documento em 26 das 214 perguntas literais. Nenhuma das duas basta.</li>
  <li>As tabelas de correspondência exata valem de 14 a 18 pontos de recall quando o usuário cola uma mensagem de erro: de 0,82 e 0,86 para 1,00.</li>
  <li>A reescrita da pergunta por um modelo de linguagem, técnica comum em sistemas desse tipo, <strong>piorou</strong> o resultado: de 1,000 para algo entre 0,907 e 0,916 no conjunto literal, e de 0,874 para 0,855 nas paráfrases.</li>
</ul>

<h2 id="limites">Limites</h2>
<p>O repositório público contém o pacote de recuperação que está em produção, os conjuntos de referência, os resultados arquivados e um subconjunto de 30 documentos, suficiente para rodar a ingestão e a avaliação de ponta a ponta. Os outros 443 documentos e o texto integral do contrato pertencem ao fornecedor do ERP e não foram publicados; o nome do produto foi substituído por termos genéricos em todos os arquivos.</p>
<p>As 62 perguntas reais de clientes coletadas nos primeiros dias de uso não estão rotuladas e não entram em nenhuma métrica. O sistema foi medido em um corpus e em um idioma, e o manuscrito distingue três níveis de reprodutibilidade para dizer o que um leitor externo consegue refazer.</p>
`) +
        back,
    }),
};

/* ================================================================ ResearchOS */
const researchos = {
  path: '/projetos/researchos/',
  title: 'ResearchOS: um caderno de laboratório para pesquisa com IA',
  description: 'ResearchOS é a estrutura de hipóteses, experimentos e checkpoints que Renato Augusto Tavares usou para investigar o problema de Collatz com agentes de IA. O repositório é público, com 136 experimentos documentados.',
  ogType: 'article',
  jsonld: [crumbsLd([HOME, BASE, { href: '/projetos/researchos/', label: 'ResearchOS' }])],
  body:
    pageHead({
      trail: [HOME, BASE, { href: '', label: 'ResearchOS' }],
      title: 'ResearchOS: um caderno de laboratório para pesquisa com IA',
      lede: 'Antes dos preprints houve um caderno. O ResearchOS é a estrutura mínima em que conduzi, com agentes de IA, uma investigação exploratória do problema de Collatz. Está publicado como foi feito, com os erros e as correções.',
      article: true,
    }) +
    article({
      side:
        facts([
          ['Situação', 'Sem atividade desde agosto de 2026; as linhas que amadureceram ganharam repositórios próprios'],
          ['Papel', 'Direção científica e projeto do processo'],
          ['Tecnologias', 'Python, Git, Claude Code'],
          ['Repositório', '<a href="https://github.com/rat/collatz">github.com/rat/collatz</a>'],
          ['Ver também', '<a href="/pesquisa/metodo/">Método de pesquisa</a>'],
        ]) +
        toc([
          { id: 'estrutura', label: 'A estrutura' },
          { id: 'papeis', label: 'Os papéis' },
          { id: 'experimentos', label: 'Os experimentos' },
          { id: 'de-fora', label: 'O que ficou de fora de propósito' },
          { id: 'depois', label: 'O que veio depois' },
        ]),
      main:
        prose(`
<h2 id="estrutura">A estrutura</h2>
<p>O repositório se descreve como um laboratório de pesquisa científica assistida por IA, com estrutura mínima, pensada para crescer por necessidade real e não por especificação antecipada. Cada linha de pesquisa é uma pasta com cinco coisas:</p>
<ul>
  <li>um arquivo de <strong>estado</strong>, que funciona como memória: onde estamos, quais hipóteses estão abertas, quais são os próximos passos;</li>
  <li><strong>hipóteses</strong> numeradas, cada uma com a sua situação;</li>
  <li><strong>experimentos</strong> numerados, cada um com o código e um relato em português e em inglês;</li>
  <li>notas de <strong>literatura</strong>, sobre trabalhos de terceiros;</li>
  <li>os <strong>artigos</strong> próprios, que são o resultado final.</li>
</ul>
<p>Quatro protocolos leves ligam as partes: como registrar uma hipótese, como rodar um experimento, como buscar literatura e como fechar uma sessão de trabalho, sempre com um commit.</p>

<h2 id="papeis">Os papéis</h2>
<p>A divisão é explícita no próprio repositório. O diretor científico define objetivos e prioridades e aprova resultados. O agente executa: cria e edita arquivos, roda experimentos e mantém o histórico. Toda sessão termina com um checkpoint, de modo que o estado do laboratório está sempre no Git e não na memória de uma conversa.</p>

<h2 id="experimentos">Os experimentos</h2>
<p>São 136 pastas de experimentos, a maioria pequenos: um script, uma pergunta e uma resposta. Os primeiros testam o que qualquer pessoa testaria ao chegar ao problema, como a independência das paridades, os recordistas de tempo de parada, a lei de Benford e a busca de ciclos não triviais. Uma parte grande deles confere afirmações encontradas na literatura recente, antes de construir qualquer coisa sobre elas.</p>
<p>Alguns estão errados, e o repositório diz quais. Quando um experimento foi corrigido, por exemplo depois da comparação com uma sequência da OEIS, o original continua lá, com um arquivo de correção ao lado.</p>

<h2 id="de-fora">O que ficou de fora de propósito</h2>
<p>O roteiro do projeto lista ideias que foram discutidas e adiadas: conselhos de agentes com personas que votam, um grafo de conhecimento em banco de grafos, geração automática de painéis e relatórios. A anotação ao lado diz que nada disso se justifica antes de o processo básico, de hipótese, experimento e checkpoint, provar que precisa delas. Continuo achando que essa foi a decisão de engenharia mais importante do projeto.</p>

<h2 id="depois">O que veio depois</h2>
<p>Do caderno saíram as linhas que hoje têm preprint: o <a href="/pesquisa/programa-de-wirsching/">programa de Wirsching</a>, a <a href="/pesquisa/cobertura-fraca/">Cobertura Fraca</a> e o <a href="/pesquisa/expoente-5x-mais-1/">expoente do mapa 5x+1</a>. Cada uma ganhou um repositório próprio, com regras mais rígidas do que as do caderno: código organizado pelas seções do artigo, saídas reproduzíveis e versões arquivadas com DOI.</p>
`) +
        back,
    }),
};

export default [indice, appsPage, computacao, rag, researchos];
