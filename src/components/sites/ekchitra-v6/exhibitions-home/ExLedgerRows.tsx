"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { SANS } from "../../ekchitra-v5/shared";
import { DriftPicture, EASE, useDrift } from "../motion";
import { GRID } from "../styles";
import { ALL_HREF, SHOWS, VENUE, pad, statusOf } from "./shared";

/**
 * 01 — Ledger rows, after the exhibitions list on goodman-gallery.com: one
 * row per show on the grid — the title and curator in columns 1–3, status,
 * dates and venue in 4–6, and the poster large across 7–12. The words hold
 * at the top of their row while the poster passes, which is unveiled upwards
 * as it scrolls in and drifts slightly; on hover it settles closer and the
 * title steps right. "All exhibitions" sits top right.
 */
export function ExLedgerRows() {
  const root = useRef<HTMLElement>(null);
  useDrift(root, []);

  return (
    <section
      ref={root}
      aria-label="Exhibitions"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <div className={cn(GRID, "mb-8 lg:mb-10")}>
        <a
          href={ALL_HREF}
          className="col-span-4 justify-self-end border border-(--k-ink)/30 px-3 py-1.5 text-[13px] transition-colors duration-300 hover:border-(--k-ink) lg:col-span-12"
        >
          All exhibitions
        </a>
      </div>

      <ol className="space-y-5 lg:space-y-5">
        {SHOWS.map((show, index) => (
          <li key={show.title}>
            <InView>
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  GRID,
                  "group items-start gap-y-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)",
                )}
              >
                {/* Words, held at the top of the row while the poster passes. */}
                <div className="ek6-rise col-span-4 grid grid-cols-2 gap-x-4 lg:sticky lg:top-[calc(44px+24px)] lg:col-span-6 lg:grid-cols-6 lg:gap-x-5">
                  <div className="col-span-1 lg:col-span-3">
                    <p className="text-[12px] tabular-nums text-(--k-ink)/65">
                      {pad(index + 1)}
                    </p>
                    <h3
                      className={cn(
                        "mt-1 text-[17px] leading-[1.2] font-medium tracking-[-0.01em] transition-transform duration-500 lg:group-hover:translate-x-1",
                        EASE,
                      )}
                    >
                      {show.title}
                    </h3>
                    <p className="mt-0.5 text-[15px] leading-[1.3] text-(--k-ink)/75">
                      {show.subtitle}
                    </p>
                  </div>
                  <div className="col-span-1 text-[13px] leading-[1.45] lg:col-span-3">
                    <p>{VENUE}</p>
                    <p>
                      {statusOf(show)} · {show.dates}
                    </p>
                  </div>
                </div>

                <div className="ek6-unveil col-span-4 lg:col-span-6">
                  <DriftPicture
                    src={show.image}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    priority={index === 0}
                    className="aspect-[16/10]"
                  />
                </div>
              </a>
            </InView>
          </li>
        ))}
      </ol>
    </section>
  );
}
