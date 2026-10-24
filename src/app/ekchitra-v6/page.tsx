import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { FooterPattern } from "@/components/sites/ekchitra-v6/footer-variants/FooterPattern";
import { ArtistsBands } from "@/components/sites/ekchitra-v6/ArtistsBands";
import { ExIndexReel } from "@/components/sites/ekchitra-v6/exhibitions-home/ExIndexReel";
import { Hero } from "@/components/sites/ekchitra-v6/Hero";
import { CtaCard } from "@/components/sites/ekchitra-v6/cta-variants/CtaCard";
import { Statement } from "@/components/sites/ekchitra-v6/Statement";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

/**
 * Homepage, v6: one Swiss grid from top to bottom, after aspensearch.com —
 * black and white cells, full-colour pictures,
 * huge capitals, and the diamond motif as the only accent.
 */
export default function EkchitraV6Page() {
  return (
    <main className="min-h-svh bg-white text-(--k-ink)">
      <SmoothScroll />
      <TopBar />
      <Hero />
      <Statement />
      <ExIndexReel />
      <ArtistsBands />
      <CtaCard />
      <FooterPattern />
    </main>
  );
}
