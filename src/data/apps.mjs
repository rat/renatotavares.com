// Aplicativos Android publicados no Google Play por "Renato Augusto Tavares".
//
// Este arquivo alimenta duas coisas ao mesmo tempo: a página de projeto e a
// seção de aplicativos da Política de Privacidade (/termos.html). Por isso cada
// campo descreve o comportamento REAL do app, conferido no código-fonte, no
// manifesto mesclado da versão de release e na ficha do Google Play em
// `auditedAt`. Ao publicar uma nova versão de um app, revise a entrada dele
// aqui e recompile o site — a política muda junto.
//
// Campos de privacidade:
//   internet    o app declara a permissão INTERNET?
//   ads         exibe anúncios do Google AdMob? (implica coleta pelo SDK do Google)
//   consent     'ump' = solicita consentimento pela plataforma do Google (UMP)
//               antes de iniciar o SDK de anúncios; 'none' = não há mensagem
//               de consentimento no app; null = não se aplica (sem anúncios)
//   network     outros destinos de rede além do Google (anúncios)
//   stored      o que o app grava no aparelho
//   backup      'padrao'  = participa do backup do Android (conta Google do usuário)
//               'excluido' = backup em nuvem desativado para os dados do app
//               'nada'    = não há dados a copiar
//   deletion    como o usuário apaga os dados

export const auditedAt = '2026-11-16';

export const apps = [
  {
    slug: 'mapa-astral-completo',
    name: 'Mapa Astral Completo',
    pkg: 'com.renatotavares.mapaastralcompleto',
    version: '1.0.2',
    category: 'Estilo de vida',
    blurb: 'Mapa natal com análise tradicional, trânsitos diários, sinastria e exportação em PDF. O cálculo usa efemérides embarcadas e uma base de cidades offline.',
    stack: 'Kotlin, Jetpack Compose, Room, Hilt',
    internet: true,
    ads: true,
    consent: 'ump',
    network: [],
    stored: 'Os mapas que você cria: nome, data, hora e local de nascimento (cidade, país, coordenadas e fuso horário). Os PDFs exportados ficam temporariamente na área de cache do app.',
    processing: 'O cálculo astronômico, a busca de cidades, o fuso horário e os textos de interpretação são resolvidos no próprio aparelho, sem consulta a servidores. O app não tem servidor próprio e não envia os dados de nascimento a ninguém.',
    backup: 'padrao',
    sharing: 'Ao exportar ou compartilhar um PDF, o arquivo (que contém nome e dados de nascimento) é entregue ao aplicativo que você escolher.',
    deletion: 'Limpe os dados do app nas configurações do Android ou desinstale-o. Se o backup do Android estiver ativo, apague também a cópia em sua conta Google.',
    audience: 'Público geral.',
  },
  {
    slug: 'biblia-catolica-offline',
    name: 'Bíblia Católica Offline',
    pkg: 'com.renatotavares.bibliacatolica',
    version: '1.4',
    category: 'Livros e referências',
    blurb: 'Bíblia católica completa para leitura offline, com versículo do dia, favoritos e compartilhamento de versículos como imagem.',
    stack: 'Kotlin, Jetpack Compose, Room',
    internet: true,
    ads: true,
    consent: 'none',
    network: [],
    stored: 'Seus versículos favoritos.',
    processing: 'Todo o texto bíblico está embarcado no app; a leitura não depende de rede.',
    backup: 'padrao',
    sharing: 'Ao compartilhar um versículo, a imagem gerada é entregue ao aplicativo que você escolher.',
    deletion: 'Remova os favoritos no próprio app, limpe os dados do app ou desinstale-o.',
    audience: 'Público geral.',
  },
  {
    slug: 'gerador-numeros-loterias',
    name: 'Gerador Números para Loterias',
    pkg: 'com.renatotavares.geradornumerosloterias',
    version: '1.1.1',
    category: 'Ferramentas',
    blurb: 'Gera combinações para dez loterias com 25 estratégias, confere resultados e mostra estatísticas dos sorteios.',
    stack: 'Kotlin, Jetpack Compose, Room, Retrofit, WorkManager',
    internet: true,
    ads: true,
    consent: 'none',
    network: [
      {
        host: 'loteriascaixa-api.herokuapp.com',
        what: 'Consulta de resultados oficiais dos sorteios, inclusive em sincronização periódica em segundo plano. A requisição leva apenas o nome da loteria e o número do concurso; como em qualquer acesso à internet, o servidor desse serviço de terceiros vê o endereço IP do aparelho.',
      },
    ],
    stored: 'Os jogos que você gera (com apelido opcional), suas preferências e os resultados baixados.',
    processing: 'A geração dos jogos e as estatísticas são calculadas no aparelho. A data de nascimento pedida por uma das estratégias é usada apenas na memória, durante o cálculo, e não é gravada.',
    backup: 'padrao',
    sharing: 'Ao compartilhar um jogo, o texto é entregue ao aplicativo que você escolher.',
    deletion: 'Apague os jogos no próprio app, limpe os dados do app ou desinstale-o.',
    audience: 'Público geral. O app não realiza apostas, não vende jogos e não tem vínculo com a Caixa Econômica Federal.',
  },
  {
    slug: 'simulado-do-detran',
    name: 'Simulado do Detran',
    pkg: 'org.pacote.android.apps.simuladodetran',
    version: '1.5',
    category: 'Educação',
    blurb: 'Estudo e simulados de placas de trânsito brasileiras, com estatísticas de acertos.',
    stack: 'Java, Room, MPAndroidChart',
    internet: true,
    ads: true,
    consent: 'none',
    network: [],
    stored: 'Suas estatísticas de estudo (quantidade de acertos e erros).',
    processing: 'O banco de placas e questões está embarcado no app.',
    backup: 'padrao',
    sharing: null,
    deletion: 'Limpe os dados do app nas configurações do Android ou desinstale-o.',
    audience: 'Candidatos à habilitação.',
  },
  {
    slug: 'sudoku-offline',
    name: 'Sudoku Offline: Lógica Pura',
    pkg: 'com.renatotavares.sudokuoffline',
    version: '1.0',
    category: 'Quebra-cabeças',
    blurb: 'Sudoku clássico 9×9 com geração de tabuleiros no aparelho, sete níveis, oito modos, desafio diário e dicas que explicam o raciocínio.',
    stack: 'Kotlin, Jetpack Compose, Room, DataStore',
    internet: false,
    ads: false,
    consent: null,
    network: [],
    stored: 'Jogos em andamento, recordes, conquistas e preferências.',
    processing: 'O app não tem permissão de acesso à internet.',
    backup: 'padrao',
    sharing: null,
    deletion: 'Limpe os dados do app nas configurações do Android ou desinstale-o.',
    audience: 'Público geral.',
    shots: ['sudoku-1', 'sudoku-2', 'sudoku-3'],
  },
  {
    slug: 'markup-calculadora-de-precos',
    name: 'Markup: Calculadora de Preços',
    pkg: 'com.renatotavares.markup',
    version: '1.0',
    category: 'Negócios',
    blurb: 'Cálculo de preço de venda para MEIs e vendedores de marketplace, com histórico e cenários salvos.',
    stack: 'Kotlin, Jetpack Compose, Room, Hilt',
    internet: false,
    ads: false,
    consent: null,
    network: [],
    stored: 'Histórico de cálculos, cenários salvos e configuração das plataformas (custos, margens e preços que você digitou).',
    processing: 'O app não tem permissão de acesso à internet.',
    backup: 'padrao',
    sharing: null,
    deletion: 'Apague o histórico no próprio app, limpe os dados do app ou desinstale-o.',
    audience: 'Empreendedores e vendedores.',
    shots: ['markup-1', 'markup-2'],
  },
  {
    slug: 'calculadora-financeira',
    name: 'Calculadora Financeira',
    pkg: 'com.renatotavares.juroscompostos',
    version: '1.0',
    category: 'Finanças',
    blurb: 'Três calculadoras: juros compostos, tempo até o primeiro milhão e comparação entre alugar e financiar.',
    stack: 'Kotlin, Jetpack Compose',
    internet: false,
    ads: false,
    consent: null,
    network: [],
    stored: 'Nada. Os valores digitados existem só enquanto a tela está aberta.',
    processing: 'O app não tem permissão de acesso à internet e não grava dados.',
    backup: 'nada',
    sharing: null,
    deletion: 'Não há dados a apagar.',
    audience: 'Público geral.',
  },
];

export const playUrl = (pkg) => `https://play.google.com/store/apps/details?id=${pkg}`;
export const adApps = apps.filter((a) => a.ads);
