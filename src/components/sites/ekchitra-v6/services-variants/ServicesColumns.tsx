import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { ArrowLink, Covers, pad, SERVICES } from "./shared";

/**
 * Variation 01 — Columns. The three services side by side, four columns
 * each: the number, the name, a greyscale picture, the line it is for, a
 * few words, what it covers and a link. Read across like a menu.
 */
export function ServicesColumns() {
  return (
    <div className={cn(GRID, "gap-y-14")}>
      {SERVICES.map((service, index) => (
        <article key={service.title} className="col-span-4 flex flex-col">
          <p className="text-[13px] tabular-nums text-(--k-ink)/50">
            {pad(index + 1)}
          </p>
          <h3 className="mt-2 text-[32px] leading-none tracking-[-0.035em] lg:text-[40px]">
            {service.title}
          </h3>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover grayscale"
            />
          </div>
          <p className={cn(CAPS, "mt-6 text-[10px] text-(--k-ink)/60")}>
            {service.headline}
          </p>
          <p className="mt-3 text-[15px] leading-[1.5] text-(--k-ink)/75">
            {service.body}
          </p>
          <Covers items={service.covers} className="mt-6 mb-8" />
          <ArrowLink href={service.cta.href} className="mt-auto self-start">
            {service.cta.label}
          </ArrowLink>
        </article>
      ))}
    </div>
  );
}
