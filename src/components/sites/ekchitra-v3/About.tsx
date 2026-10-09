import { cn } from "@/lib/utils";

import { ABOUT_SECTION } from "../ekchitra-redesign/data";
import { Reveal } from "./Reveal";
import { Btn, GUTTER, HEADING, SANS, SERIF } from "./shared";

/**
 * Why we exist: the section heading on the left half, and on the right half the
 * statement in the serif, the story beneath it and a small button.
 */
export function About() {
  const [lead, follow] = ABOUT_SECTION.heading;

  return (
    <section
      id="about"
      className={cn("bg-(--ek-paper) pt-[100px] text-(--ek-ink)", SANS, GUTTER)}
    >
      <div className="grid gap-y-8 lg:grid-cols-2 lg:gap-x-5">
        <h2 className={HEADING}>{ABOUT_SECTION.label}</h2>
        <Reveal>
          <p
            className={cn(
              "text-[28px] leading-[1.15] tracking-[-0.6px] lg:text-[34px]",
              SERIF,
            )}
          >
            {lead}
            <span className="block text-[#777]">{follow}</span>
          </p>
          <div className="mt-8 max-w-[513px] space-y-4 text-[16px] leading-[22px]">
            {ABOUT_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <Btn
            href={ABOUT_SECTION.cta.href}
            target="_blank"
            rel="noreferrer"
            className="mt-8"
          >
            {ABOUT_SECTION.cta.label}
          </Btn>
        </Reveal>
      </div>
    </section>
  );
}
