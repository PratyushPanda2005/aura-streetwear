import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { ExAgendaPanels } from "@/components/sites/ekchitra-v6/exhibitions-home/ExAgendaPanels";
import { ExCheckerCards } from "@/components/sites/ekchitra-v6/exhibitions-home/ExCheckerCards";
import { ExIndexReel } from "@/components/sites/ekchitra-v6/exhibitions-home/ExIndexReel";
import { ExLedgerRows } from "@/components/sites/ekchitra-v6/exhibitions-home/ExLedgerRows";
import { SmoothScroll } from "@/components/sites/ekchitra-v6/SmoothScroll";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";

export const metadata: Metadata = {
  title: "Exhibitions — iterations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Ledger rows",
    note: "After goodman-gallery.com — title and dates held at the left while each large poster passes on the right.",
    body: <ExLedgerRows />,
  },
  {
    name: "Checker cards",
    note: "After nova-dental (webflow) — staggered square cards; a small poster window opens to fill the card on hover.",
    body: <ExCheckerCards />,
  },
  {
    name: "Index reel",
    note: "After east64films.com — centred: the section holds while the index slides past the poster's centre line, split either side.",
    body: <ExIndexReel />,
  },
  {
    name: "Agenda panels",
    note: "After the agenda on chandebootcamp.com, in the house style — compact white panels, chips to jump between shows, lines that slide up in turn.",
    body: <ExAgendaPanels />,
  },
];

/**
 * Four iterations of the v6 homepage's exhibitions section, each after a
 * reference site, rebuilt on the Swiss grid with the house motion and the
 * gallery's full-bleed posters, stacked under labels to choose from.
 */
export default function ExhibitionsHomeIterationsPage() {
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
      <FooterSmoke dark />
    </main>
  );
}
