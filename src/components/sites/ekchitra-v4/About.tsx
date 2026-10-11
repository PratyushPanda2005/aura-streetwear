import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_SECTION } from "../ekchitra-redesign/data";
import { Progress } from "./Progress";
import { Reveal } from "./Reveal";
import { ArrowLink, BODY, GUTTER, H2, SANS } from "./shared";

/** Line over the photograph; the words light up one by one as it is scrolled. */
const OVERLAY = {
  plain: "You don’t need to know about art",
  italic: "to feel at home here",
};

const PLAIN_WORDS = OVERLAY.plain.split(" ");
const ITALIC_WORDS = OVERLAY.italic.split(" ");

const WORD =
  "opacity-30 transition-opacity duration-700 data-[on=true]:opacity-100";

/** Scroll progress at which the nth word of the overlay lights up. */
const wordStep = (index: number) => (0.34 + index * 0.02).toFixed(2);

/**
 * Why we exist: a heading on the left, text and a link from the middle of the
 * page, then a photograph that widens to the full page as it is scrolled, with a
 * line over its lower-left corner.
 */
export function About() {
  return (
    <section id="about" className={cn("pt-24 lg:pt-[190px]", SANS)}>
      <div className={GUTTER}>
        <Reveal>
          <p className={cn(BODY, "opacity-60")}>{ABOUT_SECTION.label}</p>
          <h2 className={cn(H2, "mt-6 max-w-[640px]")}>
            Every exhibition begins with an idea,{" "}
            <em>every visit with curiosity</em>
          </h2>
        </Reveal>
        <Reveal className="mt-12 lg:mt-[100px] lg:ml-[calc(50%+5px)]">
          <div className={cn(BODY, "max-w-[480px] space-y-6")}>
            {ABOUT_SECTION.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ArrowLink
            href={ABOUT_SECTION.cta.href}
            target="_blank"
            rel="noreferrer"
            className="mt-12"
          >
            {ABOUT_SECTION.cta.label}
          </ArrowLink>
        </Reveal>
      </div>

      <Progress className="mt-20 lg:mt-[190px]">
        <div className="relative mx-auto aspect-[4/5] w-[min(100%,calc(86%_+_var(--p,0)_*_30%))] overflow-hidden sm:aspect-[1426/891]">
          <Image
            src={ABOUT_SECTION.image.src}
            alt={ABOUT_SECTION.image.alt}
            fill
            sizes="100vw"
            className="scale-[calc(1.15_-_var(--p,0)_*_0.15)] object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-transparent" />
          <p
            className={cn(
              H2,
              "absolute bottom-8 left-4 max-w-[720px] pr-4 text-white lg:bottom-12 lg:left-6",
            )}
          >
            {PLAIN_WORDS.map((word, index) => (
              <span key={index} data-step={wordStep(index)} className={WORD}>
                {word}{" "}
              </span>
            ))}
            <em>
              {ITALIC_WORDS.map((word, index) => (
                <span
                  key={index}
                  data-step={wordStep(PLAIN_WORDS.length + index)}
                  className={WORD}
                >
                  {word}{" "}
                </span>
              ))}
            </em>
          </p>
        </div>
      </Progress>
    </section>
  );
}
