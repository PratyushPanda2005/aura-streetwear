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

/**
 * Colours. The page ground and ink are CSS variables on `.ekchitra-site`
 * (`src/app/ekchitra-redesign/ekchitra.css`); use them in class names as `bg-(--ek-paper)` and
 * `text-(--ek-ink)`. Change the two values there to recolour the whole site.
 */
export const COLOR = {
  /** Off-white page ground and light text (#FCF0D6). */
  paper: "var(--ek-paper)",
  /** A shade deeper than paper, for tiles behind artworks (#EEE3CB). */
  paperDeep: "var(--ek-paper-deep)",
  /** Brand ink for text and dark grounds (#191919). */
  ink: "var(--ek-ink)",
  /** #780000 — accent for text: button labels, hover, status lines. */
  maroon: "var(--ek-maroon)",
  /** #E62A34 — small marks only (dots, markers); too light for text on cream. */
  red: "var(--ek-red)",
  /** #89CFF0 — marks and accents on dark grounds. */
  sky: "var(--ek-sky)",
  /** #0C1B8F — focus rings and marks on light grounds. */
  navy: "var(--ek-navy)",
  muted: "#767676",
  line: "#e1e1e1",
  buttonLine: "#cccccc",
  buttonLineHover: "#949494",
  tile: "#f2f2f2",
} as const;
