import type { Metadata } from "next";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { ArtworksGrid } from "@/components/sites/ekchitra-v5/ArtworksGrid";
import { ArtworksHero } from "@/components/sites/ekchitra-v5/ArtworksHero";
import { Enquire } from "@/components/sites/ekchitra-v5/Enquire";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";

export const metadata: Metadata = {
  title: "Artworks — EkChitra Art Gallery",
  description:
    "A living collection of contemporary expressions across various media.",
};

export default function EkchitraV5ArtworksPage() {
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header compact />
      <ArtworksHero />
      <ArtworksGrid />
      <Enquire />
      <Footer />
    </main>
  );
}
