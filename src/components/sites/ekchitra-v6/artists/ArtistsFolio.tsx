import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTISTS_PAGE } from "../../ekchitra-redesign/data";
import { ARTISTS } from "../../ekchitra-v5/artists-data";
import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";
import { GRID } from "../styles";

/** An artist's mediums, short and without repeats: "Acrylic", "Mixed Media". */
const mediums = (artist: (typeof ARTISTS)[number]) =>
  Array.from(
    new Set(
      artist.works.map((work) => work.medium.replace(/\s+on\s+.*/i, "").trim()),
    ),
  ).slice(0, 3);

/**
 * The artists as a folio, on the v6 grid. A ruled index of every name runs
 * across the top, each a jump to its row. Then one full-width row per
 * artist between fine rules: on the left (columns 1–4) the number, the name
 * set large, their mediums in small capitals, a short statement and a link
 * to their page; on the right (5–12) a strip of every work they show here,
 * each at its own proportions on a common height, scrolling sideways and
 * snapping to a work, with the work's title and size beneath it.
 */
export function ArtistsFolio() {
  return (
    <section
      aria-label="Artists"
      className={cn("bg-white pb-16 text-(--k-ink) lg:pb-24", SANS)}
    >
      {/* The index: every name, a jump to its row. */}
      <nav aria-label="Artists index" className={GRID}>
        <div className="col-span-4 flex flex-col gap-y-3 py-3 lg:col-span-12 lg:flex-row lg:items-baseline lg:gap-x-8">
          <p className="shrink-0 text-[13px] tabular-nums">
            {pad(ARTISTS.length)} artists
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-[14px] lg:text-[15px]">
            {ARTISTS.map((artist) => (
              <li key={artist.id}>
                <a
                  href={`#${artist.id}`}
                  className="transition-opacity hover:opacity-50"
                >
                  {artist.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <ol className="mt-8 lg:mt-10">
        {ARTISTS.map((artist, index) => (
          <li
            key={artist.id}
            id={artist.id}
            className="scroll-mt-[calc(44px+1.5rem)]"
          >
            <div className={cn(GRID, "gap-y-6 py-6 lg:py-8")}>
              {/* Who they are. */}
              <div className="col-span-4 flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="text-[13px] tabular-nums">
                    {pad(index + 1)}
                  </span>
                  <span className="text-[13px] tabular-nums">
                    {pad(artist.works.length)}{" "}
                    {artist.works.length === 1 ? "work" : "works"}
                  </span>
                </div>
                <h2 className="mt-3 text-[36px] leading-[0.98] tracking-[-0.045em] lg:text-[3vw]">
                  {artist.name}
                </h2>
                <p className={cn(CAPS, "mt-3 text-[10px]")}>
                  {mediums(artist).join(" · ")}
                </p>
                <p className="mt-4 line-clamp-4 text-[15px] leading-[1.45] lg:max-w-[360px]">
                  {artist.statement}
                </p>
                <a
                  href={artist.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-6 flex items-center justify-between pt-3 text-[15px] transition-opacity hover:opacity-60 lg:mt-auto lg:max-w-[360px]"
                >
                  {ARTISTS_PAGE.cardCta}
                  <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>

              {/* Their works, each at its own proportions. */}
              <ul className="col-span-4 -mr-4 flex snap-x snap-mandatory gap-x-4 overflow-x-auto pr-4 [scrollbar-width:none] lg:col-span-8 lg:-mr-5 lg:gap-x-5 lg:pr-5 [&::-webkit-scrollbar]:hidden">
                {artist.works.map((work) => (
                  <li key={work.image} className="shrink-0 snap-start">
                    <Image
                      src={work.image}
                      alt={`${work.title} by ${artist.name}`}
                      width={0}
                      height={0}
                      sizes="(min-width: 1024px) 24vw, 60vw"
                      className="h-[240px] w-auto max-w-none lg:h-[22vw] lg:max-h-[340px]"
                    />
                    <p className="mt-2 max-w-[24ch] text-[14px] leading-tight">
                      {work.title}
                    </p>
                    <p className="mt-0.5 text-[12px]">{work.size}</p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
