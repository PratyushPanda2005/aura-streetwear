"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../ekchitra-v5/shared";
import { SERVICE_LIST } from "./data";

type Service = (typeof SERVICE_LIST)[number];

const pad = (value: number) => String(value).padStart(2, "0");

/** Every move takes the same time on the same in-out curve. */
const MOVE =
  "transition-transform duration-[900ms] ease-[cubic-bezier(0.76,0,0.24,1)]";
const FADE =
  "transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.76,0,0.24,1)]";

/** The words of one service: name and line large, count, a few words, link. */
function Words({ service, n }: { service: Service; n: number }) {
  return (
    <div className="flex h-full flex-col justify-between p-5 text-white lg:p-8">
      <div>
        <h3 className="text-[34px] leading-[1.02] tracking-[-0.035em] lg:text-[48px]">
          {service.title}
        </h3>
        <p className="mt-2 max-w-[460px] text-[22px] leading-[1.1] tracking-[-0.02em] text-white/50 lg:text-[32px]">
          {service.headline}
        </p>
      </div>
      <div className="flex items-end justify-between gap-x-8">
        <div className="flex shrink-0 gap-x-1.5 text-[11px] tabular-nums">
          <span className="flex size-8 items-center justify-center rounded-full border border-white">
            {pad(n)}
          </span>
          <span className="flex size-8 items-center justify-center rounded-full border border-white/30 text-white/40">
            {pad(SERVICE_LIST.length)}
          </span>
        </div>
        <div className="max-w-[320px]">
          <p className="text-[13px] leading-[1.5] text-white/75 lg:text-[14px]">
            {service.body}
          </p>
          <a
            href={service.cta.href}
            {...(service.cta.href.startsWith("http")
              ? { target: "_blank", rel: "noreferrer" }
              : {})}
            className={cn(
              CAPS,
              "mt-4 inline-flex items-center gap-x-2 pb-1 text-[11px] hover:opacity-70",
            )}
          >
            {service.cta.label} <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

/** A service's picture filling its cell, scaled by the given class. */
function Picture({ service, scale }: { service: Service; scale: string }) {
  return (
    <div className={cn("absolute inset-0", MOVE, scale)}>
      <Image
        src={service.image.src}
        alt={service.image.alt}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </div>
  );
}

/** One slide: two cells side by side (stacked on a phone). */
const SLIDE =
  "absolute inset-0 grid grid-rows-[45%_1fr] gap-4 p-4 lg:grid-cols-2 lg:grid-rows-1 lg:gap-5 lg:p-5";

/**
 * 02 — What we do, after the benefits section of capsules.moyra.co, move for
 * move. A panel that pins to the screen and steps through the services as the
 * visitor scrolls, each step a timed move on the same in-out curve:
 *
 * 1. Exhibitions — words on black on the left, its picture on the right.
 * 2. The next slide rises from below the screen: Art advisory's picture on
 *    the left (easing from 1.5× to its size), its words on the right, while
 *    the picture underneath pushes in a little.
 * 3. That slide slides left by one cell, carrying the black cell into the
 *    left half as its words change to Bespoke sourcing, and Bespoke
 *    sourcing's picture rises into the right half, easing from 1.5×.
 *
 * Scrolling back plays the steps in reverse. Square-cornered, on the Swiss
 * grid's margins and gutter. On a phone the cells stack and each step brings
 * the next service in whole.
 */
export function ServicesSlides() {
  const pin = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);
  const [first, second, third] = SERVICE_LIST;

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = pin.current;
      if (!el) return;
      const box = el.getBoundingClientRect();
      const room = box.height - (window.innerHeight - 44);
      const progress = (44 - box.top) / room;
      setStep(progress < 0.25 ? 0 : progress < 0.62 ? 1 : 2);
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
    <section
      id="services"
      aria-label="What we do"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      {/* Scroll room for the two steps while the panel is pinned. */}
      <div ref={pin} className="relative h-[calc(100svh-44px+140svh)]">
        <div className="sticky top-11 h-[calc(100svh-44px)] overflow-hidden">
          {/* 1 — Exhibitions: words left, picture right. */}
          <div className={cn(SLIDE, "z-10 bg-white")}>
            <div className="row-start-2 bg-(--k-ink) lg:row-start-1">
              <Words service={first} n={1} />
            </div>
            <div className="relative row-start-1 overflow-hidden">
              <Picture
                service={first}
                scale={step >= 1 ? "scale-[1.31]" : "scale-[1.01]"}
              />
            </div>
          </div>

          {/* 2 — Art advisory rises; then shifts left one cell. */}
          <div
            className={cn(
              SLIDE,
              "z-20 bg-white will-change-transform",
              MOVE,
              step === 0 && "translate-y-full",
              step === 2 &&
                "lg:translate-x-[calc(-50%+10px)] max-lg:translate-y-full",
            )}
          >
            <div className="relative row-start-1 overflow-hidden">
              <Picture
                service={second}
                scale={step >= 1 ? "scale-[1.01]" : "scale-150"}
              />
            </div>
            <div className="relative row-start-2 overflow-hidden bg-(--k-ink) lg:row-start-1">
              <div
                className={cn(
                  "absolute inset-0",
                  FADE,
                  step === 2
                    ? "-translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100",
                )}
              >
                <Words service={second} n={2} />
              </div>
              <div
                className={cn(
                  "absolute inset-0 hidden lg:block",
                  FADE,
                  step === 2
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0",
                )}
              >
                <Words service={third} n={3} />
              </div>
            </div>
          </div>

          {/* 3 — Bespoke sourcing's picture rises into the right half (on a
              phone, the whole slide with its words). */}
          <div
            className={cn(
              SLIDE,
              "pointer-events-none z-30 will-change-transform",
              MOVE,
              step < 2 && "translate-y-full",
            )}
          >
            <div className="pointer-events-auto row-start-2 bg-(--k-ink) lg:invisible lg:row-start-1">
              <Words service={third} n={3} />
            </div>
            <div className="relative row-start-1 overflow-hidden lg:col-start-2">
              <Picture
                service={third}
                scale={step === 2 ? "scale-100" : "scale-150"}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
