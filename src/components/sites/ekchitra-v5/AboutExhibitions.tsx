import Image from "next/image";

import { cn } from "@/lib/utils";

import { ABOUT_EXHIBITIONS } from "./about-data";
import { CapsLink } from "./CapsLink";
import { Chars } from "./Chars";
import { Diamonds } from "./Diamonds";
import { InView } from "./InView";
import { CAPS, EYEBROW, GUTTER, SANS, TITLE, V5_ROUTES } from "./shared";

/**
 * Heights the posters cycle through, so the strip has an uneven, hung-by-hand
 * top-aligned edge (atelier-meridian's marquee: 208, 300, 255, 121, 166 and
 * 254px at a 300px strip).
 */
const HEIGHTS = [
  "h-[146px] lg:h-[208px]",
  "h-[210px] lg:h-[300px]",
  "h-[178px] lg:h-[255px]",
  "h-[85px] lg:h-[121px]",
  "h-[116px] lg:h-[166px]",
  "h-[178px] lg:h-[254px]",
];

/**
 * Exhibitions, as the second section of atelier-meridian's About page: a
 * centred statement with a small attribution under it, then an endless strip
 * of exhibition posters drifting slowly to the left — all one width, hung from
 * a common top line at different heights. Hovering the strip pauses it and
 * shows each poster's title. The statement fades in letter by letter once;
 * the strip rises in as it arrives.
 */
export function AboutExhibitions() {
  const posters = ABOUT_EXHIBITIONS.posters;

  return (
    <section
      className={cn("relative pt-12 pb-16 lg:pt-[72px] lg:pb-[96px]", SANS)}
    >
      {/* Two quiet motifs: a blue-grey one straddling the gap between the
          curator and this section, and a maroon-grey one beside the statement. */}
      <Diamonds
        rows={16}
        shape="steps"
        tint="sky"
        tintEvery={6}
        tintOpacity={0.8}
        className="absolute top-0 left-0 hidden w-[100px] -translate-y-1/2 text-(--k-ink)/[0.12] lg:block"
      />
      <Diamonds
        rows={18}
        shape="clusters"
        side="right"
        tint="maroon"
        tintEvery={9}
        tintOpacity={0.4}
        className="absolute top-6 right-0 hidden w-[64px] text-(--k-ink)/[0.12] lg:block"
      />
      <div className={cn("flex flex-col items-center text-center", GUTTER)}>
        <p className={cn(TITLE, "max-w-[990px]")}>
          <Chars once text={ABOUT_EXHIBITIONS.statement} />
        </p>
        <p className={cn(EYEBROW, "mt-3")}>
          <Chars once text={ABOUT_EXHIBITIONS.by} />
        </p>
      </div>

      <InView once className="mt-10 overflow-hidden lg:mt-14">
        <div className="ek5-lift">
          <div className="ek5-marquee flex w-max [--marquee-s:70s]">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex h-[232px] shrink-0 items-start gap-x-4 pr-4 lg:h-[324px] lg:gap-x-5 lg:pr-5"
              >
                {posters.map((poster, index) => (
                  <li
                    key={poster.src}
                    className="w-[152px] shrink-0 lg:w-[217px]"
                  >
                    <a
                      href={V5_ROUTES.exhibitions}
                      tabIndex={copy === 1 ? -1 : undefined}
                      className="group block"
                    >
                      <span
                        className={cn(
                          "relative block overflow-hidden bg-(--k-sand)",
                          HEIGHTS[index % HEIGHTS.length],
                        )}
                      >
                        <Image
                          src={poster.src}
                          alt={copy === 1 ? "" : poster.title}
                          fill
                          sizes="217px"
                          className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.05]"
                        />
                      </span>
                      <span
                        className={cn(
                          CAPS,
                          "mt-2 block truncate text-[10px] text-(--k-ink)/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                        )}
                      >
                        {poster.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </InView>

      <div className="mt-8 flex justify-center lg:mt-10">
        <CapsLink arrow href={V5_ROUTES.exhibitions}>
          View all exhibitions
        </CapsLink>
      </div>
    </section>
  );
}
