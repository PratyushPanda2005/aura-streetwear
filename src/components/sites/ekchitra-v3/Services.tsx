import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "../ekchitra-redesign/data";
import { Btn, SANS, SERIF } from "./shared";

/**
 * Services: two full-bleed image panels side by side, each under a light black scrim and carrying
 * a centred line, a serif title, a sentence and a small white button.
 */
export function Services() {
  return (
    <section
      id="services"
      className={cn("mt-[100px] grid text-(--ek-paper) lg:grid-cols-2", SANS)}
    >
      {SERVICES.map((service) => (
        <div
          key={service.title}
          className="group relative flex h-[400px] items-center justify-center overflow-hidden bg-(--ek-ink) px-6 text-center lg:h-[520px]"
        >
          <Image
            src={service.image.src}
            alt=""
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative">
            <p className="text-[14px] leading-4">{service.eyebrow}</p>
            <h2
              className={cn(
                "mt-3 text-[34px] leading-[1.05] tracking-[-0.6px] lg:text-[44px]",
                SERIF,
              )}
            >
              {service.title}
            </h2>
            <p className="mx-auto mt-4 max-w-[320px] text-[14px] leading-5 text-(--ek-paper)/85">
              {service.body}
            </p>
            <Btn
              variant="white"
              href={service.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-7"
            >
              {service.cta.label}
            </Btn>
          </div>
        </div>
      ))}
    </section>
  );
}
