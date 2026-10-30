import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { ServicesBento } from "@/components/sites/ekchitra-v6/services-cards/ServicesBento";
import { ServicesBoxes } from "@/components/sites/ekchitra-v6/services-cards/ServicesBoxes";
import { ServicesCardPair } from "@/components/sites/ekchitra-v6/services-cards/ServicesCardPair";
import { ServicesColumns } from "@/components/sites/ekchitra-v6/services-cards/ServicesColumns";
import { ServicesPanels } from "@/components/sites/ekchitra-v6/services-cards/ServicesPanels";
import { ServicesOverlay } from "@/components/sites/ekchitra-v6/services-cards/ServicesOverlay";
import { ServicesSplitList } from "@/components/sites/ekchitra-v6/services-cards/ServicesSplitList";
import { ServicesTable } from "@/components/sites/ekchitra-v6/services-cards/ServicesTable";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";

export const metadata: Metadata = {
  title: "Services — iterations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Card pair",
    note: "Two matching framed cards — photograph, name, line, what it covers, button.",
    body: <ServicesCardPair />,
  },
  {
    name: "Table",
    note: "No pictures — a ruled spec sheet: service, who it's for, what it is, what it covers.",
    body: <ServicesTable />,
  },
  {
    name: "Bento",
    note: "A 3 × 2 chequerboard on equal columns — heading, photo, card / photo, card, talk to the curator.",
    body: <ServicesBento />,
  },
  {
    name: "Overlay cards",
    note: "Two tall photographs, each with a white label card in its lower corner.",
    body: <ServicesOverlay />,
  },
  {
    name: "Columns",
    note: "No pictures — heading, then both services as columns under a black rule.",
    body: <ServicesColumns />,
  },
  {
    name: "Split list",
    note: "One photograph on the left; the line and both services as ruled rows on the right.",
    body: <ServicesSplitList />,
  },
  {
    name: "Three panels",
    note: "Edge to edge: a narrow column with the heading, one large photograph, and the two services as stacked white and black cells.",
    body: <ServicesPanels />,
  },
  {
    name: "Boxes",
    note: "Three boxes on hairlines: heading over a darkened photograph, Bespoke on black, Advisory on white.",
    body: <ServicesBoxes />,
  },
];

/**
 * Eight static iterations of the v6 homepage's services section (Bespoke
 * sourcing and Art advisory) — cards and grids on the Swiss grid, no
 * animation — stacked under labels to choose from.
 */
export default function ServicesIterationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
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
      <FooterSmoke dark />
    </main>
  );
}
