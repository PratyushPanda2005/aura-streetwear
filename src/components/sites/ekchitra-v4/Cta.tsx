import Image from "next/image";

import { cn } from "@/lib/utils";

import { FOOTER, HERO_SLIDES } from "../ekchitra-redesign/data";
import { Progress } from "./Progress";
import { CAPS, H2, SANS } from "./shared";

/**
 * Closing call: a photograph that widens to the full page as it is scrolled,
 * with a two-line invitation and a white button in the middle.
 */
export function Cta() {
  const contact =
    FOOTER.social.find((link) => link.label === "WhatsApp") ?? FOOTER.social[0];
  const image = HERO_SLIDES[2];

  return (
    <Progress className={cn("pt-24 lg:pt-[190px]", SANS)}>
      <div className="relative mx-auto flex aspect-[4/5] w-[min(100%,calc(84%_+_var(--p,0)_*_36%))] items-center justify-center overflow-hidden text-center text-white sm:aspect-[1296/810]">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="100vw"
          className="scale-[calc(1.15_-_var(--p,0)_*_0.15)] object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative px-4">
          <h2 className={H2}>
            Art is everywhere. <em className="block">Come and notice.</em>
          </h2>
          <a
            href={contact.href}
            target="_blank"
            rel="noreferrer"
            className={cn(
              CAPS,
              "mt-12 inline-flex h-10 items-center rounded-[4px] bg-white px-6 text-black transition-colors duration-300 hover:bg-(--v-maroon) hover:text-white",
            )}
          >
            Get in touch
          </a>
        </div>
      </div>
    </Progress>
  );
}
