"use client";

import { RevealText } from "../shared/RevealText";
import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoIntro } from "@/types/indigo";

/**
 * "The Invisible Echo" intro.
 *
 * Measured: section 910px tall with `padding-top: 280px`; a 460px centred column
 * (432px of content inside 14px side padding, 18px flex gap); two 220px-wide
 * WebGL side images absolutely pinned to the outer 20px gutters.
 */
export function IntroSection({ intro }: { intro: IndigoIntro }) {
  return (
    <section className="relative w-full pt-[280px] pb-[160px] lg:pb-[240px] text-[#030303]">
      {/* Desktop side images — pinned to the outer gutters, top-aligned. */}
      <div className="absolute inset-x-5 top-0 hidden h-[315.109px] justify-between pb-2 lg:flex">
        <WebGLImage
          image={intro.sideImage1}
          program="plane-deformation"
          className="w-[220px]"
          sizes="220px"
        />
        <WebGLImage
          image={intro.sideImage2}
          program="plane-deformation"
          className="w-[220px]"
          sizes="220px"
        />
      </div>

      <div className="mx-auto flex w-full max-w-[460px] flex-col gap-[18px] px-[14px]">
        <RevealText
          as="p"
          type="chars"
          stagger={0.03}
          className="text-center font-mono text-[16px] leading-[18px] uppercase"
        >
          [Intro]
        </RevealText>

        <RevealText
          as="h1"
          type="lines"
          className="py-6 text-center text-[100px] leading-[90px] font-black tracking-[-6px]"
        >
          {intro.title}
        </RevealText>

        {/* Mobile side images sit inline between the heading and the abstract. */}
        <div className="flex justify-between gap-4 lg:hidden">
          <WebGLImage image={intro.sideImage1} className="w-[48%]" sizes="50vw" />
          <WebGLImage image={intro.sideImage2} className="w-[48%]" sizes="50vw" />
        </div>

        <RevealText
          as="p"
          type="lines"
          className="text-[30px] leading-9 tracking-[-1.8px]"
        >
          {intro.abstract}
        </RevealText>

        <RevealText
          as="p"
          type="lines"
          className="text-[18px] leading-6 tracking-[-1.08px]"
        >
          {intro.caption}
        </RevealText>
      </div>
    </section>
  );
}
