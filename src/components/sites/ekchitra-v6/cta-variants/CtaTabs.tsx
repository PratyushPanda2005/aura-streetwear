"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { CTA_SERVICES, LineArrow, pad } from "./shared";

/**
 * Services as tabs (variation 09), on the v6 12-column grid. The two names
 * are set large as a pair of tabs, six columns each, the chosen one in black
 * over a heavy rule and the other in grey. Under them the chosen service
 * fills the same two columns: its picture under the first tab (1–6), and
 * under the second (7–12) who it is for, what it is, everything it covers
 * and a black button — the two columns sharing the picture's height, the
 * button on its bottom edge. The tabs open the section; there is no separate
 * heading. The panel cross-fades when the tab changes. `dark` sets it all on
 * brand black: white type, white rules, and a white button that turns sky
 * blue on hover.
 */
/** Colours for the white (default) and brand-black versions. */
const TONES = {
  light: {
    section: "bg-white text-(--k-ink)",
    tabOn: "border-(--k-ink) text-(--k-ink)",
    tabOff: "border-(--k-ink)/15 text-(--k-ink)/30 hover:text-(--k-ink)/60",
    picture: "bg-(--k-ink)/5",
    muted: "text-(--k-ink)/60",
    faint: "text-(--k-ink)/45",
    rule: "border-(--k-ink)/15",
    button: "bg-(--k-ink) text-white hover:bg-(--k-maroon)",
  },
  dark: {
    section: "bg-(--k-ink) text-white",
    tabOn: "border-white text-white",
    tabOff: "border-white/15 text-white/30 hover:text-white/60",
    picture: "bg-white/5",
    muted: "text-white/60",
    faint: "text-white/45",
    rule: "border-white/15",
    button: "bg-white text-(--k-ink) hover:bg-(--k-sky)",
  },
};

export function CtaTabs({ dark = false }: { dark?: boolean }) {
  const [active, setActive] = useState(0);
  const tone = dark ? TONES.dark : TONES.light;

  return (
    <section
      id="services"
      aria-label="Services"
      className={cn("scroll-mt-11 pb-12 lg:pb-16", tone.section, SANS)}
    >
      <div
        role="tablist"
        aria-label="Services"
        className={cn(GRID, HEAD, "pb-0 lg:pb-0")}
      >
        {CTA_SERVICES.map((service, index) => (
          <button
            key={service.key}
            type="button"
            role="tab"
            aria-selected={active === index}
            onClick={() => setActive(index)}
            className={cn(
              "col-span-2 flex items-baseline gap-x-3 border-b-2 pb-3 text-left transition-colors duration-300 lg:col-span-6",
              active === index ? tone.tabOn : tone.tabOff,
            )}
          >
            <span className="text-[13px] tabular-nums">{pad(index + 1)}</span>
            <span className="text-[24px] leading-[1] tracking-[-0.04em] lg:text-[3.4vw]">
              {service.title}
            </span>
          </button>
        ))}
      </div>

      {/* The panels, stacked in one cell and cross-fading. */}
      <div className="mt-5 grid lg:mt-6">
        {CTA_SERVICES.map((service, index) => (
          <div
            key={service.key}
            role="tabpanel"
            aria-hidden={active !== index}
            className={cn(
              GRID,
              "gap-y-6 transition-opacity duration-500 ease-out [grid-area:1/1]",
              active === index
                ? "opacity-100"
                : "pointer-events-none opacity-0",
            )}
          >
            <div
              className={cn(
                "relative col-span-4 aspect-[4/3] overflow-hidden lg:col-span-6 lg:aspect-[3/2]",
                tone.picture,
              )}
            >
              <Image
                src={service.image.src}
                alt={active === index ? service.image.alt : ""}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="col-span-4 flex flex-col lg:col-span-6">
              <p className={cn(CAPS, "text-[10px]", tone.muted)}>
                {service.eyebrow}
              </p>
              <p className="mt-2 max-w-[520px] text-[18px] leading-[1.35] tracking-[-0.01em] lg:text-[20px]">
                {service.body}
              </p>

              <ol className={cn("mt-6 border-t text-[15px]", tone.rule)}>
                {service.covers.map((item, n) => (
                  <li
                    key={item}
                    className={cn(
                      "grid grid-cols-[2.5rem_1fr] border-b py-2.5",
                      tone.rule,
                    )}
                  >
                    <span
                      className={cn("text-[12px] tabular-nums", tone.faint)}
                    >
                      {pad(n + 1)}
                    </span>
                    {item}
                  </li>
                ))}
              </ol>

              <a
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                tabIndex={active === index ? undefined : -1}
                className={cn(
                  "mt-6 flex h-12 w-full shrink-0 items-center justify-between px-5 text-[14px] transition-colors duration-300 sm:w-[280px] lg:mt-auto",
                  tone.button,
                )}
              >
                {service.cta.label}
                <LineArrow />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
