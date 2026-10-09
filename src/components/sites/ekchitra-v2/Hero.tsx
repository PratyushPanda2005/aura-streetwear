"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HERO, HERO_SLIDES } from "../ekchitra-redesign/data";
import { DISPLAY, CtaLink, SANS } from "./shared";

const SLIDE_INTERVAL_MS = 6000;

/**
 * Full-screen hero: cross-fading photographs edge to edge, the statement and
 * action at the bottom left and a pause control at the bottom right.
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
        "relative h-svh min-h-[560px] overflow-hidden bg-(--ek-ink) text-(--ek-paper)",
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
            "object-cover transition-opacity duration-[1500ms] ease-in-out",
            index === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/10 to-black/70" />

      <div className="absolute inset-x-3 bottom-24 lg:inset-x-10 lg:bottom-[88px]">
        <p className="text-[15px] leading-6 lg:text-[16px]">{HERO.eyebrow}</p>
        <h1
          className={cn(
            "mt-3 max-w-[900px] text-[clamp(44px,5.6vw,80px)] leading-none",
            DISPLAY,
          )}
        >
          {HERO.title}
        </h1>
        <p className="mt-5 max-w-[520px] text-[16px] leading-6 text-(--ek-paper)/85">
          {HERO.body}
        </p>
        <CtaLink variant="light" href={HERO.cta.href} className="mt-7">
          {HERO.cta.label}
        </CtaLink>
      </div>

      <button
        type="button"
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        aria-pressed={!playing}
        onClick={() => setPlaying((value) => !value)}
        className="absolute right-3 bottom-6 flex size-[58px] items-center justify-center rounded-full border-2 border-(--ek-paper) transition-colors duration-200 hover:bg-(--ek-paper) hover:text-(--ek-ink) lg:right-10 lg:bottom-[46px]"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-6">
          {playing ? (
            <>
              <rect x="4" y="3" width="2.6" height="10" fill="currentColor" />
              <rect x="9.4" y="3" width="2.6" height="10" fill="currentColor" />
            </>
          ) : (
            <path d="M13,8L5,3v10L13,8z" fill="currentColor" />
          )}
        </svg>
      </button>
    </section>
  );
}
