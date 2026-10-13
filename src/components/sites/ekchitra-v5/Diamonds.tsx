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

/** Colours a few diamonds can be picked out in. */
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
 * It is drawn in the current text colour, so set the base tone with a text
 * colour class (a pale grey on white, a lighter tone on a dark band). `shape`
 * picks the outline; `tint` picks out a scattering of diamonds in one of the
 * brand colours (`accent` is shorthand for the sky-blue tint). `side` says which
 * edge is the straight one — put the strip against that edge of the page or
 * panel. `horizontal` lays the strip on its side with the straight edge up.
 */
export function Diamonds({
  rows = 12,
  shape = "steps",
  tint,
  accent = false,
  side = "left",
  horizontal = false,
  className,
}: {
  rows?: number;
  shape?: keyof typeof SHAPES;
  tint?: keyof typeof TINTS;
  accent?: boolean;
  side?: "left" | "right";
  horizontal?: boolean;
  className?: string;
}) {
  const widths = SHAPES[shape];
  const most = Math.max(...widths);
  const half = UNIT / 2;
  const across = (most + 0.5) * UNIT;
  const along = (rows + 1) * half;
  const picked = tint ? TINTS[tint] : accent ? TINTS.sky : undefined;
  const cells: { key: string; d: string; fill: string }[] = [];

  for (let row = 0; row < rows; row += 1) {
    const count = widths[row % widths.length];
    for (let column = 0; column < count; column += 1) {
      const a = (column + (row % 2) * 0.5) * UNIT + half;
      const b = row * half + half;
      const [x, y] = horizontal ? [b, a] : [a, b];
      cells.push({
        key: `${row}-${column}`,
        d: `M${x} ${y - half}L${x + half} ${y}L${x} ${y + half}L${x - half} ${y}Z`,
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
      {cells.map((cell) => (
        <path key={cell.key} d={cell.d} className={cell.fill} />
      ))}
    </svg>
  );
}
