"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { CAPS } from "../../ekchitra-v5/shared";
import { pad } from "../cta-variants/shared";
import { GRID } from "../styles";
import {
  Bar,
  CURRENT,
  Poster,
  ViewButton,
  datesOf,
  statusOf,
} from "./CurrentShows";

/** The house easing: a long, soft settle. */
const EASE = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * 05 — Wipe: an asymmetric pair (seven columns and five). As each comes into
 * view its poster opens upwards like a curtain lifting, and its words rise a
 * beat after, the second card a beat behind the first.
 */
export function CurrentWipe() {
  return (
    <div className={cn(GRID, "items-end gap-y-12")}>
      <Bar />
      {CURRENT.map((show, index) => (
        <InView
          key={show.title}
          delay={index * 180}
          className={cn(
            "col-span-4 flex flex-col",
            index === 0 ? "lg:col-span-7" : "lg:col-span-5",
          )}
        >
          <div className="ek5-clip">
            <Poster
              show={show}
              sizes={
                index === 0
                  ? "(min-width: 1024px) 58vw, 100vw"
                  : "(min-width: 1024px) 42vw, 100vw"
              }
            />
          </div>
          <div className="ek6-rise [--rise-delay:calc(var(--delay,0ms)+350ms)]">
            <p className={cn(CAPS, "mt-5 text-[12px]")}>{statusOf(show)}</p>
            <h3
              className={cn(
                "mt-2 leading-[1] tracking-[-0.045em]",
                index === 0
                  ? "text-[40px] lg:text-[3.8vw]"
                  : "text-[32px] lg:text-[2.6vw]",
              )}
            >
              {show.title}
            </h3>
            <p className="mt-3 border-t border-(--k-ink)/15 pt-3 text-[15px] leading-[1.45]">
              {show.subtitle} · {datesOf(show)}
            </p>
            <ViewButton show={show} className="mt-6" />
          </div>
        </InView>
      ))}
    </div>
  );
}

/**
 * 06 — Index and frame: the two titles set large as ruled lines in columns
 * 1–6, each with its status and dates; a framed poster in 7–12 cross-fades
 * (with a slight settle) to whichever line is under the pointer or focused.
 * On a phone each line shows its own poster.
 */
export function CurrentIndex() {
  const [active, setActive] = useState(0);
  return (
    <div className={cn(GRID, "items-start gap-y-8")}>
      <Bar />
      <ol className="col-span-4 lg:col-span-6">
        {CURRENT.map((show, index) => (
          <li key={show.title} className="border-b border-(--k-ink)/15">
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="group block py-5 lg:py-7"
            >
              <span className="flex items-baseline justify-between gap-x-4">
                <span className={cn(CAPS, "text-[12px]")}>
                  {pad(index + 1)} · {statusOf(show)}
                </span>
                <span className="text-[14px]">{datesOf(show)}</span>
              </span>
              <span
                className={cn(
                  "mt-3 block text-[40px] leading-[0.98] tracking-[-0.045em] transition-[color,translate] duration-500 lg:text-[4.2vw]",
                  EASE,
                  active === index
                    ? "translate-x-0 text-(--k-ink)"
                    : "text-(--k-ink)/60 lg:group-hover:translate-x-2",
                  "lg:group-hover:text-(--k-ink)",
                )}
              >
                {show.title}
              </span>
              {/* On a phone, the poster under its line (a plain image — the
                  whole line is already the link). */}
              <span className="relative mt-4 block aspect-video overflow-hidden bg-(--k-ink)/5 lg:hidden">
                <Image
                  src={show.image}
                  alt=""
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </span>
            </a>
          </li>
        ))}
      </ol>

      <div className="hidden lg:col-span-6 lg:block">
        <div className="grid border border-(--k-ink) p-3">
          {CURRENT.map((show, index) => (
            <div
              key={show.title}
              aria-hidden={active !== index}
              className={cn(
                "transition-opacity duration-700 [grid-area:1/1] motion-reduce:transition-none",
                EASE,
                active === index ? "opacity-100" : "opacity-0",
              )}
            >
              <div
                className={cn(
                  "transition-[scale] duration-[1100ms] motion-reduce:transition-none",
                  EASE,
                  active === index ? "scale-100" : "scale-[1.04]",
                )}
              >
                <Poster show={show} sizes="48vw" />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-baseline justify-between text-[15px]">
          <span>{CURRENT[active].subtitle}</span>
          <ViewButton show={CURRENT[active]} className="sm:w-[260px]" />
        </div>
      </div>
    </div>
  );
}

/**
 * 07 — Deck: the shows stacked like cards — the one in front at full size,
 * the other offset behind it, its edge showing. Hovering or choosing the one
 * behind slides it forward over the other. A pair of small tabs names both.
 */
export function CurrentDeck() {
  const [front, setFront] = useState(0);
  return (
    <div className={cn(GRID, "gap-y-8")}>
      <Bar />
      <div className="col-span-4 flex flex-col gap-y-4 lg:col-span-4">
        {CURRENT.map((show, index) => (
          <button
            key={show.title}
            type="button"
            onMouseEnter={() => setFront(index)}
            onFocus={() => setFront(index)}
            onClick={() => setFront(index)}
            aria-pressed={front === index}
            className={cn(
              "border-t pt-3 text-left transition-colors duration-300",
              front === index
                ? "border-(--k-ink) text-(--k-ink)"
                : "border-(--k-ink)/20 text-(--k-ink)/60 hover:text-(--k-ink)",
            )}
          >
            <span className={cn(CAPS, "block text-[12px]")}>
              {statusOf(show)}
            </span>
            <span className="mt-2 block text-[32px] leading-[1] tracking-[-0.04em] lg:text-[2.6vw]">
              {show.title}
            </span>
            <span className="mt-2 block text-[15px]">
              {show.subtitle} · {datesOf(show)}
            </span>
          </button>
        ))}
        <ViewButton show={CURRENT[front]} className="mt-2 lg:mt-auto" />
      </div>

      <div className="relative col-span-4 mt-2 mr-6 aspect-video lg:col-span-8 lg:mt-0 lg:mr-10">
        {CURRENT.map((show, index) => {
          const isFront = front === index;
          return (
            <div
              key={show.title}
              aria-hidden={!isFront}
              className={cn(
                "absolute inset-0 shadow-[0_18px_40px_-24px_rgb(25_25_25/0.45)] transition-[translate,scale,opacity] duration-700 motion-reduce:transition-none",
                EASE,
                isFront
                  ? "z-10 translate-x-0 translate-y-0 scale-100 opacity-100"
                  : "z-0 translate-x-6 -translate-y-6 scale-[0.96] opacity-80 lg:translate-x-10 lg:-translate-y-10",
              )}
            >
              <Image
                src={show.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 64vw, 100vw"
                className="bg-white object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * 08 — Drift: the pair side by side, each poster set slightly larger than its
 * frame and drifting a few per cent within it as the page scrolls, the second
 * against the first, for a quiet sense of depth. Held still for visitors who
 * prefer reduced motion.
 */
export function CurrentDrift() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches)
      return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const view = window.innerHeight;
      // -1 as the block enters at the bottom, 1 as it leaves at the top.
      const t = Math.max(
        -1,
        Math.min(1, (view / 2 - (rect.top + rect.height / 2)) / view),
      );
      el.style.setProperty("--drift", t.toFixed(4));
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
    <div ref={wrap} className={cn(GRID, "gap-y-12")}>
      <Bar />
      {CURRENT.map((show, index) => (
        <article
          key={show.title}
          className="col-span-4 flex flex-col lg:col-span-6"
        >
          <a
            href={show.href}
            target="_blank"
            rel="noreferrer"
            tabIndex={-1}
            aria-hidden="true"
            className="relative block aspect-video overflow-hidden bg-(--k-ink)/5"
          >
            <span
              className={cn(
                "absolute inset-x-0 -inset-y-[6%] block will-change-transform",
                index === 0
                  ? "translate-y-[calc(var(--drift,0)*5%)]"
                  : "translate-y-[calc(var(--drift,0)*-5%)]",
              )}
            >
              <Image
                src={show.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </span>
          </a>
          <p className={cn(CAPS, "mt-5 text-[12px]")}>{statusOf(show)}</p>
          <h3 className="mt-2 text-[36px] leading-[1] tracking-[-0.045em] lg:text-[3.2vw]">
            {show.title}
          </h3>
          <div className="mt-4 border-t border-(--k-ink)/15 pt-3 text-[15px] leading-[1.45]">
            <p>{show.subtitle}</p>
            <p>{datesOf(show)}</p>
          </div>
          <ViewButton show={show} className="mt-6" />
        </article>
      ))}
    </div>
  );
}
