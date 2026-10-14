"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { type Exhibition, EXHIBITIONS } from "./exhibitions-data";
import { InView } from "./InView";
import { CAPS, GUTTER, SANS } from "./shared";

/** Tabs, as on ekchitra.com, and which exhibitions each one holds. */
const TABS: { label: string; status: Exhibition["status"] }[] = [
  { label: "Current", status: "Current" },
  { label: "Past", status: "Past" },
];

/**
 * The exhibitions, under two tabs — current and past — one tab shown at a time.
 *
 * Each exhibition is a card: its poster on top and, on the plain page below it,
 * a small label, the title, the curator and the dates. On hover the poster
 * compresses by a strip, the details slide up into it and a "view exhibition"
 * button rises into the space left below — the same move as the artwork cards,
 * and the card never changes size. Cards wipe open in turn the first time
 * they are seen, and never again, even when switching tabs.
 */
export function ExhibitionsList() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <section
      id="list"
      className={cn("relative pb-24 lg:pb-[120px]", GUTTER, SANS)}
    >
      <div
        role="tablist"
        aria-label="Exhibitions"
        className="flex gap-x-8 border-b border-(--k-ink)/15"
      >
        {TABS.map((item) => {
          const active = item.label === tab.label;
          const count = EXHIBITIONS.filter(
            (exhibition) => exhibition.status === item.status,
          ).length;
          return (
            <button
              key={item.label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(item)}
              className={cn(
                CAPS,
                "relative pb-4 text-[13px] transition-colors duration-300 after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:origin-left after:bg-(--k-maroon) after:transition-transform after:duration-500 after:ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-(--k-maroon)",
                active
                  ? "text-(--k-ink) after:scale-x-100"
                  : "text-(--k-ink)/45 after:scale-x-0",
              )}
            >
              {item.label} <span className="text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Every tab's cards stay on the page and are only hidden, so each card
          plays its entrance once — the first time it is seen — and switching
          back to a tab shows it straight away. */}
      {TABS.map((item) => (
        <ul
          key={item.label}
          role="tabpanel"
          hidden={item.label !== tab.label}
          className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {EXHIBITIONS.filter(
            (exhibition) => exhibition.status === item.status,
          ).map((exhibition, index) => (
            <li key={exhibition.title}>
              <InView once delay={index * 120}>
                <a
                  href={exhibition.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block"
                >
                  {/* Picture. On hover its frame gets 64px shorter, so the
                    picture compresses around its centre. */}
                  <span className="ek5-wipe relative block aspect-[16/9] overflow-hidden">
                    <span className="absolute inset-x-0 top-0 bottom-0 overflow-hidden transition-[bottom] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:bottom-16 group-focus-visible:bottom-16">
                      <Image
                        src={exhibition.image}
                        alt={exhibition.title}
                        fill
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </span>
                  </span>

                  {/* Details: slide up into the strip to make room below. */}
                  <span className="ek5-fade block pt-4 transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-16 group-focus-visible:-translate-y-16">
                    <span
                      className={cn(
                        CAPS,
                        "block text-[11px] text-(--k-maroon)",
                      )}
                    >
                      Gallery exhibition
                    </span>
                    <span className="mt-2 block text-[20px] leading-[1.25] lg:text-[22px]">
                      {exhibition.title}
                    </span>
                    <span className="mt-1 block text-[14px] leading-[1.4] text-(--k-ink)/60">
                      {exhibition.subtitle}
                    </span>
                    {exhibition.dates && (
                      <span className="mt-4 block text-[13px] leading-[1.5] text-(--k-maroon)">
                        {exhibition.dates}
                      </span>
                    )}
                  </span>

                  {/* Button: rises into the space left at the bottom. */}
                  <span className="absolute bottom-0 left-0 flex h-11 translate-y-[6px] items-stretch bg-(--k-ink) text-white opacity-0 transition-[opacity,translate,background-color] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[60ms] group-focus-visible:translate-y-0 group-focus-visible:opacity-100 hover:bg-(--k-maroon)">
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
                </a>
              </InView>
            </li>
          ))}
        </ul>
      ))}
    </section>
  );
}
