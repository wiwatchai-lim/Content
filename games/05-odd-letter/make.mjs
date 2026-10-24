// Game 5 — odd letter out, three levels: a Q among Os, then an 8 among Bs in a bigger grid,
// then a tightly kerned "rn" among lowercase m (the classic look-alike) in the biggest grid.
// Usage: node games/05-odd-letter/make.mjs [seed]   then   npm run video -- games/05-odd-letter
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rand = rng(process.argv[2] || 'odd-letter');

// Pick a cell away from the centre and the outer ring, where eyes land last.
function spot(cols, rows) {
  for (;;) {
    const c = 1 + Math.floor(rand() * (cols - 2)), r = 1 + Math.floor(rand() * (rows - 2));
    if (Math.hypot((c - (cols - 1) / 2) / cols, (r - (rows - 1) / 2) / rows) > 0.18) return [c, r];
  }
}

const level = ({ target, filler, cols, rows, font, weight = 700, size = 0.78, track = 'normal' }) => ({ id, rev, p, D }) => {
  const cell = Math.min(STAGE.w / cols, STAGE.h / rows);
  const ox = (STAGE.w - cell * cols) / 2, oy = (STAGE.h - cell * rows) / 2;
  const [tc, tr] = spot(cols, rows);
  let cells = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const hit = r === tr && c === tc;
    cells += `<span class="ch${hit ? ' hit' : ''}">${hit ? target : filler}</span>`;
  }
  const x = ox + (tc + 0.5) * cell, y = oy + (tr + 0.5) * cell;
  return {
    stage: `<div class="${id}g">${cells}</div><div class="${id}ring"></div>`,
    css: `
.${id}g{position:absolute;left:${ox}px;top:${oy}px;display:grid;grid-template-columns:repeat(${cols},${cell}px);grid-auto-rows:${cell}px;font-family:${font};font-weight:${weight};letter-spacing:${track};font-size:${Math.round(cell * size)}px}
.${id}g .ch{display:flex;align-items:center;justify-content:center;line-height:1;animation:${id}dim ${D}s both}
@keyframes ${id}dim{0%,${p(rev)}{color:var(--to-green)}${p(rev + 0.4)},100%{color:rgba(18,58,41,.15)}}
.${id}g .hit{animation:${id}pop ${D}s both}
@keyframes ${id}pop{0%,${p(rev)}{transform:scale(1);color:var(--to-green)}${p(rev + 0.35)}{transform:scale(1.9);color:${RED}}${p(rev + 0.7)},100%{transform:scale(1.4);color:${RED}}}
.${id}ring{position:absolute;left:${x}px;top:${y}px;width:${cell * 1.9}px;height:${cell * 1.9}px;margin:${-cell * 0.95}px 0 0 ${-cell * 0.95}px;
  border:${Math.max(5, Math.round(cell / 10))}px solid ${RED};border-radius:50%;animation:${id}ring ${D}s both}
@keyframes ${id}ring{0%,${p(rev)}{opacity:0;transform:scale(3)}${p(rev + 0.4)}{opacity:1;transform:scale(.9)}${p(rev + 0.6)},100%{opacity:1;transform:scale(1)}}`,
    big: 'FOUND IT?',
    small: `ROW ${tr + 1} · COLUMN ${tc + 1}`,
    focus: { x, y, scale: 2.2 },
    answer: `"${target}" among "${filler}" at row ${tr + 1}, column ${tc + 1} (${cols}×${rows} grid)`,
  };
};

const DISP = 'var(--to-font-display)', BODY = 'var(--to-font-body)';
const { html, answer } = levelClip({
  title: 'Odd letter out',
  hook: { big: 'ONLY <em>1%</em><br>PASS LEVEL 3', small: 'FIND THE ODD LETTER' },
  levels: [
    { secs: 5, head: { title: 'FIND THE<em>Q</em>', sub: 'ONE Q AMONG THE Os · 5 SECONDS' },
      build: level({ target: 'Q', filler: 'O', cols: 9, rows: 10, font: DISP }) },
    { secs: 4, head: { title: 'FIND THE<em>8</em>', sub: 'ONE 8 AMONG THE Bs · 4 SECONDS' },
      build: level({ target: '8', filler: 'B', cols: 12, rows: 13, font: DISP }) },
    { secs: 4, head: { title: `FIND THE<em style="font-family:${BODY};text-transform:none">rn</em>`, sub: 'AN r + n HIDING AMONG THE m · 4 SECONDS' },
      build: level({ target: 'rn', filler: 'm', cols: 12, rows: 14, font: BODY, weight: 500, track: '-0.07em' }) },
  ],
});

write(HERE, {
  html,
  caption: `Only 1% pass level 3 👀 Find the odd letter before the timer runs out!
Level 3 is an "rn" hiding among the m's… good luck 😅
Comment your score: 1, 2 or 3 👇 Tag a friend who needs an eye check 👓
#eyetest #findtheletter #oddoneout #puzzle #brainteaser #glasses #optical #fyp`,
  answer,
});
