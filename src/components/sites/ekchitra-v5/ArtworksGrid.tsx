"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS, ARTWORKS_PAGE } from "../ekchitra-redesign/data";
import { Diamonds } from "./Diamonds";
import { InView } from "./InView";
import { BODY, CAPS, GUTTER, SANS } from "./shared";

const CHIP = "h-9 border px-4 text-[13px] transition-colors duration-300";

/**
 * Shape of a card's picture box, from the work's width ÷ height, so tall, square
 * and wide works make cards of different heights and the columns interlock.
 */
const MEDIA_SHAPE = (ratio: number) =>
  ratio < 0.85
    ? "aspect-[4/5]"
    : ratio > 1.25
      ? "aspect-[4/3]"
      : "aspect-square";

/**
 * The artworks themselves: a search field and one-tap medium filters, then
 * four interlocking columns of cards.
 *
 * Each card is a sand panel of fixed height: the work shown whole at the top,
 * a medium tag, the artist's name and the work's details. Alternate cards
 * carry the grey-and-blue diamond motif, large, behind the work. On hover (or keyboard focus) the picture gives
 * up a strip, the text slides up into it and a "view artist" button rises into
 * the space left at the bottom — the card itself never changes size. Cards wipe
 * open in turn as they come into view.
 */
export function ArtworksGrid() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      ARTWORKS.filter((artwork) =>
        `${artwork.artist} ${artwork.title} ${artwork.medium}`
          .toLowerCase()
          .includes(term),
      ),
    [term],
  );

  return (
    <section id="works" className={cn("pb-24 lg:pb-[120px]", GUTTER, SANS)}>
      <div className="flex flex-col gap-y-5 border-t border-(--k-ink)/15 pt-6 lg:flex-row lg:items-center lg:justify-between">
        <label className="flex h-11 w-full items-center gap-x-3 border-b border-(--k-ink) lg:w-[360px]">
          <svg
            viewBox="0 0 16 16"
            aria-hidden="true"
            className="size-4 shrink-0"
          >
            <circle
              cx="7"
              cy="7"
              r="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path d="M11 11l4 4" stroke="currentColor" strokeWidth="1" />
          </svg>
          <span className="sr-only">{ARTWORKS_PAGE.searchPlaceholder}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={ARTWORKS_PAGE.searchPlaceholder}
            className="h-full w-full bg-transparent text-[15px] outline-none placeholder:text-(--k-ink)/45"
          />
        </label>

        <ul className="flex flex-wrap gap-2">
          <li>
            <button
              type="button"
              aria-pressed={term === ""}
              onClick={() => setQuery("")}
              className={cn(
                CHIP,
                term === ""
                  ? "border-(--k-ink) bg-(--k-ink) text-white"
                  : "border-(--k-ink)/25 hover:border-(--k-maroon) hover:text-(--k-maroon)",
              )}
            >
              All
            </button>
          </li>
          {ARTWORKS_PAGE.quickSearches.map((label) => {
            const active = term === label.toLowerCase();
            return (
              <li key={label}>
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setQuery(active ? "" : label)}
                  className={cn(
                    CHIP,
                    active
                      ? "border-(--k-maroon) bg-(--k-maroon) text-white"
                      : "border-(--k-ink)/25 hover:border-(--k-maroon) hover:text-(--k-maroon)",
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <p aria-live="polite" className={cn(CAPS, "mt-8 text-(--k-ink)/60")}>
        {results.length} {results.length === 1 ? "work" : "works"}
      </p>

      {results.length === 0 ? (
        <p className={cn(BODY, "py-24 text-center text-[20px]")}>
          No artworks match “{query.trim()}”.
        </p>
      ) : (
        <ul className="mt-5 columns-2 gap-x-3 lg:columns-4 lg:gap-x-5">
          {results.map((artwork, index) => {
            const tag = ARTWORKS_PAGE.quickSearches.find((label) =>
              artwork.medium.toLowerCase().includes(label.toLowerCase()),
            );
            const motif = index % 4;

            return (
              <li
                key={artwork.image}
                className="mb-3 break-inside-avoid lg:mb-5"
              >
                <InView delay={(index % 4) * 110}>
                  <a
                    href={artwork.href}
                    target="_blank"
                    rel="noreferrer"
                    className="ek5-wipe group relative block overflow-hidden bg-(--k-sand)"
                  >
                    {/* Picture. Its box keeps the work's own proportions; on
                        hover the picture gives up a strip at the bottom. */}
                    <span
                      className={cn(
                        "relative block",
                        MEDIA_SHAPE(artwork.width / artwork.height),
                      )}
                    >
                      {/* Diamond motif, large and behind the work, on alternate cards. */}
                      {motif === 0 && (
                        <Diamonds
                          rows={13}
                          accent
                          className="absolute top-0 left-0 w-[38%] text-(--k-ink)/10"
                        />
                      )}
                      {motif === 2 && (
                        <Diamonds
                          rows={13}
                          side="right"
                          accent
                          className="absolute top-0 right-0 w-[38%] text-(--k-ink)/10"
                        />
                      )}
                      <span className="absolute inset-x-[9%] top-[9%] bottom-[5%] transition-[bottom] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:bottom-[calc(5%+64px)] group-focus-visible:bottom-[calc(5%+64px)]">
                        <Image
                          src={artwork.image}
                          alt={`${artwork.title} by ${artwork.artist}`}
                          fill
                          sizes="(max-width: 1023px) 50vw, 25vw"
                          className="object-contain drop-shadow-[0_12px_20px_rgb(0_0_0/0.2)]"
                        />
                      </span>
                    </span>

                    {/* Text. Slides up on hover to make room for the button. */}
                    <span className="block px-4 pt-2 pb-5 transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-16 group-focus-visible:-translate-y-16 lg:px-6 lg:pb-6">
                      {tag && (
                        <span className="mb-4 inline-block bg-(--k-maroon) px-3 py-[6px] text-[12px] leading-4 text-white">
                          {tag}
                        </span>
                      )}
                      <span className="block text-[16px] leading-[1.3] lg:text-[18px]">
                        {artwork.artist}
                      </span>
                      <span className="mt-1 block text-[13px] leading-[1.4] text-(--k-ink)/60">
                        {artwork.title}
                        <span className="block">
                          {artwork.medium} · {artwork.size}
                        </span>
                      </span>
                    </span>

                    {/* Button. Rises into the freed strip. */}
                    <span className="absolute bottom-4 left-4 flex h-11 translate-y-[6px] items-stretch bg-(--k-ink) text-white opacity-0 transition-[opacity,translate,background-color] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[60ms] group-focus-visible:translate-y-0 group-focus-visible:opacity-100 hover:bg-(--k-maroon) lg:bottom-6 lg:left-6">
                      <span className="flex items-center px-4 text-[14px]">
                        {ARTWORKS_PAGE.cardCta}
                      </span>
                      <span className="flex items-center pr-4">
                        <svg
                          viewBox="0 0 12 18"
                          aria-hidden="true"
                          className="h-[18px] w-3"
                        >
                          <path
                            d="M3 0l3 3-3 3-3-3zM9 6l3 3-3 3-3-3zM3 12l3 3-3 3-3-3z"
                            fill="currentColor"
                          />
                        </svg>
                      </span>
                    </span>
                  </a>
                </InView>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
