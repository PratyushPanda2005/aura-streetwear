import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import {
  CurrentDark,
  CurrentLead,
  CurrentPair,
  CurrentRows,
  CurrentTabs,
} from "@/components/sites/ekchitra-v6/exhibitions/CurrentShows";
import {
  CurrentDeck,
  CurrentDrift,
  CurrentIndex,
  CurrentWipe,
} from "@/components/sites/ekchitra-v6/exhibitions/CurrentShowsMotion";
import { FooterLedger } from "@/components/sites/ekchitra-v6/footer-variants/FooterLedger";

export const metadata: Metadata = {
  title: "Now and upcoming — variations",
  robots: { index: false },
};

const VARIATIONS: { n: string; name: string; note: string; body: ReactNode }[] =
  [
    {
      n: "00",
      name: "The pair (current)",
      note: "Side by side, equal — what the page has now.",
      body: <CurrentPair />,
    },
    {
      n: "01",
      name: "Lead and next",
      note: "What is on now large in eight columns; what comes next smaller in four.",
      body: <CurrentLead />,
    },
    {
      n: "02",
      name: "Alternating rows",
      note: "One full-width row each — poster and details side by side, the second mirrored.",
      body: <CurrentRows />,
    },
    {
      n: "03",
      name: "Tabs",
      note: "“Now on” and “Upcoming” as large tabs; one big poster at a time.",
      body: <CurrentTabs />,
    },
    {
      n: "04",
      name: "On brand black",
      note: "The pair on a black band, so the shows on now stand apart from the archive.",
      body: <CurrentDark />,
    },
    {
      n: "05",
      name: "Wipe",
      note: "Asymmetric pair; each poster opens upwards as it scrolls in, the words rise a beat after.",
      body: <CurrentWipe />,
    },
    {
      n: "06",
      name: "Index and frame",
      note: "Two large title lines; a framed poster cross-fades to the one you point at.",
      body: <CurrentIndex />,
    },
    {
      n: "07",
      name: "Deck",
      note: "Stacked like cards; pointing at the one behind slides it forward.",
      body: <CurrentDeck />,
    },
    {
      n: "08",
      name: "Drift",
      note: "The pair side by side; each poster drifts gently in its frame as you scroll.",
      body: <CurrentDrift />,
    },
  ];

/** Ways to show the exhibitions page's current shows, stacked to compare. */
export default function CurrentVariationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
      {VARIATIONS.map((variation) => (
        <section key={variation.n} className="pb-16 lg:pb-20">
          <p
            className={cn(
              CAPS,
              "mb-10 bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Now and upcoming {variation.n} — {variation.name}
            <span className="normal-case tracking-normal text-white/70">
              {" "}
              · {variation.note}
            </span>
          </p>
          {variation.body}
        </section>
      ))}
      <FooterLedger />
    </main>
  );
}
