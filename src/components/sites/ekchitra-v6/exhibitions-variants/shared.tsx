import { V5_ROUTES } from "../../ekchitra-v5/shared";
import { EXHIBITIONS } from "../data";

export { LineArrow, pad } from "../cta-variants/shared";

/** The exhibitions the variations show: current first, then the latest past. */
export const SHOWS = EXHIBITIONS.slice(0, 6);

/** Every exhibition, for the archive table. */
export const ALL_SHOWS = EXHIBITIONS;

export const ALL_EXHIBITIONS = {
  label: `View all exhibitions (${EXHIBITIONS.length})`,
  href: V5_ROUTES.exhibitions,
};
