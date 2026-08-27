"use client";

import { useRef } from "react";
import { ImageTrail } from "../shared/ImageTrail";
import { RevealText } from "../shared/RevealText";
import { WebGLImage } from "../shared/WebGLImage";
import type { IndigoTaleLookbook } from "@/types/indigo";

/**
 * Lookbook spread: a narrow column (secondary image + abstract) beside a taller
 * main image, on a white panel.
 *
 * Measured: inner is white, flex row with a 168px column gap and 168px bottom
 * padding; columns split 492.797 / 739.203 of 1400 (2:3 of the non-gap width).
 * Both images are aspect-ratio 1150/1540.
 */
export function TaleLookbook({ lookbook }: { lookbook: IndigoTaleLookbook }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <section className="relative w-full px-5 bg-white text-[#030303]">
      <div
        ref={ref}
        className="mx-auto flex max-w-[1640px] flex-col gap-16 overflow-hidden bg-white pb-[168px] lg:flex-row lg:gap-[168px]"
      >
        <div className="lg:flex-2">
          <WebGLImage
            image={lookbook.secondaryImage}
            program="plane-deformation"
            className="w-full"
            sizes="(min-width: 1024px) 493px, 100vw"
          />
          <RevealText
            as="p"
            type="lines"
            className="mt-[68px] ml-5 max-w-[256px] text-[18px] leading-6 tracking-[-1.08px]"
          >
            {lookbook.abstract}
          </RevealText>
        </div>

        <div className="lg:flex-3">
          <WebGLImage
            image={lookbook.mainImage}
            program="plane-deformation"
            className="w-full"
            sizes="(min-width: 1024px) 739px, 100vw"
          />
        </div>

        <ImageTrail image={lookbook.cursorImage} containerRef={ref} />
      </div>
    </section>
  );
}
