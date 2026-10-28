// Shared cast + timeline helpers for the zombie series (from Z01). Inlined by each episode's build.py at /*CAST*/.
// Needs in scope: el, G, piv, T, rnd, seed, $ (defined in the episode template) and gsap.
      const SKIN = '#b97a4c', SKIN2 = '#d7a27a', ZSK = '#8fa088', RED = '#D8343A';

      // ---------- characters (drawn facing right, origin at the feet) ----------
      function tae(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -8, -292, { r: 12 });
        el('path', { d: 'M-10 0 L10 0 L6 92 L-10 90 Z', fill: '#a56a40' }, aB);
        el('circle', { cx: -2, cy: 98, r: 11, fill: '#a56a40' }, aB);
        let lB, lF;
        if (opt.sit) {
          lB = piv(g, -6, -178); el('path', { d: 'M-16 -10 L16 -10 L72 2 L76 92 L54 94 L50 26 Z', fill: '#26314b' }, lB);
          lF = piv(g, 8, -178); el('path', { d: 'M-14 -10 L16 -10 L82 4 L86 96 L62 98 L58 28 Z', fill: '#33426a' }, lF);
          el('path', { d: 'M60 90 L104 92 Q110 106 98 106 L60 106 Z', fill: '#111' }, lF);
        } else {
          lB = piv(g, -10, -178); el('path', { d: 'M-14 0 L14 0 L6 86 L2 170 L-22 170 L-18 86 Z', fill: '#26314b' }, lB);
          el('path', { d: 'M-24 160 L18 160 L18 178 L-26 178 Z', fill: '#111' }, lB);
          lF = piv(g, 8, -178); el('path', { d: 'M-14 0 L14 0 L22 86 L28 170 L4 170 L-2 88 Z', fill: '#33426a' }, lF);
          el('path', { d: 'M2 160 L48 162 Q54 178 44 178 L2 178 Z', fill: '#111' }, lF);
        }
        el('path', { d: 'M-36 -306 Q0 -318 36 -306 L30 -168 L-30 -168 Z', fill: '#f07a1e' }, g);
        el('path', { d: 'M-7 -312 L7 -312 L6 -170 L-6 -170 Z', fill: '#22262f' }, g);
        el('rect', { x: -33, y: -218, width: 66, height: 9, fill: '#ffe08a' }, g);
        el('rect', { x: 12, y: -280, width: 18, height: 20, rx: 3, fill: '#fff' }, g);
        el('text', { x: 21, y: -264, 'font-size': 14, 'font-weight': 800, 'text-anchor': 'middle', fill: '#111', 'font-family': 'Prompt' }, g).textContent = '12';
        el('rect', { x: -8, y: -326, width: 16, height: 22, fill: SKIN }, g);
        const hd = G(g, { x: 4, y: -352 });
        el('circle', { r: 32, fill: SKIN }, hd);
        el('path', { d: 'M-33 -2 Q-32 -42 4 -40 Q36 -38 33 -8 L20 -16 Q-2 -28 -22 -10 Z', fill: '#15161a' }, hd);
        el('circle', { cx: -8, cy: 2, r: 7, fill: '#a56a40' }, hd);
        el('circle', { cx: 20, cy: -4, r: 4, fill: '#111' }, hd);
        el('path', { d: 'M12 -14 L28 -16', stroke: '#111', 'stroke-width': 4, 'stroke-linecap': 'round' }, hd);
        const mouth = el('path', { d: 'M16 16 Q22 18 28 15', stroke: '#5a2a1a', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, hd);
        let helmHead = null;
        if (opt.helmetOn) { helmHead = G(hd);
          el('path', { d: 'M-38 -8 Q-40 -50 4 -50 Q42 -48 40 -14 L40 -10 L-38 -8 Z', fill: '#c4262c' }, helmHead);
          el('path', { d: 'M-30 -20 Q0 -44 30 -30', stroke: '#fff', 'stroke-width': 5, fill: 'none', opacity: .5 }, helmHead); }
        const aF = piv(g, 14, -292, opt.armF || {});
        el('path', { d: 'M-11 0 L11 0 L14 90 L-6 94 Z', fill: SKIN }, aF);
        el('path', { d: 'M-14 -6 L14 -6 L13 30 L-13 30 Z', fill: '#22262f' }, aF);
        el('circle', { cx: 4, cy: 100, r: 13, fill: SKIN }, aF);
        let helm = null;
        if (opt.helmet) { helm = G(aF, { x: 4, y: 130 });
          el('line', { x1: 0, y1: -30, x2: 0, y2: -10, stroke: '#222', 'stroke-width': 4 }, helm);
          el('path', { d: 'M-32 14 Q-34 -32 0 -32 Q34 -32 32 14 Z', fill: '#c4262c', stroke: '#111', 'stroke-width': 4 }, helm);
          el('path', { d: 'M4 -10 L30 -10 L32 12 L6 12 Z', fill: '#1a1a1f' }, helm); }
        return { g, aF, aB, lF, lB, hd, mouth, helm };
      }
      function fon(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -10, -290, { r: 8 }); el('path', { d: 'M-10 0 L10 0 L6 88 L-10 86 Z', fill: '#c48d66' }, aB);
        const lB = piv(g, -10, -176); el('path', { d: 'M-14 0 L14 0 L8 168 L-16 168 Z', fill: '#1f7f74' }, lB);
        el('path', { d: 'M-20 162 L18 162 L18 178 L-22 178 Z', fill: '#f2f2f2' }, lB);
        const lF = piv(g, 8, -176); el('path', { d: 'M-14 0 L14 0 L22 168 L-2 168 Z', fill: '#23867a' }, lF);
        el('path', { d: 'M-4 162 L38 162 Q44 178 34 178 L-4 178 Z', fill: '#f2f2f2' }, lF);
        el('path', { d: 'M-34 -302 Q0 -314 34 -302 L32 -166 L-32 -166 Z', fill: '#2a9d8f' }, g);
        el('path', { d: 'M-12 -306 L0 -280 L12 -306 Z', fill: '#1f7f74' }, g);
        el('rect', { x: -8, y: -322, width: 16, height: 20, fill: SKIN2 }, g);
        const hd = G(g, { x: 2, y: -346 });
        el('circle', { cx: -30, cy: -18, r: 17, fill: '#1a1416' }, hd);
        el('circle', { r: 30, fill: SKIN2 }, hd);
        el('path', { d: 'M-31 6 Q-34 -38 2 -38 Q32 -36 30 -10 Q8 -24 -14 -16 L-20 18 Z', fill: '#1a1416' }, hd);
        el('circle', { cx: 18, cy: -4, r: 3.8, fill: '#111' }, hd);
        const mouth = el('path', { d: 'M14 15 Q20 17 25 14', stroke: '#7a3a2a', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, hd);
        const aF = piv(g, 12, -290, opt.armF || { r: -20 });
        el('path', { d: 'M-10 0 L10 0 L12 88 L-6 90 Z', fill: SKIN2 }, aF);
        el('path', { d: 'M-13 -6 L13 -6 L12 26 L-12 26 Z', fill: '#2a9d8f' }, aF);
        el('circle', { cx: 4, cy: 96, r: 12, fill: SKIN2 }, aF);
        const pole = piv(aF, 4, 96, opt.pole || { r: 20 });
        el('line', { x1: 0, y1: -230, x2: 0, y2: 130, stroke: '#c9ced6', 'stroke-width': 8, 'stroke-linecap': 'round' }, pole);
        el('path', { d: 'M0 -230 Q22 -236 20 -214', stroke: '#c9ced6', 'stroke-width': 6, fill: 'none' }, pole);
        el('rect', { x: 6, y: -214, width: 34, height: 52, rx: 10, fill: '#e8f4ff', opacity: .85, stroke: '#9fb2c8', 'stroke-width': 3 }, pole);
        el('line', { x1: -44, y1: 130, x2: 44, y2: 130, stroke: '#9aa1ab', 'stroke-width': 8, 'stroke-linecap': 'round' }, pole);
        el('circle', { cx: -44, cy: 138, r: 8, fill: '#333' }, pole); el('circle', { cx: 44, cy: 138, r: 8, fill: '#333' }, pole);
        return { g, aF, aB, lF, lB, hd, mouth, pole };
      }
      const SHIRTS = ['#cfd3cf', '#5a6a8a', '#7a4a3a', '#3e5a4a', '#8a7a5a', '#6a3a5a'];
      function zomb(p, o, opt = {}) {
        const g = G(p, o);
        const sh = opt.shirt || SHIRTS[Math.floor(rnd() * SHIRTS.length)];
        const aB = piv(g, 16, -282, { r: opt.armR ?? -6 });
        el('path', { d: 'M0 -9 L96 -10 L98 6 L0 10 Z', fill: '#768670' }, aB);
        el('path', { d: 'M94 -12 L118 -14 M94 -2 L120 -2 M94 6 L116 10', stroke: '#768670', 'stroke-width': 6, 'stroke-linecap': 'round' }, aB);
        if (!opt.noLegs) {
          el('path', { d: 'M-24 -172 L2 -172 L-8 -84 L-20 0 L-44 0 L-30 -86 Z', fill: '#2d2a33' }, g);
          el('path', { d: 'M-2 -172 L22 -172 L26 -84 L36 0 L12 0 L2 -84 Z', fill: '#3b3446' }, g);
        }
        el('path', { d: 'M-32 -292 Q8 -316 44 -284 L30 -164 L-30 -164 Z', fill: sh }, g);
        el('path', { d: 'M-10 -170 L-2 -200 L8 -172 L20 -196 L28 -166 Z', fill: '#1a1418', opacity: .5 }, g);
        el('path', { d: 'M8 -300 Q26 -296 34 -280 L26 -250 Q18 -270 4 -276 Z', fill: '#7a1418' }, g);
        const hd = G(g, { x: 30, y: -318, r: 12 });
        el('circle', { r: 30, fill: ZSK }, hd);
        el('path', { d: 'M-30 -4 Q-26 -32 6 -32 Q-10 -20 -16 4 Z', fill: '#3a3a38' }, hd);
        el('circle', { cx: 16, cy: -6, r: 10, fill: 'url(#gEye)' }, hd);
        el('circle', { cx: 16, cy: -6, r: 5, fill: '#fff' }, hd);
        el('path', { d: 'M8 12 Q18 20 28 10', stroke: '#5a0a10', 'stroke-width': 5, fill: 'none' }, hd);
        el('path', { d: 'M14 16 L14 30', stroke: '#8a1018', 'stroke-width': 4 }, hd);
        const aF = piv(g, 22, -276, { r: opt.armF ?? 4 });
        el('path', { d: 'M0 -10 L100 -8 L100 8 L0 10 Z', fill: ZSK }, aF);
        el('path', { d: 'M98 -10 L124 -12 M98 0 L126 0 M98 8 L122 12', stroke: ZSK, 'stroke-width': 6, 'stroke-linecap': 'round' }, aF);
        return { g, aF, aB, hd };
      }
      function bike(p, o) {
        const g = G(p, o);
        [-95, 95].forEach(x => { const w = G(g, { x, y: -46 });
          el('circle', { r: 46, fill: '#15161a' }, w); el('circle', { r: 30, fill: 'none', stroke: '#3a3d45', 'stroke-width': 4 }, w);
          el('circle', { r: 12, fill: '#9aa0aa' }, w); });
        el('line', { x1: 80, y1: -120, x2: 95, y2: -46, stroke: '#333', 'stroke-width': 9 }, g);
        el('path', { d: 'M-118 -78 L-30 -98 L66 -90 L112 -70 L98 -52 L-96 -52 Z', fill: '#c4262c' }, g);
        el('path', { d: 'M-100 -96 L10 -104 L12 -92 L-100 -84 Z', fill: '#111' }, g);
        el('path', { d: 'M-40 -52 L40 -52 L30 -26 L-30 -26 Z', fill: '#2a2c32' }, g);
        el('line', { x1: 70, y1: -122, x2: 108, y2: -136, stroke: '#222', 'stroke-width': 8, 'stroke-linecap': 'round' }, g);
        el('circle', { cx: 112, cy: -92, r: 12, fill: '#ffe7a0' }, g);
        return g;
      }
      function person(p, x, y, s, col, run, z) {
        const g = G(p, { x, y, sx: s, sy: Math.abs(s) });
        el('circle', { cx: 4, cy: -150, r: 18, fill: col }, g);
        el('path', { d: run ? 'M-16 -128 L22 -128 L18 -60 L44 0 L28 4 L4 -50 L-16 4 L-32 0 L-10 -62 Z' : 'M-16 -128 L22 -128 L18 -60 L22 0 L8 0 L2 -50 L-6 0 L-20 0 L-14 -62 Z', fill: col }, g);
        el('path', { d: run ? 'M18 -122 L46 -96 L40 -88 L14 -108 M-12 -122 L-40 -100 L-34 -92 L-8 -108' : 'M18 -122 L52 -116 L52 -106 L16 -108', stroke: col, 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }, g);
        if (z) { el('circle', { cx: 12, cy: -154, r: 4, fill: '#fff' }, g); }
        return g;
      }
      function car(p, x, y, s, col) {
        const g = G(p, { x, y, sx: s, sy: s });
        el('path', { d: 'M-130 -30 L-118 -70 L-70 -76 L-40 -118 L60 -118 L96 -76 L130 -66 L134 -30 Z', fill: col }, g);
        el('path', { d: 'M-30 -108 L20 -108 L20 -80 L-56 -78 Z M30 -108 L56 -108 L82 -80 L30 -80 Z', fill: '#2a3140', opacity: .85 }, g);
        [-80, 84].forEach(cx => { el('circle', { cx, cy: -26, r: 26, fill: '#141418' }, g); el('circle', { cx, cy: -26, r: 9, fill: '#888' }, g); });
        return g;
      }
      function busBody(p, x, y, len, roofY) {
        const g = G(p, { x, y });
        el('rect', { x: 0, y: roofY, width: len, height: 330, rx: 18, fill: '#c8352e' }, g);
        el('rect', { x: 0, y: roofY, width: len, height: 18, fill: '#a32a24' }, g);
        el('rect', { x: 0, y: roofY + 190, width: len, height: 22, fill: '#f2efe6' }, g);
        for (let i = 30; i < len - 100; i += 150) el('rect', { x: i, y: roofY + 42, width: 124, height: 120, rx: 8, fill: '#1c2230' }, g);
        el('circle', { cx: 120, cy: roofY + 330, r: 48, fill: '#141418' }, g); el('circle', { cx: len - 160, cy: roofY + 330, r: 48, fill: '#141418' }, g);
        return g;
      }
      function skyline(p, y, col, seedN, h = 260) {
        const g = G(p); let x = -60; seed = seedN;
        while (x < 1200) { const w = 70 + rnd() * 120, hh = 80 + rnd() * h;
          el('rect', { x, y: y - hh, width: w, height: hh + 400, fill: col }, g);
          if (rnd() > .5) el('rect', { x: x + w * .4, y: y - hh - 40, width: 6, height: 40, fill: col }, g);
          x += w + 6; }
        return g;
      }
      function zSil(p, x, y, s, col = '#120d16') { const g = person(p, x, y, s, col, false, true); return g; }

      // ---------- timeline helpers ----------
      window.__timelines = window.__timelines || {};
      const tl = gsap.timeline({ paused: true });
      const mv = (g, t, d, a, b, ease = 'power2.out') => tl.fromTo(g, { attr: { transform: T(a) } }, { attr: { transform: T(b) }, duration: d, ease, immediateRender: false }, t);
      const show = (id, t0, t1, fade = 0) => { if (t0 > 0) tl.fromTo('#' + id, { opacity: 0 }, { opacity: 1, duration: fade || .01, immediateRender: false }, t0); tl.to('#' + id, { opacity: 0, duration: .01 }, t1); };
      const cam = (id, t, d, a, b, ease = 'sine.inOut') => tl.fromTo('#' + id + ' .cam', a, { ...b, duration: d, ease, immediateRender: false }, t);
      const shake = (id, t, amp = 22, n = 6) => { FXLOG.push({ t: +t.toFixed(3), kind: 'shake', amp }); for (let i = 0; i < n; i++) tl.to('#' + id + ' .cam', { x: (i % 2 ? -1 : 1) * amp * (1 - i / n), y: (rnd() - .5) * amp, duration: .035 }, t + i * .035); tl.to('#' + id + ' .cam', { x: 0, y: 0, duration: .04 }, t + n * .035); };
      const fxl = $('fxl');
      const FXLOG = window.__fx = [];   // every SFX word / hit, read by _shared/fxlog.py -> audio/fx.json for the sound bed
      const word = (t, txt, x, y, cls = '', rot = -8, hold = .55) => {
        FXLOG.push({ t: +t.toFixed(3), kind: 'word', txt });
        const d = document.createElement('div'); d.className = 'fx ' + cls; d.textContent = txt; d.style.left = x + 'px'; d.style.top = y + 'px'; fxl.appendChild(d);
        tl.fromTo(d, { opacity: 0, scale: .2, rotation: rot - 14 }, { opacity: 1, scale: 1.15, rotation: rot, duration: .1, ease: 'back.out(3)', immediateRender: false }, t);
        tl.to(d, { scale: 1, duration: .1 }, t + .1);
        tl.to(d, { opacity: 0, scale: 1.3, duration: .2 }, t + hold);
      };
      const burst = (p, t, x, y, col = '#fff') => { const g = G(p, { x, y }); g.setAttribute('opacity', 0);
        for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2 + rnd() * .2, r1 = 50 + rnd() * 20, r2 = 150 + rnd() * 90;
          el('path', { d: `M${Math.cos(a - .06) * r1} ${Math.sin(a - .06) * r1} L${Math.cos(a) * r2} ${Math.sin(a) * r2} L${Math.cos(a + .06) * r1} ${Math.sin(a + .06) * r1} Z`, fill: col }, g); }
        tl.fromTo(g, { opacity: 1, attr: { transform: T({ x, y, sx: .4, sy: .4 }) } }, { attr: { transform: T({ x, y, sx: 1.2, sy: 1.2 }) }, duration: .18, immediateRender: false }, t);
        tl.to(g, { opacity: 0, duration: .12 }, t + .18); };
      const flash = (t, o = .85) => { tl.fromTo('#flash', { opacity: o }, { opacity: 0, duration: .16, immediateRender: false }, t); };
      const hit = (scene, svg, t, x, y, txt, wx, wy, cls, rot) => { FXLOG.push({ t: +t.toFixed(3), kind: 'hit', txt }); flash(t); burst(svg, t, x, y); shake(scene, t); word(t, txt, wx, wy, cls, rot); };
      const speedLines = (p, n, col, dir = 1) => { const g = G(p);
        for (let i = 0; i < n; i++) { const y = rnd() * 1920, w = 200 + rnd() * 500; el('rect', { x: rnd() * 1080, y, width: w, height: 3 + rnd() * 5, fill: col, opacity: .25 + rnd() * .4 }, g); }
        return g; };


      // ---------- cast added for Z02-Z10 (same conventions: facing right, origin at the feet, flip with sx: -s) ----------
      // มิว (10): ~70% of an adult; opt.bandage puts the Z04 bandage on her forearm (drawn on the front arm so it stays visible). opt.whistle = ลุงชาญ's whistle (Z08+).
      function mew(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -8, -196, { r: 10 }); el('path', { d: 'M-7 0 L7 0 L5 62 L-7 60 Z', fill: SKIN2 }, aB);
        const lB = piv(g, -7, -118); el('path', { d: 'M-9 0 L9 0 L6 112 L-10 112 Z', fill: SKIN2 }, lB);
        el('path', { d: 'M-14 106 L12 106 L12 118 L-16 118 Z', fill: '#e85a8a' }, lB);
        const lF = piv(g, 6, -118); el('path', { d: 'M-9 0 L9 0 L14 112 L-2 112 Z', fill: SKIN2 }, lF);
        el('path', { d: 'M-4 106 L24 106 Q28 118 20 118 L-4 118 Z', fill: '#e85a8a' }, lF);
        el('path', { d: 'M-26 -150 L26 -150 L32 -112 L-32 -112 Z', fill: '#3a4a8a' }, g);
        el('path', { d: 'M-24 -206 Q0 -214 24 -206 L24 -148 L-24 -148 Z', fill: '#f5a8c8' }, g);
        el('rect', { x: -40, y: -204, width: 18, height: 54, rx: 6, fill: '#f0c040' }, g);
        if (opt.whistle) { el('path', { d: 'M-10 -206 L0 -178 L10 -206', stroke: '#c0392b', 'stroke-width': 3, fill: 'none' }, g);
          el('rect', { x: -6, y: -182, width: 12, height: 8, rx: 2, fill: '#c9ced6' }, g); }
        el('rect', { x: -5, y: -218, width: 10, height: 14, fill: SKIN2 }, g);
        const hd = G(g, { x: 2, y: -240 });
        el('circle', { cx: -26, cy: 0, r: 10, fill: '#1a1416' }, hd); el('circle', { cx: 24, cy: -2, r: 9, fill: '#1a1416' }, hd);
        el('circle', { r: 25, fill: SKIN2 }, hd);
        el('path', { d: 'M-26 2 Q-28 -32 2 -32 Q28 -30 26 -4 Q4 -18 -16 -10 Z', fill: '#1a1416' }, hd);
        el('circle', { cx: 14, cy: -2, r: 3.5, fill: '#111' }, hd);
        const mouth = el('path', { d: 'M10 12 Q15 14 20 11', stroke: '#7a3a2a', 'stroke-width': 3, fill: 'none', 'stroke-linecap': 'round' }, hd);
        const aF = piv(g, 10, -196, opt.armF || {}); el('path', { d: 'M-7 0 L7 0 L9 62 L-5 64 Z', fill: SKIN2 }, aF);
        el('circle', { cx: 2, cy: 68, r: 8, fill: SKIN2 }, aF);
        if (opt.bandage) el('rect', { x: -8, y: 30, width: 18, height: 20, rx: 3, fill: '#f4f4f0', stroke: '#c9c4b8', 'stroke-width': 2 }, aF);
        return { g, aF, aB, lF, lB, hd, mouth };
      }
      // ข้าวตัง: small brown dog with a red collar. tail and hd are pivot groups (wag: mv(d.tail, t, .1, {r:-30}, {r:20})); bark = change mouth d.
      function dog(p, o) {
        const g = G(p, o);
        [-30, 26].forEach(x => el('rect', { x: x - 6, y: -40, width: 12, height: 40, rx: 4, fill: '#7a4a28' }, g));
        const tail = piv(g, -44, -58, { r: -30 }); el('path', { d: 'M0 0 Q-20 -24 -14 -46', stroke: '#9a6232', 'stroke-width': 10, fill: 'none', 'stroke-linecap': 'round' }, tail);
        el('ellipse', { cx: 0, cy: -56, rx: 50, ry: 24, fill: '#9a6232' }, g);
        [-18, 36].forEach(x => el('rect', { x: x - 6, y: -42, width: 12, height: 42, rx: 4, fill: '#8a5428' }, g));
        const hd = piv(g, 40, -70);
        el('circle', { cx: 10, cy: -14, r: 22, fill: '#9a6232' }, hd);
        el('path', { d: 'M26 -10 L48 -6 L46 6 L24 4 Z', fill: '#b07444' }, hd);
        el('circle', { cx: 48, cy: -4, r: 5, fill: '#111' }, hd);
        el('path', { d: 'M-4 -30 L-14 -4 L4 -14 Z', fill: '#5a3418' }, hd);
        el('circle', { cx: 18, cy: -20, r: 3.5, fill: '#111' }, hd);
        const mouth = el('path', { d: 'M30 6 L46 8', stroke: '#3a1a10', 'stroke-width': 3, fill: 'none' }, hd);
        el('rect', { x: -2, y: -2, width: 20, height: 6, rx: 3, fill: '#d8343a' }, hd);
        return { g, tail, hd, mouth };
      }
      // ลุงชาญ (61): security guard, navy cap, light-blue uniform, grey moustache, whistle; krabong staff in the front hand (staff pivots at the hand).
      function chan(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -8, -290, { r: 10 }); el('path', { d: 'M-10 0 L10 0 L6 88 L-10 86 Z', fill: '#a8723f' }, aB);
        const lB = piv(g, -10, -176); el('path', { d: 'M-14 0 L14 0 L6 168 L-18 168 Z', fill: '#1f2a44' }, lB);
        el('path', { d: 'M-22 160 L16 160 L16 178 L-24 178 Z', fill: '#0d0d10' }, lB);
        const lF = piv(g, 8, -176); el('path', { d: 'M-14 0 L14 0 L22 168 L-2 168 Z', fill: '#26324f' }, lF);
        el('path', { d: 'M-2 160 L44 162 Q50 178 40 178 L-2 178 Z', fill: '#0d0d10' }, lF);
        el('path', { d: 'M-36 -304 Q0 -316 36 -304 L32 -168 L-32 -168 Z', fill: '#9cc3e0' }, g);
        el('rect', { x: -32, y: -180, width: 64, height: 14, fill: '#111' }, g);
        el('rect', { x: 10, y: -280, width: 18, height: 12, fill: '#c99a2e' }, g);
        el('path', { d: 'M-36 -300 L-44 -276 L-30 -270 Z M36 -300 L44 -276 L30 -270 Z', fill: '#1f2a44' }, g);
        el('rect', { x: -8, y: -324, width: 16, height: 22, fill: '#b98050' }, g);
        const hd = G(g, { x: 4, y: -350 });
        el('circle', { r: 31, fill: '#b98050' }, hd);
        el('path', { d: 'M-30 -4 Q-30 -14 -22 -18 L-22 6 Z', fill: '#d0d0d0' }, hd);
        el('circle', { cx: 19, cy: -4, r: 3.8, fill: '#111' }, hd);
        el('path', { d: 'M10 -14 L28 -14', stroke: '#e0e0e0', 'stroke-width': 4 }, hd);
        el('path', { d: 'M8 10 Q20 4 32 10 L30 14 Q20 10 10 14 Z', fill: '#e0e0e0' }, hd);
        const mouth = el('path', { d: 'M14 20 Q21 22 27 19', stroke: '#5a2a1a', 'stroke-width': 3.5, fill: 'none', 'stroke-linecap': 'round' }, hd);
        el('path', { d: 'M-34 -10 Q-34 -46 2 -46 Q34 -46 34 -14 Z', fill: '#1f2a44' }, hd);
        el('path', { d: 'M20 -16 L54 -12 L52 -6 L20 -8 Z', fill: '#141c30' }, hd);
        const aF = piv(g, 12, -290, opt.armF || { r: -20 });
        el('path', { d: 'M-11 0 L11 0 L13 88 L-6 90 Z', fill: '#b98050' }, aF);
        el('path', { d: 'M-14 -6 L14 -6 L13 34 L-13 34 Z', fill: '#9cc3e0' }, aF);
        el('circle', { cx: 4, cy: 96, r: 12, fill: '#b98050' }, aF);
        const staff = piv(aF, 4, 96, opt.staff || { r: 10 });
        el('line', { x1: 0, y1: -260, x2: 0, y2: 160, stroke: '#7a5228', 'stroke-width': 11, 'stroke-linecap': 'round' }, staff);
        el('line', { x1: 0, y1: -260, x2: 0, y2: -230, stroke: '#3a2410', 'stroke-width': 13 }, staff);
        el('line', { x1: 0, y1: 130, x2: 0, y2: 160, stroke: '#3a2410', 'stroke-width': 13 }, staff);
        const whistle = el('rect', { x: 20, y: -300, width: 14, height: 9, rx: 2, fill: '#c9ced6' }, g);
        return { g, aF, aB, lF, lB, hd, mouth, staff, whistle };
      }
      // เสี่ยเปา (human, Z05 sting / Z06): heavy gang boss, loud flower shirt, gold chain + gold tooth, slick hair, golf club (club pivots at the hand).
      function pao(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -14, -292, { r: 12 }); el('path', { d: 'M-12 0 L12 0 L8 90 L-12 88 Z', fill: '#c48a5a' }, aB);
        const lB = piv(g, -12, -176); el('path', { d: 'M-18 0 L18 0 L8 168 L-20 168 Z', fill: '#222' }, lB);
        el('path', { d: 'M-24 160 L16 160 L16 178 L-26 178 Z', fill: '#5a3a1a' }, lB);
        const lF = piv(g, 10, -176); el('path', { d: 'M-18 0 L18 0 L24 168 L-4 168 Z', fill: '#2a2a2a' }, lF);
        el('path', { d: 'M-4 160 L46 162 Q52 178 42 178 L-4 178 Z', fill: '#5a3a1a' }, lF);
        el('path', { d: 'M-50 -300 Q0 -320 50 -300 L56 -200 Q0 -150 -56 -200 Z', fill: '#e0503a' }, g);
        [[-30, -280, '#ffd23f'], [10, -290, '#3ac0a0'], [34, -250, '#fff'], [-20, -230, '#3ac0a0'], [20, -215, '#ffd23f'], [-40, -200, '#fff'], [0, -255, '#fff']]
          .forEach(([cx, cy, f]) => el('circle', { cx, cy, r: 9, fill: f }, g));
        el('path', { d: 'M-22 -306 Q2 -270 26 -306', stroke: '#e8c040', 'stroke-width': 8, fill: 'none' }, g);
        el('rect', { x: -10, y: -326, width: 20, height: 22, fill: '#c48a5a' }, g);
        const hd = G(g, { x: 4, y: -352 });
        el('circle', { r: 34, fill: '#c48a5a' }, hd);
        el('path', { d: 'M-34 -4 Q-34 -44 4 -42 Q36 -40 34 -14 Q0 -30 -20 -16 Z', fill: '#0d0d0d' }, hd);
        el('circle', { cx: 20, cy: -4, r: 3.8, fill: '#111' }, hd);
        el('path', { d: 'M10 -14 L30 -12', stroke: '#111', 'stroke-width': 5 }, hd);
        const mouth = el('path', { d: 'M12 16 Q22 22 32 14', stroke: '#5a2a1a', 'stroke-width': 4, fill: 'none', 'stroke-linecap': 'round' }, hd);
        el('rect', { x: 26, y: 12, width: 8, height: 5, fill: '#e8c040' }, hd);
        const aF = piv(g, 18, -292, opt.armF || { r: -10 });
        el('path', { d: 'M-12 0 L12 0 L14 90 L-6 92 Z', fill: '#c48a5a' }, aF);
        el('path', { d: 'M-15 -6 L15 -6 L14 30 L-14 30 Z', fill: '#e0503a' }, aF);
        el('circle', { cx: 4, cy: 98, r: 13, fill: '#c48a5a' }, aF);
        const club = piv(aF, 4, 98, opt.club || { r: 0 });
        el('line', { x1: 0, y1: -20, x2: 0, y2: 200, stroke: '#c9ced6', 'stroke-width': 6 }, club);
        el('path', { d: 'M-4 196 L34 196 L36 212 L-6 210 Z', fill: '#9aa1ab' }, club);
        return { g, aF, aB, lF, lB, hd, mouth, club };
      }
      // gang member (Z06): human in a black tank top; same body as zomb() but normal skin and eyes.
      function thug(p, o, opt = {}) {
        const z = zomb(p, o, { shirt: '#151515', armF: opt.armF ?? 60, armR: opt.armR ?? 70 });
        const c = z.hd.querySelectorAll('circle');
        c[0].setAttribute('fill', '#c48a5a'); z.g.querySelectorAll('path').forEach(pth => { const f = pth.getAttribute('fill'); if (f === '#7a1418' || f === '#768670') pth.setAttribute('fill', f === '#7a1418' ? '#151515' : '#a8743f'); }); c[1].setAttribute('opacity', 0); c[2].setAttribute('r', 3.8); c[2].setAttribute('fill', '#111');
        z.g.querySelectorAll('path').forEach(pth => { if (pth.getAttribute('fill') === ZSK || pth.getAttribute('stroke') === ZSK) { pth.getAttribute('fill') === ZSK && pth.setAttribute('fill', '#c48a5a'); pth.getAttribute('stroke') === ZSK && pth.setAttribute('stroke', '#c48a5a'); } });
        return z;
      }
      // brute zombie (Z05; brute เสี่ยเปา in Z10 with opt.pao: white car-door armour, gold chain, slick hair, golf club fused to the hand). Use sx/sy ~1.5-2.2.
      function brute(p, o, opt = {}) {
        const g = G(p, o);
        const aB = piv(g, -30, -300, { r: opt.armR ?? 20 });
        el('path', { d: 'M-22 0 L22 0 L18 150 L-24 146 Z', fill: '#6f7f6a' }, aB); el('circle', { cx: -2, cy: 160, r: 26, fill: '#6f7f6a' }, aB);
        el('path', { d: 'M-50 -176 L-4 -176 L-14 0 L-60 0 Z', fill: '#2a2630' }, g);
        el('path', { d: 'M4 -176 L50 -176 L58 0 L14 0 Z', fill: '#352f3e' }, g);
        el('path', { d: 'M-70 -330 Q0 -370 72 -330 L62 -170 L-62 -170 Z', fill: opt.pao ? '#a03a2a' : '#4a4038' }, g);
        if (opt.pao) el('path', { d: 'M-30 -340 Q4 -290 36 -340', stroke: '#e8c040', 'stroke-width': 10, fill: 'none' }, g);
        const door = G(g, { x: 0, y: -260 });
        el('path', { d: 'M-60 -60 L56 -66 L60 70 L-58 74 Z', fill: opt.pao ? '#e8e8e8' : '#3a6a9a', stroke: '#222', 'stroke-width': 6 }, door);
        el('path', { d: 'M-46 -54 L42 -58 L44 -10 L-46 -6 Z', fill: '#1c2230', opacity: .8 }, door);
        el('rect', { x: 30, y: 14, width: 22, height: 8, fill: '#888' }, door);
        el('path', { d: 'M-70 -320 L60 -180', stroke: '#888', 'stroke-width': 8, 'stroke-dasharray': '14 6' }, g);
        const hd = G(g, { x: 20, y: -372, r: 10 });
        el('circle', { r: 40, fill: '#7f8f78' }, hd);
        if (opt.pao) el('path', { d: 'M-40 -4 Q-40 -50 4 -48 Q40 -46 38 -18 Q0 -34 -24 -18 Z', fill: '#0d0d0d' }, hd);
        el('circle', { cx: 20, cy: -8, r: 13, fill: 'url(#gEye)' }, hd); el('circle', { cx: 20, cy: -8, r: 6.5, fill: '#fff' }, hd);
        el('path', { d: 'M6 16 Q22 28 36 14', stroke: '#5a0a10', 'stroke-width': 7, fill: 'none' }, hd);
        const aF = piv(g, 40, -300, { r: opt.armF ?? -10 });
        el('path', { d: 'M-22 0 L22 0 L18 150 L-24 146 Z', fill: '#7f8f78' }, aF); el('circle', { cx: -2, cy: 160, r: 28, fill: '#7f8f78' }, aF);
        let club = null;
        if (opt.pao) { club = piv(aF, -2, 160, { r: 0 });
          el('line', { x1: 0, y1: 0, x2: 0, y2: 260, stroke: '#c9ced6', 'stroke-width': 9 }, club);
          el('path', { d: 'M-6 254 L46 254 L48 274 L-8 272 Z', fill: '#9aa1ab' }, club); }
        return { g, aF, aB, hd, door, club };
      }
      // night runner = zomb() leaning forward: zomb(p, { x, y, sx, sy, r: 18 }, { armF: -20, armR: -10 }).
