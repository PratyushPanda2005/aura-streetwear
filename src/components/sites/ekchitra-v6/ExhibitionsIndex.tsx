"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { SANS } from "../ekchitra-v5/shared";
import { EXHIBITIONS } from "./data";

/** Three shows to scroll through: what is on now, then the latest from the archive. */
const SHOWS = EXHIBITIONS.slice(0, 3);

/**
 * A dim gallery scene behind each poster, as the reference sets each project
 * on a dark shot of its own world: openings and the Hyd Art fair.
 */
const SCENES = [
  "/sites/ekchitra-redesign/about/gallery-a7b04229.jpg",
  "/sites/ekchitra-redesign/about/about-banner-hydart-2025.jpg",
  "/sites/ekchitra-redesign/about/about-banner-hydart-2025.jpg",
];

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
 * 02 — Exhibitions, after the project index of gianlucagradogna.com.
 *
 * Two columns. On the brand black, the left holds one gallery scene, in black
 * and white at a fifth of its strength and held still, that cross-fades to
 * the next show's scene as the active show changes; over it, a
 * single frame held in the middle of the screen. Scrolling on, the next
 * show's poster slides up inside that frame and covers the one before, in
 * step with the scroll — a screen of scroll per show — its picture settling
 * from a slight zoom; the wipe eases after the scroll so it glides. The right
 * is a white panel, in black type, that stays put. At the top, what is
 * showing: its number set huge with its title, very large, directly under
 * it; a light run of the diamond motif in the open middle; and at the foot
 * a numbered index of the three, all in black, with the current one bracketed,
 * then a link to the show and its dates under a fine rule. When the next
 * block reaches the middle of the screen, the number and the title fade to
 * the next and the bracket moves down the index. Clicking a name scrolls to
 * its block. On a phone the panel gives way to a
 * caption under each poster.
 */
export function ExhibitionsIndex() {
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const pictures = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    // How far each poster has covered the one before, eased after the scroll.
    const shown: number[] = SHOWS.map((_, index) => (index === 0 ? 1 : 0));
    let frame = 0;

    const paint = () => {
      frame = 0;
      const view = window.innerHeight;
      const middle = view / 2;
      let next = 0;
      let moving = false;
      blocks.current.forEach((block, index) => {
        if (!block) return;
        const top = block.getBoundingClientRect().top;
        if (top <= middle) next = index;
        if (index === 0) return;
        const frameEl = frames.current[index];
        const picture = pictures.current[index];
        if (!frameEl || !picture) return;
        // Covers as its stretch of scroll passes: from its block entering at
        // the bottom of the screen to its block reaching the top bar.
        const target = Math.min(1, Math.max(0, (view - top) / (view - 44)));
        shown[index] += (target - shown[index]) * 0.14;
        if (Math.abs(target - shown[index]) > 0.0005) moving = true;
        else shown[index] = target;
        const t = shown[index];
        frameEl.style.clipPath = `inset(${((1 - t) * 100).toFixed(2)}% 0 0 0)`;
        picture.style.transform = `scale(${(1.15 - 0.15 * t).toFixed(4)})`;
      });
      setActive(next);
      if (moving) frame = window.requestAnimationFrame(paint);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(paint);
    };
    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const goTo = (index: number) => {
    blocks.current[index]?.scrollIntoView({ behavior: "smooth" });
  };

  const show = SHOWS[active];

  return (
    <section
      id="exhibitions"
      aria-label="Exhibitions"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      <div className="flex">
        {/* The posters, scrolling by over one held, cross-fading scene. */}
        <div className="relative w-full bg-(--k-ink) text-white lg:w-[calc(100%-min(34vw,480px))]">
          <div aria-hidden="true" className="absolute inset-0">
            <div className="sticky top-11 h-[calc(100svh-44px)] overflow-hidden">
              {SHOWS.map((item, index) => (
                <Image
                  key={item.title}
                  src={SCENES[index % SCENES.length]}
                  alt=""
                  fill
                  sizes="60vw"
                  className={cn(
                    "object-cover grayscale transition-opacity duration-700",
                    index === active ? "opacity-20" : "opacity-0",
                  )}
                />
              ))}
            </div>
          </div>

          {/* The frame, held in the middle while the posters wipe up inside it. */}
          <div className="absolute inset-0">
            <div className="sticky top-11 flex h-[calc(100svh-44px)] flex-col items-center justify-center px-4 lg:px-0">
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${show.title} — view exhibition`}
                className="relative block aspect-[660/400] w-full overflow-hidden lg:w-[75%]"
              >
                {SHOWS.map((item, index) => (
                  <div
                    key={item.title}
                    ref={(node) => {
                      frames.current[index] = node;
                    }}
                    className={cn(
                      "absolute inset-0 overflow-hidden will-change-[clip-path]",
                      index > 0 && "[clip-path:inset(100%_0_0_0)]",
                    )}
                  >
                    <div
                      ref={(node) => {
                        pictures.current[index] = node;
                      }}
                      className="absolute inset-0 will-change-transform"
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(min-width: 1024px) 46vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ))}
              </a>
              {/* On a phone, the caption the panel would carry. */}
              <div className="relative mt-5 w-full lg:hidden">
                <p className="text-[12px] tabular-nums text-white/50">
                  N.{pad(active + 1)} · {show.dates || show.subtitle}
                </p>
                <h3 className="mt-1 text-[30px] leading-[1.02] tracking-[-0.04em]">
                  {show.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Scroll room: one screen per show. */}
          {SHOWS.map((item, index) => (
            <div
              key={item.title}
              ref={(node) => {
                blocks.current[index] = node;
              }}
              aria-hidden="true"
              className="h-[calc(100svh-44px)] scroll-mt-11"
            />
          ))}
        </div>

        {/* The panel, held while the posters pass. */}
        <div className="hidden lg:block lg:w-[min(34vw,480px)] lg:shrink-0">
          <div className="sticky top-11 flex h-[calc(100svh-44px)] flex-col px-[2vw] pt-[1.6vw] pb-[2.6vw]">
            {/* What is showing: the number, huge, with the title under it. */}
            <div>
              <div className="relative h-[0.8em] text-[11vw] leading-[0.8] tracking-[-0.06em] text-(--k-ink)">
                <span aria-hidden="true" className="invisible tabular-nums">
                  00
                </span>
                {SHOWS.map((item, index) => (
                  <p
                    key={item.title}
                    aria-hidden={index !== active}
                    className={cn(
                      "absolute top-0 left-0 tabular-nums transition-opacity duration-500 ease-out",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {pad(index + 1)}
                  </p>
                ))}
              </div>

              {/* Titles stacked in one cell, so the block is as tall as the
                  tallest and the next title fades in over the last. */}
              <div className="mt-[1.4vw] grid items-start text-[4.4vw] leading-[1.02] tracking-[-0.05em]">
                {SHOWS.map((item, index) => (
                  <h3
                    key={item.title}
                    aria-hidden={index !== active}
                    className={cn(
                      "line-clamp-2 text-(--k-ink) transition-opacity duration-500 ease-out [grid-area:1/1]",
                      index === active ? "opacity-100" : "opacity-0",
                    )}
                  >
                    {item.title}
                  </h3>
                ))}
              </div>
            </div>

            {/* A light run of the diamond motif in the open middle. */}
            <div className="relative flex-1">
              <Diamonds
                rows={30}
                shape="steps"
                side="right"
                tint="maroon"
                tintEvery={7}
                tintOpacity={0.45}
                className="absolute top-1/2 right-[-2vw] w-[3.3vw] -translate-y-1/2 text-(--k-ink)/[0.1]"
              />
            </div>

            {/* The index of the three, then the way in. */}
            <div>
              <ol className="text-[clamp(13px,1.1vw,17px)] leading-[1.9] uppercase">
                {SHOWS.map((item, index) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      onClick={() => goTo(index)}
                      className={cn(
                        "grid grid-cols-[4.2em_1fr] text-left text-(--k-ink) transition-opacity duration-300",
                        index !== active && "hover:opacity-60",
                      )}
                    >
                      <span className="tabular-nums">
                        {index === active
                          ? `{ N.${pad(index + 1)} }`
                          : `N.${pad(index + 1)}`}
                      </span>
                      <span className="line-clamp-1">{item.title}</span>
                    </button>
                  </li>
                ))}
              </ol>

              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className="mt-[1.6vw] flex items-center justify-between gap-x-6 pt-[1.6vw] text-[clamp(15px,1.25vw,19px)] transition-opacity hover:opacity-60"
              >
                <span>
                  View exhibition
                  <span> · {show.dates || show.subtitle}</span>
                </span>
                <Arrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
