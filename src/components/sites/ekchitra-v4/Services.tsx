import Image from "next/image";

import { cn } from "@/lib/utils";

import { ARTWORKS, SERVICES } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { ArrowLink, BODY, GUTTER, H2, SANS } from "./shared";

/** Heading of each service: its name, then a phrase on a second line. */
const HEADINGS = [
  { plain: "Bespoke sourcing,", second: "shaped around your space" },
  { plain: "Art advisory,", second: "for growing a collection" },
];

/** Small second picture of each block. */
const ASIDES = [ARTWORKS[12], ARTWORKS[5]];

/**
 * Services: two blocks, the second a mirror of the first. Each pairs a wide
 * picture carrying the call to action with a column holding a small picture at
 * the top and the heading and text at the bottom.
 */
export function Services() {
  return (
    <section
      id="services"
      className={cn(
        "space-y-24 pt-24 lg:space-y-[140px] lg:pt-[190px]",
        GUTTER,
        SANS,
      )}
    >
      {SERVICES.map((service, index) => {
        const flipped = index % 2 === 1;
        const aside = ASIDES[index % ASIDES.length];
        const heading = HEADINGS[index % HEADINGS.length];

        return (
          <Reveal key={service.title}>
            <div className="grid gap-x-12 gap-y-10 lg:grid-cols-2">
              <div
                className={cn(
                  "group relative aspect-[4/3] overflow-hidden bg-(--v-night) lg:aspect-[696/600]",
                  flipped && "lg:order-2",
                )}
              >
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  sizes="(max-width: 1023px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/70 to-transparent" />
                <ArrowLink
                  light
                  href={service.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-6 left-6"
                >
                  {service.cta.label}
                </ArrowLink>
              </div>

              <div className="flex flex-col justify-between gap-y-12">
                <div
                  className={cn(
                    "relative hidden aspect-[348/418] w-[30%] overflow-hidden lg:block",
                    !flipped && "self-end",
                  )}
                >
                  <Image
                    src={aside.image}
                    alt={`${aside.title} by ${aside.artist}`}
                    fill
                    sizes="25vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className={cn(BODY, "opacity-60")}>{service.eyebrow}</p>
                  <h2 className={cn(H2, "mt-6")}>
                    {heading.plain}{" "}
                    <span className="block">{heading.second}</span>
                  </h2>
                  <p className={cn(BODY, "mt-10 max-w-[480px] lg:mt-12")}>
                    {service.body}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </section>
  );
}
