import Image from "next/image";

import { cn } from "@/lib/utils";

import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { SANS } from "../../ekchitra-v5/shared";
import { LineArrow, pad } from "../cta-variants/shared";
import { EXHIBITIONS } from "../data";
import { GRID } from "../styles";
import { CurrentPair } from "./CurrentShows";

type Show = (typeof EXHIBITIONS)[number];

const PAST = EXHIBITIONS.filter((show) => show.status === "Past");

/** The year a show ran, from its published dates; null when none is given. */
const yearOf = (show: Show) =>
  show.dates.match(/\b(19|20)\d{2}\b/)?.[0] ?? null;

/** Past shows grouped by year, newest first, with undated shows last. */
const YEARS = (() => {
  const groups = new Map<string, Show[]>();
  for (const show of PAST) {
    const key = yearOf(show) ?? "Undated";
    groups.set(key, [...(groups.get(key) ?? []), show]);
  }
  return [...groups.entries()]
    .sort(([a], [b]) =>
      a === "Undated" ? 1 : b === "Undated" ? -1 : Number(b) - Number(a),
    )
    .map(([year, shows]) => ({
      year,
      id: `year-${year.toLowerCase()}`,
      shows,
    }));
})();

/**
 * The exhibitions as a record, on the v6 grid. First, "Now and upcoming":
 * the current shows side by side, six columns each — the poster at its own
 * 16:9, then its status, the title set large, the curator and dates, and a
 * black button — the two cards one height. Then the archive: a ruled index
 * of years that jumps to each, and one block per year with the year held at
 * the left (columns 1–3, pinned under the top bar while its shows pass) and
 * its shows as ruled rows in 4–12: a small poster, the title, the dates and
 * an arrow. Every row is a link to the show on ekchitra.com. The brand
 * blues are used sparingly: a pale
 * sky wash on a hovered row, with the arrow and buttons turning navy. One
 * faint run of the diamond motif, in one grey tone, sits fixed behind the
 * archive bar (desktop only, where the right end of the bar is empty); a
 * second, in grey and maroon, rests on the footer at the foot of the section.
 */
export function ExhibitionsRecord() {
  return (
    <section
      aria-label="Exhibitions"
      className={cn(
        "relative isolate bg-white pb-16 text-(--k-ink) lg:pb-24",
        SANS,
      )}
    >
      {/* Now and upcoming. */}
      <CurrentPair />

      {/* The archive. */}
      <div className={cn(GRID, "mt-16 lg:mt-24")}>
        <div className="relative isolate col-span-4 flex flex-col gap-y-3 overflow-hidden py-3 lg:col-span-12 lg:flex-row lg:items-baseline lg:gap-x-8">
          {/* The diamond motif, fixed in place behind the bar's contents. */}
          <Diamonds
            rows={36}
            shape="steps"
            horizontal
            side="right"
            className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-full text-(--k-ink)/[0.08] lg:block"
          />
          <h2 className="shrink-0 text-[15px]">
            Archive
            <span className="ml-3 text-[13px] tabular-nums">
              {pad(PAST.length)}
            </span>
          </h2>
          <nav aria-label="Archive by year">
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[15px]">
              {YEARS.map(({ year, id }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="underline-offset-4 hover:underline focus-visible:underline"
                  >
                    {year}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {YEARS.map(({ year, id, shows }) => (
        <div
          key={id}
          id={id}
          className={cn(
            GRID,
            "scroll-mt-[calc(44px+1rem)] items-start pt-6 pb-2 lg:pt-8",
          )}
        >
          <div className="col-span-4 mb-2 lg:sticky lg:top-[calc(44px+1.5rem)] lg:col-span-3 lg:mb-0">
            <h3 className="text-[40px] leading-[0.9] tracking-[-0.05em] tabular-nums lg:text-[4.4vw]">
              {year}
            </h3>
          </div>

          <ol className="col-span-4 lg:col-span-9">
            {shows.map((show) => (
              <li key={show.title} className="">
                <a
                  href={show.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group -mx-2 grid grid-cols-[96px_1fr] items-center gap-x-4 px-2 py-3 transition-colors duration-300 hover:bg-(--k-sky)/25 lg:-mx-3 lg:px-3 lg:grid-cols-[160px_1fr_14rem_2.5rem] lg:gap-x-5"
                >
                  <span className="relative block aspect-video overflow-hidden bg-(--k-ink)/5">
                    <Image
                      src={show.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 160px, 96px"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </span>
                  <span className="text-[19px] leading-[1.15] tracking-[-0.02em] lg:text-[24px]">
                    {show.title}
                    <span className="mt-1 block text-[14px] tracking-normal lg:hidden">
                      {show.dates || "Date not listed"}
                    </span>
                  </span>
                  <span className="hidden text-[15px] lg:block">
                    {show.dates || "Date not listed"}
                  </span>
                  <span className="hidden justify-self-end lg:block">
                    <LineArrow className="transition-[translate,color] duration-300 group-hover:translate-x-1 group-hover:text-(--k-navy)" />
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ))}

      {/* A run of the diamond motif resting on the footer, fixed in the
          empty space under the archive and behind everything. */}
      <Diamonds
        rows={40}
        shape="zigzag"
        horizontal
        side="left"
        tint="maroon"
        tintEvery={6}
        tintOpacity={0.45}
        className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[40px] -scale-y-100 text-(--k-ink)/[0.08] lg:h-[56px]"
      />
    </section>
  );
}
