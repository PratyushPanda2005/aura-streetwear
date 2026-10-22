import type { Metadata } from "next";

import { ARTISTS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import { ArtistsFolio } from "@/components/sites/ekchitra-v6/artists/ArtistsFolio";
import { ArtistsFrame } from "@/components/sites/ekchitra-v6/artists/ArtistsFrame";

export const metadata: Metadata = {
  title: "Artists (v1) — EkChitra Art Gallery",
  description: ARTISTS_PAGE.intro,
  robots: { index: false },
};

/** Artists, v6 — version 1, kept for reference: the folio, one row per artist with a strip of their works. */
export default function EkchitraV6ArtistsV1Page() {
  return (
    <ArtistsFrame>
      <ArtistsFolio />
    </ArtistsFrame>
  );
}
