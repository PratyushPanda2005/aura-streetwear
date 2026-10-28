import type { Metadata } from "next";

import { ARTWORKS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import { ARTIST_WORK_COUNT } from "@/components/sites/ekchitra-v5/artists-data";
import { PageFrame } from "@/components/sites/ekchitra-v6/PageFrame";
import { ArtworksIndex } from "@/components/sites/ekchitra-v6/artworks/ArtworksIndex";

/**
 * TEMPORARY PLACEHOLDER — a visitor in front of six paintings in a gallery
 * (Unsplash, free licence — unsplash.com/photos/xJXxMR5PXoY, by Clem
 * Onojeghuo). Replace with an EkChitra photograph.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artworks-banner-unsplash-onojeghuo.jpg",
  alt: "A visitor looking at paintings hung on a gallery wall",
  position: "object-[50%_45%]",
};

export const metadata: Metadata = {
  title: "Artworks — EkChitra Art Gallery",
  description: ARTWORKS_PAGE.intro,
};

/**
 * Artworks, v6: the shared page frame (banner, label, line and intro) over
 * every work in columns, each at its own proportions.
 */
export default async function EkchitraV6ArtworksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // A medium to filter by, e.g. /ekchitra-v6/artworks?medium=Acrylic, and
  // a work to open on arrival, e.g. ?work=Garuda&artist=Anupama+Choudhary.
  const { medium, work, artist } = await searchParams;

  return (
    <PageFrame
      banner={BANNER}
      label={ARTWORKS_PAGE.label}
      title="Discover and collect"
      intro={ARTWORKS_PAGE.intro}
      note={`${ARTIST_WORK_COUNT} works on view`}
    >
      <ArtworksIndex
        initialQuery={typeof medium === "string" ? medium : ""}
        initialWork={
          typeof work === "string" && typeof artist === "string"
            ? { title: work, artist }
            : undefined
        }
      />
    </PageFrame>
  );
}
