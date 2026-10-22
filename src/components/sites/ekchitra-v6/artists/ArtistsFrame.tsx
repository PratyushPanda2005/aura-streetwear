import type { ReactNode } from "react";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { PageFrame } from "../PageFrame";

/**
 * TEMPORARY PLACEHOLDER — the Unsplash photograph already used on the v5
 * artists page. Replace with an EkChitra photograph.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artists-banner-unsplash.jpg",
  alt: "",
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
