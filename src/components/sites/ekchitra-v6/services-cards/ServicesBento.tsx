import { cn } from "@/lib/utils";

import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { CONTACT } from "../data";
import { GRID, ITEM_TITLE } from "../styles";
import {
  CTA_SERVICES,
  INTRO,
  LineArrow,
  MUTED,
  pad,
  SCREEN,
  ServicePhoto,
  type Service,
} from "./shared";

/** A cell's frame: a third of the grid, equal height in its row. */
const CELL = "col-span-4 lg:col-span-4";

/**
 * 03 — Bento: a 3 × 2 chequerboard on equal columns, so every edge lines up.
 * Top row: the heading and line, the Bespoke photograph, the Bespoke card.
 * Bottom row: the Advisory photograph, the Advisory card, and a black cell
 * to talk to the curator. Each photograph sits just before its own card, and
 * pictures and words alternate. Static; fits one screen on desktop.
 */
export function ServicesBento() {
  const [bespoke, advisory] = CTA_SERVICES;

  const card = (service: Service, index: number) => (
    <a
      href={service.cta.href}
      target="_blank"
      rel="noreferrer"
      className={cn(
        CELL,
        "flex min-h-[280px] flex-col border border-(--k-ink)/15 bg-white p-5 hover:border-(--k-ink) lg:min-h-0 lg:p-7",
      )}
    >
      <span className="flex items-baseline justify-between gap-x-4">
        <span className="text-[13px] tabular-nums">{pad(index + 1)}</span>
        <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
          {service.eyebrow}
        </span>
      </span>
      <span className="mt-auto block pt-8">
        <span className={cn(ITEM_TITLE, "block")}>{service.title}</span>
        <span className="mt-3 block text-[15px] leading-[1.45]">
          {service.body}
        </span>
        <span className="mt-5 flex items-center justify-between border-t border-(--k-ink)/15 pt-3 text-[14px]">
          {service.cta.label}
          <LineArrow />
        </span>
      </span>
    </a>
  );

  const photo = (service: Service) => (
    <ServicePhoto
      service={service}
      sizes="(min-width: 1024px) 33vw, 100vw"
      className={cn(CELL, "aspect-[4/3] lg:aspect-auto lg:h-full")}
    />
  );

  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink)", SCREEN, SANS)}
    >
      <div
        className={cn(
          GRID,
          "gap-y-4 lg:min-h-0 lg:flex-1 lg:grid-rows-2 lg:gap-y-5",
        )}
      >
        {/* Top row: heading, Bespoke photo, Bespoke card. */}
        <div
          className={cn(
            CELL,
            "flex flex-col justify-between gap-y-8 border border-(--k-ink)/15 p-5 lg:p-7",
          )}
        >
          <p className={cn(CAPS, "text-[11px]", MUTED)}>Services</p>
          <div>
            <h2 className={TITLE}>{INTRO.title}</h2>
            <p className="mt-4 text-[15px] leading-[1.45] text-(--k-ink)/75">
              {INTRO.body}
            </p>
          </div>
        </div>
        {photo(bespoke)}
        {card(bespoke, 0)}

        {/* Bottom row: Advisory photo, Advisory card, talk to the curator. */}
        {photo(advisory)}
        {card(advisory, 1)}
        <a
          href={CONTACT.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            CELL,
            "flex min-h-[220px] flex-col justify-between bg-(--k-ink) p-5 text-white lg:min-h-0 lg:p-7",
          )}
        >
          <span className={cn(CAPS, "text-[11px] text-white/70")}>
            Not sure where to begin?
          </span>
          <span className="flex items-end justify-between gap-x-4">
            <span className={ITEM_TITLE}>Talk to the curator</span>
            <LineArrow className="mb-2" />
          </span>
        </a>
      </div>
    </section>
  );
}
