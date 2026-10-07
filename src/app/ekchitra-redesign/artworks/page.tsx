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
    <main className="flex min-h-svh flex-col bg-white text-[#333]">
      <SiteHeader alwaysSolid />
      <ArtworksIndex />
      <SiteFooter />
    </main>
  );
}
