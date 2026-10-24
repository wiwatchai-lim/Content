// Animal silhouettes for the hidden-animal game, built from simple shapes in a local box about 400×400
// centred on (0, 0), y down, facing left. Each animal is a list of SVG path strings (one per shape);
// a point is inside the animal when it is inside any of them.

// Ellipse centred on (cx, cy), rotated `rot` degrees.
const ell = (cx, cy, rx, ry, rot = 0) => {
  const r = (rot * Math.PI) / 180, dx = rx * Math.cos(r), dy = rx * Math.sin(r);
  return `M${cx + dx} ${cy + dy} A${rx} ${ry} ${rot} 1 1 ${cx - dx} ${cy - dy} A${rx} ${ry} ${rot} 1 1 ${cx + dx} ${cy + dy}Z`;
};
const circ = (cx, cy, r) => ell(cx, cy, r, r);
const poly = (...pts) => `M${pts.map((p) => p.join(' ')).join(' L')}Z`;
// Thick straight bar from (x1, y1) to (x2, y2).
const bar = (x1, y1, x2, y2, w) => {
  const len = Math.hypot(x2 - x1, y2 - y1), nx = (-(y2 - y1) / len) * (w / 2), ny = ((x2 - x1) / len) * (w / 2);
  return poly([x1 + nx, y1 + ny], [x2 + nx, y2 + ny], [x2 - nx, y2 - ny], [x1 - nx, y1 - ny]);
};

export const ANIMALS = {
  rabbit: [
    ell(30, 70, 115, 88), ell(-80, -20, 58, 50), ell(-105, -125, 20, 70, -12), ell(-62, -128, 20, 70, 14),
    circ(145, 40, 28), ell(-30, 150, 65, 18),
  ],
  owl: [
    ell(0, 30, 100, 140), poly([-90, -60], [-85, -165], [-30, -95]), poly([90, -60], [85, -165], [30, -95]),
    ell(-35, 170, 30, 14), ell(35, 170, 30, 14),
  ],
  fish: [
    ell(-30, 0, 150, 78), poly([100, 0], [205, -95], [190, 0], [205, 95]),
    poly([-70, -60], [0, -130], [40, -55]), poly([-40, 60], [0, 115], [30, 55]),
  ],
  bird: [
    ell(10, 20, 115, 62, -18), circ(-95, -55, 48), poly([-135, -70], [-195, -50], [-135, -35]),
    poly([85, 15], [210, -25], [215, 15], [95, 60]), bar(-10, 70, -15, 150, 12), bar(30, 65, 30, 150, 12),
    bar(-60, 150, 80, 150, 12),
  ],
  elephant: [
    ell(30, 0, 150, 105), circ(-120, -40, 78), ell(-80, -30, 60, 85),
    poly([-180, -20], [-205, 110], [-185, 175], [-150, 170], [-170, 110], [-140, 10]),
    bar(-45, 40, -45, 190, 52), bar(25, 40, 25, 190, 52), bar(105, 40, 105, 190, 52), bar(155, -10, 195, 90, 12),
  ],
  turtle: [
    ell(0, 0, 155, 100), ell(0, 70, 150, 30), circ(-185, 15, 42), bar(-150, 25, -175, 20, 40),
    ell(-95, 95, 38, 26), ell(95, 95, 38, 26), poly([150, 30], [200, 50], [150, 60]),
  ],
  snail: [
    circ(40, -40, 100), ell(-20, 85, 185, 38), bar(-175, 70, -205, -60, 16), bar(-140, 70, -150, -65, 16),
    circ(-207, -68, 16), circ(-151, -73, 16),
  ],
  butterfly: [
    ell(-100, -60, 105, 70, 35), ell(100, -60, 105, 70, -35), ell(-72, 80, 72, 48, -35), ell(72, 80, 72, 48, 35),
    ell(0, 0, 14, 130), bar(-5, -120, -50, -195, 9), bar(5, -120, 50, -195, 9),
  ],
  giraffe: [
    ell(70, 20, 115, 62), poly([-10, -20], [-115, -225], [-80, -245], [40, -20]), ell(-120, -245, 50, 24, -20),
    bar(-100, -265, -95, -300, 9), bar(-80, -268, -70, -300, 9),
    bar(0, 50, -5, 210, 26), bar(40, 55, 40, 210, 26), bar(115, 55, 120, 210, 26), bar(150, 50, 160, 210, 26),
    bar(180, 10, 215, 90, 8),
  ],
  duck: [
    ell(25, 50, 135, 72), circ(-95, -70, 50), ell(-155, -60, 38, 15), bar(-90, -50, -60, 30, 60),
    poly([125, 20], [200, -40], [175, 55]),
  ],
};

// Bold versions for the colour-vision dot plates: no thin legs or antennae (they vanish among the dots), every
// part at least ~50 units wide, the features that name the animal (ears, trunk, tail, shell) made big.
// Facing left; `box` = [minX, minY, maxX, maxY] in local units, used to centre the animal on the plate.
export const PLATE_ANIMALS = {
  cat: {
    box: [-140, -200, 220, 165],
    shapes: [
      ell(30, 60, 115, 105), circ(-55, -80, 80),
      poly([-128, -100], [-120, -200], [-62, -150]), poly([-45, -152], [10, -200], [18, -95]),
      bar(125, 130, 185, 10, 46), circ(185, 5, 23),
    ],
  },
  fish: {
    box: [-185, -135, 215, 125],
    shapes: [
      ell(-35, 0, 150, 85), poly([90, 0], [215, -110], [190, 0], [215, 110]),
      poly([-90, -65], [-10, -135], [40, -60]), poly([-50, 70], [-5, 125], [30, 60]),
    ],
  },
  rabbit: {
    box: [-145, -205, 175, 170],
    shapes: [
      ell(30, 70, 120, 92), ell(-80, -20, 64, 55), ell(-108, -125, 28, 80, -12), ell(-55, -128, 28, 80, 14),
      circ(148, 40, 30), ell(-30, 150, 70, 20),
    ],
  },
  elephant: {
    box: [-220, -130, 195, 180],
    shapes: [
      ell(40, 0, 155, 108), circ(-110, -40, 88), ell(-55, -30, 70, 95),
      bar(-165, -20, -195, 150, 56), circ(-195, 150, 28),
      bar(-30, 40, -30, 180, 62), bar(55, 40, 55, 180, 62), bar(135, 40, 135, 180, 62),
    ],
  },
  turtle: {
    box: [-235, -110, 215, 135],
    shapes: [
      ell(20, -5, 165, 105), ell(20, 55, 170, 40), circ(-185, 15, 52), bar(-140, 25, -185, 18, 58),
      ell(-85, 100, 50, 36), ell(120, 100, 50, 36), poly([175, 20], [215, 45], [175, 70]),
    ],
  },
  duck: {
    box: [-215, -135, 205, 125],
    shapes: [
      ell(25, 50, 140, 76), circ(-95, -70, 58), ell(-165, -58, 52, 22), bar(-90, -50, -55, 30, 72),
      poly([125, 15], [205, -50], [180, 60]),
    ],
  },
  butterfly: {
    box: [-200, -165, 200, 160],
    shapes: [
      ell(-100, -60, 108, 74, 35), ell(100, -60, 108, 74, -35), ell(-75, 82, 76, 52, -35), ell(75, 82, 76, 52, 35),
      ell(0, 5, 26, 140),
    ],
  },
  snail: {
    box: [-225, -160, 175, 135],
    shapes: [
      circ(45, -45, 115), ell(-20, 90, 195, 45), bar(-170, 70, -195, -70, 28), bar(-130, 70, -140, -75, 28),
      circ(-197, -80, 24), circ(-141, -86, 24),
    ],
  },
  bird: {
    box: [-220, -125, 220, 105],
    shapes: [
      ell(20, 20, 135, 82, -15), circ(-100, -60, 65), poly([-150, -85], [-220, -55], [-150, -30]),
      poly([95, 5], [220, -45], [220, 30], [110, 70]),
    ],
  },
};
