import Image from "next/image";

import { cn } from "@/lib/utils";

import { Progress } from "../ekchitra-v4/Progress";
import { ABOUT_CURATOR } from "./about-data";
import { Chars } from "./Chars";
import { InView } from "./InView";
import { BODY, CAPS, DISPLAY, GUTTER, SANS } from "./shared";

/**
 * The curator, laid out as the chairperson block on knma.org's team page: a
 * thin rule with the role as a title, a wide picture across the content
 * width, then two columns — her name, role and a short lead on the left, the
 * biography on the right.
 *
 * The picture fills the frame; it wipes open on arrival and drifts a little
 * slower than the page.
 */
export function AboutCurator() {
  return (
    <section
      id="curator"
      className={cn(
        "scroll-mt-[60px] pt-16 pb-14 lg:scroll-mt-[68px] lg:pt-[96px] lg:pb-[80px]",
        GUTTER,
        SANS,
      )}
    >
      <div className="border-t border-(--k-ink)/30 pt-4">
        <h2 className={cn(DISPLAY, "text-[26px] leading-[1.2] lg:text-[32px]")}>
          <Chars once text={ABOUT_CURATOR.title} />
        </h2>
      </div>

      <Progress className="mt-8 lg:mt-10">
        <InView>
          <div className="ek5-wipe relative h-[56svh] min-h-[340px] overflow-hidden bg-(--k-ink) lg:h-[62svh] lg:min-h-[420px]">
            <div className="absolute inset-x-0 -top-[6%] -bottom-[6%] translate-y-[calc((0.5_-_var(--p,0.5))_*_8%)]">
              <Image
                src={ABOUT_CURATOR.image.src}
                alt={ABOUT_CURATOR.image.alt}
                fill
                sizes="(max-width: 1023px) 100vw, 1400px"
                className="object-cover object-[50%_36%]"
              />
            </div>
          </div>
        </InView>
      </Progress>

      <div className="mt-10 grid gap-y-8 lg:mt-14 lg:grid-cols-2 lg:gap-x-10">
        <div>
          <p
            className={cn(DISPLAY, "text-[26px] leading-[1.2] lg:text-[32px]")}
          >
            <Chars once text={ABOUT_CURATOR.name} />
          </p>
          <p className={cn(CAPS, "mt-2 text-(--k-ink)/60")}>
            <Chars once text={ABOUT_CURATOR.role} />
          </p>
          <p
            className={cn(
              DISPLAY,
              "mt-8 max-w-[440px] text-[20px] leading-[1.3] text-(--k-maroon) lg:text-[24px]",
            )}
          >
            <Chars once text={ABOUT_CURATOR.lead} />
          </p>
        </div>
        <div className="space-y-5 lg:max-w-[600px]">
          {ABOUT_CURATOR.body.map((paragraph) => (
            <p
              key={paragraph}
              className={cn(BODY, "text-[16px] leading-[1.5] lg:text-[18px]")}
            >
              <Chars once text={paragraph} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
