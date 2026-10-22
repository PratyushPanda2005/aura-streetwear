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

/**
 * Every v6 button, set as the top bar's Contact cell: brand black, 44px tall,
 * 208px wide from small screens up (full width on a phone), 13px type, the
 * label left and a "→" right, easing slightly lighter on hover. Pass a
 * different `bg-…` after it for a coloured button of the same shape.
 */
export const BUTTON =
  "flex h-11 w-full shrink-0 items-center justify-between gap-x-6 bg-(--k-ink) px-5 text-[13px] text-white transition-opacity duration-300 hover:opacity-85 sm:w-[208px]";

/**
 * The v6 type scale for titles inside sections, so every page reads alike:
 * - `SECTION_TITLE`: a section's heading ("The collection", a curator's name,
 *   the chosen artist).
 * - `ITEM_TITLE`: a listed thing set large (current exhibitions, artist names).
 * - `CARD_TITLE`: a title in a grid or card (artworks, past exhibitions).
 * - `META`: small capitals for details (mediums, tags); `EYEBROW` for the
 *   label over a heading.
 */
export const SECTION_TITLE =
  "text-[32px] leading-[1.05] tracking-[-0.04em] lg:text-[3vw]";
export const ITEM_TITLE =
  "text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[26px]";
export const CARD_TITLE =
  "text-[17px] leading-[1.2] tracking-[-0.01em] lg:text-[19px]";
export const EYEBROW_SIZE = "text-[12px]";
export const META_SIZE = "text-[11px]";
