"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";
import { GRID } from "../styles";

/** Every work by every artist, in the artists' order. */
const WORKS = ARTISTS.flatMap((artist) =>
  artist.works.map((work) => ({
    ...work,
    artist: artist.name,
    href: artist.href,
  })),
);

type Work = (typeof WORKS)[number];

/** Deal the works into `count` columns in turn, so the rows read across. */
const intoColumns = (works: Work[], count: number) =>
  Array.from({ length: count }, (_, column) =>
    works.filter((_, index) => index % count === column),
  );

/**
 * The artworks, after the v6 grid: a ruled bar with a search field, one-tap
 * medium filters and a count, then every work in columns — four on desktop,
 * two on a phone, dealt in turn so the rows read across — each shown at its
 * own proportions, never cropped. Under
 * each picture, between fine rules: its number, the title, the artist, the
 * medium and size, and a link to the artist that slides in on hover.
 */
const workKey = (work: Work) => `${work.artist}-${work.title}-${work.image}`;

/** One work: the picture at its own proportions, then its details. */
function WorkCard({ work }: { work: Work }) {
  const n = WORKS.indexOf(work) + 1;
  return (
    <li className="mb-10 lg:mb-12">
      <a
        href={work.href}
        target="_blank"
        rel="noreferrer"
        className="group block"
      >
        <Image
          src={work.image}
          alt={`${work.title} by ${work.artist}`}
          width={0}
          height={0}
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="h-auto w-full"
        />
        <div className="mt-3 flex items-baseline justify-between gap-x-3 border-t border-(--k-ink)/15 pt-2.5">
          <span className="text-[12px] tabular-nums">{pad(n)}</span>
          <span className={cn(CAPS, "line-clamp-1 text-right text-[10px]")}>
            {work.medium}
          </span>
        </div>
        <h3 className="mt-2 text-[18px] leading-[1.15] tracking-[-0.02em] lg:text-[20px]">
          {work.title}
        </h3>
        <p className="mt-0.5 text-[14px]">{work.artist}</p>
        <div className="mt-2 flex items-center justify-between text-[13px]">
          <span>{work.size}</span>
          <span className="hidden items-center gap-x-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex">
            {ARTWORKS_PAGE.cardCta}
            <LineArrow className="w-6" />
          </span>
        </div>
      </a>
    </li>
  );
}

export function ArtworksIndex({
  initialQuery = "",
}: {
  /** Search to start with, e.g. a medium picked from a link. */
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const term = query.trim().toLowerCase();

  const results = useMemo(
    () =>
      WORKS.filter((work) =>
        `${work.artist} ${work.title} ${work.medium}`
          .toLowerCase()
          .includes(term),
      ),
    [term],
  );

  return (
    <section
      id="works"
      aria-label="Artworks"
      className={cn("bg-white pb-16 text-(--k-ink) lg:pb-24", SANS)}
    >
      {/* Search, filters and count, between two rules. */}
      <div className={GRID}>
        <div className="col-span-4 flex flex-col gap-y-4 border-y border-(--k-ink) py-3 lg:col-span-12 lg:flex-row lg:items-center lg:gap-x-8">
          <label className="flex h-10 w-full shrink-0 items-center gap-x-3 border-b border-(--k-ink)/30 lg:w-[320px] lg:border-b-0">
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
            <span className="sr-only">Search the artworks</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={ARTWORKS_PAGE.searchPlaceholder}
              className="h-full min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-(--k-ink)/45"
            />
          </label>

          <ul className="flex flex-wrap gap-1.5">
            {["All", ...ARTWORKS_PAGE.quickSearches].map((chip) => {
              const value = chip === "All" ? "" : chip;
              const on = term === value.toLowerCase();
              return (
                <li key={chip}>
                  <button
                    type="button"
                    onClick={() => setQuery(value)}
                    aria-pressed={on}
                    className={cn(
                      "h-8 border px-3 text-[13px] transition-colors duration-300",
                      on
                        ? "border-(--k-ink) bg-(--k-ink) text-white"
                        : "border-(--k-ink)/20 hover:border-(--k-ink)",
                    )}
                  >
                    {chip}
                  </button>
                </li>
              );
            })}
          </ul>

          <p
            aria-live="polite"
            className="text-[13px] tabular-nums lg:ml-auto lg:shrink-0"
          >
            {pad(results.length)} / {pad(WORKS.length)} works
          </p>
        </div>
      </div>

      {/* The works, each at its own proportions. */}
      {results.length ? (
        <>
          {/* Four columns on desktop, two on a phone, each dealt in turn. */}
          {([4, 2] as const).map((count) => (
            <div
              key={count}
              className={cn(
                "mt-8 gap-x-4 px-4 lg:mt-10 lg:gap-x-5 lg:px-5",
                count === 4 ? "hidden lg:flex" : "flex lg:hidden",
              )}
            >
              {intoColumns(results, count).map((column, c) => (
                <ul key={c} className="min-w-0 flex-1">
                  {column.map((work) => (
                    <WorkCard key={workKey(work)} work={work} />
                  ))}
                </ul>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className={cn(GRID, "mt-10")}>
          <p className="col-span-4 text-[17px] lg:col-span-6">
            No works match “{query}”.{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="underline underline-offset-4 hover:opacity-60"
            >
              Show all
            </button>
          </p>
        </div>
      )}
    </section>
  );
}
