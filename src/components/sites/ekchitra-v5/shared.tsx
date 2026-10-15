/** Text face (loaded in `src/app/ekchitra-v5/layout.tsx`). */
export const SANS = "font-[family-name:var(--font-ek5-sans)]";

/** Headings: the same sans at regular weight, set a little tighter. */
export const DISPLAY =
  "font-[family-name:var(--font-ek5-sans)] font-normal tracking-[-0.035em]";

/** Small spaced capitals: eyebrows, meta lines, links. */
export const CAPS =
  "text-[12px] leading-4 font-normal tracking-[0.12em] uppercase";

/**
 * Type scale shared by every page, so headings and the small labels over
 * them read the same everywhere.
 *
 * - `EYEBROW`: the small spaced-capitals label above a heading.
 * - `TITLE`: every section heading (and large statement).
 * - `PAGE_TITLE`: the one title on a page's banner.
 */
export const EYEBROW = `${CAPS} text-(--k-ink)/60`;

export const TITLE =
  "font-[family-name:var(--font-ek5-sans)] font-normal tracking-[-0.035em] text-[30px] leading-[1.12] lg:text-[44px]";

export const PAGE_TITLE =
  "font-[family-name:var(--font-ek5-sans)] font-normal tracking-[-0.035em] text-[40px] leading-[1.05] lg:text-[64px]";

/** Running text. */
export const BODY = "text-[16px] leading-[1.4] tracking-[-0.01em]";

/** Page gutter. */
export const GUTTER = "px-4 lg:px-5";

export const V5_HOME = "/ekchitra-v5";

/** Pages of this version. */
export const V5_ROUTES = {
  home: V5_HOME,
  about: `${V5_HOME}/about`,
  artworks: `${V5_HOME}/artworks`,
  exhibitions: `${V5_HOME}/exhibitions`,
  artists: `${V5_HOME}/artists`,
};

/** Section links carry the homepage path so they work from every page. */
export const V5_NAV = [
  { label: "About", href: V5_ROUTES.about },
  { label: "Exhibitions", href: V5_ROUTES.exhibitions },
  { label: "Artists", href: V5_ROUTES.artists },
  { label: "Artworks", href: V5_ROUTES.artworks },
  { label: "Services", href: `${V5_HOME}#services` },
];
