"use client";

import Image from "next/image";
import { Shape } from "./Shapes";
import { SplitTagline } from "./SplitTagline";
import { IMG } from "./data";

export function IntroSection() {
  return (
    <section className="relative z-[1] overflow-clip bg-[var(--y-pink-100)]">
      {/* Zone 1 — "À vos côtés depuis 1976" */}
      <div className="relative grid items-center justify-center overflow-hidden py-40 lg:h-svh lg:py-0">
        <div className="mx-auto max-w-[80vw]">
          <SplitTagline
            className="y-title-100 text-center"
            lines={[[{ text: "Moving you" }], [{ text: "since 1976" }]]}
          />
        </div>

        {/* spinning satellites */}
        <Shape name="sparkle" className="y-spin absolute top-[30%] left-[16%] w-[46px]" />
        <Shape name="flower-pink" className="y-spin-slow absolute top-[64%] left-[20%] w-[10vw] max-w-[160px]" />
        <Shape name="ball-blue" className="y-spin absolute top-[18%] left-[60%] w-[8vw] max-w-[90px]" />
        <Shape name="bars-pinkgreen" className="absolute top-[22%] right-[14%] w-[8vw] max-w-[120px]" />

        {/* sunset + palms bottom-right */}
        <div className="pointer-events-none absolute right-4 bottom-0 w-[46vw] lg:w-[30vw]">
          <Shape name="palm" className="absolute right-0 bottom-0 z-[2] w-[62%]" />
          <Shape name="palm" className="absolute bottom-0 left-0 z-[1] w-[46%] -scale-x-100" />
        </div>
      </div>

      {/* Zone 2 — "PLONGEZ AU COEUR DE …" over the sunset scene */}
      <div className="relative overflow-hidden pb-24">
        {/* sunset backdrop */}
        <div className="pointer-events-none absolute inset-x-0 top-[6%] flex justify-center">
          <div className="relative w-[70vw] max-w-[900px]">
            <Shape name="sun-orange" className="mx-auto w-[46%]" />
            <Shape name="sunset-lines" className="absolute inset-x-0 top-[30%] w-full opacity-90" />
          </div>
        </div>

        <div className="relative z-[3] mx-auto max-w-[1100px] px-5 pt-[18vw] text-center lg:pt-[12vw]">
          <SplitTagline
            className="text-[9vw] leading-[0.85] lg:text-[6.4vw]"
            lines={[
              [{ text: "Into the heart of" }],
              [{ text: "the most vibrant" }],
              [{ text: "decade ever" }],
            ]}
          />
        </div>

        {/* palms flanking */}
        <Shape name="palm" className="absolute bottom-[24%] left-[2%] z-[2] w-[16vw] max-w-[190px]" />
        <Shape name="palm" className="absolute bottom-[26%] right-[3%] z-[2] w-[14vw] max-w-[170px] -scale-x-100" />

        {/* decorations */}
        <Shape name="lightning-yellow" data-parallax="60" className="absolute top-[40%] left-[8%] w-[9vw] max-w-[90px]" />
        <Shape name="zigzag-pink" className="absolute top-[52%] right-[10%] w-[12vw] max-w-[150px]" />
        <Shape name="ball-orange" data-parallax="-50" className="absolute top-[64%] left-[46%] w-[6vw] max-w-[70px]" />

        {/* two lifestyle images */}
        <div className="relative z-[3] mx-auto mt-[6vw] grid max-w-[1200px] grid-cols-2 gap-4 px-5 lg:gap-8">
          <div className="y-fade overflow-hidden rounded-sm">
            <Image
              src={`${IMG}/intro-1.jpg`}
              alt="Yestalgia lifestyle"
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="y-fade mt-[10vw] overflow-hidden rounded-sm" style={{ ["--y-delay" as string]: "0.15s" }}>
            <Image
              src={`${IMG}/intro-2.jpg`}
              alt="Yestalgia lifestyle"
              width={900}
              height={1200}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
