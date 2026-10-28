import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { CtaExpand } from "@/components/sites/ekchitra-v6/cta-variants/CtaExpand";
import { CtaMosaic } from "@/components/sites/ekchitra-v6/cta-variants/CtaMosaic";
import { CtaStack } from "@/components/sites/ekchitra-v6/cta-variants/CtaStack";
import { CtaTabs } from "@/components/sites/ekchitra-v6/cta-variants/CtaTabs";
import { CtaTiles } from "@/components/sites/ekchitra-v6/cta-variants/CtaTiles";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";

export const metadata: Metadata = {
  title: "Services calls to action — variations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Image tiles",
    note: "Two full-bleed photographs, each with a white label card in its corner, as the hero sets its cells.",
    body: <CtaTiles />,
  },
  {
    name: "Expanding panels",
    note: "Two picture panels; the one under the pointer widens and shows what it covers.",
    body: <CtaExpand />,
  },
  {
    name: "Swiss mosaic",
    note: "The hero's own cell grid — name, picture, a black cell, a navy or maroon cell to begin.",
    body: <CtaMosaic />,
  },
  {
    name: "Tabs",
    note: "The two names as a pair of large tabs; the picture and details below change with them.",
    body: <CtaTabs />,
  },
  {
    name: "Stacking cards",
    note: "Two full-screen cards that pin; the second slides up over the first as you scroll.",
    body: <CtaStack />,
  },
];

/**
 * Five more calls to action (06–10; 01–05 were set aside) for the v6
 * homepage's two services — Bespoke sourcing
 * and Art advisory — each on the Swiss grid, stacked with a label above each
 * to choose from.
 */
export default function CtaVariationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
      {VARIATIONS.map((variation, index) => (
        <section key={variation.name}>
          <p
            className={cn(
              CAPS,
              "bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            CTA {String(index + 6).padStart(2, "0")} — {variation.name}
            <span className="normal-case tracking-normal text-white/60">
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
