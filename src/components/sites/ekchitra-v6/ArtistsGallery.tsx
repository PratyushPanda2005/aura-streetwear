import Image from "next/image";

import { cn } from "@/lib/utils";

import { CapsLink } from "../ekchitra-v5/CapsLink";
import { Chars } from "../ekchitra-v5/Chars";
import { SANS, TITLE, V5_ROUTES } from "../ekchitra-v5/shared";
import { ARTISTS } from "./data";
import { GRID, HEAD } from "./styles";
import { NameCursor } from "./NameCursor";
import { Index } from "./ui";

/**
 * Frame sizes the paintings take in turn — tall, wide, square, small — so the
 * row has rhythm. Every frame hangs from the same top line.
 */
const FRAMES = [
  "h-[210px] w-[160px] lg:h-[350px] lg:w-[270px]",
  "h-[150px] w-[210px] lg:h-[240px] lg:w-[336px]",
  "h-[176px] w-[176px] lg:h-[288px] lg:w-[288px]",
  "h-[128px] w-[104px] lg:h-[192px] lg:w-[152px]",
  "h-[192px] w-[144px] lg:h-[320px] lg:w-[240px]",
  "h-[160px] w-[224px] lg:h-[256px] lg:w-[368px]",
];

/** Up to two works from each artist, artist by artist. */
const PAINTINGS = [0, 1].flatMap((n) =>
  ARTISTS.filter((artist) => artist.works[n]).map((artist) => ({
    key: `${artist.id}-${n}`,
    href: `${V5_ROUTES.artists}#${artist.id}`,
    src: artist.works[n].image,
    alt: `${artist.works[n].title} by ${artist.name}`,
    name: artist.name,
  })),
);

/**
 * 03 — Artists: a single row of paintings that drifts sideways on its own, in
 * frames of different sizes hung from one top line. No names, just the
 * work; each painting links to its artist, and the link to all the artists
 * sits opposite the heading. The row is doubled and slides by
 * one copy so it loops without a seam, pausing while the pointer is over it;
 * over a painting the cursor becomes a small tag with the artist's name.
 */
export function ArtistsGallery() {
  return (
    <section
      id="artists"
      className={cn(
        "scroll-mt-11 overflow-hidden bg-white pb-16 text-(--k-ink) lg:pb-24",
        SANS,
      )}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index n={3} label="Artists" />
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text="Artists shaping contemporary India" />
          </h2>
        </div>
        <div className="col-span-4 mt-6 flex items-end lg:col-span-5 lg:col-start-8 lg:mt-0 lg:justify-end">
          <CapsLink arrow href={V5_ROUTES.artists}>
            View all {ARTISTS.length} artists
          </CapsLink>
        </div>
      </div>

      <div className="relative">
        <NameCursor />
        <div className="ek5-marquee flex w-max items-start [--marquee-s:90s]">
          {[0, 1].map((copy) => (
            <div
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
              className="flex items-start gap-x-4 pr-4 lg:gap-x-5 lg:pr-5"
            >
              {PAINTINGS.map((painting, index) => (
                <a
                  key={painting.key}
                  href={painting.href}
                  data-name={painting.name}
                  tabIndex={copy === 1 ? -1 : undefined}
                  className={cn(
                    "relative block shrink-0 overflow-hidden",
                    FRAMES[index % FRAMES.length],
                  )}
                >
                  <Image
                    src={painting.src}
                    alt={copy === 1 ? "" : painting.alt}
                    fill
                    sizes="(min-width: 1024px) 368px, 224px"
                    className="object-cover"
                  />
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
