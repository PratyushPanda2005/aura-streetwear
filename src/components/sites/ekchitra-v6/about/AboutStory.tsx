"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";

import { HERO_SLIDES, SERVICES } from "../../ekchitra-redesign/data";
import { ABOUT_CURATOR, ABOUT_STORY } from "../../ekchitra-v5/about-data";
import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { V6_HOME } from "../data";
import { handwriting, signature } from "../fonts";
import { DriftPicture, useDrift } from "../motion";
import { ExhibitionsBands } from "./ExhibitionsBands";
import { BUTTON, FOOTER_GAP_BELOW, GRID, SECTION_TITLE } from "../styles";

const ABOUT = "/sites/ekchitra-redesign/about";

/** The gallery's own photographs, from ekchitra.com. */
const PHOTOS = {
  lamp: HERO_SLIDES[0],
  space: HERO_SLIDES[2],
  opening: {
    src: `${ABOUT}/gallery-a7b04229.jpg`,
    alt: "Guests at an EkChitra exhibition opening",
  },
};

/**
 * TEMPORARY PLACEHOLDERS (Unsplash, free licence) — the gallery's own artwork
 * files top out at 1200px, too soft at this size. Replace with high-resolution
 * photographs of EkChitra works:
 * - an artist painting at an easel, by Vitaly Gariev
 *   (unsplash.com/photos/in7H9J6WTPI);
 * - a close-up of a poured abstract painting, by Susan Wilkinson
 *   (unsplash.com/photos/2PxNdktl1J0).
 */
const COLLECTION = [
  {
    src: "/sites/ekchitra-redesign/placeholders/collection-painter-unsplash-gariev.jpg",
    alt: "An artist painting a still life at an easel in a studio",
    position: "object-[50%_40%]",
  },
  {
    src: "/sites/ekchitra-redesign/placeholders/collection-abstract-unsplash-wilkinson.jpg",
    alt: "A close-up of a poured abstract painting in purple, yellow and black",
    position: "object-center",
  },
];

/**
 * The curator's note, line by line, each indented a little differently as a
 * hand would set it. PLACEHOLDER WORDING — taken from EkChitra's own published
 * lines; confirm or replace with Annapurna M's own words before launch.
 */
const NOTE = [
  { line: "We’ve always lived around art —", indent: "lg:pl-0" },
  { line: "we’ve just forgotten to notice it.", indent: "lg:pl-[6%]" },
  {
    line: "Every exhibition here begins with an idea,",
    indent: "lg:pl-[12%]",
  },
  { line: "and every visit with curiosity.", indent: "lg:pl-[4%]" },
];

/** Stagger for each line's write-in, then the signature's. */
const WRITE_DELAYS = [
  "[--write-delay:0ms]",
  "[--write-delay:500ms]",
  "[--write-delay:1000ms]",
  "[--write-delay:1500ms]",
  "[--write-delay:2100ms]",
];

/** A paragraph that rises in once, as it scrolls into view. */
function Rise({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <InView delay={delay} className={className}>
      <div className="ek6-rise">{children}</div>
    </InView>
  );
}

/**
 * About, after goodman-gallery.com/about, with EkChitra's own words and
 * photographs (ekchitra.com/about). Under the shared banner: the gallery's
 * founding line set large and centred; two photographs side by side, edge to
 * edge; an opening in black and white on the left with the rest of the story
 * centred beside it; the exhibitions as full-screen poster bands with
 * frosted cards gliding over them; and the collection — two works stacked on
 * the left, the words centred beside them with a button to the artworks;
 * and the curator, after the handwritten note on velaaprivateisland.com: a few
 * lines in a pen hand on sand, writing themselves in, signed by Annapurna M.
 * Pictures drift gently as the page scrolls; words rise in once; all held
 * still for reduced motion.
 */
export function AboutStory() {
  const root = useRef<HTMLDivElement>(null);
  useDrift(root, []);

  return (
    <div
      ref={root}
      className={cn("relative isolate bg-white text-(--k-ink)", SANS)}
    >
      {/* The founding line. */}
      <section
        aria-label="Our story"
        className={cn(GRID, "pt-12 pb-20 lg:pt-16 lg:pb-32")}
      >
        <Rise className="col-span-4 lg:col-span-10 lg:col-start-2">
          <p className={cn(CAPS, "text-center text-[12px]")}>
            {ABOUT_STORY.label}
          </p>
          <p className="mt-6 text-center text-[30px] leading-[1.12] tracking-[-0.035em] lg:text-[3.6vw]">
            {ABOUT_STORY.lead}
          </p>
        </Rise>
      </section>

      {/* Two photographs, edge to edge. */}
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {[PHOTOS.lamp, PHOTOS.space].map((photo) => (
          <DriftPicture
            key={photo.src}
            src={photo.src}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="aspect-[4/3]"
          />
        ))}
      </div>

      {/* An opening on the left; the rest of the story on the right, centred on it. */}
      <section
        aria-label="How it began"
        className={cn(GRID, "items-center gap-y-8 py-20 lg:py-32")}
      >
        <DriftPicture
          src={PHOTOS.opening.src}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="col-span-4 aspect-[3/2] grayscale lg:col-span-7"
        />
        <div className="col-span-4 space-y-4 text-[16px] leading-[1.45] lg:col-span-4 lg:col-start-9">
          {ABOUT_STORY.body.map((line, index) => (
            <Rise key={line} delay={index * 120}>
              <p>{line}</p>
            </Rise>
          ))}
        </div>
      </section>

      {/* Exhibitions: posters held behind the page, cards gliding over them. */}
      <ExhibitionsBands />

      {/* The collection: two works stacked on the left, words centred on
          them at the right, after Goodman's Cheetah Plains section. */}
      <section
        aria-labelledby="collection-heading"
        className={cn(GRID, "items-center gap-y-10 py-20 lg:py-32")}
      >
        <div className="col-span-4 space-y-5 lg:col-span-7">
          {COLLECTION.map((work) => (
            <div
              key={work.src}
              className="relative aspect-[3/2] overflow-hidden bg-(--k-ink)/5"
            >
              <Image
                src={work.src}
                alt={work.alt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className={cn("object-cover", work.position)}
              />
            </div>
          ))}
        </div>
        <div className="col-span-4 lg:col-span-4 lg:col-start-9">
          <Rise>
            <p className={cn(CAPS, "text-[12px]")}>The collection</p>
            <h2 id="collection-heading" className={cn(SECTION_TITLE, "mt-3")}>
              A living collection of contemporary expressions
            </h2>
          </Rise>
          <div className="mt-6 space-y-4 text-[16px] leading-[1.5]">
            <Rise delay={120}>
              <p>
                From bold abstracts to serene landscapes, sculpture and mixed
                media, every work is chosen to bring beauty and meaning into the
                spaces people live and work in.
              </p>
            </Rise>
            <Rise delay={240}>
              <p>
                {SERVICES[0].body} {SERVICES[1].body}
              </p>
            </Rise>
          </div>
          <a href={`${V6_HOME}/artworks`} className={cn(BUTTON, "mt-10")}>
            View the Artworks
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* The curator, after Velaa's handwritten note: a few lines in a pen
          hand on sand, writing themselves in, then her signature. */}
      <section
        aria-labelledby="curator-heading"
        className={cn(
          "bg-(--k-sand) py-20 text-(--k-ink) lg:py-36",
          FOOTER_GAP_BELOW,
        )}
      >
        <InView className="mx-auto max-w-[1100px] px-4 lg:px-5">
          <h2 id="curator-heading" className={cn(CAPS, "text-center")}>
            A note from our curator
          </h2>
          <figure className="mt-10 lg:mt-16">
            <blockquote className={cn(handwriting.className, "-rotate-2")}>
              <p className="space-y-2 text-[16px] leading-[1.9] min-[400px]:text-[17px] sm:text-[26px] lg:space-y-4 lg:text-[2.5vw] min-[1440px]:text-[36px]">
                {NOTE.map(({ line, indent }, index) => (
                  <span key={line} className={cn("block", indent)}>
                    <span
                      className={cn(
                        "ek6-write -mx-[0.3em] inline-block px-[0.3em]",
                        WRITE_DELAYS[index],
                      )}
                    >
                      {line}
                    </span>
                  </span>
                ))}
              </p>
            </blockquote>
            <figcaption className="mt-8 flex flex-col items-end pr-[6%] lg:mt-12">
              <span
                className={cn(
                  signature.className,
                  "ek6-write -mx-[0.3em] inline-block -rotate-6 px-[0.3em] text-[64px] leading-none lg:text-[88px]",
                  WRITE_DELAYS[NOTE.length],
                )}
              >
                {ABOUT_CURATOR.name}
              </span>
              <span className={cn(CAPS, "mt-3")}>Curator, EkChitra</span>
            </figcaption>
          </figure>
        </InView>
      </section>

      {/* A run of the diamond motif resting on the footer. */}
      <Diamonds
        rows={40}
        shape="steps"
        horizontal
        side="right"
        tint="navy"
        tintEvery={6}
        tintOpacity={0.22}
        className="pointer-events-none absolute right-0 bottom-0 -z-10 h-[40px] -scale-y-100 text-(--k-ink)/[0.08] lg:h-[56px]"
      />
    </div>
  );
}
