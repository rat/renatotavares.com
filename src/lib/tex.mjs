// Conversor mínimo de um subconjunto de TeX para MathML (Presentation).
//
// O site tem poucas dezenas de fórmulas, todas simples. Convertê-las na geração
// evita carregar uma biblioteca de matemática no navegador: o resultado é MathML
// nativo, sem JavaScript, com a fonte TeX preservada em <annotation>.
//
// Suporta: grupos {…}, ^ e _, \frac \tfrac \binom \sqrt \text \mathrm \operatorname
// \mathbb \hat \widetilde \bar \left \right, letras gregas e os operadores listados abaixo.
// Qualquer comando desconhecido interrompe a geração com erro (nada passa em silêncio).

import { esc } from './util.mjs';

const GREEK = {
  alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', epsilon: 'ε', varepsilon: 'ε', zeta: 'ζ', eta: 'η', theta: 'θ',
  kappa: 'κ', lambda: 'λ', mu: 'μ', nu: 'ν', xi: 'ξ', pi: 'π', rho: 'ρ', sigma: 'σ', tau: 'τ', phi: 'ϕ',
  varphi: 'φ', chi: 'χ', psi: 'ψ', omega: 'ω', Gamma: 'Γ', Delta: 'Δ', Lambda: 'Λ', Sigma: 'Σ', Omega: 'Ω', ell: 'ℓ',
};
// Maiúsculas gregas não são italicizadas (convenção TeX).
const UPRIGHT = new Set(['Γ', 'Δ', 'Λ', 'Σ', 'Ω']);

const OPS = {
  le: '≤', leq: '≤', ge: '≥', geq: '≥', ne: '≠', neq: '≠', sim: '∼', approx: '≈', equiv: '≡', to: '→',
  Rightarrow: '⇒', implies: '⇒', times: '×', cdot: '·', pm: '±', in: '∈', subseteq: '⊆', subset: '⊂', cap: '∩',
  cup: '∪', mid: '|', colon: ':', star: '⋆', infty: '∞', ldots: '…', dots: '…', cdots: '⋯', setminus: '∖',
  lfloor: '⌊', rfloor: '⌋', langle: '⟨', rangle: '⟩', mapsto: '↦', nmid: '∤', not: '',
};
const BIGOPS = { sum: '∑', prod: '∏', int: '∫' };
const FUNCS = new Set(['log', 'ln', 'exp', 'lim', 'liminf', 'limsup', 'max', 'min', 'sup', 'inf', 'ord', 'osc', 'bmod', 'mod', 'Re']);
const SPACES = { ',': '0.17em', ';': '0.28em', ':': '0.22em', '!': '0', quad: '1em', qquad: '2em', ' ': '0.28em' };
const BB = { Z: 'ℤ', N: 'ℕ', R: 'ℝ', Q: 'ℚ', C: 'ℂ', I: '𝕀', X: '𝕏' };

const RAW = new Set(['text', 'textrm', 'mathrm', 'operatorname', 'mathbb']);

function tokenize(src) {
  const out = [];
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (ch === '\\') {
      const m = /^\\([a-zA-Z]+|.)/.exec(src.slice(i));
      i += m[0].length;
      if (RAW.has(m[1])) {
        // comandos cujo argumento é texto literal: guarda o conteúdo sem tokenizar
        const g = /^\s*\{([^{}]*)\}/.exec(src.slice(i));
        if (!g) throw new Error(`tex.mjs: \\${m[1]} sem argumento em «${src}»`);
        out.push({ t: 'raw', cmd: m[1], v: g[1] });
        i += g[0].length;
      } else out.push({ t: 'cmd', v: m[1] });
    } else if (/\s/.test(ch)) {
      i++;
    } else if (/[0-9]/.test(ch)) {
      const m = /^[0-9]+(?:[.,][0-9]+)?/.exec(src.slice(i));
      out.push({ t: 'num', v: m[0] });
      i += m[0].length;
    } else if ('{}^_'.includes(ch)) {
      out.push({ t: ch });
      i++;
    } else {
      out.push({ t: 'chr', v: ch });
      i++;
    }
  }
  return out;
}

class Parser {
  constructor(src) {
    this.src = src;
    this.toks = tokenize(src);
    this.p = 0;
  }
  peek() { return this.toks[this.p]; }
  next() { return this.toks[this.p++]; }
  fail(msg) { throw new Error(`tex.mjs: ${msg} em «${this.src}»`); }

  /** Sequência até '}' ou fim (ou até um \right). */
  row(stopAtRight = false) {
    const items = [];
    for (;;) {
      const tk = this.peek();
      if (!tk || tk.t === '}') break;
      if (stopAtRight && tk.t === 'cmd' && tk.v === 'right') break;
      const fn = (tk.t === 'cmd' && FUNCS.has(tk.v)) || (tk.t === 'raw' && tk.cmd === 'operatorname');
      if (fn && items.length && !/^<(mo|mspace)\b/.test(items[items.length - 1])) items.push('<mspace width="0.17em"/>');
      items.push(this.scripted());
    }
    return items;
  }
  group() {
    if (this.peek()?.t !== '{') return this.atom();
    this.next();
    const items = this.row();
    if (this.next()?.t !== '}') this.fail('chave não fechada');
    return items.length === 1 ? items[0] : `<mrow>${items.join('')}</mrow>`;
  }
  scripted() {
    const tk0 = this.peek();
    const isFn = !!tk0 && ((tk0.t === 'cmd' && FUNCS.has(tk0.v)) || (tk0.t === 'raw' && tk0.cmd === 'operatorname'));
    const out = this.scriptedCore();
    if (!isFn) return out;
    const nx = this.peek();
    const paren = nx && nx.t === 'chr' && nx.v === '(';
    return `${out}<mo>&#x2061;</mo>${paren ? '' : '<mspace width="0.17em"/>'}`;
  }
  scriptedCore() {
    const base = this.atom();
    let sub = null;
    let sup = null;
    for (;;) {
      const tk = this.peek();
      if (tk?.t === '^' && sup === null) { this.next(); sup = this.group(); } else if (tk?.t === '_' && sub === null) { this.next(); sub = this.group(); } else break;
    }
    if (/^<mo>[∑∏]<\/mo>$/.test(base)) {
      const big = base.replace('<mo>', '<mo movablelimits="true" largeop="true">');
      if (sub !== null && sup !== null) return `<munderover>${big}${sub}${sup}</munderover>`;
      if (sub !== null) return `<munder>${big}${sub}</munder>`;
      if (sup !== null) return `<mover>${big}${sup}</mover>`;
    }
    if (sub !== null && sup !== null) return `<msubsup>${base}${sub}${sup}</msubsup>`;
    if (sub !== null) return `<msub>${base}${sub}</msub>`;
    if (sup !== null) return `<msup>${base}${sup}</msup>`;
    return base;
  }
  atom() {
    const tk = this.next();
    if (!tk) this.fail('fim inesperado');
    if (tk.t === '{') { this.p--; return this.group(); }
    if (tk.t === 'num') return `<mn>${tk.v}</mn>`;
    if (tk.t === 'chr') {
      const c = tk.v;
      if (/[a-zA-Z]/.test(c)) return `<mi>${c}</mi>`;
      if (c === '-') return '<mo>−</mo>';
      if (c === '*') return '<mo>∗</mo>';
      if ('()[]'.includes(c)) return `<mo stretchy="false">${c}</mo>`;
      if (c === '|') return '<mo stretchy="false">|</mo>';
      if (c === ',' || c === ';') return `<mo separator="true">${c}</mo>`;
      if (c === "'") return '<mo>′</mo>';
      if (c === '/') return '<mo>/</mo>';
      return `<mo>${esc(c)}</mo>`;
    }
    if (tk.t === 'raw') {
      if (tk.cmd === 'text' || tk.cmd === 'textrm') return `<mtext>${esc(tk.v).replace(/^ | $/g, '&#160;')}</mtext>`;
      if (tk.cmd === 'mathbb') { if (!(tk.v in BB)) this.fail(`\\mathbb{${tk.v}} não suportado`); return `<mi mathvariant="normal">${BB[tk.v]}</mi>`; }
      return `<mi mathvariant="normal">${esc(tk.v)}</mi>`;
    }
    if (tk.t !== 'cmd') this.fail(`símbolo inesperado ${tk.t}`);
    const c = tk.v;
    if (c in GREEK) return UPRIGHT.has(GREEK[c]) ? `<mi mathvariant="normal">${GREEK[c]}</mi>` : `<mi>${GREEK[c]}</mi>`;
    if (c === 'dots' || c === 'ldots') return '<mo lspace="0.12em" rspace="0">…</mo>';
    if (c === 'star') return '<mo lspace="0" rspace="0.05em">⋆</mo>';
    if (c in OPS) return `<mo>${OPS[c]}</mo>`;
    if (c in BIGOPS) return `<mo>${BIGOPS[c]}</mo>`;
    if (FUNCS.has(c)) {
      const name = c === 'bmod' ? 'mod' : c === 'liminf' ? 'lim inf' : c === 'limsup' ? 'lim sup' : c;
      return `<mi mathvariant="normal">${name}</mi>`;
    }
    if (c in SPACES) return `<mspace width="${SPACES[c]}"/>`;
    switch (c) {
      case 'frac': case 'tfrac': case 'dfrac': { const a = this.group(); const b = this.group(); return `<mfrac>${a}${b}</mfrac>`; }
      case 'binom': { const a = this.group(); const b = this.group(); return `<mrow><mo>(</mo><mfrac linethickness="0">${a}${b}</mfrac><mo>)</mo></mrow>`; }
      case 'sqrt': return `<msqrt>${this.group()}</msqrt>`;
      case 'hat': case 'widehat': return `<mover accent="true">${this.group()}<mo>^</mo></mover>`;
      case 'tilde': case 'widetilde': return `<mover accent="true">${this.group()}<mo>~</mo></mover>`;
      case 'bar': case 'overline': return `<mover accent="true">${this.group()}<mo>¯</mo></mover>`;
      case 'left': case 'bigl': case 'Bigl': {
        const open = this.delim();
        if (c !== 'left') return `<mo stretchy="false">${open}</mo>`;
        const inner = this.row(true);
        const r = this.next();
        if (!r || r.v !== 'right') this.fail('\\left sem \\right');
        const close = this.delim();
        return `<mrow><mo>${open}</mo>${inner.join('')}<mo>${close}</mo></mrow>`;
      }
      case 'bigr': case 'Bigr': return `<mo stretchy="false">${this.delim()}</mo>`;
      case '{': return '<mo stretchy="false">{</mo>';
      case '}': return '<mo stretchy="false">}</mo>';
      case '%': return '<mo>%</mo>';
      default: this.fail(`comando \\${c} não suportado`);
    }
    return '';
  }
  delim() {
    const tk = this.next();
    if (!tk) this.fail('delimitador ausente');
    if (tk.t === 'chr') return tk.v === '.' ? '' : esc(tk.v);
    if (tk.t === 'cmd') {
      if (tk.v === '{' || tk.v === '}') return tk.v;
      if (tk.v in OPS) return OPS[tk.v];
    }
    this.fail('delimitador não suportado');
    return '';
  }
}

/**
 * tex('j^*(\\ell) \\le \\tfrac{9}{8}\\ell') → MathML em linha.
 * tex(src, { block: true }) → fórmula em destaque.
 */
export function tex(src, { block = false } = {}) {
  const parse = (part) => {
    const p = new Parser(part);
    const items = p.row();
    if (p.peek()) p.fail('sobra após o fim da expressão');
    return `<mrow>${items.join('')}</mrow>`;
  };
  const lines = block ? src.split('\\\\').map((l) => l.trim()).filter(Boolean) : [src];
  const body = lines.length > 1
    ? `<mtable columnalign="left" rowspacing="0.9em">${lines.map((l) => `<mtr><mtd>${parse(l)}</mtd></mtr>`).join('')}</mtable>`
    : parse(lines[0]);
  const ann = `<annotation encoding="application/x-tex">${esc(src)}</annotation>`;
  return `<math xmlns="http://www.w3.org/1998/Math/MathML" display="${block ? 'block' : 'inline'}"><semantics>${body}${ann}</semantics></math>`;
}

/** Substitui $…$ por MathML em linha e $$…$$ por fórmula em destaque dentro de um HTML. */
export function withMath(html) {
  return html
    .replace(/\$\$([^$]+)\$\$/g, (_, s) => `<div class="eq">${tex(s.trim(), { block: true })}</div>`)
    .replace(/\$([^$\n]+)\$/g, (_, s) => tex(s.trim()));
}
