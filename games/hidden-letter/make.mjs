// "Find the hidden letter" puzzle clips for TikTok (1080×1920, 14 s).
// A grid full of one letter hides a single look-alike; a 10-second countdown runs, then the answer is circled.
// Each puzzle becomes games/hidden-letter/puzzles/<NN>_<target>-in-<filler>/clip.html (+ caption.txt);
// render with: npm run video -- games/hidden-letter/puzzles/<folder> [...]
// Usage: node games/hidden-letter/make.mjs [count=10] [seed=<today>] [level]
//   level 1–10 fixes every puzzle to that level; 100 makes the diamond "LEVEL 100" boss puzzle.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(HERE, 'puzzles');
const count = Number(process.argv[2]) || 10;
const seedArg = process.argv[3] || new Date().toISOString().slice(0, 10);
const fixedLevel = Number(process.argv[4]) || 0;

// [hidden letter, filler letter] pools, one per difficulty level 1–10 (★ to ★★★★★★★★★★).
// Low levels: shapes that differ a lot; high levels: near-identical glyphs in a dense grid.
const POOLS = [
  [['F', 'E'], ['T', 'L'], ['A', 'V']],
  [['N', 'M'], ['K', 'X'], ['V', 'Y']],
  [['T', 'I'], ['H', 'N'], ['W', 'V']],
  [['R', 'P'], ['U', 'V'], ['L', 'I']],
  [['G', 'C'], ['B', 'R'], ['E', 'F']],
  [['Q', 'O'], ['P', 'R'], ['M', 'N']],
  [['D', 'O'], ['C', 'O'], ['G', 'O']],
  [['8', 'B'], ['5', 'S'], ['B', '8']],
  [['Z', '2'], ['S', '5'], ['C', 'G']],
  [['0', 'O'], ['O', '0'], ['1', 'I']],
];
// Grid size per level: [cols, rows].
const LEVELS = [[7, 10], [8, 11], [9, 12], [9, 13], [10, 14], [11, 15], [12, 16], [13, 18], [14, 19], [15, 20]];
// LEVEL 100: the closest look-alikes in the densest grid, with diamond stars.
const BOSS = 99;
POOLS[BOSS] = [['0', 'O'], ['O', '0'], ['8', 'B'], ['5', 'S']];
LEVELS[BOSS] = [20, 26];

const INTRO = 0.8;     // title + grid build-in
const COUNT = 10;      // countdown seconds
const REVEAL = INTRO + COUNT;
const DURATION = 14;

// Small deterministic PRNG (mulberry32) seeded from a string.
function rng(seedStr) {
  let h = 1779033703;
  for (const c of seedStr) h = Math.imul(h ^ c.charCodeAt(0), 3432918353), h = (h << 13) | (h >>> 19);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = rng(seedArg);
// Spread the puzzles evenly from level 1 to 10.
const levels = Array.from({ length: count }, (_, i) => (fixedLevel ? fixedLevel - 1
  : count === 1 ? 0 : Math.round((i * 9) / (count - 1))));
const pairs = levels.map((lv) => POOLS[lv][Math.floor(rand() * POOLS[lv].length)]);

fs.mkdirSync(OUT, { recursive: true });
const start = fs.readdirSync(OUT).filter((d) => /^\d+_/.test(d)).length;

pairs.forEach(([target, filler], i) => {
  const n = start + i + 1;
  const level = levels[i];
  const [cols, rows] = LEVELS[level];
  // Keep the answer off the outer ring so it is never trivially at an edge.
  const tc = 1 + Math.floor(rand() * (cols - 2));
  const tr = 1 + Math.floor(rand() * (rows - 2));
  const name = `${String(n).padStart(2, '0')}_${target}-in-${filler}`;
  const dir = path.join(OUT, name);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'clip.html'), page({ n, target, filler, cols, rows, tc, tr, level }));
  fs.writeFileSync(path.join(dir, 'caption.txt'), caption({ target, filler, level, n }));
  console.log(`${name}  level ${level + 1}  ${cols}×${rows}  answer: row ${tr + 1}, column ${tc + 1}`);
});

function page({ n, target, filler, cols, rows, tc, tr, level }) {
  const gridW = 900, gridH = 870;
  const cell = Math.min(gridW / cols, gridH / rows);
  const font = Math.round(cell * 0.78);
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const hit = r === tr && c === tc;
      // Rows drop in one after another during the intro.
      const d = (0.15 + (r / rows) * 0.5).toFixed(2);
      cells.push(`<span class="ch${hit ? ' hit' : ''}" style="--d:${d}s">${hit ? target : filler}</span>`);
    }
  }
  // One keyframe set per countdown digit so each shows only during its own second.
  const digitCss = [];
  const digits = [];
  for (let s = 0; s < COUNT; s++) {
    const from = ((INTRO + s) / DURATION) * 100, to = ((INTRO + s + 1) / DURATION) * 100;
    digitCss.push(`@keyframes dg${s}{0%,${(from - 0.01).toFixed(3)}%{opacity:0;transform:scale(1.4)}`
      + `${from.toFixed(3)}%{opacity:1;transform:scale(1.4)}${(from + 1.2).toFixed(3)}%{opacity:1;transform:scale(1)}`
      + `${(to - 0.01).toFixed(3)}%{opacity:1;transform:scale(1)}${to.toFixed(3)}%,100%{opacity:0}}`
      + `.dg${s}{animation:dg${s} ${DURATION}s linear both}`);
    digits.push(`<b class="dg dg${s}">${COUNT - s}</b>`);
  }
  const p = (t) => ((t / DURATION) * 100).toFixed(3) + '%';
  const boss = level === BOSS;
  const stars = boss ? '★'.repeat(10) : '★'.repeat(level + 1) + '☆'.repeat(9 - level);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Hidden letter ${n}</title>
<link rel="stylesheet" href="../../../../brand/tokens.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;700;800&family=Inter:wght@500;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1080px;height:1920px;overflow:hidden;background:var(--to-snow);color:var(--to-green);font-family:var(--to-font-display);position:relative}
.head{position:absolute;top:200px;left:0;right:0;text-align:center;animation:drop ${DURATION}s both}
.eyebrow{font:700 30px/1 var(--to-font-body);letter-spacing:var(--to-track-eyebrow);color:var(--to-black);opacity:.7}
.title{margin-top:18px;font-weight:800;font-size:92px;letter-spacing:var(--to-track-display);line-height:1}
.title em{font-style:normal;display:inline-block;background:var(--to-green);color:var(--to-snow);padding:0 22px;margin-left:10px}
.level{margin-top:20px;font:700 30px/1 var(--to-font-body);letter-spacing:.12em;color:var(--to-green-on-dark)}
.level.diamond{font-size:40px;filter:drop-shadow(0 0 6px rgba(120,210,255,.9)) drop-shadow(0 2px 2px rgba(30,80,120,.45))}
.level.diamond span{background:linear-gradient(110deg,#5fc8ef 0%,#e9fbff 18%,#8fdcff 32%,#ffffff 46%,#4cb4e6 60%,#d8f6ff 76%,#6fd0f5 100%);
  background-size:300% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:shine ${DURATION}s linear both}
@keyframes shine{0%{background-position:0% 0}100%{background-position:-600% 0}}
@keyframes drop{0%{opacity:0;transform:translateY(-40px)}${p(0.5)},100%{opacity:1;transform:none}}

.grid{position:absolute;left:50%;top:460px;transform:translateX(-50%);display:grid;
  grid-template-columns:repeat(${cols},${cell}px);grid-auto-rows:${cell}px}
.ch{display:flex;align-items:center;justify-content:center;font-weight:700;font-size:${font}px;line-height:1;
  animation:cellIn ${DURATION}s both, dim ${DURATION}s both;animation-delay:calc(var(--d) - 0s),0s}
@keyframes cellIn{0%{opacity:0;transform:translateY(-14px)}${p(0.35)},100%{opacity:1;transform:none}}
@keyframes dim{0%,${p(REVEAL)}{color:var(--to-green)}${p(REVEAL + 0.4)},100%{color:rgba(18,58,41,.18)}}
.ch.hit{position:relative;animation:cellIn ${DURATION}s both, pop ${DURATION}s both;animation-delay:calc(var(--d) - 0s),0s}
@keyframes pop{0%,${p(REVEAL)}{transform:scale(1);color:var(--to-green)}${p(REVEAL + 0.35)}{transform:scale(1.9);color:#C0392B}
  ${p(REVEAL + 0.7)},100%{transform:scale(1.45);color:#C0392B}}
.ring{position:absolute;left:${(tc + 0.5) * cell}px;top:${(tr + 0.5) * cell}px;width:${cell * 1.9}px;height:${cell * 1.9}px;
  margin:${-cell * 0.95}px 0 0 ${-cell * 0.95}px;border:8px solid #C0392B;border-radius:50%;animation:ring ${DURATION}s both}
@keyframes ring{0%,${p(REVEAL)}{opacity:0;transform:scale(3)}${p(REVEAL + 0.4)}{opacity:1;transform:scale(.9)}${p(REVEAL + 0.6)},100%{opacity:1;transform:scale(1)}}

.timer{position:absolute;left:90px;right:90px;top:1535px;height:16px;background:var(--to-timberwolf);animation:fadeOut ${DURATION}s both}
.timer i{position:absolute;inset:0;background:var(--to-green);transform-origin:left;animation:drain ${DURATION}s linear both}
@keyframes drain{0%,${p(INTRO)}{transform:scaleX(1)}${p(REVEAL)},100%{transform:scaleX(0)}}
.count{position:absolute;left:0;right:0;top:1345px;height:180px;text-align:center}
.dg{position:absolute;left:0;right:0;font-weight:800;font-size:170px;line-height:180px;opacity:0}
${digitCss.join('\n')}
@keyframes fadeOut{0%,${p(REVEAL)}{opacity:1}${p(REVEAL + 0.3)},100%{opacity:0}}

.answer{position:absolute;left:0;right:0;top:1360px;text-align:center;animation:ans ${DURATION}s both}
.answer .big{font-weight:800;font-size:96px;letter-spacing:var(--to-track-display)}
.answer .where{margin-top:14px;font:700 40px/1 var(--to-font-body);letter-spacing:.08em;color:var(--to-black)}
@keyframes ans{0%,${p(REVEAL + 0.3)}{opacity:0;transform:translateY(30px)}${p(REVEAL + 0.8)},100%{opacity:1;transform:none}}

</style></head>
<body data-width="1080" data-height="1920" data-duration="${DURATION}" data-fps="30">
<div class="head">
  <div class="eyebrow">EYE TEST · CAN YOU SPOT IT?</div>
  <div class="title">FIND THE<em>${target}</em></div>
  <div class="level${boss ? ' diamond' : ''}"><span>LEVEL ${level + 1} &nbsp;${stars}</span></div>
</div>
<div class="grid">
${cells.join('')}
<div class="ring"></div>
</div>
<div class="count">${digits.join('')}</div>
<div class="timer"><i></i></div>
<div class="answer"><div class="big">FOUND IT?</div><div class="where">ROW ${tr + 1} · COLUMN ${tc + 1}</div></div>
</body></html>
`;
}

function caption({ target, filler, level, n }) {
  return `Find the hidden "${target}" among the ${filler}s in 10 seconds 👀 ${level === BOSS ? 'LEVEL 100 💎 Only diamond eyes can find it' : `Level ${level + 1}/10`}
Comment your time ⏱️ Tag a friend who needs an eye check 👓
#eyetest #findthedifference #puzzle #brainteaser #glasses #optical #fyp
`;
}
