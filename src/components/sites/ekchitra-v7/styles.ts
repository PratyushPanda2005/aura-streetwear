import { V5_ROUTES } from "../ekchitra-v5/shared";

/** Small monospace capitals, the reference's label voice. */
export const MONO =
  "font-[family-name:var(--font-e7-mono)] text-[12px] leading-[1.1] tracking-[-0.02em] uppercase";

/** The four-column grid of ruled cells everything sits on. */
export const CELLS = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

/** A cell's rule: every cell draws its right and bottom edge. */
export const RULE = "border-r border-b border-(--e7-rule)";

/** Huge display type: the wordmarks and the section names. */
export const DISPLAY =
  "text-[25vw] leading-[0.8] tracking-[-0.045em] sm:text-[18vw] lg:text-[12.55vw]";

/** Display capitals for the statements. */
export const CAPITALS =
  "text-[13vw] leading-[0.82] tracking-[-0.045em] uppercase lg:text-[7.45vw]";

export const V7_HOME = "/ekchitra-v7";

/** Links in the top bar and footer; pages still live in v5 for now. */
export const V7_NAV = [
  { label: "About", href: `${V7_HOME}#about` },
  { label: "Services", href: `${V7_HOME}#services` },
  { label: "Artists", href: `${V7_HOME}#artists` },
  { label: "Exhibitions", href: `${V7_HOME}#exhibitions` },
];

export { V5_ROUTES };
