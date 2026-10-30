"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Dotted } from "./Dotted";

/** How long each picture holds before the next fades in, ms. */
const HOLD = 4500;

/** How far a drag or swipe has to travel sideways to change the picture, px. */
const SWIPE = 40;

/**
 * Artworks cross-fading on their own: each one fades in on top of the last
 * while settling from a slight zoom. At the bottom right, a dot per work, the current
 * one a bar filling while it holds (as the exhibition pages' slider);
 * clicking one goes to its work, and a swipe or a drag sideways steps
 * through them; stepping by hand restarts the timer (and the bar). Doesn't
 * advance on its own when the visitor prefers reduced motion.
 */
export function HeroCarousel({
  slides,
  dotted = false,
  className,
}: {
  /** `href`, when given, makes the picture showing a link (e.g. to its artwork). */
  slides: { src: string; alt: string; href?: string }[];
  /** Show the pictures dotted, clearing on hover (see .ek6-dots). */
  dotted?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  // Bumped on every manual step, so the timer (and the bar) start again.
  const [steps, setSteps] = useState(0);
  // Where a drag began, and whether the last one moved far enough to count
  // as a swipe (so letting go doesn't also follow the link).
  const start = useRef<number | null>(null);
  const swiped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      HOLD,
    );
    return () => window.clearInterval(id);
  }, [slides.length, steps]);

  const go = (index: number) => {
    setActive((index + slides.length) % slides.length);
    setSteps((count) => count + 1);
  };

  const slide = slides[active];

  return (
    <div
      className={cn(
        "relative touch-pan-y overflow-hidden bg-white select-none",
        dotted && "group",
        className,
      )}
      onPointerDown={(event) => {
        start.current = event.clientX;
        swiped.current = false;
      }}
      onPointerUp={(event) => {
        if (start.current === null) return;
        const moved = event.clientX - start.current;
        start.current = null;
        if (Math.abs(moved) < SWIPE) return;
        swiped.current = true;
        go(active + (moved < 0 ? 1 : -1));
      }}
      onPointerCancel={() => {
        start.current = null;
      }}
      onClickCapture={(event) => {
        if (swiped.current) {
          event.preventDefault();
          swiped.current = false;
        }
      }}
    >
      {/* The pictures, cross-fading. When dotted they are drawn twice (see
          Dotted); both copies share the same state, so they change together. */}
      <Dotted on={dotted}>
        {slides.map((item, index) => (
          <Image
            key={item.src}
            src={item.src}
            alt={index === active ? item.alt : ""}
            aria-hidden={index !== active}
            fill
            priority={index === 0}
            draggable={false}
            sizes="(max-width: 1023px) 100vw, 50vw"
            className={cn(
              "object-cover transition-[opacity,scale] ease-out",
              // The outgoing picture stays underneath until the new one is in.
              index === active
                ? "z-10 scale-100 opacity-100 duration-[1200ms,6000ms]"
                : "z-0 scale-[1.06] opacity-0 duration-0 delay-[1200ms]",
            )}
          />
        ))}
      </Dotted>

      {/* The picture showing, as a link to its artwork, under the bars. */}
      {slide?.href && (
        <a
          href={slide.href}
          draggable={false}
          aria-label={`View ${slide.alt}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
        />
      )}

      {/* As the exhibition pages' slider: a dot per work, at the bottom
          right, the current one stretched into a bar that fills while it
          holds; each goes to its work. White, on a small frosted-glass
          panel with rounded corners, so they read over any picture.
          Clicking them leaves any dots on (.ek6-keep-dots). */}
      <div className="ek6-keep-dots absolute right-4 bottom-4 z-20 flex items-center gap-x-2 rounded-md border border-white/25 bg-black/25 px-3 backdrop-blur-md">
        {slides.map((item, index) => {
          const on = index === active;
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => go(index)}
              aria-label={`Show ${item.alt}`}
              aria-current={on}
              className="flex h-6 items-center focus-visible:outline-1 focus-visible:outline-white"
            >
              <span
                className={cn(
                  "relative block h-1 overflow-hidden rounded-full bg-white/45 transition-[width,background-color] duration-500",
                  on ? "w-12" : "w-1 hover:bg-white/80",
                )}
              >
                {on && (
                  <span
                    key={steps}
                    // As long as HOLD; simply full when motion is reduced.
                    className="absolute inset-0 origin-left animate-[ek6-fill_4500ms_linear_forwards] bg-white motion-reduce:animate-none"
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
