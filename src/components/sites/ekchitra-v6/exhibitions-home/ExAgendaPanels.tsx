"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { BODY, CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { ALL_HREF, SHOWS, VENUE, pad, statusOf, yearOf } from "./shared";

/** A show's title, in the house size for a listed thing set large. */
const SHOW_TITLE =
  "text-[40px] leading-[1.02] tracking-[-0.04em] lg:text-[4.4vw]";

/** The side labels: the house heading size, regular weight. */
const SIDE = "text-[30px] leading-[1.05] tracking-[-0.035em] lg:text-[44px]";

/** Stagger for the stacked lines, then the poster. */
const DELAYS = [
  "[--delay:0ms]",
  "[--delay:70ms]",
  "[--delay:140ms]",
  "[--delay:210ms]",
];

/**
 * 05 — Agenda panels, after the day-by-day agenda on chandebootcamp.com,
 * set in the v6 house style: on white, one compact panel per show between
 * hairlines. Each opens with the shows as a row of square chips (this one
 * filled) that jump between panels, then the venue and curator in small
 * capitals, the title large and the status and dates — each line sliding up
 * out of a mask in turn — and the poster centred under them. On desktop the
 * number and year (left) and status (right) are pinned at mid-screen for the
 * whole run of panels, sliding to each show's values as its panel crosses
 * the middle of the screen; on a phone they sit as a row in each panel.
 */
export function ExAgendaPanels() {
  const panels = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // The pinned labels follow whichever panel crosses the middle of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index));
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const panel of panels.current) if (panel) observer.observe(panel);
    return () => observer.disconnect();
  }, []);

  /** One pinned label: every show's value stacked, the active one shown. */
  const label = (values: string[], align: "left" | "right") => (
    <span
      className={cn(
        "relative block h-[1.05em] overflow-hidden",
        align === "right" && "text-right",
      )}
    >
      {values.map((value, n) => (
        <span
          key={n}
          className={cn(
            "absolute inset-x-0 top-0 transition-[translate,opacity] duration-500 motion-reduce:transition-none",
            EASE,
            n === active
              ? "translate-y-0 opacity-100"
              : n < active
                ? "-translate-y-full opacity-0"
                : "translate-y-full opacity-0",
          )}
        >
          {value}
        </span>
      ))}
    </span>
  );

  return (
    <div
      role="region"
      aria-label="Exhibitions"
      className={cn("relative bg-white text-(--k-ink)", SANS)}
    >
      {/* Desktop: the side labels, pinned at mid-screen for the whole run. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 hidden lg:block"
      >
        <div
          className={cn(
            SIDE,
            "sticky top-[calc(50svh-1.05em)] flex justify-between px-5 tabular-nums",
          )}
        >
          <span className="block w-[12vw]">
            {label(
              SHOWS.map((_, n) => pad(n + 1)),
              "left",
            )}
            <span className="block text-(--k-ink)/45">
              {label(SHOWS.map(yearOf), "left")}
            </span>
          </span>
          <span className="block w-[16vw]">
            {label(SHOWS.map(statusOf), "right")}
            <span className="block text-right text-(--k-ink)/45">
              Hyderabad
            </span>
          </span>
        </div>
      </div>

      {SHOWS.map((show, index) => (
        <section
          key={show.title}
          id={`ex-agenda-${index + 1}`}
          ref={(el) => {
            panels.current[index] = el;
          }}
          data-index={index}
          aria-label={show.title}
          className="relative scroll-mt-11"
        >
          <InView>
            <div className="relative px-4 py-14 lg:px-5 lg:py-20">
              {/* Phone: the number, year and status as a row. */}
              <p className="mb-8 flex justify-between text-[13px] tabular-nums lg:hidden">
                <span>
                  {pad(index + 1)} · {yearOf(show)}
                </span>
                <span>{statusOf(show)}</span>
              </p>

              {/* The chips: every show, this one filled. */}
              <nav aria-label="Shows" className="flex justify-center">
                <ul className="flex flex-wrap justify-center gap-1.5">
                  {SHOWS.map((item, n) => (
                    <li key={item.title}>
                      <a
                        href={`#ex-agenda-${n + 1}`}
                        aria-label={item.title}
                        aria-current={n === index ? "true" : undefined}
                        className={cn(
                          "flex h-8 items-center border px-3 text-[13px] tabular-nums transition-colors duration-300",
                          n === index ? "bg-(--k-ink) text-white" : "",
                        )}
                      >
                        {pad(n + 1)}
                      </a>
                    </li>
                  ))}
                  <li>
                    <a
                      href={ALL_HREF}
                      className="flex h-8 items-center border border-(--k-ink)/20 px-3 text-[13px] transition-colors duration-300 hover:border-(--k-ink)"
                    >
                      All
                    </a>
                  </li>
                </ul>
              </nav>

              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className="group mx-auto mt-10 block max-w-[760px] text-center focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--k-ink) lg:mt-12"
              >
                <span className={cn("ek6-mask", DELAYS[0])}>
                  <span className={cn(CAPS, "text-(--k-ink)/65")}>
                    {/* The curator's name kept on one line. */}
                    {VENUE} · {show.subtitle.replace(/ (\S+)$/, " $1")}
                  </span>
                </span>
                <span className={cn("ek6-mask mt-4", DELAYS[1], SHOW_TITLE)}>
                  <span
                    className={cn(
                      "transition-colors duration-500 group-hover:text-(--k-maroon)",
                      EASE,
                    )}
                  >
                    {show.title}
                  </span>
                </span>
                <span className={cn("ek6-mask mt-3", DELAYS[2], BODY)}>
                  <span className="text-(--k-ink)/75">
                    {statusOf(show)} · {show.dates}
                  </span>
                </span>

                {/* The poster, centred under the lines. */}
                <span
                  className={cn(
                    "ek6-unveil relative mx-auto mt-8 block aspect-video w-full max-w-[480px] overflow-hidden lg:mt-10",
                    DELAYS[3],
                  )}
                >
                  <Image
                    src={show.image}
                    alt={show.title}
                    fill
                    sizes="(min-width: 640px) 480px, 100vw"
                    className={cn(
                      "object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04] motion-reduce:transition-none",
                      EASE,
                    )}
                  />
                </span>
                <span className="mt-4 inline-flex items-center gap-x-2 text-[13px]">
                  View exhibition
                  <span
                    aria-hidden="true"
                    className={cn(
                      "transition-transform duration-500 group-hover:translate-x-1",
                      EASE,
                    )}
                  >
                    →
                  </span>
                </span>
              </a>
            </div>
          </InView>
        </section>
      ))}
    </div>
  );
}
