import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../../ekchitra-v5/shared";
import { CTA_SERVICES, LineArrow, SectionHead } from "./shared";

/**
 * Variation 06 — image tiles. Two full-bleed photographs side by side, each
 * holding a white label card in its bottom-left corner, as the hero sets its
 * cells: who it is for, the name, a line on what it is and a ruled call to
 * action. On hover the picture settles closer and the card lifts.
 */
export function CtaTiles() {
  return (
    <section
      aria-label="Services"
      className={cn("bg-white text-(--k-ink)", SANS)}
    >
      <SectionHead />
      <div className="grid grid-cols-1 gap-px bg-white lg:grid-cols-2">
        {CTA_SERVICES.map((service) => (
          <a
            key={service.key}
            href={service.cta.href}
            target="_blank"
            rel="noreferrer"
            className="group relative flex h-[78svh] min-h-[560px] items-end overflow-hidden bg-(--k-ink) p-4 lg:h-[88svh] lg:p-5"
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
            />
            <div className="relative w-full max-w-[380px] bg-white p-5 transition-transform duration-500 ease-out group-hover:-translate-y-2 lg:p-6">
              <p className={cn(CAPS, "text-[10px] text-(--k-ink)/60")}>
                {service.eyebrow}
              </p>
              <h3 className="mt-3 text-[34px] leading-[1] tracking-[-0.04em] lg:text-[40px]">
                {service.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.4] text-(--k-ink)/70">
                {service.body}
              </p>
              <div className="mt-6 flex items-center justify-between pt-4 text-[15px]">
                {service.cta.label}
                <LineArrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
