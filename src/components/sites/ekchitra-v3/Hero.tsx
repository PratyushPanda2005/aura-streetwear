"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HERO, HERO_SLIDES, ROUTES } from "../ekchitra-redesign/data";
import { Btn, GUTTER, SANS, SERIF } from "./shared";

const SLIDE_INTERVAL_MS = 6000;

/** Each word in its own clipped box so it can rise into place. */
function Words({ text }: { text: string }) {
  return (
    <span className="ek3-words">
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`}>
          <span>{word}&nbsp;</span>
        </span>
      ))}
    </span>
  );
}

/**
 * Full-screen hero: cross-fading photographs with the statement centred on top
 * in two lines — the first in the sans, the second in the serif — and two small
 * buttons beneath. The words rise in once the loading screen has lifted.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [first, second] = HERO.title.split(". ");

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
            "object-cover transition-[opacity,scale] duration-[1500ms,8000ms] ease-[ease-in-out,linear]",
            index === active
              ? "scale-[1.05] opacity-100"
              : "scale-100 opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-black/45" />

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center text-center",
          GUTTER,
        )}
      >
        <h1 className="text-[34px] leading-[1.05] tracking-[-0.2px] lg:text-[52px]">
          <span className="block font-medium">
            <Words text={`${first}.`} />
          </span>
          <span
            className={cn("block tracking-[-0.6px] [--ek3-start:1.75s]", SERIF)}
          >
            <Words text={second} />
          </span>
        </h1>
        <p className="mt-5 max-w-[440px] text-[14px] leading-5 text-(--ek-paper)/85">
          {HERO.body}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Btn variant="white" href={HERO.cta.href}>
            {HERO.cta.label}
          </Btn>
          <Btn variant="ghost" href={ROUTES.artists}>
            Meet the artists
          </Btn>
        </div>
      </div>

      <p
        className={cn(
          "absolute bottom-5 left-0 text-[12px] leading-[14px]",
          GUTTER,
        )}
      >
        {HERO.eyebrow}
      </p>
      <button
        type="button"
        aria-pressed={!playing}
        onClick={() => setPlaying((value) => !value)}
        className={cn(
          "absolute right-0 bottom-5 text-[12px] leading-[14px] hover:underline",
          GUTTER,
        )}
      >
        {playing ? "Pause slideshow" : "Play slideshow"}
      </button>
    </section>
  );
}
