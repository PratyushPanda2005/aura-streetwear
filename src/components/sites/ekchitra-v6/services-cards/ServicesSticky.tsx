"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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
 * 04 — Sticky split: a picture held in columns 1–5 while the two services
 * scroll past in 7–12, each given most of a screen. As a service crosses
 * the middle of the screen the held picture crossfades to it and its number
 * fills in on a slim progress rule. On a phone each service carries its own
 * picture instead.
 */
export function ServicesSticky() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      // A thin band across the middle of the screen.
      { rootMargin: "-45% 0px -45% 0px" },
    );
    for (const item of items.current) if (item) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <div className={GRID}>
        {/* The held picture, desktop only. */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-[calc(44px+4vh)] h-[84svh] overflow-hidden bg-(--k-ink)">
            {CTA_SERVICES.map((service, index) => {
              const photo = CTA_PHOTOS[service.key];
              const on = active === index;
              return (
                <Image
                  key={service.key}
                  src={photo.src}
                  alt={on ? photo.alt : ""}
                  fill
                  sizes="42vw"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-[1200ms] motion-reduce:transition-none",
                    EASE,
                    photo.position,
                    on ? "scale-100 opacity-100" : "scale-[1.08] opacity-0",
                  )}
                />
              );
            })}
            {/* Progress: one segment per service, the current one filled. */}
            <div className="absolute inset-x-4 bottom-4 flex gap-x-2">
              {CTA_SERVICES.map((service, index) => (
                <span key={service.key} className="h-px flex-1 bg-white/35">
                  <span
                    className={cn(
                      "block h-full origin-left bg-white transition-transform duration-700",
                      EASE,
                      active >= index ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-4 lg:col-span-6 lg:col-start-7">
          {CTA_SERVICES.map((service, index) => {
            const photo = CTA_PHOTOS[service.key];
            return (
              <div
                key={service.key}
                ref={(el) => {
                  items.current[index] = el;
                }}
                data-index={index}
                className="flex flex-col justify-center py-10 lg:min-h-[84svh] lg:py-0"
              >
                <InView>
                  <div className="ek6-unveil relative mb-6 aspect-[4/3] overflow-hidden lg:hidden">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="100vw"
                      className={cn("object-cover", photo.position)}
                    />
                  </div>
                  <div className="ek6-rise">
                    <p className="flex items-baseline gap-x-3">
                      <span className="text-[13px] tabular-nums">
                        {pad(index + 1)}
                      </span>
                      <span className={cn(CAPS, "text-[11px]", MUTED)}>
                        {service.eyebrow}
                      </span>
                    </p>
                    <h3 className={cn(SECTION_TITLE, "mt-4 lg:text-[4vw]")}>
                      {service.title}
                    </h3>
                    <p className="mt-6 max-w-[460px] text-[17px] leading-[1.45]">
                      {service.body}
                    </p>
                    <Covers items={service.covers} className="mt-5" />
                    <a
                      href={service.cta.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group mt-10 flex max-w-[460px] items-center justify-between border-t border-(--k-ink) pt-4 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
                    >
                      {service.cta.label}
                      <LineArrow
                        className={cn(
                          "transition-transform duration-500 group-hover:translate-x-1.5",
                          EASE,
                        )}
                      />
                    </a>
                  </div>
                </InView>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
