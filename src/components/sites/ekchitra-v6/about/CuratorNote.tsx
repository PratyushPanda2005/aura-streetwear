import { cn } from "@/lib/utils";

import { ABOUT_CURATOR } from "../../ekchitra-v5/about-data";
import { Diamonds } from "../../ekchitra-v5/Diamonds";
import { InView } from "../../ekchitra-v5/InView";
import { CAPS } from "../../ekchitra-v5/shared";
import { handwriting, signature } from "../fonts";

/**
 * The curator's note, line by line, each indented a little differently as a
 * hand would set it. PLACEHOLDER WORDING — taken from EkChitra's own published
 * lines; confirm or replace with Annapurna M's own words before launch.
 */
const NOTE = [
  { line: "We’ve always lived around art —", indent: "lg:pl-0" },
  { line: "we’ve just forgotten to notice it.", indent: "lg:pl-[6%]" },
  {
    line: "Every exhibition here begins with an idea,",
    indent: "lg:pl-[12%]",
  },
  { line: "and every visit with curiosity.", indent: "lg:pl-[4%]" },
];

/** Stagger for each line's write-in, then the signature's. */
const WRITE_DELAYS = [
  "[--write-delay:0ms]",
  "[--write-delay:500ms]",
  "[--write-delay:1000ms]",
  "[--write-delay:1500ms]",
  "[--write-delay:2100ms]",
];

/**
 * The curator, after the handwritten note on velaaprivateisland.com: a few
 * lines in a pen hand on sand, writing themselves in, signed by Annapurna M.
 * The About page's last section, uncovered as How we work slides away; it
 * meets the footer directly, as a white gap between the sand and the dark
 * footer reads as a stray strip.
 */
export function CuratorNote({
  manual = false,
  className,
}: {
  /**
   * Leave starting the write-in to the page: it sets `data-shown="true"` on
   * `[data-note]` when the note is uncovered (see AboutSections), instead of
   * the note writing itself in when it scrolls into view.
   */
  manual?: boolean;
  className?: string;
}) {
  const Wrap = manual ? "div" : InView;
  return (
    <section
      aria-labelledby="curator-heading"
      className={cn(
        "relative bg-(--k-sand) py-14 text-(--k-ink) lg:py-24",
        className,
      )}
    >
      <Wrap
        {...(manual ? { "data-note": "" } : {})}
        className="mx-auto w-full max-w-[1100px] px-4 lg:px-5"
      >
        <h2 id="curator-heading" className={cn(CAPS, "text-center")}>
          A note from our curator
        </h2>
        <figure className="mt-10 lg:mt-16">
          <blockquote className={cn(handwriting.className, "-rotate-2")}>
            <p className="space-y-2 text-[16px] leading-[1.9] min-[400px]:text-[17px] sm:text-[26px] lg:space-y-4 lg:text-[2.5vw] min-[1440px]:text-[36px]">
              {NOTE.map(({ line, indent }, index) => (
                <span key={line} className={cn("block", indent)}>
                  <span
                    className={cn(
                      "ek6-write -mx-[0.3em] inline-block px-[0.3em]",
                      WRITE_DELAYS[index],
                    )}
                  >
                    {line}
                  </span>
                </span>
              ))}
            </p>
          </blockquote>
          <figcaption className="mt-8 flex flex-col items-end pr-[6%] lg:mt-12">
            <span
              className={cn(
                signature.className,
                "ek6-write -mx-[0.3em] inline-block -rotate-6 px-[0.3em] text-[64px] leading-none lg:text-[88px]",
                WRITE_DELAYS[NOTE.length],
              )}
            >
              {ABOUT_CURATOR.name}
            </span>
            <span className={cn(CAPS, "mt-3")}>Curator, EkChitra</span>
          </figcaption>
        </figure>
      </Wrap>

      {/* A run of the diamond motif on the sand, resting on the footer. */}
      <Diamonds
        rows={40}
        shape="steps"
        horizontal
        side="right"
        tint="navy"
        tintEvery={6}
        tintOpacity={0.22}
        className="pointer-events-none absolute right-0 bottom-0 h-[32px] -scale-y-100 text-(--k-ink)/[0.08] lg:h-[48px]"
      />
    </section>
  );
}
