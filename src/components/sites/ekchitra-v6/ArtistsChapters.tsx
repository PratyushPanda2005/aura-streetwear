import Image from "next/image";

import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { InView } from "../ekchitra-v5/InView";
import { CAPS, SANS, V5_ROUTES } from "../ekchitra-v5/shared";
import { ARTISTS } from "./data";

/** Six artists to lead with; the rest are a click away. */
const FEATURED = [
  "Anupama Choudhary",
  "Ashok Juttu",
  "Charanjeet Singh",
  "Dilip Kumar",
  "Vinod Daroz",
  "Farhad Hussain",
]
  .map((name) => ARTISTS.find((artist) => artist.name === name))
  .filter((artist) => artist !== undefined);

/**
 * TEMPORARY PLACEHOLDER — aerial rice terraces in Bali by Gianluca Gradogna
 * (gianlucagradogna.com), used with his permission. Shown in dark greyscale
 * behind the cards.
 */
const GROUND =
  "/sites/ekchitra-redesign/placeholders/artists-ground-gradogna.jpg";

const pad = (value: number) => String(value).padStart(2, "0");

/** A long arrow, drawn as a line. */
function Arrow() {
  return (
    <svg viewBox="0 0 40 10" aria-hidden="true" className="h-2.5 w-10 shrink-0">
      <path
        d="M0 5h39M34 1l4.5 4-4.5 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * 02 — Artists, after the chapters section of gianlucagradogna.com.
 *
 * Aerial rice terraces fill the section in dark greyscale, held still while
 * the page moves over them. On them, white cards in two columns
 * across the left eight columns of the grid, one per artist: the number top
 * left, a work top right, and the name set large in capitals at the bottom
 * with the medium and a long arrow. Each card rises into place as it scrolls
 * in, the second of a pair a beat behind. On the right, a white panel with a
 * line about the artists and a link to all of them rides along at the foot of
 * the screen.
 */
export function ArtistsChapters() {
  return (
    <section
      id="artists"
      aria-label="Artists"
      className={cn("relative scroll-mt-11 bg-(--k-ink) text-(--k-ink)", SANS)}
    >
      {/* The ground: held still while the cards scroll over it. */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="sticky top-0 h-svh overflow-hidden">
          <Image
            src={GROUND}
            alt=""
            fill
            sizes="100vw"
            className="object-cover brightness-[0.45] contrast-[1.15] grayscale"
          />
        </div>
      </div>

      {/* Measured off the reference at any width: cards 24.45vw × 30.95vw
          from the edge of the top bar's diamond (44px) with 2.2vw gaps; the panel as wide as the About and Exhibitions panels, min(34vw,480px), flush
          to the right edge. */}
      <div className="relative flex flex-col gap-y-8 px-4 pt-16 pb-0 lg:flex-row lg:items-stretch lg:justify-between lg:gap-y-0 lg:px-0 lg:pt-[2.85vw] lg:pl-11">
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-[repeat(2,24.45vw)] lg:gap-x-[2.2vw] lg:gap-y-[2.25vw] lg:pb-[2.85vw]">
          {FEATURED.map((artist, index) => {
            const work = artist.works[0];
            return (
              <li key={artist.id}>
                <InView delay={(index % 2) * 140} className="h-full">
                  <a
                    href={`${V5_ROUTES.artists}#${artist.id}`}
                    className="ek6-card flex h-full flex-col bg-white p-3 lg:p-[0.85vw]"
                  >
                    <div className="flex items-start justify-between gap-x-4">
                      <p className="text-[12px] tabular-nums text-(--k-ink)/55 lg:text-[0.8vw]">
                        {pad(index + 1)}
                      </p>
                      <div className="relative aspect-[282/354] w-[57.7%] shrink-0 overflow-hidden lg:w-[14.1vw]">
                        <Image
                          src={work.image}
                          alt={`${work.title} by ${artist.name}`}
                          fill
                          sizes="(min-width: 1024px) 15vw, 30vw"
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-auto pt-6 lg:pt-[1.6vw]">
                      <h3 className="max-w-[80%] text-[17px] leading-[1] tracking-[-0.02em] uppercase sm:text-[24px] lg:text-[2vw]">
                        {artist.name}
                      </h3>
                      <div className="mt-2 flex items-center justify-between gap-x-6 lg:mt-[0.6vw]">
                        <p
                          className={cn(
                            CAPS,
                            "line-clamp-1 text-[9px] text-(--k-ink)/55 lg:text-[0.75vw]",
                          )}
                        >
                          {work.medium}
                        </p>
                        <Arrow />
                      </div>
                    </div>
                  </a>
                </InView>
              </li>
            );
          })}
        </ul>

        <div className="lg:flex lg:w-[min(34vw,480px)] lg:shrink-0 lg:flex-col lg:justify-end">
          <div className="relative overflow-hidden bg-(--k-navy) p-6 text-white lg:sticky lg:bottom-0 lg:px-[2vw] lg:pt-[2vw] lg:pb-[2.6vw]">
            <Diamonds
              rows={18}
              shape="clusters"
              horizontal
              side="right"
              tint="sky"
              tintEvery={6}
              tintOpacity={0.6}
              className="absolute top-0 right-0 h-[48px] text-white/[0.14] lg:h-[3.3vw]"
            />
            <p className="relative text-[24px] leading-[1.05] tracking-[-0.02em] uppercase lg:text-[1.65vw]">
              From temple walls to city studios, every artist here brings a
              different way of seeing India.
            </p>
            <a
              href={V5_ROUTES.artists}
              className="mt-12 flex items-center justify-between gap-x-6 text-[15px] transition-opacity hover:opacity-60 lg:mt-[4.5vw] lg:text-[0.95vw]"
            >
              View all artists ({ARTISTS.length})
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
