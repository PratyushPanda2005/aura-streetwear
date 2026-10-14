import { cn } from "@/lib/utils";

import { ABOUT_STORY } from "./about-data";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/**
 * "Our story", laid out as kettal.com's history intro: a large statement whose
 * first line is set in, with the small label sitting in that space, and two
 * short paragraphs underneath in the right-hand half. The text fades in letter
 * by letter as it arrives.
 */
export function AboutStory() {
  return (
    <section
      className={cn(
        "relative pt-12 pb-12 lg:pt-[72px] lg:pb-[72px]",
        GUTTER,
        SANS,
      )}
    >
      <Diamonds
        rows={16}
        shape="steps"
        tint="sky"
        tintEvery={19}
        tintOpacity={0.6}
        className="absolute bottom-10 left-0 hidden w-[80px] text-(--k-ink)/[0.07] lg:block"
      />
      <div className="relative">
        <p className={cn(CAPS, "text-(--k-ink)/60 lg:absolute lg:top-[18px]")}>
          <Chars once text={ABOUT_STORY.label} />
        </p>
        <h2
          className={cn(
            DISPLAY,
            "mt-5 text-[30px] leading-[1.25] lg:mt-0 lg:indent-[18%] lg:text-[48px] lg:leading-[1.3]",
          )}
        >
          <Chars once text={ABOUT_STORY.lead} />
        </h2>
      </div>

      <div className="mt-8 grid lg:mt-10 lg:grid-cols-2">
        <div className="space-y-5 lg:col-start-2 lg:max-w-[460px]">
          {ABOUT_STORY.body.map((paragraph) => (
            <p key={paragraph} className={cn(BODY, "text-(--k-ink)/75")}>
              <Chars once text={paragraph} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
