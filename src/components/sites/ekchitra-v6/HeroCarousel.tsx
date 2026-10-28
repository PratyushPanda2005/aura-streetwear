"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Dotted } from "./Dotted";

/** How long each picture holds before the next fades in, ms. */
const HOLD = 4500;

/** A small round step button on the dark pill. */
const ARROW =
  "grid size-6 place-items-center rounded-full transition-colors duration-200 hover:bg-white/20 focus-visible:outline-1 focus-visible:outline-white";

/** A thin chevron pointing right; rotate it for left. */
function Chevron({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={cn("size-3", className)}
    >
      <path
        d="M4.5 2.5 8 6l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

/**
 * Artworks cross-fading on their own: each one fades in on top of the last
 * while settling from a slight zoom. In the bottom-right corner, on a dark
 * pill so it reads over any picture, small previous and next buttons flank a
 * row of dots showing which one is up; stepping by hand restarts the timer.
 * Doesn't advance on its own when the visitor prefers reduced motion.
 */
export function HeroCarousel({
  slides,
  dotted = false,
  className,
}: {
  slides: { src: string; alt: string }[];
  /** Show the pictures dotted, clearing on hover (see .ek6-dots). */
  dotted?: boolean;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  // Bumped on every manual step, so the timer starts its count again.
  const [steps, setSteps] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      HOLD,
    );
    return () => window.clearInterval(id);
  }, [slides.length, steps]);

  const step = (by: number) => {
    setActive((index) => (index + by + slides.length) % slides.length);
    setSteps((count) => count + 1);
  };

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-white",
        dotted && "group",
        className,
      )}
    >
      {/* The pictures, cross-fading. When dotted they are drawn twice (see
          Dotted); both copies share the same state, so they change together. */}
      <Dotted on={dotted}>
        {slides.map((slide, index) => (
          <Image
            key={slide.src}
            src={slide.src}
            alt={index === active ? slide.alt : ""}
            aria-hidden={index !== active}
            fill
            priority={index === 0}
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

      {/* Previous and next, either side of where the run is. */}
      <div className="absolute right-5 bottom-5 z-20 flex items-center gap-x-1 rounded-full bg-(--k-ink)/55 p-1 text-white backdrop-blur-sm">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous artwork"
          className={ARROW}
        >
          <Chevron className="rotate-180" />
        </button>
        <div aria-hidden="true" className="flex items-center gap-x-1.5 px-1">
          {slides.map((slide, index) => (
            <span
              key={slide.src}
              className={cn(
                "h-1.5 rounded-full bg-white transition-[width,opacity] duration-500 ease-out",
                index === active ? "w-5 opacity-100" : "w-1.5 opacity-60",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next artwork"
          className={ARROW}
        >
          <Chevron />
        </button>
      </div>
    </div>
  );
}
