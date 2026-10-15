"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { ABOUT_GALLERY } from "./about-data";
import { InView } from "./InView";
import { EYEBROW, GUTTER, SANS } from "./shared";

/** Entry delays, so the first pictures rise one after another. */
const DELAYS = [
  "[--delay:0ms]",
  "[--delay:200ms]",
  "[--delay:400ms]",
  "[--delay:600ms]",
  "[--delay:800ms]",
];

function Arrow({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className={cn("size-4", flip && "-scale-x-100")}
    >
      <path
        d="M2 8h11M9 4l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}

/**
 * A strip of photographs from the gallery and its exhibitions, as on
 * kettal.com's history page: pictures of one height side by side, running off
 * the right edge, moved with two arrow buttons (or by swiping). When the strip
 * comes into view the pictures rise into place one after another.
 */
export function AboutGallery() {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () =>
      setEdge({
        start: el.scrollLeft <= 4,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
      });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const move = (direction: 1 | -1) =>
    track.current?.scrollBy({
      left: direction * track.current.clientWidth * 0.6,
      behavior: "smooth",
    });

  const BUTTON =
    "flex size-11 items-center justify-center rounded-full border border-(--k-ink)/25 transition-colors duration-300 hover:border-(--k-maroon) hover:bg-(--k-maroon) hover:text-white disabled:pointer-events-none disabled:opacity-30";

  return (
    <section className={cn("pb-16 lg:pb-[96px]", SANS)}>
      <div className={cn("flex items-end justify-between pb-6", GUTTER)}>
        <p className={EYEBROW}>Gallery ({ABOUT_GALLERY.length})</p>
        <div className="flex gap-x-2">
          <button
            type="button"
            aria-label="Previous pictures"
            disabled={edge.start}
            onClick={() => move(-1)}
            className={BUTTON}
          >
            <Arrow flip />
          </button>
          <button
            type="button"
            aria-label="Next pictures"
            disabled={edge.end}
            onClick={() => move(1)}
            className={BUTTON}
          >
            <Arrow />
          </button>
        </div>
      </div>

      <InView>
        <div
          ref={track}
          className="flex snap-x snap-mandatory scroll-px-4 gap-x-[10px] overflow-x-auto px-4 [scrollbar-width:none] lg:scroll-px-5 lg:px-5 [&::-webkit-scrollbar]:hidden"
        >
          {ABOUT_GALLERY.map((picture, index) => (
            <div
              key={`${picture.src}-${index}`}
              className={cn(
                "ek5-lift group relative h-[46svh] max-h-[569px] min-h-[280px] shrink-0 snap-start overflow-hidden bg-(--k-sand) lg:h-[62svh]",
                picture.tall ? "aspect-[3/4]" : "aspect-[3/2]",
                DELAYS[Math.min(index, DELAYS.length - 1)],
              )}
            >
              <Image
                src={picture.src}
                alt={picture.alt}
                fill
                sizes="(max-width: 1023px) 80vw, 60vw"
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>
      </InView>
    </section>
  );
}
