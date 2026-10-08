import type { Metadata } from "next";
import { AboutSection } from "@/components/sites/ekchitra-redesign/AboutSection";
import { ArtistsSection } from "@/components/sites/ekchitra-redesign/ArtistsSection";
import { BrandStripe } from "@/components/sites/ekchitra-redesign/design-system";
import { EventsSection } from "@/components/sites/ekchitra-redesign/EventsSection";
import { HeroSection } from "@/components/sites/ekchitra-redesign/HeroSection";
import { ParallaxImage } from "@/components/sites/ekchitra-redesign/ParallaxImage";
import { ServicesSection } from "@/components/sites/ekchitra-redesign/ServicesSection";
import { SiteFooter } from "@/components/sites/ekchitra-redesign/SiteFooter";
import { SiteHeader } from "@/components/sites/ekchitra-redesign/SiteHeader";

export const metadata: Metadata = {
  title: "EkChitra Art Gallery — Hyderabad",
  description:
    "A contemporary Indian art gallery for the curious — welcoming, thoughtful and open to everyone.",
};

export default function EkchitraRedesignPage() {
  return (
    <main className="flex min-h-svh flex-col bg-(--ek-paper) text-(--ek-ink)">
      <SiteHeader />
      <HeroSection />
      <AboutSection />
      <BrandStripe />
      <EventsSection />
      <BrandStripe />
      <ArtistsSection />
      <ParallaxImage />
      <ServicesSection />
      <SiteFooter />
    </main>
  );
}
