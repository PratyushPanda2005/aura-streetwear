import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTISTS, type Artist } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CONTACT, V6_HOME } from "../data";
import { CARD_TITLE, GRID, SECTION_TITLE } from "../styles";
import { artistPath, artistSlug } from "./paths";
import { PORTRAITS } from "./portraits";

/** The first sentence of a statement, for the page's intro. */
export const firstSentence = (text: string) =>
  text.match(/^.*?[.!?](\s|$)/)?.[0].trim() ?? text;

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
 * The page's buttons: small and outlined, every one the same size, with the
 * label at the left and a mark at the right.
 */
const SMALL_BUTTON =
  "inline-flex h-8 w-[168px] items-center justify-between gap-x-3 border border-(--k-ink)/30 px-3 text-[13px] hover:border-(--k-ink)";

/**
 * The body of an artist's page, after the artist pages on goodman-gallery.com,
 * in EkChitra's own words, works and photographs. It sits inside the shared
 * page frame (banner with the name set over it), then:
 * - a short line from the statement, centred;
 * - the works in a four-column grid, each shown whole on white with its
 *   title, medium and size;
 * - the bio, laid out as Goodman's: a small portrait of the artist at the
 *   left with a caption and a small button to download their CV; from the
 *   halfway line, a small "Artist bio" heading and the bio as paragraphs —
 *   their statement, then what the gallery holds and how it represents them,
 *   drawn from its own data. Everything is on this page, so it doesn't send
 *   visitors elsewhere to read more;
 * - a row of the gallery's other artists;
 * - and, last, the enquiry card: black type centred on brand sky blue.
 * Static.
 */
export function ArtistDetail({ artist }: { artist: Artist }) {
  const portrait = PORTRAITS[artistSlug(artist)] ?? artist.works[0].image;
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
    } shown in full under Artworks above, with ${count === 1 ? "its" : "its own"} title, medium and size.`,
    `${artist.name} ${pair ? "are" : "is"} represented by EkChitra in Hyderabad. Through the gallery's art advisory and bespoke sourcing, their work can be placed in homes, offices and institutions; to see a piece in person or ask what is available, enquire below.`,
  ];
  const enquire = `${CONTACT.href}?text=${encodeURIComponent(
    `Hello EkChitra, I'd like to know more about ${artist.name}'s work.`,
  )}`;

  return (
    <div className={cn("bg-white text-(--k-ink)", SANS)}>
      {/* A short line from the statement, centred. */}
      <section aria-label="Statement" className={cn(GRID, "py-14 lg:py-20")}>
        <p className="col-span-4 text-center text-[20px] leading-[1.35] tracking-[-0.02em] lg:col-span-8 lg:col-start-3 lg:text-[26px]">
          {firstSentence(artist.statement)}
        </p>
      </section>

      {/* Artworks. */}
      <section aria-labelledby="artworks-heading" className="pb-12 lg:pb-16">
        <div className={cn(GRID, "items-end gap-y-3")}>
          <h2
            id="artworks-heading"
            className={cn(SECTION_TITLE, "col-span-4 lg:col-span-6")}
          >
            Artworks
          </h2>
          <div className="col-span-4 flex justify-start lg:col-span-6 lg:justify-end">
            <a
              href={`${V6_HOME}/artworks?medium=${encodeURIComponent(artist.name)}`}
              className={SMALL_BUTTON}
            >
              View in Artworks
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <ul className={cn(GRID, "mt-8 gap-y-10")}>
          {artist.works.map((work) => (
            <li key={work.image} className="col-span-2 lg:col-span-3">
              <div className="relative aspect-square">
                <Image
                  src={work.image}
                  alt={`${work.title} by ${artist.name}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-contain object-bottom"
                />
              </div>
              <p className={cn(CARD_TITLE, "mt-3")}>{work.title}</p>
              <p className="mt-0.5 text-[13px] text-(--k-ink)/65">
                {work.medium} · {work.size}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* The bio: portrait, caption and buttons at the left; the text from the halfway line. */}
      <section
        aria-labelledby="bio-heading"
        className={cn(GRID, "gap-y-10 py-12 lg:py-16")}
      >
        <div className="col-span-4 sm:col-span-2 lg:col-span-3">
          <div className="relative aspect-[4/5] w-[140px] overflow-hidden lg:w-[180px]">
            <Image
              src={portrait}
              alt={`Portrait of ${artist.name}`}
              fill
              sizes="180px"
              className="object-cover"
            />
          </div>
          <p className="mt-2 text-[13px]">Represented by EkChitra, Hyderabad</p>
          {/* The CV downloads from the artist's page on ekchitra.com; swap in
              a direct link to the PDF once the gallery shares it. */}
          <a
            href={artist.href}
            target="_blank"
            rel="noreferrer"
            className={cn(SMALL_BUTTON, "mt-5 justify-center")}
          >
            Download CV
          </a>
        </div>
        <div className="col-span-4 lg:col-span-5 lg:col-start-7">
          <h2 id="bio-heading" className="text-[15px] font-medium">
            Artist bio
          </h2>
          <div className="mt-3 max-w-[560px] space-y-4 text-[14px] leading-[1.55]">
            {paragraphs.map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </div>
      </section>

      {/* The gallery's other artists. */}
      <nav
        aria-label="Other artists"
        className={cn(GRID, "gap-y-4 py-10 lg:py-12")}
      >
        <p
          className={cn(
            CAPS,
            "col-span-4 text-[11px] text-(--k-ink)/65 lg:col-span-3",
          )}
        >
          Other artists
        </p>
        <ul className="col-span-4 flex flex-wrap gap-x-2 gap-y-2 text-[17px] leading-[1.4] lg:col-span-9 lg:text-[19px]">
          {ARTISTS.filter((item) => item.id !== artist.id).map(
            (item, index, list) => (
              <li key={item.id}>
                <a
                  href={artistPath(item)}
                  className="hover:underline hover:underline-offset-4"
                >
                  {item.name}
                </a>
                {index < list.length - 1 && (
                  <span className="text-(--k-ink)/35"> /</span>
                )}
              </li>
            ),
          )}
        </ul>
      </nav>

      {/* Last: the enquiry card, black type on brand sky blue. */}
      <section
        id="enquire"
        aria-labelledby="enquire-heading"
        className="scroll-mt-11 px-4 pb-6 lg:px-5 lg:pb-8"
      >
        <div className="flex min-h-[280px] flex-col items-center justify-center bg-(--k-sky) px-6 py-10 text-center text-(--k-ink) lg:min-h-[360px]">
          <h2
            id="enquire-heading"
            className="text-[30px] leading-[1.1] tracking-[-0.03em] lg:text-[40px]"
          >
            Available artworks
          </h2>
          <p className="mt-2 text-[14px] text-(--k-ink)/80">
            Ask us about other works by {artist.name}.
          </p>
          <a
            href={enquire}
            target="_blank"
            rel="noreferrer"
            className={cn(
              SMALL_BUTTON,
              "mt-6 justify-center border-(--k-ink) bg-(--k-ink) text-white hover:bg-(--k-ink)/85",
            )}
          >
            Enquire
          </a>
        </div>
      </section>
    </div>
  );
}
