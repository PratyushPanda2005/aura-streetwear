"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { GRID, SECTION_TITLE } from "../styles";
import {
  CTA_PHOTOS,
  CTA_SERVICES,
  Covers,
  LineArrow,
  MUTED,
  pad,
} from "./shared";

/**
 * 02 — Twin cards: the two services as a pair of large cards, six columns
 * each. The picture is unveiled upwards from its foot as the card scrolls in
 * (the second a beat after the first); below it, between hairlines, the
 * number and audience, the name set large, the line, what it covers and the
 * way in. On hover the picture settles closer and the arrow steps right.
 */
export function ServicesTwinCards() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <div className={cn(GRID, "gap-y-14")}>
        {CTA_SERVICES.map((service, index) => {
          const photo = CTA_PHOTOS[service.key];
          return (
            <InView
              key={service.key}
              delay={index * 180}
              className="col-span-4 lg:col-span-6"
            >
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
              >
                <div className="ek6-unveil relative aspect-[4/3] overflow-hidden bg-(--k-ink)">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04] motion-reduce:transition-none",
                      EASE,
                      photo.position,
                    )}
                  />
                </div>
                <div className="ek6-rise">
                  <div className="mt-5 flex items-baseline justify-between border-b border-(--k-ink)/15 pb-3">
                    <span className="text-[13px] tabular-nums">
                      {pad(index + 1)}
                    </span>
                    <span className={cn(CAPS, "text-[11px]", MUTED)}>
                      {service.eyebrow}
                    </span>
                  </div>
                  <h3 className={cn(SECTION_TITLE, "mt-5")}>{service.title}</h3>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <p className="text-[16px] leading-[1.45]">{service.body}</p>
                    <Covers items={service.covers} />
                  </div>
                  <div className="mt-8 flex items-center justify-between border-t border-(--k-ink) pt-4 text-[15px]">
                    {service.cta.label}
                    <LineArrow
                      className={cn(
                        "transition-transform duration-500 group-hover:translate-x-1.5",
                        EASE,
                      )}
                    />
                  </div>
                </div>
              </a>
            </InView>
          );
        })}
      </div>
    </section>
  );
}
