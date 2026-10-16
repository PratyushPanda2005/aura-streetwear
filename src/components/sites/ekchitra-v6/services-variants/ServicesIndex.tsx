"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { GRID } from "../styles";
import { ArrowLink, Covers, pad, SERVICES } from "./shared";

/**
 * Variation 02 — Index. Each service is a row on the grid: its number, its
 * name set large and the line it is for. Clicking a row opens it to show a
 * greyscale picture, a few words, what it covers and a link; one row is
 * open at a time, the first to begin with.
 */
export function ServicesIndex() {
  const [open, setOpen] = useState(0);

  return (
    <div className="px-4 lg:px-5">
      {SERVICES.map((service, index) => {
        const isOpen = open === index;
        return (
          <article
            key={service.title}
            className="border-t border-(--k-ink)/15 last:border-b"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="grid w-full grid-cols-4 items-baseline gap-x-4 py-6 text-left lg:grid-cols-12 lg:gap-x-5 lg:py-8"
            >
              <span className="text-[13px] tabular-nums text-(--k-ink)/50">
                {pad(index + 1)}
              </span>
              <span className="col-span-3 text-[34px] leading-none tracking-[-0.035em] lg:col-span-6 lg:text-[64px]">
                {service.title}
              </span>
              <span className="col-span-3 col-start-2 mt-2 text-[14px] text-(--k-ink)/60 lg:col-span-4 lg:col-start-8 lg:mt-0">
                {service.headline}
              </span>
              <span
                aria-hidden="true"
                className="hidden text-right text-[24px] leading-none lg:col-span-1 lg:block"
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-500",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
              )}
            >
              <div className="overflow-hidden">
                <div
                  className={cn(GRID, "gap-y-6 px-0 pb-10 lg:px-0 lg:pb-12")}
                >
                  <div className="relative col-span-4 aspect-[4/3] overflow-hidden lg:col-span-4 lg:col-start-2">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover grayscale"
                    />
                  </div>
                  <div className="col-span-4 flex flex-col lg:col-span-4 lg:col-start-8">
                    <p className="text-[16px] leading-[1.5] text-(--k-ink)/75">
                      {service.body}
                    </p>
                    <Covers items={service.covers} className="mt-6 mb-8" />
                    <ArrowLink href={service.cta.href} className="self-start">
                      {service.cta.label}
                    </ArrowLink>
                  </div>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
