"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { ARTWORKS, ARTWORKS_PAGE, type Artwork } from "./data";
import {
  Button,
  FONT,
  Heading,
  PageBanner,
  SearchField,
  Text,
} from "./design-system";

/** Every word of the query must appear in the artwork's title, artist or medium. */
function matches(item: Artwork, query: string) {
  const text = `${item.title} ${item.artist} ${item.medium}`.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => text.includes(word));
}

/**
 * Artworks index: a banner, a search field with one-tap searches, a result
 * count, then a staggered multi-column grid with hairlines between cards and
 * columns. Search filters the grid as you type.
 */
export function ArtworksIndex() {
  const [query, setQuery] = useState("");
  const trimmed = query.trim();

  const results = useMemo(
    () =>
      trimmed ? ARTWORKS.filter((item) => matches(item, trimmed)) : ARTWORKS,
    [trimmed],
  );

  const quickSearches = useMemo(
    () =>
      ARTWORKS_PAGE.quickSearches
        .map((term) => ({
          term,
          sample: ARTWORKS.find((item) => matches(item, term)),
        }))
        .filter((entry): entry is { term: string; sample: Artwork } =>
          Boolean(entry.sample),
        ),
    [],
  );

  return (
    <section
      className={cn(
        "bg-(--ek-paper) pt-[112px] text-(--ek-ink) min-[600px]:pt-[128px] min-[1200px]:pt-[140px]",
        FONT.sans,
      )}
    >
      <PageBanner
        label={ARTWORKS_PAGE.label}
        heading={ARTWORKS_PAGE.intro}
        meta={`${ARTWORKS.length} artworks`}
        image={ARTWORKS_PAGE.banner}
      />

      <div className="px-[17px] pt-10 lg:px-[69px]">
        <SearchField
          id="artwork-search"
          value={query}
          onChange={setQuery}
          placeholder={ARTWORKS_PAGE.searchPlaceholder}
          submitLabel="Search artworks"
        />

        {/* One-tap searches */}
        <ul className="mt-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {quickSearches.map(({ term, sample }) => {
            const active = trimmed.toLowerCase() === term.toLowerCase();
            return (
              <li key={term} className="shrink-0">
                <button
                  type="button"
                  aria-pressed={active}
                  onClick={() => setQuery(active ? "" : term)}
                  className={cn(
                    "flex h-10 items-center overflow-hidden rounded-[2px] border pr-4 text-[12px] tracking-[1.68px] uppercase transition-colors duration-150 ease-in-out",
                    active
                      ? "border-(--ek-ink) text-(--ek-ink)"
                      : "border-[#e1e1e1] text-[#767676] hover:border-[#767676] hover:text-(--ek-ink)",
                  )}
                >
                  <Image
                    src={sample.image}
                    alt=""
                    width={40}
                    height={40}
                    className="mr-4 size-10 object-cover"
                  />
                  {term}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex min-h-7 items-center justify-between gap-x-6 text-[#767676]">
          <Text aria-live="polite">
            {trimmed
              ? `${results.length} ${results.length === 1 ? "result" : "results"} for “${trimmed}”`
              : `${ARTWORKS.length} artworks`}
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

      <div className="mt-6 border-t border-[#e1e1e1] px-[17px] pb-14 lg:px-[69px] lg:pb-[69px]">
        {results.length > 0 ? (
          <ul className="columns-1 gap-x-[45px] [column-rule:1px_solid_#e1e1e1] min-[600px]:columns-2 lg:columns-4">
            {results.map((item) => (
              <li
                key={item.image}
                className="break-inside-avoid border-b border-[#e1e1e1] pt-[31px] pb-8"
              >
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
                    className="mt-[14px] text-[18px] leading-6 transition-colors duration-150 ease-in-out group-hover:text-(--ek-maroon)"
                  >
                    {item.title}
                  </Heading>
                  <Text className="mt-1 text-[#767676]">{item.artist}</Text>
                  <Text size="sm" className="mt-1 text-[#767676]">
                    {item.medium} · {item.size}
                  </Text>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-20 text-center">
            <Heading as="p">No artworks found</Heading>
            <Text className="mx-auto mt-3 max-w-[460px] text-[#767676]">
              Nothing matches “{trimmed}”. Try an artist’s name, a title or a
              medium.
            </Text>
            <Button className="mt-8" onClick={() => setQuery("")}>
              Clear search
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
