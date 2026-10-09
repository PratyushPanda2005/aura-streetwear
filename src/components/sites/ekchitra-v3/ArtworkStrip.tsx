import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTWORKS, ROUTES } from "../ekchitra-redesign/data";
import { GUTTER, LABEL, LabelLink, SANS } from "./shared";

/**
 * Artworks: a black band with a slow, endless strip of the gallery's works at a
 * shared height. The strip pauses while the pointer is over it.
 */
export function ArtworkStrip() {
  return (
    <section className={cn("bg-black pt-12 pb-12 text-(--ek-paper)", SANS)}>
      <div className={cn("flex items-center justify-between", GUTTER)}>
        <h2 className={LABEL}>Artworks</h2>
        <LabelLink href={ROUTES.artworks}>View all artworks</LabelLink>
      </div>

      <div className="ek3-marquee-wrap mt-8 overflow-hidden">
        <div className="ek3-marquee flex w-max">
          {[...ARTWORKS, ...ARTWORKS].map((item, index) => (
            <Image
              key={`${item.image}-${index}`}
              src={item.image}
              alt={
                index < ARTWORKS.length ? `${item.title} by ${item.artist}` : ""
              }
              width={item.width}
              height={item.height}
              sizes="320px"
              className="h-[180px] w-auto lg:h-[230px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
