// Slowly Growing photo carousels (Instagram), 1080×1080 (IG 1:1), 4 slides per episode:
//   01 cover (EP + title + hook) · 02 Mint's line · 03 Tao's line · 04 takeaway + channel name
// Uses the episode's text-free 1:1 art img/scene-square.png (picked from img/square-N.png, same image, a slower push-in each slide). No logo, Thai text.
//   node slowly-growing/carousel.mjs [ep numbers...]   -> episodes/epXX-*/carousel/0N.html (+ carousel.css)
//   npm run render -- slowly-growing/episodes/epXX-*/carousel   -> carousel/export/01-04.png + .psd
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { STORIES } from './stories.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const pad = (n) => String(n).padStart(2, '0');
// Vertical art from the TikTok clips (EP01) is cropped to a square; % = which part of the height stays.
const PY = {};
// Cover hook per episode (slide 1).
const HOOKS = [
  'ถ้าวันนี้รู้สึกช้ากว่าคนอื่น…ปัดดูนะ', 'สำหรับวันที่เหนื่อยแบบบอกไม่ถูก', 'กลัวว่าเลือกทางผิดอยู่หรือเปล่า?',
  'สำหรับคนที่เหงาท่ามกลางผู้คน', 'เดินมานานแล้ว ยังไม่เห็นปลายทาง?', 'สำหรับคนที่ให้ไปจนหมดใจ',
  'เคยรู้สึกว่าตัวเองไม่เก่งพอไหม?', 'สำหรับคนที่ยังรอใครบางคน', 'อยากปล่อยวาง แต่ยังทำไม่ได้?',
  'กลัวว่าจะเริ่มใหม่ช้าเกินไป?', 'พยายามทุกวัน แต่ยังไม่เห็นผล?', 'สำหรับช่วงที่ทุกอย่างเปลี่ยนไป',
  'สำหรับวันที่ผิดหวังในตัวเอง', 'เบื่อชีวิตที่วนซ้ำทุกวันไหม?', 'คิดถึงเพื่อนเก่า แต่ไม่กล้าทัก?',
  'ถึงฝันแล้ว ทำไมใจยังว่าง?', 'สำหรับคนที่อยู่ไกลบ้าน', 'เลื่อนฟีดแล้วรู้สึกแย่กับตัวเอง?',
  'ยังโกรธตัวเองในวันนั้นอยู่ไหม?', 'กลัวว่าพยายามแล้วจะไม่รอด?', 'สำหรับคนที่กลัวการสูญเสีย',
  'เด็กคนนั้นจะผิดหวังในตัวเราไหม?', 'สำหรับคนที่เป็นที่พึ่งให้ทุกคน', 'พยายามมาตั้งเยอะ แต่ไม่มีใครเห็น?',
  'วางแผนไว้ แต่ไม่เป็นอย่างที่คิด?', 'สำหรับวันที่ต้องย้ายออก', 'ร้องไห้บ่อยจนรู้สึกอ่อนแอ?',
  'สำหรับคืนที่ยาวเหลือเกิน', 'ถ้ารู้สึกว่าไม่มีเรา โลกก็หมุนได้…', 'เมื่อไหร่จะดีพอสักที?',
];

// Greedy Thai line breaks at spaces (Thai has no word spaces inside phrases, so phrases stay whole).
const wrap = (s, max = 15) => {
  const out = [];
  for (const w of s.split(' ')) {
    const last = out[out.length - 1];
    if (last !== undefined && [...last + w].length <= max) out[out.length - 1] = `${last} ${w}`;
    else out.push(w);
  }
  return out.join('<br>');
};
const takeaway = (c) => c.replace(/#.*/s, '').replace(/\(.*?\)/g, '').replace(/[\p{Extended_Pictographic}️‍]/gu, '').trim();

const CSS = `* { margin: 0; padding: 0; box-sizing: border-box; }
:root { --paper: 239, 232, 218; }
body { width: 1080px; height: 1080px; overflow: hidden; background: rgb(var(--paper)); position: relative; }
body > [data-layer] { position: absolute; inset: 0; }
.art img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: 50% var(--py, 100%);
           transform: scale(var(--z, 1.03)); transform-origin: 50% 100%; }
.wash { background: linear-gradient(rgba(var(--paper),.96) 0, rgba(var(--paper),.9) var(--w1, 360px), rgba(var(--paper),0) var(--w2, 560px)); }
.vig { box-shadow: inset 0 0 160px rgba(70,55,40,.34); }
.text { text-align: center; color: #3a332c; text-shadow: 0 0 18px rgb(var(--paper)), 0 0 6px rgb(var(--paper));
        display: flex; flex-direction: column; align-items: center; padding-top: 62px; }
.ep, .who, .brand { font-family: 'Cormorant Garamond', serif; font-style: italic; font-weight: 500; color: #8a7560; letter-spacing: 8px; }
.ep { font-size: 30px; }
h1 { font: 400 var(--h1, 96px)/1.25 'Sriracha', cursive; font-weight: 400; margin-top: 10px; white-space: nowrap; }
.hook { margin-top: 18px; font: 400 40px/1.4 'Sriracha', cursive; color: #6b5440; }
.who { font-size: 38px; letter-spacing: 5px; }
.line { margin-top: 14px; font: 400 var(--fs, 58px)/1.45 'Sriracha', cursive; white-space: nowrap; }
.big { margin-top: 30px; font: 400 var(--fs, 72px)/1.4 'Sriracha', cursive; white-space: nowrap; }
.brand { margin-top: 26px; font-size: 34px; color: #6b5440; }
.sub { margin-top: 10px; font: 400 28px/1.3 'Sriracha', cursive; color: #8a7560; }
.help { margin-top: 10px; font: 400 26px/1.3 'Sriracha', cursive; color: #6b5440; }
.page { position: absolute; bottom: 30px; right: 40px; font: 400 28px/1 'Sriracha', cursive; color: #8a7560; opacity: .8; }
`;

const page = (s, title, z, w1, w2, text) => `<!doctype html>
<html lang="th">
<head>
<meta charset="utf-8">
<title>${title}</title>
<link href="https://fonts.googleapis.com/css2?family=Sriracha&family=Cormorant+Garamond:ital,wght@1,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="carousel.css">
</head>
<body data-width="1080" data-height="1080" style="--z:${z};--w1:${w1}px;--w2:${w2}px;--py:${PY[s.slug] ?? 100}%">
  <div data-layer="art" class="art"><img src="../img/scene-square.png" alt=""></div>
  <div data-layer="wash" class="wash"></div>
  <div data-layer="vignette" class="vig"></div>
  <div data-layer="text" class="text">
${text}
  </div>
</body>
</html>
`;

const want = process.argv.slice(2).map(Number);
STORIES.forEach((s, i) => {
  const n = i + 1;
  if (want.length && !want.includes(n)) return;
  const ep = `${ROOT}/episodes/ep${pad(n)}-${s.slug}`;
  if (!fs.existsSync(`${ep}/img/scene-square.png`)) { console.log(`skip EP${pad(n)} (no img/scene-square.png yet)`); return; }
  const dir = `${ep}/carousel`;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(`${dir}/carousel.css`, CSS);
  const hook = HOOKS[i];
  const help = (s.caption.match(/\((.*?)\)/) || [])[1];           // e.g. EP29 mental-health hotline
  const fs1 = (t, base, small) => (t.split('<br>').length > 3 ? small : base);
  const a = wrap(s.a), b = wrap(s.b), tk = wrap(takeaway(s.caption), 12);
  const h1 = [...s.title].length > 14 ? Math.round(96 * 14 / [...s.title].length) : 96;
  const slides = [
    [1.00, 330, 470, `    <p class="ep">SLOWLY GROWING · EP.${pad(n)}</p>\n    <h1 style="--h1:${h1}px">${s.title}</h1>\n    <p class="hook">${wrap(hook, 26)}</p>`],
    [1.03, 360, 500, `    <p class="who">— Mint —</p>\n    <p class="line" style="--fs:${fs1(a, 58, 48)}px">“${a}”</p>\n    <p class="page">2/4</p>`],
    [1.06, 360, 500, `    <p class="who">— Tao —</p>\n    <p class="line" style="--fs:${fs1(b, 58, 48)}px">“${b}”</p>\n    <p class="page">3/4</p>`],
    [1.09, 380, 520, `    <p class="big" style="--fs:${fs1(tk, 72, 60)}px">${tk}</p>\n    <p class="brand">Slowly Growing</p>\n    <p class="sub">ค่อย ๆ โต ไปด้วยกัน</p>${help ? `
    <p class="help">${help}</p>` : ''}`],
  ];
  slides.forEach(([z, w1, w2, t], j) => fs.writeFileSync(`${dir}/0${j + 1}.html`, page(s, `${s.title} ${j + 1}`, z, w1, w2, t)));
  console.log(dir);
});
