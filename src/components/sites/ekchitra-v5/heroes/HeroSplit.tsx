import Image from "next/image";

import { cn } from "@/lib/utils";

import { CapsLink } from "../CapsLink";
import { Chars } from "../Chars";
import { Diamonds } from "../Diamonds";
import { CAPS, DISPLAY, SANS, V5_ROUTES } from "../shared";
import { HERO_ART, HERO_COPY } from "./data";
import { HeroNav } from "./HeroNav";

/** Staggered entry delays for the tiles. */
const DELAYS = [
  "[--d:200ms]",
  "[--d:320ms]",
  "[--d:440ms]",
  "[--d:560ms]",
  "[--d:680ms]",
  "[--d:800ms]",
  "[--d:920ms]",
  "[--d:1040ms]",
];

/** Each column of tiles drifts at its own pace, alternating direction. */
const COLUMNS = [
  { offset: "mt-[18svh]", motion: "ek5-drift-up [--drift-s:58s]" },
  { offset: "mt-0", motion: "ek5-drift-down [--drift-s:72s]" },
  { offset: "mt-[34svh]", motion: "ek5-drift-up [--drift-s:64s]" },
];

/**
 * Study 01 — after noho.ink. The screen splits in two: a calm white panel on
 * the left with the statement set large at the top and a single line of
 * context at the bottom; on the right, a gallery wall of artworks in white,
 * tiles, hung in staggered columns that drift slowly up and down, so the wall
 * never quite stops moving. Tiles fade in one after another on arrival.
 */
export function HeroSplit() {
  return (
    <section
      id="split"
      className={cn(
        "relative grid h-svh min-h-[640px] overflow-hidden bg-white text-(--k-ink) lg:grid-cols-[42%_58%]",
        SANS,
      )}
    >
      <div className="relative z-10 flex flex-col justify-between bg-white px-5 pt-5 pb-6 lg:px-8 lg:pb-8">
        <HeroNav compact />
        <div>
          <h1
            className={cn(
              DISPLAY,
              "max-w-[560px] text-[44px] leading-[1.02] lg:text-[72px]",
            )}
          >
            <Chars text={HERO_COPY.statement} />
          </h1>
          <p className="mt-6 max-w-[380px] text-[16px] leading-[1.45] text-(--k-ink)/70">
            <Chars text={HERO_COPY.body} />
          </p>
        </div>
        <div className="flex items-end justify-between gap-6">
          <p className={cn(CAPS, "text-(--k-ink)/60")}>
            Contemporary Indian art · {HERO_COPY.city}
          </p>
          <CapsLink arrow href={V5_ROUTES.artworks}>
            Explore the collection
          </CapsLink>
        </div>
        <Diamonds
          rows={20}
          shape="steps"
          horizontal
          tint="sky"
          tintEvery={7}
          tintOpacity={0.55}
          className="absolute right-0 bottom-0 hidden h-[52px] -scale-x-100 -scale-y-100 text-(--k-ink)/[0.1] lg:block"
        />
      </div>

      {/* The wall. */}
      <div className="absolute inset-0 -z-0 grid grid-cols-3 gap-2 overflow-hidden px-4 opacity-30 lg:relative lg:gap-2.5 lg:px-6 lg:opacity-100">
        {COLUMNS.map((column, columnIndex) => {
          const tiles = HERO_ART.filter(
            (_, index) => index % COLUMNS.length === columnIndex,
          );
          return (
            <div key={columnIndex} className={column.offset}>
              <ul
                className={cn("flex flex-col gap-2 lg:gap-2.5", column.motion)}
              >
                {[...tiles, ...tiles].map((item, index) => (
                  <li
                    key={`${item.src}-${index}`}
                    aria-hidden={index >= tiles.length || undefined}
                    className={cn(
                      "ek5-rise relative aspect-[4/5] overflow-hidden bg-white",
                      DELAYS[Math.min(index + columnIndex, DELAYS.length - 1)],
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={
                        index >= tiles.length
                          ? ""
                          : `${item.title} by ${item.artist}`
                      }
                      fill
                      sizes="(max-width: 1023px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
