import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { About } from "@/components/sites/ekchitra-v7/About";
import { Artists } from "@/components/sites/ekchitra-v7/Artists";
import { Cta } from "@/components/sites/ekchitra-v7/Cta";
import { Exhibitions } from "@/components/sites/ekchitra-v7/Exhibitions";
import { Footer } from "@/components/sites/ekchitra-v7/Footer";
import { Header } from "@/components/sites/ekchitra-v7/Header";
import { Hero } from "@/components/sites/ekchitra-v7/Hero";
import { Services } from "@/components/sites/ekchitra-v7/Services";

export const metadata: Metadata = {
  title: "EkChitra — Contemporary Indian Art Gallery, Hyderabad",
  description:
    "EkChitra is a contemporary Indian art gallery in Hyderabad: exhibitions, art advisory and art for spaces.",
};

export default function EkchitraV7Page() {
  return (
    <>
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Artists />
        <Exhibitions />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
