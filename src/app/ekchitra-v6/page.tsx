import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { FooterGlow } from "@/components/sites/ekchitra-v6/footer-variants/FooterGlow";
import { ArtistsBands } from "@/components/sites/ekchitra-v6/ArtistsBands";
import { ExIndexReel } from "@/components/sites/ekchitra-v6/exhibitions-home/ExIndexReel";
import { Hero } from "@/components/sites/ekchitra-v6/Hero";
import { ServicesOverlay } from "@/components/sites/ekchitra-v6/services-cards/ServicesOverlay";
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
      <Hero dotted />
      <Statement />
      <ExIndexReel />
      <ArtistsBands />
      {/* Services: iteration 04 (overlay cards) for now. The wrapper keeps
          the top bar's "Services" link landing here. */}
      {/* The cards keep 48px under them on desktop (one screen, centred);
          the extra 48 makes the standard 96 above the footer (FOOTER_GAP). */}
      <div id="services" className="scroll-mt-11 lg:pb-12">
        <ServicesOverlay dotted />
      </div>
      <FooterGlow />
    </main>
  );
}
