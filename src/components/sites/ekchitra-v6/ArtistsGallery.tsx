import { cn } from "@/lib/utils";

import { Chars } from "../ekchitra-v5/Chars";
import { SANS, TITLE } from "../ekchitra-v5/shared";
import { ArtistsMosaic } from "./artists-variants/ArtistsMosaic";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

/**
 * 03 — Artists, as a mosaic on the twelve-column Swiss grid (variation 03
 * of /ekchitra-v6/artists-variations): paintings in cells of different
 * sizes, each tagged with its index and the artist's name, closed by a black
 * cell with the count and a link to all the artists.
 */
export function ArtistsGallery() {
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
      </div>
      <ArtistsMosaic />
    </section>
  );
}
