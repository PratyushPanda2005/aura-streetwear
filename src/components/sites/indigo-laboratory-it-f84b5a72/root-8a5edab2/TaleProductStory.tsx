"use client";

import { RevealText } from "../shared/RevealText";
import { BracketCloseIcon, BracketOpenIcon, PlayIcon } from "../shared/icons";
import type { IndigoProductStory } from "@/types/indigo";

/**
 * Story + crafting two-column block above a centred "sound" panel.
 *
 * Measured: section 906px, padding 0 20px. Content row padding 112px 120px 120px
 * with a 264px gap between two 448px columns. The sound panel is a 520px centred
 * flex column; its title is 100px/90px weight-900 (-6px), and the equalizer bars
 * are 1px white lines with `mix-blend-mode: difference`, so they read near-black
 * on the beige page.
 *
 * The audio itself is intentionally not wired — this renders the player's resting
 * visual state only.
 */

/** 25 static equalizer ticks — 1px white bars, blended to read dark. */
function Equalizer() {
  return (
    <div className="relative flex h-7 w-[400px] max-w-full items-end justify-between">
      {Array.from({ length: 25 }).map((_, i) => (
        <span key={i} className="block h-7 w-px bg-white mix-blend-difference" />
      ))}
    </div>
  );
}

export function TaleProductStory({
  story,
  caption,
}: {
  story: IndigoProductStory;
  /** Chapter caption, rendered under the sound title (e.g. "A DANCE OF LIGHT AND SHADOW"). */
  caption: string;
}) {
  return (
    <section className="relative w-full px-5 bg-[#f4f3eb] text-[#030303]">
      <div className="pb-24">
        <div className="flex flex-col gap-16 px-5 pt-28 pb-24 lg:flex-row lg:justify-between lg:gap-[264px] lg:px-[120px]">
          <div className="lg:w-[448px]">
            <h3 className="font-mono text-[16px] leading-[18px] uppercase">[Story]</h3>
            <RevealText
              as="p"
              type="lines"
              className="mt-4 text-[18px] leading-6 tracking-[-1.08px]"
            >
              {story.story}
            </RevealText>
          </div>
          <div className="lg:w-[448px]">
            <h3 className="font-mono text-[16px] leading-[18px] uppercase">[Crafting]</h3>
            <RevealText
              as="p"
              type="lines"
              className="mt-4 text-[18px] leading-6 tracking-[-1.08px]"
            >
              {story.crafting}
            </RevealText>
          </div>
        </div>

        <div className="mx-auto flex w-[520px] max-w-full flex-col items-center justify-center gap-5">
          <h2 className="text-center text-[100px] leading-[90px] font-black tracking-[-6px] uppercase">
            The sound within
          </h2>
          <p className="text-center font-mono text-[14px] leading-[18px] uppercase">
            {caption}
          </p>

          <div className="flex w-[520px] max-w-full flex-col items-center gap-6">
            <Equalizer />
            <button
              type="button"
              aria-label="Play chapter sound"
              className="flex items-center gap-1 px-0.5 text-[#030303]"
            >
              <span className="flex h-4 w-[34px] items-center justify-between gap-[3px]">
                <BracketOpenIcon className="block h-4 w-1 shrink-0" />
                <PlayIcon className="block h-4 w-4" />
                <BracketCloseIcon className="block h-4 w-1 shrink-0" />
              </span>
              <span className="text-[14px] leading-5 font-semibold tracking-[-0.84px]">
                Play
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
