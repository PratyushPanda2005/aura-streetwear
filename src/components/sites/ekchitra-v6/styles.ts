/** Huge uppercase display type for the grid's word cells. */
export const MEGA =
  "font-[family-name:var(--font-ek5-sans)] font-normal uppercase tracking-[-0.045em] [line-height:0.9]";

/**
 * The modular grid every section below the hero sits on: 4 columns on phones,
 * 12 on desktop, 20px gutters and margins. Columns 1–3 hold the section index;
 * columns 4–12 hold the content.
 */
export const GRID =
  "grid grid-cols-4 gap-x-4 px-4 lg:grid-cols-12 lg:gap-x-5 lg:px-5";

/**
 * Spacing around a section's label and heading — the same for every section,
 * so the gap before each "0N" label is always the same.
 */
export const HEAD = "pt-12 pb-10 lg:pt-16 lg:pb-12";

/** Vertical rhythm shared by every section. */
export const SECTION = "py-20 lg:py-[120px]";
