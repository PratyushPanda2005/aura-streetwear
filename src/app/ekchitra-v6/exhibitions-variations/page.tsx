import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { ExhibitionsIndex } from "@/components/sites/ekchitra-v6/ExhibitionsIndex";
import { ExArchive } from "@/components/sites/ekchitra-v6/exhibitions-variants/ExArchive";
import { ExFeature } from "@/components/sites/ekchitra-v6/exhibitions-variants/ExFeature";
import { ExGrid } from "@/components/sites/ekchitra-v6/exhibitions-variants/ExGrid";
import { ExList } from "@/components/sites/ekchitra-v6/exhibitions-variants/ExList";
import { ExStrip } from "@/components/sites/ekchitra-v6/exhibitions-variants/ExStrip";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";

export const metadata: Metadata = {
  title: "Exhibitions — variations",
  robots: { index: false },
};

const VARIATIONS: { n: string; name: string; note: string; body: ReactNode }[] =
  [
    {
      n: "00",
      name: "Current",
      note: "What the homepage has now, for comparison — posters wiping over a dark scene, with the sticky panel.",
      body: <ExhibitionsIndex />,
    },
    {
      n: "01",
      name: "List and preview",
      note: "Poster in columns 1–6; the shows as ruled rows in 7–12 — hover a row to change the poster.",
      body: <ExList />,
    },
    {
      n: "02",
      name: "Poster grid",
      note: "Six shows in three columns: poster, number and status, title, dates.",
      body: <ExGrid />,
    },
    {
      n: "03",
      name: "Featured and table",
      note: "The current show large with its details beside it, then the next five as a ruled table.",
      body: <ExFeature />,
    },
    {
      n: "04",
      name: "Swiss archive table",
      note: "Every exhibition as one table under column heads — small poster, number, title, dates, status.",
      body: <ExArchive />,
    },
    {
      n: "05",
      name: "Scrolling strip",
      note: "Cards four columns wide that scroll sideways and snap, with two square arrows above.",
      body: <ExStrip />,
    },
  ];

/**
 * Exhibitions section variations for the v6 homepage, on the Swiss grid in
 * white and brand black, stacked with a label above each to choose from.
 */
export default function ExhibitionsVariationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
      {VARIATIONS.map((variation) => (
        <section key={variation.name}>
          <p
            className={cn(
              CAPS,
              "bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Exhibitions {variation.n} — {variation.name}
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
