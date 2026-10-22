import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import {
  CuratorBanner,
  CuratorCentred,
  CuratorCurrent,
  CuratorDark,
  CuratorQuote,
  CuratorSheet,
  CuratorShows,
} from "@/components/sites/ekchitra-v6/about/CuratorVariants";

export const metadata: Metadata = {
  title: "Curator section — variations",
  robots: { index: false },
};

const VARIATIONS: { n: string; name: string; note: string; body: ReactNode }[] =
  [
    {
      n: "00",
      name: "Current",
      note: "Words pinned on the left, the portrait tall on the right.",
      body: <CuratorCurrent />,
    },
    {
      n: "01",
      name: "Pull quote",
      note: "Her line set very large across the page; portrait, name and bio beneath.",
      body: <CuratorQuote />,
    },
    {
      n: "02",
      name: "Portrait banner",
      note: "The portrait full width, her name over it, a frosted card with the bio.",
      body: <CuratorBanner />,
    },
    {
      n: "03",
      name: "Centred profile",
      note: "Square portrait, name and lead centred, the bio as one narrow column.",
      body: <CuratorCentred />,
    },
    {
      n: "04",
      name: "On brand black",
      note: "Black-and-white portrait, her name large in white, and three figures.",
      body: <CuratorDark />,
    },
    {
      n: "05",
      name: "Fact sheet",
      note: "A Swiss table of her details beside the portrait, the bio in two columns.",
      body: <CuratorSheet />,
    },
    {
      n: "06",
      name: "Curator and her shows",
      note: "Portrait and bio on the left, every exhibition she curated on the right.",
      body: <CuratorShows />,
    },
  ];

/** Designs for the About page's curator section, stacked to compare. */
export default function CuratorVariationsPage() {
  return (
    <main className={cn("bg-white text-(--k-ink)", SANS)}>
      {VARIATIONS.map((variation) => (
        <section key={variation.n} className="pb-20 lg:pb-28">
          <p
            className={cn(
              CAPS,
              "mb-12 bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Curator {variation.n} — {variation.name}
            <span className="normal-case tracking-normal text-white/70">
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
