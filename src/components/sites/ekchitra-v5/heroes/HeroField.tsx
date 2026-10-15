"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Progress } from "../../ekchitra-v4/Progress";
import { ARTISTS, ARTIST_WORK_COUNT } from "../artists-data";
import { EXHIBITIONS } from "../exhibitions-data";
import { CAPS, DISPLAY, SANS, V5_ROUTES } from "../shared";
import {
  HERO_ART,
  HERO_COPY,
  HERO_NAV,
  HERO_PHOTOS,
  hyderabadTime,
} from "./data";

const HUD =
  "text-[10px] leading-none tracking-[0.14em] uppercase text-(--k-ink)/60";

/** Pins on the photograph: an artwork each, opening its label on hover. */
const PINS = [
  { art: 0, spot: "left-[22%] top-[34%]" },
  { art: 7, spot: "left-[48%] top-[58%]" },
  { art: 6, spot: "left-[70%] top-[28%]" },
  { art: 1, spot: "left-[82%] top-[66%]" },
];

/** Legend: the kinds of work, each with its own marker. */
const LEGEND = [
  { label: "Painting", tint: "bg-(--k-ink)" },
  { label: "Sculpture", tint: "border border-(--k-ink)" },
  { label: "Textile & thread", tint: "bg-(--k-ink)/30" },
];

function Corner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden="true"
      className={cn("absolute size-3.5 text-(--k-ink)/50", className)}
    >
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

/**
 * Study 05 — a refined take on sanrita.ca. The gallery is presented as a
 * field to explore. A legend runs down the left — the page links, then the
 * kinds of work marked by colour — over a large uppercase statement. On the
 * right, a photograph of the gallery sits in a technical frame: crosshairs at
 * its corners, Hyderabad's coordinates and the local time along the top,
 * counts of exhibitions, artists and works along the bottom. Diamond pins mark
 * artworks (hover one to read it), "Scroll to enter the gallery" sits in the
 * middle and the current exhibition waits in the corner. Scrolling opens the
 * frame out to the full screen as the legend and instruments fall away.
 */
export function HeroField() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(hyderabadTime());
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <Progress
      mode="pinned"
      varName="--f"
      id="field"
      className={cn("relative h-[200svh] bg-white text-(--k-ink)", SANS)}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Legend. */}
        <aside className="absolute inset-y-0 left-0 hidden w-[22%] flex-col justify-between px-6 pt-6 pb-6 opacity-[calc(1_-_var(--f,0)_*_2.5)] lg:flex">
          <div>
            <p className={cn(HUD, "text-(--k-ink)")}>The rooms of EkChitra</p>
            <ul className="mt-8 space-y-3 text-[13px] tracking-[0.06em] uppercase">
              {HERO_NAV.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="flex items-center gap-x-3 hover:opacity-60"
                  >
                    <span
                      aria-hidden="true"
                      className="size-2 rotate-45 border border-current"
                    />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="mt-8 space-y-2.5 text-[11px] text-(--k-ink)/70">
              {LEGEND.map((item) => (
                <li key={item.label} className="flex items-center gap-x-3">
                  <span
                    aria-hidden="true"
                    className={cn("size-2 rotate-45", item.tint)}
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h1
              className={cn(
                DISPLAY,
                "text-[34px] leading-[0.98] tracking-[-0.04em] uppercase xl:text-[40px]",
              )}
            >
              A gallery where art meets soul
            </h1>
            <p className={cn(HUD, "mt-4")}>©2026 EkChitra · {HERO_COPY.city}</p>
          </div>
        </aside>

        {/* The frame, opening out to the full screen. */}
        <div className="absolute top-[calc((1_-_var(--f,0))_*_6%)] right-[calc((1_-_var(--f,0))_*_2%)] bottom-[calc((1_-_var(--f,0))_*_5%)] left-[calc((1_-_var(--f,0))_*_4%)] lg:left-[calc((1_-_var(--f,0))_*_22%)]">
          {/* Instruments. */}
          <div className="pointer-events-none absolute -inset-3 opacity-[calc(1_-_var(--f,0)_*_3)]">
            <Corner className="top-0 left-0" />
            <Corner className="top-0 right-0" />
            <Corner className="bottom-0 left-0" />
            <Corner className="right-0 bottom-0" />
            <p className={cn(HUD, "absolute -top-1 left-1/2 -translate-x-1/2")}>
              {HERO_COPY.coordinates}
            </p>
            <p
              className={cn(HUD, "absolute -top-1 right-10")}
              suppressHydrationWarning
            >
              {time} IST
            </p>
            <p className={cn(HUD, "absolute -top-1 left-10")}>
              {HERO_COPY.city}
            </p>
            <p className={cn(HUD, "absolute -bottom-1 left-10")}>
              {EXHIBITIONS.length} exhibitions
            </p>
            <p
              className={cn(
                HUD,
                "absolute -bottom-1 left-1/2 -translate-x-1/2",
              )}
            >
              {ARTISTS.length} artists
            </p>
            <p className={cn(HUD, "absolute right-10 -bottom-1")}>
              {ARTIST_WORK_COUNT} works
            </p>
          </div>

          <div className="ek5-curtain relative h-full w-full overflow-hidden bg-(--k-ink) [--d:150ms]">
            <Image
              src={HERO_PHOTOS.lamp.src}
              alt={HERO_PHOTOS.lamp.alt}
              fill
              sizes="100vw"
              className="ek5-kenburns object-cover"
            />
            <div className="absolute inset-0 bg-(--k-ink)/30" />

            {PINS.map((pin) => {
              const item = HERO_ART[pin.art];
              return (
                <div key={item.src} className={cn("group absolute", pin.spot)}>
                  <span className="relative flex size-5 items-center justify-center">
                    <span className="absolute size-5 animate-ping rounded-full bg-white/30" />
                    <span className="size-2.5 rotate-45 bg-white" />
                  </span>
                  <span className="pointer-events-none absolute top-1/2 left-7 flex w-max -translate-y-1/2 items-center gap-x-3 bg-white p-1.5 pr-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="relative size-10 overflow-hidden bg-white">
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </span>
                    <span>
                      <span className="block text-[12px]">{item.title}</span>
                      <span className="block text-[11px] text-(--k-ink)/60">
                        {item.artist}
                      </span>
                    </span>
                  </span>
                </div>
              );
            })}

            <p
              className={cn(
                DISPLAY,
                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-[26px] leading-none tracking-[-0.03em] text-white uppercase opacity-[calc(1_-_var(--f,0)_*_2)] lg:text-[40px]",
              )}
            >
              Scroll to enter
              <br />
              the gallery
            </p>

            <a
              href={V5_ROUTES.exhibitions}
              className="absolute right-4 bottom-4 w-[180px] bg-(--k-ink)/80 p-2 text-white backdrop-blur lg:right-6 lg:bottom-6 lg:w-[210px]"
            >
              <span className={cn(CAPS, "block text-[9px] text-white/70")}>
                {HERO_COPY.now.label}
              </span>
              <span className="mt-1 block text-[18px] leading-tight uppercase">
                {HERO_COPY.now.title}
              </span>
              <span className="relative mt-2 block aspect-[16/9] overflow-hidden">
                <Image
                  src={HERO_COPY.now.image}
                  alt=""
                  fill
                  sizes="210px"
                  className="object-cover"
                />
              </span>
            </a>
          </div>
        </div>
      </div>
    </Progress>
  );
}
