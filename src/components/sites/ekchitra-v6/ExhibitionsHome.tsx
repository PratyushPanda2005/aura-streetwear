"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import { Chars } from "../ekchitra-v5/Chars";
import { InView } from "../ekchitra-v5/InView";
import { BODY, SANS, TITLE } from "../ekchitra-v5/shared";
import { EXHIBITIONS } from "./data";
import { DriftPicture, EASE, useDrift } from "./motion";
import { BUTTON, GRID, HEAD } from "./styles";
import { Index } from "./ui";

/**
 * Three shows from the archive, picked by title for their posters: dark,
 * full-bleed images that fill the card (no white grounds or logo strips).
 */
const HOME_SHOWS = ["Satirical Symphony", "Tree of Life", "Pause & Reflect"];
const SHOWS = EXHIBITIONS.filter((show) => HOME_SHOWS.includes(show.title));

/**
 * The colour each card's gradient rises in, taken in turn from the brand:
 * black, maroon, navy — as KNMA tints each spotlight card to its picture.
 */
const TINTS = [
  "from-(--k-ink)/45 via-(--k-ink)/15",
  "from-(--k-maroon)/45 via-(--k-maroon)/15",
  "from-(--k-navy)/45 via-(--k-navy)/15",
];

const statusOf = (show: (typeof SHOWS)[number]) =>
  show.status === "Current"
    ? /\d/.test(show.dates)
      ? "Upcoming"
      : "Now on"
    : "Past";

/**
 * 02 — Exhibitions, after the "Spotlight" cards on knma.org: the section
 * index and heading every homepage section opens with, then three shows as
 * large cards on the page margins, one under another. Each poster fills its
 * card and drifts gently as the page scrolls; a light wash of a brand colour
 * rises from the foot, and over it, in white, the title set large, the
 * curator, the status and dates, and at the right a white button to the
 * show. Each card's corners are folded in, after
 * knma.org; on hover the poster settles slowly closer and the button's arrow steps right.
 */
export function ExhibitionsHome() {
  const root = useRef<HTMLElement>(null);
  useDrift(root, []);

  return (
    <section
      ref={root}
      id="exhibitions"
      aria-labelledby="exhibitions-heading"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index n={2} label="Exhibitions" />
          <h2 id="exhibitions-heading" className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text="Now and next at EkChitra" />
          </h2>
          <p className={cn(BODY, "mt-6 max-w-[360px] text-(--k-ink)/70")}>
            <Chars text="Every exhibition begins with an idea, and every visit begins with curiosity." />
          </p>
        </div>
      </div>

      <ol className="space-y-4 px-4 lg:space-y-5 lg:px-5">
        {SHOWS.map((show, index) => (
          <li key={show.title}>
            <InView>
              <div className="ek6-rise">
                <a
                  href={show.href}
                  target="_blank"
                  rel="noreferrer"
                  className="ek6-fold group relative flex aspect-[4/5] flex-col justify-end overflow-hidden text-white focus-visible:outline-none sm:aspect-video lg:aspect-[2/1]"
                >
                  <DriftPicture
                    src={show.image}
                    sizes="100vw"
                    className="absolute inset-0"
                  />
                  {/* A light wash of a brand colour rising from the foot, over
                    a soft shade that keeps the white words legible. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-black/60 via-black/35 to-transparent"
                  />
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-0 bottom-0 h-[65%] bg-linear-to-t to-transparent",
                      TINTS[index % TINTS.length],
                    )}
                  />
                  <span className="relative flex flex-col gap-y-6 p-5 sm:flex-row sm:items-end sm:justify-between lg:p-10">
                    <span className="block">
                      <span className="block text-[34px] leading-[1.02] tracking-[-0.04em] lg:text-[4.4vw]">
                        {show.title}
                      </span>
                      <span className="mt-2 block text-[15px] lg:mt-3 lg:text-[17px]">
                        {show.subtitle}
                      </span>
                      <span className="mt-5 block text-[13px] leading-[1.5] text-white/85 lg:mt-6">
                        <span className="block">
                          {statusOf(show)} ·{" "}
                          {show.dates || "Dates to be announced"}
                        </span>
                        <span className="block">EkChitra, Hyderabad</span>
                      </span>
                    </span>
                    <span className={cn(BUTTON, "bg-white text-(--k-ink)")}>
                      View exhibition
                      <span
                        aria-hidden="true"
                        className={cn(
                          "transition-transform duration-500 group-hover:translate-x-1 motion-reduce:transition-none",
                          EASE,
                        )}
                      >
                        →
                      </span>
                    </span>
                  </span>
                </a>
              </div>
            </InView>
          </li>
        ))}
      </ol>
    </section>
  );
}
