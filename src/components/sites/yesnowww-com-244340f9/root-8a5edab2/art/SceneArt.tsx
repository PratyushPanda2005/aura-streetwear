import type { ReactNode } from "react";

type ArtProps = { className?: string };

const HOT_PINK = "#FF37B4";
const YELLOW = "#FAC209";
const NAVY = "#001482";
const OLIVE = "#868B1D";
const GREEN = "#3C6E32";
const DARK_TEAL = "#094F45";
const BROWN = "#AA593C";
const ORANGE = "#FA5909";
const BLUE = "#0090C7";
const ROYAL = "#2D45C7";
const OFF_WHITE = "#F5F4F1";
const BLACK = "#000";

const round = (value: number): number => Math.round(value * 100) / 100;

/** Draws its children once and once more mirrored around the vertical centre line. */
function Mirrored({ width, children }: { width: number; children: ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform={`translate(${width} 0) scale(-1 1)`}>{children}</g>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Backdrop                                                                   */
/* -------------------------------------------------------------------------- */

const GRID_COLUMNS = Array.from({ length: 25 }, (_, i) => i * 60);
const GRID_ROWS = Array.from({ length: 14 }, (_, i) => i * 60);

const BLOB_PATHS = [
  "M-48 -6C-50 -34 -22 -52 6 -46C34 -40 54 -22 48 8C43 34 20 50 -8 46C-34 42 -46 20 -48 -6Z",
  "M-52 4C-56 -22 -30 -40 -6 -34C10 -30 18 -48 38 -40C58 -32 56 -4 44 14C32 32 12 44 -14 40C-36 37 -49 24 -52 4Z",
  "M-40 -20C-28 -44 8 -50 30 -34C50 -20 42 0 50 18C58 38 30 52 6 42C-12 34 -30 48 -44 30C-56 14 -50 -2 -40 -20Z",
] as const;

type Blob = { x: number; y: number; scale: number; rotate: number; shape: 0 | 1 | 2 };

/** Left half only; mirrored to 18 blobs. */
const BLOBS: readonly Blob[] = [
  { x: 96, y: 118, scale: 1.5, rotate: 12, shape: 0 },
  { x: 318, y: 74, scale: 0.8, rotate: -20, shape: 1 },
  { x: 560, y: 150, scale: 1.1, rotate: 40, shape: 2 },
  { x: 214, y: 322, scale: 1.25, rotate: 75, shape: 1 },
  { x: 472, y: 408, scale: 0.7, rotate: -35, shape: 0 },
  { x: 62, y: 520, scale: 1, rotate: 130, shape: 2 },
  { x: 336, y: 610, scale: 1.4, rotate: -8, shape: 0 },
  { x: 618, y: 664, scale: 0.9, rotate: 55, shape: 1 },
  { x: 150, y: 742, scale: 0.75, rotate: 200, shape: 2 },
];

export function BackdropArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1440 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect width={1440} height={800} fill={NAVY} />
      <g stroke={ROYAL} strokeWidth={1} opacity={0.5}>
        {GRID_COLUMNS.map((x) => (
          <line key={`col-${x}`} x1={x} y1={0} x2={x} y2={800} />
        ))}
        {GRID_ROWS.map((y) => (
          <line key={`row-${y}`} x1={0} y1={y} x2={1440} y2={y} />
        ))}
      </g>
      <g fill={BLACK} stroke={BLACK} strokeWidth={1}>
        <Mirrored width={1440}>
          {BLOBS.map((blob) => (
            <path
              key={`blob-${blob.x}-${blob.y}`}
              d={BLOB_PATHS[blob.shape]}
              transform={`translate(${blob.x} ${blob.y}) rotate(${blob.rotate}) scale(${blob.scale})`}
            />
          ))}
        </Mirrored>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Tree canopy                                                                */
/* -------------------------------------------------------------------------- */

const BRANCH_PATHS = [
  "M-4 14C150 20 320 34 528 86C320 50 150 46 -4 46Z",
  "M-4 66C96 88 214 150 304 268C204 174 96 122 -4 102Z",
  "M-4 138C52 190 104 284 120 398C86 294 46 222 -4 178Z",
  "M150 37C200 62 244 96 284 140C240 104 196 76 146 58Z",
] as const;

const LEAF_CLUSTER_PATH =
  "M-60 10C-74 6 -74 -16 -56 -18C-58 -36 -32 -44 -22 -30C-14 -48 18 -48 24 -30C36 -42 62 -32 56 -14C74 -10 72 12 58 14C56 30 30 34 20 24C10 38 -18 36 -24 24C-36 34 -60 28 -60 10Z";
const LEAF_CURL_PATH = "M-34 2C-24 -10 -8 -10 0 0C8 -10 24 -10 32 0";

type Cluster = { x: number; y: number; scale: number };

/** Left half only. Dense near the top, sparse below y≈300, nothing past x=560. */
const LEAF_CLUSTERS: readonly Cluster[] = [
  { x: 470, y: 66, scale: 1 },
  { x: 350, y: 46, scale: 1.2 },
  { x: 210, y: 30, scale: 1.3 },
  { x: 70, y: 38, scale: 1.5 },
  { x: 404, y: 132, scale: 0.85 },
  { x: 280, y: 122, scale: 1.1 },
  { x: 132, y: 112, scale: 1.3 },
  { x: 200, y: 206, scale: 1 },
  { x: 58, y: 192, scale: 1.2 },
  { x: 306, y: 258, scale: 0.75 },
  { x: 44, y: 290, scale: 0.9 },
  { x: 132, y: 334, scale: 0.65 },
  { x: 116, y: 398, scale: 0.55 },
];

export function TreeArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1410 451"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <Mirrored width={1410}>
        <g fill={BROWN} stroke={BLACK} strokeWidth={1}>
          {BRANCH_PATHS.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {LEAF_CLUSTERS.map((cluster) => (
          <g
            key={`cluster-${cluster.x}-${cluster.y}`}
            transform={`translate(${cluster.x} ${cluster.y}) scale(${cluster.scale})`}
            stroke={BLACK}
            strokeWidth={1}
          >
            <path d={LEAF_CLUSTER_PATH} fill={DARK_TEAL} vectorEffect="non-scaling-stroke" />
            <path d={LEAF_CURL_PATH} fill="none" vectorEffect="non-scaling-stroke" />
          </g>
        ))}
      </Mirrored>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Bushes                                                                     */
/* -------------------------------------------------------------------------- */

const BUSH_BACK_PATH =
  "M-10 210V44C30 18 92 22 124 52C160 34 206 44 224 76C262 62 304 80 322 108C368 98 412 116 432 140C478 134 530 150 556 170C596 166 636 180 650 210Z";
const BUSH_SHRUB_PATH =
  "M-10 210V96C6 70 44 70 56 94C70 72 108 78 112 104C132 90 164 100 164 126C186 116 214 128 212 150C236 144 262 156 260 176C284 172 306 186 304 210Z";
const BUSH_SMALL_PATH =
  "M330 210C326 190 346 176 364 184C370 166 398 166 404 184C422 176 442 188 438 210Z";
const BUSH_CENTER_PATH = "M548 210C584 184 632 174 662.5 174C693 174 741 184 777 210Z";
const GRASS_TUFT_PATH =
  "M-24 0C-22 -16 -18 -28 -20 -42C-10 -30 -8 -18 -6 -6C-6 -24 -2 -40 2 -56C8 -40 8 -22 8 -6C12 -18 18 -28 26 -36C24 -22 22 -10 22 0Z";

type Tuft = { x: number; scale: number; fill: string };

/** Left half only; tallest at the outer edge, lowest toward the centre. */
const GRASS_TUFTS: readonly Tuft[] = [
  { x: 36, scale: 1.7, fill: OLIVE },
  { x: 128, scale: 1.35, fill: DARK_TEAL },
  { x: 222, scale: 1.15, fill: OLIVE },
  { x: 318, scale: 0.9, fill: GREEN },
  { x: 470, scale: 0.75, fill: OLIVE },
  { x: 552, scale: 0.6, fill: GREEN },
  { x: 624, scale: 0.5, fill: OLIVE },
];

export function BushArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1325 200"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={BLACK} strokeWidth={1}>
        <Mirrored width={1325}>
          <path d={BUSH_BACK_PATH} fill={DARK_TEAL} />
          <path d={BUSH_SHRUB_PATH} fill={GREEN} />
          <path d={BUSH_SMALL_PATH} fill={OLIVE} />
        </Mirrored>
        <path d={BUSH_CENTER_PATH} fill={GREEN} />
        <Mirrored width={1325}>
          {GRASS_TUFTS.map((tuft) => (
            <path
              key={`tuft-${tuft.x}`}
              d={GRASS_TUFT_PATH}
              fill={tuft.fill}
              vectorEffect="non-scaling-stroke"
              transform={`translate(${tuft.x} 204) scale(${tuft.scale})`}
            />
          ))}
        </Mirrored>
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Cloud                                                                      */
/* -------------------------------------------------------------------------- */

const CLOUD_RADII = [30, 36, 42, 46, 42, 36, 30] as const;
const CLOUD_LOBES = CLOUD_RADII.map((r, i) => ({
  cx: 235 + (i - 3) * 62,
  cy: 58 - (r - 30) * 0.5,
  r,
  // Right-hand spirals are flipped so the band stays symmetric.
  flip: i > 3 ? -1 : 1,
}));
const CLOUD_SPIRAL_PATH =
  "M0.58 0.12C0.6 -0.34 0.12 -0.62 -0.26 -0.46C-0.62 -0.3 -0.66 0.16 -0.36 0.36C-0.1 0.52 0.22 0.36 0.2 0.1C0.19 -0.08 0.02 -0.16 -0.1 -0.06";

function CloudBody() {
  return (
    <>
      <rect x={20} y={60} width={430} height={34} rx={17} />
      {CLOUD_LOBES.map((lobe) => (
        <circle key={`lobe-${lobe.cx}`} cx={lobe.cx} cy={lobe.cy} r={lobe.r} />
      ))}
    </>
  );
}

export function CloudArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 470 97"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Outline pass: a 2px stroke whose inner half is hidden by the fill pass, leaving a 1px outline around the union. */}
      <g fill={BLACK} stroke={BLACK} strokeWidth={2}>
        <CloudBody />
      </g>
      <g fill={HOT_PINK}>
        <CloudBody />
      </g>
      <g fill="none" stroke={BLACK} strokeWidth={1} strokeLinecap="round">
        {CLOUD_LOBES.map((lobe) => (
          <path
            key={`spiral-${lobe.cx}`}
            d={CLOUD_SPIRAL_PATH}
            vectorEffect="non-scaling-stroke"
            transform={`translate(${lobe.cx} ${lobe.cy}) scale(${lobe.flip * lobe.r * 0.8} ${lobe.r * 0.8})`}
          />
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Frond                                                                      */
/* -------------------------------------------------------------------------- */

const FROND_BLADES = Array.from({ length: 7 }, (_, i) => {
  const angle = ((8 + i * (74 / 6)) * Math.PI) / 180;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const reach = (166 / Math.max(cos, sin)) * (i % 2 === 0 ? 1 : 0.78);
  const half = reach * 0.075;
  const midX = cos * reach * 0.42;
  const midY = sin * reach * 0.42;
  const d = [
    "M0 0",
    `Q${round(midX + sin * half)} ${round(midY - cos * half)} ${round(cos * reach)} ${round(sin * reach)}`,
    `Q${round(midX - sin * half)} ${round(midY + cos * half)} 0 0Z`,
  ].join("");
  return { id: `blade-${i}`, d, fill: i % 2 === 0 ? BLUE : ROYAL };
});

export function FrondArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 171 171"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g stroke={BLACK} strokeWidth={1} strokeLinejoin="miter">
        {FROND_BLADES.map((blade) => (
          <path key={blade.id} d={blade.d} fill={blade.fill} />
        ))}
      </g>
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/* Sun, moon, star                                                            */
/* -------------------------------------------------------------------------- */

const SUN_POINTS = Array.from({ length: 16 }, (_, i) => {
  const angle = ((i * 22.5 - 90) * Math.PI) / 180;
  const radius = i % 2 === 1 ? 14 : i % 4 === 0 ? 36.5 : 25;
  return `${round(38 + Math.cos(angle) * radius)},${round(38 + Math.sin(angle) * radius)}`;
}).join(" ");

export function SunArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 76 76"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <polygon points={SUN_POINTS} fill={YELLOW} stroke={BLACK} strokeWidth={1} strokeLinejoin="miter" />
      <circle cx={38} cy={38} r={8} fill={ORANGE} stroke={BLACK} strokeWidth={1} />
    </svg>
  );
}

export function MoonArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M24 3A16 16 0 1 0 24 33A19 19 0 0 1 24 3Z"
        fill={OFF_WHITE}
        stroke={BLACK}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StarArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 28"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 1C10.8 9 12.5 12.2 19 14C12.5 15.8 10.8 19 10 27C9.2 19 7.5 15.8 1 14C7.5 12.2 9.2 9 10 1Z"
        fill={OFF_WHITE}
        stroke={BLACK}
        strokeWidth={1}
        strokeLinejoin="round"
      />
    </svg>
  );
}
