// /termos.html — Política de Privacidade e Termos de Uso em um único documento.
//
// REGRAS DESTE ARQUIVO
// 1. A URL /termos.html e as âncoras #privacidade e #termos são referenciadas
//    pelas fichas dos aplicativos no Google Play. Não renomear.
// 2. Esta página nunca carrega anúncios nem tags de consentimento (exigência do
//    Google para a página indicada como política de privacidade).
// 3. O que o texto afirma sobre o site vem de src/site.config.mjs e o que afirma
//    sobre cada aplicativo vem de src/data/apps.mjs. Mudou o comportamento?
//    Mude o dado, atualize `legalUpdated`/`legalVersion` e recompile.
// 4. Este texto foi redigido com base em fontes oficiais (ver _relatorios/),
//    mas não substitui a revisão por advogado antes da publicação definitiva.

import site from '../site.config.mjs';
import { crumbsLd, HOME } from '../lib/components.mjs';
import { adApps, apps, auditedAt, playUrl } from '../data/apps.mjs';
import { dataLonga, esc } from '../lib/util.mjs';

const mail = `<a href="mailto:${site.person.email}">${site.person.email}</a>`;
const updated = dataLonga(site.legalUpdated);
const ads = site.ads.enabled;
const noAdApps = apps.filter((a) => !a.ads);
const names = (list) => list.map((a) => a.name).join(', ').replace(/, ([^,]*)$/, ' e $1');
const yes = 'Sim';
const no = 'Não';

/* ------------------------------------------------------------ fichas dos apps */
const BACKUP = {
  padrao: 'Participa do backup do Android. Se você mantém o backup ativado no aparelho, o sistema pode guardar uma cópia destes dados na sua conta Google e restaurá-la em outro aparelho. Essa cópia é feita pelo Android, fica na sua conta e não chega a mim.',
  excluido: 'Os dados do aplicativo estão excluídos do backup em nuvem do Android.',
  nada: 'Não há dados a copiar.',
};
const CONSENT = {
  ump: 'O aplicativo usa a plataforma de consentimento do Google (UMP). Ela é consultada a cada abertura e, nas regiões em que o Google exige consentimento (Espaço Econômico Europeu, Reino Unido e Suíça), a mensagem é apresentada antes de o sistema de anúncios ser iniciado. Em qualquer região, as configurações de anúncios do aparelho continuam valendo (seção 4.3).',
  none: 'Pelas configurações de anúncios do seu aparelho (seção 4.3). Esta versão não exibe mensagem de consentimento própria.',
};
const appCard = (a) => `<article class="app-card" id="app-${a.slug}">
  <h4>${a.name}</h4>
  <p class="pkg">${a.pkg}, versão ${a.version}. <a href="${playUrl(a.pkg)}">Ficha no Google Play</a></p>
  <dl class="kv">
    <dt>Acesso à internet</dt><dd>${a.internet ? `${yes}, para os anúncios${a.network.length ? ' e para a consulta descrita abaixo' : ''}.` : `${no}. O aplicativo não declara a permissão de internet e não tem como transmitir dados.`}</dd>
    <dt>Anúncios</dt><dd>${a.ads ? `${yes}, do Google AdMob (seção 4.2).` : `${no}.`}</dd>
    ${a.ads ? `<dt>Controle dos anúncios</dt><dd>${CONSENT[a.consent]}</dd>` : ''}
    ${a.network.map((n) => `<dt>Outros acessos à rede</dt><dd><code>${n.host}</code>: ${n.what}</dd>`).join('')}
    <dt>O que fica no aparelho</dt><dd>${a.stored}</dd>
    <dt>Processamento</dt><dd>${a.processing}</dd>
    <dt>Backup do Android</dt><dd>${BACKUP[a.backup]}</dd>
    ${a.sharing ? `<dt>Compartilhamento por você</dt><dd>${a.sharing}</dd>` : ''}
    <dt>Como apagar</dt><dd>${a.deletion}</dd>
    <dt>Público</dt><dd>${a.audience}</dd>
  </dl>
</article>`;

/* ------------------------------------------------------------------ PARTE I */
const privacy = [
  {
    id: 'controlador',
    title: 'Quem responde por esta política',
    html: `
<p>O responsável pelo tratamento de dados pessoais descrito aqui, o <em>controlador</em> nos termos da Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018), é:</p>
<ul>
  <li><strong>Renato Augusto Tavares</strong>, pessoa natural, com domicílio em Goiânia, Goiás, Brasil;</li>
  <li>e-mail de contato e canal de privacidade: ${mail};</li>
  <li>site: <a href="/">renatotavares.com</a>.</li>
</ul>
<p>É o mesmo nome que aparece como desenvolvedor nas fichas dos aplicativos no Google Play. As solicitações são lidas e respondidas por mim, pessoalmente.</p>`,
  },
  {
    id: 'abrangencia',
    title: 'A que esta política se aplica',
    html: `
<p>Esta política cobre duas coisas, que funcionam de modo diferente e são tratadas em seções separadas:</p>
<ul>
  <li>o <strong>site</strong> renatotavares.com (seção 3);</li>
  <li>os <strong>aplicativos Android</strong> publicados no Google Play sob o nome de desenvolvedor “Renato Augusto Tavares” (seção 4), cada um com a sua ficha.</li>
</ul>
<p>Ela não se aplica a sites, lojas e serviços de terceiros para os quais o site ou os aplicativos apontam, como arXiv, GitHub, Figshare, SSRN, Zenodo, ORCID, Google Scholar, LinkedIn e o próprio Google Play, nem a produtos de empresas em que trabalho. Cada um deles tem a sua política.</p>`,
  },
  {
    id: 'site',
    title: 'O site',
    html: `
<h4 id="site-tecnologias">3.1 O que o site faz, e o que não faz</h4>
<p>O site é formado por páginas estáticas. Não tem cadastro, área restrita, formulário, comentários nem banco de dados de visitantes. A tabela descreve a situação em ${updated}; ela é gerada a partir da configuração do próprio site, e por isso acompanha qualquer mudança.</p>
<div class="table-wrap" tabindex="0" role="group" aria-label="Tabela: tecnologias em uso no site"><table>
  <caption>Tecnologias em uso em renatotavares.com</caption>
  <thead><tr><th scope="col">Tecnologia</th><th scope="col">Em uso?</th><th scope="col">Detalhe</th></tr></thead>
  <tbody>
    <tr><th scope="row">Cookies próprios</th><td>${no}</td><td>O site não grava nenhum cookie.</td></tr>
    <tr><th scope="row">Armazenamento local do navegador</th><td>${yes}, um item</td><td>A chave <code>theme</code>, com o valor “light” ou “dark”. Só é gravada se você clicar no botão de tema, fica no seu navegador, não é enviada a nenhum servidor e não identifica você. Para apagá-la, limpe os dados do site no navegador.</td></tr>
    <tr><th scope="row">Publicidade (Google AdSense)</th><td>${ads ? yes : no}</td><td>${ads ? 'Ver a seção 3.5. Esta página de documentos legais nunca exibe anúncios.' : 'O site não exibe anúncios e não carrega nenhum código de publicidade. Ver a seção 3.5 sobre o que mudaria se isso fosse ativado.'}</td></tr>
    <tr><th scope="row">Análise de audiência (Google Analytics ou similar)</th><td>${site.analytics.enabled ? yes : no}</td><td>${site.analytics.enabled ? 'Ver a seção 3.5.' : 'Não há nenhuma ferramenta de medição de audiência instalada.'}</td></tr>
    <tr><th scope="row">Fontes, scripts, vídeos ou imagens de terceiros</th><td>${ads ? 'Só os de publicidade' : no}</td><td>As fontes tipográficas, as folhas de estilo, os scripts e as imagens são servidos do próprio domínio. Abrir uma página não faz o seu navegador contatar ${ads ? 'outros servidores além dos de publicidade descritos na seção 3.5' : 'nenhum outro servidor'}.</td></tr>
    <tr><th scope="row">Formulários e cadastro</th><td>${no}</td><td>O contato é feito por e-mail (seção 3.3).</td></tr>
  </tbody>
</table></div>
${ads ? '' : '<p>Como o site não usa nenhuma tecnologia não essencial, ele não exibe aviso de cookies nem pede consentimento: não há o que consentir.</p>'}

<h4 id="site-registros">3.2 Registros do servidor</h4>
<p>O site é hospedado pela <strong>${site.hosting.provider}</strong>. Como todo servidor web, o da hospedagem recebe, a cada página pedida, o endereço IP de quem pede, a data e a hora, o endereço da página, a página de origem e a identificação do navegador, e pode registrá-los para manter o serviço funcionando e protegê-lo contra abusos e ataques.</p>
<p>Eu não uso esses registros para identificar visitantes, não os cruzo com outras informações e não monto perfis de navegação. A guarda e o prazo de retenção desses registros são definidos pela hospedagem, que atua como operadora nessa atividade; os detalhes estão na <a href="${site.hosting.providerPolicy}">política de privacidade da ${site.hosting.provider}</a>.</p>

<h4 id="site-email">3.3 Quando você me escreve</h4>
<p>Se você me enviar um e-mail, recebo o seu nome, o seu endereço de e-mail e o que você escrever. Uso essas informações para responder e dar seguimento ao assunto. As mensagens ficam na minha caixa de correio, mantida pelo Google (Gmail), e são guardadas por até dois anos depois do último contato, salvo quando houver razão legal para guardá-las por mais tempo ou você pedir que sejam apagadas antes.</p>

<h4 id="site-links">3.4 Links para fora</h4>
<p>O site aponta para repositórios, artigos e perfis em outros serviços. Ao seguir um desses links, você passa a estar sob a política do serviço de destino. Links externos em páginas de texto são marcados com o sinal ↗.</p>

<h4 id="site-publicidade">3.5 Publicidade e medição de audiência no site</h4>
${ads
    ? `<p><strong>Situação em ${updated}: a publicidade do Google AdSense está ativa</strong> nas páginas de conteúdo. Esta página de documentos legais, a página de contato e a página de erro não exibem anúncios.</p>`
    : `<p><strong>Situação em ${updated}: não há publicidade nem medição de audiência no site.</strong> Nenhum código do Google AdSense, do Google Analytics ou de serviço equivalente é carregado.</p>
<p>Descrevo a seguir o que valeria se eu decidisse exibir anúncios do Google AdSense, porque a possibilidade existe e porque prefiro que as regras estejam escritas antes. Se isso acontecer, a tabela da seção 3.1 e a data deste documento serão atualizadas antes de qualquer anúncio ir ao ar.</p>`}
<ul>
  <li><strong>Cookies de publicidade.</strong> Fornecedores terceirizados, entre eles o Google, usam cookies, web beacons, endereços IP e outros identificadores para veicular anúncios com base em visitas anteriores do usuário a este e a outros sites. Os cookies de publicidade do Google, conhecidos antigamente como cookies DoubleClick, permitem a ele e a seus parceiros veicular anúncios com base nessas visitas.</li>
  <li><strong>Anúncios personalizados e não personalizados.</strong> Anúncios personalizados usam o histórico de interesses; os não personalizados usam o contexto da página e a localização aproximada, mas ainda dependem de cookies ou identificadores para limitar repetições, medir resultados e combater fraude.</li>
  <li><strong>Consentimento antes de qualquer anúncio.</strong> Nenhum anúncio é pedido antes da sua escolha. Fora da Europa, inclusive no Brasil, nenhum código do Google é sequer carregado antes dela: o site apresenta as opções de recusar, aceitar ou personalizar, com o mesmo destaque, e recusar significa não carregar anúncios. No Espaço Econômico Europeu, no Reino Unido e na Suíça, a escolha é feita na mensagem de uma plataforma de gerenciamento de consentimento certificada pelo Google e integrada ao padrão TCF da IAB, como o Google exige; ali o código do AdSense é carregado em pausa, só para apresentar essa mensagem, que lista os parceiros que podem receber dados.</li>
  <li><strong>Mudar de ideia.</strong> A escolha pode ser revista a qualquer momento pelo link “Preferências de privacidade”, no rodapé de todas as páginas que tiverem anúncios.</li>
  <li><strong>Outros controles.</strong> Você pode desativar a publicidade personalizada do Google nas <a href="https://adssettings.google.com/">Configurações de anúncios</a> e a de outros fornecedores em <a href="https://www.aboutads.info/choices/">aboutads.info</a>. O Google explica o tratamento que faz em <a href="https://policies.google.com/technologies/partner-sites">Como o Google usa informações de sites ou apps que usam os serviços dele</a>.</li>
  <li><strong>Medição de audiência.</strong> Se uma ferramenta como o Google Analytics vier a ser usada, ela só será carregada com o seu consentimento, pelo mesmo mecanismo.</li>
</ul>`,
  },
  {
    id: 'aplicativos',
    title: 'Os aplicativos Android',
    html: `
<p>Esta seção descreve o comportamento de cada aplicativo como ele é, conferido no código-fonte e no pacote publicado em ${dataLonga(auditedAt)}. Os aplicativos não são todos iguais: ${noAdApps.length} deles não têm anúncios nem acesso à internet, e ${adApps.length} exibem anúncios.</p>

<h4 id="apps-geral">4.1 O que vale para todos</h4>
<ul>
  <li><strong>Sem cadastro e sem servidor meu.</strong> Nenhum aplicativo tem conta, login ou sincronização com servidor mantido por mim. Eu não recebo o que você digita neles.</li>
  <li><strong>Sem ferramentas de análise ou de relatório de falhas.</strong> Nenhum aplicativo inclui Firebase Analytics, Crashlytics ou bibliotecas equivalentes.</li>
  <li><strong>Dados no armazenamento privado do aplicativo.</strong> O que cada aplicativo grava fica na área reservada a ele pelo Android, inacessível a outros aplicativos.</li>
  <li><strong>Backup do Android.</strong> A maioria dos aplicativos participa do backup automático do sistema. Com o backup ativado no aparelho, o Android pode guardar uma cópia dos dados do aplicativo na sua conta Google e restaurá-la em um aparelho novo. Essa cópia é feita pelo sistema e fica sob a sua conta; eu não tenho acesso a ela. Você pode desativar o backup nas configurações do aparelho (em geral, <em>Configurações → Google → Backup</em>) e apagar cópias antigas na sua conta Google.</li>
  <li><strong>Compartilhamento.</strong> Quando você usa a função de compartilhar ou exportar, o conteúdo é entregue ao aplicativo que você escolher, e passa a valer a política dele.</li>
  <li><strong>Permissões.</strong> Nenhum aplicativo pede acesso a localização, câmera, microfone, contatos ou arquivos. Os que exibem anúncios declaram as permissões de internet e de identificador de publicidade, além das permissões auxiliares que o SDK de anúncios do Google acrescenta.</li>
</ul>

<h4 id="apps-anuncios">4.2 Aplicativos com anúncios (Google AdMob)</h4>
<p>${names(adApps)} exibem anúncios fornecidos pelo <strong>Google AdMob</strong>, por meio do SDK de anúncios do Google incluído no aplicativo. Segundo a documentação do próprio Google, esse SDK coleta e compartilha automaticamente com o Google, para publicidade, análise e prevenção a fraudes:</p>
<ul>
  <li>o <strong>endereço IP</strong>, que pode ser usado para estimar a localização aproximada do aparelho;</li>
  <li><strong>interações</strong> com o aplicativo e com os anúncios, como abertura do aplicativo, toques e visualizações;</li>
  <li><strong>dados de diagnóstico</strong>, como tempo de abertura, travamentos e consumo de energia;</li>
  <li><strong>identificadores</strong> do aparelho e da conta: o identificador de publicidade do Android, o identificador de conjunto de aplicativos (App Set ID) e, quando for o caso, identificadores ligados às contas conectadas no aparelho.</li>
</ul>
<p>Esses dados trafegam criptografados (TLS). O Google os trata como controlador independente, de acordo com a <a href="https://policies.google.com/privacy">política de privacidade dele</a> e com o que descreve em <a href="https://policies.google.com/technologies/partner-sites">Como o Google usa informações de sites ou apps que usam os serviços dele</a>. Eu não recebo esses dados individualizados; vejo apenas relatórios agregados de desempenho dos anúncios.</p>
<p>O que você digita nos aplicativos, como dados de nascimento, jogos e favoritos, <strong>não é repassado ao sistema de anúncios</strong>: os pedidos de anúncio não levam nenhuma informação fornecida por você ao aplicativo.</p>
<p>Os anúncios podem ser personalizados, com base no perfil de interesses que o Google associa ao identificador de publicidade, ou não personalizados, com base no contexto e na localização aproximada. Recusar a personalização não remove os anúncios.</p>

<h4 id="apps-controles">4.3 Como controlar os anúncios nos aplicativos</h4>
<ul>
  <li><strong>No aparelho.</strong> Em <em>Configurações → Google → Todos os serviços → Anúncios</em> (ou <em>Configurações → Privacidade → Anúncios</em>, conforme a versão do Android), você pode <strong>excluir</strong> ou <strong>redefinir</strong> o identificador de publicidade. Depois de excluído, os aplicativos deixam de recebê-lo.</li>
  <li><strong>Na sua conta Google.</strong> Em <a href="https://adssettings.google.com/">Configurações de anúncios</a> você desativa a personalização.</li>
  <li><strong>No aplicativo.</strong> Onde houver mensagem de consentimento, a escolha é feita nela; a ficha de cada aplicativo, na seção 4.5, diz se ela existe.</li>
  <li><strong>Sem anúncios.</strong> Usar o aparelho sem conexão impede o carregamento de anúncios e não prejudica o funcionamento dos aplicativos.</li>
</ul>

<h4 id="apps-sem-rede">4.4 Aplicativos sem anúncios e sem internet</h4>
<p>${names(noAdApps)} não declaram a permissão de acesso à internet. O sistema operacional impede esses aplicativos de abrir qualquer conexão; eles não têm anúncios, não enviam nem recebem dados e funcionam inteiramente no aparelho.</p>

<h4 id="apps-fichas">4.5 Ficha de cada aplicativo</h4>
${apps.map(appCard).join('\n')}

<h4 id="apps-play">4.6 Google Play</h4>
<p>A instalação e a atualização dos aplicativos são feitas pelo Google Play, que trata dados da sua conta e do seu aparelho segundo a política do Google. As estatísticas de instalação que o Google Play me mostra são agregadas. Se o que está escrito aqui divergir do que você observar em um aplicativo ou da seção “Segurança dos dados” da ficha dele na loja, me avise pelo e-mail ${mail}.</p>`,
  },
  {
    id: 'finalidades',
    title: 'Para que os dados são usados e com que base legal',
    html: `
<div class="table-wrap" tabindex="0" role="group" aria-label="Tabela: finalidades e bases legais"><table>
  <caption>Finalidades e bases legais (LGPD, art. 7º)</caption>
  <thead><tr><th scope="col">Atividade</th><th scope="col">Dados</th><th scope="col">Finalidade</th><th scope="col">Base legal</th></tr></thead>
  <tbody>
    <tr><th scope="row">Responder a quem me escreve</th><td>Nome, e-mail, conteúdo da mensagem</td><td>Atender ao contato e dar seguimento a ele</td><td>Legítimo interesse (art. 7º, IX); procedimentos preliminares a contrato, a pedido do titular, quando for o caso (art. 7º, V)</td></tr>
    <tr><th scope="row">Manter o site no ar e seguro</th><td>Registros do servidor de hospedagem</td><td>Operação, diagnóstico e proteção contra abusos</td><td>Legítimo interesse (art. 7º, IX)</td></tr>
    <tr><th scope="row">Lembrar o tema claro ou escuro</th><td>Preferência gravada no seu navegador</td><td>Funcionalidade pedida por você</td><td>Não há tratamento por mim: o dado não sai do navegador</td></tr>
    <tr><th scope="row">Anúncios personalizados nos aplicativos</th><td>Identificador de publicidade e dados coletados pelo SDK do Google</td><td>Veicular anúncios de acordo com interesses</td><td>Consentimento (art. 7º, I), manifestado na mensagem do aplicativo, quando exibida, e nas configurações de anúncios do aparelho, e revogável a qualquer momento</td></tr>
    <tr><th scope="row">Anúncios não personalizados, medição e prevenção a fraudes nos aplicativos</th><td>IP, interações, diagnóstico, identificadores</td><td>Manter os aplicativos gratuitos, limitar repetições, medir e evitar fraude</td><td>Legítimo interesse (art. 7º, IX), com direito de oposição pelos controles da seção 4.3</td></tr>
    <tr><th scope="row">Cumprir a lei</th><td>Os estritamente necessários</td><td>Atender a ordem judicial ou obrigação legal</td><td>Cumprimento de obrigação legal ou regulatória (art. 7º, II)</td></tr>
  </tbody>
</table></div>
<p>Não tomo decisões automatizadas que afetem os seus interesses. A seleção dos anúncios exibidos nos aplicativos é feita pelos sistemas do Google.</p>`,
  },
  {
    id: 'compartilhamento',
    title: 'Com quem os dados são compartilhados',
    html: `
<p>Não vendo, não alugo e não cedo dados pessoais a ninguém. Os terceiros envolvidos são estes:</p>
<ul>
  <li><strong>Google</strong> (Google LLC e empresas do grupo): como fornecedor dos anúncios nos aplicativos (AdMob), da loja (Google Play), do backup do Android e da minha caixa de e-mail (Gmail).</li>
  <li><strong>${site.hosting.provider}</strong>: como provedor de hospedagem do site.</li>
  <li><strong>Serviço de resultados de loterias</strong> (<code>loteriascaixa-api.herokuapp.com</code>): consultado pelo aplicativo Gerador Números para Loterias, que lhe envia apenas o nome da loteria e o número do concurso.</li>
  <li><strong>Autoridades</strong>: quando houver ordem judicial ou obrigação legal.</li>
</ul>
<p>Em alguns estados dos Estados Unidos, o uso de identificadores por parceiros de publicidade para anúncios personalizados é chamado de “compartilhamento” ou “publicidade direcionada”, mesmo sem pagamento em troca. Se você mora em um deles, os controles da seção 4.3 servem para recusá-lo.</p>`,
  },
  {
    id: 'transferencias',
    title: 'Transferências internacionais',
    html: `
<p>O Google trata dados nos Estados Unidos e em outros países em que mantém infraestrutura. Boa parte dos dados de publicidade é coletada pelo Google diretamente do seu aparelho. A ${site.hosting.provider} tem empresas na União Europeia e servidores em vários países.</p>
<p>Para os países da União Europeia e do Espaço Econômico Europeu, a Agência Nacional de Proteção de Dados reconheceu nível adequado de proteção (Resolução nº 32, de 26 de janeiro de 2026). Para os demais países, incluídos os Estados Unidos, não há decisão de adequação brasileira; os tratamentos se apoiam nas garantias contratuais e nas políticas desses fornecedores e, no caso da publicidade personalizada, no seu consentimento. Se você quiser mais informações sobre essas garantias, peça pelo e-mail ${mail}.</p>`,
  },
  {
    id: 'retencao',
    title: 'Por quanto tempo os dados são guardados',
    html: `
<ul>
  <li><strong>E-mails:</strong> até dois anos depois do último contato, ou até você pedir a exclusão.</li>
  <li><strong>Registros do servidor:</strong> pelo prazo definido pela hospedagem.</li>
  <li><strong>Preferência de tema:</strong> até você limpar os dados do site no navegador.</li>
  <li><strong>Dados gravados pelos aplicativos:</strong> até você apagá-los, limpar os dados do aplicativo ou desinstalá-lo. Cópias de backup seguem as regras da sua conta Google.</li>
  <li><strong>Dados tratados pelo Google para publicidade:</strong> pelos prazos da política do Google. Excluir o identificador de publicidade desvincula o aparelho do histórico associado a ele.</li>
</ul>`,
  },
  {
    id: 'seguranca',
    title: 'Segurança',
    html: `
<p>O site é servido por conexão criptografada (HTTPS), é composto de páginas estáticas e não mantém banco de dados de visitantes, o que reduz muito o que poderia ser exposto. Os aplicativos gravam dados apenas na área privada que o Android reserva a cada um, e os que não têm permissão de internet não podem transmiti-los.</p>
<p>Nenhuma medida elimina todo o risco. Se ocorrer um incidente de segurança que possa trazer risco ou dano relevante a titulares de dados, a comunicação à ANPD e aos afetados será feita nos termos do art. 48 da LGPD e da Resolução CD/ANPD nº 15/2024. Se você encontrar uma vulnerabilidade, escreva para ${mail}.</p>`,
  },
  {
    id: 'direitos',
    title: 'Seus direitos e como exercê-los',
    html: `
<p>A LGPD (art. 18) garante a você, em relação aos seus dados pessoais:</p>
<ul>
  <li>a confirmação de que existe tratamento e o acesso aos dados;</li>
  <li>a correção de dados incompletos, inexatos ou desatualizados;</li>
  <li>a anonimização, o bloqueio ou a eliminação de dados desnecessários, excessivos ou tratados em desconformidade com a lei;</li>
  <li>a portabilidade;</li>
  <li>a eliminação dos dados tratados com o seu consentimento;</li>
  <li>a informação sobre com quem os dados foram compartilhados;</li>
  <li>a informação sobre a possibilidade de não consentir e sobre as consequências disso;</li>
  <li>a revogação do consentimento;</li>
  <li>a oposição a tratamento feito sem consentimento, quando houver descumprimento da lei;</li>
  <li>a revisão de decisões tomadas unicamente com base em tratamento automatizado (art. 20).</li>
</ul>
<h4 id="direitos-como">Como pedir</h4>
<p>Escreva para ${mail}, dizendo qual é o pedido e a que ele se refere (o site, uma troca de e-mails, um aplicativo). Não há custo. Posso pedir uma informação adicional para confirmar que o pedido vem do próprio titular.</p>
<p>A confirmação de existência de tratamento e o acesso em formato simplificado são respondidos de imediato; a declaração completa, em até 15 dias contados do pedido (art. 19). Para os demais pedidos, comprometo-me a responder também em até 15 dias.</p>
<h4 id="direitos-limites">O que está ao meu alcance</h4>
<p>Posso localizar, corrigir e apagar o que está comigo: as mensagens que trocamos. Não tenho acesso ao que os aplicativos gravam no seu aparelho nem às cópias de backup na sua conta; a ficha de cada aplicativo (seção 4.5) explica como apagá-los. Os dados tratados pelo Google para publicidade são controlados por você nas configurações da seção 4.3 e nos canais do próprio Google.</p>
<h4 id="direitos-anpd">Se você não ficar satisfeito</h4>
<p>Você pode apresentar petição à <a href="https://www.gov.br/anpd/pt-br">Agência Nacional de Proteção de Dados (ANPD)</a>, depois de ter procurado o controlador, e aos órgãos de defesa do consumidor.</p>`,
  },
  {
    id: 'outros-paises',
    title: 'Visitantes e usuários de outros países',
    html: `
<p>O site e os aplicativos são mantidos no Brasil, por uma pessoa domiciliada no Brasil, e esta política segue a lei brasileira. Os aplicativos são distribuídos pelo Google Play em outros países, e leis locais podem dar a você direitos adicionais, que respeito na medida em que forem aplicáveis.</p>
<ul>
  <li><strong>Espaço Econômico Europeu, Reino Unido e Suíça.</strong> Quando o Regulamento Geral de Proteção de Dados (GDPR), a lei britânica equivalente ou a lei suíça se aplicarem, você tem os direitos de acesso, retificação, apagamento, limitação do tratamento, oposição e portabilidade, pode retirar o consentimento a qualquer momento e pode reclamar à autoridade de proteção de dados do seu país. Não tenho estabelecimento nem representante designado nesses territórios; o contato é o e-mail ${mail}.</li>
  <li><strong>Estados Unidos.</strong> Não vendo dados pessoais. O site não rastreia visitantes entre sites e, por isso, não altera o seu comportamento diante dos sinais <em>Do Not Track</em> ou <em>Global Privacy Control</em> do navegador: não há rastreamento a desligar. Nos aplicativos com anúncios, o Google pode coletar informações ao longo do tempo e entre aplicativos diferentes, como descrito na seção 4.2.</li>
  <li><strong>Outros países.</strong> Os países em que os dados podem ser tratados e os fornecedores envolvidos estão nas seções 6 e 7.</li>
</ul>`,
  },
  {
    id: 'menores',
    title: 'Crianças e adolescentes',
    html: `
<p>O site tem conteúdo acadêmico e profissional, não é dirigido a crianças e não coleta dados de quem o visita.</p>
<p>Os aplicativos não têm cadastro, bate-papo, compras nem conteúdo gerado por usuários, e não pedem idade. O jogo que publico, o Sudoku Offline, não tem anúncios nem acesso à internet: nada do que acontece nele sai do aparelho. Eu não coleto, de propósito, dados pessoais de crianças ou adolescentes em nenhum aplicativo.</p>
<p>Nos aplicativos com anúncios, o tratamento de dados para publicidade é feito pelo Google. Segundo o Google, contas supervisionadas pelo Family Link e usuários que ele identifica como menores recebem tratamento restrito e não recebem anúncios personalizados. Pais e responsáveis podem, além disso, excluir o identificador de publicidade do aparelho (seção 4.3) e usar os controles parentais do Google Play.</p>
<p>Se você é pai, mãe ou responsável e acredita que um aplicativo meu tratou dados de uma criança ou de um adolescente de forma indevida, escreva para ${mail}.</p>`,
  },
  {
    id: 'alteracoes-politica',
    title: 'Alterações desta política',
    html: `
<p>Esta política muda quando muda o que o site ou os aplicativos fazem, ou quando a lei exige. A data e a versão no topo da página indicam a redação em vigor. Mudanças que alterem finalidades, compartilhamentos ou a identidade do controlador serão destacadas nesta página, e o uso de qualquer tecnologia que dependa de consentimento só começa depois de você ser consultado.</p>
<p>Histórico: versão 3.0, de ${updated}, reorganização completa do documento, com a descrição de cada aplicativo; 25 de agosto de 2026, inclusão do Google AdMob e dos aplicativos; 1º de abril de 2025, primeira versão. Versões anteriores podem ser pedidas por e-mail.</p>`,
  },
  {
    id: 'canal',
    title: 'Contato e canal de privacidade',
    html: `
<p>Para dúvidas sobre esta política, pedidos relativos aos seus dados ou reclamações, o canal é um só:</p>
<ul>
  <li><strong>Responsável:</strong> Renato Augusto Tavares</li>
  <li><strong>E-mail:</strong> ${mail}</li>
  <li><strong>Assunto sugerido:</strong> “Privacidade”, com o nome do aplicativo, se for o caso</li>
</ul>`,
  },
];

/* ----------------------------------------------------------------- PARTE II */
const terms = [
  {
    id: 't-aceitacao',
    title: 'O que são estes termos',
    html: `
<p>Estes Termos de Uso são as condições em que ofereço o site renatotavares.com e os aplicativos publicados no Google Play sob o nome “Renato Augusto Tavares”. Ao usar o site ou um aplicativo, você concorda em segui-las. Se não concordar, peço que não os use.</p>
<p>Estes termos não são um consentimento para tratamento de dados pessoais. O que acontece com os seus dados está na <a href="#privacidade">Política de Privacidade</a>, e os consentimentos, quando necessários, são pedidos separadamente.</p>`,
  },
  {
    id: 't-finalidade',
    title: 'Para que serve o site',
    html: `
<p>O site é uma página pessoal, de caráter acadêmico e profissional. Apresenta a minha trajetória, as minhas pesquisas, as minhas publicações e os meus projetos. O conteúdo é informativo.</p>
<p>Os trabalhos científicos apresentados são, salvo indicação em contrário, <em>preprints</em>: ainda não passaram por revisão por pares e podem conter erros. Nada no site é aconselhamento profissional, seja jurídico, financeiro, médico ou de engenharia.</p>`,
  },
  {
    id: 't-uso-permitido',
    title: 'O que você pode fazer',
    html: `
<ul>
  <li>Ler, imprimir e guardar cópias das páginas para uso pessoal, de estudo ou de pesquisa.</li>
  <li>Criar links para qualquer página do site.</li>
  <li>Citar trechos, com indicação de autoria e origem (seção 6).</li>
  <li>Baixar, usar e redistribuir os preprints e os códigos nos termos da licença indicada em cada repositório (seção 5).</li>
  <li>Entrar em contato para fins legítimos.</li>
</ul>`,
  },
  {
    id: 't-condutas',
    title: 'O que não é permitido',
    html: `
<ul>
  <li>Tentar derrubar, sobrecarregar ou invadir o site ou a sua hospedagem, ou contornar medidas de segurança.</li>
  <li>Usar meios automatizados de modo a prejudicar o funcionamento do site. Indexadores e leitores que respeitem o arquivo <code>robots.txt</code> e um ritmo razoável de acesso são bem-vindos.</li>
  <li>Apresentar como seu, ou como endossado por mim, conteúdo copiado do site, ou atribuir a mim afirmações que não fiz.</li>
  <li>Usar o site, os aplicativos ou os canais de contato para fins ilícitos, para enviar mensagens em massa não solicitadas ou para violar direitos de terceiros.</li>
  <li>Modificar, descompilar ou redistribuir os aplicativos fora do que a licença de cada um e a lei permitem.</li>
</ul>`,
  },
  {
    id: 't-propriedade',
    title: 'Propriedade intelectual e licenças',
    html: `
<ul>
  <li><strong>Textos, figuras e desenho deste site.</strong> São de minha autoria e protegidos pela Lei nº 9.610/1998. Todos os direitos são reservados, salvo indicação em contrário na própria página.</li>
  <li><strong>Preprints.</strong> Cada preprint segue a licença indicada no repositório em que foi depositado. Os depositados no Figshare estão sob Creative Commons Atribuição 4.0 (CC BY 4.0), que permite copiar, redistribuir e adaptar, inclusive para fins comerciais, desde que com atribuição.</li>
  <li><strong>Código e dados de pesquisa.</strong> Seguem a licença de cada repositório. Onde não houver licença declarada, valem as regras gerais de direito autoral.</li>
  <li><strong>Aplicativos.</strong> São licenciados para uso pessoal nos termos do Google Play e, quando houver, da licença indicada na ficha ou no repositório de cada aplicativo.</li>
  <li><strong>Fontes tipográficas.</strong> O site usa Source Serif 4, IBM Plex Sans e IBM Plex Mono, sob a SIL Open Font License 1.1.</li>
</ul>
<p>As licenças Creative Commons são irrevogáveis para as cópias já obtidas. Os direitos morais do autor permanecem em qualquer caso.</p>`,
  },
  {
    id: 't-citacoes',
    title: 'Citações acadêmicas',
    html: `
<p>Citar trechos deste site e dos trabalhos aqui apresentados, para fins de estudo, crítica ou polêmica, na medida justificada e com indicação do autor e da origem, é direito seu (Lei nº 9.610/1998, art. 46, III), e estes termos não o restringem.</p>
<p>Para citar um preprint, use a referência e o identificador persistente (DOI ou número do arXiv) indicados na <a href="/publicacoes/">página de cada publicação</a>, e mencione que se trata de preprint não revisado por pares.</p>`,
  },
  {
    id: 't-terceiros',
    title: 'Conteúdo, código e marcas de terceiros',
    html: `
<p>Os nomes e marcas citados no site e nos aplicativos, como Google, Google Play, Android, AdMob, arXiv, GitHub, ORCID e os nomes de instituições e empresas, pertencem aos seus titulares e aparecem apenas para identificação. Não há vínculo, patrocínio ou endosso além do que for dito expressamente.</p>
<p>Os aplicativos usam componentes e dados de terceiros sob as respectivas licenças. Em particular, o Mapa Astral Completo usa a biblioteca Swiss Ephemeris, da Astrodienst, e dados de cidades do <a href="https://www.geonames.org/">GeoNames</a>, sob CC BY 4.0. O Gerador Números para Loterias não é um produto da Caixa Econômica Federal nem tem relação com ela.</p>`,
  },
  {
    id: 't-links',
    title: 'Links externos',
    html: `<p>O site contém links para páginas que não controlo. Eles existem para dar acesso às fontes e aos materiais citados. Não respondo pelo conteúdo, pela disponibilidade nem pelas práticas de privacidade dessas páginas.</p>`,
  },
  {
    id: 't-aplicativos',
    title: 'Aplicativos',
    html: `
<p>Os aplicativos são gratuitos e distribuídos pelo Google Play, cujos <a href="https://play.google.com/about/play-terms/index.html">Termos de Serviço</a> também se aplicam. Alguns são mantidos por anúncios (seção 10).</p>
<ul>
  <li><strong>Conteúdo de entretenimento.</strong> O Mapa Astral Completo apresenta cálculos astronômicos e textos de interpretação astrológica tradicional, para fins de entretenimento e de estudo; não é orientação psicológica, médica, financeira ou de qualquer outra natureza.</li>
  <li><strong>Loterias.</strong> O Gerador Números para Loterias gera combinações e mostra estatísticas. Nenhuma estratégia aumenta a probabilidade de acerto em sorteios aleatórios; o aplicativo não registra apostas, não vende jogos e não garante prêmios. Confira sempre os resultados nos canais oficiais.</li>
  <li><strong>Material de estudo.</strong> O Simulado do Detran é material de apoio e não substitui o conteúdo oficial dos órgãos de trânsito nem o curso de formação de condutores.</li>
  <li><strong>Calculadoras.</strong> A Calculadora Financeira e o Markup fazem simulações com os números que você informa. Os resultados não são recomendação de investimento nem assessoria contábil ou tributária.</li>
</ul>`,
  },
  {
    id: 't-publicidade',
    title: 'Publicidade',
    html: `
<p>${ads ? 'O site exibe anúncios do Google AdSense nas páginas de conteúdo.' : 'O site não exibe publicidade.'} Alguns aplicativos exibem anúncios do Google AdMob. Os anúncios são escolhidos e fornecidos pelo Google e por seus anunciantes; não seleciono nem aprovo previamente cada anúncio, e a presença de um anúncio não significa que eu recomende o produto anunciado.</p>
<p>O tratamento de dados ligado à publicidade está na <a href="#aplicativos">Política de Privacidade</a>.</p>`,
  },
  {
    id: 't-disponibilidade',
    title: 'Disponibilidade',
    html: `<p>Procuro manter o site e os aplicativos disponíveis e atualizados, mas eles podem ficar fora do ar, ser alterados ou ser descontinuados, por manutenção, por decisão minha ou por fatores fora do meu controle. Os aplicativos guardam os dados no seu aparelho; faça cópias do que for importante para você.</p>`,
  },
  {
    id: 't-responsabilidade',
    title: 'Garantias e responsabilidade',
    html: `
<p>O conteúdo do site é preparado com cuidado, e ainda assim pode conter erros ou ficar desatualizado. Os resultados de pesquisa, em especial, são apresentados com a situação de cada um, e não devem ser tomados como estabelecidos antes de verificados de forma independente.</p>
<p>Na máxima extensão permitida pela legislação aplicável, não respondo por decisões tomadas com base no conteúdo informativo do site ou nos resultados dos aplicativos, nem por conteúdo, produtos ou práticas de terceiros.</p>
<p>Nada nestes termos exclui ou reduz responsabilidade que a lei não permite excluir ou reduzir, nem afasta os direitos que o Código de Defesa do Consumidor (Lei nº 8.078/1990) e outras normas de ordem pública asseguram a você. Onde houver relação de consumo, valem as regras desse código.</p>`,
  },
  {
    id: 't-alteracoes',
    title: 'Alterações destes termos',
    html: `<p>Estes termos podem ser atualizados. A nova redação passa a valer na data indicada no topo da página e se aplica dali em diante, nunca de forma retroativa. Mudanças relevantes serão destacadas nesta página.</p>`,
  },
  {
    id: 't-lei',
    title: 'Lei aplicável e solução de conflitos',
    html: `
<p>Estes termos são regidos pelas leis da República Federativa do Brasil. Se houver um problema, escreva antes para ${mail}: a maior parte das questões se resolve assim.</p>
<p>Para as questões que precisarem ir a juízo, fica eleito o foro da comarca de Goiânia, Goiás, onde tenho domicílio. Essa escolha <strong>não se aplica ao consumidor</strong>, que pode propor a ação no foro do seu próprio domicílio (Código de Defesa do Consumidor, art. 101, I), nem afasta outras regras de competência que a lei não permite alterar. Estes termos não impõem arbitragem.</p>`,
  },
  {
    id: 't-contato',
    title: 'Contato e notificações',
    html: `
<p>Dúvidas sobre estes termos, pedidos de correção e notificações, inclusive sobre conteúdo que você considere ilícito ou que viole direitos seus, devem ser enviados para ${mail}, com a indicação precisa da página ou do aplicativo e do motivo. Respondo a todas.</p>
<ul>
  <li><strong>Responsável:</strong> Renato Augusto Tavares</li>
  <li><strong>Domicílio:</strong> Goiânia, Goiás, Brasil</li>
  <li><strong>E-mail:</strong> ${mail}</li>
</ul>`,
  },
];

/* ------------------------------------------------------------------ montagem */
const numbered = (list) => list.map((s, i) => `<h3 id="${s.id}"><span class="n">${i + 1}</span>${s.title}</h3>${s.html}`).join('\n');
const tocPart = (href, label, list) => `<li class="toc-part"><a href="${href}">${label}</a><ol>${list.map((s, i) => `<li><a href="#${s.id}">${i + 1}. ${s.title}</a></li>`).join('')}</ol></li>`;

const body = `<header class="page-head is-article"><div class="wrap grid">
  <nav class="crumbs" aria-label="Você está em"><ol><li><a href="/">Voltar ao site</a></li><li aria-current="page">Documentos legais</li></ol></nav>
  <h1>Política de Privacidade e Termos de Uso</h1>
  <p class="lede">Como o site renatotavares.com e os aplicativos Android que publico tratam dados pessoais, e em que condições eles são oferecidos.</p>
</div></header>
<div class="article legal"><div class="wrap grid">
  <aside class="article-side">
    <dl class="kv">
      <dt>Responsável</dt><dd>Renato Augusto Tavares</dd>
      <dt>Última atualização</dt><dd><time datetime="${site.legalUpdated}">${updated}</time></dd>
      <dt>Versão</dt><dd>${site.legalVersion}</dd>
      <dt>Contato</dt><dd>${mail}</dd>
    </dl>
    <h2 id="toc-h">Neste documento</h2>
    <nav class="toc" aria-labelledby="toc-h"><ol>
      <li><a href="#resumo">Resumo</a></li>
      ${tocPart('#privacidade', 'Parte I. Política de Privacidade', privacy)}
      ${tocPart('#termos', 'Parte II. Termos de Uso', terms)}
      <li class="toc-part"><a href="#fontes">Normas e fontes</a></li>
    </ol></nav>
  </aside>
  <div class="article-main">
    <section class="summary" id="resumo" aria-labelledby="resumo-h">
      <h2 id="resumo-h">Resumo, em linguagem direta</h2>
      <div class="prose"><ul>
        <li>${ads ? 'O site exibe anúncios do Google AdSense, que só são carregados depois da sua escolha.' : 'O site não usa cookies, não exibe anúncios, não mede audiência e não carrega nada de outros servidores.'} Ele guarda no seu navegador apenas a preferência de tema claro ou escuro.</li>
        <li>Não há cadastro nem formulário. Se você me escrever, uso o seu e-mail para responder.</li>
        <li>Os aplicativos não têm cadastro nem servidor meu. O que você digita fica no aparelho e, se o backup do Android estiver ativado, na cópia de segurança da sua própria conta.</li>
        <li>${adApps.length} dos ${apps.length} aplicativos exibem anúncios do Google AdMob. Neles, o Google trata identificadores e dados do aparelho; o que você digita não é repassado.</li>
        <li>Para qualquer pedido sobre os seus dados, escreva para ${mail}.</li>
      </ul></div>
      <p class="updated">Este resumo não substitui o texto completo abaixo.</p>
    </section>

    <section class="part" id="privacidade" aria-labelledby="privacidade-h">
      <div class="prose">
        <h2 id="privacidade-h">Parte I. Política de Privacidade</h2>
        <p class="updated">Versão ${site.legalVersion}, em vigor desde ${updated}.</p>
        ${numbered(privacy)}
      </div>
    </section>

    <section class="part" id="termos" aria-labelledby="termos-h">
      <div class="prose">
        <h2 id="termos-h">Parte II. Termos de Uso</h2>
        <p class="updated">Versão ${site.legalVersion}, em vigor desde ${updated}.</p>
        ${numbered(terms)}
      </div>
    </section>

    <section class="part" id="fontes" aria-labelledby="fontes-h">
      <div class="prose">
        <h2 id="fontes-h">Normas e fontes</h2>
        <p>Este documento foi redigido com base nos textos oficiais abaixo, consultados em ${updated}.</p>
        <ul>
          <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm">Lei nº 13.709/2018</a>, Lei Geral de Proteção de Dados Pessoais (LGPD).</li>
          <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm">Lei nº 12.965/2014</a>, Marco Civil da Internet, e <a href="https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2016/decreto/d8771.htm">Decreto nº 8.771/2016</a>.</li>
          <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm">Lei nº 8.078/1990</a>, Código de Defesa do Consumidor.</li>
          <li><a href="https://www.planalto.gov.br/ccivil_03/leis/l9610.htm">Lei nº 9.610/1998</a>, direitos autorais.</li>
          <li><a href="https://www.planalto.gov.br/ccivil_03/_ato2023-2026/2025/lei/L15211.htm">Lei nº 15.211/2025</a>, proteção de crianças e adolescentes em ambientes digitais.</li>
          <li>Agência Nacional de Proteção de Dados: <a href="https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia_orientativo_cookies_e_protecao_de_dados_pessoais">Guia orientativo sobre cookies</a> e Resoluções CD/ANPD nº 2/2022, nº 15/2024, nº 19/2024 e nº 32/2026.</li>
          <li><a href="https://eur-lex.europa.eu/legal-content/PT/TXT/?uri=CELEX:32016R0679">Regulamento (UE) 2016/679</a> (GDPR).</li>
          <li>Google: <a href="https://support.google.com/adsense/answer/1348695?hl=pt-BR">conteúdo obrigatório da política de privacidade (AdSense)</a>, <a href="https://www.google.com/about/company/user-consent-policy/">política de consentimento de usuários da União Europeia</a>, <a href="https://developers.google.com/admob/android/privacy/play-data-disclosure">dados tratados pelo SDK de anúncios (AdMob)</a> e <a href="https://support.google.com/googleplay/android-developer/answer/10144311?hl=pt-BR">política de dados do usuário do Google Play</a>.</li>
        </ul>
      </div>
    </section>
    <nav class="pager" aria-label="Retorno"><a href="/"><span>Voltar</span>Página inicial do site</a><a href="/contato/"><span>Dúvidas</span>Contato</a></nav>
  </div>
</div></div>`;

export default {
  path: '/termos.html',
  title: 'Política de Privacidade e Termos de Uso',
  description: 'Política de Privacidade e Termos de Uso do site renatotavares.com e dos aplicativos Android publicados por Renato Augusto Tavares no Google Play: dados tratados, publicidade, direitos dos titulares e condições de uso.',
  noAds: true,
  modified: site.legalUpdated,
  jsonld: [crumbsLd([HOME, { href: '/termos.html', label: 'Política de Privacidade e Termos de Uso' }])],
  body,
};
