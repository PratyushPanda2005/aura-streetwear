"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { EVENTS, HERO, HERO_SLIDES } from "../ekchitra-redesign/data";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { BODY, CAPS, GUTTER, PAGE_TITLE, SANS } from "./shared";

/** Time each photograph stays on screen before cross-fading to the next. */
const SLIDE_INTERVAL_MS = 6000;

/** Scroll distance over which the photograph draws in from the page edges. */
const INSET_PX = 360;

const formatTime = () =>
  new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

/**
 * Hero.
 *
 * A short white band at the top holds the large logo (it belongs to the header,
 * and rises into the bar on scroll) with the gallery's one-line description
 * centred beneath it and the diamond motif on both edges. A thin line follows
 * with the city and local time on the left and the current exhibition on the
 * right. Then the photograph: edge to edge at first, with the headline over its
 * lower-left corner, drawing in from the sides as it is scrolled up under the
 * bar (`--h` runs 0–1).
 *
 * On arrival everything enters in order: the logo rises in, the description
 * fades in letter by letter, the two diamond motifs appear diamond by diamond,
 * the photograph opens upwards like a curtain while settling from a slight zoom,
 * and the headline on it fades in last.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [time, setTime] = useState("");
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const amount = Math.min(1, window.scrollY / INSET_PX);
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
    <section ref={ref} id="top" className={cn("relative", SANS)}>
      {/* White band: room for the large logo, then the description. */}
      <div className="relative flex flex-col items-center px-4 pt-[148px] pb-8 text-center lg:pt-[206px] lg:pb-10">
        {/* Two quiet motifs, supporting rather than leading: pale grey with
            only a hint of colour. A stepped strip low on the left edge with a
            few sky-blue diamonds, and a short run of clusters hanging from the
            bar on the right with a couple of soft maroon ones — offset, not
            mirrored, so the logo stays the centre of attention. */}
        <Diamonds
          rows={16}
          shape="steps"
          tint="sky"
          tintEvery={19}
          tintOpacity={0.6}
          reveal={0.9}
          className="absolute bottom-5 left-0 hidden w-[96px] text-(--k-ink)/[0.07] lg:block"
        />
        <Diamonds
          rows={22}
          shape="clusters"
          tint="maroon"
          tintEvery={11}
          tintOpacity={0.45}
          horizontal
          reveal={0.5}
          className="absolute top-[60px] right-0 h-[18px] -scale-x-100 text-(--k-ink)/[0.07] lg:top-[68px] lg:h-[46px]"
        />
        <p className={cn(BODY, "max-w-[480px] text-[17px] lg:text-[19px]")}>
          <Chars text={HERO.body} />
        </p>
      </div>

      <div
        className={cn(
          "ek5-rise flex items-end justify-between pb-3 [--d:900ms]",
          GUTTER,
        )}
      >
        <p className={CAPS}>
          Hyderabad <span suppressHydrationWarning>{time}</span>
        </p>
        <CapsLink href="#exhibitions" className="normal-case tracking-normal">
          {EVENTS[0].title}
        </CapsLink>
      </div>

      <div className="ek5-curtain relative mx-[calc(var(--h,0)_*_16px)] h-[calc(100svh-110px)] min-h-[420px] overflow-hidden bg-(--k-ink) [--d:350ms] lg:mx-[calc(var(--h,0)_*_20px)] lg:h-[calc(100svh-130px)]">
        <div className="ek5-settle absolute inset-0 [--d:350ms]">
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
        </div>
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
          <h1 className={cn(PAGE_TITLE, "mt-2 max-w-[760px]")}>
            <Chars text={HERO.title} />
          </h1>
        </div>
      </div>
    </section>
  );
}
