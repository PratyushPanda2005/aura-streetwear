import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/** Only the first service is shown for now; raise this to bring the rest back. */
const SHOWN = SERVICES.slice(0, 1);

/**
 * Services: one wide sand-coloured card with a line of context, a heading, a
 * sentence and a link on the left and a picture on the right.
 */
export function Services() {
  return (
    <section
      id="services"
      className={cn(
        "scroll-mt-[68px] pt-20 pb-24 lg:pt-[100px] lg:pb-[140px]",
        GUTTER,
        SANS,
      )}
    >
      <Reveal>
        <div className="grid gap-5">
          {SHOWN.map((service) => (
            <article
              key={service.title}
              className="flex gap-x-6 bg-(--k-sand) p-6 lg:min-h-[460px] lg:p-10"
            >
              <div className="flex flex-1 flex-col justify-between gap-y-10">
                <p className={CAPS}>
                  <Chars text={service.eyebrow} />
                </p>
                <div>
                  <h2
                    className={cn(
                      DISPLAY,
                      "text-[32px] leading-[1.1] lg:text-[56px]",
                    )}
                  >
                    <Chars text={service.title} />
                  </h2>
                  <p className={cn(BODY, "mt-4 max-w-[400px]")}>
                    <Chars text={service.body} />
                  </p>
                  <CapsLink
                    arrow
                    href={service.cta.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8"
                  >
                    {service.cta.label}
                  </CapsLink>
                </div>
              </div>
              <div className="relative hidden w-[46%] shrink-0 overflow-hidden sm:block">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1023px) 40vw, 45vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out hover:scale-[1.05]"
                />
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
