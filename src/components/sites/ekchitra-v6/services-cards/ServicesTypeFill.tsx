"use client";

import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { GRID, MEGA } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, LineArrow, MUTED, pad } from "./shared";

/** The giant name's size, shared by the solid and photo-filled layers. */
const NAME = cn(MEGA, "text-[15vw] sm:text-[11vw] lg:text-[8.6vw]");

/**
 * 10 — Type fill, after the huge stacked display type on cta.gallery
 * (Augustus, Jemini): each service is a ruled row with its name set in giant
 * capitals across the grid. On hover the name fills with the service's
 * photograph — wiped in from the left, the picture panning slowly inside the
 * letters — while the number, audience, line and the way in sit beneath.
 * On a phone the names stay solid.
 */
export function ServicesTypeFill() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      {CTA_SERVICES.map((service, index) => {
        const photo = CTA_PHOTOS[service.key];
        return (
          <InView key={service.key} delay={index * 140}>
            <div className="px-4 lg:px-5">
              <div className="ek6-line h-px bg-(--k-ink)" />
            </div>
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className="group block py-6 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-(--k-ink) lg:py-8"
            >
              <h3 className="ek6-rise relative px-4 lg:px-5">
                <span className={cn(NAME, "block")}>{service.title}</span>
                {/* The same name, filled with the photograph, wiped in on hover. */}
                <span
                  aria-hidden="true"
                  style={{ "--photo": `url(${photo.src})` } as CSSProperties}
                  className={cn(
                    NAME,
                    "absolute inset-y-0 left-4 right-4 hidden bg-(image:--photo) bg-[length:140%_auto] bg-[position:0%_50%] bg-clip-text text-transparent transition-[clip-path,background-position] duration-[1400ms] [clip-path:inset(0_100%_0_0)] lg:right-5 lg:left-5 lg:block lg:group-hover:bg-[position:100%_50%] lg:group-hover:[clip-path:inset(0_0_0_0)] lg:group-focus-visible:[clip-path:inset(0_0_0_0)] motion-reduce:transition-none",
                    EASE,
                  )}
                >
                  {service.title}
                </span>
              </h3>
              <div className={cn(GRID, "ek6-rise mt-5 items-baseline gap-y-3")}>
                <p className="col-span-4 flex items-baseline gap-x-3 lg:col-span-3">
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className={cn(CAPS, "text-[11px]", MUTED)}>
                    {service.eyebrow}
                  </span>
                </p>
                <p className="col-span-4 text-[16px] leading-[1.45] lg:col-span-5">
                  {service.body}
                </p>
                <p className="col-span-4 flex items-center justify-between gap-x-4 text-[15px] lg:col-span-3 lg:col-start-10">
                  {service.cta.label}
                  <LineArrow
                    className={cn(
                      "transition-transform duration-500 group-hover:translate-x-1.5",
                      EASE,
                    )}
                  />
                </p>
              </div>
            </a>
          </InView>
        );
      })}
      <div className="px-4 lg:px-5">
        <div className="h-px bg-(--k-ink)" />
      </div>
    </section>
  );
}
