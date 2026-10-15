import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { ArtistsGallery } from "@/components/sites/ekchitra-v6/ArtistsGallery";
import { Footer } from "@/components/sites/ekchitra-v6/Footer";
import { Hero } from "@/components/sites/ekchitra-v6/Hero";
import { ContactPanel } from "@/components/sites/ekchitra-v6/ContactPanel";
import { Services } from "@/components/sites/ekchitra-v6/Services";
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
      <Services />
      <ArtistsGallery />
      <ContactPanel />
      <Footer />
    </main>
  );
}
