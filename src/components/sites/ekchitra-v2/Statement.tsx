import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_SECTION, HERO_SLIDES } from "../ekchitra-redesign/data";
import { TextLink, DISPLAY, SANS } from "./shared";

/**
 * Why we exist: a wide inset photograph, then the gallery's statement set very
 * large, a supporting paragraph and a link through to the about page.
 */
export function Statement() {
  const [lead, follow] = ABOUT_SECTION.heading;
  const [first, second] = ABOUT_SECTION.paragraphs;
  const photo = HERO_SLIDES[1];

  return (
    <section
      id="about"
      className={cn(
        "bg-(--ek-paper) px-3 py-12 text-(--ek-ink) lg:px-10 lg:py-[60px]",
        SANS,
      )}
    >
      <div className="relative aspect-[1220/660] overflow-hidden bg-(--ek-ink)/10">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(max-width: 1023px) 100vw, 85vw"
          className="object-cover"
        />
      </div>

      <p className="mt-10 text-[15px] leading-6 lg:mt-[50px] lg:text-[16px]">
        {ABOUT_SECTION.label}
      </p>
      <h2
        className={cn(
          "mt-4 text-[clamp(32px,4.2vw,60.5px)] leading-[1.3] font-normal",
          DISPLAY,
        )}
      >
        {lead} {follow} {first}
      </h2>
      <p className="mt-8 max-w-[640px] text-[16px] leading-6 lg:mt-10">
        {second}
      </p>
      <TextLink
        href={ABOUT_SECTION.cta.href}
        target="_blank"
        rel="noreferrer"
        className="mt-8"
      >
        {ABOUT_SECTION.cta.label}
      </TextLink>
    </section>
  );
}
