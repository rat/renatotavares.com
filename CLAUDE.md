# renatotavares.com — Contexto do Projeto

Site pessoal de **Renato Augusto Tavares** — Engenheiro de Software, pesquisador de IA e sistemas embarcados.

## Stack Técnico

- **Apenas:** HTML5 + CSS3 + JavaScript vanilla (sem frameworks)
- **Fontes:** Inter (via Google Fonts) + JetBrains Mono
- **4 arquivos:**
  - `index.html` — landing page completa
  - `styles.css` — design system com CSS variables para tema claro/escuro
  - `script.js` — IntersectionObserver (reveal + skill bars), tema, hamburger, smooth scroll
  - `termos.html` — Política de Privacidade + Termos de Uso (LGPD + AdSense + Google Play)

## Design System

```
Primária:  #6366f1 (Indigo 500)
Gradiente: linear-gradient(135deg, #6366f1, #8b5cf6)
Fundo luz: #fafafa / #f1f5f9
Fundo dark: #080810 / #0f0f18
```

Tema controlado por `data-theme="light|dark"` no `<html>`. Persistido em `localStorage`. Detecta `prefers-color-scheme` na primeira visita. Script inline no `<head>` evita flash.

## Seções da Landing Page

1. **Hero** — badge de disponibilidade, nome em destaque, card flutuante (desktop)
2. **Sobre mim** — bio + 4 stat cards (20+ anos, 4 títulos, 25+ tecnologias, ∞ problemas)
3. **Áreas de atuação** — 7 cards: IA, ML/DL, Visão Computacional, Embarcados, Agro, Saúde, Drones
4. **Tecnologias** — 3 colunas: Linguagens / Banco de Dados / Ferramentas — barras animadas com IntersectionObserver
5. **Projetos** — 6 cards: AgroVision AI, Metaprime ERP, EmbedTrack IoT, MedScan AI, DroneMapper Pro, DataFlow Analytics
6. **Experiência** — timeline cronológica (mais recente primeiro):
   - Diretor · Metaprime Sistemas · set 2022–presente
   - Gerente de TI · Metaprime Sistemas · mar 2019–set 2022
   - Engenheiro de Hardware · MR Automação Industrial · set 2017–fev 2019
   - Programador Sênior · SGS Unigeo Agricultura de Precisão · jun 2014–set 2017
7. **Contato** — email, LinkedIn, GitHub
8. **Footer** — links para termos.html

## Dados de Contato Reais

- **Email:** dr.renatotavares@gmail.com
- **LinkedIn:** https://www.linkedin.com/in/java/
- **GitHub:** https://github.com/rat
- **Site:** https://renatotavares.com

## Repositório

```
git remote: git@github.com:rat/renatotavares.com.git
branch: main
```

## Decisões de Design Tomadas

- **Fonte Syne foi rejeitada** — muito difícil de ler. Inter é a fonte aprovada para títulos e corpo.
- Cards com reveal de borda gradiente no hover (`::before scaleX 0→1`)
- Dot-grid sutil como background em seções alternadas e footer
- Skill bars com glow (`box-shadow: 0 0 10px rgba(99,102,241,.45)`)
- Footer tem linha gradiente de 2px no topo via `::before`
- Experiência usa border-left colorida: azul = atual, cinza = anterior

## Convenções de Código

- CSS via variáveis `--var-name` — nunca cores hardcoded
- Classes semânticas por componente: `.exp-item`, `.proj-card`, `.area-card`, etc.
- JS sem dependências externas. Todas as funções nomeadas e comentadas.
- Reveal: classe `.reveal` no HTML → JS adiciona `.revealed` via IntersectionObserver

## Comandos Úteis

```bash
# Rodar localmente
python3 -m http.server 8080

# Deploy (só push para main)
git add . && git commit -m "mensagem" && git push
```
