# renatotavares.com

Site pessoal de Renato Augusto Tavares. HTML, CSS e JavaScript puros, gerados por
um script Node **sem dependências**. Não há framework, bundler nem `node_modules`.

## Como funciona

```
src/                      código-fonte (não é servido: bloqueado no .htaccess)
  site.config.mjs         fatos sobre o site: URL, perfis, publicidade, data do texto legal
  data/                   conteúdo estruturado
    publications.mjs        preprints (título, identificadores, resumo, BibTeX)
    apps.mjs                aplicativos Android e o que cada um faz com dados
    career.mjs              experiência, formação, ferramentas
    rag-recall.mjs          dados do gráfico do projeto de RAG
    computed/H.json         curva da correção H (gerada por tools/compute_H.py)
  pages/                  uma ou mais páginas por arquivo
  lib/                    layout, componentes, figuras (SVG) e conversor TeX → MathML
  styles/site.css         folha de estilos única
  scripts/site.js         tema, menu, interação da árvore, copiar citação
  scripts/consent.js      consentimento para anúncios (só publicado com ads.enabled)
  tools/compute_H.py      recalcula H.json (requer mpmath)
  build.mjs               gerador + validações

(raiz)                    saída do gerador = raiz pública do site
  index.html, termos.html, 404.html, pesquisa/, publicacoes/, projetos/,
  trajetoria/, sobre/, contato/, en/, assets/, sitemap.xml, robots.txt
  app-ads.txt             verificação do AdMob — NÃO remover nem mover
  .htaccess               bloqueios, 404, cache, cabeçalhos
```

## Editar e gerar

```sh
node src/build.mjs                              # gera tudo e valida
python3 -m http.server 8080 --bind 127.0.0.1    # pré-visualiza em http://127.0.0.1:8080
```

A geração falha, sem publicar nada pela metade, se encontrar: link interno ou
âncora quebrados, página sem `<h1>` único, fórmula não convertida, recurso
carregado de outro domínio com a publicidade desligada, tag de anúncio em
`termos.html`, ou divergência entre a tabela de `j*(ℓ)` e a definição recalculada.

Os arquivos HTML da raiz são **gerados**: edite sempre em `src/` e gere de novo.
Arquivos que deixam de ser gerados são removidos pela própria geração
(`src/.build-manifest.json` guarda a lista).

### Tarefas comuns

| Quero…                               | Edito…                                                    |
|--------------------------------------|-----------------------------------------------------------|
| acrescentar um preprint              | `src/data/publications.mjs` (a página e o feed saem daí)  |
| publicar ou atualizar um aplicativo  | `src/data/apps.mjs` **e** a data em `site.config.mjs`     |
| mudar um texto                       | o arquivo correspondente em `src/pages/`                  |
| mudar cargo, formação, ferramentas   | `src/data/career.mjs`                                     |
| mudar o texto legal                  | `src/pages/80-termos.mjs` + `legalUpdated`/`legalVersion` |

Fórmulas são escritas em TeX entre `$…$` (em linha) ou `$$…$$` (destaque) e
convertidas para MathML na geração. Para um cifrão literal, use `&#36;`.

## Publicar

A Hostinger publica o **repositório inteiro** na raiz do site a cada push em
`main`. Consequências:

1. Tudo o que for versionado fica público, salvo o que o `.htaccess` bloqueia.
   Relatórios e anotações ficam em `_relatorios/`, que está no `.gitignore`.
2. O HTML gerado precisa estar commitado. Rode `node src/build.mjs` antes do commit.

```sh
node src/build.mjs && git add -A && git commit -m "…" && git push origin main
```

Depois do primeiro deploy desta versão, confira:

```sh
curl -sI https://renatotavares.com/src/build.mjs   | head -1   # deve ser 404
curl -sI https://renatotavares.com/README.md       | head -1   # deve ser 404
curl -sI https://renatotavares.com/CLAUDE.md       | head -1   # deve ser 404
curl -sI https://renatotavares.com/nao-existe      | head -1   # 404, com a página do site
curl -s  https://renatotavares.com/app-ads.txt                 # a linha do AdMob, intacta
curl -sI https://renatotavares.com/termos.html     | head -1   # 200
```

Se algum dos três primeiros responder 200, o `.htaccess` não está sendo aplicado
pela hospedagem: avise o suporte antes de seguir.

## Publicidade e consentimento

Hoje o site **não** carrega anúncios, análise de audiência nem qualquer recurso de
terceiros (`ads.enabled: false`). Por isso não existe aviso de cookies: não há nada
não essencial a consentir. A Política de Privacidade lê esse mesmo valor e descreve
o estado real.

Para ativar o Google AdSense, **nesta ordem**:

1. Tenha a conta do AdSense aprovada para o domínio e anote o código `ca-pub-…`.
2. No painel do AdSense, em *Privacidade e mensagens*, crie e **publique** a
   mensagem de regulamentações europeias (CMP certificada do Google, TCF),
   informando `https://renatotavares.com/termos.html` como URL da política.
   Sem isso, nenhum anúncio aparece no EEE, Reino Unido e Suíça (é o comportamento
   seguro, e é o que o código faz).
3. Crie `ads.txt` na raiz com a linha fornecida pelo AdSense
   (`google.com, pub-…, DIRECT, f08c47fec0942fa0`). Não mexa no `app-ads.txt`.
4. Em `src/site.config.mjs`: `ads.enabled = true`, `ads.client = 'ca-pub-…'`,
   e atualize `legalUpdated`/`legalVersion`.
5. `node src/build.mjs`. O texto legal muda sozinho para o estado "ativo", o link
   "Preferências de privacidade" aparece no rodapé e `assets/js/consent.js` passa a
   ser publicado. `termos.html`, `404.html` e `/contato/` nunca recebem a tag.

O que `consent.js` faz está documentado no cabeçalho do arquivo. Resumo: fora da
Europa nada do Google é carregado antes da escolha (Recusar, Aceitar, Personalizar);
na Europa a tag é carregada em pausa e quem pergunta é a CMP do Google.

Teste local do mecanismo, sem tocar no site real:

```sh
SITE_ADS_TEST=1 node src/build.mjs   # NÃO commitar o resultado; rode `node src/build.mjs` depois
```

## Regras que não devem ser quebradas

- `/termos.html`, com as âncoras `#privacidade` e `#termos`, é referenciada pelas
  fichas dos aplicativos no Google Play. Não renomear.
- `app-ads.txt` fica na raiz, inalterado.
- A página legal nunca hospeda tags de anúncio ou de consentimento.
- Nada de fontes, scripts ou imagens servidos de outros domínios.
- Nenhuma afirmação sobre pesquisa sem marcar a situação (demonstrado,
  condicional, evidência computacional, conjectura, em aberto).
