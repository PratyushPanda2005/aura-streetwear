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

/** Pages of this version. */
export const V5_ROUTES = {
  home: V5_HOME,
  artworks: `${V5_HOME}/artworks`,
  exhibitions: `${V5_HOME}/exhibitions`,
  /** Not rebuilt in this version yet; points at the earlier artists page. */
  artists: ROUTES.artists,
};

/** Section links carry the homepage path so they work from every page. */
export const V5_NAV = [
  { label: "About", href: `${V5_HOME}#about` },
  { label: "Exhibitions", href: V5_ROUTES.exhibitions },
  { label: "Artists", href: V5_ROUTES.artists },
  { label: "Artworks", href: V5_ROUTES.artworks },
  { label: "Services", href: `${V5_HOME}#services` },
];
