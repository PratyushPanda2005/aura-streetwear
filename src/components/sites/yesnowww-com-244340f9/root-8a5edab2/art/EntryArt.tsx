/**
 * Original stand-in artwork for the route entry stage.
 * Static SVG only: all motion is applied from outside by the scroll rig.
 */

type ArtProps = { className?: string };

const HOT_PINK = "#FF37B4";
const LIGHT_PINK = "#FF8BBE";
const YELLOW = "#FAC209";
const NAVY = "#001482";
const OLIVE = "#868B1D";
const CREAM = "#F4FFDE";
const RED = "#FA3228";
const PURPLE = "#AA73F5";
const GREEN = "#3C6E32";
const DARK_TEAL = "#094F45";
const ORANGE = "#FA5909";
const BLUE = "#0090C7";
const ROYAL = "#2D45C7";
const OFF_WHITE = "#F5F4F1";
const GREY = "#95AAB4";
const BLACK = "#000";

const OUTLINE = {
  stroke: BLACK,
  strokeWidth: 1,
  strokeLinejoin: "round",
  strokeLinecap: "round",
} as const;

const FOLD = {
  fill: "none",
  stroke: BLACK,
  strokeWidth: 1,
  strokeOpacity: 0.35,
  strokeLinecap: "round",
} as const;

const round2 = (value: number): number => Math.round(value * 100) / 100;

/* ------------------------------------------------------------------ */
/* Curtain                                                             */
/* ------------------------------------------------------------------ */

const CURTAIN_W = 749;
const CURTAIN_H = 900;
const SCALLOP_W = 107; // 7 scallops x 107 = 749

/** y of the high points between scallops, at x = index * SCALLOP_W */
const VALANCE_PEAKS = [205, 178, 222, 168, 230, 186, 214, 196];
/** y of the lowest point of each scallop */
const VALANCE_BELLIES = [262, 255, 274, 258, 278, 266, 270];

const VALANCE_EDGE = VALANCE_BELLIES.reduce((d, belly, i) => {
  const x0 = i * SCALLOP_W;
  const x1 = (i + 1) * SCALLOP_W;
  const p0 = VALANCE_PEAKS[i];
  const p1 = VALANCE_PEAKS[i + 1];
  // Control height that puts the cubic's midpoint exactly on the belly.
  const c = round2((belly - (p0 + p1) / 8) / 0.75);
  return `${d} C${x0 + 22} ${c} ${x1 - 22} ${c} ${x1} ${p1}`;
}, `M0 ${VALANCE_PEAKS[0]}`);

const VALANCE_FILL = `${VALANCE_EDGE} L${CURTAIN_W} 0 L0 0 Z`;

const INTERIOR_PEAKS = VALANCE_PEAKS.slice(1, 7).map((y, i) => ({
  id: `peak-${i + 1}`,
  x: (i + 1) * SCALLOP_W,
  y,
}));

const HANGING_FOLDS = INTERIOR_PEAKS.map(({ id, x, y }) => ({
  id: `hang-${id}`,
  d: `M${x} ${y} C${x + 10} ${y + 110} ${x - 12} ${y + 220} ${x + 6} ${y + 330}`,
}));

const SWEEPING_FOLDS = [
  { id: "sweep-a", d: "M70 565 C112 650 38 762 96 850" },
  { id: "sweep-b", d: "M298 575 C350 662 268 768 332 850" },
  { id: "sweep-c", d: "M545 560 C602 652 518 760 586 850" },
];

const SPARKLES = [
  { id: "sparkle-a", cx: 170, cy: 70, s: 12 },
  { id: "sparkle-b", cx: 300, cy: 125, s: 9 },
  { id: "sparkle-c", cx: 430, cy: 60, s: 13 },
  { id: "sparkle-d", cx: 560, cy: 120, s: 9 },
  { id: "sparkle-e", cx: 660, cy: 65, s: 11 },
].map(({ id, cx, cy, s }) => ({
  id,
  d: `M${cx} ${cy - s} Q${cx} ${cy} ${cx + s} ${cy} Q${cx} ${cy} ${cx} ${cy + s} Q${cx} ${cy} ${cx - s} ${cy} Q${cx} ${cy} ${cx} ${cy - s} Z`,
}));

const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const radius = i % 2 === 0 ? 38 : 18;
  const angle = (i * Math.PI) / 8 - Math.PI / 2;
  return `${round2(48 + radius * Math.cos(angle))},${round2(80 + radius * Math.sin(angle))}`;
}).join(" ");

const POLE_STEP = 90;
const POLE_NODES = Array.from({ length: CURTAIN_H / POLE_STEP + 1 }, (_, i) => ({
  y: i * POLE_STEP,
  offset: i % 2 === 0 ? -3 : 3,
}));
const POLE_LEFT = 725;
const POLE_RIGHT = 743;

const poleEdgeDown = (base: number): string =>
  POLE_NODES.slice(1).reduce((d, node, i) => {
    const prev = POLE_NODES[i];
    return `${d} C${base + prev.offset} ${prev.y + 30} ${base + node.offset} ${node.y - 30} ${base + node.offset} ${node.y}`;
  }, `M${base + POLE_NODES[0].offset} 0`);

const poleEdgeUpSegments = (base: number): string =>
  POLE_NODES.slice(0, -1).reduceRight((d, node, i) => {
    const prev = POLE_NODES[i + 1];
    return `${d} C${base + prev.offset} ${prev.y - 30} ${base + node.offset} ${node.y + 30} ${base + node.offset} ${node.y}`;
  }, "");

const POLE_LEFT_EDGE = poleEdgeDown(POLE_LEFT);
const POLE_RIGHT_EDGE = poleEdgeDown(POLE_RIGHT);
const POLE_FILL = `${POLE_LEFT_EDGE} L${POLE_RIGHT + POLE_NODES[POLE_NODES.length - 1].offset} ${CURTAIN_H}${poleEdgeUpSegments(POLE_RIGHT)} Z`;

const POLE_BANDS = [2, 4, 6, 8].map((index) => ({
  id: `band-${index}`,
  x: POLE_LEFT + POLE_NODES[index].offset - 2,
  y: POLE_NODES[index].y - 6,
}));

export function CurtainPanelArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 749 900"
      preserveAspectRatio="xMaxYMin slice"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* drape */}
      <rect x={0} y={0} width={CURTAIN_W} height={CURTAIN_H} fill={LIGHT_PINK} />

      {/* long sweeping folds in the lower half */}
      {SWEEPING_FOLDS.map((fold) => (
        <path key={fold.id} d={fold.d} {...FOLD} />
      ))}

      {/* folds hanging from the valance */}
      {HANGING_FOLDS.map((fold) => (
        <path key={fold.id} d={fold.d} {...FOLD} />
      ))}

      {/* valance */}
      <path d={VALANCE_FILL} fill={HOT_PINK} />
      <path d={VALANCE_EDGE} {...FOLD} />

      {/* tassels on the scallop peaks */}
      {INTERIOR_PEAKS.map(({ id, x, y }) => (
        <g key={id}>
          <path
            d={`M${x - 5} ${y + 9} L${x + 5} ${y + 9} L${x + 8} ${y + 33} Q${x} ${y + 40} ${x - 8} ${y + 33} Z`}
            fill={ORANGE}
            {...OUTLINE}
          />
          <circle cx={x} cy={y + 4} r={6.5} fill={YELLOW} {...OUTLINE} />
        </g>
      ))}

      {/* sparkles */}
      {SPARKLES.map((sparkle) => (
        <path key={sparkle.id} d={sparkle.d} fill={CREAM} {...OUTLINE} />
      ))}

      {/* 8-point star */}
      <polygon points={STAR_POINTS} fill={YELLOW} {...OUTLINE} />
      <circle cx={48} cy={80} r={7} fill={ORANGE} {...OUTLINE} />

      {/* center pole */}
      <path d={POLE_FILL} fill={YELLOW} />
      <path d={POLE_LEFT_EDGE} fill="none" {...OUTLINE} />
      <path d={POLE_RIGHT_EDGE} fill="none" {...OUTLINE} />
      {POLE_BANDS.map((band) => (
        <rect
          key={band.id}
          x={band.x}
          y={band.y}
          width={22}
          height={12}
          rx={3}
          fill={NAVY}
          {...OUTLINE}
        />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Lamp                                                                */
/* ------------------------------------------------------------------ */

const LAMP_CX = 131;
const LAMP_CY = 150;
const RAY_COUNT = 18;

const LAMP_RAYS = Array.from({ length: RAY_COUNT }, (_, i) => {
  const angle = (i * 2 * Math.PI) / RAY_COUNT - Math.PI / 2;
  const spread = (5 * Math.PI) / 180;
  const point = (radius: number, theta: number): string =>
    `${round2(LAMP_CX + radius * Math.cos(theta))},${round2(LAMP_CY + radius * Math.sin(theta))}`;
  return {
    id: `ray-${i}`,
    points: `${point(80, angle - spread)} ${point(i % 2 === 0 ? 122 : 110, angle)} ${point(80, angle + spread)}`,
  };
});

export function LampArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 262 403"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* glow */}
      {LAMP_RAYS.map((ray) => (
        <polygon key={ray.id} points={ray.points} fill={YELLOW} {...OUTLINE} />
      ))}
      <circle cx={LAMP_CX} cy={LAMP_CY} r={85} fill={YELLOW} {...OUTLINE} />

      {/* post */}
      <rect x={120} y={255} width={22} height={148} fill={OLIVE} {...OUTLINE} />
      <path d="M104 403 L111 384 H151 L158 403 Z" fill={OLIVE} {...OUTLINE} />
      <rect x={115} y={296} width={32} height={9} rx={2.5} fill={DARK_TEAL} {...OUTLINE} />
      <rect x={115} y={340} width={32} height={9} rx={2.5} fill={DARK_TEAL} {...OUTLINE} />

      {/* lantern housing */}
      <path d="M108 234 H154 L144 258 H118 Z" fill={OLIVE} {...OUTLINE} />
      <path d="M91 105 H171 L156 224 H106 Z" fill={CREAM} {...OUTLINE} />

      {/* candle */}
      <rect x={116} y={217} width={30} height={7} rx={3} fill={DARK_TEAL} {...OUTLINE} />
      <rect x={123} y={190} width={16} height={28} rx={2} fill={GREY} {...OUTLINE} />
      <path d="M131 190 V183" fill="none" {...OUTLINE} />
      <path
        d="M131 148 C143 162 145 176 131 186 C117 176 119 162 131 148 Z"
        fill={HOT_PINK}
        {...OUTLINE}
      />
      <path
        d="M131 163 C138 171 138 180 131 184 C124 180 124 171 131 163 Z"
        fill={ORANGE}
        {...OUTLINE}
      />

      {/* frame */}
      <polygon points="88,105 96,105 110,224 103,224" fill={OLIVE} {...OUTLINE} />
      <polygon points="166,105 174,105 159,224 152,224" fill={OLIVE} {...OUTLINE} />
      <rect x={100} y={223} width={62} height={12} rx={2} fill={OLIVE} {...OUTLINE} />
      <rect x={84} y={96} width={94} height={11} rx={2} fill={OLIVE} {...OUTLINE} />

      {/* roof */}
      <path
        d="M74 97 C100 92 120 76 131 50 C142 76 162 92 188 97 Z"
        fill={OLIVE}
        {...OUTLINE}
      />
      <path d="M131 52 C127 72 117 87 104 96" {...FOLD} />
      <path d="M131 52 C135 72 145 87 158 96" {...FOLD} />

      {/* leaf crown */}
      <path
        d="M131 53 C118 51 108 43 104 30 C117 31 127 40 131 53 Z"
        fill={GREEN}
        {...OUTLINE}
      />
      <path
        d="M131 53 C144 51 154 43 158 30 C145 31 135 40 131 53 Z"
        fill={GREEN}
        {...OUTLINE}
      />
      <path
        d="M131 53 C122 41 124 27 131 16 C138 27 140 41 131 53 Z"
        fill={GREEN}
        {...OUTLINE}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Moth sprite (flies toward the right)                                */
/* ------------------------------------------------------------------ */

const MOTH_WING_VEINS = [
  { id: "fore-vein-a", d: "M158 122 C136 92 110 56 78 22" },
  { id: "fore-vein-b", d: "M158 122 C124 108 86 94 50 76" },
  { id: "hind-vein-a", d: "M150 132 C116 130 74 128 34 132" },
  { id: "hind-vein-b", d: "M150 132 C120 148 84 164 48 174" },
];

const MOTH_EYE_SPOTS = [
  { id: "fore-spot", cx: 88, cy: 70, r: 13 },
  { id: "hind-spot", cx: 66, cy: 150, r: 11 },
];

const MOTH_SCARF_STRIPES = [-13, -2.5, 8].map((x, i) => ({
  id: `scarf-stripe-${i}`,
  x,
}));

const MOTH_ANTENNAE = [
  { id: "antenna-back", d: "M190 58 C184 38 196 22 214 16", cx: 214, cy: 16 },
  { id: "antenna-front", d: "M205 57 C206 40 220 28 238 28", cx: 238, cy: 28 },
];

export function FlyerLeftArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 280 290"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* hind wing */}
      <path
        d="M150 132 C120 122 70 112 30 122 Q16 132 24 146 Q18 162 34 168 Q38 184 56 184 C90 182 125 160 150 132 Z"
        fill={CREAM}
        {...OUTLINE}
      />
      {/* fore wing */}
      <path
        d="M158 122 C152 84 120 36 72 14 Q52 22 56 40 Q36 50 44 68 Q26 80 38 96 C70 118 120 128 158 122 Z"
        fill={CREAM}
        {...OUTLINE}
      />
      {MOTH_WING_VEINS.map((vein) => (
        <path key={vein.id} d={vein.d} {...FOLD} />
      ))}
      {MOTH_EYE_SPOTS.map((spot) => (
        <g key={spot.id}>
          <circle cx={spot.cx} cy={spot.cy} r={spot.r} fill={PURPLE} {...OUTLINE} />
          <circle cx={spot.cx} cy={spot.cy} r={spot.r * 0.42} fill={NAVY} {...OUTLINE} />
        </g>
      ))}

      {/* far arm + palm */}
      <path
        d="M164 124 C196 122 234 124 268 126 L268 138 C236 137 200 136 168 140 Z"
        fill={ROYAL}
        {...OUTLINE}
      />
      <rect x={268} y={116} width={10} height={32} rx={4} fill={BLUE} {...OUTLINE} />

      {/* legs trailing down-left */}
      <path
        d="M112 160 C92 172 64 188 34 202 L40 214 C70 202 98 188 122 174 Z"
        fill={ROYAL}
        {...OUTLINE}
      />
      <ellipse
        cx={34}
        cy={209}
        rx={13}
        ry={9}
        transform="rotate(-25 34 209)"
        fill={NAVY}
        {...OUTLINE}
      />
      <path
        d="M124 166 C102 180 76 204 50 226 L60 238 C82 220 106 198 128 178 Z"
        fill={ROYAL}
        {...OUTLINE}
      />
      <ellipse
        cx={52}
        cy={233}
        rx={14}
        ry={10}
        transform="rotate(-40 52 233)"
        fill={NAVY}
        {...OUTLINE}
      />

      {/* torso */}
      <g transform="rotate(-47 148 142)">
        <ellipse cx={148} cy={142} rx={48} ry={23} fill={ROYAL} {...OUTLINE} />
        <path d="M128 121.5 Q134 142 128 162.5" {...FOLD} />
        <path d="M112 127 Q117 142 112 157" {...FOLD} />
      </g>

      {/* near arm + palm */}
      <path
        d="M158 136 C190 146 232 160 268 164 L268 176 C230 174 186 162 152 150 C146 146 150 136 158 136 Z"
        fill={ROYAL}
        {...OUTLINE}
      />
      <rect x={268} y={154} width={10} height={32} rx={4} fill={BLUE} {...OUTLINE} />

      {/* scarf tail */}
      <path
        d="M160 98 C146 90 130 94 116 84 L112 98 C128 106 144 102 156 110 Z"
        fill={ORANGE}
        {...OUTLINE}
      />
      <polygon points="139,92 144,93 141,104 136,103" fill={YELLOW} />
      <polygon points="125,89 130,91 126,101 121,99" fill={YELLOW} />

      {/* scarf */}
      <g transform="translate(172 114) rotate(43)">
        <rect x={-22} y={-8} width={44} height={16} rx={6} fill={ORANGE} {...OUTLINE} />
        {MOTH_SCARF_STRIPES.map((stripe) => (
          <rect
            key={stripe.id}
            x={stripe.x}
            y={-7.5}
            width={5}
            height={15}
            fill={YELLOW}
          />
        ))}
      </g>

      {/* antennae */}
      {MOTH_ANTENNAE.map((antenna) => (
        <g key={antenna.id}>
          <path d={antenna.d} fill="none" {...OUTLINE} />
          <circle cx={antenna.cx} cy={antenna.cy} r={4} fill={YELLOW} {...OUTLINE} />
        </g>
      ))}

      {/* head in profile, facing right */}
      <ellipse cx={229} cy={90} rx={7} ry={5.5} fill={BLUE} {...OUTLINE} />
      <circle cx={198} cy={86} r={30} fill={BLUE} {...OUTLINE} />
      <circle cx={196} cy={98} r={6} fill={LIGHT_PINK} />
      <circle cx={211} cy={80} r={4} fill={BLACK} />
      <circle cx={212.4} cy={78.6} r={1.3} fill={OFF_WHITE} />
      <path d="M207 103 Q214 108 221 102" fill="none" {...OUTLINE} />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Hare sprite (flies toward the left)                                 */
/* ------------------------------------------------------------------ */

const HARE_WING_VEINS = [
  { id: "upper-midrib", d: "M108 122 Q150 76 198 34" },
  { id: "upper-vein-a", d: "M133 95 L136 75" },
  { id: "upper-vein-b", d: "M133 95 L161 92" },
  { id: "upper-vein-c", d: "M161 68 L165 52" },
  { id: "upper-vein-d", d: "M161 68 L185 65" },
  { id: "lower-midrib", d: "M110 134 Q170 116 226 112" },
  { id: "lower-vein-a", d: "M157 122 L170 111" },
  { id: "lower-vein-b", d: "M157 122 L176 134" },
  { id: "lower-vein-c", d: "M192 116 L202 110" },
  { id: "lower-vein-d", d: "M192 116 L204 124" },
];

const HARE_WHISKERS = [
  { id: "whisker-a", d: "M44 91 L26 83" },
  { id: "whisker-b", d: "M39 101 L21 104" },
];

const HARE_CROWN_JEWELS = [-6, 0, 6].map((x, i) => ({ id: `jewel-${i}`, x }));

export function FlyerRightArt({ className }: ArtProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 235 263"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* leaf wings */}
      <path
        d="M110 134 C140 104 186 100 226 112 C200 140 156 150 110 134 Z"
        fill={GREEN}
        {...OUTLINE}
      />
      <path
        d="M108 122 C116 82 150 48 198 34 C196 78 160 110 108 122 Z"
        fill={GREEN}
        {...OUTLINE}
      />
      {HARE_WING_VEINS.map((vein) => (
        <path
          key={vein.id}
          d={vein.d}
          fill="none"
          stroke={OLIVE}
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}

      {/* far arm + palm */}
      <path
        d="M104 124 C72 122 40 124 12 126 L12 138 C42 137 72 136 100 140 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <rect x={2} y={116} width={10} height={32} rx={4} fill={OFF_WHITE} {...OUTLINE} />

      {/* legs trailing down-right */}
      <path
        d="M156 158 C176 170 198 184 218 194 L212 206 C192 196 170 184 148 172 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <ellipse
        cx={217}
        cy={201}
        rx={13}
        ry={9}
        transform="rotate(28 217 201)"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <path
        d="M144 164 C164 180 188 206 210 230 L200 242 C180 222 158 200 138 180 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <ellipse
        cx={208}
        cy={238}
        rx={14}
        ry={10}
        transform="rotate(40 208 238)"
        fill={OFF_WHITE}
        {...OUTLINE}
      />

      {/* tail + torso */}
      <circle cx={160} cy={153} r={9} fill={OFF_WHITE} {...OUTLINE} />
      <ellipse
        cx={120}
        cy={141}
        rx={46}
        ry={23}
        transform="rotate(47 120 141)"
        fill={OFF_WHITE}
        {...OUTLINE}
      />

      {/* near arm + palm */}
      <path
        d="M110 136 C78 146 40 160 12 164 L12 176 C46 174 84 162 116 150 C122 146 118 136 110 136 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <rect x={2} y={154} width={10} height={32} rx={4} fill={OFF_WHITE} {...OUTLINE} />

      {/* collar */}
      <g transform="translate(94 114) rotate(-43)">
        <rect x={-20} y={-6} width={40} height={12} rx={5} fill={HOT_PINK} {...OUTLINE} />
        <circle cx={-8} cy={7} r={4} fill={YELLOW} {...OUTLINE} />
      </g>

      {/* ears swept back */}
      <path
        d="M82 66 C96 44 124 30 158 34 C146 52 122 64 94 78 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <path
        d="M66 64 C70 32 100 10 138 8 C132 30 110 50 88 68 Z"
        fill={OFF_WHITE}
        {...OUTLINE}
      />
      <path
        d="M78 58 C84 38 104 22 128 15 C122 31 106 45 88 59 Z"
        fill={LIGHT_PINK}
        {...OUTLINE}
      />

      {/* head in profile, facing left */}
      <circle cx={70} cy={88} r={28} fill={OFF_WHITE} {...OUTLINE} />
      <circle cx={70} cy={101} r={6} fill={LIGHT_PINK} />
      <ellipse cx={48} cy={98} rx={13} ry={9} fill={OFF_WHITE} {...OUTLINE} />
      <circle cx={37} cy={94} r={3.5} fill={HOT_PINK} {...OUTLINE} />
      <path d="M43 103 Q49 107 55 102" fill="none" {...OUTLINE} />
      {HARE_WHISKERS.map((whisker) => (
        <path key={whisker.id} d={whisker.d} fill="none" {...OUTLINE} />
      ))}
      <circle cx={58} cy={81} r={4} fill={BLACK} />
      <circle cx={56.6} cy={79.6} r={1.3} fill={OFF_WHITE} />

      {/* crown */}
      <g transform="translate(54 64) rotate(-28)">
        <polygon
          points="-11,0 -11,-12 -5.5,-6 0,-14 5.5,-6 11,-12 11,0"
          fill={YELLOW}
          {...OUTLINE}
        />
        {HARE_CROWN_JEWELS.map((jewel) => (
          <circle key={jewel.id} cx={jewel.x} cy={-3} r={1.6} fill={RED} />
        ))}
      </g>
    </svg>
  );
}
