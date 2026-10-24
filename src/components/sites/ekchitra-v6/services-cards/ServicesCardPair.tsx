import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { BUTTON, GRID, ITEM_TITLE } from "../styles";
import {
  CTA_SERVICES,
  Covers,
  MUTED,
  pad,
  ServicePhoto,
  SCREEN,
} from "./shared";

/**
 * 01 — Card pair: the two services as matching cards, six columns each, in a
 * fine hairline frame — photograph on top, then the number and audience, the
 * name, the line, what it covers and a button. Static.
 */
export function ServicesCardPair() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink)", SCREEN, SANS)}
    >
      <div className={cn(GRID, "gap-y-4 lg:min-h-0 lg:flex-1 lg:gap-y-5")}>
        {CTA_SERVICES.map((service, index) => (
          <article
            key={service.key}
            className="col-span-4 flex flex-col border border-(--k-ink)/15 lg:col-span-6 lg:min-h-0"
          >
            <ServicePhoto
              service={service}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[3/2] lg:aspect-auto lg:min-h-0 lg:flex-1"
            />
            <div className="flex flex-col p-5 lg:p-8">
              <p className="flex items-baseline justify-between gap-x-4">
                <span className="text-[13px] tabular-nums">
                  {pad(index + 1)}
                </span>
                <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
                  {service.eyebrow}
                </span>
              </p>
              <h3 className={cn(ITEM_TITLE, "mt-6")}>{service.title}</h3>
              <p className="mt-3 max-w-[460px] text-[16px] leading-[1.45]">
                {service.body}
              </p>
              <Covers items={service.covers} className="mt-4" />
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                className={cn(BUTTON, "mt-8")}
              >
                {service.cta.label}
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
