import site from '../site.config.mjs';
import { article, crumbsLd, HOME, pageHead, personLd, prose, sec, toc } from '../lib/components.mjs';
import { education, experience, toolkit } from '../data/career.mjs';
import { dataCurta } from '../lib/util.mjs';

const period = (r) => `${dataCurta(r.from)} – ${r.to ? dataCurta(r.to) : 'atual'}`;

/* ================================================================ trajetória */
const trajetoria = {
  path: '/trajetoria/',
  title: 'Trajetória',
  description: 'Experiência profissional, formação acadêmica e ferramentas de trabalho de Renato Augusto Tavares: Metaprime Sistemas, MR Automação Industrial, SGS Unigeo, Universidade Federal de Goiás.',
  jsonld: [crumbsLd([HOME, { href: '/trajetoria/', label: 'Trajetória' }])],
  body:
    pageHead({
      trail: [HOME, { href: '', label: 'Trajetória' }],
      title: 'Trajetória',
      lede: 'Software para o campo, hardware sob medida, sistemas de gestão e, em paralelo, a volta à universidade. O registro oficial e completo está no Currículo Lattes e no ORCID.',
    }) +
    sec(
      'Experiência profissional',
      `<ol class="chrono">${experience
        .map(
          (e) => `<li id="${e.org.toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}">
            <p class="chrono-when">${e.roles.map((r) => period(r)).join('<br>')}</p>
            <div><h3>${e.orgUrl ? `<a href="${e.orgUrl}">${e.org}</a>` : e.org}</h3>
            ${e.roles.map((r) => `<p class="role">${r.title}</p>`).join('')}
            ${e.text.map((t) => `<p>${t}</p>`).join('')}</div>
          </li>`,
        )
        .join('')}</ol>`,
      { id: 'experiencia', small: 'Do mais recente ao mais antigo' },
    ) +
    sec(
      'Formação acadêmica',
      `<ol class="chrono">${education
        .map((e) => `<li><p class="chrono-when">${e.when ?? ''}</p><div><h3>${e.degree}</h3><p class="role">${e.org}</p>${e.note ? `<p>${e.note}</p>` : ''}</div></li>`)
        .join('')}</ol>
      <p class="note measure">Registros acadêmicos: <a href="${site.profiles.lattes}">Currículo Lattes</a> e <a href="${site.profiles.orcid}">ORCID</a>.</p>`,
      { id: 'formacao' },
    ) +
    sec(
      'Ferramentas de trabalho',
      `<p class="measure">Não acredito em percentuais de proficiência. O que segue é o que uso de fato, agrupado pelo tipo de problema, com a indicação de onde isso pode ser visto.</p>
      <ul class="rows">${toolkit
        .map((t) => `<li class="row"><div class="row-main"><h3>${t.group}</h3><p>${t.text}</p></div><div class="row-side">${t.where ?? ''}</div></li>`)
        .join('')}</ul>`,
      { id: 'ferramentas' },
    ) +
    sec('Idiomas', `<p class="measure">Português, língua materna, e inglês, em que escrevo os artigos.</p>`, { id: 'idiomas' }),
};

/* ===================================================================== sobre */
const sobre = {
  path: '/sobre/',
  title: 'Sobre',
  description: 'Quem é Renato Augusto Tavares: cientista da computação e engenheiro de software em Goiânia, mestrando na UFG, diretor na Metaprime Sistemas e pesquisador em matemática computacional e inteligência artificial.',
  ogType: 'profile',
  jsonld: [crumbsLd([HOME, { href: '/sobre/', label: 'Sobre' }]), { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: personLd() }],
  body:
    pageHead({
      trail: [HOME, { href: '', label: 'Sobre' }],
      title: 'Sobre',
      lede: 'Sou Renato Augusto Tavares, cientista da computação de Goiânia. Passei mais de uma década construindo software para empresas e, nos últimos anos, voltei à universidade e à pesquisa. Hoje faço as duas coisas, e uma melhora a outra.',
      article: true,
    }) +
    article({
      tocOnly: true,
      side: toc([
        { id: 'percurso', label: 'O percurso' },
        { id: 'pesquisa', label: 'A pesquisa' },
        { id: 'matematica-e-computacao', label: 'Matemática e computação' },
        { id: 'engenharia', label: 'Como penso engenharia' },
        { id: 'hoje', label: 'Hoje' },
        { id: 'colaboracao', label: 'Colaboração' },
      ]),
      main: prose(`
<h2 id="percurso">O percurso</h2>
<p>Minha formação inicial é em Análise e Desenvolvimento de Sistemas. Na SGS Unigeo escrevi software para agricultura de precisão. De lá fui para o outro extremo da pilha: na MR Automação Industrial projetei hardware sob demanda e o firmware que o faz funcionar, com microcontroladores Atmel, em C, C++ e Assembly, e eletrônica de baixo consumo.</p>
<p>Desde 2019 estou na Metaprime Sistemas, que desenvolve um sistema de gestão empresarial usado por empresas de comércio, atacado, indústria e serviços. É um tipo de software pouco glamoroso e muito exigente: regras fiscais que mudam, bancos de dados que não podem errar e usuários que dependem dele para abrir a loja de manhã. A <a href="/trajetoria/">trajetória completa</a> está em outra página.</p>
<p>Em paralelo, voltei a estudar. Fiz a especialização em Banco de Dados com ênfase em Big Data na Universidade Federal de Goiás, concluída em 2023 com um trabalho de aprendizado de máquina sobre previsão de vendas, e em 2024 comecei o mestrado em Processamento Digital de Imagens no Instituto de Informática da mesma universidade.</p>

<h2 id="pesquisa">A pesquisa</h2>
<p>Minha pesquisa tem hoje duas direções. A primeira é inteligência artificial e suas aplicações: aprendizado de máquina, visão computacional, processamento de imagens e recuperação de informação. O <a href="/publicacoes/pre-processamento-para-ocr-de-placas/">primeiro preprint</a>, de 2024, é dessa linha.</p>
<p>A segunda é matemática computacional: teoria dos números, sistemas dinâmicos discretos e, em particular, o problema $3n+1$ e o programa que Günther Wirsching desenvolveu para a densidade de predecessores. Em julho de 2026 abri um <a href="/projetos/researchos/">caderno de laboratório</a> sobre o problema de Collatz; nos meses seguintes saíram quatro preprints, entre eles a <a href="/pesquisa/programa-de-wirsching/">demonstração de duas das três conjecturas de Wirsching</a>.</p>
<p>Minha formação é em computação, e levo para a matemática o hábito de engenheiro de desconfiar do que não foi testado. É por isso que os meus trabalhos separam com tanta insistência o que está provado do que é evidência e do que é palpite. Eles são preprints, à espera de leitores que os confiram.</p>

<h2 id="matematica-e-computacao">Matemática e computação</h2>
<p>O que me atrai nesses problemas é o ponto em que a matemática rigorosa e a computação pesada se reforçam. Um cálculo exato pode derrubar uma conjectura em uma tarde, ou sustentar um lema que ninguém saberia enunciar sem ver os dados. Uma prova, por sua vez, diz ao programa o que não precisa ser calculado.</p>
<p>Para que isso funcione, o computador precisa ser tratado com o mesmo rigor que o papel: aritmética intervalar quando um número entra em um enunciado, implementações independentes para resultados caros, código e dados arquivados para quem quiser refazer. Descrevo essas regras em <a href="/pesquisa/metodo/">Método</a>. Elas se aplicam também ao uso que faço de sistemas de IA na pesquisa, que são instrumentos e não autores.</p>

<h2 id="engenharia">Como penso engenharia</h2>
<p>Três preferências aparecem em quase tudo o que construo.</p>
<p><strong>Menos peças.</strong> O pipeline de busca que descrevo nos projetos roda inteiro em uma instância de PostgreSQL, sem um banco vetorial à parte. Este site é HTML gerado por um script sem dependências. Cada componente a menos é uma coisa a menos para quebrar às três da manhã.</p>
<p><strong>Medir antes de acreditar.</strong> Técnicas que “todo mundo usa” às vezes pioram o resultado, e só uma ablação mostra isso. Nos meus experimentos de recuperação, reescrever a pergunta com um modelo de linguagem piorou o recall; no estudo de OCR, o pré-processamento das imagens não ajudou. Os dois resultados negativos pouparam trabalho.</p>
<p><strong>O dado é de quem o digitou.</strong> Meus aplicativos funcionam sem conexão e sem cadastro, e três deles não têm sequer permissão de rede. Quando não há servidor, não há vazamento de servidor.</p>

<h2 id="hoje">Hoje</h2>
<p>Divido o tempo entre a direção técnica na Metaprime, o mestrado na UFG e a pesquisa em matemática. Os interesses que me ocupam agora: a condição que falta no programa de Wirsching, a Conjectura da Cobertura Fraca, e o uso disciplinado de sistemas de IA em pesquisa matemática.</p>

<h2 id="colaboracao">Colaboração</h2>
<p>Estou aberto a colaboração científica genuína, em temas em que minha formação possa contribuir de fato: inteligência artificial, visão computacional, computação científica, matemática computacional e pesquisa reprodutível. Para mim, autoria em um trabalho conjunto deve refletir uma contribuição intelectual substantiva.</p>
<p>Se você encontrou um erro em um dos preprints, quero saber. <a href="/contato/">Escreva</a>.</p>
`),
    }),
};

/* =================================================================== contato */
const p = site.profiles;
const contato = {
  path: '/contato/',
  title: 'Contato',
  description: 'Como falar com Renato Augusto Tavares: e-mail, ORCID, Google Scholar, Currículo Lattes, GitHub e LinkedIn.',
  jsonld: [crumbsLd([HOME, { href: '/contato/', label: 'Contato' }]), { '@context': 'https://schema.org', '@type': 'ContactPage', url: `${site.url}/contato/`, mainEntity: { '@id': `${site.url}/#pessoa` } }],
  body:
    pageHead({
      trail: [HOME, { href: '', label: 'Contato' }],
      title: 'Contato',
      lede: 'O jeito mais direto de falar comigo é por e-mail. Respondo a perguntas sobre os preprints, correções, propostas de colaboração e conversas sobre os projetos.',
    }) +
    sec(
      'E-mail',
      `<p class="contact-mail"><a href="mailto:${site.person.email}">${site.person.email}</a></p>
      <p class="measure">Para correspondência acadêmica, o endereço institucional é <a href="mailto:${site.person.academicEmail}">${site.person.academicEmail}</a>. Solicitações sobre dados pessoais, do site ou dos aplicativos, vão para o primeiro endereço; o procedimento está na <a href="/termos.html#direitos">Política de Privacidade</a>.</p>`,
    ) +
    sec(
      'Perfis',
      `<ul class="chrono">
        <li><p class="chrono-when">Acadêmico</p><div><h3><a href="${p.orcid}" rel="me noopener">ORCID</a></h3><p class="role"><span class="idn">${site.person.orcid}</span></p><p>Identificador persistente, com formação, vínculos e a lista de trabalhos.</p></div></li>
        <li><p class="chrono-when">Acadêmico</p><div><h3><a href="${p.scholar}" rel="noopener">Google Scholar</a></h3><p>Publicações e citações.</p></div></li>
        <li><p class="chrono-when">Acadêmico</p><div><h3><a href="${p.lattes}" rel="noopener">Currículo Lattes</a></h3><p>O currículo na plataforma do CNPq.</p></div></li>
        <li><p class="chrono-when">Código</p><div><h3><a href="${p.github}" rel="me noopener">GitHub</a></h3><p>Perfil pessoal. Os repositórios de reprodutibilidade dos preprints ficam em <a href="${p.githubResearch}" rel="noopener">github.com/faculdade</a>.</p></div></li>
        <li><p class="chrono-when">Profissional</p><div><h3><a href="${p.linkedin}" rel="noopener">LinkedIn</a></h3><p>Histórico profissional.</p></div></li>
        <li><p class="chrono-when">Aplicativos</p><div><h3><a href="${p.play}" rel="noopener">Google Play</a></h3><p>Página de desenvolvedor, com os aplicativos publicados.</p></div></li>
      </ul>`,
    ) +
    sec(
      'Sem formulário',
      `<p class="measure">Esta página não tem formulário de contato de propósito. O site não coleta dados dos visitantes, e um formulário exigiria um servidor para recebê-los. Ao me escrever, seu endereço e sua mensagem ficam na minha caixa de e-mail e são usados só para responder.</p>`,
    ),
};

/* ======================================================================= 404 */
const nf = {
  path: '/404.html',
  title: 'Página não encontrada',
  description: 'O endereço pedido não existe neste site.',
  noindex: true,
  body:
    pageHead({
      title: 'Este endereço não leva a lugar nenhum',
      lede: 'A página que você procurou não existe, mudou de lugar ou nunca existiu. O site foi reorganizado em novembro de 2026; o conteúdo antigo da página inicial está distribuído pelas seções abaixo.',
    }) +
    sec(
      'Por onde seguir',
      `<ul class="rows">
        ${[
          ['/', 'Página inicial', 'Apresentação, pesquisa, publicações e projetos em uma página.'],
          ['/pesquisa/', 'Pesquisa', 'As linhas de investigação e o que está estabelecido em cada uma.'],
          ['/publicacoes/', 'Publicações', 'Os preprints, com resumo, identificadores e citação.'],
          ['/projetos/', 'Projetos', 'Aplicativos, software de pesquisa e inteligência artificial aplicada.'],
          ['/termos.html', 'Política de Privacidade e Termos de Uso', 'Os documentos legais do site e dos aplicativos.'],
        ]
          .map(([h, t, d]) => `<li class="row"><div class="row-main"><h3><a href="${h}">${t}</a></h3><p>${d}</p></div><div class="row-side"></div></li>`)
          .join('')}
      </ul>
      <p class="measure">Se você chegou aqui por um link deste site, <a href="/contato/">me avise</a>.</p>`,
    ),
};

export default [trajetoria, sobre, contato, nf];
