import type { Metadata } from "next";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { About } from "@/components/sites/ekchitra-v4/About";
import { Artists } from "@/components/sites/ekchitra-v4/Artists";
import { Cta } from "@/components/sites/ekchitra-v4/Cta";
import { Events } from "@/components/sites/ekchitra-v4/Events";
import { Footer } from "@/components/sites/ekchitra-v4/Footer";
import { Header } from "@/components/sites/ekchitra-v4/Header";
import { Hero } from "@/components/sites/ekchitra-v4/Hero";
import { Note } from "@/components/sites/ekchitra-v4/Note";
import { Services } from "@/components/sites/ekchitra-v4/Services";
import { World } from "@/components/sites/ekchitra-v4/World";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function EkchitraV4Page() {
  return (
    <main className="flex min-h-svh flex-col bg-(--v-bone) text-(--v-ink)">
      <SmoothScroll />
      <Header />
      <Hero />
      <Note />
      <World />
      <About />
      <Events />
      <Artists />
      <Services />
      <Cta />
      <Footer />
    </main>
  );
}
