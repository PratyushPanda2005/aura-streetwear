"use client";

import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { ALL_EXHIBITIONS, LineArrow, SHOWS, pad } from "./shared";

/**
 * Variation 05 — scrolling strip. A ruled bar across the top with a link to
 * every exhibition on the left and two square arrows on the right; under it
 * the shows as a strip of cards, each four columns wide, that scrolls
 * sideways and snaps to a card — by the arrows, a swipe or a trackpad. Each
 * card is the poster, then its number and status, the title and the dates.
 */
export function ExStrip() {
  const track = useRef<HTMLUListElement>(null);

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const card = el?.querySelector("li");
    if (!el || !card) return;
    el.scrollBy({
      left: direction * (card.clientWidth + 20),
      behavior: "smooth",
    });
  };

  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-white pb-12 text-(--k-ink) lg:pb-16", SANS)}
    >
      <div className={cn(GRID, HEAD, "pb-0 lg:pb-0")}>
        <div className="col-span-4 flex items-center justify-between border-y border-(--k-ink) py-2 lg:col-span-12">
          <a
            href={ALL_EXHIBITIONS.href}
            className="flex items-center gap-x-4 text-[15px] transition-opacity hover:opacity-60"
          >
            {ALL_EXHIBITIONS.label}
            <LineArrow />
          </a>
          <div className="flex gap-x-1">
            {([-1, 1] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => step(direction)}
                aria-label={
                  direction === 1 ? "Next exhibitions" : "Previous exhibitions"
                }
                className="flex size-10 items-center justify-center bg-(--k-ink) text-white transition-colors duration-300 hover:bg-(--k-maroon)"
              >
                <LineArrow
                  className={cn("w-5", direction === -1 && "rotate-180")}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      <ul
        ref={track}
        className="mt-6 flex snap-x snap-mandatory scroll-px-4 gap-x-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] lg:scroll-px-5 lg:gap-x-5 lg:px-5 [&::-webkit-scrollbar]:hidden"
      >
        {SHOWS.map((show, index) => (
          <li
            key={show.title}
            className="w-[82vw] shrink-0 snap-start sm:w-[calc((100vw-32px-16px)/2)] lg:w-[calc((100vw-40px-40px)/3)]"
          >
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-(--k-ink)/5">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 82vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-(--k-ink)/15 pt-3">
                <span className="text-[12px] tabular-nums">
                  {pad(index + 1)} / {pad(SHOWS.length)}
                </span>
                <span className={cn(CAPS, "text-[10px]")}>{show.status}</span>
              </div>
              <h3 className="mt-2 text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[24px]">
                {show.title}
              </h3>
              <p className="mt-1 text-[14px]">{show.dates || "—"}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
