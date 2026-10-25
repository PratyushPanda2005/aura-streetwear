import Image from "next/image";

import { cn } from "@/lib/utils";

import { CapsLink } from "../ekchitra-v5/CapsLink";
import { Chars } from "../ekchitra-v5/Chars";
import { InView } from "../ekchitra-v5/InView";
import { Reveal } from "../ekchitra-v5/Reveal";
import { CAPS, SANS, TITLE, V5_ROUTES } from "../ekchitra-v5/shared";
import { EXHIBITIONS } from "./data";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

const CURRENT = EXHIBITIONS.filter((show) => show.status === "Current").slice(
  0,
  2,
);
const PAST = EXHIBITIONS.filter((show) => show.status === "Past").slice(0, 4);

/** The year a show's dates fall in, or a dash when the site gives none. */
const year = (dates: string) => dates.match(/\d{4}/)?.[0] ?? "—";

/**
 * 02 — Exhibitions: what is on and what is next, then the archive.
 *
 * The two current shows sit side by side across six columns each — the
 * poster wiping open from the bottom as it scrolls in, the picture settling
 * from a slight zoom — with a small tag, the title, the dates and the
 * curator under each. Below, the last four shows run as an index on the
 * grid: year, title set large, curator and an arrow, each row rising into
 * place in turn.
 */
export function ExhibitionsNow() {
  return (
    <section
      id="exhibitions"
      className={cn(
        "scroll-mt-11 bg-white pb-16 text-(--k-ink) lg:pb-24",
        SANS,
      )}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index n={2} label="Exhibitions" />
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text="Current & upcoming" />
          </h2>
        </div>
        <div className="col-span-4 mt-6 flex items-end lg:col-span-5 lg:col-start-8 lg:mt-0 lg:justify-end">
          <CapsLink arrow href={V5_ROUTES.exhibitions}>
            All exhibitions
          </CapsLink>
        </div>
      </div>

      <div className={cn(GRID, "gap-y-12")}>
        {CURRENT.map((show, index) => (
          <InView
            key={show.title}
            delay={index * 160}
            className="col-span-4 lg:col-span-6"
          >
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="ek5-wipe relative aspect-[5/4] overflow-hidden bg-(--k-ink)/5">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="ek5-fade mt-5 grid grid-cols-6 gap-x-5">
                <p
                  className={cn(
                    CAPS,
                    "col-span-6 self-start justify-self-start bg-(--k-ink) px-2 py-1 text-[10px] text-white",
                  )}
                >
                  {index === 0 ? "On now" : "Up next"}
                </p>
                <h3 className="col-span-6 mt-4 text-[30px] leading-none tracking-[-0.035em] lg:col-span-4 lg:text-[40px]">
                  {show.title}
                </h3>
                <div className="col-span-6 mt-3 text-[14px] leading-[1.45] text-(--k-ink)/65 lg:col-span-2 lg:mt-4 lg:text-right">
                  <p>{show.dates}</p>
                  <p>{show.subtitle}</p>
                </div>
              </div>
            </a>
          </InView>
        ))}
      </div>

      <div className={cn(GRID, "mt-16 lg:mt-24")}>
        <p
          className={cn(
            CAPS,
            "col-span-4 pb-4 text-[10px] text-(--k-ink)/60 lg:col-span-12",
          )}
        >
          From the archive
        </p>
      </div>
      <ul className="px-4 lg:px-5">
        {PAST.map((show) => (
          <li key={show.title}>
            <Reveal>
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className="grid grid-cols-4 items-baseline gap-x-4 py-5 transition-colors duration-300 hover:bg-(--k-ink) hover:text-white lg:grid-cols-12 lg:gap-x-5 lg:py-6"
              >
                <span className="text-[13px] tabular-nums opacity-60 lg:col-span-2 lg:pl-2">
                  {year(show.dates)}
                </span>
                <span className="col-span-3 text-[26px] leading-none tracking-[-0.03em] lg:col-span-6 lg:text-[40px]">
                  {show.title}
                </span>
                <span className="col-span-3 col-start-2 mt-2 text-[14px] opacity-60 lg:col-span-3 lg:col-start-9 lg:mt-0">
                  {show.dates || show.subtitle}
                </span>
                <span
                  aria-hidden="true"
                  className="hidden text-right text-[20px] lg:col-span-1 lg:block lg:pr-2"
                >
                  ↗
                </span>
              </a>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
