"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { SANS } from "../../ekchitra-v5/shared";
import { EXHIBITIONS } from "../data";
import { EASE } from "../motion";
import { ALL_HREF, SHOWS, pad, statusOf } from "./shared";

/**
 * The checkerboard on desktop: four columns, two rows, half the cells left
 * empty so the cards stagger. Each entry is a show (by index), the link to
 * every exhibition, or a gap. Gaps drop out below `lg`.
 */
const SLOTS: (number | "all" | "gap")[] = [
  0,
  "gap",
  1,
  "gap",
  "gap",
  2,
  "gap",
  "all",
];

/**
 * The poster's frame: a 132 × 96 thumbnail 20px in from the top left at
 * rest, growing to the whole card on hover. The frame itself resizes (not a
 * clip), so the thumbnail shows the poster's centre and simply opens out.
 */
const FRAME =
  "top-5 left-5 h-24 w-[132px] group-hover:top-0 group-hover:left-0 group-hover:h-full group-hover:w-full group-focus-visible:top-0 group-focus-visible:left-0 group-focus-visible:h-full group-focus-visible:w-full";

/**
 * 03 — Checker cards, after the staggered card grid on nova-dental-dev
 * (webflow): on sand, square white cards set as a checkerboard with gaps.
 * Each shows its poster through a small window at the top left, a "(+)" at
 * the top right and, at the foot, its number, title and dates. On hover the
 * window opens out to fill the whole card, the words turn white over it and
 * the "+" turns to a cross. The cards rise in one after another.
 */
export function ExCheckerCards() {
  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-(--k-sand) py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <ul className="grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4 lg:px-5">
        {SLOTS.map((slot, index) => {
          if (slot === "gap") {
            return (
              <li
                key={`gap-${index}`}
                aria-hidden="true"
                className="hidden lg:block"
              />
            );
          }

          if (slot === "all") {
            return (
              <li key="all" className="aspect-square">
                <InView delay={index * 90} className="h-full">
                  <a
                    href={ALL_HREF}
                    className="ek6-rise group flex h-full flex-col justify-between bg-(--k-ink) p-5 text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
                  >
                    <span className="self-end text-[15px]">( → )</span>
                    <span>
                      <span className="block text-[13px] tabular-nums text-white/70">
                        ({EXHIBITIONS.length})
                      </span>
                      <span className="mt-1 block text-[28px] leading-[1] tracking-[-0.035em] lg:text-[2.2vw]">
                        All exhibitions
                      </span>
                    </span>
                  </a>
                </InView>
              </li>
            );
          }

          const show = SHOWS[slot];
          if (!show) return null;
          return (
            <li key={show.title} className="aspect-square">
              <InView delay={index * 90} className="h-full">
                <a
                  href={show.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ek6-rise group relative isolate flex h-full flex-col overflow-hidden bg-white p-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)"
                >
                  {/* The poster: a thumbnail at rest, the whole card on hover. */}
                  <span
                    className={cn(
                      "absolute -z-10 overflow-hidden transition-[top,left,width,height] duration-[900ms] motion-reduce:transition-none",
                      EASE,
                      FRAME,
                    )}
                  >
                    <Image
                      src={show.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-linear-to-t from-(--k-ink)/80 via-(--k-ink)/25 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                    />
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "self-end text-[15px] transition-[color,rotate] duration-500 group-hover:rotate-45 group-hover:text-white",
                      EASE,
                    )}
                  >
                    ( + )
                  </span>

                  <span className="mt-auto transition-colors duration-500 group-hover:text-white group-focus-visible:text-white">
                    <span className="block text-[13px] tabular-nums opacity-70">
                      ({pad(slot + 1)})
                    </span>
                    <span className="mt-1 block text-[26px] leading-[1.02] tracking-[-0.03em] lg:text-[2vw]">
                      {show.title}
                    </span>
                    <span className="mt-2 block text-[13px] opacity-80">
                      {statusOf(show)} · {show.dates}
                    </span>
                  </span>
                </a>
              </InView>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
