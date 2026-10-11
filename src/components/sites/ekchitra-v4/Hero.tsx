"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HERO, HERO_SLIDES } from "../ekchitra-redesign/data";
import { CAPS, SANS, SERIF } from "./shared";

/** Time each photograph stays on screen before cross-fading to the next. */
const SLIDE_INTERVAL_MS = 6000;

/**
 * Full-screen hero: slowly drifting gallery photographs standing in for a film,
 * the headline low and centred like a caption, and a play/pause control in the
 * bottom-right corner.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  return (
    <section
      id="top"
      className={cn(
        "relative h-svh min-h-[560px] overflow-hidden bg-(--v-night) text-white",
        SANS,
      )}
    >
      {HERO_SLIDES.map((slide, index) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          preload={index === 0}
          className={cn(
            "object-cover transition-[opacity,scale] duration-[1500ms,8000ms] ease-[ease-in-out,linear]",
            index === active
              ? "scale-[1.06] opacity-100"
              : "scale-100 opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-x-0 top-0 h-[200px] bg-linear-to-b from-black/50 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-black/70 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 px-4 pb-20 text-center lg:pb-12">
        <p className={cn(CAPS, "opacity-80")}>{HERO.eyebrow}</p>
        <h1
          className={cn(
            SERIF,
            "mx-auto mt-4 max-w-[900px] text-[40px] leading-[1] tracking-[-0.02em] lg:text-[60px]",
          )}
        >
          Art is everywhere. <span>We help you notice.</span>
        </h1>
      </div>

      <button
        type="button"
        aria-pressed={!playing}
        onClick={() => setPlaying((value) => !value)}
        className={cn(
          CAPS,
          "absolute right-4 bottom-6 flex items-center gap-x-3 transition-opacity duration-300 hover:opacity-60 lg:right-6",
        )}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
          {playing ? (
            <path
              d="M5.5 3v10M10.5 3v10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          ) : (
            <path
              d="M5 3l8 5-8 5z"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          )}
        </svg>
        {playing ? "Pause" : "Play"}
      </button>
    </section>
  );
}
