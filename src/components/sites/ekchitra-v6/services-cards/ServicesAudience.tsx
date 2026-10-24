"use client";

import Image from "next/image";
import { useId, useRef, useState, type KeyboardEvent } from "react";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { SANS } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { BUTTON, GRID, SECTION_TITLE } from "../styles";
import { CTA_PHOTOS, CTA_SERVICES, Covers, pad } from "./shared";

/** How each service's audience finishes "I'm…", from its own eyebrow. */
const WHO: Record<string, string> = {
  advisory: "a collector",
  bespoke: "an architect, designer or institution",
};

/** Collectors first: the more common way in. */
const ORDER = [...CTA_SERVICES].sort(
  (a, b) => Number(b.key === "advisory") - Number(a.key === "advisory"),
);

/**
 * 07 — Audience switch, after the "I'm a … / I'm a …" choice on cta.gallery
 * (Lockerland): one line — "I'm" and the two audiences as a pair of tabs.
 * Choosing one crossfades the photograph on the left and brings that
 * service's name, line, what it covers and a button in on the right.
 * Arrow keys move between the tabs.
 */
export function ServicesAudience() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const service = ORDER[active];

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next =
      (active + (event.key === "ArrowRight" ? 1 : -1) + ORDER.length) %
      ORDER.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section
      aria-label="Services"
      className={cn("bg-white py-20 text-(--k-ink) lg:py-[120px]", SANS)}
    >
      <InView className={GRID}>
        <div className="ek6-rise col-span-4 flex flex-wrap items-baseline gap-x-4 gap-y-3 text-[30px] leading-[1.1] tracking-[-0.035em] lg:col-span-12 lg:text-[3.4vw]">
          <span>I’m</span>
          <div
            role="tablist"
            aria-label="Who are you?"
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-x-4 gap-y-2"
          >
            {ORDER.map((item, index) => {
              const on = active === index;
              return (
                <button
                  key={item.key}
                  ref={(el) => {
                    tabs.current[index] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-selected={on}
                  aria-controls={`${id}-panel`}
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(index)}
                  className={cn(
                    "border-b-2 pb-1 text-left transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-ink)",
                    on
                      ? "border-(--k-ink) text-(--k-ink)"
                      : "border-transparent text-(--k-ink)/45 hover:text-(--k-ink)/80",
                  )}
                >
                  {WHO[item.key]}
                </button>
              );
            })}
          </div>
        </div>
      </InView>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active}`}
        className={cn(GRID, "mt-10 items-end gap-y-8 lg:mt-16")}
      >
        {/* Both photographs stacked; the chosen one shown. */}
        <div className="relative col-span-4 aspect-[4/3] overflow-hidden bg-(--k-ink) lg:col-span-7">
          {ORDER.map((item, index) => {
            const photo = CTA_PHOTOS[item.key];
            const on = active === index;
            return (
              <Image
                key={item.key}
                src={photo.src}
                alt={on ? photo.alt : ""}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={cn(
                  "object-cover transition-[opacity,scale] duration-[1100ms] motion-reduce:transition-none",
                  EASE,
                  photo.position,
                  on ? "scale-100 opacity-100" : "scale-[1.06] opacity-0",
                )}
              />
            );
          })}
        </div>

        {/* Keyed on the service so its words rise in afresh on each switch. */}
        <InView
          key={service.key}
          className="col-span-4 lg:col-span-4 lg:col-start-9"
        >
          <div className="ek6-rise">
            <p className="text-[13px] tabular-nums">
              {pad(CTA_SERVICES.indexOf(service) + 1)}
            </p>
            <h3 className={cn(SECTION_TITLE, "mt-3")}>{service.title}</h3>
            <p className="mt-5 text-[16px] leading-[1.45]">{service.body}</p>
            <Covers items={service.covers} className="mt-4" />
            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(BUTTON, "mt-8")}
            >
              {service.cta.label}
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </InView>
      </div>
    </section>
  );
}
