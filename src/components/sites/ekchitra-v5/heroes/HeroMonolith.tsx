"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Diamonds } from "../Diamonds";
import { CAPS, SANS, V5_ROUTES } from "../shared";
import { HERO_COPY, HERO_NAV, HERO_PHOTOS } from "./data";

/** How long the counter takes to reach 100%, ms. */
const LOAD_MS = 1900;

const EASE = "ease-[cubic-bezier(0.785,0.135,0.15,0.86)]";

/**
 * Study 04 — after likova.space. The section opens dark: a lattice of the
 * brand's diamonds turns slowly in perspective behind a white card carrying
 * the wordmark, while a counter in its corner runs to 100%. Then the dark
 * lifts away and the card travels up and out to the left edge, stretching
 * into a white tab that cuts into the top of a full-bleed photograph of the
 * gallery, with the wordmark set wide inside it. A short line sits over the
 * photograph and the current exhibition waits in the lower corner.
 *
 * The intro plays the first time the section is seen; "Replay" runs it again.
 */
export function HeroMonolith() {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [run, setRun] = useState(0);

  // Start the count when the section first comes into view (and on replay).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    let started = 0;
    const step = (now: number) => {
      if (!started) started = now;
      const amount = Math.min(1, (now - started) / LOAD_MS);
      setCount(Math.round(amount * 100));
      if (amount < 1) frame = window.requestAnimationFrame(step);
      else window.setTimeout(() => setOpen(true), 250);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        frame = window.requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [run]);

  const replay = () => {
    setOpen(false);
    setCount(0);
    setRun((value) => value + 1);
  };

  return (
    <section
      ref={ref}
      id="monolith"
      className={cn(
        "relative h-svh min-h-[640px] overflow-hidden bg-white text-(--k-ink)",
        SANS,
      )}
    >
      {/* Final layout: top line, photograph, line on the photograph, card. */}
      <div className="flex h-[12%] items-start justify-between px-5 pt-5 text-[12px] lg:px-8">
        <span aria-hidden="true" className="mt-1 flex w-6 flex-col gap-[5px]">
          <span className="h-px bg-current" />
          <span className="h-px bg-current" />
        </span>
        <div className={cn(CAPS, "flex items-center gap-x-8 text-[11px]")}>
          <a href={V5_ROUTES.artworks} className="hidden lg:inline">
            Select an artwork
          </a>
          <a href="#contact">Contact us</a>
        </div>
      </div>
      <div className="absolute inset-x-0 top-[19%] bottom-0 overflow-hidden bg-(--k-ink)">
        <Image
          src={HERO_PHOTOS.visitors.src}
          alt={HERO_PHOTOS.visitors.alt}
          fill
          sizes="100vw"
          className={cn(
            "object-cover transition-[scale] duration-[2400ms]",
            EASE,
            open ? "scale-100" : "scale-110",
          )}
        />
        <div className="absolute inset-0 bg-(--k-ink)/20" />
        <p
          className={cn(
            CAPS,
            "absolute top-[16%] right-[8%] max-w-[220px] text-[13px] leading-[1.4] text-white transition-opacity delay-700 duration-700 lg:right-[16%]",
            open ? "opacity-100" : "opacity-0",
          )}
        >
          Where art
          <br />
          meets soul
        </p>
        <a
          href={V5_ROUTES.exhibitions}
          className={cn(
            "absolute bottom-6 left-5 flex items-end gap-x-6 bg-white/90 p-3 pr-4 backdrop-blur transition-[opacity,translate] delay-[900ms] duration-700 lg:left-8",
            open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          )}
        >
          <span>
            <span className={cn(CAPS, "block text-[10px] text-(--k-ink)/60")}>
              {HERO_COPY.now.label}
            </span>
            <span className="mt-1 block text-[14px]">
              {HERO_COPY.now.title}
            </span>
          </span>
          <span className="bg-(--k-ink) px-3 py-1.5 text-[11px] text-white">
            View
          </span>
        </a>
      </div>

      {/* Intro: the dark, the turning lattice. */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center overflow-hidden bg-(--k-ink) transition-opacity duration-[900ms]",
          open ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        <div className="[transform:perspective(1100px)_rotateX(62deg)_rotateZ(-20deg)]">
          <div className="ek5-turn grid grid-cols-2 gap-0">
            {(["steps", "clusters", "band", "zigzag"] as const).map(
              (shape, index) => (
                <Diamonds
                  key={shape}
                  rows={22}
                  shape={shape}
                  side={index % 2 ? "right" : "left"}
                  tint="sky"
                  tintEvery={7}
                  tintOpacity={0.35}
                  className="w-[150px] text-white/[0.14] lg:w-[190px]"
                />
              ),
            )}
          </div>
        </div>
      </div>

      {/* The card that becomes the tab. */}
      <h1
        className={cn(
          "absolute z-20 flex flex-col justify-between bg-white transition-all duration-[1100ms]",
          EASE,
          open
            ? "top-[12%] left-0 h-[14%] w-[min(680px,78vw)] translate-x-0 translate-y-0 px-5 pt-3 pb-3 lg:px-8"
            : "top-1/2 left-1/2 h-[230px] w-[300px] -translate-x-1/2 -translate-y-1/2 p-5",
        )}
      >
        <span
          className={cn(
            "block leading-none font-light tracking-[0.24em] transition-all duration-[1100ms]",
            EASE,
            open ? "mt-auto text-[40px] lg:text-[76px]" : "text-[26px]",
          )}
        >
          EKCHITRA
        </span>
        <span className="sr-only">{HERO_COPY.statement}</span>
        <span
          aria-hidden="true"
          className={cn(
            "self-end text-[12px] tabular-nums transition-opacity duration-300",
            open ? "opacity-0" : "opacity-100",
          )}
        >
          {count}%
        </span>
      </h1>

      <button
        type="button"
        onClick={replay}
        className={cn(
          CAPS,
          "absolute right-5 bottom-6 z-30 bg-white/90 px-3 py-2 text-[10px] lg:right-8",
        )}
      >
        Replay intro
      </button>
      <nav aria-label="Primary navigation" className="sr-only">
        {HERO_NAV.map((link) => (
          <a key={link.label} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
    </section>
  );
}
