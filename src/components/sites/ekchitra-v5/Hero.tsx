"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { EVENTS, HERO, HERO_SLIDES } from "../ekchitra-redesign/data";
import { Chars } from "./Chars";
import { SHRINK_SCREENS } from "./Header";
import { CapsLink } from "./CapsLink";
import { CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/** Time each photograph stays on screen before cross-fading to the next. */
const SLIDE_INTERVAL_MS = 6000;

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

/**
 * Hero: more than half a screen of white for the large logo, a thin line with
 * the gallery's city and local time on the left and the current exhibition on
 * the right, then a photograph with the headline over its lower-left corner.
 * The photograph starts edge to edge, peeking over the bottom of the screen, and
 * draws in from the sides as it is scrolled up under the bar (`--h` runs 0–1).
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const amount = Math.min(
        1,
        window.scrollY / (window.innerHeight * SHRINK_SCREENS),
      );
      el.style.setProperty("--h", amount.toFixed(3));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tick = () => setTime(formatTime());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(
      () => setActive((index) => (index + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL_MS,
    );
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      ref={ref}
      id="top"
      className={cn("pt-[46svh] lg:pt-[calc(62svh-30px)]", SANS)}
    >
      <div className={cn("flex items-end justify-between pb-3", GUTTER)}>
        <p className={CAPS}>
          Hyderabad <span suppressHydrationWarning>{time}</span>
        </p>
        <CapsLink href="#exhibitions" className="normal-case tracking-normal">
          {EVENTS[0].title}
        </CapsLink>
      </div>

      <div className="relative mx-[calc(var(--h,0)_*_16px)] h-[calc(100svh-110px)] min-h-[420px] overflow-hidden bg-(--k-ink) lg:mx-[calc(var(--h,0)_*_20px)] lg:h-[calc(100svh-130px)]">
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
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-black/70 to-transparent" />
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 pb-8 text-white lg:pb-12",
            GUTTER,
          )}
        >
          <p className={CAPS}>
            <Chars text={HERO.eyebrow} />
          </p>
          <h1
            className={cn(
              DISPLAY,
              "mt-4 max-w-[760px] text-[38px] leading-[1.08] lg:text-[64px]",
            )}
          >
            <Chars text={HERO.title} />
          </h1>
        </div>
      </div>
    </section>
  );
}
