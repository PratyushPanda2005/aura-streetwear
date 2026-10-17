import Image from "next/image";

import { cn } from "@/lib/utils";

import { CONTACT } from "../ekchitra-v6/data";
import { Arrow } from "./ui";

const WORDS = ["Come", "and", "see", "the", "work"];

/**
 * Call to action, after the reference: a halftone picture filling the band,
 * with the line set word by word in black boxes and a mint box holding the
 * arrow that opens a conversation.
 */
export function Cta() {
  return (
    <section
      aria-label="Visit the gallery"
      className="relative flex min-h-[78svh] items-center overflow-hidden border-b border-(--e7-rule) bg-(--e7-grey)"
    >
      <Image
        src="/sites/ekchitra-redesign/v7/halftone-lamp.png"
        alt=""
        fill
        sizes="100vw"
        className="object-cover [image-rendering:pixelated]"
      />
      <a
        href={CONTACT.href}
        target="_blank"
        rel="noreferrer"
        className="group relative flex flex-wrap gap-1 px-5 uppercase"
      >
        {WORDS.map((word) => (
          <span
            key={word}
            className="bg-(--e7-ink) px-[0.12em] pt-[0.08em] text-[15vw] leading-[0.82] tracking-[-0.045em] text-white lg:text-[8.3vw]"
          >
            {word}
          </span>
        ))}
        <span
          className={cn(
            "flex aspect-square items-center justify-center bg-(--e7-sky) text-[15vw] leading-[0.82] lg:text-[8.3vw]",
            "transition-colors duration-300 group-hover:bg-white",
          )}
        >
          <Arrow className="size-[0.6em] transition-transform duration-300 group-hover:translate-x-[0.08em]" />
        </span>
      </a>
    </section>
  );
}
