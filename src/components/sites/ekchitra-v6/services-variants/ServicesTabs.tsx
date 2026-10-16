"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { CAPS } from "../../ekchitra-v5/shared";
import { GRID } from "../styles";
import { ArrowLink, Covers, pad, SERVICES } from "./shared";

/**
 * Variation 03 — Tabs. The three names stand in a column on the left; the
 * chosen one is black, the others grey. The right holds that service: a
 * greyscale picture beside the line it is for, a few words, what it covers
 * and a link. Hovering or clicking a name chooses it.
 */
export function ServicesTabs() {
  const [active, setActive] = useState(0);
  const service = SERVICES[active];

  return (
    <div className={cn(GRID, "gap-y-10")}>
      <div
        role="tablist"
        aria-label="Services"
        className="col-span-4 flex flex-col lg:col-span-4"
      >
        {SERVICES.map((item, index) => (
          <button
            key={item.title}
            type="button"
            role="tab"
            aria-selected={index === active}
            onClick={() => setActive(index)}
            onPointerEnter={() => setActive(index)}
            className={cn(
              "flex items-baseline gap-x-4 border-t border-(--k-ink)/15 py-4 text-left transition-colors duration-300 last:border-b",
              index === active ? "text-(--k-ink)" : "text-(--k-ink)/25",
            )}
          >
            <span className="w-6 text-[13px] tabular-nums">
              {pad(index + 1)}
            </span>
            <span className="text-[30px] leading-none tracking-[-0.035em] lg:text-[40px]">
              {item.title}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        className="col-span-4 grid grid-cols-4 gap-x-4 gap-y-6 lg:col-span-7 lg:col-start-6 lg:grid-cols-7 lg:gap-x-5"
      >
        <div className="relative col-span-4 aspect-[4/5] overflow-hidden lg:col-span-3">
          {SERVICES.map((item, index) => (
            <Image
              key={item.title}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 25vw, 100vw"
              className={cn(
                "object-cover grayscale transition-opacity duration-500",
                index === active ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <div className="col-span-4 flex flex-col">
          <p className={cn(CAPS, "text-[10px] text-(--k-ink)/60")}>
            {service.headline}
          </p>
          <p className="mt-3 text-[16px] leading-[1.5] text-(--k-ink)/75">
            {service.body}
          </p>
          <Covers items={service.covers} className="mt-6 mb-8" />
          <ArrowLink href={service.cta.href} className="mt-auto self-start">
            {service.cta.label}
          </ArrowLink>
        </div>
      </div>
    </div>
  );
}
