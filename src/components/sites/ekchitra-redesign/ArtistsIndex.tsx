"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTISTS_PAGE, ARTIST_BIOS, ARTWORKS, type Artwork } from "./data";
import {
  Button,
  FONT,
  Heading,
  PageBanner,
  SearchField,
  Text,
} from "./design-system";

/** Anchor id for an artist's card, e.g. "Rahul & Gunjan" → "artist-rahul-gunjan". */
function artistId(name: string) {
  return `artist-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
}

/** Every word of the query must appear in the artist's name, work, medium or statement. */
function matches(item: Artwork, query: string) {
  const text =
    `${item.artist} ${item.title} ${item.medium} ${ARTIST_BIOS[item.artist] ?? ""}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

/**
 * Artists index: a banner, a search field, a row of name links that jump to each
 * card, then a four-column grid. Every card shows one of the artist's works at
 * its own proportions, so the rows have deliberately uneven bottoms.
 */
export function ArtistsIndex() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();
  const results = useMemo(
    () =>
      trimmed ? ARTWORKS.filter((item) => matches(item, trimmed)) : ARTWORKS,
    [trimmed],
  );

  return (
    <section
      className={cn(
        "bg-(--ek-paper) pt-[112px] text-(--ek-ink) min-[600px]:pt-[128px] min-[1200px]:pt-[140px]",
        FONT.sans,
      )}
    >
      <PageBanner
        label={ARTISTS_PAGE.label}
        heading={ARTISTS_PAGE.intro}
        meta={`${ARTWORKS.length} artists`}
        image={ARTISTS_PAGE.banner}
      />

      <div className="px-[17px] pt-10 lg:px-[69px]">
        <SearchField
          id="artist-search"
          value={query}
          onChange={setQuery}
          placeholder={ARTISTS_PAGE.searchPlaceholder}
          submitLabel="Search artists"
        />
        <div className="mt-6 flex min-h-7 items-center justify-between gap-x-6 text-[#767676]">
          <Text aria-live="polite">
            {trimmed
              ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${trimmed}”`
              : `${ARTWORKS.length} artists`}
          </Text>
          {trimmed ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[17px] leading-7 tracking-[0.17px] underline-offset-4 transition-colors duration-150 ease-in-out hover:text-(--ek-ink) hover:underline"
            >
              Clear search
            </button>
          ) : null}
        </div>
      </div>

      {results.length > 0 ? (
        <>
          <nav
            aria-label="Artists"
            className="mt-6 border-y border-[#e1e1e1] px-[17px] py-5 lg:px-[69px]"
          >
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {results.map((item) => (
                <li key={item.artist}>
                  <Text
                    as="a"
                    size="sm"
                    href={`#${artistId(item.artist)}`}
                    className="uppercase transition-colors duration-150 ease-in-out hover:text-(--ek-maroon)"
                  >
                    {item.artist}
                  </Text>
                </li>
              ))}
            </ul>
          </nav>

          <ul className="grid grid-cols-1 items-start gap-x-5 gap-y-14 px-[17px] py-10 min-[600px]:grid-cols-2 lg:grid-cols-4 lg:gap-y-20 lg:px-[69px] lg:py-14">
            {results.map((item) => (
              <li
                key={item.artist}
                id={artistId(item.artist)}
                className="scroll-mt-6"
              >
                <article>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group block"
                  >
                    <div className="overflow-hidden bg-[#f2f2f2]">
                      <Image
                        src={item.image}
                        alt={`${item.title} by ${item.artist}`}
                        width={item.width}
                        height={item.height}
                        sizes="(max-width: 599px) 100vw, (max-width: 1023px) 50vw, 25vw"
                        className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      />
                    </div>
                    <Heading
                      as="h2"
                      size="sm"
                      className="mt-4 text-[19px] leading-6 transition-colors duration-150 ease-in-out group-hover:text-(--ek-maroon)"
                    >
                      {item.artist}
                    </Heading>
                  </a>
                  <Text size="sm" className="mt-1 text-[#767676]">
                    {item.title} · {item.medium}
                  </Text>
                  {ARTIST_BIOS[item.artist] ? (
                    <Text size="sm" className="mt-3">
                      {ARTIST_BIOS[item.artist]}
                    </Text>
                  ) : null}
                  <Button
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5"
                  >
                    {ARTISTS_PAGE.cardCta}
                  </Button>
                </article>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <div className="mt-6 border-t border-[#e1e1e1] px-[17px] py-20 text-center">
          <Heading as="p">No artists found</Heading>
          <Text className="mx-auto mt-3 max-w-[460px] text-[#767676]">
            Nothing matches “{trimmed}”. Try an artist’s name, a medium or an
            artwork title.
          </Text>
          <Button className="mt-8" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </section>
  );
}
