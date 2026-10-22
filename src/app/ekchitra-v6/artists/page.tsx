import type { Metadata } from "next";

import { ARTISTS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import { ArtistsFrame } from "@/components/sites/ekchitra-v6/artists/ArtistsFrame";
import { ArtistsIndex } from "@/components/sites/ekchitra-v6/artists/ArtistsIndex";

export const metadata: Metadata = {
  title: "Artists — EkChitra Art Gallery",
  description: ARTISTS_PAGE.intro,
};

/** Artists, v6: an index of names with a pinned preview, in v7's ruled grid. */
export default function EkchitraV6ArtistsPage() {
  return (
    <ArtistsFrame>
      <ArtistsIndex />
    </ArtistsFrame>
  );
}
