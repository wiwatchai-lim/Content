// Turn product photos shot on a plain background into transparent PNG layers.
// Color-to-alpha against the background color sampled from the image corners:
// background -> transparent, soft shadow and clear lenses -> partly transparent, frame -> opaque.
// Runs inside Chrome, so it needs no native image libraries.
// Usage: npm run cutout -- <output-folder> <image> [more images...]
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const CHROME = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].find((p) => fs.existsSync(p));

const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.avif': 'image/avif' };

const [outDir, ...inputs] = process.argv.slice(2);
if (!outDir || !inputs.length) {
  console.error('usage: npm run cutout -- <output-folder> <image> [more images...]');
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
try {
  const page = await browser.newPage();
  for (const input of inputs) {
    const mime = MIME[path.extname(input).toLowerCase()];
    if (!mime) throw new Error(`unsupported image type: ${input}`);
    const src = `data:${mime};base64,${fs.readFileSync(input).toString('base64')}`;
    const { png, bg } = await page.evaluate(cutout, src);
    const out = path.join(outDir, `${path.parse(input).name}.png`);
    fs.writeFileSync(out, Buffer.from(png.split(',')[1], 'base64'));
    console.log(`${out} (background rgb ${bg.join(',')})`);
  }
} finally {
  await browser.close();
}

async function cutout(src) {
  const img = new Image();
  img.src = src;
  await img.decode();
  const w = img.naturalWidth, h = img.naturalHeight;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, w, h);
  const d = image.data;

  // Background = average of the four 12x12 corner patches.
  const P = 12;
  let bg = [0, 0, 0], n = 0;
  for (const [cx, cy] of [[0, 0], [w - P, 0], [0, h - P], [w - P, h - P]]) {
    for (let y = cy; y < cy + P; y++) {
      for (let x = cx; x < cx + P; x++) {
        const i = (y * w + x) * 4;
        bg[0] += d[i]; bg[1] += d[i + 1]; bg[2] += d[i + 2]; n++;
      }
    }
  }
  bg = bg.map((v) => v / n);
  // Near-white studio backgrounds often have a brighter center than corners; treat them as pure white
  // so a slightly brighter pixel is not mistaken for opaque product.
  if (bg.every((v) => v > 230)) bg = [255, 255, 255];

  const FLOOR = 0.05; // JPEG noise and faint vignetting below this become fully transparent
  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      let a = 0;
      for (let k = 0; k < 3; k++) {
        const c = d[i + k], b = bg[k];
        const t = c < b ? (b - c) / b : (c - b) / (255 - b || 1);
        if (t > a) a = t;
      }
      if (a > 0) {
        for (let k = 0; k < 3; k++) d[i + k] = Math.max(0, Math.min(255, Math.round((d[i + k] - bg[k]) / a + bg[k])));
      }
      const alpha = a < FLOOR ? 0 : (a - FLOOR) / (1 - FLOOR);
      d[i + 3] = Math.round(alpha * d[i + 3]);
      if (d[i + 3] > 8) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  ctx.putImageData(image, 0, 0);

  // Crop to the product with a small margin so layouts can size it by width predictably.
  const pad = 16;
  minX = Math.max(0, minX - pad); minY = Math.max(0, minY - pad);
  maxX = Math.min(w - 1, maxX + pad); maxY = Math.min(h - 1, maxY + pad);
  const out = document.createElement('canvas');
  out.width = maxX - minX + 1;
  out.height = maxY - minY + 1;
  out.getContext('2d').drawImage(canvas, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
  return { png: out.toDataURL('image/png'), bg: bg.map(Math.round) };
}
