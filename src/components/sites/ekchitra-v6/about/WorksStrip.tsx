"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { SANS } from "../../ekchitra-v5/shared";

/** One work from each artist, so the strip runs through the whole roster. */
const WORKS = ARTISTS.map((artist) => ({
  ...artist.works[0],
  artist: artist.name,
}));

/**
 * The artists' works as a strip, after the image carousel on
 * goodman-gallery.com/about: one work by each artist, all on one height and
 * each at its own width, 20px apart, starting on the page margin and running
 * off the right edge. Drag it with the mouse, swipe it, scroll it sideways
 * with a trackpad, or tab to it and use the arrow keys. A dragged strip
 * glides to a stop rather than halting. No heading or captions: each work is
 * named only in its alt text.
 */
export function WorksStrip() {
  const track = useRef<HTMLDivElement>(null);

  // Drag to scroll with the mouse, then glide to a stop.
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;
    let lastX = 0;
    let lastT = 0;
    let velocity = 0;
    let frame = 0;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const glide = () => {
      velocity *= 0.94;
      el.scrollLeft -= velocity;
      if (Math.abs(velocity) > 0.3) frame = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      down = true;
      moved = false;
      startX = lastX = e.clientX;
      lastT = performance.now();
      startScroll = el.scrollLeft;
      velocity = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) {
        moved = true;
        el.classList.add("cursor-grabbing");
      }
      el.scrollLeft = startScroll - dx;
      const now = performance.now();
      velocity = ((e.clientX - lastX) / Math.max(1, now - lastT)) * 16;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      el.classList.remove("cursor-grabbing");
      if (!reduce && Math.abs(velocity) > 1)
        frame = requestAnimationFrame(glide);
    };
    // A drag shouldn't count as a click on a work.
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    el.addEventListener("click", onClick, true);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <section
      aria-label="Artists' works"
      className={cn("bg-white pt-20 text-(--k-ink) lg:pt-32", SANS)}
    >
      <div
        ref={track}
        tabIndex={0}
        role="region"
        aria-label="Artists' works — drag, swipe or use the arrow keys to move through"
        className="flex cursor-grab gap-x-4 overflow-x-auto px-4 pb-2 select-none [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--k-navy) lg:gap-x-5 lg:px-5 [&::-webkit-scrollbar]:hidden"
        onKeyDown={(e) => {
          const el = track.current;
          if (!el) return;
          if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
            e.preventDefault();
            el.scrollBy({
              left: (e.key === "ArrowRight" ? 1 : -1) * el.clientWidth * 0.6,
              behavior: "smooth",
            });
          }
        }}
      >
        {WORKS.map((work) => (
          <figure key={work.image} className="shrink-0">
            <Image
              src={work.image}
              alt={`${work.title} by ${work.artist}`}
              width={0}
              height={0}
              draggable={false}
              sizes="40vw"
              className="h-[260px] w-auto max-w-none bg-(--k-ink)/5 sm:h-[340px] lg:h-[29vw] lg:max-h-[440px]"
            />
          </figure>
        ))}
        {/* Room after the last work, so it can come clear of the edge. */}
      </div>
    </section>
  );
}
