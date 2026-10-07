import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_SECTION } from "./data";
import { Button, FONT, Heading, Label, Text } from "./design-system";

/**
 * Why we exist: a centred statement — the second line set back in grey — over a
 * two-column row with a gallery photograph on one side and the story on the other.
 */
export function AboutSection() {
  const [lead, follow] = ABOUT_SECTION.heading;

  return (
    <section
      id="about"
      className={cn("bg-white pb-14 text-black lg:pb-[69px]", FONT.sans)}
    >
      <div className="px-[17px] py-[34px] text-center lg:px-[69px]">
        <Label as="h2" className="py-[11px]">
          {ABOUT_SECTION.label}
        </Label>
        <Heading as="p" className="mx-auto max-w-[900px]">
          {lead}
          <span className="block text-[#767676]">{follow}</span>
        </Heading>
      </div>

      <div className="grid items-center gap-y-8 px-[17px] lg:grid-cols-12 lg:gap-x-[46px] lg:px-[69px]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e8e8e8] lg:col-span-7">
          <Image
            src={ABOUT_SECTION.image.src}
            alt={ABOUT_SECTION.image.alt}
            fill
            sizes="(max-width: 1023px) 100vw, 55vw"
            className="object-cover"
          />
        </div>

        <div className="lg:col-span-5">
          <div className="border-t border-[#e1e1e1] pt-6 lg:pt-[34px]">
            {ABOUT_SECTION.paragraphs.map((paragraph, index) => (
              <Text
                key={paragraph}
                className={cn(index > 0 && "mt-5 text-[#767676]")}
              >
                {paragraph}
              </Text>
            ))}
            <Button
              href={ABOUT_SECTION.cta.href}
              target="_blank"
              rel="noreferrer"
              className="mt-8"
            >
              {ABOUT_SECTION.cta.label}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
