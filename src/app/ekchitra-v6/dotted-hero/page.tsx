import type { Metadata } from "next";

import { ArtistsBands } from "@/components/sites/ekchitra-v6/ArtistsBands";
import { ExIndexReel } from "@/components/sites/ekchitra-v6/exhibitions-home/ExIndexReel";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";
import { Hero } from "@/components/sites/ekchitra-v6/Hero";
import { ServicesOverlay } from "@/components/sites/ekchitra-v6/services-cards/ServicesOverlay";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { Statement } from "@/components/sites/ekchitra-v6/Statement";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";

export const metadata: Metadata = {
  title: "EkChitra — dotted hero (variation)",
  robots: { index: false },
};

/**
 * The v6 homepage with one change, to compare against it: the hero's artwork
 * carousel and film are dotted pictures that clear on hover. Everything else
 * matches /ekchitra-v6.
 */
export default function EkchitraV6DottedHeroPage() {
  return (
    <main className="min-h-svh bg-white text-(--k-ink)">
      <SmoothScroll />
      <TopBar />
      <Hero dotted />
      <Statement />
      <ExIndexReel />
      <ArtistsBands />
      <div id="services" className="scroll-mt-11">
        <ServicesOverlay />
      </div>
      <FooterSmoke dark />
    </main>
  );
}
