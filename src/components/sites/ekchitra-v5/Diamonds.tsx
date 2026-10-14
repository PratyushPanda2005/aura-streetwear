import { cn } from "@/lib/utils";

/**
 * Shapes of the strip: how many diamonds sit across it on each successive row,
 * repeated along its length. A 0 leaves a gap, which breaks the strip into
 * separate clusters.
 */
const SHAPES = {
  /** A stepped edge that widens and narrows. */
  steps: [1, 2, 3, 4, 3, 2],
  /** Separate diamond-shaped clusters with air between them. */
  clusters: [1, 2, 3, 2, 1, 0, 0],
  /** A dense band with a sawtooth edge. */
  band: [3, 4, 3, 4],
  /** Long, slow zigzag. */
  zigzag: [1, 1, 2, 2, 3, 3, 4, 4, 3, 3, 2, 2],
  /** Small clusters alternating with single diamonds. */
  scatter: [1, 0, 2, 3, 2, 0, 1, 0],
} as const;

/** Colours a scattering of diamonds can be picked out in. */
const TINTS = {
  sky: "fill-(--k-sky)",
  maroon: "fill-(--k-maroon)",
  navy: "fill-(--k-navy)",
  red: "fill-[#e62a34]",
  green: "fill-[#1d6b3a]",
  pink: "fill-[#ee5fa7]",
} as const;

/** Size of one diamond, corner to corner, in SVG units. */
const UNIT = 20;

/**
 * The brand's diamond motif: small diamonds set corner to corner in a chequered
 * lattice, with one straight edge and one shaped edge.
 *
 * It is drawn in the current text colour, so the base tone is set with a text
 * colour class: a pale grey, or one of the brand colours for a two-colour
 * motif. `shape` picks the outline; `tint` picks out a scattering of diamonds
 * in a second brand colour (`accent` is shorthand for the sky-blue tint). `side`
 * says which edge is the straight one — put the strip against that edge of the
 * page or panel. `horizontal` lays the strip on its side with the straight edge
 * up.
 */
export function Diamonds({
  rows = 12,
  shape = "steps",
  tint,
  accent = false,
  side = "left",
  horizontal = false,
  reveal,
  className,
}: {
  rows?: number;
  shape?: keyof typeof SHAPES;
  tint?: keyof typeof TINTS;
  accent?: boolean;
  side?: "left" | "right";
  horizontal?: boolean;
  /**
   * Seconds after page load at which the diamonds start appearing. When set,
   * they fade in one after another along the strip instead of being there
   * from the start.
   */
  reveal?: number;
  className?: string;
}) {
  const widths = SHAPES[shape];
  const most = Math.max(...widths);
  const half = UNIT / 2;
  const across = (most + 0.5) * UNIT;
  const along = (rows + 1) * half;
  const picked = tint ? TINTS[tint] : accent ? TINTS.sky : undefined;
  const cells: { key: string; d: string; fill: string; begin: number }[] = [];

  for (let row = 0; row < rows; row += 1) {
    const count = widths[row % widths.length];
    for (let column = 0; column < count; column += 1) {
      const a = (column + (row % 2) * 0.5) * UNIT + half;
      const b = row * half + half;
      const [x, y] = horizontal ? [b, a] : [a, b];
      cells.push({
        key: `${row}-${column}`,
        d: `M${x} ${y - half}L${x + half} ${y}L${x} ${y + half}L${x - half} ${y}Z`,
        begin: (reveal ?? 0) + (row * 2 + column) * 0.045,
        fill:
          picked && (row * 5 + column * 3) % 7 === 0 ? picked : "fill-current",
      });
    }
  }

  return (
    <svg
      viewBox={horizontal ? `0 0 ${along} ${across}` : `0 0 ${across} ${along}`}
      aria-hidden="true"
      className={cn(
        "pointer-events-none",
        side === "right" && "-scale-x-100",
        className,
      )}
    >
      {cells.map((cell) =>
        reveal === undefined ? (
          <path key={cell.key} d={cell.d} className={cell.fill} />
        ) : (
          <path key={cell.key} d={cell.d} className={cell.fill} opacity="0">
            <animate
              attributeName="opacity"
              from="0"
              to="1"
              dur="0.6s"
              begin={`${cell.begin.toFixed(3)}s`}
              fill="freeze"
            />
          </path>
        ),
      )}
    </svg>
  );
}
