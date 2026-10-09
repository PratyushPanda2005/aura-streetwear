import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "../ekchitra-redesign/data";
import { DISPLAY, SANS, TextLink } from "./shared";

/**
 * Services: two cards side by side. Each is an artwork detail sitting on a block
 * of brand black that carries the number, title, copy and link. On hover the
 * image eases in and the black block lifts slightly over it.
 */
export function Services() {
  return (
    <section
      id="services"
      className={cn("bg-(--ek-paper) py-12 text-(--ek-ink) lg:py-[60px]", SANS)}
    >
      <h2
        className={cn(
          "text-center text-[28px] leading-[1.2] lg:text-[32.4px]",
          DISPLAY,
        )}
      >
        Services
      </h2>

      <div className="mt-10 grid gap-5 px-3 lg:mt-[50px] lg:grid-cols-2 lg:gap-10 lg:px-10">
        {SERVICES.map((service, index) => (
          <article
            key={service.title}
            className="group flex flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-(--ek-ink)/10">
              <Image
                src={service.image.src}
                alt={service.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
              />
            </div>

            <div
              className={cn(
                "relative flex flex-1 flex-col bg-(--ek-ink) px-6 pt-8 pb-9 text-(--ek-paper) transition-transform duration-500 ease-out group-hover:-translate-y-3 lg:px-10 lg:pt-10 lg:pb-12",
              )}
            >
              <div className="flex items-baseline justify-between gap-x-6 text-[15px] leading-6 lg:text-[16px]">
                <p>{service.eyebrow}</p>
                <p className="tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </p>
              </div>
              <h3
                className={cn(
                  "mt-6 text-[44px] leading-none lg:mt-8 lg:text-[64px]",
                  DISPLAY,
                )}
              >
                {service.title}
              </h3>
              <p className="mt-5 max-w-[420px] text-[16px] leading-6 text-(--ek-paper)/85 lg:mt-6">
                {service.body}
              </p>
              <div className="mt-auto pt-9 lg:pt-12">
                <TextLink
                  light
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {service.cta.label}
                </TextLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
