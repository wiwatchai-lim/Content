// Build สั่งคลิป.html: a click-to-order page that writes a short Thai order for Claude Code.
// It reads the stock list, the songs in music/ and the finished clips in kits/, so re-run it after those change:
//   node tools/build-order-page.mjs
import { readdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const stockFile = readdirSync(path.join(ROOT, 'data/frames')).filter((f) => /^frames-stock-.*\.csv$/.test(f)).sort().pop();
const frames = readFileSync(path.join(ROOT, 'data/frames', stockFile), 'utf8').replace(/^﻿/, '')
  .split(/\r?\n/).slice(1).filter(Boolean)
  .map((l) => l.match(/("([^"]*)"|[^,]*)(,|$)/g).map((c) => c.replace(/,$/, '').replace(/^"|"$/g, '')))
  .map(([brand, model]) => `${brand} ${model}`.trim());
const songs = readdirSync(path.join(ROOT, 'music')).filter((f) => /\.(m4a|mp3|wav)$/i.test(f)).map((f) => f.replace(/\.[^.]+$/, ''));
const clips = readdirSync(path.join(ROOT, 'kits'))
  .filter((d) => existsSync(path.join(ROOT, 'kits', d, 'export', 'clip-hf.mp4')))
  .sort().reverse();

const data = JSON.stringify({ frames, songs, clips, stockFile });
const html = `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>สั่งคลิป TIMEOPTIC</title>
<style>
  :root { --bg: #f6f3ee; --card: #fff; --ink: #212121; --muted: #6b665e; --line: #e2ddd4; --accent: #123A29; --accent-ink: #fafafa; }
  @media (prefers-color-scheme: dark) { :root { --bg: #171a18; --card: #222623; --ink: #eee; --muted: #a9a59c; --line: #343934; --accent: #41996E; --accent-ink: #0d100e; } }
  * { box-sizing: border-box; }
  body { margin: 0; background: var(--bg); color: var(--ink); font: 16px/1.5 system-ui, "Noto Sans Thai", sans-serif; }
  main { max-width: 760px; margin: 0 auto; padding: 24px 16px 60px; }
  h1 { font-size: 24px; margin: 0 0 4px; } h2 { font-size: 18px; margin: 0 0 12px; }
  p.hint { color: var(--muted); margin: 0 0 20px; font-size: 14px; }
  section { background: var(--card); border: 1px solid var(--line); border-radius: 12px; padding: 16px; margin-bottom: 16px; }
  .row { display: grid; grid-template-columns: 1fr 150px 170px 36px; gap: 8px; margin-bottom: 8px; }
  @media (max-width: 640px) { .row { grid-template-columns: 1fr 1fr; } .row input[type=text] { grid-column: 1 / -1; } }
  input, select, textarea { width: 100%; font: inherit; color: inherit; background: var(--bg); border: 1px solid var(--line); border-radius: 8px; padding: 8px 10px; }
  textarea { min-height: 80px; resize: vertical; }
  button { font: inherit; border: 1px solid var(--line); background: var(--bg); color: inherit; border-radius: 8px; padding: 8px 14px; cursor: pointer; }
  button.primary { background: var(--accent); color: var(--accent-ink); border-color: var(--accent); font-weight: 600; }
  .bar { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 8px; }
  #out { min-height: 120px; font-family: ui-monospace, Consolas, monospace; font-size: 14px; }
  .ok { color: var(--accent); font-size: 14px; margin-left: 8px; }
  label { display: block; font-size: 14px; color: var(--muted); margin: 10px 0 4px; }
</style>
</head>
<body>
<main>
  <h1>สั่งคลิป</h1>
  <p class="hint">เลือกแว่น แล้วกด "สร้างคำสั่ง" จากนั้นกด "คัดลอก" แล้ววางในช่องแชต Claude Code · รายการแว่นจาก <span id="stockname"></span></p>

  <section>
    <h2>คลิปใหม่</h2>
    <div id="rows"></div>
    <div class="bar">
      <button id="add">+ เพิ่มแว่น</button>
      <button id="rand">🎲 สุ่มแว่น</button>
    </div>
    <datalist id="frames"></datalist>
  </section>

  <section>
    <h2>แก้คลิปเดิม</h2>
    <label for="clip">คลิป</label>
    <select id="clip"><option value="">— ไม่แก้ —</option></select>
    <label for="fix">อยากแก้อะไร</label>
    <textarea id="fix" placeholder="เช่น รถช้าลง, เปลี่ยนเพลง, ตัวหนังสือใหญ่ขึ้น"></textarea>
  </section>

  <section>
    <h2>บอกเพิ่ม (ไม่ใส่ก็ได้)</h2>
    <textarea id="extra" placeholder="เช่น ใส่ราคา 3,990 บาท, อยากได้ผู้หญิงใส่แว่น"></textarea>
  </section>

  <section>
    <div class="bar" style="margin-top:0">
      <button class="primary" id="build">สร้างคำสั่ง</button>
      <button id="copy">คัดลอก</button><span class="ok" id="copied"></span>
    </div>
    <label for="out">คำสั่ง</label>
    <textarea id="out" readonly></textarea>
  </section>
</main>
<script>
const DATA = ${data};
const MOODS = ['อารมณ์: ให้ Claude เลือก', 'มินิมอล', 'สปอร์ต เร็ว แรง', 'แฟชั่น โรแมนติก', 'เอาท์ดอร์ ธรรมชาติ', 'หรู นิ่ง', 'สตรีท ฮิปฮอป', 'สดใส ป๊อป'];
const $ = (id) => document.getElementById(id);
$('stockname').textContent = DATA.stockFile;
$('frames').innerHTML = DATA.frames.map((f) => '<option value="' + f.replace(/"/g, '&quot;') + '">').join('');
DATA.clips.forEach((c) => $('clip').insertAdjacentHTML('beforeend', '<option>' + c + '</option>'));

function addRow(value = '') {
  const row = document.createElement('div');
  row.className = 'row';
  row.innerHTML = '<input type="text" list="frames" placeholder="พิมพ์ยี่ห้อ/รุ่น เช่น Bolon BJ3185 หรือ Vogue ซักรุ่น">'
    + '<select>' + MOODS.map((m) => '<option>' + m + '</option>').join('') + '</select>'
    + '<select><option value="">เพลง: ให้ Claude เลือก</option>' + DATA.songs.map((s) => '<option>' + s + '</option>').join('') + '</select>'
    + '<button title="ลบ">✕</button>';
  row.querySelector('input').value = value;
  row.querySelector('button').onclick = () => row.remove();
  $('rows').append(row);
}
$('add').onclick = () => addRow();
$('rand').onclick = () => addRow(DATA.frames[Math.floor(Math.random() * DATA.frames.length)]);
addRow();

$('build').onclick = () => {
  const lines = [];
  const rows = [...document.querySelectorAll('.row')]
    .map((r) => { const [i, m, s] = r.querySelectorAll('input, select'); return { f: i.value.trim(), m: m.selectedIndex ? m.value : '', s: s.value }; })
    .filter((r) => r.f);
  if (rows.length) {
    lines.push('ทำคลิป ' + rows.length + ' ตัว:');
    rows.forEach((r, n) => lines.push((n + 1) + '. ' + r.f + (r.m ? ' · อารมณ์ ' + r.m : '') + (r.s ? ' · เพลง ' + r.s : '')));
  }
  if ($('clip').value && $('fix').value.trim()) lines.push('แก้คลิป ' + $('clip').value + ': ' + $('fix').value.trim());
  if ($('extra').value.trim()) lines.push('เพิ่มเติม: ' + $('extra').value.trim());
  $('out').value = lines.join('\\n') || 'ยังไม่ได้เลือกอะไร';
};
$('copy').onclick = async () => {
  if (!$('out').value) $('build').onclick();
  try { await navigator.clipboard.writeText($('out').value); } catch { $('out').select(); document.execCommand('copy'); }
  $('copied').textContent = 'คัดลอกแล้ว';
  setTimeout(() => ($('copied').textContent = ''), 1500);
};
</script>
</body>
</html>
`;
writeFileSync(path.join(ROOT, 'สั่งคลิป.html'), html);
console.log(`สั่งคลิป.html: ${frames.length} frames, ${songs.length} songs, ${clips.length} clips`);
