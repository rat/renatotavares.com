---
name: Contexto do projeto renatotavares.com
description: Stack, estrutura de arquivos, seções, repositório e estado atual do site
type: project
---

Site pessoal completo de Renato Augusto Tavares. HTML/CSS/JS puro, sem frameworks.

**Why:** Site institucional/portfólio para apresentação profissional e acadêmica.
**How to apply:** Qualquer alteração deve seguir o stack vanilla (sem React/Vue/etc).

## Arquivos

| Arquivo | Conteúdo |
|---------|----------|
| `index.html` | Landing page completa (7 seções + footer) |
| `styles.css` | Design system com CSS variables, tema claro/escuro |
| `script.js` | Tema, reveal, skill bars, navbar, menu mobile |
| `termos.html` | Política de Privacidade + Termos de Uso |
| `CLAUDE.md` | Documentação do projeto para Claude Code |

## Repositório

- Remote: `git@github.com:rat/renatotavares.com.git`
- Branch: `main`
- Commits: 4 (inicial + fonte + experiência + fonte revertida)

## Seções da landing page

1. Hero — nome, título, badge de disponibilidade, card flutuante
2. Sobre mim — bio + stats (20+, 4, 25+, ∞)
3. Áreas de atuação — 7 cards com ícones SVG inline
4. Tecnologias — 3 colunas com barras animadas via IntersectionObserver
5. Projetos — 6 cards fictícios com estrutura real
6. Experiência — timeline com 4 cargos (border-left colorida)
7. Contato — email, LinkedIn, GitHub
8. Footer — links para termos.html

## Estado atual

- Site funcional e no GitHub
- Fonte: Inter (aprovada)
- Syne foi testada e rejeitada pelo usuário (difícil de ler)
