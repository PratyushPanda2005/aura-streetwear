import type { Metadata } from "next";

import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { ABOUT_HERO } from "@/components/sites/ekchitra-v5/about-data";
import { AboutExhibitions } from "@/components/sites/ekchitra-v5/AboutExhibitions";
import { AboutCurator } from "@/components/sites/ekchitra-v5/AboutCurator";
import { AboutGallery } from "@/components/sites/ekchitra-v5/AboutGallery";
import { AboutStory } from "@/components/sites/ekchitra-v5/AboutStory";
import { AboutValues } from "@/components/sites/ekchitra-v5/AboutValues";
import { Footer } from "@/components/sites/ekchitra-v5/Footer";
import { Header } from "@/components/sites/ekchitra-v5/Header";
import { PageHero } from "@/components/sites/ekchitra-v5/PageHero";

export const metadata: Metadata = {
  title: "About — EkChitra Art Gallery",
  description:
    "EkChitra bridges exceptional contemporary Indian artists and art enthusiasts worldwide. Curated by Annapurna M, Hyderabad.",
};

export default function EkchitraV5AboutPage() {
  return (
    <main className="flex min-h-svh flex-col bg-white text-(--k-ink)">
      <SmoothScroll />
      <Header compact />
      <PageHero
        label={ABOUT_HERO.label}
        title={ABOUT_HERO.title}
        image={ABOUT_HERO.image}
        once
      />
      <AboutStory />
      <AboutGallery />
      <AboutValues />
      <AboutCurator />
      <AboutExhibitions />
      <Footer />
    </main>
  );
}
