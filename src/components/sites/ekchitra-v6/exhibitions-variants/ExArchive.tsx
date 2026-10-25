import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { ALL_SHOWS, LineArrow, pad } from "./shared";

/** The table's columns on the 12-column grid. */
const COLS = {
  thumb: "col-span-1",
  n: "hidden lg:col-span-1 lg:block",
  title: "col-span-3 lg:col-span-6",
  dates: "hidden lg:col-span-2 lg:block",
  status: "hidden lg:col-span-1 lg:block",
  arrow: "hidden justify-self-end lg:col-span-1 lg:block",
};

/**
 * Variation 04 — Swiss archive table. Every exhibition as a row of one
 * table under a row of small-capital column heads: a small poster, the
 * number, the title, the dates, the status and an arrow, each in its own
 * columns of the 12-column grid, between fine rules. Current shows sit at
 * the top; a row's poster brightens and its arrow moves on hover.
 */
export function ExArchive() {
  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-white pb-12 text-(--k-ink) lg:pb-16", SANS)}
    >
      <div
        aria-hidden="true"
        className={cn(GRID, HEAD, CAPS, "grid-cols-4 pb-3 text-[10px] lg:pb-3")}
      >
        <span className={COLS.thumb} />
        <span className={COLS.n}>No.</span>
        <span className={COLS.title}>Exhibition</span>
        <span className={COLS.dates}>Dates</span>
        <span className={COLS.status}>Status</span>
        <span className={COLS.arrow} />
      </div>

      <ol>
        {ALL_SHOWS.map((show, index) => (
          <li key={show.title} className="">
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              className={cn(GRID, "group items-center py-2.5")}
            >
              <span
                className={cn(
                  COLS.thumb,
                  "relative block aspect-video overflow-hidden bg-(--k-ink)/5",
                )}
              >
                <Image
                  src={show.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 8vw, 25vw"
                  className="object-cover opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                />
              </span>
              <span className={cn(COLS.n, "text-[12px] tabular-nums")}>
                {pad(index + 1)}
              </span>
              <span
                className={cn(
                  COLS.title,
                  "text-[17px] leading-tight tracking-[-0.01em] lg:text-[20px]",
                )}
              >
                {show.title}
                <span className="mt-0.5 block text-[13px] lg:hidden">
                  {show.dates || "—"}
                </span>
              </span>
              <span className={cn(COLS.dates, "text-[14px]")}>
                {show.dates || "—"}
              </span>
              <span className={cn(COLS.status, CAPS, "text-[10px]")}>
                {show.status}
              </span>
              <span className={COLS.arrow}>
                <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}
