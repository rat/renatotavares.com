---
name: Feedback de design — preferências confirmadas
description: O que o usuário aprovou e rejeitou em decisões de estilo e código
type: feedback
---

**NÃO usar fonte Syne para títulos** — foi testada e rejeitada como "muito ruim de ler".
**Why:** Syne é geométrica demais, prejudica legibilidade em títulos longos em português.
**How to apply:** Manter Inter para tudo (--font e --font-display). Não sugerir fontes display experimentais sem aprovação prévia.

---

**Inter é a fonte aprovada** — o usuário explicitamente disse que "a anterior era boa" ao ver Syne.
**Why:** Inter tem ótima legibilidade em pt-BR, especialmente em títulos com acentuação.
**How to apply:** Qualquer sugestão de troca de fonte deve ser opcional/prévia, nunca aplicada diretamente.

---

**Stack vanilla obrigatório** — o usuário rejeitou React/Next.js e pediu HTML+CSS+JS puro.
**Why:** Simplicidade de deploy (apenas push para GitHub), sem build step.
**How to apply:** Nunca sugerir adicionar bundlers, frameworks ou dependências npm.
