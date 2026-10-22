"use client";

import { useRef } from "react";

import { cn } from "@/lib/utils";

import Image from "next/image";

import { HERO_SLIDES, SERVICES } from "../../ekchitra-redesign/data";
import { ABOUT_CURATOR, ABOUT_STORY } from "../../ekchitra-v5/about-data";
import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { InView } from "../../ekchitra-v5/InView";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CONTACT, V6_HOME } from "../data";
import { DriftPicture, useDrift } from "../motion";
import { ExhibitionsBands } from "./ExhibitionsBands";
import { BUTTON, GRID, SECTION_TITLE } from "../styles";

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
 * and the curator as one simple full-width card in brand navy — portrait, name, her line, a
 * paragraph and a button. Pictures drift gently as the page
 * scrolls; words rise in once; all held still for reduced motion.
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
            View the artworks
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* The curator, as one simple rectangular card. */}
      <section
        aria-labelledby="curator-heading"
        className={cn(GRID, "pb-20 lg:pb-32")}
      >
        <div className="col-span-4 grid grid-cols-1 bg-(--k-navy) text-white sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:col-span-12">
          <div className="relative aspect-[4/5] overflow-hidden bg-(--k-ink)/5 sm:aspect-auto sm:min-h-[420px]">
            <Image
              src={ABOUT_CURATOR.image.src}
              alt={ABOUT_CURATOR.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
          </div>
          <div className="flex flex-col p-5 lg:p-10">
            <p className={cn(CAPS, "text-[12px]")}>About the curator</p>
            <h2 id="curator-heading" className={cn(SECTION_TITLE, "mt-3")}>
              {ABOUT_CURATOR.name}
            </h2>
            <p className="mt-2 text-[15px]">{ABOUT_CURATOR.role}</p>
            <p className="mt-6 text-[19px] leading-[1.35] tracking-[-0.015em] lg:text-[21px]">
              {ABOUT_CURATOR.lead}
            </p>
            <p className="mt-4 text-[16px] leading-[1.5]">
              {ABOUT_CURATOR.body[0]}
            </p>
            <a
              href={CONTACT.href}
              target="_blank"
              rel="noreferrer"
              className={cn(BUTTON, "mt-8 bg-white text-(--k-ink) lg:mt-auto")}
            >
              Talk to the curator
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
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
