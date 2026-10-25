"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { SANS } from "../../ekchitra-v5/shared";
import { EXHIBITIONS } from "../data";
import { CARD_TITLE, GRID, ITEM_TITLE } from "../styles";
import { DriftPicture, EASE, useDrift } from "../motion";

type Show = (typeof EXHIBITIONS)[number];

const yearOf = (show: Show) =>
  show.dates.match(/\b(19|20)\d{2}\b/)?.[0] ?? null;

const statusOf = (show: Show) =>
  show.status === "Current"
    ? /\d/.test(show.dates)
      ? "Upcoming"
      : "Now on"
    : "Past";

/** Filters: everything, what is on and next, then each year, newest first. */
const CURRENT = EXHIBITIONS.filter((show) => show.status === "Current");
const PAST = EXHIBITIONS.filter((show) => show.status === "Past");

/** Filters for the past shows: all, each year newest first, then undated. */
const FILTERS = (() => {
  const years = [
    ...new Set(
      PAST.map(yearOf).filter((year): year is string => year !== null),
    ),
  ].sort((a, b) => Number(b) - Number(a));
  return [
    { label: "All", test: () => true },
    ...years.map((year) => ({
      label: year,
      test: (show: Show) => yearOf(show) === year,
    })),
    { label: "Undated", test: (show: Show) => yearOf(show) === null },
  ];
})();

/**
 * Exhibitions, after goodman-gallery.com/exhibitions, under the shared page
 * banner and heading. First what is on now and next, as large rows on the
 * 12-column grid: the title and curator (1–3) and status and dates (4–6)
 * pinned under the top bar while the poster (7–12) scrolls by, drifting
 * gently in its frame and settling closer under the pointer. Then the past
 * shows as a compact two-column grid — a small framed poster beside its
 * title, curator and dates — under a ruled bar with year filters; filtering
 * cross-fades the grid. Every card is a link to the show on ekchitra.com.
 */
export function ExhibitionsGallery() {
  const root = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState(0);
  const [shown, setShown] = useState(0);
  const [fading, setFading] = useState(false);

  // Fade the grid out, swap the filter, fade it back in.
  const choose = (index: number) => {
    if (index === filter) return;
    setFilter(index);
    setFading(true);
    window.setTimeout(() => {
      setShown(index);
      setFading(false);
    }, 260);
  };

  const past = useMemo(() => PAST.filter(FILTERS[shown].test), [shown]);

  useDrift(root, []);

  return (
    <div
      ref={root}
      className={cn("relative isolate bg-white text-(--k-ink)", SANS)}
    >
      {/* Now and upcoming: large rows, the words pinned beside the picture
          while it scrolls by. */}
      <section aria-label="Now and upcoming" className="pb-16 lg:pb-24">
        <ol>
          {CURRENT.map((show) => (
            <li key={show.title}>
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className={cn(GRID, "group items-start gap-y-4 pb-5")}
              >
                <span className="col-span-4 grid grid-cols-subgrid gap-y-3 lg:sticky lg:top-[calc(44px+2rem)] lg:col-span-6">
                  <span className="col-span-4 lg:col-span-3">
                    <span className={cn(ITEM_TITLE, "block")}>
                      {show.title}
                    </span>
                    <span className="mt-1 block text-[15px]">
                      {show.subtitle}
                    </span>
                  </span>
                  <span className="col-span-4 text-[14px] leading-[1.4] lg:col-span-3">
                    <span className="block">{statusOf(show)}</span>
                    <span className="block">
                      {show.dates || "Dates to be announced"}
                    </span>
                  </span>
                </span>
                <DriftPicture
                  src={show.image}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                  className="col-span-4 aspect-video lg:col-span-6"
                />
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* Past exhibitions: a compact two-column grid with year filters. */}
      <section aria-labelledby="past-heading" className="pb-16 lg:pb-24">
        <div className={cn(GRID, "items-baseline gap-y-3 pt-4 pb-8 lg:pb-10")}>
          <h2
            id="past-heading"
            className="col-span-4 text-[15px] lg:col-span-6"
          >
            Past exhibitions
          </h2>
          <nav
            aria-label="Filter past exhibitions"
            className="col-span-4 lg:col-span-6"
          >
            <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[14px]">
              {FILTERS.map((item, index) => (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => choose(index)}
                    aria-pressed={filter === index}
                    className={cn(
                      "py-1 underline-offset-[6px] transition-colors duration-300",
                      filter === index
                        ? "underline decoration-1"
                        : "text-(--k-ink)/65 hover:text-(--k-ink)",
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <ol
          aria-live="polite"
          className={cn(
            GRID,
            "gap-y-5 transition-opacity duration-300",
            fading ? "opacity-0" : "opacity-100",
          )}
        >
          {past.map((show) => (
            <li key={show.title} className="col-span-4 lg:col-span-6">
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-6 items-start gap-x-4 lg:gap-x-5"
              >
                <span className="relative col-span-3 block aspect-video overflow-hidden bg-(--k-ink)/5">
                  <Image
                    src={show.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className={cn(
                      "object-cover transition-[scale] duration-[750ms] group-hover:scale-[1.04] motion-reduce:transition-none",
                      EASE,
                    )}
                  />
                </span>
                <span className="col-span-3">
                  <span className={cn(CARD_TITLE, "block")}>{show.title}</span>
                  <span className="mt-0.5 block text-[14px]">
                    {show.subtitle}
                  </span>
                  <span className="mt-3 block text-[14px]">
                    {show.dates || "Date not listed"}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* A run of the diamond motif resting on the footer, fixed in the
          empty space at the foot of the page and behind everything. */}
      <Diamonds
        rows={40}
        shape="zigzag"
        horizontal
        side="left"
        tint="maroon"
        tintEvery={6}
        tintOpacity={0.45}
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[40px] -scale-y-100 text-(--k-ink)/[0.08] lg:h-[56px]"
      />
    </div>
  );
}
