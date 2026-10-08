import type { Metadata } from "next";
import { ArtworksIndex } from "@/components/sites/ekchitra-redesign/ArtworksIndex";
import { SiteFooter } from "@/components/sites/ekchitra-redesign/SiteFooter";
import { SiteHeader } from "@/components/sites/ekchitra-redesign/SiteHeader";

export const metadata: Metadata = {
  title: "Artworks — EkChitra",
  description:
    "A living collection of contemporary expressions across various media.",
};

export default function EkchitraArtworksPage() {
  return (
    <main className="flex min-h-svh flex-col bg-(--ek-paper) text-(--ek-ink)">
      <SiteHeader alwaysSolid />
      {/* Sits above the footer, which is pinned behind it and revealed on scroll. */}
      <div className="relative z-10 bg-(--ek-paper)">
        <ArtworksIndex />
      </div>
      <SiteFooter />
    </main>
  );
}
