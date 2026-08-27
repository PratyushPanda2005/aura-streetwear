"use client";

import { useRef } from "react";
import { ImageTrail } from "../shared/ImageTrail";
import { RevealText } from "../shared/RevealText";
import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoTaleHead } from "@/types/indigo";

/**
 * Chapter head: ordinal pretitles, the giant Palette Mosaic title, a centred
 * abstract, and a 3-column WebGL image band with two absolutely-placed type marks.
 *
 * Measured: section padding 0 20px; inner padding 40px 0 160px;
 * content flex gap 140px -> 224 / 672 / 224 columns.
 */
export function TaleHead({
  head,
  ordinal,
}: {
  head: IndigoTaleHead;
  /** Chapter position word rendered in the left pretitle, e.g. "first". */
  ordinal: string;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const typeMark = (
    <>
      <div>{head.heading1}- </div>
      <div> -{head.heading2}</div>
    </>
  );

  return (
    <section className="relative w-full px-5 bg-white text-[#030303]">
      <div className="pt-10 pb-40">
        <div className="flex justify-between font-mono text-[16px] leading-[18px] uppercase lg:px-[140px]">
          <p>[{ordinal}]</p>
          <p>[tale]</p>
        </div>

        <RevealText
          as="h2"
          type="chars"
          stagger={0.04}
          className="text-center font-[family-name:var(--font-mosaic)] text-[clamp(90px,16.7vw,240px)] leading-none tracking-[-0.22em] uppercase"
        >
          {head.heading2}
        </RevealText>

        <RevealText
          as="p"
          type="lines"
          className="mx-auto max-w-[480px] text-center text-[22px] leading-[30px] tracking-[-1.32px]"
        >
          {head.abstract}
        </RevealText>

        <div
          ref={contentRef}
          className="relative mt-12 flex flex-col items-center gap-10 lg:flex-row lg:gap-[140px]"
        >
          {/* Desktop type marks, positioned against the content box. */}
          <span className="absolute top-[170px] left-[155.547px] hidden w-[67.2px] font-mono text-[14px] leading-[18px] uppercase lg:block">
            {typeMark}
          </span>
          <span className="absolute top-[667.672px] left-[1177.25px] hidden w-[67.2px] font-mono text-[14px] leading-[18px] uppercase lg:block">
            {typeMark}
          </span>

          <div className="w-[224px] self-center">
            <WebGLImage
              image={head.sideImage1}
              program="plane-deformation"
              sizes="224px"
            />
          </div>

          <WebGLImage
            image={head.mainImage}
            program="plane-deformation"
            className="w-full lg:w-[672px]"
            sizes="(min-width: 1024px) 672px, 100vw"
          />

          <div className="w-[224px] self-center">
            <WebGLImage
              image={head.sideImage2}
              program="plane-deformation"
              sizes="224px"
            />
          </div>

          <ImageTrail image={head.cursorImage} containerRef={contentRef} />
        </div>
      </div>
    </section>
  );
}
