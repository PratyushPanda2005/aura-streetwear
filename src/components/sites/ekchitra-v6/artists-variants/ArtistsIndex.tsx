"use client";

import Image from "next/image";
import { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS, V5_ROUTES } from "../../ekchitra-v5/shared";
import { FEATURED, pad } from "./data";

/**
 * Variation 01 — Index. A typographic list on the twelve columns: index,
 * name set large, the medium they work in, and how many works the gallery
 * holds. Hovering a row brings up that artist's painting beside the
 * pointer; on a phone the list stands alone.
 */
export function ArtistsIndex() {
  const host = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  const move = (event: React.PointerEvent) => {
    const box = host.current?.getBoundingClientRect();
    if (!box || !preview.current) return;
    preview.current.style.transform = `translate3d(${event.clientX - box.left + 24}px, ${event.clientY - box.top - 75}px, 0)`;
  };

  return (
    <div
      ref={host}
      onPointerMove={move}
      onPointerLeave={() => setActive(null)}
      className="relative px-4 lg:px-5"
    >
      <div
        ref={preview}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute top-0 left-0 z-10 hidden h-[150px] w-[120px] overflow-hidden transition-opacity duration-200 lg:block",
          active === null ? "opacity-0" : "opacity-100",
        )}
      >
        {FEATURED.map((artist, index) => (
          <Image
            key={artist.id}
            src={artist.works[0].image}
            alt=""
            fill
            sizes="120px"
            className={cn(
              "object-cover transition-opacity duration-200",
              active === index ? "opacity-100" : "opacity-0",
            )}
          />
        ))}
      </div>

      <ul>
        {FEATURED.map((artist, index) => (
          <li key={artist.id}>
            <a
              href={`${V5_ROUTES.artists}#${artist.id}`}
              onPointerEnter={() => setActive(index)}
              className={cn(
                "grid grid-cols-4 items-baseline gap-x-4 py-5 transition-opacity lg:grid-cols-12 lg:gap-x-5 lg:py-6",
                active !== null && active !== index && "opacity-35",
              )}
            >
              <span className="text-[13px] tabular-nums text-(--k-ink)/50 lg:col-span-1">
                {pad(index + 1)}
              </span>
              <span className="col-span-3 text-[28px] leading-none tracking-[-0.03em] lg:col-span-6 lg:text-[52px]">
                {artist.name}
              </span>
              <span className="col-span-3 col-start-2 mt-2 text-[14px] text-(--k-ink)/60 lg:col-span-3 lg:col-start-8 lg:mt-0">
                {artist.works[0].medium}
              </span>
              <span
                className={cn(
                  CAPS,
                  "hidden text-right text-[10px] text-(--k-ink)/60 lg:col-span-2 lg:block",
                )}
              >
                {artist.works.length}{" "}
                {artist.works.length === 1 ? "work" : "works"} →
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
