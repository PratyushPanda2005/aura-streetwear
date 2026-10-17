import Image from "next/image";

import { cn } from "@/lib/utils";

import { Diamonds } from "../ekchitra-v5/Diamonds";
import { CONTACT, EXHIBITIONS } from "../ekchitra-v6/data";
import { CELLS, MONO, RULE } from "./styles";
import { Arrow } from "./ui";

const HALFTONE = "/sites/ekchitra-redesign/v7";

// Type set to the reference's measures at 1440px: the 180px (12.55vw) wordmark
// sits 20px off its cell's bottom-left on a line-height of 1; the second word
// is the same size on 0.8; the capitals line is 149px (10.38vw) on 0.82, hung from
// the top-left. All track at -4%.
const WORDMARK =
  "text-[18vw] leading-none tracking-[-0.04em] sm:text-[13vw] lg:text-[12.55vw]";
const SECOND =
  "text-[25vw] leading-[0.8] tracking-[-0.04em] sm:text-[18vw] lg:text-[12.55vw]";
const LINE =
  "text-[16vw] leading-[0.82] tracking-[-0.04em] uppercase sm:text-[12vw] lg:text-[10.38vw]";

/** A halftone picture filling its cell. */
function Halftone({ src, className }: { src: string; className?: string }) {
  return (
    <div
      className={cn(
        "relative min-h-[220px] overflow-hidden bg-(--e7-grey)",
        RULE,
        className,
      )}
    >
      <Image
        src={`${HALFTONE}/${src}`}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover [image-rendering:pixelated]"
      />
    </div>
  );
}

/**
 * Hero, after aspensearch.com: four columns by four rows of ruled cells,
 * two screens tall, opening cell by cell on arrival.
 *
 * Row one: the first half of the name set huge in a white cell beside a
 * halftone of a visitor before a painting. Row two: a halftone painting, a
 * black cell saying what the gallery is with a link to start a conversation,
 * and a mint cell with a line about the gallery over a strip of recent shows
 * running sideways. Row three: a halftone of an opening beside the second
 * half of the name on grey. Row four: the gallery's line in huge white
 * capitals on black beside a halftone of the lamp-lighting.
 */
export function Hero() {
  const shows = EXHIBITIONS.slice(0, 8).map((show) => show.title);

  return (
    <section
      aria-label="EkChitra"
      className={cn(
        CELLS,
        "lg:grid-rows-[repeat(3,minmax(300px,calc((100svh-var(--e7-header))/2)))_minmax(420px,65svh)]",
      )}
    >
      <h1 className="sr-only">
        EkChitra — a contemporary Indian art gallery in Hyderabad
      </h1>

      {/* Row one */}
      <div
        className={cn(
          "e7-rise flex min-h-[260px] items-end p-5 sm:col-span-2 [--d:100ms]",
          RULE,
        )}
      >
        <p aria-hidden="true" className={WORDMARK}>
          EkChitra
        </p>
      </div>
      <Halftone
        src="halftone-visitor.png"
        className="e7-rise sm:col-span-2 [--d:250ms]"
      />

      {/* Row two */}
      <Halftone
        src="halftone-garuda.png"
        className="e7-rise sm:col-span-2 [--d:400ms]"
      />
      <div
        className={cn(
          "e7-rise flex min-h-[300px] flex-col justify-between bg-(--e7-navy) p-5 text-white [--d:550ms]",
          RULE,
        )}
      >
        <p className="text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[24px]">
          A contemporary Indian art gallery in Hyderabad, showing painters,
          printmakers and sculptors from across the country since its first
          exhibition.
        </p>
        <a
          href={CONTACT.href}
          target="_blank"
          rel="noreferrer"
          className={cn(
            MONO,
            "mt-10 flex items-center justify-between hover:opacity-70",
          )}
        >
          Start a conversation
          <Arrow />
        </a>
      </div>
      <div
        className={cn(
          "e7-rise flex min-h-[300px] flex-col justify-between overflow-hidden bg-(--e7-sky) pt-5 [--d:700ms]",
          RULE,
        )}
      >
        <p className="px-5 text-[22px] leading-[1.1] tracking-[-0.02em] lg:text-[24px]">
          We don&rsquo;t just hang pictures. We introduce people to the work and
          the artists that will stay with them.
          <br />
          <br />
          Recent shows:
        </p>
        <div className="mt-10 overflow-hidden pb-5">
          <div className="e7-marquee flex w-max [--marquee-s:28s]">
            {[0, 1].map((copy) => (
              <p
                key={copy}
                aria-hidden={copy === 1 ? true : undefined}
                className="flex shrink-0 items-center gap-x-8 pr-8 text-[17px] tracking-[-0.03em] whitespace-nowrap"
              >
                {shows.map((title) => (
                  <span key={title} className="flex items-center gap-x-8">
                    {title}
                    <span
                      aria-hidden="true"
                      className="size-1.5 rotate-45 bg-(--e7-ink)"
                    />
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Row three */}
      <Halftone src="halftone-opening.png" className="sm:col-span-2" />
      <div
        className={cn(
          "relative flex min-h-[260px] items-end overflow-hidden bg-(--e7-maroon) p-5 text-white sm:col-span-2",
          RULE,
        )}
      >
        <p aria-hidden="true" className={SECOND}>
          Gallery
        </p>
        <Diamonds
          shape="steps"
          tint="sky"
          horizontal
          rows={15}
          className="absolute top-0 right-0 h-[80px] text-white/[0.18] lg:h-[108px]"
        />
      </div>

      {/* Row four */}
      <div
        className={cn(
          "relative flex min-h-[300px] items-start overflow-hidden bg-(--e7-ink) p-5 text-white sm:col-span-2",
          RULE,
        )}
      >
        <p className={LINE}>
          Art is
          <br />
          every
          <br />
          where.
        </p>
        <Diamonds
          shape="clusters"
          tint="maroon"
          tintOpacity={1}
          side="right"
          rows={22}
          className="absolute right-0 bottom-0 w-[44px] text-white/[0.16] lg:w-[56px]"
        />
      </div>
      <Halftone src="halftone-lamp.png" className="sm:col-span-2" />
    </section>
  );
}
