import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_SECTION, ARTWORKS } from "../ekchitra-redesign/data";
import { Progress } from "../ekchitra-v4/Progress";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { InView } from "./InView";
import { BODY, CAPS, DISPLAY, SANS } from "./shared";

/**
 * Pictures floating around the statement. Each drifts at its own speed as the
 * section is scrolled (`--p` runs 0–1), which makes them gather and part. They
 * enter like the artist cards: each wipes open from the bottom, one after another.
 */
const FLOATS = [
  {
    artwork: ARTWORKS[0],
    className:
      "top-[6%] left-[5%] aspect-[3/4] w-[26%] translate-y-[calc((0.5_-_var(--p,0.5))_*_260px)] lg:w-[16%]",
  },
  {
    artwork: ARTWORKS[5],
    className:
      "top-[2%] right-[7%] aspect-square w-[22%] translate-y-[calc((0.5_-_var(--p,0.5))_*_120px)] lg:w-[12%]",
  },
  {
    artwork: ARTWORKS[3],
    className:
      "bottom-[3%] left-[19%] hidden aspect-[3/4] w-[11%] translate-y-[calc((0.5_-_var(--p,0.5))_*_420px)] lg:block",
  },
  {
    artwork: ARTWORKS[6],
    className:
      "right-[6%] bottom-[4%] aspect-[4/5] w-[28%] translate-y-[calc((0.5_-_var(--p,0.5))_*_200px)] lg:right-[13%] lg:w-[17%]",
  },
];

/**
 * Why we exist: the gallery's two opening lines centred in white space, with a
 * short paragraph and a link, and four artworks drifting past around them.
 */
export function Statement() {
  return (
    <Progress
      id="about"
      className={cn(
        "relative flex min-h-[96svh] items-center justify-center overflow-hidden px-4 pt-[220px] pb-[100px] lg:min-h-[100svh]",
        SANS,
      )}
    >
      {FLOATS.map(({ artwork, className }, index) => (
        <div
          key={artwork.image}
          className={cn("absolute will-change-transform", className)}
        >
          <InView delay={index * 140} className="size-full">
            <span className="ek5-wipe relative block size-full overflow-hidden">
              <Image
                src={artwork.image}
                alt={`${artwork.title} by ${artwork.artist}`}
                fill
                sizes="(max-width: 1023px) 28vw, 17vw"
                className="object-cover"
              />
            </span>
          </InView>
        </div>
      ))}

      <div className="relative max-w-[640px] text-center">
        <p className={CAPS}>
          <Chars text={ABOUT_SECTION.label} />
        </p>
        <h2
          className={cn(
            DISPLAY,
            "mt-5 text-[30px] leading-[1.15] lg:text-[44px]",
          )}
        >
          <Chars text={ABOUT_SECTION.heading} />
        </h2>
        <p className={cn(BODY, "mx-auto mt-6 max-w-[460px]")}>
          <Chars text={ABOUT_SECTION.paragraphs[1]} />
        </p>
        <CapsLink
          href={ABOUT_SECTION.cta.href}
          target="_blank"
          rel="noreferrer"
          className="mt-8"
        >
          {ABOUT_SECTION.cta.label}
        </CapsLink>
      </div>
    </Progress>
  );
}
