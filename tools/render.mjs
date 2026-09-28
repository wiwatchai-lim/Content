// Render every *.html in a post folder to:
//   export/<name>.png  flattened image, ready to post
//   export/<name>.psd  one pixel layer per `body > [data-layer]` element, for hand edits
// Usage: npm run render -- posts/2026-09-15_example [more post folders...]
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { PNG } from 'pngjs';
import { writePsdBuffer } from 'ag-psd';

const CHROME = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => fs.existsSync(p));

const dirs = process.argv.slice(2);
if (!dirs.length) {
  console.error('usage: npm run render -- <post-folder> [...]');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
try {
  for (const dir of dirs) {
    // clip.html is the animated page; `npm run video` owns it.
    const htmlFiles = fs.readdirSync(dir).filter((f) => f.endsWith('.html') && f !== 'clip.html');
    if (!htmlFiles.length) console.warn(`no .html in ${dir}`);
    fs.mkdirSync(path.join(dir, 'export'), { recursive: true });
    for (const file of htmlFiles) {
      await renderFile(path.join(dir, file), path.join(dir, 'export', path.parse(file).name));
    }
  }
} finally {
  await browser.close();
}

async function renderFile(htmlPath, outBase) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(htmlPath)).href, { waitUntil: 'networkidle0' });
  const { width, height } = await page.evaluate(() => ({
    width: Number(document.body.dataset.width),
    height: Number(document.body.dataset.height),
  }));
  if (!width || !height) throw new Error(`${htmlPath}: <body> needs data-width and data-height`);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.evaluate(() => document.fonts.ready);
  const clip = { x: 0, y: 0, width, height };

  const flat = Buffer.from(await page.screenshot({ clip }));
  fs.writeFileSync(`${outBase}.png`, flat);

  // Solo each layer in turn on a transparent page and capture it.
  await page.addStyleTag({ content: '[data-solo-hidden]{visibility:hidden!important}' });
  const names = await page.$$eval('body > [data-layer]', (els) => els.map((e) => e.dataset.layer));
  const children = [];
  for (let i = 0; i < names.length; i++) {
    await page.evaluate((i) => {
      document.querySelectorAll('body > [data-layer]').forEach((e, j) => e.toggleAttribute('data-solo-hidden', j !== i));
    }, i);
    const shot = PNG.sync.read(Buffer.from(await page.screenshot({ clip, omitBackground: true })));
    const layer = cropToContent(shot, names[i]);
    if (layer) children.push(layer);
    else console.warn(`  layer "${names[i]}" is empty, skipped`);
  }
  await page.close();

  const composite = PNG.sync.read(flat);
  fs.writeFileSync(`${outBase}.psd`, writePsdBuffer({ width, height, imageData: toImageData(composite), children }));
  console.log(`${outBase}.png + .psd (${children.length} layers: ${children.map((c) => c.name).join(', ')})`);
}

// Trim fully transparent borders so the PSD stays small and layers get real bounds.
function cropToContent({ width, height, data }, name) {
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3]) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  const w = maxX - minX + 1, h = maxY - minY + 1;
  const out = new Uint8ClampedArray(w * h * 4);
  for (let y = 0; y < h; y++) {
    const start = ((y + minY) * width + minX) * 4;
    out.set(data.subarray(start, start + w * 4), y * w * 4);
  }
  return { name, left: minX, top: minY, right: minX + w, bottom: minY + h, imageData: { width: w, height: h, data: out } };
}

function toImageData({ width, height, data }) {
  return { width, height, data: new Uint8ClampedArray(data.buffer, data.byteOffset, data.length) };
}
