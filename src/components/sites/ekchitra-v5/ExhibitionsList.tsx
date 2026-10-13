"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { Progress } from "../ekchitra-v4/Progress";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { EXHIBITION_FILTERS, EXHIBITIONS } from "./exhibitions-data";
import { InView } from "./InView";
import { CAPS, DISPLAY, GUTTER, SANS } from "./shared";

type Filter = (typeof EXHIBITION_FILTERS)[number];

/**
 * The exhibitions, one to a row.
 *
 * A heading with status filters, then each exhibition as a two-column row: on
 * the left its number, title, strapline, venue and dates, which stay pinned near
 * the top of the screen while the row is scrolled; on the right a large picture
 * that wipes open on arrival and drifts a little slower than the page. Hovering
 * a row turns its title dark red and raises a "view exhibition" button over the
 * picture. An exhibition with no picture yet gets a dark red panel with its title.
 */
export function ExhibitionsList() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = EXHIBITIONS.filter(
    (exhibition) => filter === "All" || exhibition.status === filter,
  );

  return (
    <section id="list" className={cn("pb-24 lg:pb-[120px]", GUTTER, SANS)}>
      <div className="grid gap-y-5 border-t border-(--k-ink)/15 pt-6 lg:grid-cols-2 lg:gap-x-5">
        <h2
          className={cn(DISPLAY, "text-[28px] leading-[1.15] lg:text-[32px]")}
        >
          <Chars text="Gallery exhibitions" />
        </h2>
        <ul className="flex flex-wrap items-end gap-x-6 gap-y-2">
          {EXHIBITION_FILTERS.map((label) => {
            const active = label === filter;
            const count =
              label === "All"
                ? EXHIBITIONS.length
                : EXHIBITIONS.filter((item) => item.status === label).length;
            return (
              <li key={label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(label)}
                  className={cn(
                    CAPS,
                    "relative pb-1 transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-(--k-maroon)",
                    active
                      ? "text-(--k-maroon) after:scale-x-100"
                      : "text-(--k-ink)/55 after:scale-x-0",
                  )}
                >
                  {label} <span className="text-[10px]">({count})</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="mt-8 space-y-5">
        {shown.map((exhibition) => {
          const number = String(EXHIBITIONS.indexOf(exhibition) + 1).padStart(
            2,
            "0",
          );
          return (
            <li key={exhibition.title}>
              <a
                href={exhibition.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-y-4 lg:grid-cols-2 lg:gap-x-5"
              >
                {/* Details — pinned while the row scrolls past. */}
                <div className="order-2 grid grid-cols-2 gap-x-5 self-start lg:sticky lg:top-[92px] lg:order-1">
                  <div className="grid grid-cols-[auto_1fr] gap-x-3">
                    <span className="pt-[5px] text-[12px] leading-4">
                      ({number})
                    </span>
                    <span>
                      <span className="block text-[18px] leading-[1.25] transition-colors duration-300 group-hover:text-(--k-maroon) lg:text-[22px]">
                        <Chars text={exhibition.title} />
                      </span>
                      <span className="mt-1 block text-[14px] leading-[1.4] text-(--k-ink)/60">
                        {exhibition.subtitle}
                      </span>
                    </span>
                  </div>
                  <div className="text-[13px] leading-[1.5]">
                    <span
                      className={cn(
                        "mb-3 inline-block px-3 py-[5px] text-[12px] leading-4",
                        exhibition.status === "Past"
                          ? "bg-(--k-sand) text-(--k-ink)"
                          : "bg-(--k-maroon) text-white",
                      )}
                    >
                      {exhibition.status}
                    </span>
                    <span className="block">{exhibition.venue}</span>
                    <span className="block text-(--k-ink)/60">
                      {exhibition.dates}
                    </span>
                  </div>
                </div>

                {/* Picture */}
                <InView className="order-1 lg:order-2">
                  <Progress className="ek5-wipe relative aspect-[16/9] overflow-hidden bg-(--k-maroon)">
                    {exhibition.image ? (
                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        sizes="(max-width: 1023px) 100vw, 50vw"
                        className="translate-y-[calc((var(--p,0.5)_-_0.5)_*_5%)] scale-[1.06] object-cover will-change-transform"
                      />
                    ) : (
                      <>
                        <Diamonds
                          rows={22}
                          horizontal
                          className="absolute top-0 left-0 h-[70px] text-white/15 lg:h-[100px]"
                        />
                        <span
                          className={cn(
                            DISPLAY,
                            "absolute inset-x-5 bottom-5 text-[12vw] leading-[0.95] tracking-[-0.05em] text-white lg:inset-x-8 lg:bottom-7 lg:text-[6vw]",
                          )}
                        >
                          {exhibition.title}
                        </span>
                      </>
                    )}
                    <span className="absolute right-4 bottom-4 flex h-11 translate-y-[6px] items-stretch bg-white text-(--k-ink) opacity-0 transition-[opacity,translate] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 lg:right-6 lg:bottom-6">
                      <span className="flex items-center px-4 text-[14px]">
                        View exhibition
                      </span>
                      <span className="flex items-center pr-4">
                        <svg
                          viewBox="0 0 12 18"
                          aria-hidden="true"
                          className="h-[18px] w-3"
                        >
                          <path
                            d="M3 0l3 3-3 3-3-3zM9 6l3 3-3 3-3-3zM3 12l3 3-3 3-3-3z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </span>
                  </Progress>
                </InView>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
