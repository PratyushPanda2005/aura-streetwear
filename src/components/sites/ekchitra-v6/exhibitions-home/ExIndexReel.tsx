"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { ALL_HREF, SHOWS, VENUE, pad, statusOf, yearOf } from "./shared";

/**
 * How quickly the reel eases to the scroll position (1 = no easing). Each
 * index row is 30px tall, and the list slides by one row per show.
 */
const EASING = 0.12;

/**
 * 04 — Index reel, after the pinned work index on east64films.com: on brand
 * black the section holds the screen while it scrolls, the whole composition
 * centred on it. The posters run in a vertical strip at the centre; the
 * numbered index is split either side — title and number set against the
 * poster's left edge, curator, status and year from its right — sliding up
 * as you scroll so the current show sits on the poster's centre line in
 * white while the rest fade with distance. Under the posters the current
 * title is set large and centred. Rows link to their shows. Below `lg`, a
 * plain list.
 */
export function ExIndexReel() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const leftRows = useRef<(HTMLAnchorElement | null)[]>([]);
  const rightRows = useRef<(HTMLLIElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = section.current;
    const pin = stage.current;
    if (!el || !pin) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let target = 0;
    let current = 0;
    let frame = 0;
    let last = -1;

    const measure = () => {
      const rect = el.getBoundingClientRect();
      const travel = el.offsetHeight - window.innerHeight;
      const t = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 0;
      target = t * (SHOWS.length - 1);
    };
    const paint = () => {
      pin.style.setProperty("--p", current.toFixed(4));
      // Rows fade with distance from the centre line, on both sides.
      for (const list of [leftRows.current, rightRows.current]) {
        list.forEach((row, index) => {
          if (!row) return;
          const distance = Math.abs(index - current);
          row.style.opacity = String(Math.max(0.14, 1 - distance * 0.4));
        });
      }
      const next = Math.round(current);
      if (next !== last) {
        last = next;
        setActive(next);
      }
    };
    const tick = () => {
      current = reduce ? target : current + (target - current) * EASING;
      if (Math.abs(target - current) < 0.001) current = target;
      paint();
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };
    const onScroll = () => {
      measure();
      if (!frame) frame = requestAnimationFrame(tick);
    };
    measure();
    current = target;
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={section}
      id="exhibitions"
      aria-label="Exhibitions"
      className={cn(
        "relative scroll-mt-11 bg-(--k-ink) text-white lg:h-[280svh]",
        SANS,
      )}
    >
      {/* Desktop: the pinned reel, centred on the screen — the index split
          either side of the poster strip, the title beneath. */}
      <div
        ref={stage}
        className="sticky top-0 hidden h-svh flex-col items-center justify-center overflow-hidden [--img-h:calc(40vw*10/16)] [--p:0] lg:flex"
      >
        <div className="grid w-full grid-cols-[minmax(0,1fr)_40vw_minmax(0,1fr)] items-center gap-x-10 px-5">
          {/* Left: marker, title and number, set against the poster's edge. */}
          <div className="relative h-(--img-h)">
            <ol className="absolute inset-x-0 top-[calc(50%-15px)] translate-y-[calc(var(--p)*-30px)] will-change-transform">
              {SHOWS.map((show, index) => (
                <li key={show.title}>
                  <a
                    ref={(el) => {
                      leftRows.current[index] = el;
                    }}
                    href={show.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-[30px] items-center justify-end gap-x-6 text-[13px] tracking-[0.04em] uppercase hover:opacity-100! focus-visible:opacity-100! focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-white"
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "inline-block size-0 shrink-0 border-y-4 border-l-[6px] border-y-transparent border-l-white transition-opacity duration-300",
                        active === index ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="min-w-0 truncate">{show.title}</span>
                    <span className="w-6 shrink-0 text-right tabular-nums">
                      {pad(index + 1)}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>

          {/* Centre: the poster strip, sliding one poster per show. */}
          <div className="h-(--img-h) overflow-hidden">
            <div className="flex translate-y-[calc(var(--p)*-1*(var(--img-h)+24px))] flex-col gap-6 will-change-transform">
              {SHOWS.map((show) => (
                <div
                  key={show.title}
                  className="relative h-(--img-h) w-full shrink-0"
                >
                  <Image
                    src={show.image}
                    alt=""
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right: curator, status and year, set from the poster's edge. */}
          <div aria-hidden="true" className="relative h-(--img-h)">
            <ol className="absolute inset-x-0 top-[calc(50%-15px)] translate-y-[calc(var(--p)*-30px)] will-change-transform">
              {SHOWS.map((show, index) => (
                <li
                  key={show.title}
                  ref={(el) => {
                    rightRows.current[index] = el;
                  }}
                  className="grid h-[30px] grid-cols-[minmax(0,1fr)_4.5rem_3rem] items-center gap-x-6 text-[13px] tracking-[0.04em] uppercase"
                >
                  <span className="truncate">
                    {show.subtitle.replace("Curated by ", "")}
                  </span>
                  <span>{statusOf(show)}</span>
                  <span className="text-right tabular-nums">
                    {yearOf(show)}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* The current title, large and centred under the posters. */}
        <div className="relative mt-8 h-[calc(3.4vw+40px)] w-[60vw] text-center">
          {SHOWS.map((show, index) => (
            <p
              key={show.title}
              aria-hidden={active !== index}
              className={cn(
                "absolute inset-x-0 top-0 transition-[opacity,translate] duration-700",
                EASE,
                active === index
                  ? "translate-y-0 opacity-100"
                  : "translate-y-3 opacity-0",
              )}
            >
              <span className="block text-[3.4vw] leading-[1] tracking-[-0.04em]">
                {show.title}
              </span>
              <span
                className={cn(CAPS, "mt-3 block text-[11px] text-white/70")}
              >
                {show.subtitle} · {VENUE}
              </span>
            </p>
          ))}
        </div>

        <p
          className={cn(
            CAPS,
            "absolute bottom-5 left-5 text-[10px] text-white/60",
          )}
        >
          {pad(active + 1)} / {pad(SHOWS.length)}
        </p>
        <a
          href={ALL_HREF}
          className="absolute right-5 bottom-5 flex items-center gap-x-2 bg-white px-3 py-1.5 text-[12px] tracking-[0.06em] text-(--k-ink) uppercase transition-opacity hover:opacity-85"
        >
          <span aria-hidden="true">▸</span> All exhibitions
        </a>
      </div>

      {/* Below lg: a plain list. */}
      <ol className="space-y-10 px-4 py-20 lg:hidden">
        {SHOWS.map((show, index) => (
          <li key={show.title}>
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              className="block"
            >
              <span className="relative block aspect-video overflow-hidden">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </span>
              <span className="mt-4 flex items-baseline gap-x-3 text-[13px] uppercase tracking-[0.04em]">
                <span className="tabular-nums">{pad(index + 1)}</span>
                <span className="text-white/70">
                  {statusOf(show)} · {yearOf(show)}
                </span>
              </span>
              <span className="mt-2 block text-[30px] leading-[1.02] tracking-[-0.035em]">
                {show.title}
              </span>
              <span className="mt-1 block text-[14px] text-white/70">
                {show.subtitle}
              </span>
            </a>
          </li>
        ))}
        <li>
          <a
            href={ALL_HREF}
            className="inline-block border-b border-white pb-1 text-[15px]"
          >
            All exhibitions →
          </a>
        </li>
      </ol>
    </section>
  );
}
