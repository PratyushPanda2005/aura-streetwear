"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { GRID } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, LineArrow, pad } from "./shared";

/** Each tile's ground, in turn: sand, then brand navy. */
const TILES = [
  { ground: "bg-(--k-sand) text-(--k-ink)", rule: "border-(--k-ink)/25" },
  { ground: "bg-(--k-navy) text-white", rule: "border-white/30" },
];

/**
 * 06 — Choice tiles, after the two-block choice on cta.gallery (Wearedirect):
 * the two services as a pair of tall tiles, six columns each — sand and brand
 * navy — with only the audience at the top and the name set huge at the
 * foot. On hover the service's photograph is unveiled in the tile's upper
 * corner and the name and arrow step on; on a phone the photograph shows.
 */
export function ServicesChoice() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <div className={cn(GRID, "gap-y-4")}>
        {CTA_SERVICES.map((service, index) => {
          const photo = CTA_PHOTOS[service.key];
          const tile = TILES[index % TILES.length];
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
                className={cn(
                  "ek6-rise group relative flex min-h-[520px] flex-col overflow-hidden p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink) lg:min-h-[640px] lg:p-8",
                  tile.ground,
                )}
              >
                <div className="flex items-baseline justify-between gap-x-4">
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span
                    className={cn(CAPS, "text-right text-[11px] opacity-80")}
                  >
                    {service.eyebrow}
                  </span>
                </div>

                {/* The photograph, unveiled on hover (always shown on a phone). */}
                <div
                  className={cn(
                    "relative mt-6 ml-auto aspect-[4/3] w-full overflow-hidden transition-[clip-path] duration-[1100ms] sm:w-[58%] lg:[clip-path:inset(0_0_100%_0)] lg:group-hover:[clip-path:inset(0_0_0_0)] lg:group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none",
                    EASE,
                  )}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 58vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[1400ms] lg:scale-110 lg:group-hover:scale-100",
                      EASE,
                      photo.position,
                    )}
                  />
                </div>

                <div className="mt-auto pt-10">
                  <h3
                    className={cn(
                      "text-[48px] leading-[0.95] tracking-[-0.045em] transition-transform duration-700 lg:text-[5.2vw] lg:group-hover:-translate-y-2",
                      EASE,
                    )}
                  >
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-[420px] text-[16px] leading-[1.45] opacity-85">
                    {service.body}
                  </p>
                  <span
                    className={cn(
                      "mt-8 flex items-center justify-between border-t pt-4 text-[15px]",
                      tile.rule,
                    )}
                  >
                    {service.cta.label}
                    <LineArrow
                      className={cn(
                        "transition-transform duration-500 group-hover:translate-x-1.5",
                        EASE,
                      )}
                    />
                  </span>
                </div>
              </a>
            </InView>
          );
        })}
      </div>
    </section>
  );
}
