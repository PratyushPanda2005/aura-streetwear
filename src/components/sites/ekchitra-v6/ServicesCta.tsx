import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "../ekchitra-redesign/data";
import { CAPS, SANS } from "../ekchitra-v5/shared";
import { Arrow } from "../ekchitra-v7/ui";

/**
 * The two services: Bespoke sourcing on brand navy, Art advisory on brand
 * black, each with a white arrow box.
 */
const CTAS = [
  {
    service: SERVICES[0],
    words: ["Bespoke", "sourcing"],
    picture: "/sites/ekchitra-redesign/v7/halftone-visitor-navy.png",
    ground: "bg-(--k-navy) text-white",
    muted: "text-white/60",
    body: "text-white/70",
    rule: "border-white/25",
    box: "bg-white text-(--k-navy)",
    arrow: "bg-white text-(--k-ink) group-hover:bg-(--k-sky)",
  },
  {
    service: SERVICES[1],
    words: ["Art", "advisory"],
    picture: "/sites/ekchitra-redesign/v7/halftone-opening-ink.png",
    ground: "bg-(--k-ink) text-white",
    muted: "text-white/60",
    body: "text-white/70",
    rule: "border-white/25",
    box: "bg-white text-(--k-ink)",
    arrow:
      "bg-white text-(--k-ink) group-hover:bg-(--k-maroon) group-hover:text-white",
  },
];

/**
 * Services, after the v7 call to action: two halves side by side — Bespoke
 * sourcing on brand navy, Art advisory on brand black, each over a v7
 * halftone picture recoloured in its own colour (navy on navy, grey on
 * black). Each has who it is for across the top; the name set
 * large in white boxed capitals; one line on what it covers; and a ruled row
 * with the call to action and a white arrow box that changes colour on hover
 * (sky blue on navy, maroon on black). Stacked on a phone.
 */
export function ServicesCta() {
  return (
    <section
      id="services"
      aria-label="Services"
      className={cn("grid scroll-mt-11 grid-cols-1 lg:grid-cols-2", SANS)}
    >
      {CTAS.map(
        ({
          service,
          words,
          picture,
          ground,
          muted,
          body,
          rule,
          box,
          arrow,
        }) => (
          <a
            key={service.title}
            href={service.cta.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "group relative flex min-h-[560px] flex-col overflow-hidden p-4 lg:min-h-[78svh] lg:p-5",
              ground,
            )}
          >
            {/* The halftone picture, recoloured to the half's own colour. */}
            <Image
              src={picture}
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover [image-rendering:pixelated]"
            />
            <p className={cn(CAPS, "relative text-[11px]", muted)}>
              {service.eyebrow}
            </p>

            <div className="relative mt-auto pt-24">
              <h2 className="flex flex-wrap gap-1 uppercase">
                {words.map((word) => (
                  <span
                    key={word}
                    className={cn(
                      "px-[0.12em] pt-[0.08em] text-[17vw] leading-[0.82] tracking-[-0.045em] lg:text-[6.2vw]",
                      box,
                    )}
                  >
                    {word}
                  </span>
                ))}
              </h2>
              <p
                className={cn(
                  "mt-6 max-w-[400px] text-[16px] leading-[1.4] lg:text-[17px]",
                  body,
                )}
              >
                {service.body}
              </p>

              <div
                className={cn(
                  "mt-10 flex items-center justify-between border-t pt-4 lg:mt-14",
                  rule,
                )}
              >
                <span className="text-[15px] lg:text-[16px]">
                  {service.cta.label}
                </span>
                <span
                  className={cn(
                    "flex size-12 items-center justify-center transition-colors duration-300",
                    arrow,
                  )}
                >
                  <Arrow className="size-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </a>
        ),
      )}
    </section>
  );
}
