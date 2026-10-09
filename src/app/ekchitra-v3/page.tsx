import type { Metadata } from "next";
import { About } from "@/components/sites/ekchitra-v3/About";
import { Artists } from "@/components/sites/ekchitra-v3/Artists";
import { ArtworkStrip } from "@/components/sites/ekchitra-v3/ArtworkStrip";
import { Events } from "@/components/sites/ekchitra-v3/Events";
import { Footer } from "@/components/sites/ekchitra-v3/Footer";
import { Header } from "@/components/sites/ekchitra-v3/Header";
import { Hero } from "@/components/sites/ekchitra-v3/Hero";
import { Loader } from "@/components/sites/ekchitra-v3/Loader";
import { Services } from "@/components/sites/ekchitra-v3/Services";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function EkchitraV3Page() {
  return (
    <main className="flex min-h-svh flex-col bg-(--ek-paper) text-(--ek-ink)">
      <SmoothScroll />
      <Loader />
      <Header />
      <Hero />
      <About />
      <Events />
      <Artists />
      <Services />
      <ArtworkStrip />
      <Footer />
    </main>
  );
}
