import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  ARTISTS_PAGE,
  ARTISTS_SECTION,
  ARTWORKS,
} from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { ArrowLink, BODY, GUTTER, H1, SANS, SERIF } from "./shared";

/** Artists shown on the homepage — the ones whose work fills a tall card. */
const FEATURED = ARTWORKS.filter((artwork) => !artwork.cutout).slice(0, 8);

/**
 * Artists: a large heading set from the middle of the page, rows of four tall
 * cards stepped up and down with the artist's name over the bottom, then a line
 * and a link to the full list.
 */
export function Artists() {
  return (
    <section id="artists" className={cn("pt-24 lg:pt-[190px]", GUTTER, SANS)}>
      <Reveal className="lg:ml-[50%]">
        <h2 className={H1}>
          Artists shaping <span className="block">contemporary India</span>
        </h2>
      </Reveal>

      <Reveal className="mt-14 lg:mt-24">
        <ul className="grid grid-cols-2 gap-x-2 gap-y-2 lg:grid-cols-4">
          {FEATURED.map((artwork, index) => (
            <li key={artwork.artist} className={cn(index % 2 && "lg:mt-10")}>
              <a
                href={artwork.href}
                target="_blank"
                rel="noreferrer"
                className="group relative block aspect-[342/485] overflow-hidden bg-(--v-night)"
              >
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  sizes="(max-width: 1023px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/80 to-transparent" />
                <span className="absolute inset-x-3 bottom-4 text-white lg:inset-x-6 lg:bottom-6">
                  <span
                    className={cn(
                      SERIF,
                      "block text-[22px] leading-[1] lg:text-[36px]",
                    )}
                  >
                    {artwork.artist}
                  </span>
                  <span className="mt-2 block text-[12px] leading-4 opacity-0 transition-opacity duration-500 group-hover:opacity-80">
                    {artwork.title} · {artwork.medium}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal className="mt-16 lg:mt-24 lg:ml-[calc(50%+5px)]">
        <p className={cn(BODY, "max-w-[480px]")}>{ARTISTS_PAGE.intro}</p>
        <ArrowLink href={ARTISTS_SECTION.cta.href} className="mt-12">
          {ARTISTS_SECTION.cta.label}
        </ArrowLink>
      </Reveal>
    </section>
  );
}
