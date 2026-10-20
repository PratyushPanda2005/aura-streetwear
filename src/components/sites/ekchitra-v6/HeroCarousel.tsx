"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/** How long each picture holds before the next fades in, ms. */
const HOLD = 4500;

/**
 * Artworks cross-fading on their own, with no controls: each one fades in on
 * top of the last while settling from a slight zoom, and a row of dots in the
 * bottom-right corner (on a dark pill, so it reads over any picture) shows
 * which one is up. Stays on the first picture when
 * the visitor prefers reduced motion.
 */
export function HeroCarousel({
  slides,
  className,
}: {
  slides: { src: string; alt: string }[];
  className?: string;
}) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      HOLD,
    );
    return () => window.clearInterval(id);
  }, [slides.length]);

  return (
    <div className={cn("relative overflow-hidden bg-white", className)}>
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

      {/* Where the run is: indicators only, not controls. */}
      <div
        aria-hidden="true"
        className="absolute right-5 bottom-5 z-20 flex items-center gap-x-1.5 rounded-full bg-(--k-ink)/55 px-2.5 py-2 backdrop-blur-sm"
      >
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
    </div>
  );
}
