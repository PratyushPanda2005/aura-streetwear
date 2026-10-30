"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLayoutEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { HERO_SLIDES } from "../../ekchitra-redesign/data";
import { ABOUT_STORY, ABOUT_VALUES } from "../../ekchitra-v5/about-data";
import { BODY, CAPS, SANS, TITLE } from "../../ekchitra-v5/shared";
import { STATS } from "../data";
import { CuratorNote } from "./CuratorNote";
import { GRID, HEAD, ITEM_TITLE } from "../styles";

const ABOUT = "/sites/ekchitra-redesign/about";
const SHOWS = "/sites/ekchitra-redesign/exhibitions";

/**
 * Each value's photograph: the gallery's own pictures of its rooms and
 * evenings (none of them used in About us above), not artworks.
 */
const VALUE_PHOTOS: Record<string, { src: string; alt: string }> = {
  Curiosity: HERO_SLIDES[1],
  Context: {
    src: `${SHOWS}/living-temple/view-02.jpg`,
    alt: "Classical dancers before painted deities at Living Temple",
  },
  Connection: {
    src: `${ABOUT}/gallery-a7b04229.jpg`,
    alt: "Guests at an EkChitra exhibition opening",
  },
  Conversation: {
    src: `${SHOWS}/hyd-art/view-02.jpg`,
    alt: "Speakers and guests together on stage at Hyd Art 2025",
  },
};

/**
 * About us's pictures: the gallery's own photographs of its rooms and
 * evenings, each placed in a cell of
 * a three-column grid so they sit apart, after novaform's: `place` is the
 * cell on desktop.
 */
const ABOUT_PHOTOS = [
  {
    src: `${ABOUT}/about-banner-hydart-2025.jpg`,
    alt: "Visitors among the paintings at Hyd Art 2025",
    place: "lg:col-start-2 lg:row-start-1",
  },
  {
    src: `${SHOWS}/hyd-art/view-06.jpg`,
    alt: "Speaking to the press beside a painting at Hyd Art 2025",
    place: "lg:col-start-3 lg:row-start-1",
  },
  {
    src: `${SHOWS}/living-temple/view-03.jpg`,
    alt: "Classical dancers performing at Living Temple",
    place: "lg:col-start-1 lg:row-start-2",
  },
  {
    src: `${SHOWS}/hyd-art/view-05.jpg`,
    alt: "Visitors at Hyd Art 2025, EkChitra",
    place: "lg:col-start-3 lg:row-start-2",
  },
];

const VALUES_TITLE = ABOUT_VALUES.items.map((value) => value.title).join(", ");

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * About's sections, under the shared page frame, with EkChitra's own words
 * and photographs:
 * - About us: the heading as on every page, then the gallery's counts at
 *   the left and its photographs scattered at the right (WhoWeAre).
 * - How we work, after krew-orqestra's "How it works": a row of
 *   half-screen panels — the heading centred, then each value as a card (a
 *   photograph of the gallery tagged with its name, its line, "01 / 04" and
 *   a short detail), ruled apart; on desktop the screen holds while the row
 *   slides sideways, each card rising in as its panel arrives, then slides
 *   off to uncover the curator's note (CuratorNote), as on krew's.
 *   Phones see the panels stacked, then the note.
 */
export function AboutSections() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia(el);

    // About us's photographs rise in, one after another.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const squares = gsap.utils.toArray<HTMLElement>("[data-square]");
      if (!squares.length) return;
      gsap.from(squares, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: squares[0], start: "top 85%", once: true },
      });
    });

    // How we work, timed as krew-orqestra's: the screen holds while the
    // row slides left 1.2px per pixel scrolled; then the whole layer slides
    // off to the left (about 1.07px per pixel), uncovering the curator's
    // note, which then writes itself in. Each card rises from well below
    // as its panel crosses from the right edge to a third of the way in,
    // and each panel's rule draws down over its last 30% of the way in.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const stage = el.querySelector<HTMLElement>("[data-stage]");
        const layer = el.querySelector<HTMLElement>("[data-layer]");
        const row = el.querySelector<HTMLElement>("[data-row]");
        const note = el.querySelector<HTMLElement>("[data-note]");
        if (!stage || !layer || !row) return;
        const distance = () => Math.max(0, row.scrollWidth - stage.clientWidth);
        const rowScroll = () => distance() / 1.2;
        const layerScroll = () => stage.clientWidth / 1.067;

        // One trigger holds the screen for both slides.
        const hold = ScrollTrigger.create({
          trigger: stage,
          start: "top 44px",
          end: () => `+=${rowScroll() + layerScroll()}`,
          pin: true,
          invalidateOnRefresh: true,
        });
        const slide = gsap.to(row, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            start: () => hold.start,
            end: () => hold.start + rowScroll(),
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(layer, {
          x: () => -stage.clientWidth,
          ease: "none",
          scrollTrigger: {
            start: () => hold.start + rowScroll(),
            end: () => hold.end,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (note && self.progress > 0.02) note.dataset.shown = "true";
            },
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-card]").forEach((card) => {
          gsap.fromTo(
            card,
            { y: () => window.innerHeight * 0.61 },
            {
              y: 0,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card.parentElement,
                containerAnimation: slide,
                start: "left right",
                end: "left 33%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          );
        });
        gsap.utils.toArray<HTMLElement>("[data-rule]").forEach((rule) => {
          gsap.fromTo(
            rule,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              scrollTrigger: {
                trigger: rule.parentElement,
                containerAnimation: slide,
                start: "left right",
                end: "left 70%",
                scrub: true,
              },
            },
          );
        });
      },
    );

    // The title's letters come in out of a blur, in no fixed order.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const chars = gsap.utils.toArray<HTMLElement>("[data-char]");
      if (!chars.length) return;
      gsap.from(chars, {
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.9,
        ease: "power2.out",
        stagger: { each: 0.03, from: "random" },
        scrollTrigger: { trigger: chars[0], start: "top 85%", once: true },
      });
    });

    // Without the slide (phones, reduced motion), the note writes itself in
    // when it scrolls into view.
    mm.add("(max-width: 1023px), (prefers-reduced-motion: reduce)", () => {
      const note = el.querySelector<HTMLElement>("[data-note]");
      if (!note) return;
      const seen = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        note.dataset.shown = "true";
        seen.disconnect();
      });
      seen.observe(note);
      return () => seen.disconnect();
    });
    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className={cn("bg-white text-(--k-ink)", SANS)}>
      <WhoWeAre />

      {/* How we work, after krew-orqestra's "How it works": on desktop the
          screen holds while a row of half-screen panels slides sideways,
          then the whole row slides off to the left, uncovering the
          curator's note behind it. Phones see the panels, then the note. */}
      <section aria-labelledby="values-heading" className="relative isolate">
        <div
          data-stage=""
          className="relative isolate flex flex-col border-t border-(--k-ink)/12 lg:block lg:h-[calc(100svh-44px)] lg:overflow-clip"
        >
          {/* Behind: the curator's note, filling the screen. */}
          <div
            data-back=""
            className="order-last bg-(--k-sand) lg:absolute lg:inset-0"
          >
            <CuratorNote
              manual
              className="lg:flex lg:h-full lg:flex-col lg:justify-center lg:py-0"
            />
          </div>

          {/* In front: the row of panels, on white. */}
          <div
            data-layer=""
            className="relative z-10 bg-white lg:h-full lg:will-change-transform"
          >
            <ol
              data-row=""
              className="flex flex-col lg:h-full lg:flex-row lg:will-change-transform"
            >
              {/* First, the heading, centred in its panel. */}
              <li className="flex shrink-0 flex-col items-center justify-center px-4 py-16 text-center lg:h-full lg:w-[50vw] lg:px-20 lg:py-0">
                <p className={cn(CAPS, "text-[12px]")}>
                  [ {ABOUT_VALUES.label} ]
                </p>
                <h2
                  id="values-heading"
                  aria-label={VALUES_TITLE}
                  className={cn(TITLE, "mt-6 max-w-[520px]")}
                >
                  {VALUES_TITLE.split(" ").map((word, w) => (
                    <span key={w} aria-hidden="true">
                      <span className="inline-block whitespace-nowrap">
                        {[...word].map((char, c) => (
                          <span key={c} data-char="" className="inline-block">
                            {char}
                          </span>
                        ))}
                      </span>{" "}
                    </span>
                  ))}
                </h2>
              </li>
              {ABOUT_VALUES.items.map((value, index) => (
                <li
                  key={value.title}
                  className="relative flex shrink-0 flex-col items-center justify-center px-4 py-12 lg:h-full lg:w-[50vw] lg:px-20 lg:py-0"
                >
                  {/* The rule between panels, drawn down as it arrives. */}
                  <span
                    aria-hidden="true"
                    data-rule=""
                    className="absolute top-0 left-0 hidden h-full w-px origin-top bg-(--k-ink)/15 lg:block"
                  />
                  <article
                    data-card=""
                    className="flex w-full max-w-[560px] flex-col lg:will-change-transform"
                  >
                    <div className="relative aspect-[670/420] overflow-hidden bg-(--k-ink)/5">
                      <Image
                        src={(VALUE_PHOTOS[value.title] ?? value.image).src}
                        alt={(VALUE_PHOTOS[value.title] ?? value.image).alt}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                      <span
                        className={cn(
                          CAPS,
                          "absolute top-3 left-3 bg-(--k-ink)/70 px-2 py-1 text-[10px] text-white",
                        )}
                      >
                        [ {value.title} ]
                      </span>
                    </div>
                    <div className="mt-5 flex items-baseline justify-between gap-x-4">
                      <h3 className={ITEM_TITLE}>{value.body}</h3>
                      <span className="shrink-0 text-[12px] tabular-nums">
                        {pad(index + 1)} / {pad(ABOUT_VALUES.items.length)}
                      </span>
                    </div>
                    <p className="mt-3 max-w-[460px] text-[15px] leading-[1.5] text-(--k-ink)/75">
                      {value.detail}
                    </p>
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * Who we are, with the heading set as on every v6 page (label and title at
 * the left, the line and a count at the right); below, after novaform's,
 * the gallery's counts stacked at the left, each on a hairline, and at the
 * right the gallery's photographs scattered over a three-column grid.
 * The squares rise in, one after another, as they arrive.
 */
function WhoWeAre() {
  return (
    <section aria-labelledby="who-heading" className="pb-8 lg:pb-12">
      {/* The heading, set as every page's: label and title at the left, the
          line and a count at the right. */}
      <div className={cn(GRID, HEAD, "gap-y-6")}>
        <div className="col-span-4 lg:col-span-7">
          <p className={cn(CAPS, "text-[12px]")}>About us</p>
          <h2 id="who-heading" className={cn(TITLE, "mt-3")}>
            A living collection of contemporary expressions
          </h2>
        </div>
        <div className="col-span-4 flex flex-col justify-end lg:col-span-4 lg:col-start-9">
          <p className={cn(BODY, "text-(--k-ink)/80")}>{ABOUT_STORY.body[1]}</p>
          <p className="mt-2 text-[13px] tabular-nums">
            {STATS[0].value} {STATS[0].label.toLowerCase()}
          </p>
        </div>
      </div>

      <div className={cn(GRID, "gap-y-10 pt-6 lg:pt-10")}>
        <dl className="col-span-4 flex flex-col justify-end gap-y-6 max-lg:order-last max-lg:flex-row max-lg:flex-wrap max-lg:gap-x-8 lg:col-span-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l border-(--k-ink)/15 pl-4">
              <dt className={cn(CAPS, "text-[11px] text-(--k-ink)/70")}>
                {stat.label}
              </dt>
              <dd className={cn(ITEM_TITLE, "mt-2 tabular-nums")}>
                {stat.value}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>

        <div className="col-span-4 grid grid-cols-2 gap-3 lg:col-span-9 lg:grid-cols-3 lg:grid-rows-2">
          {ABOUT_PHOTOS.map((work) => (
            <div
              key={work.src}
              data-square=""
              className={cn(
                "relative aspect-[4/3] overflow-hidden bg-(--k-ink)/5",
                work.place,
              )}
            >
              <Image
                src={work.src}
                alt={work.alt}
                fill
                sizes="(min-width: 1024px) 24vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
