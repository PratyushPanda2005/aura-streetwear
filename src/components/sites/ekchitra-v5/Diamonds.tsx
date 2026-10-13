import { cn } from "@/lib/utils";

/** Diamonds across the strip on each successive row, repeated along its length. */
const WIDTHS = [1, 2, 3, 4, 3, 2];

/** Size of one diamond, corner to corner, in SVG units. */
const UNIT = 20;

const MOST = Math.max(...WIDTHS);

/** Band colours of the full-colour version, in the order the pattern runs them. */
const BANDS = [
  "fill-(--k-sky)",
  "fill-(--k-maroon)",
  "fill-[#1d6b3a]",
  "fill-[#ee5fa7]",
];

/**
 * The brand's diamond motif: a strip of small diamonds set corner to corner in
 * a chequered lattice, with one straight edge and one stepped edge.
 *
 * It is drawn in the current text colour, so set the tone with a text colour
 * class (for example a pale grey on white, or a lighter red on dark red). With
 * `accent`, a few diamonds are picked out in the brand's sky blue. `side` says
 * which edge is the straight one — put the strip against that edge of the page
 * or panel. `horizontal` lays the strip on its side with the straight edge up.
 * `colourful` ignores the text colour and paints the strip like the original
 * pattern: navy diamonds chequered with sky blue, dark red, green and pink, the
 * second colour changing every few rows.
 */
export function Diamonds({
  rows = 12,
  side = "left",
  horizontal = false,
  accent = false,
  colourful = false,
  className,
}: {
  rows?: number;
  side?: "left" | "right";
  horizontal?: boolean;
  accent?: boolean;
  colourful?: boolean;
  className?: string;
}) {
  const half = UNIT / 2;
  const across = (MOST + 0.5) * UNIT;
  const along = (rows + 1) * half;
  const cells: { key: string; d: string; fill: string }[] = [];

  for (let row = 0; row < rows; row += 1) {
    const count = WIDTHS[row % WIDTHS.length];
    for (let column = 0; column < count; column += 1) {
      const a = (column + (row % 2) * 0.5) * UNIT + half;
      const b = row * half + half;
      const [x, y] = horizontal ? [b, a] : [a, b];
      cells.push({
        key: `${row}-${column}`,
        d: `M${x} ${y - half}L${x + half} ${y}L${x} ${y + half}L${x - half} ${y}Z`,
        fill: colourful
          ? (row + column) % 2
            ? "fill-(--k-navy)"
            : BANDS[Math.floor(row / WIDTHS.length) % BANDS.length]
          : accent && (row * 5 + column * 3) % 9 === 0
            ? "fill-(--k-sky)"
            : "fill-current",
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
