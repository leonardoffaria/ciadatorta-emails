import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import process from 'node:process';

const root = process.cwd();
const previewMarker = 'EMAIL_PREVIEW_ONLY';
const unsubscribeToken = '{{{RESEND_UNSUBSCRIBE_URL}}}';
const legacyTokens = ['%unsubscribe%', '#unsubscribe-preview'];

async function listHtmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git') continue;

    const absolutePath = join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...await listHtmlFiles(absolutePath));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(absolutePath);
    }
  }

  return files;
}

function hasValidUnsubscribeAnchor(html) {
  const anchors = html.match(/<a\b[^>]*>[\s\S]*?<\/a>/gi) ?? [];

  return anchors.some((anchor) => {
    const hasExactHref = new RegExp(
      `href\\s*=\\s*["']${unsubscribeToken.replace(/[{}]/g, '\\$&')}["']`,
      'i',
    ).test(anchor);
    const visibleText = anchor.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    return hasExactHref && /descadastr/i.test(visibleText);
  });
}

const htmlFiles = (await listHtmlFiles(root)).sort();
const failures = [];
let emailCount = 0;
let previewCount = 0;

for (const absolutePath of htmlFiles) {
  const path = relative(root, absolutePath);
  const html = await readFile(absolutePath, 'utf8');

  if (html.includes(previewMarker)) {
    previewCount += 1;
    continue;
  }

  emailCount += 1;

  const tokenCount = html.split(unsubscribeToken).length - 1;
  if (tokenCount !== 1) {
    failures.push(`${path}: deve conter exatamente 1 ${unsubscribeToken} (encontrados: ${tokenCount})`);
  }

  for (const legacyToken of legacyTokens) {
    if (html.includes(legacyToken)) {
      failures.push(`${path}: placeholder legado proibido: ${legacyToken}`);
    }
  }

  if (!hasValidUnsubscribeAnchor(html)) {
    failures.push(`${path}: o placeholder precisa estar no href de um link com texto visível de descadastro`);
  }
}

if (failures.length > 0) {
  console.error('Falha na validação de opt-out:\n');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Opt-out válido em ${emailCount} emails; ${previewCount} páginas de preview ignoradas.`);
