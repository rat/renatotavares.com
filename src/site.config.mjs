// Configuração central do site. Tudo o que é "fato sobre o site" mora aqui,
// para que as páginas e o documento legal não possam divergir da implementação.

export const site = {
  url: 'https://renatotavares.com',
  name: 'Renato Augusto Tavares',
  shortName: 'Renato Tavares',
  locale: 'pt-BR',
  // Data exibida no documento legal (Política de Privacidade e Termos de Uso).
  // Atualize sempre que o texto jurídico ou o comportamento do site/apps mudar.
  legalUpdated: '2026-11-16',
  legalVersion: '3.0',

  person: {
    givenName: 'Renato Augusto',
    familyName: 'Tavares',
    city: 'Goiânia',
    region: 'Goiás',
    country: 'Brasil',
    email: 'dr.renatotavares@gmail.com', // contato geral e canal de privacidade
    academicEmail: 'rat@discente.ufg.br', // usado nos preprints e no ORCID
    orcid: '0009-0002-0196-3311',
  },

  profiles: {
    orcid: 'https://orcid.org/0009-0002-0196-3311',
    scholar: 'https://scholar.google.com/citations?user=5L2RbhMAAAAJ&hl=pt-BR',
    lattes: 'https://lattes.cnpq.br/9521612341950206',
    github: 'https://github.com/rat',
    githubResearch: 'https://github.com/faculdade',
    linkedin: 'https://www.linkedin.com/in/java/',
    play: 'https://play.google.com/store/apps/developer?id=Renato+Augusto+Tavares',
  },

  nav: [
    { href: '/pesquisa/', label: 'Pesquisa' },
    { href: '/publicacoes/', label: 'Publicações' },
    { href: '/projetos/', label: 'Projetos' },
    { href: '/trajetoria/', label: 'Trajetória' },
    { href: '/sobre/', label: 'Sobre' },
    { href: '/contato/', label: 'Contato' },
  ],

  // ---------------------------------------------------------------------
  // Tecnologias de terceiros no SITE. O documento legal lê estes valores.
  //
  // Estado atual (verificado na auditoria de 16/11/2026): o site não carrega
  // anúncios, não usa ferramenta de análise de audiência e não carrega nenhum
  // recurso de terceiros. Por isso não há banner de consentimento: não existe
  // nada não essencial a consentir.
  //
  // Para ligar o Google AdSense: leia README.md ("Publicidade e consentimento")
  // ANTES de mudar `ads.enabled`. Em resumo: é preciso ter a conta aprovada,
  // publicar a mensagem de regulamentações europeias em "Privacidade e
  // mensagens" (CMP certificada do Google) e criar o ads.txt.
  // ---------------------------------------------------------------------
  ads: {
    enabled: false,
    client: '', // ex.: 'ca-pub-0000000000000000' — confirmar no painel do AdSense
    // Páginas que NUNCA recebem a tag de anúncios. O Google exige que a página
    // da política de privacidade não hospede tags de anúncio nem de consentimento.
    excludedPaths: ['/termos.html', '/404.html', '/contato/'],
  },
  analytics: { enabled: false },

  hosting: {
    provider: 'Hostinger',
    providerPolicy: 'https://www.hostinger.com/legal/privacy-policy',
  },
};

export default site;

// Gancho de teste do mecanismo de consentimento (ver README). Nunca usar em produção:
// liga a publicidade com um identificador fictício e troca a tag do Google por um simulador local.
if (process.env.SITE_ADS_TEST) {
  site.ads.enabled = true;
  site.ads.client = 'ca-pub-0000000000000000';
  site.ads.testScriptUrl = '/src/tools/stub-adsbygoogle.js';
}
