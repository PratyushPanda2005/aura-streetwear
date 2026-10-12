import type { Metadata } from "next";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { Artists } from "@/components/sites/ekchitra-v5/Artists";
import { Exhibitions } from "@/components/sites/ekchitra-v5/Exhibitions";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";
import { Hero } from "@/components/sites/ekchitra-v5/Hero";
import { Services } from "@/components/sites/ekchitra-v5/Services";
import { Statement } from "@/components/sites/ekchitra-v5/Statement";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function EkchitraV5Page() {
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header />
      <Hero />
      <Statement />
      <Exhibitions />
      <Artists />
      <Services />
      <Footer />
    </main>
  );
}
