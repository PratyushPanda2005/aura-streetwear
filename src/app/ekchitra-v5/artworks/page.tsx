import type { Metadata } from "next";
import {
  ARTWORKS,
  ARTWORKS_PAGE,
} from "@/components/sites/ekchitra-redesign/data";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { ArtworksGrid } from "@/components/sites/ekchitra-v5/ArtworksGrid";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";
import { PageHero } from "@/components/sites/ekchitra-v5/PageHero";

export const metadata: Metadata = {
  title: "Artworks — EkChitra Art Gallery",
  description:
    "A living collection of contemporary expressions across various media.",
};

/**
 * TEMPORARY PLACEHOLDER — this photograph is the banner of Goodman Gallery's
 * "available artworks" page and is here only to judge the layout. Replace it
 * with an EkChitra image before the site is published.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/artworks-banner-placeholder-goodman.jpg",
  alt: "",
};

export default async function EkchitraV5ArtworksPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Set by the "by medium" links in the header menu.
  const { medium } = await searchParams;
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header compact />
      <PageHero
        label={ARTWORKS_PAGE.label}
        title={["Discover", "and collect"]}
        image={BANNER}
        intro={ARTWORKS_PAGE.intro}
        note={`${ARTWORKS.length} works on view`}
      />
      <ArtworksGrid initialQuery={typeof medium === "string" ? medium : ""} />
      <Footer />
    </main>
  );
}
