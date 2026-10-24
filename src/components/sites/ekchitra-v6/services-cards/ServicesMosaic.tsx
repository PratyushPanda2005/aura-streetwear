"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { CTA_SERVICES, LineArrow, MUTED, pad } from "./shared";

/** Works from the gallery's own artists, one per artist first, for the wall. */
const WORKS = ARTISTS.flatMap((artist) =>
  artist.works.slice(0, 2).map((work) => ({
    src: work.image,
    alt: `${work.title} by ${artist.name}`,
  })),
).slice(0, 18);

/** Columns of the wall and how far each travels (px) across the section. */
const COLUMNS = 6;
const TRAVEL = [-60, 50, -90, 70, -40, 80];

/**
 * 09 — Mosaic, after the photo wall behind a card on cta.gallery (Thenavia):
 * a wall of EkChitra's own works in six columns (three on a phone) that
 * drift at different speeds as the section scrolls past, under a soft veil,
 * and over it one white card holding both services as ruled rows — number,
 * audience, name, line and the way in. Held still for reduced motion.
 */
export function ServicesMosaic() {
  const root = useRef<HTMLElement>(null);

  // Drift each column by its own amount as the section crosses the screen.
  useEffect(() => {
    const el = root.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    const columns = [...el.querySelectorAll<HTMLElement>("[data-column]")];
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      if (rect.bottom < 0 || rect.top > view) return;
      // -1 entering at the bottom, 1 leaving at the top.
      const t = ((view - rect.top) / (view + rect.height)) * 2 - 1;
      columns.forEach((column, index) => {
        column.style.transform = `translate3d(0, ${(t * TRAVEL[index % TRAVEL.length]).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Services"
      className={cn(
        "relative flex min-h-[860px] items-center justify-center overflow-hidden bg-(--k-ink) px-4 py-24 lg:min-h-[960px]",
        SANS,
      )}
    >
      {/* The wall. */}
      <div
        aria-hidden="true"
        className="absolute -inset-y-24 inset-x-0 grid grid-cols-3 gap-3 px-3 lg:grid-cols-6 lg:gap-4 lg:px-4"
      >
        {Array.from({ length: COLUMNS }, (_, column) => (
          <div
            key={column}
            data-column=""
            className={cn(
              "flex flex-col gap-3 will-change-transform lg:gap-4",
              column >= 3 && "hidden lg:flex",
              column % 2 === 1 && "pt-20",
            )}
          >
            {WORKS.filter((_, index) => index % COLUMNS === column).map(
              (work) => (
                <div
                  key={work.src}
                  className="relative aspect-[3/4] overflow-hidden bg-white/5"
                >
                  <Image
                    src={work.src}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 16vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ),
            )}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-(--k-ink)/55" />

      {/* The card. */}
      <InView className="relative w-full max-w-[600px]">
        <div className="ek6-rise bg-white p-5 text-(--k-ink) shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] lg:p-8">
          {CTA_SERVICES.map((service, index) => (
            <a
              key={service.key}
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group block py-6 first:pt-0 last:pb-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)",
                index > 0 && "border-t border-(--k-ink)/15",
              )}
            >
              <span className="flex items-baseline justify-between gap-x-3">
                <span className="text-[13px] tabular-nums">
                  {pad(index + 1)}
                </span>
                <span className={cn(CAPS, "text-right text-[11px]", MUTED)}>
                  {service.eyebrow}
                </span>
              </span>
              <span className="mt-3 flex items-end justify-between gap-x-6">
                <span
                  className={cn(
                    "text-[34px] leading-[1] tracking-[-0.04em] transition-transform duration-700 group-hover:translate-x-1.5 lg:text-[44px]",
                    EASE,
                  )}
                >
                  {service.title}
                </span>
                <LineArrow
                  className={cn(
                    "mb-2 transition-transform duration-500 group-hover:translate-x-1.5",
                    EASE,
                  )}
                />
              </span>
              <span className="mt-3 block text-[15px] leading-[1.45]">
                {service.body}
              </span>
              <span className="mt-3 block text-[14px] underline decoration-1 underline-offset-4">
                {service.cta.label}
              </span>
            </a>
          ))}
        </div>
      </InView>
    </section>
  );
}
