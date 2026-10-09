import type { Metadata } from "next";
import { ArtistsBand } from "@/components/sites/ekchitra-v2/ArtistsBand";
import { Footer } from "@/components/sites/ekchitra-v2/Footer";
import { Header } from "@/components/sites/ekchitra-v2/Header";
import { Hero } from "@/components/sites/ekchitra-v2/Hero";
import { Services } from "@/components/sites/ekchitra-v2/Services";
import { Spotlight } from "@/components/sites/ekchitra-v2/Spotlight";
import { Statement } from "@/components/sites/ekchitra-v2/Statement";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function EkchitraV2Page() {
  return (
    <main className="relative flex min-h-svh flex-col bg-(--ek-paper) text-(--ek-ink)">
      <Header />
      <Hero />
      <Statement />
      <Spotlight />
      <ArtistsBand />
      <Services />
      <Footer />
    </main>
  );
}
