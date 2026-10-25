"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { ALL_EXHIBITIONS, LineArrow, SHOWS, pad } from "./shared";

/**
 * Variation 01 — list and preview, on the 12-column grid. The chosen show's
 * poster fills columns 1–6, cross-fading; columns 7–12 hold the shows as
 * ruled rows — number, title, dates and status — the chosen one marked with
 * a black square and an arrow. Hovering or focusing a row chooses it. The
 * two columns share the poster's height, the link to every exhibition on its
 * bottom edge.
 */
export function ExList() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-white pb-12 text-(--k-ink) lg:pb-16", SANS)}
    >
      <div className={cn(GRID, HEAD, "gap-y-6 pb-0 lg:pb-0")}>
        <div className="relative col-span-4 aspect-video overflow-hidden bg-(--k-ink)/5 lg:col-span-6">
          {SHOWS.map((show, index) => (
            <Image
              key={show.title}
              src={show.image}
              alt={index === active ? show.title : ""}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-500 ease-out",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div className="col-span-4 flex flex-col lg:col-span-6">
          <ol className="">
            {SHOWS.map((show, index) => (
              <li key={show.title} className="">
                <a
                  href={show.href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-3 py-3 lg:grid-cols-[2.5rem_1fr_13.5rem_4.5rem_2.5rem]"
                >
                  <span className="flex items-center gap-x-2 text-[12px] tabular-nums">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "size-1.5 bg-(--k-ink) transition-opacity duration-300",
                        index === active ? "opacity-100" : "opacity-0",
                      )}
                    />
                    {pad(index + 1)}
                  </span>
                  <span className="text-[17px] leading-tight tracking-[-0.01em] lg:text-[19px]">
                    {show.title}
                  </span>
                  <span className="hidden text-[14px] whitespace-nowrap lg:block">
                    {show.dates || "—"}
                  </span>
                  <span className={cn(CAPS, "text-[10px]")}>{show.status}</span>
                  <span
                    className={cn(
                      "hidden justify-self-end transition-opacity duration-300 lg:block",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    <LineArrow className="w-6" />
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <a
            href={ALL_EXHIBITIONS.href}
            className="mt-6 flex h-12 w-full shrink-0 items-center justify-between bg-(--k-ink) px-5 text-[14px] text-white transition-colors duration-300 hover:bg-(--k-maroon) sm:w-[280px] lg:mt-auto"
          >
            {ALL_EXHIBITIONS.label}
            <LineArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
