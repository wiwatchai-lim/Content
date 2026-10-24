// Game 10 — a number hidden in fine wavy lines, three levels: the lines are a little thicker inside the digits,
// which you only notice from far away or when squinting. L1 two clear digits, L2 two faint digits,
// L3 three faint digits. Reveal: the picture blurs and shrinks ("step back"), then the number appears.
// The patterns are drawn on canvases at page load.
// Usage: node games/10-hidden-number/make.mjs [n1 n2 n3]   then   npm run video -- games/10-hidden-number
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { write, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const NUMS = [process.argv[2] || '73', process.argv[3] || '58', process.argv[4] || '264'];
// boost = extra line thickness inside the digits; wob = random thickness noise everywhere (hides the digits).
const SPEC = [
  { size: 620, boost: 2.6, wob: 1.2, pitch: 11 },
  { size: 620, boost: 1.5, wob: 1.9, pitch: 11 },
  { size: 470, boost: 1.35, wob: 1.9, pitch: 10 },
];

const canvases = [];
const level = (k) => ({ id, rev, p, D }) => {
  const n = NUMS[k], s = SPEC[k];
  canvases.push({ id: `${id}cv`, n, ...s });
  const draw = k === 2 ? `<script>${script()}</script>` : '';
  return {
    stage: `<div class="${id}zoom"><canvas id="${id}cv" class="${id}cv" width="${STAGE.w}" height="${STAGE.h}"></canvas><div class="${id}num">${n}</div></div>${draw}`,
    css: `
.${id}zoom{position:absolute;inset:0;animation:${id}back ${D}s both}
@keyframes ${id}back{0%,${p(rev)}{transform:scale(1)}${p(rev + 1.0)},100%{transform:scale(.6)}}
.${id}cv{position:absolute;inset:0;animation:${id}blur ${D}s both}
@keyframes ${id}blur{0%,${p(rev)}{filter:blur(0);opacity:1}${p(rev + 1.0)},${p(rev + 1.3)}{filter:blur(9px);opacity:1}${p(rev + 1.7)},100%{filter:blur(10px);opacity:.3}}
.${id}num{position:absolute;left:0;right:0;top:${STAGE.h / 2 + 30}px;transform:translateY(-50%);text-align:center;font:800 ${s.size}px/1 Archivo, Inter, sans-serif;
  color:var(--to-green);animation:${id}num ${D}s both}
@keyframes ${id}num{0%,${p(rev + 1.3)}{opacity:0}${p(rev + 1.7)},100%{opacity:1}}`,
    big: `IT'S ${n}!`,
    small: k === 0 ? 'SQUINT AND IT POPS OUT' : k === 1 ? 'HOLD YOUR PHONE FAR AWAY' : 'ONLY EAGLE EYES SEE ALL 3',
    focus: null,
    answer: `${n} (${n.length} digits, line boost ${s.boost} vs noise ${s.wob})`,
  };
};

// One script draws every canvas once the font is in; video.mjs awaits __seek before every frame.
function script() {
  return `
window.__ready = document.fonts.load('800 620px Archivo').then(() => {
  const W = ${STAGE.w}, H = ${STAGE.h};
  for (const c of ${JSON.stringify(canvases)}) {
    const m = document.createElement('canvas'); m.width = W; m.height = H;
    const mc = m.getContext('2d');
    mc.filter = 'blur(3px)'; mc.fillStyle = '#fff';
    mc.font = '800 ' + c.size + 'px Archivo, Inter, sans-serif'; mc.textAlign = 'center'; mc.textBaseline = 'middle';
    mc.fillText(c.n, W / 2, H / 2 + 30);
    const mask = mc.getImageData(0, 0, W, H).data;
    const at = (x, y) => mask[(Math.min(H - 1, Math.max(0, y | 0)) * W + Math.min(W - 1, Math.max(0, x | 0))) * 4] / 255;
    const ctx = document.getElementById(c.id).getContext('2d');
    ctx.fillStyle = '#FAFAFA'; ctx.fillRect(0, 0, W, H);
    ctx.fillStyle = '#123A29';
    let wob = 0;
    for (let y0 = -c.pitch; y0 < H + c.pitch; y0 += c.pitch) {
      for (let x = 0; x < W; x += 2) {
        const y = y0 + 3.5 * Math.sin(x / 26 + y0 / 40);
        // Fine random wobble everywhere hides the thicker digits up close; blurred, only the digits are left.
        if (x % 6 === 0) wob = (Math.sin(x * 12.9898 + y0 * 78.233) * 43758.5453 % 1 + 1) % 1;
        const t = 2.4 + c.boost * at(x, y) + wob * c.wob;
        ctx.fillRect(x, y - t / 2, 2.2, t);
      }
    }
  }
});
window.__seek = () => window.__ready;`;
}

const { html, answer } = levelClip({
  title: 'Hidden number',
  hook: { big: 'ONLY <em>3%</em><br>SEE LEVEL 3', small: 'FIND THE HIDDEN NUMBER' },
  levels: [
    { secs: 7, head: { title: 'WHAT<em>NUMBER?</em>', sub: '2 DIGITS · 7 SECONDS' }, build: level(0) },
    { secs: 6, head: { title: 'WHAT<em>NUMBER?</em>', sub: 'FAINTER · 6 SECONDS' }, build: level(1) },
    { secs: 5, head: { title: 'WHAT<em>NUMBER?</em>', sub: '3 DIGITS · 5 SECONDS' }, build: level(2) },
  ],
  end: { question: 'HOW MANY<br>DID YOU SEE?' },
});

write(HERE, {
  html,
  caption: `There's a number hidden in every picture 👀 Only 3% can read level 3!
Tip: squint or hold your phone far away 📱
Comment your score: 0, 1, 2 or 3 👇 and the numbers you saw!
#eyetest #hiddennumber #opticalillusion #brainteaser #puzzle #optical #fyp`,
  answer,
});
