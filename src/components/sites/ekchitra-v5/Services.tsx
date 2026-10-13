import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/**
 * Pictures for the service cards: stock photographs from Unsplash (free licence)
 * of art placed in a room. The first is
 * https://unsplash.com/photos/a-room-with-a-large-map-on-the-wall-tgQ_jbtwPI8
 * Swap them for photographs of EkChitra's own placements when available; a
 * service with no entry here falls back to its artwork picture.
 */
const PICTURES: (string | undefined)[] = [
  "/sites/ekchitra-redesign/placeholders/services-sourcing-unsplash.jpg",
];

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
          {SHOWN.map((service, index) => (
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
                  src={PICTURES[index] ?? service.image.src}
                  alt={PICTURES[index] ? "" : service.image.alt}
                  fill
                  sizes="(max-width: 1023px) 40vw, 45vw"
                  className="object-cover object-[50%_38%] transition-transform duration-[1400ms] ease-out hover:scale-[1.05]"
                />
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
