"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS_PAGE } from "../ekchitra-redesign/data";
import { ARTISTS } from "./artists-data";
import { InView } from "./InView";
import { BODY, CAPS, GUTTER, SANS } from "./shared";

const CHIP = "h-9 border px-4 text-[13px] transition-colors duration-300";

/** The medium filters that at least one artist works in. */
const MEDIUMS = ARTWORKS_PAGE.quickSearches.filter((label) =>
  ARTISTS.some((artist) =>
    artist.works.some((item) =>
      item.medium.toLowerCase().includes(label.toLowerCase()),
    ),
  ),
);

/**
 * The artists, laid out exactly as the artworks page: a search field and
 * one-tap medium filters, then an even grid, four across, of square frames.
 *
 * Each artist is shown through their work, never a portrait. On hover (or
 * keyboard focus) the frame compresses by a strip, the details slide up into
 * the strip,
 * and a "view artist" button rises into the space left below them. Pictures
 * wipe open in turn the first time they are seen, and never again — not even
 * when filtering.
 */
export function ArtistsGrid() {
  const [query, setQuery] = useState("");
  const term = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      ARTISTS.filter((artist) =>
        [
          artist.name,
          artist.statement,
          ...artist.works.map((item) => `${item.title} ${item.medium}`),
        ]
          .join(" ")
          .toLowerCase()
          .includes(term),
      ),
    [term],
  );

  return (
    <section id="artists" className={cn("pb-24 lg:pb-[120px]", GUTTER, SANS)}>
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
          <span className="sr-only">Search artist, medium or artwork</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search artist / medium / artwork"
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
          {MEDIUMS.map((label) => {
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
        {results.length} {results.length === 1 ? "artist" : "artists"}
      </p>

      {results.length === 0 && (
        <p className={cn(BODY, "py-24 text-center text-[20px]")}>
          No artists match “{query.trim()}”.
        </p>
      )}
      {/* Every artist stays on the page; filtering only hides the ones that
          don't match, so each card plays its entrance once. */}
      <ul
        hidden={results.length === 0}
        className="mt-5 grid grid-cols-2 gap-x-3 gap-y-10 lg:grid-cols-4 lg:gap-x-5 lg:gap-y-14"
      >
        {ARTISTS.map((artist, index) => {
          const [first] = artist.works;
          const tag = MEDIUMS.find((label) =>
            first.medium.toLowerCase().includes(label.toLowerCase()),
          );
          return (
            <li
              key={artist.id}
              id={artist.id}
              hidden={!results.includes(artist)}
              className="scroll-mt-[80px] lg:scroll-mt-[96px]"
            >
              <InView once delay={(index % 4) * 110}>
                <a
                  href={artist.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block"
                >
                  {/* Picture: one of the artist's works, filling a square
                      frame. On hover the frame gets 64px shorter. */}
                  <span className="ek5-wipe relative block aspect-square overflow-hidden">
                    <span className="absolute inset-x-0 top-0 bottom-0 bg-(--k-sand) transition-[bottom] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:bottom-16 group-focus-visible:bottom-16">
                      <Image
                        src={first.image}
                        alt={`${first.title} by ${artist.name}`}
                        fill
                        sizes="(max-width: 1023px) 50vw, 25vw"
                        className="object-cover"
                      />
                    </span>
                  </span>

                  {/* Details: slide up into the strip to make room below. */}
                  <span className="ek5-fade mt-4 block transition-transform duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:-translate-y-16 group-focus-visible:-translate-y-16">
                    <span className="mb-3 flex h-7 items-center gap-x-2">
                      {tag && (
                        <span className="inline-block bg-(--k-maroon) px-3 py-[6px] text-[12px] leading-4 text-white">
                          {tag}
                        </span>
                      )}
                      <span className="text-[12px] text-(--k-ink)/60">
                        {artist.works.length}{" "}
                        {artist.works.length === 1 ? "work" : "works"}
                      </span>
                    </span>
                    <span className="block text-[16px] leading-[1.3] lg:text-[18px]">
                      {artist.name}
                    </span>
                    <span className="mt-1 line-clamp-2 text-[13px] leading-[1.4] text-(--k-ink)/60">
                      {artist.statement}
                    </span>
                  </span>

                  {/* Button: rises into the space left at the bottom. */}
                  <span className="absolute bottom-0 left-0 flex h-11 translate-y-[6px] items-stretch bg-(--k-ink) text-white opacity-0 transition-[opacity,translate,background-color] duration-[320ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-[60ms] group-focus-visible:translate-y-0 group-focus-visible:opacity-100 hover:bg-(--k-maroon)">
                    <span className="flex items-center px-4 text-[14px]">
                      View artist
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
    </section>
  );
}
