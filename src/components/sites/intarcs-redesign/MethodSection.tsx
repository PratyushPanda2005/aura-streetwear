"use client";

import { useState } from "react";
import Image from "next/image";

import { METHOD, METHOD_STAGES } from "./data";

/**
 * Method — the services list cloned from telhaclarke.com.au's `<c-process>`,
 * restyled onto this page's dark ground and type.
 *
 * Interaction model is hover-driven, verified against the source: at rest the
 * first stage is active, nothing auto-cycles, nothing is scroll-triggered, and
 * one hover swaps both the highlighted row and the image beside it.
 *
 * Layout at 1440 mirrors the source's 12-column grid: list `col-span-8`,
 * image `col-start-10 col-end-13 row-span-2`, label `col-span-2`, paragraph
 * `col-start-4 col-end-7`. Below md everything stacks with the label first.
 */

/**
 * Corner crop marks. Source geometry per corner: a 20×20 box holding a 12×1px
 * arm on the inner edge and a 1×12px arm on the other, meeting 18px in — so the
 * bracket faces inward rather than hugging the corner.
 */
function CornerMarks() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <span className="absolute top-[18px] left-1 h-px w-3 bg-[#303030]" />
      <span className="absolute top-1 left-[18px] h-3 w-px bg-[#303030]" />
      <span className="absolute top-[18px] right-1 h-px w-3 bg-[#303030]" />
      <span className="absolute top-1 right-[18px] h-3 w-px bg-[#303030]" />
      <span className="absolute bottom-[18px] left-1 h-px w-3 bg-[#303030]" />
      <span className="absolute bottom-1 left-[18px] h-3 w-px bg-[#303030]" />
      <span className="absolute right-1 bottom-[18px] h-px w-3 bg-[#303030]" />
      <span className="absolute right-[18px] bottom-1 h-3 w-px bg-[#303030]" />
    </div>
  );
}

export function MethodSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="studio"
      className="px-[4.1vw] py-24 lg:px-[5.55vw] lg:py-[16.6vh]"
    >
      <div className="relative grid grid-cols-1 gap-y-14 px-5 py-14 md:grid-cols-12 md:gap-x-[10px] lg:py-[9.4vh]">
        <CornerMarks />

        {/* Services list — hovering a row drives both the highlight and the image. */}
        <div className="order-2 col-span-full text-[clamp(1.75rem,3.33vw,3rem)] leading-[1.2] font-light tracking-[-0.01em] md:order-none xl:col-span-8">
          {METHOD_STAGES.map((stage, i) => (
            <span key={stage.number} className="leading-[1.2]">
              <span
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                role="button"
                aria-pressed={active === i}
                className={`cursor-pointer transition-colors duration-200 outline-none ${
                  active === i ? "text-[#f2f2f2]" : "text-[#3d3d3d]"
                }`}
              >
                {stage.label}{" "}
                <sup className="text-[0.667em]">({stage.number})</sup>
              </span>
              {i < METHOD_STAGES.length - 1 && (
                <span className="text-[#3d3d3d]"> / </span>
              )}
            </span>
          ))}
        </div>

        {/* Image stack — all seven layered, the active one faded in. */}
        <div className="order-3 col-span-full md:order-none xl:col-start-10 xl:col-end-13 xl:row-span-2">
          <div className="relative h-0 w-full pt-[72%] xl:aspect-[333/446] xl:h-auto xl:pt-0">
            {METHOD_STAGES.map((stage, i) => (
              <div
                key={stage.number}
                aria-hidden={active !== i}
                className={`absolute inset-0 transition-opacity duration-300 ease-out ${
                  active === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={stage.image}
                  alt={stage.label}
                  fill
                  sizes="(max-width: 1279px) 92vw, 24vw"
                  className="object-cover object-center"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section label — first in source order on mobile. */}
        <div className="order-1 col-span-full md:order-none md:col-span-2">
          <div className="flex gap-2.5 font-mono text-[11px] tracking-[0.14em] uppercase">
            <span className="text-[#a9a9a9]">{METHOD.sectionNumber}</span>
            <h2 className="text-[#f2f2f2]">{METHOD.sectionLabel}</h2>
          </div>
        </div>

        <p className="order-4 col-span-full max-w-[46ch] font-mono text-[12px] leading-[1.6] tracking-[0.01em] text-[#a9a9a9] md:order-none md:col-start-7 md:col-end-13 lg:text-[0.97vw] xl:col-start-4 xl:col-end-7">
          {METHOD.body}
        </p>
      </div>
    </section>
  );
}
