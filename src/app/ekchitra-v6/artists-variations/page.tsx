import type { Metadata } from "next";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Chars } from "@/components/sites/ekchitra-v5/Chars";
import { CAPS, SANS, TITLE } from "@/components/sites/ekchitra-v5/shared";
import { ArtistsIndex } from "@/components/sites/ekchitra-v6/artists-variants/ArtistsIndex";
import { ArtistsMosaic } from "@/components/sites/ekchitra-v6/artists-variants/ArtistsMosaic";
import { ArtistsSlider } from "@/components/sites/ekchitra-v6/artists-variants/ArtistsSlider";
import { ArtistsSpotlight } from "@/components/sites/ekchitra-v6/artists-variants/ArtistsSpotlight";
import { ArtistsWall } from "@/components/sites/ekchitra-v6/artists-variants/ArtistsWall";
import { GRID, HEAD } from "@/components/sites/ekchitra-v6/styles";
import { TopBar } from "@/components/sites/ekchitra-v6/TopBar";
import { Index } from "@/components/sites/ekchitra-v6/ui";
import { FooterLedger } from "@/components/sites/ekchitra-v6/footer-variants/FooterLedger";

export const metadata: Metadata = {
  title: "Artists section — variations",
  robots: { index: false },
};

const VARIATIONS: { name: string; note: string; body: ReactNode }[] = [
  {
    name: "Index",
    note: "A typographic list; hovering a name brings up a painting by the pointer.",
    body: <ArtistsIndex />,
  },
  {
    name: "Spotlight",
    note: "Names down the left, one large painting on the right that changes on its own or on hover.",
    body: <ArtistsSpotlight />,
  },
  {
    name: "Mosaic",
    note: "Paintings edge to edge in cells of different sizes, each tagged with the artist's name.",
    body: <ArtistsMosaic />,
  },
  {
    name: "Slider",
    note: "One artist at a time — painting, name, statement and works — stepped with arrows.",
    body: <ArtistsSlider />,
  },
  {
    name: "Wall",
    note: "A salon hang on white: different sizes and heights, the name appears as the cursor.",
    body: <ArtistsWall />,
  },
];

/**
 * Five takes on the homepage's Artists section, one after another, each
 * under the section's usual heading with a note on what it is, to choose
 * from before one goes on the homepage.
 */
export default function ArtistsVariationsPage() {
  return (
    <main className={cn("min-h-svh bg-white pb-24 text-(--k-ink)", SANS)}>
      <TopBar />
      {VARIATIONS.map((variation, index) => (
        <section key={variation.name} className="pb-20 lg:pb-28">
          <p
            className={cn(
              CAPS,
              "bg-(--k-ink) px-4 py-3 text-[11px] text-white lg:px-5",
            )}
          >
            Variation {String(index + 1).padStart(2, "0")} — {variation.name}
            <span className="normal-case tracking-normal text-white/60">
              {" "}
              · {variation.note}
            </span>
          </p>
          <div className={cn(GRID, HEAD)}>
            <div className="col-span-4 lg:col-span-7">
              <Index n={3} label="Artists" />
              <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
                <Chars text="Artists shaping contemporary India" />
              </h2>
            </div>
          </div>
          {variation.body}
        </section>
      ))}
      <FooterLedger />
    </main>
  );
}
