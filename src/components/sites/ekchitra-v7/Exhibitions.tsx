"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { EXHIBITIONS } from "../ekchitra-v6/data";
import { DISPLAY, MONO, V5_ROUTES } from "./styles";
import { Arrow, Label, MonoButton } from "./ui";

const SHOWS = EXHIBITIONS.slice(0, 6);
const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Exhibitions, after the reference's testimonial carousel: the section name
 * huge, then one show at a time — its title set large on white with arrows
 * to step through, the poster beside it in grey, and a black cell giving
 * its status, dates and curator. Slides crossfade.
 */
export function Exhibitions() {
  const [active, setActive] = useState(0);
  const show = SHOWS[active];
  const step = (by: number) =>
    setActive((i) => (i + by + SHOWS.length) % SHOWS.length);

  return (
    <section
      id="exhibitions"
      aria-labelledby="e7-exhibitions"
      aria-roledescription="carousel"
      className="scroll-mt-(--e7-header) border-b border-(--e7-rule)"
    >
      <div className="grid grid-cols-1 border-b border-(--e7-rule) lg:grid-cols-4">
        <div className="flex items-end px-5 pb-5 lg:col-span-2 lg:order-2 lg:justify-end">
          <Label className="mt-16 lg:mt-0">Four to six shows a year</Label>
        </div>
        <h2
          id="e7-exhibitions"
          className={cn(
            DISPLAY,
            "px-5 pt-6 pb-5 lg:col-span-2 lg:pt-[6vw] lg:order-1",
          )}
        >
          Shows
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div className="flex min-h-[340px] flex-col justify-between gap-y-10 border-(--e7-rule) p-5 lg:col-span-2 lg:min-h-[36vw] lg:border-r">
          <div className="relative">
            {SHOWS.map((item, i) => (
              <p
                key={item.title}
                aria-hidden={i !== active}
                className={cn(
                  "text-[40px] leading-[0.95] tracking-[-0.045em] transition-opacity duration-500 lg:text-[3.9vw]",
                  i === 0 ? "relative" : "absolute inset-x-0 top-0",
                  i === active
                    ? "opacity-100"
                    : "pointer-events-none opacity-0",
                )}
              >
                &ldquo;{item.title}&rdquo;
              </p>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-x-px">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous exhibition"
                className="flex size-11 items-center justify-center bg-(--e7-grey) transition-colors hover:bg-(--e7-ink) hover:text-white"
              >
                <Arrow className="rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next exhibition"
                className="flex size-11 items-center justify-center bg-(--e7-grey) transition-colors hover:bg-(--e7-ink) hover:text-white"
              >
                <Arrow />
              </button>
            </div>
            <p className={MONO} aria-live="polite">
              {pad(active + 1)} — {pad(SHOWS.length)}
            </p>
          </div>
        </div>

        <div className="relative aspect-[4/5] overflow-hidden bg-(--e7-grey) sm:aspect-[4/3] lg:aspect-auto">
          {SHOWS.map((item, i) => (
            <Image
              key={item.title}
              src={item.image}
              alt={i === active ? `Poster for ${item.title}` : ""}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className={cn(
                "object-cover transition-opacity duration-700",
                i === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>

        <div className="flex flex-col justify-between gap-y-10 bg-(--e7-navy) p-5 text-white">
          <dl className="flex flex-col gap-y-6">
            {[
              { term: "Status", value: show.status },
              { term: "Dates", value: show.dates || "To be announced" },
              {
                term: "Curator",
                value: show.subtitle.replace(/^Curated by\s*/i, ""),
              },
            ].map((row) => (
              <div key={row.term}>
                <dt className={cn(MONO, "text-white/55")}>{row.term}</dt>
                <dd className="mt-2 text-[20px] leading-[1.1] tracking-[-0.03em]">
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
          <MonoButton href={V5_ROUTES.exhibitions} light>
            All exhibitions
          </MonoButton>
        </div>
      </div>
    </section>
  );
}
