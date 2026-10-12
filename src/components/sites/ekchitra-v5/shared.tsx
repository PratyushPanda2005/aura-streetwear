import { ROUTES } from "../ekchitra-redesign/data";

/** Text face (loaded in `src/app/ekchitra-v5/layout.tsx`). */
export const SANS = "font-[family-name:var(--font-ek5-sans)]";

/** Headings: the same sans at regular weight, set a little tighter. */
export const DISPLAY =
  "font-[family-name:var(--font-ek5-sans)] font-normal tracking-[-0.035em]";

/** Small spaced capitals: eyebrows, meta lines, links. */
export const CAPS =
  "text-[12px] leading-4 font-normal tracking-[0.12em] uppercase";

/** Running text. */
export const BODY = "text-[16px] leading-[1.4] tracking-[-0.01em]";

/** Page gutter. */
export const GUTTER = "px-4 lg:px-5";

export const V5_HOME = "/ekchitra-v5";

export const V5_NAV = [
  { label: "About", href: "#about" },
  { label: "Exhibitions", href: "#exhibitions" },
  { label: "Artists", href: ROUTES.artists },
  { label: "Artworks", href: ROUTES.artworks },
  { label: "Services", href: "#services" },
];

/** Brand patterns (from the client's "3 patterns" folder). */
export const PATTERNS = {
  /** Stepped zigzag, cropped to one seamless band for use as a repeating strip. */
  band: "/sites/ekchitra-redesign/patterns/pattern-1-band.jpg",
  /** Red and sky-blue capsules. */
  capsules: "/sites/ekchitra-redesign/patterns/pattern-2.jpg",
  /** Rows of diamonds. */
  diamonds: "/sites/ekchitra-redesign/patterns/pattern-3.jpg",
};
