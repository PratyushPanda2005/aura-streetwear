import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { ARTISTS_PAGE } from "@/components/sites/ekchitra-redesign/data";
import {
  ARTISTS,
  ARTIST_WORK_COUNT,
} from "@/components/sites/ekchitra-v5/artists-data";
import { ArtistsGrid } from "@/components/sites/ekchitra-v5/ArtistsGrid";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";
import { PageHero } from "@/components/sites/ekchitra-v5/PageHero";

export const metadata: Metadata = {
  title: "Artists — EkChitra Art Gallery",
  description: ARTISTS_PAGE.intro,
};

/**
 * Banner: an artist's worktable (Unsplash, free licence —
 * unsplash.com/photos/KR84RpMCb0w).
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artists-banner-unsplash.jpg",
  alt: "Paint brushes and paint tins on an artist's worktable",
};

export default function EkchitraV5ArtistsPage() {
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header compact />
      <PageHero
        label={ARTISTS_PAGE.label}
        title={["Meet the artists", "through their work"]}
        image={BANNER}
        intro={ARTISTS_PAGE.intro}
        note={`${ARTISTS.length} artists · ${ARTIST_WORK_COUNT} works`}
      />
      <ArtistsGrid />
      <Footer />
    </main>
  );
}
