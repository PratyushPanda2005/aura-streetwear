import Image from "next/image";

import { cn } from "@/lib/utils";

import { CAPS, SANS } from "../ekchitra-v5/shared";
import { CONTACT } from "./data";

/** Two people bent over drawings at a table, from grounded2026.com (used with permission). */
const PHOTO = {
  src: "/sites/ekchitra-redesign/placeholders/contact-grounded.webp",
  alt: "",
};

/**
 * Contact, after the closing block of grounded2026.com: a full-bleed
 * photograph with a frosted panel set into it. The panel carries a small
 * label and a two-line question across the top, and a very large "Let's
 * talk" with a white button along the bottom.
 */
export function ContactPanel() {
  return (
    <section
      className={cn(
        "relative overflow-hidden px-4 py-24 text-white lg:px-20 lg:py-40",
        SANS,
      )}
    >
      <Image
        src={PHOTO.src}
        alt={PHOTO.alt}
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />

      <div className="relative flex min-h-[420px] flex-col justify-between gap-16 bg-white/10 p-5 backdrop-blur-2xl lg:h-[448px] lg:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <p className={cn(CAPS, "text-[13px] lg:text-[15px]")}>Contact us</p>
          <p className="text-[26px] leading-[1.2] tracking-[-0.02em] lg:text-right lg:text-[40px] lg:leading-[48px]">
            Have a wall, a home or a collection in mind?
            <br className="hidden lg:block" /> We’d love to hear about it.
          </p>
        </div>

        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="text-[56px] leading-[0.9] tracking-[-0.04em] lg:text-[80px] lg:leading-[64px]">
            Let’s talk
          </p>
          <a
            href={CONTACT.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-9 w-full items-center justify-between bg-white/60 px-2 text-[14px] text-black transition-colors hover:bg-white lg:w-[250px]"
          >
            Get in touch <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
