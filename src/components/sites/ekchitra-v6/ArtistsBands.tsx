"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

import {
  ARTIST_BIOS,
  ARTISTS_PAGE,
  ARTISTS_SECTION,
  ARTWORKS,
} from "../ekchitra-redesign/data";
import { CapsLink } from "../ekchitra-v5/CapsLink";
import { Chars } from "../ekchitra-v5/Chars";
import { BODY, DISPLAY, SANS, TITLE } from "../ekchitra-v5/shared";
import { GRID, HEAD } from "./styles";
import { Index } from "./ui";

/** Artists shown on the homepage; the rest are a click away. */
const FEATURED = ARTWORKS.filter((artwork) => !artwork.cutout).slice(0, 4);

/** Distance from the top of one card to the top of the next (card + gap), px. */
const PITCH = 516;

/** Frosted card, a fixed 488px tall so the cards keep an even rhythm. */
const CARD =
  "pointer-events-auto flex h-[488px] w-[min(365px,calc(100vw-32px))] flex-col overflow-hidden rounded-[2px] bg-[rgb(240_240_240/0.85)] p-3 pb-5 text-(--k-ink) backdrop-blur-[24px]";

/** A band of the section: one full screen, a window on to a picture that stays put behind it. */
const BAND = "relative h-svh min-h-[640px] [clip-path:inset(0)]";

const ROW = "grid grid-cols-[92px_1fr] gap-x-3 text-[13px] leading-[1.45]";

/**
 * Artists, the v5 bands in the v6 grid: the "02 Artists" index and heading,
 * then frosted cards travelling over full-screen pictures of the artists' work.
 *
 * Each band is a window on to a picture fixed to the screen, so a picture
 * holds still while the next band slides up over it (and drifts a touch for
 * depth). The cards ride in one column on top, eased so each is centred as
 * its picture fills the screen. The cards are the v5 frosted cards, a little
 * wider (365px). "View All Artists" lives on the About section's white panel.
 */
export function ArtistsBands() {
  const bandsRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = bandsRef.current;
    const rail = railRef.current;
    if (!wrap || !rail) return;
    const bands = [...wrap.querySelectorAll<HTMLElement>("[data-band]")];
    let frame = 0;

    const update = () => {
      frame = 0;
      const view = window.innerHeight;
      const band = bands[0].offsetHeight;
      const scrolled = Math.min(
        Math.max(-wrap.getBoundingClientRect().top, 0),
        (bands.length - 1) * band,
      );
      const shift = (scrolled * (band - PITCH)) / band;
      rail.style.transform = `translate3d(0, ${shift.toFixed(1)}px, 0)`;
      for (const item of bands) {
        const offset = item.getBoundingClientRect().top / view;
        item.style.setProperty(
          "--d",
          Math.max(-1, Math.min(1, offset)).toFixed(3),
        );
      }
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      id="artists"
      aria-label="Artists"
      className={cn("scroll-mt-11 bg-white text-(--k-ink)", SANS)}
    >
      <div className={cn(GRID, HEAD)}>
        <div className="col-span-4 lg:col-span-7">
          <Index label={ARTISTS_SECTION.label} />
          <h2 className={cn(TITLE, "mt-2 lg:mt-3")}>
            <Chars text="Discover EkChitra’s Artists" />
          </h2>
          <p className={cn(BODY, "mt-6 max-w-[360px] text-(--k-ink)/70")}>
            <Chars text={ARTISTS_PAGE.intro} />
          </p>
        </div>
      </div>

      <div ref={bandsRef} className="relative overflow-clip">
        {FEATURED.map((artwork) => (
          <div key={artwork.artist} data-band className={BAND}>
            <div
              className={cn(
                "fixed inset-x-0 -top-[10svh] -z-10 h-[120svh] will-change-transform",
                "translate-y-[calc(var(--d,0)_*_9svh)]",
              )}
            >
              <Image
                src={artwork.image}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-(--k-ink)/25" />
            </div>
          </div>
        ))}

        <div
          ref={railRef}
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-y-7 pt-[max(84px,calc((100svh-488px)/2+8px))] will-change-transform"
        >
          {FEATURED.map((artwork) => (
            <article key={artwork.artist} className={CARD}>
              <div className="relative aspect-[311/175] shrink-0 overflow-hidden rounded-[2px]">
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  sizes="365px"
                  className="object-cover"
                />
              </div>
              <h3
                className={cn(DISPLAY, "mt-3 mb-6 text-[34px] leading-[1.1]")}
              >
                {artwork.artist}
              </h3>
              <dl className="flex flex-1 flex-col gap-y-2">
                <div className={ROW}>
                  <dt>Artwork</dt>
                  <dd>{artwork.title}</dd>
                </div>
                <div className={ROW}>
                  <dt>Medium</dt>
                  <dd>
                    {artwork.medium}
                    <span className="block">{artwork.size}</span>
                  </dd>
                </div>
                <div className={ROW}>
                  <dt>About</dt>
                  <dd className="line-clamp-4">
                    {ARTIST_BIOS[artwork.artist]}
                  </dd>
                </div>
                <div className={cn(ROW, "mt-auto")}>
                  <dt />
                  <dd>
                    <CapsLink
                      arrow
                      href={artwork.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {ARTISTS_SECTION.slideCta}
                    </CapsLink>
                  </dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
