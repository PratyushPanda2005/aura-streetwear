import Image from "next/image";

import { cn } from "@/lib/utils";

import { Progress } from "../../ekchitra-v4/Progress";
import { Chars } from "../Chars";
import { Diamonds } from "../Diamonds";
import { CAPS, DISPLAY, SANS, V5_ROUTES } from "../shared";
import { HERO_ART, HERO_COPY, HERO_NAV } from "./data";

/**
 * Where each fragment sits in the collage (in % of the collage, so they close
 * up as it shrinks), how big it is, and which way it drifts while scrolling.
 */
const FRAGMENTS = [
  {
    art: 3,
    box: "left-[1%] top-[6%] w-[13%] aspect-[3/4]",
    drift: "translate-x-[calc(var(--c,0)*-90px)]",
  },
  {
    art: 0,
    box: "left-[17%] top-[14%] w-[16%] aspect-[4/3]",
    drift: "translate-y-[calc(var(--c,0)*-60px)]",
  },
  {
    art: 10,
    box: "left-[9%] top-[55%] w-[12%] aspect-[3/4]",
    drift: "translate-x-[calc(var(--c,0)*-70px)]",
  },
  {
    art: 4,
    box: "left-[26%] top-[66%] w-[14%] aspect-square",
    drift: "translate-y-[calc(var(--c,0)*50px)]",
  },
  {
    art: 8,
    box: "left-[62%] top-[4%] w-[15%] aspect-[4/3]",
    drift: "translate-y-[calc(var(--c,0)*-70px)]",
  },
  {
    art: 5,
    box: "left-[80%] top-[18%] w-[13%] aspect-[3/4]",
    drift: "translate-x-[calc(var(--c,0)*90px)]",
  },
  {
    art: 6,
    box: "left-[66%] top-[60%] w-[17%] aspect-[4/3]",
    drift: "translate-y-[calc(var(--c,0)*60px)]",
  },
  {
    art: 12,
    box: "left-[86%] top-[64%] w-[11%] aspect-[3/4]",
    drift: "translate-x-[calc(var(--c,0)*80px)]",
  },
];

const DELAYS = [
  "[--d:150ms]",
  "[--d:250ms]",
  "[--d:350ms]",
  "[--d:450ms]",
  "[--d:550ms]",
  "[--d:650ms]",
  "[--d:750ms]",
  "[--d:850ms]",
];

/**
 * Study 03 — after stateofaidesign.com. The screen opens as a collage on white:
 * framed fragments of the gallery's works scattered across it, each tagged with its
 * medium in tiny capitals, around a black box carrying the wordmark. As you
 * scroll, the collage squeezes into a band across the top of the screen — the
 * fragments drift outwards and the black box fades — and the headline and
 * introduction rise into the white space it leaves below.
 */
export function HeroCollage() {
  return (
    <Progress
      mode="pinned"
      varName="--c"
      id="collage"
      className={cn("relative h-[220svh] bg-white text-(--k-ink)", SANS)}
    >
      <div className="sticky top-0 h-svh overflow-hidden">
        {/* Top bar. */}
        <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-stretch text-[13px]">
          <span className="flex items-center bg-(--k-ink) px-3 font-medium tracking-[-0.02em] text-white">
            EkChitra
          </span>
          <a
            href={V5_ROUTES.exhibitions}
            className="flex items-center gap-x-6 bg-white px-4"
          >
            Now showing: {HERO_COPY.now.title} <span aria-hidden="true">+</span>
          </a>
          <nav
            aria-label="Primary navigation"
            className="ml-auto hidden items-center bg-white px-5 lg:flex"
          >
            <ul className="flex gap-x-6">
              {HERO_NAV.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="hover:opacity-60">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* The collage: the full screen at first, a band at the top at the end. */}
        <div className="absolute inset-x-0 top-0 h-[calc(100%_-_var(--c,0)_*_54%)] overflow-hidden bg-white">
          <Diamonds
            rows={26}
            shape="scatter"
            tint="sky"
            tintEvery={6}
            tintOpacity={0.55}
            className="absolute top-[12%] left-0 w-[90px] text-(--k-ink)/[0.08]"
          />
          <Diamonds
            rows={26}
            shape="clusters"
            side="right"
            tint="maroon"
            tintEvery={7}
            tintOpacity={0.4}
            className="absolute right-0 bottom-[8%] w-[90px] text-(--k-ink)/[0.08]"
          />

          {FRAGMENTS.map((fragment, index) => {
            const item = HERO_ART[fragment.art];
            return (
              <figure
                key={item.src}
                className={cn(
                  "ek5-rise absolute",
                  fragment.box,
                  fragment.drift,
                  DELAYS[index],
                )}
              >
                <span className="relative block h-full w-full overflow-hidden bg-white">
                  <Image
                    src={item.src}
                    alt={`${item.title} by ${item.artist}`}
                    fill
                    sizes="18vw"
                    className="object-cover"
                  />
                </span>
                <figcaption className="absolute right-0 -bottom-[18px] bg-(--k-ink) px-1.5 text-white py-[3px] text-[9px] leading-none tracking-[0.1em] uppercase lg:text-[10px]">
                  {item.medium}
                </figcaption>
              </figure>
            );
          })}

          {/* The black box. */}
          <div className="absolute top-1/2 left-1/2 w-[64%] -translate-x-1/2 -translate-y-1/2 scale-[calc(1_-_var(--c,0)_*_0.25)] opacity-[calc(1_-_var(--c,0)_*_1.6)] lg:w-[34%]">
            <div className="ek5-curtain relative aspect-[2/1] bg-(--k-ink) p-4 text-white [--d:500ms] lg:p-5">
              <span
                role="img"
                aria-label="EkChitra"
                className="block aspect-[526/118] w-[46%] bg-white [mask-image:url(/sites/ekchitra-redesign/images/ekchitra-logo.png)] [mask-size:contain] [mask-repeat:no-repeat]"
              />
              <span className="absolute right-4 bottom-3 text-[28px] leading-none tracking-[-0.04em] lg:right-5 lg:bottom-4 lg:text-[44px]">
                Hyd
              </span>
            </div>
          </div>
        </div>

        {/* What the collage leaves room for. */}
        <div className="absolute inset-x-0 bottom-0 grid h-[54%] translate-y-[calc((1_-_var(--c,0))_*_60px)] grid-rows-[1fr_auto] px-4 pt-6 pb-5 opacity-[var(--c,0)] lg:grid-cols-2 lg:px-5">
          <p className="hidden max-w-[340px] text-[15px] leading-[1.4] lg:block">
            {HERO_COPY.body}
          </p>
          <h1
            className={cn(
              DISPLAY,
              "row-start-1 self-start text-[40px] leading-[1.02] lg:col-start-2 lg:text-[72px]",
            )}
          >
            <Chars text={["Contemporary", "Indian art"]} />
          </h1>
          <p className={cn(CAPS, "text-[11px] text-(--k-ink)/60")}>
            Curated by Annapurna M · {HERO_COPY.city}
          </p>
          <p className="hidden items-center justify-between text-[14px] lg:flex">
            Scroll to explore <span aria-hidden="true">↓</span>
          </p>
        </div>
      </div>
    </Progress>
  );
}
