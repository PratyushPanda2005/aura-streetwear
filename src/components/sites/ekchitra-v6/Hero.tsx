import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTWORKS, LOGO } from "../ekchitra-redesign/data";
import { Chars } from "../ekchitra-v5/Chars";
import { CAPS, SANS, V5_ROUTES } from "../ekchitra-v5/shared";
import { HERO_ART, HERO_COPY } from "../ekchitra-v5/heroes/data";
import { EXHIBITIONS } from "./data";
import { HeroCarousel } from "./HeroCarousel";

/**
 * The five artworks the top-right cell cycles through, one per artist — all
 * painted or photographed edge to edge, so each fills the cell (no works
 * cut out on white).
 */
const SLIDE_FILES = [
  "untitled-1--ashok-juttu.png",
  "embrace-of-light--selvakumar.png",
  "meri-maa-ki-dua--rajesh-naik.png",
  "vernacular-house-2--kolipitchai-prabhakar.png",
];
const SLIDES = [
  {
    src: HERO_ART[0].src,
    alt: `${HERO_ART[0].title} by ${HERO_ART[0].artist}`,
  },
  ...SLIDE_FILES.flatMap((file) => {
    const work = ARTWORKS.find((artwork) => artwork.image.endsWith(`/${file}`));
    return work
      ? [{ src: work.image, alt: `${work.title} by ${work.artist}` }]
      : [];
  }),
];

/**
 * TEMPORARY PLACEHOLDER — "Group of people on a guided tour inside the art
 * gallery" (Mixkit, free licence —
 * mixkit.co/free-stock-video/group-of-people-on-a-guided-tour-inside-the-art-49294/).
 * Replace with EkChitra footage.
 */
const VIDEO = {
  src: "/sites/ekchitra-redesign/placeholders/hero-video-mixkit-49294.mp4",
  poster:
    "/sites/ekchitra-redesign/placeholders/hero-video-mixkit-49294-poster.jpg",
};

/** The show the corner cell points to: what is on now. */
const FEATURED_SHOW = EXHIBITIONS[0];

/**
 * Hero, after aspensearch.com: a Swiss grid of cells filling the screen under
 * the top bar — the wordmark set huge in a white cell; artworks cross-fading
 * on their own beside it; a film of the gallery below; a black cell saying
 * what the gallery is; and in the corner, the current exhibition's poster
 * filling the cell, darkened from the foot by a black gradient with a plain
 * "View exhibition →" over it — the whole cell is the link. Cells open in sequence on arrival.
 */
export function Hero() {
  return (
    <section
      id="top"
      className={cn(
        "grid h-[calc(100svh-44px)] min-h-[600px] grid-cols-2 grid-rows-[1fr_1fr] bg-white text-(--k-ink) lg:grid-cols-[1fr_1fr_0.62fr_0.62fr]",
        SANS,
      )}
    >
      <div className="ek5-rise relative col-span-2 flex items-end p-4 [--d:150ms] lg:p-5">
        <h1 className="sr-only">EkChitra — {HERO_COPY.statement}</h1>
        <span
          role="img"
          aria-label={LOGO.alt}
          className="block aspect-[526/118] w-[88%] max-w-[720px] bg-(--k-ink) [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
        />
      </div>
      <HeroCarousel
        slides={SLIDES}
        className="ek5-rise col-span-2 hidden [--d:300ms] lg:block"
      />
      <div className="ek5-rise relative col-span-2 overflow-hidden bg-(--k-ink) [--d:450ms]">
        <video
          src={VIDEO.src}
          poster={VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
      <div className="ek5-rise hidden flex-col justify-between bg-(--k-ink) p-5 text-white [--d:600ms] lg:flex">
        <p className="text-[17px] leading-[1.3]">
          <Chars text={HERO_COPY.body} />
        </p>
        <a
          href={V5_ROUTES.about}
          className={cn(
            CAPS,
            "flex items-center justify-between text-[11px] text-white/80 hover:text-white",
          )}
        >
          About the gallery <span aria-hidden="true">→</span>
        </a>
      </div>
      <a
        href={FEATURED_SHOW.href}
        target="_blank"
        rel="noreferrer"
        className="group ek5-rise relative hidden overflow-hidden bg-white [--d:750ms] lg:block"
      >
        <Image
          src={FEATURED_SHOW.image}
          alt={FEATURED_SHOW.title}
          fill
          sizes="20vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-(--k-ink)/85 via-(--k-ink)/35 to-transparent"
        />
        <span
          className={cn(
            CAPS,
            "absolute inset-x-5 bottom-5 flex items-center justify-between text-[11px] text-white",
          )}
        >
          View exhibition
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </a>
    </section>
  );
}
