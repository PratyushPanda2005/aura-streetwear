import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Chars } from "@/components/sites/ekchitra-v5/Chars";
import { CAPS, SANS, TITLE } from "@/components/sites/ekchitra-v5/shared";
import { ServicesColumns } from "@/components/sites/ekchitra-v6/services-variants/ServicesColumns";
import { ServicesGrid } from "@/components/sites/ekchitra-v6/services-variants/ServicesGrid";
import { ServicesIndex } from "@/components/sites/ekchitra-v6/services-variants/ServicesIndex";
import { ServicesRows } from "@/components/sites/ekchitra-v6/services-variants/ServicesRows";
import { ServicesSheet } from "@/components/sites/ekchitra-v6/services-variants/ServicesSheet";
import { ServicesTabs } from "@/components/sites/ekchitra-v6/services-variants/ServicesTabs";
import { GRID } from "@/components/sites/ekchitra-v6/styles";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { Index } from "@/components/sites/ekchitra-v6/ui";
import { FooterLedger } from "@/components/sites/ekchitra-v6/footer-variants/FooterLedger";

export const metadata: Metadata = {
  title: "What we do — variations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Columns",
    note: "The three services side by side, read across like a menu.",
    body: <ServicesColumns />,
  },
  {
    name: "Index",
    note: "Large numbered rows; click one to open its picture and details.",
    body: <ServicesIndex />,
  },
  {
    name: "Tabs",
    note: "Names down the left; the chosen service fills the right.",
    body: <ServicesTabs />,
  },
  {
    name: "Rows",
    note: "Picture and words, swapping sides from row to row.",
    body: <ServicesRows />,
  },
  {
    name: "Sheet",
    note: "Black, no pictures — a spec-sheet table on the grid.",
    body: <ServicesSheet />,
  },
  {
    name: "Grid",
    note: "The three services as cells of one block, like the hero — pictures and words in a chequerboard.",
    body: <ServicesGrid />,
  },
];

/**
 * Five monochrome takes on the homepage's What we do section, each on the
 * Swiss grid under the section's heading, to choose from before one goes
 * on the homepage.
 */
export default function ServicesVariationsPage() {
  return (
    <main className={cn("min-h-svh bg-white pb-24 text-(--k-ink)", SANS)}>
      <TopBar />
      {VARIATIONS.map((variation, index) => (
        <section key={variation.name} className="pb-20 lg:pb-28">
          <p
            className={cn(
              CAPS,
              "bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Variation {String(index + 1).padStart(2, "0")} — {variation.name}
            <span className="tracking-normal text-white/60 normal-case">
              {" "}
              · {variation.note}
            </span>
          </p>
          <div className={cn(GRID, "pt-12 pb-6 lg:pt-16 lg:pb-8")}>
            <div className="col-span-4 lg:col-span-7">
              <Index n={2} label="What we do" />
              <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
                <Chars text="Art for spaces, minds & souls" />
              </h2>
            </div>
          </div>
          {variation.body}
        </section>
      ))}
      <FooterLedger />
    </main>
  );
}
