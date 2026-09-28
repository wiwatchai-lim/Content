// Pick a random in-stock frame that has a verified photo sharp enough to use.
// Reads data/frames/images/_check/*.csv (status ยืนยัน or รุ่นตรง สีต่าง), skips frames
// picked in the last 14 days (log/kits.csv) and photos narrower than --min-width.
// Usage: npm run pick -- [--brand Oakley] [--angles 2] [--min-width 980] [--list]
import fs from 'node:fs';
import path from 'node:path';

const args = Object.fromEntries(
  process.argv.slice(2).join(' ').split('--').filter(Boolean).map((a) => {
    const [k, ...v] = a.trim().split(' ');
    return [k, v.join(' ') || true];
  }),
);
const minWidth = Number(args['min-width'] || 980);
const minAngles = Number(args.angles || 1);
const IMAGES = 'data/frames/images';
const OK = ['ยืนยัน', 'รุ่นตรง สีต่าง'];

const recent = new Set();
if (fs.existsSync('log/kits.csv')) {
  const cutoff = Date.now() - 14 * 864e5;
  for (const line of fs.readFileSync('log/kits.csv', 'utf8').split(/\r?\n/).slice(1)) {
    const [date, , sku] = line.split(',');
    if (sku && Date.parse(date) >= cutoff) recent.add(sku);
  }
}

const frames = [];
const checkDir = path.join(IMAGES, '_check');
for (const f of fs.readdirSync(checkDir).filter((f) => f.endsWith('.csv'))) {
  for (const row of parseCsv(fs.readFileSync(path.join(checkDir, f), 'utf8'))) {
    if (!OK.includes(row.status)) continue;
    if (args.brand && row.brand.toLowerCase() !== String(args.brand).toLowerCase()) continue;
    const sku = `${row.brand} ${row.model}`;
    if (recent.has(sku)) continue;
    const dir = path.join(IMAGES, row.brand);
    const base = row.model.replaceAll('/', '-');
    const photos = fs.existsSync(dir)
      ? fs.readdirSync(dir)
          .filter((p) => p.startsWith(`${base}_`) && /_\d\.\w+$/.test(p))
          .map((p) => ({ file: path.join(dir, p).replaceAll('\\', '/'), ...imageSize(path.join(dir, p)) }))
          .filter((p) => p.width >= minWidth)
      : [];
    if (photos.length < minAngles) continue;
    frames.push({ sku, brand: row.brand, model: row.model, status: row.status, photos, source: row.source_page, note: row.note });
  }
}

if (!frames.length) {
  console.error('no frame matches — relax --min-width / --angles or add more verified photos');
  process.exit(1);
}
if (args.list) {
  for (const f of frames) console.log(`${f.sku}  (${f.photos.map((p) => `${path.basename(p.file)} ${p.width}px`).join(', ')})`);
  console.log(`${frames.length} frames`);
} else {
  console.log(JSON.stringify(frames[Math.floor(Math.random() * frames.length)], null, 2));
}

function parseCsv(text) {
  const rows = [];
  let row = [], cell = '', quoted = false;
  text = text.replace(/^﻿/, '');
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const [head, ...body] = rows.filter((r) => r.some(Boolean));
  return body.map((r) => Object.fromEntries(head.map((h, i) => [h.trim(), (r[i] || '').trim()])));
}

// Width/height from the PNG IHDR or the JPEG SOF marker; 0 for anything else.
function imageSize(file) {
  const b = fs.readFileSync(file);
  if (b[0] === 0x89) return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  if (b[0] === 0xff) {
    for (let i = 2; i + 9 < b.length; i += 2 + b.readUInt16BE(i + 2)) {
      const m = b[i + 1];
      if (m >= 0xc0 && m <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(m)) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
    }
  }
  return { width: 0, height: 0 };
}
