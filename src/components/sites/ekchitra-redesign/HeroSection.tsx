"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { HERO, HERO_SLIDES } from "./data";
import { Button, FONT, Heading, Label, Text } from "./design-system";

/** Time each slide stays on screen before cross-fading to the next. */
const SLIDE_INTERVAL_MS = 6000;

/**
 * Full-bleed hero: a full-screen media band with a dark scrim, centred
 * serif title, a white call-to-action and a play/pause control.
 *
 * The media is a slow cross-fade of gallery photographs standing in for a film;
 * the bottom-right control pauses and resumes it.
 */
export function HeroSection() {
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
        "relative h-svh min-h-[560px] w-full overflow-hidden bg-[#f3f3f3]",
        FONT.sans,
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
            "object-cover transition-[opacity,scale] duration-[1500ms,7000ms] ease-[ease-in-out,linear]",
            index === active
              ? "scale-[1.06] opacity-100"
              : "scale-100 opacity-0",
          )}
        />
      ))}

      {/* Scrims: a top fade under the header and a soft pool behind the copy, so the
          edges of the photograph stay at full strength. */}
      <div className="absolute inset-x-0 top-0 h-[220px] bg-linear-to-b from-black/55 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_62%_58%_at_50%_55%,rgb(0_0_0/0.56)_0%,rgb(0_0_0/0.38)_45%,rgb(0_0_0/0.04)_100%)]">
        <div className="flex h-full flex-col items-center justify-center px-4 pt-16 text-center [text-shadow:0_1px_2px_rgb(0_0_0/0.5),0_2px_18px_rgb(0_0_0/0.45)]">
          <Label className="mb-4 text-(--ek-paper)">{HERO.eyebrow}</Label>
          <Heading as="h1" className="text-(--ek-paper)">
            {HERO.title}
          </Heading>
          <Text className="mt-4 max-w-[640px] text-(--ek-paper)">
            {HERO.body}
          </Text>
          <Button variant="light" href={HERO.cta.href} className="mt-8">
            {HERO.cta.label}
          </Button>
        </div>
      </div>

      <button
        type="button"
        aria-label={playing ? "Pause slideshow" : "Play slideshow"}
        aria-pressed={!playing}
        onClick={() => setPlaying((value) => !value)}
        className="absolute right-5 bottom-5 z-10 hidden size-8 items-center justify-center rounded-full bg-black/20 text-(--ek-paper) transition-colors duration-150 ease-in-out hover:bg-black/50 min-[600px]:flex"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-4">
          {playing ? (
            <>
              <rect x="4" y="3" width="2" height="10" fill="currentColor" />
              <rect x="10" y="3" width="2" height="10" fill="currentColor" />
            </>
          ) : (
            <path d="M13,8L5,3v10L13,8z" fill="currentColor" />
          )}
        </svg>
      </button>
    </section>
  );
}
