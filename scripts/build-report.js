// Genera la tabla de contenidos (README.md) y el archivo único del informe (report/capitulos-completo.md)
// a partir de los archivos Markdown del repositorio.
// Uso: node scripts/build-report.js
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const REPORT = path.join(ROOT, 'report');
const BUNDLE = path.join(REPORT, 'chapters', 'capitulos-completo.md');
const PAGE_BREAK = '<div style="page-break-after: always;"></div>';

const read = (f) => fs.readFileSync(f, 'utf8').replace(/\r\n/g, '\n').trim();

// Reescribe las rutas relativas de imágenes para que funcionen desde el archivo único
function rebase(text, file) {
  const fix = (p) => {
    if (/^(https?:|data:|#)/.test(p)) return p;
    let decoded = p;
    try { decoded = decodeURIComponent(p); } catch (e) { /* ruta sin codificar */ }
    const abs = path.resolve(path.dirname(file), decoded);
    return encodeURI(path.relative(path.dirname(BUNDLE), abs).split(path.sep).join('/'));
  };
  return text
    .replace(/(!\[[^\]]*\]\()(.*?\.(?:png|jpe?g|gif|svg|webp))(\))/gi, (m, a, p, c) => a + fix(p) + c)
    .replace(/(<img[^>]*\ssrc=")([^"]+)(")/gi, (m, a, p, c) => a + fix(p) + c);
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// Orden natural por prefijo numérico del nombre de archivo (1, 1.1, 1.1.1, 5.2.1.1, ...)
function numericKey(file) {
  const m = /^(\d+(?:\.\d+)*)/.exec(path.basename(file));
  return m ? m[1].split('.').map(Number) : [];
}
function compareKeys(a, b) {
  const ka = numericKey(a);
  const kb = numericKey(b);
  for (let i = 0; i < Math.max(ka.length, kb.length); i++) {
    const x = ka[i] ?? -1;
    const y = kb[i] ?? -1;
    if (x !== y) return x - y;
  }
  return 0;
}

const front = [
  'front-matter/0-caratula.md',
  'front-matter/01-registro-versiones.md',
  'front-matter/02-collaboration-insights.md',
  null, // aquí va la tabla de contenidos
  'front-matter/03-student-outcome.md',
].map((f) => (f ? path.join(REPORT, f) : null));

const chapterDirs = fs
  .readdirSync(path.join(REPORT, 'chapters'), { withFileTypes: true })
  .filter((e) => e.isDirectory() && /^chapter-\d+/.test(e.name))
  .sort((a, b) => parseInt(a.name.split('-')[1], 10) - parseInt(b.name.split('-')[1], 10));

const chapterFiles = chapterDirs.flatMap((d) =>
  walk(path.join(REPORT, 'chapters', d.name)).sort(compareKeys)
);

const back = [
  path.join(REPORT, 'chapters', '10-conclusiones.md'),
  path.join(REPORT, 'bibliografia', '11-bibliografia.md'),
  path.join(ROOT, 'annexes', '99-anexo-videos-exposiciones.md'),
];

const ordered = [...front, ...chapterFiles, ...back];

// --- Encabezados (ignorando bloques de código) ---
function headingsOf(text) {
  const out = [];
  let fence = false;
  for (const line of text.split('\n')) {
    if (/^```/.test(line)) { fence = !fence; continue; }
    if (fence) continue;
    const m = /^(#{1,6})\s+(.*?)\s*#*\s*$/.exec(line);
    if (m) out.push({ level: m[1].length, text: m[2] });
  }
  return out;
}

const clean = (t) => t.replace(/[`*_]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').trim();

// Algoritmo de anclas de GitHub (con sufijo -1, -2 para repetidos)
function makeSlugger() {
  const seen = new Map();
  return (text) => {
    let s = clean(text).toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').trim().replace(/\s/g, '-');
    const n = seen.get(s) || 0;
    seen.set(s, n + 1);
    return n === 0 ? s : `${s}-${n}`;
  };
}

// Un encabezado entra al índice si es de nivel 2, está numerado (hasta 4 niveles) o es "Conclusiones y recomendaciones"
function inToc(h, file) {
  const t = clean(h.text);
  if (/^Contenido$/i.test(t)) return false;
  const num = /^(\d+(?:\.\d+)*)\.?\s/.exec(t);
  if (num) {
    const prefix = /^(\d+(?:\.\d+)*)/.exec(path.basename(file));
    if (prefix && !(num[1] === prefix[1] || num[1].startsWith(prefix[1] + '.'))) return false;
    return num[1].split('.').length <= 4;
  }
  if (h.level === 2) return true;
  return /^(Conclusiones y recomendaciones|Video About-The-Team)$/i.test(t);
}

function depthOf(h) {
  const t = clean(h.text);
  const num = /^(\d+(?:\.\d+)*)\.?\s/.exec(t);
  if (num) return num[1].split('.').length;
  return /^(Conclusiones y recomendaciones|Video About-The-Team)$/i.test(t) ? 1 : 0;
}

// Recorre todos los archivos en orden para calcular las anclas y los textos del índice
const slug = makeSlugger();
const entries = [];
for (const f of ordered) {
  const text = f ? read(f) : '## Contenido';
  for (const h of headingsOf(text)) {
    const anchor = slug(h.text);
    if (f && inToc(h, f)) entries.push({ text: clean(h.text), anchor, depth: depthOf(h), file: f });
  }
}

const indent = (d) => "  ".repeat(d === 0 ? 0 : d === 1 ? 1 : d - 1);
const tocBundle = entries.map((e) => `${indent(e.depth)}- [${e.text}](#${e.anchor})`).join('\n');
const tocReadme = entries
  .map((e) => {
    const rel = path.relative(ROOT, e.file).split(path.sep).join('/');
    return `${indent(e.depth)}- [${e.text}](${encodeURI(rel)})`;
  })
  .join('\n');

// --- Archivo único del informe ---
const parts = [];
ordered.forEach((f, i) => {
  if (f === null) {
    parts.push(`## Contenido\n\n${tocBundle}`);
  } else {
    parts.push(rebase(read(f), f));
  }
  const next = ordered[i + 1];
  const isChapterStart = next && /^(\d+)-capitulo/.test(path.basename(next));
  const frontSection = i < front.length - 1;
  const nextIsBack = next && back.includes(next) && !back.includes(f);
  if (frontSection || isChapterStart || nextIsBack || (next && back.includes(next))) parts.push(PAGE_BREAK);
});
fs.writeFileSync(BUNDLE, parts.join('\n\n') + '\n');

// --- README ---
const readme = `# Vigía – Informe del Trabajo Final

Informe del Trabajo Final del curso **1ASI0730 Aplicaciones Web** (UPC, ciclo 2026-20, NRC 8084) de la startup **Trazza Labs**, producto **Vigía**: plataforma de trazabilidad de materiales de construcción desde el almacén hasta la obra.

## Repositorios y productos

| Producto | Repositorio | URL pública |
|---|---|---|
| Informe | [vigia-report](https://github.com/upc-pre-202620-1asi0730-8084-Developers/vigia-report) | — |
| Landing Page | [vigia-website](https://github.com/upc-pre-202620-1asi0730-8084-Developers/vigia-website) | https://upc-pre-202620-1asi0730-8084-developers.github.io/vigia-website/ |
| Frontend Web Application | [vigia-web-application](https://github.com/upc-pre-202620-1asi0730-8084-Developers/vigia-web-application) | https://vigia-frontend-8084.web.app |
| Web Services (RESTful API) | [vigia-platform](https://github.com/upc-pre-202620-1asi0730-8084-Developers/vigia-platform) | En desarrollo |

## Integrantes

| Código | Apellidos y Nombres |
|---|---|
| u20241a649 | Lopez, Leonardo |
| u20231c197 | Apaza Bocanegra, Elizabeth Noelia |
| u202316353 | Cardenas Huaman, Mathias Andree |
| u20201a277 | Ramos Cerdan, Elias Daniel |
| u20221a132 | Sandoval Cueto, Fabian Jesus |

## Contenido

<!-- toc:start -->
${tocReadme}
<!-- toc:end -->

## Generación del informe

Cada sección del informe es un archivo Markdown dentro de \`report/\`. El comando \`node scripts/build-report.js\` regenera esta tabla de contenidos y el archivo único \`report/chapters/capitulos-completo.md\`, a partir del cual se exporta el PDF de cada entrega.
`;
fs.writeFileSync(path.join(ROOT, 'README.md'), readme);

console.log(`Índice: ${entries.length} entradas | Archivos: ${ordered.length - 1}`);
