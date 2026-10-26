import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { GRID, HEAD } from "../styles";
import { ALL_EXHIBITIONS, LineArrow, SHOWS, pad } from "./shared";

/**
 * Variation 03 — featured and table. The current show first: its poster in
 * columns 1–8 and, in 9–12, its status, the title set large, who curated it,
 * the dates and a black button, the two columns sharing the poster's height.
 * Below, the next five as a ruled table — number, title, dates, status and
 * an arrow — closed by a link to every exhibition.
 */
export function ExFeature() {
  const [lead, ...rest] = SHOWS;

  return (
    <section
      aria-label="Exhibitions"
      className={cn("bg-white pb-12 text-(--k-ink) lg:pb-16", SANS)}
    >
      <div className={cn(GRID, HEAD, "gap-y-6 pb-0 lg:pb-0")}>
        <a
          href={lead.href}
          target="_blank"
          rel="noreferrer"
          className="group relative col-span-4 aspect-video overflow-hidden bg-(--k-ink)/5 lg:col-span-8"
        >
          <Image
            src={lead.image}
            alt={lead.title}
            fill
            sizes="(min-width: 1024px) 66vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        </a>

        <div className="col-span-4 flex flex-col">
          <p className={cn(CAPS, "text-[10px]")}>{lead.status} exhibition</p>
          <h3 className="mt-3 text-[40px] leading-[0.98] tracking-[-0.045em] lg:text-[3.6vw]">
            {lead.title}
          </h3>
          <div className="mt-6 pt-3 text-[15px] leading-[1.45]">
            <p>{lead.subtitle}</p>
            <p>{lead.dates}</p>
          </div>
          <a
            href={lead.href}
            target="_blank"
            rel="noreferrer"
            className="mt-6 flex h-12 w-full shrink-0 items-center justify-between bg-(--k-ink) px-5 text-[14px] text-white transition-colors duration-300 hover:bg-(--k-maroon) lg:mt-auto"
          >
            View Exhibition
            <LineArrow />
          </a>
        </div>
      </div>

      <div className="mt-10 lg:mt-12">
        <ol className={cn(GRID, "grid-cols-4")}>
          {rest.map((show, index) => (
            <li key={show.title} className="col-span-4 lg:col-span-12">
              <a
                href={show.href}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-4 items-baseline gap-x-4 py-3.5 transition-opacity hover:opacity-60 lg:grid-cols-12 lg:gap-x-5"
              >
                <span className="text-[12px] tabular-nums lg:col-span-1">
                  {pad(index + 2)}
                </span>
                <span className="col-span-3 text-[18px] leading-tight tracking-[-0.01em] lg:col-span-6 lg:text-[20px]">
                  {show.title}
                </span>
                <span className="col-span-3 col-start-2 text-[14px] lg:col-span-3 lg:col-start-auto">
                  {show.dates || "—"}
                </span>
                <span
                  className={cn(
                    CAPS,
                    "hidden text-[10px] lg:col-span-1 lg:block",
                  )}
                >
                  {show.status}
                </span>
                <span className="hidden justify-self-end lg:col-span-1 lg:block">
                  <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </a>
            </li>
          ))}
        </ol>
        <div className={cn(GRID, "mt-6")}>
          <a
            href={ALL_EXHIBITIONS.href}
            className="col-span-4 flex items-center justify-between text-[15px] transition-opacity hover:opacity-60 lg:col-span-4 lg:col-start-9"
          >
            {ALL_EXHIBITIONS.label}
            <LineArrow />
          </a>
        </div>
      </div>
    </section>
  );
}
