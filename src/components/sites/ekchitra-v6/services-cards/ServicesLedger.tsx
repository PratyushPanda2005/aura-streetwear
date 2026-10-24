"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, Covers, MUTED, UNDERLINE } from "./shared";

/**
 * 01 — Ledger, after goodman-gallery.com/contact: one hairline-ruled row on
 * the grid. "Services" labels the row in columns 1–3; the two services
 * are quiet text cards in 4–6 and 7–9 — name, audience, a line, what it
 * covers and an underlined way in; and columns 10–12 hold a picture card that
 * crossfades to whichever service is under the pointer. The rules draw in
 * from the left and the cards rise in turn as the row scrolls into view.
 */
export function ServicesLedger() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      aria-labelledby="services-ledger-heading"
      className={cn(
        "scroll-mt-11 bg-white pt-20 text-(--k-ink) lg:pt-[120px]",
        SANS,
      )}
    >
      <InView className="pb-20 lg:pb-[120px]">
        <div className="px-4 lg:px-5">
          <div className="ek6-line h-px bg-(--k-ink)/20" />
        </div>

        <div className={cn(GRID, "gap-y-10 pt-8 lg:pt-10")}>
          <div className="col-span-4 lg:col-span-3">
            <div className="ek6-rise">
              <h3
                id="services-ledger-heading"
                className="text-[19px] tracking-[-0.01em]"
              >
                Services
              </h3>
            </div>
          </div>

          {CTA_SERVICES.map((service, index) => (
            <InView
              key={service.key}
              delay={120 + index * 140}
              className="col-span-4 sm:col-span-2 lg:col-span-3"
            >
              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                className="ek6-rise group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
              >
                <p className="text-[14px] font-medium">{service.title}</p>
                <p className={cn("text-[14px]", MUTED)}>{service.eyebrow}</p>
                <p className="mt-5 max-w-[320px] text-[15px] leading-[1.45]">
                  {service.body}
                </p>
                <Covers items={service.covers} className="mt-4" />
                <span
                  className={cn(UNDERLINE, "mt-6 inline-block text-[14px]")}
                >
                  {service.cta.label}
                </span>
              </a>
            </InView>
          ))}

          {/* The picture card: both photos stacked, the active one shown. */}
          <InView delay={400} className="col-span-4 lg:col-span-3">
            <div className="ek6-unveil relative aspect-[4/5] overflow-hidden bg-(--k-ink)">
              {CTA_SERVICES.map((service, index) => {
                const photo = CTA_PHOTOS[service.key];
                const on = active === index;
                return (
                  <Image
                    key={service.key}
                    src={photo.src}
                    alt={on ? photo.alt : ""}
                    fill
                    sizes="(min-width: 1024px) 25vw, 100vw"
                    className={cn(
                      "object-cover transition-[opacity,scale] duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
                      photo.position,
                      on ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                    )}
                  />
                );
              })}
              <p
                className={cn(
                  CAPS,
                  "absolute bottom-3 left-3 text-[10px] text-white",
                )}
              >
                {CTA_SERVICES[active].title}
              </p>
            </div>
          </InView>
        </div>

        <div className="mt-10 px-4 lg:mt-12 lg:px-5">
          <div className="ek6-line h-px bg-(--k-ink)/20 [--delay:300ms]" />
        </div>
      </InView>
    </section>
  );
}
