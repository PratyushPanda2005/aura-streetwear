import Image from "next/image";

import { cn } from "@/lib/utils";

import { BODY, CAPS, SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, LineArrow, SectionHead, pad } from "./shared";

/** Each card's ground: white for the first, brand black for the second. */
const TONES = [
  {
    card: "bg-white text-(--k-ink)",
    muted: "text-(--k-ink)/60",
    rule: "border-(--k-ink)/15",
    button: "bg-(--k-ink) text-white hover:bg-(--k-maroon)",
  },
  {
    card: "bg-(--k-ink) text-white",
    muted: "text-white/60",
    rule: "border-white/20",
    button: "bg-white text-(--k-ink) hover:bg-(--k-sky)",
  },
];

/**
 * Variation 10 — stacking cards. Each service is a full-screen card that pins
 * under the top bar; scrolling on, the second slides up over the first. A
 * card is split on the grid: the picture across the left half, and on the
 * right the number, the name set large, who it is for, what it is, what it
 * covers and a button. The first card is white, the second brand black.
 */
export function CtaStack() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white text-(--k-ink)", SANS)}
    >
      <SectionHead />
      <div className="relative">
        {CTA_SERVICES.map((service, index) => {
          const tone = TONES[index];
          return (
            <article
              key={service.key}
              className={cn(
                "grid grid-cols-1 border-t lg:sticky lg:top-11 lg:h-[calc(100svh-44px)] lg:grid-cols-2",
                tone.card,
                tone.rule,
              )}
            >
              <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col p-4 lg:p-5 lg:pl-10">
                <div
                  className={cn(
                    "flex items-baseline justify-between text-[13px] tabular-nums",
                    tone.muted,
                  )}
                >
                  <span>{pad(index + 1)}</span>
                  <span>
                    {pad(index + 1)} / {pad(CTA_SERVICES.length)}
                  </span>
                </div>

                <h3 className="mt-10 text-[48px] leading-[0.92] tracking-[-0.05em] lg:mt-auto lg:text-[6vw]">
                  {service.title}
                </h3>
                <p className={cn(CAPS, "mt-5 text-[10px]", tone.muted)}>
                  {service.eyebrow}
                </p>
                <p className={cn(BODY, "mt-2 max-w-[440px] opacity-80")}>
                  {service.body}
                </p>

                <ul
                  className={cn(
                    "mt-8 grid grid-cols-1 border-t text-[14px] sm:grid-cols-2 sm:gap-x-5",
                    tone.rule,
                  )}
                >
                  {service.covers.map((item) => (
                    <li
                      key={item}
                      className={cn("border-b py-2.5 opacity-80", tone.rule)}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className={cn(
                    "mt-8 flex h-12 items-center justify-between px-5 text-[14px] transition-colors duration-300 lg:w-[280px]",
                    tone.button,
                  )}
                >
                  {service.cta.label}
                  <LineArrow />
                </a>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
