"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { CapsLink } from "../../ekchitra-v5/CapsLink";
import { CAPS, DISPLAY, SANS } from "../../ekchitra-v5/shared";
import { EXHIBITIONS, V6_HOME } from "../data";
import { BUTTON, GRID, SECTION_TITLE } from "../styles";

/** The shows the bands carry: four recent ones with strong posters. */
const FEATURED = [
  "Hyd Art",
  "Swadhatri",
  "Naik City",
  "Mirror Mirror – Champa Tree",
]
  .map((title) => EXHIBITIONS.find((show) => show.title === title))
  .filter((show) => show !== undefined);

const FIRST_YEAR = Math.min(
  ...EXHIBITIONS.map((show) =>
    Number(show.dates.match(/\b20\d{2}\b/)?.[0]),
  ).filter(Boolean),
);

/** Distance from the top of one card to the top of the next (card + gap), px. */
const PITCH = 516;

/** Frosted card, a fixed 488px tall so the cards keep an even rhythm. */
const CARD =
  "pointer-events-auto flex h-[488px] w-[min(365px,calc(100vw-32px))] flex-col overflow-hidden rounded-[2px] bg-[rgb(240_240_240/0.85)] p-3 pb-5 text-(--k-ink) backdrop-blur-[24px]";

/** A band: one full screen, a window on to a poster that stays put behind it. */
const BAND = "relative h-svh min-h-[640px] [clip-path:inset(0)]";

const ROW = "grid grid-cols-[92px_1fr] gap-x-3 text-[13px] leading-[1.45]";

/**
 * Exhibitions on the About page, in the homepage artists' format: a label and
 * line, then one full-screen band per show, each a window on to its poster
 * fixed behind the page (drifting a touch for depth) while the next band
 * slides up over it. Frosted cards ride in one column on top — the poster,
 * the title, its status, dates and curator, and a link — eased so each is
 * centred as its poster fills the screen. A navy "View all exhibitions"
 * button holds the bottom-right corner while the bands pass.
 */
export function ExhibitionsBands() {
  const bandsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = bandsRef.current;
    const rail = railRef.current;
    if (!wrap || !rail) return;
    const bands = [...wrap.querySelectorAll<HTMLElement>("[data-band]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      const band = bands[0].offsetHeight;
      const scrolled = Math.min(
        Math.max(-wrap.getBoundingClientRect().top, 0),
        (bands.length - 1) * band,
      );
      const shift = (scrolled * (band - PITCH)) / band;
      rail.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      for (const item of bands) {
        const offset = item.getBoundingClientRect().top / view;
        item.style.setProperty(
          "--d",
          Math.max(-1, Math.min(1, offset)).toFixed(3),
        );
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      aria-labelledby="exhibitions-bands-heading"
      className={cn("bg-white text-(--k-ink)", SANS)}
    >
      <div className={cn(GRID, "gap-y-4 pb-10 lg:pb-12")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[12px]")}>Exhibitions</p>
          <h2
            id="exhibitions-bands-heading"
            className={cn(SECTION_TITLE, "mt-3")}
          >
            {EXHIBITIONS.length} exhibitions since {FIRST_YEAR}
          </h2>
        </div>
        <p className="col-span-4 self-end text-[16px] leading-[1.45] lg:col-span-4 lg:col-start-9">
          Every exhibition begins with an idea — each curated by Annapurna M.
        </p>
      </div>

      <div ref={bandsRef} className="relative overflow-clip">
        {FEATURED.map((show) => (
          <div key={show.title} data-band className={BAND}>
            <div
              className={cn(
                "fixed inset-x-0 -top-[10svh] -z-10 h-[120svh] will-change-transform",
                "translate-y-[calc(var(--d,0)_*_9svh)]",
              )}
            >
              <Image
                src={show.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-(--k-ink)/25" />
            </div>
          </div>
        ))}

        <div
          ref={railRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-y-7 pt-[max(84px,calc((100svh-488px)/2+8px))] will-change-transform"
        >
          {FEATURED.map((show) => (
            <article key={show.title} className={CARD}>
              <div className="relative aspect-video shrink-0 overflow-hidden rounded-[2px] bg-white">
                <Image
                  src={show.image}
                  alt=""
                  fill
                  sizes="365px"
                  className="object-cover"
                />
              </div>
              <h3
                className={cn(DISPLAY, "mt-3 mb-6 text-[30px] leading-[1.1]")}
              >
                {show.title}
              </h3>
              <dl className="flex flex-1 flex-col gap-y-2">
                <div className={ROW}>
                  <dt>Status</dt>
                  <dd>
                    {show.status === "Past" ? "Past" : "Now and upcoming"}
                  </dd>
                </div>
                <div className={ROW}>
                  <dt>Dates</dt>
                  <dd>{show.dates || "Date not listed"}</dd>
                </div>
                <div className={ROW}>
                  <dt>Curator</dt>
                  <dd>{show.subtitle.replace(/^Curated by\s+/i, "")}</dd>
                </div>
                <div className={cn(ROW, "mt-auto")}>
                  <dt />
                  <dd>
                    <CapsLink
                      arrow
                      href={show.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View exhibition
                      <span className="sr-only">: {show.title}</span>
                    </CapsLink>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>

        {/* The button, held in the screen's bottom-right corner while the
            bands pass. */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end">
          <a
            href={`${V6_HOME}/exhibitions`}
            className={cn(
              BUTTON,
              "pointer-events-auto sticky bottom-0 w-[208px] self-end bg-(--k-navy)",
            )}
          >
            {/* Two diamonds of the motif, corner to corner, in sky blue. */}
            <svg
              viewBox="0 0 16 16"
              aria-hidden="true"
              className="absolute top-1.5 right-1.5 size-3 fill-(--k-sky)"
            >
              <path d="M12 0l4 4-4 4-4-4zM4 8l4 4-4 4-4-4z" />
            </svg>
            <span>View all exhibitions</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
