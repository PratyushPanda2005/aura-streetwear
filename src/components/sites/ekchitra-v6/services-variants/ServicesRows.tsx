import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { ArrowLink, Covers, pad, SERVICES } from "./shared";

/**
 * Variation 04 — Rows. One service to a row, the picture in full colour and
 * the words swapping sides from row to row: the picture across six columns,
 * the number and name over the line it is for, a few words, what it covers
 * and a link across five more, with a column of air between. Rows sit close
 * and top-aligned on the grid.
 */
export function ServicesRows() {
  return (
    <div className="flex flex-col gap-y-8 lg:gap-y-5">
      {SERVICES.map((service, index) => {
        const flip = index % 2 === 1;
        return (
          <article
            key={service.title}
            className={cn(GRID, "items-start gap-y-5")}
          >
            <div
              className={cn(
                "relative col-span-4 aspect-[3/2] overflow-hidden lg:col-span-6 lg:row-start-1",
                flip ? "lg:col-start-7" : "lg:col-start-1",
              )}
            >
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div
              className={cn(
                "col-span-4 lg:col-span-5 lg:row-start-1",
                flip
                  ? "lg:col-start-2 lg:flex lg:flex-col lg:items-end lg:text-right"
                  : "lg:col-start-7",
              )}
            >
              <p className="text-[13px] tabular-nums text-(--k-ink)/50">
                {pad(index + 1)}
              </p>
              <h3 className="mt-1 text-[32px] leading-none tracking-[-0.035em] lg:text-[44px]">
                {service.title}
              </h3>
              <p className={cn(CAPS, "mt-3 text-[10px] text-(--k-ink)/60")}>
                {service.headline}
              </p>
              <p className="mt-2 max-w-[460px] text-[15px] leading-[1.5] text-(--k-ink)/75">
                {service.body}
              </p>
              <Covers
                items={service.covers}
                className="mt-4 mb-5 w-full max-w-[460px]"
              />
              <ArrowLink href={service.cta.href}>{service.cta.label}</ArrowLink>
            </div>
          </article>
        );
      })}
    </div>
  );
}
