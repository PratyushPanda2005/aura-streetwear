import type { ReactNode } from "react";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { PageFrame } from "../PageFrame";

/**
 * Rajesh Naik's auto-rickshaw works in a row at Naik City — from the
 * original on ekchitra.com (4096 × 1842, saved at 3840 wide). A panorama,
 * so it suits the wide banner; on phones the middle of the row shows.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/exhibitions/naik-city/autos-wall.jpg",
  alt: "Rajesh Naik’s auto-rickshaw works in a row on a gallery wall at Naik City, with two people standing among them",
};

/** The frame every version of the artists page shares. */
export function ArtistsFrame({ children }: { children: ReactNode }) {
  return (
    <PageFrame
      banner={BANNER}
      label={ARTISTS_PAGE.label}
      title="Meet the artists"
      intro={ARTISTS_PAGE.intro}
      note={`${ARTISTS.length} artists represented`}
    >
      {children}
    </PageFrame>
  );
}
