"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, V5_ROUTES } from "../../ekchitra-v5/shared";
import { FEATURED, pad } from "./data";

/** How long each artist stays in the spotlight before the next, ms. */
const HOLD_MS = 4500;

/**
 * Variation 02 — Spotlight. A screen-high split: the names run down the
 * left in a column, the chosen artist's painting fills the right with its
 * title and medium beneath. It moves on to the next artist by itself, and
 * hovering or tapping a name picks it.
 */
export function ArtistsSpotlight() {
  const [active, setActive] = useState(0);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    if (held) return;
    const id = window.setTimeout(
      () => setActive((value) => (value + 1) % FEATURED.length),
      HOLD_MS,
    );
    return () => window.clearTimeout(id);
  }, [active, held]);

  const artist = FEATURED[active];
  const work = artist.works[0];

  return (
    <div
      onPointerLeave={() => setHeld(false)}
      className="grid grid-cols-4 items-end gap-x-4 gap-y-8 px-4 lg:grid-cols-12 lg:gap-x-5 lg:px-5"
    >
      <ul className="col-span-4 flex flex-col justify-end lg:col-span-6">
        {FEATURED.map((item, index) => (
          <li key={item.id}>
            <button
              type="button"
              onPointerEnter={() => {
                setHeld(true);
                setActive(index);
              }}
              onClick={() => setActive(index)}
              className={cn(
                "flex w-full items-baseline gap-x-4 py-1.5 text-left transition-colors duration-300",
                index === active ? "text-(--k-ink)" : "text-(--k-ink)/25",
              )}
            >
              <span className="w-6 text-[13px] tabular-nums">
                {pad(index + 1)}
              </span>
              <span className="text-[30px] leading-[1.05] tracking-[-0.03em] lg:text-[44px]">
                {item.name}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <a
        href={`${V5_ROUTES.artists}#${artist.id}`}
        className="col-span-3 flex flex-col lg:col-span-3 lg:col-start-9"
      >
        <div className="relative aspect-[4/5]">
          {FEATURED.map((item, index) => (
            <Image
              key={item.id}
              src={item.works[0].image}
              alt={`${item.works[0].title} by ${item.name}`}
              fill
              sizes="(min-width: 1024px) 25vw, 75vw"
              className={cn(
                "object-cover transition-opacity duration-700",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <div className="mt-3 flex flex-col gap-y-2">
          <p className="text-[13px] leading-[1.4]">
            {work.title}
            <span className="text-(--k-ink)/50"> · {work.medium}</span>
          </p>
          <p className={cn(CAPS, "shrink-0 text-[10px] text-(--k-ink)/60")}>
            View artist →
          </p>
        </div>
      </a>
    </div>
  );
}
