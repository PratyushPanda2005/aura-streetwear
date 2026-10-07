import type { ReactNode } from "react";

/* -------------------------------------------------------------------------- */
/* Shared                                                                     */
/* -------------------------------------------------------------------------- */

type Pt = readonly [number, number];
type Cubic = readonly [Pt, Pt, Pt, Pt];

interface ArtProps {
  className?: string;
}

const C = {
  hotPink: "#FF37B4",
  lightPink: "#FF8BBE",
  yellow: "#FAC209",
  navy: "#001482",
  olive: "#868B1D",
  cream: "#F4FFDE",
  red: "#FA3228",
  purple: "#AA73F5",
  green: "#3C6E32",
  teal: "#094F45",
  brown: "#AA593C",
  orange: "#FA5909",
  blue: "#0090C7",
  royal: "#2D45C7",
  emerald: "#009A6E",
  offWhite: "#F5F4F1",
  grey: "#95AAB4",
  black: "#000",
} as const;

const INK = { stroke: C.black, strokeWidth: 1, strokeLinejoin: "round" } as const;
const LINE = { ...INK, fill: "none", strokeLinecap: "round" } as const;
const DISPLAY_FONT = "[font-family:var(--font-yn-display)]";

const svgProps = (viewBox: string, className?: string) =>
  ({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox,
    className,
    "aria-hidden": true,
    focusable: "false",
  }) as const;

const f = (n: number): string => String(Math.round(n * 10) / 10 + 0);
const pt = (p: Pt): string => `${f(p[0])} ${f(p[1])}`;
const rad = (deg: number): number => (deg * Math.PI) / 180;
const polar = (cx: number, cy: number, r: number, deg: number): Pt => [
  cx + r * Math.cos(rad(deg)),
  cy + r * Math.sin(rad(deg)),
];
const add = (p: Pt, d: Pt, k: number): Pt => [p[0] + d[0] * k, p[1] + d[1] * k];
const pick = (pts: readonly Pt[], i: number): Pt =>
  pts[((i % pts.length) + pts.length) % pts.length] ?? [0, 0];

function cubicAt(c: Cubic, t: number): Pt {
  const u = 1 - t;
  const a = u * u * u;
  const b = 3 * u * u * t;
  const d = 3 * u * t * t;
  const e = t * t * t;
  return [
    a * c[0][0] + b * c[1][0] + d * c[2][0] + e * c[3][0],
    a * c[0][1] + b * c[1][1] + d * c[2][1] + e * c[3][1],
  ];
}

/** Unit tangent of a cubic at t. */
function cubicDir(c: Cubic, t: number): Pt {
  const u = 1 - t;
  const x =
    3 * u * u * (c[1][0] - c[0][0]) +
    6 * u * t * (c[2][0] - c[1][0]) +
    3 * t * t * (c[3][0] - c[2][0]);
  const y =
    3 * u * u * (c[1][1] - c[0][1]) +
    6 * u * t * (c[2][1] - c[1][1]) +
    3 * t * t * (c[3][1] - c[2][1]);
  const len = Math.hypot(x, y) || 1;
  return [x / len, y / len];
}

const normalOf = (d: Pt): Pt => [-d[1], d[0]];

/** Closed Catmull-Rom spline through the points, emitted as cubic beziers. */
function closedSpline(pts: readonly Pt[]): string {
  let d = `M ${pt(pick(pts, 0))}`;
  for (let i = 0; i < pts.length; i += 1) {
    const p0 = pick(pts, i - 1);
    const p1 = pick(pts, i);
    const p2 = pick(pts, i + 1);
    const p3 = pick(pts, i + 2);
    const c1: Pt = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2: Pt = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C ${pt(c1)} ${pt(c2)} ${pt(p2)}`;
  }
  return `${d} Z`;
}

/** A round-capped limb of varying width that follows a cubic centre line. */
function taperPath(c: Cubic, w0: number, w1: number, steps = 8): string {
  const left: Pt[] = [];
  const right: Pt[] = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const p = cubicAt(c, t);
    const n = normalOf(cubicDir(c, t));
    const hw = (w0 + (w1 - w0) * t) / 2;
    left.push(add(p, n, hw));
    right.push(add(p, n, -hw));
  }
  const cap = (t: number, hw: number, sign: number): Pt[] => {
    const p = cubicAt(c, t);
    const d = cubicDir(c, t);
    const n = normalOf(d);
    return [50, 0, -50].map((deg) => {
      const along = Math.cos(rad(deg)) * hw * sign;
      const across = Math.sin(rad(deg)) * hw * sign;
      return add(add(p, d, along), n, across);
    });
  };
  return closedSpline([
    ...left,
    ...cap(1, w1 / 2, 1),
    ...right.reverse(),
    ...cap(0, w0 / 2, -1),
  ]);
}

/** A long almond nail that pokes out past the tip of a limb. */
function nailPath(c: Cubic, tipWidth: number, length: number): string {
  const p = cubicAt(c, 1);
  const d = cubicDir(c, 1);
  const n = normalOf(d);
  const hw = tipWidth * 0.4;
  const baseL = add(add(p, d, -4), n, hw);
  const baseR = add(add(p, d, -4), n, -hw);
  const apex = add(p, d, tipWidth / 2 + length);
  const reach = tipWidth / 2 + length * 0.55;
  return [
    `M ${pt(baseL)}`,
    `C ${pt(add(baseL, d, reach))} ${pt(add(add(apex, d, -8), n, 3))} ${pt(apex)}`,
    `C ${pt(add(add(apex, d, -8), n, -3))} ${pt(add(baseR, d, reach))} ${pt(baseR)}`,
    "Z",
  ].join(" ");
}

/** Pointed leaf from base to tip. */
function leafPath(base: Pt, tip: Pt, width: number, bend = 0.25): string {
  const dx = tip[0] - base[0];
  const dy = tip[1] - base[1];
  const len = Math.hypot(dx, dy) || 1;
  const n: Pt = [-dy / len, dx / len];
  const along = (k: number, off: number): Pt => [
    base[0] + dx * k + n[0] * off,
    base[1] + dy * k + n[1] * off,
  ];
  const sway = width * bend;
  return [
    `M ${pt(base)}`,
    `C ${pt(along(0.2, width + sway))} ${pt(along(0.7, width * 0.7 + sway))} ${pt(tip)}`,
    `C ${pt(along(0.7, -width * 0.7 + sway))} ${pt(along(0.2, -width + sway))} ${pt(base)}`,
    "Z",
  ].join(" ");
}

/** Scalloped disc: `lobes` outward bumps of height `depth` on radius `r`. */
function scallopPath(
  cx: number,
  cy: number,
  r: number,
  depth: number,
  lobes: number,
  phase = 0,
): string {
  const step = 360 / lobes;
  let d = `M ${pt(polar(cx, cy, r, phase))}`;
  for (let i = 0; i < lobes; i += 1) {
    const a = phase + i * step;
    const c1 = polar(cx, cy, r + depth * 1.35, a + step * 0.12);
    const c2 = polar(cx, cy, r + depth * 1.35, a + step * 0.88);
    d += ` C ${pt(c1)} ${pt(c2)} ${pt(polar(cx, cy, r, a + step))}`;
  }
  return `${d} Z`;
}

function starPoints(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  points: number,
  phase = 0,
): string {
  return Array.from({ length: points * 2 }, (_, i) =>
    pt(polar(cx, cy, i % 2 === 0 ? outer : inner, phase + (i * 180) / points)),
  ).join(" ");
}

/** Four-point sparkle with concave sides. */
const sparklePath = (cx: number, cy: number, r: number): string =>
  `M ${cx} ${cy - r} Q ${cx + r * 0.18} ${cy - r * 0.18} ${cx + r} ${cy} ` +
  `Q ${cx + r * 0.18} ${cy + r * 0.18} ${cx} ${cy + r} ` +
  `Q ${cx - r * 0.18} ${cy + r * 0.18} ${cx - r} ${cy} ` +
  `Q ${cx - r * 0.18} ${cy - r * 0.18} ${cx} ${cy - r} Z`;

/** Spiral built from half circles of growing radius, starting at (cx, cy). */
function spiralPath(cx: number, cy: number, step: number, turns: number): string {
  let d = `M ${cx} ${cy}`;
  for (let i = 1; i <= turns; i += 1) {
    const r = step * i;
    const endX = i % 2 === 1 ? cx + step * (i + 1) : cx - step * i;
    d += ` A ${r} ${r} 0 0 1 ${f(endX)} ${cy}`;
  }
  return d;
}

/* -------------------------------------------------------------------------- */
/* EmblemArt                                                                  */
/* -------------------------------------------------------------------------- */

interface EmblemArtProps extends ArtProps {
  title?: string;
  subtitle?: string;
  year?: string;
  tagline?: string;
}

const AURA_RINGS = [
  { id: "pink", fill: C.hotPink, r: 236, depth: 17, lobes: 18, phase: 0 },
  { id: "blue", fill: C.blue, r: 190, depth: 15, lobes: 15, phase: 12 },
  { id: "yellow", fill: C.yellow, r: 146, depth: 13, lobes: 12, phase: 0 },
  { id: "orange", fill: C.orange, r: 104, depth: 11, lobes: 9, phase: 20 },
] as const;

const SPARK_DISCS = [205, 369] as const;
const CLOUD_PUFFS = [177, 397, 287] as const;
const CLOUD_PATH =
  "M -58 806 C -82 806 -82 778 -56 780 C -56 760 -26 756 -16 770 " +
  "C -6 750 30 752 34 774 C 58 764 80 788 58 806 Z";
const KOI_TURNS = [0, 180] as const;
const KOI_SPOTS: readonly Pt[] = [
  [304, 541],
  [274, 539],
  [250, 551],
];

function Koi({ turn }: { turn: number }) {
  return (
    <g transform={`rotate(${turn} 287 590)`}>
      <path
        d="M 302 528 C 298 510 276 506 260 516 C 268 520 268 527 266 532 Z"
        fill={C.orange}
        {...INK}
      />
      <path
        d="M 226 570 C 213 574 203 588 205 606 C 213 597 222 593 230 595 C 228 602 230 611 237 616 C 238 601 243 589 241 578 Z"
        fill={C.orange}
        {...INK}
      />
      <path
        d="M 350 596 C 357 556 322 524 284 526 C 256 528 234 546 226 570 C 230 576 236 579 241 578 C 248 562 264 552 284 552 C 304 552 320 566 322 588 C 326 601 344 606 350 596 Z"
        fill={C.emerald}
        {...INK}
      />
      <path
        d="M 320 573 C 309 573 300 581 299 593 C 308 591 316 589 322 586 Z"
        fill={C.orange}
        {...INK}
      />
      <path d="M 327 562 C 335 570 334 581 324 588" {...LINE} />
      {KOI_SPOTS.map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={4} fill={C.yellow} {...INK} />
      ))}
      <circle cx={340} cy={583} r={4} fill={C.cream} {...INK} />
      <circle cx={340.5} cy={584} r={1.6} fill={C.black} />
    </g>
  );
}

export function EmblemArt({
  className,
  title = "STUDIO NAME",
  subtitle = "CREATIVE STUDIO",
  year = "MMXXVI",
  tagline = "MAKE · BELIEVE · MAKE",
}: EmblemArtProps) {
  const titleLength = Math.min(320, Math.max(1, title.length) * 27);
  const taglineLength = Math.min(340, Math.max(1, tagline.length) * 14);

  return (
    <svg {...svgProps("0 0 574 810", className)}>
      {/* Aura */}
      {AURA_RINGS.map((ring) => (
        <path
          key={ring.id}
          d={scallopPath(287, 330, ring.r, ring.depth, ring.lobes, ring.phase)}
          fill={ring.fill}
          {...INK}
        />
      ))}

      {/* Lower motif: two koi circling in a pond */}
      <circle cx={287} cy={590} r={82} fill={C.navy} {...INK} />
      <circle cx={287} cy={590} r={10} fill={C.blue} {...INK} />
      {KOI_TURNS.map((turn) => (
        <Koi key={turn} turn={turn} />
      ))}

      {/* Top motif: crescent over an hourglass */}
      <path
        d="M 298 130 A 16 16 0 1 0 298 160 A 20 20 0 0 1 298 130 Z"
        fill={C.yellow}
        {...INK}
      />
      <rect x={251} y={180} width={6} height={68} fill={C.purple} {...INK} />
      <rect x={317} y={180} width={6} height={68} fill={C.purple} {...INK} />
      <path
        d="M 259 179 H 315 C 315 200 293 205 293 214 C 293 223 315 228 315 249 H 259 C 259 228 281 223 281 214 C 281 205 259 200 259 179 Z"
        fill={C.cream}
        {...INK}
      />
      <path
        d="M 266 192 H 308 C 303 202 292 206 287 212 C 282 206 271 202 266 192 Z"
        fill={C.yellow}
        {...INK}
      />
      <path d="M 287 212 V 232" {...LINE} />
      <path
        d="M 264 249 C 270 238 280 233 287 231 C 294 233 304 238 310 249 Z"
        fill={C.yellow}
        {...INK}
      />
      <rect x={245} y={168} width={84} height={12} rx={4} fill={C.purple} {...INK} />
      <rect x={245} y={248} width={84} height={12} rx={4} fill={C.purple} {...INK} />

      {/* Plate */}
      <path
        d="M 131 275 H 443 A 24 24 0 0 0 467 299 V 376 A 24 24 0 0 0 443 400 H 131 A 24 24 0 0 0 107 376 V 299 A 24 24 0 0 0 131 275 Z"
        fill={C.offWhite}
        {...INK}
      />
      <path d="M 150 285 H 424 M 150 390 H 424" {...LINE} />
      <path d="M 126 328 L 134 338 L 126 348 L 118 338 Z" fill={C.hotPink} {...INK} />
      <path d="M 448 328 L 456 338 L 448 348 L 440 338 Z" fill={C.hotPink} {...INK} />
      <text
        x={287}
        y={345}
        textAnchor="middle"
        fontSize={44}
        fontWeight={700}
        fill={C.black}
        textLength={titleLength}
        lengthAdjust="spacingAndGlyphs"
        className={DISPLAY_FONT}
      >
        {title}
      </text>
      <text
        x={287}
        y={385}
        textAnchor="middle"
        fontSize={16}
        fontWeight={600}
        letterSpacing={3}
        fill={C.black}
      >
        {subtitle}
      </text>

      {/* Year tab */}
      {SPARK_DISCS.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={440} r={17} fill={C.orange} {...INK} />
          <path d={sparklePath(cx, 440, 12)} fill={C.cream} {...INK} />
        </g>
      ))}
      <rect x={230} y={422} width={114} height={36} rx={18} fill={C.yellow} {...INK} />
      <text
        x={287}
        y={446}
        textAnchor="middle"
        fontSize={18}
        fontWeight={700}
        letterSpacing={2}
        fill={C.black}
      >
        {year}
      </text>

      {/* Tagline ribbon */}
      <path d="M 117 704 H 62 L 82 726 L 62 748 H 117 Z" fill={C.orange} {...INK} />
      <path d="M 457 704 H 512 L 492 726 L 512 748 H 457 Z" fill={C.orange} {...INK} />
      <path d="M 97 736 L 117 748 V 736 Z" fill={C.brown} {...INK} />
      <path d="M 477 736 L 457 748 V 736 Z" fill={C.brown} {...INK} />
      <path
        d="M 97 692 C 220 686 354 686 477 692 V 736 C 354 730 220 730 97 736 Z"
        fill={C.yellow}
        {...INK}
      />
      <text
        x={287}
        y={720}
        textAnchor="middle"
        fontSize={22}
        fontWeight={700}
        fill={C.black}
        textLength={taglineLength}
        lengthAdjust="spacingAndGlyphs"
        className={DISPLAY_FONT}
      >
        {tagline}
      </text>

      {/* Base clouds */}
      {CLOUD_PUFFS.map((cx) => (
        <path
          key={cx}
          d={CLOUD_PATH}
          transform={`translate(${cx} 0)`}
          fill={C.purple}
          {...INK}
        />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* HandArt                                                                    */
/* -------------------------------------------------------------------------- */

interface Digit {
  id: string;
  curve: Cubic;
  base: number;
  tip: number;
  nail: number;
}

const digit = (
  id: string,
  curve: Cubic,
  base: number,
  tip: number,
  nail: number,
): Digit => ({ id, curve, base, tip, nail });

const DIGITS: readonly Digit[] = [
  digit("thumb", [[430, 266], [452, 218], [484, 176], [488, 108]], 72, 48, 30),
  digit("pinky", [[240, 330], [184, 302], [114, 298], [82, 248]], 44, 33, 30),
  digit("ring", [[266, 290], [200, 248], [124, 224], [90, 162]], 50, 37, 32),
  digit("middle", [[294, 250], [230, 204], [160, 162], [130, 94]], 52, 39, 34),
  digit("index", [[322, 212], [264, 168], [218, 130], [202, 70]], 52, 39, 32),
];

const PALM_OUTLINE: readonly Pt[] = [
  [392, 470],
  [322, 424],
  [248, 384],
  [204, 338],
  [212, 272],
  [262, 216],
  [322, 180],
  [384, 192],
  [448, 236],
  [506, 300],
  [566, 352],
  [610, 440],
  [560, 540],
  [440, 530],
];

const PALM_CREASES = [
  "M 256 302 C 292 272 342 264 388 282",
  "M 250 344 C 302 320 362 324 412 354",
  "M 374 216 C 350 272 372 342 424 404",
] as const;

export function HandArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 550 463", className)}>
      {DIGITS.map((digit) => (
        <g key={digit.id}>
          <path d={nailPath(digit.curve, digit.tip, digit.nail)} fill={C.hotPink} {...INK} />
          <path
            d={taperPath(digit.curve, digit.base, digit.tip)}
            fill={C.lightPink}
            {...INK}
          />
        </g>
      ))}
      <path d={closedSpline(PALM_OUTLINE)} fill={C.lightPink} {...INK} />
      {PALM_CREASES.map((d) => (
        <path key={d} d={d} {...LINE} />
      ))}
      <path d="M 452 404 C 478 398 504 400 528 410" {...LINE} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* FlagArt                                                                    */
/* -------------------------------------------------------------------------- */

interface FlagArtProps extends ArtProps {
  variant: "left" | "right";
}

interface Glyph {
  id: string;
  draw: (cy: number) => ReactNode;
}

const FLAG_CELL_CENTERS = [45, 107, 169, 231, 291] as const;
const FLAG_DIVIDERS = [76, 138, 200, 262] as const;
const DOT_XS = [39, 55, 71] as const;

const FLAG_GLYPHS: Record<FlagArtProps["variant"], readonly Glyph[]> = {
  left: [
    { id: "circle", draw: (cy) => <circle cx={55} cy={cy} r={16} /> },
    {
      id: "triangle",
      draw: (cy) => <path d={`M 55 ${cy - 17} L 72 ${cy + 13} L 38 ${cy + 13} Z`} />,
    },
    {
      id: "zigzag",
      draw: (cy) => (
        <path
          d={`M 33 ${cy + 9} L 42 ${cy - 9} L 51 ${cy + 9} L 59 ${cy - 9} L 68 ${cy + 9} L 77 ${cy - 9}`}
        />
      ),
    },
    {
      id: "diamond",
      draw: (cy) => (
        <path d={`M 55 ${cy - 19} L 70 ${cy} L 55 ${cy + 19} L 40 ${cy} Z`} />
      ),
    },
    {
      id: "arrow-up",
      draw: (cy) => (
        <path d={`M 55 ${cy + 18} V ${cy - 18} M 42 ${cy - 5} L 55 ${cy - 18} L 68 ${cy - 5}`} />
      ),
    },
  ],
  right: [
    { id: "spiral", draw: (cy) => <path d={spiralPath(53, cy, 4, 4)} /> },
    {
      id: "square",
      draw: (cy) => <rect x={40} y={cy - 15} width={30} height={30} />,
    },
    {
      id: "dots",
      draw: (cy) => (
        <>
          {DOT_XS.map((x) => (
            <circle key={x} cx={x} cy={cy} r={4.5} />
          ))}
        </>
      ),
    },
    {
      id: "cross",
      draw: (cy) => <path d={`M 55 ${cy - 17} V ${cy + 17} M 38 ${cy} H 72`} />,
    },
    {
      id: "arrow-down",
      draw: (cy) => (
        <path d={`M 55 ${cy - 18} V ${cy + 18} M 42 ${cy + 5} L 55 ${cy + 18} L 68 ${cy + 5}`} />
      ),
    },
  ],
};

export function FlagArt({ className, variant }: FlagArtProps) {
  return (
    <svg {...svgProps("0 0 110 374", className)}>
      <path
        d="M 8 11 L 19 6 L 27 12 L 41 7 L 52 13 L 63 8 L 74 12 L 88 5 L 95 10 L 102 7 V 368 L 55 330 L 8 368 Z"
        fill={C.orange}
        {...INK}
      />
      {FLAG_DIVIDERS.map((y) => (
        <path
          key={y}
          d={`M 9 ${y} H 101`}
          fill="none"
          stroke={C.cream}
          strokeWidth={1}
        />
      ))}
      <g
        fill="none"
        stroke={C.cream}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {FLAG_GLYPHS[variant].map((glyph, i) => (
          <g key={glyph.id}>{glyph.draw(FLAG_CELL_CENTERS[i] ?? 45)}</g>
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* PillarArt                                                                  */
/* -------------------------------------------------------------------------- */

const PILLAR_SLOTS: readonly Pt[] = [
  [60, 204],
  [91, 224],
  [122, 244],
];
const PILLAR_STUDS = [44, 66, 88, 110, 132, 154] as const;
const PILLAR_CRACKS = [
  "M 60 64 C 70 76 66 90 76 100",
  "M 140 300 C 132 312 138 322 130 334",
  "M 44 404 C 56 420 50 440 62 462 M 54 432 C 62 432 68 438 72 446",
  "M 128 400 C 122 430 134 458 126 492",
] as const;

export function PillarArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 160 566", className)}>
      <path
        d="M 172 46 C 154 16 112 6 84 16 C 52 28 38 72 34 124 C 30 196 30 268 28 340 L 26 372 C 24 436 18 500 10 566 H 172 Z"
        fill={C.purple}
        {...INK}
      />
      {/* carved spiral */}
      <path
        d={spiralPath(98, 112, 6, 4)}
        fill="none"
        stroke={C.cream}
        strokeWidth={5}
        strokeLinecap="round"
      />
      {PILLAR_SLOTS.map(([x, y]) => (
        <rect
          key={`${x}-${y}`}
          x={x}
          y={y}
          width={13}
          height={36}
          rx={6.5}
          fill={C.navy}
          {...INK}
        />
      ))}
      {/* band */}
      <path d="M 28 340 H 172 V 372 H 26 Z" fill={C.hotPink} {...INK} />
      {PILLAR_STUDS.map((x) => (
        <circle key={x} cx={x} cy={356} r={5} fill={C.yellow} {...INK} />
      ))}
      {PILLAR_CRACKS.map((d) => (
        <path key={d} d={d} {...LINE} />
      ))}
      {/* moss */}
      <path
        d="M 30 300 C 40 296 48 304 46 314 C 52 322 44 332 34 328 L 29 326 Z"
        fill={C.olive}
        {...INK}
      />
      <path
        d="M -4 570 C -4 548 12 534 28 540 C 34 522 56 518 66 534 C 78 518 100 520 108 536 C 122 522 146 526 150 542 C 158 534 170 538 174 548 V 570 Z"
        fill={C.olive}
        {...INK}
      />
      <path d="M 40 552 C 46 546 54 546 60 552 M 84 548 C 92 542 100 542 106 550 M 128 554 C 134 548 142 548 148 554" {...LINE} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* BloomArt                                                                   */
/* -------------------------------------------------------------------------- */

const BLOOM_STEM: Cubic = [
  [228, 442],
  [270, 330],
  [90, 300],
  [102, 150],
];
const BUD_STEM: Cubic = [
  cubicAt(BLOOM_STEM, 0.62),
  [112, 288],
  [62, 292],
  [42, 258],
];
const BLOOM_LEAVES = [
  { id: "low-left", t: 0.12, tip: [128, 426] as Pt, width: 20, bend: -0.3 },
  { id: "low-right", t: 0.3, tip: [264, 286] as Pt, width: 17, bend: 0.3 },
  { id: "mid-left", t: 0.47, tip: [64, 352] as Pt, width: 21, bend: 0.3 },
  { id: "high-right", t: 0.74, tip: [214, 196] as Pt, width: 18, bend: 0.3 },
] as const;
const PETAL_ANGLES = [15, 75, 135, 195, 255, 315] as const;
const POLLEN_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315] as const;

export function BloomArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 270 435", className)}>
      {BLOOM_LEAVES.map((leaf) => {
        const base = cubicAt(BLOOM_STEM, leaf.t);
        return (
          <g key={leaf.id}>
            <path d={leafPath(base, leaf.tip, leaf.width, leaf.bend)} fill={C.olive} {...INK} />
            <path
              d={`M ${pt(base)} L ${pt([
                base[0] + (leaf.tip[0] - base[0]) * 0.8,
                base[1] + (leaf.tip[1] - base[1]) * 0.8,
              ])}`}
              {...LINE}
            />
          </g>
        );
      })}
      <path d={taperPath(BUD_STEM, 6, 5)} fill={C.green} {...INK} />
      <path d={taperPath(BLOOM_STEM, 14, 9, 12)} fill={C.green} {...INK} />

      {/* bud */}
      <path
        d="M 42 262 C 24 254 24 228 42 212 C 60 228 60 254 42 262 Z"
        fill={C.hotPink}
        {...INK}
      />
      <path
        d="M 27 248 C 34 252 38 258 42 266 C 46 258 50 252 57 248 C 58 262 52 270 42 270 C 32 270 26 262 27 248 Z"
        fill={C.green}
        {...INK}
      />

      {/* poppy */}
      {PETAL_ANGLES.map((deg) => {
        const [cx, cy] = polar(95, 95, 46, deg);
        return <circle key={deg} cx={f(cx)} cy={f(cy)} r={40} fill={C.orange} {...INK} />;
      })}
      {PETAL_ANGLES.map((deg) => (
        <path
          key={deg}
          d={`M ${pt(polar(95, 95, 34, deg))} L ${pt(polar(95, 95, 62, deg))}`}
          {...LINE}
        />
      ))}
      <circle cx={95} cy={95} r={27} fill={C.navy} {...INK} />
      {POLLEN_ANGLES.map((deg) => {
        const [cx, cy] = polar(95, 95, 16, deg);
        return <circle key={deg} cx={f(cx)} cy={f(cy)} r={3} fill={C.yellow} {...INK} />;
      })}
      <circle cx={95} cy={95} r={4} fill={C.yellow} {...INK} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* StandingFigureArt                                                          */
/* -------------------------------------------------------------------------- */

const BEARER_ARM: Cubic = [
  [196, 150],
  [154, 168],
  [112, 164],
  [76, 148],
];
const CLOAK_FOLDS = [
  "M 232 150 C 240 240 248 320 252 398",
  "M 208 176 C 213 262 215 340 213 403",
  "M 258 70 C 250 96 232 112 206 118",
] as const;
const LANTERN_PANES = [34, 46] as const;

export function StandingFigureArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 302 427", className)}>
      {/* back boot */}
      <path
        d="M 190 394 H 224 V 420 H 174 C 172 408 180 398 190 394 Z"
        fill={C.brown}
        {...INK}
      />
      {/* face in profile + neck */}
      <path
        d="M 202 46 C 188 41 173 46 170 56 C 168 62 166 68 159 76 C 157 79 160 81 164 81 C 162 84 164 86 165 88 C 163 93 165 99 172 100 L 173 118 H 202 Z"
        fill={C.brown}
        {...INK}
      />
      <ellipse cx={174} cy={65} rx={2} ry={2.6} fill={C.black} />
      <path d="M 169 59 C 172 57 176 57 179 59" {...LINE} />
      {/* tunic */}
      <path
        d="M 170 112 C 158 150 150 260 148 394 H 204 V 112 Z"
        fill={C.royal}
        {...INK}
      />
      <path d="M 151 228 H 204 V 241 H 150.5 Z" fill={C.yellow} {...INK} />
      {/* front boot */}
      <path
        d="M 150 394 H 188 V 420 H 136 C 134 408 142 398 150 394 Z"
        fill={C.brown}
        {...INK}
      />
      {/* hooded cloak */}
      <path
        d="M 204 12 C 242 6 272 36 267 86 C 264 126 282 240 294 392 C 276 404 256 396 238 404 C 220 410 204 400 186 406 C 190 320 187 220 184 150 C 181 136 180 124 184 112 C 180 96 180 62 187 40 C 192 24 198 14 204 12 Z"
        fill={C.emerald}
        {...INK}
      />
      <path
        d="M 204 12 C 198 14 192 24 187 40 C 180 62 180 96 184 112 C 189 96 188 62 194 40 C 197 28 200 18 204 12 Z"
        fill={C.teal}
        {...INK}
      />
      {CLOAK_FOLDS.map((d) => (
        <path key={d} d={d} {...LINE} />
      ))}
      <circle cx={185} cy={118} r={6} fill={C.yellow} {...INK} />
      {/* arm */}
      <path d={taperPath(BEARER_ARM, 32, 19)} fill={C.royal} {...INK} />
      <path d="M 34 152 C 34 134 60 130 64 142" {...LINE} />
      <circle cx={66} cy={145} r={10} fill={C.brown} {...INK} />
      <path d="M 84 140 C 80 146 80 154 83 160" {...LINE} />
      {/* lantern */}
      <path d="M 30 150 H 50 L 56 159 H 24 Z" fill={C.navy} {...INK} />
      <rect x={24} y={159} width={32} height={30} rx={5} fill={C.yellow} {...INK} />
      <path
        d="M 40 165 C 47 173 46 183 40 184 C 34 183 33 173 40 165 Z"
        fill={C.orange}
        {...INK}
      />
      {LANTERN_PANES.map((x) => (
        <path key={x} d={`M ${x} 159 V 189`} {...LINE} />
      ))}
      <rect x={27} y={189} width={26} height={6} rx={2} fill={C.navy} {...INK} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* SeatedFigureArt                                                            */
/* -------------------------------------------------------------------------- */

const CAT_TAIL: Cubic = [
  [214, 214],
  [284, 228],
  [300, 162],
  [262, 152],
];
const CAT_TAIL_W0 = 26;
const CAT_TAIL_W1 = 20;
const CAT_TAIL_BANDS = [0.4, 0.58, 0.76] as const;
const CAT_BACK: Cubic = [
  [130, 100],
  [175, 85],
  [235, 120],
  [240, 185],
];
const CAT_BACK_STRIPES = [0.3, 0.46, 0.62, 0.78] as const;
const CAT_BROW_STRIPES = [86, 100, 114] as const;
const CAT_EYES = [78, 106] as const;
const CAT_WHISKERS = [
  "M 74 88 L 44 81",
  "M 74 92 L 44 97",
  "M 106 88 L 136 81",
  "M 106 92 L 136 97",
] as const;

function tailBandPath(t: number): string {
  const p = cubicAt(CAT_TAIL, t);
  const d = cubicDir(CAT_TAIL, t);
  const n = normalOf(d);
  const hw = (CAT_TAIL_W0 + (CAT_TAIL_W1 - CAT_TAIL_W0) * t) / 2 - 1;
  const corner = (along: number, across: number): Pt => add(add(p, d, along), n, across);
  return `M ${pt(corner(-4, hw))} L ${pt(corner(4, hw))} L ${pt(corner(4, -hw))} L ${pt(corner(-4, -hw))} Z`;
}

function backStripePath(t: number): string {
  const p = cubicAt(CAT_BACK, t);
  const d = cubicDir(CAT_BACK, t);
  const n = normalOf(d);
  const a = add(add(p, n, 1.5), d, -7);
  const b = add(add(p, n, 1.5), d, 7);
  const apex = add(add(p, n, 34), d, -6);
  return `M ${pt(a)} Q ${pt(add(add(p, n, 16), d, -8))} ${pt(apex)} Q ${pt(add(add(p, n, 14), d, 4))} ${pt(b)} Z`;
}

export function SeatedFigureArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 304 238", className)}>
      {/* tail */}
      <path d={taperPath(CAT_TAIL, CAT_TAIL_W0, CAT_TAIL_W1, 10)} fill={C.orange} {...INK} />
      {CAT_TAIL_BANDS.map((t) => (
        <path key={t} d={tailBandPath(t)} fill={C.brown} />
      ))}
      {/* body */}
      <path
        d="M 130 100 C 175 85 235 120 240 185 C 242 215 225 232 195 232 H 112 C 96 232 92 215 98 195 C 100 160 104 125 130 100 Z"
        fill={C.orange}
        {...INK}
      />
      {CAT_BACK_STRIPES.map((t) => (
        <path key={t} d={backStripePath(t)} fill={C.brown} />
      ))}
      <path
        d="M 118 116 C 106 148 102 190 108 228 C 128 231 146 218 146 190 C 146 158 136 134 118 116 Z"
        fill={C.cream}
        {...INK}
      />
      {/* haunch + paws */}
      <path d="M 196 146 C 236 156 244 214 206 231" {...LINE} />
      <ellipse cx={182} cy={226} rx={24} ry={8.5} fill={C.orange} {...INK} />
      <path
        d="M 112 176 C 109 196 108 212 106 226 C 106 236 133 236 133 226 C 133 208 134 192 136 176 C 134 162 114 162 112 176 Z"
        fill={C.orange}
        {...INK}
      />
      <path d="M 114 228 V 233 M 122 229 V 234" {...LINE} />
      {/* collar */}
      <path
        d="M 68 96 C 88 126 124 126 146 94 L 150 106 C 128 140 86 140 62 108 Z"
        fill={C.blue}
        {...INK}
      />
      <path d="M 100 128 L 84 138 L 88 152 Z" fill={C.blue} {...INK} />
      <path d="M 104 128 L 120 140 L 112 153 Z" fill={C.blue} {...INK} />
      <circle cx={102} cy={128} r={5} fill={C.yellow} {...INK} />
      {/* ears */}
      <path d="M 62 54 L 55 10 L 94 34 Z" fill={C.orange} {...INK} />
      <path d="M 110 33 L 145 10 L 140 56 Z" fill={C.orange} {...INK} />
      <path d="M 66 42 L 62 22 L 80 33 Z" fill={C.lightPink} {...INK} />
      <path d="M 124 33 L 139 22 L 136 43 Z" fill={C.lightPink} {...INK} />
      {/* head */}
      <ellipse cx={100} cy={72} rx={46} ry={40} fill={C.orange} {...INK} />
      {CAT_BROW_STRIPES.map((x) => (
        <path key={x} d={`M ${x - 4} 36 L ${x} 55 L ${x + 4} 36 Z`} fill={C.brown} />
      ))}
      <path d="M 143 62 L 126 66 L 144 72 Z M 144 78 L 128 80 L 142 87 Z" fill={C.brown} />
      <ellipse cx={90} cy={89} rx={18} ry={12} fill={C.cream} {...INK} />
      {CAT_EYES.map((x) => (
        <g key={x}>
          <ellipse cx={x} cy={68} rx={6.5} ry={7.5} fill={C.yellow} {...INK} />
          <ellipse cx={x - 1} cy={68} rx={2} ry={6} fill={C.black} />
        </g>
      ))}
      <path d="M 85 80 H 95 L 90 86 Z" fill={C.hotPink} {...INK} />
      <path
        d="M 90 86 V 90 M 90 90 C 86 95 80 94 79 90 M 90 90 C 94 95 100 94 101 90"
        {...LINE}
      />
      {CAT_WHISKERS.map((d) => (
        <path key={d} d={d} {...LINE} />
      ))}
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MeteorTrailArt                                                             */
/* -------------------------------------------------------------------------- */

const STREAK_FILLS = [
  C.yellow,
  C.hotPink,
  C.cream,
  C.hotPink,
  C.cream,
  C.hotPink,
  C.cream,
  C.yellow,
] as const;
const STREAK_TIP_X = [900, 300, 1150, 0, 620, 1400, 180, 1020] as const;
const STREAK_BAND = 570 / STREAK_FILLS.length;

const STREAKS = STREAK_FILLS.map((fill, i) => {
  const top = 15 + i * STREAK_BAND - (i === 0 ? 0 : 2);
  const bottom = 15 + (i + 1) * STREAK_BAND;
  const mid = (top + bottom) / 2;
  const tipX = STREAK_TIP_X[i] ?? 0;
  const tipY = 300 + (mid - 300) * 0.82;
  const d = [
    `M 2600 ${f(top)}`,
    `C 2050 ${f(top)} ${tipX + 700} ${f(tipY - 26)} ${tipX} ${f(tipY)}`,
    `C ${tipX + 700} ${f(tipY + 26)} 2050 ${f(bottom)} 2600 ${f(bottom)}`,
    "Z",
  ].join(" ");
  return { id: `streak-${i}`, fill, d };
});

export function MeteorTrailArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 3000 600", className)}>
      {STREAKS.map((streak) => (
        <path key={streak.id} d={streak.d} fill={streak.fill} {...INK} />
      ))}
      <polygon points={starPoints(2940, 300, 58, 27, 12, 8)} fill={C.purple} {...INK} />
      <circle cx={2600} cy={300} r={285} fill={C.yellow} {...INK} />
      <circle cx={2600} cy={300} r={271} fill={C.hotPink} {...INK} />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* MeteorBallArt                                                              */
/* -------------------------------------------------------------------------- */

const GEM_CENTER: Pt = [207, 205];
const GEM_HUB: Pt = [186, 186];
const GEM_OUTER_DEG = [0, 24, 52, 75, 103, 128, 150, 180, 204, 232, 255, 283, 310, 336] as const;
const GEM_OUTER_R = [195, 192, 196, 190, 195, 193, 196, 194, 191, 196, 192, 195, 190, 196] as const;
const GEM_INNER_DEG = [30, 70, 135, 175, 240, 280, 330] as const;
const GEM_INNER_R = [105, 122, 98, 126, 110, 94, 118] as const;

const GEM_OUTER: readonly Pt[] = GEM_OUTER_DEG.map((deg, i) =>
  polar(GEM_CENTER[0], GEM_CENTER[1], GEM_OUTER_R[i] ?? 195, deg),
);
const GEM_INNER: readonly Pt[] = GEM_INNER_DEG.map((deg, i) =>
  polar(GEM_CENTER[0], GEM_CENTER[1], GEM_INNER_R[i] ?? 110, deg),
);

/* Four facets per inner vertex: two rim facets, one gap facet, one hub facet. */
const GEM_FILLS = [
  C.royal, C.purple, C.blue, C.cream,
  C.purple, C.blue, C.purple, C.royal,
  C.blue, C.royal, C.purple, C.purple,
  C.purple, C.cream, C.royal, C.blue,
  C.royal, C.purple, C.blue, C.royal,
  C.blue, C.royal, C.purple, C.purple,
  C.purple, C.blue, C.cream, C.royal,
] as const;

const GEM_FACETS = GEM_INNER.flatMap((inner, j) => {
  const a = pick(GEM_OUTER, 2 * j);
  const b = pick(GEM_OUTER, 2 * j + 1);
  const c = pick(GEM_OUTER, 2 * j + 2);
  const next = pick(GEM_INNER, j + 1);
  const tris: readonly (readonly Pt[])[] = [
    [a, b, inner],
    [b, c, inner],
    [c, next, inner],
    [inner, next, GEM_HUB],
  ];
  return tris.map((tri, k) => ({
    id: `facet-${j}-${k}`,
    points: tri.map(pt).join(" "),
    fill: GEM_FILLS[j * 4 + k] ?? C.purple,
  }));
});

export function MeteorBallArt({ className }: ArtProps) {
  return (
    <svg {...svgProps("0 0 414 411", className)}>
      <polygon points={GEM_OUTER.map(pt).join(" ")} fill={C.purple} {...INK} />
      {GEM_FACETS.map((facet) => (
        <polygon key={facet.id} points={facet.points} fill={facet.fill} {...INK} />
      ))}
    </svg>
  );
}
