/**
 * EkChitra design tokens. Every section of the redesign reads its typefaces and
 * colours from here so they stay consistent.
 */

/** Typefaces. The serif is loaded in `src/app/ekchitra-redesign/layout.tsx`. */
export const FONT = {
  /** Display serif — headings and artist names. */
  serif: "font-[family-name:var(--font-ekchitra-serif)]",
  /** Sans — labels, body copy, navigation, buttons. */
  sans: "font-[family-name:var(--font-sans)]",
} as const;

/** Colour palette as raw values, for reference and one-off use. */
export const COLOR = {
  ink: "#000000",
  inkSoft: "#1a1a1a",
  muted: "#767676",
  accent: "#b50938",
  line: "#e1e1e1",
  buttonLine: "#cccccc",
  buttonLineHover: "#949494",
  tile: "#f2f2f2",
  paper: "#ffffff",
} as const;
