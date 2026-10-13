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
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/** Artists shown on the homepage; the rest are a click away. */
const FEATURED = ARTWORKS.filter((artwork) => !artwork.cutout).slice(0, 4);

/** Distance from the top of one card to the top of the next (card + gap), px. */
const PITCH = 560;

/** Frosted card, a fixed 532px tall so the cards keep an even rhythm. */
const CARD =
  "pointer-events-auto flex h-[532px] w-[min(335px,calc(100vw-32px))] flex-col overflow-hidden rounded-[2px] bg-[rgb(240_240_240/0.85)] p-3 pb-5 text-(--k-ink) backdrop-blur-[24px]";

/** A band of the section: one full screen, a window on to a picture that stays put behind it. */
const BAND = "relative h-svh min-h-[640px] [clip-path:inset(0)]";

const ROW = "grid grid-cols-[92px_1fr] gap-x-3 text-[13px] leading-[1.45]";

/**
 * Artists: a very large heading, then frosted cards travelling over full-screen
 * pictures of the artists' work.
 *
 * The section is a stack of bands, one per card. Each band is a window on to a
 * picture fixed to the screen, so a picture holds still while the next band
 * slides up over it (and drifts a touch for depth). The cards ride in one column
 * on top, moving a little slower than the page: the bands are taller than the
 * cards' spacing, and the column is eased down as the section is scrolled so
 * that each card is centred exactly as its picture fills the screen, with the
 * card before and the card after peeking in above and below. The cards have no
 * entry effect of their own; they simply glide in with the scroll. A plain
 * button under the section leads to the full list.
 */
export function Artists() {
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
    <section id="artists" className={cn("scroll-mt-[68px]", SANS)}>
      <div className={cn("relative pt-2 pb-8 lg:pb-10", GUTTER)}>
        <Diamonds
          rows={24}
          shape="zigzag"
          tint="maroon"
          side="right"
          className="absolute top-0 right-0 hidden w-[120px] text-(--k-ink)/10 lg:block"
        />
        <p className={CAPS}>
          <Chars text={ARTISTS_SECTION.label} />
        </p>
        <h2
          className={cn(
            DISPLAY,
            "mt-4 text-[48px] leading-[1.08] tracking-[-0.045em] lg:text-[98px]",
          )}
        >
          <Chars
            text={["Discover", "EkChitra’s Artists"]}
            after={
              <sup className="ek5-fade relative -top-[2.2em] text-[12px] tracking-normal lg:-top-[4.6em] lg:text-[14px]">
                ({ARTWORKS.length})
              </sup>
            }
          />
        </h2>
        <p className={cn(BODY, "mt-6 max-w-[360px]")}>
          <Chars text={ARTISTS_PAGE.intro} />
        </p>
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
          className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-y-7 pt-[max(84px,calc((100svh-532px)/2+8px))] will-change-transform"
        >
          {FEATURED.map((artwork) => (
            <article key={artwork.artist} className={CARD}>
              <div className="relative aspect-[311/175] shrink-0 overflow-hidden rounded-[2px]">
                <Image
                  src={artwork.image}
                  alt={`${artwork.title} by ${artwork.artist}`}
                  fill
                  sizes="335px"
                  className="object-cover"
                />
              </div>
              <h3
                className={cn(DISPLAY, "mt-3 mb-10 text-[34px] leading-[1.1]")}
              >
                {artwork.artist}
              </h3>
              <dl className="flex flex-1 flex-col gap-y-3">
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

      <div className={cn("flex justify-center pt-10 lg:pt-12", GUTTER)}>
        <a
          href={ARTISTS_SECTION.cta.href}
          className={cn(
            CAPS,
            "flex h-11 items-center bg-(--k-maroon) px-7 text-white transition-colors duration-300 hover:bg-(--k-ink)",
          )}
        >
          {ARTISTS_SECTION.cta.label}
        </a>
      </div>
    </section>
  );
}
