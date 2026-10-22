import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { ALL_EXHIBITIONS, LineArrow, SHOWS, pad } from "./shared";

/**
 * Variation 02 — poster grid. Six shows in three columns of four on the
 * 12-column grid, each a poster at its own 16:9, then under a fine rule its
 * number and status, the title, and the dates. A ruled link to every
 * exhibition closes the grid on the right.
 */
export function ExGrid() {
  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-white pb-12 text-(--k-ink) lg:pb-16", SANS)}
    >
      <ul className={cn(GRID, HEAD, "gap-y-10 pb-0 lg:gap-y-12 lg:pb-0")}>
        {SHOWS.map((show, index) => (
          <li key={show.title} className="col-span-4">
            <a
              href={show.href}
              target="_blank"
              rel="noreferrer"
              className="group block"
            >
              <div className="relative aspect-video overflow-hidden bg-(--k-ink)/5">
                <Image
                  src={show.image}
                  alt={show.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>
              <div className="mt-3 flex items-baseline justify-between border-t border-(--k-ink)/15 pt-3">
                <span className="text-[12px] tabular-nums">
                  {pad(index + 1)}
                </span>
                <span className={cn(CAPS, "text-[10px]")}>{show.status}</span>
              </div>
              <h3 className="mt-2 text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[24px]">
                {show.title}
              </h3>
              <p className="mt-1 text-[14px]">{show.dates || "—"}</p>
            </a>
          </li>
        ))}
      </ul>

      <div className={cn(GRID, "mt-10 lg:mt-12")}>
        <a
          href={ALL_EXHIBITIONS.href}
          className="col-span-4 flex items-center justify-between border-y border-(--k-ink) py-3 text-[15px] transition-opacity hover:opacity-60 lg:col-span-4 lg:col-start-9"
        >
          {ALL_EXHIBITIONS.label}
          <LineArrow />
        </a>
      </div>
    </section>
  );
}
