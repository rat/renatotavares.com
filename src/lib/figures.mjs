// Figuras geradas na compilação, em SVG embutido. Nenhuma delas é decorativa:
// cada uma é calculada a partir de uma definição ou de uma tabela publicada,
// e a legenda de cada figura diz de onde os números vêm.
//
// As cores vêm de variáveis CSS (ver site.css), de modo que as figuras
// acompanham o tema claro/escuro sem JavaScript.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const round = (x, d = 2) => Number(x.toFixed(d));

/* ------------------------------------------------------------------------
 * 1. Árvore de predecessores do mapa 3n+1
 *    T(n) = n/2 (n par), (3n+1)/2 (n ímpar).
 *    Predecessores de n: 2n sempre; (2n−1)/3 quando n ≡ 2 (mod 3).
 *    O ciclo 1 → 2 → 1 é omitido (1 não é desenhado como predecessor de 2).
 * --------------------------------------------------------------------- */
export function predecessorTree(maxDepth) {
  let id = 0;
  const make = (n, depth, parent, odd) => ({ id: id++, n, depth, parent, odd, children: [] });
  const root = make(1, 0, null, false);
  const all = [root];
  const grow = (node) => {
    if (node.depth === maxDepth) return;
    const n = node.n;
    if (n % 3 === 2) {
      const m = (2 * n - 1) / 3;
      if (m !== 1) node.children.push(make(m, node.depth + 1, node, true));
    }
    node.children.push(make(2 * n, node.depth + 1, node, false));
    for (const c of node.children) { all.push(c); grow(c); }
  };
  grow(root);
  // Disposição: folhas em linhas consecutivas; nós internos na média dos filhos.
  let slot = 0;
  const place = (node) => {
    if (node.children.length === 0) { node.row = slot++; return; }
    node.children.forEach(place);
    node.row = node.children.reduce((s, c) => s + c.row, 0) / node.children.length;
  };
  place(root);
  return { root, all, leaves: slot, maxDepth };
}

/** Árvore horizontal: raiz à esquerda, um passo de T por coluna. */
export function treeSvg({ depth, colW = 40, rowH = 15, cls = '' , idPrefix = 't' }) {
  const { all, leaves } = predecessorTree(depth);
  const padL = 12; const padR = 34; const padT = 10; const padB = 26;
  const W = padL + depth * colW + padR;
  const H = padT + (leaves - 1) * rowH + padB;
  const X = (d) => padL + d * colW;
  const Y = (r) => padT + r * rowH;
  const edges = [];
  const nodes = [];
  for (const nd of all) {
    if (nd.parent) {
      const x1 = X(nd.parent.depth); const y1 = Y(nd.parent.row); const x2 = X(nd.depth); const y2 = Y(nd.row);
      // cotovelo suave: sai do pai na horizontal e chega ao filho na horizontal
      const mx = round(x1 + (x2 - x1) * 0.5);
      const dPath = y1 === y2 ? `M${round(x1)} ${round(y1)}H${round(x2)}` : `M${round(x1)} ${round(y1)}C${mx} ${round(y1)} ${mx} ${round(y2)} ${round(x2)} ${round(y2)}`;
      edges.push(`<path class="e${nd.odd ? ' e-odd' : ''}" data-c="${nd.id}" d="${dPath}"/>`);
    }
  }
  for (const nd of all) {
    const x = round(X(nd.depth)); const y = round(Y(nd.row));
    const kind = nd.n % 3 === 0 ? ' n-3' : nd.n % 3 === 2 ? ' n-b' : '';
    nodes.push(`<g class="nd${kind}" data-i="${nd.id}" data-p="${nd.parent ? nd.parent.id : ''}" data-n="${nd.n}"><circle cx="${x}" cy="${y}" r="${nd.n === 1 ? 3.4 : 2}"/><text x="${x + 5}" y="${y + 3.4}">${nd.n}</text></g>`);
  }
  // eixo: número de passos
  const ticks = [];
  for (let d = 0; d <= depth; d += depth > 10 ? 2 : 1) ticks.push(`<text class="ax" x="${round(X(d))}" y="${H - 6}" text-anchor="middle">${d}</text>`);
  return {
    svg: `<svg class="fig-tree ${cls}" id="${idPrefix}" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="${idPrefix}-t ${idPrefix}-d"><title id="${idPrefix}-t">Árvore de predecessores de 1 sob o mapa 3n+1, até ${depth} passos</title><desc id="${idPrefix}-d">Cada número está ligado ao número em que se transforma após um passo de T. A raiz é 1, à esquerda; a coluna mais à direita reúne os ${leaves} números que levam exatamente ${depth} passos para chegar a 1.</desc><g class="edges">${edges.join('')}</g><g class="nodes">${nodes.join('')}</g><g class="axis">${ticks.join('')}</g></svg>`,
    count: all.length,
    leaves,
  };
}

/* ------------------------------------------------------------------------
 * Infra mínima de gráficos cartesianos
 * --------------------------------------------------------------------- */
function frame({ W, H, m, xDom, yDom }) {
  const iw = W - m.l - m.r; const ih = H - m.t - m.b;
  const x = (v) => round(m.l + ((v - xDom[0]) / (xDom[1] - xDom[0])) * iw);
  const y = (v) => round(m.t + ih - ((v - yDom[0]) / (yDom[1] - yDom[0])) * ih);
  return { x, y, iw, ih };
}
const fmt = (v, d) => v.toFixed(d).replace('.', ',');

/* ------------------------------------------------------------------------
 * 2. Orçamento de cobertura j*(ℓ) — Tabela 1 do preprint da Cobertura Fraca
 * --------------------------------------------------------------------- */
export const JSTAR = [1, 4, 6, 7, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19, 20, 20, 21, 22, 23, 24, 25, 26, 27];

/**
 * Verificação independente da definição para ℓ pequeno (usada na compilação):
 * R_{j−1,j} = { Σ_{i=0}^{j−1} 2^{a_i} 3^i : 2j−1 ≥ a_0 > a_1 > … > a_{j−1} ≥ 0 } e
 * j*(ℓ) = menor j tal que R_{j−1,j} cobre todas as unidades módulo 3^ℓ.
 */
export function jstarBruteForce(l, jMax = 14) {
  const mod = 3 ** l;
  const units = (mod / 3) * 2;
  const pow2 = [1];
  for (let a = 1; a < 2 * jMax; a++) pow2.push((pow2[a - 1] * 2) % mod);
  const pow3 = [1];
  for (let i = 1; i < jMax; i++) pow3.push((pow3[i - 1] * 3) % mod);
  for (let j = 1; j <= jMax; j++) {
    // DP sobre posições a = 2j−1 … 0, escolhendo exatamente j delas em ordem decrescente;
    // a i-ésima escolhida (i = 0 é a maior) contribui 2^a · 3^i.
    let sets = Array.from({ length: j + 1 }, () => null);
    sets[0] = new Set([0]);
    for (let a = 2 * j - 1; a >= 0; a--) {
      const nextSets = sets.map((s) => (s ? new Set(s) : null));
      for (let i = 0; i < j; i++) {
        if (!sets[i]) continue;
        const add = (pow2[a] * pow3[i]) % mod;
        if (!nextSets[i + 1]) nextSets[i + 1] = new Set();
        for (const v of sets[i]) nextSets[i + 1].add((v + add) % mod);
      }
      sets = nextSets;
    }
    let covered = 0;
    for (const v of sets[j] ?? []) if (v % 3 !== 0) covered++;
    if (covered === units) return j;
  }
  return null;
}

export function jstarSvg() {
  const W = 720; const H = 430; const m = { l: 46, r: 150, t: 18, b: 44 };
  const xDom = [0, 24]; const yDom = [0, 45];
  const { x, y } = frame({ W, H, m, xDom, yDom });
  const log43 = Math.log(3) / Math.log(4);
  const g = [];
  for (let v = 0; v <= 45; v += 5) g.push(`<line class="grid" x1="${x(0)}" x2="${x(24)}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${x(0) - 8}" y="${y(v) + 4}" text-anchor="end">${v}</text>`);
  for (let v = 1; v <= 23; v += 2) g.push(`<text class="ax" x="${x(v)}" y="${y(0) + 18}" text-anchor="middle">${v}</text>`);
  const line = (f, cls) => `<path class="${cls}" d="M${x(1)} ${y(f(1))}L${x(24)} ${y(f(24))}"/>`;
  const pts = JSTAR.map((j, i) => {
    const l = i + 1;
    return `<circle class="${l >= 22 ? 'pt pt-open' : 'pt'}" cx="${x(l)}" cy="${y(j)}" r="3.6"><title>ℓ = ${l}: j*(ℓ) = ${j}</title></circle>`;
  });
  const lab = (l, v, text, cls = 'lb') => `<text class="${cls}" x="${x(l) + 8}" y="${y(v) + 4}">${text}</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="fj-t fj-d"><title id="fj-t">Orçamento de cobertura j*(ℓ) para ℓ de 1 a 23</title><desc id="fj-d">Os 23 valores exatos de j*(ℓ) ficam entre a cota inferior demonstrada j*(ℓ) ≥ ℓ e a cota superior condicional nove oitavos de ℓ mais trinta e três meios, e acima da taxa ℓ log₄ 3 prevista pela contagem.</desc>${g.join('')}
<text class="ax" x="${x(12)}" y="${H - 6}" text-anchor="middle">ℓ (precisão 3-ádica: resíduos módulo 3^ℓ)</text>
${line((l) => (9 / 8) * l + 33 / 2, 'ln ln-cond')}${line((l) => l, 'ln ln-proved')}${line((l) => l * log43, 'ln ln-conj')}
${pts.join('')}
${lab(24, (9 / 8) * 24 + 33 / 2, '⁹⁄₈ ℓ + ³³⁄₂')}${lab(24, (9 / 8) * 24 + 33 / 2 - 2.6, 'cota condicional', 'lb lb-sub')}
${lab(24, 27.6, 'j*(ℓ) calculado')}
${lab(24, 24, 'ℓ')}${lab(24, 24 - 2.6, 'cota inferior demonstrada', 'lb lb-sub')}
${lab(24, 24 * log43, 'ℓ log₄ 3')}${lab(24, 24 * log43 - 2.6, 'taxa da contagem', 'lb lb-sub')}
</svg>`;
}

/* ------------------------------------------------------------------------
 * 3. Densidade invariante φ
 *    φ é o ponto fixo de massa 1 em [0,1] de (W₃ f)(x) = (3/2) ∫_{3x−2}^{3x} f.
 *    Iteramos W₃ numa grade de 3^8 células a partir da densidade uniforme.
 * --------------------------------------------------------------------- */
export function phiDensity() {
  const N = 3 ** 8; // células de largura 1/N; nós em k/N
  let f = new Float64Array(N + 1).fill(1);
  for (let it = 0; it < 40; it++) {
    // F[k] = ∫_0^{k/N} f (regra do trapézio)
    const F = new Float64Array(N + 1);
    for (let k = 1; k <= N; k++) F[k] = F[k - 1] + (f[k - 1] + f[k]) / (2 * N);
    const g = new Float64Array(N + 1);
    for (let k = 0; k <= N; k++) {
      const hi = Math.min(N, 3 * k); const lo = Math.max(0, 3 * k - 2 * N);
      g[k] = hi > lo ? 1.5 * (F[hi] - F[lo]) : 0;
    }
    f = g;
  }
  let mass = 0;
  for (let k = 1; k <= N; k++) mass += (f[k - 1] + f[k]) / (2 * N);
  return { N, f, mass, mid: f[(N - 1) / 2 + 1], third: f[N / 3] };
}

export function phiSvg() {
  const { N, f, mass } = phiDensity();
  // conferências contra propriedades demonstradas: massa 1, simetria, φ = 3/2 em [1/3, 2/3]
  if (Math.abs(mass - 1) > 1e-6) throw new Error(`phi: massa ${mass}`);
  for (const k of [N / 3, (N * 4) / 9, (N * 5) / 9, (N * 2) / 3]) if (Math.abs(f[k] - 1.5) > 1e-6) throw new Error(`phi(${k / N}) = ${f[k]} ≠ 3/2`);
  for (const k of [10, 500, 2000]) if (Math.abs(f[k] - f[N - k]) > 1e-9) throw new Error('phi: assimetria');
  const W = 720; const H = 330; const m = { l: 46, r: 20, t: 18, b: 44 };
  const { x, y } = frame({ W, H, m, xDom: [0, 1], yDom: [0, 1.7] });
  const step = 9; let d = '';
  for (let k = 0; k <= N; k += step) d += `${k === 0 ? 'M' : 'L'}${x(k / N)} ${y(f[k])}`;
  const g = [];
  for (const v of [0, 0.5, 1, 1.5]) g.push(`<line class="grid" x1="${x(0)}" x2="${x(1)}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${x(0) - 8}" y="${y(v) + 4}" text-anchor="end">${fmt(v, 1)}</text>`);
  for (const [v, t] of [[0, '0'], [1 / 3, '⅓'], [0.5, '½'], [2 / 3, '⅔'], [1, '1']]) g.push(`<line class="tick" x1="${x(v)}" x2="${x(v)}" y1="${y(0)}" y2="${y(0) + 5}"/><text class="ax" x="${x(v)}" y="${y(0) + 20}" text-anchor="middle">${t}</text>`);
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="fp-t fp-d"><title id="fp-t">A densidade invariante φ em [0, 1]</title><desc id="fp-d">A curva é simétrica em torno de um meio, vale três meios no terço central e decai muito rapidamente perto de zero e de um.</desc>${g.join('')}
<path class="area" d="${d}L${x(1)} ${y(0)}L${x(0)} ${y(0)}Z"/><path class="ln ln-proved" d="${d}"/>
<text class="lb" x="${x(0.5)}" y="${y(1.5) - 8}" text-anchor="middle">φ = 3⁄2 em [⅓, ⅔]</text>
<text class="lb lb-sub" x="${x(0.06)}" y="${y(0.33)}">região da Conjectura 3: t → 0⁺</text>
<path class="ptr" d="M${x(0.055)} ${y(0.27)}L${x(0.022)} ${y(0.05)}"/>
<text class="ax" x="${x(0.5)}" y="${H - 6}" text-anchor="middle">t</text></svg>`;
}

/* ------------------------------------------------------------------------
 * 4. Correção log 3-periódica H (dados calculados por src/tools/compute_H.py
 *    e conferidos contra os valores certificados no preprint).
 * --------------------------------------------------------------------- */
export function hData() {
  const p = fileURLToPath(new URL('../data/computed/H.json', import.meta.url));
  return JSON.parse(readFileSync(p, 'utf8'));
}

export function hSvg() {
  const d = hData();
  const c = d.period;
  const W = 720; const H = 330; const m = { l: 66, r: 20, t: 18, b: 44 };
  const amp = 2.6e-4;
  const { x, y } = frame({ W, H, m, xDom: [0, c], yDom: [-amp, amp] });
  let path = '';
  d.w.forEach((w, i) => { path += `${i === 0 ? 'M' : 'L'}${x(w)} ${y(d.H_minus_mean[i])}`; });
  const g = [];
  for (const v of [-2e-4, -1e-4, 0, 1e-4, 2e-4]) g.push(`<line class="grid${v === 0 ? ' grid-0' : ''}" x1="${x(0)}" x2="${x(c)}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${x(0) - 8}" y="${y(v) + 4}" text-anchor="end">${v === 0 ? '0' : `${v > 0 ? '+' : '−'}${Math.abs(v) * 1e4}·10⁻⁴`}</text>`);
  const w32 = Math.log(1.5);
  for (const [v, t] of [[0, '0'], [w32, 'log 3⁄2'], [c, 'log 3']]) g.push(`<line class="tick" x1="${x(v)}" x2="${x(v)}" y1="${y(-amp)}" y2="${y(-amp) + 5}"/><text class="ax" x="${x(v)}" y="${y(-amp) + 20}" text-anchor="middle">${t}</text>`);
  const h0 = d.H_minus_mean[0];
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="fh-t fh-d"><title id="fh-t">Um período da correção H, em torno da sua média</title><desc id="fh-d">A função H oscila em torno da média com amplitude total de cerca de 4,19 décimos de milésimo ao longo de um período de comprimento log 3. É quase uma senoide pura, porque o segundo coeficiente de Fourier é cerca de oito mil vezes menor que o primeiro.</desc>${g.join('')}
<path class="ln ln-proved" d="${path}"/>
<circle class="pt" cx="${x(0)}" cy="${y(h0)}" r="4"/><circle class="pt" cx="${x(c)}" cy="${y(h0)}" r="4"/>
<text class="lb" x="${x(0) + 10}" y="${y(h0) + 16}">fase 0: a única que a classe de Wirsching enxerga</text>
<text class="ax" x="${x(c / 2)}" y="${H - 6}" text-anchor="middle">w (um período)</text></svg>`;
}

/* ------------------------------------------------------------------------
 * 5. Expoente 5x+1: leitura da árvore aritmética contra as duas previsões.
 *    Dados: tabela por década do preprint (SSRN 7445805).
 * --------------------------------------------------------------------- */
export const KLV = [
  { dec: '10⁵→10⁶', read: 0.63401, kl: [0.59064, 0.61366], vo: [0.59408, 0.64477] },
  { dec: '10⁶→10⁷', read: 0.62697, kl: [0.61363, 0.63749], vo: [0.63432, 0.66268] },
  { dec: '10⁷→10⁸', read: 0.64622, kl: [0.63152, 0.64758], vo: [0.66394, 0.672] },
  { dec: '10⁸→10⁹', read: 0.6488, kl: [0.64219, 0.6499], vo: [0.67157, 0.67745] },
  { dec: '10⁹→10¹⁰', read: 0.64926, kl: [0.64738, 0.65122], vo: [0.67358, 0.67748] },
];

export function klvSvg() {
  const W = 720; const H = 380; const m = { l: 56, r: 150, t: 18, b: 48 };
  const { x, y } = frame({ W, H, m, xDom: [-0.5, 4.5], yDom: [0.585, 0.69] });
  const g = [];
  for (const v of [0.6, 0.62, 0.64, 0.66, 0.68]) g.push(`<line class="grid" x1="${x(-0.5)}" x2="${x(4.5)}" y1="${y(v)}" y2="${y(v)}"/><text class="ax" x="${x(-0.5) - 8}" y="${y(v) + 4}" text-anchor="end">${fmt(v, 2)}</text>`);
  const bw = 26;
  const bars = KLV.map((r, i) => {
    const cx = x(i);
    return `<rect class="band band-a" x="${cx - bw - 2}" width="${bw}" y="${y(r.kl[1])}" height="${round(y(r.kl[0]) - y(r.kl[1]))}"><title>Construções ajustadas a 0,650919 em ${r.dec}: de ${fmt(r.kl[0], 5)} a ${fmt(r.kl[1], 5)}</title></rect><rect class="band band-b" x="${cx + 2}" width="${bw}" y="${y(r.vo[1])}" height="${round(y(r.vo[0]) - y(r.vo[1]))}"><title>Construções ajustadas a 0,678 em ${r.dec}: de ${fmt(r.vo[0], 5)} a ${fmt(r.vo[1], 5)}</title></rect><line class="rd" x1="${cx - bw - 8}" x2="${cx + bw + 8}" y1="${y(r.read)}" y2="${y(r.read)}"/><circle class="pt" cx="${cx}" cy="${y(r.read)}" r="3.6"><title>Árvore aritmética em ${r.dec}: ${fmt(r.read, 5)}</title></circle><text class="ax" x="${cx}" y="${y(0.585) + 18}" text-anchor="middle">${r.dec}</text>`;
  });
  const lab = (v, t, cls = 'lb') => `<text class="${cls}" x="${x(4.5) + 10}" y="${y(v) + 4}">${t}</text>`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="fk-t fk-d"><defs><pattern id="hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="hatch" x1="0" y1="0" x2="0" y2="5"/></pattern></defs><title id="fk-t">Leitura do expoente de contagem da árvore 5x+1 por década, contra construções calibradas</title><desc id="fk-d">Em cada uma das cinco décadas, a leitura da árvore aritmética é comparada com a faixa das construções ajustadas ao valor de Kontorovich e Lagarias e com a faixa das ajustadas ao valor de Volkov. Na década mais profunda a leitura, 0,64926, cai dentro da primeira faixa e abaixo da segunda.</desc>${g.join('')}
<line class="ln ln-conj" x1="${x(-0.5)}" x2="${x(4.5)}" y1="${y(0.650919)}" y2="${y(0.650919)}"/><line class="ln ln-conj" x1="${x(-0.5)}" x2="${x(4.5)}" y1="${y(0.678)}" y2="${y(0.678)}"/>
${bars.join('')}
${lab(0.678, '0,678')}${lab(0.678 - 0.0052, 'previsão de Volkov', 'lb lb-sub')}
${lab(0.650919, '0,650919')}${lab(0.650919 - 0.0052, 'Kontorovich–Lagarias', 'lb lb-sub')}
<text class="ax" x="${x(2)}" y="${H - 6}" text-anchor="middle">década de contagem (faixa de inteiros enumerados)</text></svg>`;
}

/* ------------------------------------------------------------------------
 * 6. RAG: recall@10 por modelo de embedding, perguntas literais × paráfrases.
 *    Dados do repositório público do projeto (ver src/data/rag-recall.mjs).
 * --------------------------------------------------------------------- */
export function ragSvg(rows) {
  const data = [...rows].sort((a, b) => b.parafrase - a.parafrase);
  const rowH = 17; const W = 720; const m = { l: 232, r: 26, t: 30, b: 40 };
  const H = m.t + data.length * rowH + m.b;
  const { x } = frame({ W, H, m, xDom: [0.5, 1], yDom: [0, 1] });
  const y = (i) => m.t + i * rowH + rowH / 2;
  const g = [];
  for (const v of [0.5, 0.6, 0.7, 0.8, 0.9, 1]) g.push(`<line class="grid" x1="${x(v)}" x2="${x(v)}" y1="${m.t - 6}" y2="${H - m.b + 4}"/><text class="ax" x="${x(v)}" y="${H - m.b + 20}" text-anchor="middle">${fmt(v, 1)}</text>`);
  const body = data.map((r, i) => {
    const prod = r.tipo === 'producao';
    const name = prod ? 'pipeline em produção' : r.modelo;
    return `<text class="${prod ? 'lb' : 'ax'}" x="${m.l - 12}" y="${y(i) + 4}" text-anchor="end">${name}</text><line class="rd" x1="${x(r.parafrase)}" x2="${x(r.teste)}" y1="${y(i)}" y2="${y(i)}"/><circle class="pt" cx="${x(r.parafrase)}" cy="${y(i)}" r="${prod ? 4.6 : 3.4}"><title>${name}: recall@10 de ${fmt(r.parafrase, 3)} nas paráfrases</title></circle><circle class="pt pt-open" cx="${x(r.teste)}" cy="${y(i)}" r="3"><title>${name}: recall@10 de ${fmt(r.teste, 3)} nas perguntas literais</title></circle>`;
  });
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="fr-t fr-d"><title id="fr-t">Recall@10 de ${data.length} configurações de embedding: perguntas literais contra paráfrases</title><desc id="fr-d">Nas perguntas literais, todos os modelos ficam entre 0,98 e 1,00. Nas paráfrases, o recall varia de ${fmt(data[data.length - 1].parafrase, 2)} a ${fmt(data[0].parafrase, 2)}.</desc>${g.join('')}
<circle class="pt" cx="${m.l}" cy="12" r="3.4"/><text class="ax" x="${m.l + 9}" y="16">paráfrases</text><circle class="pt pt-open" cx="${m.l + 96}" cy="12" r="3"/><text class="ax" x="${m.l + 105}" y="16">perguntas literais</text>
${body.join('')}
<text class="ax" x="${x(0.75)}" y="${H - 4}" text-anchor="middle">recall@10 (fração das perguntas cujo documento certo aparece entre os dez primeiros)</text></svg>`;
}
