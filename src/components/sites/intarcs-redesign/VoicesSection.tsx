"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

import { VOICES, VOICES_HEADER, VOICES_INTERVAL_MS } from "./data";

/**
 * Customer stories — the coverflow testimonial carousel from calendly.com,
 * restyled onto this page's dark, sharp-cornered surface.
 *
 * Interaction model verified against the source: it autoplays on a ~6s dwell
 * (sampled for 11s with no input and it advanced 1 → 2 → 3 on its own), and the
 * five `role="tab"` controls also jump directly. The active tab widens 8px → 80px
 * and carries a fill that scales 0 → 1 across the dwell.
 *
 * Slot geometry measured at 1440: centre 762×513 at x=339, ±1 105×344 at
 * x=214/1121, ±2 74×205 at x=124/1242 — all symmetric about x=720, which is
 * expressed below as percentage centres so it scales.
 */

/**
 * Per-slot placement, keyed by signed distance from the active slide.
 * Percentages are against the padded track (1280px at a 1440 viewport), so they
 * reproduce the source's measured boxes: centre 762×513 at x=339, ±1 105×344 at
 * x=214/1121, ±2 74×205 at x=124/1242.
 */
const SLOTS: Record<number, string> = {
  0: "left-1/2 z-30 h-[513px] w-[59.5%]",
  [-1]: "left-[14.6%] z-20 h-[344px] w-[8.2%]",
  [-2]: "left-[6.3%] z-10 h-[205px] w-[5.8%]",
  1: "left-[85.4%] z-20 h-[344px] w-[8.2%]",
  2: "left-[93.7%] z-10 h-[205px] w-[5.8%]",
};

/** Signed, wrapped distance from `active` to `i` across `total` slides. */
function slotOf(i: number, active: number, total: number) {
  const raw = (i - active + total) % total;
  return raw > total / 2 ? raw - total : raw;
}

export function VoicesSection() {
  const [active, setActive] = useState(0);

  const advance = useCallback(
    () => setActive((a) => (a + 1) % VOICES.length),
    [],
  );

  useEffect(() => {
    const id = setInterval(advance, VOICES_INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, active]);

  return (
    <section
      id="voices"
      className="overflow-hidden px-[4.1vw] py-24 lg:px-[5.55vw] lg:py-[16.6vh]"
    >
      <header className="flex flex-col items-center gap-6 text-center">
        <span className="font-mono text-[11px] tracking-[0.14em] text-[#a9a9a9] uppercase">
          {VOICES_HEADER.overline}
        </span>
        <h2 className="max-w-[640px] text-[clamp(2rem,4.17vw,3.75rem)] leading-[1.1] font-light tracking-[-0.03em] text-[#f2f2f2]">
          {VOICES_HEADER.heading}
        </h2>
      </header>

      {/* Coverflow track — desktop only; below lg the active card stands alone. */}
      <div className="relative mt-16 hidden h-[513px] lg:block">
        {VOICES.map((voice, i) => {
          const slot = slotOf(i, active, VOICES.length);
          const isCentre = slot === 0;
          const placement = SLOTS[slot];
          if (!placement) return null;

          return (
            <article
              key={voice.name}
              aria-hidden={!isCentre}
              className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#303030] bg-[#111111] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${placement}`}
            >
              <div className="flex h-full gap-4 p-4">
                {isCentre && (
                  <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-4 p-4">
                    <h3 className="text-[36px] leading-[1.1] font-light tracking-[-0.028em] text-[#f2f2f2]">
                      {voice.stat}
                    </h3>

                    <div className="flex w-full min-w-0 flex-col gap-4">
                      {/* Hanging opening quote, as in the source. */}
                      <p className="relative text-[28px] leading-[1.2] font-light text-[#f2f2f2]">
                        <span
                          aria-hidden="true"
                          className="absolute right-full pr-1 text-[#3d3d3d]"
                        >
                          &ldquo;
                        </span>
                        {voice.quote}&rdquo;
                      </p>

                      <div className="flex min-w-0 flex-col items-start font-mono text-[11px] leading-[1.5]">
                        <span className="whitespace-nowrap text-[#f2f2f2]">
                          {voice.name}
                        </span>
                        <span className="max-w-full truncate text-[#a9a9a9]">
                          {voice.role}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Photo panel — the only thing the flanking cards show. */}
                <div
                  className={`relative shrink-0 self-stretch overflow-hidden bg-[#1a1a1a] ${
                    isCentre ? "w-[49.5%]" : "w-full"
                  }`}
                >
                  <Image
                    src={voice.image}
                    alt={isCentre ? voice.name : ""}
                    fill
                    sizes={isCentre ? "26vw" : "8vw"}
                    className="object-cover object-center"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Below lg: just the active story, stacked. */}
      <div className="mt-12 border border-[#303030] bg-[#111111] p-4 lg:hidden">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1a1a1a]">
          <Image
            src={VOICES[active].image}
            alt={VOICES[active].name}
            fill
            sizes="92vw"
            className="object-cover object-center"
          />
        </div>
        <div className="flex flex-col gap-5 p-4">
          <h3 className="text-[26px] leading-[1.15] font-light tracking-[-0.02em] text-[#f2f2f2]">
            {VOICES[active].stat}
          </h3>
          <p className="text-[19px] leading-[1.3] font-light text-[#f2f2f2]">
            &ldquo;{VOICES[active].quote}&rdquo;
          </p>
          <div className="flex flex-col font-mono text-[11px] leading-[1.5]">
            <span className="text-[#f2f2f2]">{VOICES[active].name}</span>
            <span className="text-[#a9a9a9]">{VOICES[active].role}</span>
          </div>
        </div>
      </div>

      {/* Tabs: 8px at rest, 80px active with a fill that runs the dwell. */}
      <div
        role="tablist"
        aria-label="Customer stories"
        className="mt-14 flex items-center justify-center gap-1.5"
      >
        {VOICES.map((voice, i) => (
          <button
            key={voice.name}
            type="button"
            role="tab"
            aria-selected={active === i}
            aria-label={voice.name}
            onClick={() => setActive(i)}
            className={`h-2 cursor-pointer overflow-hidden border-0 bg-[#303030] p-0 transition-[width] duration-300 ${
              active === i ? "w-20" : "w-2"
            }`}
          >
            {active === i && (
              <span
                key={active}
                className="intarcs-voices-progress block h-full bg-[#f2f2f2]"
              />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}
