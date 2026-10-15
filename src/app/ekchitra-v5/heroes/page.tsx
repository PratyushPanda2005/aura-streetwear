import type { Metadata } from "next";

import { cn } from "@/lib/utils";
import { SmoothScroll } from "@/components/sites/ekchitra-v3/SmoothScroll";
import { HeroCollage } from "@/components/sites/ekchitra-v5/heroes/HeroCollage";
import { HeroField } from "@/components/sites/ekchitra-v5/heroes/HeroField";
import { HeroGrid } from "@/components/sites/ekchitra-v5/heroes/HeroGrid";
import { HeroMonolith } from "@/components/sites/ekchitra-v5/heroes/HeroMonolith";
import { HeroSplit } from "@/components/sites/ekchitra-v5/heroes/HeroSplit";
import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";

export const metadata: Metadata = {
  title: "Hero studies — EkChitra",
  description: "Five directions for the EkChitra homepage hero.",
  robots: { index: false },
};

const STUDIES = [
  { id: "split", label: "Split wall", ref: "noho.ink" },
  { id: "grid", label: "Swiss grid", ref: "aspensearch.com" },
  { id: "collage", label: "Collage", ref: "stateofaidesign.com" },
  { id: "monolith", label: "Monolith", ref: "likova.space" },
  { id: "field", label: "Field", ref: "sanrita.ca" },
];

/**
 * Five directions for the homepage hero, one after another, each a full
 * screen (the scroll-driven ones run longer). A small switcher pinned to the
 * right edge of the screen jumps between them and names the reference each one
 * starts from.
 */
export default function EkchitraV5HeroStudiesPage() {
  return (
    <main className="bg-white text-(--k-ink)">
      <SmoothScroll />
      <HeroSplit />
      <HeroGrid />
      <HeroCollage />
      <HeroMonolith />
      <HeroField />

      <nav
        aria-label="Hero studies"
        className={cn(
          "fixed top-1/2 right-3 z-50 -translate-y-1/2 bg-(--k-ink)/90 p-1 text-white backdrop-blur",
          SANS,
        )}
      >
        <ul className="flex flex-col">
          {STUDIES.map((study, index) => (
            <li key={study.id}>
              <a
                href={`#${study.id}`}
                title={`After ${study.ref}`}
                className="flex items-center gap-x-2 px-3 py-2 text-[12px] transition-colors hover:bg-white/10 lg:px-4"
              >
                <span className={cn(CAPS, "text-[10px] text-white/50")}>
                  0{index + 1}
                </span>
                <span className="hidden lg:inline">{study.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
