import Image from "next/image";

import { cn } from "@/lib/utils";

import { V5_ROUTES } from "../../ekchitra-v5/shared";
import { NameCursor } from "../NameCursor";
import { GRID } from "../styles";
import { FEATURED } from "./data";

/**
 * Where each painting hangs on the twelve-column wall — its columns and the
 * rows it spans (rows are 44px) — so the wall reads as a salon hang of
 * different sizes and heights, with nothing touching.
 */
const HANG = [
  "col-span-2 h-[200px] lg:h-auto lg:col-span-3 lg:col-start-1 lg:row-span-7 lg:row-start-1",
  "col-span-2 h-[150px] lg:h-auto lg:col-span-2 lg:col-start-5 lg:row-span-4 lg:row-start-2",
  "col-span-2 h-[180px] lg:h-auto lg:col-span-2 lg:col-start-8 lg:row-span-5 lg:row-start-1",
  "col-span-2 h-[150px] lg:h-auto lg:col-span-2 lg:col-start-11 lg:row-span-4 lg:row-start-3",
  "col-span-2 h-[170px] lg:h-auto lg:col-span-2 lg:col-start-5 lg:row-span-4 lg:row-start-7",
  "col-span-2 h-[150px] lg:h-auto lg:col-span-2 lg:col-start-8 lg:row-span-3 lg:row-start-8",
];

/**
 * Variation 05 — Wall. Paintings hung like a salon wall on white: different
 * sizes, columns and heights, with generous space between them and no
 * captions. Over a painting the cursor becomes the artist's name.
 */
export function ArtistsWall() {
  return (
    <div
      className={cn(GRID, "relative gap-y-4 lg:auto-rows-[44px] lg:gap-y-0")}
    >
      <NameCursor />
      {FEATURED.map((artist, index) => (
        <a
          key={artist.id}
          href={`${V5_ROUTES.artists}#${artist.id}`}
          data-name={artist.name}
          className={cn("relative block overflow-hidden", HANG[index])}
        >
          <Image
            src={artist.works[0].image}
            alt={`${artist.works[0].title} by ${artist.name}`}
            fill
            sizes="(min-width: 1024px) 33vw, 50vw"
            className="object-cover"
          />
        </a>
      ))}
    </div>
  );
}
