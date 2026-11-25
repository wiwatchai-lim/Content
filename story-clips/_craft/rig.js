// ============================================================================================================
// rig.js — shared character + camera rig for the 2D story clips (HyperFrames + GSAP, seek-safe, deterministic).
// The theory behind every number here is in story-clips/_craft/GUIDE.md. Inline this file into a composition
// (build.py replaces /*RIG*/) after `const tl = gsap.timeline({ paused: true })` exists.
//
//   const R = Rig(tl, { seed: 7 });
//   const ton = R.puppet(svg, { x: 400, y: 1040, s: .85 }, R.LOOKS.ton);
//   R.walk(ton, 1.0, 3.2, { x: 900 });              // walk cycle to x=900 (front-facing "storybook" walk)
//   R.look(ton, 3.4, .8, 0);                        // eyes lead, head follows .1 s later, body .25 s later
//   R.emote(ton, 4.0, 'shock');                     // anticipation → stretch → hold, with brows/eyes/mouth/arms
//   R.talk(ton, 5.0, ENV[7], TEXT[7]);              // lip-sync from the line's loudness envelope + Thai vowels
//   R.blinks(ton, 0, 20);  R.breathe(ton, 0, 20);   // moving holds — never let a character freeze
//   const tonS = R.puppet(svg, { x: 200, y: 1040, s: .85, view: 'side', dir: 1 }, R.LOOKS.ton);   // profile, facing right
//   R.walkSide(tonS, 1, 4, { x: 1500 });            // contact/down/passing/up walk, stride matched to speed (no foot slide)
//   R.turn(6.0, tonS, ton);                         // swap profile -> front puppet on a squash (same spot)
//   R.smear(ton, 7.0, 1);                           // 1–2 frame smear (stretch + directional blur) on a fast move
//   R.twos(ton, true);                              // animate this puppet "on twos" from here on (camera stays on 1s)
//   const cam = R.cam('#shop');  cam.set(0, { px: 960, py: 540, s: 1 });  cam.move(3, 2, { px: 1300, py: 600, s: 1.4 });
//
// RULE: author each puppet / camera in chronological order. Every helper remembers the last value it wrote, and
// tweens from it (fromTo with immediateRender:false), so the timeline renders the same at any seek position.
// ============================================================================================================
function Rig(tl, opt = {}) {
  const NS = 'http://www.w3.org/2000/svg';
  let seed = opt.seed || 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const el = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p && p.appendChild(e); return e; };
  const INK = opt.ink || '#241c18';
  const shade = (hex, k = .78) => { const n = parseInt(hex.slice(1), 16); const c = i => Math.round(((n >> i) & 255) * k).toString(16).padStart(2, '0'); return '#' + c(16) + c(8) + c(0); };
  const FPS = 24, F = 1 / FPS;                       // animate thinking in 24 fps "frames"; F = one frame

  // ---------------- joints ----------------
  // A joint = static outer <g> translated to the pivot + inner <g> that we animate (translate/rotate/scale about the pivot).
  const str = v => `translate(${v.x.toFixed(2)} ${v.y.toFixed(2)}) rotate(${v.r.toFixed(2)}) scale(${v.sx.toFixed(4)} ${v.sy.toFixed(4)})`;
  function joint(P, name, parent, x, y, init = {}) {
    const o = el('g', { transform: `translate(${x} ${y})` }, parent);
    const v = { x: 0, y: 0, r: 0, sx: 1, sy: 1, ...init };
    const i = el('g', { transform: str(v) }, o);
    P.j[name] = { el: i, v }; return i;
  }
  // "On twos" (anime/TV limited animation): a puppet's poses change every 2nd frame while the camera stays on 1s.
  // Start and end of every tween snap to the 2-frame grid and the ease is held in steps. Toggle with R.twos(P, on)
  // between authored calls (e.g. off for the one big action = "sakuga", back on after). Default: Rig(tl, { twos }).
  // Mouth swaps (lip-sync) stay on 1s so the sync stays exact.
  const G2 = 2 * F, snap2 = t => Math.round(t / G2 + 1e-9) * G2;
  function stepped(ease, n) { const e = typeof ease === 'function' ? ease : (gsap.parseEase(ease) || (p => p)); return p => e(Math.min(1, Math.floor(p * n + 1e-6) / n)); }
  function tw(P, target, from, to, t, dur, ease, extra = {}) {   // the one place puppet tweens are made
    if (P && P.twos) { const a = snap2(t); if (dur > 0) { const b = snap2(t + dur); dur = Math.max(G2, b - a); ease = stepped(ease, Math.round(dur / G2)); } t = a; }
    if (dur <= 0) { tl.set(target, to, t); return; }
    tl.fromTo(target, from, { ...to, duration: dur, ease, immediateRender: false, ...extra }, t);
  }
  // move a joint: to = partial {x,y,r,sx,sy}. from = the last authored value.
  function mv(P, name, t, dur, to, ease = 'sine.inOut') {
    const j = P.j[name]; if (!j) return;
    const from = { ...j.v }; Object.assign(j.v, to);
    tw(P, j.el, { attr: { transform: str(from) } }, { attr: { transform: str(j.v) } }, t, dur, ease);
    if (name === 'torso' && P.j.torsoFar) mv(P, 'torsoFar', t, dur, to, ease);   // side view: far arm rides with the torso
  }
  function twos(P, on = true) { P.twos = !!on; }
  // opacity switch inside a set (eyes / mouth / brows states)
  function swap(group, t, key) { for (const k in group) tl.set(group[k], { opacity: k === key ? 1 : 0 }, t); }

  // ---------------- looks (character designs) ----------------
  const LOOKS = {
    ton: { skin: '#f3e1cb', hair: 'messy', hairCol: '#1f1b22', top: '#4f6b58', inner: '#efe7d6', legs: '#2b2a33', shoes: '#1b1a1f', glasses: 'round' },
    jan: { skin: '#eef2ef', hair: 'bun', hairCol: '#d5dcdf', top: '#efe5cf', dress: true, shawl: '#9fb4b6', glasses: 'gold', ghost: true, hunch: 4, eyeCol: '#3b3540' },
    chan: { skin: '#ecd3b8', hair: 'bald', hairCol: '#c9c9c9', top: '#7a5a3e', inner: '#e8e2d4', legs: '#3b3630', shoes: '#2a201a', moustache: true },
  };

  // ---------------- puppet ----------------
  // Unit puppet: feet at (0,0), ~520 px tall at s=1. Hierarchy:
  //   root(pos) > bob > [legL, legR] , torso(hip pivot) > [armL > foreL, armR > foreR, head(neck pivot) > [hair, face > [eyes(pupils), browL, browR, mouth]]]
  function puppet(p, o, look = LOOKS.ton) {
    if (o.view === 'side') return puppetSide(p, o, look);
    const L = { skin: '#f3e1cb', hairCol: '#222', top: '#567', inner: '#eee', legs: '#333', shoes: '#111', eyeCol: INK, ...look };
    const P = { j: {}, L, mouthNow: 'rest', eyeNow: 'dot', baseX: o.x, baseY: o.y, s: o.s || 1, facing: 0, view: 'front', twos: o.twos ?? !!opt.twos };
    const rootO = el('g', {}, p); P.g = rootO;
    const root = joint(P, 'root', rootO, 0, 0, { x: o.x, y: o.y, sx: P.s, sy: P.s });
    if (L.ghost) { const gl = el('ellipse', { cx: 0, cy: -260, rx: 260, ry: 330, fill: 'url(#gGhost)' }, root); P.glow = gl; }
    else el('ellipse', { cx: 0, cy: 4, rx: 70, ry: 12, fill: '#000', opacity: .28 }, root);
    const bob = joint(P, 'bob', root, 0, 0);
    // legs (hidden under a dress)
    if (!L.dress) ['L', 'R'].forEach(s => { const sg = s === 'L' ? -1 : 1; const lg = joint(P, 'leg' + s, bob, sg * 24, -120);
      el('path', { d: `M0 0 L${sg * 3} 108`, stroke: L.legs, 'stroke-width': 17, 'stroke-linecap': 'round' }, lg);
      el('ellipse', { cx: sg * 8, cy: 116, rx: 22, ry: 10, fill: L.shoes }, lg); });
    const torso = joint(P, 'torso', bob, 0, -120, { r: L.hunch || 0 });
    const W = L.dress ? 96 : 74;
    if (L.dress) {
      el('path', { d: 'M-58 -180 Q-70 -80 -96 110 Q0 130 96 110 Q70 -80 58 -180 Q0 -202 -58 -180 Z', fill: L.top, stroke: INK, 'stroke-width': 5 }, torso);
      for (let i = 0; i < 11; i++) el('circle', { cx: -84 + i * 16.8, cy: 98, r: 5, fill: 'none', stroke: '#c7b38c', 'stroke-width': 2.5 }, torso);
      if (L.shawl) el('path', { d: 'M-60 -176 Q-110 -80 -84 20 L84 20 Q110 -80 60 -176', fill: L.shawl, opacity: .55 }, torso);
    } else {
      el('path', { d: `M-${W} 0 Q-${W + 10} -150 -52 -176 Q0 -196 52 -176 Q${W + 10} -150 ${W} 0 Z`, fill: L.top, stroke: INK, 'stroke-width': 5 }, torso);
      el('path', { d: 'M-26 -184 L0 -60 L26 -184 Z', fill: L.inner, stroke: INK, 'stroke-width': 4 }, torso);
    }
    P.torsoEl = torso;
    const sleeve = L.shawl || L.top;
    ['L', 'R'].forEach(s => { const sg = s === 'L' ? -1 : 1;
      const up = joint(P, 'arm' + s, torso, sg * (L.dress ? 50 : 60), -160);
      el('path', { d: `M0 0 Q${sg * 6} 36 ${sg * 4} 72`, stroke: INK, 'stroke-width': 34, fill: 'none', 'stroke-linecap': 'round' }, up);
      el('path', { d: `M0 0 Q${sg * 6} 36 ${sg * 4} 72`, stroke: sleeve, 'stroke-width': 25, fill: 'none', 'stroke-linecap': 'round' }, up);
      const fo = joint(P, 'fore' + s, up, sg * 4, 72);
      el('path', { d: `M0 0 L0 62`, stroke: INK, 'stroke-width': 31, 'stroke-linecap': 'round' }, fo);
      el('path', { d: `M0 0 L0 62`, stroke: sleeve, 'stroke-width': 22, 'stroke-linecap': 'round' }, fo);
      el('circle', { cx: 0, cy: 72, r: 15, fill: L.skin, stroke: INK, 'stroke-width': 4 }, fo);
      P['hand' + s] = joint(P, 'hand' + s, fo, 0, 72);  // anything held goes in here
    });
    // head: pivot at the neck so tilts swing from the base
    const head = joint(P, 'head', torso, 0, -186);
    const HC = -96;                                      // head centre relative to the neck pivot
    if (L.hair === 'bun') el('circle', { cx: 0, cy: HC - 108, r: 40, fill: L.hairCol, stroke: INK, 'stroke-width': 4.5 }, head);
    el('circle', { cx: 0, cy: HC, r: 104, fill: L.skin, stroke: INK, 'stroke-width': 5 }, head);
    const hair = joint(P, 'hair', head, 0, HC);
    if (L.hair === 'messy') {
      el('path', { d: 'M-110 10 Q-122 -70 -70 -104 Q-20 -138 40 -118 Q100 -104 114 -40 Q120 0 108 22 Q96 -18 74 -40 Q60 -10 30 -44 Q10 -12 -18 -46 Q-40 -12 -64 -42 Q-84 -10 -110 10 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
      P.tuft = joint(P, 'tuft', hair, -4, -122);
      el('path', { d: 'M-16 4 Q-4 -30 22 -22 Q4 -14 4 4 Z', fill: L.hairCol }, P.tuft);
    } else if (L.hair === 'bun') {
      el('path', { d: 'M-102 6 Q-108 -66 -52 -92 Q0 -110 52 -92 Q108 -66 102 6 Q86 -40 40 -60 Q0 -68 -40 -60 Q-86 -40 -102 6 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
    } else if (L.hair === 'bald') {
      el('path', { d: 'M-104 12 Q-112 -40 -84 -66 Q-72 -20 -64 -8 Z M104 12 Q112 -40 84 -66 Q72 -20 64 -8 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
    }
    const face = joint(P, 'face', head, 0, HC);
    ['L', 'R'].forEach(s => el('ellipse', { cx: (s === 'L' ? -1 : 1) * 58, cy: 38, rx: 16, ry: 9, fill: '#f0a99a', opacity: .45 }, face));
    P.blush = el('g', { opacity: 0 }, face); ['L', 'R'].forEach(s => el('ellipse', { cx: (s === 'L' ? -1 : 1) * 56, cy: 36, rx: 22, ry: 11, fill: '#ff7f7f', opacity: .5 }, P.blush));
    // eyes: lids (blink = scaleY), pupils (look), states (dot / wide / smile / closed / sad)
    const lids = joint(P, 'lids', face, 0, 12);
    const pup = joint(P, 'pupils', lids, 0, 0);
    const E = {}; const ex = 38;
    E.dot = el('g', {}, pup); [-1, 1].forEach(sg => el('ellipse', { cx: ex * sg, cy: 0, rx: 7.5, ry: 10.5, fill: L.eyeCol }, E.dot));
    E.wide = el('g', { opacity: 0 }, lids); [-1, 1].forEach(sg => el('circle', { cx: ex * sg, cy: 0, r: 15, fill: '#fff', stroke: L.eyeCol, 'stroke-width': 3.5 }, E.wide));
    E.widePup = el('g', { opacity: 0 }, pup); [-1, 1].forEach(sg => el('circle', { cx: ex * sg, cy: 1, r: 5, fill: L.eyeCol }, E.widePup));
    E.smile = el('g', { opacity: 0 }, lids); [-1, 1].forEach(sg => el('path', { d: `M${ex * sg - 12} 3 Q${ex * sg} -9 ${ex * sg + 12} 3`, stroke: L.eyeCol, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' }, E.smile));
    E.closed = el('g', { opacity: 0 }, lids); [-1, 1].forEach(sg => el('path', { d: `M${ex * sg - 12} 0 Q${ex * sg} 7 ${ex * sg + 12} 0`, stroke: L.eyeCol, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round' }, E.closed));
    P.eyes = E;
    // brows (emotion is mostly brows)
    ['L', 'R'].forEach(s => { const sg = s === 'L' ? -1 : 1; const b = joint(P, 'brow' + s, face, sg * 38, -26);
      el('path', { d: 'M-14 0 Q0 -5 14 0', stroke: L.hair === 'bald' ? L.hairCol : INK, 'stroke-width': 5.5, fill: 'none', 'stroke-linecap': 'round' }, b); });
    if (L.glasses) { const gc = L.glasses === 'gold' ? '#c8922e' : '#1a1a1a';
      const gG = el('g', {}, face); P.glasses = gG;
      [-1, 1].forEach(sg => el('circle', { cx: ex * sg, cy: 12, r: 30, fill: 'rgba(220,240,255,.14)', stroke: gc, 'stroke-width': 5.5 }, gG));
      el('path', { d: 'M-8 8 Q0 2 8 8', stroke: gc, 'stroke-width': 5, fill: 'none' }, gG); }
    if (L.moustache) el('path', { d: 'M-32 40 Q0 30 32 40 Q16 50 0 44 Q-16 50 -32 40 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 3 }, face);
    P.mouth = mouthSet(face, 0, 60, 1); P.restMouth = 'rest';
    P.H = 520; return P;
  }

  // mouth: viseme set + expressions. rest / M (lips closed: ม บ ป พ ผ) / B (teeth together: ส ซ ต ด ท ช) /
  // G (top teeth on lower lip: ฟ ฝ) / A / E / O / U, plus smile / grin / frown / wail. sx < 1 = profile (narrower).
  function mouthSet(face, x, y, sx) {
    const mo = el('g', { transform: `translate(${x} ${y}) scale(${sx} 1)` }, face); const M = {}; const MC = '#3a1f1c';
    const ln = d => ({ d, stroke: INK, 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' });
    M.rest = el('path', ln('M-10 0 Q0 3 10 0'), mo);
    M.M = el('path', ln('M-11 1 L11 1'), mo);
    M.B = el('g', {}, mo); el('path', { d: 'M-15 -3 Q0 -6 15 -3 Q11 8 0 9 Q-11 8 -15 -3 Z', fill: MC }, M.B);
    el('path', { d: 'M-12 -2 Q0 -4.5 12 -2 L11 5 Q0 6.5 -11 5 Z', fill: '#fbf6ee' }, M.B);
    el('path', { d: 'M-11 1.6 Q0 2.6 11 1.6', stroke: '#b9aca0', 'stroke-width': 1.4, fill: 'none' }, M.B);
    M.G = el('g', {}, mo); el('path', { d: 'M-12 -3 Q0 -6 12 -3 Q8 5 0 6 Q-8 5 -12 -3 Z', fill: MC }, M.G);
    el('path', { d: 'M-10 -3 Q0 -5.5 10 -3 L9 2 Q0 3 -9 2 Z', fill: '#fbf6ee' }, M.G);
    el('path', ln('M-13 4 Q0 10 13 4'), M.G);
    M.A = el('path', { d: 'M-13 -4 Q0 -7 13 -4 Q11 16 0 18 Q-11 16 -13 -4 Z', fill: MC }, mo);
    M.E = el('path', { d: 'M-17 -3 Q0 -6 17 -3 Q12 9 0 10 Q-12 9 -17 -3 Z', fill: MC }, mo);
    M.O = el('ellipse', { cx: 0, cy: 3, rx: 9, ry: 12, fill: MC }, mo);
    M.U = el('ellipse', { cx: 0, cy: 2, rx: 6, ry: 6, fill: MC }, mo);
    M.smile = el('path', ln('M-16 -3 Q0 11 16 -3'), mo);
    M.grin = el('path', { d: 'M-18 -4 Q0 -2 18 -4 Q12 16 0 17 Q-12 16 -18 -4 Z', fill: MC }, mo);
    M.frown = el('path', ln('M-13 6 Q0 -5 13 6'), mo);
    M.wail = el('path', { d: 'M-15 10 Q0 -10 15 10 Q0 16 -15 10 Z', fill: MC }, mo);
    for (const k in M) M[k].setAttribute('opacity', k === 'rest' ? 1 : 0);
    return M;
  }

  // ---------------- side view (profile) puppet ----------------
  // Same joint names as the front puppet, so talk / blinks / emote / pose / nod / jolt / squash all work on it.
  // Drawn facing +x inside a mirror group (dir 1 = faces right, -1 = faces left): every rotation is "forward = +x".
  // armL / legL = far side (darker, behind the body), armR / legR = near side.
  function puppetSide(p, o, look = LOOKS.ton) {
    const L = { skin: '#f3e1cb', hairCol: '#222', top: '#567', inner: '#eee', legs: '#333', shoes: '#111', eyeCol: INK, ...look };
    const dir = o.dir === -1 ? -1 : 1;
    const P = { j: {}, L, mouthNow: 'rest', eyeNow: 'dot', baseX: o.x, baseY: o.y, s: o.s || 1, facing: 0, view: 'side', dir, twos: o.twos ?? !!opt.twos };
    const rootO = el('g', {}, p); P.g = rootO;
    const root = joint(P, 'root', rootO, 0, 0, { x: o.x, y: o.y, sx: P.s, sy: P.s });
    if (L.ghost) P.glow = el('ellipse', { cx: 0, cy: -260, rx: 230, ry: 330, fill: 'url(#gGhost)' }, root);
    else el('ellipse', { cx: 0, cy: 4, rx: 60, ry: 11, fill: '#000', opacity: .28 }, root);
    const mir = el('g', { transform: `scale(${dir} 1)` }, root);
    const bob = joint(P, 'bob', mir, 0, 0);
    const legG = el('g', {}, bob);
    const farArmG = el('g', { transform: 'translate(0 -120)' }, bob);
    const torsoFar = joint(P, 'torsoFar', farArmG, 0, 0, { r: L.hunch || 0 });   // invisible twin of the torso, carries the far arm behind it
    const torso = joint(P, 'torso', bob, 0, -120, { r: L.hunch || 0 });
    if (!L.dress) ['L', 'R'].forEach(s => { const far = s === 'L'; const lg = joint(P, 'leg' + s, legG, far ? -6 : 6, -120);
      el('path', { d: 'M0 0 L0 108', stroke: far ? shade(L.legs) : L.legs, 'stroke-width': 18, 'stroke-linecap': 'round' }, lg);
      el('path', { d: 'M-12 112 Q-12 104 2 104 L22 106 Q34 110 32 118 L-10 120 Q-14 118 -12 112 Z', fill: far ? shade(L.shoes, .7) : L.shoes }, lg); });
    if (L.dress) {
      el('path', { d: 'M-40 -180 Q-58 -80 -74 110 Q8 128 84 110 Q56 -80 44 -180 Q2 -198 -40 -180 Z', fill: L.top, stroke: INK, 'stroke-width': 5 }, torso);
      for (let i = 0; i < 9; i++) el('circle', { cx: -64 + i * 17.5, cy: 99, r: 5, fill: 'none', stroke: '#c7b38c', 'stroke-width': 2.5 }, torso);
      if (L.shawl) el('path', { d: 'M-44 -176 Q-80 -80 -60 20 L60 20 Q76 -80 46 -176', fill: L.shawl, opacity: .55 }, torso);
    } else {
      el('path', { d: 'M-42 0 Q-54 -150 -30 -178 Q4 -194 34 -176 Q58 -150 46 0 Z', fill: L.top, stroke: INK, 'stroke-width': 5 }, torso);
      el('path', { d: 'M14 -186 L38 -150 L40 -182 Z', fill: L.inner, stroke: INK, 'stroke-width': 4 }, torso);
    }
    P.torsoEl = torso;
    const sleeve = L.shawl || L.top;
    const mkArm = (s, parent) => { const far = s === 'L'; const col = far ? shade(sleeve) : sleeve, ink = far ? shade(INK, .9) : INK;
      const up = joint(P, 'arm' + s, parent, 2, -160);
      el('path', { d: 'M0 0 Q3 36 2 72', stroke: ink, 'stroke-width': 32, fill: 'none', 'stroke-linecap': 'round' }, up);
      el('path', { d: 'M0 0 Q3 36 2 72', stroke: col, 'stroke-width': 23, fill: 'none', 'stroke-linecap': 'round' }, up);
      const fo = joint(P, 'fore' + s, up, 2, 72);
      el('path', { d: 'M0 0 L0 62', stroke: ink, 'stroke-width': 29, 'stroke-linecap': 'round' }, fo);
      el('path', { d: 'M0 0 L0 62', stroke: col, 'stroke-width': 20, 'stroke-linecap': 'round' }, fo);
      el('circle', { cx: 0, cy: 72, r: 14, fill: far ? shade(L.skin, .85) : L.skin, stroke: INK, 'stroke-width': 4 }, fo);
      P['hand' + s] = joint(P, 'hand' + s, fo, 0, 72); };
    mkArm('L', torsoFar);
    // head (profile, nose toward +x)
    const head = joint(P, 'head', torso, 4, -186);
    const HC = -96;
    if (L.hair === 'bun') el('circle', { cx: -78, cy: HC - 70, r: 40, fill: L.hairCol, stroke: INK, 'stroke-width': 4.5 }, head);
    el('path', { d: `M-96 ${HC} Q-100 ${HC - 104} 0 ${HC - 104} Q98 ${HC - 104} 102 ${HC - 6} L114 ${HC + 18} Q116 ${HC + 26} 104 ${HC + 28} Q100 ${HC + 70} 70 ${HC + 94} Q20 ${HC + 114} -36 ${HC + 96} Q-98 ${HC + 70} -96 ${HC} Z`,
      fill: L.skin, stroke: INK, 'stroke-width': 5, 'stroke-linejoin': 'round' }, head);
    el('path', { d: `M-18 ${HC - 10} Q-36 ${HC - 12} -36 ${HC + 10} Q-36 ${HC + 30} -16 ${HC + 26}`, fill: L.skin, stroke: INK, 'stroke-width': 4 }, head);   // ear
    const hair = joint(P, 'hair', head, 0, HC);
    if (L.hair === 'messy') {
      el('path', { d: 'M-100 30 Q-118 -62 -56 -102 Q4 -132 68 -110 Q112 -90 106 -40 Q86 -60 64 -50 Q50 -20 26 -48 Q12 -18 -6 -46 Q-14 -6 -30 -20 Q-44 10 -60 -10 Q-70 30 -100 30 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
      P.tuft = joint(P, 'tuft', hair, 10, -122);
      el('path', { d: 'M-16 4 Q-4 -30 22 -22 Q4 -14 4 4 Z', fill: L.hairCol }, P.tuft);
    } else if (L.hair === 'bun') {
      el('path', { d: 'M-100 20 Q-110 -70 -40 -98 Q30 -116 80 -84 Q100 -60 96 -36 Q60 -64 10 -64 Q-50 -56 -60 -20 Q-80 0 -100 20 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
    } else if (L.hair === 'bald') {
      el('path', { d: 'M-98 20 Q-108 -30 -80 -60 Q-66 -20 -40 -6 Q-60 10 -98 20 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 4 }, hair);
    }
    const face = joint(P, 'face', head, 0, HC);
    el('ellipse', { cx: 50, cy: 40, rx: 15, ry: 9, fill: '#f0a99a', opacity: .45 }, face);
    P.blush = el('g', { opacity: 0 }, face); el('ellipse', { cx: 48, cy: 38, rx: 20, ry: 11, fill: '#ff7f7f', opacity: .5 }, P.blush);
    const lids = joint(P, 'lids', face, 0, 12);
    const pup = joint(P, 'pupils', lids, 0, 0);
    const E = {}; const ex = 62;
    E.dot = el('ellipse', { cx: ex, cy: 0, rx: 6.5, ry: 10.5, fill: L.eyeCol }, pup);
    E.wide = el('ellipse', { cx: ex - 2, cy: 0, rx: 12, ry: 15, fill: '#fff', stroke: L.eyeCol, 'stroke-width': 3.5, opacity: 0 }, lids);
    E.widePup = el('circle', { cx: ex + 2, cy: 1, r: 4.5, fill: L.eyeCol, opacity: 0 }, pup);
    E.smile = el('path', { d: `M${ex - 10} 3 Q${ex} -9 ${ex + 10} 3`, stroke: L.eyeCol, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round', opacity: 0 }, lids);
    E.closed = el('path', { d: `M${ex - 10} 0 Q${ex} 7 ${ex + 10} 0`, stroke: L.eyeCol, 'stroke-width': 4.5, fill: 'none', 'stroke-linecap': 'round', opacity: 0 }, lids);
    P.eyes = E;
    joint(P, 'browL', face, ex, -26);   // far brow: hidden behind the head in profile (kept so brows() works)
    const bR = joint(P, 'browR', face, ex, -26);
    el('path', { d: 'M-13 0 Q0 -5 13 0', stroke: L.hair === 'bald' ? L.hairCol : INK, 'stroke-width': 5.5, fill: 'none', 'stroke-linecap': 'round' }, bR);
    if (L.glasses) { const gc = L.glasses === 'gold' ? '#c8922e' : '#1a1a1a';
      const gG = el('g', {}, face); P.glasses = gG;
      el('ellipse', { cx: ex + 4, cy: 12, rx: 21, ry: 29, fill: 'rgba(220,240,255,.14)', stroke: gc, 'stroke-width': 5.5 }, gG);
      el('path', { d: `M${ex - 17} 6 L-22 0`, stroke: gc, 'stroke-width': 5, 'stroke-linecap': 'round' }, gG); }
    if (L.moustache) el('path', { d: 'M72 40 Q96 32 110 40 Q100 50 86 46 Q78 48 72 40 Z', fill: L.hairCol, stroke: INK, 'stroke-width': 3 }, face);
    P.mouth = mouthSet(face, 86, 60, .62); P.restMouth = 'rest';
    mkArm('R', torso);
    P.H = 520; return P;
  }

  // ---------------- face helpers ----------------
  function mouth(P, t, k) { if (!P.mouth[k]) return; swap(P.mouth, t, k); P.mouthNow = k; }
  function eyes(P, t, k) {   // dot | wide | smile | closed
    const E = P.eyes; const on = { dot: [E.dot], wide: [E.wide, E.widePup], smile: [E.smile], closed: [E.closed] }[k];
    [E.dot, E.wide, E.widePup, E.smile, E.closed].forEach(g => tl.set(g, { opacity: on.includes(g) ? 1 : 0 }, t)); P.eyeNow = k;
  }
  function brows(P, t, dur, kind) {  // neutral | up | sad | angry | worried | skeptic
    const B = { neutral: [{ y: 0, r: 0 }, { y: 0, r: 0 }], up: [{ y: -12, r: 0 }, { y: -12, r: 0 }], sad: [{ y: -4, r: -14 }, { y: -4, r: 14 }],
      angry: [{ y: 4, r: 16 }, { y: 4, r: -16 }], worried: [{ y: -10, r: -12 }, { y: -10, r: 12 }], skeptic: [{ y: -12, r: -6 }, { y: 3, r: 4 }] }[kind];
    mv(P, 'browL', t, dur, B[0], 'power2.out'); mv(P, 'browR', t, dur, B[1], 'power2.out');
  }
  function blink(P, t) {          // close 2 frames, closed 1, open 3 (~.25 s)
    const j = P.j.lids; const sy = j.v.sy;
    tw(P, j.el, { attr: { transform: str({ ...j.v }) } }, { attr: { transform: str({ ...j.v, sy: .08 }) } }, t, 2 * F, 'power2.in');
    tw(P, j.el, { attr: { transform: str({ ...j.v, sy: .08 }) } }, { attr: { transform: str({ ...j.v, sy }) } }, t + 3 * F, 3 * F, 'power2.out');
  }
  // natural blinking: every 2–5 s, ~15% doubles; `avoid` = list of [t0,t1] windows (shock stares, closed-eye moments)
  function blinks(P, t0, t1, avoid = []) {
    for (let t = t0 + .6 + rnd() * 1.4; t < t1 - .4; t += 2 + rnd() * 3) {
      if (avoid.some(([a, b]) => t > a - .3 && t < b + .1)) continue;
      blink(P, t); if (rnd() < .15) blink(P, t + .32);
    }
  }
  function breathe(P, t0, t1, amt = .014, per = 3.2) {    // a moving hold: chest rises, shoulders follow 2 frames later
    const n = Math.max(1, Math.floor((t1 - t0) / per));
    const half = P.twos ? Math.max(G2, snap2(per / 2)) : per / 2;
    ['torso', 'torsoFar'].forEach(nm => { const j = P.j[nm]; if (!j) return; const base = { ...j.v };
      tw(P, j.el, { attr: { transform: str(base) } }, { attr: { transform: str({ ...base, sy: base.sy * (1 + amt) }) } }, t0, half, 'sine.inOut', { yoyo: true, repeat: n * 2 - 1 }); });
    if (P.L.ghost) { const b = P.j.bob; tw(P, b.el, { attr: { transform: str(b.v) } }, { attr: { transform: str({ ...b.v, y: b.v.y - 10 }) } }, t0, 1.6, 'sine.inOut', { yoyo: true, repeat: Math.max(1, Math.floor((t1 - t0) / 1.6)) }); }
  }

  // ---------------- looking: eyes lead, head follows, body last ----------------
  // dx, dy in -1..1 (screen direction). Big turns blink on the way (the brain hides the eye travel).
  function look(P, t, dx, dy = 0, o = {}) {
    if (P.view === 'side') {   // profile: eyes + a head tilt only (a real turn = R.turn to another view)
      mv(P, 'pupils', t, 3 * F, { x: dx * P.dir * 5, y: dy * 5 }, 'power2.out');
      mv(P, 'head', t + 2 * F, 9 * F, { r: -dy * 7 + (o.tilt || 0) }, 'power2.inOut');
      P.facing = dx; return;
    }
    const big = Math.abs(dx - P.facing) > .6;
    if (big && o.blink !== false) blink(P, t);
    mv(P, 'pupils', t, 3 * F, { x: dx * 7, y: dy * 5 }, 'power2.out');
    mv(P, 'face', t + 2 * F, 8 * F, { x: dx * 20, y: dy * 10 }, 'power2.inOut');      // fake 3/4 turn: features slide
    mv(P, 'hair', t + 3 * F, 9 * F, { x: -dx * 5 }, 'power2.inOut');                  // hair lags (overlap)
    mv(P, 'head', t + 2 * F, 9 * F, { r: dx * 4 + (o.tilt || 0) }, 'power2.inOut');
    if (o.body !== false) mv(P, 'torso', t + 6 * F, 12 * F, { r: dx * 2.5 + (P.L.hunch || 0) }, 'sine.inOut');
    P.facing = dx;
  }

  // ---------------- arms ----------------
  // up = upper-arm swing out from the body (deg), bend = forearm fold (deg, + = toward the chest), wrist optional.
  const sideSign = s => (s === 'L' ? 1 : -1);
  function arm(P, side, t, dur, up, bend, ease = 'power2.inOut') {
    if (P.view === 'side') {   // profile: "up" raises the arm forward, the elbow only folds forward (no hyperextension)
      mv(P, 'arm' + side, t, dur, { r: -up }, ease);
      mv(P, 'fore' + side, t + 2 * F, dur, { r: -Math.max(0, bend) }, ease); return;
    }
    const sg = sideSign(side);
    mv(P, 'arm' + side, t, dur, { r: sg * up }, ease);
    mv(P, 'fore' + side, t + 2 * F, dur, { r: -sg * bend }, ease);   // forearm overlaps the upper arm by 2 frames
  }
  const POSES = {   // [L up, L bend, R up, R bend]
    idle: [8, 4, 8, 4], open: [28, -10, 28, -10], shrug: [30, -95, 30, -95], chest: [8, 4, -18, 140], chin: [8, 4, -26, 172],
    point: [8, 4, 92, 0], wave: [8, 4, 150, 25], cover: [-4, 160, -4, 160], hug: [22, 118, 22, 118], hips: [38, 92, 38, 92],
    reach: [8, 4, 60, 10], fistsUp: [40, 140, 40, 140], behind: [-14, -20, -14, -20],
  };
  function pose(P, t, name, dur = 10 * F, ease = 'back.out(1.6)') {
    const p = POSES[name]; arm(P, 'L', t, dur, p[0], p[1], ease); arm(P, 'R', t, dur, p[2], p[3], ease);
  }
  function wave(P, t, n = 3) {      // hand oscillates at the elbow, 5 frames per swing
    pose(P, t, 'wave', 8 * F); const j = P.j.foreR; const base = j.v.r;
    for (let i = 0; i < n * 2; i++) mv(P, 'foreR', t + 8 * F + i * 5 * F, 5 * F, { r: base + (i % 2 ? 0 : 28) }, 'sine.inOut');
  }

  // ---------------- whole-body acting ----------------
  // anticipation → action → overshoot → settle, on the bob joint (squash & stretch keeps the volume: sx = 1/sqrt(sy)).
  function squash(P, t, amt = .9, hold = 3 * F) {
    const sv = a => ({ sy: a, sx: 1 / Math.sqrt(a) });
    mv(P, 'bob', t, 3 * F, sv(amt), 'power2.in');
    mv(P, 'bob', t + 3 * F + hold, 3 * F, sv(1), 'power2.out');
  }
  function jolt(P, t, h = 26) {      // startle: squash 3f → shoot up with stretch 4f → land with a small squash → settle
    const b = P.j.bob, y0 = b.v.y;
    mv(P, 'bob', t, 3 * F, { sy: .88, sx: 1.06, y: y0 + 6 }, 'power2.in');
    mv(P, 'bob', t + 3 * F, 4 * F, { sy: 1.1, sx: .95, y: y0 - h }, 'power3.out');
    mv(P, 'bob', t + 7 * F, 5 * F, { sy: .95, sx: 1.03, y: y0 }, 'power2.in');
    mv(P, 'bob', t + 12 * F, 6 * F, { sy: 1, sx: 1, y: y0 }, 'sine.out');
  }
  function nod(P, t, n = 2) { const r0 = P.j.head.v.r; for (let i = 0; i < n; i++) { mv(P, 'head', t + i * 9 * F, 4 * F, { y: 6, r: r0 }, 'sine.inOut'); mv(P, 'head', t + i * 9 * F + 4 * F, 5 * F, { y: 0, r: r0 }, 'sine.inOut'); } }
  function shake(P, t, n = 3) { const r0 = P.j.head.v.r; for (let i = 0; i < n; i++) mv(P, 'head', t + i * 6 * F, 6 * F, { r: r0 + (i % 2 ? -7 : 7) }, 'sine.inOut'); mv(P, 'head', t + n * 6 * F, 6 * F, { r: r0 }, 'sine.out'); }
  function lean(P, t, dur, deg) { mv(P, 'torso', t, dur, { r: deg + (P.L.hunch || 0) }, 'sine.inOut'); }

  // emote = one call that sets a believable whole-body state, with the right order (eyes/brows first, then body).
  function emote(P, t, kind) {
    const k = kind;
    if (k === 'neutral') { eyes(P, t, 'dot'); brows(P, t, 6 * F, 'neutral'); mouth(P, t, 'rest'); P.restMouth = 'rest'; pose(P, t + 2 * F, 'idle', 12 * F, 'sine.inOut'); lean(P, t, 12 * F, 0); tl.to(P.blush, { opacity: 0, duration: .3 }, t); }
    if (k === 'happy') { brows(P, t, 6 * F, 'up'); eyes(P, t + 2 * F, 'smile'); mouth(P, t + 2 * F, 'smile'); P.restMouth = 'smile'; squash(P, t + 2 * F, .95); mv(P, 'head', t + 3 * F, 10 * F, { r: 5 }, 'back.out(2)'); }
    if (k === 'joy') { brows(P, t, 5 * F, 'up'); eyes(P, t + 2 * F, 'smile'); mouth(P, t + 2 * F, 'grin'); P.restMouth = 'grin'; jolt(P, t, 18); pose(P, t + 3 * F, 'fistsUp', 8 * F); }
    if (k === 'sad') { brows(P, t, 10 * F, 'sad'); tl.set(P.j.lids.el, {}, t); mv(P, 'lids', t + 4 * F, 12 * F, { sy: .62 }, 'sine.inOut'); mouth(P, t + 6 * F, 'frown'); P.restMouth = 'frown';
      mv(P, 'head', t + 6 * F, 18 * F, { y: 8, r: -3 }, 'sine.inOut'); lean(P, t + 8 * F, 20 * F, 5); pose(P, t + 10 * F, 'idle', 18 * F, 'sine.inOut'); }
    if (k === 'shock') { eyes(P, t, 'wide'); brows(P, t, 3 * F, 'up'); mouth(P, t + 1 * F, 'O'); P.restMouth = 'O'; jolt(P, t, 30); pose(P, t + 2 * F, 'open', 6 * F, 'power3.out'); mv(P, 'tuft', t + 3 * F, 6 * F, { r: -25, y: -8 }, 'back.out(3)'); }
    if (k === 'fear') { eyes(P, t, 'wide'); brows(P, t, 4 * F, 'worried'); mouth(P, t + 2 * F, 'E'); P.restMouth = 'E'; lean(P, t + 2 * F, 8 * F, -7); pose(P, t + 3 * F, 'cover', 8 * F, 'power3.out'); squash(P, t, .94, 8 * F); }
    if (k === 'angry') { eyes(P, t, 'dot'); brows(P, t, 4 * F, 'angry'); mouth(P, t + 2 * F, 'frown'); P.restMouth = 'frown'; lean(P, t + 2 * F, 8 * F, 6); pose(P, t + 2 * F, 'hips', 10 * F); }
    if (k === 'think') { mv(P, 'pupils', t, 4 * F, { x: 6, y: -5 }, 'power2.out'); brows(P, t + 2 * F, 8 * F, 'skeptic'); mouth(P, t + 4 * F, 'M'); P.restMouth = 'M'; mv(P, 'head', t + 4 * F, 14 * F, { r: 6 }, 'sine.inOut'); pose(P, t + 4 * F, 'chin', 14 * F, 'sine.inOut'); }
    if (k === 'shy') { mv(P, 'pupils', t, 4 * F, { x: -4, y: 5 }, 'power2.out'); tl.to(P.blush, { opacity: 1, duration: .4 }, t + 2 * F); mouth(P, t + 2 * F, 'smile'); P.restMouth = 'smile'; mv(P, 'head', t + 3 * F, 14 * F, { r: -7, y: 4 }, 'sine.inOut'); pose(P, t + 4 * F, 'behind', 14 * F, 'sine.inOut'); }
    if (k === 'tender') { brows(P, t, 10 * F, 'sad'); eyes(P, t + 4 * F, 'smile'); mouth(P, t + 4 * F, 'smile'); P.restMouth = 'smile'; mv(P, 'head', t + 4 * F, 20 * F, { r: 6 }, 'sine.inOut'); pose(P, t + 6 * F, 'chest', 18 * F, 'sine.inOut'); }
  }

  // ---------------- lip-sync ----------------
  // env = per-frame loudness (24 fps, 0..1) from _craft/visemes.py; text = the spoken Thai line.
  // 1. The text is split into rough Thai syllables {on: onset class, v: vowel shape, end: closes lips?}.
  // 2. The envelope is split into loud "beats" (each rise from quiet + each clear dip inside a loud run).
  // 3. Syllables are spread over the beats by loud duration (a long beat holds several syllables), then each
  //    syllable gets its share of frames: vowel shape (A/E/O/U, softened when quiet), onset consonant shape —
  //    ม บ ป พ ผ ภ = lips CLOSED (M) for the 2 frames before the vowel, ฟ ฝ = G, ส ซ ต ด ท ช จ … = B (teeth) —
  //    and finals ม บ ป พ ภ ฟ (/m/ /p/) close the lips for the last 2 frames ("ครับ", "หนุ่ม").
  // Mouth leads the sound by 1 frame; vowels hold ≥ 2 frames; returns to the rest mouth. Debug: P.lastTalk.
  const VOW = { 'า': 'A', 'ะ': 'A', 'ั': 'A', 'ำ': 'A', 'ไ': 'A', 'ใ': 'A', 'ๅ': 'A', 'ิ': 'E', 'ี': 'E', 'ึ': 'E', 'ื': 'E', 'เ': 'E', 'แ': 'E', 'ุ': 'U', 'ู': 'U', 'โ': 'O', 'อ': 'O', 'ว': 'O' };
  const LIPS = 'มบปพผภ', FTH = 'ฟฝ', TEETH = 'สซศษตดฏฎทธฑฒถฐชฉจ', LIPFIN = 'มบปพภฟ', LEADV = 'เแโไใ', MARKV = 'ะาำิีึืุูัๅ็', TONE = '่้๊๋์ํ', SONOR = 'งญนมยรลว';
  const isC = c => c >= 'ก' && c <= 'ฮ';
  function syllables(text) {
    const out = []; let cur = null, lead = null, prevC = null; const ch = [...text].filter(c => !TONE.includes(c));
    const cls = c => LIPS.includes(c) ? 'M' : FTH.includes(c) ? 'G' : TEETH.includes(c) ? 'B' : null;
    const open = (c, v) => { cur = { on: cls(c), v, fin: null }; out.push(cur); prevC = c; };
    for (let i = 0; i < ch.length; i++) {
      const c = ch[i], nx = ch[i + 1] || '#', nx2 = ch[i + 2] || '#';   // '#' never matches ('' would: 'abc'.includes('') is true)
      if (LEADV.includes(c)) { lead = c; prevC = null; continue; }
      if (MARKV.includes(c)) { if (cur && !cur.fin) { cur.mark = c;
          if (cur.lead === 'เ' && c === 'า') cur.v = 'A';                     // เ-า = "ao"
          else if (cur.lead === 'เ' && c === 'ะ') cur.v = 'E';
          else if (!cur.lead && c !== '็') cur.v = cur.v && c === 'ั' ? cur.v : (VOW[c] || 'A'); }
        prevC = null; continue; }
      if (!isC(c)) { cur = null; lead = null; prevC = null; continue; }
      // silent leading ห / อ before a sonorant (หนุ่ม, หมา, ไหม, อยู่, อย่า): the next consonant is the real onset
      if ((c === 'ห' && SONOR.includes(nx) || c === 'อ' && nx === 'ย') && (lead || !cur || cur.fin || MARKV.includes(nx2))) continue;
      // เ-ีย / เ-ือ: the ย / อ belong to the vowel, not a final (เสียง, เพื่อน)
      if (cur && !cur.fin && cur.lead === 'เ' && (c === 'ย' && cur.mark === 'ี' || c === 'อ' && cur.mark === 'ื')) { cur.v = c === 'ย' ? 'E' : 'O'; continue; }
      if (lead) { open(c, VOW[lead]); cur.lead = lead; if (lead === 'ไ' || lead === 'ใ') cur.fin = '-'; lead = null; continue; }
      if (cur && prevC && 'กขคปผพตบ'.includes(prevC) && ('รล'.includes(c) || c === 'ว' && 'กขค'.includes(prevC)) && !cur.fin && (MARKV.includes(nx) || cur.lead)) { prevC = c; continue; }   // cluster กร ปล ขว / เปลี่ยน
      if ((c === 'อ' || c === 'ว') && cur && !cur.fin && !MARKV.includes(nx)) { if (!cur.v || cur.v === 'A' && !cur.lead) cur.v = 'O'; else cur.fin = c; prevC = null; continue; }
      if (MARKV.includes(nx) || !cur || cur.fin) { open(c, null); continue; }
      cur.fin = c; if (!cur.v) cur.v = 'O'; prevC = null;
    }
    out.forEach(s => { if (!s.v) s.v = 'A'; s.end = !!s.fin && LIPFIN.includes(s.fin); }); return out;
  }
  function talk(P, t0, env, text = '', o = {}) {
    const N = env.length, ON = .14; let syl = syllables(text); if (!syl.length) syl = ['A', 'E', 'O'].map(v => ({ on: null, v }));
    // beats = [start, loudLength]
    const starts = [];
    for (let i = 0; i < N; i++) {
      const a = env[i], p = env[i - 1] ?? 0;
      if (a >= ON && p < ON) { starts.push(i); continue; }
      if (a >= ON && i > 0 && i < N - 1 && a < env[i - 1] && a <= env[i + 1]) {
        let pk = a, k = i; while (k > 0 && env[k - 1] >= env[k]) pk = env[--k];
        let nk = a, m = i; while (m < N - 1 && env[m + 1] >= env[m]) nk = env[++m];
        if (pk - a >= .12 && nk - a >= .08 && i - (starts[starts.length - 1] ?? -9) >= 4) starts.push(i);
      }
    }
    const beats = starts.map((b, bi) => { const lim = starts[bi + 1] ?? N; let e = b; while (e < lim && env[e] >= ON) e++; return [b, Math.max(1, e - b)]; });
    const total = beats.reduce((s, b) => s + b[1], 0) || 1, S = syl.length;
    const plan = new Array(N).fill(null), fixed = new Array(N).fill(false);
    const pre = [];   // a closure that falls before the line starts (speech starts on frame 0) is keyed before t0
    const put = (a, b, k) => { for (let i = a; i <= b && i < N; i++) { if (i < 0) { if (!pre.some(p => p[0] === i)) pre.push([i, k]); } else { plan[i] = k; fixed[i] = true; } } };
    let cum = 0;
    beats.forEach(([b, len]) => {
      let s0 = Math.floor(cum / total * S + 1e-9), s1 = Math.floor((cum + len) / total * S + 1e-9); cum += len;
      if (s1 <= s0) s1 = Math.min(S, s0 + 1); s0 = Math.min(s0, S - 1);
      const n = s1 - s0, part = len / n;
      for (let q = 0; q < n; q++) {
        const s = syl[s0 + q], a0 = b + Math.round(q * part), a1 = b + Math.round((q + 1) * part);   // frames [a0, a1)
        for (let i = a0; i < a1 && i < N; i++) { const a = env[i]; let k = s.v; if (a < .35 && k === 'A') k = 'E'; if (a > .75 && k === 'U') k = 'O'; plan[i] = k; }
        if (s.on === 'M') put(a0 - 2, a0 - 1, 'M'); else if (s.on) put(a0 - 1, a0, s.on);
        if (s.end && a1 - a0 >= 4) put(a1 - 2, a1 - 1, 'M');
      }
    });
    for (let i = 0; i < N; i++) if (plan[i] === null) { const a = env[i], wasOpen = (env[i - 1] ?? 0) >= ON, nxt = env[i + 1] ?? 0;
      plan[i] = (wasOpen && nxt < ON) ? 'M' : (a < .06 ? 'rest' : 'U'); }
    // vowels/rest hold ≥ 2 frames; consonant shapes (fixed) always show
    const keys = []; let cur = null, held = 0;
    for (let i = 0; i < N; i++) { const k = plan[i];
      if (k !== cur && (held >= 2 || fixed[i] || cur === null || fixed[i - 1])) { keys.push([i, k]); cur = k; held = 0; }
      held++; }
    keys.unshift(...pre.sort((x, y) => x[0] - y[0]));
    keys.forEach(([i, k]) => { if (k === 'rest') k = P.restMouth === 'rest' ? 'rest' : 'M'; swap(P.mouth, t0 + (i - 1) * F, k); });
    swap(P.mouth, t0 + N * F, P.restMouth); P.mouthNow = P.restMouth;
    P.lastTalk = { syl, beats, keys };   // for debugging: inspect in the browser console
    // talking heads move: small head accents on loud peaks (not on every syllable)
    if (o.head !== false) { let last = -99; for (let i = 1; i < env.length - 1; i++) if (env[i] > .8 && env[i] >= env[i - 1] && env[i] >= env[i + 1] && i - last > 14) {
      const r0 = P.j.head.v.r; mv(P, 'head', t0 + (i - 2) * F, 3 * F, { r: r0 + (rnd() < .5 ? 2.5 : -2.5), y: 2 }, 'power2.out'); mv(P, 'head', t0 + (i + 1) * F, 8 * F, { r: r0, y: 0 }, 'sine.inOut'); last = i; } }
  }
  // listener: nods / blinks while someone else speaks (the listener sells the line)
  function listen(P, t0, t1) { for (let t = t0 + .8; t < t1 - .6; t += 1.6 + rnd() * 1.4) { if (rnd() < .5) nod(P, t, 1); else blink(P, t); } }

  // ---------------- walking ----------------
  // Front-facing storybook walk: alternate leg lifts, body bob (down on contact, up on passing), counter-swinging arms,
  // head counter-rotates a little, hair/tuft lags. step = seconds per step (0.5 normal, 0.42 brisk, 0.65 elderly/tired).
  function walk(P, t0, t1, to, o = {}) {
    const step = o.step || .5, lift = o.lift ?? 14, swing = o.swing ?? 14, bobA = o.bob ?? 7;
    const R = P.j.root; const from = { ...R.v };
    const dest = { ...R.v, x: to.x ?? R.v.x, y: to.y ?? R.v.y, sx: (to.s ?? R.v.sx), sy: (to.s ?? R.v.sy) };
    const dur = t1 - t0; const n = Math.max(1, Math.round(dur / step)); const st = dur / n;
    // anticipation: a tiny lean into the direction before the first step
    const dir = Math.sign(dest.x - from.x) || 1;
    lean(P, t0 - 4 * F, 4 * F, dir * 3);
    tw(P, R.el, { attr: { transform: str(from) } }, { attr: { transform: str(dest) } }, t0, dur, 'none');
    Object.assign(R.v, dest);
    for (let i = 0; i < n; i++) {
      const t = t0 + i * st, s = i % 2 ? 'R' : 'L', other = i % 2 ? 'L' : 'R';
      if (!P.L.dress) { mv(P, 'leg' + s, t, st / 2, { y: -lift, r: (s === 'L' ? -1 : 1) * 5 }, 'sine.out'); mv(P, 'leg' + s, t + st / 2, st / 2, { y: 0, r: 0 }, 'sine.in'); }
      mv(P, 'bob', t, st * .2, { y: bobA * .5 }, 'sine.out');            // contact/down
      mv(P, 'bob', t + st * .2, st * .3, { y: -bobA }, 'sine.inOut');     // passing/up
      mv(P, 'bob', t + st * .5, st * .5, { y: 0 }, 'sine.in');
      mv(P, 'arm' + s, t, st, { r: sideSign(s) * (8 - swing) }, 'sine.inOut');     // arm opposite the lifted leg swings back
      mv(P, 'arm' + other, t, st, { r: sideSign(other) * (8 + swing * .6) }, 'sine.inOut');
      mv(P, 'head', t + 2 * F, st, { r: (s === 'L' ? 1 : -1) * 1.6 }, 'sine.inOut');
      if (P.j.tuft) mv(P, 'tuft', t + 3 * F, st, { r: (s === 'L' ? -1 : 1) * 8 }, 'sine.inOut');
    }
    // settle: feet down, small overshoot, arms back to idle
    lean(P, t1, 6 * F, -dir * 2); lean(P, t1 + 6 * F, 8 * F, 0);
    mv(P, 'bob', t1, 4 * F, { y: 4, sy: .97, sx: 1.015 }, 'power2.out'); mv(P, 'bob', t1 + 4 * F, 6 * F, { y: 0, sy: 1, sx: 1 }, 'sine.out');
    mv(P, 'head', t1 + 2 * F, 8 * F, { r: 0 }, 'back.out(2)'); if (P.j.tuft) mv(P, 'tuft', t1 + 3 * F, 10 * F, { r: 0 }, 'back.out(3)');
    pose(P, t1 + 2 * F, 'idle', 10 * F, 'sine.out');
  }
  // Side-view walk (profile puppet): the 4 classic poses per step — contact (legs spread, heel down), down (lowest,
  // weight lands), passing (legs cross, swing foot lifted), up (highest, push off). The stance leg rotates under the hip
  // at exactly the speed the body travels (stride = 2·leg·sin A), so the planted foot does not slide.
  // step = seconds per step (.5 normal, .42 brisk, .6–.7 elderly/tired); bob px; swing = arm swing deg; lift = foot lift px.
  function walkSide(P, t0, t1, to, o = {}) {
    if (P.view !== 'side') return walk(P, t0, t1, to, o);
    const step = o.step || .5, bobA = o.bob ?? 6, swing = o.swing ?? 20, lift = o.lift ?? 16, LEG = 116;
    const R = P.j.root; const from = { ...R.v };
    const dest = { ...R.v, x: to.x ?? R.v.x, y: to.y ?? R.v.y, sx: (to.s ?? R.v.sx), sy: (to.s ?? R.v.sy) };
    const dur = t1 - t0, n = Math.max(1, Math.round(dur / step)), st = dur / n;
    if (Math.sign(dest.x - from.x) && Math.sign(dest.x - from.x) !== P.dir) console.warn('rig.walkSide: puppet faces the other way (dir)');
    const d = Math.abs(dest.x - from.x) / n / ((from.sx + dest.sx) / 2);          // local units per step
    const A = Math.max(6, Math.min(32, Math.asin(Math.min(.7, d / (2 * LEG))) * 180 / Math.PI));
    const c = LEG * (1 - Math.cos(A * Math.PI / 180));                              // hip drop when the legs are spread
    lean(P, t0 - 4 * F, 6 * F, 3);
    tw(P, R.el, { attr: { transform: str(from) } }, { attr: { transform: str(dest) } }, t0, dur, 'none'); Object.assign(R.v, dest);
    for (let i = 0; i < n; i++) {
      const t = t0 + i * st, sw = i % 2 ? 'L' : 'R', stc = i % 2 ? 'R' : 'L';
      if (!P.L.dress) {
        mv(P, 'leg' + stc, t, st, { r: A, y: 0 }, 'none');                          // stance: planted, body passes over it
        mv(P, 'leg' + sw, t, st / 2, { r: 0, y: -lift }, 'sine.out');               // swing: lifts through passing…
        mv(P, 'leg' + sw, t + st / 2, st / 2, { r: -A, y: 0 }, 'sine.in');          // …and reaches forward to the next contact
      }
      mv(P, 'bob', t, st * .2, { y: c + bobA * .5 }, 'sine.out');                    // down
      mv(P, 'bob', t + st * .2, st * .5, { y: -bobA * .6 }, 'sine.inOut');           // passing → up
      mv(P, 'bob', t + st * .7, st * .3, { y: c }, 'sine.in');                       // next contact
      mv(P, 'arm' + stc, t, st, { r: -swing }, 'sine.inOut'); mv(P, 'fore' + stc, t + 2 * F, st, { r: -18 }, 'sine.inOut');   // arm opposite the swing leg goes forward
      mv(P, 'arm' + sw, t, st, { r: swing * .8 }, 'sine.inOut'); mv(P, 'fore' + sw, t + 2 * F, st, { r: -5 }, 'sine.inOut');
      if (P.j.tuft) mv(P, 'tuft', t + 3 * F, st, { r: i % 2 ? -7 : 7 }, 'sine.inOut');
    }
    // settle: feet together, small squash, arms home
    if (!P.L.dress) { mv(P, 'legL', t1, 6 * F, { r: 0, y: 0 }, 'power2.out'); mv(P, 'legR', t1, 6 * F, { r: 0, y: 0 }, 'power2.out'); }
    mv(P, 'bob', t1, 4 * F, { y: 3, sy: .97, sx: 1.015 }, 'power2.out'); mv(P, 'bob', t1 + 4 * F, 6 * F, { y: 0, sy: 1, sx: 1 }, 'sine.out');
    lean(P, t1, 6 * F, -1); lean(P, t1 + 6 * F, 8 * F, 0);
    if (P.j.tuft) mv(P, 'tuft', t1 + 3 * F, 10 * F, { r: 0 }, 'back.out(3)');
    pose(P, t1 + 2 * F, 'idle', 10 * F, 'sine.out');
  }
  // Swap one view of a character for another (front ↔ side, or side facing left ↔ right) on the same spot.
  // The swap hides behind a 1-frame squash and a blink — the eye reads it as a turn. `to` should start hidden:
  // the first turn() into a puppet hides it from t=0 automatically.
  function turn(t, from, to) {
    if (!to._turnInit) { tl.set(to.g, { opacity: 0 }, 0); to._turnInit = true; }
    const v = from.j.root.v; place(to, t, { x: v.x, y: v.y, s: v.sx });
    mv(from, 'bob', t - 3 * F, 3 * F, { sy: .95, sx: 1.025 }, 'power2.in');
    tl.set(from.g, { opacity: 0 }, t); tl.set(to.g, { opacity: 1 }, t);
    mv(from, 'bob', t, 0, { sy: 1, sx: 1 });
    mv(to, 'bob', t, 0, { sy: .95, sx: 1.025 }); mv(to, 'bob', t + F, 5 * F, { sy: 1, sx: 1 }, 'back.out(2)');
    blink(to, t - F);
  }
  // Smear frame: 1–2 frames where the body stretches along a fast move and blurs in that direction (FX of Looney Tunes /
  // anime). Longer than 2 frames reads as a glitch. dir = 1 / -1 (screen right / left) or 'up' / 'down'.
  function smear(P, t, dir = 1, o = {}) {
    const nF = Math.min(2, o.frames || 2), amt = o.amt ?? .35, vert = dir === 'up' || dir === 'down';
    const svg = P.g.ownerSVGElement;
    if (!svg.querySelector('#rigSmearH')) { const defs = svg.querySelector('defs') || el('defs', {}, svg);
      [['rigSmearH', '16 0'], ['rigSmearV', '0 16']].forEach(([id, sd]) => { const f = el('filter', { id, x: '-60%', y: '-60%', width: '220%', height: '220%' }, defs); el('feGaussianBlur', { stdDeviation: sd }, f); }); }
    const b = { ...P.j.bob.v }, k = 1 + amt, sh = (P.view === 'side' ? P.dir : 1);
    const st = vert ? { sy: k, sx: 1 / Math.sqrt(k), y: b.y + (dir === 'up' ? 1 : -1) * amt * 120 }
                    : { sx: k, sy: 1 / Math.sqrt(k), x: b.x - dir * sh * amt * 90 };
    mv(P, 'bob', t, 0, st); mv(P, 'bob', t + nF * F, 0, b);
    tl.set(P.g, { attr: { filter: `url(#${vert ? 'rigSmearV' : 'rigSmearH'})` } }, P.twos ? snap2(t) : t);
    tl.set(P.g, { attr: { filter: 'none' } }, (P.twos ? snap2(t) : t) + nF * F);
  }
  // ghosts glide: no steps, a slow arc and a trailing hem
  function glide(P, t0, t1, to) {
    const R = P.j.root; const from = { ...R.v }; Object.assign(R.v, { x: to.x ?? R.v.x, y: to.y ?? R.v.y });
    tw(P, R.el, { attr: { transform: str(from) } }, { attr: { transform: str(R.v) } }, t0, t1 - t0, 'sine.inOut');
    lean(P, t0, (t1 - t0) * .3, Math.sign(R.v.x - from.x) * -4); lean(P, t0 + (t1 - t0) * .6, (t1 - t0) * .4, 0);
  }
  function place(P, t, to) { mv(P, 'root', t, 0, { x: to.x ?? P.j.root.v.x, y: to.y ?? P.j.root.v.y, ...(to.s ? { sx: to.s, sy: to.s } : {}) }); }
  function fade(P, t, dur, op) { tl.to(P.g, { opacity: op, duration: dur, ease: 'sine.inOut' }, t); }
  function appear(P, t) {   // ghost entrance: flicker in (two false starts, then a slow rise)
    tl.set(P.g, { opacity: 0 }, 0);
    tl.to(P.g, { opacity: .5, duration: 6 * F }, t); tl.to(P.g, { opacity: .1, duration: 2 * F }, t + 8 * F);
    tl.to(P.g, { opacity: .7, duration: 3 * F }, t + 12 * F); tl.to(P.g, { opacity: .2, duration: 2 * F }, t + 16 * F);
    tl.to(P.g, { opacity: .93, duration: 1.2 }, t + 20 * F);
  }

  // ---------------- camera ----------------
  // Scene markup: <div class="scene" id="s"><div class="cam"><div class="layer" style="--d:.75">bg</div>
  //   <div class="layer" style="--d:1">characters</div><div class="layer" style="--d:1.3">foreground</div></div></div>
  // --d = depth: layers move/scale by camera * d (parallax). Background layers are oversized by RIG_CSS so pans never show an edge.
  function cam(sel) {
    const node = document.querySelector(sel + ' .cam'); const C = { px: 960, py: 540, s: 1, rot: 0 };
    const vars = c => { const mx = (c.s - 1) * 960, my = (c.s - 1) * 540;
      return { '--s': c.s, '--x': Math.max(-mx, Math.min(mx, -(c.px - 960) * c.s)), '--y': Math.max(-my, Math.min(my, -(c.py - 540) * c.s)), '--rot': c.rot }; };
    const api = {
      set(t, c) { Object.assign(C, c); tl.set(node, vars(C), t); return api; },
      // move: ease guide — 'sine.inOut' slow drifts, 'power2.inOut' motivated moves, 'power3.out' snap-zooms, 'expo.inOut' whip
      move(t, dur, c, ease = 'sine.inOut') { const f = vars(C); Object.assign(C, c); tl.fromTo(node, f, { ...vars(C), duration: dur, ease, immediateRender: false }, t); return api; },
      // handheld-ish shake that decays; amp px, freq Hz
      shake(t, dur, amp = 14, freq = 18) { const n = Math.round(dur * freq); for (let i = 0; i <= n; i++) { const k = 1 - i / n;
        tl.set(node, { '--shx': i === n ? 0 : (rnd() - .5) * 2 * amp * k, '--shy': i === n ? 0 : (rnd() - .5) * 2 * amp * k }, t + i / freq); } return api; },
      // slow breathing drift so a "still" camera is never dead (two sines at a 1.3 ratio = organic Lissajous)
      drift(t0, t1, amp = 6) { const n = Math.floor((t1 - t0) / 4); if (n < 1) return api;
        tl.fromTo(node, { '--dx': -amp }, { '--dx': amp, duration: 2, yoyo: true, repeat: n * 2 - 1, ease: 'sine.inOut', immediateRender: false }, t0);
        tl.fromTo(node, { '--dy': -amp * .6 }, { '--dy': amp * .6, duration: 2.6, yoyo: true, repeat: Math.floor((t1 - t0) / 2.6) - 1, ease: 'sine.inOut', immediateRender: false }, t0); return api; },
      // rack focus: blur one layer, sharpen another (layer = CSS selector)
      rack(t, dur, blurSel, sharpSel, px = 10) { tl.fromTo(blurSel, { '--blur': 0 }, { '--blur': px, duration: dur, ease: 'power2.inOut', immediateRender: false }, t);
        if (sharpSel) tl.fromTo(sharpSel, { '--blur': px }, { '--blur': 0, duration: dur, ease: 'power2.inOut', immediateRender: false }, t); return api; },
      // dolly zoom (vertigo): background layer grows while the camera pulls back on the subject
      vertigo(t, dur, bgSel, amt = .35) { tl.fromTo(bgSel, { '--zs': 1 }, { '--zs': 1 + amt, duration: dur, ease: 'sine.inOut', immediateRender: false }, t);
        return api.move(t, dur, { s: Math.max(1, C.s - amt * .6) }, 'sine.inOut'); },
      state: () => ({ ...C }),
    };
    return api;
  }
  // transitions between scene divs (opacity on whole scenes)
  function cut(t, outId, inId) { if (outId) tl.set('#' + outId, { opacity: 0 }, t); if (inId) tl.set('#' + inId, { opacity: 1 }, t); }
  function dissolve(t, dur, outId, inId) { if (inId) tl.fromTo('#' + inId, { opacity: 0 }, { opacity: 1, duration: dur, ease: 'none', immediateRender: false }, t); if (outId) tl.to('#' + outId, { opacity: 0, duration: dur, ease: 'none' }, t); }
  function dip(t, dur, outId, inId, color = '#000') {     // dip to black/white: out → colour → in (time passes)
    const d = document.getElementById('__dip') || (() => { const x = document.createElement('div'); x.id = '__dip'; x.style.cssText = `position:absolute;inset:0;opacity:0;z-index:50;pointer-events:none`; document.querySelector('[data-composition-id]').appendChild(x); return x; })();
    tl.set(d, { backgroundColor: color }, t);
    tl.fromTo(d, { opacity: 0 }, { opacity: 1, duration: dur / 2, ease: 'sine.in', immediateRender: false }, t);
    cut(t + dur / 2, outId, inId);
    tl.fromTo(d, { opacity: 1 }, { opacity: 0, duration: dur / 2, ease: 'sine.out', immediateRender: false }, t + dur / 2);
  }

  return { F, FPS, rnd, el, LOOKS, POSES, puppet, joint, mv, mouth, eyes, brows, blink, blinks, breathe, look, arm, pose, wave, squash, jolt, nod, shake, lean, emote, talk, listen, walk, walkSide, turn, smear, twos, glide, place, fade, appear, cam, cut, dissolve, dip };
}
// CSS the camera/layers need — paste into <style> (build.py replaces /*RIG_CSS*/)
const RIG_CSS = `
.cam{position:absolute;inset:0;--s:1;--x:0;--y:0;--rot:0;--shx:0;--shy:0;--dx:0;--dy:0;
  transform:translate(calc((var(--shx) + var(--dx))*1px),calc((var(--shy) + var(--dy))*1px)) rotate(calc(var(--rot)*1deg));transform-origin:960px 540px}
.layer{position:absolute;inset:0;--d:1;--zs:1;--blur:0;transform-origin:960px 540px;
  transform:translate(calc(var(--x)*var(--d)*1px),calc(var(--y)*var(--d)*1px)) scale(calc((1 + (var(--s) - 1)*var(--d))*var(--zs)));filter:blur(calc(var(--blur)*1px))}
.layer.bg img{position:absolute;left:-6%;top:-6%;width:112%;height:112%;object-fit:cover}
`;
(() => { const s = document.createElement('style'); s.textContent = RIG_CSS; document.head.appendChild(s); })();
