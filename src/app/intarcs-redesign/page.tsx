import type { Metadata } from "next";
import { ClientsSection } from "@/components/sites/intarcs-redesign/ClientsSection";
import { SiteFooter } from "@/components/sites/intarcs-redesign/SiteFooter";
import { HeroSection } from "@/components/sites/intarcs-redesign/HeroSection";
import { MethodSection } from "@/components/sites/intarcs-redesign/MethodSection";
import { ProjectsSection } from "@/components/sites/intarcs-redesign/ProjectsSection";
import { VoicesSection } from "@/components/sites/intarcs-redesign/VoicesSection";

export const metadata: Metadata = {
  title: "STUDIO — Architecture & Spatial Design Practice",
  description:
    "STUDIO is an architectural & spatial design practice crafting monolithic structures, refined interiors, and enduring physical spaces worldwide.",
};

export default function IntarcsRedesignPage() {
  return (
    <main className="flex min-h-svh flex-col bg-[#0a0a0a]">
      <HeroSection />
      <ProjectsSection />
      <MethodSection />
      <VoicesSection />
      <ClientsSection />
      <SiteFooter />
    </main>
  );
}
