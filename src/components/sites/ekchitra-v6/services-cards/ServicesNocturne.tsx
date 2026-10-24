"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { GRID, SECTION_TITLE } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, Covers, LineArrow, pad } from "./shared";

/**
 * 06 — Nocturne: brand black, two hairline-framed cards of six columns each,
 * no pictures at rest — just the number, audience, name, line, what it covers
 * and the way in. On hover (or focus) the service's photograph rises up
 * through the card from its foot under a dark veil, the frame brightens and
 * the arrow steps right; on a phone the photograph sits faintly in the card.
 */
export function ServicesNocturne() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-(--k-ink) py-20 text-white lg:py-[120px]", SANS)}
    >
      <div className={cn(GRID, "gap-y-4 lg:gap-y-5")}>
        {CTA_SERVICES.map((service, index) => {
          const photo = CTA_PHOTOS[service.key];
          return (
            <InView
              key={service.key}
              delay={index * 160}
              className="col-span-4 lg:col-span-6"
            >
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                className="ek6-rise group relative isolate flex min-h-[460px] flex-col overflow-hidden border border-white/20 p-5 transition-colors duration-500 hover:border-white/60 focus-visible:border-white focus-visible:outline-none lg:min-h-[560px] lg:p-8"
              >
                {/* The photograph, rising through the card on hover. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-0 -z-10 opacity-25 transition-[clip-path,opacity] duration-[1100ms] lg:opacity-100 lg:[clip-path:inset(100%_0_0_0)] lg:group-hover:[clip-path:inset(0_0_0_0)] lg:group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none",
                    EASE,
                  )}
                >
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[1400ms] lg:scale-110 lg:group-hover:scale-100",
                      EASE,
                      photo.position,
                    )}
                  />
                  <span className="absolute inset-0 bg-(--k-ink)/60" />
                </span>

                <p className="flex items-baseline justify-between gap-x-3">
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span
                    className={cn(CAPS, "text-right text-[11px] text-white/70")}
                  >
                    {service.eyebrow}
                  </span>
                </p>
                <h3
                  className={cn(SECTION_TITLE, "mt-auto pt-16 lg:text-[3.6vw]")}
                >
                  {service.title}
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <p className="text-[16px] leading-[1.45] text-white/85">
                    {service.body}
                  </p>
                  <Covers items={service.covers} light />
                </div>
                <span className="mt-8 flex items-center justify-between border-t border-white/30 pt-4 text-[15px]">
                  {service.cta.label}
                  <LineArrow
                    className={cn(
                      "transition-transform duration-500 group-hover:translate-x-1.5",
                      EASE,
                    )}
                  />
                </span>
              </a>
            </InView>
          );
        })}
      </div>
    </section>
  );
}
