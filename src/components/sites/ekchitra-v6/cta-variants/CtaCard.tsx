"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { InView } from "../../ekchitra-v5/InView";
import { BODY, SANS, TITLE } from "../../ekchitra-v5/shared";
import { EASE } from "../motion";
import { BUTTON } from "../styles";
import { Index } from "../ui";
import { CTA_PHOTOS, CTA_SERVICES, INTRO } from "./shared";

/**
 * The services call to action as one simple card on the page margins: a
 * photograph filling the left half, and on sand at the right the section's
 * index, heading and line, with a button to each service — the first filled,
 * the second outlined. The photograph is unveiled as the card scrolls in and
 * settles closer on hover; stacked on a phone.
 */
export function CtaCard() {
  const photo = CTA_PHOTOS.bespoke;
  const [first, second] = CTA_SERVICES;

  return (
    <section
      id="services"
      aria-labelledby="services-card-heading"
      className={cn(
        "scroll-mt-11 bg-white px-4 py-20 text-(--k-ink) lg:px-5 lg:py-[120px]",
        SANS,
      )}
    >
      <InView className="group grid grid-cols-1 lg:grid-cols-2">
        <div className="ek6-unveil relative aspect-[4/3] overflow-hidden bg-(--k-ink) lg:aspect-auto lg:min-h-[560px]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className={cn(
              "object-cover transition-transform duration-[1400ms] group-hover:scale-[1.03] motion-reduce:transition-none",
              EASE,
              photo.position,
            )}
          />
        </div>

        <div className="ek6-rise flex flex-col justify-between gap-y-10 bg-(--k-sand) p-6 [--delay:150ms] lg:p-12">
          <Index n={3} label="Services" />
          <div>
            <h2 id="services-card-heading" className={TITLE}>
              {INTRO.title}
            </h2>
            <p className={cn(BODY, "mt-5 max-w-[440px] text-(--k-ink)/75")}>
              {INTRO.body}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              {[first, second].map((service, index) => (
                <a
                  key={service.key}
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    BUTTON,
                    index === 1 &&
                      "border border-(--k-ink) bg-transparent text-(--k-ink) hover:bg-(--k-ink) hover:text-white hover:opacity-100",
                  )}
                >
                  {service.cta.label}
                  <span aria-hidden="true">→</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </InView>
    </section>
  );
}
