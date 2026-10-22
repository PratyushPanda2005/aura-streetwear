import type { Metadata } from "next";

import { ARTISTS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import { ArtistsFrame } from "@/components/sites/ekchitra-v6/artists/ArtistsFrame";
import { ArtistsIndexRuled } from "@/components/sites/ekchitra-v6/artists/ArtistsIndexRuled";

export const metadata: Metadata = {
  title: "Artists (v3) — EkChitra Art Gallery",
  description: ARTISTS_PAGE.intro,
  robots: { index: false },
};

/** Artists, v6 — version 3, kept for reference: the index in v7's ruled grid and colours. */
export default function EkchitraV6ArtistsV3Page() {
  return (
    <ArtistsFrame>
      <ArtistsIndexRuled />
    </ArtistsFrame>
  );
}
