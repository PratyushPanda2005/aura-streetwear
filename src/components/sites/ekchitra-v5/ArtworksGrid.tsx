"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS, ARTWORKS_PAGE } from "../ekchitra-redesign/data";
import { InView } from "./InView";
import { BODY, CAPS, GUTTER, SANS } from "./shared";

const CHIP = "h-9 border px-4 text-[13px] transition-colors duration-300";

/**
 * The artworks themselves: a search field and one-tap medium filters, then an
 * even grid, four across.
 *
 * Every entry has the same frame and the same layout — picture, medium tag,
 * artist's name, details — so rows and text line up across the page. On hover
 * (or keyboard focus) the picture compresses by a strip, the details slide up
 * into it and a "view artist" button rises into the space left below them; the
 * entry itself never changes size. Pictures wipe open in turn the first time
 * they come into view, and stay open after that.
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
        <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-14">
          {results.map((artwork, index) => {
            const tag = ARTWORKS_PAGE.quickSearches.find((label) =>
              artwork.medium.toLowerCase().includes(label.toLowerCase()),
            );
            return (
              <li key={artwork.image}>
                <InView once delay={(index % 4) * 110}>
                  <a
                    href={artwork.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative block"
                  >
                    {/* Picture: every entry has the same square frame, filled
                        edge to edge, so rows and text line up. On hover the
                        frame gets 64px shorter and the picture compresses
                        around its centre. Shaped (cut-out) works are shown
                        whole inside the frame instead of filling it. */}
                    <span className="ek5-wipe relative block aspect-square overflow-hidden">
                      <span className="absolute inset-x-0 top-0 bottom-0 transition-[bottom] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:bottom-16 group-focus-visible:bottom-16">
                        <Image
                          src={artwork.image}
                          alt={`${artwork.title} by ${artwork.artist}`}
                          fill
                          sizes="(max-width: 1023px) 50vw, 25vw"
                          className={
                            artwork.cutout ? "object-contain" : "object-cover"
                          }
                        />
                      </span>
                    </span>

                    {/* Details: slide up into the strip to make room below. */}
                    <span className="ek5-fade mt-4 block transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-16 group-focus-visible:-translate-y-16">
                      {/* The tag row keeps its height even when a work has no
                          tag, so names line up along each row. */}
                      <span className="mb-3 block h-7">
                        {tag && (
                          <span className="inline-block bg-(--k-maroon) px-3 py-[6px] text-[12px] leading-4 text-white">
                            {tag}
                          </span>
                        )}
                      </span>
                      <span className="block text-[16px] leading-[1.3] lg:text-[18px]">
                        {artwork.artist}
                      </span>
                      <span className="mt-1 block text-[13px] leading-[1.4] text-(--k-ink)/60">
                        <span className="block truncate">{artwork.title}</span>
                        <span className="block truncate">
                          {artwork.medium} · {artwork.size}
                        </span>
                      </span>
                    </span>

                    {/* Button: rises into the space left at the bottom. */}
                    <span className="absolute bottom-0 left-0 flex h-11 translate-y-[6px] items-stretch bg-(--k-ink) text-white opacity-0 transition-[opacity,translate,background-color] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[60ms] group-focus-visible:translate-y-0 group-focus-visible:opacity-100 hover:bg-(--k-maroon)">
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
