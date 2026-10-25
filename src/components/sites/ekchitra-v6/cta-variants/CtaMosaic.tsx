import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, LineArrow, SectionHead, pad } from "./shared";

/** The call-to-action cell's colour, one per service. */
const ACCENTS = ["bg-(--k-navy)", "bg-(--k-maroon)"];

/**
 * Variation 08 — Swiss mosaic, on the hero's own cell grid (1fr 1fr .62fr
 * .62fr). Each service is a row of four cells: its name set large in white,
 * a picture of the work, a black cell with who it is for and what it covers,
 * and a coloured cell to begin — navy for Bespoke sourcing, maroon for Art
 * advisory. The second row mirrors the first so the pictures sit
 * diagonally.
 */
export function CtaMosaic() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white text-(--k-ink)", SANS)}
    >
      <SectionHead />
      {CTA_SERVICES.map((service, index) => {
        const mirrored = index % 2 === 1;
        return (
          <div
            key={service.key}
            className="grid grid-cols-2 lg:h-[46svh] lg:min-h-[380px] lg:grid-cols-[1fr_1fr_0.62fr_0.62fr]"
          >
            <div
              className={cn(
                "col-span-2 flex min-h-[220px] flex-col justify-between bg-white p-4 lg:col-span-1 lg:p-5",
                mirrored && "lg:order-2",
              )}
            >
              <p className="text-[13px] tabular-nums">{pad(index + 1)}</p>
              <h3 className="text-[48px] leading-[0.92] tracking-[-0.05em] lg:text-[5vw]">
                {service.title}
              </h3>
            </div>

            <div
              className={cn(
                "relative col-span-2 aspect-[4/3] overflow-hidden lg:col-span-1 lg:aspect-auto",
                mirrored && "lg:order-1",
              )}
            >
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(min-width: 1024px) 31vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="flex min-h-[280px] flex-col justify-between bg-(--k-ink) p-4 text-white lg:order-3 lg:min-h-0 lg:p-5">
              <p className={cn(CAPS, "text-[10px] text-white/60")}>
                {service.eyebrow}
              </p>
              <ul className="space-y-1.5 text-[13px] leading-[1.35] text-white/80 lg:text-[14px]">
                {service.covers.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <a
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "group flex min-h-[280px] flex-col justify-between p-4 text-white transition-[filter] duration-300 hover:brightness-125 lg:order-4 lg:min-h-0 lg:p-5",
                ACCENTS[index],
              )}
            >
              <p className="text-[15px] leading-[1.35]">{service.body}</p>
              <span className="flex items-center justify-between pt-4 text-[15px]">
                {service.cta.label}
                <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </a>
          </div>
        );
      })}
    </section>
  );
}
