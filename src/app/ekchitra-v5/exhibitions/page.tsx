import type { Metadata } from "next";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { Enquire } from "@/components/sites/ekchitra-v5/Enquire";
import { EXHIBITIONS } from "@/components/sites/ekchitra-v5/exhibitions-data";
import { ExhibitionsList } from "@/components/sites/ekchitra-v5/ExhibitionsList";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";
import { PageHero } from "@/components/sites/ekchitra-v5/PageHero";

export const metadata: Metadata = {
  title: "Exhibitions — EkChitra Art Gallery",
  description: "Current, upcoming and past exhibitions at EkChitra, Hyderabad.",
};

/**
 * Banner: a stock photograph of a gallery room from Unsplash (free licence),
 * https://unsplash.com/photos/a-room-with-a-lot-of-paintings-on-the-walls-PmF9EcHvFB0
 * It shows another gallery, so swap it for a photograph of EkChitra's own space
 * when one is available.
 */
const BANNER = {
  src: "/sites/ekchitra-redesign/placeholders/exhibitions-banner-unsplash.jpg",
  alt: "",
};

export default function EkchitraV5ExhibitionsPage() {
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header compact />
      <PageHero
        label="Exhibitions"
        title={["Current, upcoming", "and past"]}
        image={BANNER}
        intro="Every exhibition begins with an idea, and every visit begins with curiosity."
        note={`${EXHIBITIONS.length} exhibitions`}
      />
      <ExhibitionsList />
      <Enquire
        label="Visit"
        title={["Planning a visit?", "We’d love to see you."]}
        body="Ask about opening hours, walkthroughs or bringing a group to the gallery."
      />
      <Footer />
    </main>
  );
}
