import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "@/components/sites/ekchitra-v5/shared";
import { ContactAddress } from "@/components/sites/ekchitra-v6/contact-variants/ContactAddress";
import { ContactSignal } from "@/components/sites/ekchitra-v6/contact-variants/ContactSignal";
import { ContactStudio } from "@/components/sites/ekchitra-v6/contact-variants/ContactStudio";

export const metadata: Metadata = {
  title: "Contact — variations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Studio",
    note: "After orchid — a big question, details card and form, an FAQ, the glass flower to close.",
    body: <ContactStudio />,
  },
  {
    name: "Signal",
    note: "After leeroy — a white column cut out of a band of blue silk gradient, underlined fields.",
    body: <ContactSignal />,
  },
  {
    name: "Address",
    note: "After le fruit — one screen: “Contact” huge, a square photo, the email enormous and bold.",
    body: <ContactAddress />,
  },
];

/**
 * Three layouts for the v6 contact page, each after a reference site and
 * still carrying that site's own pictures and gradient as placeholders,
 * stacked with a label above each to choose from.
 */
export default function ContactVariationsPage() {
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
            Contact {String(index + 1).padStart(2, "0")} — {variation.name}
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
