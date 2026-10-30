import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { FooterCard } from "@/components/sites/ekchitra-v6/footer-variants/FooterCard";
import { FooterEtching } from "@/components/sites/ekchitra-v6/footer-variants/FooterEtching";
import { FooterGlow } from "@/components/sites/ekchitra-v6/footer-variants/FooterGlow";
import { FooterFade } from "@/components/sites/ekchitra-v6/footer-variants/FooterFade";
import { FooterMark } from "@/components/sites/ekchitra-v6/footer-variants/FooterMark";
import { FooterSmoke } from "@/components/sites/ekchitra-v6/footer-variants/FooterSmoke";
import { FooterTalk } from "@/components/sites/ekchitra-v6/footer-variants/FooterTalk";

export const metadata: Metadata = {
  title: "Footer — variations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Let’s talk",
    note: "After swissbrut — a huge bold line with a small photograph in it.",
    body: <FooterTalk />,
  },
  {
    name: "Fade",
    note: "After ideogram — link columns, then a grey gradient with the name faint and enormous.",
    body: <FooterFade />,
  },
  {
    name: "Wordmark",
    note: "After rejouice — black, a line, links and newsletter, the name across the bottom.",
    body: <FooterMark />,
  },
  {
    name: "Etching",
    note: "After Social Impact Capital — a painting in black and white over a black band.",
    body: <FooterEtching />,
  },
  {
    name: "Smoke",
    note: "After Evmos — a full white top over a notched panel of glossy silk in the brand colours.",
    body: <FooterSmoke />,
  },
  {
    name: "Glow",
    note: "After arrakis — warm near-black, a glowing orange card with drifting light, link columns, a bracketed last line.",
    body: <FooterGlow />,
  },
  {
    name: "Card",
    note: "Short and minimal, type only on black: four small columns and the small print.",
    body: <FooterCard />,
  },
];

/**
 * Seven footers for the v6 homepage, each one screen high and (but for the
 * last) only in black and white, stacked with a label above each to choose from.
 */
export default function FooterVariationsPage() {
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
            Footer {String(index + 1).padStart(2, "0")} — {variation.name}
            <span className="normal-case tracking-normal text-white/60">
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
