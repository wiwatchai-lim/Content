// Game 2 — odd glasses out, three levels: round lenses among square ones, then slightly rounder corners in a
// bigger wall, then one pair with a double bridge in a dense wall with only 4 seconds.
// Usage: node games/02-odd-glasses/make.mjs [seed]   then   npm run video -- games/02-odd-glasses
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { rng, write, glasses, RED, STAGE } from '../_lib/clip.mjs';
import { levelClip } from '../_lib/levels.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const rand = rng(process.argv[2] || 'odd-glasses');

// A cell off the outer ring and away from the centre.
function spot(cols, rows) {
  for (;;) {
    const c = 1 + Math.floor(rand() * (cols - 2)), r = 1 + Math.floor(rand() * (rows - 2));
    if (Math.hypot((c - (cols - 1) / 2) / cols, (r - (rows - 1) / 2) / rows) > 0.15) return [c, r];
  }
}

const level = ({ cols, rows, normal, odd, why, scale = 2.2 }) => ({ id, rev, p, D }) => {
  const cw = STAGE.w / cols, ch = STAGE.h / rows;
  const [tc, tr] = spot(cols, rows);
  const a = glasses({ temples: false, ...normal }), b = glasses({ temples: false, ...odd });
  let items = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const hit = r === tr && c === tc;
    items += `<svg class="${id}c${hit ? ` ${id}hit` : ''}" style="left:${c * cw}px;top:${r * ch}px" viewBox="-4 20 408 130" width="${cw}" height="${ch}">${hit ? b : a}</svg>`;
  }
  const x = (tc + 0.5) * cw, y = (tr + 0.5) * ch;
  return {
    stage: items + `<div class="${id}ring"></div>`,
    css: `
.${id}c{position:absolute;padding:${Math.round(ch * 0.12)}px ${Math.round(cw * 0.07)}px;animation:${id}dim ${D}s both}
@keyframes ${id}dim{0%,${p(rev)}{opacity:1}${p(rev + 0.4)},100%{opacity:.16}}
.${id}c.${id}hit{animation:${id}pop ${D}s both}
@keyframes ${id}pop{0%,${p(rev)}{transform:scale(1)}${p(rev + 0.35)}{transform:scale(1.45)}${p(rev + 0.7)},100%{transform:scale(1.2)}}
.${id}ring{position:absolute;left:${x}px;top:${y}px;width:${cw * 1.45}px;height:${ch * 1.45}px;margin:${-ch * 0.725}px 0 0 ${-cw * 0.725}px;
  border:${Math.max(5, Math.round(cw / 28))}px solid ${RED};border-radius:50%;animation:${id}ring ${D}s both}
@keyframes ${id}ring{0%,${p(rev)}{opacity:0;transform:scale(3)}${p(rev + 0.4)}{opacity:1;transform:scale(.9)}${p(rev + 0.6)},100%{opacity:1;transform:scale(1)}}`,
    big: 'FOUND IT?',
    small: `ROW ${tr + 1} · PAIR ${tc + 1}<br>${why.toUpperCase()}`,
    focus: { x, y, scale },
    answer: `row ${tr + 1}, pair ${tc + 1} from the left (${cols}×${rows}): ${why}`,
  };
};

const { html, answer } = levelClip({
  title: 'Odd glasses',
  hook: { big: 'ONLY <em>1%</em><br>PASS LEVEL 3', small: 'FIND THE ODD PAIR' },
  levels: [
    { secs: 6, head: { title: 'ODD ONE<em>OUT</em>', sub: 'ONE PAIR IS DIFFERENT · 6 SECONDS' },
      build: level({ cols: 4, rows: 6, normal: { lensRx: 10 }, odd: { lensRx: 56 }, why: 'round lenses', scale: 1.9 }) },
    { secs: 5, head: { title: 'ODD ONE<em>OUT</em>', sub: 'SUBTLER · 5 SECONDS' },
      build: level({ cols: 5, rows: 8, normal: { lensRx: 16 }, odd: { lensRx: 30 }, why: 'rounder lens corners', scale: 2.0 }) },
    { secs: 4, head: { title: 'ODD ONE<em>OUT</em>', sub: 'TINY DETAIL · 4 SECONDS' },
      build: level({ cols: 6, rows: 10, normal: { lensRx: 22 }, odd: { lensRx: 22, bridge: 'double' }, why: 'double bridge (extra top bar)', scale: 1.9 }) },
  ],
});

write(HERE, {
  html,
  caption: `Only 1% find the odd pair in level 3 👓 One pair of glasses is different every round — can you beat the timer?
Comment your score: 1, 2 or 3 👇 Tag a friend with eagle eyes 🦅
#eyetest #oddoneout #puzzle #brainteaser #glasses #optical #fyp`,
  answer,
});
