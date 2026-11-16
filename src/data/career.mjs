// Trajetória profissional e formação.
//
// Fontes: Currículo Lattes (lattes.cnpq.br/9521612341950206), registro ORCID
// (0009-0002-0196-3311), versão anterior deste site e site institucional da
// Metaprime. Onde as fontes divergem, o campo `divergencia` registra a diferença
// e o site exibe apenas o que é comum a elas. Ver _relatorios/pendencias.md.

export const experience = [
  {
    org: 'Metaprime Sistemas',
    orgUrl: 'https://metaprime.com.br/',
    place: 'Goiânia, GO',
    roles: [
      { title: 'Diretor', from: '2022-09', to: null },
      { title: 'Gerente de Desenvolvimento de TI', from: '2019-03', to: '2022-09' },
    ],
    text: [
      'A Metaprime desenvolve sistemas de gestão empresarial (ERP) para comércio, atacado, indústria e serviços, com soluções específicas para o varejo de autopeças. Respondo pela direção técnica do produto: arquitetura, banco de dados, integrações fiscais e a evolução da plataforma.',
    ],
    divergencia: 'Lattes registra o vínculo como "Sócio-Administrador" (2019–atual); ORCID registra "CEO" (desde 03/2019); o site anterior separava "Gerente de Desenvolvimento de TI" (03/2019–09/2022) e "Diretor" (09/2022–atual).',
  },
  {
    org: 'MR Automação Industrial',
    place: 'Goiânia, GO',
    roles: [{ title: 'Engenheiro de Hardware', from: '2017-09', to: '2019-02' }],
    text: [
      'Projeto de hardware sob demanda e do software embarcado que o faz funcionar: microcontroladores Atmel/AVR, firmware em C, C++ e Assembly, eletrônica de baixo consumo e desenho de placas.',
    ],
    divergencia: 'Lattes registra o cargo como "Desenvolvedor de Hardware e Software" (2017–2019).',
  },
  {
    org: 'SGS Unigeo Agricultura de Precisão',
    place: 'Goiânia, GO',
    roles: [{ title: 'Programador Sênior', from: '2014-06', to: '2017-09' }],
    text: [
      'Desenvolvimento de software para agricultura de precisão: sistemas que recebem, organizam e analisam dados agronômicos coletados em campo.',
    ],
    divergencia: 'O Lattes não lista a SGS Unigeo; para o mesmo período registra "Saltus Tecnologia — Desenvolvedor de Software" (2014–2016) e "BTIN Inovações — Desenvolvedor de Hardware" (2017).',
  },
];

export const education = [
  {
    degree: 'Mestrado em Processamento Digital de Imagens',
    org: 'Instituto de Informática, Universidade Federal de Goiás (UFG)',
    when: '2024 – em andamento',
    note: null,
  },
  {
    degree: 'MBA em Engenharia de Software com Inteligência Artificial',
    org: 'Full Cycle',
    when: '2026',
    note: null,
  },
  {
    degree: 'Especialização em Banco de Dados com ênfase em Big Data',
    org: 'Instituto de Informática, Universidade Federal de Goiás (UFG)',
    when: 'Concluída em 2023',
    note: 'Trabalho de conclusão: “Previsão de vendas futuras baseada em vendas passadas usando aprendizado de máquina”, orientado pela Profa. Nádia Félix Felipe da Silva.',
  },
  {
    degree: 'Graduação em Análise e Desenvolvimento de Sistemas',
    org: 'Centro Universitário de Goiás (UNIGOIÁS)',
    when: null,
    note: null,
  },
];

// Ferramentas agrupadas pelo uso real, com a evidência pública de cada grupo.
export const toolkit = [
  {
    group: 'Computação científica',
    text: 'Aritmética de bolas e intervalar com Arb/FLINT (python-flint) quando um número precisa ser um certificado, não uma estimativa; mpmath para precisão arbitrária; NumPy e SciPy para estatística e bootstrap. As computações pesadas são escritas em Rust (programação dinâmica sobre conjuntos de bits) e em C com OpenMP (enumeração de árvores).',
    where: 'Repositórios de reprodutibilidade dos preprints.',
  },
  {
    group: 'Inteligência artificial',
    text: 'Recuperação híbrida (densa e lexical, fusão por postos, reordenação com cross-encoder), LangGraph, avaliação com conjuntos de referência e ablações; processamento de imagens com OpenCV, OCR com EasyOCR e métricas com scikit-learn.',
    where: 'Pipeline de RAG e preprint de OCR de placas.',
  },
  {
    group: 'Linguagens',
    text: 'Python para pesquisa e dados; Kotlin e Java no Android; TypeScript, JavaScript e PHP na web; C, C++ e Rust onde desempenho ou hardware exigem; SQL em tudo; LaTeX para escrever.',
    where: null,
  },
  {
    group: 'Bancos de dados',
    text: 'PostgreSQL é a base da maior parte do que construo, incluindo busca textual e vetorial (pgvector) na mesma instância. Também MySQL/MariaDB, SQLite e Room no Android, Redis e MongoDB.',
    where: null,
  },
  {
    group: 'Android',
    text: 'Kotlin, Jetpack Compose, Room, DataStore, Hilt e WorkManager, em aplicativos que funcionam sem conexão por projeto.',
    where: 'Sete aplicativos publicados no Google Play.',
  },
  {
    group: 'Web e infraestrutura',
    text: 'Node.js, HTML e CSS sem intermediários quando o problema permite (este site é um exemplo), Docker, Linux, Git e integração contínua com GitHub Actions.',
    where: null,
  },
  {
    group: 'Sistemas embarcados',
    text: 'Microcontroladores Atmel/AVR, Arduino, rádio LoRa, eletrônica de baixo consumo e desenho de placas no Altium Designer.',
    where: 'Trabalho na MR Automação Industrial.',
  },
];
