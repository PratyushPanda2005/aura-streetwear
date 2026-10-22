"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, LineArrow, pad } from "./shared";

/**
 * TEMPORARY PLACEHOLDERS (Unsplash, free licence) — replace with EkChitra
 * photographs:
 * - Bespoke sourcing: an abstract painting in a living room, by Virender
 *   Singh (unsplash.com/photos/GybmMi0QZV4).
 * - Art advisory: a visitor studying a painting in a museum, by Lucrezia
 *   Carnelos (unsplash.com/photos/aUtrOFDViw0).
 * `position` keeps the painting in view as the panel narrows and widens.
 */
const PHOTOS: Record<string, { src: string; alt: string; position: string }> = {
  bespoke: {
    src: "/sites/ekchitra-redesign/placeholders/cta-bespoke-unsplash-virender-singh.jpg",
    alt: "An abstract painting hung above a chair in a living room",
    position: "object-[30%_32%]",
  },
  advisory: {
    src: "/sites/ekchitra-redesign/placeholders/cta-advisory-unsplash-lucrezia-carnelos.jpg",
    alt: "A visitor standing before a painting in a gallery",
    position: "object-[50%_55%]",
  },
};

/**
 * Variation 07 — expanding panels. Two picture panels share the width; the
 * one under the pointer (the first, to begin with) widens to two-thirds and
 * shows what it is, what it covers and the way in, while the other narrows
 * to just its name. Stacked and fully open on a phone.
 */
export function CtaExpand() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="services"
      aria-label="Services"
      className={cn(
        "scroll-mt-11 bg-white text-(--k-ink)",
        SANS,
      )}
    >
      <div className="flex flex-col bg-(--k-ink) lg:h-[86svh] lg:min-h-[620px] lg:flex-row">
        {CTA_SERVICES.map((service, index) => {
          const isOpen = open === index;
          const photo = PHOTOS[service.key] ?? {
            ...service.image,
            position: "object-center",
          };
          return (
            <a
              key={service.key}
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setOpen(index)}
              onFocus={() => setOpen(index)}
              className={cn(
                "group relative flex min-h-[560px] flex-col justify-end overflow-hidden bg-(--k-ink) p-4 text-white transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0 lg:basis-0 lg:p-5",
                isOpen ? "lg:grow-[2]" : "lg:grow",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 66vw, 100vw"
                className={cn(
                  "object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]",
                  photo.position,
                )}
              />
              <div className="absolute inset-0 bg-linear-to-t from-(--k-ink)/90 via-(--k-ink)/35 to-(--k-ink)/10" />

              <div className="relative">
                <p className="text-[13px] tabular-nums text-white/70">
                  {pad(index + 1)}
                </p>
                <h3 className="mt-2 text-[44px] leading-[0.95] tracking-[-0.045em] lg:text-[4.6vw]">
                  {service.title}
                </h3>

                {/* The details, shown when the panel is open. */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0",
                    isOpen && "lg:grid-rows-[1fr] lg:opacity-100",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="grid max-w-[720px] gap-6 pt-6 sm:grid-cols-2">
                      <div>
                        <p className={cn(CAPS, "text-[10px] text-white/60")}>
                          {service.eyebrow}
                        </p>
                        <p className="mt-2 text-[16px] leading-[1.4] text-white/85">
                          {service.body}
                        </p>
                      </div>
                      <ul className="space-y-1.5 text-[14px] text-white/70">
                        {service.covers.map((item) => (
                          <li key={item}>— {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-white/30 pt-4 text-[15px]">
                      {service.cta.label}
                      <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
