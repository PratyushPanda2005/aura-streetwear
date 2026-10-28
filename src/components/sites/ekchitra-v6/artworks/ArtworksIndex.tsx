"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";
import { CARD_TITLE, GRID } from "../styles";
import { ArtworkPanel } from "./ArtworkPanel";
import { relatedWorks } from "./related";
import { ARTWORK_SIZES } from "./sizes";

/** Every work by every artist, in the artists' order. */
const WORKS = ARTISTS.flatMap((artist) =>
  artist.works.map((work) => ({
    ...work,
    artist: artist.name,
    artistData: artist,
  })),
);

type Work = (typeof WORKS)[number];

/**
 * The artworks, after the v6 grid: a ruled bar with a search field, one-tap
 * medium filters and a count, then every work in justified rows: the works in
 * a row share one height, each as wide as its own proportions make it, and
 * the row fills the width exactly — never cropped.
 * Under each picture: its number, the title, the artist, the medium and size,
 * and "View artwork", which slides in on hover. Choosing a work opens its
 * details in a panel that slides up over the grid (ArtworkPanel).
 */
const workKey = (work: Work) => `${work.artist}-${work.title}-${work.image}`;

/**
 * One work: the picture, then its details wrapped to the picture's width.
 * Its flex basis is its aspect ratio times the row height (--row-h, set on
 * the list) and it grows in that same ratio, so every work in a row ends up
 * one height and the row fills the width exactly.
 */
function WorkCard({ work, onOpen }: { work: Work; onOpen: () => void }) {
  const n = WORKS.indexOf(work) + 1;
  const [width, height] = ARTWORK_SIZES[work.image] ?? [1, 1];
  return (
    <li
      style={{ "--ratio": width / height } as CSSProperties}
      className="min-w-0 grow-(--ratio) basis-[calc(var(--ratio)*var(--row-h))]"
    >
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className="group block w-full text-left"
      >
        <Image
          src={work.image}
          alt={`${work.title} by ${work.artist}`}
          width={width}
          height={height}
          sizes="(min-width: 1024px) 620px, 360px"
          className="h-auto w-full"
        />
        <div className="mt-3 flex items-baseline justify-between gap-x-3 pt-2.5">
          <span className="text-[12px] tabular-nums">{pad(n)}</span>
          <span className={cn(CAPS, "line-clamp-1 text-right text-[11px]")}>
            {work.medium}
          </span>
        </div>
        <h3 className={cn(CARD_TITLE, "mt-2")}>{work.title}</h3>
        <p className="mt-0.5 text-[14px]">{work.artist}</p>
        <div className="mt-2 flex items-center justify-between gap-x-3 text-[13px]">
          <span className="lg:shrink-0 lg:whitespace-nowrap">{work.size}</span>
          <span className="hidden min-w-0 items-center gap-x-2 overflow-hidden whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 lg:flex">
            View Artwork
            <LineArrow className="w-6" />
          </span>
        </div>
      </button>
    </li>
  );
}

export function ArtworksIndex({
  initialQuery = "",
  initialWork,
}: {
  /** Search to start with, e.g. a medium picked from a link. */
  initialQuery?: string;
  /** A work to open on arrival, by title and artist (see artworkPath). */
  initialWork?: { title: string; artist: string };
}) {
  const [query, setQuery] = useState(initialQuery);
  // The open work, by its place in the current results; null when closed.
  const [open, setOpen] = useState<number | null>(null);
  // The last work opened, kept on screen while the panel slides away.
  const [shown, setShown] = useState<number | null>(null);
  const show = (index: number) => {
    setOpen(index);
    setShown(index);
  };
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
  const shownWork = shown === null ? null : (results[shown] ?? null);
  // Works related to the one shown, from the whole collection (not just the
  // current search), as small pictures under its details.
  const related = useMemo(() => {
    if (!shownWork) return { label: "", works: [] };
    const { label, works } = relatedWorks(
      shownWork,
      WORKS,
      (work) => work.artist,
    );
    return {
      label,
      works: works.map(({ image, title, artist }) => ({
        image,
        title,
        artist,
      })),
    };
  }, [shownWork]);
  // Picking one opens it in the panel; if the search hides it, the search
  // is cleared first so Prev / Next step through a list that holds it.
  const pick = useCallback(
    (image: string) => {
      const inResults = results.findIndex((work) => work.image === image);
      if (inResults >= 0) {
        show(inResults);
        return;
      }
      setQuery("");
      show(WORKS.findIndex((work) => work.image === image));
    },
    [results],
  );

  // Open the work named in the link once, a frame after arrival so the
  // panel slides in rather than appearing already open.
  const arrived = useRef(false);
  useEffect(() => {
    if (arrived.current || !initialWork) return;
    const same = (a: string, b: string) =>
      a.trim().toLowerCase() === b.trim().toLowerCase();
    const index = results.findIndex(
      (work) =>
        same(work.title, initialWork.title) &&
        same(work.artist, initialWork.artist),
    );
    if (index < 0) return;
    // Marked only once it opens: an effect cancelled before then (as React
    // does in development) leaves the next run free to try again.
    const id = requestAnimationFrame(() => {
      arrived.current = true;
      setOpen(index);
      setShown(index);
    });
    return () => cancelAnimationFrame(id);
  }, [initialWork, results]);
  const closePanel = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => {
    if (open === null || open === 0) return;
    setOpen(open - 1);
    setShown(open - 1);
  }, [open]);
  const next = useCallback(() => {
    if (open === null || open >= results.length - 1) return;
    setOpen(open + 1);
    setShown(open + 1);
  }, [open, results.length]);

  return (
    <section
      id="works"
      aria-label="Artworks"
      className={cn("bg-white text-(--k-ink)", SANS)}
    >
      {/* Search, filters and count, between two rules. */}
      <div className={GRID}>
        <div className="col-span-4 flex flex-col gap-y-4 py-3 lg:col-span-12 lg:flex-row lg:items-center lg:gap-x-8">
          <label className="flex h-10 w-full shrink-0 items-center gap-x-3 lg:w-[320px]">
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
                      on ? "bg-(--k-ink) text-white" : "",
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

      {/* The works in justified rows. The trailing ::after soaks up the
          spare width in the last row so it stays at the base height. */}
      {results.length ? (
        <ul className="mt-8 flex flex-wrap items-start gap-x-3 gap-y-8 px-4 [--row-h:120px] after:grow-[999] after:content-[''] lg:mt-10 lg:gap-x-4 lg:gap-y-10 lg:px-5 lg:[--row-h:240px]">
          {results.map((work, index) => (
            <WorkCard
              key={workKey(work)}
              work={work}
              onOpen={() => show(index)}
            />
          ))}
        </ul>
      ) : (
        <div className={cn(GRID, "mt-10")}>
          <p className="col-span-4 text-[17px] lg:col-span-6">
            No works match “{query}”.{" "}
            <button
              type="button"
              onClick={() => setQuery("")}
              className="underline underline-offset-4 hover:opacity-60"
            >
              Show All
            </button>
          </p>
        </div>
      )}

      <ArtworkPanel
        open={open !== null}
        work={shownWork ? { ...shownWork, artist: shownWork.artistData } : null}
        hasPrev={open !== null && open > 0}
        hasNext={open !== null && open < results.length - 1}
        onPrev={prev}
        onNext={next}
        onClose={closePanel}
        related={related}
        onPick={pick}
      />
    </section>
  );
}
