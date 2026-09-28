// Render an animated post page to a looping MP4.
//   posts/<folder>/clip.html  ->  posts/<folder>/export/clip.mp4
// The page is captured frame by frame: every CSS animation is paused and seeked to an exact
// time, so the result is deterministic and a full loop lands exactly on the first frame again.
// <body> needs data-width, data-height and (optionally) data-duration (seconds) and data-fps.
// JS-drawn pages (WebGL depth parallax etc.) also define window.__seek(ms); it is awaited each frame.
// Usage: npm run video -- posts/2026-09-16_boss1197 [more post folders...]
//        npm run video -- kits/<folder>/clip-25d.html   (any page -> export/<page name>.mp4)
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import ffmpegPath from 'ffmpeg-static';

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
  console.error('usage: npm run video -- <post-folder> [...]');
  process.exit(1);
}

const browser = await puppeteer.launch({ executablePath: CHROME, headless: true, args: ['--allow-file-access-from-files'] });
try {
  for (const arg of dirs) {
    // A folder renders its clip.html; an .html file renders itself to export/<name>.mp4 beside it.
    const htmlPath = arg.endsWith('.html') ? arg : path.join(arg, 'clip.html');
    if (!fs.existsSync(htmlPath)) {
      console.warn(`no ${htmlPath}`);
      continue;
    }
    const dir = path.dirname(htmlPath);
    fs.mkdirSync(path.join(dir, 'export'), { recursive: true });
    await renderClip(htmlPath, path.join(dir, 'export', path.basename(htmlPath, '.html') + '.mp4'));
  }
} finally {
  await browser.close();
}

async function renderClip(htmlPath, outFile) {
  const page = await browser.newPage();
  await page.goto(pathToFileURL(path.resolve(htmlPath)).href, { waitUntil: 'networkidle0' });
  const { width, height, duration, fps } = await page.evaluate(() => ({
    width: Number(document.body.dataset.width),
    height: Number(document.body.dataset.height),
    duration: Number(document.body.dataset.duration) || 6,
    fps: Number(document.body.dataset.fps) || 30,
  }));
  if (!width || !height) throw new Error(`${htmlPath}: <body> needs data-width and data-height`);
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.evaluate(() => document.fonts.ready);

  const ffmpeg = spawn(ffmpegPath, [
    '-y',
    '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '20',
    '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
    outFile,
  ], { stdio: ['pipe', 'ignore', 'pipe'] });
  let ffmpegErr = '';
  ffmpeg.stderr.on('data', (d) => { ffmpegErr += d; });
  const done = new Promise((resolve, reject) => {
    ffmpeg.on('error', reject);
    ffmpeg.on('close', (code) => (code === 0 ? resolve() : reject(new Error(ffmpegErr.trim().split('\n').slice(-3).join('\n')))));
  });

  // The last frame of the loop equals the first, so stop one frame short.
  const frames = Math.round(duration * fps);
  for (let i = 0; i < frames; i++) {
    // Pages that draw with JS (WebGL, canvas) expose window.__seek(ms) and redraw for that time.
    await page.evaluate(async (ms) => {
      document.getAnimations().forEach((a) => { a.pause(); a.currentTime = ms; });
      if (window.__seek) await window.__seek(ms);
    }, (i / fps) * 1000);
    const shot = Buffer.from(await page.screenshot({ clip: { x: 0, y: 0, width, height } }));
    if (!ffmpeg.stdin.write(shot)) await new Promise((r) => ffmpeg.stdin.once('drain', r));
  }
  ffmpeg.stdin.end();
  await done;
  await page.close();
  console.log(`${outFile} (${frames} frames, ${duration}s @ ${fps}fps, ${width}x${height})`);
}
