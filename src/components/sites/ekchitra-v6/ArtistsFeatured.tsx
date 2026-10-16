import Image from "next/image";

import { cn } from "@/lib/utils";

import { CapsLink } from "../ekchitra-v5/CapsLink";
import { Chars } from "../ekchitra-v5/Chars";
import { InView } from "../ekchitra-v5/InView";
import { CAPS, SANS, TITLE, V5_ROUTES } from "../ekchitra-v5/shared";
import { ARTISTS } from "./data";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

/** Four artists to lead with; the rest are a click away. */
const FEATURED = [
  "Anupama Choudhary",
  "Ashok Juttu",
  "Charanjeet Singh",
  "Vinod Daroz",
]
  .map((name) => ARTISTS.find((artist) => artist.name === name))
  .filter((artist) => artist !== undefined);

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * 03 — Artists: four artists across the grid, three columns each, shown
 * through their work. Each painting wipes open from the bottom as the row
 * scrolls in, one after another, the picture settling from a slight zoom;
 * under it, the index, the name, the medium and a line from the artist's
 * statement fade in. A link to all the artists sits opposite the heading.
 */
export function ArtistsFeatured() {
  return (
    <section
      id="artists"
      className={cn(
        "scroll-mt-11 bg-white pb-16 text-(--k-ink) lg:pb-24",
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

      <ul className={cn(GRID, "gap-y-12")}>
        {FEATURED.map((artist, index) => {
          const work = artist.works[0];
          return (
            <li key={artist.id} className="col-span-2 lg:col-span-3">
              <InView delay={index * 120}>
                <a href={`${V5_ROUTES.artists}#${artist.id}`} className="block">
                  <div className="ek5-wipe relative aspect-[4/5] overflow-hidden bg-(--k-ink)/5">
                    <Image
                      src={work.image}
                      alt={`${work.title} by ${artist.name}`}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="ek5-fade mt-4">
                    <p className="text-[12px] tabular-nums text-(--k-ink)/45">
                      {pad(index + 1)}
                    </p>
                    <h3 className="mt-1 text-[19px] leading-[1.15] tracking-[-0.02em] lg:text-[22px]">
                      {artist.name}
                    </h3>
                    <p
                      className={cn(CAPS, "mt-2 text-[10px] text-(--k-ink)/55")}
                    >
                      {work.medium}
                    </p>
                    <p className="mt-3 hidden text-[13px] leading-[1.5] text-(--k-ink)/65 lg:line-clamp-2">
                      {artist.statement}
                    </p>
                  </div>
                </a>
              </InView>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
