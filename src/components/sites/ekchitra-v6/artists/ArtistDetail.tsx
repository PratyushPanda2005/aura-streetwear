import Image from "next/image";

import { cn } from "@/lib/utils";

import type { Artist } from "../../ekchitra-v5/artists-data";
import { SANS } from "../../ekchitra-v5/shared";
import { ARTWORK_SIZES } from "../artworks/sizes";
import { FOOTER_GAP, GRID, ITEM_TITLE, SECTION_TITLE } from "../styles";
import { ArtistWorks } from "./ArtistWorks";
import { artistSlug } from "./paths";
import { PORTRAITS } from "./portraits";

const WORDS = [
  "no",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
];

/** Small counts in words, as running text reads; larger ones as figures. */
const inWords = (n: number) => WORDS[n] ?? String(n);

/** "a", "a and b", "a, b and c". */
const listOf = (items: string[]) =>
  items.length < 2
    ? (items[0] ?? "")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/**
 * An artist's page, after the artist pages on operagallery.com, in
 * EkChitra's own words, works and photographs. No banner — under the top bar:
 * - a small portrait of the artist over their name and bio at the left, and
 *   their first work at the right, shown whole;
 *   the bio is their statement, then what the gallery holds and how it
 *   represents them, drawn from its own data;
 * - "Selected works": the artist's works as the Artworks page shows them —
 *   justified rows of the same cards, each opening the same panel
 *   (ArtistWorks).
 */
export function ArtistDetail({ artist }: { artist: Artist }) {
  const portrait = PORTRAITS[artistSlug(artist)];
  // The work at the right: their first, shown whole.
  const feature = artist.works[0];
  const [featureWidth, featureHeight] = ARTWORK_SIZES[feature.image] ?? [1, 1];
  const mediums = [...new Set(artist.works.map((work) => work.medium))];
  const sizes = [...new Set(artist.works.map((work) => work.size))];
  const count = artist.works.length;
  // The statement, then two paragraphs drawn only from the gallery's own
  // data — what it holds and how it represents the artist — so nothing about
  // the artist is invented.
  // A pair ("Rahul & Gunjan") reads as plural.
  const pair = /&| and /.test(artist.name);
  const sizesText = (
    sizes.length > 1
      ? `in ${inWords(sizes.length)} sizes, ${listOf(sizes)}`
      : `at ${sizes[0]}`
  ).replace(/Inches/g, "inches");
  const paragraphs = [
    artist.statement,
    `EkChitra holds ${inWords(count)} ${count === 1 ? "work" : "works"} by ${artist.name}, in ${listOf(mediums.map((medium) => medium.toLowerCase()))}, ${sizesText}. ${
      count === 1 ? "It is" : "Each is"
    } shown in full under Selected works below, with ${count === 1 ? "its" : "its own"} title, medium and size.`,
    `${artist.name} ${pair ? "are" : "is"} represented by EkChitra in Hyderabad. Through the gallery's art advisory and bespoke sourcing, their work can be placed in homes, offices and institutions; to see a piece in person or ask what is available, enquire about any work below.`,
  ];

  return (
    <div className={cn("bg-white text-(--k-ink)", SANS)}>
      {/* A small portrait over the name and bio at the left; one of their
          works at the right. */}
      <section
        aria-labelledby="artist-heading"
        className={cn(GRID, "gap-y-8 pt-8 pb-14 lg:pt-12 lg:pb-20")}
      >
        <div className="col-span-4 lg:col-span-6">
          {portrait && (
            <div className="relative mb-5 aspect-[4/5] w-[72px] overflow-hidden bg-(--k-ink)/5 lg:mb-6 lg:w-[88px]">
              <Image
                src={portrait}
                alt={`Portrait of ${artist.name}`}
                fill
                sizes="88px"
                className="object-cover"
              />
            </div>
          )}
          <h1 id="artist-heading" className={SECTION_TITLE}>
            {artist.name}
          </h1>
          <div className="mt-5 max-w-[640px] space-y-4 text-[15px] leading-[1.55] lg:mt-6">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
        <div className="col-span-4 flex lg:col-span-5 lg:col-start-8 lg:justify-end">
          <Image
            src={feature.image}
            alt={`${feature.title} by ${artist.name}`}
            width={featureWidth}
            height={featureHeight}
            priority
            sizes="(min-width: 1024px) 460px, 100vw"
            className="h-auto max-h-[560px] w-auto max-w-full"
          />
        </div>
      </section>

      {/* Selected works, laid out as the Artworks page. */}
      <section aria-labelledby="works-heading" className={FOOTER_GAP}>
        <h2 id="works-heading" className={cn(ITEM_TITLE, "px-4 lg:px-5")}>
          Selected works
        </h2>
        <ArtistWorks artist={artist} />
      </section>
    </div>
  );
}
