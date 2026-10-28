import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, ITEM_TITLE } from "../styles";
import {
  CTA_SERVICES,
  LineArrow,
  MUTED,
  pad,
  ServicePhoto,
  SCREEN,
} from "./shared";

/**
 * 04 — Overlay cards: two tall photographs, six columns each, with a white
 * label card set into the lower left corner of each — number, audience, name,
 * line and the way in. Static, unless dotted.
 */
export function ServicesOverlay({
  dotted = false,
}: {
  /** Show the photographs as grey halftones that clear on hover, as the dotted hero does. */
  dotted?: boolean;
}) {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink)", SCREEN, SANS)}
    >
      <div className={cn(GRID, "gap-y-4 lg:min-h-0 lg:flex-1 lg:gap-y-5")}>
        {CTA_SERVICES.map((service, index) => (
          <a
            key={service.key}
            href={service.cta.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "relative col-span-4 block lg:col-span-6 lg:h-full",
              dotted && "group",
            )}
          >
            <ServicePhoto
              service={service}
              sizes="(min-width: 1024px) 50vw, 100vw"
              dotted={dotted}
              className="aspect-[4/5] lg:aspect-auto lg:h-full"
            />
            <span className="absolute right-4 bottom-4 left-4 block bg-white p-5 sm:right-auto sm:w-[78%] lg:bottom-5 lg:left-5 lg:p-6">
              <span className="flex items-baseline justify-between gap-x-4">
                <span className="text-[13px] tabular-nums">
                  {pad(index + 1)}
                </span>
                <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
                  {service.eyebrow}
                </span>
              </span>
              <span className={cn(ITEM_TITLE, "mt-4 block")}>
                {service.title}
              </span>
              <span className="mt-2 block text-[15px] leading-[1.45]">
                {service.body}
              </span>
              <span className="mt-5 flex items-center justify-between pt-3 text-[14px]">
                {service.cta.label}
                <LineArrow />
              </span>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
