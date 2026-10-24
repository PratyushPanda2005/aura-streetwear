import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { ServicesAudience } from "@/components/sites/ekchitra-v6/services-cards/ServicesAudience";
import { ServicesChoice } from "@/components/sites/ekchitra-v6/services-cards/ServicesChoice";
import { ServicesEnquiry } from "@/components/sites/ekchitra-v6/services-cards/ServicesEnquiry";
import { ServicesHoverList } from "@/components/sites/ekchitra-v6/services-cards/ServicesHoverList";
import { ServicesLedger } from "@/components/sites/ekchitra-v6/services-cards/ServicesLedger";
import { ServicesMarquee } from "@/components/sites/ekchitra-v6/services-cards/ServicesMarquee";
import { ServicesMosaic } from "@/components/sites/ekchitra-v6/services-cards/ServicesMosaic";
import { ServicesNocturne } from "@/components/sites/ekchitra-v6/services-cards/ServicesNocturne";
import { ServicesSticky } from "@/components/sites/ekchitra-v6/services-cards/ServicesSticky";
import { ServicesTwinCards } from "@/components/sites/ekchitra-v6/services-cards/ServicesTwinCards";
import { ServicesTypeFill } from "@/components/sites/ekchitra-v6/services-cards/ServicesTypeFill";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";

export const metadata: Metadata = {
  title: "Services — iterations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Ledger",
    note: "After goodman-gallery.com/contact — a ruled row: label, two quiet text cards and a picture card that crossfades on hover.",
    body: <ServicesLedger />,
  },
  {
    name: "Twin cards",
    note: "Two large cards, six columns each; pictures unveil upwards as they scroll in.",
    body: <ServicesTwinCards />,
  },
  {
    name: "Hover list",
    note: "Huge ruled rows; a picture floats with the pointer and the row opens to its details.",
    body: <ServicesHoverList />,
  },
  {
    name: "Sticky split",
    note: "A picture held on the left; it crossfades as each service scrolls past on the right.",
    body: <ServicesSticky />,
  },
  {
    name: "Nocturne",
    note: "Black, two framed cards with no pictures at rest — the photograph rises through a card on hover.",
    body: <ServicesNocturne />,
  },
  // 06–11: patterns from cta.gallery, rebuilt in EkChitra's grid and brand.
  {
    name: "Choice tiles",
    note: "After cta.gallery / Wearedirect — two tall tiles, sand and navy; the photograph is unveiled on hover.",
    body: <ServicesChoice />,
  },
  {
    name: "Audience switch",
    note: "After cta.gallery / Lockerland — “I’m a collector / an architect…” as tabs that swap the picture and details.",
    body: <ServicesAudience />,
  },
  {
    name: "Marquee",
    note: "After cta.gallery / Kronborg — each name runs on in huge type; hover pauses the row and fills it black.",
    body: <ServicesMarquee />,
  },
  {
    name: "Mosaic",
    note: "After cta.gallery / Thenavia — a drifting wall of EkChitra’s works behind one white card holding both services.",
    body: <ServicesMosaic />,
  },
  {
    name: "Type fill",
    note: "After cta.gallery / Augustus, Jemini — giant capitals that fill with the service’s photograph on hover.",
    body: <ServicesTypeFill />,
  },
  {
    name: "Enquiry",
    note: "After cta.gallery / Sapphicindex — choose a service, write a line, continue on WhatsApp with the message ready.",
    body: <ServicesEnquiry />,
  },
];

/**
 * Eleven iterations of the v6 homepage's services section (Bespoke sourcing
 * and Art advisory) — 06–11 after patterns on cta.gallery — all on the Swiss
 * grid with the house motion, stacked under labels to choose from before one
 * replaces the expanding panels.
 */
export default function ServicesIterationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
      <SmoothScroll />
      <TopBar />
      {VARIATIONS.map((variation, index) => (
        <section key={variation.name}>
          <p
            className={cn(
              CAPS,
              "bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Iteration {String(index + 1).padStart(2, "0")} — {variation.name}
            <span className="tracking-normal text-white/60 normal-case">
              {" "}
              · {variation.note}
            </span>
          </p>
          {variation.body}
        </section>
      ))}
    </main>
  );
}
