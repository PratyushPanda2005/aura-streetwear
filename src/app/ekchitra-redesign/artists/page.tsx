import type { Metadata } from "next";
import { ArtistsIndex } from "@/components/sites/ekchitra-redesign/ArtistsIndex";
import { SiteFooter } from "@/components/sites/ekchitra-redesign/SiteFooter";
import { SiteHeader } from "@/components/sites/ekchitra-redesign/SiteHeader";

export const metadata: Metadata = {
  title: "Artists — EkChitra",
  description:
    "Artists shaping contemporary India, exclusively represented by EkChitra.",
};

export default function EkchitraArtistsPage() {
  return (
    <main className="flex min-h-svh flex-col bg-(--ek-paper) text-(--ek-ink)">
      <SiteHeader alwaysSolid />
      {/* Sits above the footer, which is pinned behind it and revealed on scroll. */}
      <div className="relative z-10 bg-(--ek-paper)">
        <ArtistsIndex />
      </div>
      <SiteFooter />
    </main>
  );
}
