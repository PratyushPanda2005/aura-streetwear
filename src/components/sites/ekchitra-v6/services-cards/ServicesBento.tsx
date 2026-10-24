import { cn } from "@/lib/utils";

import { CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { GRID, ITEM_TITLE } from "../styles";
import {
  CTA_SERVICES,
  INTRO,
  LineArrow,
  MUTED,
  pad,
  SCREEN,
  ServicePhoto,
} from "./shared";

/**
 * 03 — Bento: one block of cells on the grid. A sand cell holds the heading
 * and line; a white cell per service holds its number, audience, name, line
 * and way in; and the two photographs fill the cells between, so pictures
 * and words alternate like a chequerboard. Static.
 */
export function ServicesBento() {
  const [first, second] = CTA_SERVICES;

  const textCell = (service: (typeof CTA_SERVICES)[number], index: number) => (
    <a
      href={service.cta.href}
      target="_blank"
      rel="noreferrer"
      className="flex min-h-[300px] flex-col lg:h-full lg:min-h-0 border border-(--k-ink)/15 bg-white p-5 hover:border-(--k-ink) lg:p-7"
    >
      <span className="flex items-baseline justify-between gap-x-4">
        <span className="text-[13px] tabular-nums">{pad(index + 1)}</span>
        <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
          {service.eyebrow}
        </span>
      </span>
      <span className={cn(ITEM_TITLE, "mt-auto block pt-10")}>
        {service.title}
      </span>
      <span className="mt-3 block text-[15px] leading-[1.45]">
        {service.body}
      </span>
      <span className="mt-6 flex items-center justify-between border-t border-(--k-ink)/15 pt-3 text-[14px]">
        {service.cta.label}
        <LineArrow />
      </span>
    </a>
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
        <div className="col-span-4 flex flex-col justify-between bg-(--k-sand) p-5 lg:col-span-5 lg:p-8">
          <p className={cn(CAPS, "text-[11px]", MUTED)}>Services</p>
          <div>
            <h2 className={cn(TITLE, "mt-10")}>{INTRO.title}</h2>
            <p className="mt-4 max-w-[420px] text-[16px] leading-[1.45] text-(--k-ink)/75">
              {INTRO.body}
            </p>
          </div>
        </div>
        <ServicePhoto
          service={first}
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="col-span-4 aspect-[4/3] lg:col-span-7 lg:aspect-auto"
        />
        <div className="col-span-4 lg:col-span-4">{textCell(first, 0)}</div>
        <ServicePhoto
          service={second}
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="col-span-4 aspect-[4/3] lg:col-span-4 lg:aspect-auto"
        />
        <div className="col-span-4 lg:col-span-4">{textCell(second, 1)}</div>
      </div>
    </section>
  );
}
