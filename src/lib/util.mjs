// Utilitários pequenos compartilhados pelo gerador.

export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
const MESES_ABREV = ['jan.', 'fev.', 'mar.', 'abr.', 'maio', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** '2026-08-14' → '14 de agosto de 2026'; '2026-08' → 'agosto de 2026'; '2026' → '2026' */
export function dataLonga(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!m) return String(y);
  if (!d) return `${MESES[m - 1]} de ${y}`;
  return `${d === 1 ? '1º' : d} de ${MESES[m - 1]} de ${y}`;
}

/** '2026-08-14' → 'ago. 2026' */
export function dataCurta(iso) {
  const [y, m] = String(iso).split('-').map(Number);
  return m ? `${MESES_ABREV[m - 1]} ${y}` : String(y);
}

export function dateEn(iso) {
  const [y, m, d] = String(iso).split('-').map(Number);
  if (!m) return String(y);
  if (!d) return `${MONTHS[m - 1]} ${y}`;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/** Remove indentação comum de um template literal (para HTML legível no código-fonte). */
export function dedent(str) {
  const lines = str.replace(/^\n/, '').split('\n');
  const indent = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(indent)).join('\n').trimEnd();
}

/** Texto puro a partir de HTML (para descrições e JSON-LD). */
export const stripTags = (html) => String(html).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export const jsonld = (obj) =>
  `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;
