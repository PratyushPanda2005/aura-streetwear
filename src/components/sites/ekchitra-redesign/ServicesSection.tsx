import Image from "next/image";

import { cn } from "@/lib/utils";

import { SERVICES } from "./data";
import { Button, FONT, Heading, Text } from "./design-system";

/**
 * Services: half-image, half-ink rows. Each ink panel carries a centred
 * eyebrow, title, line of copy and button; the image side alternates per row.
 */
export function ServicesSection() {
  return (
    <section id="services" className={cn("bg-(--ek-ink)", FONT.sans)}>
      {SERVICES.map((service, index) => (
        <div key={service.title} className="grid lg:h-[480px] lg:grid-cols-2">
          <div
            className={cn(
              "relative h-[300px] overflow-hidden lg:h-auto",
              index % 2 === 1 && "lg:order-2",
            )}
          >
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex items-center justify-center bg-(--ek-ink) px-[17px] py-14 text-center text-(--ek-paper) lg:px-[69px] lg:py-0">
            <div className="max-w-[410px]">
              <Text size="sm" className="text-(--ek-paper)/70 uppercase">
                {service.eyebrow}
              </Text>
              <Heading as="h2" className="mt-3">
                {service.title}
              </Heading>
              <Text className="mt-4 text-(--ek-paper)/85">{service.body}</Text>
              <Button
                variant="light"
                href={service.cta.href}
                target="_blank"
                rel="noreferrer"
                className="mt-8"
              >
                {service.cta.label}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
