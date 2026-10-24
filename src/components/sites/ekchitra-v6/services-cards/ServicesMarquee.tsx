"use client";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { CTA_SERVICES, LineArrow, pad } from "./shared";

/** How many times the name repeats in each half of the track. */
const REPEATS = 4;

/**
 * 08 — Marquee, after the repeating type on cta.gallery (Kronborg): each
 * service is one full-width row whose name runs on without end in huge type —
 * the first leftwards, the second rightwards. Hovering (or focusing) a row
 * pauses it, fills it brand black and brings in a bar with the number,
 * audience, line and the way in. Held still for reduced motion.
 */
export function ServicesMarquee() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      {CTA_SERVICES.map((service, index) => (
        <InView key={service.key} delay={index * 140}>
          <a
            href={service.cta.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "ek6-rise group relative block overflow-hidden border-t border-(--k-ink) transition-colors duration-500 last:border-b hover:bg-(--k-ink) hover:text-white focus-visible:bg-(--k-ink) focus-visible:text-white focus-visible:outline-none",
              EASE,
            )}
          >
            <span className="sr-only">
              {service.title} — {service.eyebrow}. {service.cta.label}
            </span>

            {/* The running name: the phrase twice over, slid by half. */}
            <span
              aria-hidden="true"
              className={cn(
                "ek6-marquee flex w-max py-5 lg:py-7",
                index % 2 === 1 &&
                  "[--marquee-direction:reverse] [--marquee-duration:46s]",
              )}
            >
              {Array.from({ length: REPEATS * 2 }, (_, n) => (
                <span
                  key={n}
                  className="flex shrink-0 items-center gap-x-[0.35em] pr-[0.35em] text-[64px] leading-none tracking-[-0.045em] whitespace-nowrap lg:text-[8vw]"
                >
                  {service.title}
                  <span className="inline-block size-[0.16em] rotate-45 bg-current" />
                </span>
              ))}
            </span>

            {/* Details, rising in under the pointer. */}
            <span
              aria-hidden="true"
              className={cn(
                "grid grid-cols-1 gap-3 px-4 pb-5 text-[14px] transition-[opacity,translate] duration-500 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-x-8 lg:px-5 lg:pb-7 lg:opacity-0 lg:translate-y-2 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-visible:translate-y-0 lg:group-focus-visible:opacity-100",
                EASE,
              )}
            >
              <span className="flex items-baseline gap-x-3">
                <span className="tabular-nums">{pad(index + 1)}</span>
                <span className={cn(CAPS, "text-[11px] opacity-80")}>
                  {service.eyebrow}
                </span>
              </span>
              <span className="opacity-85">{service.body}</span>
              <span className="flex items-center gap-x-4">
                {service.cta.label}
                <LineArrow />
              </span>
            </span>
          </a>
        </InView>
      ))}
    </section>
  );
}
