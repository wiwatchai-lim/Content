// Three-level game clip: a hook card, then LEVEL 1 → 2 → 3 (each harder, less time), then a score card.
// Each level: banner slam (LEVEL N · EASY/HARD/INSANE), the puzzle with a countdown that turns red and shakes
// in the last 3 seconds, then the reveal with a punch-in on the answer, then the next level.
// A game only supplies the puzzles: `levels[i].build(ctx)` returns the stage HTML/CSS and its own reveal animation.
import { pct, page, STAGE, RED } from './clip.mjs';

export const HOOK = 1.6;      // hook card at the start
export const BANNER = 1.0;    // LEVEL N slam before each puzzle
export const REVEAL = 2.6;    // answer on screen before the next level
export const END = 3.4;       // score card
export const TIERS = ['EAGLE EYES', 'SHARP EYES', 'NOT BAD', 'EYE TEST TIME'];
const DIFF = [['EASY', 'var(--to-green-on-dark)'], ['HARD', '#D68A1E'], ['INSANE', RED]];

// levels: [{ secs, head: { eyebrow, title, sub }, build(ctx) }]
//   ctx = { i, id, cs (countdown start), rev (reveal time), t1 (level end), D, p }
//   build returns { stage, css?, big?, small?, focus?: {x, y, scale?} in stage px, answer: one line for answer.txt }
// hook: { top, big (may hold <em>), small }   end: { question, sub }   tiers: score labels for 3,2,1,0 levels.
export function levelClip({ title, hook, levels, end = {}, tiers = TIERS, root = '../..' }) {
  const plan = [];
  let t = HOOK;
  for (const L of levels) {
    const t0 = t, cs = t0 + BANNER, rev = cs + L.secs, t1 = rev + REVEAL;
    plan.push({ t0, cs, rev, t1 });
    t = t1;
  }
  const endAt = t, D = +(t + END).toFixed(2);
  const p = pct(D);
  let css = '', stage = '', extra = '', heads = '';
  const answers = [];

  // Hook card.
  css += `
.hook{position:absolute;left:0;right:0;top:560px;text-align:center;animation:hookk ${D}s both}
.hook .top{font:700 34px/1 var(--to-font-body);letter-spacing:var(--to-track-eyebrow);color:var(--to-black);opacity:.75}
.hook .big{margin-top:34px;font-weight:800;font-size:136px;line-height:.98;letter-spacing:var(--to-track-display)}
.hook .big em{font-style:normal;color:${RED}}
.hook .small{margin-top:40px;display:inline-block;font:800 40px/1 var(--to-font-body);letter-spacing:.12em;color:var(--to-snow);background:var(--to-green);padding:20px 34px}
@keyframes hookk{0%{opacity:0;transform:scale(1.25)}${p(0.25)}{opacity:1;transform:scale(.97)}${p(0.4)}{transform:scale(1)}${p(HOOK - 0.25)}{opacity:1;transform:scale(1)}${p(HOOK)},100%{opacity:0;transform:scale(.9)}}
.hook .small{animation:hooks ${D}s both}
@keyframes hooks{0%,${p(0.45)}{opacity:0;transform:translateY(20px)}${p(0.7)},100%{opacity:1;transform:none}}`;
  extra += `<div class="hook"><div class="top">${hook.top || 'EYE TEST · 3 LEVELS'}</div><div class="big">${hook.big}</div>${hook.small ? `<div class="small">${hook.small}</div>` : ''}</div>`;

  levels.forEach((L, i) => {
    const { t0, cs, rev, t1 } = plan[i];
    const id = `L${i}`;
    const b = L.build({ i, id, cs, rev, t1, D, p });
    answers.push(`Level ${i + 1}: ${b.answer}`);
    const [dname, dcol] = L.diff || DIFF[i] || DIFF[2];

    // Segment visibility: head + stage live from the banner until the level ends.
    css += `
@keyframes ${id}seg{0%,${p(t0)}{opacity:0}${p(t0 + 0.25)},${p(t1 - 0.25)}{opacity:1}${p(t1)},100%{opacity:0}}
.${id}{animation:${id}seg ${D}s both}
@keyframes ${id}stg{0%,${p(cs - 0.35)}{opacity:0;transform:scale(.94)}${p(cs)},${p(t1 - 0.25)}{opacity:1;transform:none}${p(t1)},100%{opacity:0}}
.${id}stg{position:absolute;inset:0;overflow:hidden;animation:${id}stg ${D}s both}`;

    // Banner slam.
    css += `
.${id}ban{position:absolute;left:0;right:0;top:${STAGE.top + 250}px;text-align:center;animation:${id}ban ${D}s both;z-index:5}
@keyframes ${id}ban{0%,${p(t0)}{opacity:0;transform:scale(2.2)}${p(t0 + 0.18)}{opacity:1;transform:scale(.95)}${p(t0 + 0.3)},${p(cs - 0.3)}{opacity:1;transform:scale(1)}${p(cs - 0.05)},100%{opacity:0;transform:scale(1.1)}}`;
    extra += `<div class="ban ${id}ban"><div class="lv">LEVEL ${i + 1}</div><div class="df" style="background:${dcol}">${dname}</div></div>`;

    // Punch-in on the answer, then back out so the whole picture shows again.
    let zoom = '';
    if (b.focus) {
      const s = b.focus.scale || 1.8;
      zoom = `.${id}zm{position:absolute;inset:0;transform-origin:${b.focus.x}px ${b.focus.y}px;animation:${id}zm ${D}s both}
@keyframes ${id}zm{0%,${p(rev + 0.5)}{transform:scale(1)}${p(rev + 0.95)},${p(rev + 1.9)}{transform:scale(${s})}${p(rev + 2.35)},100%{transform:scale(1)}}`;
    } else zoom = `.${id}zm{position:absolute;inset:0}`;

    // Shake in the last 2 seconds of the countdown.
    const sh = [`0%,${p(rev - 2)}{transform:none}`];
    for (let k = 0, tt = rev - 2; tt < rev - 0.05; k++, tt += 0.1) {
      const a = 2 + (k / 20) * 5;
      sh.push(`${p(tt)}{transform:translate(${k % 2 ? a : -a}px,${k % 3 === 1 ? a * 0.6 : -a * 0.4}px)}`);
    }
    sh.push(`${p(rev)},100%{transform:none}`);
    css += `
${zoom}
.${id}sh{position:absolute;inset:0;animation:${id}sh ${D}s linear both}
@keyframes ${id}sh{${sh.join('')}}
${b.css || ''}`;

    heads += `<div class="head ${id}"><div class="eyebrow">${L.head.eyebrow || `LEVEL ${i + 1} OF ${levels.length}`}</div><div class="title">${L.head.title}</div>${L.head.sub ? `<div class="sub">${L.head.sub}</div>` : ''}</div>`;
    stage += `<div class="${id}stg"><div class="${id}sh"><div class="${id}zm">${b.stage}</div></div></div>`;

    // Countdown: green digits, red + bigger in the last 3 seconds; red vignette pulses with each of those seconds.
    const n = L.secs, cd = [];
    for (let s = 0; s < n; s++) {
      const from = cs + s, to = cs + s + 1, red = n - s <= 3;
      cd.push(`<b class="dg ${id}d${s}"${red ? ` style="color:${RED}"` : ''}>${n - s}</b>`);
      css += `.${id}d${s}{animation:${id}d${s} ${D}s linear both}
@keyframes ${id}d${s}{0%,${p(from - 0.01)}{opacity:0}${p(from)}{opacity:1;transform:scale(${red ? 1.7 : 1.35})}${p(from + 0.25)}{opacity:1;transform:scale(1)}${p(to - 0.01)}{opacity:1;transform:scale(1)}${p(to)},100%{opacity:0}}`;
      if (red) css += `.${id}v${s}{animation:${id}v${s} ${D}s linear both}
@keyframes ${id}v${s}{0%,${p(from - 0.01)}{opacity:0}${p(from)}{opacity:${(0.55 + (3 - (n - s)) * 0.2).toFixed(2)}}${p(from + 0.6)},100%{opacity:0}}`;
    }
    css += `.${id}t{animation:${id}tf ${D}s both}.${id}t i{animation:${id}tn ${D}s linear both}
@keyframes ${id}tn{0%,${p(cs)}{transform:scaleX(1);background:var(--to-green)}${p(rev - 3)}{background:var(--to-green)}${p(rev - 2.9)}{background:${RED}}${p(rev)},100%{transform:scaleX(0);background:${RED}}}
@keyframes ${id}tf{0%,${p(cs - 0.3)}{opacity:0}${p(cs)},${p(rev)}{opacity:1}${p(rev + 0.3)},100%{opacity:0}}`;
    extra += `<div class="count">${cd.join('')}</div><div class="timer ${id}t"><i></i></div>`;
    for (let s = Math.max(0, n - 3); s < n; s++) extra += `<div class="vig ${id}v${s}"></div>`;

    // Answer line under the stage.
    css += `.${id}ans{animation:${id}ans ${D}s both}
@keyframes ${id}ans{0%,${p(rev + 0.25)}{opacity:0;transform:translateY(30px)}${p(rev + 0.6)},${p(t1 - 0.25)}{opacity:1;transform:none}${p(t1)},100%{opacity:0}}`;
    extra += `<div class="answer ${id}ans"><div class="big">${b.big || 'FOUND IT?'}</div>${b.small ? `<div class="where">${b.small}</div>` : ''}</div>`;

    // Progress pips: dim before the level, lit from its start.
    css += `.pip${i}{animation:pip${i} ${D}s both}@keyframes pip${i}{0%,${p(t0)}{background:transparent;color:var(--to-green)}${p(t0 + 0.2)},100%{background:var(--to-green);color:var(--to-snow)}}`;
  });

  // Score card.
  const ladder = tiers.map((tx, k) => `<div class="tier"><b>${levels.length - k}/${levels.length}</b><span>${tx}</span></div>`).join('');
  css += `
.endc{position:absolute;left:0;right:0;top:560px;text-align:center;animation:endk ${D}s both}
.endc .big{font-weight:800;font-size:112px;line-height:1;letter-spacing:var(--to-track-display)}
.endc .tiers{margin:56px auto 0;width:760px;text-align:left}
.tier{display:flex;align-items:center;gap:36px;padding:20px 0;border-top:3px solid var(--to-hairline);font:800 52px/1 var(--to-font-display)}
.tier b{display:inline-block;width:170px;text-align:center;background:var(--to-green);color:var(--to-snow);padding:14px 0}
.tier:first-child b{background:${RED}}
.endc .sub{margin-top:50px;font:800 42px/1 var(--to-font-body);letter-spacing:.1em;color:${RED}}
@keyframes endk{0%,${p(endAt)}{opacity:0;transform:scale(.9)}${p(endAt + 0.35)},100%{opacity:1;transform:none}}
.endc .tier{animation:tierk ${D}s both}
${tiers.map((_, k) => `.endc .tier:nth-child(${k + 1}){animation-name:tier${k}}@keyframes tier${k}{0%,${p(endAt + 0.3 + k * 0.18)}{opacity:0;transform:translateX(-40px)}${p(endAt + 0.55 + k * 0.18)},100%{opacity:1;transform:none}}`).join('\n')}`;
  extra += `<div class="endc"><div class="big">${end.question || 'HOW MANY<br>LEVELS?'}</div><div class="tiers">${ladder}</div><div class="sub">${end.sub || 'COMMENT YOUR SCORE 👇'}</div></div>`;

  // Shared styles for the level parts.
  css = `
.head{opacity:0}
.ban .lv{font-weight:800;font-size:190px;line-height:1;letter-spacing:var(--to-track-display)}
.ban .df{display:inline-block;margin-top:24px;padding:16px 40px;font:800 54px/1 var(--to-font-body);letter-spacing:.2em;color:var(--to-snow)}
.vig{position:absolute;inset:0;pointer-events:none;box-shadow:inset 0 0 170px 40px rgba(192,57,43,.55);opacity:0;z-index:4}
.pips{position:absolute;left:0;right:0;top:1640px;display:flex;justify-content:center;gap:22px;animation:pipsk ${D}s both}
@keyframes pipsk{0%,${p(HOOK - 0.2)}{opacity:0}${p(HOOK)},${p(endAt - 0.3)}{opacity:1}${p(endAt)},100%{opacity:0}}
.pips span{width:150px;padding:14px 0;text-align:center;border:4px solid var(--to-green);font:800 30px/1 var(--to-font-body);letter-spacing:.12em}
` + css;
  extra += `<div class="pips">${levels.map((_, i) => `<span class="pip${i}">LV ${i + 1}</span>`).join('')}</div>`;

  return {
    D,
    html: page({ title, D, css, head: null, stage, extra: heads + extra, root }),
    answer: answers.join('\n'),
  };
}
