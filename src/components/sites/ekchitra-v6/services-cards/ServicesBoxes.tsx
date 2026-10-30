import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { ITEM_TITLE } from "../styles";
import { CTA_SERVICES, LineArrow, pad, type Service } from "./shared";
import { ServicesIntro } from "./ServicesIntro";

/** Each service box's ground, in order: brand black, then white. */
const TONES = [
  { ground: "bg-(--k-ink) text-white", muted: "text-white/70" },
  { ground: "bg-white text-(--k-ink)", muted: "text-(--k-ink)/65" },
];

/**
 * 08 — Boxes. Three boxes in a row on hairlines — the heading and line
 * in white over a darkened photograph (see ServicesIntro); then each service (Bespoke on
 * black, Advisory on white) with its number, audience, name, line and way
 * in; each service's whole box is its link. Stacks on phones.
 */
export function ServicesBoxes() {
  const card = (service: Service, index: number) => {
    const tone = TONES[index % TONES.length];
    return (
      <a
        key={service.key}
        href={service.cta.href}
        target="_blank"
        rel="noreferrer"
        className={cn(
          "group/card flex min-h-[320px] flex-col justify-between p-5 lg:min-h-[440px] lg:col-span-4 lg:p-7",
          tone.ground,
        )}
      >
        <span className="flex items-baseline justify-between gap-x-4">
          <span className="text-[13px] tabular-nums">{pad(index + 1)}</span>
          <span className={cn(CAPS, "text-right text-[11px]", tone.muted)}>
            {service.eyebrow}
          </span>
        </span>
        <span className="block pt-10">
          <span className={cn(ITEM_TITLE, "block")}>{service.title}</span>
          <span className="mt-3 block max-w-[360px] text-[15px] leading-[1.45]">
            {service.body}
          </span>
          <span className="mt-6 flex items-center justify-between border-t border-current/20 pt-4 text-[14px]">
            {service.cta.label}
            <LineArrow className="transition-transform duration-300 group-hover/card:translate-x-1" />
          </span>
        </span>
      </a>
    );
  };

  return (
    <section
      aria-label="Services"
      className={cn(
        "bg-white px-4 py-16 text-(--k-ink) lg:px-5 lg:py-24",
        SANS,
      )}
    >
      <div className="grid grid-cols-1 gap-px border border-(--k-ink)/12 bg-(--k-ink)/12 lg:grid-cols-12">
        <ServicesIntro className="lg:col-span-4" />
        {CTA_SERVICES.map(card)}
      </div>
    </section>
  );
}
