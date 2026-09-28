// Save the sound of a TikTok video as a local reference track (for beat sync and preview only).
// The upload to TikTok uses TikTok's own sound, never this file.
// Usage: node tools/tiktok-sound.mjs <tiktok video url> <out dir>
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const [url, outDir] = process.argv.slice(2);
if (!url || !outDir) {
  console.error('Usage: node tools/tiktok-sound.mjs <tiktok video url> <out dir>');
  process.exit(1);
}

const res = await fetch('https://www.tikwm.com/api/', {
  method: 'POST',
  headers: { 'User-Agent': 'Mozilla/5.0', 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ url }),
});
const json = await res.json();
if (json.code !== 0) throw new Error(`TikWM: ${json.msg}`);

const m = json.data.music_info;
const audio = await fetch(m.play, { headers: { 'User-Agent': 'Mozilla/5.0' } });
if (!audio.ok) throw new Error(`audio download failed: ${audio.status}`);

await mkdir(outDir, { recursive: true });
const file = path.join(outDir, 'sound.mp3');
await writeFile(file, Buffer.from(await audio.arrayBuffer()));
const info = { title: m.title, author: m.author, duration: m.duration, original: m.original, music_id: m.id, from_video: url };
await writeFile(path.join(outDir, 'sound.json'), JSON.stringify(info, null, 2));
console.log(file, info);
