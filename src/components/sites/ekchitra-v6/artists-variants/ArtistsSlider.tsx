"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, V5_ROUTES } from "../../ekchitra-v5/shared";
import { FEATURED, pad } from "./data";

const ARROW =
  "flex size-12 items-center justify-center bg-(--k-ink) text-[20px] text-white transition-opacity hover:opacity-85";

/**
 * Variation 04 — Slider. One artist at a time: their painting large on the
 * left, and on the right the count, the name set big, a few lines from
 * their statement, small pictures of their other works, and arrows to step
 * through. Nothing moves until the visitor asks.
 */
export function ArtistsSlider() {
  const [active, setActive] = useState(0);
  const artist = FEATURED[active];
  const step = (by: number) =>
    setActive((value) => (value + by + FEATURED.length) % FEATURED.length);

  return (
    <div className="grid grid-cols-4 gap-x-4 gap-y-8 px-4 lg:grid-cols-12 lg:gap-x-5 lg:px-5">
      <div className="relative col-span-3 aspect-[4/5] overflow-hidden lg:col-span-4">
        {FEATURED.map((item, index) => (
          <Image
            key={item.id}
            src={item.works[0].image}
            alt={`${item.works[0].title} by ${item.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, 75vw"
            className={cn(
              "object-cover transition-opacity duration-500",
              index === active ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      <div className="col-span-4 flex flex-col justify-between gap-8 lg:col-span-6 lg:col-start-6">
        <div>
          <p className="text-[13px] tabular-nums">
            {pad(active + 1)}{" "}
            <span className="text-(--k-ink)/40">/ {pad(FEATURED.length)}</span>
          </p>
          <h3 className="mt-6 text-[40px] leading-[0.95] tracking-[-0.04em] lg:text-[64px]">
            {artist.name}
          </h3>
          <p className="mt-5 line-clamp-4 max-w-[440px] text-[15px] leading-[1.5] text-(--k-ink)/70">
            {artist.statement}
          </p>
        </div>

        <div>
          <p className={cn(CAPS, "text-[10px] text-(--k-ink)/60")}>
            Works at the gallery
          </p>
          <div className="mt-3 flex gap-x-2">
            {artist.works.slice(0, 4).map((work) => (
              <div
                key={work.image}
                className="relative size-14 overflow-hidden lg:size-16"
              >
                <Image
                  src={work.image}
                  alt={work.title}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <a
              href={`${V5_ROUTES.artists}#${artist.id}`}
              className={cn(CAPS, "text-[11px] underline underline-offset-4")}
            >
              View artist
            </a>
            <div className="flex gap-x-1">
              <button
                type="button"
                aria-label="Previous artist"
                onClick={() => step(-1)}
                className={ARROW}
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next artist"
                onClick={() => step(1)}
                className={ARROW}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
