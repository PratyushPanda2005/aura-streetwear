import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, V5_ROUTES } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { FEATURED, pad, TOTAL } from "./data";

/** Each painting's place on the six-by-two mosaic. */
const PLACES = [
  "col-span-4 row-span-2 lg:col-span-6 lg:row-span-2",
  "col-span-2 lg:col-span-3",
  "col-span-2 lg:col-span-3",
  "col-span-2 lg:col-span-3",
  "col-span-2 lg:col-span-3",
  "col-span-4 lg:col-span-6",
];

/**
 * Variation 03 — Mosaic. Paintings in cells of different sizes on the
 * twelve-column Swiss grid, with its gutters, the first one large. Each carries a small
 * white tag in its corner with its index and the artist's name; a black
 * cell closes the block with the count and a link to all the artists.
 */
export function ArtistsMosaic() {
  return (
    <div
      className={cn(
        GRID,
        "auto-rows-[130px] gap-y-4 lg:auto-rows-[170px] lg:gap-y-5",
      )}
    >
      {FEATURED.map((artist, index) => (
        <a
          key={artist.id}
          href={`${V5_ROUTES.artists}#${artist.id}`}
          className={cn("relative overflow-hidden", PLACES[index])}
        >
          <Image
            src={artist.works[0].image}
            alt={`${artist.works[0].title} by ${artist.name}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <span className="absolute bottom-0 left-0 flex items-baseline gap-x-2 bg-white px-2 py-1 text-[11px] text-(--k-ink)">
            <span className="tabular-nums text-(--k-ink)/45">
              {pad(index + 1)}
            </span>
            {artist.name}
          </span>
        </a>
      ))}
      <a
        href={V5_ROUTES.artists}
        className="col-span-4 flex flex-col justify-between bg-(--k-ink) p-4 text-white lg:col-span-6 lg:p-5"
      >
        <p className="text-[32px] leading-none tracking-[-0.04em] lg:text-[44px]">
          {TOTAL} artists
        </p>
        <p
          className={cn(
            CAPS,
            "flex items-center justify-between text-[11px] text-white/80",
          )}
        >
          View all <span aria-hidden="true">→</span>
        </p>
      </a>
    </div>
  );
}
